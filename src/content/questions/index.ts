import type { Question } from "@/lib/models/schema";

/** PLACEHOLDER — Fase 2 populará o banco de questões real (Administração e Controle). */
export const ALL_QUESTIONS: Question[] = [];

export const QUESTION_COUNT_BY_SUBJECT = ALL_QUESTIONS.reduce<Record<string, number>>((acc, q) => {
  acc[q.subjectSlug] = (acc[q.subjectSlug] ?? 0) + 1;
  return acc;
}, {});

export const QUESTION_LESSON_SLUG = new Map<string, string>();

export function getQuestionsBySubject(subjectSlug: string): Question[] {
  return ALL_QUESTIONS.filter((q) => q.subjectSlug === subjectSlug);
}
