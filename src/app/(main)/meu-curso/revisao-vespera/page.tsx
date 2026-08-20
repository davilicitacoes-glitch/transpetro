"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, CircleAlert, ExternalLink } from "lucide-react";
import { EVE_CHECKLIST, FINAL_REVIEW_QUESTIONS, FINAL_TEN_MINUTES, LIGHTNING_MAPS, NUMBER_TABLE } from "@/content/finalReview";
import { DEFAULT_STUDENT_ID, type Attempt } from "@/lib/models/schema";
import { getFinalReviewCompletedActivities, getLatestAttemptsForQuestions, markFinalReviewActivity, recordAttempt, startOrResumeSession } from "@/lib/pedagogy/service";
import { newIdempotencyKey } from "@/lib/pedagogy/ids";

type AnswerState = Record<string, Attempt>;

export default function RevisaoVesperaPage() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [answers, setAnswers] = useState<AnswerState>({});
  const [sessionId, setSessionId] = useState<string>();
  const [loading, setLoading] = useState(true);
  const keys = useRef(new Map<string, string>());

  useEffect(() => {
    Promise.all([
      getFinalReviewCompletedActivities(DEFAULT_STUDENT_ID),
      getLatestAttemptsForQuestions(FINAL_REVIEW_QUESTIONS.map((question) => question.id), DEFAULT_STUDENT_ID),
      startOrResumeSession("revisao", "revisao-vespera"),
    ]).then(([done, previousAnswers, session]) => {
      setCompleted(done);
      setAnswers(previousAnswers);
      setSessionId(session.id);
      setLoading(false);
    });
  }, []);

  async function mark(activityId: string) {
    if (completed.has(activityId)) return;
    await markFinalReviewActivity(activityId, DEFAULT_STUDENT_ID);
    setCompleted((current) => new Set(current).add(activityId));
  }

  async function answer(questionId: string, selectedKey: "A" | "B") {
    if (answers[questionId]) return;
    const question = FINAL_REVIEW_QUESTIONS.find((item) => item.id === questionId);
    if (!question) return;
    const correctKey = question.options.find((option) => option.isCorrect)?.key;
    if (!keys.current.has(questionId)) keys.current.set(questionId, newIdempotencyKey());
    const result = await recordAttempt({
      questionId,
      selectedKey,
      correctKey,
      isCorrect: selectedKey === correctKey,
      mode: "revisao",
      sessionId,
      activityId: "revisao-vespera",
      questionOrigin: "inedita",
      idempotencyKey: keys.current.get(questionId),
    });
    setAnswers((current) => ({ ...current, [questionId]: result.attempt }));
  }

  const score = Object.values(answers).filter((attempt: Attempt) => attempt.isCorrect).length;
  const markedCount = completed.size;

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in pb-24">
      <Link href="/meu-curso" className="tap-target gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
        <ArrowLeft size={14} aria-hidden /> Meu Curso
      </Link>

      <p className="text-xs font-semibold uppercase tracking-wide text-brand mb-1">Últimos dias do plano</p>
      <h1 className="text-[23px] font-bold tracking-tight mb-2">Revisão de véspera</h1>
      <p className="text-sm text-foreground-muted mb-4">
        Consolidação sem conteúdo novo, na véspera da prova. Seu progresso, respostas, erros e revisões ficam registrados.
      </p>

      <div className="card p-4 mb-6 grid grid-cols-2 gap-3 text-center">
        <div><p className="text-xl font-bold text-brand">{Object.keys(answers).length}/50</p><p className="text-xs text-foreground-muted">afirmações respondidas</p></div>
        <div><p className="text-xl font-bold text-brand">{score}</p><p className="text-xs text-foreground-muted">acertos registrados · {markedCount} marcações</p></div>
      </div>

      {loading ? <p className="text-sm text-foreground-muted">Recuperando seu progresso…</p> : (
        <>
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-1">1. Mapas-relâmpago</h2>
            <p className="text-xs text-foreground-muted mb-3">Abra cada disciplina e marque os blocos realmente revisados.</p>
            <div className="space-y-3">
              {LIGHTNING_MAPS.map((map) => (
                <details key={map.id} className="card p-4 [content-visibility:auto] [contain-intrinsic-size:auto_260px]">
                  <summary className="cursor-pointer font-semibold text-sm">{map.subject} · 30 minutos</summary>
                  <div className="mt-4 space-y-3">
                    {map.blocks.map((block, index) => {
                      const id = `vespera-${map.id}-bloco-${index + 1}`;
                      const done = completed.has(id);
                      return (
                        <div key={id} className="rounded-lg border border-border p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div><p className="text-sm font-medium">{block.minutes} min · {block.title}</p><ul className="mt-1 list-disc pl-4 text-xs text-foreground-muted space-y-1">{block.points.map((point) => <li key={point}>{point}</li>)}</ul></div>
                            <button type="button" onClick={() => mark(id)} disabled={done} className={`shrink-0 rounded-md border px-2.5 py-1.5 text-xs ${done ? "border-success bg-success-soft text-success" : "border-border hover:border-brand"}`}>{done ? <><Check size={13} className="inline mr-1" />Revisado</> : "Marcar"}</button>
                          </div>
                        </div>
                      );
                    })}
                    <p className="text-xs"><strong>Contrastes:</strong> {map.contrasts.join("; ")}.</p>
                    <p className="text-xs text-foreground-muted"><strong>Não começar agora:</strong> {map.avoidStartingNow.join("; ")}.</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-1">2. Verdadeiro ou falso</h2>
            <p className="text-xs text-foreground-muted mb-3">O gabarito e o comentário aparecem somente depois da sua resposta. Erros abrem dificuldade e revisão na fundação pedagógica.</p>
            <div className="space-y-3">
              {FINAL_REVIEW_QUESTIONS.map((question, index) => {
                const previous = answers[question.id];
                const correct = question.options.find((option) => option.isCorrect);
                return (
                  <article key={question.id} className="card p-4 [content-visibility:auto] [contain-intrinsic-size:auto_260px]">
                    <p className="text-[11px] uppercase tracking-wide text-foreground-muted mb-1">{index + 1}/50 · {question.subjectSlug} · {question.syllabusCodes.join(", ")}</p>
                    <p className="text-[13.5px] mb-3">{question.statement}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {question.options.map((option) => {
                        const selected = previous?.selectedKey === option.key;
                        const tone = !previous ? "border-border hover:border-brand" : option.isCorrect ? "border-success bg-success-soft" : selected ? "border-danger bg-danger-soft" : "border-border opacity-60";
                        return <button key={option.key} type="button" disabled={Boolean(previous)} onClick={() => answer(question.id, option.key as "A" | "B")} className={`rounded-lg border px-3 py-2 text-sm ${tone}`}>{option.text}</button>;
                      })}
                    </div>
                    {previous && <div role="status" className={`rounded-lg p-3 mt-3 text-xs ${previous.isCorrect ? "bg-success-soft" : "bg-danger-soft"}`}><p className="font-semibold mb-1">{previous.isCorrect ? "Acertou" : `Resposta correta: ${correct?.text}`}</p><p>{correct?.explanation}</p><p className="text-foreground-muted mt-1">Fonte: {question.source.didacticSource}</p></div>}
                  </article>
                );
              })}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">3. Números que caem</h2>
            <div className="space-y-2">
              {NUMBER_TABLE.map((item) => <details key={item.id} className="card p-3.5"><summary className="cursor-pointer text-sm font-medium">{item.number} · {item.subject}</summary><div className="mt-2 text-xs space-y-1"><p><strong>{item.provision}:</strong> {item.meaning}</p><p className="text-foreground-muted">Pegadinha: {item.trap}</p>{item.officialSource.startsWith("http") ? <a href={item.officialSource} target="_blank" rel="noreferrer" className="text-brand inline-flex items-center gap-1">Fonte oficial <ExternalLink size={11} /></a> : <p className="text-foreground-muted">Fonte: {item.officialSource}</p>}</div></details>)}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-1">4. Checklist logístico</h2>
            <p className="text-xs text-foreground-muted mb-3">Estas marcações organizam a prova; não contam como domínio de conteúdo.</p>
            <div className="space-y-2">
              {EVE_CHECKLIST.map((item) => {
                const id = `vespera-${item.id}`;
                const done = completed.has(id);
                return <button key={item.id} type="button" onClick={() => mark(id)} disabled={done} className={`card p-3.5 w-full text-left flex items-start gap-3 ${done ? "border-success" : ""}`}><span className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 ${done ? "bg-success text-white border-success" : "border-border-strong"}`}>{done && <Check size={13} />}</span><span><span className="text-[10px] uppercase tracking-wide text-foreground-muted">{item.category === "confirmado" ? "Confirmado" : item.category === "cartao" ? "Confirmar no cartão" : "Organização"}</span><span className="block text-[13px]">{item.text}</span></span></button>;
              })}
            </div>
          </section>

          <section className="card p-5">
            <h2 className="text-lg font-semibold mb-1">5. Dez minutos finais</h2>
            <p className="text-xs text-foreground-muted mb-4 flex gap-1.5"><CircleAlert size={14} className="shrink-0" />Sem matéria nova. Use apenas para estabilizar estratégia e atenção.</p>
            <ol className="space-y-3">{FINAL_TEN_MINUTES.map((item) => <li key={item.minute} className="flex gap-3 text-sm"><span className="chip bg-brand-soft text-brand shrink-0">{item.minute}</span><span>{item.action}</span></li>)}</ol>
          </section>
        </>
      )}
    </main>
  );
}
