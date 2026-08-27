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
 * Escolhe `count` questões de `pool`, priorizando as que NÃO estão em `excludeIds` (questões usadas
 * em simulados recentes do mesmo aluno — ver `getRecentlyUsedQuestionIds`). Só recorre a questões
 * excluídas se o pool sem elas for pequeno demais pro `count` pedido — nesse caso avisa (banco
 * pequeno demais pra evitar repetição desta vez), nunca falha silenciosamente.
 */
function pickAvoidingRepeats(pool: Question[], count: number, seed: number, excludeIds: Set<string>): { picked: Question[]; hadToRepeat: boolean } {
  const fresh = pool.filter((q) => !excludeIds.has(q.id));
  if (fresh.length >= count) {
    return { picked: shuffle(fresh, seed).slice(0, count), hadToRepeat: false };
  }
  // Não há questões novas suficientes: usa todas as novas + completa com as recentes (nunca deixa
  // a prova menor que o pedido só por causa da regra de não-repetição).
  const remaining = shuffle(
    pool.filter((q) => excludeIds.has(q.id)),
    seed + 1,
  ).slice(0, count - fresh.length);
  return { picked: [...shuffle(fresh, seed), ...remaining], hadToRepeat: remaining.length > 0 };
}

/**
 * Gera a prova completa no blueprint oficial do edital (item 7, ver EXAM_BLUEPRINT em
 * config/concurso.ts): 40 Conhecimentos Específicos + 10 Português + 10 Matemática =
 * 60 questões / 60 pontos, 1 ponto cada. Nunca repete a mesma questão dentro da mesma prova; evita
 * repetir questões de simulados recentes do mesmo aluno quando o banco permitir (`excludeIds`).
 */
export function generateFullMockExam(seed = Date.now(), excludeIds: Set<string> = new Set()): GeneratedMockExam {
  const questions: Question[] = [];
  const warnings: string[] = [];

  for (const subject of EXAM_BLUEPRINT) {
    const pool = ALL_QUESTIONS.filter((q) => q.subjectSlug === subject.id);
    const { picked, hadToRepeat } = pickAvoidingRepeats(pool, subject.questionCount, seed + subject.questionCount, excludeIds);
    if (picked.length < subject.questionCount) {
      warnings.push(
        `${subject.name}: o banco tem apenas ${picked.length} de ${subject.questionCount} questões necessárias. ` +
          `A prova foi montada com o que existe — o resultado não reflete o peso real do edital.`,
      );
    } else if (hadToRepeat) {
      warnings.push(`${subject.name}: o banco de questões novas se esgotou nos simulados recentes — esta prova reaproveitou algumas questões já usadas.`);
    }
    questions.push(...picked);
  }

  return { questions, warnings, complete: warnings.length === 0 };
}

/**
 * Simulado menor, de UMA disciplina só — pra prática mais frequente sem precisar montar a prova
 * completa (missão "Motores adaptativos", seção 3: "ofereça também a opção de simulados menores").
 * Usa até `count` questões (padrão: todas as da disciplina no blueprint oficial, ex.: 40 pra
 * Específicas), 1 ponto cada, mesma regra de não-repetição do simulado completo.
 */
export function generateSubjectMockExam(subjectSlug: string, count?: number, seed = Date.now(), excludeIds: Set<string> = new Set()): GeneratedMockExam {
  const blueprint = EXAM_BLUEPRINT.find((s) => s.id === subjectSlug);
  const target = count ?? blueprint?.questionCount ?? 10;
  const pool = ALL_QUESTIONS.filter((q) => q.subjectSlug === subjectSlug);
  const { picked, hadToRepeat } = pickAvoidingRepeats(pool, target, seed, excludeIds);
  const warnings: string[] = [];
  const subjectName = blueprint?.name ?? subjectSlug;
  if (picked.length < target) {
    warnings.push(`${subjectName}: o banco tem apenas ${picked.length} de ${target} questões pedidas.`);
  } else if (hadToRepeat) {
    warnings.push(`${subjectName}: o banco de questões novas se esgotou nos simulados recentes — este simulado reaproveitou algumas questões já usadas.`);
  }
  return { questions: picked, warnings, complete: warnings.length === 0 };
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

/** Corrige a prova: 1 ponto por questão em qualquer disciplina (item 7 do edital confirma 60
 * questões = 60 pontos, sem peso diferenciado por disciplina — corrigido aqui um comentário antigo
 * que dizia o contrário, resquício de uma suposição anterior nunca confirmada no PDF oficial). */
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
