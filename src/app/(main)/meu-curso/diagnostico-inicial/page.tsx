"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Play, Sparkles, Target } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { pickDiagnosticTopics } from "@/lib/onboarding/diagnostic";
import { recordAttempt } from "@/lib/pedagogy/service";
import { computeScoreEstimate, type ScoreEstimate } from "@/lib/pedagogy/scoreEstimate";
import { recordScoreEstimateSnapshot } from "@/lib/pedagogy/scoreEstimateHistory";
import { startEnrollment } from "@/lib/course/service";
import { newIdempotencyKey } from "@/lib/pedagogy/ids";
import { todayInExamTimezone } from "@/lib/schedule/dates";
import { NOME_METODO, NOME_MENTOR } from "@config/metodo";
import type { Question } from "@/lib/models/schema";

/**
 * Diagnóstico inicial de triagem (missão "Método Vetor", seção 5) — primeiro contato do aluno
 * novo com uma prova de valor CONCRETA, nos primeiros minutos: responde ~12 questões reais de 4
 * códigos (2 Específicas, 1 Português, 1 Matemática — ver src/lib/onboarding/diagnostic.ts) e sai
 * de aqui com uma primeira nota estimada real, uma primeira recomendação do Vetor, e a visão dos
 * códigos mais fracos — não fica "navegando vazio" até acumular dado sozinho.
 */
export default function DiagnosticoInicialPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate") || todayInExamTimezone();
  const topics = useMemo(() => pickDiagnosticTopics(), []);
  const questions = useMemo<Question[]>(() => topics.flatMap((t) => t.questions), [topics]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [estimate, setEstimate] = useState<ScoreEstimate | null>(null);
  const [starting, setStarting] = useState(false);

  const current = questions[index];

  async function handleSelect(key: string) {
    if (!current || revealed) return;
    setSelected(key);
    setRevealed(true);
    const correctKey = current.options.find((o) => o.isCorrect)?.key;
    const isCorrect = correctKey === key;
    if (isCorrect) setCorrectCount((c) => c + 1);
    await recordAttempt({
      questionId: current.id,
      selectedKey: key as "A" | "B" | "C" | "D" | "E",
      correctKey: correctKey as "A" | "B" | "C" | "D" | "E" | undefined,
      isCorrect,
      mode: "treino",
      activityId: "diagnostico-inicial",
      idempotencyKey: newIdempotencyKey(),
    });
  }

  function next() {
    if (index + 1 >= questions.length) {
      finish();
      return;
    }
    setIndex((i) => i + 1);
    setSelected(undefined);
    setRevealed(false);
  }

  async function finish() {
    const result = await computeScoreEstimate();
    if (result.hasEnoughData) await recordScoreEstimateSnapshot(result, "regular");
    setEstimate(result);
    setFinished(true);
  }

  async function beginCourse() {
    setStarting(true);
    await startEnrollment(undefined, startDate);
    router.push("/meu-curso");
  }

  if (questions.length === 0) {
    // Honesto: se o banco não tiver questões suficientes pra montar o diagnóstico (não deveria
    // acontecer com o acervo atual), pula direto pro curso em vez de travar o aluno numa tela vazia.
    return (
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-xl mx-auto w-full animate-fade-in">
        <p className="text-sm text-foreground-muted mb-4">Diagnóstico indisponível no momento — vamos direto pro curso.</p>
        <button type="button" onClick={beginCourse} className="btn btn-primary w-full">
          Começar o curso
        </button>
      </main>
    );
  }

  if (finished && estimate) {
    return (
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-xl mx-auto w-full animate-fade-in">
        <PageHeader
          eyebrow={`${NOME_METODO} · diagnóstico concluído`}
          title="Sua primeira nota estimada"
          description={`${correctCount} de ${questions.length} questões certas no diagnóstico.`}
        />

        <div className="card-raised p-5 mb-4 text-center">
          <p className="text-[11px] text-foreground-muted uppercase tracking-wide mb-1">Nota estimada</p>
          {estimate.hasEnoughData ? (
            <>
              <p className="text-[40px] font-display font-bold text-brand leading-none mb-1">{Math.round(estimate.extrapolatedPoints)}</p>
              <p className="text-sm text-foreground-muted">de {estimate.totalPoints} pontos</p>
              <p className="text-[11px] text-foreground-muted mt-2">
                Baseada em {estimate.pointsWithData} pts já com dado real ({estimate.perCode.filter((c) => c.hasEnoughData).length} código(s)) —
                vai ficar mais precisa a cada questão que você responder no curso.
              </p>
            </>
          ) : (
            <p className="text-sm text-foreground-muted">Não foi possível calcular uma estimativa desta vez — siga pro curso normalmente.</p>
          )}
        </div>

        {estimate.topPriority.length > 0 && (
          <div className="card p-4 mb-4">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2.5">
              <Target size={13} aria-hidden /> {NOME_MENTOR} já identificou seus pontos mais frágeis
            </p>
            <ul className="space-y-1.5">
              {estimate.topPriority.slice(0, 3).map((c) => (
                <li key={c.topicSlug} className="flex items-center justify-between text-[13px]">
                  <span>
                    <span className="chip bg-surface-muted text-foreground-muted mr-1.5">{c.syllabusCode}</span>
                    {c.topicName}
                  </span>
                  {c.hasEnoughData && <span className="text-foreground-muted text-[11px]">{Math.round(c.weightedAccuracy * 100)}%</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="card p-4 mb-5 flex gap-2.5">
          <Sparkles size={16} className="text-brand shrink-0 mt-0.5" aria-hidden />
          <p className="text-[13px] leading-relaxed">
            <strong>{NOME_MENTOR}:</strong>{" "}
            {estimate.topPriority[0]
              ? `Bora começar priorizando ${estimate.topPriority[0].syllabusCode} — ${estimate.topPriority[0].topicName}. É onde seu esforço rende mais nota agora.`
              : "Seu curso vai se ajustar conforme você avança — cada resposta refina essa estimativa."}
          </p>
        </div>

        <button type="button" onClick={beginCourse} disabled={starting} className="btn btn-primary w-full">
          <Play size={16} aria-hidden />
          {starting ? "Começando…" : "Começar o curso"}
        </button>
      </main>
    );
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-xl mx-auto w-full animate-fade-in">
      <PageHeader
        eyebrow={`${NOME_METODO} · diagnóstico rápido`}
        title="Antes de começar, vamos medir seu ponto de partida"
        description={`${questions.length} questões reais, cobrindo as 3 disciplinas — leva uns 10 minutos e já te dá uma primeira nota estimada e seus pontos mais fracos.`}
      />

      <p className="text-xs text-foreground-muted mb-3">
        Questão {index + 1} de {questions.length}
      </p>

      {current && (
        <QuestionCard question={current} selected={selected} onSelect={handleSelect} revealed={revealed} showLessonLink={false} />
      )}

      {revealed && (
        <button type="button" onClick={next} className="w-full mt-4 flex items-center justify-center gap-2 rounded-lg bg-brand text-brand-foreground py-2.5 text-sm font-medium hover:opacity-90">
          {index + 1 >= questions.length ? "Ver minha nota estimada" : "Próxima"}
          <ArrowRight size={15} aria-hidden />
        </button>
      )}
    </main>
  );
}
