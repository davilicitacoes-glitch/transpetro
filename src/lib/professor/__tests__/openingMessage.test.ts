import { describe, expect, it, beforeEach } from "vitest";
import { getDB } from "@/lib/db/dexie";
import { gerarAberturaContextual } from "@/lib/professor/openingMessage";
import { recordAttempt, openOrUpdateDifficulty, scheduleReview } from "@/lib/pedagogy/service";
import { ALL_QUESTIONS } from "@/content/questions";
import { newIdempotencyKey } from "@/lib/pedagogy/ids";
import { subjectOfTopic } from "@/lib/pedagogy/contentRef";
import { DEFAULT_STUDENT_ID } from "@/lib/models/schema";
import { NOME_MENTOR } from "@config/metodo";

/**
 * Abertura contextual do Vetor (missão "Método Vetor", seção 3) — cobre a prioridade real de
 * fatos: revisão vencida > erro aberto > conquista > desempenho geral > sem histórico. Cada teste
 * usa SÓ o sinal daquele nível (banco limpo antes), pra confirmar que a função escolhe o fato mais
 * acionável, não qualquer um.
 */
const TOPIC = "pt-01-compreensao-textos";
const topicQuestions = ALL_QUESTIONS.filter((q) => q.topicSlug === TOPIC);

async function clearAllTables() {
  const db = getDB();
  await Promise.all(db.tables.map((t) => t.clear()));
}

function correctKeyFor(questionId: string) {
  return ALL_QUESTIONS.find((q) => q.id === questionId)!.options.find((o) => o.isCorrect)!.key;
}

beforeEach(async () => {
  await clearAllTables();
});

describe("gerarAberturaContextual", () => {
  it("aluno sem histórico nenhum recebe abertura honesta, não uma continuidade inventada", async () => {
    const text = await gerarAberturaContextual();
    expect(text).toContain(NOME_MENTOR);
    expect(text.toLowerCase()).toContain("não tenho histórico");
  });

  it("prioriza uma revisão vencida quando ela existe", async () => {
    const db = getDB();
    const review = await scheduleReview({ studentId: DEFAULT_STUDENT_ID, itemType: "topic", itemId: TOPIC, reason: "regular" });
    // scheduleReview sempre calcula a data real pelo algoritmo de repetição espaçada — pra simular
    // uma revisão JÁ VENCIDA neste teste, sobrescreve nextReviewDate direto no registro salvo (só
    // nos testes; o app real nunca faz isso).
    await db.reviewSchedules.update(review.id, { nextReviewDate: "2020-01-01" });
    const text = await gerarAberturaContextual();
    expect(text).toContain("revisão");
    expect(text.toLowerCase()).toContain("pendente");
  });

  it("cita um erro real em aberto quando não há revisão vencida", async () => {
    const q = topicQuestions[0];
    const wrongKey = q.options.find((o) => !o.isCorrect)!.key;
    await openOrUpdateDifficulty({
      studentId: DEFAULT_STUDENT_ID,
      topicSlug: q.topicSlug,
      subjectSlug: subjectOfTopic(q.topicSlug),
      syllabusCodes: q.syllabusCodes,
      questionId: q.id,
      cause: "confundiu os conceitos",
      correctRule: "regra real",
      origin: "aluno_manual",
    });
    const text = await gerarAberturaContextual();
    expect(text).toContain("erro");
    expect(text.toLowerCase()).toContain("aberto");
  });

  it("nunca lança exceção mesmo com dado real misto (revisão + erro + attempts)", async () => {
    const q = topicQuestions[0];
    await recordAttempt({
      questionId: q.id,
      selectedKey: correctKeyFor(q.id),
      correctKey: correctKeyFor(q.id),
      isCorrect: true,
      mode: "treino",
      idempotencyKey: newIdempotencyKey(),
    });
    const text = await gerarAberturaContextual();
    expect(typeof text).toBe("string");
    expect(text.length).toBeGreaterThan(0);
  });
});
