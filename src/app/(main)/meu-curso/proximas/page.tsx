"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ListTodo, PlayCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { PHASE_LABEL, formatMinutes } from "@/lib/course/labels";
import { formatDateBR } from "@/lib/schedule/dates";
import { LAST_STUDY_DATE } from "@config/concurso";
import { getEnrollment, getUpcomingDays, type CourseDayOverviewEntry } from "@/lib/course/service";

export default function ProximasPage() {
  const [entries, setEntries] = useState<CourseDayOverviewEntry[] | null>(null);
  const [notEnrolled, setNotEnrolled] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const enrollment = await getEnrollment();
      if (!enrollment) {
        setNotEnrolled(true);
        return;
      }
      const list = await getUpcomingDays(undefined, enrollment);
      setEntries(list);
    })();
  }, []);

  const allSubjects = useMemo(() => {
    if (!entries) return [];
    return Array.from(new Set(entries.flatMap((e) => e.subjects))).sort();
  }, [entries]);

  const filtered = useMemo(() => {
    if (!entries) return [];
    return subjectFilter ? entries.filter((e) => e.subjects.includes(subjectFilter)) : entries;
  }, [entries, subjectFilter]);

  const allCodes = useMemo(() => {
    if (!entries) return { count: 0 };
    return { count: new Set(entries.flatMap((e) => e.syllabusCodes)).size };
  }, [entries]);

  if (notEnrolled) {
    return (
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full">
        <PageHeader eyebrow="Meu Curso" title="Próximas" />
        <p className="text-sm text-foreground-muted">
          Você ainda não começou o curso. <Link href="/meu-curso" className="text-brand font-medium">Comece por aqui</Link>.
        </p>
      </main>
    );
  }

  if (!entries) {
    return (
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full">
        <p className="text-sm text-foreground-muted">Carregando…</p>
      </main>
    );
  }

  const [nextDay, ...rest] = filtered;

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in pb-10">
      <PageHeader
        eyebrow="Meu Curso"
        title="Próximas"
        description={`${entries.length} dia(s) restantes até ${formatDateBR(LAST_STUDY_DATE)} · ${allCodes.count} código(s) do edital programados aqui.`}
      />

      {entries.length === 0 ? (
        <div className="card p-6 text-center">
          <ListTodo size={28} className="mx-auto mb-2 text-foreground-subtle" aria-hidden />
          <p className="text-sm text-foreground-muted">Você concluiu todo o percurso planejado. Continue revisando em "Revisões".</p>
        </div>
      ) : (
        <>
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

          {nextDay && (
            <Link href={`/meu-curso/dia/${nextDay.day}`} className="card-raised p-4 mb-4 border-brand/40 bg-brand-soft/40 flex items-center gap-3">
              <PlayCircle size={22} className="text-brand shrink-0" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-brand mb-0.5">
                  {nextDay.status === "em_andamento" ? "Continuar agora" : "Próximo na fila"} — Dia {nextDay.day}
                </p>
                <p className="text-sm font-medium truncate">{nextDay.title}</p>
                <p className="text-[11px] text-foreground-muted">{formatDateBR(nextDay.scheduledDate)} · {formatMinutes(nextDay.estimatedMinutesTotal)}</p>
              </div>
            </Link>
          )}

          <ul className="space-y-2">
            {rest.map((entry) => (
              <li key={entry.day} className="card p-3.5 flex items-center gap-3 opacity-90">
                <span className="chip bg-surface-muted text-foreground-muted text-[10px] py-0.5 shrink-0">Dia {entry.day}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="chip bg-surface-muted text-foreground-muted text-[10px] py-0.5">{PHASE_LABEL[entry.phase]}</span>
                    <span className="text-[11px] text-foreground-muted">{formatDateBR(entry.scheduledDate)}</span>
                  </div>
                  <p className="text-[13.5px] font-medium truncate">{entry.title}</p>
                  <p className="text-[11px] text-foreground-muted">{entry.subjects.join(" · ")}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[11px] text-foreground-subtle">{formatMinutes(entry.estimatedMinutesTotal)}</span>
                  <Link href={`/meu-curso/dia/${entry.day}`} className="text-[11px] text-brand hover:underline">
                    Estudar antecipadamente
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
