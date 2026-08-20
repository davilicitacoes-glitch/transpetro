import type { Question } from "@/lib/models/schema";

export interface LightningMap {
  id: string;
  subject: string;
  subjectSlug: string;
  blocks: Array<{ minutes: number; title: string; points: string[] }>;
  contrasts: string[];
  avoidStartingNow: string[];
}

export interface NumberThatFalls {
  id: string;
  subject: string;
  provision: string;
  number: string;
  meaning: string;
  trap: string;
  officialSource: string;
}

export interface EveChecklistItem {
  id: string;
  category: "confirmado" | "cartao" | "recomendacao";
  text: string;
}

/** PLACEHOLDER — Fase 2 populará a revisão de véspera real (Administração e Controle). */
export const LIGHTNING_MAPS: LightningMap[] = [];

export const FINAL_REVIEW_QUESTIONS: Question[] = [];

export const NUMBER_TABLE: NumberThatFalls[] = [];

export const EVE_CHECKLIST: EveChecklistItem[] = [
  { id: "confirmar-local", category: "confirmado", text: "PLACEHOLDER — confirmar local e horário da prova (Edital nº 3/2026)." },
];

export interface FinalTenMinutesItem {
  minute: string;
  action: string;
}

export const FINAL_TEN_MINUTES: FinalTenMinutesItem[] = [];
