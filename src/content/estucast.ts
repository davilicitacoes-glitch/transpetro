/**
 * Estucast — aulas em áudio (missão de teste, 28/08/2026). Aba nova, isolada de "Meu Curso",
 * criada a pedido do usuário pra validar formatos de áudio gerado (aula com a professora e uma
 * discussão em formato podcast) antes de decidir se o piloto vira produção de verdade.
 *
 * Fontes dos áudios de teste, copiados pra public/audio/estucast/ deste projeto pra serem
 * servidos pelo Next.js:
 * - AC-01 (piloto v03): ENSIPETRO/entregas/audio_secundario_integracao_futura/
 *   piloto_v03_openai/audio/.
 * - MAT-01 (produção v04): ENSIPETRO/entregas/audio_secundario_integracao_futura/
 *   producao_v04_openai/audio/MAT-01/ (metadados confirmam: gpt-audio-1.5, disclosure de voz IA
 *   no próprio áudio, gerado a partir do resumo/pontos de memorizar/pegadinhas reais do código).
 */
export interface EstucastEpisode {
  id: string;
  /** Código(s) do edital cobertos por este episódio. */
  syllabusCodes: string[];
  topicSlug: string;
  format: "aula" | "podcast";
  title: string;
  description: string;
  /** Caminho público do áudio, servido de public/. */
  audioSrc: string;
  /** Tamanho aproximado do arquivo, só pra dar transparência ao aluno antes de carregar. */
  approxSizeMb: number;
}

export interface EstucastCompetencia {
  topicSlug: string;
  syllabusCode: string;
  episodes: EstucastEpisode[];
}

/** Agrupa os episódios por competência (código do edital) — usado pra montar a lista de "competências"
 * clicáveis na aba Estucast, uma por tópico com áudio disponível. */
export function groupEstucastByCompetencia(episodes: EstucastEpisode[]): EstucastCompetencia[] {
  const byTopic = new Map<string, EstucastEpisode[]>();
  for (const ep of episodes) {
    const list = byTopic.get(ep.topicSlug) ?? [];
    list.push(ep);
    byTopic.set(ep.topicSlug, list);
  }
  return [...byTopic.entries()].map(([topicSlug, eps]) => ({
    topicSlug,
    syllabusCode: eps[0].syllabusCodes[0],
    episodes: eps,
  }));
}

export const ESTUCAST_EPISODES: EstucastEpisode[] = [
  {
    id: "ac-01-aula-v03",
    syllabusCodes: ["AC-01"],
    topicSlug: "ac-01-recursos-humanos",
    format: "aula",
    title: "Recursos Humanos — aula narrada",
    description:
      "Aula em áudio com a professora, cobrindo o conteúdo de Recursos Humanos (AC-01) no mesmo nível da microaula em slides.",
    audioSrc: "/audio/estucast/ac-01-aula.wav",
    approxSizeMb: 24,
  },
  {
    id: "ac-01-podcast-v03",
    syllabusCodes: ["AC-01"],
    topicSlug: "ac-01-recursos-humanos",
    format: "podcast",
    title: "Recursos Humanos — discussão em podcast",
    description:
      "Conversa em formato podcast entre dois apresentadores discutindo os pontos-chave de Recursos Humanos (AC-01), pra fixação por repetição em outro formato.",
    audioSrc: "/audio/estucast/ac-01-podcast.wav",
    approxSizeMb: 29,
  },
  {
    id: "mat-01-aula-v04",
    syllabusCodes: ["MAT-01"],
    topicSlug: "mat-01-conjuntos-numericos",
    format: "aula",
    title: "Conjuntos numéricos — aula narrada",
    description:
      "Aula em áudio com a professora, cobrindo conjuntos numéricos (naturais, inteiros, racionais e reais — MAT-01) no mesmo nível da microaula em slides.",
    audioSrc: "/audio/estucast/mat-01-aula.wav",
    approxSizeMb: 19,
  },
  {
    id: "mat-01-podcast-v04",
    syllabusCodes: ["MAT-01"],
    topicSlug: "mat-01-conjuntos-numericos",
    format: "podcast",
    title: "Conjuntos numéricos — discussão em podcast",
    description:
      "Conversa em formato podcast entre dois apresentadores discutindo conjuntos numéricos (MAT-01) como cobrado pela Cesgranrio, pra fixação por repetição em outro formato.",
    audioSrc: "/audio/estucast/mat-01-podcast.wav",
    approxSizeMb: 29,
  },
];
