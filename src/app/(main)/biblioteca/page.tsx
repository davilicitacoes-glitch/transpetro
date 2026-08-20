"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ExternalLink, FileText, Scale } from "lucide-react";
import { ALL_LESSONS } from "@/content/lessons";
import { SUBJECTS } from "@/content/curriculum";
import { PageHeader } from "@/components/ui/PageHeader";

export default function BibliotecaPage() {
  /** Índice de legislação citada nas aulas, deduplicado — cada lei aponta para as aulas que a usam. */
  const legalIndex = useMemo(() => {
    const map = new Map<string, { title: string; url?: string; lessons: { slug: string; title: string }[] }>();
    for (const lesson of ALL_LESSONS) {
      for (const ref of lesson.legalReferences) {
        const existing = map.get(ref.title);
        if (existing) {
          existing.lessons.push({ slug: lesson.slug, title: lesson.title });
        } else {
          map.set(ref.title, { title: ref.title, url: ref.url, lessons: [{ slug: lesson.slug, title: lesson.title }] });
        }
      }
    }
    return [...map.values()].sort((a, b) => b.lessons.length - a.lessons.length);
  }, []);

  const summaryBySubject = useMemo(
    () =>
      SUBJECTS.map((subject) => ({
        subject,
        lessons: ALL_LESSONS.filter((l) => l.subjectSlug === subject.slug),
      })).filter((s) => s.lessons.length > 0),
    [],
  );

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
      <PageHeader
        eyebrow="Biblioteca"
        title="Material de apoio e legislação"
        description="Índice da legislação citada no curso e resumos de revisão de todas as aulas, agrupados por disciplina."
      />

      <section className="card p-4 mb-5 border-brand/30 bg-brand-soft/30">
        <h2 className="font-semibold text-[14px] mb-1 flex items-center gap-2"><Scale size={16} className="text-brand" aria-hidden />Lei seca comentada</h2>
        <p className="text-xs text-foreground-muted mb-2">27 dispositivos do Prompt 9, com separação entre texto, comentário, pegadinha e forma de cobrança.</p>
        <Link href="/biblioteca/lei-seca" className="text-xs text-brand font-medium hover:underline">Abrir material de lei seca →</Link>
      </section>

      <section className="card p-4 mb-5 border-brand/30 bg-brand-soft/30">
        <h2 className="font-semibold text-[14px] mb-1 flex items-center gap-2"><Scale size={16} className="text-brand" aria-hidden />Lei seca comentada</h2>
        <p className="text-xs text-foreground-muted mb-2">27 dispositivos do Prompt 9, com separação entre texto, comentário, pegadinha e forma de cobrança.</p>
        <Link href="/biblioteca/lei-seca" className="text-xs text-brand font-medium hover:underline">Abrir material de lei seca →</Link>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold text-[15px] mb-3 flex items-center gap-2">
          <Scale size={16} className="text-brand" aria-hidden />
          Legislação e fontes citadas ({legalIndex.length})
        </h2>
        <ul className="space-y-2">
          {legalIndex.map((ref) => (
            <li key={ref.title} className="card p-3.5">
              {ref.url ? (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13.5px] font-medium text-brand hover:underline inline-flex items-center gap-1"
                >
                  {ref.title}
                  <ExternalLink size={12} aria-hidden />
                </a>
              ) : (
                <span className="text-[13.5px] font-medium">{ref.title}</span>
              )}
              <p className="text-[11px] text-foreground-muted mt-1">
                Citada em {ref.lessons.length} {ref.lessons.length === 1 ? "aula" : "aulas"}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {ref.lessons.slice(0, 3).map((l) => (
                  <Link
                    key={l.slug}
                    href={`/curso/${l.slug}`}
                    className="text-[11px] text-foreground-muted hover:text-brand bg-surface-muted rounded px-2 py-0.5"
                  >
                    {l.title.length > 45 ? `${l.title.slice(0, 45)}…` : l.title}
                  </Link>
                ))}
                {ref.lessons.length > 3 && (
                  <span className="text-[11px] text-foreground-subtle px-1">+{ref.lessons.length - 3}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold text-[15px] mb-3 flex items-center gap-2">
          <FileText size={16} className="text-brand" aria-hidden />
          Resumos de revisão por disciplina
        </h2>
        {summaryBySubject.map(({ subject, lessons }) => (
          <details key={subject.slug} className="card p-4 mb-2.5">
            <summary className="cursor-pointer font-medium text-[13.5px] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: subject.color }} aria-hidden />
              {subject.name}
              <span className="text-[11px] text-foreground-muted font-normal ml-auto">{lessons.length} aulas</span>
            </summary>
            <div className="mt-3 space-y-3">
              {lessons.map((lesson) => (
                <div key={lesson.slug} className="border-l-2 border-border-strong pl-3">
                  <Link href={`/curso/${lesson.slug}`} className="text-[12.5px] font-medium hover:text-brand">
                    {lesson.title}
                  </Link>
                  <ul className="list-disc pl-4 mt-1 space-y-0.5">
                    {lesson.reviewSummaryPoints.slice(0, 3).map((point, i) => (
                      <li key={i} className="text-[11.5px] text-foreground-muted">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        ))}
      </section>
    </main>
  );
}
