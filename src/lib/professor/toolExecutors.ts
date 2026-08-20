"use client";

import { getDB } from "@/lib/db/dexie";
import { buildProfessorContext } from "@/lib/pedagogy/professorContext";
import {
  scheduleReview,
  recordDoubt,
  resolveDoubt,
  classifyDifficultyErrorNature,
  recordAttempt,
  recordEssayEvaluation,
  recordEvent,
  openOrUpdateDifficulty,
} from "@/lib/pedagogy/service";
import { getReviewsOverview } from "@/lib/course/service";
import { resolveTopicRef, topicNameOf } from "@/lib/pedagogy/contentRef";
import { ALL_QUESTIONS } from "@/content/questions";
import { DEFAULT_STUDENT_ID } from "@/lib/models/schema";
import type { ProfessorToolCallRequest } from "@/lib/professor/types";

/**
 * Executa uma ferramenta do Professor — roda exclusivamente no navegador, porque é aqui que o
 * Dexie (dados reais do aluno) existe. O servidor nunca chama estas funções diretamente; ele só
 * pede ao modelo e devolve `tool_calls` para o cliente executar e responder de volta.
 * Toda escrita passa pelos MESMOS serviços centrais usados pelo resto do app — nenhum caminho novo.
 */
export async function executeProfessorTool(call: ProfessorToolCallRequest, studentId = DEFAULT_STUDENT_ID): Promise<unknown> {
  const args = call.arguments;
  switch (call.name) {
    case "obter_contexto_professor":
      return buildProfessorContext(studentId);

    case "obter_detalhe_dificuldade": {
      const db = getDB();
      const id = String(args.dificuldadeId ?? "");
      const entry = await db.errorEntries.get(id);
      if (!entry) return { encontrado: false };
      const attempts = await Promise.all(entry.evidenceAttemptIds.map((aid) => db.attempts.get(aid)));
      return { encontrado: true, dificuldade: entry, evidencias: attempts.filter(Boolean) };
    }

    case "obter_revisoes_pendentes":
      return getReviewsOverview(studentId);

    case "propor_agendar_revisao": {
      const topicSlug = String(args.topicSlug ?? "");
      const review = await scheduleReview({
        studentId,
        itemType: args.dificuldadeId ? "difficulty" : "topic",
        itemId: args.dificuldadeId ? String(args.dificuldadeId) : topicSlug,
        errorEntryId: args.dificuldadeId ? String(args.dificuldadeId) : undefined,
        reason: "reforco",
      });
      return { agendado: true, review };
    }

    case "propor_plano_de_reforco":
      // Só estrutura/valida a proposta — a UI mostra a lista; nenhuma escrita adicional é feita aqui,
      // as ações individuais (revisar aula, agendar revisão) só se concretizam se o aluno escolher segui-las.
      return { itens: args.itens ?? [] };

    case "registrar_duvida_resolvida": {
      const topicSlug = String(args.topicSlug ?? "");
      const ref = resolveTopicRef(topicSlug) ?? { kind: "topic" as const, id: topicSlug, syllabusCodes: [], topicSlug };
      const db = getDB();
      const openOnes = await db.doubts.where({ studentId, status: "aberta" }).toArray();
      const match = openOnes.find((d) => d.contentRef.topicSlug === topicSlug);
      if (match) {
        const resolved = await resolveDoubt(match.id, String(args.resumoResolucao ?? ""));
        return { resolvida: true, duvida: resolved };
      }
      const created = await recordDoubt({ kind: "duvida_especifica", contentRef: ref, message: String(args.resumoResolucao ?? ""), studentId });
      const resolved = await resolveDoubt(created.id, String(args.resumoResolucao ?? ""));
      return { resolvida: true, duvida: resolved };
    }

    case "propor_classificacao_erro": {
      // Executado só depois de confirmação do aluno na interface (ferramenta de risco "confirm").
      const updated = await classifyDifficultyErrorNature(
        String(args.dificuldadeId ?? ""),
        args.natureza as never,
        "ia_proposta",
        typeof args.confianca === "number" ? args.confianca : undefined,
        studentId,
      );
      return { classificado: true, dificuldade: updated };
    }

    case "solicitar_conjunto_de_questoes": {
      const topicSlug = String(args.topicSlug ?? "");
      const quantidade = Math.min(Number(args.quantidade ?? 3) || 3, 10);
      const questions = ALL_QUESTIONS.filter((q) => q.topicSlug === topicSlug).slice(0, quantidade);
      return {
        questoes: questions.map((q) => ({
          id: q.id,
          enunciado: q.statement,
          alternativas: q.options.map((o) => ({ chave: o.key, texto: o.text })),
          // gabarito e explicações não vão para o modelo aqui: o Professor deve avaliar a resposta do
          // aluno pelo raciocínio, não colar o gabarito — evita o modelo "entregar a resposta" à toa.
        })),
      };
    }

    case "registrar_resultado_teste_oral": {
      const topicSlug = String(args.topicSlug ?? "");
      const resultado = String(args.resultado ?? "duvida") as "dominado" | "duvida" | "erro";
      const resumo = String(args.resumo ?? "");
      const questionId = typeof args.questionId === "string" ? args.questionId : undefined;

      if (questionId) {
        const question = ALL_QUESTIONS.find((q) => q.id === questionId);
        if (question) {
          const correct = question.options.find((o) => o.isCorrect);
          const result = await recordAttempt({
            questionId,
            selectedKey: null,
            correctKey: correct?.key,
            isCorrect: resultado !== "erro",
            mode: "teste_professor",
            activityId: "professor-me-teste-agora",
            studentId,
          });
          return { registrado: true, viaQuestaoReal: true, ...result };
        }
      }

      await recordEvent({
        kind: "teste_professor_concluido",
        contentRef: resolveTopicRef(topicSlug) ?? undefined,
        activityId: topicSlug,
        studentId,
        metadata: { topicSlug, resultado, resumo },
      });

      if (resultado === "erro") {
        const topicRef = resolveTopicRef(topicSlug);
        const result = await openOrUpdateDifficulty({
          studentId,
          topicSlug,
          syllabusCodes: topicRef?.syllabusCodes ?? [],
          cause: resumo,
          correctRule: "",
          origin: "aluno_manual",
        });
        return { registrado: true, viaQuestaoReal: false, dificuldade: result.difficulty, revisao: result.reviewScheduled };
      }

      if (resultado === "duvida") {
        const review = await scheduleReview({ studentId, itemType: "topic", itemId: topicSlug, reason: "reforco" });
        return { registrado: true, viaQuestaoReal: false, revisao: review };
      }

      // "dominado" sem questão real vinculada: registra o sinal, mas NÃO altera o domínio calculado
      // (masterySnapshots só confia em tentativas reais — um relato oral não vira "dominado" fictício).
      return {
        registrado: true,
        viaQuestaoReal: false,
        aviso: "Percepção de domínio registrada como evento. Para confirmar de verdade, pratique questões reais deste tópico.",
      };
    }

    case "registrar_avaliacao_redacao": {
      const updated = await recordEssayEvaluation(
        String(args.essaySubmissionId ?? ""),
        {
          tipologia: Number(args.tipologia ?? 0),
          abordagem: Number(args.abordagem ?? 0),
          coerenciaCoesao: Number(args.coerenciaCoesao ?? 0),
          morfossintaxe: Number(args.morfossintaxe ?? 0),
          acentuacaoOrtografia: Number(args.acentuacaoOrtografia ?? 0),
          totalScore:
            Number(args.tipologia ?? 0) +
            Number(args.abordagem ?? 0) +
            Number(args.coerenciaCoesao ?? 0) +
            Number(args.morfossintaxe ?? 0) +
            Number(args.acentuacaoOrtografia ?? 0),
          feedback: String(args.feedback ?? ""),
          issues: [],
          evaluatedBy: "ia",
          rubricVersion: 1,
          evaluatorRef: "ia:professor-transpetro@gpt",
        },
        studentId,
      );
      return { registrado: true, submissao: updated };
    }

    default:
      throw new Error(`Ferramenta desconhecida: ${call.name}`);
  }
}

export function topicLabel(topicSlug: string): string {
  return topicNameOf(topicSlug) ?? topicSlug;
}
