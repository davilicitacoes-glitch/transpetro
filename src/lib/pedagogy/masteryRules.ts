import type { MasteryLevel } from "@/lib/models/schema";

/**
 * Regras determinísticas de cálculo de domínio (`ruleVersion` abaixo — mude o número sempre que
 * mudar a fórmula, para que snapshots antigos possam ser identificados como calculados por uma
 * regra anterior). Documentado também em docs/MEMORIA_PEDAGOGICA.md.
 *
 * Princípio central da missão: "não trate porcentagem com poucas questões como domínio real" e
 * "'dominado' deve exigir evidência suficiente e desempenho consistente em momentos diferentes,
 * nunca apenas um único acerto." As constantes e a função abaixo são o único lugar que decide isso.
 */
export const MASTERY_RULE_VERSION = 1;

/** Mínimo de tentativas para sequer considerar "em prática" com algum sinal de acerto/erro. */
export const MIN_ATTEMPTS_FOR_SIGNAL = 3;
/** Mínimo de tentativas para poder chegar a "dominado". */
export const MIN_ATTEMPTS_FOR_MASTERY = 5;
/** Mínimo de dias corridos distintos de evidência para "dominado" — evita que 5 acertos na mesma sessão bastem. */
export const MIN_DISTINCT_DAYS_FOR_MASTERY = 2;
export const MASTERY_ACCURACY_THRESHOLD = 0.8;
export const CONSOLIDATION_ACCURACY_THRESHOLD = 0.6;

export interface MasteryEvidence {
  lessonsCompleted: number;
  attemptsCount: number;
  accuracyRate: number;
  recentAccuracyRate: number | null;
  wrongHighConfidenceCount: number;
  openDifficultyCount: number;
  recurrentDifficultyCount: number;
  /** Nº de dias corridos distintos (America/Bahia) em que houve pelo menos uma tentativa. */
  distinctAttemptDays: number;
  /** Últimos resultados, mais recente por último. Usado para detectar sequência de erro recente. */
  recentResultSequence: Array<"acerto" | "erro">;
}

/**
 * Único ponto de decisão do nível de domínio. Não recebe acesso ao banco — só os agregados já
 * calculados — para poder ser testado de forma pura e rápida.
 */
export function computeMasteryLevel(evidence: MasteryEvidence): MasteryLevel {
  const { lessonsCompleted, attemptsCount, accuracyRate, recentAccuracyRate, wrongHighConfidenceCount, recurrentDifficultyCount, distinctAttemptDays, recentResultSequence } = evidence;

  if (attemptsCount === 0) {
    return lessonsCompleted > 0 ? "apresentado" : "nao_estudado";
  }

  if (attemptsCount < MIN_ATTEMPTS_FOR_SIGNAL) {
    return "em_pratica";
  }

  // Um erro recente de alta confiança ou um erro recorrente sempre derruba para frágil,
  // mesmo com muitas tentativas acumuladas — é o sinal mais forte de fragilidade real.
  const hasStrongFragileSignal = wrongHighConfidenceCount > 0 || recurrentDifficultyCount > 0;

  const lastResult = recentResultSequence.at(-1);
  const secondLastResult = recentResultSequence.at(-2);
  const failedMostRecently = lastResult === "erro" || (lastResult === undefined && false);

  if (hasStrongFragileSignal || failedMostRecently) {
    return "fragil";
  }

  const recent = recentAccuracyRate ?? accuracyRate;
  const qualifiesForMastery =
    attemptsCount >= MIN_ATTEMPTS_FOR_MASTERY &&
    distinctAttemptDays >= MIN_DISTINCT_DAYS_FOR_MASTERY &&
    accuracyRate >= MASTERY_ACCURACY_THRESHOLD &&
    recent >= MASTERY_ACCURACY_THRESHOLD &&
    // "consistente em momentos diferentes": não deixa o penúltimo resultado ser erro também.
    secondLastResult !== "erro";

  if (qualifiesForMastery) {
    return "dominado";
  }

  if (accuracyRate >= CONSOLIDATION_ACCURACY_THRESHOLD) {
    return "em_consolidacao";
  }

  return "fragil";
}
