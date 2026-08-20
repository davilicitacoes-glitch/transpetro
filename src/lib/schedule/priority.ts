/**
 * prioridade = peso_da_prova × lacuna_de_cobertura × fraqueza_do_aluno × urgência_da_revisão × incidência_estimada
 * Todos os fatores são normalizados em [0.1, 1.0] para evitar explosão numérica (produto de 5 fatores em [0,1] tende a
 * zero rápido; o piso de 0.1 garante que nenhum tópico "some" do ranking só por ter um fator baixo isolado).
 */

const MIN_FACTOR = 0.1;
const MAX_FACTOR = 1.0;

function clampFactor(value: number): number {
  return Math.min(MAX_FACTOR, Math.max(MIN_FACTOR, value));
}

export interface PriorityInput {
  /** Peso do tópico na prova, em pontos (ex.: 2 para Conhecimentos Específicos, 1 para as demais). Normalizado internamente pelo maior peso do blueprint. */
  examWeight: number;
  maxExamWeight: number;
  /** 0 = totalmente coberto, 1 = nunca estudado. */
  coverageGap: number;
  /** Combinação de taxa de erro, tempo de resposta, confiança declarada e recorrência (ver `computeWeaknessFactor`). */
  studentWeakness: number;
  /** 0 = revisão em dia, 1 = revisão muito atrasada. */
  reviewUrgency: number;
  /** Estimativa didática (não estatística) de quanto o tópico costuma ser cobrado, em [0,1]. */
  estimatedIncidence: number;
}

export function computePriority(input: PriorityInput): number {
  const weightFactor = clampFactor(input.maxExamWeight > 0 ? input.examWeight / input.maxExamWeight : MIN_FACTOR);
  const coverageFactor = clampFactor(input.coverageGap);
  const weaknessFactor = clampFactor(input.studentWeakness);
  const urgencyFactor = clampFactor(input.reviewUrgency);
  const incidenceFactor = clampFactor(input.estimatedIncidence);

  return weightFactor * coverageFactor * weaknessFactor * urgencyFactor * incidenceFactor;
}

export interface WeaknessInputs {
  /** Taxa de acerto histórica no tópico, 0 a 1. */
  accuracyRate: number;
  /** Tempo médio de resposta relativo ao tempo-alvo (1 = no tempo, >1 = mais lento). */
  relativeResponseTime: number;
  /** Confiança que o próprio aluno declarou (1 a 5). */
  declaredConfidence: number;
  /** Quantas vezes o mesmo erro/tópico já reincidiu no caderno de erros. */
  recurrenceCount: number;
}

/** Combina os quatro sinais em um único fator de fraqueza em [0,1] (1 = fraqueza máxima). */
export function computeWeaknessFactor(input: WeaknessInputs): number {
  const errorComponent = 1 - clampFactor(input.accuracyRate); // já usa o piso para não zerar
  const speedComponent = clampFactor(Math.min(2, input.relativeResponseTime) / 2);
  const confidenceComponent = clampFactor(1 - (input.declaredConfidence - 1) / 4); // confiança 5 -> 0, confiança 1 -> 1
  const recurrenceComponent = clampFactor(Math.min(input.recurrenceCount, 5) / 5);

  return errorComponent * 0.4 + speedComponent * 0.2 + confidenceComponent * 0.2 + recurrenceComponent * 0.2;
}

const REVIEW_SCHEDULE_DAYS = [1, 3, 7, 14, 30] as const;

/** Urgência de revisão em [0,1]: 0 no dia agendado, cresce conforme o atraso, satura em 1 após 1 intervalo completo de atraso. */
export function computeReviewUrgency(daysSinceScheduled: number, intervalIndex: number): number {
  if (daysSinceScheduled <= 0) return MIN_FACTOR;
  const interval = REVIEW_SCHEDULE_DAYS[Math.min(intervalIndex, REVIEW_SCHEDULE_DAYS.length - 1)];
  return clampFactor(daysSinceScheduled / interval);
}

export function nextReviewInterval(intervalIndex: number): number {
  return REVIEW_SCHEDULE_DAYS[Math.min(intervalIndex, REVIEW_SCHEDULE_DAYS.length - 1)];
}

export { REVIEW_SCHEDULE_DAYS };
