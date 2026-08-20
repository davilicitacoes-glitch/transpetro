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
 * PLACEHOLDER — Fase 2: preencher os MÓDULOS e TÓPICOS reais a partir do conteúdo programático
 * oficial (Anexo IV do edital — ver MATRIZ_EDITAL_TRANSPETRO.md na raiz do projeto para os 39
 * códigos: PT-01..08, MAT-01..10, AC-01..21). Os pesos (examWeightPoints) abaixo já refletem a
 * estrutura CONFIRMADA da prova (60 questões: 40 Específicas + 10 Português + 10 Matemática) —
 * ver config/concurso.ts.
 */
export const SUBJECTS: SubjectDef[] = [
  { slug: "especificas", name: "Conhecimentos Específicos", description: "Administração e Controle (Anexo IV, códigos AC-01 a AC-21) — módulos/tópicos ainda não detalhados (Fase 2).", color: "#0f766e", examWeightPoints: 40 },
  { slug: "portugues", name: "Língua Portuguesa", description: "Anexo IV, códigos PT-01 a PT-08 — módulos/tópicos ainda não detalhados (Fase 2).", color: "#7c3aed", examWeightPoints: 10 },
  { slug: "matematica", name: "Matemática", description: "Anexo IV, códigos MAT-01 a MAT-10 — módulos/tópicos ainda não detalhados (Fase 2).", color: "#b45309", examWeightPoints: 10 },
];

/** PLACEHOLDER — Fase 2 definirá os módulos reais a partir do edital oficial. */
export const MODULES: ModuleDef[] = [];

/** PLACEHOLDER — Fase 2 definirá os tópicos reais a partir do edital oficial. */
export const TOPICS: TopicDef[] = [];
