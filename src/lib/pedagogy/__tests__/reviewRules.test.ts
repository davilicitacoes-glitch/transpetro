import { describe, expect, it } from "vitest";
import { decideReviewOutcome, computeNextReviewDate, REVIEW_SCHEDULE_DAYS } from "@/lib/pedagogy/reviewRules";

describe("decideReviewOutcome", () => {
  it("'erro' sempre reseta o intervalo para 0", () => {
    const decision = decideReviewOutcome("erro", 3, "2026-08-10");
    expect(decision.nextIntervalIndex).toBe(0);
    expect(decision.difficultyDecision).toBe("manter_aberta");
  });

  it("'duvida' mantém o mesmo intervalo (nem avança, nem reseta)", () => {
    const decision = decideReviewOutcome("duvida", 2, "2026-08-10");
    expect(decision.nextIntervalIndex).toBe(2);
    expect(decision.difficultyDecision).toBe("monitorar");
  });

  it("'dominado' avança um intervalo, sem passar do último", () => {
    const decision = decideReviewOutcome("dominado", 0, "2026-08-10");
    expect(decision.nextIntervalIndex).toBe(1);
    expect(decision.difficultyDecision).toBe("reagendar");
  });

  it("'dominado' no último intervalo sugere considerar a dificuldade superada, não antes disso", () => {
    const lastIndex = REVIEW_SCHEDULE_DAYS.length - 1;
    const decision = decideReviewOutcome("dominado", lastIndex, "2026-08-10");
    expect(decision.nextIntervalIndex).toBe(lastIndex); // não passa do último
    expect(decision.difficultyDecision).toBe("considerar_superada");
  });

  it("uma única revisão 'dominado' fora do último intervalo NUNCA marca como superada", () => {
    for (let i = 0; i < REVIEW_SCHEDULE_DAYS.length - 1; i++) {
      const decision = decideReviewOutcome("dominado", i, "2026-08-10");
      expect(decision.difficultyDecision).not.toBe("considerar_superada");
    }
  });
});

describe("computeNextReviewDate", () => {
  it("usa os intervalos 1/3/7/14/30 dias a partir da data informada", () => {
    expect(computeNextReviewDate(0, "2026-08-01")).toBe("2026-08-02");
    expect(computeNextReviewDate(1, "2026-08-01")).toBe("2026-08-04");
    expect(computeNextReviewDate(4, "2026-08-01")).toBe("2026-08-31");
  });
});
