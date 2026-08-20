"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarCheck2, CalendarClock, ChevronRight, Clock, Play } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { MigrationBanner } from "@/components/app/MigrationBanner";
import { PHASE_LABEL, formatMinutes } from "@/lib/course/labels";
import { formatDateBR, todayInExamTimezone, daysBetween } from "@/lib/schedule/dates";
import { EXAM_DATE, LAST_STUDY_DATE, TOTAL_MISSIONS } from "@config/concurso";
import {
  getEnrollment,
  startEnrollment,
  getCalendar,
  getCourseDay,
  getCurrentDayNumber,
  getDayProgress,
  getDueReviewsToday,
} from "@/lib/course/service";
import type { CourseEnrollment, CourseDay, CourseDayProgress, ReviewSchedule } from "@/lib/models/schema";

export default function MeuCursoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [enrollment, setEnrollment] = useState<CourseEnrollment | null>(null);
  const [currentDay, setCurrentDay] = useState<CourseDay | null>(null);
  const [progress, setProgress] = useState<CourseDayProgress | null>(null);
  const [scheduledDate, setScheduledDate] = useState<string | null>(null);
  const [overloaded, setOverloaded] = useState(false);
  const [startDateInput, setStartDateInput] = useState(todayInExamTimezone());
  const [dueReviews, setDueReviews] = useState<ReviewSchedule[] | null>(null);

  async function load() {
    setLoading(true);
    const existing = await getEnrollment();
    if (!existing) {
      setEnrollment(null);
      setLoading(false);
      return;
    }
    const dayNumber = await getCurrentDayNumber();
    const day = getCourseDay(dayNumber);
    const dayProgress = await getDayProgress(existing.studentId, dayNumber);
    const calendar = getCalendar(existing);
    const due = await getDueReviewsToday(existing.studentId);
    setEnrollment(existing);
    setCurrentDay(day);
    setProgress(dayProgress);
    setScheduledDate(calendar.dateByDay[dayNumber]);
    setOverloaded(calendar.overloaded);
    setDueReviews(due);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleStart() {
    await startEnrollment(undefined, startDateInput);
    await load();
  }

  if (loading) {
    return (
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full">
        <p className="text-sm text-foreground-muted">Carregando…</p>
      </main>
    );
  }

  if (!enrollment) {
    return (
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-xl mx-auto w-full animate-fade-in">
        <PageHeader
          eyebrow="Meu Curso"
          title="Trilha guiada de aprovação"
          description="Uma trilha diária, fechada e sequencial, feita para o Edital nº 3/2026 da Transpetro — Nível Médio, ênfase Administração e Controle. Você não escolhe o que estudar — o curso te guia."
        />
        <div className="card p-5 space-y-4">
          <div>
            <label htmlFor="start-date" className="block text-xs font-medium mb-1.5">
              Quando você quer começar o Dia 1?
            </label>
            <input
              id="start-date"
              type="date"
              value={startDateInput}
              min={todayInExamTimezone()}
              max={LAST_STUDY_DATE}
              onChange={(e) => setStartDateInput(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm"
            />
          </div>
          <p className="text-xs text-foreground-muted">
            A prova é em {formatDateBR(EXAM_DATE)}. O último dia de
            estudo é {formatDateBR(LAST_STUDY_DATE)}.
          </p>
          <button
            type="button"
            onClick={handleStart}
            className="btn btn-primary w-full"
          >
            <Play size={16} aria-hidden />
            Começar o curso
          </button>
        </div>
      </main>
    );
  }

  if (!currentDay || !progress || !scheduledDate) return null;

  const totalSteps = currentDay.steps.length;
  const completedSteps = progress.completedStepIds.length;
  const isResuming = progress.status === "em_andamento";
  const allDone = progress.status === "concluido";
  const daysToExam = Math.max(0, daysBetween(todayInExamTimezone(), EXAM_DATE, false));

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <PageHeader
        eyebrow="Meu Curso"
        title={`Hoje, ${formatDateBR(todayInExamTimezone())}`}
        description={undefined}
      />

      <MigrationBanner />

      <div className="card p-3.5 mb-4 flex items-center justify-between gap-3 bg-brand-soft/30 border-brand/30">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-brand shrink-0" aria-hidden />
          <p className="text-[12.5px]">
            <strong>{daysToExam} dia(s)</strong> até a prova ({formatDateBR(EXAM_DATE)})
          </p>
        </div>
        <Link href="/meu-curso/calendario" className="text-[11px] text-brand hover:underline shrink-0">
          Ver calendário
        </Link>
      </div>

      {dueReviews && dueReviews.length > 0 && (
        <Link href="/meu-curso/revisoes" className="card p-3.5 mb-4 flex items-center gap-2 border-warning/30 bg-warning-soft/40 hover:shadow-md transition-shadow">
          <CalendarClock size={16} className="text-warning shrink-0" aria-hidden />
          <p className="text-[12.5px]">
            <strong>{dueReviews.length} revisão(ões)</strong> vencida(s) ou para hoje — toque para abrir.
          </p>
        </Link>
      )}

      {overloaded && (
        <div className="card p-4 mb-4 border-warning bg-warning-soft text-[13px]">
          O tempo até {formatDateBR(LAST_STUDY_DATE)} ficou apertado para os {TOTAL_MISSIONS} dias do plano. Alguns dias
          finais vão precisar de mais dedicação no mesmo dia real — o conteúdo obrigatório não foi reduzido.
        </div>
      )}

      <div className="card p-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="chip bg-brand-soft text-brand">Dia {currentDay.day} de {TOTAL_MISSIONS}</span>
          <span className="chip bg-surface-muted text-foreground-muted">{PHASE_LABEL[currentDay.phase]}</span>
        </div>
        <h2 className="text-[19px] font-bold tracking-tight mb-1">{currentDay.title}</h2>
        <p className="text-sm text-foreground-muted mb-3">Agendado para {formatDateBR(scheduledDate)}</p>

        <div className="flex items-center gap-4 text-xs text-foreground-muted mb-4">
          <span className="flex items-center gap-1">
            <Clock size={13} aria-hidden />
            {formatMinutes(currentDay.estimatedMinutesTotal)}
          </span>
          <span className="flex items-center gap-1">
            <CalendarCheck2 size={13} aria-hidden />
            Progresso: {completedSteps} de {totalSteps} etapas
          </span>
        </div>

        <div className="progress-track mb-4">
          <div
            className="progress-fill"
            style={{ width: `${totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0}%` }}
          />
        </div>

        <button
          type="button"
          onClick={() => router.push(`/meu-curso/dia/${currentDay.day}`)}
          disabled={allDone}
          className="btn btn-primary w-full"
        >
          <Play size={16} aria-hidden />
          {allDone ? "Dia concluído" : isResuming ? "Retomar de onde parei" : "Começar o dia"}
          {!allDone && <ChevronRight size={16} aria-hidden />}
        </button>
      </div>

      <div className="card p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">Conteúdos de hoje</p>
        <ul className="space-y-1 mb-3">
          {currentDay.subjects.map((s) => (
            <li key={s} className="text-sm">
              • {s}
            </li>
          ))}
        </ul>
        {currentDay.syllabusCodes.length > 0 && (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-1.5">Códigos do edital</p>
            <div className="flex flex-wrap gap-1">
              {currentDay.syllabusCodes.map((c) => (
                <span key={c} className="chip bg-surface-muted text-[10px] py-0.5">{c}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
