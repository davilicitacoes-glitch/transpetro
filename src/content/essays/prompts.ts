export interface EssayPromptContent {
  id: string;
  title: string;
  themeText: string;
  supportingTexts: string[];
  suggestedApproach: string[];
  repertoire?: string[];
  highScoreModel?: string;
  modelComment?: string;
  originLabel?: string;
}

/**
 * PLACEHOLDER — vazio. PENDENTE DE CONFIRMAÇÃO se o Edital nº 3/2026 (Transpetro) tem etapa de
 * redação (ver HAS_ESSAY_STAGE em config/concurso.ts). Nenhuma proposta foi copiada de outro projeto.
 */
export const ESSAY_PROMPTS: EssayPromptContent[] = [];
