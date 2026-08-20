"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, Flame, Sparkles, Target, TrendingUp, Zap } from "lucide-react";
import { useTranspetroStore } from "@/lib/store/useTranspetroStore";
import { useTodayMission } from "@/lib/schedule/useTodayMission";
import { daysBetween, formatDateBR, todayInExamTimezone } from "@/lib/schedule/dates";
import { EXAM_DATE, LAST_STUDY_DATE, OBJECTIVE_TARGET_POINTS, TOTAL_MISSIONS } from "@config/concurso";
import { getDB } from "@/lib/db/dexie";
import { computeScoreProjection } from "@/lib/performance/projection";
import type { Attempt, Question } from "@/lib/models/schema";

export default function HojePage() {
  const studyPlan = useTranspetroStore((s) => s.studyPlan);
  const { day, tasks, completedKinds, toggleTask, missionComplete, loading } = useTodayMission();
  const [projection, setProjection] = useState<ReturnType<typeof computeScoreProjection> | null>(null);
  const [essentialMode, setEssentialMode] = useState(false);

  const today = todayInExamTimezone();
  const daysToExam = Math.max(0, daysBetween(today, EXAM_DATE, false));
  const isPastLastStudyDay = today > LAST_STUDY_DATE;

  const missionsDone = studyPlan?.days.filter((d) => d.dayType === "missao" && d.date < today).length ?? 0;
  const missionPct = Math.min(100, (missionsDone / (studyPlan?.missionCount || TOTAL_MISSIONS)) * 100);

  useEffect(() => {
    (async () => {
      const db = getDB();
      const [attempts, questions] = await Promise.all([db.attempts.toArray(), db.questions.toArray()]);
      const questionsById = new Map<string, Question>(questions.map((q) => [q.id, q]));
      setProjection(computeScoreProjection(attempts as Attempt[], questionsById));
    })();
  }, []);

  const visibleTasks = essentialMode
    ? tasks.filter((t) => t.kind === "revisao" || t.kind === "questoes")
    : tasks;

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand mb-1">Hoje · {formatDateBR(today)}</p>
        <h1 className="text-[26px] font-bold tracking-tight">
          {isPastLastStudyDay ? "Ciclo de estudo encerrado" : `Faltam ${daysToExam} dias para a prova`}
        </h1>
        <p className="text-foreground-muted text-sm mt-1">
          Prova em {formatDateBR(EXAM_DATE)} · último dia de estudo {formatDateBR(LAST_STUDY_DATE)}
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <section className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-md bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <Flame size={15} aria-hidden />
            </span>
            <p className="text-[13px] font-semibold">Ciclo de missões</p>
            <span className="ml-auto text-xs text-foreground-muted">
              {missionsDone}/{studyPlan?.missionCount ?? TOTAL_MISSIONS}
            </span>
          </div>
          <div className="w-full h-2 bg-surface-muted rounded-full overflow-hidden">
            <div className="h-full bg-brand transition-all" style={{ width: `${missionPct}%` }} />
          </div>
          {studyPlan?.compressionNote && <p className="text-[11px] text-warning mt-2">{studyPlan.compressionNote}</p>}
        </section>

        <section className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-md bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <TrendingUp size={15} aria-hidden />
            </span>
            <p className="text-[13px] font-semibold">Pontuação projetada</p>
          </div>
          {projection?.hasEnoughData ? (
            <p className="text-[22px] font-bold leading-none">
              {projection.projectedPoints}
              <span className="text-xs font-normal text-foreground-muted ml-1">± {projection.uncertaintyPoints} / 60</span>
              <span className="block text-[11px] font-normal text-foreground-muted mt-1">meta: {OBJECTIVE_TARGET_POINTS} pts</span>
            </p>
          ) : (
            <p className="text-xs text-foreground-muted leading-relaxed">
              Ainda sem dados suficientes de questões respondidas para projetar com confiança.
            </p>
          )}
        </section>
      </div>

      {!isPastLastStudyDay && (
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-[15px] flex items-center gap-2">
              <Target size={16} className="text-brand" aria-hidden />
              {day?.dayType === "missao" ? `Missão ${day.missionIndex}` : "Sem missão nova hoje"}
            </h2>
            <button
              type="button"
              onClick={() => setEssentialMode((v) => !v)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                essentialMode ? "border-brand bg-brand text-brand-foreground" : "border-border text-foreground-muted hover:bg-surface-muted"
              }`}
            >
              <Zap size={13} aria-hidden />
              Modo Essencial
            </button>
          </div>

          {loading ? (
            <p className="text-sm text-foreground-muted">Carregando missão…</p>
          ) : visibleTasks.length === 0 ? (
            <div className="card p-4 text-sm text-foreground-muted">
              {day?.dayType === "reta_final"
                ? "Reta final: dedique o dia a revisão de erros, leis secas e estratégia — sem conteúdo novo pesado."
                : day?.dayType === "simulado"
                  ? "Hoje é dia de simulado completo."
                  : "Dia de descanso técnico ou revisão livre — aproveite para reforçar pontos fracos."}
            </div>
          ) : (
            <ol className="space-y-2">
              {visibleTasks.map((task) => {
                const done = completedKinds.has(task.kind);
                return (
                  <li key={task.kind} className="card p-3.5 flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => toggleTask(task.kind)}
                      aria-pressed={done}
                      aria-label={done ? `Marcar "${task.title}" como não concluída` : `Marcar "${task.title}" como concluída`}
                      className="mt-0.5 shrink-0 text-brand"
                    >
                      {done ? <CheckCircle2 size={20} /> : <Circle size={20} className="text-foreground-muted" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${done ? "line-through text-foreground-muted" : ""}`}>{task.title}</p>
                      <p className="text-xs text-foreground-muted mt-0.5">{task.description}</p>
                      <p className="text-xs text-foreground-subtle mt-1">{task.estimatedMinutes} min</p>
                    </div>
                    {task.href && (
                      <Link href={task.href} className="shrink-0 text-xs font-medium text-brand hover:underline self-center">
                        Continuar
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          )}

          {tasks.length > 0 && (
            <button
              type="button"
              disabled={!missionComplete}
              className="mt-4 w-full rounded-lg bg-brand text-brand-foreground font-medium py-2.5 text-sm hover:opacity-90 disabled:opacity-40 shadow-sm"
            >
              {missionComplete ? "Concluir missão" : "Complete as tarefas principais para concluir"}
            </button>
          )}

          {missionComplete && (
            <Link
              href="/estudio"
              className="mt-3 flex items-center gap-2 justify-center rounded-lg border border-brand text-brand py-2.5 text-sm font-medium hover:bg-brand-soft transition-colors"
            >
              <Sparkles size={16} aria-hidden />
              Reforço Inteligente — aprender algo agora
            </Link>
          )}
        </section>
      )}
    </main>
  );
}
