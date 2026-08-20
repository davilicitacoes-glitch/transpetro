import { COURSE_ID, COURSE_PLAN_VERSION, type CoursePlan } from "@/lib/models/schema";

/**
 * PLACEHOLDER — Fase 2 construirá o plano real de "Meu Curso" a partir do cronograma e do conteúdo
 * programático confirmado do Edital nº 3/2026 (Transpetro, ênfase Administração e Controle).
 * No projeto de origem (motor extraído), este arquivo gerava deterministicamente um plano de dias
 * a partir dos catálogos de aulas/vídeos/questões daquele concurso — lógica 100% específica de
 * conteúdo, não copiada.
 * Aqui expomos apenas um plano vazio, válido pelo schema (days: min(0)), para o motor funcionar.
 */
export function buildCoursePlanV2(): CoursePlan {
  return {
    courseId: COURSE_ID,
    version: COURSE_PLAN_VERSION,
    generatedAt: new Date().toISOString(),
    days: [],
  };
}

export const COURSE_PLAN_V2: CoursePlan = buildCoursePlanV2();
