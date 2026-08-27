import { EXAM_BLUEPRINT, OBJECTIVE_TOTAL_POINTS, OBJECTIVE_MIN_PASSING_POINTS, OBJECTIVE_TARGET_POINTS } from "@config/concurso";
import { ALL_QUESTIONS } from "@/content/questions";
import type { Question } from "@/lib/models/schema";

export interface GeneratedMockExam {
  questions: Question[];
  /** Avisos honestos quando o banco não tem questões suficientes para alguma disciplina. */
  warnings: string[];
  complete: boolean;
}

function shuffle<T>(items: T[], seed: number): T[] {
  // Embaralhamento determinístico (Fisher-Yates com PRNG simples) para permitir refazer o mesmo simulado.
  const arr = [...items];
  let state = seed || 1;
  for (let i = arr.length - 1; i > 0; i--) {
    state = (state * 1664525 + 1013904223) % 4294967296;
    const j = state % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Gera a prova completa no blueprint oficial do edital (item 7, ver EXAM_BLUEPRINT em
 * config/concurso.ts): 40 Conhecimentos Específicos + 10 Português + 10 Matemática =
 * 60 questões / 60 pontos. Nunca repete a mesma questão dentro da mesma prova.
 */
export function generateFullMockExam(seed = Date.now()): GeneratedMockExam {
  const questions: Question[] = [];
  const warnings: string[] = [];

  for (const subject of EXAM_BLUEPRINT) {
    const pool = ALL_QUESTIONS.filter((q) => q.subjectSlug === subject.id);
    const picked = shuffle(pool, seed + subject.questionCount).slice(0, subject.questionCount);
    if (picked.length < subject.questionCount) {
      warnings.push(
        `${subject.name}: o banco tem apenas ${picked.length} de ${subject.questionCount} questões necessárias. ` +
          `A prova foi montada com o que existe — o resultado não reflete o peso real do edital.`,
      );
    }
    questions.push(...picked);
  }

  return { questions, warnings, complete: warnings.length === 0 };
}

export interface MockExamResult {
  totalPoints: number;
  maxPoints: number;
  correctCount: number;
  totalQuestions: number;
  passedMinimum: boolean;
  distanceToTarget: number;
  bySubject: Array<{
    subjectId: string;
    name: string;
    correct: number;
    total: number;
    points: number;
    maxPoints: number;
  }>;
}

/** Corrige a prova aplicando os pesos oficiais (Específicas valem 2 pts, demais 1 pt). */
export function scoreMockExam(questions: Question[], answers: Record<string, string>): MockExamResult {
  const bySubject = EXAM_BLUEPRINT.map((subject) => {
    const subjectQuestions = questions.filter((q) => q.subjectSlug === subject.id);
    const correct = subjectQuestions.filter((q) => {
      const answer = answers[q.id];
      return answer && q.options.find((o) => o.key === answer)?.isCorrect;
    }).length;
    return {
      subjectId: subject.id,
      name: subject.name,
      correct,
      total: subjectQuestions.length,
      points: correct * subject.pointsPerQuestion,
      maxPoints: subjectQuestions.length * subject.pointsPerQuestion,
    };
  });

  const totalPoints = bySubject.reduce((sum, s) => sum + s.points, 0);
  const correctCount = bySubject.reduce((sum, s) => sum + s.correct, 0);

  return {
    totalPoints,
    maxPoints: OBJECTIVE_TOTAL_POINTS,
    correctCount,
    totalQuestions: questions.length,
    passedMinimum: totalPoints >= OBJECTIVE_MIN_PASSING_POINTS,
    distanceToTarget: Math.max(0, OBJECTIVE_TARGET_POINTS - totalPoints),
    bySubject,
  };
}
