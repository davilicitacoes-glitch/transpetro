import { getDB } from "@/lib/db/dexie";
import { nowIso } from "@/lib/pedagogy/ids";
import { topicNameOf } from "@/lib/pedagogy/contentRef";
import { isReviewDue } from "@/lib/pedagogy/reviewRules";
import { todayInExamTimezone } from "@/lib/schedule/dates";
import { DEFAULT_STUDENT_ID, type ProfessorContext, type ProfessorSuggestedAction } from "@/lib/models/schema";

/**
 * Monta o `ProfessorContext` — o resumo técnico enxuto que uma futura integração com a API da
 * OpenAI consultaria. NÃO chama nenhuma IA: é 100% consulta e agregação de dados já persistidos.
 * Nunca inclui o texto completo de aulas nem o banco de questões inteiro — apenas IDs e agregados,
 * para permitir buscar detalhe depois sob demanda.
 */
export async function buildProfessorContext(studentId = DEFAULT_STUDENT_ID): Promise<ProfessorContext> {
  const db = getDB();
  const today = todayInExamTimezone();

  const [lessonEvents, allEvents, difficulties, reviews, masterySnapshots, mockAttempts, essaySubmissions, doubts] = await Promise.all([
    db.learningEvents.where({ studentId, kind: "aula_concluida" }).toArray(),
    db.learningEvents.where("studentId").equals(studentId).sortBy("occurredAt"),
    db.errorEntries.where("studentId").equals(studentId).toArray(),
    db.reviewSchedules.where("studentId").equals(studentId).toArray(),
    db.masterySnapshots.where("studentId").equals(studentId).toArray(),
    db.mockExamAttempts.where("studentId").equals(studentId).toArray(),
    db.essaySubmissions.where("studentId").equals(studentId).toArray(),
    db.doubts.where({ studentId, status: "aberta" }).toArray(),
  ]);

  const contentCompleted = [...new Set(lessonEvents.map((e) => e.activityId).filter((x): x is string => !!x))];

  const startedEvents = allEvents.filter((e) => e.kind === "aula_iniciada");
  const contentInProgress = [...new Set(startedEvents.map((e) => e.activityId).filter((x): x is string => !!x && !contentCompleted.includes(x)))];

  const recentActivities = allEvents
    .slice(-15)
    .reverse()
    .map((e) => ({ kind: e.kind, ref: e.contentRef, occurredAt: e.occurredAt }));

  const reviewsDue = reviews.filter((r) => r.status !== "concluida" && isReviewDue(r.nextReviewDate, today)).map((r) => r.id);
  const reviewsAvailable = reviews.filter((r) => r.status === "disponivel").map((r) => r.id);
  const reviewsUpcoming = reviews.filter((r) => r.status === "pendente" && !isReviewDue(r.nextReviewDate, today)).map((r) => r.id);

  const weakestConcepts = masterySnapshots
    .filter((m) => m.masteryLevel === "fragil" || m.masteryLevel === "em_pratica")
    .sort((a, b) => a.accuracyRate - b.accuracyRate)
    .slice(0, 8)
    .map((m) => ({
      topicSlug: m.topicSlug,
      concept: m.concept,
      masteryLevel: m.masteryLevel,
      evidenceCount: m.evidenceAttemptIds.length,
    }));

  const openDifficulties = difficulties
    .filter((d) => d.status === "aberto" || d.status === "em_revisao")
    .map((d) => ({ id: d.id, topicSlug: d.topicSlug, concept: d.concept, evidenceIds: d.evidenceAttemptIds }));

  const recentErrors = difficulties
    .filter((d) => d.lastOccurrenceAt)
    .sort((a, b) => (b.lastOccurrenceAt ?? "").localeCompare(a.lastOccurrenceAt ?? ""))
    .slice(0, 10)
    .map((d) => d.id);

  const recurrentErrors = difficulties.filter((d) => d.occurrenceCount > 1).map((d) => d.id);

  const highConfidenceErrors = masterySnapshots.filter((m) => m.wrongHighConfidenceCount > 0).flatMap((m) =>
    difficulties.filter((d) => d.topicSlug === m.topicSlug).map((d) => d.id),
  );

  const improvedAfterReview = masterySnapshots
    .filter((m) => m.performanceBeforeReview !== undefined && m.performanceAfterReview !== undefined && m.performanceAfterReview > m.performanceBeforeReview)
    .map((m) => m.id);

  const insufficientEvidence = masterySnapshots.filter((m) => m.attemptsCount > 0 && m.attemptsCount < 5).map((m) => m.id);

  const recentAttempts = await db.attempts.where("studentId").equals(studentId).reverse().limit(20).toArray();
  const recentQuestionPerformance = {
    answered: recentAttempts.length,
    accuracy: recentAttempts.length > 0 ? recentAttempts.filter((a) => a.isCorrect).length / recentAttempts.length : null,
  };

  const recentMockExamPerformance = mockAttempts
    .filter((m) => m.status === "concluido")
    .sort((a, b) => (b.finishedAt ?? "").localeCompare(a.finishedAt ?? ""))
    .slice(0, 5)
    .map((m) => ({ mockExamAttemptId: m.id, totalScore: m.totalScore, finishedAt: m.finishedAt }));

  const latestEssay = essaySubmissions.sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
  const fragileCriteria = latestEssay?.evaluation
    ? Object.entries({
        tipologia: latestEssay.evaluation.tipologia / 5,
        abordagem: latestEssay.evaluation.abordagem / 10,
        coerenciaCoesao: latestEssay.evaluation.coerenciaCoesao / 10,
        morfossintaxe: latestEssay.evaluation.morfossintaxe / 5,
        acentuacaoOrtografia: latestEssay.evaluation.acentuacaoOrtografia / 5,
      })
        .filter(([, ratio]) => ratio < 0.6)
        .map(([criterion]) => criterion)
    : [];

  const suggestedActions = buildSuggestedActions({ openDifficulties, reviewsDue, weakestConcepts, latestEssayFragile: fragileCriteria.length > 0 });

  const context: ProfessorContext = {
    schemaVersion: 1,
    generatedAt: nowIso(),
    studentId,
    contentCompleted,
    contentInProgress,
    contentNotStarted: [], // catálogo completo de "não iniciado" depende do universo total de aulas — deixado para o "Meu Curso" cruzar com sua própria lista, evitando duplicar aqui os 132 slugs.
    recentActivities,
    reviewsDue,
    reviewsAvailable,
    reviewsUpcoming,
    weakestConcepts,
    recentErrors,
    recurrentErrors,
    highConfidenceErrors: [...new Set(highConfidenceErrors)],
    openDifficulties,
    improvedAfterReview,
    insufficientEvidence,
    recentQuestionPerformance,
    recentMockExamPerformance,
    essayProgress: {
      submissionsCount: essaySubmissions.length,
      latestScore: latestEssay?.evaluation?.totalScore,
      fragileCriteria,
    },
    openDoubts: doubts.map((d) => d.id),
    suggestedActions,
  };

  return context;
}

function buildSuggestedActions(input: {
  openDifficulties: Array<{ id: string; topicSlug: string; concept?: string; evidenceIds: string[] }>;
  reviewsDue: string[];
  weakestConcepts: Array<{ topicSlug: string; concept?: string; evidenceCount: number }>;
  latestEssayFragile: boolean;
}): ProfessorSuggestedAction[] {
  const actions: ProfessorSuggestedAction[] = [];

  if (input.reviewsDue.length > 0) {
    actions.push({
      action: "agendar_revisao",
      priority: "alta",
      reason: `Há ${input.reviewsDue.length} revisão(ões) vencida(s) aguardando.`,
      evidenceIds: input.reviewsDue,
      relatedResourceRefs: [],
    });
  }

  for (const diff of input.openDifficulties.slice(0, 3)) {
    actions.push({
      action: "revisar_aula",
      targetRef: { kind: "topic", id: diff.topicSlug, syllabusCodes: [], topicSlug: diff.topicSlug, concept: diff.concept },
      priority: "alta",
      reason: `Dificuldade aberta em ${topicNameOf(diff.topicSlug) ?? diff.topicSlug}, com ${diff.evidenceIds.length} tentativa(s) como evidência.`,
      evidenceIds: diff.evidenceIds,
      relatedResourceRefs: [],
    });
  }

  for (const weak of input.weakestConcepts.slice(0, 3)) {
    actions.push({
      action: "resolver_questoes",
      targetRef: { kind: "topic", id: weak.topicSlug, syllabusCodes: [], topicSlug: weak.topicSlug, concept: weak.concept },
      priority: "media",
      reason: `Domínio ainda frágil em ${topicNameOf(weak.topicSlug) ?? weak.topicSlug} (${weak.evidenceCount} tentativa(s) registradas).`,
      evidenceIds: [],
      relatedResourceRefs: [],
    });
  }

  if (input.latestEssayFragile) {
    actions.push({
      action: "retomar_redacao",
      priority: "media",
      reason: "A última redação teve critérios abaixo de 60% da pontuação máxima.",
      evidenceIds: [],
      relatedResourceRefs: [],
    });
  }

  return actions;
}
