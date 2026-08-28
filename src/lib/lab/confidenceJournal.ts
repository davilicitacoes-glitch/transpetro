import { getDB } from "@/lib/db/dexie";
import { newId, nowIso } from "@/lib/pedagogy/ids";
import { DEFAULT_STUDENT_ID, type ConfidenceCheckin, type ConfidenceCheckinMoment } from "@/lib/models/schema";

/**
 * Diário de confiança emocional (Laboratório, ferramenta 2.8) — check-in OPCIONAL de 1-5 antes/
 * depois de estudar, cruzado com desempenho real (attempts) pra sugerir um padrão, quando houver
 * dado suficiente. Nunca é diagnóstico clínico — só um espelho do que o próprio aluno registrou.
 */
export async function recordConfidenceCheckin(
  moment: ConfidenceCheckinMoment,
  value: number,
  note?: string,
  studentId = DEFAULT_STUDENT_ID,
): Promise<ConfidenceCheckin> {
  const db = getDB();
  const now = nowIso();
  const checkin: ConfidenceCheckin = {
    id: newId("checkin"),
    studentId,
    moment,
    value,
    note: note?.trim() || undefined,
    occurredAt: now,
    createdAt: now,
    updatedAt: now,
  };
  await db.confidenceCheckins.put(checkin);
  return checkin;
}

export interface ConfidencePattern {
  hasEnoughData: boolean;
  daysAnalyzed: number;
  /** Acurácia média (0-1) nos dias em que a confiança registrada foi baixa (<=2). */
  lowConfidenceAccuracy: number | null;
  /** Acurácia média (0-1) nos dias em que a confiança registrada foi alta (>=4). */
  highConfidenceAccuracy: number | null;
  lowConfidenceDayCount: number;
  highConfidenceDayCount: number;
}

const MIN_DAYS_WITH_BOTH = 5;
/** Precisa de pelo menos 2 dias de cada lado (baixa/alta confiança) pra a comparação significar algo. */
const MIN_DAYS_PER_SIDE = 2;

/** Cruza, por DIA (não por sessão exata — o app não garante granularidade menor de forma
 * confiável), a confiança auto-declarada com a acurácia real das tentativas daquele dia. Só
 * conta como "sinal" quando há dado suficiente dos dois lados — do contrário, honesto
 * `hasEnoughData: false`, sem forçar um padrão a partir de 1-2 dias. */
export async function computeConfidencePattern(studentId = DEFAULT_STUDENT_ID): Promise<ConfidencePattern> {
  const db = getDB();
  const [checkins, attempts] = await Promise.all([
    db.confidenceCheckins.where("studentId").equals(studentId).toArray(),
    db.attempts.where("studentId").equals(studentId).toArray(),
  ]);

  const dayOf = (iso: string) => iso.slice(0, 10);

  const accuracyByDay = new Map<string, { correct: number; total: number }>();
  for (const a of attempts) {
    const day = dayOf(a.createdAt);
    const entry = accuracyByDay.get(day) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (a.isCorrect) entry.correct += 1;
    accuracyByDay.set(day, entry);
  }

  // Confiança média por dia (pode ter check-in de manhã e à noite, por exemplo).
  const confidenceByDay = new Map<string, { sum: number; count: number }>();
  for (const c of checkins) {
    const day = dayOf(c.occurredAt);
    const entry = confidenceByDay.get(day) ?? { sum: 0, count: 0 };
    entry.sum += c.value;
    entry.count += 1;
    confidenceByDay.set(day, entry);
  }

  const daysWithBoth = [...confidenceByDay.keys()].filter((day) => accuracyByDay.has(day));

  let lowSum = 0;
  let lowCount = 0;
  let highSum = 0;
  let highCount = 0;
  for (const day of daysWithBoth) {
    const avgConfidence = confidenceByDay.get(day)!.sum / confidenceByDay.get(day)!.count;
    const dayAccuracy = accuracyByDay.get(day)!.correct / accuracyByDay.get(day)!.total;
    if (avgConfidence <= 2) {
      lowSum += dayAccuracy;
      lowCount += 1;
    } else if (avgConfidence >= 4) {
      highSum += dayAccuracy;
      highCount += 1;
    }
  }

  const hasEnoughData = daysWithBoth.length >= MIN_DAYS_WITH_BOTH && lowCount >= MIN_DAYS_PER_SIDE && highCount >= MIN_DAYS_PER_SIDE;

  return {
    hasEnoughData,
    daysAnalyzed: daysWithBoth.length,
    lowConfidenceAccuracy: lowCount > 0 ? lowSum / lowCount : null,
    highConfidenceAccuracy: highCount > 0 ? highSum / highCount : null,
    lowConfidenceDayCount: lowCount,
    highConfidenceDayCount: highCount,
  };
}
