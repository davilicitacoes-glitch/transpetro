import type { CourseDayOverviewEntry } from "@/lib/course/service";
import { addDays } from "@/lib/schedule/dates";

/**
 * Sequência de dias seguidos com pelo menos uma etapa concluída — só leitura, não grava nada.
 * Conta pra trás a partir de hoje; se hoje ainda não teve nenhuma conclusão, começa a contagem
 * ontem (não zera o streak só porque o aluno ainda não abriu o app hoje). Usa a data de conclusão
 * de QUALQUER etapa (`completedAt` de cada CourseDayOverviewEntry), não a data agendada do dia —
 * um dia estudado fora da ordem/adiantado ainda conta pro streak de verdade.
 */
export function computeStudyStreak(entries: CourseDayOverviewEntry[], todayIso: string): number {
  const completedDates = new Set(
    entries.filter((e) => e.completedAt).map((e) => e.completedAt!.slice(0, 10)),
  );
  let streak = 0;
  let cursor = todayIso;
  if (!completedDates.has(cursor)) cursor = addDays(cursor, -1);
  while (completedDates.has(cursor)) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}
