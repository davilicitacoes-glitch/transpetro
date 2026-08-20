"use client";

import { useMemo } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { ALL_LESSONS } from "@/content/lessons";
import { ALL_QUESTIONS, QUESTION_COUNT_BY_SUBJECT } from "@/content/questions";
import { SUBJECTS } from "@/content/curriculum";
import { EXAM_BLUEPRINT, OBJECTIVE_TARGET_POINTS, OBJECTIVE_TOTAL_POINTS } from "@config/concurso";
import { useCompletedLessons } from "@/lib/progress/useCompletedLessons";
import { PageHeader } from "@/components/ui/PageHeader";

export default function DesempenhoPage() {
  const { completed } = useCompletedLessons();

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

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card p-3 text-center">
          <p className="text-[22px] font-bold leading-none">{totalDone}</p>
          <p className="text-[11px] text-foreground-muted mt-1">de {totalLessons} aulas</p>
        </div>
        <div className="card p-3 text-center">
          <p className="text-[22px] font-bold leading-none">{ALL_QUESTIONS.length}</p>
          <p className="text-[11px] text-foreground-muted mt-1">questões no banco</p>
        </div>
        <div className="card p-3 text-center">
          <p className="text-[22px] font-bold leading-none text-brand">{OBJECTIVE_TARGET_POINTS}</p>
          <p className="text-[11px] text-foreground-muted mt-1">meta / {OBJECTIVE_TOTAL_POINTS} pts</p>
        </div>
      </div>

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
