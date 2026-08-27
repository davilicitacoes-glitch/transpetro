import { describe, expect, it } from "vitest";
import {
  checkEliminationRules,
  canCheckEliminationRules,
  classifyQuestionType,
  computeAccuracyByQuestionType,
  computeTimeBySubject,
  compareToPrevious,
} from "@/lib/mock/diagnostics";
import type { MockExamResult } from "@/lib/mock/generator";
import type { MockExamAttempt, Question } from "@/lib/models/schema";

function bySubject(overrides: Partial<Record<string, { correct: number; total: number; points: number; maxPoints: number }>>): MockExamResult["bySubject"] {
  const base = {
    especificas: { correct: 40, total: 40, points: 40, maxPoints: 40 },
    portugues: { correct: 10, total: 10, points: 10, maxPoints: 10 },
    matematica: { correct: 10, total: 10, points: 10, maxPoints: 10 },
  };
  const merged = { ...base, ...overrides };
  return [
    { subjectId: "especificas", name: "Conhecimentos Específicos", ...merged.especificas },
    { subjectId: "portugues", name: "Língua Portuguesa", ...merged.portugues },
    { subjectId: "matematica", name: "Matemática", ...merged.matematica },
  ];
}

describe("checkEliminationRules (regra oficial do edital, item 7.1.4.3)", () => {
  it("não elimina quando tudo está acima de 50% e nenhuma disciplina zerou", () => {
    const result = checkEliminationRules(bySubject({}));
    expect(result.seriaEliminado).toBe(false);
    expect(result.motivos).toEqual([]);
  });

  it("elimina por menos de 50% em Específicas mesmo com Geral cheio", () => {
    const result = checkEliminationRules(bySubject({ especificas: { correct: 15, total: 40, points: 15, maxPoints: 40 } }));
    expect(result.seriaEliminado).toBe(true);
    expect(result.motivos[0]).toContain("Específicos");
  });

  it("elimina por menos de 50% na soma de Geral (Português + Matemática) mesmo com Específicas cheio", () => {
    const result = checkEliminationRules(
      bySubject({
        portugues: { correct: 2, total: 10, points: 2, maxPoints: 10 },
        matematica: { correct: 3, total: 10, points: 3, maxPoints: 10 },
      }),
    );
    expect(result.seriaEliminado).toBe(true);
    expect(result.motivos.some((m) => m.includes("Gerais"))).toBe(true);
  });

  it("elimina por zero em Português isoladamente, mesmo com nota geral boa", () => {
    const result = checkEliminationRules(bySubject({ portugues: { correct: 0, total: 10, points: 0, maxPoints: 10 } }));
    expect(result.seriaEliminado).toBe(true);
    expect(result.motivos.some((m) => m.includes("Português"))).toBe(true);
  });

  it("elimina por zero em Matemática isoladamente, mesmo com nota geral boa", () => {
    const result = checkEliminationRules(bySubject({ matematica: { correct: 0, total: 10, points: 0, maxPoints: 10 } }));
    expect(result.seriaEliminado).toBe(true);
    expect(result.motivos.some((m) => m.includes("Matemática"))).toBe(true);
  });
});

describe("canCheckEliminationRules", () => {
  it("true para o blueprint oficial completo", () => {
    expect(canCheckEliminationRules(bySubject({}))).toBe(true);
  });

  it("false para um simulado parcial (só uma disciplina)", () => {
    expect(canCheckEliminationRules([{ subjectId: "portugues", name: "Língua Portuguesa", correct: 8, total: 10, points: 8, maxPoints: 10 }])).toBe(false);
  });
});

describe("classifyQuestionType (heurística, não é dado oficial da banca)", () => {
  it("classifica enunciado com EXCETO como exceção", () => {
    expect(classifyQuestionType("Todas as alternativas estão corretas, EXCETO:")).toBe("excecao");
  });

  it("classifica enunciado com 'incorreta' como exceção", () => {
    expect(classifyQuestionType("Assinale a alternativa incorreta sobre o tema.")).toBe("excecao");
  });

  it("classifica enunciado com cálculo/valor numérico como cálculo", () => {
    expect(classifyQuestionType("Calcule o valor do montante após 3 anos a uma taxa de 5%.")).toBe("calculo");
  });

  it("classifica enunciado neutro como direta", () => {
    expect(classifyQuestionType("Sobre o controle de legalidade, é correto afirmar que:")).toBe("direta");
  });
});

const Q = (id: string, subjectSlug: string, statement = "Sobre o tema, é correto afirmar que:"): Question =>
  ({
    id,
    subjectSlug,
    topicSlug: "t",
    syllabusCodes: [],
    statement,
    options: [
      { key: "A", text: "certa", isCorrect: true, explanation: "" },
      { key: "B", text: "errada", isCorrect: false, explanation: "" },
    ],
    difficulty: "medio",
    source: { origin: "inedita" },
    version: 1,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  }) as Question;

describe("computeTimeBySubject", () => {
  it("calcula média por disciplina só com tempos reais medidos", () => {
    const questions = [Q("q1", "portugues"), Q("q2", "portugues"), Q("q3", "matematica")];
    const stats = computeTimeBySubject(questions, { q1: 10000, q2: 20000, q3: 5000 });
    const pt = stats.find((s) => s.subjectId === "portugues")!;
    expect(pt.averageMs).toBe(15000);
    expect(pt.questionCount).toBe(2);
  });

  it("ignora disciplinas sem nenhum tempo medido", () => {
    const questions = [Q("q1", "portugues")];
    const stats = computeTimeBySubject(questions, {});
    expect(stats).toEqual([]);
  });
});

describe("computeAccuracyByQuestionType", () => {
  it("agrupa acerto por tipo classificado", () => {
    const questions = [
      Q("q1", "portugues", "Assinale a EXCETO correta:"),
      Q("q2", "portugues", "Sobre o tema, é correto afirmar:"),
    ];
    const stats = computeAccuracyByQuestionType(questions, { q1: "A", q2: "B" });
    const excecao = stats.find((s) => s.type === "excecao")!;
    const direta = stats.find((s) => s.type === "direta")!;
    expect(excecao.correct).toBe(1);
    expect(direta.correct).toBe(0);
  });
});

describe("compareToPrevious", () => {
  it("hasPrevious=false sem nenhum simulado concluído anterior", () => {
    const current: MockExamResult = { totalPoints: 50, maxPoints: 60, correctCount: 50, totalQuestions: 60, passedMinimum: true, distanceToTarget: 0, bySubject: bySubject({}) };
    const result = compareToPrevious(current, []);
    expect(result.hasPrevious).toBe(false);
    expect(result.totalScoreDeltaFromLast).toBeNull();
  });

  it("detecta melhora em uma disciplina comparada ao simulado anterior mais recente", () => {
    const current: MockExamResult = { totalPoints: 55, maxPoints: 60, correctCount: 55, totalQuestions: 60, passedMinimum: true, distanceToTarget: 0, bySubject: bySubject({ portugues: { correct: 9, total: 10, points: 9, maxPoints: 10 } }) };
    const previous: MockExamAttempt = {
      id: "prev1",
      mockExamId: "m1",
      studentId: "s1",
      startedAt: "2026-01-01T00:00:00.000Z",
      finishedAt: "2026-01-01T01:00:00.000Z",
      status: "concluido",
      answers: [],
      attemptIds: [],
      generatedReviewIds: [],
      scoreBySubject: { especificas: 40, portugues: 5, matematica: 10 },
      totalScore: 55,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    };
    const result = compareToPrevious(current, [previous]);
    expect(result.hasPrevious).toBe(true);
    const pt = result.bySubjectTrend.find((s) => s.subjectId === "portugues")!;
    expect(pt.trend).toBe("melhorando");
    expect(pt.deltaPoints).toBe(4);
  });
});
