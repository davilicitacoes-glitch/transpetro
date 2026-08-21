import { getDB } from "@/lib/db/dexie";
import { nowIso } from "@/lib/pedagogy/ids";
import { todayInExamTimezone } from "@/lib/schedule/dates";
import { isReviewDue } from "@/lib/pedagogy/reviewRules";
import {
  startOrResumeSession,
  endSession,
  recordEvent,
  recordLessonCompleted,
  recordAttempt,
} from "@/lib/pedagogy/service";
import { COURSE_PLAN_V2 } from "@/content/coursePlan";
import {
  DEFAULT_STUDENT_ID,
  COURSE_ID,
  COURSE_PLAN_VERSION,
  type CourseDay,
  type CoursePlan,
  type CourseStep,
  type CourseEnrollment,
  type CourseDayProgress,
  type ReviewSchedule,
} from "@/lib/models/schema";
import { buildCourseCalendar, defaultStartDate, type CourseCalendar } from "@/lib/course/schedule";
import { TOTAL_MISSIONS } from "@config/concurso";
import { syncCourseEnrollment, syncCourseDayProgress } from "@/lib/supabase/sync";

/**
 * SERVIÇO "MEU CURSO" — único caminho de leitura/escrita para matrícula e progresso do curso guiado
 * de 34 dias. Componentes de UI NUNCA acessam `getDB()`/Dexie diretamente para dados do curso — só
 * chamam estas funções (ver seção 11 da missão: preparo para login/Supabase futuro).
 *
 * Reaproveita integralmente a Fundação de Dados do Professor (`src/lib/pedagogy/service.ts`) para
 * tudo que já existe lá (sessões, eventos, tentativas, dificuldades, revisões, domínio) — este
 * arquivo só adiciona o que é específico do curso: o plano estático versionado, a matrícula
 * (data de início) e o progresso agregado por dia (útil para "retomar de onde parei").
 */

/* ------------------------------------------------------------------------------------------------
 * Plano (dados estáticos, versionados — nunca gravados no Dexie)
 * ---------------------------------------------------------------------------------------------- */

export function getCoursePlan(): CoursePlan {
  return COURSE_PLAN_V2;
}

export function getCourseDay(day: number): CourseDay {
  const found = COURSE_PLAN_V2.days.find((d) => d.day === day);
  if (!found) throw new Error(`Dia ${day} não existe no plano ${COURSE_PLAN_VERSION} (1..${TOTAL_MISSIONS}).`);
  return found;
}

function findStep(day: CourseDay, stepId: string): CourseStep | undefined {
  return day.steps.find((s) => s.id === stepId);
}

function nextIncompleteStepId(day: CourseDay, completedStepIds: string[]): string | null {
  const next = day.steps.find((s) => !completedStepIds.includes(s.id));
  return next?.id ?? null;
}

function nextStepId(day: CourseDay, stepId: string): string | null {
  const index = day.steps.findIndex((step) => step.id === stepId);
  return index >= 0 ? day.steps[index + 1]?.id ?? null : null;
}

/* ------------------------------------------------------------------------------------------------
 * Matrícula (data de início) — confirmada uma vez pelo aluno, idempotente.
 * ---------------------------------------------------------------------------------------------- */

function enrollmentId(studentId: string): string {
  return `course-enrollment-${studentId}-${COURSE_ID}`;
}

export async function getEnrollment(studentId = DEFAULT_STUDENT_ID): Promise<CourseEnrollment | undefined> {
  return getDB().courseEnrollments.get(enrollmentId(studentId));
}

/** Cria a matrícula na primeira vez que o aluno confirma o início; reenvio é idempotente (não move o Dia 1). */
export async function startEnrollment(studentId = DEFAULT_STUDENT_ID, startDate?: string): Promise<CourseEnrollment> {
  const existing = await getEnrollment(studentId);
  if (existing) return existing;
  const now = nowIso();
  const enrollment: CourseEnrollment = {
    id: enrollmentId(studentId),
    studentId,
    courseId: COURSE_ID,
    planVersion: COURSE_PLAN_VERSION,
    startDate: startDate ?? defaultStartDate(),
    schemaVersion: 1,
    createdAt: now,
    updatedAt: now,
  };
  await getDB().courseEnrollments.put(enrollment);
  void syncCourseEnrollment(enrollment);
  return enrollment;
}

export function getCalendar(enrollment: Pick<CourseEnrollment, "startDate">): CourseCalendar {
  return buildCourseCalendar(enrollment);
}

/* ------------------------------------------------------------------------------------------------
 * Progresso agregado por dia (cache recalculável — a fonte histórica é LearningEvent/StudySession)
 * ---------------------------------------------------------------------------------------------- */

function dayProgressId(studentId: string, day: number): string {
  return `course-progress-${studentId}-${COURSE_ID}-${day}`;
}

export async function getDayProgress(studentId: string, day: number): Promise<CourseDayProgress> {
  const db = getDB();
  const id = dayProgressId(studentId, day);
  const existing = await db.courseDayProgress.get(id);
  if (existing) return existing;

  const now = nowIso();
  const created: CourseDayProgress = {
    id,
    studentId,
    courseId: COURSE_ID,
    planVersion: COURSE_PLAN_VERSION,
    day,
    status: "nao_iniciado",
    currentStepId: null,
    completedStepIds: [],
    schemaVersion: 1,
    createdAt: now,
    updatedAt: now,
  };
  await db.courseDayProgress.put(created);
  void syncCourseDayProgress(created);
  return created;
}

export async function getAllDayProgress(studentId: string): Promise<CourseDayProgress[]> {
  return getDB().courseDayProgress.where({ studentId, courseId: COURSE_ID }).toArray();
}

/**
 * Read-modify-write ATÔMICO do progresso do dia.
 *
 * Precisa ser transacional: dois cliques rápidos em "Concluir e avançar" disparam duas chamadas
 * concorrentes que, sem transação, leem o mesmo estado antigo e ambas gravam — duplicando o stepId
 * em `completedStepIds` (bug real observado no navegador; os eventos não duplicavam por causa da
 * `idempotencyKey`, mas o array de progresso corrompia e o contador "X de N etapas" estourava).
 * A transação `rw` do Dexie serializa as duas operações; o `Set` abaixo é a segunda linha de defesa.
 */
async function upsertDayProgress(
  studentId: string,
  day: number,
  mutate: (p: CourseDayProgress) => CourseDayProgress,
): Promise<CourseDayProgress> {
  const db = getDB();
  const updated = await db.transaction("rw", db.courseDayProgress, async () => {
    const current = await getDayProgress(studentId, day);
    const mutated = mutate(current);
    const next: CourseDayProgress = {
      ...mutated,
      completedStepIds: [...new Set(mutated.completedStepIds)],
      updatedAt: nowIso(),
    };
    await db.courseDayProgress.put(next);
    return next;
  });
  // fora da transação Dexie: chamada de rede não deve prender o lock de escrita local.
  void syncCourseDayProgress(updated);
  return updated;
}

/** Primeiro dia ainda não concluído (posição real do aluno no curso); 32 se tudo concluído. */
export async function getCurrentDayNumber(studentId = DEFAULT_STUDENT_ID): Promise<number> {
  const all = await getAllDayProgress(studentId);
  const byDay = new Map(all.map((p) => [p.day, p]));
  for (let day = 1; day <= TOTAL_MISSIONS; day++) {
    const p = byDay.get(day);
    if (!p || p.status !== "concluido") return day;
  }
  return TOTAL_MISSIONS;
}

/* ------------------------------------------------------------------------------------------------
 * Fluxo do aluno
 * ---------------------------------------------------------------------------------------------- */

/** Abre a tela do dia — NÃO conclui nada sozinho (abrir a página nunca conta como progresso). */
export async function startCourseDay(studentId = DEFAULT_STUDENT_ID, day: number): Promise<CourseDayProgress> {
  const planDay = getCourseDay(day);
  const progress = await getDayProgress(studentId, day);
  if (progress.status !== "nao_iniciado") {
    if (progress.sessionId) {
      await startOrResumeSession("curso", `course:${day}:${progress.currentStepId ?? "fechamento"}`, studentId);
    }
    return progress;
  }

  const session = await startOrResumeSession("curso", `course:${day}:${planDay.steps[0]?.id ?? "fechamento"}`, studentId);
  await recordEvent({
    kind: "curso_dia_iniciado",
    activityId: String(day),
    sessionId: session.id,
    studentId,
    metadata: { day: String(day), courseId: COURSE_ID },
    idempotencyKey: `course-day-start-${studentId}-${COURSE_ID}-${day}`,
  });

  return upsertDayProgress(studentId, day, (p) => ({
    ...p,
    status: "em_andamento",
    sessionId: session.id,
    currentStepId: planDay.steps[0]?.id ?? null,
    startedAt: p.startedAt ?? nowIso(),
  }));
}

/** Abre uma etapa sem alterar conclusões; usado por Voltar, índice, browser back e revisão. */
export async function navigateToCourseStep(
  studentId = DEFAULT_STUDENT_ID,
  day: number,
  stepId: string,
): Promise<CourseDayProgress> {
  const planDay = getCourseDay(day);
  const step = findStep(planDay, stepId);
  if (!step) throw new Error(`Etapa ${stepId} não existe no Dia ${day}.`);

  const current = await getDayProgress(studentId, day);
  const session = await startOrResumeSession("curso", `course:${day}:${stepId}`, studentId);
  await recordEvent({
    kind: "etapa_retomada",
    activityId: stepId,
    sessionId: current.sessionId ?? session.id,
    studentId,
    metadata: {
      day: String(day),
      stepId,
      mode: current.completedStepIds.includes(stepId) ? "revisao" : "aprendizagem",
    },
    idempotencyKey: `course-step-resume-${studentId}-${COURSE_ID}-${day}-${stepId}-${Date.now()}`,
  });

  return upsertDayProgress(studentId, day, (progress) => ({
    ...progress,
    currentStepId: stepId,
    sessionId: progress.sessionId ?? session.id,
  }));
}
/** Marca uma etapa como concluída. Idempotente: reenviar o mesmo stepId não duplica evento nem progresso. */
export async function completeStep(studentId = DEFAULT_STUDENT_ID, day: number, stepId: string): Promise<CourseDayProgress> {
  const planDay = getCourseDay(day);
  const step = findStep(planDay, stepId);
  if (!step) throw new Error(`Etapa ${stepId} não existe no Dia ${day}.`);

  const progress = await getDayProgress(studentId, day);
  if (progress.completedStepIds.includes(stepId)) {
    return upsertDayProgress(studentId, day, (current) => ({
      ...current,
      currentStepId: nextStepId(planDay, stepId),
    }));
  }

  const idempotencyKey = `course-step-${studentId}-${COURSE_ID}-${day}-${stepId}`;

  if ((step.type === "aula_textual" || step.type === "exemplo_guiado") && step.contentRef?.kind === "lesson") {
    await recordLessonCompleted(step.contentRef.id, step.contentRef, progress.sessionId, studentId);
  } else if (step.type === "videoaula_obrigatoria" && step.contentRef) {
    await recordEvent({
      kind: "video_concluido",
      contentRef: step.contentRef,
      activityId: step.contentRef.id,
      sessionId: progress.sessionId,
      studentId,
      metadata: { day: String(day), stepId },
      idempotencyKey,
    });
  } else {
    await recordEvent({
      kind: "curso_etapa_concluida",
      contentRef: step.contentRef,
      activityId: stepId,
      sessionId: progress.sessionId,
      studentId,
      metadata: { day: String(day), stepId, stepType: step.type },
      idempotencyKey,
    });
  }

  const updated = await upsertDayProgress(studentId, day, (p) => {
    const completedStepIds = [...p.completedStepIds, stepId];
    return {
      ...p,
      status: p.status === "nao_iniciado" ? "em_andamento" : p.status,
      completedStepIds,
      currentStepId: nextIncompleteStepId(planDay, completedStepIds),
    };
  });
  await startOrResumeSession("curso", `course:${day}:${updated.currentStepId ?? "fechamento"}`, studentId);
  return updated;
}

export interface AnswerCourseQuestionInput {
  studentId?: string;
  day: number;
  stepId: string;
  questionId: string;
  selectedKey: "A" | "B" | "C" | "D" | "E";
  correctKey?: "A" | "B" | "C" | "D" | "E";
  isCorrect: boolean;
}

/** Responde uma questão dentro de uma etapa do curso (checagem ou bloco de questões). Sempre passa
 * pelo caminho central `recordAttempt` — nunca grava tentativa diretamente. Conclui a etapa
 * automaticamente quando TODAS as questões daquela etapa já tiverem tentativa registrada. */
export async function answerCourseQuestion(input: AnswerCourseQuestionInput) {
  const studentId = input.studentId ?? DEFAULT_STUDENT_ID;
  const progress = await getDayProgress(studentId, input.day);

  const result = await recordAttempt({
    questionId: input.questionId,
    selectedKey: input.selectedKey,
    correctKey: input.correctKey,
    isCorrect: input.isCorrect,
    mode: "curso",
    sessionId: progress.sessionId,
    activityId: input.stepId,
    studentId,
    idempotencyKey: `course-answer-${studentId}-${COURSE_ID}-${input.day}-${input.stepId}-${input.questionId}`,
  });

  const planDay = getCourseDay(input.day);
  const step = findStep(planDay, input.stepId);
  if (step) {
    const questionIds = [step.contentRef, ...step.extraContentRefs].filter((r) => r?.kind === "question").map((r) => r!.id);
    if (questionIds.length > 0) {
      const db = getDB();
      const answeredFlags = await Promise.all(
        questionIds.map(async (qid) => (await db.attempts.where("questionId").equals(qid).and((a) => a.studentId === studentId).count()) > 0),
      );
      if (answeredFlags.every(Boolean)) {
        await completeStep(studentId, input.day, input.stepId);
      }
    }
  }

  return result;
}

/** Conclui o dia. Recusa se houver etapa obrigatória pendente (nunca declara conclusão fictícia). */
export async function completeCourseDay(studentId = DEFAULT_STUDENT_ID, day: number): Promise<CourseDayProgress> {
  const planDay = getCourseDay(day);
  const progress = await getDayProgress(studentId, day);
  if (progress.status === "concluido") return progress;

  const requiredIds = planDay.steps.filter((s) => !s.optional).map((s) => s.id);
  const pending = requiredIds.filter((id) => !progress.completedStepIds.includes(id));
  if (pending.length > 0) {
    throw new Error(`Ainda há ${pending.length} etapa(s) obrigatória(s) pendente(s) no Dia ${day}.`);
  }

  if (progress.sessionId) await endSession(progress.sessionId, { status: "concluida" });
  await recordEvent({
    kind: "curso_dia_concluido",
    activityId: String(day),
    sessionId: progress.sessionId,
    studentId,
    metadata: { day: String(day), courseId: COURSE_ID },
    idempotencyKey: `course-day-complete-${studentId}-${COURSE_ID}-${day}`,
  });

  return upsertDayProgress(studentId, day, (p) => ({ ...p, status: "concluido", completedAt: nowIso() }));
}

/** Existe pelo menos uma versão salva desta proposta de redação para o aluno? Usado pela etapa
 * `pratica_redacao` do player para só liberar "Concluir e avançar" depois de uma escrita real
 * (a tela /redacao é reaproveitada tal como está — não duplicamos o editor aqui). */
export async function hasEssaySubmission(studentId: string, essayPromptId: string): Promise<boolean> {
  const count = await getDB().essaySubmissions.where({ studentId, essayPromptId }).count();
  return count > 0;
}

/** Existe uma tentativa de simulado concluída para o aluno hoje? Usado pelas etapas
 * `simulado_parcial`/`simulado_completo` — a tela /simulados é reaproveitada como está. */
export async function hasFinishedMockExamToday(studentId: string): Promise<boolean> {
  const today = todayInExamTimezone();
  const all = await getDB().mockExamAttempts.where({ studentId }).toArray();
  return all.some((a) => a.status === "concluido" && (a.finishedAt ?? "").startsWith(today));
}

/* ------------------------------------------------------------------------------------------------
 * Revisões devidas hoje (lidas da Fundação do Professor — nunca duplicadas aqui)
 * ---------------------------------------------------------------------------------------------- */

export async function getDueReviewsToday(studentId = DEFAULT_STUDENT_ID): Promise<ReviewSchedule[]> {
  const db = getDB();
  const today = todayInExamTimezone();
  const all = await db.reviewSchedules.where("studentId").equals(studentId).toArray();
  return all.filter((r) => r.status !== "concluida" && isReviewDue(r.nextReviewDate, today));
}

/* ------------------------------------------------------------------------------------------------
 * Resumo real do dia (fechamento) — nenhum número inventado, tudo lido de tabelas reais.
 * ---------------------------------------------------------------------------------------------- */

export interface CourseDaySummary {
  day: number;
  totalSteps: number;
  completedSteps: number;
  activeMs?: number;
  questionsAnswered: number;
  questionsCorrect: number;
  reviewsScheduledDuringSession: number;
}

export async function getDaySummary(studentId = DEFAULT_STUDENT_ID, day: number): Promise<CourseDaySummary> {
  const planDay = getCourseDay(day);
  const progress = await getDayProgress(studentId, day);
  const db = getDB();

  let attempts: { isCorrect: boolean }[] = [];
  let reviewsScheduledDuringSession = 0;
  if (progress.sessionId) {
    attempts = await db.attempts.where("sessionId").equals(progress.sessionId).toArray();
    const session = await db.studySessions.get(progress.sessionId);
    if (session) {
      const from = session.startedAt;
      const to = session.endedAt ?? nowIso();
      const reviews = await db.reviewSchedules.where("studentId").equals(studentId).toArray();
      reviewsScheduledDuringSession = reviews.filter((r) => r.createdAt >= from && r.createdAt <= to).length;
    }
  }

  const session = progress.sessionId ? await db.studySessions.get(progress.sessionId) : undefined;

  return {
    day,
    totalSteps: planDay.steps.length,
    completedSteps: progress.completedStepIds.length,
    activeMs: session?.activeMs,
    questionsAnswered: attempts.length,
    questionsCorrect: attempts.filter((a) => a.isCorrect).length,
    reviewsScheduledDuringSession,
  };
}

/* ------------------------------------------------------------------------------------------------
 * Mapa dos 34 dias
 * ---------------------------------------------------------------------------------------------- */

export interface CourseMapEntry {
  day: number;
  title: string;
  phase: CourseDay["phase"];
  status: CourseDayProgress["status"];
  scheduledDate: string;
}

export async function getCourseMap(studentId = DEFAULT_STUDENT_ID, enrollment: Pick<CourseEnrollment, "startDate">): Promise<CourseMapEntry[]> {
  const calendar = buildCourseCalendar(enrollment);
  const allProgress = await getAllDayProgress(studentId);
  const byDay = new Map(allProgress.map((p) => [p.day, p]));
  return COURSE_PLAN_V2.days.map((d) => ({
    day: d.day,
    title: d.title,
    phase: d.phase,
    status: byDay.get(d.day)?.status ?? "nao_iniciado",
    scheduledDate: calendar.dateByDay[d.day],
  }));
}

/* ------------------------------------------------------------------------------------------------
 * Áreas Concluídas / Próximas / Revisões (Meu Curso) — leem exclusivamente dados já existentes
 * (plano estático + progresso por dia + reviewSchedules da Fundação do Professor). Nada é duplicado.
 * ---------------------------------------------------------------------------------------------- */

export interface CourseDayOverviewEntry {
  day: number;
  title: string;
  phase: CourseDay["phase"];
  subjects: string[];
  syllabusCodes: string[];
  scheduledDate: string;
  status: CourseDayProgress["status"];
  totalSteps: number;
  completedSteps: number;
  estimatedMinutesTotal: number;
  completedAt?: string;
}

async function buildDayOverview(studentId: string, enrollment: Pick<CourseEnrollment, "startDate">): Promise<CourseDayOverviewEntry[]> {
  const calendar = buildCourseCalendar(enrollment);
  const all = await getAllDayProgress(studentId);
  const byDay = new Map(all.map((p) => [p.day, p]));
  return COURSE_PLAN_V2.days.map((d) => {
    const p = byDay.get(d.day);
    return {
      day: d.day,
      title: d.title,
      phase: d.phase,
      subjects: d.subjects,
      syllabusCodes: d.syllabusCodes,
      scheduledDate: calendar.dateByDay[d.day],
      status: p?.status ?? "nao_iniciado",
      totalSteps: d.steps.length,
      completedSteps: p?.completedStepIds.length ?? 0,
      estimatedMinutesTotal: d.estimatedMinutesTotal,
      completedAt: p?.completedAt,
    };
  });
}

/** Todos os 34 dias do plano com status, datas e conteúdo — base única do Calendário. */
export async function getCourseOverview(studentId = DEFAULT_STUDENT_ID, enrollment: Pick<CourseEnrollment, "startDate">): Promise<CourseDayOverviewEntry[]> {
  return buildDayOverview(studentId, enrollment);
}

/** Dias com pelo menos uma etapa concluída — biblioteca pessoal do que já foi estudado (área "Concluídas"). */
export async function getCompletedDays(studentId = DEFAULT_STUDENT_ID, enrollment: Pick<CourseEnrollment, "startDate">): Promise<CourseDayOverviewEntry[]> {
  const overview = await buildDayOverview(studentId, enrollment);
  return overview.filter((d) => d.completedSteps > 0);
}

/** Dias ainda não concluídos até o fim do plano — percurso restante (área "Próximas"). */
export async function getUpcomingDays(studentId = DEFAULT_STUDENT_ID, enrollment: Pick<CourseEnrollment, "startDate">): Promise<CourseDayOverviewEntry[]> {
  const overview = await buildDayOverview(studentId, enrollment);
  return overview.filter((d) => d.status !== "concluido");
}

export interface ReviewsOverview {
  overdue: ReviewSchedule[];
  dueToday: ReviewSchedule[];
  upcoming: ReviewSchedule[];
  completedRecently: ReviewSchedule[];
}

/** Visão consolidada das revisões do aluno (vencidas, hoje, futuras, concluídas recentemente) —
 * lida direto de `reviewSchedules`, sem recalcular nem duplicar a regra de espaçamento. */
export async function getReviewsOverview(studentId = DEFAULT_STUDENT_ID): Promise<ReviewsOverview> {
  const db = getDB();
  const today = todayInExamTimezone();
  const all = await db.reviewSchedules.where("studentId").equals(studentId).toArray();
  const pending = all.filter((r) => r.status !== "concluida");
  const byDateAsc = (a: ReviewSchedule, b: ReviewSchedule) => a.nextReviewDate.localeCompare(b.nextReviewDate);
  return {
    overdue: pending.filter((r) => r.nextReviewDate < today).sort(byDateAsc),
    dueToday: pending.filter((r) => r.nextReviewDate === today).sort(byDateAsc),
    upcoming: pending.filter((r) => r.nextReviewDate > today).sort(byDateAsc).slice(0, 40),
    completedRecently: all
      .filter((r) => r.status === "concluida" && r.lastReviewedAt)
      .sort((a, b) => (b.lastReviewedAt ?? "").localeCompare(a.lastReviewedAt ?? ""))
      .slice(0, 20),
  };
}
