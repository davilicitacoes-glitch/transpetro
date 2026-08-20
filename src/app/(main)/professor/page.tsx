"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, CalendarClock, GraduationCap, HelpCircle, History, ListChecks, MessageCircle, PenLine, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { buildProfessorContext } from "@/lib/pedagogy/professorContext";
import { DEFAULT_STUDENT_ID, type ProfessorContext } from "@/lib/models/schema";
import type { ProfessorFunction } from "@/lib/professor/types";

const FUNCTIONS: Array<{ slug: ProfessorFunction; label: string; description: string; icon: typeof MessageCircle }> = [
  { slug: "conversar", label: "Conversar com o Professor", description: "Conversa livre por texto sobre qualquer matéria do curso.", icon: MessageCircle },
  { slug: "revisar_erros", label: "Revisar meus erros", description: "Sessão baseada só nos erros reais que você já cometeu.", icon: AlertTriangle },
  { slug: "tirar_duvida", label: "Tirar uma dúvida", description: "Explica um ponto específico e confirma se você entendeu de verdade.", icon: HelpCircle },
  { slug: "me_teste_agora", label: "Me teste agora", description: "Perguntas progressivas — o Professor não entrega a resposta de graça.", icon: ListChecks },
  { slug: "plano_de_reforco", label: "Plano de reforço", description: "O que precisa ser reforçado agora, com ações concretas.", icon: CalendarClock },
  { slug: "corrigir_redacao", label: "Corrigir redação comigo", description: "Explica os erros da sua redação e acompanha a reescrita.", icon: PenLine },
];

export default function ProfessorHubPage() {
  const [context, setContext] = useState<ProfessorContext | null>(null);

  useEffect(() => {
    buildProfessorContext(DEFAULT_STUDENT_ID).then(setContext);
  }, []);

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in pb-10">
      <PageHeader
        eyebrow="Professor Transpetro Estudos"
        title="Seu tutor, com seus dados reais"
        description="Fundamentado no que você já estudou, errou e revisou — não é um chat genérico."
        action={
          <Link href="/professor/historico" className="flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground">
            <History size={14} aria-hidden />
            Histórico
          </Link>
        }
      />

      {context && (
        <div className="card p-4 mb-5 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-[20px] font-bold leading-none">{context.reviewsDue.length}</p>
            <p className="text-[10.5px] text-foreground-muted mt-1">revisões vencidas</p>
          </div>
          <div>
            <p className="text-[20px] font-bold leading-none">{context.openDifficulties.length}</p>
            <p className="text-[10.5px] text-foreground-muted mt-1">dificuldades abertas</p>
          </div>
          <div>
            <p className="text-[20px] font-bold leading-none">{context.openDoubts.length}</p>
            <p className="text-[10.5px] text-foreground-muted mt-1">dúvidas em aberto</p>
          </div>
        </div>
      )}

      <div className="grid gap-2.5 sm:grid-cols-2">
        {FUNCTIONS.map((fn) => {
          const Icon = fn.icon;
          return (
            <Link key={fn.slug} href={`/professor/conversar/${fn.slug}`} className="card p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-soft text-brand shrink-0">
                <Icon size={18} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold mb-0.5">{fn.label}</p>
                <p className="text-[12px] text-foreground-muted leading-snug">{fn.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="card p-4 mt-5 flex items-start gap-2.5 border-brand/25 bg-brand-soft/25">
        <Sparkles size={16} className="text-brand shrink-0 mt-0.5" aria-hidden />
        <p className="text-[12px] text-foreground-muted">
          Tudo que o Professor sugerir (classificar um erro, marcar domínio, dar nota de redação) pede sua confirmação antes de virar definitivo. Ele nunca inventa fato — só usa o que você realmente estudou.
        </p>
      </div>

      <Link href="/meu-curso" className="flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mt-4">
        <GraduationCap size={13} aria-hidden />
        Voltar ao Meu Curso
      </Link>
    </main>
  );
}
