"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { SUBJECTS, MODULES, TOPICS } from "@/content/curriculum";
import { ALL_LESSONS } from "@/content/lessons";
import { useCompletedLessons } from "@/lib/progress/useCompletedLessons";

export default function CursoPage() {
  const { completed } = useCompletedLessons();
  const lessonsBySlug = useMemo(() => new Map(ALL_LESSONS.map((l) => [l.slug, l])), []);

  const subjectStats = SUBJECTS.map((subject) => {
    const modules = MODULES.filter((m) => m.subjectSlug === subject.slug);
    const subjectTopics = TOPICS.filter((t) => modules.some((m) => m.slug === t.moduleSlug));
    const lessons = subjectTopics.map((t) => lessonsBySlug.get(t.slug)).filter(Boolean) as typeof ALL_LESSONS;
    const doneCount = lessons.filter((l) => completed.has(l.slug)).length;
    const firstLesson = lessons[0];
    return { subject, total: lessons.length, doneCount, firstLesson };
  });

  const totalLessons = ALL_LESSONS.length;
  const totalDone = completed.size;

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-5xl mx-auto w-full animate-fade-in">
      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand mb-1">Curso completo</p>
        <h1 className="text-[26px] font-bold tracking-tight mb-2">Profissional Transpetro Júnior — Administração e Controle</h1>
        <p className="text-foreground-muted text-sm max-w-2xl">
          {totalLessons} aulas organizadas por disciplina, módulo e tópico do Anexo IV do edital — teoria, exemplos
          resolvidos, pegadinhas, flashcards e miniquestionário em cada uma.
        </p>

        <div className="mt-5 card p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-soft text-brand flex items-center justify-center font-bold text-sm shrink-0">
            {totalLessons > 0 ? Math.round((totalDone / totalLessons) * 100) : 0}%
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Progresso geral do curso</p>
            <p className="text-xs text-foreground-muted">
              {totalDone} de {totalLessons} aulas concluídas
            </p>
            <div className="w-full h-1.5 bg-surface-muted rounded-full overflow-hidden mt-1.5">
              <div
                className="h-full bg-brand transition-all"
                style={{ width: `${totalLessons > 0 ? (totalDone / totalLessons) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        {subjectStats.map(({ subject, total, doneCount, firstLesson }) => {
          const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
          const nextLesson = ALL_LESSONS.find((l) => l.subjectSlug === subject.slug && !completed.has(l.slug)) ?? firstLesson;
          return (
            <Link
              key={subject.slug}
              href={nextLesson ? `/curso/${nextLesson.slug}` : "#"}
              className="card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${subject.color}1a`, color: subject.color }}
                >
                  <BookOpen size={17} aria-hidden />
                </span>
                <span className="chip bg-surface-muted text-foreground-muted">{subject.examWeightPoints} pts</span>
              </div>
              <h2 className="font-semibold text-[15px] mb-1">{subject.name}</h2>
              <p className="text-xs text-foreground-muted mb-3 line-clamp-2">{subject.description}</p>

              <div className="flex items-center justify-between text-xs text-foreground-muted mb-1.5">
                <span>
                  {doneCount}/{total} aulas
                </span>
                <span>{pct}%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-muted rounded-full overflow-hidden mb-3">
                <div className="h-full transition-all" style={{ width: `${pct}%`, backgroundColor: subject.color }} />
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-medium text-brand group-hover:gap-1.5 transition-all">
                {doneCount === 0 ? "Começar" : doneCount === total ? "Revisar" : "Continuar"}
                <ArrowRight size={13} aria-hidden />
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
