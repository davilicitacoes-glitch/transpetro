import { describe, expect, it } from "vitest";
import { computePriority, computeReviewUrgency, computeWeaknessFactor } from "@/lib/schedule/priority";

describe("computePriority", () => {
  it("nunca retorna zero, mesmo com todos os fatores no mínimo (evita sumir do ranking)", () => {
    const p = computePriority({
      examWeight: 0,
      maxExamWeight: 2,
      coverageGap: 0,
      studentWeakness: 0,
      reviewUrgency: 0,
      estimatedIncidence: 0,
    });
    expect(p).toBeGreaterThan(0);
  });

  it("nunca ultrapassa 1 (produto de fatores normalizados em [0.1,1])", () => {
    const p = computePriority({
      examWeight: 2,
      maxExamWeight: 2,
      coverageGap: 1,
      studentWeakness: 1,
      reviewUrgency: 1,
      estimatedIncidence: 1,
    });
    expect(p).toBeLessThanOrEqual(1);
  });

  it("tópico de maior peso na prova tem prioridade maior, tudo mais igual", () => {
    const base = { coverageGap: 0.8, studentWeakness: 0.6, reviewUrgency: 0.5, estimatedIncidence: 0.7 };
    const especificas = computePriority({ ...base, examWeight: 2, maxExamWeight: 2 });
    const portugues = computePriority({ ...base, examWeight: 1, maxExamWeight: 2 });
    expect(especificas).toBeGreaterThan(portugues);
  });
});

describe("computeWeaknessFactor", () => {
  it("aluno com 100% de acerto, rápido, confiante e sem recorrência tem fraqueza baixa", () => {
    const w = computeWeaknessFactor({
      accuracyRate: 1,
      relativeResponseTime: 1,
      declaredConfidence: 5,
      recurrenceCount: 0,
    });
    expect(w).toBeLessThan(0.2);
  });

  it("aluno com 0% de acerto, lento, sem confiança e com recorrência tem fraqueza alta", () => {
    const w = computeWeaknessFactor({
      accuracyRate: 0,
      relativeResponseTime: 2,
      declaredConfidence: 1,
      recurrenceCount: 5,
    });
    expect(w).toBeGreaterThan(0.8);
  });
});

describe("computeReviewUrgency", () => {
  it("revisão em dia (0 dias de atraso) tem urgência mínima", () => {
    expect(computeReviewUrgency(0, 0)).toBeCloseTo(0.1);
  });

  it("revisão atrasada exatamente 1 intervalo satura em 1", () => {
    expect(computeReviewUrgency(1, 0)).toBeCloseTo(1); // intervalo[0] = 1 dia
  });

  it("revisão muito atrasada não ultrapassa 1", () => {
    expect(computeReviewUrgency(100, 4)).toBeLessThanOrEqual(1);
  });
});
