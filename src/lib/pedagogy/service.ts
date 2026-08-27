import { getDB } from "@/lib/db/dexie";
import { newId, newIdempotencyKey, nowIso } from "@/lib/pedagogy/ids";
import { resolveQuestionRef, resolveTopicRef, subjectOfTopic, topicNameOf } from "@/lib/pedagogy/contentRef";
import { computeMasteryLevel, MASTERY_RULE_VERSION, MIN_ATTEMPTS_FOR_SIGNAL } from "@/lib/pedagogy/masteryRules";
import { computeNextReviewDate, decideReviewOutcome, REVIEW_STRATEGY_VERSION } from "@/lib/pedagogy/reviewRules";
import {
  syncStudySession,
  syncLearningEvent,
  syncAttempt,
  syncErrorEntry,
  syncReviewSchedule,
  syncReviewAttempt,
  syncMasterySnapshot,
  syncEssaySubmission,
  syncMockExamAttempt,
  syncDoubt,
} from "@/lib/supabase/sync";
import {
  DEFAULT_STUDENT_ID,
  type Attempt,
  type AttemptMode,
  type ContentRef,
  type Doubt,
  type DoubtKind,
  type ErrorEntry,
  type EssaySubmission,
  type LearningEvent,
  type LearningEventKind,
  type MasterySnapshot,
  type MockExamAttempt,
  type ReviewSchedule,
  type SessionOrigin,
  type StudySession,
} from "@/lib/models/schema";

/**
 * SERVIÇO PEDAGÓGICO CENTRAL — único caminho de escrita para tentativas, eventos, dificuldades,
 * revisões e domínio. Todas as telas que geram dado pedagógico relevante devem chamar estas
 * funções em vez de escrever diretamente no Dexie (ver docs/MEMORIA_PEDAGOGICA.md, seção
 * "Como o próximo Meu Curso deve chamar os serviços").
 *
 * Nenhuma função aqui chama IA nem lê/grava chave de API. Diagnósticos de causa de erro nascem
 * sempre como "ainda_nao_classificado" — nunca inferidos automaticamente por regra oculta.
 */

/* ------------------------------------------------------------------------------------------------
 * Sessões de estudo
 * ---------------------------------------------------------------------------------------------- */

const SESSION_RESUME_WINDOW_MS = 2 * 60 * 60 * 1000; // 2h: além disso, uma sessão "iniciada" antiga é tratada como abandonada, não retomada.

/** Retoma a sessão "iniciada" mais recente da mesma origem (se dentro da janela de retomada) ou cria uma nova. */
export async function startOrResumeSession(origin: SessionOrigin, resumePointRef?: string, studentId = DEFAULT_STUDENT_ID): Promise<StudySession> {
  const db = getDB();
  const now = nowIso();

  const openSessions = await db.studySessions.where({ studentId, origin, status: "iniciada" }).toArray();
  const recent = openSessions
    .filter((s) => Date.now() - new Date(s.startedAt).getTime() <= SESSION_RESUME_WINDOW_MS)
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt))[0];

  if (recent) {
    const updated: StudySession = { ...recent, resumePointRef: resumePointRef ?? recent.resumePointRef, updatedAt: now };
    await db.studySessions.put(updated);
    void syncStudySession(updated);
    return updated;
  }

  const session: StudySession = {
    id: newId("session"),
    studentId,
    origin,
    startedAt: now,
    status: "iniciada",
    resumePointRef,
    relatedActivityIds: [],
    schemaVersion: 1,
    createdAt: now,
    updatedAt: now,
  };
  await db.studySessions.put(session);
  void syncStudySession(session);
  return session;
}

export async function endSession(
  sessionId: string,
  opts: { status?: "concluida" | "abandonada"; activeMs?: number } = {},
): Promise<StudySession | null> {
  const db = getDB();
  const existing = await db.studySessions.get(sessionId);
  if (!existing) return null;
  const now = nowIso();
  const updated: StudySession = {
    ...existing,
    status: opts.status ?? "concluida",
    endedAt: now,
    // `activeMs` só é gravado se o chamador realmente mediu — nunca inventado aqui.
    activeMs: opts.activeMs ?? existing.activeMs,
    updatedAt: now,
  };
  await db.studySessions.put(updated);
  void syncStudySession(updated);
  return updated;
}

/* ------------------------------------------------------------------------------------------------
 * Eventos de aprendizagem
 * ---------------------------------------------------------------------------------------------- */

export interface RecordEventInput {
  kind: LearningEventKind;
  contentRef?: ContentRef;
  activityId?: string;
  sessionId?: string;
  metadata?: Record<string, string>;
  studentId?: string;
  /** Se omitida, uma nova é gerada — passe a mesma chave ao tentar de novo a MESMA ação para deduplicar. */
  idempotencyKey?: string;
}

export async function recordEvent(input: RecordEventInput): Promise<LearningEvent> {
  const db = getDB();
  const idempotencyKey = input.idempotencyKey ?? newIdempotencyKey();

  const event: LearningEvent = {
    id: newId("event"),
    studentId: input.studentId ?? DEFAULT_STUDENT_ID,
    sessionId: input.sessionId,
    kind: input.kind,
    contentRef: input.contentRef,
    activityId: input.activityId,
    metadata: input.metadata,
    occurredAt: nowIso(),
    idempotencyKey,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };

  try {
    await db.learningEvents.add(event);
    void syncLearningEvent(event);
    return event;
  } catch (err) {
    if (isConstraintError(err)) {
      const existing = await db.learningEvents.where("idempotencyKey").equals(idempotencyKey).first();
      if (existing) return existing;
    }
    throw err;
  }
}

/** Marca um bloco/checklist da revisão de véspera com evento idempotente e sincronizável. */
export async function markFinalReviewActivity(activityId: string, studentId = DEFAULT_STUDENT_ID): Promise<LearningEvent> {
  return recordEvent({
    kind: "curso_etapa_concluida",
    contentRef: { kind: "final_review", id: activityId, syllabusCodes: [] },
    activityId,
    studentId,
    idempotencyKey: "final-review-" + studentId + "-" + activityId,
  });
}

export async function getFinalReviewCompletedActivities(studentId = DEFAULT_STUDENT_ID): Promise<Set<string>> {
  const db = getDB();
  const events = await db.learningEvents.where({ studentId, kind: "curso_etapa_concluida" }).toArray();
  return new Set(events.map((event) => event.activityId).filter((id): id is string => Boolean(id?.startsWith("vespera-"))));
}

export async function getLatestAttemptsForQuestions(questionIds: string[], studentId = DEFAULT_STUDENT_ID): Promise<Record<string, Attempt>> {
  const db = getDB();
  const wanted = new Set(questionIds);
  const attempts = (await db.attempts.where("studentId").equals(studentId).toArray()).filter((attempt) => wanted.has(attempt.questionId));
  const latest: Record<string, Attempt> = {};
  for (const attempt of attempts.sort((a, b) => a.createdAt.localeCompare(b.createdAt))) latest[attempt.questionId] = attempt;
  return latest;
}

/* ------------------------------------------------------------------------------------------------
 * Tentativas de questão
 * ---------------------------------------------------------------------------------------------- */

export interface RecordAttemptInput {
  questionId: string;
  selectedKey: "A" | "B" | "C" | "D" | "E" | null;
  correctKey?: "A" | "B" | "C" | "D" | "E";
  isCorrect: boolean;
  mode: AttemptMode;
  sessionId?: string;
  activityId?: string;
  /** Ausente = tempo não medido de forma confiável nesta tela. Nunca inventar um número aqui. */
  responseTimeMs?: number;
  confidence?: number;
  consultedAidBeforeAnswering?: boolean;
  mockExamAttemptId?: string;
  questionOrigin?: string;
  studentId?: string;
  /** Se omitida, uma nova é gerada — passe a mesma chave ao reenviar a MESMA resposta para deduplicar. */
  idempotencyKey?: string;
}

export interface RecordAttemptResult {
  attempt: Attempt;
  difficulty: ErrorEntry | null;
  mastery: MasterySnapshot | null;
  reviewScheduled: ReviewSchedule | null;
  /** true quando o registro já existia (reenvio deduplicado) — nada novo foi computado. */
  wasDuplicate: boolean;
}

/**
 * Único caminho para registrar uma resposta de questão, venha do miniquiz de uma aula, do banco
 * `/questoes`, de uma revisão ou de um simulado. Sempre cria uma tentativa nova (nunca sobrescreve
 * uma anterior) e, de forma atômica, atualiza a dificuldade e o domínio associados.
 */
export async function recordAttempt(input: RecordAttemptInput): Promise<RecordAttemptResult> {
  const db = getDB();
  const studentId = input.studentId ?? DEFAULT_STUDENT_ID;
  const idempotencyKey = input.idempotencyKey ?? newIdempotencyKey();
  const now = nowIso();

  const ref = resolveQuestionRef(input.questionId);

  const previousAttempts = await db.attempts.where({ studentId, questionId: input.questionId }).toArray();
  const attemptNumber = previousAttempts.length + 1;

  const attempt: Attempt = {
    id: newId("attempt"),
    studentId,
    questionId: input.questionId,
    sessionId: input.sessionId,
    activityId: input.activityId,
    subjectSlug: ref?.subjectSlug,
    topicSlug: ref?.topicSlug,
    syllabusCodes: ref?.syllabusCodes ?? [],
    selectedKey: input.selectedKey,
    correctKey: input.correctKey,
    isCorrect: input.isCorrect,
    result: input.isCorrect ? "correta" : "incorreta",
    attemptNumber,
    responseTimeMs: input.responseTimeMs,
    confidence: input.confidence,
    consultedAidBeforeAnswering: input.consultedAidBeforeAnswering,
    questionOrigin: input.questionOrigin,
    mode: input.mode,
    mockExamAttemptId: input.mockExamAttemptId,
    idempotencyKey,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await db.attempts.add(attempt);
    void syncAttempt(attempt);
  } catch (err) {
    if (isConstraintError(err)) {
      const existing = await db.attempts.where("idempotencyKey").equals(idempotencyKey).first();
      if (existing) {
        return { attempt: existing, difficulty: null, mastery: null, reviewScheduled: null, wasDuplicate: true };
      }
    }
    throw err;
  }

  let difficulty: ErrorEntry | null = null;
  let reviewScheduled: ReviewSchedule | null = null;

  if (ref?.topicSlug) {
    if (!input.isCorrect) {
      const result = await openOrUpdateDifficulty({
        studentId,
        topicSlug: ref.topicSlug,
        subjectSlug: ref.subjectSlug,
        syllabusCodes: ref.syllabusCodes,
        questionId: input.questionId,
        newEvidenceAttemptId: attempt.id,
        origin: "auto_tentativa",
      });
      difficulty = result.difficulty;
      reviewScheduled = result.reviewScheduled;
    } else {
      difficulty = await registerCorrectEvidenceOnOpenDifficulty(studentId, ref.topicSlug, input.questionId, attempt.id);
      // Acertou, mas com sinal fraco (confiança declarada baixa, ou muito mais lento que o próprio
      // histórico no tópico) — não é um erro (não abre/atualiza dificuldade), mas ainda é candidato
      // real a revisão futura (missão "Motores adaptativos", seção 2). Só dispara com base em
      // histórico de verdade (nunca no primeiro contato com o tópico) — ver scheduleWeakSignalReview.
      reviewScheduled = await scheduleWeakSignalReview(studentId, ref.topicSlug, ref.subjectSlug, input);
    }
  }

  const mastery = ref?.topicSlug ? await recomputeMastery(studentId, ref.topicSlug, ref.subjectSlug) : null;

  return { attempt, difficulty, mastery, reviewScheduled, wasDuplicate: false };
}

/** Limiar de "muito mais lento que a média": tempo >= 1.75x a média histórica do tópico — mesma
 * convenção de saturação usada em `computeWeaknessFactor` (src/lib/schedule/priority.ts), que trata
 * 2x como o pior caso. Documentado aqui porque é o único lugar que decide o gatilho de revisão. */
const SLOW_RESPONSE_RATIO_THRESHOLD = 1.75;
/** Confiança declarada (1-5) igual ou abaixo disto conta como "baixa confiança", mesma convenção de
 * `correctLowConfidenceCount` em masteryRules.ts. */
const LOW_CONFIDENCE_THRESHOLD = 2;
/** Só compara tempo de resposta contra um histórico com pelo menos essa quantidade de tentativas —
 * mesmo piso de MIN_ATTEMPTS_FOR_SIGNAL em masteryRules.ts, pra não reagir a uma média de 1 tentativa. */
const MIN_ATTEMPTS_FOR_WEAK_SIGNAL_TIME = MIN_ATTEMPTS_FOR_SIGNAL;

/** Agenda revisão por sinal fraco num acerto (baixa confiança ou lentidão muito acima do próprio
 * histórico do tópico) — nunca no primeiro contato com o tópico, porque ainda não há "histórico"
 * pra comparar (evita inventar um sinal de fraqueza sem dado real por trás). */
async function scheduleWeakSignalReview(
  studentId: string,
  topicSlug: string,
  subjectSlug: string | undefined,
  input: RecordAttemptInput,
): Promise<ReviewSchedule | null> {
  const lowConfidence = typeof input.confidence === "number" && input.confidence <= LOW_CONFIDENCE_THRESHOLD;

  let slowResponse = false;
  if (typeof input.responseTimeMs === "number") {
    const priorSnapshot = await getMasteryState(studentId, topicSlug);
    if (priorSnapshot && priorSnapshot.attemptsCount >= MIN_ATTEMPTS_FOR_WEAK_SIGNAL_TIME && priorSnapshot.averageResponseTimeMs) {
      slowResponse = input.responseTimeMs >= priorSnapshot.averageResponseTimeMs * SLOW_RESPONSE_RATIO_THRESHOLD;
    }
  }

  if (!lowConfidence && !slowResponse) return null;

  return scheduleReview({
    studentId,
    itemType: "topic",
    itemId: topicSlug,
    reason: lowConfidence ? "baixa_confianca" : "esquecimento",
  });
}

/* ------------------------------------------------------------------------------------------------
 * Dificuldades (Caderno de Erros / registro agregado)
 * ---------------------------------------------------------------------------------------------- */

interface OpenOrUpdateDifficultyInput {
  studentId: string;
  topicSlug: string;
  subjectSlug?: string;
  syllabusCodes: string[];
  concept?: string;
  questionId?: string;
  newEvidenceAttemptId?: string;
  cause?: string;
  correctRule?: string;
  sourceRef?: string;
  origin: "auto_tentativa" | "aluno_manual";
}

/** Abre uma nova dificuldade ou atualiza a existente (mesmo aluno + tópico [+ conceito]) com nova evidência. */
export async function openOrUpdateDifficulty(
  input: OpenOrUpdateDifficultyInput,
): Promise<{ difficulty: ErrorEntry; reviewScheduled: ReviewSchedule | null }> {
  const db = getDB();
  const now = nowIso();

  const candidates = await db.errorEntries.where({ studentId: input.studentId, topicSlug: input.topicSlug }).toArray();
  const existing = candidates.find((c) => (input.concept ? c.concept === input.concept : !c.concept) && c.status !== "superado");

  if (existing) {
    const evidenceAttemptIds = input.newEvidenceAttemptId
      ? [...existing.evidenceAttemptIds, input.newEvidenceAttemptId]
      : existing.evidenceAttemptIds;

    const wasReopened = existing.status === "em_monitoramento";
    const nextStatus = wasReopened ? "aberto" : existing.status;

    const updated: ErrorEntry = {
      ...existing,
      occurrenceCount: existing.occurrenceCount + 1,
      lastOccurrenceAt: now,
      evidenceAttemptIds,
      status: nextStatus,
      statusHistory: wasReopened
        ? [...existing.statusHistory, { status: nextStatus, changedAt: now, rule: "novo erro reabriu dificuldade em monitoramento" }]
        : existing.statusHistory,
      resolved: false,
      updatedAt: now,
    };
    await db.errorEntries.put(updated);
    void syncErrorEntry(updated);
    const reviewScheduled = await scheduleReview({
      studentId: input.studentId,
      itemType: "difficulty",
      itemId: updated.id,
      errorEntryId: updated.id,
      reason: "erro",
    });
    return { difficulty: updated, reviewScheduled };
  }

  const created: ErrorEntry = {
    id: newId("difficulty"),
    studentId: input.studentId,
    questionId: input.questionId,
    subjectSlug: input.subjectSlug,
    topicSlug: input.topicSlug,
    syllabusCodes: input.syllabusCodes,
    concept: input.concept,
    cause: input.cause ?? `Erro identificado automaticamente em ${topicNameOf(input.topicSlug) ?? input.topicSlug}.`,
    correctRule: input.correctRule ?? "",
    sourceRef: input.sourceRef,
    nextReviewDate: computeNextReviewDate(0),
    resolved: false,
    firstOccurrenceAt: now,
    lastOccurrenceAt: now,
    occurrenceCount: 1,
    evidenceAttemptIds: input.newEvidenceAttemptId ? [input.newEvidenceAttemptId] : [],
    subsequentCorrectAttemptIds: [],
    severity: "media",
    status: "aberto",
    statusHistory: [{ status: "aberto", changedAt: now, rule: "criado a partir de tentativa/errro" }],
    errorNature: "ainda_nao_classificado",
    origin: input.origin,
    createdAt: now,
    updatedAt: now,
  };
  await db.errorEntries.put(created);
  void syncErrorEntry(created);

  const reviewScheduled = await scheduleReview({
    studentId: input.studentId,
    itemType: "difficulty",
    itemId: created.id,
    errorEntryId: created.id,
    reason: "erro",
  });

  return { difficulty: created, reviewScheduled };
}

/** Registra um acerto posterior em uma dificuldade aberta, sem apagar o histórico do erro. */
async function registerCorrectEvidenceOnOpenDifficulty(
  studentId: string,
  topicSlug: string,
  questionId: string,
  attemptId: string,
): Promise<ErrorEntry | null> {
  const db = getDB();
  const candidates = await db.errorEntries.where({ studentId, topicSlug }).toArray();
  const open = candidates.find((c) => c.status === "aberto" || c.status === "em_revisao");
  if (!open) return null;

  const now = nowIso();
  const subsequentCorrectAttemptIds = [...open.subsequentCorrectAttemptIds, attemptId];
  // Exige 2 evidências corretas subsequentes (não apenas 1) antes de considerar sequer "em monitoramento" —
  // coerente com "um único acerto não marca o assunto como dominado".
  const nextStatus = subsequentCorrectAttemptIds.length >= 2 ? "em_monitoramento" : open.status;
  const statusChanged = nextStatus !== open.status;

  const updated: ErrorEntry = {
    ...open,
    subsequentCorrectAttemptIds,
    status: nextStatus,
    statusHistory: statusChanged
      ? [...open.statusHistory, { status: nextStatus, changedAt: now, rule: "2+ acertos subsequentes ao erro" }]
      : open.statusHistory,
    updatedAt: now,
  };
  await db.errorEntries.put(updated);
  void syncErrorEntry(updated);
  return updated;
}

/** Classifica a natureza de um erro já registrado (ErrorEntry). Sempre rastreável: quem propôs
 * (`origin`) e, quando vier do Professor de IA, a confiança da inferência. Nunca é chamada
 * automaticamente por regra oculta — só por ação explícita (aluno ou Professor confirmado). */
export async function classifyDifficultyErrorNature(
  errorEntryId: string,
  errorNature: ErrorEntry["errorNature"],
  origin: ErrorEntry["errorNatureOrigin"],
  confidence?: number,
  studentId = DEFAULT_STUDENT_ID,
): Promise<ErrorEntry> {
  const db = getDB();
  const existing = await db.errorEntries.get(errorEntryId);
  if (!existing) throw new Error(`ErrorEntry ${errorEntryId} não encontrada.`);
  if (existing.studentId !== studentId) throw new Error("Dificuldade não pertence a este aluno.");

  const now = nowIso();
  const updated: ErrorEntry = {
    ...existing,
    errorNature,
    errorNatureOrigin: origin,
    errorNatureConfidence: confidence,
    updatedAt: now,
  };
  await db.errorEntries.put(updated);
  void syncErrorEntry(updated);
  return updated;
}

/* ------------------------------------------------------------------------------------------------
 * Revisões
 * ---------------------------------------------------------------------------------------------- */

interface ScheduleReviewInput {
  studentId: string;
  itemType: ReviewSchedule["itemType"];
  itemId: string;
  errorEntryId?: string;
  reason: ReviewSchedule["reason"];
  priority?: ReviewSchedule["priority"];
}

/** Não empilha revisão duplicada: se já existir uma pendente/disponível para o mesmo item, reutiliza. */
export async function scheduleReview(input: ScheduleReviewInput): Promise<ReviewSchedule> {
  const db = getDB();
  const existingForItem = await db.reviewSchedules.where({ itemType: input.itemType, itemId: input.itemId }).toArray();
  const openOne = existingForItem.find((r) => r.status === "pendente" || r.status === "disponivel");
  if (openOne) return openOne;

  const now = nowIso();
  const review: ReviewSchedule = {
    id: newId("review"),
    studentId: input.studentId,
    itemType: input.itemType,
    itemId: input.itemId,
    errorEntryId: input.errorEntryId,
    reason: input.reason,
    intervalIndex: 0,
    strategyVersion: REVIEW_STRATEGY_VERSION,
    priority: input.priority ?? "media",
    nextReviewDate: computeNextReviewDate(0),
    status: "pendente",
    recommendedActivityRefs: [],
    createdAt: now,
    updatedAt: now,
  };
  await db.reviewSchedules.put(review);
  void syncReviewSchedule(review);
  return review;
}

/** Registra o resultado de uma revisão concluída e decide o próximo intervalo/estado. */
export async function recordReviewResult(
  reviewScheduleId: string,
  result: "dominado" | "duvida" | "erro",
  relatedAttemptIds: string[] = [],
): Promise<{ review: ReviewSchedule; difficulty: ErrorEntry | null }> {
  const db = getDB();
  const review = await db.reviewSchedules.get(reviewScheduleId);
  if (!review) throw new Error(`ReviewSchedule ${reviewScheduleId} não encontrada.`);

  const now = nowIso();
  const decision = decideReviewOutcome(result, review.intervalIndex);

  const reviewAttempt = {
    id: newId("reviewAttempt"),
    reviewScheduleId,
    result,
    reviewedAt: now,
    relatedAttemptIds,
    resultBefore: review.status,
    resultAfter: decision.status,
    decision: decision.difficultyDecision,
    createdAt: now,
    updatedAt: now,
  };
  await db.reviewAttempts.put(reviewAttempt);
  void syncReviewAttempt(reviewAttempt);

  const updatedReview: ReviewSchedule = {
    ...review,
    intervalIndex: decision.nextIntervalIndex,
    nextReviewDate: decision.nextReviewDate,
    lastReviewedAt: now,
    status: decision.status,
    updatedAt: now,
  };
  await db.reviewSchedules.put(updatedReview);
  void syncReviewSchedule(updatedReview);

  let difficulty: ErrorEntry | null = null;
  if (review.errorEntryId) {
    const entry = await db.errorEntries.get(review.errorEntryId);
    if (entry) {
      let nextStatus = entry.status;
      if (decision.difficultyDecision === "considerar_superada" && entry.status !== "aberto") {
        nextStatus = "superado";
      } else if (decision.difficultyDecision === "manter_aberta") {
        nextStatus = "aberto";
      } else if (decision.difficultyDecision === "monitorar" && entry.status === "aberto") {
        nextStatus = "em_revisao";
      }
      const statusChanged = nextStatus !== entry.status;
      difficulty = {
        ...entry,
        status: nextStatus,
        resolved: nextStatus === "superado",
        statusHistory: statusChanged
          ? [...entry.statusHistory, { status: nextStatus, changedAt: now, rule: `resultado de revisão: ${result}` }]
          : entry.statusHistory,
        updatedAt: now,
      };
      await db.errorEntries.put(difficulty);
      void syncErrorEntry(difficulty);
    }
  }

  return { review: updatedReview, difficulty };
}

/* ------------------------------------------------------------------------------------------------
 * Domínio (mastery)
 * ---------------------------------------------------------------------------------------------- */

const RECENT_WINDOW_SIZE = 10;

export async function recomputeMastery(studentId: string, topicSlug: string, subjectSlug?: string, concept?: string): Promise<MasterySnapshot> {
  const db = getDB();
  const now = nowIso();

  const allAttempts = await db.attempts.where({ studentId, topicSlug }).sortBy("createdAt");
  const attempts = concept ? allAttempts.filter((a) => a.syllabusCodes.length > 0) : allAttempts; // concept-level filtering fica para quando o dado existir na questão

  const attemptsCount = attempts.length;
  const correctCount = attempts.filter((a) => a.isCorrect).length;
  const accuracyRate = attemptsCount > 0 ? correctCount / attemptsCount : 0;

  const recentSlice = attempts.slice(-RECENT_WINDOW_SIZE);
  const recentAccuracyRate = recentSlice.length > 0 ? recentSlice.filter((a) => a.isCorrect).length / recentSlice.length : null;

  const wrongHighConfidenceCount = attempts.filter((a) => !a.isCorrect && (a.confidence ?? 0) >= 4).length;
  const correctLowConfidenceCount = attempts.filter((a) => a.isCorrect && (a.confidence ?? 5) <= 2).length;

  const responseTimes = attempts.map((a) => a.responseTimeMs).filter((t): t is number => typeof t === "number");
  const averageResponseTimeMs = responseTimes.length > 0 ? Math.round(responseTimes.reduce((s, t) => s + t, 0) / responseTimes.length) : undefined;

  const confidences = attempts.map((a) => a.confidence).filter((c): c is number => typeof c === "number");
  const averageConfidence = confidences.length > 0 ? confidences.reduce((s, c) => s + c, 0) / confidences.length : undefined;

  const distinctAttemptDays = new Set(attempts.map((a) => a.createdAt.slice(0, 10))).size;
  const recentResultSequence: Array<"acerto" | "erro"> = recentSlice.map((a) => (a.isCorrect ? "acerto" : "erro"));

  const difficulties = await db.errorEntries.where({ studentId, topicSlug }).toArray();
  const openDifficultyCount = difficulties.filter((d) => d.status === "aberto" || d.status === "em_revisao").length;
  const recurrentDifficultyCount = difficulties.filter((d) => d.occurrenceCount > 1).length;

  const lessonEvents = await db.learningEvents.where({ studentId, kind: "aula_concluida" }).toArray();
  const lessonsCompleted = lessonEvents.filter((e) => e.contentRef?.topicSlug === topicSlug).length;

  const masteryLevel = computeMasteryLevel({
    lessonsCompleted,
    attemptsCount,
    accuracyRate,
    recentAccuracyRate,
    wrongHighConfidenceCount,
    openDifficultyCount,
    recurrentDifficultyCount,
    distinctAttemptDays,
    recentResultSequence,
  });

  const reviewsForTopic = await db.reviewSchedules.where("itemType").equals("difficulty").toArray();
  const relevantReviewIds = new Set(difficulties.map((d) => d.id));
  const reviewsCompleted = (
    await Promise.all(
      reviewsForTopic
        .filter((r) => relevantReviewIds.has(r.itemId))
        .map((r) => db.reviewAttempts.where("reviewScheduleId").equals(r.id).count()),
    )
  ).reduce((s, n) => s + n, 0);

  const id = `mastery-${studentId}-${topicSlug}-${concept ?? "all"}`;
  const existing = await db.masterySnapshots.get(id);

  const snapshot: MasterySnapshot = {
    id,
    studentId,
    subjectSlug: subjectSlug ?? subjectOfTopic(topicSlug),
    syllabusCodes: attempts[0]?.syllabusCodes ?? [],
    topicSlug,
    concept,
    lessonsCompleted,
    accuracyRate,
    recentAccuracyRate: recentAccuracyRate ?? undefined,
    attemptsCount,
    averageResponseTimeMs,
    averageConfidence,
    correctLowConfidenceCount,
    wrongHighConfidenceCount,
    recentResultSequence,
    openDifficultyCount,
    recurrentDifficultyCount,
    reviewsCompleted,
    lastActivityAt: attempts.at(-1)?.createdAt,
    nextReviewDate: difficulties.find((d) => d.status !== "superado")?.nextReviewDate,
    masteryLevel,
    evidenceAttemptIds: attempts.map((a) => a.id),
    ruleVersion: MASTERY_RULE_VERSION,
    computedAt: now,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  await db.masterySnapshots.put(snapshot);
  void syncMasterySnapshot(snapshot);
  return snapshot;
}

export async function getMasteryState(studentId: string, topicSlug: string, concept?: string): Promise<MasterySnapshot | undefined> {
  const db = getDB();
  return db.masterySnapshots.get(`mastery-${studentId}-${topicSlug}-${concept ?? "all"}`);
}

/* ------------------------------------------------------------------------------------------------
 * Conclusão de aula (substitui o hack anterior de gravar em `notes`)
 * ---------------------------------------------------------------------------------------------- */

export async function recordLessonStarted(lessonSlug: string, sessionId?: string, studentId = DEFAULT_STUDENT_ID) {
  const ref: ContentRef = { kind: "lesson", id: lessonSlug, topicSlug: undefined, syllabusCodes: [] };
  return recordEvent({ kind: "aula_iniciada", contentRef: ref, activityId: lessonSlug, sessionId, studentId });
}

export async function recordLessonCompleted(lessonSlug: string, contentRef: ContentRef, sessionId?: string, studentId = DEFAULT_STUDENT_ID) {
  const event = await recordEvent({ kind: "aula_concluida", contentRef, activityId: lessonSlug, sessionId, studentId });
  if (contentRef.topicSlug) {
    await recomputeMastery(studentId, contentRef.topicSlug, contentRef.subjectSlug);
  }
  return event;
}

/* ------------------------------------------------------------------------------------------------
 * Dúvidas / marcações
 * ---------------------------------------------------------------------------------------------- */

export interface RecordDoubtInput {
  kind: DoubtKind;
  contentRef: ContentRef;
  excerpt?: string;
  message?: string;
  studentId?: string;
}

export async function recordDoubt(input: RecordDoubtInput): Promise<Doubt> {
  const db = getDB();
  const now = nowIso();
  const doubt: Doubt = {
    id: newId("doubt"),
    studentId: input.studentId ?? DEFAULT_STUDENT_ID,
    kind: input.kind,
    contentRef: input.contentRef,
    excerpt: input.excerpt,
    message: input.message,
    status: "aberta",
    createdAt: now,
    updatedAt: now,
  };
  await db.doubts.put(doubt);
  void syncDoubt(doubt);
  await recordEvent({ kind: "duvida_registrada", contentRef: input.contentRef, studentId: input.studentId });
  return doubt;
}

export async function resolveDoubt(doubtId: string, resolutionNote?: string): Promise<Doubt | null> {
  const db = getDB();
  const existing = await db.doubts.get(doubtId);
  if (!existing) return null;
  const now = nowIso();
  const updated: Doubt = { ...existing, status: "resolvida", resolvedAt: now, resolutionNote, updatedAt: now };
  await db.doubts.put(updated);
  void syncDoubt(updated);
  return updated;
}

/* ------------------------------------------------------------------------------------------------
 * Redação (persistência estruturada; correção por IA fica para uma missão futura)
 * ---------------------------------------------------------------------------------------------- */

export interface RecordEssaySubmissionInput {
  essayPromptId: string;
  lineCount: number;
  content: string;
  imageUrl?: string;
  previousVersionId?: string;
  timeSpentMs?: number;
  sessionId?: string;
  studentId?: string;
}

export async function recordEssaySubmission(input: RecordEssaySubmissionInput): Promise<EssaySubmission> {
  const db = getDB();
  const now = nowIso();
  const submission: EssaySubmission = {
    id: newId("essay"),
    studentId: input.studentId ?? DEFAULT_STUDENT_ID,
    sessionId: input.sessionId,
    essayPromptId: input.essayPromptId,
    lineCount: input.lineCount,
    content: input.content,
    imageUrl: input.imageUrl,
    timeSpentMs: input.timeSpentMs,
    previousVersionId: input.previousVersionId,
    pointsFixedFromPrevious: [],
    pointsPendingFromPrevious: [],
    createdAt: now,
    updatedAt: now,
  };
  await db.essaySubmissions.put(submission);
  void syncEssaySubmission(submission);
  const ref = resolveEssayRefSafe(input.essayPromptId);
  await recordEvent({
    kind: input.previousVersionId ? "redacao_reescrita" : "redacao_criada",
    contentRef: ref,
    activityId: submission.id,
    sessionId: input.sessionId,
    studentId: input.studentId,
  });
  return submission;
}

function resolveEssayRefSafe(essayPromptId: string): ContentRef {
  return { kind: "essay_prompt", id: essayPromptId, syllabusCodes: [] };
}

/** Grava a avaliação estruturada de uma versão de redação (por critério da rubrica oficial),
 * vinculada à submissão e rastreável por `evaluatorRef`. Nunca sobrescreve o texto original —
 * só anexa o resultado da correção à mesma submissão. Único caminho de escrita para `evaluation`. */
export async function recordEssayEvaluation(
  essaySubmissionId: string,
  evaluation: EssaySubmission["evaluation"],
  studentId = DEFAULT_STUDENT_ID,
): Promise<EssaySubmission> {
  const db = getDB();
  const existing = await db.essaySubmissions.get(essaySubmissionId);
  if (!existing) throw new Error(`EssaySubmission ${essaySubmissionId} não encontrada.`);
  if (existing.studentId !== studentId) throw new Error("Submissão de redação não pertence a este aluno.");

  const now = nowIso();
  const updated: EssaySubmission = { ...existing, evaluation, updatedAt: now };
  await db.essaySubmissions.put(updated);
  void syncEssaySubmission(updated);
  await recordEvent({
    kind: "redacao_corrigida",
    contentRef: resolveEssayRefSafe(existing.essayPromptId),
    activityId: essaySubmissionId,
    studentId,
    metadata: evaluation ? { evaluatedBy: evaluation.evaluatedBy, totalScore: String(evaluation.totalScore) } : undefined,
  });
  return updated;
}

/* ------------------------------------------------------------------------------------------------
 * Simulados (liga tentativas reais ao resultado agregado)
 * ---------------------------------------------------------------------------------------------- */

export async function startMockExamAttempt(mockExamId: string, sessionId?: string, studentId = DEFAULT_STUDENT_ID): Promise<MockExamAttempt> {
  const db = getDB();
  const now = nowIso();
  const attempt: MockExamAttempt = {
    id: newId("mockAttempt"),
    mockExamId,
    studentId,
    sessionId,
    startedAt: now,
    status: "em_andamento",
    answers: [],
    attemptIds: [],
    generatedReviewIds: [],
    createdAt: now,
    updatedAt: now,
  };
  await db.mockExamAttempts.put(attempt);
  void syncMockExamAttempt(attempt);
  await recordEvent({ kind: "simulado_iniciado", activityId: attempt.id, sessionId, studentId });
  return attempt;
}

/**
 * Registra, para cada questão do simulado, uma tentativa real via `recordAttempt` (mode "simulado"),
 * some as revisões abertas por erro e fecha o MockExamAttempt com o placar e os vínculos de evidência.
 */
export async function finishMockExamAttempt(
  mockExamAttemptId: string,
  answers: Array<{ questionId: string; selectedKey: "A" | "B" | "C" | "D" | "E" | null; correctKey: "A" | "B" | "C" | "D" | "E"; responseTimeMs?: number }>,
  scoreBySubject: Record<string, number>,
  totalScore: number,
  studentId = DEFAULT_STUDENT_ID,
): Promise<MockExamAttempt> {
  const db = getDB();
  const mockAttempt = await db.mockExamAttempts.get(mockExamAttemptId);
  if (!mockAttempt) throw new Error(`MockExamAttempt ${mockExamAttemptId} não encontrado.`);

  const attemptIds: string[] = [];
  const generatedReviewIds: string[] = [];

  for (const answer of answers) {
    const isCorrect = answer.selectedKey === answer.correctKey;
    const result = await recordAttempt({
      questionId: answer.questionId,
      selectedKey: answer.selectedKey,
      correctKey: answer.correctKey,
      isCorrect,
      mode: "simulado",
      mockExamAttemptId,
      responseTimeMs: answer.responseTimeMs,
      studentId,
    });
    attemptIds.push(result.attempt.id);
    if (result.reviewScheduled) generatedReviewIds.push(result.reviewScheduled.id);
  }

  const now = nowIso();
  const updated: MockExamAttempt = {
    ...mockAttempt,
    status: "concluido",
    finishedAt: now,
    answers: answers.map((a) => ({ questionId: a.questionId, selectedKey: a.selectedKey, responseTimeMs: a.responseTimeMs ?? 0 })),
    attemptIds,
    scoreBySubject,
    totalScore,
    generatedReviewIds,
    updatedAt: now,
  };
  await db.mockExamAttempts.put(updated);
  void syncMockExamAttempt(updated);
  await recordEvent({ kind: "simulado_finalizado", activityId: mockExamAttemptId, studentId });
  return updated;
}

/* ------------------------------------------------------------------------------------------------
 * Utilitário
 * ---------------------------------------------------------------------------------------------- */

function isConstraintError(err: unknown): boolean {
  return err instanceof Error && (err.name === "ConstraintError" || /already exists/i.test(err.message));
}

// re-exportado para telas que precisam montar um ContentRef de tópico ao chamar recordDoubt/openOrUpdateDifficulty.
export { resolveTopicRef };
