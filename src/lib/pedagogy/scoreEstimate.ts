import { getDB } from "@/lib/db/dexie";
import { DEFAULT_STUDENT_ID } from "@/lib/models/schema";
import { SUBJECTS, TOPICS, MODULES } from "@/content/curriculum";
import { getQuestionsBySyllabusCode } from "@/content/questions";
import { computePriority, computeReviewUrgency, computeWeaknessFactor } from "@/lib/schedule/priority";
import { OBJECTIVE_TOTAL_POINTS } from "@config/concurso";
import { MIN_ATTEMPTS_FOR_SIGNAL, MIN_ATTEMPTS_FOR_MASTERY } from "@/lib/pedagogy/masteryRules";
import { isReviewDue } from "@/lib/pedagogy/reviewRules";
import { todayInExamTimezone, daysBetween } from "@/lib/schedule/dates";
import { topicNameOf } from "@/lib/pedagogy/contentRef";

/**
 * MOTOR 3 — previsão de nota e priorização automática (ver missão "Motores adaptativos", seção 4).
 *
 * Este módulo só LÊ dados já gravados pelo serviço pedagógico central (`attempts`,
 * `masterySnapshots`, `reviewSchedules`) — não inventa evento nem escreve nada. A fórmula de
 * priorização (`computePriority`/`computeWeaknessFactor`, em `src/lib/schedule/priority.ts`) já
 * existia no código desde uma missão anterior, mas nunca tinha sido chamada por nenhuma tela ou
 * serviço — este arquivo é o primeiro a de fato ligá-la a dado real.
 *
 * Cada código do Anexo IV mapeia 1:1 para exatamente um `topicSlug` neste currículo (confirmado:
 * 39 tópicos, 39 códigos, nenhum tópico com mais de um código) — por isso "tópico" e "código do
 * edital" são tratados como sinônimos aqui.
 *
 * SUPOSIÇÕES DOCUMENTADAS (nenhuma é fato oficial do edital, todas são estimativas didáticas):
 * 1. Peso em pontos de cada código = peso da disciplina (`SubjectDef.examWeightPoints`, já
 *    confirmado pela estrutura oficial da prova) dividido igualmente entre os códigos daquela
 *    disciplina — o edital não publica peso por código, só por disciplina.
 * 2. "Incidência estimada" de um código = tamanho do banco de questões reais daquele código,
 *    normalizado pelo código com mais questões — um proxy razoável (mais questões reais catalogadas
 *    tende a indicar um tema mais cobrado), mas não é uma estatística oficial de incidência.
 */

const moduleBySlug = new Map(MODULES.map((m) => [m.slug, m]));
const topicToSubject = new Map<string, string>();
for (const t of TOPICS) {
  const mod = moduleBySlug.get(t.moduleSlug);
  if (mod) topicToSubject.set(t.slug, mod.subjectSlug);
}

const topicsCountBySubject = new Map<string, number>();
for (const t of TOPICS) {
  const subjectSlug = topicToSubject.get(t.slug);
  if (!subjectSlug) continue;
  topicsCountBySubject.set(subjectSlug, (topicsCountBySubject.get(subjectSlug) ?? 0) + 1);
}

const maxQuestionsPerCode = Math.max(1, ...TOPICS.map((t) => getQuestionsBySyllabusCode(t.syllabusCodes[0] ?? "").length));

export interface CodePerformance {
  topicSlug: string;
  topicName: string;
  syllabusCode: string;
  subjectSlug: string;
  /** Peso estimado deste código em pontos da prova (ver suposição 1 no cabeçalho do arquivo). */
  examWeightPoints: number;
  attemptsCount: number;
  hasEnoughData: boolean;
  accuracyRate: number;
  recentAccuracyRate: number | null;
  /** Acurácia usada no cálculo — mistura recente/geral quando há dado recente (ver blend abaixo). */
  weightedAccuracy: number;
  reviewOverdueDays: number | null;
  priorityScore: number;
}

export interface ScoreEstimate {
  hasEnoughData: boolean;
  studentId: string;
  computedAt: string;
  totalPoints: number;
  /** Quantos pontos da prova já têm dado real suficiente (>= MIN_ATTEMPTS_FOR_SIGNAL tentativas) por trás. */
  pointsWithData: number;
  /** Acurácia média, só entre os códigos com dado suficiente. */
  knownAccuracy: number;
  /** Extrapolação: knownAccuracy aplicada aos 60 pontos inteiros — deixar claro na UI que é extrapolação. */
  extrapolatedPoints: number;
  perCode: CodePerformance[];
  /** Top códigos por impacto potencial na nota — só os que ainda têm lacuna real (accuracy < 0.8). */
  topPriority: CodePerformance[];
}

/** Mistura acurácia recente com a geral quando há amostra recente — dá mais peso ao desempenho
 * recente (reflete esquecimento/evolução), sem descartar o histórico todo quando a amostra recente
 * é pequena. Pesos documentados: 70% recente / 30% geral quando `recentAccuracyRate` existe. */
function blendAccuracy(accuracyRate: number, recentAccuracyRate: number | null): number {
  if (recentAccuracyRate === null) return accuracyRate;
  return recentAccuracyRate * 0.7 + accuracyRate * 0.3;
}

export async function computeScoreEstimate(studentId = DEFAULT_STUDENT_ID): Promise<ScoreEstimate> {
  const db = getDB();
  const today = todayInExamTimezone();

  const [allSnapshots, allReviews] = await Promise.all([
    db.masterySnapshots.where({ studentId }).toArray(),
    db.reviewSchedules.where({ studentId }).toArray(),
  ]);
  const snapshotByTopic = new Map(allSnapshots.filter((s) => !s.concept).map((s) => [s.topicSlug, s]));

  const perCode: CodePerformance[] = TOPICS.map((topic) => {
    const code = topic.syllabusCodes[0] ?? topic.slug;
    const subjectSlug = topicToSubject.get(topic.slug) ?? "";
    const subject = SUBJECTS.find((s) => s.slug === subjectSlug);
    const topicsInSubject = topicsCountBySubject.get(subjectSlug) ?? 1;
    const examWeightPoints = subject ? subject.examWeightPoints / topicsInSubject : 0;

    const snapshot = snapshotByTopic.get(topic.slug);
    const attemptsCount = snapshot?.attemptsCount ?? 0;
    const hasEnoughData = attemptsCount >= MIN_ATTEMPTS_FOR_SIGNAL;
    const accuracyRate = snapshot?.accuracyRate ?? 0;
    const recentAccuracyRate = snapshot?.recentAccuracyRate ?? null;
    const weightedAccuracy = blendAccuracy(accuracyRate, recentAccuracyRate);

    const openReview = allReviews.find(
      (r) => r.itemType === "topic" && r.itemId === topic.slug && (r.status === "pendente" || r.status === "disponivel"),
    );
    const reviewOverdueDays = openReview && isReviewDue(openReview.nextReviewDate, today) ? Math.max(0, daysBetween(openReview.nextReviewDate, today, false)) : null;

    const coverageGap = Math.max(0, 1 - attemptsCount / MIN_ATTEMPTS_FOR_MASTERY);
    // "Fraqueza" só reflete desempenho DEMONSTRADO — um tópico nunca tentado usa 0.5 (neutro, "ainda
    // não sabemos") em vez de 0 (que presumiria o pior caso sem evidência nenhuma). "Nunca estudado"
    // já é capturado à parte por `coverageGap`; não duplicar esse sinal aqui evita que todo tópico
    // não iniciado pareça "muito fraco" e afogue quem de fato errou bastante.
    const weakness = computeWeaknessFactor({
      accuracyRate: hasEnoughData ? accuracyRate : 0.5,
      relativeResponseTime: 1, // sem tempo-alvo absoluto por questão nesta missão; fator neutro documentado.
      declaredConfidence: snapshot?.averageConfidence ?? 3,
      recurrenceCount: snapshot?.recurrentDifficultyCount ?? 0,
    });
    const urgency = openReview ? computeReviewUrgency(reviewOverdueDays ?? 0, openReview.intervalIndex) : 0.1;
    const questionsForCode = getQuestionsBySyllabusCode(code).length;
    const estimatedIncidence = questionsForCode / maxQuestionsPerCode;

    const priorityScore = computePriority({
      examWeight: examWeightPoints,
      maxExamWeight: 40 / (topicsCountBySubject.get("especificas") ?? 1), // maior peso possível por código, pra normalizar entre disciplinas
      coverageGap,
      studentWeakness: weakness,
      reviewUrgency: urgency,
      estimatedIncidence,
    });

    return {
      topicSlug: topic.slug,
      topicName: topicNameOf(topic.slug) ?? topic.name,
      syllabusCode: code,
      subjectSlug,
      examWeightPoints,
      attemptsCount,
      hasEnoughData,
      accuracyRate,
      recentAccuracyRate,
      weightedAccuracy,
      reviewOverdueDays,
      priorityScore,
    };
  });

  const withData = perCode.filter((c) => c.hasEnoughData);
  const pointsWithData = withData.reduce((s, c) => s + c.examWeightPoints, 0);
  const weightedSum = withData.reduce((s, c) => s + c.weightedAccuracy * c.examWeightPoints, 0);
  const knownAccuracy = pointsWithData > 0 ? weightedSum / pointsWithData : 0;
  const extrapolatedPoints = knownAccuracy * OBJECTIVE_TOTAL_POINTS;

  const topPriority = [...perCode]
    // exclui só quem já tem dado suficiente E acerto alto (dominado de verdade) — tópico nunca
    // estudado continua na lista (é exatamente o tipo de lacuna que a priorização deve apontar).
    .filter((c) => !(c.hasEnoughData && c.weightedAccuracy >= 0.8))
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 5);

  return {
    hasEnoughData: pointsWithData > 0,
    studentId,
    computedAt: new Date().toISOString(),
    totalPoints: OBJECTIVE_TOTAL_POINTS,
    pointsWithData: Math.round(pointsWithData * 10) / 10,
    knownAccuracy: Math.round(knownAccuracy * 1000) / 1000,
    extrapolatedPoints: Math.round(extrapolatedPoints * 10) / 10,
    perCode,
    topPriority,
  };
}
