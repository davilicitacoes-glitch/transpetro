"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, ChevronLeft, ChevronRight, List, LayoutGrid, Download, Image as ImageIcon, FileText, FileSpreadsheet, CalendarPlus, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { PHASE_LABEL, formatMinutes } from "@/lib/course/labels";
import { formatDateBR, todayInExamTimezone } from "@/lib/schedule/dates";
import { EXAM_DATE } from "@config/concurso";
import { getEnrollment, getCourseOverview, type CourseDayOverviewEntry } from "@/lib/course/service";
import { buildCourseIcs, downloadIcs } from "@/lib/calendar/exportIcs";
import { downloadCourseCalendarImage } from "@/lib/calendar/exportImage";
import { downloadCoursePdf } from "@/lib/calendar/exportPdf";
import { buildCourseCsv, downloadCsv } from "@/lib/calendar/exportCsv";
import type { CourseEnrollment } from "@/lib/models/schema";

type ViewMode = "mes" | "agenda";

function isoToDate(iso: string): Date {
  return new Date(`${iso}T12:00:00Z`);
}
function dateToIso(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}
function monthLabel(d: Date): string {
  return d.toLocaleDateString("pt-BR", { month: "long", year: "numeric", timeZone: "UTC" });
}

const WEEKDAYS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

export default function CalendarioPage() {
  const [entries, setEntries] = useState<CourseDayOverviewEntry[] | null>(null);
  const [enrollment, setEnrollment] = useState<CourseEnrollment | null>(null);
  const [notEnrolled, setNotEnrolled] = useState(false);
  const [view, setView] = useState<ViewMode>("mes");
  const [monthCursor, setMonthCursor] = useState<Date | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    (async () => {
      const e = await getEnrollment();
      if (!e) {
        setNotEnrolled(true);
        return;
      }
      const list = await getCourseOverview(undefined, e);
      setEnrollment(e);
      setEntries(list);
      const today = isoToDate(todayInExamTimezone());
      setMonthCursor(new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1)));
    })();
  }, []);

  const byDate = useMemo(() => {
    const map = new Map<string, CourseDayOverviewEntry>();
    entries?.forEach((e) => map.set(e.scheduledDate, e));
    return map;
  }, [entries]);

  const today = todayInExamTimezone();
  const selected = selectedDay != null ? entries?.find((e) => e.day === selectedDay) ?? null : null;

  if (notEnrolled) {
    return (
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full">
        <PageHeader eyebrow="Meu Curso" title="Calendário" />
        <p className="text-sm text-foreground-muted">
          Você ainda não começou o curso. <Link href="/meu-curso" className="text-brand font-medium">Comece por aqui</Link>.
        </p>
      </main>
    );
  }

  if (!entries || !monthCursor || !enrollment) {
    return (
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full">
        <p className="text-sm text-foreground-muted">Carregando…</p>
      </main>
    );
  }

  const firstIncompleteDay = entries.find((e) => e.status !== "concluido")?.day ?? entries.length + 1;

  function cellState(entry: CourseDayOverviewEntry | undefined, iso: string): string {
    if (!entry) return "vazio";
    if (entry.status === "concluido") return "concluido";
    if (iso === today) return "hoje";
    if (entry.status === "em_andamento") return "em_andamento";
    if (iso < today) return "atrasado";
    return "futuro";
  }

  const STATE_CLASS: Record<string, string> = {
    concluido: "bg-success-soft text-success border-success/30",
    hoje: "bg-brand text-white border-brand",
    em_andamento: "bg-brand-soft text-brand border-brand/40",
    atrasado: "bg-warning-soft text-warning border-warning/30",
    futuro: "bg-surface text-foreground border-border",
    vazio: "bg-transparent border-transparent",
  };

  // grade do mês: domingo primeiro
  const first = monthCursor;
  const startOffset = first.getUTCDay();
  const daysInMonth = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
  const cells: (string | null)[] = [...Array(startOffset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => dateToIso(new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), i + 1))))];

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in pb-10">
      <PageHeader
        eyebrow="Meu Curso"
        title="Calendário"
        description="Todo o percurso até a véspera da prova. Toque em qualquer dia para ver o plano — inclusive os que ainda não chegaram."
        action={
          <div className="flex items-center gap-2">
            <div className="flex gap-1 rounded-lg border border-border p-0.5">
              <button type="button" onClick={() => setView("mes")} className={`tap-target px-2.5 py-1.5 rounded-md text-xs flex items-center gap-1 ${view === "mes" ? "bg-brand text-white" : "text-foreground-muted"}`}>
                <LayoutGrid size={13} aria-hidden /> Mês
              </button>
              <button type="button" onClick={() => setView("agenda")} className={`tap-target px-2.5 py-1.5 rounded-md text-xs flex items-center gap-1 ${view === "agenda" ? "bg-brand text-white" : "text-foreground-muted"}`}>
                <List size={13} aria-hidden /> Agenda
              </button>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setDownloadOpen((v) => !v)}
                disabled={downloading}
                className="tap-target px-2.5 py-1.5 rounded-lg border border-border text-xs flex items-center gap-1 text-foreground-muted hover:bg-surface-muted disabled:opacity-60"
                aria-haspopup="menu"
                aria-expanded={downloadOpen}
              >
                <Download size={13} aria-hidden /> {downloading ? "Gerando…" : "Baixar"}
              </button>
              {downloadOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDownloadOpen(false)} />
                  <div role="menu" className="absolute right-0 top-full mt-1.5 z-50 w-64 rounded-xl border border-border bg-surface p-1.5 shadow-lg">
                    <p className="px-2.5 pt-1 pb-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-foreground-muted">Escolha o formato</p>
                    <DownloadOption
                      icon={ImageIcon}
                      label="Imagem (PNG)"
                      description="Cronograma completo, organizado por dia — pra visualizar ou compartilhar"
                      onClick={async () => {
                        setDownloading(true);
                        setDownloadOpen(false);
                        await downloadCourseCalendarImage(entries, formatDateBR(EXAM_DATE));
                        setDownloading(false);
                      }}
                    />
                    <DownloadOption
                      icon={FileText}
                      label="PDF"
                      description="Documento pronto pra imprimir ou guardar"
                      onClick={() => {
                        setDownloadOpen(false);
                        downloadCoursePdf(entries, formatDateBR(EXAM_DATE));
                      }}
                    />
                    <DownloadOption
                      icon={FileSpreadsheet}
                      label="Excel (CSV)"
                      description="Planilha com todas as colunas — abre no Excel ou Google Sheets"
                      onClick={() => {
                        setDownloadOpen(false);
                        downloadCsv(buildCourseCsv(entries));
                      }}
                    />
                    <DownloadOption
                      icon={CalendarPlus}
                      label="Calendário (.ics)"
                      description="Importa no Google Calendar, Outlook ou Apple Calendar"
                      onClick={() => {
                        setDownloadOpen(false);
                        downloadIcs(buildCourseIcs(entries, EXAM_DATE));
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        }
      />

      <div className="card p-3.5 mb-4 flex items-center gap-2 border-brand/30 bg-brand-soft/30">
        <CalendarDays size={16} className="text-brand shrink-0" aria-hidden />
        <p className="text-[12.5px]">
          <strong>Prova em {formatDateBR(EXAM_DATE)}</strong>. Esse dia não é dia de aula — é o dia da prova.
        </p>
      </div>

      <p className="text-[11.5px] text-foreground-muted mb-4">
        Perdeu um dia? Nenhum conteúdo é pulado — o dia perdido fica marcado como <strong>atrasado</strong> e continua disponível para ser cumprido depois, na ordem certa. Baixe o cronograma (.ics) para ver todas as datas planejadas no seu calendário pessoal.
      </p>

      {view === "mes" ? (
        <>
          <div className="flex items-center justify-between mb-3">
            <button type="button" onClick={() => setMonthCursor(new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() - 1, 1)))} className="tap-target p-2 rounded-lg hover:bg-surface-muted" aria-label="Mês anterior">
              <ChevronLeft size={18} aria-hidden />
            </button>
            <span className="text-sm font-semibold capitalize">{monthLabel(first)}</span>
            <button type="button" onClick={() => setMonthCursor(new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 1)))} className="tap-target p-2 rounded-lg hover:bg-surface-muted" aria-label="Próximo mês">
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAYS.map((w) => (
              <span key={w} className="text-center text-[10px] font-semibold text-foreground-muted uppercase py-1">{w}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((iso, idx) => {
              if (!iso) return <div key={`empty-${idx}`} />;
              const entry = byDate.get(iso);
              const isExamDay = iso === EXAM_DATE;
              const state = isExamDay ? "prova" : cellState(entry, iso);
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={!entry && !isExamDay}
                  onClick={() => entry && setSelectedDay(entry.day)}
                  className={`aspect-square rounded-lg border text-[11px] flex flex-col items-center justify-center gap-0.5 transition-colors ${
                    isExamDay ? "bg-danger text-white border-danger font-bold" : STATE_CLASS[state]
                  } ${entry ? "hover:opacity-80 cursor-pointer" : "cursor-default"}`}
                  title={isExamDay ? "Dia da prova" : entry?.title}
                >
                  <span className="font-semibold">{Number(iso.slice(8, 10))}</span>
                  {isExamDay && <span className="text-[8px] leading-none">PROVA</span>}
                  {entry && <span className="text-[8px] leading-none">D{entry.day}</span>}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-4 text-[10.5px] text-foreground-muted">
            <LegendDot cls="bg-success-soft border-success/30" label="Concluído" />
            <LegendDot cls="bg-brand-soft border-brand/40" label="Em andamento" />
            <LegendDot cls="bg-brand border-brand" label="Hoje" />
            <LegendDot cls="bg-warning-soft border-warning/30" label="Atrasado" />
            <LegendDot cls="bg-surface border-border" label="Futuro" />
            <LegendDot cls="bg-danger border-danger" label="Prova" />
          </div>
        </>
      ) : (
        <ul className="space-y-2">
          {entries.map((entry) => (
            <li key={entry.day}>
              <button type="button" onClick={() => setSelectedDay(entry.day)} className="w-full text-left card p-3.5 flex items-center gap-3 hover:shadow-md transition-shadow">
                <span className={`chip text-[10px] py-0.5 shrink-0 ${STATE_CLASS[cellState(entry, entry.scheduledDate)]}`}>Dia {entry.day}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-medium truncate">{entry.title}</p>
                  <p className="text-[11px] text-foreground-muted">{formatDateBR(entry.scheduledDate)} · {PHASE_LABEL[entry.phase]} · {entry.subjects.join(", ")}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/55 p-4 flex items-end sm:items-center sm:justify-center" role="dialog" aria-modal="true" onClick={() => setSelectedDay(null)}>
          <div className="w-full sm:max-w-md max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-surface p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="chip bg-surface-muted text-foreground-muted text-[10px]">Dia {selected.day} de {entries.length}</span>
              <button type="button" onClick={() => setSelectedDay(null)} className="text-xs text-foreground-muted hover:text-foreground">Fechar</button>
            </div>
            <h2 className="text-[17px] font-bold mb-1">{selected.title}</h2>
            <p className="text-xs text-foreground-muted mb-3">{formatDateBR(selected.scheduledDate)} · {PHASE_LABEL[selected.phase]} · {formatMinutes(selected.estimatedMinutesTotal)}</p>

            <div className="mb-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-foreground-muted mb-1">Assuntos</p>
              <ul className="text-sm space-y-0.5">
                {selected.subjects.map((s) => <li key={s}>• {s}</li>)}
              </ul>
            </div>

            {selected.syllabusCodes.length > 0 && (
              <div className="mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-foreground-muted mb-1">Códigos do edital</p>
                <div className="flex flex-wrap gap-1">
                  {selected.syllabusCodes.map((c) => <span key={c} className="chip bg-surface-muted text-[10px] py-0.5">{c}</span>)}
                </div>
              </div>
            )}

            <p className="text-xs text-foreground-muted mb-4">
              {selected.completedSteps} de {selected.totalSteps} etapas concluídas
              {selected.status === "nao_iniciado" && selected.day > firstIncompleteDay ? " · ainda não chegou a vez deste dia" : ""}
            </p>

            <Link href={`/meu-curso/dia/${selected.day}`} className="btn btn-primary w-full">
              {selected.status === "concluido"
                ? "Rever este dia"
                : selected.status === "em_andamento"
                  ? "Continuar este dia"
                  : selected.day <= firstIncompleteDay
                    ? "Começar este dia"
                    : "Estudar antecipadamente"}
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

function LegendDot({ cls, label }: { cls: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className={`inline-block h-2.5 w-2.5 rounded-sm border ${cls}`} />
      {label}
    </span>
  );
}

function DownloadOption({
  icon: Icon,
  label,
  description,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className="w-full flex items-start gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-surface-muted transition-colors"
    >
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-soft text-brand shrink-0 mt-0.5">
        <Icon size={15} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-medium">{label}</span>
        <span className="block text-[11px] text-foreground-muted leading-snug">{description}</span>
      </span>
    </button>
  );
}
