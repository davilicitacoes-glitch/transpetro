import { describe, expect, it, beforeEach } from "vitest";
import { getDB } from "@/lib/db/dexie";
import { recordAttempt } from "@/lib/pedagogy/service";
import { ALL_QUESTIONS } from "@/content/questions";
import { newIdempotencyKey } from "@/lib/pedagogy/ids";
import { DEFAULT_STUDENT_ID } from "@/lib/models/schema";

/**
 * Motor 1 (repetição espaçada) — cobre o gatilho de revisão por "sinal fraco num acerto" (baixa
 * confiança declarada, ou tempo de resposta muito acima do próprio histórico), acrescentado em
 * `recordAttempt` (src/lib/pedagogy/service.ts) para a missão "Motores adaptativos". O caminho de
 * "errou -> abre dificuldade -> agenda revisão" já existia e continua coberto pelo restante da
 * suíte de serviço (atualmente `describe.skip`, ver pendência em docs/CONTINUIDADE_ENSIPETRO.md).
 */
const TOPIC = "pt-01-compreensao-textos";
const topicQuestions = ALL_QUESTIONS.filter((q) => q.topicSlug === TOPIC);

async function clearAllTables() {
  const db = getDB();
  await Promise.all(db.tables.map((t) => t.clear()));
}

function correctAnswerFor(questionId: string) {
  const question = ALL_QUESTIONS.find((q) => q.id === questionId)!;
  return question.options.find((o) => o.isCorrect)!.key;
}

beforeEach(async () => {
  await clearAllTables();
});

describe("recordAttempt — revisão por sinal fraco em acerto", () => {
  it("real question bank has enough questions for this topic to run the test", () => {
    expect(topicQuestions.length).toBeGreaterThanOrEqual(4);
  });

  it("does NOT schedule a review on a correct, confident, normal-speed first attempt", async () => {
    const result = await recordAttempt({
      questionId: topicQuestions[0].id,
      selectedKey: correctAnswerFor(topicQuestions[0].id),
      correctKey: correctAnswerFor(topicQuestions[0].id),
      isCorrect: true,
      mode: "treino",
      confidence: 5,
      responseTimeMs: 8000,
      idempotencyKey: newIdempotencyKey(),
    });
    expect(result.reviewScheduled).toBeNull();
  });

  it("schedules a review on a correct answer with low declared confidence", async () => {
    const result = await recordAttempt({
      questionId: topicQuestions[0].id,
      selectedKey: correctAnswerFor(topicQuestions[0].id),
      correctKey: correctAnswerFor(topicQuestions[0].id),
      isCorrect: true,
      mode: "treino",
      confidence: 1,
      idempotencyKey: newIdempotencyKey(),
    });
    expect(result.reviewScheduled).not.toBeNull();
    expect(result.reviewScheduled?.reason).toBe("baixa_confianca");
    expect(result.reviewScheduled?.itemType).toBe("topic");
    expect(result.reviewScheduled?.itemId).toBe(TOPIC);
  });

  it("does NOT trigger the slow-response signal without enough prior history on the topic", async () => {
    // primeira tentativa no tópico: não há média histórica pra comparar ainda.
    const result = await recordAttempt({
      questionId: topicQuestions[0].id,
      selectedKey: correctAnswerFor(topicQuestions[0].id),
      correctKey: correctAnswerFor(topicQuestions[0].id),
      isCorrect: true,
      mode: "treino",
      confidence: 5,
      responseTimeMs: 999999, // absurdamente lento, mas ainda não há histórico
      idempotencyKey: newIdempotencyKey(),
    });
    expect(result.reviewScheduled).toBeNull();
  });

  it("triggers the slow-response signal once there is enough fast history and a slow outlier appears", async () => {
    // 3 tentativas rápidas primeiro, pra formar um histórico real no tópico.
    for (let i = 0; i < 3; i++) {
      await recordAttempt({
        questionId: topicQuestions[i].id,
        selectedKey: correctAnswerFor(topicQuestions[i].id),
        correctKey: correctAnswerFor(topicQuestions[i].id),
        isCorrect: true,
        mode: "treino",
        confidence: 5,
        responseTimeMs: 5000,
        idempotencyKey: newIdempotencyKey(),
      });
    }
    // 4ª tentativa, bem mais lenta que a média histórica (5000ms) — deve disparar.
    const slowQuestion = topicQuestions[3] ?? topicQuestions[0];
    const result = await recordAttempt({
      questionId: slowQuestion.id,
      selectedKey: correctAnswerFor(slowQuestion.id),
      correctKey: correctAnswerFor(slowQuestion.id),
      isCorrect: true,
      mode: "treino",
      confidence: 5,
      responseTimeMs: 20000,
      idempotencyKey: newIdempotencyKey(),
    });
    expect(result.reviewScheduled).not.toBeNull();
    expect(result.reviewScheduled?.reason).toBe("esquecimento");
  });
});
