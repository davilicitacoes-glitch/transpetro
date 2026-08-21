import type { LessonContent } from "@/content/lessonTypes";
import { AC01_RECURSOS_HUMANOS } from "@/content/lessons/especificas/ac-01-recursos-humanos";
import { PT01_COMPREENSAO_TEXTOS } from "@/content/lessons/portugues/pt-01-compreensao-textos";

/**
 * Fase 2 em andamento — populado incrementalmente, uma aula por vez, com conteúdo genuíno (não
 * placeholder). Hoje cobre o Dia 1 do plano guiado (AC-01 + PT-01); os demais 37 códigos da matriz
 * (ver MATRIZ_EDITAL_TRANSPETRO.md) ainda não têm aula escrita.
 */
export const ALL_LESSONS: LessonContent[] = [AC01_RECURSOS_HUMANOS, PT01_COMPREENSAO_TEXTOS];

export const LESSON_COUNT_BY_SUBJECT = ALL_LESSONS.reduce<Record<string, number>>((acc, lesson) => {
  acc[lesson.subjectSlug] = (acc[lesson.subjectSlug] ?? 0) + 1;
  return acc;
}, {});
