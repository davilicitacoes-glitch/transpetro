"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarCheck2,
  CalendarClock,
  ChevronRight,
  Clock,
  ClipboardList,
  Database,
  Flame,
  Info,
  ListChecks,
  Minus,
  NotebookPen,
  Play,
  RotateCcw,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { MigrationBanner } from "@/components/app/MigrationBanner";
import { PHASE_LABEL, formatMinutes } from "@/lib/course/labels";
import { formatDateBR, todayInExamTimezone, daysBetween } from "@/lib/schedule/dates";
import { computeStudyStreak } from "@/lib/course/streak";
import { computeScoreEstimate, type ScoreEstimate } from "@/lib/pedagogy/scoreEstimate";
import { recordScoreEstimateSnapshot, getScoreEstimateTrend, type ScoreEstimateTrend } from "@/lib/pedagogy/scoreEstimateHistory";
import { EXAM_DATE, LAST_STUDY_DATE, TOTAL_MISSIONS } from "@config/concurso";
import { NOME_METODO } from "@config/metodo";
import {
  getEnrollment,
  startEnrollment,
  getCalendar,
  getCourseDay,
  getCourseOverview,
  getCurrentDayNumber,
  getDayProgress,
  getDueReviewsToday,
} from "@/lib/course/service";
import type { CourseEnrollment, CourseDay, CourseDayProgress, ReviewSchedule } from "@/lib/models/schema";

const QUICK_LINKS = [
  { href: "/questoes", label: "Questões", icon: ListChecks },
  { href: "/simulados", label: "Simulados", icon: ClipboardList },
  { href: "/revisoes", label: "Revisões", icon: RotateCcw },
  { href: "/erros", label: "Caderno de Erros", icon: NotebookPen },
  { href: "/desempenho", label: "Desempenho", icon: TrendingUp },
  { href: "/meu-curso/calendario", label: "Calendário", icon: CalendarCheck2 },
  { href: "/cobertura-real", label: "Cobertura Real", icon: Database },
];

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
  const [daysCompleted, setDaysCompleted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [scoreEstimate, setScoreEstimate] = useState<ScoreEstimate | null>(null);
  const [scoreTrend, setScoreTrend] = useState<ScoreEstimateTrend | null>(null);

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
    const overview = await getCourseOverview(existing.studentId, existing);
    const estimate = await computeScoreEstimate(existing.studentId);
    // Nota estimada é o primeiro número que o aluno vê ao abrir o app (missão "Método Vetor",
    // seção 2) — grava um snapshot real (no máximo 1/dia) toda vez que a tela inicial calcula a
    // nota, o que alimenta a tendência de 7/30 dias sem precisar de uma tela dedicada só pra isso.
    await recordScoreEstimateSnapshot(estimate, "regular", existing.studentId);
    const trend = await getScoreEstimateTrend(existing.studentId);
    setEnrollment(existing);
    setCurrentDay(day);
    setProgress(dayProgress);
    setScheduledDate(calendar.dateByDay[dayNumber]);
    setOverloaded(calendar.overloaded);
    setDueReviews(due);
    setDaysCompleted(overview.filter((d) => d.status === "concluido").length);
    setStreak(computeStudyStreak(overview, todayInExamTimezone()));
    setScoreEstimate(estimate);
    setScoreTrend(trend);
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
          eyebrow="Bem-vindo(a)"
          title="Sua trilha guiada de aprovação"
          description={`Uma trilha diária, fechada e sequencial, feita para o Edital nº 3/2026 da Transpetro — Nível Médio, ênfase Administração e Controle. ${TOTAL_MISSIONS} dias, cada um com aula em slide narrado, videoaula, questões reais e revisão. Você não escolhe o que estudar — o curso te guia.`}
        />
        <ul className="grid sm:grid-cols-3 gap-2.5 mb-5">
          {[
            { label: "Aula + videoaula por dia", icon: Play },
            { label: "Questões reais de banca", icon: CalendarCheck2 },
            { label: "Revisão espaçada automática", icon: CalendarClock },
          ].map((item) => (
            <li key={item.label} className="card p-3 flex flex-col items-center text-center gap-1.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-soft text-brand">
                <item.icon size={15} aria-hidden />
              </span>
              <span className="text-[11.5px] font-medium leading-tight">{item.label}</span>
            </li>
          ))}
        </ul>
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
          <Link
            href={`/meu-curso/diagnostico-inicial?startDate=${startDateInput}`}
            className="btn btn-primary w-full"
          >
            <Play size={16} aria-hidden />
            Fazer diagnóstico rápido e começar
          </Link>
          <button type="button" onClick={handleStart} className="w-full text-center text-[11.5px] text-foreground-muted hover:text-foreground underline">
            Pular o diagnóstico e começar direto
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

      {/* Nota estimada — primeiro número que o aluno vê ao abrir o app (missão "Método Vetor",
          seção 2). Antes deste card vinha depois do anel de progresso; movido pra cá de propósito. */}
      {scoreEstimate && (
        <div className="card p-4 mb-4">
          <p className="flex items-center justify-between gap-2 mb-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
              <Target size={13} aria-hidden /> {NOME_METODO} · sua nota estimada
            </span>
            <Link href="/meu-curso/como-calculamos" className="flex items-center gap-1 text-[11px] text-brand hover:underline shrink-0">
              <Info size={11} aria-hidden /> Como calculamos
            </Link>
          </p>
          {scoreEstimate.hasEnoughData ? (
            <>
              <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                <span className="text-[34px] font-display font-bold text-gradient-brand leading-none">{Math.round(scoreEstimate.extrapolatedPoints)}</span>
                <span className="text-sm text-foreground-muted">/ {scoreEstimate.totalPoints} pts (estimativa)</span>
                <TrendBadge trend={scoreTrend} current={scoreEstimate.extrapolatedPoints} />
              </div>
              <p className="text-[11px] text-foreground-muted mb-3">
                Extrapolação a partir de {scoreEstimate.pointsWithData} de {scoreEstimate.totalPoints} pts da prova já com dado real (
                {scoreEstimate.perCode.filter((c) => c.hasEnoughData).length} código(s) com tentativas suficientes) — não é uma promessa, ajusta
                conforme você responde mais questões.
              </p>
              {scoreEstimate.topPriority[0] && (
                <p className="text-[13px] border-t border-border pt-3">
                  <strong>Maior impacto hoje:</strong> estudar{" "}
                  <Link href={`/curso/${scoreEstimate.topPriority[0].topicSlug}`} className="text-brand font-medium hover:underline">
                    {scoreEstimate.topPriority[0].syllabusCode} — {scoreEstimate.topPriority[0].topicName}
                  </Link>{" "}
                  tem mais impacto na sua nota estimada agora do que revisar um tema que você já domina.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-foreground-muted">
              Ainda coletando dados — responda algumas questões em <Link href="/questoes" className="text-brand hover:underline">Questões</Link> ou
              num simulado pra começarmos a estimar sua nota e priorizar o que estudar.
            </p>
          )}
        </div>
      )}

      <div className="card p-4 mb-4 flex items-center gap-4">
        <ProgressRing percent={TOTAL_MISSIONS > 0 ? (daysCompleted / TOTAL_MISSIONS) * 100 : 0} size={72} strokeWidth={7}>
          <span className="text-[15px] font-display font-bold">{Math.round((daysCompleted / Math.max(1, TOTAL_MISSIONS)) * 100)}%</span>
        </ProgressRing>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-display font-semibold mb-1.5">
            {daysCompleted} de {TOTAL_MISSIONS} dias concluídos
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1 text-[11.5px] text-foreground-muted">
              <Clock size={12} aria-hidden />
              <strong className="text-foreground">{daysToExam}</strong> dia(s) até a prova
            </span>
            {streak > 0 && (
              <span className="chip bg-warning-soft text-warning">
                <Flame size={12} aria-hidden />
                {streak} dia(s) seguidos
              </span>
            )}
          </div>
        </div>
        <Link href="/meu-curso/calendario" className="text-[11px] text-brand hover:underline shrink-0 self-start mt-1">
          Calendário
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

      <div className="card-raised p-5 mb-4 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(480px 240px at 100% 0%, color-mix(in srgb, var(--brand) 10%, transparent), transparent 65%)" }}
          aria-hidden
        />
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="chip bg-brand-soft text-brand">Dia {currentDay.day} de {TOTAL_MISSIONS}</span>
            <span className="chip bg-surface-muted text-foreground-muted">{PHASE_LABEL[currentDay.phase]}</span>
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand mb-1">
            {allDone ? "Dia concluído" : isResuming ? "Continue de onde parou" : "Seu dia de hoje"}
          </p>
          <h2 className="text-[21px] font-display font-bold tracking-tight leading-snug mb-1">{currentDay.title}</h2>
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

      <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted mt-6 mb-2.5">Acesso rápido</p>
      <div className="grid grid-cols-3 gap-2.5">
        {QUICK_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="card p-3 flex flex-col items-center justify-center gap-1.5 text-center hover:shadow-md hover:border-brand/30 transition-shadow"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-soft text-brand">
              <item.icon size={16} aria-hidden />
            </span>
            <span className="text-[11px] font-medium leading-tight">{item.label}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}

/** Contexto de tendência da nota estimada (missão "Método Vetor", seção 2): compara com 7 e 30
 * dias atrás quando existe snapshot real dessa distância — nunca inventa "subindo/estável/caindo"
 * sem um ponto de comparação real gravado (ver src/lib/pedagogy/scoreEstimateHistory.ts). */
function TrendBadge({ trend, current }: { trend: ScoreEstimateTrend | null; current: number }) {
  if (!trend || (trend.sevenDaysAgo === null && trend.thirtyDaysAgo === null)) return null;
  const reference = trend.sevenDaysAgo ?? trend.thirtyDaysAgo!;
  const label = trend.sevenDaysAgo !== null ? "7 dias" : "30 dias";
  const delta = Math.round((current - reference) * 10) / 10;
  const Icon = delta > 0.5 ? TrendingUp : delta < -0.5 ? TrendingDown : Minus;
  const className = delta > 0.5 ? "text-success" : delta < -0.5 ? "text-danger" : "text-foreground-muted";
  return (
    <span className={`flex items-center gap-1 text-[11px] font-medium ${className}`} title={`Nota estimada há ${label}: ${reference} pts`}>
      <Icon size={12} aria-hidden />
      {delta > 0 ? "+" : ""}
      {delta} em {label}
    </span>
  );
}
