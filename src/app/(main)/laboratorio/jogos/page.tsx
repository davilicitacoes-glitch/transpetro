"use client";

import Link from "next/link";
import { Briefcase } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

/** Hub "Jogos" (missão "Um Dia no Escritório", seção 1) — vive dentro do Laboratório, isolado da
 * navegação do Meu Curso. Lista os jogos temáticos do motor genérico (ver
 * src/lib/games/types.ts) — hoje só "Um Dia no Escritório"; os próximos 2 jogos ("Simulador de
 * Gestor", "Detetive de Documentos") entram aqui como novos cards quando existirem. */
export default function JogosHubPage() {
  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <Link href="/laboratorio" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
        Laboratório
      </Link>

      <PageHeader
        eyebrow="Laboratório · jogos"
        title="Jogos"
        description="Pratique o conteúdo real do edital em forma de simulação — cada situação, pergunta e alternativa vem do banco de questões e das aulas já validadas, nunca inventada."
      />

      <Link href="/laboratorio/jogos/um-dia-no-escritorio" className="card p-4 flex items-start gap-3 hover:border-brand/40 transition-colors">
        <span className="flex items-center justify-center w-11 h-11 rounded-lg bg-brand-soft text-brand shrink-0">
          <Briefcase size={20} aria-hidden />
        </span>
        <span>
          <span className="block text-[14.5px] font-semibold mb-1">Um Dia no Escritório</span>
          <span className="block text-[12.5px] text-foreground-muted leading-relaxed">
            Viva um dia de trabalho no estilo Administração e Controle: responda e-mails, converse com colegas e tome decisões — cada uma
            testando um código real do edital.
          </span>
        </span>
      </Link>
    </main>
  );
}
