/**
 * Tipos genéricos de conteúdo pedagógico (motor). As disciplinas reais (SubjectSlug) e o conteúdo
 * das aulas (lessons/questions/videos) são específicos do concurso e serão criados na Fase 2,
 * a partir do conteúdo programático oficial da ênfase "Administração e Controle" do Edital nº 3/2026.
 *
 * PLACEHOLDER: SubjectSlug abaixo usa os blocos confirmados da prova (portugues, matematica,
 * especificas) — ajustar/expandir quando o conteúdo programático detalhado for definido.
 * "redacao" é incluído como valor possível (não confirmado — HAS_ESSAY_STAGE em config/concurso.ts
 * ainda está pendente) para preservar o padrão do motor de tratar redação como uma entrada
 * filtrável em SUBJECTS, igual ao projeto de origem.
 */
export type SubjectSlug = "portugues" | "matematica" | "especificas" | "redacao";
export type Mastery = "introdutorio" | "intermediario" | "avancado";

export interface LessonLegalReference {
  title: string;
  url?: string;
  note?: string;
}

export interface LessonFlashcard {
  front: string;
  back: string;
}

export interface LessonQuizOption {
  key: "A" | "B" | "C" | "D";
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface LessonQuizQuestion {
  statement: string;
  options: LessonQuizOption[];
}

export interface LessonContent {
  slug: string;
  topicSlug: string;
  subjectSlug: SubjectSlug;
  moduleSlug: string;
  title: string;
  learningObjective: string;
  syllabusCodes: string[];
  estimatedMinutes: number;
  expectedMastery: Mastery;
  bodyMdx: string;
  mustMemorize: string[];
  workedExamples: string[];
  commonMistakes: string[];
  /** Como a banca (Fundação Cesgranrio) pode cobrar este tópico. */
  howBoardMightAsk: string[];
  legalReferences: LessonLegalReference[];
  reviewSummaryPoints: string[];
  flashcards: LessonFlashcard[];
  miniQuiz: LessonQuizQuestion[];
}
