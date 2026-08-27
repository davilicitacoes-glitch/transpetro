import { describe, expect, it } from "vitest";
import { generateFullMockExam, generateSubjectMockExam } from "@/lib/mock/generator";
import { ALL_QUESTIONS } from "@/content/questions";

describe("generateFullMockExam", () => {
  it("gera exatamente 60 questões no blueprint oficial quando o banco tem o suficiente", () => {
    const exam = generateFullMockExam(1);
    expect(exam.questions.length).toBe(60);
    expect(exam.complete).toBe(true);
    expect(exam.warnings).toEqual([]);
  });

  it("nunca repete a mesma questão dentro da mesma prova", () => {
    const exam = generateFullMockExam(1);
    const ids = exam.questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("evita questões em excludeIds quando o banco tem alternativa suficiente", () => {
    const first = generateFullMockExam(1);
    const excludeIds = new Set(first.questions.map((q) => q.id));
    const second = generateFullMockExam(2, excludeIds);
    const overlap = second.questions.filter((q) => excludeIds.has(q.id));
    // banco tem margem suficiente pra especificas (240) e portugues (66); matematica (49) pode
    // eventualmente precisar reaproveitar 1-2 — por isso não exige zero overlap, só que a maioria
    // seja evitada e que, se houve reaproveitamento, o aviso correspondente apareça.
    if (overlap.length > 0) {
      expect(second.warnings.some((w) => w.includes("reaproveitou"))).toBe(true);
    }
    expect(overlap.length).toBeLessThan(second.questions.length / 2);
  });
});

describe("generateSubjectMockExam", () => {
  it("gera um simulado só da disciplina pedida, com o tamanho padrão do blueprint", () => {
    const exam = generateSubjectMockExam("portugues");
    expect(exam.questions.length).toBe(10);
    expect(exam.questions.every((q) => q.subjectSlug === "portugues")).toBe(true);
  });

  it("respeita uma contagem customizada quando pedida", () => {
    const exam = generateSubjectMockExam("matematica", 5);
    expect(exam.questions.length).toBe(5);
  });

  it("real question bank has the expected minimum size per subject used by the exam UI", () => {
    const bySubject = (slug: string) => ALL_QUESTIONS.filter((q) => q.subjectSlug === slug).length;
    expect(bySubject("especificas")).toBeGreaterThanOrEqual(40);
    expect(bySubject("portugues")).toBeGreaterThanOrEqual(10);
    expect(bySubject("matematica")).toBeGreaterThanOrEqual(10);
  });
});
