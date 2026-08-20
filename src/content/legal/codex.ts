export interface LegalReviewItem {
  id: string;
  title: string;
  literalText: string;
  comment: string;
  trap: string;
  howItAppears: string;
  needsOfficialCheck: boolean;
}

/** PLACEHOLDER — Fase 2 populará com a base legal real relevante ao Edital nº 3/2026 (Transpetro). */
export const CODEX_LEGAL_REVIEW: LegalReviewItem[] = [];
