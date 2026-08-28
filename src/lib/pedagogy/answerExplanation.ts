import type { Question } from "@/lib/models/schema";
import { ALL_LESSONS } from "@/content/lessons";
import { ALL_QUESTIONS } from "@/content/questions";

/**
 * EXPLICAÇÃO DE ERRO UNIVERSAL — componente/serviço central único (missão "Explicação de erro
 * universal + Recursos Extras", seção 0.2: "não copie a lógica em cada tela"). Usado por
 * `recordAttempt` (grava a explicação no Caderno de Erros, pra reaparecer na revisão espaçada) e
 * por `<QuestionCard>` (mostra a explicação imediatamente após a resposta) — o MESMO cálculo nos
 * dois lugares, nunca duas versões da mesma lógica.
 *
 * Fonte da explicação: o campo `explanation` que TODA alternativa já tem no banco de questões
 * (Prompt 9) — "por que a certa está certa" = explicação da alternativa correta; "por que a errada
 * está errada" = explicação da PRÓPRIA alternativa que o aluno marcou. Não inventa texto novo: se o
 * autor da questão já registrou a relação de confusão na explicação daquela alternativa (ex.: "isso
 * vale para outro prazo/lei/situação"), ela aparece aqui tal como escrita. Quando não há relação
 * conhecida, a alternativa simplesmente não tem uma "pegadinha" ligada a ela — não forçamos uma.
 */

const lessonByTopicSlug = new Map(ALL_LESSONS.map((l) => [l.topicSlug, l]));
const questionById = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));

export interface AnswerExplanation {
  questionId: string;
  isCorrect: boolean;
  correctKey: string;
  correctText: string;
  correctExplanation: string;
  selectedKey: string | null;
  selectedText: string | null;
  /** Só preenchido quando a resposta foi errada — é a explicação da PRÓPRIA alternativa escolhida. */
  selectedExplanation: string | null;
  /** Pegadinha do tema (Prompt 10, `commonMistakes`) cujo texto tem sobreposição real de palavras
   * com a alternativa escolhida — numerada pela posição real na lista do código (1-based), pra citar
   * "essa é a pegadinha nº X". null quando não há correspondência real (não força uma). */
  matchedPegadinha: { index: number; total: number; text: string } | null;
}

const COMBINING_DIACRITICS = new RegExp("[̀-ͯ]", "g");

function normalize(text: string): string {
  return text.normalize("NFD").replace(COMBINING_DIACRITICS, "").toLowerCase();
}

const STOPWORDS = new Set(["para", "como", "esta", "esse", "essa", "isso", "pela", "pelo", "quando", "onde", "sobre", "entre", "mais", "menos", "deve", "deve", "pode", "seja"]);

function significantWords(text: string): Set<string> {
  return new Set(
    normalize(text)
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length >= 4 && !STOPWORDS.has(w)),
  );
}

/** Overlap mínimo de palavras significativas pra considerar que uma pegadinha do tema realmente
 * corresponde à confusão do aluno — abaixo disso, é melhor não citar nada do que citar errado. */
const PEGADINHA_MATCH_MIN_OVERLAP = 2;

export function buildAnswerExplanation(question: Question, selectedKey: string | null): AnswerExplanation {
  const correct = question.options.find((o) => o.isCorrect)!;
  const selected = selectedKey ? question.options.find((o) => o.key === selectedKey) : undefined;
  const isCorrect = !!selected?.isCorrect;

  let matchedPegadinha: AnswerExplanation["matchedPegadinha"] = null;
  const lesson = lessonByTopicSlug.get(question.topicSlug);

  if (!isCorrect && selected && lesson && lesson.commonMistakes.length > 0) {
    const selectedWords = significantWords(`${selected.text} ${selected.explanation}`);
    let bestScore = 0;
    let bestIndex = -1;
    lesson.commonMistakes.forEach((mistake, i) => {
      const mistakeWords = significantWords(mistake);
      const overlap = [...selectedWords].filter((w) => mistakeWords.has(w)).length;
      if (overlap > bestScore) {
        bestScore = overlap;
        bestIndex = i;
      }
    });
    if (bestScore >= PEGADINHA_MATCH_MIN_OVERLAP && bestIndex >= 0) {
      matchedPegadinha = { index: bestIndex + 1, total: lesson.commonMistakes.length, text: lesson.commonMistakes[bestIndex] };
    }
  }

  return {
    questionId: question.id,
    isCorrect,
    correctKey: correct.key,
    correctText: correct.text,
    correctExplanation: correct.explanation,
    selectedKey: selectedKey ?? null,
    selectedText: selected?.text ?? null,
    selectedExplanation: !isCorrect ? (selected?.explanation ?? null) : null,
    matchedPegadinha,
  };
}

/** Atalho pra quando só se tem o ID da questão (caso mais comum: `recordAttempt`). null quando a
 * questão não existe no banco (nunca deveria acontecer com dado real, mas não assume). */
export function explainAnswerById(questionId: string, selectedKey: string | null): AnswerExplanation | null {
  const question = questionById.get(questionId);
  if (!question) return null;
  return buildAnswerExplanation(question, selectedKey);
}

/** Texto pronto pra gravar em `ErrorEntry.cause` — usado por `recordAttempt` pra que a explicação
 * fique disponível de novo quando o erro voltar na revisão espaçada (Motor 1), não só na hora. */
export function explanationToCause(explanation: AnswerExplanation): string {
  if (explanation.selectedExplanation) {
    const base = `Você marcou "${explanation.selectedText}" — ${explanation.selectedExplanation}`;
    return explanation.matchedPegadinha
      ? `${base} (essa é a pegadinha nº ${explanation.matchedPegadinha.index} de ${explanation.matchedPegadinha.total} deste tema.)`
      : base;
  }
  return "Resposta incorreta sem uma relação de confusão clara com a alternativa certa registrada — pode ter sido desatenção, chute ou tema ainda não estudado a fundo.";
}
