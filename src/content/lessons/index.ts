import type { LessonContent } from "@/content/lessonTypes";

/** PLACEHOLDER — Fase 2 populará com as aulas reais (Administração e Controle). */
export const ALL_LESSONS: LessonContent[] = [];

export const LESSON_COUNT_BY_SUBJECT = ALL_LESSONS.reduce<Record<string, number>>((acc, lesson) => {
  acc[lesson.subjectSlug] = (acc[lesson.subjectSlug] ?? 0) + 1;
  return acc;
}, {});
