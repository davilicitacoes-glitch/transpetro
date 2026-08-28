import { recordAttempt, type RecordAttemptResult } from "@/lib/pedagogy/service";
import { newIdempotencyKey } from "@/lib/pedagogy/ids";
import type { Question } from "@/lib/models/schema";

/**
 * Todo acerto/erro dentro de QUALQUER jogo passa por aqui — que é só uma fina camada sobre
 * `recordAttempt` (o único caminho de escrita de tentativas do app, ver src/lib/pedagogy/
 * service.ts). Isso é o que garante a exigência da missão: um erro no jogo entra na MESMA fundação
 * de dados dos Motores 1-3 (Caderno de Erros, revisão espaçada, nota estimada) — não uma cópia
 * paralela. `mode: "treino"` (não existe um modo "jogo" no schema, e treino é semanticamente
 * correto: é prática, não miniquiz/simulado/revisão formal); `activityId` identifica a origem
 * exata (jogo, episódio, cena) pra auditoria, sem precisar de um campo novo no schema de Attempt.
 */
export async function recordGameAttempt(
  question: Question,
  selectedKey: "A" | "B" | "C" | "D" | "E",
  gameId: string,
  episodeId: string,
  sceneId: string,
): Promise<RecordAttemptResult> {
  const correctKey = question.options.find((o) => o.isCorrect)?.key;
  const isCorrect = correctKey === selectedKey;
  return recordAttempt({
    questionId: question.id,
    selectedKey,
    correctKey,
    isCorrect,
    mode: "treino",
    activityId: `jogo:${gameId}:${episodeId}:${sceneId}`,
    idempotencyKey: newIdempotencyKey(),
  });
}
