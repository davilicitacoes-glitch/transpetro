import { EXAM_TIMEZONE, LAST_STUDY_DATE } from "@config/concurso";

/** Data no formato ISO "YYYY-MM-DD", sempre interpretada/exibida no fuso America/Bahia. */
export type IsoDate = string;

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

/** Retorna a data "de hoje" (YYYY-MM-DD) no fuso America/Bahia, independente do fuso do servidor/navegador. */
export function todayInExamTimezone(referenceDate: Date = new Date()): IsoDate {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: EXAM_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  // en-CA locale formats as YYYY-MM-DD
  return formatter.format(referenceDate);
}

function isoToUtcNoon(iso: IsoDate): Date {
  // Meio-dia UTC evita problemas de borda de fuso ao somar/subtrair dias inteiros.
  return new Date(`${iso}T12:00:00Z`);
}

export function addDays(iso: IsoDate, days: number): IsoDate {
  const d = isoToUtcNoon(iso);
  d.setUTCDate(d.getUTCDate() + days);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

/** Número de dias corridos entre duas datas ISO (inclusive em ambas as pontas se `inclusive` for true). */
export function daysBetween(startIso: IsoDate, endIso: IsoDate, inclusive = true): number {
  const start = isoToUtcNoon(startIso).getTime();
  const end = isoToUtcNoon(endIso).getTime();
  const diff = Math.round((end - start) / 86_400_000);
  return inclusive ? diff + 1 : diff;
}

export function isBeforeOrEqual(a: IsoDate, b: IsoDate): boolean {
  return a <= b;
}

export function compareIso(a: IsoDate, b: IsoDate): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** Dias corridos restantes de estudo, do dia de referência (inclusive) até LAST_STUDY_DATE (inclusive). Nunca negativo. */
export function studyDaysRemaining(referenceDate: Date = new Date()): number {
  const today = todayInExamTimezone(referenceDate);
  if (compareIso(today, LAST_STUDY_DATE) > 0) return 0;
  return daysBetween(today, LAST_STUDY_DATE, true);
}

const WEEKDAY_INDEX_SUNDAY_FIRST = 0;
const WEEKDAY_INDEX_SATURDAY = 6;

export function isWeekend(iso: IsoDate): boolean {
  const day = isoToUtcNoon(iso).getUTCDay();
  return day === WEEKDAY_INDEX_SUNDAY_FIRST || day === WEEKDAY_INDEX_SATURDAY;
}

export function formatDateBR(iso: IsoDate): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
