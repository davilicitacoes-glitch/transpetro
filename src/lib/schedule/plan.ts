import { LAST_STUDY_DATE, TOTAL_MISSIONS } from "@config/concurso";
import { addDays, daysBetween, type IsoDate } from "@/lib/schedule/dates";

export type MacroPhase = "base_diagnostico" | "cobertura_acelerada" | "consolidacao" | "reta_final";

export type DayType = "missao" | "simulado" | "revisao" | "reta_final" | "descanso";

export interface StudyPlanDay {
  date: IsoDate;
  /** 1-based. `null` em dias que não carregam uma missão numerada (reserva de reta final, por ex.). */
  missionIndex: number | null;
  /** Quando o plano está comprimido, mais de uma missão pode ocupar o mesmo dia. */
  missionIndexes: number[];
  phase: MacroPhase | null;
  dayType: DayType;
  needsEssaySession: boolean;
}

export interface StudyPlan {
  startDate: IsoDate;
  lastStudyDate: IsoDate;
  availableDays: number;
  missionCount: number;
  compressed: boolean;
  compressionNote: string | null;
  simuladoCount: number;
  essaySessionCount: number;
  days: StudyPlanDay[];
}

const PHASE_BOUNDARIES: Array<{ phase: MacroPhase; upperFraction: number }> = [
  { phase: "base_diagnostico", upperFraction: 0.25 },
  { phase: "cobertura_acelerada", upperFraction: 0.65 },
  { phase: "consolidacao", upperFraction: 0.85 },
  { phase: "reta_final", upperFraction: 1.0 },
];

function phaseForMission(missionIndex: number, missionCount: number): MacroPhase {
  if (missionCount <= 0) return "reta_final";
  const fraction = missionIndex / missionCount;
  for (const boundary of PHASE_BOUNDARIES) {
    if (fraction <= boundary.upperFraction) return boundary.phase;
  }
  return "reta_final";
}

const RESERVED_REVIEW_DAYS = 2;
const TARGET_SIMULADOS = 5;
const TARGET_ESSAY_SESSIONS = 8;

/**
 * Gera o calendário de missões entre `startDate` (inclusive) e `LAST_STUDY_DATE` (inclusive).
 * Os últimos `RESERVED_REVIEW_DAYS` dias corridos são sempre reserva de reta final (sem conteúdo novo pesado).
 * As missões restantes são distribuídas de forma uniforme; se a janela for menor que `TOTAL_MISSIONS`,
 * o plano é comprimido (mais de uma missão por dia). Se for maior, os dias excedentes viram
 * simulados/revisão/descanso.
 */
export function buildStudyPlan(startDate: IsoDate, referenceTotalMissions = TOTAL_MISSIONS): StudyPlan {
  const lastStudyDate = LAST_STUDY_DATE;
  const availableDays = Math.max(0, daysBetween(startDate, lastStudyDate, true));

  if (availableDays === 0) {
    return {
      startDate,
      lastStudyDate,
      availableDays: 0,
      missionCount: 0,
      compressed: false,
      compressionNote: `Fora da janela de estudo: a data de início é posterior ao último dia de estudo (${lastStudyDate}).`,
      simuladoCount: 0,
      essaySessionCount: 0,
      days: [],
    };
  }

  const reservedDays = Math.min(RESERVED_REVIEW_DAYS, availableDays);
  const workableDays = availableDays - reservedDays;
  const missionCount = Math.max(0, Math.min(referenceTotalMissions, workableDays));
  const compressed = workableDays > 0 && workableDays < referenceTotalMissions;

  const compressionNote = compressed
    ? `Janela real de estudo (${availableDays} dias corridos) é menor que ${referenceTotalMissions} missões. ` +
      `O plano foi comprimido para ${missionCount} missões (uma por dia útil disponível), cada uma cobrindo mais conteúdo por sessão, preservando os ${reservedDays} últimos dias como reta final.`
    : workableDays > referenceTotalMissions
      ? `Janela real (${availableDays} dias corridos) é maior que ${referenceTotalMissions} missões. ` +
        `Os ${workableDays - referenceTotalMissions} dias excedentes foram usados como folgas técnicas, revisão extra e simulados.`
      : null;

  const days: StudyPlanDay[] = [];

  // Índice de cada missão -> dia de trabalho (0-based dentro de workableDays), distribuído uniformemente.
  // Espalha missionCount missões uniformemente dentro de workableDays dias. Como missionCount = min(referenceTotalMissions,
  // workableDays), workableDays >= missionCount sempre é verdade, então cada dia recebe no máximo 1 missão nova.
  const missionToWorkDayIndex = new Map<number, number>();
  if (missionCount > 0 && workableDays > 0) {
    for (let m = 0; m < missionCount; m++) {
      const workDayIndex = Math.floor((m * workableDays) / missionCount);
      missionToWorkDayIndex.set(m, Math.min(workDayIndex, workableDays - 1));
    }
  }

  // Inverte o mapa: para cada dia de trabalho, quais missões (1-based) caem nele.
  const workDayToMissions = new Map<number, number[]>();
  for (const [missionZeroBased, workDayIndex] of missionToWorkDayIndex.entries()) {
    const list = workDayToMissions.get(workDayIndex) ?? [];
    list.push(missionZeroBased + 1);
    workDayToMissions.set(workDayIndex, list);
  }

  // Dias de trabalho sem missão (só existem quando não comprimido e há excedente) recebem simulado/revisão/descanso.
  const surplusWorkDays: number[] = [];
  for (let w = 0; w < workableDays; w++) {
    if (!workDayToMissions.has(w)) surplusWorkDays.push(w);
  }

  // Distribui os simulados preferencialmente nas fases finais (últimos 60% dos dias excedentes).
  const simuladoWorkDays = new Set<number>();
  const essayWorkDaysExtra = new Set<number>();
  if (surplusWorkDays.length > 0) {
    const simuladoTarget = Math.min(TARGET_SIMULADOS, surplusWorkDays.length);
    const startFrom = Math.floor(surplusWorkDays.length * 0.4);
    const pool = surplusWorkDays.slice(startFrom).length >= simuladoTarget ? surplusWorkDays.slice(startFrom) : surplusWorkDays;
    for (let i = 0; i < simuladoTarget; i++) {
      const idx = Math.floor((i * pool.length) / simuladoTarget);
      simuladoWorkDays.add(pool[idx]);
    }
  }

  let essaySessionCount = 0;
  const essayCadence = missionCount > 0 ? Math.max(2, Math.round(missionCount / TARGET_ESSAY_SESSIONS)) : 0;

  for (let w = 0; w < workableDays; w++) {
    const date = addDays(startDate, w);
    const missions = workDayToMissions.get(w) ?? [];
    const isSimulado = simuladoWorkDays.has(w) && missions.length === 0;
    let dayType: DayType = "revisao";
    if (missions.length > 0) dayType = "missao";
    else if (isSimulado) dayType = "simulado";
    else dayType = "descanso";

    const primaryMissionIndex = missions.length > 0 ? missions[0] : null;
    const phase = primaryMissionIndex !== null ? phaseForMission(primaryMissionIndex, missionCount) : null;

    let needsEssaySession = false;
    if (missions.length > 0 && essayCadence > 0 && essaySessionCount < TARGET_ESSAY_SESSIONS) {
      const isEssayMission = primaryMissionIndex !== null && primaryMissionIndex % essayCadence === 0;
      if (isEssayMission) {
        needsEssaySession = true;
        essaySessionCount++;
      }
    }

    days.push({
      date,
      missionIndex: primaryMissionIndex,
      missionIndexes: missions,
      phase,
      dayType,
      needsEssaySession,
    });
  }

  // Garante ao menos TARGET_ESSAY_SESSIONS mesmo em janelas curtas: preenche nos últimos dias de missão restantes.
  if (essaySessionCount < TARGET_ESSAY_SESSIONS) {
    for (let i = days.length - 1; i >= 0 && essaySessionCount < TARGET_ESSAY_SESSIONS; i--) {
      const day = days[i];
      if (day.dayType === "missao" && !day.needsEssaySession) {
        day.needsEssaySession = true;
        essaySessionCount++;
      }
    }
  }

  // Últimos RESERVED_REVIEW_DAYS dias corridos: reta final, sem conteúdo novo pesado.
  for (let r = 0; r < reservedDays; r++) {
    const date = addDays(lastStudyDate, -(reservedDays - 1 - r));
    days.push({
      date,
      missionIndex: null,
      missionIndexes: [],
      phase: "reta_final",
      dayType: "reta_final",
      needsEssaySession: false,
    });
  }

  const simuladoCount = days.filter((d) => d.dayType === "simulado").length;

  return {
    startDate,
    lastStudyDate,
    availableDays,
    missionCount,
    compressed,
    compressionNote,
    simuladoCount,
    essaySessionCount,
    days,
  };
}
