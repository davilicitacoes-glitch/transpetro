import type { StudyPlan, StudyPlanDay } from "@/lib/schedule/plan";
import type { IsoDate } from "@/lib/schedule/dates";

export interface RescheduleResult {
  plan: StudyPlan;
  note: string;
  redistributedMissionIndexes: number[];
}

/**
 * Redistribui o conteúdo essencial de um dia perdido entre os três dias seguintes do plano,
 * sem apagar histórico e sem empurrar tudo cegamente para o dia seguinte. Simulados e a reta
 * final (`reta_final`) são preservados como estão — só recebem conteúdo redistribuído se não
 * houver nenhum outro dia disponível na janela de 3 dias.
 */
export function redistributeMissedDay(plan: StudyPlan, missedDate: IsoDate): RescheduleResult {
  const missedIndex = plan.days.findIndex((d) => d.date === missedDate);
  if (missedIndex === -1) {
    return { plan, note: `Data ${missedDate} não encontrada no plano atual.`, redistributedMissionIndexes: [] };
  }

  const missedDay = plan.days[missedIndex];
  if (missedDay.dayType !== "missao" || missedDay.missionIndexes.length === 0) {
    return { plan, note: `Nenhum conteúdo de missão a redistribuir em ${missedDate}.`, redistributedMissionIndexes: [] };
  }

  const candidateWindow = plan.days.slice(missedIndex + 1, missedIndex + 4);
  const preferredTargets = candidateWindow.filter((d) => d.dayType !== "reta_final" && d.dayType !== "simulado");
  const targets = preferredTargets.length > 0 ? preferredTargets : candidateWindow;

  if (targets.length === 0) {
    return {
      plan,
      note: `Não há dias seguintes disponíveis para redistribuir ${missedDate}; conteúdo mantido como pendência no caderno de erros/fila de revisão.`,
      redistributedMissionIndexes: [],
    };
  }

  const toRedistribute = [...missedDay.missionIndexes];
  const updatedDays: StudyPlanDay[] = plan.days.map((d) => ({ ...d, missionIndexes: [...d.missionIndexes] }));

  updatedDays[missedIndex] = { ...updatedDays[missedIndex], missionIndexes: [], missionIndex: null, dayType: "revisao" };

  let cursor = 0;
  for (const missionIndex of toRedistribute) {
    const targetDate = targets[cursor % targets.length].date;
    const targetDayIdx = updatedDays.findIndex((d) => d.date === targetDate);
    updatedDays[targetDayIdx].missionIndexes.push(missionIndex);
    if (updatedDays[targetDayIdx].missionIndex === null) {
      updatedDays[targetDayIdx] = { ...updatedDays[targetDayIdx], missionIndex: missionIndex, dayType: "missao" };
    }
    cursor++;
  }

  const targetDatesLabel = [...new Set(targets.map((t) => t.date))].join(", ");
  const note =
    `Dia ${missedDate} perdido: ${toRedistribute.length} bloco(s) essencial(is) redistribuído(s) entre ${targetDatesLabel}, ` +
    `preservando simulados e a reta final.`;

  return {
    plan: { ...plan, days: updatedDays },
    note,
    redistributedMissionIndexes: toRedistribute,
  };
}
