import { VIDEO_LESSONS, type VideoLesson } from "@/content/videos";
import { ALL_QUESTIONS } from "@/content/questions";
import type { CourseDay, Question } from "@/lib/models/schema";

/** IDs de vídeo já usados como etapa obrigatória do dia — nunca oferecidos de novo como "complementar". */
function requiredVideoIds(day: CourseDay): Set<string> {
  const ids = new Set<string>();
  for (const step of day.steps) {
    if (step.contentRef?.kind === "video") ids.add(step.contentRef.id);
    for (const ref of step.extraContentRefs) if (ref.kind === "video") ids.add(ref.id);
  }
  return ids;
}

/** IDs de questão já usados como etapa obrigatória do dia — nunca repetidos no bloco complementar. */
function requiredQuestionIds(day: CourseDay): Set<string> {
  const ids = new Set<string>();
  for (const step of day.steps) {
    if (step.contentRef?.kind === "question") ids.add(step.contentRef.id);
    for (const ref of step.extraContentRefs) if (ref.kind === "question") ids.add(ref.id);
  }
  return ids;
}

/** Vídeos curados sobre os códigos do edital cobertos no dia, além dos já exibidos como obrigatórios.
 * Determinístico (mesmo critério usado no restante do curso): não sorteia, não repete entre chamadas. */
export function getComplementaryVideosForDay(day: CourseDay, limit = 6): VideoLesson[] {
  const exclude = requiredVideoIds(day);
  const seen = new Set<string>();
  const out: VideoLesson[] = [];
  for (const v of VIDEO_LESSONS) {
    if (exclude.has(v.id) || seen.has(v.id)) continue;
    if (v.syllabusCodes.some((c) => day.syllabusCodes.includes(c))) {
      seen.add(v.id);
      out.push(v);
      if (out.length >= limit) break;
    }
  }
  return out;
}

/** Questões reais do acervo sobre os mesmos códigos do dia, além das já respondidas nas etapas obrigatórias. */
export function getComplementaryQuestionsForDay(day: CourseDay, limit = 3): Question[] {
  const exclude = requiredQuestionIds(day);
  const out: Question[] = [];
  for (const q of ALL_QUESTIONS) {
    if (exclude.has(q.id)) continue;
    if (q.syllabusCodes.some((c) => day.syllabusCodes.includes(c))) {
      out.push(q);
      if (out.length >= limit) break;
    }
  }
  return out;
}

export function dayHasComplementaryContent(day: CourseDay): boolean {
  return getComplementaryVideosForDay(day, 1).length > 0 || getComplementaryQuestionsForDay(day, 1).length > 0;
}
