"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, RotateCcw } from "lucide-react";
import { ALL_LESSONS } from "@/content/lessons";
import { SUBJECTS } from "@/content/curriculum";
import { REVIEW_SCHEDULE_DAYS } from "@/lib/schedule/priority";
import { PageHeader } from "@/components/ui/PageHeader";
import { recordReviewResult, scheduleReview } from "@/lib/pedagogy/service";
import { DEFAULT_STUDENT_ID } from "@/lib/models/schema";

interface ReviewCard {
  /** Mesmo esquema de ID usado no seed (`flashcard-<lessonSlug>-<índice>`) — liga a revisão ao flashcard real. */
  id: string;
  front: string;
  back: string;
  lessonSlug: string;
  lessonTitle: string;
  subjectSlug: string;
}

export default function RevisoesPage() {
  const allCards = useMemo<ReviewCard[]>(
    () =>
      ALL_LESSONS.flatMap((lesson) =>
        lesson.flashcards.map((fc, idx) => ({
          id: `flashcard-${lesson.slug}-${idx}`,
          front: fc.front,
          back: fc.back,
          lessonSlug: lesson.slug,
          lessonTitle: lesson.title,
          subjectSlug: lesson.subjectSlug,
        })),
      ),
    [],
  );

  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [results, setResults] = useState<Record<number, "dominado" | "duvida" | "erro">>({});
  const [saving, setSaving] = useState(false);

  const card = allCards[index];
  const reviewed = Object.keys(results).length;
  const subject = card ? SUBJECTS.find((s) => s.slug === card.subjectSlug) : null;

  async function answer(result: "dominado" | "duvida" | "erro") {
    if (!card || saving) return;
    setSaving(true);
    // Garante que existe uma revisão agendada para este flashcard (reaproveita a pendente, se houver)
    // e só então registra o resultado — o mesmo caminho usado por qualquer revisão do sistema.
    const review = await scheduleReview({ studentId: DEFAULT_STUDENT_ID, itemType: "flashcard", itemId: card.id, reason: "regular" });
    await recordReviewResult(review.id, result);
    setResults((prev) => ({ ...prev, [index]: result }));
    setShowBack(false);
    setIndex((i) => (i + 1) % allCards.length);
    setSaving(false);
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <PageHeader
        eyebrow="Revisões"
        title={`${allCards.length} flashcards na fila`}
        description={`Revisão espaçada nos intervalos de ${REVIEW_SCHEDULE_DAYS.join(", ")} dias. Responda com honestidade — o que você marcar como erro volta antes.`}
        action={
          reviewed > 0 ? (
            <button
              type="button"
              onClick={() => {
                setResults({});
                setIndex(0);
                setShowBack(false);
              }}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-surface-muted"
            >
              <RotateCcw size={13} aria-hidden />
              Recomeçar
            </button>
          ) : undefined
        }
      />

      {reviewed > 0 && (
        <div className="card p-3 mb-5 flex items-center justify-around text-center">
          <div>
            <p className="text-[18px] font-bold text-success leading-none">
              {Object.values(results).filter((r) => r === "dominado").length}
            </p>
            <p className="text-[11px] text-foreground-muted mt-1">dominados</p>
          </div>
          <div>
            <p className="text-[18px] font-bold text-warning leading-none">
              {Object.values(results).filter((r) => r === "duvida").length}
            </p>
            <p className="text-[11px] text-foreground-muted mt-1">em dúvida</p>
          </div>
          <div>
            <p className="text-[18px] font-bold text-danger leading-none">
              {Object.values(results).filter((r) => r === "erro").length}
            </p>
            <p className="text-[11px] text-foreground-muted mt-1">erros</p>
          </div>
        </div>
      )}

      {card && (
        <>
          <div className="flex items-center justify-between mb-2">
            {subject && (
              <span className="chip" style={{ backgroundColor: `${subject.color}1a`, color: subject.color }}>
                {subject.name}
              </span>
            )}
            <span className="text-xs text-foreground-muted">
              {index + 1} de {allCards.length}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowBack((v) => !v)}
            className="card-raised w-full p-8 min-h-48 flex items-center justify-center text-center mb-4 hover:border-brand/40 transition-colors"
          >
            <span>
              <span className="block text-[15px] leading-relaxed">{showBack ? card.back : card.front}</span>
              <span className="block mt-3 text-[11px] text-foreground-subtle">
                {showBack ? "Toque para ver a pergunta" : "Toque para ver a resposta"}
              </span>
            </span>
          </button>

          {showBack && (
            <div className="grid grid-cols-3 gap-2 mb-4 animate-fade-in">
              <button
                type="button"
                onClick={() => answer("erro")}
                className="rounded-lg border border-danger text-danger py-2.5 text-xs font-medium hover:bg-danger-soft transition-colors"
              >
                Errei
              </button>
              <button
                type="button"
                onClick={() => answer("duvida")}
                className="rounded-lg border border-warning text-warning py-2.5 text-xs font-medium hover:bg-warning-soft transition-colors"
              >
                Em dúvida
              </button>
              <button
                type="button"
                onClick={() => answer("dominado")}
                className="rounded-lg border border-success text-success py-2.5 text-xs font-medium hover:bg-success-soft transition-colors"
              >
                Dominei
              </button>
            </div>
          )}

          <Link
            href={`/curso/${card.lessonSlug}`}
            className="flex items-center justify-center gap-1.5 text-xs text-brand hover:underline"
          >
            <BookOpen size={13} aria-hidden />
            Ver a aula: {card.lessonTitle}
          </Link>
        </>
      )}
    </main>
  );
}
