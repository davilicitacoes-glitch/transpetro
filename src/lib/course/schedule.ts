import { addDays, daysBetween, todayInExamTimezone } from "@/lib/schedule/dates";
import { LAST_STUDY_DATE, TOTAL_MISSIONS } from "@config/concurso";
import type { CourseEnrollment } from "@/lib/models/schema";

const TOTAL_DAYS = TOTAL_MISSIONS;

export interface CourseCalendar {
  /** dateByDay[d] = data ISO (America/Bahia) do dia pedagógico d (1..32). */
  dateByDay: Record<number, string>;
  dayByDate: Record<string, number>;
  /** true quando não há 34 dias corridos disponíveis até LAST_STUDY_DATE e por isso mais de um
   * dia pedagógico teve que compartilhar a mesma data real — alerta honesto, não empilha silenciosamente. */
  overloaded: boolean;
  totalCalendarDays: number;
}

/**
 * Distribui os 34 dias pedagógicos (fixos, versionados) sobre o calendário real disponível entre
 * `startDate` e `LAST_STUDY_DATE`. Nunca reordena/comprime o CONTEÚDO (isso é fixo em COURSE_PLAN_V2) —
 * só recalcula QUANDO cada dia cai no calendário:
 *
 * - Se houver >= 34 dias corridos disponíveis: espalha uniformemente (Dia 1 = startDate,
 *   Dia 32 = LAST_STUDY_DATE), criando folgas naturais nos dias de calendário não usados.
 * - Se houver < 34 dias corridos disponíveis: **não empilha dois dias completos no mesmo dia
 *   silenciosamente além do necessário** — distribui 1:1 o quanto for possível e só comprime os
 *   dias finais (os menos custosos pedagogicamente: revisão/consolidação), sinalizando `overloaded`
 *   para a interface mostrar o alerta exigido pela missão.
 */
export function buildCourseCalendar(enrollment: Pick<CourseEnrollment, "startDate">): CourseCalendar {
  const totalCalendarDays = Math.max(1, daysBetween(enrollment.startDate, LAST_STUDY_DATE, true));
  const dateByDay: Record<number, string> = {};
  const dayByDate: Record<string, number> = {};

  const firstEveDate = addDays(LAST_STUDY_DATE, -1);
  const lastCoreDate = addDays(firstEveDate, -1);
  const coreCalendarDays = Math.max(1, daysBetween(enrollment.startDate, lastCoreDate, true));
  const coreDays = TOTAL_DAYS - 2;

  // Dias 33 e 34 ficam fixos em 11 e 12/09; só os 34 dias anteriores são distribuídos/comprimidos.
  dateByDay[TOTAL_DAYS - 1] = firstEveDate;
  dateByDay[TOTAL_DAYS] = LAST_STUDY_DATE;
  dayByDate[firstEveDate] = TOTAL_DAYS - 1;
  dayByDate[LAST_STUDY_DATE] = TOTAL_DAYS;

  if (coreCalendarDays >= coreDays) {
    for (let day = 1; day <= coreDays; day++) {
      const offset = Math.round(((day - 1) * (coreCalendarDays - 1)) / (coreDays - 1));
      const date = addDays(enrollment.startDate, offset);
      dateByDay[day] = date;
      dayByDate[date] = day;
    }
    return { dateByDay, dayByDate, overloaded: false, totalCalendarDays };
  }

  // Crunch real: menos dias corridos que dias pedagógicos. Cada dia de calendário recebe 1 dia
  // pedagógico até o limite, e o restante (sempre os últimos dias, de menor custo pedagógico —
  // consolidação/reta final) se acumula na última data disponível.
  for (let day = 1; day <= coreDays; day++) {
    const offset = Math.min(day - 1, coreCalendarDays - 1);
    const date = addDays(enrollment.startDate, offset);
    dateByDay[day] = date;
    if (!(date in dayByDate)) dayByDate[date] = day;
  }
  return { dateByDay, dayByDate, overloaded: true, totalCalendarDays };
}

export function scheduledDateForDay(enrollment: Pick<CourseEnrollment, "startDate">, day: number): string {
  return buildCourseCalendar(enrollment).dateByDay[day];
}

/** Data padrão de início: hoje, no fuso da prova. Só usada se o aluno ainda não confirmou uma data. */
export function defaultStartDate(): string {
  return todayInExamTimezone();
}
