import { describe, expect, it, beforeEach } from "vitest";
import { getDB } from "@/lib/db/dexie";
import { recordConfidenceCheckin, computeConfidencePattern } from "@/lib/lab/confidenceJournal";
import { recordAttempt } from "@/lib/pedagogy/service";
import { newIdempotencyKey } from "@/lib/pedagogy/ids";
import { ALL_QUESTIONS } from "@/content/questions";
import { DEFAULT_STUDENT_ID } from "@/lib/models/schema";

const TOPIC = "pt-01-compreensao-textos";
const topicQuestions = ALL_QUESTIONS.filter((q) => q.topicSlug === TOPIC);

async function clearAllTables() {
  const db = getDB();
  await Promise.all(db.tables.map((t) => t.clear()));
}

beforeEach(async () => {
  await clearAllTables();
});

function correctKeyFor(id: string) {
  return ALL_QUESTIONS.find((q) => q.id === id)!.options.find((o) => o.isCorrect)!.key;
}

async function attemptOnDay(day: string, isCorrect: boolean, index: number) {
  const db = getDB();
  const q = topicQuestions[index % topicQuestions.length];
  const correctKey = correctKeyFor(q.id);
  const wrongKey = q.options.find((o) => o.key !== correctKey)!.key;
  const result = await recordAttempt({
    questionId: q.id,
    selectedKey: isCorrect ? correctKey : wrongKey,
    correctKey,
    isCorrect,
    mode: "treino",
    idempotencyKey: newIdempotencyKey(),
  });
  // recordAttempt sempre usa "agora" como createdAt — pra simular dias diferentes nos testes,
  // sobrescreve createdAt direto no registro já salvo (só nos testes; o app real nunca faz isso).
  await db.attempts.update(result.attempt.id, { createdAt: `${day}T10:00:00.000Z` });
}

describe("recordConfidenceCheckin", () => {
  it("salva um check-in real, recuperável do banco", async () => {
    const checkin = await recordConfidenceCheckin("antes", 3, "um pouco ansioso");
    const db = getDB();
    const saved = await db.confidenceCheckins.get(checkin.id);
    expect(saved).toBeDefined();
    expect(saved!.value).toBe(3);
    expect(saved!.studentId).toBe(DEFAULT_STUDENT_ID);
  });
});

describe("computeConfidencePattern", () => {
  it("hasEnoughData é false sem dado suficiente (honesto, não inventa padrão)", async () => {
    await recordConfidenceCheckin("antes", 1);
    const pattern = await computeConfidencePattern();
    expect(pattern.hasEnoughData).toBe(false);
  });

  it("detecta o padrão real quando há dias suficientes dos dois lados", async () => {
    const db = getDB();
    // 3 dias de confiança baixa, com baixa acurácia real.
    for (let i = 0; i < 3; i++) {
      const day = `2026-01-0${i + 1}`;
      const checkin = await recordConfidenceCheckin("antes", 1);
      await db.confidenceCheckins.update(checkin.id, { occurredAt: `${day}T08:00:00.000Z` });
      await attemptOnDay(day, false, i);
      await attemptOnDay(day, false, i + 1);
    }
    // 3 dias de confiança alta, com alta acurácia real.
    for (let i = 0; i < 3; i++) {
      const day = `2026-02-0${i + 1}`;
      const checkin = await recordConfidenceCheckin("antes", 5);
      await db.confidenceCheckins.update(checkin.id, { occurredAt: `${day}T08:00:00.000Z` });
      await attemptOnDay(day, true, i);
      await attemptOnDay(day, true, i + 1);
    }

    const pattern = await computeConfidencePattern();
    expect(pattern.hasEnoughData).toBe(true);
    expect(pattern.lowConfidenceAccuracy).toBe(0);
    expect(pattern.highConfidenceAccuracy).toBe(1);
  });
});
