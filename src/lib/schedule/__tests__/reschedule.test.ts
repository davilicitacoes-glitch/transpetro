import { describe, expect, it } from "vitest";
import { buildStudyPlan } from "@/lib/schedule/plan";
import { redistributeMissedDay } from "@/lib/schedule/reschedule";

/**
 * Passa `34` explicitamente como `referenceTotalMissions` — testa o MOTOR de redistribuição, não
 * o valor real de TOTAL_MISSIONS (hoje 0, pendente da Fase 2 em config/concurso.ts).
 */
describe("redistributeMissedDay", () => {
  it("redistribui o conteúdo de um dia de missão perdido para os 3 dias seguintes, sem apagar histórico", () => {
    const plan = buildStudyPlan("2026-08-06", 34);
    const firstMissionDay = plan.days.find((d) => d.dayType === "missao");
    expect(firstMissionDay).toBeDefined();
    const missedDate = firstMissionDay!.date;
    const originalMissions = [...firstMissionDay!.missionIndexes];

    const result = redistributeMissedDay(plan, missedDate);

    expect(result.redistributedMissionIndexes).toEqual(originalMissions);
    expect(result.note).toContain(missedDate);

    const updatedMissedDay = result.plan.days.find((d) => d.date === missedDate)!;
    expect(updatedMissedDay.missionIndexes).toHaveLength(0);
    expect(updatedMissedDay.dayType).not.toBe("missao");

    // O total de missões no plano (contagem de índices únicos) não pode diminuir: nada foi apagado.
    const totalIndexesBefore = new Set(plan.days.flatMap((d) => d.missionIndexes));
    const totalIndexesAfter = new Set(result.plan.days.flatMap((d) => d.missionIndexes));
    expect(totalIndexesAfter.size).toBe(totalIndexesBefore.size);
  });

  it("preserva simulados e reta final ao escolher os dias de destino, quando há alternativa", () => {
    const plan = buildStudyPlan("2026-08-06", 34);
    const missionDayIndex = plan.days.findIndex((d) => d.dayType === "missao");
    const missedDate = plan.days[missionDayIndex].date;

    const result = redistributeMissedDay(plan, missedDate);
    const window = plan.days.slice(missionDayIndex + 1, missionDayIndex + 4);
    const hasNonReservedAlternative = window.some((d) => d.dayType !== "reta_final" && d.dayType !== "simulado");

    if (hasNonReservedAlternative) {
      const touchedReservedDays = result.plan.days.filter(
        (d, idx) =>
          idx > missionDayIndex &&
          idx <= missionDayIndex + 3 &&
          (plan.days[idx].dayType === "simulado" || plan.days[idx].dayType === "reta_final") &&
          d.missionIndexes.length > plan.days[idx].missionIndexes.length,
      );
      expect(touchedReservedDays).toHaveLength(0);
    }
  });

  it("dia sem missão não gera redistribuição", () => {
    const plan = buildStudyPlan("2026-08-06", 34);
    const restDay = plan.days.find((d) => d.dayType !== "missao");
    expect(restDay).toBeDefined();
    const result = redistributeMissedDay(plan, restDay!.date);
    expect(result.redistributedMissionIndexes).toHaveLength(0);
  });
});
