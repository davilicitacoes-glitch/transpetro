import { NextResponse } from "next/server";
import OpenAI from "openai";
import { PROFESSOR_TOOLS } from "@/lib/professor/toolSchemas";
import { buildSystemPrompt } from "@/lib/professor/systemPrompt";
import { hasProfessorAccess } from "@/lib/professor/access";
import type { ProfessorChatMessage, ProfessorFunction, ProfessorTurnResult } from "@/lib/professor/types";
import type { ProfessorContext } from "@/lib/models/schema";

/**
 * Único lugar do projeto que fala com a API da OpenAI. Roda sempre no servidor — a chave
 * `OPENAI_API_KEY` nunca é lida nem referenciada em código de cliente. O corpo da requisição já
 * traz o `ProfessorContext` (montado no navegador, onde o Dexie existe) e o histórico da conversa;
 * esta rota nunca acessa dado pessoal do aluno diretamente.
 */

const MODEL = "gpt-4.1-mini";

interface ChatRequestBody {
  activeFunction: ProfessorFunction;
  context: ProfessorContext;
  messages: ProfessorChatMessage[];
  recentConversationsSummary?: string;
}

export async function POST(request: Request): Promise<Response> {
  if (!(await hasProfessorAccess())) {
    return NextResponse.json({ error: "Acesso ao Professor não liberado para esta conta." }, { status: 403 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY não configurada no servidor. Peça ao administrador para cadastrar a variável de ambiente." },
      { status: 503 },
    );
  }

  let body: ChatRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  if (!body?.context || !Array.isArray(body.messages) || !body.activeFunction) {
    return NextResponse.json({ error: "Requisição incompleta: activeFunction, context e messages são obrigatórios." }, { status: 400 });
  }

  const client = new OpenAI({ apiKey });
  const systemPrompt = buildSystemPrompt(body.activeFunction, body.context, body.recentConversationsSummary);

  const openAiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...body.messages.map((m): OpenAI.Chat.Completions.ChatCompletionMessageParam => {
      if (m.role === "tool") {
        return { role: "tool", content: m.content, tool_call_id: m.toolCallId ?? "" };
      }
      return { role: m.role, content: m.content };
    }),
  ];

  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: openAiMessages,
      tools: PROFESSOR_TOOLS.map((t) => ({ type: "function", function: t.function })),
      temperature: 0.4,
      max_tokens: 900,
    });

    const choice = completion.choices[0];
    // A união de tipos do SDK inclui "custom tool calls" (sem `.function`) — filtramos só as
    // chamadas de função, que são as únicas que este projeto declara em `PROFESSOR_TOOLS`.
    const functionCalls = (choice.message.tool_calls ?? []).filter(
      (tc): tc is Extract<typeof tc, { type: "function" }> => tc.type === "function",
    );

    if (functionCalls.length > 0) {
      const result: ProfessorTurnResult = {
        type: "tool_calls",
        assistantContent: choice.message.content,
        calls: functionCalls.map((tc) => ({
          id: tc.id,
          name: tc.function.name,
          arguments: safeParseArgs(tc.function.arguments),
        })),
      };
      return NextResponse.json(result);
    }

    const result: ProfessorTurnResult = { type: "message", content: choice.message.content ?? "" };
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido ao falar com o Professor.";
    // Nunca vaza detalhe de infraestrutura/chave — só uma mensagem segura ao aluno.
    console.error("[professor/chat] falha na chamada à OpenAI:", message);
    return NextResponse.json({ error: "O Professor não conseguiu responder agora. Tente novamente em instantes." }, { status: 502 });
  }
}

function safeParseArgs(raw: string): Record<string, unknown> {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}
