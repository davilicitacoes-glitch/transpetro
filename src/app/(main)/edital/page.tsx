"use client";

import { useMemo } from "react";
import Link from "next/link";
import { CheckCircle2, ExternalLink, AlertTriangle } from "lucide-react";
import { TOPICS, MODULES, SUBJECTS } from "@/content/curriculum";
import { ALL_LESSONS } from "@/content/lessons";
import { EXAM_BLUEPRINT, EXAM_DATE, OBJECTIVE_TOTAL_POINTS, ESSAY_TOTAL_POINTS, HAS_ESSAY_STAGE } from "@config/concurso";
import { formatDateBR } from "@/lib/schedule/dates";
import { PageHeader } from "@/components/ui/PageHeader";

/**
 * PENDENTE — Fase 2: substituir por fontes oficiais reais do Edital nº 3/2026 (Fundação Cesgranrio)
 * assim que o PDF for lido linha a linha. Nenhuma URL foi inventada; lista vazia até confirmação.
 */
const OFFICIAL_SOURCES: { title: string; url: string; note: string }[] = [];

export default function EditalPage() {
  const coverage = useMemo(() => {
    const countByCode = new Map<string, number>();
    for (const lesson of ALL_LESSONS) {
      for (const code of lesson.syllabusCodes) {
        countByCode.set(code, (countByCode.get(code) ?? 0) + 1);
      }
    }
    const allCodes = [...new Set(TOPICS.flatMap((t) => t.syllabusCodes))];
    return {
      countByCode,
      allCodes,
      withThreePlus: allCodes.filter((c) => (countByCode.get(c) ?? 0) >= 3).length,
      withNone: allCodes.filter((c) => (countByCode.get(c) ?? 0) === 0).length,
      total: allCodes.length,
    };
  }, []);

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
      <PageHeader
        eyebrow="Edital verticalizado"
        title="Cobertura do conteúdo programático"
        description={`Cada item do Anexo IV rastreado até a aula que o cobre. Prova em ${formatDateBR(EXAM_DATE)}.`}
      />

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card p-3 text-center">
          <p className="text-[22px] font-bold leading-none">{coverage.total}</p>
          <p className="text-[11px] text-foreground-muted mt-1">itens do edital</p>
        </div>
        <div className="card p-3 text-center">
          <p className="text-[22px] font-bold leading-none text-success">{coverage.withThreePlus}</p>
          <p className="text-[11px] text-foreground-muted mt-1">com 3+ aulas</p>
        </div>
        <div className="card p-3 text-center">
          <p className={`text-[22px] font-bold leading-none ${coverage.withNone > 0 ? "text-danger" : "text-success"}`}>
            {coverage.withNone}
          </p>
          <p className="text-[11px] text-foreground-muted mt-1">sem aula</p>
        </div>
      </div>

      <section className="card p-5 mb-5">
        <h2 className="font-semibold text-[14px] mb-3">Estrutura oficial da prova</h2>
        <ul className="space-y-1.5 text-[13px]">
          {EXAM_BLUEPRINT.map((s) => (
            <li key={s.id} className="flex justify-between border-b border-border/50 pb-1.5 last:border-0">
              <span className="text-foreground-muted">
                {s.name} — {s.questionCount} questões × {s.pointsPerQuestion} pt
              </span>
              <span className="font-semibold shrink-0">{s.totalPoints} pts</span>
            </li>
          ))}
          <li className="flex justify-between font-semibold pt-1">
            <span>Objetiva</span>
            <span>{OBJECTIVE_TOTAL_POINTS} pts</span>
          </li>
          {HAS_ESSAY_STAGE && (
            <li className="flex justify-between font-semibold">
              <span>Redação</span>
              <span>{ESSAY_TOTAL_POINTS} pts</span>
            </li>
          )}
        </ul>
        {!HAS_ESSAY_STAGE && (
          <p className="text-[11.5px] text-foreground-muted mt-2.5">
            Este edital não tem etapa de redação — a prova é só objetiva.
          </p>
        )}
      </section>

      {SUBJECTS.filter((s) => s.slug !== "redacao").map((subject) => {
        const modules = MODULES.filter((m) => m.subjectSlug === subject.slug);
        const subjectTopics = TOPICS.filter((t) => modules.some((m) => m.slug === t.moduleSlug));
        if (subjectTopics.length === 0) return null;

        return (
          <section key={subject.slug} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: subject.color }} aria-hidden />
              <h2 className="font-semibold text-[15px]">{subject.name}</h2>
            </div>
            <ul className="space-y-1.5">
              {subjectTopics.map((topic) => {
                const lessons = ALL_LESSONS.filter((l) => l.syllabusCodes.some((c) => topic.syllabusCodes.includes(c)));
                const count = lessons.length;
                return (
                  <li key={topic.slug} className="card p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium">{topic.name}</p>
                        <p className="text-[11px] text-foreground-muted mt-0.5">{topic.syllabusCodes.join(" · ")}</p>
                      </div>
                      <span
                        className={`chip shrink-0 ${
                          count >= 3 ? "bg-success-soft text-success" : count > 0 ? "bg-warning-soft text-warning" : "bg-danger-soft text-danger"
                        }`}
                      >
                        {count >= 3 ? <CheckCircle2 size={11} aria-hidden /> : <AlertTriangle size={11} aria-hidden />}
                        {count} {count === 1 ? "aula" : "aulas"}
                      </span>
                    </div>
                    {lessons.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {lessons.slice(0, 4).map((l) => (
                          <Link
                            key={l.slug}
                            href={`/curso/${l.slug}`}
                            className="text-[11px] text-brand hover:underline bg-brand-soft rounded px-2 py-0.5"
                          >
                            {l.title.length > 40 ? `${l.title.slice(0, 40)}…` : l.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      {OFFICIAL_SOURCES.length > 0 && (
        <section className="card p-5">
          <h2 className="font-semibold text-[14px] mb-3">Fontes oficiais consultadas</h2>
          <ul className="space-y-2.5">
            {OFFICIAL_SOURCES.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-brand hover:underline inline-flex items-center gap-1"
                >
                  {s.title}
                  <ExternalLink size={12} aria-hidden />
                </a>
                <p className="text-[11px] text-foreground-muted mt-0.5">{s.note}</p>
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-foreground-subtle mt-3">Consultadas em 06/08/2026.</p>
        </section>
      )}
    </main>
  );
}
