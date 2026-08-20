"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, PhoneOff, Check, X } from "lucide-react";
import { PROFESSOR_TOOLS, findToolSchema } from "@/lib/professor/toolSchemas";
import { executeProfessorTool } from "@/lib/professor/toolExecutors";
import { buildSystemPrompt } from "@/lib/professor/systemPrompt";
import { saveConversation } from "@/lib/professor/history";
import type { ProfessorFunction, ProfessorToolCallRequest } from "@/lib/professor/types";
import type { ProfessorContext, ProfessorMessage } from "@/lib/models/schema";

const CONSENT_KEY = "transpetro:professor-voice-consent";

type VoiceState = "idle" | "connecting" | "listening" | "speaking" | "error";

interface PendingVoiceConfirmation {
  call: ProfessorToolCallRequest;
}

export function VoiceSession({
  activeFunction,
  context,
  recentConversationsSummary,
  conversationId,
}: {
  activeFunction: ProfessorFunction;
  context: ProfessorContext;
  recentConversationsSummary?: string;
  conversationId: string;
}) {
  const [state, setState] = useState<VoiceState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [needsConsent, setNeedsConsent] = useState(false);
  const [pendingConfirmation, setPendingConfirmation] = useState<PendingVoiceConfirmation | null>(null);
  const [lastTranscript, setLastTranscript] = useState<string>("");

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const transcriptRef = useRef<ProfessorMessage[]>([]);

  function persistVoiceMessage(role: "user" | "assistant", content: string) {
    if (!content.trim()) return;
    transcriptRef.current = [...transcriptRef.current, { role, content, occurredAt: new Date().toISOString() }];
    void saveConversation(conversationId, activeFunction, transcriptRef.current, true);
  }

  useEffect(() => {
    return () => {
      disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
  }, []);

  function sendEvent(event: Record<string, unknown>) {
    if (dcRef.current?.readyState === "open") dcRef.current.send(JSON.stringify(event));
  }

  async function handleToolCall(name: string, callId: string, argsRaw: string) {
    let args: Record<string, unknown> = {};
    try {
      args = JSON.parse(argsRaw);
    } catch {
      // args inválidos — segue com objeto vazio
    }
    const call: ProfessorToolCallRequest = { id: callId, name, arguments: args };
    const risk = findToolSchema(name)?.risk ?? "auto";

    if (risk === "confirm") {
      setPendingConfirmation({ call });
      return; // aguarda decisão do aluno via handleVoiceConfirm
    }

    await runAndRespond(call);
  }

  async function runAndRespond(call: ProfessorToolCallRequest) {
    let result: unknown;
    try {
      result = await executeProfessorTool(call);
    } catch {
      result = { erro: "Falha ao executar a ação." };
    }
    sendEvent({
      type: "conversation.item.create",
      item: { type: "function_call_output", call_id: call.id, output: JSON.stringify(result) },
    });
    sendEvent({ type: "response.create" });
  }

  async function handleVoiceConfirm(accept: boolean) {
    if (!pendingConfirmation) return;
    const { call } = pendingConfirmation;
    setPendingConfirmation(null);
    if (accept) {
      await runAndRespond(call);
    } else {
      sendEvent({
        type: "conversation.item.create",
        item: { type: "function_call_output", call_id: call.id, output: JSON.stringify({ recusado: true }) },
      });
      sendEvent({ type: "response.create" });
    }
  }

  async function connect() {
    const consented = typeof window !== "undefined" && window.localStorage.getItem(CONSENT_KEY) === "1";
    if (!consented) {
      setNeedsConsent(true);
      return;
    }
    await startSession();
  }

  async function acceptConsentAndStart() {
    if (typeof window !== "undefined") window.localStorage.setItem(CONSENT_KEY, "1");
    setNeedsConsent(false);
    await startSession();
  }

  async function startSession() {
    setError(null);
    setState("connecting");
    try {
      const instructions = buildSystemPrompt(activeFunction, context, recentConversationsSummary);
      const sessionRes = await fetch("/api/professor/realtime-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instructions }),
      });
      if (!sessionRes.ok) {
        const body = await sessionRes.json().catch(() => ({}));
        throw new Error(body.error ?? "Não foi possível iniciar a sessão de voz.");
      }
      const { clientSecret } = await sessionRes.json();
      const ephemeralKey: string | undefined = clientSecret?.value ?? clientSecret;
      if (!ephemeralKey) throw new Error("Token de voz não recebido do servidor.");

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      audioElRef.current = audioEl;
      pc.ontrack = (e) => {
        audioEl.srcObject = e.streams[0];
      };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;

      dc.addEventListener("open", () => {
        sendEvent({
          type: "session.update",
          session: {
            type: "realtime",
            tools: PROFESSOR_TOOLS.map((t) => ({ type: "function" as const, ...t.function })),
            tool_choice: "auto",
          },
        });
        setState("listening");
      });

      dc.addEventListener("message", (e) => {
        try {
          const evt = JSON.parse(e.data);
          if (evt.type === "input_audio_buffer.speech_started") setState("listening");
          if (evt.type === "response.audio.delta") setState("speaking");
          if (evt.type === "response.audio_transcript.delta" && typeof evt.delta === "string") {
            setLastTranscript((prev) => (prev + evt.delta).slice(-400));
          }
          if (evt.type === "response.audio_transcript.done" && typeof evt.transcript === "string") {
            persistVoiceMessage("assistant", evt.transcript);
          }
          if (evt.type === "conversation.item.input_audio_transcription.completed" && typeof evt.transcript === "string") {
            persistVoiceMessage("user", evt.transcript);
          }
          if (evt.type === "response.done") setState("listening");
          if (evt.type === "response.output_item.done" && evt.item?.type === "function_call") {
            void handleToolCall(evt.item.name, evt.item.call_id, evt.item.arguments ?? "{}");
          }
          if (evt.type === "error") {
            setError(evt.error?.message ?? "Erro na sessão de voz.");
          }
        } catch {
          // evento não-JSON, ignora
        }
      });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpRes = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        body: offer.sdp,
        headers: { Authorization: `Bearer ${ephemeralKey}`, "Content-Type": "application/sdp" },
      });
      if (!sdpRes.ok) {
        const detail = await sdpRes.text().catch(() => "");
        throw new Error(`Falha ao conectar à sessão de voz (${sdpRes.status}): ${detail.slice(0, 200) || "sem detalhe"}`);
      }
      const answerSdp = await sdpRes.text();
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível iniciar a voz.");
      setState("error");
      disconnect();
    }
  }

  function disconnect() {
    dcRef.current?.close();
    dcRef.current = null;
    pcRef.current?.getSenders().forEach((s) => s.track?.stop());
    pcRef.current?.close();
    pcRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (audioElRef.current) audioElRef.current.srcObject = null;
    setState("idle");
    setLastTranscript("");
  }

  if (needsConsent) {
    return (
      <div className="fixed inset-0 z-50 bg-black/55 p-4 flex items-center justify-center" role="dialog" aria-modal="true">
        <div className="w-full max-w-sm rounded-2xl bg-surface p-5 shadow-xl">
          <h2 className="text-[15px] font-bold mb-2">Usar o microfone?</h2>
          <p className="text-[12.5px] text-foreground-muted mb-4">
            O áudio não é gravado nem armazenado. A transcrição da conversa fica só nesta sessão, para o Professor te responder — você pode encerrar a qualquer momento. O microfone só liga depois que você confirmar aqui.
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => setNeedsConsent(false)} className="btn btn-secondary flex-1 text-[12.5px]">
              Cancelar
            </button>
            <button type="button" onClick={acceptConsentAndStart} className="btn btn-primary flex-1 text-[12.5px]">
              Permitir e falar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-3.5 mb-3 border-brand/30 bg-brand-soft/20">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[12.5px]">
          {state === "idle" && <span className="text-foreground-muted">Voz desligada</span>}
          {state === "connecting" && <span className="text-foreground-muted">Conectando…</span>}
          {state === "listening" && <span className="text-brand font-medium">🎙️ Ouvindo — pode falar</span>}
          {state === "speaking" && <span className="text-brand font-medium">🔊 Professor falando</span>}
          {state === "error" && <span className="text-danger">Erro na voz</span>}
        </div>
        {state === "idle" || state === "error" ? (
          <button type="button" onClick={connect} className="tap-target flex items-center gap-1.5 rounded-lg bg-brand text-white px-3 py-2 text-[12.5px] font-medium">
            <Mic size={15} aria-hidden /> Falar
          </button>
        ) : (
          <button type="button" onClick={disconnect} className="tap-target flex items-center gap-1.5 rounded-lg border border-danger text-danger px-3 py-2 text-[12.5px] font-medium">
            <PhoneOff size={15} aria-hidden /> Encerrar
          </button>
        )}
      </div>

      {lastTranscript && <p className="text-[11.5px] text-foreground-muted mt-2 italic line-clamp-2">"{lastTranscript}"</p>}
      {error && <p className="text-[11.5px] text-danger mt-2">{error}</p>}

      {pendingConfirmation && (
        <div className="mt-3 rounded-lg border border-warning/40 bg-warning-soft/40 p-3">
          <p className="text-[12px] font-semibold mb-1">Confirmação necessária (por voz)</p>
          <p className="text-[12px] text-foreground-muted mb-2">
            O Professor propõe registrar: <strong>{pendingConfirmation.call.name}</strong>. Confirma?
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => handleVoiceConfirm(false)} className="btn btn-secondary flex-1 text-[12px]">
              <X size={13} aria-hidden /> Não
            </button>
            <button type="button" onClick={() => handleVoiceConfirm(true)} className="btn btn-primary flex-1 text-[12px]">
              <Check size={13} aria-hidden /> Sim
            </button>
          </div>
        </div>
      )}

      {state !== "idle" && (
        <p className="text-[10.5px] text-foreground-subtle mt-2 flex items-center gap-1">
          <MicOff size={11} aria-hidden /> O microfone só é usado nesta sessão — nada fica gravado.
        </p>
      )}
    </div>
  );
}
