import { addDays, daysBetween, todayInExamTimezone, isRestDay } from "@/lib/schedule/dates";
import { LAST_STUDY_DATE, TOTAL_MISSIONS } from "@config/concurso";
import { COURSE_PLAN_V2 } from "@/content/coursePlan";
import type { CourseEnrollment } from "@/lib/models/schema";

const TOTAL_DAYS = TOTAL_MISSIONS;

/** Quantos dos últimos dias do plano são de fase "reta_final" (Fase 2 — revisão, ver
 * docs/CONTINUIDADE_ENSIPETRO.md). Esses dias NÃO são espalhados/comprimidos como os de conteúdo —
 * mapeiam 1:1 para as últimas datas corridas antes de LAST_STUDY_DATE, inclusive. */
const RETA_FINAL_DAYS = COURSE_PLAN_V2.days.filter((d) => d.phase === "reta_final").length;

export interface CourseCalendar {
  /** dateByDay[d] = data ISO (America/Bahia) do dia pedagógico d. */
  dateByDay: Record<number, string>;
  dayByDate: Record<string, number>;
  /** true quando não há dias corridos suficientes até o fim da Fase 1 e por isso mais de um dia
   * pedagógico teve que compartilhar a mesma data real — alerta honesto, não empilha silenciosamente. */
  overloaded: boolean;
  totalCalendarDays: number;
}

/**
 * Distribui os dias pedagógicos (fixos, versionados em `COURSE_PLAN_V2`) sobre o calendário real:
 *
 * - Dias de Fase 2 (fase "reta_final", os últimos `RETA_FINAL_DAYS` do plano) mapeiam 1:1 para as
 *   últimas datas corridas antes de `LAST_STUDY_DATE` (inclusive), **incluindo domingos** — nunca
 *   comprimidos nem pulados, porque são revisão diária, não conteúdo que possa esperar.
 * - Dias de Fase 1 (conteúdo geral) são distribuídos só sobre dias úteis de estudo (segunda a
 *   sábado — domingo é sempre livre, ver `isRestDay`) entre `startDate` e o dia anterior ao início
 *   da Fase 2: se houver dias de estudo suficientes, espalha uniformemente entre eles (nunca cai
 *   num domingo); se não houver, comprime (mais de um dia pedagógico por data real, mas ainda
 *   pulando domingos), sinalizando `overloaded` em vez de inventar uma distribuição irreal.
 */
export function buildCourseCalendar(enrollment: Pick<CourseEnrollment, "startDate">): CourseCalendar {
  const totalCalendarDays = Math.max(1, daysBetween(enrollment.startDate, LAST_STUDY_DATE, true));
  const dateByDay: Record<number, string> = {};
  const dayByDate: Record<string, number> = {};

  const coreDays = TOTAL_DAYS - RETA_FINAL_DAYS;
  const lastCoreDate = addDays(LAST_STUDY_DATE, -RETA_FINAL_DAYS);
  const rawCoreCalendarDays = Math.max(1, daysBetween(enrollment.startDate, lastCoreDate, true));

  // Dias de reta_final (Fase 2): 1:1, sempre nas últimas RETA_FINAL_DAYS datas antes de LAST_STUDY_DATE,
  // incluindo domingos — revisão de véspera não pode esperar um dia útil.
  for (let i = 0; i < RETA_FINAL_DAYS; i++) {
    const day = coreDays + 1 + i;
    const date = addDays(LAST_STUDY_DATE, -(RETA_FINAL_DAYS - 1 - i));
    dateByDay[day] = date;
    dayByDate[date] = day;
  }

  // Lista de dias de ESTUDO (não-domingo) entre startDate e lastCoreDate, na ordem do calendário.
  const studyDates: string[] = [];
  for (let offset = 0; offset < rawCoreCalendarDays; offset++) {
    const date = addDays(enrollment.startDate, offset);
    if (!isRestDay(date)) studyDates.push(date);
  }
  const coreCalendarDays = Math.max(1, studyDates.length);

  if (coreCalendarDays >= coreDays) {
    for (let day = 1; day <= coreDays; day++) {
      const idx = coreDays > 1 ? Math.round(((day - 1) * (coreCalendarDays - 1)) / (coreDays - 1)) : 0;
      const date = studyDates[idx] ?? studyDates[studyDates.length - 1];
      dateByDay[day] = date;
      dayByDate[date] = day;
    }
    return { dateByDay, dayByDate, overloaded: false, totalCalendarDays };
  }

  // Crunch real: menos dias de estudo disponíveis que dias de conteúdo da Fase 1. Cada dia de
  // estudo recebe 1 dia pedagógico até o limite, e o restante se acumula no último dia de estudo
  // disponível — nunca num domingo.
  for (let day = 1; day <= coreDays; day++) {
    const idx = Math.min(day - 1, coreCalendarDays - 1);
    const date = studyDates[idx] ?? studyDates[studyDates.length - 1];
    dateByDay[day] = date;
    if (!(date in dayByDate)) dayByDate[date] = day;
  }
  return { dateByDay, dayByDate, overloaded: true, totalCalendarDays };
}

export function scheduledDateForDay(enrollment: Pick<CourseEnrollment, "startDate">, day: number): string {
  return buildCourseCalendar(enrollment).dateByDay[day];
}

/** Data padrão de início: hoje, no fuso da prova. Só usada se o aluno ainda não confirmou uma
 * data — um aluno real que começa hoje deve começar hoje, não numa data arbitrária. Para a análise
 * de viabilidade do calendário (quantos dias cabem até PHASE_1_END_DATE), este projeto assumiu
 * DEFAULT_COURSE_START_DATE (01/09/2026) como premissa documentada, não como travamento do app —
 * ver docs/CONTINUIDADE_ENSIPETRO.md. */
export function defaultStartDate(): string {
  return todayInExamTimezone();
}
