import { describe, expect, it } from "vitest";
import { computeMasteryLevel } from "@/lib/pedagogy/masteryRules";

const base = {
  lessonsCompleted: 0,
  attemptsCount: 0,
  accuracyRate: 0,
  recentAccuracyRate: null as number | null,
  wrongHighConfidenceCount: 0,
  openDifficultyCount: 0,
  recurrentDifficultyCount: 0,
  distinctAttemptDays: 0,
  recentResultSequence: [] as Array<"acerto" | "erro">,
};

describe("computeMasteryLevel", () => {
  it("nao_estudado quando não há aula nem tentativa", () => {
    expect(computeMasteryLevel(base)).toBe("nao_estudado");
  });

  it("apresentado quando a aula foi concluída mas não há tentativa", () => {
    expect(computeMasteryLevel({ ...base, lessonsCompleted: 1 })).toBe("apresentado");
  });

  it("em_pratica com poucas tentativas, mesmo com 100% de acerto", () => {
    expect(
      computeMasteryLevel({ ...base, attemptsCount: 2, accuracyRate: 1, recentResultSequence: ["acerto", "acerto"] }),
    ).toBe("em_pratica");
  });

  it("nunca marca 'dominado' com um único acerto", () => {
    const level = computeMasteryLevel({ ...base, attemptsCount: 1, accuracyRate: 1, recentResultSequence: ["acerto"] });
    expect(level).not.toBe("dominado");
  });

  it("dominado exige tentativas suficientes, dias distintos e acurácia alta e consistente", () => {
    const level = computeMasteryLevel({
      ...base,
      attemptsCount: 6,
      accuracyRate: 0.9,
      recentAccuracyRate: 0.9,
      distinctAttemptDays: 3,
      recentResultSequence: ["acerto", "acerto", "acerto", "acerto", "acerto"],
    });
    expect(level).toBe("dominado");
  });

  it("não marca dominado se as tentativas todas ocorreram no mesmo dia", () => {
    const level = computeMasteryLevel({
      ...base,
      attemptsCount: 6,
      accuracyRate: 0.9,
      recentAccuracyRate: 0.9,
      distinctAttemptDays: 1,
      recentResultSequence: ["acerto", "acerto", "acerto", "acerto", "acerto"],
    });
    expect(level).not.toBe("dominado");
  });

  it("erro de alta confiança derruba para frágil mesmo com muitas tentativas", () => {
    const level = computeMasteryLevel({
      ...base,
      attemptsCount: 10,
      accuracyRate: 0.85,
      recentAccuracyRate: 0.85,
      distinctAttemptDays: 5,
      wrongHighConfidenceCount: 1,
      recentResultSequence: ["acerto", "acerto", "acerto"],
    });
    expect(level).toBe("fragil");
  });

  it("dificuldade recorrente também derruba para frágil", () => {
    const level = computeMasteryLevel({
      ...base,
      attemptsCount: 10,
      accuracyRate: 0.9,
      recentAccuracyRate: 0.9,
      distinctAttemptDays: 5,
      recurrentDifficultyCount: 1,
      recentResultSequence: ["acerto", "acerto"],
    });
    expect(level).toBe("fragil");
  });

  it("em_consolidacao com acurácia média e sem sinal de fragilidade forte", () => {
    const level = computeMasteryLevel({
      ...base,
      attemptsCount: 6,
      accuracyRate: 0.65,
      recentAccuracyRate: 0.65,
      distinctAttemptDays: 3,
      recentResultSequence: ["acerto", "erro", "acerto"],
    });
    expect(level).toBe("em_consolidacao");
  });

  it("errar a tentativa mais recente impede 'dominado' mesmo com acurácia histórica alta", () => {
    const level = computeMasteryLevel({
      ...base,
      attemptsCount: 6,
      accuracyRate: 0.83,
      recentAccuracyRate: 0.8,
      distinctAttemptDays: 3,
      recentResultSequence: ["acerto", "acerto", "acerto", "acerto", "erro"],
    });
    expect(level).not.toBe("dominado");
  });
});
