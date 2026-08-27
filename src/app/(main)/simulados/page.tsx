"use client";

import { useState } from "react";
import { AlertTriangle, ClipboardList, Clock, Play, RotateCcw } from "lucide-react";
import { generateFullMockExam, scoreMockExam, type GeneratedMockExam, type MockExamResult } from "@/lib/mock/generator";
import { EXAM_BLUEPRINT, OBJECTIVE_MIN_PASSING_POINTS, OBJECTIVE_TARGET_POINTS, OBJECTIVE_TOTAL_POINTS, OBJECTIVE_TOTAL_QUESTIONS, EXAM_DURATION_HOURS } from "@config/concurso";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { getDB } from "@/lib/db/dexie";
import { finishMockExamAttempt, startMockExamAttempt, startOrResumeSession, endSession } from "@/lib/pedagogy/service";
import { newId } from "@/lib/pedagogy/ids";
import { DEFAULT_STUDENT_ID, type MockExam } from "@/lib/models/schema";

export default function SimuladosPage() {
  const [exam, setExam] = useState<GeneratedMockExam | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<MockExamResult | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [mockExamAttemptId, setMockExamAttemptId] = useState<string | null>(null);
  const [finishing, setFinishing] = useState(false);

  async function start() {
    const generated = generateFullMockExam();
    setExam(generated);
    setAnswers({});
    setResult(null);

    const session = await startOrResumeSession("simulado");
    setSessionId(session.id);

    const db = getDB();
    const mockExam: MockExam = {
      id: newId("mockexam"),
      title: "Simulado completo — formato oficial",
      kind: "completo",
      questionIds: generated.questions.map((q) => q.id),
      blueprint: EXAM_BLUEPRINT.map((s) => ({ subjectId: s.id, name: s.name, questionCount: s.questionCount, pointsPerQuestion: s.pointsPerQuestion })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await db.mockExams.put(mockExam);
    const attempt = await startMockExamAttempt(mockExam.id, session.id, DEFAULT_STUDENT_ID);
    setMockExamAttemptId(attempt.id);
  }

  async function finish() {
    if (!exam) return;
    const scored = scoreMockExam(exam.questions, answers);
    setResult(scored);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (mockExamAttemptId) {
      setFinishing(true);
      const scoreBySubject = Object.fromEntries(scored.bySubject.map((s) => [s.subjectId, s.points]));
      const answerList = exam.questions.map((q) => ({
        questionId: q.id,
        selectedKey: (answers[q.id] as "A" | "B" | "C" | "D" | "E" | undefined) ?? null,
        correctKey: q.options.find((o) => o.isCorrect)!.key,
      }));
      await finishMockExamAttempt(mockExamAttemptId, answerList, scoreBySubject, scored.totalPoints, DEFAULT_STUDENT_ID);
      if (sessionId) await endSession(sessionId, { status: "concluida" });
      setFinishing(false);
    }
  }

  if (!exam) {
    return (
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
        <PageHeader
          eyebrow="Simulados"
          title="Prova completa no formato oficial"
          description="Gerada exatamente no blueprint do edital, sem repetir questão dentro da mesma prova."
        />

        <section className="card p-5 mb-4">
          <h2 className="font-semibold text-[15px] mb-3 flex items-center gap-2">
            <ClipboardList size={16} className="text-brand" aria-hidden />
            Estrutura da prova objetiva
          </h2>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-foreground-muted border-b border-border">
                <th className="pb-2 font-medium">Disciplina</th>
                <th className="pb-2 font-medium text-center">Questões</th>
                <th className="pb-2 font-medium text-center">Peso</th>
                <th className="pb-2 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {EXAM_BLUEPRINT.map((s) => (
                <tr key={s.id} className="border-b border-border/50">
                  <td className="py-2">{s.name}</td>
                  <td className="py-2 text-center">{s.questionCount}</td>
                  <td className="py-2 text-center">{s.pointsPerQuestion} pt</td>
                  <td className="py-2 text-right font-medium">{s.totalPoints} pts</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="pt-2">Total</td>
                <td className="pt-2 text-center">{OBJECTIVE_TOTAL_QUESTIONS}</td>
                <td className="pt-2" />
                <td className="pt-2 text-right">{OBJECTIVE_TOTAL_POINTS} pts</td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-wrap gap-3 mt-4 text-xs text-foreground-muted">
            <span className="chip bg-surface-muted">Mínimo eliminatório: {OBJECTIVE_MIN_PASSING_POINTS} pts</span>
            {OBJECTIVE_TARGET_POINTS > 0 && (
              <span className="chip bg-brand-soft text-brand">Meta Transpetro Estudos: {OBJECTIVE_TARGET_POINTS} pts</span>
            )}
            <span className="chip bg-surface-muted">
              <Clock size={11} aria-hidden /> {EXAM_DURATION_HOURS}h na prova real
            </span>
          </div>
        </section>

        <button
          type="button"
          onClick={start}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand text-brand-foreground font-medium py-3 text-sm hover:opacity-90 shadow-sm"
        >
          <Play size={16} aria-hidden />
          Iniciar simulado completo
        </button>
      </main>
    );
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
      <PageHeader
        eyebrow="Simulado em andamento"
        title={result ? "Resultado do simulado" : `${exam.questions.length} questões`}
        action={
          <button
            type="button"
            onClick={start}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-surface-muted"
          >
            <RotateCcw size={13} aria-hidden />
            Novo simulado
          </button>
        }
      />

      {exam.warnings.length > 0 && (
        <div className="card p-4 mb-5 border-l-4 border-l-warning">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-warning mb-2">
            <AlertTriangle size={14} aria-hidden />
            Banco de questões ainda incompleto
          </p>
          <ul className="text-xs text-foreground-muted space-y-1">
            {exam.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {result && (
        <section className="card-raised p-5 mb-5">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-[34px] font-bold leading-none">{result.totalPoints}</span>
            <span className="text-foreground-muted text-sm">/ {result.maxPoints} pontos</span>
          </div>
          <p className="text-sm text-foreground-muted mb-4">
            {result.correctCount} acertos em {result.totalQuestions} questões
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`chip ${result.passedMinimum ? "bg-success-soft text-success" : "bg-danger-soft text-danger"}`}>
              {result.passedMinimum ? "Acima do mínimo eliminatório" : "Abaixo do mínimo eliminatório"} ({OBJECTIVE_MIN_PASSING_POINTS} pts)
            </span>
            {OBJECTIVE_TARGET_POINTS > 0 && (
              <span className="chip bg-brand-soft text-brand">
                {result.distanceToTarget === 0 ? "Meta atingida" : `Faltam ${result.distanceToTarget} pts para a meta`}
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            {result.bySubject.map((s) => {
              const pct = s.maxPoints > 0 ? (s.points / s.maxPoints) * 100 : 0;
              return (
                <div key={s.subjectId}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-foreground-muted">
                      {s.correct}/{s.total} · {s.points}/{s.maxPoints} pts
                    </span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div className="space-y-3">
        {exam.questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={i}
            selected={answers[q.id]}
            revealed={!!result}
            onSelect={(key) => setAnswers((prev) => ({ ...prev, [q.id]: key }))}
          />
        ))}
      </div>

      {!result && (
        <button
          type="button"
          onClick={finish}
          disabled={finishing}
          className="mt-5 w-full rounded-lg bg-brand text-brand-foreground font-medium py-3 text-sm hover:opacity-90 shadow-sm disabled:opacity-60"
        >
          {finishing ? "Salvando…" : `Finalizar e corrigir (${Object.keys(answers).length}/${exam.questions.length} respondidas)`}
        </button>
      )}
    </main>
  );
}
