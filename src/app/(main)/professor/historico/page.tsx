"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mic, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { deleteConversation, listConversations, summarizeConversation } from "@/lib/professor/history";
import type { ProfessorConversation } from "@/lib/models/schema";
import type { ProfessorFunction } from "@/lib/professor/types";

const FUNCTION_LABEL: Record<ProfessorFunction, string> = {
  conversar: "Conversar com o Professor",
  revisar_erros: "Revisar meus erros",
  tirar_duvida: "Tirar uma dúvida",
  me_teste_agora: "Me teste agora",
  plano_de_reforco: "Plano de reforço",
  corrigir_redacao: "Corrigir redação comigo",
};

export default function ProfessorHistoricoPage() {
  const [conversations, setConversations] = useState<ProfessorConversation[] | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    listConversations().then(setConversations);
  }, []);

  async function handleDelete(id: string) {
    await deleteConversation(id);
    setConversations((prev) => prev?.filter((c) => c.id !== id) ?? null);
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in pb-10">
      <Link href="/professor" className="tap-target flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
        <ArrowLeft size={14} aria-hidden />
        Professor
      </Link>
      <PageHeader
        eyebrow="Professor Transpetro Estudos"
        title="Histórico de conversas"
        description="Guardado só neste navegador. Pode apagar qualquer conversa, ou desligar o histórico em Configurações."
      />

      {!conversations ? (
        <p className="text-sm text-foreground-muted">Carregando…</p>
      ) : conversations.length === 0 ? (
        <div className="card p-6 text-center text-sm text-foreground-muted">Nenhuma conversa salva ainda.</div>
      ) : (
        <div className="space-y-2.5">
          {conversations.map((c) => {
            const summary = summarizeConversation(c);
            const expanded = expandedId === c.id;
            return (
              <div key={c.id} className="card p-4">
                <button type="button" onClick={() => setExpandedId(expanded ? null : c.id)} className="w-full text-left">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="chip bg-brand-soft text-brand text-[10px] py-0.5">{FUNCTION_LABEL[c.activeFunction]}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      {c.viaVoz && <Mic size={12} className="text-foreground-subtle" aria-hidden />}
                      <span className="text-[10.5px] text-foreground-subtle">{new Date(c.updatedAt).toLocaleString("pt-BR")}</span>
                    </div>
                  </div>
                  <p className="text-[13px] font-medium mb-1">{summary.firstQuestion}</p>
                  <p className="text-[11.5px] text-foreground-muted">
                    {summary.exchangeCount} troca(s) — última resposta: "{summary.lastAnswerPreview}"
                  </p>
                </button>

                {expanded && (
                  <div className="mt-3 pt-3 border-t border-border space-y-2 max-h-80 overflow-y-auto">
                    {c.messages.map((m, i) => (
                      <div key={i} className={`text-[12.5px] rounded-lg p-2.5 ${m.role === "user" ? "bg-brand-soft/40 ml-6" : "bg-surface-muted mr-6"}`}>
                        <span className="block text-[10px] font-semibold text-foreground-muted mb-0.5">{m.role === "user" ? "Você" : "Professor"}</span>
                        {m.content}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(c.id)}
                  className="mt-2.5 flex items-center gap-1.5 text-[11px] text-danger hover:underline"
                >
                  <Trash2 size={12} aria-hidden />
                  Apagar esta conversa
                </button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
