import { describe, expect, it, beforeEach } from "vitest";
import { getDB } from "@/lib/db/dexie";
import { recordGameAttempt } from "@/lib/games/recordGameAttempt";
import { findEpisodesForCodes, getQuestionForTask, ALL_GAME_EPISODES } from "@/lib/games/catalog";
import { computeScoreEstimate } from "@/lib/pedagogy/scoreEstimate";
import { OFFICE_DAY_EPISODES } from "@/content/games/officeDay";
import { ALL_QUESTIONS } from "@/content/questions";
import { DEFAULT_STUDENT_ID } from "@/lib/models/schema";

/**
 * Motor de jogos (missão "Um Dia no Escritório") — cobre a exigência central da missão (seção 4):
 * um erro/acerto dentro de um jogo precisa entrar na MESMA fundação de dados dos Motores 1-3, não
 * uma cópia paralela.
 */
async function clearAllTables() {
  const db = getDB();
  await Promise.all(db.tables.map((t) => t.clear()));
}

beforeEach(async () => {
  await clearAllTables();
});

describe("catálogo de jogos — rastreabilidade real", () => {
  it("toda GameTask de todo episódio referencia uma Question REAL existente em ALL_QUESTIONS", () => {
    const questionById = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));
    for (const episode of ALL_GAME_EPISODES) {
      for (const scene of episode.scenes) {
        if (!scene.task) continue;
        const question = questionById.get(scene.task.questionId);
        expect(question, `Cena "${scene.id}" do episódio "${episode.id}" referencia uma questão inexistente: ${scene.task.questionId}`).toBeDefined();
        // A tarefa só pode testar um código que o próprio episódio declara cobrir — nunca uma
        // questão de um código fora do escopo anunciado.
        expect(question!.syllabusCodes.some((c) => episode.syllabusCodes.includes(c))).toBe(true);
      }
    }
  });

  it("cada dia de trabalho tem os 3 formatos de tarefa exigidos (email, colega, decisão)", () => {
    for (const episode of OFFICE_DAY_EPISODES) {
      const kinds = new Set(episode.scenes.filter((s) => s.task).map((s) => s.task!.kind));
      expect(kinds.has("email"), `${episode.id} não tem tarefa de e-mail`).toBe(true);
      expect(kinds.has("colega"), `${episode.id} não tem tarefa de colega`).toBe(true);
      expect(kinds.has("decisao"), `${episode.id} não tem tarefa de decisão`).toBe(true);
    }
  });

  it("findEpisodesForCodes só retorna episódio quando há overlap real de código", () => {
    expect(findEpisodesForCodes(["AC-01"]).map((e) => e.id)).toContain("rh-e-processos");
    expect(findEpisodesForCodes(["AC-16"]).map((e) => e.id)).toContain("compras-e-estoques");
    // Código sem nenhum dia de trabalho pronto — não deve inventar um convite.
    expect(findEpisodesForCodes(["PT-01"])).toEqual([]);
    expect(findEpisodesForCodes(["AC-09"])).toEqual([]);
  });
});

describe("recordGameAttempt — mesma fundação de dados dos Motores 1-3", () => {
  it("um ERRO no jogo abre uma dificuldade real (Caderno de Erros) e agenda revisão espaçada, como qualquer outro erro", async () => {
    const scene = OFFICE_DAY_EPISODES[0].scenes.find((s) => s.task)!;
    const question = getQuestionForTask(scene.task!.questionId)!;
    const wrongKey = question.options.find((o) => !o.isCorrect)!.key;

    const result = await recordGameAttempt(question, wrongKey, "um-dia-no-escritorio", OFFICE_DAY_EPISODES[0].id, scene.id);

    expect(result.attempt.isCorrect).toBe(false);
    expect(result.attempt.activityId).toBe(`jogo:um-dia-no-escritorio:${OFFICE_DAY_EPISODES[0].id}:${scene.id}`);
    expect(result.difficulty).not.toBeNull();
    expect(result.reviewScheduled).not.toBeNull();
    // A explicação universal (Prompt 14) foi calculada com o texto REAL da alternativa errada.
    expect(result.explanation).not.toBeNull();
    expect(result.explanation!.selectedExplanation).toBe(question.options.find((o) => o.key === wrongKey)!.explanation);

    const db = getDB();
    const errorEntries = await db.errorEntries.where("studentId").equals(DEFAULT_STUDENT_ID).toArray();
    expect(errorEntries.some((e) => e.topicSlug === question.topicSlug)).toBe(true);
  });

  it("3 erros no mesmo código dentro do jogo derrubam a acurácia usada pela nota estimada (Motor 3)", async () => {
    const episode = OFFICE_DAY_EPISODES.find((e) => e.id === "rh-e-processos")!;
    const questionIds = episode.scenes.filter((s) => s.task).map((s) => s.task!.questionId);
    // Garante pelo menos 3 tentativas no mesmo topicSlug (AC-01), o mínimo pro Motor 3 contar sinal.
    const ac01Questions = questionIds.map((id) => getQuestionForTask(id)!).filter((q) => q.syllabusCodes.includes("AC-01"));
    expect(ac01Questions.length).toBeGreaterThanOrEqual(1);

    // Usa a mesma questão 3x com selectedKey errado pra simular um aluno que erra sempre esse tema
    // dentro do jogo (idempotencyKey é gerado novo a cada chamada por recordGameAttempt).
    const q = ac01Questions[0];
    const wrongKey = q.options.find((o) => !o.isCorrect)!.key;
    for (let i = 0; i < 3; i++) {
      await recordGameAttempt(q, wrongKey, "um-dia-no-escritorio", episode.id, `teste-${i}`);
    }

    const estimate = await computeScoreEstimate();
    const ac01Perf = estimate.perCode.find((c) => c.syllabusCode === "AC-01");
    expect(ac01Perf?.hasEnoughData).toBe(true);
    expect(ac01Perf?.accuracyRate).toBe(0);
  });
});
