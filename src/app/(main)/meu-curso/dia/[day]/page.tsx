"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { use as usePromise } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Briefcase, CheckCircle2, ExternalLink, List, LogOut, PlayCircle, Sparkles } from "lucide-react";
import { findEpisodesForCodes } from "@/lib/games/catalog";
import { ALL_LESSONS } from "@/content/lessons";
import { ALL_QUESTIONS } from "@/content/questions";
import { VIDEO_LESSONS, type VideoLesson } from "@/content/videos";
import { ESSAY_PROMPTS } from "@/content/essays/prompts";
import { YouTubePlayer } from "@/components/video/YouTubePlayer";
import { SlidePlayer } from "@/components/video/SlidePlayer";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { StatTile } from "@/components/ui/StatTile";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { buildSlides } from "@/lib/slides/buildSlides";
import { STEP_TYPE_LABEL, formatMinutes } from "@/lib/course/labels";
import { DEFAULT_STUDENT_ID, type CourseDay, type CourseDayProgress, type CourseStep, type Question } from "@/lib/models/schema";
import {
  getCourseDay,
  getDayProgress,
  startCourseDay,
  navigateToCourseStep,
  completeStep,
  answerCourseQuestion,
  completeCourseDay,
  getDaySummary,
  getDueReviewsToday,
  hasEssaySubmission,
  hasFinishedMockExamToday,
  setComplementaryReviewChoice,
  type CourseDaySummary,
} from "@/lib/course/service";
import { getComplementaryVideosForDay, getComplementaryQuestionsForDay } from "@/lib/course/complementary";
import type { ReviewSchedule } from "@/lib/models/schema";
import { TOTAL_MISSIONS } from "@config/concurso";

const lessonBySlug = new Map(ALL_LESSONS.map((l) => [l.slug, l]));
const questionById = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));
const videoById = new Map(VIDEO_LESSONS.map((v) => [v.id, v]));
const essayById = new Map(ESSAY_PROMPTS.map((e) => [e.id, e]));

export default function MeuCursoDiaPage({ params }: { params: Promise<{ day: string }> }) {
  const { day: dayParam } = usePromise(params);
  const dayNumber = Number(dayParam);
  const router = useRouter();

  const [planDay, setPlanDay] = useState<CourseDay | null>(null);
  const [progress, setProgress] = useState<CourseDayProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<CourseDaySummary | null>(null);
  const [finishError, setFinishError] = useState<string | null>(null);
  const [indexOpen, setIndexOpen] = useState(false);
  const [navigating, setNavigating] = useState(false);

  const load = useCallback(async () => {
    if (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > TOTAL_MISSIONS) return;
    setLoading(true);
    const d = getCourseDay(dayNumber);
    const started = await startCourseDay(DEFAULT_STUDENT_ID, dayNumber);
    setPlanDay(d);
    setProgress(started);
    window.history.replaceState({ ...window.history.state, transpetroCourse: true, courseDay: dayNumber, courseStepId: started.currentStepId }, "");
    setLoading(false);
  }, [dayNumber]);

  useEffect(() => {
    load();
  }, [load]);

  async function refreshProgress() {
    const p = await getDayProgress(DEFAULT_STUDENT_ID, dayNumber);
    setProgress((previous) => {
      if (previous?.currentStepId !== p.currentStepId) window.history.pushState({ transpetroCourse: true, courseDay: dayNumber, courseStepId: p.currentStepId }, "");
      return p;
    });
  }

  async function handleNavigate(stepId: string, pushHistory = true) {
    if (navigating) return;
    setNavigating(true);
    try {
      const next = await navigateToCourseStep(DEFAULT_STUDENT_ID, dayNumber, stepId);
      setProgress(next);
      if (pushHistory) window.history.pushState({ transpetroCourse: true, courseDay: dayNumber, courseStepId: stepId }, "");
      setIndexOpen(false);
    } finally { setNavigating(false); }
  }

  async function handleCompleteStep(stepId: string) {
    if (navigating) return;
    setNavigating(true);
    try {
      const next = await completeStep(DEFAULT_STUDENT_ID, dayNumber, stepId);
      setProgress(next);
      window.history.pushState({ transpetroCourse: true, courseDay: dayNumber, courseStepId: next.currentStepId }, "");
    } finally { setNavigating(false); }
  }

  async function handleFinishDay() {
    setFinishError(null);
    try {
      await completeCourseDay(DEFAULT_STUDENT_ID, dayNumber);
      router.push("/meu-curso");
    } catch (err) {
      setFinishError(err instanceof Error ? err.message : "Não foi possível concluir o dia.");
    }
  }

  useEffect(() => {
    function handlePopState(event: PopStateEvent) {
      const state = event.state as { transpetroCourse?: boolean; courseDay?: number; courseStepId?: string | null } | null;
      if (state?.transpetroCourse && state.courseDay === dayNumber && state.courseStepId) void handleNavigate(state.courseStepId, false);
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [dayNumber]);

  useEffect(() => {
    if (progress?.status === "concluido" || (progress && progress.currentStepId === null)) {
      getDaySummary(DEFAULT_STUDENT_ID, dayNumber).then(setSummary);
    }
  }, [progress, dayNumber]);

  if (loading || !planDay || !progress) return <PageSkeleton cards={2} />;

  const currentStep = planDay.steps.find((s) => s.id === progress.currentStepId) ?? null;
  const currentIndex = currentStep ? planDay.steps.findIndex((s) => s.id === currentStep.id) : planDay.steps.length;

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in pb-24">
      <div className="flex items-center justify-between gap-3 mb-4">
        <Link href="/meu-curso" className="tap-target gap-1.5 text-xs text-foreground-muted hover:text-foreground"><LogOut size={14} aria-hidden /> Sair da aula</Link>
        <span className="text-xs text-foreground-muted text-right">Meu Curso &gt; Dia {dayNumber} &gt; {currentStep ? `Etapa ${currentIndex + 1} de ${planDay.steps.length}` : "Fechamento"}</span>
      </div>

      <h1 className="text-[19px] font-bold tracking-tight mb-1">
        Dia {planDay.day} — {planDay.title}
      </h1>
      <p className="text-xs text-foreground-muted mb-5">{formatMinutes(planDay.estimatedMinutesTotal)} estimados no total</p>

      {/* trilha de etapas — segmentos mais grossos, etapa atual com destaque, nome da etapa
          atual como legenda (antes só dava pra ver isso passando o mouse no title do segmento) */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 mb-2 overflow-x-auto pb-1">
          {planDay.steps.map((s) => {
            const done = progress.completedStepIds.includes(s.id);
            const active = s.id === currentStep?.id;
            return (
              <span
                key={s.id}
                title={s.title}
                className={`h-2 flex-1 min-w-[10px] rounded-full transition-all ${
                  done
                    ? "bg-gradient-to-r from-brand to-accent"
                    : active
                      ? "bg-brand/50 ring-2 ring-brand/25 scale-y-125"
                      : "bg-surface-muted"
                }`}
              />
            );
          })}
        </div>
        {currentStep && (
          <p className="text-[11px] font-semibold text-brand">{STEP_TYPE_LABEL[currentStep.type] ?? currentStep.type}</p>
        )}
      </div>

      {currentStep ? (
        <StepCard key={currentStep.id} step={currentStep} day={dayNumber} onCompleted={() => handleCompleteStep(currentStep.id)} onAnswered={refreshProgress} />
      ) : (
        <FechamentoCard
          planDay={planDay}
          dayNumber={dayNumber}
          progress={progress}
          summary={summary}
          error={finishError}
          onFinish={handleFinishDay}
          onBack={() => router.push("/meu-curso")}
          onChoiceMade={refreshProgress}
        />
      )}
      {currentStep && (
        <nav aria-label="Controles da aula" className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur">
          <div className="mx-auto flex max-w-2xl items-center gap-2">
            <button type="button" onClick={() => currentIndex > 0 && handleNavigate(planDay.steps[currentIndex - 1].id)} disabled={currentIndex <= 0 || navigating} className="btn btn-secondary min-h-11 px-3"><ArrowLeft size={17} aria-hidden /> Voltar</button>
            <button type="button" onClick={() => setIndexOpen(true)} className="btn btn-secondary min-h-11 px-3" aria-label="Abrir índice das etapas"><List size={17} aria-hidden /> Índice</button>
            <StepActions step={currentStep} day={dayNumber} onCompleted={() => handleCompleteStep(currentStep.id)} disabled={navigating} />
          </div>
        </nav>
      )}
      {indexOpen && (
        <div className="fixed inset-0 z-50 bg-black/55 p-4" role="dialog" aria-modal="true" aria-labelledby="course-index-title">
          <div className="mx-auto mt-[8vh] max-h-[80vh] max-w-lg overflow-y-auto rounded-2xl bg-surface p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between gap-3"><h2 id="course-index-title" className="text-lg font-bold">Índice do Dia {dayNumber}</h2><button type="button" onClick={() => setIndexOpen(false)} className="btn btn-secondary">Fechar</button></div>
            <ol className="space-y-2">{planDay.steps.map((courseStep, index) => { const done = progress.completedStepIds.includes(courseStep.id); return <li key={courseStep.id}><button type="button" onClick={() => handleNavigate(courseStep.id)} className={`w-full rounded-xl border p-3 text-left ${courseStep.id === progress.currentStepId ? "border-brand bg-brand-soft" : "border-border"}`}><span className="block text-xs text-foreground-muted">Etapa {index + 1} de {planDay.steps.length}{done ? " · concluída — revisão" : ""}</span><span className="block text-sm font-medium">{courseStep.title}</span></button></li>; })}</ol>
          </div>
        </div>
      )}
    </main>
  );
}

function StepCard({
  step,
  day,
  onCompleted,
  onAnswered,
}: {
  step: CourseStep;
  day: number;
  onCompleted: () => void;
  onAnswered: () => void;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="chip bg-brand-soft text-brand">{STEP_TYPE_LABEL[step.type] ?? step.type}</span>
        <span className="text-xs text-foreground-muted">{formatMinutes(step.estimatedMinutes)}</span>
      </div>

      <StepBody step={step} day={day} onAnswered={onAnswered} onAutoComplete={onCompleted} />


    </div>
  );
}

function StepBody({ step, day, onAnswered, onAutoComplete }: { step: CourseStep; day: number; onAnswered: () => void; onAutoComplete: () => void }) {
  switch (step.type) {
    case "abertura":
      return (
        <div>
          <h2 className="text-[17px] font-semibold mb-2">Bem-vindo ao Dia {day}</h2>
          <p className="text-sm text-foreground-muted">
            Confira os conteúdos do dia na etapa "Concluir e avançar" abaixo. Não há nada para preencher aqui.
          </p>
        </div>
      );
    case "revisao_programada":
      return <RevisaoStep />;
    case "aula_textual":
    case "exemplo_guiado":
      return <LessonStep step={step} />;
    case "videoaula_obrigatoria":
      return <VideoStep step={step} />;
    case "checagem_compreensao":
    case "questoes":
      return <QuestoesStep step={step} day={day} onAnswered={onAnswered} />;
    case "pratica_redacao":
      return <RedacaoStep step={step} />;
    case "simulado_parcial":
    case "simulado_completo":
      return (
        <div>
          <h2 className="text-[17px] font-semibold mb-2">{step.title}</h2>
          <p className="text-sm text-foreground-muted mb-3">Abra o simulado, conclua e corrija antes de avançar.</p>
          <Link href="/simulados" className="tap-target gap-1.5 text-sm text-brand font-medium hover:underline">
            Abrir Simulados <ExternalLink size={13} aria-hidden />
          </Link>
        </div>
      );
    case "revisao_vespera":
      return (
        <div>
          <h2 className="text-[17px] font-semibold mb-2">{step.title}</h2>
          <p className="text-sm text-foreground-muted mb-3">Abra a revisão interativa. Suas marcações, respostas, erros e revisões são salvos para retomada.</p>
          <Link href="/meu-curso/revisao-vespera" className="tap-target gap-1.5 text-sm text-brand font-medium hover:underline">
            Abrir Revisão de Véspera <ExternalLink size={13} aria-hidden />
          </Link>
        </div>
      );
    case "analise_erros":
      return (
        <div>
          <h2 className="text-[17px] font-semibold mb-2">{step.title}</h2>
          <p className="text-sm text-foreground-muted mb-3">
            Revise seu caderno de erros com calma — é o material mais valioso para a véspera da prova.
          </p>
          <Link href="/erros" className="tap-target gap-1.5 text-sm text-brand font-medium hover:underline">
            Abrir Caderno de Erros <ExternalLink size={13} aria-hidden />
          </Link>
        </div>
      );
    case "fechamento_dia":
      return (
        <div>
          <h2 className="text-[17px] font-semibold mb-2">Fechamento do dia</h2>
          <p className="text-sm text-foreground-muted">Concluir esta etapa mostra o resumo real do seu dia.</p>
        </div>
      );
    default:
      return null;
  }
}

function RevisaoStep() {
  const [reviews, setReviews] = useState<ReviewSchedule[] | null>(null);
  useEffect(() => {
    getDueReviewsToday(DEFAULT_STUDENT_ID).then(setReviews);
  }, []);
  if (reviews === null) return <p className="text-sm text-foreground-muted">Verificando revisões devidas…</p>;
  if (reviews.length === 0) {
    return (
      <div>
        <h2 className="text-[17px] font-semibold mb-2">Revisão espaçada</h2>
        <p className="text-sm text-foreground-muted">Nenhuma revisão devida hoje. Pode avançar.</p>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-[17px] font-semibold mb-2">Revisão espaçada — {reviews.length} pendente(s)</h2>
      <p className="text-sm text-foreground-muted mb-3">
        Itens que voltaram para revisão hoje, calculados a partir dos seus erros e acertos reais.
      </p>
      <Link href="/revisoes" className="tap-target gap-1.5 text-sm text-brand font-medium hover:underline">
        Abrir fila de revisões <ExternalLink size={13} aria-hidden />
      </Link>
    </div>
  );
}

function LessonStep({ step }: { step: CourseStep }) {
  const lesson = step.contentRef?.kind === "lesson" ? lessonBySlug.get(step.contentRef.id) : undefined;
  if (!lesson) return <p className="text-sm text-danger">Aula não encontrada ({step.contentRef?.id}).</p>;
  const slides = useMemo(() => buildSlides(lesson), [lesson]);
  return (
    <div>
      <h2 className="text-[21px] font-display font-bold tracking-tight leading-snug mb-2">{lesson.title}</h2>
      <p className="text-[13.5px] text-foreground-muted leading-relaxed mb-5 pl-3 border-l-2 border-brand/30">{lesson.learningObjective}</p>

      <div className="mb-5">
        <SlidePlayer slides={slides} title={lesson.title} />
      </div>

      <Link href={`/curso/${lesson.slug}`} className="tap-target gap-1.5 text-xs text-brand hover:underline mb-4 inline-flex">
        Ver aula completa em texto (com flashcards e mini-quiz) <ExternalLink size={12} aria-hidden />
      </Link>

      {lesson.mustMemorize.length > 0 && (
        <div className="rounded-lg bg-surface-muted p-3.5 mb-4 border-l-4 border-accent">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">
            <Sparkles size={13} aria-hidden /> Memorize
          </p>
          <ul className="text-[13px] space-y-1.5 list-disc pl-4">
            {lesson.mustMemorize.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}

      {step.extraContentRefs.filter((ref) => ref.kind === "lesson").length > 0 && (
        <div className="rounded-lg border border-border p-3.5 mb-4">
          <p className="text-xs font-semibold mb-2">Aulas complementares integradas</p>
          <ul className="space-y-2">
            {step.extraContentRefs.filter((ref) => ref.kind === "lesson").map((ref) => {
              const extra = lessonBySlug.get(ref.id);
              return extra ? <li key={ref.id}><Link href={`/curso/${extra.slug}`} className="text-xs text-brand hover:underline">{extra.title}</Link></li> : null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function VideoStep({ step }: { step: CourseStep }) {
  const video = step.contentRef?.kind === "video" ? videoById.get(step.contentRef.id) : undefined;
  const [watched, setWatched] = useState(false);
  const [percent, setPercent] = useState(0);
  if (!video) return <p className="text-sm text-danger">Vídeo não encontrado.</p>;
  return (
    <div>
      <h2 className="text-[17px] font-semibold mb-1">{video.title}</h2>
      <p className="text-xs text-foreground-muted mb-3">{video.channel}</p>
      <YouTubePlayer
        youtubeId={video.youtubeId}
        title={video.title}
        channel={video.channel}
        onProgress={setPercent}
        onCompleted={() => setWatched(true)}
      />
      {percent > 0 && (
        <p className="text-[11px] text-foreground-muted mt-2 mb-4">
          {watched ? "✓ Vídeo assistido — pode concluir e avançar." : `${percent}% assistido`}
        </p>
      )}
    </div>
  );
}

function QuestoesStep({ step, day, onAnswered }: { step: CourseStep; day: number; onAnswered: () => void }) {
  const allRefs = [step.contentRef, ...step.extraContentRefs].filter((r): r is NonNullable<typeof r> => !!r && r.kind === "question");
  return (
    <div>
      <h2 className="text-[17px] font-semibold mb-3">{step.title}</h2>
      <div className="space-y-4">
        {allRefs.map((ref) => (
          <QuestionBlock key={ref.id} questionId={ref.id} day={day} stepId={step.id} onAnswered={onAnswered} />
        ))}
      </div>
    </div>
  );
}

function QuestionBlock({ questionId, day, stepId, onAnswered }: { questionId: string; day: number; stepId: string; onAnswered: () => void }) {
  const question = questionById.get(questionId);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [answered, setAnswered] = useState(false);
  if (!question) return <p className="text-sm text-danger">Questão não encontrada ({questionId}).</p>;

  async function answer(key: string) {
    if (answered || !question) return;
    setSelected(key);
    setAnswered(true);
    const correct = question.options.find((o) => o.isCorrect);
    await answerCourseQuestion({
      day,
      stepId,
      questionId,
      selectedKey: key as "A" | "B" | "C" | "D" | "E",
      correctKey: correct?.key,
      isCorrect: key === correct?.key,
    });
    onAnswered();
  }

  // Mesmo componente central usado em /questoes e /simulados (QuestionCard) — garante que a
  // explicação de erro universal (alternativa certa + por que a marcada está errada + pegadinha,
  // quando bate) apareça igual em qualquer lugar do app, sem lógica duplicada por tela.
  return <QuestionCard question={question} selected={selected} onSelect={answer} revealed={answered} showLessonLink={false} />;
}

function RedacaoStep({ step }: { step: CourseStep }) {
  const prompt = step.contentRef?.kind === "essay_prompt" ? essayById.get(step.contentRef.id) : undefined;
  const [submitted, setSubmitted] = useState<boolean | null>(null);
  useEffect(() => {
    if (prompt) hasEssaySubmission(DEFAULT_STUDENT_ID, prompt.id).then(setSubmitted);
  }, [prompt]);
  if (!prompt) return <p className="text-sm text-danger">Proposta de redação não encontrada.</p>;
  return (
    <div>
      <h2 className="text-[17px] font-semibold mb-1">{prompt.title}</h2>
      <p className="text-sm text-foreground-muted mb-3">
        Produção cronometrada completa — escreva do zero, nas condições reais de prova (20 a 30 linhas manuscritas).
      </p>
      <Link
        href="/redacao"
        className="tap-target gap-1.5 text-sm text-brand font-medium hover:underline mb-2"
      >
        Abrir editor de redação <ExternalLink size={13} aria-hidden />
      </Link>
      <p className="text-xs text-foreground-muted mt-2">
        {submitted === null ? "Verificando…" : submitted ? "✓ Uma versão já foi salva." : "Ainda sem versão salva."}
      </p>
    </div>
  );
}

function StepActions({ step, day, onCompleted, disabled = false }: { step: CourseStep; day: number; onCompleted: () => void; disabled?: boolean }) {
  const [ready, setReady] = useState(step.type !== "pratica_redacao" && step.type !== "simulado_parcial" && step.type !== "simulado_completo");

  useEffect(() => {
    let cancelled = false;
    async function check() {
      if (step.type === "pratica_redacao" && step.contentRef?.kind === "essay_prompt") {
        const ok = await hasEssaySubmission(DEFAULT_STUDENT_ID, step.contentRef.id);
        if (!cancelled) setReady(ok);
      } else if (step.type === "simulado_parcial" || step.type === "simulado_completo") {
        const ok = await hasFinishedMockExamToday(DEFAULT_STUDENT_ID);
        if (!cancelled) setReady(ok);
      }
    }
    check();
    const interval = setInterval(check, 4000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [step]);

  // etapas de questão se auto-completam quando todas as questões forem respondidas — sem botão manual aqui.
  if (step.type === "checagem_compreensao" || step.type === "questoes") return null;

  return (
    <button
      type="button"
      onClick={onCompleted}
      disabled={!ready || disabled}
      className="btn btn-primary min-h-11 flex-1"
    >
      Concluir e avançar
      <ArrowRight size={16} aria-hidden />
    </button>
  );
}

function FechamentoCard({
  planDay,
  dayNumber,
  progress,
  summary,
  error,
  onFinish,
  onBack,
  onChoiceMade,
}: {
  planDay: CourseDay;
  dayNumber: number;
  progress: CourseDayProgress;
  summary: CourseDaySummary | null;
  error: string | null;
  onFinish: () => void;
  onBack: () => void;
  onChoiceMade: () => void;
}) {
  const videos = getComplementaryVideosForDay(planDay);
  const questions = getComplementaryQuestionsForDay(planDay);
  const hasComplementary = videos.length > 0 || questions.length > 0;
  const choice = progress.complementaryReviewChoice;
  // Convite pro jogo "Um Dia no Escritório" (missão, seção 1) — só aparece quando um dos códigos
  // do dia realmente tem um episódio pronto no motor de jogos; nunca oferece um jogo genérico sem
  // relação real com o que o aluno acabou de estudar. Ignorável — a jornada normal segue igual.
  const gameEpisodes = findEpisodesForCodes(planDay.syllabusCodes);

  async function handleChoice(next: "feito" | "adiado") {
    await setComplementaryReviewChoice(DEFAULT_STUDENT_ID, dayNumber, next);
    onChoiceMade();
  }

  return (
    <div className="space-y-4">
      <div className="card-raised p-6 text-center">
        <div className="mx-auto mb-3 flex items-center justify-center w-16 h-16 rounded-full bg-brand-soft text-brand">
          <CheckCircle2 size={30} aria-hidden />
        </div>
        <p className="text-[22px] font-display font-bold text-gradient-brand mb-1">Dia {dayNumber} concluído!</p>
        <p className="text-[13px] text-foreground-muted mb-5">
          Mais um passo rumo à aprovação — o que você estudou hoje já está registrado.
        </p>

        {summary ? (
          <div className="grid grid-cols-3 gap-2 mb-5">
            <StatTile value={`${summary.completedSteps}/${summary.totalSteps}`} label="etapas" />
            <StatTile value={`${summary.questionsCorrect}/${summary.questionsAnswered}`} label="acertos" accent="success" />
            <StatTile value={String(summary.reviewsScheduledDuringSession)} label="revisões" accent="accent" />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 mb-5" aria-busy="true">
            <div className="skeleton h-[62px]" />
            <div className="skeleton h-[62px]" />
            <div className="skeleton h-[62px]" />
          </div>
        )}
        {error && <p className="text-sm text-danger mb-3">{error}</p>}
        <div className="flex gap-2">
          <button type="button" onClick={onBack} className="btn btn-secondary flex-1">
            Voltar
          </button>
          <button type="button" onClick={onFinish} className="btn btn-primary flex-1">
            Concluir o dia
          </button>
        </div>
      </div>

      {gameEpisodes.length > 0 && (
        <Link
          href={`/laboratorio/jogos/um-dia-no-escritorio/${gameEpisodes[0].id}`}
          className="card p-4 flex items-start gap-3 border-brand/30 hover:shadow-md transition-shadow"
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-soft text-brand shrink-0">
            <Briefcase size={17} aria-hidden />
          </span>
          <span>
            <span className="block text-[13.5px] font-semibold mb-1">Quer praticar isso jogando?</span>
            <span className="block text-[12.5px] text-foreground-muted">
              Um Dia no Escritório tem uma missão sobre {gameEpisodes[0].syllabusCodes.filter((c) => planDay.syllabusCodes.includes(c)).join(", ")}{" "}
              ({gameEpisodes[0].title}) — opcional, fica no Laboratório.
            </span>
          </span>
        </Link>
      )}

      {hasComplementary && !choice && (
        <div className="card p-5 border-brand/30 bg-brand-soft/30">
          <p className="flex items-center gap-1.5 text-[15px] font-display font-semibold mb-1.5">
            <Sparkles size={16} className="text-brand" aria-hidden />
            Vamos continuar estudando e revisando?
          </p>
          <p className="text-sm text-foreground-muted mb-4">
            Separamos {videos.length > 0 ? `${videos.length} vídeo(s) complementar(es)` : ""}
            {videos.length > 0 && questions.length > 0 ? " e " : ""}
            {questions.length > 0 ? `${questions.length} questão(ões) extra(s)` : ""} sobre o que você estudou hoje.
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => handleChoice("feito")} className="btn btn-primary flex-1">
              Sim, vamos!
            </button>
            <button type="button" onClick={() => handleChoice("adiado")} className="btn btn-secondary flex-1">
              Prefiro depois
            </button>
          </div>
        </div>
      )}

      {hasComplementary && choice === "adiado" && (
        <div className="card p-4 text-sm">
          <p className="text-foreground-muted">
            Sem problema — esse conteúdo ficou guardado em{" "}
            <Link href="/revisao-conteudos-estudados" className="text-brand font-medium hover:underline">
              Revisão de Conteúdos Estudados
            </Link>
            , organizado por dia, para quando você tiver um tempo.
          </p>
        </div>
      )}

      {hasComplementary && choice === "feito" && (
        <ComplementaryReviewBlock dayNumber={dayNumber} videos={videos} questions={questions} />
      )}
    </div>
  );
}

/** Conteúdo complementar do dia (vídeos extras + questões extras), oferecido só no fechamento —
 * antes ficava escondido dentro de cada etapa atrás de um link discreto; agora fica reunido aqui,
 * de forma visível, depois que o aluno já cobriu o obrigatório. */
function ComplementaryReviewBlock({
  dayNumber,
  videos,
  questions,
}: {
  dayNumber: number;
  videos: VideoLesson[];
  questions: Question[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="card p-5 space-y-5">
      {videos.length > 0 && (
        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold mb-2.5">
            <PlayCircle size={15} className="text-brand" aria-hidden /> Vídeos complementares
          </p>
          <ul className="space-y-2">
            {videos.map((v) => {
              const open = openId === v.id;
              return (
                <li key={v.id} className="rounded-lg border border-border p-2.5">
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : v.id)}
                    className="w-full flex items-center justify-between gap-2 text-left text-sm font-medium"
                  >
                    <span>{v.title}</span>
                    <span className="shrink-0 text-xs text-brand">{open ? "Ocultar" : "Assistir"}</span>
                  </button>
                  {open && (
                    <div className="mt-2">
                      <YouTubePlayer youtubeId={v.youtubeId} title={v.title} channel={v.channel} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {questions.length > 0 && (
        <div>
          <p className="text-sm font-semibold mb-2.5">Questões extras sobre hoje</p>
          <div className="space-y-3">
            {questions.map((q) => (
              <QuestionBlock key={q.id} questionId={q.id} day={dayNumber} stepId="complementar" onAnswered={() => {}} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
