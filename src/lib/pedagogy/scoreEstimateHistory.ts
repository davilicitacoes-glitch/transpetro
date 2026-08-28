import { getDB } from "@/lib/db/dexie";
import { newId, nowIso } from "@/lib/pedagogy/ids";
import { todayInExamTimezone, addDays, compareIso } from "@/lib/schedule/dates";
import { DEFAULT_STUDENT_ID, type ScoreEstimateSnapshot } from "@/lib/models/schema";
import type { ScoreEstimate } from "@/lib/pedagogy/scoreEstimate";

/**
 * Histórico real da nota estimada (missão "Método Vetor", seção 2) — grava no MÁXIMO 1 snapshot
 * por aluno por dia (upsert por `[studentId+date]`), o suficiente pra comparar "hoje" com "7 dias
 * atrás" e "30 dias atrás" sem reconstruir histórico que o app nunca gravou. Sem snapshot antigo o
 * bastante, a tendência não é mostrada — nunca inventada a partir de menos dado do que existe.
 */
export async function recordScoreEstimateSnapshot(
  estimate: ScoreEstimate,
  trigger: ScoreEstimateSnapshot["trigger"] = "regular",
  studentId = DEFAULT_STUDENT_ID,
): Promise<void> {
  if (!estimate.hasEnoughData) return; // nada de gravar um "0" só porque ainda não há dado real.
  const db = getDB();
  const date = todayInExamTimezone();
  const existing = await db.scoreEstimateSnapshots.where({ studentId, date }).first();
  const now = nowIso();
  const snapshot: ScoreEstimateSnapshot = {
    id: existing?.id ?? newId("score-snapshot"),
    studentId,
    date,
    extrapolatedPoints: estimate.extrapolatedPoints,
    pointsWithData: estimate.pointsWithData,
    knownAccuracy: estimate.knownAccuracy,
    trigger,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
  await db.scoreEstimateSnapshots.put(snapshot);
}

export interface ScoreEstimateTrend {
  sevenDaysAgo: number | null;
  thirtyDaysAgo: number | null;
}

/** Ponto de comparação mais próximo, NA OU ANTES da data-alvo (nunca depois — senão a "tendência de
 * 7 dias" poderia comparar com um snapshot de ontem e mentir sobre o intervalo real). */
function closestOnOrBefore(snapshots: ScoreEstimateSnapshot[], targetDate: string): ScoreEstimateSnapshot | null {
  const eligible = snapshots.filter((s) => compareIso(s.date, targetDate) <= 0);
  if (eligible.length === 0) return null;
  return eligible.sort((a, b) => compareIso(b.date, a.date))[0];
}

export async function getScoreEstimateTrend(studentId = DEFAULT_STUDENT_ID): Promise<ScoreEstimateTrend> {
  const db = getDB();
  const snapshots = await db.scoreEstimateSnapshots.where("studentId").equals(studentId).toArray();
  const today = todayInExamTimezone();
  const sevenAgoTarget = addDays(today, -7);
  const thirtyAgoTarget = addDays(today, -30);
  return {
    sevenDaysAgo: closestOnOrBefore(snapshots, sevenAgoTarget)?.extrapolatedPoints ?? null,
    thirtyDaysAgo: closestOnOrBefore(snapshots, thirtyAgoTarget)?.extrapolatedPoints ?? null,
  };
}

/**
 * Comparação anônima entre alunos (missão "Método Vetor", seção 2, item 4) — NÃO implementada
 * agora: este app é local-first (IndexedDB por dispositivo, sem backend agregando dados entre
 * contas) e hoje só há 1 aluno real usando o produto. Calcular um percentil de verdade exigiria um
 * backend agregando `scoreEstimateSnapshots` de VÁRIOS alunos, que não existe ainda — fingir um
 * percentil aqui seria inventar dado, exatamente o que a missão proíbe.
 *
 * O que já está pronto pra quando isso escalar: `ScoreEstimateSnapshot` é um registro compacto e
 * já normalizado (`extrapolatedPoints`, por aluno, por dia) — exatamente a forma que uma futura
 * função de percentil precisaria consumir de um backend agregador. Só falta o backend; o formato
 * do dado não precisa ser reescrito.
 */
export async function computePercentileAmongStudents(_studentId = DEFAULT_STUDENT_ID): Promise<number | null> {
  return null;
}
