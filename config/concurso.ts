/**
 * Dados oficiais do concurso Transpetro — Edital nº 03 - TRANSPETRO/PSP/TERRA/NÍVEL MÉDIO - 2026.3,
 * de 11/08/2026 (com alterações do DOU de 19/08/2026), Fundação Cesgranrio. Cargo: Profissional
 * Transpetro de Nível Técnico — Ênfase 1: "Administração e Controle".
 *
 * FONTE PRIMÁRIA: PDF oficial do edital ("EDITAL E ANEXOS CONCURSO TRANSPETRO.pdf", fornecido
 * diretamente pelo usuário em sessão de pesquisa paralela), incluindo Anexo I (vagas), Anexo III
 * (atribuições/requisitos), Anexo IV (conteúdo programático) e Anexo V (cronograma) — consultados
 * integralmente. Ver matriz completa em `MATRIZ_EDITAL_TRANSPETRO.md` (raiz do projeto) para o
 * detalhamento código a código (PT-01..08, MAT-01..10, AC-01..21) e os itens exatos do edital
 * citados entre parênteses abaixo. Verificação cruzada adicional via pesquisa web em 2026-08-19/20
 * (múltiplas fontes de cursinho independentes confirmam a estrutura 60 questões/40+20).
 *
 * Esta versão SUBSTITUI uma versão anterior deste arquivo que estimava 70 questões (20+50) a partir
 * apenas de fontes jornalísticas — esse número estava incorreto; o oficial é 60 questões (40+20).
 */

export const EXAM_TIMEZONE = "America/Sao_Paulo";

/** Prova objetiva. Fonte: Anexo V do edital oficial (cronograma). */
export const EXAM_DATE = "2026-11-29";

/** Cronograma oficial completo (Anexo V) — documentado aqui apenas como referência; o motor de
 * estudo só usa EXAM_DATE/LAST_STUDY_DATE. */
export const REGISTRATION_START_DATE = "2026-08-12";
export const REGISTRATION_END_DATE = "2026-09-14";
export const EXEMPTION_REQUEST_START_DATE = "2026-08-12";
export const EXEMPTION_REQUEST_END_DATE = "2026-08-19";
export const CONFIRMATION_CARD_AVAILABLE_DATE = "2026-11-24";
export const ANSWER_KEY_RELEASE_DATE = "2026-11-30";
export const OBJECTIVE_SCORE_RELEASE_DATE = "2027-01-22";
/** Só sai bem depois da prova — não é o marco pedagógico principal (esse é EXAM_DATE). */
export const FINAL_RESULT_EXPECTED_DATE = "2027-03-23";

/** Último dia de estudo permitido — véspera da prova. A data exata de início do plano pedagógico
 * (Dia 1) depende de quando o aluno começar a usar o app; aqui travamos só o limite superior. */
export const LAST_STUDY_DATE = "2026-11-28";

/** Quantidade de missões/dias do plano — NÃO definido ainda (depende do cronograma real da Fase 2,
 * que ainda não foi construído a partir do conteúdo programático). Motor não deve assumir um valor
 * fixo aqui. */
export const TOTAL_MISSIONS = 0; // PENDENTE — Fase 2 define o cronograma real

/** Prova objetiva única, mesmo caderno, sem menção a turno específico (manhã/tarde) no edital. */
export const EXAM_SHIFT = "unico"; // caderno único, sem divisão de turno documentada no edital

export const EXAM_DURATION_HOURS = 4;

export interface BlueprintSubject {
  id: string;
  name: string;
  questionCount: number;
  pointsPerQuestion: number;
  totalPoints: number;
}

/**
 * CONFIRMADO contra o PDF oficial (item 7 do edital, Anexo IV): prova objetiva única, 60 questões,
 * 5 alternativas (A-E), 1 ponto cada — Fase 1 (Conhecimentos Específicos, 40 questões) + Fase 2
 * (Conhecimentos Gerais, 20 questões: 10 Português + 10 Matemática). Ambas as fases são
 * eliminatórias E classificatórias (não apenas classificatórias).
 */
export const EXAM_BLUEPRINT: BlueprintSubject[] = [
  {
    id: "especificas",
    name: "Conhecimentos Específicos (Administração e Controle)",
    questionCount: 40,
    pointsPerQuestion: 1,
    totalPoints: 40,
  },
  {
    id: "portugues",
    name: "Língua Portuguesa",
    questionCount: 10,
    pointsPerQuestion: 1,
    totalPoints: 10,
  },
  {
    id: "matematica",
    name: "Matemática",
    questionCount: 10,
    pointsPerQuestion: 1,
    totalPoints: 10,
  },
];

export const OBJECTIVE_TOTAL_QUESTIONS = EXAM_BLUEPRINT.reduce((sum, s) => sum + s.questionCount, 0); // 60
export const OBJECTIVE_TOTAL_POINTS = EXAM_BLUEPRINT.reduce((sum, s) => sum + s.totalPoints, 0); // 60

/**
 * IMPORTANTE — a regra de corte oficial (item 7.1.4.3) NÃO é um ponto de corte único sobre o total:
 * é eliminado quem tirar menos de 50% em Conhecimentos Específicos (< 20 de 40) OU menos de 50% em
 * Conhecimentos Gerais (< 10 de 20) OU zero em Português OU zero em Matemática isoladamente — mesmo
 * com bom desempenho geral. Este único número (30 = 50% de 60) é uma SIMPLIFICAÇÃO para uso onde o
 * motor só aceita um valor agregado; a tela/lógica pedagógica real (Fase 2) deve implementar as
 * quatro condições de eliminação separadamente, não só comparar contra este número.
 */
export const OBJECTIVE_MIN_PASSING_POINTS = 30; // simplificação — ver regra completa acima
export const OBJECTIVE_TARGET_POINTS = 0; // PENDENTE — meta pedagógica a definir na Fase 2

/**
 * Não há menção a redação/etapa discursiva em nenhuma parte do edital consultado (item 7: "prova
 * objetiva única"). Tratado como CONFIRMADO que não há etapa de redação neste processo seletivo.
 */
export const HAS_ESSAY_STAGE: boolean | null = false;
export const ESSAY_MIN_LINES = 0;
export const ESSAY_MAX_LINES = 0;
export const ESSAY_TOTAL_POINTS = 0;
export const ESSAY_MIN_PASSING_POINTS = 0;

export interface EssayRubricCriterion {
  id: string;
  name: string;
  maxPoints: number;
}

/** Vazio — não há etapa de redação neste processo seletivo (ver HAS_ESSAY_STAGE). */
export const ESSAY_RUBRIC: EssayRubricCriterion[] = [];

/**
 * Distribuição percentual do tempo de estudo por disciplina — PENDENTE, será definida na Fase 2 a
 * partir da distribuição real de questões (40/60 específicas ≈ 66,7%, 10/60 português ≈ 16,7%,
 * 10/60 matemática ≈ 16,7%) e do peso de cada tema dentro do conteúdo programático (ver
 * MATRIZ_EDITAL_TRANSPETRO.md). Mantida vazia aqui para não fixar uma priorização não revisada por
 * um humano ainda.
 */
export const STUDY_TIME_ALLOCATION: Record<string, number> = {};

/* ------------------------------------------------------------------------------------------------
 * Metadados institucionais do concurso (para exibição em telas de Edital/Configurações).
 * ---------------------------------------------------------------------------------------------- */

export const CONCURSO_INFO = {
  orgao: "Petrobras Transporte S.A. (Transpetro)",
  edital: "Edital nº 03 - TRANSPETRO/PSP/TERRA/NÍVEL MÉDIO - 2026.3, de 11/08/2026",
  banca: "Fundação Cesgranrio",
  cargo: "Profissional Transpetro de Nível Técnico",
  enfase: "Administração e Controle (Ênfase 1)",
  escolaridade: "Curso de nível médio (não exige curso técnico específico)",
  /** Salário básico oficial; remuneração mínima garantida também divulgada (R$ 6.539,54), não
   * modelada aqui por não ser necessária ao motor pedagógico. */
  salarioBasico: "R$ 3.776,64",
  vagasImediatas: 5,
  vagasTotalComCadastroReserva: 75,
  regime: "CLT, com contratação em caráter experimental nos primeiros 90 dias.",
  fonteConsulta:
    "PDF oficial do edital (fornecido pelo usuário) + verificação cruzada via pesquisa web em 2026-08-19/20. Ver MATRIZ_EDITAL_TRANSPETRO.md para o detalhamento completo código a código.",
} as const;
