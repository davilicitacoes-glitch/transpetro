import type { SubjectSlug } from "@/content/lessonTypes";

export interface SubjectDef {
  slug: SubjectSlug;
  name: string;
  description: string;
  color: string;
  examWeightPoints: number;
}

export interface ModuleDef {
  slug: string;
  subjectSlug: SubjectSlug;
  name: string;
  order: number;
}

export interface TopicDef {
  slug: string;
  moduleSlug: string;
  name: string;
  syllabusCodes: string[];
  order: number;
}

/**
 * PLACEHOLDER — Fase 2: preencher com o conteúdo programático real do Edital nº 3/2026
 * (ênfase Administração e Controle). Pesos (examWeightPoints) usam a divisão confirmada de
 * questões (10 Português / 10 Matemática ESTIMADO / 50 Específicas confirmado) — ver
 * config/concurso.ts para os campos PENDENTE DE CONFIRMAÇÃO.
 */
export const SUBJECTS: SubjectDef[] = [
  { slug: "especificas", name: "Conhecimentos Específicos", description: "Administração e Controle — PENDENTE DE CONFIRMAÇÃO o conteúdo programático detalhado.", color: "#0f766e", examWeightPoints: 50 },
  { slug: "portugues", name: "Língua Portuguesa", description: "PENDENTE DE CONFIRMAÇÃO o conteúdo programático detalhado.", color: "#7c3aed", examWeightPoints: 10 },
  { slug: "matematica", name: "Matemática", description: "PENDENTE DE CONFIRMAÇÃO o conteúdo programático detalhado.", color: "#b45309", examWeightPoints: 10 },
];

/** PLACEHOLDER — Fase 2 definirá os módulos reais a partir do edital oficial. */
export const MODULES: ModuleDef[] = [];

/** PLACEHOLDER — Fase 2 definirá os tópicos reais a partir do edital oficial. */
export const TOPICS: TopicDef[] = [];
