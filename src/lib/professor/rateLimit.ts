/**
 * Limite de uso do Professor por dia — controle de custo simples e ajustável (seção 8 do PROMPT 6).
 * Não é dado pedagógico (não usa Dexie): é só um contador local de infraestrutura, guardado no
 * mesmo fuso do resto do app.
 */
import { todayInExamTimezone } from "@/lib/schedule/dates";

export const PROFESSOR_DAILY_MESSAGE_LIMIT = 60;

const STORAGE_KEY = "transpetro:professor-usage";

interface UsageRecord {
  date: string;
  count: number;
}

function readUsage(): UsageRecord {
  if (typeof window === "undefined") return { date: todayInExamTimezone(), count: 0 };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: todayInExamTimezone(), count: 0 };
    const parsed = JSON.parse(raw) as UsageRecord;
    if (parsed.date !== todayInExamTimezone()) return { date: todayInExamTimezone(), count: 0 };
    return parsed;
  } catch {
    return { date: todayInExamTimezone(), count: 0 };
  }
}

export function getProfessorUsageToday(): { count: number; limit: number; remaining: number } {
  const usage = readUsage();
  return { count: usage.count, limit: PROFESSOR_DAILY_MESSAGE_LIMIT, remaining: Math.max(0, PROFESSOR_DAILY_MESSAGE_LIMIT - usage.count) };
}

export function canSendProfessorMessage(): boolean {
  return readUsage().count < PROFESSOR_DAILY_MESSAGE_LIMIT;
}

export function recordProfessorMessageSent(): void {
  if (typeof window === "undefined") return;
  const usage = readUsage();
  const next: UsageRecord = { date: usage.date, count: usage.count + 1 };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
