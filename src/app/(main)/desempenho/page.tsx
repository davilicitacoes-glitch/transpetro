"use client";

import { useMemo } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { ALL_LESSONS } from "@/content/lessons";
import { ALL_QUESTIONS, QUESTION_COUNT_BY_SUBJECT } from "@/content/questions";
import { SUBJECTS } from "@/content/curriculum";
import { EXAM_BLUEPRINT, OBJECTIVE_MIN_PASSING_POINTS, OBJECTIVE_TOTAL_POINTS } from "@config/concurso";
import { useCompletedLessons } from "@/lib/progress/useCompletedLessons";
import { useAttemptStats } from "@/lib/progress/useAttemptStats";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatTile } from "@/components/ui/StatTile";
import { Target } from "lucide-react";

export default function DesempenhoPage() {
  const { completed } = useCompletedLessons();
  const { stats: attemptStats } = useAttemptStats();

  const stats = useMemo(
    () =>
      SUBJECTS.filter((s) => s.slug !== "redacao").map((subject) => {
        const lessons = ALL_LESSONS.filter((l) => l.subjectSlug === subject.slug);
        const done = lessons.filter((l) => completed.has(l.slug)).length;
        const blueprint = EXAM_BLUEPRINT.find((b) => b.id === subject.slug);
        return {
          subject,
          lessons: lessons.length,
          done,
          pct: lessons.length > 0 ? (done / lessons.length) * 100 : 0,
          questions: QUESTION_COUNT_BY_SUBJECT[subject.slug] ?? 0,
          examPoints: blueprint?.totalPoints ?? 0,
        };
      }),
    [completed],
  );

  const totalDone = completed.size;
  const totalLessons = ALL_LESSONS.length;

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
      <PageHeader
        eyebrow="Desempenho"
        title="Seu progresso por disciplina"
        description="Cobertura das aulas e volume de questões disponíveis, ponderados pelo peso real de cada disciplina na prova."
      />

      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <StatTile value={totalDone} label={`de ${totalLessons} aulas`} />
        <StatTile value={ALL_QUESTIONS.length} label="questões no banco" />
        <StatTile value={OBJECTIVE_MIN_PASSING_POINTS} label={`mín. p/ passar / ${OBJECTIVE_TOTAL_POINTS} pts`} accent="accent" />
      </div>

      {attemptStats.totalAttempts > 0 && (
        <section className="card-raised p-5 mb-5 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(480px 240px at 100% 0%, color-mix(in srgb, var(--brand) 10%, transparent), transparent 65%)" }}
            aria-hidden
          />
          <div className="relative">
          <h2 className="font-semibold text-[14px] mb-4 flex items-center gap-2">
            <Target size={16} className="text-brand" aria-hidden />
            Acerto real em questões
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <p className="text-[30px] font-display font-bold text-gradient-brand leading-none">{attemptStats.overallAccuracy}%</p>
            <p className="text-[12px] text-foreground-muted">
              {attemptStats.totalCorrect} de {attemptStats.totalAttempts} questões respondidas certas, no total.
            </p>
          </div>
          <div className="space-y-3">
            {SUBJECTS.filter((s) => attemptStats.bySubject[s.slug]).map((subject) => {
              const s = attemptStats.bySubject[subject.slug];
              return (
                <div key={subject.slug}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12.5px] font-medium">{subject.name}</span>
                    <span className="text-[11px] text-foreground-muted">{s.correct}/{s.total} ({s.accuracy}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-muted rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{ width: `${s.accuracy}%`, backgroundColor: s.accuracy >= 60 ? "var(--success)" : s.accuracy >= 40 ? "var(--warning)" : "var(--danger)" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </section>
      )}

      <section className="card p-5 mb-5">
        <h2 className="font-semibold text-[14px] mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-brand" aria-hidden />
          Cobertura por disciplina
        </h2>
        <div className="space-y-4">
          {stats.map(({ subject, lessons, done, pct, questions, examPoints }) => (
            <div key={subject.slug}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[13px] font-medium">{subject.name}</span>
                <span className="text-[11px] text-foreground-muted">
                  {done}/{lessons} aulas · {questions} questões · {examPoints} pts na prova
                </span>
              </div>
              <div className="w-full h-2 bg-surface-muted rounded-full overflow-hidden">
                <div className="h-full transition-all" style={{ width: `${pct}%`, backgroundColor: subject.color }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-5">
        <h2 className="font-semibold text-[14px] mb-2">Onde investir seu tempo</h2>
        <p className="text-[13px] text-foreground-muted leading-relaxed mb-3">
          Conhecimentos Específicos valem <strong className="text-foreground">40 dos 60 pontos</strong> da objetiva (dois
          terços). Cada questão dessa disciplina vale o dobro das demais — priorize-a sempre que o tempo for curto.
        </p>
        <Link
          href="/simulados"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand hover:underline"
        >
          Fazer um simulado para medir seu nível real
        </Link>
      </section>
    </main>
  );
}
