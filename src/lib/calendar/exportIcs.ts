import type { CourseDayOverviewEntry } from "@/lib/course/service";

/**
 * Gera um arquivo .ics (formato iCalendar, RFC 5545) com todo o cronograma do "Meu Curso" —
 * um evento por dia de estudo (data agendada real, recalculada a partir do progresso do aluno) e
 * um evento para o dia da prova. Importável no Google Calendar, Outlook, Apple Calendar etc.
 *
 * IMPORTANTE: as datas de cada dia vêm de `entry.scheduledDate`, que já reflete o calendário
 * recalculado pelo motor (`buildCourseCalendar`) a partir da data de início real do aluno — não são
 * datas fixas. Se o aluno atrasar, o dia perdido não desaparece: ele continua na lista, marcado
 * como atrasado, e o aluno o cumpre depois sem perder o conteúdo (o motor nunca pula um dia
 * obrigatório).
 */
function icsEscape(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function isoToIcsDate(iso: string): string {
  return iso.replace(/-/g, "");
}

function foldLine(line: string): string {
  // RFC 5545 recomenda quebrar linhas com mais de 75 octetos — simplificado para ASCII/UTF-8 comum.
  if (line.length <= 75) return line;
  const parts: string[] = [];
  let rest = line;
  while (rest.length > 75) {
    parts.push(rest.slice(0, 75));
    rest = " " + rest.slice(75);
  }
  parts.push(rest);
  return parts.join("\r\n");
}

export function buildCourseIcs(entries: CourseDayOverviewEntry[], examDate: string, courseTitle = "Transpetro Estudos"): string {
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Transpetro Estudos//Cronograma//PT-BR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  for (const entry of entries) {
    const dateStr = isoToIcsDate(entry.scheduledDate);
    lines.push(
      "BEGIN:VEVENT",
      `UID:transpetro-estudos-dia-${entry.day}@local`,
      `DTSTAMP:${now}`,
      `DTSTART;VALUE=DATE:${dateStr}`,
      `DTEND;VALUE=DATE:${dateStr}`,
      foldLine(`SUMMARY:${icsEscape(`Dia ${entry.day} — ${entry.title}`)}`),
      foldLine(`DESCRIPTION:${icsEscape(`${courseTitle}. Assuntos: ${entry.subjects.join(", ")}. Códigos do edital: ${entry.syllabusCodes.join(", ") || "—"}. Progresso: ${entry.completedSteps}/${entry.totalSteps} etapas.`)}`),
      "END:VEVENT",
    );
  }

  const examDateStr = isoToIcsDate(examDate);
  lines.push(
    "BEGIN:VEVENT",
    "UID:transpetro-estudos-prova@local",
    `DTSTAMP:${now}`,
    `DTSTART;VALUE=DATE:${examDateStr}`,
    `DTEND;VALUE=DATE:${examDateStr}`,
    "SUMMARY:Prova Transpetro (Edital nº 03/2026.3)",
    "DESCRIPTION:Dia da prova objetiva. Não é dia de aula.",
    "END:VEVENT",
  );

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadIcs(icsContent: string, filename = "transpetro-cronograma.ics"): void {
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
