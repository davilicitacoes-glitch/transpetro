import { buildProfessorContext } from "@/lib/pedagogy/professorContext";
import { computeScoreEstimate } from "@/lib/pedagogy/scoreEstimate";
import { getDB } from "@/lib/db/dexie";
import { todayInExamTimezone, daysBetween } from "@/lib/schedule/dates";
import { topicNameOf } from "@/lib/pedagogy/contentRef";
import { DEFAULT_STUDENT_ID, type ProfessorContext } from "@/lib/models/schema";
import { NOME_MENTOR } from "@config/metodo";
import { MIN_ATTEMPTS_FOR_SIGNAL } from "@/lib/pedagogy/masteryRules";

/**
 * Abertura contextual do Vetor (missão "Método Vetor", seção 3) — a PRIMEIRA coisa que o aluno vê
 * ao abrir uma conversa nova NUNCA pode ser um cumprimento genérico. Esta função escolhe, em ordem
 * de prioridade, o fato mais real e específico do histórico do aluno (ProfessorContext + Motor 3) e
 * devolve uma frase pronta — sempre determinística, sem chamar IA (mais rápido, sem risco de a IA
 * inventar um cumprimento vazio nesta primeira linha).
 *
 * Ordem de prioridade (do mais acionável pro mais genérico, nunca inventa dado que não existe):
 * 1. Revisão vencida há mais dias, de um tópico realmente frágil.
 * 2. Erro aberto (ainda não superado) mais recente.
 * 3. Conquista real: tópico com evidência suficiente e alta acurácia (dominado de verdade).
 * 4. Desempenho recente geral (últimas tentativas), quando não há sinal mais específico.
 * 5. Aluno sem histórico nenhum ainda — abertura honesta, convida a começar.
 */
export async function gerarAberturaContextual(studentId = DEFAULT_STUDENT_ID): Promise<string> {
  const [context, estimate] = await Promise.all([buildProfessorContext(studentId), computeScoreEstimate(studentId)]);
  return formatAberturaContextual(context, estimate.perCode, studentId);
}

async function formatAberturaContextual(
  context: ProfessorContext,
  perCode: Awaited<ReturnType<typeof computeScoreEstimate>>["perCode"],
  studentId: string,
): Promise<string> {
  const today = todayInExamTimezone();

  // 1. Revisão vencida — usa o tópico mais frágil (topPriority-like) entre os que têm revisão aberta.
  const db = getDB();
  const overdueReviews = (await db.reviewSchedules.where({ studentId }).toArray()).filter(
    (r) => r.itemType === "topic" && (r.status === "pendente" || r.status === "disponivel") && r.nextReviewDate <= today,
  );
  if (overdueReviews.length > 0) {
    const worst = overdueReviews.sort((a, b) => a.nextReviewDate.localeCompare(b.nextReviewDate))[0];
    const days = Math.max(0, daysBetween(worst.nextReviewDate, today, false));
    const name = topicNameOf(worst.itemId) ?? worst.itemId;
    return `${NOME_MENTOR}: você tem uma revisão de "${name}" pendente${days > 0 ? ` há ${days} dia${days === 1 ? "" : "s"}` : " desde hoje"}. Bora resolver isso agora?`;
  }

  // 2. Erro aberto mais recente (ordenado pelo lastOccurrenceAt real, não pela ordem de leitura do banco).
  if (context.openDifficulties.length > 0) {
    const openEntries = await db.errorEntries.where("id").anyOf(context.openDifficulties.map((d) => d.id)).toArray();
    const mostRecentEntry = openEntries.sort((a, b) => (b.lastOccurrenceAt ?? "").localeCompare(a.lastOccurrenceAt ?? ""))[0];
    const summary = context.openDifficulties.find((d) => d.id === mostRecentEntry?.id) ?? context.openDifficulties[0];
    const name = topicNameOf(summary.topicSlug) ?? summary.topicSlug;
    return `${NOME_MENTOR}: ainda tenho um erro seu em aberto sobre "${name}"${summary.evidenceIds.length > 1 ? ` (já apareceu ${summary.evidenceIds.length} vezes)` : ""}. Quer revisar esse ponto?`;
  }

  // 3. Conquista real — tópico com dado suficiente e domínio de verdade.
  const mastered = perCode
    .filter((c) => c.hasEnoughData && c.attemptsCount >= MIN_ATTEMPTS_FOR_SIGNAL && c.weightedAccuracy >= 0.85)
    .sort((a, b) => b.attemptsCount - a.attemptsCount)[0];
  if (mastered) {
    return `${NOME_MENTOR}: você está mandando bem em "${mastered.topicName}" — ${Math.round(mastered.weightedAccuracy * 100)}% de acerto em ${mastered.attemptsCount} tentativas. Já dá pra considerar esse código dominado. Vamos pra outro ponto?`;
  }

  // 4. Desempenho recente geral (sem sinal mais específico disponível).
  if (context.recentQuestionPerformance.answered > 0 && context.recentQuestionPerformance.accuracy !== null) {
    const pct = Math.round(context.recentQuestionPerformance.accuracy * 100);
    return `${NOME_MENTOR}: nas suas últimas ${context.recentQuestionPerformance.answered} questões, você acertou ${pct}%. Me conta o que você quer trabalhar hoje.`;
  }

  // 5. Sem histórico nenhum ainda — honesto, não inventa continuidade que não existe.
  return `${NOME_MENTOR}: ainda não tenho histórico seu pra citar — é nossa primeira conversa de verdade. Me conta o que você quer estudar ou me pergunte algo, e a partir daqui eu passo a acompanhar seu progresso real.`;
}
