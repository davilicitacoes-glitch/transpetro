import { NextResponse } from "next/server";

/**
 * Cria um token efêmero (client secret de curta duração) para o navegador abrir uma sessão de voz
 * com a Realtime API da OpenAI. A chave principal (`OPENAI_API_KEY`) NUNCA sai do servidor — só
 * este token de sessão, de vida curta, vai para o cliente.
 */
// Mini: bem mais barato que o "gpt-realtime" completo, suficiente para explicar matéria e
// conversar — o Professor não precisa do modelo mais caro para isso.
const REALTIME_MODEL = "gpt-realtime-mini";

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY não configurada no servidor." }, { status: 503 });
  }

  let instructions = "";
  try {
    const body = await request.json();
    instructions = typeof body?.instructions === "string" ? body.instructions : "";
  } catch {
    // corpo vazio é aceitável — sessão sem contexto adicional
  }

  try {
    const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: {
          type: "realtime",
          model: REALTIME_MODEL,
          instructions,
          output_modalities: ["audio"],
          audio: {
            input: {
              // VAD semântico: distingue fala real de ruído de fundo em vez de só medir volume —
              // reduz interrupções falsas por barulho externo (achado real do usuário em teste).
              turn_detection: {
                type: "semantic_vad",
                eagerness: "low",
                interrupt_response: true,
              },
              noise_reduction: { type: "near_field" },
              // Transcreve a fala do aluno em texto — usado para gravar o histórico da conversa.
              transcription: { model: "whisper-1" },
            },
            // "cedar" = voz masculina grave/quente, recomendada pela OpenAI para melhor qualidade.
            output: { voice: "cedar" },
          },
        },
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[professor/realtime-session] falha ao mintar token efêmero:", response.status, detail);
      return NextResponse.json({ error: "Não foi possível iniciar a sessão de voz agora." }, { status: 502 });
    }

    const secret = await response.json();
    // Só repassa o necessário para o cliente abrir a conexão — nunca a chave principal.
    return NextResponse.json({ clientSecret: secret.value, expiresAt: secret.expires_at, model: REALTIME_MODEL });
  } catch (err) {
    const message = err instanceof Error ? err.message : "erro desconhecido";
    console.error("[professor/realtime-session] erro de rede:", message);
    return NextResponse.json({ error: "Não foi possível iniciar a sessão de voz agora." }, { status: 502 });
  }
}
