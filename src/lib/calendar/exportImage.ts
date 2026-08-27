import type { CourseDayOverviewEntry } from "@/lib/course/service";
import { formatDateBR } from "@/lib/schedule/dates";
import { PHASE_LABEL } from "@/lib/course/labels";

/**
 * Desenha o cronograma completo como uma imagem PNG organizada (um cartão por dia, igual à visão
 * "Agenda" do calendário) usando <canvas> puro — sem depender de nenhuma biblioteca de captura de
 * tela. Só roda no navegador (usa document/canvas).
 */
const WIDTH = 900;
const PADDING = 32;
const ROW_HEIGHT = 74;
const ROW_GAP = 10;
const HEADER_HEIGHT = 130;
const FOOTER_HEIGHT = 46;

const COLORS = {
  bg: "#f5f7f4",
  card: "#ffffff",
  border: "#e2e5e0",
  brand: "#0d7a63",
  accent: "#e6a415",
  text: "#111827",
  muted: "#6b7280",
  success: "#0f9d58",
  successSoft: "#e4f6ea",
  warning: "#b8860b",
  warningSoft: "#fbf1da",
  brandSoft: "#e2f3ee",
};

const STATUS_STYLE: Record<string, { bg: string; fg: string; label: string }> = {
  concluido: { bg: COLORS.successSoft, fg: COLORS.success, label: "Concluído" },
  em_andamento: { bg: COLORS.brandSoft, fg: COLORS.brand, label: "Em andamento" },
  nao_iniciado: { bg: "#eef0ee", fg: COLORS.muted, label: "Não iniciado" },
};

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function truncate(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let out = text;
  while (out.length > 1 && ctx.measureText(out + "…").width > maxWidth) out = out.slice(0, -1);
  return out + "…";
}

export function renderCourseCalendarImage(entries: CourseDayOverviewEntry[], examDateBR: string): HTMLCanvasElement {
  const height = HEADER_HEIGHT + entries.length * (ROW_HEIGHT + ROW_GAP) + FOOTER_HEIGHT;
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${WIDTH}px`;
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  // fundo
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, WIDTH, height);

  // cabeçalho com faixa em gradiente
  const grad = ctx.createLinearGradient(0, 0, WIDTH, 0);
  grad.addColorStop(0, COLORS.brand);
  grad.addColorStop(1, COLORS.accent);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, WIDTH, 6);

  ctx.fillStyle = COLORS.text;
  ctx.font = "700 24px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("Transpetro Estudos — Cronograma completo", PADDING, 52);

  ctx.fillStyle = COLORS.muted;
  ctx.font = "400 13px 'Segoe UI', Arial, sans-serif";
  ctx.fillText(`${entries.length} dias de estudo · Prova em ${examDateBR}`, PADDING, 76);
  ctx.fillText(`Gerado em ${formatDateBR(new Date().toISOString().slice(0, 10))}`, PADDING, 96);

  let y = HEADER_HEIGHT;
  for (const entry of entries) {
    const style = STATUS_STYLE[entry.status] ?? STATUS_STYLE.nao_iniciado;

    ctx.fillStyle = COLORS.card;
    roundRect(ctx, PADDING, y, WIDTH - PADDING * 2, ROW_HEIGHT, 10);
    ctx.fill();
    ctx.strokeStyle = COLORS.border;
    ctx.lineWidth = 1;
    ctx.stroke();

    // chip "Dia N"
    const chipW = 64;
    ctx.fillStyle = style.bg;
    roundRect(ctx, PADDING + 14, y + 14, chipW, 24, 12);
    ctx.fill();
    ctx.fillStyle = style.fg;
    ctx.font = "700 12px 'Segoe UI', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`Dia ${entry.day}`, PADDING + 14 + chipW / 2, y + 30);
    ctx.textAlign = "left";

    const textX = PADDING + 14 + chipW + 16;
    const textMaxWidth = WIDTH - PADDING - textX - 130;

    ctx.fillStyle = COLORS.text;
    ctx.font = "600 15px 'Segoe UI', Arial, sans-serif";
    ctx.fillText(truncate(ctx, entry.title, textMaxWidth), textX, y + 28);

    ctx.fillStyle = COLORS.muted;
    ctx.font = "400 12px 'Segoe UI', Arial, sans-serif";
    const metaLine = `${formatDateBR(entry.scheduledDate)} · ${PHASE_LABEL[entry.phase] ?? entry.phase} · ${entry.subjects.join(", ")}`;
    ctx.fillText(truncate(ctx, metaLine, textMaxWidth), textX, y + 48);

    if (entry.syllabusCodes.length > 0) {
      ctx.fillStyle = COLORS.muted;
      ctx.font = "400 11px 'Segoe UI', Arial, sans-serif";
      ctx.fillText(truncate(ctx, entry.syllabusCodes.join(" · "), textMaxWidth), textX, y + 64);
    }

    // status à direita
    ctx.fillStyle = style.fg;
    ctx.font = "600 11px 'Segoe UI', Arial, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(style.label, WIDTH - PADDING - 14, y + 28);
    ctx.fillStyle = COLORS.muted;
    ctx.font = "400 11px 'Segoe UI', Arial, sans-serif";
    ctx.fillText(`${entry.completedSteps}/${entry.totalSteps} etapas`, WIDTH - PADDING - 14, y + 46);
    ctx.textAlign = "left";

    y += ROW_HEIGHT + ROW_GAP;
  }

  ctx.fillStyle = COLORS.muted;
  ctx.font = "400 11px 'Segoe UI', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Transpetro Estudos — transpetro-delta.vercel.app", WIDTH / 2, height - 18);
  ctx.textAlign = "left";

  return canvas;
}

export async function downloadCourseCalendarImage(entries: CourseDayOverviewEntry[], examDateBR: string, filename = "transpetro-cronograma.png"): Promise<void> {
  const canvas = renderCourseCalendarImage(entries, examDateBR);
  const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
