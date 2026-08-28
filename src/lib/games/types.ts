/**
 * Motor de jogos genérico (missão "Um Dia no Escritório", primeiro de 7 jogos temáticos
 * planejados). Estes tipos são deliberadamente neutros — não amarrados a "Um Dia no Escritório" —
 * pra que os próximos jogos ("Simulador de Gestor", "Detetive de Documentos") reaproveitem o mesmo
 * motor sem reescrever do zero. Ver docs/MOTOR_DE_JOGOS.md para a arquitetura completa.
 *
 * Regra de ouro (vale para todo jogo que usar este motor): toda GameTask referencia uma
 * `questionId` de uma Question REAL já validada (ALL_QUESTIONS) — nunca um enunciado/alternativa
 * inventado pro jogo. O texto narrativo (`narrative`, `intro`, falas de personagens) é só
 * ambientação; o conteúdo testado (pergunta, alternativas, correção, explicação) é sempre a
 * Question de origem, com rastreabilidade total via `question.source` e `question.topicSlug`.
 */

/** Local dentro do cenário de escritório — reaproveitável por qualquer jogo de ambiente de
 * trabalho (mesmo "escritório" visual que "Simulador de Gestor" e "Detetive de Documentos" vão
 * usar, ver seção 5 do prompt). */
export type OfficeLocation = "mesa" | "sala_reuniao" | "corredor" | "arquivo";

/** Os 3 formatos de tarefa desta primeira entrega. Union extensível: um jogo futuro pode
 * adicionar um novo `kind` sem quebrar os existentes. */
export type GameTaskKind = "email" | "colega" | "decisao";

interface GameTaskBase {
  kind: GameTaskKind;
  /** ID de uma Question real em ALL_QUESTIONS — nunca um enunciado inventado pro jogo. */
  questionId: string;
}

/** Tarefa "responder e-mail/documento" — o personagem senta no computador e responde um
 * e-mail/memorando. O corpo do e-mail é a `intro` (ambientação) + o `statement` real da Question
 * (nunca reescrito). */
export interface GameTaskEmail extends GameTaskBase {
  kind: "email";
  remetente: string;
  assunto: string;
  intro: string;
}

/** Tarefa "pergunta de colega" — um personagem secundário interrompe com uma pergunta
 * conversacional; a pergunta em si é sempre o `statement` real da Question. */
export interface GameTaskColega extends GameTaskBase {
  kind: "colega";
  colega: string;
  falaAbertura: string;
}

/** Tarefa "pequena decisão administrativa" — a "consequência" mostrada antes da explicação
 * completa NUNCA é texto inventado: é a própria `explanation` real da alternativa escolhida
 * (ver src/lib/games/gameSession.ts), só introduzida com "Consequência:". */
export interface GameTaskDecisao extends GameTaskBase {
  kind: "decisao";
  situacao: string;
}

export type GameTask = GameTaskEmail | GameTaskColega | GameTaskDecisao;

export type GameSceneKind = "chegada" | "tarefa" | "fechamento";

export interface GameScene {
  id: string;
  kind: GameSceneKind;
  local: OfficeLocation;
  title: string;
  /** Texto de ambientação — nunca um fato técnico/pedagógico, só cenário (personagem chega, senta,
   * etc.). Todo fato testável vive na GameTask, referenciando uma Question real. */
  narrative: string;
  task?: GameTask;
}

/** Um "episódio" do motor de jogos — no caso deste jogo, um "dia de trabalho". Reaproveitável
 * pelos próximos jogos com outro nome de conceito (ex.: "rodada" no Detetive de Documentos), por
 * isso o campo genérico é `episodeId`/`scenes`, não algo específico de escritório. */
export interface GameEpisode {
  id: string;
  gameId: string;
  title: string;
  description: string;
  /** Códigos do edital cobertos por este episódio — 2 a 4, agrupados por proximidade temática. */
  syllabusCodes: string[];
  topicSlugs: string[];
  scenes: GameScene[];
}
