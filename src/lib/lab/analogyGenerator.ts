import type { Question } from "@/lib/models/schema";

/**
 * Gerador de questão por analogia (Laboratório, ferramenta 2.1).
 *
 * Varia SÓ nomes/cenário genéricos de uma questão REAL validada (source.origin === "real"),
 * mantendo intactas as alternativas, a chave correta e as explicações — a regra testada não muda,
 * só o "figurino" da pergunta. Nunca mexe em números (recalcular corretude de questões numéricas de
 * forma genérica não é seguro) nem em termos técnicos/nomes próprios de instituições/leis — só nos
 * substantivos genéricos de cenário abaixo, trocados de forma IDÊNTICA no enunciado e em todas as
 * alternativas/explicações, pra manter o texto coerente.
 *
 * A maioria das questões reais do acervo é conceitual/definicional (sem cenário narrativo) — pra
 * essas, não há nada de honesto a variar, e a função retorna `null` em vez de forçar uma variação
 * artificial.
 */
const SWAP_GROUPS: string[][] = [
  ["empresa", "organização", "companhia", "instituição"],
  ["colaborador", "funcionário", "empregado", "servidor"],
  ["colaboradora", "funcionária", "empregada", "servidora"],
  ["gestor", "chefe", "supervisor", "coordenador"],
  ["gestora", "chefa", "supervisora", "coordenadora"],
  ["cliente", "consumidor"],
];

function questionCorpus(q: Question): string {
  return [q.statement, ...q.options.flatMap((o) => [o.text, o.explanation])].join(" \n ");
}

function findSwappableTerm(q: Question): { groupIndex: number; term: string } | null {
  const corpus = questionCorpus(q).toLowerCase();
  const matches: { groupIndex: number; term: string }[] = [];
  SWAP_GROUPS.forEach((group, groupIndex) => {
    for (const term of group) {
      if (new RegExp(`\\b${term}\\b`, "i").test(corpus)) {
        matches.push({ groupIndex, term });
        break; // um termo por grupo já basta pra saber que o grupo é aplicável
      }
    }
  });
  if (matches.length === 0) return null;
  return matches[Math.floor(Math.random() * matches.length)];
}

function replacePreservingCase(text: string, term: string, replacement: string): string {
  return text.replace(new RegExp(`\\b${term}\\b`, "gi"), (match) => {
    if (match[0] === match[0].toUpperCase() && match.length > 1 && match[1] === match[1].toLowerCase()) {
      return replacement[0].toUpperCase() + replacement.slice(1);
    }
    if (match === match.toUpperCase()) return replacement.toUpperCase();
    return replacement;
  });
}

export interface AnalogyResult {
  question: Question;
  sourceQuestionId: string;
  swappedTerm: string;
  replacementTerm: string;
}

/** `null` = esta questão não tem cenário variável (é puramente conceitual) — não force nada. */
export function generateAnalogyQuestion(source: Question): AnalogyResult | null {
  if (source.source.origin !== "real") return null;
  const found = findSwappableTerm(source);
  if (!found) return null;

  const group = SWAP_GROUPS[found.groupIndex];
  const alternatives = group.filter((t) => t.toLowerCase() !== found.term.toLowerCase());
  const replacement = alternatives[Math.floor(Math.random() * alternatives.length)];

  const swap = (text: string) => replacePreservingCase(text, found.term, replacement);

  const generated: Question = {
    ...source,
    id: `${source.id}-analogia-${Date.now()}`,
    statement: swap(source.statement),
    options: source.options.map((o) => ({ ...o, text: swap(o.text), explanation: swap(o.explanation) })),
    source: { ...source.source, origin: "adaptada" },
  };

  return { question: generated, sourceQuestionId: source.id, swappedTerm: found.term, replacementTerm: replacement };
}
