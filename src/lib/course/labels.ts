import type { CourseDay } from "@/lib/models/schema";

export const PHASE_LABEL: Record<CourseDay["phase"], string> = {
  fundamentos: "Fundamentos",
  desenvolvimento: "Desenvolvimento",
  fechamento_edital: "Fechamento do edital",
  consolidacao: "Consolidação",
  reta_final: "Reta final",
};

export const STEP_TYPE_LABEL: Record<string, string> = {
  abertura: "Abertura do dia",
  revisao_programada: "Revisão programada",
  aula_textual: "Aula",
  videoaula_obrigatoria: "Videoaula",
  exemplo_guiado: "Exemplo guiado",
  checagem_compreensao: "Checagem de compreensão",
  questoes: "Questões",
  analise_erros: "Análise de erros",
  pratica_redacao: "Prática de redação",
  simulado_parcial: "Simulado parcial",
  simulado_completo: "Simulado completo",
  fechamento_dia: "Fechamento do dia",
  revisao_vespera: "Revisão de véspera",
};

export function formatMinutes(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const rest = min % 60;
  return rest === 0 ? `${h}h` : `${h}h${String(rest).padStart(2, "0")}`;
}
