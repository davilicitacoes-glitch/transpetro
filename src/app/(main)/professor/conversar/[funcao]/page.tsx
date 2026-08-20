"use client";

import { useEffect, useRef, useState, use as usePromise } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Check, History, Loader2, Send, X } from "lucide-react";
import { VoiceSession } from "@/components/professor/VoiceSession";
import { buildProfessorContext } from "@/lib/pedagogy/professorContext";
import { DEFAULT_STUDENT_ID, type ProfessorContext } from "@/lib/models/schema";
import { findToolSchema } from "@/lib/professor/toolSchemas";
import { executeProfessorTool } from "@/lib/professor/toolExecutors";
import { canSendProfessorMessage, getProfessorUsageToday, recordProfessorMessageSent } from "@/lib/professor/rateLimit";
import { listConversations, newConversationId, saveConversation, summarizeConversation } from "@/lib/professor/history";
import type { ProfessorChatMessage, ProfessorFunction, ProfessorToolCallRequest, ProfessorTurnResult } from "@/lib/professor/types";

const FUNCTION_LABEL_MAP: Record<ProfessorFunction, string> = {
  conversar: "Conversar",
  revisar_erros: "Revisar erros",
  tirar_duvida: "Tirar dúvida",
  me_teste_agora: "Me teste agora",
  plano_de_reforco: "Plano de reforço",
  corrigir_redacao: "Corrigir redação",
};

/** Monta um resumo compacto e real das últimas conversas (nenhum dado inventado) para o Professor
 * reconhecer o que já foi discutido antes, mesmo sem reabrir a conversa inteira. */
async function buildRecentSummary(): Promise<string> {
  const recent = (await listConversations()).slice(0, 4);
  if (recent.length === 0) return "";
  return recent
    .map((c) => {
      const s = summarizeConversation(c);
      const date = new Date(c.updatedAt).toLocaleDateString("pt-BR");
      return `- [${date}, ${FUNCTION_LABEL_MAP[c.activeFunction]}] Aluno perguntou: "${s.firstQuestion}" — última resposta: "${s.lastAnswerPreview}"`;
    })
    .join("\n");
}

const FUNCTION_LABEL: Record<ProfessorFunction, string> = {
  conversar: "Conversar com o Professor",
  revisar_erros: "Revisar meus erros",
  tirar_duvida: "Tirar uma dúvida",
  me_teste_agora: "Me teste agora",
  plano_de_reforco: "Plano de reforço",
  corrigir_redacao: "Corrigir redação comigo",
};

interface DisplayMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface PendingConfirmation {
  call: ProfessorToolCallRequest;
  /** Chamadas restantes do mesmo turno, aguardando esta confirmação para continuar o loop. */
  siblingCalls: ProfessorToolCallRequest[];
  assistantContent: string | null;
}

export default function ProfessorConversaPage({ params }: { params: Promise<{ funcao: string }> }) {
  const { funcao } = usePromise(params);
  const activeFunction = (Object.keys(FUNCTION_LABEL).includes(funcao) ? funcao : "conversar") as ProfessorFunction;

  const [context, setContext] = useState<ProfessorContext | null>(null);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [history, setHistory] = useState<ProfessorChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingConfirmation, setPendingConfirmation] = useState<PendingConfirmation | null>(null);
  const [usage, setUsage] = useState(getProfessorUsageToday());
  const [recentSummary, setRecentSummary] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const conversationIdRef = useRef<string>(newConversationId());

  useEffect(() => {
    buildProfessorContext(DEFAULT_STUDENT_ID).then(setContext);
    buildRecentSummary().then(setRecentSummary);
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    const toSave = messages.map((m) => ({ role: m.role, content: m.content, occurredAt: new Date().toISOString() }));
    void saveConversation(conversationIdRef.current, activeFunction, toSave, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, pendingConfirmation]);

  async function runTurn(nextHistory: ProfessorChatMessage[]) {
    if (!context) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/professor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activeFunction, context, messages: nextHistory, recentConversationsSummary: recentSummary }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "O Professor não conseguiu responder agora. Tente de novo em instantes.");
        setLoading(false);
        return;
      }
      const result: ProfessorTurnResult = await res.json();

      if (result.type === "message") {
        setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: result.content }]);
        setHistory([...nextHistory, { role: "assistant", content: result.content }]);
        setLoading(false);
        return;
      }

      // tool_calls: separa as de execução automática das que exigem confirmação
      const autoCalls = result.calls.filter((c) => findToolSchema(c.name)?.risk !== "confirm");
      const confirmCalls = result.calls.filter((c) => findToolSchema(c.name)?.risk === "confirm");

      const assistantMsg: ProfessorChatMessage = { role: "assistant", content: result.assistantContent ?? "" };
      let workingHistory = [...nextHistory, assistantMsg];

      for (const call of autoCalls) {
        const toolResult = await executeProfessorTool(call);
        workingHistory = [...workingHistory, { role: "tool", content: JSON.stringify(toolResult), toolCallId: call.id, toolName: call.name }];
      }

      if (confirmCalls.length > 0) {
        setPendingConfirmation({ call: confirmCalls[0], siblingCalls: confirmCalls.slice(1), assistantContent: result.assistantContent });
        setHistory(workingHistory);
        setLoading(false);
        return;
      }

      // Sem confirmação pendente: continua o loop automaticamente com os resultados das ferramentas.
      await runTurn(workingHistory);
    } catch {
      setError("Falha de rede ao falar com o Professor. Verifique sua conexão e tente de novo.");
      setLoading(false);
    }
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    if (!canSendProfessorMessage()) {
      setError(`Limite diário de mensagens do Professor atingido (${usage.limit}/dia). Volte amanhã.`);
      return;
    }
    setInput("");
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", content: text }]);
    recordProfessorMessageSent();
    setUsage(getProfessorUsageToday());
    const nextHistory: ProfessorChatMessage[] = [...history, { role: "user", content: text }];
    setHistory(nextHistory);
    await runTurn(nextHistory);
  }

  async function handleConfirm(accept: boolean) {
    if (!pendingConfirmation) return;
    const { call, siblingCalls } = pendingConfirmation;
    setPendingConfirmation(null);
    setLoading(true);

    let workingHistory = [...history];
    if (accept) {
      try {
        const toolResult = await executeProfessorTool(call);
        workingHistory = [...workingHistory, { role: "tool", content: JSON.stringify(toolResult), toolCallId: call.id, toolName: call.name }];
      } catch {
        workingHistory = [...workingHistory, { role: "tool", content: JSON.stringify({ erro: "Falha ao registrar." }), toolCallId: call.id, toolName: call.name }];
      }
    } else {
      workingHistory = [...workingHistory, { role: "tool", content: JSON.stringify({ recusado: true }), toolCallId: call.id, toolName: call.name }];
    }

    if (siblingCalls.length > 0) {
      setPendingConfirmation({ call: siblingCalls[0], siblingCalls: siblingCalls.slice(1), assistantContent: null });
      setHistory(workingHistory);
      setLoading(false);
      return;
    }

    await runTurn(workingHistory);
  }

  return (
    <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-4 md:px-8 md:py-6 pb-28 h-[calc(100vh-3.5rem)]">
      <div className="flex items-center justify-between gap-3 mb-3 shrink-0">
        <Link href="/professor" className="tap-target flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground">
          <ArrowLeft size={14} aria-hidden />
          Professor
        </Link>
        <span className="text-xs font-semibold">{FUNCTION_LABEL[activeFunction]}</span>
        <div className="flex items-center gap-2">
          <Link href="/professor/historico" className="tap-target text-foreground-muted hover:text-foreground" aria-label="Histórico de conversas">
            <History size={16} aria-hidden />
          </Link>
          <span className="text-[10px] text-foreground-subtle">{usage.remaining}/{usage.limit} hoje</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pb-3">
        {context && <VoiceSession activeFunction={activeFunction} context={context} recentConversationsSummary={recentSummary} conversationId={conversationIdRef.current} />}

        {messages.length === 0 && !loading && (
          <div className="card p-4 text-[13px] text-foreground-muted">
            {activeFunction === "me_teste_agora"
              ? "Diga qual assunto você quer que eu teste. Vou fazer perguntas — não vou entregar a resposta de graça."
              : "Escreva sua primeira mensagem para começar."}
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "bg-brand text-white" : "bg-surface-muted"}`}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-foreground-muted">
            <Loader2 size={14} className="animate-spin" aria-hidden />
            O Professor está pensando…
          </div>
        )}

        {pendingConfirmation && (
          <div className="card p-4 border-warning/40 bg-warning-soft/40">
            <p className="text-[12px] font-semibold mb-1">Confirmação necessária</p>
            <p className="text-[12.5px] text-foreground-muted mb-3">
              O Professor propõe: <strong>{describeToolCall(pendingConfirmation.call)}</strong>. Isso é uma inferência da IA — só vira definitivo se você confirmar.
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleConfirm(false)} className="btn btn-secondary flex-1 text-[12.5px]">
                <X size={14} aria-hidden /> Recusar
              </button>
              <button type="button" onClick={() => handleConfirm(true)} className="btn btn-primary flex-1 text-[12.5px]">
                <Check size={14} aria-hidden /> Confirmar
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="card p-3 border-danger/40 bg-danger-soft/40 flex items-start gap-2 text-[12.5px] text-danger">
            <AlertCircle size={15} className="shrink-0 mt-0.5" aria-hidden />
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escreva sua mensagem…"
            disabled={loading || !context}
            className="flex-1 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm min-h-11"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={loading || !input.trim() || !context}
            className="btn btn-primary min-h-11 px-3.5"
            aria-label="Enviar"
          >
            <Send size={16} aria-hidden />
          </button>
        </div>
      </div>
    </main>
  );
}

function describeToolCall(call: ProfessorToolCallRequest): string {
  switch (call.name) {
    case "propor_classificacao_erro":
      return `classificar este erro como "${call.arguments.natureza}"`;
    case "registrar_resultado_teste_oral":
      return `registrar resultado "${call.arguments.resultado}" no tópico "${call.arguments.topicSlug}"`;
    case "registrar_avaliacao_redacao":
      return "registrar a avaliação desta redação";
    default:
      return call.name;
  }
}
