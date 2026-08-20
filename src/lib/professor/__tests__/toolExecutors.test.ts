import { describe, expect, it, beforeEach } from "vitest";
import { getDB } from "@/lib/db/dexie";
import { executeProfessorTool } from "@/lib/professor/toolExecutors";
import { PROFESSOR_TOOLS } from "@/lib/professor/toolSchemas";
import { recordAttempt, recordEssaySubmission } from "@/lib/pedagogy/service";
import { miniQuizQuestionId } from "@/lib/pedagogy/contentRef";
import { ALL_QUESTIONS } from "@/content/questions";
import { DEFAULT_STUDENT_ID } from "@/lib/models/schema";
import type { ProfessorToolCallRequest } from "@/lib/professor/types";

const TEST_LESSON_SLUG = "federalismo-separacao-poderes";
const TEST_TOPIC_SLUG = "federalismo-separacao-poderes";
const TEST_QUESTION_ID = miniQuizQuestionId(TEST_LESSON_SLUG, 0);
const testQuestion = ALL_QUESTIONS.find((q) => q.id === TEST_QUESTION_ID);
// PENDENTE — Fase 2: sem conteúdo real ainda (ver describe.skip abaixo), fallback seguro evita
// crash no carregamento do módulo (testQuestion é undefined até a Fase 2 popular as questões).
const CORRECT_KEY = (testQuestion?.options.find((o) => o.isCorrect)?.key ?? "A") as "A" | "B" | "C" | "D";
const WRONG_KEY = (testQuestion?.options.find((o) => !o.isCorrect)?.key ?? "B") as "A" | "B" | "C" | "D";

async function clearAllTables() {
  const db = getDB();
  await Promise.all(db.tables.map((t) => t.clear()));
}

beforeEach(async () => {
  await clearAllTables();
});

function call(name: string, args: Record<string, unknown> = {}): ProfessorToolCallRequest {
  return { id: `call-${name}`, name, arguments: args };
}

describe("classificação de risco das ferramentas do Professor", () => {
  it("só as ferramentas que persistem inferência/avaliação são 'confirm'; leitura e escrita reversível são 'auto'", () => {
    const confirmTools = PROFESSOR_TOOLS.filter((t) => t.risk === "confirm").map((t) => t.function.name);
    expect(confirmTools.sort()).toEqual(["propor_classificacao_erro", "registrar_avaliacao_redacao", "registrar_resultado_teste_oral"].sort());

    const autoTools = PROFESSOR_TOOLS.filter((t) => t.risk === "auto").map((t) => t.function.name);
    expect(autoTools).toContain("obter_contexto_professor");
    expect(autoTools).toContain("propor_agendar_revisao");
  });

  it("todas as 10 ferramentas do prompt existem com nome exato", () => {
    const names = PROFESSOR_TOOLS.map((t) => t.function.name).sort();
    expect(names).toEqual(
      [
        "obter_contexto_professor",
        "obter_detalhe_dificuldade",
        "obter_revisoes_pendentes",
        "propor_agendar_revisao",
        "propor_classificacao_erro",
        "propor_plano_de_reforco",
        "registrar_avaliacao_redacao",
        "registrar_duvida_resolvida",
        "registrar_resultado_teste_oral",
        "solicitar_conjunto_de_questoes",
      ].sort(),
    );
  });
});

describe("obter_contexto_professor", () => {
  it("retorna o ProfessorContext real, não um objeto fictício", async () => {
    const result = (await executeProfessorTool(call("obter_contexto_professor"))) as { studentId: string; openDifficulties: unknown[] };
    expect(result.studentId).toBe(DEFAULT_STUDENT_ID);
    expect(Array.isArray(result.openDifficulties)).toBe(true);
  });
});

/**
 * PENDENTE — Fase 2: os testes abaixo exercitam fluxos do Professor (revisão, dúvida, classificação
 * de erro, teste oral, redação, banco de questões) contra uma aula/questão/tópico de conteúdo real
 * (`federalismo-separacao-poderes`) que não existe na Fase 1 — `src/content/**` são placeholders
 * vazios até a Fase 2. A lógica testada (`src/lib/professor/toolExecutors.ts`) não mudou.
 */
describe.skip("ferramentas do Professor — PENDENTE Fase 2 (depende de conteúdo real)", () => {
describe("propor_agendar_revisao", () => {
  it("cria uma ReviewSchedule real e reaproveita se chamada de novo para o mesmo tópico", async () => {
    const first = (await executeProfessorTool(call("propor_agendar_revisao", { topicSlug: TEST_TOPIC_SLUG, motivo: "reforço" }))) as {
      agendado: boolean;
      review: { id: string };
    };
    expect(first.agendado).toBe(true);
    const db = getDB();
    const saved = await db.reviewSchedules.get(first.review.id);
    expect(saved).toBeDefined();
    expect(saved!.itemId).toBe(TEST_TOPIC_SLUG);

    const second = (await executeProfessorTool(call("propor_agendar_revisao", { topicSlug: TEST_TOPIC_SLUG, motivo: "de novo" }))) as {
      review: { id: string };
    };
    expect(second.review.id).toBe(first.review.id); // não duplica
  });
});

describe("registrar_duvida_resolvida", () => {
  it("cria e resolve uma Doubt real, rastreável ao tópico", async () => {
    const result = (await executeProfessorTool(
      call("registrar_duvida_resolvida", { topicSlug: TEST_TOPIC_SLUG, resumoResolucao: "Ficou claro depois do exemplo do Município." }),
    )) as { resolvida: boolean; duvida: { status: string; contentRef: { topicSlug: string } } };
    expect(result.resolvida).toBe(true);
    expect(result.duvida.status).toBe("resolvida");
    expect(result.duvida.contentRef.topicSlug).toBe(TEST_TOPIC_SLUG);
  });
});

describe("propor_classificacao_erro (ferramenta de risco)", () => {
  it("classifica uma dificuldade real com origin 'ia_proposta' — nunca 'sistema_regra'", async () => {
    // gera uma dificuldade real de verdade, a partir de um erro real (não fabricado no teste)
    const attemptResult = await recordAttempt({
      questionId: TEST_QUESTION_ID,
      selectedKey: WRONG_KEY,
      correctKey: CORRECT_KEY,
      isCorrect: false,
      mode: "treino",
    });
    const difficultyId = attemptResult.difficulty!.id;

    const result = (await executeProfessorTool(
      call("propor_classificacao_erro", { dificuldadeId: difficultyId, natureza: "confusao_conceitual", confianca: 0.7, justificativa: "teste" }),
    )) as { classificado: boolean; dificuldade: { errorNature: string; errorNatureOrigin: string; errorNatureConfidence: number } };

    expect(result.classificado).toBe(true);
    expect(result.dificuldade.errorNature).toBe("confusao_conceitual");
    expect(result.dificuldade.errorNatureOrigin).toBe("ia_proposta");
    expect(result.dificuldade.errorNatureConfidence).toBe(0.7);

    const db = getDB();
    const persisted = await db.errorEntries.get(difficultyId);
    expect(persisted!.errorNature).toBe("confusao_conceitual");
  });
});

describe("registrar_resultado_teste_oral (ferramenta de risco)", () => {
  it("com questionId real: grava um Attempt real (mode teste_professor), passa pelo mesmo caminho de recordAttempt", async () => {
    const result = (await executeProfessorTool(
      call("registrar_resultado_teste_oral", { topicSlug: TEST_TOPIC_SLUG, resultado: "erro", resumo: "confundiu os conceitos", questionId: TEST_QUESTION_ID }),
    )) as { registrado: boolean; viaQuestaoReal: boolean; attempt: { id: string; mode: string; isCorrect: boolean } };

    expect(result.registrado).toBe(true);
    expect(result.viaQuestaoReal).toBe(true);
    expect(result.attempt.mode).toBe("teste_professor");
    expect(result.attempt.isCorrect).toBe(false);

    const db = getDB();
    const persisted = await db.attempts.get(result.attempt.id);
    expect(persisted).toBeDefined();
  });

  it("sem questionId, resultado 'erro': cria uma dificuldade real (não fictícia) via openOrUpdateDifficulty", async () => {
    const result = (await executeProfessorTool(
      call("registrar_resultado_teste_oral", { topicSlug: TEST_TOPIC_SLUG, resultado: "erro", resumo: "não sabia explicar" }),
    )) as { registrado: boolean; viaQuestaoReal: boolean; dificuldade: { id: string; origin: string } };

    expect(result.registrado).toBe(true);
    expect(result.viaQuestaoReal).toBe(false);
    expect(result.dificuldade.origin).toBe("aluno_manual");

    const db = getDB();
    const persisted = await db.errorEntries.get(result.dificuldade.id);
    expect(persisted).toBeDefined();
  });

  it("sem questionId, resultado 'dominado': NUNCA fabrica domínio — não cria nem altera masterySnapshots", async () => {
    const db = getDB();
    const before = await db.masterySnapshots.toArray();
    expect(before.length).toBe(0);

    const result = (await executeProfessorTool(
      call("registrar_resultado_teste_oral", { topicSlug: TEST_TOPIC_SLUG, resultado: "dominado", resumo: "aluno explicou bem, sem questão real" }),
    )) as { registrado: boolean; aviso: string };

    expect(result.registrado).toBe(true);
    expect(result.aviso).toContain("pratique");

    const after = await db.masterySnapshots.toArray();
    expect(after.length).toBe(0); // continua vazio — nenhum domínio fictício foi criado
  });
});

describe("registrar_avaliacao_redacao (ferramenta de risco)", () => {
  it("grava a avaliação estruturada vinculada à submissão real, sem sobrescrever o texto original", async () => {
    const submission = await recordEssaySubmission({
      essayPromptId: "prompt-teste",
      lineCount: 25,
      content: "Texto de redação de teste para validar o fluxo do Professor.",
    });

    const result = (await executeProfessorTool(
      call("registrar_avaliacao_redacao", {
        essaySubmissionId: submission.id,
        tipologia: 4,
        abordagem: 8,
        coerenciaCoesao: 7,
        morfossintaxe: 4,
        acentuacaoOrtografia: 4,
        feedback: "Boa estrutura, cuidado com a conclusão.",
      }),
    )) as { registrado: boolean; submissao: { evaluation: { totalScore: number; evaluatedBy: string }; content: string } };

    expect(result.registrado).toBe(true);
    expect(result.submissao.evaluation.totalScore).toBe(27);
    expect(result.submissao.evaluation.evaluatedBy).toBe("ia");
    expect(result.submissao.content).toBe(submission.content); // texto original preservado
  });
});

describe("solicitar_conjunto_de_questoes", () => {
  it("retorna questões reais do catálogo, sem incluir o gabarito", async () => {
    const result = (await executeProfessorTool(call("solicitar_conjunto_de_questoes", { topicSlug: TEST_TOPIC_SLUG, quantidade: 2 }))) as {
      questoes: Array<{ id: string; alternativas: Array<{ chave: string; texto: string }> }>;
    };
    expect(result.questoes.length).toBeGreaterThan(0);
    expect(result.questoes.length).toBeLessThanOrEqual(2);
    for (const q of result.questoes) {
      expect(JSON.stringify(q)).not.toMatch(/isCorrect/);
    }
  });
});
}); // fim do describe.skip (PENDENTE Fase 2)

describe("ferramenta desconhecida", () => {
  it("lança erro em vez de executar algo silenciosamente", async () => {
    await expect(executeProfessorTool(call("ferramenta_que_nao_existe"))).rejects.toThrow();
  });
});
