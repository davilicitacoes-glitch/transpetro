"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, CalendarClock, CheckCircle2, ExternalLink, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { formatDateBR } from "@/lib/schedule/dates";
import { getReviewsOverview, type ReviewsOverview } from "@/lib/course/service";
import type { ReviewSchedule } from "@/lib/models/schema";

const ITEM_TYPE_LABEL: Record<ReviewSchedule["itemType"], string> = {
  flashcard: "Flashcard",
  topic: "Tópico",
  question: "Questão",
  difficulty: "Dificuldade registrada",
};

const REASON_LABEL: Record<ReviewSchedule["reason"], string> = {
  regular: "revisão espaçada",
  erro: "gerada por erro",
  baixa_confianca: "baixa confiança",
  esquecimento: "esquecimento",
  simulado: "simulado",
  redacao: "redação",
  reforco: "reforço",
};

export default function MeuCursoRevisoesPage() {
  const [overview, setOverview] = useState<ReviewsOverview | null>(null);

  useEffect(() => {
    getReviewsOverview().then(setOverview);
  }, []);

  if (!overview) {
    return (
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full">
        <p className="text-sm text-foreground-muted">Carregando…</p>
      </main>
    );
  }

  const total = overview.overdue.length + overview.dueToday.length;

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in pb-10">
      <PageHeader
        eyebrow="Meu Curso"
        title="Revisões"
        description={
          total > 0
            ? `${total} revisão(ões) pendente(s) hoje — a repetição espaçada é o que fixa o conteúdo para a prova.`
            : "Nenhuma revisão pendente hoje. O que vencer aparece aqui automaticamente."
        }
      />

      <div className="grid grid-cols-2 gap-2 mb-5">
        <Link href="/revisoes" className="card p-3.5 flex items-center gap-2 hover:shadow-md transition-shadow">
          <RotateCcw size={16} className="text-brand shrink-0" aria-hidden />
          <span className="text-xs font-medium">Fila de flashcards <ExternalLink size={11} className="inline" aria-hidden /></span>
        </Link>
        <Link href="/erros" className="card p-3.5 flex items-center gap-2 hover:shadow-md transition-shadow">
          <AlertTriangle size={16} className="text-warning shrink-0" aria-hidden />
          <span className="text-xs font-medium">Caderno de erros <ExternalLink size={11} className="inline" aria-hidden /></span>
        </Link>
      </div>

      <ReviewSection
        title="Vencidas"
        icon={<AlertTriangle size={16} className="text-danger" aria-hidden />}
        items={overview.overdue}
        emptyText="Nenhuma revisão vencida. Você está em dia."
      />
      <ReviewSection
        title="Para hoje"
        icon={<CalendarClock size={16} className="text-brand" aria-hidden />}
        items={overview.dueToday}
        emptyText="Nenhuma revisão programada para hoje."
      />
      <ReviewSection
        title="Futuras"
        icon={<CalendarClock size={16} className="text-foreground-muted" aria-hidden />}
        items={overview.upcoming}
        emptyText="Nenhuma revisão futura agendada ainda."
        collapsedByDefault
      />
      <ReviewSection
        title="Concluídas recentemente"
        icon={<CheckCircle2 size={16} className="text-success" aria-hidden />}
        items={overview.completedRecently}
        emptyText="Nenhuma revisão concluída ainda."
        collapsedByDefault
        showDoneDate
      />
    </main>
  );
}

function ReviewSection({
  title,
  icon,
  items,
  emptyText,
  collapsedByDefault = false,
  showDoneDate = false,
}: {
  title: string;
  icon: React.ReactNode;
  items: ReviewSchedule[];
  emptyText: string;
  collapsedByDefault?: boolean;
  showDoneDate?: boolean;
}) {
  const [open, setOpen] = useState(!collapsedByDefault || items.length > 0 && !collapsedByDefault);

  return (
    <section className="mb-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 py-1.5 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-1.5 text-sm font-semibold">
          {icon} {title} <span className="text-xs font-normal text-foreground-muted">({items.length})</span>
        </span>
        <span className="text-xs text-foreground-muted">{open ? "ocultar" : "mostrar"}</span>
      </button>
      {open && (
        items.length === 0 ? (
          <p className="text-xs text-foreground-muted pb-2">{emptyText}</p>
        ) : (
          <ul className="space-y-1.5">
            {items.map((r) => (
              <li key={r.id} className="card p-3 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[13px] font-medium truncate">
                    {ITEM_TYPE_LABEL[r.itemType]} · {r.itemId}
                  </p>
                  <p className="text-[11px] text-foreground-muted">
                    {REASON_LABEL[r.reason]}
                    {showDoneDate && r.lastReviewedAt ? ` · revisado em ${formatDateBR(r.lastReviewedAt.slice(0, 10))}` : ` · previsto para ${formatDateBR(r.nextReviewDate)}`}
                  </p>
                </div>
                {r.itemType === "flashcard" && (
                  <Link href="/revisoes" className="text-[11px] text-brand hover:underline shrink-0">
                    Revisar
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )
      )}
    </section>
  );
}
