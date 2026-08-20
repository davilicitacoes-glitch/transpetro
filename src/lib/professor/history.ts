"use client";

import { getDB } from "@/lib/db/dexie";
import { newId, nowIso } from "@/lib/pedagogy/ids";
import { DEFAULT_STUDENT_ID, type ProfessorConversation, type ProfessorMessage } from "@/lib/models/schema";
import type { ProfessorFunction } from "@/lib/professor/types";

/** Guardar histórico é opt-out, não opt-in — o aluno pediu explicitamente esse recurso. Mas segue
 * a regra de privacidade: pode ser desligado a qualquer momento em Configurações, com exclusão
 * disponível por conversa. Nunca guarda áudio, só o texto (já transcrito) da conversa. */
const HISTORY_ENABLED_KEY = "transpetro:professor-history-enabled";

export function isHistoryEnabled(): boolean {
  if (typeof window === "undefined") return true;
  const raw = window.localStorage.getItem(HISTORY_ENABLED_KEY);
  return raw === null ? true : raw === "1";
}

export function setHistoryEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(HISTORY_ENABLED_KEY, enabled ? "1" : "0");
}

/** Cria (ou reaproveita, se já existir) o registro da conversa atual e grava o estado mais recente
 * das mensagens. Idempotente por `conversationId` — chamar de novo com o mesmo ID só atualiza. */
export async function saveConversation(
  conversationId: string,
  activeFunction: ProfessorFunction,
  messages: ProfessorMessage[],
  viaVoz: boolean,
  studentId = DEFAULT_STUDENT_ID,
): Promise<void> {
  if (!isHistoryEnabled() || messages.length === 0) return;
  const db = getDB();
  const now = nowIso();
  const existing = await db.professorConversations.get(conversationId);
  const record: ProfessorConversation = {
    id: conversationId,
    studentId,
    activeFunction,
    messages,
    viaVoz: viaVoz || existing?.viaVoz || false,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
  await db.professorConversations.put(record);
}

export function newConversationId(): string {
  return newId("professor-conversa");
}

export async function listConversations(studentId = DEFAULT_STUDENT_ID): Promise<ProfessorConversation[]> {
  const db = getDB();
  const all = await db.professorConversations.where("studentId").equals(studentId).toArray();
  return all.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getConversation(id: string): Promise<ProfessorConversation | undefined> {
  return getDB().professorConversations.get(id);
}

export async function deleteConversation(id: string): Promise<void> {
  await getDB().professorConversations.delete(id);
}

export async function deleteAllConversations(studentId = DEFAULT_STUDENT_ID): Promise<void> {
  const db = getDB();
  const all = await db.professorConversations.where("studentId").equals(studentId).toArray();
  await db.professorConversations.bulkDelete(all.map((c) => c.id));
}

/** Resumo local, sem custo de API: primeira pergunta do aluno + quantas trocas + prévia da última
 * resposta do Professor. Não é gerado por IA — é um recorte real da própria conversa. */
export function summarizeConversation(conversation: ProfessorConversation): { firstQuestion: string; exchangeCount: number; lastAnswerPreview: string } {
  const firstUser = conversation.messages.find((m) => m.role === "user");
  const lastAssistant = [...conversation.messages].reverse().find((m) => m.role === "assistant");
  return {
    firstQuestion: firstUser?.content.slice(0, 140) ?? "(sem pergunta registrada)",
    exchangeCount: conversation.messages.filter((m) => m.role === "user").length,
    lastAnswerPreview: lastAssistant?.content.slice(0, 160) ?? "",
  };
}
