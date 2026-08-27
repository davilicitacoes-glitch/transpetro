"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Clock, ClipboardList, Play, RotateCcw, ShieldAlert, Target, TrendingDown, TrendingUp } from "lucide-react";
import { generateFullMockExam, generateSubjectMockExam, scoreMockExam, type GeneratedMockExam, type MockExamResult } from "@/lib/mock/generator";
import { buildMockExamDiagnostic, QUESTION_TYPE_LABEL, type MockExamDiagnostic } from "@/lib/mock/diagnostics";
import { EXAM_BLUEPRINT, OBJECTIVE_MIN_PASSING_POINTS, OBJECTIVE_TOTAL_POINTS, OBJECTIVE_TOTAL_QUESTIONS, EXAM_DURATION_HOURS } from "@config/concurso";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { getDB } from "@/lib/db/dexie";
import { finishMockExamAttempt, getRecentMockExamAttempts, startMockExamAttempt, startOrResumeSession, endSession } from "@/lib/pedagogy/service";
import { newId } from "@/lib/pedagogy/ids";
import { DEFAULT_STUDENT_ID, type MockExam, type MockExamAttempt } from "@/lib/models/schema";

type ExamKind = "completo" | string; // "completo" ou o subjectId (simulado por disciplina)

function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}` : `${m}:${String(sec).padStart(2, "0")}`;
}

export default function SimuladosPage() {
  const [exam, setExam] = useState<GeneratedMockExam | null>(null);
  const [examKind, setExamKind] = useState<ExamKind>("completo");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<MockExamResult | null>(null);
  const [diagnostic, setDiagnostic] = useState<MockExamDiagnostic | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [mockExamAttemptId, setMockExamAttemptId] = useState<string | null>(null);
  const [finishing, setFinishing] = useState(false);
  const [starting, setStarting] = useState<string | null>(null);
  const [totalSeconds, setTotalSeconds] = useState<number | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [responseTimesMs, setResponseTimesMs] = useState<Record<string, number>>({});
  const lastEventAtRef = useRef<number>(Date.now());
  const finishRef = useRef<() => void>(() => {});

  // Cronômetro total, real — quando chega a 0, finaliza sozinho (como na prova real). Duração da
  // prova completa: 4h, confirmada no edital (MATRIZ_EDITAL_TRANSPETRO.md). Simulados menores (por
  // disciplina) usam uma fração proporcional da duração oficial, pelo nº de questões — suposição
  // documentada aqui, o edital só define a duração da prova completa.
  useEffect(() => {
    if (secondsRemaining === null || result) return;
    if (secondsRemaining <= 0) {
      finishRef.current();
      return;
    }
    const timer = setTimeout(() => setSecondsRemaining((s) => (s !== null ? s - 1 : s)), 1000);
    return () => clearTimeout(timer);
  }, [secondsRemaining, result]);

  async function start(kind: ExamKind) {
    setStarting(kind);
    try {
      // Evita repetir questões dos últimos 2 simulados concluídos do aluno, quando o banco permitir
      // (Motor 2, seção 3 da missão) — generateFullMockExam/generateSubjectMockExam completam com
      // questões repetidas + avisam, se o banco for pequeno demais pra isso.
      const recent = await getRecentMockExamAttempts(DEFAULT_STUDENT_ID, 2);
      const excludeIds = new Set(recent.flatMap((a) => a.answers.map((ans) => ans.questionId)));

      const generated = kind === "completo" ? generateFullMockExam(Date.now(), excludeIds) : generateSubjectMockExam(kind, undefined, Date.now(), excludeIds);
      setExam(generated);
      setExamKind(kind);
      setAnswers({});
      setResult(null);
      setDiagnostic(null);
      setResponseTimesMs({});
      lastEventAtRef.current = Date.now();

      const questionCount = generated.questions.length;
      const seconds = Math.round(EXAM_DURATION_HOURS * 3600 * (questionCount / OBJECTIVE_TOTAL_QUESTIONS));
      setTotalSeconds(seconds);
      setSecondsRemaining(seconds);

      const session = await startOrResumeSession("simulado");
      setSessionId(session.id);

      const db = getDB();
      const blueprintSubject = EXAM_BLUEPRINT.find((s) => s.id === kind);
      const mockExam: MockExam = {
        id: newId("mockexam"),
        title: kind === "completo" ? "Simulado completo — formato oficial" : `Simulado — ${blueprintSubject?.name ?? kind}`,
        kind: kind === "completo" ? "completo" : "por_disciplina",
        subjectSlug: kind === "completo" ? undefined : kind,
        questionIds: generated.questions.map((q) => q.id),
        blueprint: kind === "completo" ? EXAM_BLUEPRINT.map((s) => ({ subjectId: s.id, name: s.name, questionCount: s.questionCount, pointsPerQuestion: s.pointsPerQuestion })) : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await db.mockExams.put(mockExam);
      const attempt = await startMockExamAttempt(mockExam.id, session.id, DEFAULT_STUDENT_ID);
      setMockExamAttemptId(attempt.id);
    } finally {
      setStarting(null);
    }
  }

  function handleSelect(questionId: string, key: string) {
    const now = Date.now();
    // Tempo real decorrido desde a resposta anterior (ou o início do simulado, na primeira resposta),
    // atribuído à questão que acabou de ser respondida. Não é "tempo de leitura isolado" se o aluno
    // pular questões e voltar depois — é medição real do relógio, documentada aqui e no diagnóstico.
    if (!answers[questionId]) {
      const elapsed = now - lastEventAtRef.current;
      setResponseTimesMs((prev) => ({ ...prev, [questionId]: elapsed }));
      lastEventAtRef.current = now;
    }
    setAnswers((prev) => ({ ...prev, [questionId]: key }));
  }

  async function finish() {
    if (!exam) return;
    const scored = scoreMockExam(exam.questions, answers);
    setResult(scored);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const previousAttempts = await getRecentMockExamAttempts(DEFAULT_STUDENT_ID, 10);
    setDiagnostic(buildMockExamDiagnostic(exam.questions, answers, responseTimesMs, scored, previousAttempts));

    if (mockExamAttemptId) {
      setFinishing(true);
      const scoreBySubject = Object.fromEntries(scored.bySubject.map((s) => [s.subjectId, s.points]));
      const answerList = exam.questions.map((q) => ({
        questionId: q.id,
        selectedKey: (answers[q.id] as "A" | "B" | "C" | "D" | "E" | undefined) ?? null,
        correctKey: q.options.find((o) => o.isCorrect)!.key,
        responseTimeMs: responseTimesMs[q.id],
      }));
      await finishMockExamAttempt(mockExamAttemptId, answerList, scoreBySubject, scored.totalPoints, DEFAULT_STUDENT_ID);
      if (sessionId) await endSession(sessionId, { status: "concluida" });
      setFinishing(false);
    }
  }
  finishRef.current = finish;

  if (!exam) {
    return (
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
        <PageHeader
          eyebrow="Simulados"
          title="Prova no formato oficial, com cronômetro real"
          description="Simulado completo (60 questões, blueprint oficial) ou por disciplina, pra praticar com mais frequência. Sem repetir questão dentro da mesma prova, e evita repetir dos últimos simulados quando o banco permitir."
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
            <span className="chip bg-surface-muted">Mínimo eliminatório: {OBJECTIVE_MIN_PASSING_POINTS} pts (regra simplificada — o diagnóstico do resultado aplica as 4 condições reais)</span>
            <span className="chip bg-surface-muted">
              <Clock size={11} aria-hidden /> {EXAM_DURATION_HOURS}h na prova real
            </span>
          </div>
        </section>

        <button
          type="button"
          onClick={() => start("completo")}
          disabled={starting !== null}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand text-brand-foreground font-medium py-3 text-sm hover:opacity-90 shadow-sm disabled:opacity-60 mb-3"
        >
          <Play size={16} aria-hidden />
          {starting === "completo" ? "Gerando…" : `Iniciar simulado completo (${OBJECTIVE_TOTAL_QUESTIONS} questões, ${EXAM_DURATION_HOURS}h)`}
        </button>

        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">Ou pratique por disciplina</p>
        <div className="grid sm:grid-cols-3 gap-2">
          {EXAM_BLUEPRINT.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => start(s.id)}
              disabled={starting !== null}
              className="card p-3.5 text-left hover:shadow-md transition-shadow disabled:opacity-60"
            >
              <p className="text-[13px] font-medium mb-0.5">{starting === s.id ? "Gerando…" : s.name}</p>
              <p className="text-[11px] text-foreground-muted">{s.questionCount} questões</p>
            </button>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
      <PageHeader
        eyebrow="Simulado em andamento"
        title={result ? "Resultado do simulado" : `${exam.questions.length} questões`}
        action={
          <div className="flex items-center gap-2">
            {!result && secondsRemaining !== null && (
              <span
                className={`chip font-mono ${secondsRemaining < 300 ? "bg-danger-soft text-danger" : "bg-surface-muted text-foreground-muted"}`}
                title={`Tempo total: ${totalSeconds !== null ? formatClock(totalSeconds) : ""}`}
              >
                <Clock size={12} aria-hidden /> {formatClock(secondsRemaining)}
              </span>
            )}
            <button
              type="button"
              onClick={() => start(examKind)}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-surface-muted"
            >
              <RotateCcw size={13} aria-hidden />
              Novo simulado
            </button>
          </div>
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

      {diagnostic && <DiagnosticReport diagnostic={diagnostic} />}

      <div className="space-y-3">
        {exam.questions.map((q, i) => (
          <div key={q.id}>
            <QuestionCard
              question={q}
              index={i}
              selected={answers[q.id]}
              revealed={!!result}
              onSelect={(key) => handleSelect(q.id, key)}
            />
            {answers[q.id] && responseTimesMs[q.id] && (
              <p className="text-[10.5px] text-foreground-subtle mt-1 ml-1">respondida em {Math.round(responseTimesMs[q.id] / 1000)}s</p>
            )}
          </div>
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

function DiagnosticReport({ diagnostic }: { diagnostic: MockExamDiagnostic }) {
  return (
    <section className="card p-5 mb-5 space-y-5">
      <h2 className="font-semibold text-[15px] flex items-center gap-2">
        <Target size={16} className="text-brand" aria-hidden />
        Raio-X do desempenho
      </h2>

      {diagnostic.elimination && (
        <div className={`rounded-lg p-3.5 text-[13px] flex gap-2.5 ${diagnostic.elimination.seriaEliminado ? "bg-danger-soft" : "bg-success-soft"}`}>
          <ShieldAlert size={16} className={`shrink-0 mt-0.5 ${diagnostic.elimination.seriaEliminado ? "text-danger" : "text-success"}`} aria-hidden />
          <div>
            <p className="font-semibold mb-1">
              {diagnostic.elimination.seriaEliminado ? "Neste simulado, você teria sido eliminado(a)." : "Neste simulado, você não teria sido eliminado(a) por nenhuma das 4 regras de corte."}
            </p>
            {diagnostic.elimination.motivos.length > 0 && (
              <ul className="list-disc pl-4 space-y-0.5 text-foreground-muted">
                {diagnostic.elimination.motivos.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {diagnostic.timeBySubject.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">Tempo médio por disciplina</p>
          <div className="space-y-1.5">
            {diagnostic.timeBySubject.map((s) => (
              <div key={s.subjectId} className="flex justify-between text-[13px]">
                <span>{s.name}</span>
                <span className="text-foreground-muted">{Math.round(s.averageMs / 1000)}s/questão em média ({s.questionCount} medidas)</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {diagnostic.accuracyByType.length > 1 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">
            Acerto por tipo de questão <span className="normal-case font-normal text-foreground-subtle">(classificação automática pelo enunciado, não é dado oficial da banca)</span>
          </p>
          <div className="space-y-1.5">
            {diagnostic.accuracyByType.map((t) => (
              <div key={t.type} className="flex justify-between text-[13px]">
                <span>{QUESTION_TYPE_LABEL[t.type]}</span>
                <span className="text-foreground-muted">{t.correct}/{t.total} ({Math.round(t.accuracy * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">Comparação com simulados anteriores</p>
        {diagnostic.comparison.hasPrevious ? (
          <div className="space-y-1.5">
            {diagnostic.comparison.totalScoreDeltaFromLast !== null && (
              <p className="text-[13px] mb-1.5">
                {diagnostic.comparison.totalScoreDeltaFromLast > 0
                  ? `${diagnostic.comparison.totalScoreDeltaFromLast} pts a mais que o simulado anterior.`
                  : diagnostic.comparison.totalScoreDeltaFromLast < 0
                    ? `${Math.abs(diagnostic.comparison.totalScoreDeltaFromLast)} pts a menos que o simulado anterior.`
                    : "Mesma pontuação do simulado anterior."}
              </p>
            )}
            {diagnostic.comparison.bySubjectTrend.map((s) => (
              <div key={s.subjectId} className="flex items-center justify-between text-[13px]">
                <span>{s.name}</span>
                <span className={`flex items-center gap-1 ${s.trend === "melhorando" ? "text-success" : s.trend === "piorando" ? "text-danger" : "text-foreground-muted"}`}>
                  {s.trend === "melhorando" && <TrendingUp size={12} aria-hidden />}
                  {s.trend === "piorando" && <TrendingDown size={12} aria-hidden />}
                  {s.deltaPoints > 0 ? `+${s.deltaPoints}` : s.deltaPoints} pts
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[13px] text-foreground-muted">Este é seu primeiro simulado concluído com este conjunto de disciplinas — sem base ainda para comparar.</p>
        )}
      </div>
    </section>
  );
}
