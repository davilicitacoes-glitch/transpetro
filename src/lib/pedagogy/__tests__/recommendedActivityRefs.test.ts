import { describe, expect, it, beforeEach } from "vitest";
import { getDB } from "@/lib/db/dexie";
import { recordAttempt } from "@/lib/pedagogy/service";
import { ALL_QUESTIONS } from "@/content/questions";
import { newIdempotencyKey } from "@/lib/pedagogy/ids";

/**
 * Motor 1 — "toda revisão programada precisa aparecer... com o material certo já linkado"
 * (missão "Motores adaptativos", seção 2). Cobre que `recommendedActivityRefs` (antes sempre
 * vazio — ver auditoria em docs/CONTINUIDADE_ENSIPETRO.md) passa a apontar pra aula do tópico e,
 * quando aplicável, pra questão específica que originou o erro.
 */
const TOPIC = "pt-01-compreensao-textos";
const topicQuestions = ALL_QUESTIONS.filter((q) => q.topicSlug === TOPIC);

async function clearAllTables() {
  const db = getDB();
  await Promise.all(db.tables.map((t) => t.clear()));
}

beforeEach(async () => {
  await clearAllTables();
});

describe("recommendedActivityRefs — revisão nascida de erro", () => {
  it("aponta pra aula do tópico e pra questão específica que o aluno errou", async () => {
    const question = topicQuestions[0];
    const wrongKey = question.options.find((o) => !o.isCorrect)!.key;
    const correctKey = question.options.find((o) => o.isCorrect)!.key;

    const result = await recordAttempt({
      questionId: question.id,
      selectedKey: wrongKey,
      correctKey,
      isCorrect: false,
      mode: "treino",
      idempotencyKey: newIdempotencyKey(),
    });

    expect(result.reviewScheduled).not.toBeNull();
    const refs = result.reviewScheduled!.recommendedActivityRefs;
    expect(refs).toContain(`lesson:${TOPIC}`);
    expect(refs).toContain(`question:${question.id}`);
  });
});
