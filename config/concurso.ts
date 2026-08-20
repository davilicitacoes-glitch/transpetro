/**
 * Dados oficiais do concurso Transpetro — Edital nº 3/2026 (Quadro de Terra, nível médio),
 * Fundação Cesgranrio. Cargo: Profissional Transpetro de Nível Médio – Júnior,
 * ênfase "Administração e Controle".
 *
 * Fontes consultadas em 2026-08-19 (pesquisa web, não o PDF oficial do edital lido linha a linha):
 * - https://blog.grancursosonline.com.br/concurso-transpetro-edital-publicado-2026/
 * - https://folha.qconcursos.com/n/concurso-transpetro-2026-edital-verticalizado-nivel-medio
 * - https://concurseirozero1.com.br/blog/transpetro-nivel-medio-vagas-2026-edital-03/
 *
 * Campos marcados "PENDENTE DE CONFIRMAÇÃO" precisam ser conferidos no PDF oficial do edital
 * (Fundação Cesgranrio) antes de qualquer cronograma real ser construído (Fase 2). Nenhum valor
 * pendente foi inventado — os placeholders abaixo são estimativas conservadoras marcadas como tal.
 */

export const EXAM_TIMEZONE = "America/Sao_Paulo";

/** Prova objetiva. Fonte: editais consultados em 2026-08-19. */
export const EXAM_DATE = "2026-11-29";

/** Inscrições: 12/08/2026 a 14/09/2026 (não afeta o cronograma de estudo diretamente, documentado
 * apenas como referência). */
export const REGISTRATION_START_DATE = "2026-08-12";
export const REGISTRATION_END_DATE = "2026-09-14";

/** Último dia de estudo permitido — véspera da prova. PENDENTE DE CONFIRMAÇÃO a data exata de
 * início do plano pedagógico (depende de quando o aluno começar a usar o app); aqui só travamos
 * o limite superior. */
export const LAST_STUDY_DATE = "2026-11-28";

/** Quantidade de missões/dias do plano — NÃO definido ainda (depende do cronograma da Fase 2,
 * que ainda não foi construído). Motor não deve assumir um valor fixo aqui; ver TOTAL_MISSIONS
 * como placeholder até a Fase 2 definir o plano real. */
export const TOTAL_MISSIONS = 0; // PENDENTE — Fase 2 define o cronograma real

/** PENDENTE DE CONFIRMAÇÃO — turno da prova não localizado com certeza nas fontes consultadas. */
export const EXAM_SHIFT = "PENDENTE_CONFIRMACAO";

export const EXAM_DURATION_HOURS = 4;

export interface BlueprintSubject {
  id: string;
  name: string;
  questionCount: number;
  pointsPerQuestion: number;
  totalPoints: number;
}

/**
 * PENDENTE DE CONFIRMAÇÃO: a divisão exata de questões entre Língua Portuguesa e Matemática
 * dentro das 20 questões de Conhecimentos Gerais, os pontos por questão, e o detalhamento do
 * conteúdo específico da ênfase "Administração e Controle" (50 questões) não foram confirmados
 * no edital oficial nesta pesquisa. Os valores de questionCount abaixo para português/matemática
 * são uma ESTIMATIVA 10/10 (metade/metade), claramente não confirmada — ajustar ao consultar o
 * PDF oficial do edital nº 3/2026 antes de usar para pontuação real.
 *
 * Confirmado: total de 70 questões — 20 de Conhecimentos Gerais + 50 de Conhecimentos Específicos
 * (ênfase Administração e Controle).
 */
export const EXAM_BLUEPRINT: BlueprintSubject[] = [
  {
    id: "portugues",
    name: "Língua Portuguesa",
    questionCount: 10, // ESTIMATIVA — PENDENTE DE CONFIRMAÇÃO
    pointsPerQuestion: 1, // PENDENTE DE CONFIRMAÇÃO
    totalPoints: 10, // PENDENTE DE CONFIRMAÇÃO
  },
  {
    id: "matematica",
    name: "Matemática",
    questionCount: 10, // ESTIMATIVA — PENDENTE DE CONFIRMAÇÃO
    pointsPerQuestion: 1, // PENDENTE DE CONFIRMAÇÃO
    totalPoints: 10, // PENDENTE DE CONFIRMAÇÃO
  },
  {
    id: "especificas",
    name: "Conhecimentos Específicos (Administração e Controle)",
    questionCount: 50, // confirmado
    pointsPerQuestion: 1, // PENDENTE DE CONFIRMAÇÃO
    totalPoints: 50, // PENDENTE DE CONFIRMAÇÃO
  },
];

export const OBJECTIVE_TOTAL_QUESTIONS = EXAM_BLUEPRINT.reduce((sum, s) => sum + s.questionCount, 0); // 70 (confirmado)
export const OBJECTIVE_TOTAL_POINTS = EXAM_BLUEPRINT.reduce((sum, s) => sum + s.totalPoints, 0); // PENDENTE DE CONFIRMAÇÃO
export const OBJECTIVE_MIN_PASSING_POINTS = 0; // PENDENTE DE CONFIRMAÇÃO — nota de corte não localizada
export const OBJECTIVE_TARGET_POINTS = 0; // PENDENTE — meta pedagógica a definir na Fase 2

/**
 * PENDENTE DE CONFIRMAÇÃO: não foi confirmado se este processo seletivo (Edital nº 3/2026,
 * nível médio) possui etapa de redação. NÃO copiar a rubrica de redação de outro projeto — os
 * campos abaixo ficam zerados/nulos até confirmação.
 */
export const HAS_ESSAY_STAGE: boolean | null = null; // PENDENTE DE CONFIRMAÇÃO
export const ESSAY_MIN_LINES = 0; // PENDENTE
export const ESSAY_MAX_LINES = 0; // PENDENTE
export const ESSAY_TOTAL_POINTS = 0; // PENDENTE
export const ESSAY_MIN_PASSING_POINTS = 0; // PENDENTE

export interface EssayRubricCriterion {
  id: string;
  name: string;
  maxPoints: number;
}

/** Vazio até confirmação de que há etapa de redação e da rubrica oficial. */
export const ESSAY_RUBRIC: EssayRubricCriterion[] = [];

/**
 * Distribuição percentual do tempo de estudo por disciplina — PENDENTE, será definida na Fase 2
 * a partir do conteúdo programático real da ênfase "Administração e Controle" e do peso de cada
 * disciplina. Mantida vazia para não sugerir uma priorização não fundamentada.
 */
export const STUDY_TIME_ALLOCATION: Record<string, number> = {};

/* ------------------------------------------------------------------------------------------------
 * Metadados institucionais do concurso (para exibição em telas de Edital/Configurações).
 * ---------------------------------------------------------------------------------------------- */

export const CONCURSO_INFO = {
  orgao: "Transpetro (Petrobras Transporte S.A.)",
  edital: "Edital nº 3/2026 — Quadro de Terra, nível médio",
  banca: "Fundação Cesgranrio",
  cargo: "Profissional Transpetro de Nível Médio – Júnior",
  enfase: "Administração e Controle",
  /** Salário básico informado nas fontes consultadas; remuneração mínima garantida também
   * divulgada (R$ 6.539,54), mas não modelada aqui por não ser necessária ao motor pedagógico. */
  salarioBasico: "R$ 3.776,64",
  fonteConsulta: "Pesquisa web em 2026-08-19 — ver comentário no topo deste arquivo para URLs.",
} as const;
