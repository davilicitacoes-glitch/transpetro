"use client";

import { useEffect, useState, useCallback } from "react";
import { use as usePromise } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, ExternalLink, List, LogOut, PlayCircle, Sparkles } from "lucide-react";
import { ALL_LESSONS } from "@/content/lessons";
import { ALL_QUESTIONS } from "@/content/questions";
import { VIDEO_LESSONS, type VideoLesson } from "@/content/videos";
import { ESSAY_PROMPTS } from "@/content/essays/prompts";
import { YouTubePlayer } from "@/components/video/YouTubePlayer";
import { STEP_TYPE_LABEL, formatMinutes } from "@/lib/course/labels";
import { DEFAULT_STUDENT_ID, type CourseDay, type CourseDayProgress, type CourseStep } from "@/lib/models/schema";
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
  type CourseDaySummary,
} from "@/lib/course/service";
import type { ReviewSchedule } from "@/lib/models/schema";

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
    if (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > 34) return;
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

  if (loading || !planDay || !progress) {
    return (
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full">
        <p className="text-sm text-foreground-muted">Carregando o Dia {dayParam}…</p>
      </main>
    );
  }

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

      {/* trilha discreta de etapas */}
      <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1">
        {planDay.steps.map((s) => {
          const done = progress.completedStepIds.includes(s.id);
          const active = s.id === currentStep?.id;
          return (
            <span
              key={s.id}
              title={s.title}
              className={`h-1.5 flex-1 min-w-[10px] rounded-full ${done ? "bg-brand" : active ? "bg-brand/40" : "bg-surface-muted"}`}
            />
          );
        })}
      </div>

      {currentStep ? (
        <StepCard key={currentStep.id} step={currentStep} day={dayNumber} onCompleted={() => handleCompleteStep(currentStep.id)} onAnswered={refreshProgress} />
      ) : (
        <FechamentoCard summary={summary} error={finishError} onFinish={handleFinishDay} onBack={() => router.push("/meu-curso")} />
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
  return (
    <div>
      <h2 className="text-[17px] font-semibold mb-1">{lesson.title}</h2>
      <p className="text-sm text-foreground-muted mb-4">{lesson.learningObjective}</p>

      <Link
        href={`/curso/${lesson.slug}`}
        className="tap-target w-full justify-center gap-1.5 text-sm font-semibold btn btn-primary mb-4"
      >
        Abrir aula completa (slides narrados) <ExternalLink size={14} aria-hidden />
      </Link>

      {lesson.mustMemorize.length > 0 && (
        <div className="rounded-lg bg-surface-muted p-3.5 mb-4">
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

      <ComplementaryVideos syllabusCodes={lesson.syllabusCodes} />
    </div>
  );
}

/** Vídeos curados adicionais sobre o mesmo assunto, além do vídeo já mostrado como obrigatório
 * do tópico (excluído por id — o mesmo critério determinístico usado em coursePlan.ts). */
function ComplementaryVideos({ syllabusCodes, excludeId }: { syllabusCodes: string[]; excludeId?: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const videos: VideoLesson[] = VIDEO_LESSONS
    .filter((v) => v.id !== excludeId && v.syllabusCodes.some((c) => syllabusCodes.includes(c)))
    .slice(0, 3);
  if (videos.length === 0) return null;
  return (
    <div className="rounded-lg border border-border p-3.5 mb-4">
      <p className="flex items-center gap-1.5 text-xs font-semibold mb-2">
        <PlayCircle size={13} aria-hidden /> Vídeos complementares
      </p>
      <ul className="space-y-2">
        {videos.map((v) => {
          const open = openId === v.id;
          return (
            <li key={v.id}>
              <button
                type="button"
                onClick={() => setOpenId(open ? null : v.id)}
                className="w-full flex items-center justify-between gap-2 text-left text-xs text-brand hover:underline"
              >
                <span>{v.title}</span>
                <span className="shrink-0 text-foreground-muted">{open ? "Ocultar" : "Assistir"}</span>
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
      <div className={percent > 0 ? "" : "mt-4"}>
        <ComplementaryVideos syllabusCodes={video.syllabusCodes} excludeId={video.id} />
      </div>
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
  const [selected, setSelected] = useState<"A" | "B" | "C" | "D" | null>(null);
  const [answered, setAnswered] = useState(false);
  if (!question) return <p className="text-sm text-danger">Questão não encontrada ({questionId}).</p>;

  async function answer(key: "A" | "B" | "C" | "D") {
    if (answered || !question) return;
    setSelected(key);
    setAnswered(true);
    const correct = question.options.find((o) => o.isCorrect);
    await answerCourseQuestion({
      day,
      stepId,
      questionId,
      selectedKey: key,
      correctKey: correct?.key,
      isCorrect: key === correct?.key,
    });
    onAnswered();
  }

  return (
    <div className="border border-border rounded-lg p-3.5">
      <p className="text-[13.5px] mb-2.5">{question.statement}</p>
      <div className="space-y-1.5">
        {question.options.map((opt) => {
          const showResult = answered;
          const isSelected = selected === opt.key;
          const tone = !showResult
            ? "border-border hover:border-brand"
            : opt.isCorrect
              ? "border-success bg-success-soft"
              : isSelected
                ? "border-danger bg-danger-soft"
                : "border-border opacity-60";
          return (
            <button
              key={opt.key}
              type="button"
              disabled={answered}
              onClick={() => answer(opt.key)}
              className={`w-full text-left rounded-lg border px-3 py-2 text-[13px] transition-colors ${tone}`}
            >
              <span className="font-semibold mr-1.5">{opt.key})</span>
              {opt.text}
              {showResult && isSelected && (
                <span className="block text-xs mt-1 text-foreground-muted">{opt.explanation}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
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
  summary,
  error,
  onFinish,
  onBack,
}: {
  summary: CourseDaySummary | null;
  error: string | null;
  onFinish: () => void;
  onBack: () => void;
}) {
  return (
    <div className="card p-5">
      <h2 className="text-[17px] font-semibold mb-4">Resumo do dia</h2>
      {summary ? (
        <ul className="space-y-2 text-sm mb-5">
          <li className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-success" aria-hidden />
            {summary.completedSteps} de {summary.totalSteps} etapas concluídas
          </li>
          <li className="flex items-center gap-2">
            <Circle size={15} className="text-foreground-muted" aria-hidden />
            {summary.questionsAnswered} questão(ões) respondida(s), {summary.questionsCorrect} certa(s)
          </li>
          <li className="flex items-center gap-2">
            <Circle size={15} className="text-foreground-muted" aria-hidden />
            {summary.reviewsScheduledDuringSession} revisão(ões) nova(s) agendada(s)
          </li>
        </ul>
      ) : (
        <p className="text-sm text-foreground-muted mb-5">Carregando resumo…</p>
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
  );
}
