import { describe, expect, it } from "vitest";
import { generateAnalogyQuestion } from "@/lib/lab/analogyGenerator";
import { ALL_QUESTIONS } from "@/content/questions";
import type { Question } from "@/lib/models/schema";

describe("generateAnalogyQuestion", () => {
  it("returns null for a non-real question (never generates from inedita/adaptada)", () => {
    const authored = ALL_QUESTIONS.find((q) => q.source.origin === "inedita")!;
    expect(generateAnalogyQuestion(authored)).toBeNull();
  });

  it("returns null when the real question has no swappable scenario word (purely conceptual)", () => {
    const synthetic: Question = {
      id: "synthetic-conceptual",
      subjectSlug: "especificas",
      topicSlug: "ac-03-administracao-patrimonial",
      syllabusCodes: ["AC-03"],
      statement: "As três idades dos arquivos são:",
      options: [
        { key: "A", text: "corrente, intermediária e permanente", isCorrect: true, explanation: "Correto." },
        { key: "B", text: "ativa, inativa e morta", isCorrect: false, explanation: "Incorreto." },
      ],
      difficulty: "medio",
      source: { origin: "real", banca: "CESGRANRIO" },
      version: 1,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    };
    expect(generateAnalogyQuestion(synthetic)).toBeNull();
  });

  it("varies the scenario word consistently across statement and options, keeps correctness intact", () => {
    const synthetic: Question = {
      id: "synthetic-scenario",
      subjectSlug: "especificas",
      topicSlug: "ac-01-recursos-humanos",
      syllabusCodes: ["AC-01"],
      statement: "Uma empresa recebe 80 currículos para uma vaga. A empresa então aplica uma prova técnica.",
      options: [
        { key: "A", text: "A empresa fez recrutamento.", isCorrect: true, explanation: "A empresa atraiu candidatos." },
        { key: "B", text: "A empresa fez seleção.", isCorrect: false, explanation: "Seleção é outra etapa." },
      ],
      difficulty: "medio",
      source: { origin: "real", banca: "CESGRANRIO" },
      version: 1,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    };

    const result = generateAnalogyQuestion(synthetic);
    expect(result).not.toBeNull();
    const { question, sourceQuestionId, swappedTerm, replacementTerm } = result!;

    expect(sourceQuestionId).toBe("synthetic-scenario");
    expect(swappedTerm.toLowerCase()).toBe("empresa");
    expect(replacementTerm.toLowerCase()).not.toBe("empresa");
    // "empresa" nunca mais aparece — foi trocada em TODO lugar, statement e opções.
    expect(question.statement.toLowerCase()).not.toContain("empresa");
    expect(question.options.every((o) => !o.text.toLowerCase().includes("empresa") && !o.explanation.toLowerCase().includes("empresa"))).toBe(
      true,
    );
    // A correção/estrutura das alternativas nunca muda.
    expect(question.options.map((o) => o.isCorrect)).toEqual(synthetic.options.map((o) => o.isCorrect));
    expect(question.options.map((o) => o.key)).toEqual(synthetic.options.map((o) => o.key));
    // Nunca apresentada como questão real — vira "adaptada".
    expect(question.source.origin).toBe("adaptada");
    // Não sobrescreve a questão original (id novo, não colide no catálogo real).
    expect(question.id).not.toBe(synthetic.id);
  });

  it("real question bank has at least one question this generator can actually vary", () => {
    const realWithScenario = ALL_QUESTIONS.filter((q) => q.source.origin === "real").find((q) => generateAnalogyQuestion(q) !== null);
    expect(realWithScenario).toBeDefined();
  });
});
