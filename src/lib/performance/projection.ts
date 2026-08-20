import { EXAM_BLUEPRINT, OBJECTIVE_TOTAL_POINTS } from "@config/concurso";
import type { Attempt, Question } from "@/lib/models/schema";

export interface SubjectAccuracy {
  subjectId: string;
  accuracy: number | null;
  attemptsCount: number;
}

export interface ScoreProjection {
  hasEnoughData: boolean;
  projectedPoints: number | null;
  uncertaintyPoints: number;
  bySubject: SubjectAccuracy[];
}

const MIN_ATTEMPTS_FOR_CONFIDENCE = 5;

/** Projeta a pontuação da objetiva a partir da acurácia recente por disciplina, com faixa de incerteza — nunca uma "probabilidade de aprovação". */
export function computeScoreProjection(attempts: Attempt[], questionsById: Map<string, Question>): ScoreProjection {
  const bySubjectAttempts = new Map<string, Attempt[]>();
  for (const attempt of attempts) {
    const question = questionsById.get(attempt.questionId);
    if (!question) continue;
    const list = bySubjectAttempts.get(question.subjectSlug) ?? [];
    list.push(attempt);
    bySubjectAttempts.set(question.subjectSlug, list);
  }

  const bySubject: SubjectAccuracy[] = EXAM_BLUEPRINT.map((subject) => {
    const list = bySubjectAttempts.get(subject.id) ?? [];
    if (list.length === 0) {
      return { subjectId: subject.id, accuracy: null, attemptsCount: 0 };
    }
    const correct = list.filter((a) => a.isCorrect).length;
    return { subjectId: subject.id, accuracy: correct / list.length, attemptsCount: list.length };
  });

  const totalAttempts = bySubject.reduce((sum, s) => sum + s.attemptsCount, 0);
  const hasEnoughData = totalAttempts >= MIN_ATTEMPTS_FOR_CONFIDENCE;

  if (!hasEnoughData) {
    return { hasEnoughData: false, projectedPoints: null, uncertaintyPoints: 0, bySubject };
  }

  let projectedPoints = 0;
  for (const subject of EXAM_BLUEPRINT) {
    const acc = bySubject.find((s) => s.subjectId === subject.id);
    const accuracy = acc?.accuracy ?? 0.5; // sem dados nessa disciplina: assume 50% como neutro, não otimista
    projectedPoints += accuracy * subject.totalPoints;
  }

  // Incerteza proporcional ao quão pouco dado existe: menos tentativas -> faixa maior.
  const confidenceFactor = Math.min(1, totalAttempts / 40);
  const uncertaintyPoints = Math.round((1 - confidenceFactor) * OBJECTIVE_TOTAL_POINTS * 0.25 * 10) / 10;

  return {
    hasEnoughData: true,
    projectedPoints: Math.round(projectedPoints * 10) / 10,
    uncertaintyPoints,
    bySubject,
  };
}
