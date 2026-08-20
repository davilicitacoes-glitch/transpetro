import { describe, expect, it } from "vitest";
import { buildStudyPlan } from "@/lib/schedule/plan";
import { LAST_STUDY_DATE } from "@config/concurso";

/**
 * Estes testes validam o MOTOR de geração de cronograma (buildStudyPlan), não os valores reais do
 * concurso da Transpetro (ainda pendentes — ver config/concurso.ts). Por isso passam explicitamente
 * `referenceTotalMissions` em vez de depender de TOTAL_MISSIONS (hoje 0, aguardando a Fase 2).
 */
const TEST_MISSION_COUNT = 34;

describe("buildStudyPlan", () => {
  it("nunca agenda nenhum dia após o último dia de estudo configurado", () => {
    const plan = buildStudyPlan("2026-08-06", TEST_MISSION_COUNT);
    for (const day of plan.days) {
      expect(day.date <= LAST_STUDY_DATE).toBe(true);
    }
    if (plan.days.length > 0) {
      expect(plan.days.at(-1)?.date).toBe(LAST_STUDY_DATE);
    }
  });

  it("os últimos 2 dias corridos são sempre reta_final, sem missão nova (quando há dias suficientes)", () => {
    const plan = buildStudyPlan("2026-08-06", TEST_MISSION_COUNT);
    if (plan.days.length < 2) return;
    const lastTwo = plan.days.slice(-2);
    for (const day of lastTwo) {
      expect(day.dayType).toBe("reta_final");
      expect(day.missionIndex).toBeNull();
    }
  });

  it("com janela ampla, gera exatamente o total de missões pedido e não comprime", () => {
    const plan = buildStudyPlan("2026-08-06", TEST_MISSION_COUNT);
    if (plan.availableDays < TEST_MISSION_COUNT + 2) return; // janela insuficiente para este cenário
    expect(plan.compressed).toBe(false);
    const missionDays = plan.days.filter((d) => d.dayType === "missao");
    const allMissionIndexes = new Set(missionDays.flatMap((d) => d.missionIndexes));
    expect(allMissionIndexes.size).toBe(TEST_MISSION_COUNT);
  });

  it("data de início posterior ao último dia de estudo retorna plano vazio com explicação", () => {
    const afterLastStudy = new Date(LAST_STUDY_DATE);
    afterLastStudy.setDate(afterLastStudy.getDate() + 10);
    const startDate = afterLastStudy.toISOString().slice(0, 10);
    const plan = buildStudyPlan(startDate, TEST_MISSION_COUNT);
    expect(plan.days).toHaveLength(0);
    expect(plan.missionCount).toBe(0);
    expect(plan.compressionNote).toContain("Fora da janela");
  });

  it("com janela curta, comprime o plano e explica em compressionNote", () => {
    const shortStart = new Date(LAST_STUDY_DATE);
    shortStart.setDate(shortStart.getDate() - 5);
    const startDate = shortStart.toISOString().slice(0, 10);
    const plan = buildStudyPlan(startDate, TEST_MISSION_COUNT);
    if (plan.availableDays === 0) return;
    expect(plan.compressed).toBe(true);
    expect(plan.compressionNote).toBeTruthy();
    expect(plan.missionCount).toBeLessThanOrEqual(TEST_MISSION_COUNT);
    const allMissionIndexes = new Set(plan.days.flatMap((d) => d.missionIndexes));
    expect(allMissionIndexes.size).toBe(plan.missionCount);
  });

  it("as missões são distribuídas nas 4 macrofases em ordem crescente", () => {
    const plan = buildStudyPlan("2026-08-06", TEST_MISSION_COUNT);
    const phasesInOrder = plan.days
      .filter((d) => d.dayType === "missao")
      .map((d) => d.phase);
    const order = ["base_diagnostico", "cobertura_acelerada", "consolidacao", "reta_final"];
    let lastSeenIndex = -1;
    for (const phase of phasesInOrder) {
      const idx = order.indexOf(phase as string);
      expect(idx).toBeGreaterThanOrEqual(lastSeenIndex);
      lastSeenIndex = idx;
    }
  });
});
