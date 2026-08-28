import { NextResponse } from "next/server";
import OpenAI from "openai";
import { hasProfessorAccess } from "@/lib/professor/access";
import { ALL_LESSONS } from "@/content/lessons";
import type { FeynmanEvaluation } from "@/lib/lab/feynman";

/**
 * Avaliação da técnica de Feynman (Laboratório, ferramenta 2.5) — rota dedicada, separada do chat
 * geral do Professor (`/api/professor/chat`): não precisa do loop de tool-calling, só UMA avaliação
 * estruturada por vez, sempre fundamentada no conteúdo REAL da aula (resumo, pontos de
 * memorização, pegadinhas) — nunca no conhecimento genérico do modelo sobre o tema.
 */
const MODEL = "gpt-4.1-mini";

interface FeynmanRequestBody {
  topicSlug: string;
  explanation: string;
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

  let body: FeynmanRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  if (!body?.topicSlug || !body?.explanation?.trim()) {
    return NextResponse.json({ error: "topicSlug e explanation são obrigatórios." }, { status: 400 });
  }

  const lesson = ALL_LESSONS.find((l) => l.topicSlug === body.topicSlug);
  if (!lesson) {
    return NextResponse.json({ error: "Tópico não encontrado." }, { status: 404 });
  }

  const client = new OpenAI({ apiKey });

  const systemPrompt = `Você avalia a técnica de Feynman: o aluno acabou de tentar explicar um tema COM AS PRÓPRIAS PALAVRAS, depois de estudá-lo. Sua única fonte de verdade é o conteúdo real abaixo — nunca use conhecimento genérico seu sobre o assunto, nunca invente regra/lei/dado que não esteja aqui.

TEMA: ${lesson.title}
RESUMO OFICIAL DA AULA:
${lesson.reviewSummaryPoints.map((p) => `- ${p}`).join("\n")}

PONTOS QUE PRECISAM SER MEMORIZADOS:
${lesson.mustMemorize.map((p) => `- ${p}`).join("\n")}

PEGADINHAS/CONFUSÕES COMUNS NESTE TEMA:
${lesson.commonMistakes.map((p) => `- ${p}`).join("\n")}

Avalie a explicação do aluno comparando com este conteúdo real. Regras:
- NUNCA dê elogio genérico ("muito bem!", "ótima explicação!") sem apontar o que especificamente está certo, raso ou errado.
- Cite, pelos pontos acima, o que o aluno cobriu bem, o que ficou raso/incompleto, e o que está errado ou confuso (se caiu numa das pegadinhas listadas, diga isso explicitamente).
- "correto" = cobriu os pontos essenciais com precisão, mesmo que não use as mesmas palavras. "parcial" = entendeu o essencial mas com lacunas ou imprecisões relevantes. "incorreto" = confundiu o conceito ou errou algo central.
- feedback: 2-4 frases, específicas, em português direto, como um professor de verdade corrigindo — não uma nota solta.

Responda em JSON: {"verdict": "correto"|"parcial"|"incorreto", "feedback": string, "coveredPoints": string[], "missedOrWrongPoints": string[]}`;

  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: body.explanation.trim() },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 600,
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw) as Partial<FeynmanEvaluation>;

    if (!parsed.verdict || !parsed.feedback) {
      return NextResponse.json({ error: "O Professor não conseguiu avaliar agora. Tente novamente." }, { status: 502 });
    }

    const evaluation: FeynmanEvaluation = {
      verdict: parsed.verdict,
      feedback: parsed.feedback,
      coveredPoints: parsed.coveredPoints ?? [],
      missedOrWrongPoints: parsed.missedOrWrongPoints ?? [],
    };
    return NextResponse.json(evaluation);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido ao falar com o Professor.";
    console.error("[professor/feynman] falha na chamada à OpenAI:", message);
    return NextResponse.json({ error: "O Professor não conseguiu avaliar agora. Tente novamente em instantes." }, { status: 502 });
  }
}
