import { ALL_QUESTIONS } from "@/content/questions";
import { OFFICE_DAY_EPISODES } from "@/content/games/officeDay";
import type { GameEpisode } from "@/lib/games/types";

/** Catálogo de todos os jogos registrados neste motor — hoje só "Um Dia no Escritório", mas os
 * próximos 2 jogos entram nesta mesma lista sem mudar quem consome (hub de Jogos, gatilho de
 * sugestão no fim da aula). */
export const ALL_GAME_EPISODES: GameEpisode[] = [...OFFICE_DAY_EPISODES];

const questionById = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));

export function getQuestionForTask(questionId: string) {
  return questionById.get(questionId);
}

/** Episódios (de qualquer jogo) cujos códigos têm overlap com os códigos informados — usado pelo
 * gatilho de sugestão no fim de uma aula do Meu Curso (missão, seção 1) e pelo hub de Jogos. */
export function findEpisodesForCodes(syllabusCodes: string[]): GameEpisode[] {
  const codeSet = new Set(syllabusCodes);
  return ALL_GAME_EPISODES.filter((ep) => ep.syllabusCodes.some((c) => codeSet.has(c)));
}

export function getEpisodeById(episodeId: string): GameEpisode | undefined {
  return ALL_GAME_EPISODES.find((ep) => ep.id === episodeId);
}
