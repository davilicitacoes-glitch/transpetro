/**
 * Técnica de Feynman assistida pelo Professor (Laboratório, ferramenta 2.5) — tipos compartilhados
 * entre a tela (`/laboratorio/feynman`) e a rota de servidor (`/api/professor/feynman`).
 */
export interface FeynmanEvaluation {
  /** "correto" = pode virar flashcard (2.9); "parcial"/"incorreto" = precisa tentar de novo antes. */
  verdict: "correto" | "parcial" | "incorreto";
  /** Feedback ESPECÍFICO sobre o que o aluno escreveu — nunca elogio genérico. */
  feedback: string;
  coveredPoints: string[];
  missedOrWrongPoints: string[];
}
