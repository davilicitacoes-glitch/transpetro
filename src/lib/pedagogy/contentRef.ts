import { ALL_LESSONS } from "@/content/lessons";
import { ALL_QUESTIONS } from "@/content/questions";
import { VIDEO_LESSONS } from "@/content/videos";
import { ESSAY_PROMPTS } from "@/content/essays/prompts";
import { TOPICS, MODULES } from "@/content/curriculum";
import type { ContentRef } from "@/lib/models/schema";

/**
 * Resolve o contrato mínimo de referência (`ContentRef`) a partir dos catálogos já existentes,
 * SEM alterar nenhum arquivo de conteúdo (aulas, vídeos, questões, propostas de redação).
 * Isso cumpre a exigência de "contrato de referência compatível" sem retrofitar o catálogo de
 * aulas, vídeos e questões (contagens reais e atualizadas em docs/AUDITORIA_PRE_MEU_CURSO.md)
 * com campos novos.
 */

const lessonBySlug = new Map(ALL_LESSONS.map((l) => [l.slug, l]));
const questionById = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));
const videoById = new Map(VIDEO_LESSONS.map((v) => [v.id, v]));
const essayById = new Map(ESSAY_PROMPTS.map((e) => [e.id, e]));
const topicBySlug = new Map(TOPICS.map((t) => [t.slug, t]));
const moduleBySlug = new Map(MODULES.map((m) => [m.slug, m]));

export function resolveLessonRef(lessonSlug: string): ContentRef | null {
  const lesson = lessonBySlug.get(lessonSlug);
  if (!lesson) return null;
  return {
    kind: "lesson",
    id: lesson.slug,
    subjectSlug: lesson.subjectSlug,
    syllabusCodes: lesson.syllabusCodes,
    topicSlug: lesson.topicSlug,
  };
}

/** As questões dos miniquiz de aula, do banco `/questoes` e dos simulados usam o mesmo `id`
 * (`q-<lessonSlug>-<n>`), pois todas vêm do mesmo array `ALL_QUESTIONS`. Um único resolvedor
 * cobre os três fluxos. */
export function resolveQuestionRef(questionId: string): ContentRef | null {
  const question = questionById.get(questionId);
  if (!question) return null;
  return {
    kind: "question",
    id: question.id,
    subjectSlug: question.subjectSlug,
    syllabusCodes: question.syllabusCodes,
    topicSlug: question.topicSlug,
  };
}

/** ID determinístico da N-ésima questão do miniquiz de uma aula (1-based), usado tanto pelo
 * banco de questões (`content/questions/index.ts`) quanto pela leitura da aula — mantém as
 * tentativas do miniquiz e do banco de questões ligadas à mesma questão. */
export function miniQuizQuestionId(lessonSlug: string, indexZeroBased: number): string {
  return `q-${lessonSlug}-${indexZeroBased + 1}`;
}

export function resolveVideoRef(videoId: string): ContentRef | null {
  const video = videoById.get(videoId);
  if (!video) return null;
  return {
    kind: "video",
    id: video.id,
    subjectSlug: video.subjectSlug,
    syllabusCodes: video.syllabusCodes,
  };
}

export function resolveEssayPromptRef(essayPromptId: string): ContentRef | null {
  const prompt = essayById.get(essayPromptId);
  if (!prompt) return null;
  return { kind: "essay_prompt", id: prompt.id, syllabusCodes: [] };
}

export function resolveTopicRef(topicSlug: string, concept?: string): ContentRef | null {
  const topic = topicBySlug.get(topicSlug);
  if (!topic) return null;
  const mod = moduleBySlug.get(topic.moduleSlug);
  return {
    kind: "topic",
    id: topic.slug,
    subjectSlug: mod?.subjectSlug,
    syllabusCodes: topic.syllabusCodes,
    topicSlug: topic.slug,
    concept,
  };
}

export function topicNameOf(topicSlug: string): string | undefined {
  return topicBySlug.get(topicSlug)?.name;
}

export function subjectOfTopic(topicSlug: string): string | undefined {
  const topic = topicBySlug.get(topicSlug);
  if (!topic) return undefined;
  return moduleBySlug.get(topic.moduleSlug)?.subjectSlug;
}
