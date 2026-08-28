"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Clock, Eraser, Info, Layers, Play, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { generateFullMockExam, scoreMockExam, type GeneratedMockExam, type MockExamResult } from "@/lib/mock/generator";
import { EXAM_BLUEPRINT, OBJECTIVE_MIN_PASSING_POINTS, OBJECTIVE_TOTAL_QUESTIONS, EXAM_DURATION_HOURS } from "@config/concurso";
import { getDB } from "@/lib/db/dexie";
import { finishMockExamAttempt, getRecentMockExamAttempts, startMockExamAttempt, startOrResumeSession, endSession } from "@/lib/pedagogy/service";
import { newId } from "@/lib/pedagogy/ids";
import { DEFAULT_STUDENT_ID, type MockExam } from "@/lib/models/schema";

const KEYS = ["A", "B", "C", "D", "E"] as const;

function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}` : `${m}:${String(sec).padStart(2, "0")}`;
}

/**
 * Simulado em condição real de prova (Laboratório, ferramenta 2.2) — cartão-resposta.
 *
 * Diferença deliberada do /simulados normal: em vez do QuestionCard (clique numa alternativa =
 * resposta), cada questão tem um cartão-resposta de verdade embaixo (5 bolhas A-E clicáveis,
 * independentes umas das outras) — clicar numa bolha já marcada a DESMARCA (simulando apagar);
 * marcar mais de uma bolha na mesma questão fica marcado como estava, sem forçar escolha única, do
 * jeito que aconteceria numa folha de papel de verdade se o aluno marcar errado.
 *
 * "Fora do padrão" (mission 2.2): num formulário digital não existe "marca fraca" ou "borrão" de
 * lápis pra detectar de verdade — a leitura honesta desse requisito aqui é: um padrão de marcação
 * INSTÁVEL (a mesma questão apagada e remarcada 2+ vezes) é o equivalente digital mais próximo, e é
 * isso que fica sinalizado, documentado nesta nota pro aluno em vez de fingir detectar algo que a
 * tela não tem como detectar.
 */
export default function SimuladoCartaoRespostaPage() {
  const [exam, setExam] = useState<GeneratedMockExam | null>(null);
  const [marks, setMarks] = useState<Record<string, Set<string>>>({});
  const [eraseCounts, setEraseCounts] = useState<Record<string, number>>({});
  const [result, setResult] = useState<MockExamResult | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [mockExamAttemptId, setMockExamAttemptId] = useState<string | null>(null);
  const [finishing, setFinishing] = useState(false);
  const [starting, setStarting] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState<number | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (secondsRemaining === null || result) return;
    if (secondsRemaining <= 0) {
      finishRef.current();
      return;
    }
    const timer = setTimeout(() => setSecondsRemaining((s) => (s !== null ? s - 1 : s)), 1000);
    return () => clearTimeout(timer);
  }, [secondsRemaining, result]);

  async function start() {
    setStarting(true);
    try {
      const recent = await getRecentMockExamAttempts(DEFAULT_STUDENT_ID, 2);
      const excludeIds = new Set(recent.flatMap((a) => a.answers.map((ans) => ans.questionId)));
      const generated = generateFullMockExam(Date.now(), excludeIds);
      setExam(generated);
      setMarks({});
      setEraseCounts({});
      setResult(null);

      const seconds = Math.round(EXAM_DURATION_HOURS * 3600);
      setTotalSeconds(seconds);
      setSecondsRemaining(seconds);

      const session = await startOrResumeSession("simulado");
      setSessionId(session.id);

      const db = getDB();
      const mockExam: MockExam = {
        id: newId("mockexam"),
        title: "Simulado em condição real — cartão-resposta",
        kind: "completo",
        questionIds: generated.questions.map((q) => q.id),
        blueprint: EXAM_BLUEPRINT.map((s) => ({ subjectId: s.id, name: s.name, questionCount: s.questionCount, pointsPerQuestion: s.pointsPerQuestion })),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await db.mockExams.put(mockExam);
      const attempt = await startMockExamAttempt(mockExam.id, session.id, DEFAULT_STUDENT_ID);
      setMockExamAttemptId(attempt.id);
    } finally {
      setStarting(false);
    }
  }

  function toggleBubble(questionId: string, key: string) {
    if (result) return;
    setMarks((prev) => {
      const current = new Set(prev[questionId] ?? []);
      if (current.has(key)) {
        current.delete(key);
        setEraseCounts((prevCounts) => ({ ...prevCounts, [questionId]: (prevCounts[questionId] ?? 0) + 1 }));
      } else {
        current.add(key);
      }
      return { ...prev, [questionId]: current };
    });
  }

  async function finish() {
    if (!exam) return;
    // Só entra no placar quem tem exatamente 1 bolha marcada — em branco ou dupla marcação vira
    // "sem resposta válida", igual aconteceria na correção de um cartão-resposta real.
    const answers: Record<string, string> = {};
    for (const q of exam.questions) {
      const marked = marks[q.id];
      if (marked && marked.size === 1) answers[q.id] = [...marked][0];
    }
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
  finishRef.current = finish;

  const doubleMarked = exam ? exam.questions.filter((q) => (marks[q.id]?.size ?? 0) > 1) : [];
  const blank = exam ? exam.questions.filter((q) => (marks[q.id]?.size ?? 0) === 0) : [];
  const unstable = exam ? exam.questions.filter((q) => (eraseCounts[q.id] ?? 0) >= 2) : [];

  if (!exam) {
    return (
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
        <Link href="/laboratorio" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
          <ArrowLeft size={14} aria-hidden /> Laboratório
        </Link>

        <PageHeader
          eyebrow="Laboratório · condição real de prova"
          title="Simulado com cartão-resposta"
          description={`Prova completa (${OBJECTIVE_TOTAL_QUESTIONS} questões, blueprint oficial), ${EXAM_DURATION_HOURS}h de cronômetro real, respondida marcando bolhas A-E — igual ao dia da prova, sem clicar direto na alternativa.`}
        />

        <div className="mb-4 flex items-start gap-2 rounded-lg bg-brand-soft p-3 text-[11.5px] text-foreground">
          <Info size={14} className="text-brand shrink-0 mt-0.5" aria-hidden />
          <p>
            Clique numa bolha pra marcar; clique de novo pra desmarcar (apagar). No final, questões
            com mais de uma bolha marcada, em branco, ou remarcadas 2+ vezes ficam sinalizadas — do
            jeito que um corretor de cartão-resposta real avisaria.
          </p>
        </div>

        <button
          type="button"
          onClick={start}
          disabled={starting}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand text-brand-foreground font-medium py-3 text-sm hover:opacity-90 shadow-sm disabled:opacity-60"
        >
          <Play size={16} aria-hidden />
          {starting ? "Gerando…" : "Iniciar simulado"}
        </button>
      </main>
    );
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <Link href="/laboratorio" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
        <ArrowLeft size={14} aria-hidden /> Laboratório
      </Link>

      <PageHeader
        eyebrow="Cartão-resposta"
        title={result ? "Resultado do simulado" : `${exam.questions.length} questões`}
        action={
          <div className="flex items-center gap-2">
            {!result && secondsRemaining !== null && (
              <span className={`chip font-mono ${secondsRemaining < 300 ? "bg-danger-soft text-danger" : "bg-surface-muted text-foreground-muted"}`}>
                <Clock size={12} aria-hidden /> {formatClock(secondsRemaining)}
              </span>
            )}
            <button type="button" onClick={start} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-surface-muted">
              <RotateCcw size={13} aria-hidden />
              Novo simulado
            </button>
          </div>
        }
      />

      {result && (
        <>
          <section className="card-raised p-5 mb-5">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[34px] font-bold leading-none">{result.totalPoints}</span>
              <span className="text-foreground-muted text-sm">/ {result.maxPoints} pontos</span>
            </div>
            <p className="text-sm text-foreground-muted mb-3">
              {result.correctCount} acertos em {result.totalQuestions} questões
            </p>
            <span className={`chip ${result.passedMinimum ? "bg-success-soft text-success" : "bg-danger-soft text-danger"}`}>
              {result.passedMinimum ? "Acima do mínimo eliminatório" : "Abaixo do mínimo eliminatório"} ({OBJECTIVE_MIN_PASSING_POINTS} pts)
            </span>
          </section>

          {(doubleMarked.length > 0 || blank.length > 0 || unstable.length > 0) && (
            <section className="card p-4 mb-5 border-l-4 border-l-warning">
              <p className="flex items-center gap-2 text-[13px] font-semibold text-warning mb-2.5">
                <AlertTriangle size={14} aria-hidden />
                Alertas do cartão-resposta
              </p>
              <div className="space-y-2 text-[12.5px]">
                {doubleMarked.length > 0 && (
                  <p>
                    <strong>{doubleMarked.length} questão(ões) com dupla marcação</strong> —{" "}
                    {doubleMarked.length === 1 ? "questão" : "questões"} {doubleMarked.map((q) => exam.questions.indexOf(q) + 1).join(", ")}. Numa
                    prova real, isso anula a resposta.
                  </p>
                )}
                {blank.length > 0 && (
                  <p>
                    <strong>{blank.length} questão(ões) em branco</strong> — {blank.length === 1 ? "questão" : "questões"}{" "}
                    {blank.map((q) => exam.questions.indexOf(q) + 1).join(", ")}.
                  </p>
                )}
                {unstable.length > 0 && (
                  <p className="flex items-start gap-1.5">
                    <Eraser size={12} className="shrink-0 mt-0.5" aria-hidden />
                    <span>
                      <strong>{unstable.length} questão(ões) com marcação instável</strong> (apagada e remarcada 2+ vezes) —{" "}
                      {unstable.length === 1 ? "questão" : "questões"} {unstable.map((q) => exam.questions.indexOf(q) + 1).join(", ")}.
                    </span>
                  </p>
                )}
              </div>
            </section>
          )}
        </>
      )}

      <div className="space-y-4">
        {exam.questions.map((q, i) => {
          const questionMarks = marks[q.id] ?? new Set<string>();
          const correctKey = q.options.find((o) => o.isCorrect)?.key;
          return (
            <article key={q.id} className="card p-4">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="chip bg-surface-muted text-foreground-muted">Q{i + 1}</span>
                {result && questionMarks.size === 1 && (
                  <span className={`chip ${[...questionMarks][0] === correctKey ? "bg-success-soft text-success" : "bg-danger-soft text-danger"}`}>
                    {[...questionMarks][0] === correctKey ? "Acertou" : "Errou"}
                  </span>
                )}
                {result && questionMarks.size !== 1 && <span className="chip bg-warning-soft text-warning">Sem resposta válida</span>}
              </div>
              <p className="text-[13.5px] leading-relaxed mb-3">{q.statement}</p>
              <div className="space-y-1 mb-3">
                {q.options.map((opt) => (
                  <p key={opt.key} className="text-[12.5px] text-foreground-muted">
                    <span className="font-semibold">{opt.key}</span> {opt.text}
                  </p>
                ))}
              </div>

              <div className="flex items-center gap-2.5 pt-2 border-t border-border">
                <span className="text-[10px] text-foreground-subtle uppercase tracking-wide">Cartão-resposta</span>
                {KEYS.map((key) => {
                  const marked = questionMarks.has(key);
                  const isCorrectKey = result && key === correctKey;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => toggleBubble(q.id, key)}
                      disabled={!!result}
                      aria-label={`Marcar alternativa ${key}`}
                      className={`w-8 h-8 rounded-full border-2 text-[12px] font-semibold flex items-center justify-center transition-colors ${
                        marked
                          ? isCorrectKey
                            ? "border-success bg-success text-white"
                            : result
                              ? "border-danger bg-danger text-white"
                              : "border-brand bg-brand text-brand-foreground"
                          : isCorrectKey
                            ? "border-success text-success"
                            : "border-border text-foreground-muted hover:border-brand"
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>

      {!result && (
        <button
          type="button"
          onClick={finish}
          disabled={finishing}
          className="mt-5 w-full flex items-center justify-center gap-2 rounded-lg bg-brand text-brand-foreground font-medium py-3 text-sm hover:opacity-90 shadow-sm disabled:opacity-60"
        >
          <Layers size={15} aria-hidden />
          {finishing ? "Salvando…" : `Entregar o cartão-resposta (${Object.values(marks).filter((s) => s.size > 0).length}/${exam.questions.length} marcadas)`}
        </button>
      )}
    </main>
  );
}
