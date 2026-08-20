import type { SubjectSlug } from "@/content/lessonTypes";

export interface VideoLesson {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  subjectSlug: SubjectSlug;
  syllabusCodes: string[];
  justification: string;
  verifiedAt: string;
}

/** PLACEHOLDER — Fase 2 fará a curadoria real de videoaulas para Administração e Controle. */
export const VIDEO_LESSONS: VideoLesson[] = [];

export const VIDEO_COUNT_BY_SUBJECT = VIDEO_LESSONS.reduce<Record<string, number>>((acc, v) => {
  acc[v.subjectSlug] = (acc[v.subjectSlug] ?? 0) + 1;
  return acc;
}, {});

export function getVideosForSyllabusCodes(codes: string[]): VideoLesson[] {
  return VIDEO_LESSONS.filter((v) => v.syllabusCodes.some((c) => codes.includes(c)));
}
