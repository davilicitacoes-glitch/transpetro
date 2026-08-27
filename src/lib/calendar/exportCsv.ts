import type { CourseDayOverviewEntry } from "@/lib/course/service";
import { formatDateBR } from "@/lib/schedule/dates";
import { PHASE_LABEL } from "@/lib/course/labels";

/**
 * Exporta o cronograma como CSV (abre direto no Excel/Google Sheets — sem depender de nenhuma
 * biblioteca de planilha). BOM UTF-8 no início pra o Excel reconhecer acentuação corretamente em
 * vez de mostrar caracteres corrompidos (problema clássico de CSV sem BOM no Windows).
 */
function csvEscape(value: string): string {
  if (/[";\n,]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

const STATUS_LABEL: Record<string, string> = {
  concluido: "Concluído",
  em_andamento: "Em andamento",
  nao_iniciado: "Não iniciado",
};

export function buildCourseCsv(entries: CourseDayOverviewEntry[]): string {
  const header = ["Dia", "Data", "Fase", "Título", "Assuntos", "Códigos do edital", "Status", "Etapas concluídas", "Total de etapas", "Minutos estimados"];
  const rows = entries.map((e) => [
    String(e.day),
    formatDateBR(e.scheduledDate),
    PHASE_LABEL[e.phase] ?? e.phase,
    e.title,
    e.subjects.join(" | "),
    e.syllabusCodes.join(" | "),
    STATUS_LABEL[e.status] ?? e.status,
    String(e.completedSteps),
    String(e.totalSteps),
    String(e.estimatedMinutesTotal),
  ]);
  const lines = [header, ...rows].map((row) => row.map(csvEscape).join(";"));
  return "﻿" + lines.join("\r\n");
}

export function downloadCsv(csvContent: string, filename = "transpetro-cronograma.csv"): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
