import { REVIEW_SCHEDULE_DAYS, nextReviewInterval } from "@/lib/schedule/priority";
import { addDays, todayInExamTimezone } from "@/lib/schedule/dates";
import type { ReviewStatus } from "@/lib/models/schema";

/**
 * Regra de espaçamento centralizada — reaproveita `REVIEW_SCHEDULE_DAYS` (1, 3, 7, 14, 30 dias),
 * já usada no motor de cronograma, em vez de espalhar datas fixas por telas diferentes.
 */
export const REVIEW_STRATEGY_VERSION = 1;

export { REVIEW_SCHEDULE_DAYS };

export function computeNextReviewDate(intervalIndex: number, fromDateIso = todayInExamTimezone()): string {
  return addDays(fromDateIso, nextReviewInterval(intervalIndex));
}

export interface ReviewOutcomeDecision {
  nextIntervalIndex: number;
  nextReviewDate: string;
  status: ReviewStatus;
  /** Decisão sobre a dificuldade associada, se houver (ver ErrorEntrySchema.status). */
  difficultyDecision: "manter_aberta" | "monitorar" | "reagendar" | "considerar_superada";
}

/**
 * Decide o próximo intervalo e o destino da dificuldade associada a partir do resultado de UMA
 * revisão. "Erro" sempre reseta o intervalo (a revisão falhou, o espaçamento maior não se justifica
 * ainda). "Dúvida" mantém o mesmo intervalo (nem avança nem reseta). "Dominado" avança o intervalo;
 * só quando já estava no último intervalo (30 dias) é que sugere considerar a dificuldade superada
 * — nunca em uma única revisão isolada, coerente com a regra de domínio em `masteryRules.ts`.
 */
export function decideReviewOutcome(result: "dominado" | "duvida" | "erro", currentIntervalIndex: number, fromDateIso = todayInExamTimezone()): ReviewOutcomeDecision {
  if (result === "erro") {
    return {
      nextIntervalIndex: 0,
      nextReviewDate: computeNextReviewDate(0, fromDateIso),
      status: "pendente",
      difficultyDecision: "manter_aberta",
    };
  }

  if (result === "duvida") {
    return {
      nextIntervalIndex: currentIntervalIndex,
      nextReviewDate: computeNextReviewDate(currentIntervalIndex, fromDateIso),
      status: "pendente",
      difficultyDecision: "monitorar",
    };
  }

  // result === "dominado"
  const isLastInterval = currentIntervalIndex >= REVIEW_SCHEDULE_DAYS.length - 1;
  const nextIntervalIndex = Math.min(currentIntervalIndex + 1, REVIEW_SCHEDULE_DAYS.length - 1);
  return {
    nextIntervalIndex,
    nextReviewDate: computeNextReviewDate(nextIntervalIndex, fromDateIso),
    status: "pendente",
    difficultyDecision: isLastInterval ? "considerar_superada" : "reagendar",
  };
}

export function isReviewDue(nextReviewDate: string, today = todayInExamTimezone()): boolean {
  return nextReviewDate <= today;
}
