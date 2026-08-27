import { describe, expect, it, beforeEach } from "vitest";
import { getDB } from "@/lib/db/dexie";
import { recordAttempt } from "@/lib/pedagogy/service";
import { computeScoreEstimate } from "@/lib/pedagogy/scoreEstimate";
import { ALL_QUESTIONS } from "@/content/questions";
import { newIdempotencyKey } from "@/lib/pedagogy/ids";
import { DEFAULT_STUDENT_ID } from "@/lib/models/schema";

const TOPIC = "pt-01-compreensao-textos";
const topicQuestions = ALL_QUESTIONS.filter((q) => q.topicSlug === TOPIC);

async function clearAllTables() {
  const db = getDB();
  await Promise.all(db.tables.map((t) => t.clear()));
}

async function answer(questionId: string, correct: boolean) {
  const question = ALL_QUESTIONS.find((q) => q.id === questionId)!;
  const correctKey = question.options.find((o) => o.isCorrect)!.key;
  const wrongKey = question.options.find((o) => !o.isCorrect)!.key;
  return recordAttempt({
    questionId,
    selectedKey: correct ? correctKey : wrongKey,
    correctKey,
    isCorrect: correct,
    mode: "treino",
    idempotencyKey: newIdempotencyKey(),
  });
}

beforeEach(async () => {
  await clearAllTables();
});

describe("computeScoreEstimate (Motor 3 — previsão de nota e priorização)", () => {
  it("real question bank has enough distinct questions for this topic to run the test", () => {
    expect(topicQuestions.length).toBeGreaterThanOrEqual(5);
  });

  it("reports hasEnoughData=false and no fabricated score with zero attempts", async () => {
    const estimate = await computeScoreEstimate(DEFAULT_STUDENT_ID);
    expect(estimate.hasEnoughData).toBe(false);
    expect(estimate.pointsWithData).toBe(0);
    expect(estimate.extrapolatedPoints).toBe(0);
    // todo código aparece no detalhamento, mesmo sem dado — a UI decide como mostrar "sem dado".
    expect(estimate.perCode.length).toBe(39);
  });

  it("marks a topic as having enough data only after MIN_ATTEMPTS_FOR_SIGNAL real attempts", async () => {
    for (let i = 0; i < 2; i++) await answer(topicQuestions[i].id, true);
    let estimate = await computeScoreEstimate(DEFAULT_STUDENT_ID);
    let code = estimate.perCode.find((c) => c.topicSlug === TOPIC)!;
    expect(code.hasEnoughData).toBe(false);

    await answer(topicQuestions[2].id, true);
    estimate = await computeScoreEstimate(DEFAULT_STUDENT_ID);
    code = estimate.perCode.find((c) => c.topicSlug === TOPIC)!;
    expect(code.hasEnoughData).toBe(true);
    expect(estimate.hasEnoughData).toBe(true);
  });

  it("produces a lower estimate when the same topic is answered mostly wrong", async () => {
    for (let i = 0; i < Math.min(5, topicQuestions.length); i++) await answer(topicQuestions[i].id, true);
    const goodEstimate = await computeScoreEstimate(DEFAULT_STUDENT_ID);

    await clearAllTables();
    for (let i = 0; i < Math.min(5, topicQuestions.length); i++) await answer(topicQuestions[i].id, false);
    const badEstimate = await computeScoreEstimate(DEFAULT_STUDENT_ID);

    expect(goodEstimate.knownAccuracy).toBeGreaterThan(badEstimate.knownAccuracy);
    expect(goodEstimate.extrapolatedPoints).toBeGreaterThan(badEstimate.extrapolatedPoints);
  });

  it("gives a topic answered mostly wrong a higher priority score than the same topic answered mostly right", async () => {
    for (let i = 0; i < Math.min(5, topicQuestions.length); i++) await answer(topicQuestions[i].id, false);
    const weakEstimate = await computeScoreEstimate(DEFAULT_STUDENT_ID);
    const weakScore = weakEstimate.perCode.find((c) => c.topicSlug === TOPIC)!.priorityScore;

    await clearAllTables();
    for (let i = 0; i < Math.min(5, topicQuestions.length); i++) await answer(topicQuestions[i].id, true);
    const strongEstimate = await computeScoreEstimate(DEFAULT_STUDENT_ID);
    const strongScore = strongEstimate.perCode.find((c) => c.topicSlug === TOPIC)!.priorityScore;

    expect(weakScore).toBeGreaterThan(strongScore);
    // o forte (>= 80% de acerto, com dado suficiente) não entra mais na lista de prioridade — o
    // fraco pode ou não entrar no top 5 global (depende do peso do código na prova), então só a
    // exclusão do dominado é verificada aqui.
    expect(strongEstimate.topPriority.some((c) => c.topicSlug === TOPIC)).toBe(false);
  });

  it("never lets extrapolatedPoints exceed totalPoints", async () => {
    for (let i = 0; i < Math.min(5, topicQuestions.length); i++) await answer(topicQuestions[i].id, true);
    const estimate = await computeScoreEstimate(DEFAULT_STUDENT_ID);
    expect(estimate.extrapolatedPoints).toBeLessThanOrEqual(estimate.totalPoints);
  });
});
