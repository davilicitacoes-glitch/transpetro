"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Search } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { PHASE_LABEL, formatMinutes } from "@/lib/course/labels";
import { formatDateBR } from "@/lib/schedule/dates";
import { getEnrollment, getCompletedDays, type CourseDayOverviewEntry } from "@/lib/course/service";

type SortMode = "recente" | "ordem";

export default function ConcluidasPage() {
  const [entries, setEntries] = useState<CourseDayOverviewEntry[] | null>(null);
  const [notEnrolled, setNotEnrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<SortMode>("recente");

  useEffect(() => {
    (async () => {
      const enrollment = await getEnrollment();
      if (!enrollment) {
        setNotEnrolled(true);
        return;
      }
      const list = await getCompletedDays(undefined, enrollment);
      setEntries(list);
    })();
  }, []);

  const allSubjects = useMemo(() => {
    if (!entries) return [];
    return Array.from(new Set(entries.flatMap((e) => e.subjects))).sort();
  }, [entries]);

  const filtered = useMemo(() => {
    if (!entries) return [];
    const q = query.trim().toLowerCase();
    let list = entries.filter((e) => {
      const matchesQuery = !q || e.title.toLowerCase().includes(q) || e.subjects.some((s) => s.toLowerCase().includes(q));
      const matchesSubject = !subjectFilter || e.subjects.includes(subjectFilter);
      return matchesQuery && matchesSubject;
    });
    list = [...list].sort((a, b) => (sort === "ordem" ? a.day - b.day : (b.completedAt ?? "").localeCompare(a.completedAt ?? "") || b.day - a.day));
    return list;
  }, [entries, query, subjectFilter, sort]);

  if (notEnrolled) {
    return (
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full">
        <PageHeader eyebrow="Meu Curso" title="Concluídas" />
        <p className="text-sm text-foreground-muted">
          Você ainda não começou o curso. <Link href="/meu-curso" className="text-brand font-medium">Comece por aqui</Link>.
        </p>
      </main>
    );
  }

  if (!entries) return <PageSkeleton cards={4} />;

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in pb-10">
      <PageHeader
        eyebrow="Meu Curso"
        title="Concluídas"
        description={`${entries.length} dia(s) com progresso registrado. Reveja qualquer etapa sem perder o histórico.`}
      />

      {entries.length === 0 ? (
        <div className="card p-6 text-center">
          <CheckCircle2 size={28} className="mx-auto mb-2 text-foreground-subtle" aria-hidden />
          <p className="text-sm text-foreground-muted">
            Nenhum dia concluído ainda. Assim que você avançar em uma etapa do curso, ela aparece aqui para revisão permanente.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-subtle" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por título ou disciplina…"
                className="w-full rounded-lg border border-border bg-surface pl-8 pr-3 py-2 text-sm"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="rounded-lg border border-border bg-surface px-2 py-2 text-xs"
            >
              <option value="recente">Concluídas recentemente</option>
              <option value="ordem">Ordem do curso</option>
            </select>
          </div>

          {allSubjects.length > 1 && (
            <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setSubjectFilter(null)}
                className={`chip whitespace-nowrap ${!subjectFilter ? "bg-brand text-white" : "bg-surface-muted text-foreground-muted"}`}
              >
                Todas
              </button>
              {allSubjects.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubjectFilter(s)}
                  className={`chip whitespace-nowrap ${subjectFilter === s ? "bg-brand text-white" : "bg-surface-muted text-foreground-muted"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="text-sm text-foreground-muted">Nada encontrado com esse filtro.</p>
          ) : (
            <ul className="space-y-2">
              {filtered.map((entry) => (
                <li key={entry.day}>
                  <Link href={`/meu-curso/dia/${entry.day}`} className="card p-3.5 flex items-center gap-3 hover:shadow-md transition-shadow">
                    <CheckCircle2 size={20} className={entry.status === "concluido" ? "text-success shrink-0" : "text-brand/70 shrink-0"} aria-hidden />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-xs font-semibold text-foreground-muted">Dia {entry.day}</span>
                        <span className="chip bg-surface-muted text-foreground-muted text-[10px] py-0.5">{PHASE_LABEL[entry.phase]}</span>
                        {entry.status !== "concluido" && <span className="chip bg-brand-soft text-brand text-[10px] py-0.5">em andamento</span>}
                      </div>
                      <p className="text-[13.5px] font-medium truncate">{entry.title}</p>
                      <p className="text-[11px] text-foreground-muted">
                        {entry.subjects.join(" · ")} — {entry.completedSteps} de {entry.totalSteps} etapas
                        {entry.completedAt ? ` · concluído em ${formatDateBR(entry.completedAt.slice(0, 10))}` : ""}
                      </p>
                    </div>
                    <span className="text-[11px] text-foreground-subtle shrink-0">{formatMinutes(entry.estimatedMinutesTotal)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}
