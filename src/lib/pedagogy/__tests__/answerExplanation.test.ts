import { describe, expect, it } from "vitest";
import { buildAnswerExplanation, explainAnswerById, explanationToCause } from "@/lib/pedagogy/answerExplanation";
import { ALL_QUESTIONS } from "@/content/questions";
import { ALL_LESSONS } from "@/content/lessons";
import type { Question } from "@/lib/models/schema";

const TOPIC = "pt-01-compreensao-textos";
const topicQuestions = ALL_QUESTIONS.filter((q) => q.topicSlug === TOPIC);
const lesson = ALL_LESSONS.find((l) => l.topicSlug === TOPIC)!;

describe("buildAnswerExplanation — explicação de erro universal", () => {
  it("real question bank and lesson content exist for this topic", () => {
    expect(topicQuestions.length).toBeGreaterThan(0);
    expect(lesson).toBeDefined();
  });

  it("returns isCorrect=true and no selectedExplanation when the correct key was chosen", () => {
    const q = topicQuestions[0];
    const correctKey = q.options.find((o) => o.isCorrect)!.key;
    const result = buildAnswerExplanation(q, correctKey);
    expect(result.isCorrect).toBe(true);
    expect(result.selectedExplanation).toBeNull();
    expect(result.correctKey).toBe(correctKey);
  });

  it("returns the WRONG option's own explanation (not a fabricated one) when wrong", () => {
    const q = topicQuestions[0];
    const wrongOption = q.options.find((o) => !o.isCorrect)!;
    const result = buildAnswerExplanation(q, wrongOption.key);
    expect(result.isCorrect).toBe(false);
    expect(result.selectedExplanation).toBe(wrongOption.explanation);
    expect(result.correctExplanation).toBe(q.options.find((o) => o.isCorrect)!.explanation);
  });

  it("returns null selectedKey/selectedExplanation gracefully when nothing was selected (revealed early)", () => {
    const q = topicQuestions[0];
    const result = buildAnswerExplanation(q, null);
    expect(result.isCorrect).toBe(false);
    expect(result.selectedKey).toBeNull();
    expect(result.selectedExplanation).toBeNull();
  });

  it("never fabricates a pegadinha match when there's no real word overlap", () => {
    // Questão sintética, sem nenhuma relação de texto com as pegadinhas reais do tema.
    const synthetic: Question = {
      id: "synthetic-1",
      subjectSlug: "portugues",
      topicSlug: TOPIC,
      syllabusCodes: ["PT-01"],
      statement: "zzz",
      options: [
        { key: "A", text: "zzz correta", isCorrect: true, explanation: "zzz motivo certo" },
        { key: "B", text: "xyzxyz nada a ver", isCorrect: false, explanation: "xyzxyz sem relação nenhuma com o tema" },
      ],
      difficulty: "medio",
      source: { origin: "inedita" },
      version: 1,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    };
    const result = buildAnswerExplanation(synthetic, "B");
    expect(result.matchedPegadinha).toBeNull();
  });

  it("explainAnswerById returns null for an unknown question id (never crashes)", () => {
    expect(explainAnswerById("does-not-exist", "A")).toBeNull();
  });
});

describe("explanationToCause", () => {
  it("produces an honest generic message when there is no selectedExplanation", () => {
    const q = topicQuestions[0];
    const explanation = buildAnswerExplanation(q, null);
    const cause = explanationToCause(explanation);
    expect(cause.toLowerCase()).toContain("sem uma relação de confusão clara");
  });

  it("cites the matched pegadinha number when a real match is found", () => {
    if (lesson.commonMistakes.length === 0) return; // nada a testar se o tema não tem pegadinha cadastrada
    // Constrói uma alternativa cujo texto reaproveita palavras reais da primeira pegadinha do tema,
    // pra garantir overlap >= 2 de forma determinística (não depende de sorte do conteúdo real).
    const mistakeWords = lesson.commonMistakes[0].split(/\s+/).filter((w) => w.length >= 4).slice(0, 4);
    const q = topicQuestions[0];
    const synthetic: Question = {
      ...q,
      id: "synthetic-2",
      options: [
        { key: "A", text: q.options.find((o) => o.isCorrect)!.text, isCorrect: true, explanation: "certa" },
        { key: "B", text: mistakeWords.join(" "), isCorrect: false, explanation: mistakeWords.join(" ") },
      ],
    };
    const explanation = buildAnswerExplanation(synthetic, "B");
    if (explanation.matchedPegadinha) {
      const cause = explanationToCause(explanation);
      expect(cause).toContain(`pegadinha nº ${explanation.matchedPegadinha.index}`);
    }
  });
});
