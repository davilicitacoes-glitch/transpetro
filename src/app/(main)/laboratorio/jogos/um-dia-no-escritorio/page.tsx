"use client";

import Link from "next/link";
import { ArrowLeft, Briefcase } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { OFFICE_DAY_EPISODES } from "@/content/games/officeDay";

export default function UmDiaNoEscritorioPage() {
  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <Link href="/laboratorio/jogos" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
        <ArrowLeft size={14} aria-hidden /> Jogos
      </Link>

      <PageHeader
        eyebrow="Um Dia no Escritório"
        title="Escolha o dia de trabalho"
        description="Cada dia cobre 2 códigos do edital, com e-mails, colegas e decisões reais pra você resolver."
      />

      <div className="space-y-2.5">
        {OFFICE_DAY_EPISODES.map((ep) => (
          <Link
            key={ep.id}
            href={`/laboratorio/jogos/um-dia-no-escritorio/${ep.id}`}
            className="card p-4 flex items-start gap-3 hover:border-brand/40 transition-colors"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-soft text-brand shrink-0">
              <Briefcase size={17} aria-hidden />
            </span>
            <span className="flex-1 min-w-0">
              <span className="flex items-center gap-1.5 mb-1 flex-wrap">
                <span className="text-[14px] font-semibold">{ep.title}</span>
                {ep.syllabusCodes.map((c) => (
                  <span key={c} className="chip bg-surface-muted text-foreground-muted">
                    {c}
                  </span>
                ))}
              </span>
              <span className="block text-[12.5px] text-foreground-muted">{ep.description}</span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
