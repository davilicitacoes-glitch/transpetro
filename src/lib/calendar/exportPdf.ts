import type { CourseDayOverviewEntry } from "@/lib/course/service";
import { formatDateBR } from "@/lib/schedule/dates";
import { PHASE_LABEL } from "@/lib/course/labels";

/**
 * Gera um PDF (formato A4) do cronograma completo — do zero, sem nenhuma biblioteca de PDF (nenhuma
 * está instalada no projeto e adicionar uma só pra isso pesaria o bundle à toa). O formato PDF é bem
 * documentado e simples o bastante para texto puro: cabeçalho + objetos (catálogo, páginas, fontes
 * padrão Helvetica) + streams de conteúdo com comandos de texto/linha + tabela xref. Suporta
 * acentuação em português via WinAnsiEncoding (idêntico a Latin-1 no intervalo usado aqui, com um
 * mapa pontual pra travessão/reticências que ficam fora do Latin-1).
 */

const PAGE_W = 595.28; // A4 em pt
const PAGE_H = 841.89;
const MARGIN = 40;
const CONTENT_W = PAGE_W - MARGIN * 2;

// caracteres fora do intervalo Latin-1 (0-255) usados nos textos deste export, mapeados pro byte
// correspondente em WinAnsiEncoding (cp1252) — idêntico ao Unicode nesse intervalo.
const WINANSI_EXTRA: Record<string, number> = {
  "—": 0x97, // em dash —
  "–": 0x96, // en dash –
  "…": 0x85, // ellipsis …
  "•": 0x95, // bullet •
  "‘": 0x91, // aspa simples esquerda '
  "’": 0x92, // aspa simples direita '
  "“": 0x93, // aspa dupla esquerda "
  "”": 0x94, // aspa dupla direita "
};

function toWinAnsiBytes(text: string): number[] {
  const bytes: number[] = [];
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 63;
    if (code <= 255) bytes.push(code);
    else bytes.push(WINANSI_EXTRA[ch] ?? 63);
  }
  return bytes;
}

function pdfEscapeBytes(bytes: number[]): string {
  let out = "";
  for (const b of bytes) {
    if (b === 0x28 || b === 0x29 || b === 0x5c) out += "\\" + String.fromCharCode(b); // ( ) \
    else out += String.fromCharCode(b);
  }
  return out;
}

function pdfString(text: string): string {
  return `(${pdfEscapeBytes(toWinAnsiBytes(text))})`;
}

/** Estimativa de largura de texto em pt (Helvetica não é monoespaçada; usa fator médio por
 * caractere — suficiente para decidir quebras de linha, não precisa de métrica exata). */
function estimateWidth(text: string, fontSize: number, bold: boolean): number {
  return text.length * fontSize * (bold ? 0.56 : 0.5);
}

function wrapText(text: string, maxWidth: number, fontSize: number, bold: boolean): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (estimateWidth(candidate, fontSize, bold) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.length > 0 ? lines : [""];
}

interface TextCmd {
  x: number;
  y: number;
  size: number;
  bold: boolean;
  gray: number; // 0 = preto, 1 = branco
  text: string;
}
interface LineCmd {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  gray: number;
}

const STATUS_LABEL: Record<string, string> = {
  concluido: "Concluído",
  em_andamento: "Em andamento",
  nao_iniciado: "Não iniciado",
};

function buildPages(entries: CourseDayOverviewEntry[], examDateBR: string): { texts: TextCmd[]; lines: LineCmd[] }[] {
  const pages: { texts: TextCmd[]; lines: LineCmd[] }[] = [];
  let texts: TextCmd[] = [];
  let lines: LineCmd[] = [];
  let y = 0;
  const bottomLimit = MARGIN + 30;

  function newPage(withHeader: boolean) {
    if (texts.length > 0 || lines.length > 0) pages.push({ texts, lines });
    texts = [];
    lines = [];
    y = PAGE_H - MARGIN;
    if (withHeader) {
      texts.push({ x: MARGIN, y, size: 17, bold: true, gray: 0, text: "Transpetro Estudos — Cronograma completo" });
      y -= 20;
      texts.push({ x: MARGIN, y, size: 10, bold: false, gray: 0.4, text: `${entries.length} dias de estudo · Prova em ${examDateBR} · Gerado em ${formatDateBR(new Date().toISOString().slice(0, 10))}` });
      y -= 14;
      lines.push({ x1: MARGIN, y1: y, x2: PAGE_W - MARGIN, y2: y, gray: 0.75 });
      y -= 20;
    } else {
      y -= 6;
    }
  }

  newPage(true);

  for (const entry of entries) {
    const titleLines = wrapText(`Dia ${entry.day} — ${entry.title}`, CONTENT_W, 11.5, true);
    const meta = `${formatDateBR(entry.scheduledDate)} · ${PHASE_LABEL[entry.phase] ?? entry.phase} · ${STATUS_LABEL[entry.status] ?? entry.status} · ${entry.completedSteps}/${entry.totalSteps} etapas`;
    const subjectsLine = entry.subjects.length > 0 ? `Assuntos: ${entry.subjects.join(", ")}` : "";
    const codesLine = entry.syllabusCodes.length > 0 ? `Códigos do edital: ${entry.syllabusCodes.join(", ")}` : "";
    const metaLines = wrapText(meta, CONTENT_W, 9.5, false);
    const subjectLines = subjectsLine ? wrapText(subjectsLine, CONTENT_W, 9, false) : [];
    const codeLines = codesLine ? wrapText(codesLine, CONTENT_W, 9, false) : [];

    const blockLineCount = titleLines.length + metaLines.length + subjectLines.length + codeLines.length;
    const blockHeight = titleLines.length * 15 + metaLines.length * 12.5 + subjectLines.length * 12 + codeLines.length * 12 + 12;

    if (y - blockHeight < bottomLimit) newPage(true);

    for (const line of titleLines) {
      texts.push({ x: MARGIN, y, size: 11.5, bold: true, gray: 0, text: line });
      y -= 15;
    }
    for (const line of metaLines) {
      texts.push({ x: MARGIN + 4, y, size: 9.5, bold: false, gray: 0.35, text: line });
      y -= 12.5;
    }
    for (const line of subjectLines) {
      texts.push({ x: MARGIN + 4, y, size: 9, bold: false, gray: 0.45, text: line });
      y -= 12;
    }
    for (const line of codeLines) {
      texts.push({ x: MARGIN + 4, y, size: 9, bold: false, gray: 0.45, text: line });
      y -= 12;
    }
    y -= 4;
    lines.push({ x1: MARGIN, y1: y + 2, x2: PAGE_W - MARGIN, y2: y + 2, gray: 0.88 });
    y -= 8;
    void blockLineCount;
  }

  if (texts.length > 0 || lines.length > 0) pages.push({ texts, lines });
  return pages;
}

function buildContentStream(page: { texts: TextCmd[]; lines: LineCmd[] }): string {
  const parts: string[] = ["q"];
  for (const l of page.lines) {
    parts.push(`${l.gray} G`, "0.5 w", `${l.x1.toFixed(2)} ${l.y1.toFixed(2)} m`, `${l.x2.toFixed(2)} ${l.y2.toFixed(2)} l`, "S");
  }
  for (const t of page.texts) {
    parts.push("BT", `${t.gray} g`, `/${t.bold ? "F2" : "F1"} ${t.size} Tf`, `${t.x.toFixed(2)} ${t.y.toFixed(2)} Td`, `${pdfString(t.text)} Tj`, "ET");
  }
  parts.push("Q");
  return parts.join("\n");
}

export function buildCoursePdf(entries: CourseDayOverviewEntry[], examDateBR: string): Uint8Array {
  const pages = buildPages(entries, examDateBR);

  const objects: string[] = [];
  // objeto 1: catálogo, 2: pages (preenchido depois), 3/4: fontes
  objects.push(""); // placeholder obj1
  objects.push(""); // placeholder obj2
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");

  const pageObjNums: number[] = [];
  for (const page of pages) {
    const content = buildContentStream(page);
    const contentBytes = toWinAnsiBytes(content).length; // conteúdo é só ASCII/WinAnsi, então bytes = chars
    const contentObjIndex = objects.length + 1; // será o próximo objeto após o Page dict
    const pageObjIndex = objects.length; // objeto Page fica antes do Contents
    objects.push(""); // placeholder Page dict (preenchido abaixo com referência ao Contents)
    objects.push(`<< /Length ${contentBytes} >>\nstream\n${content}\nendstream`);
    objects[pageObjIndex - 1] = `<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Contents ${contentObjIndex} 0 R >>`;
    pageObjNums.push(pageObjIndex);
  }

  objects[0] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[1] = `<< /Type /Pages /Kids [${pageObjNums.map((n) => `${n} 0 R`).join(" ")}] /Count ${pageObjNums.length} >>`;

  // serializa com tabela xref correta
  let out = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((obj, idx) => {
    offsets.push(out.length);
    out += `${idx + 1} 0 obj\n${obj}\nendobj\n`;
  });
  const xrefStart = out.length;
  out += `xref\n0 ${objects.length + 1}\n`;
  out += "0000000000 65535 f \n";
  for (const off of offsets) out += `${String(off).padStart(10, "0")} 00000 n \n`;
  out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  // converte a string (já toda em bytes 0-255, Latin-1-safe) pra Uint8Array
  const bytes = new Uint8Array(out.length);
  for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0xff;
  return bytes;
}

export function downloadCoursePdf(entries: CourseDayOverviewEntry[], examDateBR: string, filename = "transpetro-cronograma.pdf"): void {
  const bytes = buildCoursePdf(entries, examDateBR);
  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
