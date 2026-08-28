"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookmarkPlus, CheckCircle2, Loader2, MessageSquareQuote, XCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProfessorAccessGate } from "@/components/app/ProfessorAccessGate";
import { ALL_LESSONS } from "@/content/lessons";
import { getDB } from "@/lib/db/dexie";
import { newId, nowIso } from "@/lib/pedagogy/ids";
import { canSendProfessorMessage, recordProfessorMessageSent } from "@/lib/professor/rateLimit";
import { DEFAULT_STUDENT_ID, type Flashcard } from "@/lib/models/schema";
import type { FeynmanEvaluation } from "@/lib/lab/feynman";

const VERDICT_LABEL: Record<FeynmanEvaluation["verdict"], { label: string; className: string; icon: typeof CheckCircle2 }> = {
  correto: { label: "Explicação sólida", className: "bg-success-soft text-success", icon: CheckCircle2 },
  parcial: { label: "Parcialmente correta", className: "bg-warning-soft text-warning", icon: MessageSquareQuote },
  incorreto: { label: "Precisa revisar", className: "bg-danger-soft text-danger", icon: XCircle },
};

function FeynmanContent() {
  const [topicSlug, setTopicSlug] = useState(ALL_LESSONS[0]?.topicSlug ?? "");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<FeynmanEvaluation | null>(null);
  const [saved, setSaved] = useState(false);

  const lesson = ALL_LESSONS.find((l) => l.topicSlug === topicSlug);

  async function evaluate() {
    if (!explanation.trim() || loading) return;
    if (!canSendProfessorMessage()) {
      setError("Limite diário de mensagens ao Professor atingido — volta amanhã.");
      return;
    }
    setLoading(true);
    setError(null);
    setEvaluation(null);
    setSaved(false);
    try {
      const res = await fetch("/api/professor/feynman", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicSlug, explanation: explanation.trim() }),
      });
      recordProfessorMessageSent();
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Não foi possível avaliar agora.");
        return;
      }
      setEvaluation(await res.json());
    } catch {
      setError("Falha de conexão com o Professor. Tente de novo.");
    } finally {
      setLoading(false);
    }
  }

  async function saveAsFlashcard() {
    if (!lesson || !evaluation || evaluation.verdict === "incorreto") return;
    const db = getDB();
    const now = nowIso();
    const card: Flashcard = {
      id: newId("flashcard-feynman"),
      lessonSlug: lesson.topicSlug,
      front: `Explique com suas palavras: ${lesson.title}`,
      back: explanation.trim(),
      origin: "feynman",
      studentId: DEFAULT_STUDENT_ID,
      createdAt: now,
      updatedAt: now,
    };
    await db.flashcards.put(card);
    setSaved(true);
  }

  function reset() {
    setExplanation("");
    setEvaluation(null);
    setError(null);
    setSaved(false);
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <Link href="/laboratorio" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
        <ArrowLeft size={14} aria-hidden /> Laboratório
      </Link>

      <PageHeader
        eyebrow="Laboratório · técnica de Feynman"
        title="Explique com suas próprias palavras"
        description="Escolha um tema que você já estudou e explique como se estivesse ensinando alguém. O Professor avalia contra o conteúdo real da aula — nunca elogio genérico."
      />

      <div className="mb-4">
        <label htmlFor="topic" className="block text-xs font-medium mb-1.5">
          Tema
        </label>
        <select
          id="topic"
          value={topicSlug}
          onChange={(e) => {
            setTopicSlug(e.target.value);
            reset();
          }}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
        >
          {ALL_LESSONS.map((l) => (
            <option key={l.topicSlug} value={l.topicSlug}>
              {l.title}
            </option>
          ))}
        </select>
      </div>

      <textarea
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        rows={6}
        placeholder={`Explique "${lesson?.title}" como se fosse ensinar um colega...`}
        className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm resize-y mb-3"
      />

      <button
        type="button"
        onClick={evaluate}
        disabled={!explanation.trim() || loading}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand text-brand-foreground font-medium py-2.5 text-sm hover:opacity-90 disabled:opacity-50"
      >
        {loading ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <MessageSquareQuote size={15} aria-hidden />}
        {loading ? "Avaliando…" : "Pedir avaliação ao Professor"}
      </button>

      {error && <p className="mt-3 text-[12.5px] text-danger">{error}</p>}

      {evaluation && (
        <div className="card p-4 mt-4 animate-fade-in">
          <span className={`chip mb-3 ${VERDICT_LABEL[evaluation.verdict].className}`}>
            {(() => {
              const Icon = VERDICT_LABEL[evaluation.verdict].icon;
              return <Icon size={11} aria-hidden />;
            })()}
            {VERDICT_LABEL[evaluation.verdict].label}
          </span>
          <p className="text-[13.5px] leading-relaxed mb-3">{evaluation.feedback}</p>

          {evaluation.coveredPoints.length > 0 && (
            <div className="mb-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-success mb-1">Você cobriu bem</p>
              <ul className="text-[12.5px] text-foreground-muted list-disc pl-4 space-y-0.5">
                {evaluation.coveredPoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
          {evaluation.missedOrWrongPoints.length > 0 && (
            <div className="mb-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-warning mb-1">Ficou de fora ou impreciso</p>
              <ul className="text-[12.5px] text-foreground-muted list-disc pl-4 space-y-0.5">
                {evaluation.missedOrWrongPoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {evaluation.verdict !== "incorreto" &&
            (saved ? (
              <p className="text-[12.5px] text-success flex items-center gap-1.5">
                <CheckCircle2 size={13} aria-hidden /> Salvo — vai aparecer na fila de Revisões.
              </p>
            ) : (
              <button
                type="button"
                onClick={saveAsFlashcard}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-surface-muted"
              >
                <BookmarkPlus size={13} aria-hidden />
                Salvar como flashcard de revisão
              </button>
            ))}
        </div>
      )}
    </main>
  );
}

export default function FeynmanPage() {
  return (
    <ProfessorAccessGate>
      <FeynmanContent />
    </ProfessorAccessGate>
  );
}
