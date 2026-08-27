import { EXAM_BLUEPRINT } from "@config/concurso";
import type { MockExamAttempt, Question } from "@/lib/models/schema";
import type { MockExamResult } from "@/lib/mock/generator";

/**
 * MOTOR 2 — diagnóstico de banca do simulado (ver missão "Motores adaptativos", seção 3). Só lê o
 * resultado já corrigido (`MockExamResult`, de `src/lib/mock/generator.ts`) e o histórico real de
 * `MockExamAttempt` do próprio aluno — não inventa nenhum dado, e devolve `null`/lista vazia nos
 * campos que não têm base real (ex.: sem simulado anterior, não há "comparação" nenhuma pra mostrar).
 */

/* ------------------------------------------------------------------------------------------------
 * Regra oficial de eliminação (edital, item 7.1.4.3) — as QUATRO condições reais, não a
 * simplificação de um único ponto de corte agregado usada em OBJECTIVE_MIN_PASSING_POINTS.
 * ---------------------------------------------------------------------------------------------- */

export interface EliminationCheck {
  seriaEliminado: boolean;
  motivos: string[];
}

/** Aplica as 4 condições de eliminação do edital ao resultado de UM simulado. Só faz sentido pro
 * simulado COMPLETO (60 questões, blueprint oficial inteiro) — um simulado parcial (por disciplina)
 * não tem como ser avaliado pela regra de corte real, que compara fases inteiras. */
export function checkEliminationRules(bySubject: MockExamResult["bySubject"]): EliminationCheck {
  const especificas = bySubject.find((s) => s.subjectId === "especificas");
  const portugues = bySubject.find((s) => s.subjectId === "portugues");
  const matematica = bySubject.find((s) => s.subjectId === "matematica");
  const motivos: string[] = [];

  if (especificas && especificas.points < especificas.maxPoints * 0.5) {
    motivos.push(`Menos de 50% em Conhecimentos Específicos (${especificas.points}/${especificas.maxPoints} pts).`);
  }
  if (portugues && matematica) {
    const geralPoints = portugues.points + matematica.points;
    const geralMax = portugues.maxPoints + matematica.maxPoints;
    if (geralPoints < geralMax * 0.5) {
      motivos.push(`Menos de 50% em Conhecimentos Gerais somados (${geralPoints}/${geralMax} pts).`);
    }
  }
  if (portugues && portugues.correct === 0 && portugues.total > 0) {
    motivos.push("Zero acertos em Português.");
  }
  if (matematica && matematica.correct === 0 && matematica.total > 0) {
    motivos.push("Zero acertos em Matemática.");
  }

  return { seriaEliminado: motivos.length > 0, motivos };
}

/** Só se aplica quando o simulado cobre o blueprint oficial inteiro (todas as 3 disciplinas com o
 * número de questões do edital) — simulados parciais não permitem simular a regra de corte real. */
export function canCheckEliminationRules(bySubject: MockExamResult["bySubject"]): boolean {
  return EXAM_BLUEPRINT.every((subject) => {
    const found = bySubject.find((s) => s.subjectId === subject.id);
    return found && found.total >= subject.questionCount;
  });
}

/* ------------------------------------------------------------------------------------------------
 * Classificação heurística do tipo de questão — NUNCA um dado oficial da banca (a Cesgranrio não
 * publica essa classificação), é uma leitura determinística do próprio enunciado. Documentado como
 * heurística explicitamente na UI, não apresentado como fato.
 * ---------------------------------------------------------------------------------------------- */

export type QuestionType = "direta" | "excecao" | "calculo";

const EXCECAO_PATTERN = /\bEXCETO\b|incorret[ao]|não\s+(é|está|representa|corresponde)|não\s+se\s+aplica|falsa\s+é/i;
const CALCULO_PATTERN = /\d+[.,]?\d*\s*(%|R\$)|calcul|quantos?\b|valor\s+d[eo]|resultado\s+d[eo]|média|razão|proporção|equação/i;

/** Classificação por regra determinística e documentada — não é IA, não varia entre execuções. */
export function classifyQuestionType(statement: string): QuestionType {
  if (EXCECAO_PATTERN.test(statement)) return "excecao";
  if (CALCULO_PATTERN.test(statement)) return "calculo";
  return "direta";
}

export const QUESTION_TYPE_LABEL: Record<QuestionType, string> = {
  direta: "Direta",
  excecao: "Exceção/pegadinha",
  calculo: "Cálculo/aplicação",
};

/* ------------------------------------------------------------------------------------------------
 * Tempo por disciplina
 * ---------------------------------------------------------------------------------------------- */

export interface SubjectTimeStat {
  subjectId: string;
  name: string;
  averageMs: number;
  totalMs: number;
  questionCount: number;
}

export function computeTimeBySubject(questions: Question[], responseTimesMs: Record<string, number>): SubjectTimeStat[] {
  return EXAM_BLUEPRINT.map((subject) => {
    const subjectQuestions = questions.filter((q) => q.subjectSlug === subject.id);
    const times = subjectQuestions.map((q) => responseTimesMs[q.id]).filter((t): t is number => typeof t === "number" && t > 0);
    const totalMs = times.reduce((s, t) => s + t, 0);
    return {
      subjectId: subject.id,
      name: subject.name,
      averageMs: times.length > 0 ? Math.round(totalMs / times.length) : 0,
      totalMs,
      questionCount: times.length,
    };
  }).filter((s) => s.questionCount > 0);
}

export interface QuestionTypeStat {
  type: QuestionType;
  total: number;
  correct: number;
  accuracy: number;
}

export function computeAccuracyByQuestionType(questions: Question[], answers: Record<string, string>): QuestionTypeStat[] {
  const byType = new Map<QuestionType, { total: number; correct: number }>();
  for (const q of questions) {
    const type = classifyQuestionType(q.statement);
    const entry = byType.get(type) ?? { total: 0, correct: 0 };
    entry.total++;
    const answer = answers[q.id];
    if (answer && q.options.find((o) => o.key === answer)?.isCorrect) entry.correct++;
    byType.set(type, entry);
  }
  return (["direta", "excecao", "calculo"] as const)
    .filter((t) => byType.has(t))
    .map((type) => {
      const e = byType.get(type)!;
      return { type, total: e.total, correct: e.correct, accuracy: e.total > 0 ? e.correct / e.total : 0 };
    });
}

/* ------------------------------------------------------------------------------------------------
 * Comparação com simulados anteriores
 * ---------------------------------------------------------------------------------------------- */

export interface PreviousComparison {
  hasPrevious: boolean;
  previousCount: number;
  /** Tendência por disciplina: "melhorando" | "piorando" | "estavel" — comparado ao simulado
   * completo anterior mais recente do mesmo tipo (mesmas disciplinas). null se não há base. */
  bySubjectTrend: Array<{ subjectId: string; name: string; deltaPoints: number; trend: "melhorando" | "piorando" | "estavel" }>;
  totalScoreDeltaFromLast: number | null;
}

/** Compara o resultado atual com o(s) `MockExamAttempt` anteriores JÁ concluídos do mesmo aluno,
 * do mesmo conjunto de disciplinas (pra não comparar um simulado completo com um parcial de
 * Matemática, por exemplo). */
export function compareToPrevious(currentResult: MockExamResult, previousAttempts: MockExamAttempt[]): PreviousComparison {
  const finished = previousAttempts
    .filter((a) => a.status === "concluido" && a.scoreBySubject && a.finishedAt)
    .sort((a, b) => (b.finishedAt ?? "").localeCompare(a.finishedAt ?? ""));

  if (finished.length === 0) {
    return { hasPrevious: false, previousCount: 0, bySubjectTrend: [], totalScoreDeltaFromLast: null };
  }

  const last = finished[0];
  const bySubjectTrend = currentResult.bySubject.map((s) => {
    const previousPoints = last.scoreBySubject?.[s.subjectId];
    const delta = typeof previousPoints === "number" ? s.points - previousPoints : 0;
    const trend: "melhorando" | "piorando" | "estavel" = typeof previousPoints !== "number" || delta === 0 ? "estavel" : delta > 0 ? "melhorando" : "piorando";
    return { subjectId: s.subjectId, name: s.name, deltaPoints: delta, trend };
  });

  return {
    hasPrevious: true,
    previousCount: finished.length,
    bySubjectTrend,
    totalScoreDeltaFromLast: typeof last.totalScore === "number" ? currentResult.totalPoints - last.totalScore : null,
  };
}

/* ------------------------------------------------------------------------------------------------
 * Diagnóstico consolidado
 * ---------------------------------------------------------------------------------------------- */

export interface MockExamDiagnostic {
  timeBySubject: SubjectTimeStat[];
  accuracyByType: QuestionTypeStat[];
  comparison: PreviousComparison;
  elimination: EliminationCheck | null; // null quando não se aplica (simulado parcial)
}

export function buildMockExamDiagnostic(
  questions: Question[],
  answers: Record<string, string>,
  responseTimesMs: Record<string, number>,
  currentResult: MockExamResult,
  previousAttempts: MockExamAttempt[],
): MockExamDiagnostic {
  return {
    timeBySubject: computeTimeBySubject(questions, responseTimesMs),
    accuracyByType: computeAccuracyByQuestionType(questions, answers),
    comparison: compareToPrevious(currentResult, previousAttempts),
    elimination: canCheckEliminationRules(currentResult.bySubject) ? checkEliminationRules(currentResult.bySubject) : null,
  };
}
