"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Radar, TriangleAlert } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ALL_QUESTIONS } from "@/content/questions";
import { SUBJECTS } from "@/content/curriculum";

/** Amostra mínima pra tratar uma tendência como sequer digna de exibir — abaixo disso, a
 * variação de contagem ano a ano é só ruído de quantas questões catalogamos, não sinal real
 * de mudança de peso da banca. Documentado explicitamente na tela (mission: nunca apresentar
 * tendência como certeza com pouco dado). */
const MIN_QUESTIONS_FOR_TREND = 5;
const MIN_PROVAS_FOR_TREND = 3;

export default function RadarBancaPage() {
  const bySubject = useMemo(() => {
    const real = ALL_QUESTIONS.filter((q) => q.source.origin === "real" && q.source.ano);
    return SUBJECTS.map((subject) => {
      const questions = real.filter((q) => q.subjectSlug === subject.slug);
      const byYear = new Map<number, number>();
      const provas = new Set<string>();
      for (const q of questions) {
        const ano = q.source.ano!;
        byYear.set(ano, (byYear.get(ano) ?? 0) + 1);
        provas.add(`${q.source.orgao ?? "?"}-${ano}`);
      }
      const years = [...byYear.entries()].sort((a, b) => a[0] - b[0]);
      const bancas = [...new Set(questions.map((q) => q.source.banca).filter(Boolean))];
      return {
        subject,
        totalQuestions: questions.length,
        provasCount: provas.size,
        years,
        bancas,
        reliable: questions.length >= MIN_QUESTIONS_FOR_TREND && provas.size >= MIN_PROVAS_FOR_TREND,
      };
    });
  }, []);

  const maxCount = Math.max(1, ...bySubject.flatMap((s) => s.years.map(([, c]) => c)));

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <Link href="/laboratorio" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
        <ArrowLeft size={14} aria-hidden /> Laboratório
      </Link>

      <PageHeader
        eyebrow="Laboratório · tendência da banca"
        title="Radar de tendência da banca"
        description="Quantas questões REAIS catalogadas de cada disciplina, por ano de prova — não é uma previsão, é a contagem do que já foi cobrado nas provas que temos catalogadas."
      />

      <div className="space-y-4">
        {bySubject.map(({ subject, totalQuestions, provasCount, years, bancas, reliable }) => (
          <section key={subject.slug} className="card p-4">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="chip" style={{ backgroundColor: `${subject.color}1a`, color: subject.color }}>
                {subject.name}
              </span>
              <span className="text-[11px] text-foreground-muted">
                {totalQuestions} questões reais · {provasCount} prova{provasCount === 1 ? "" : "s"}
              </span>
            </div>

            {totalQuestions === 0 ? (
              <p className="text-[12.5px] text-foreground-muted mt-2">Sem questões reais catalogadas ainda para esta disciplina.</p>
            ) : (
              <>
                {!reliable && (
                  <p className="flex items-start gap-1.5 text-[11.5px] text-warning mt-2 mb-2">
                    <TriangleAlert size={13} className="shrink-0 mt-0.5" aria-hidden />
                    Amostra pequena ({totalQuestions} questões, {provasCount} prova{provasCount === 1 ? "" : "s"}) — não dá pra falar em
                    tendência confiável ainda, só mostrar o que já foi catalogado.
                  </p>
                )}
                <div className="flex items-end gap-2 mt-3 h-24">
                  {years.map(([year, count]) => (
                    <div key={year} className="flex-1 flex flex-col items-center justify-end gap-1">
                      <span className="text-[10px] text-foreground-muted">{count}</span>
                      <div
                        className="w-full rounded-t"
                        style={{
                          height: `${Math.max(6, (count / maxCount) * 80)}px`,
                          backgroundColor: reliable ? subject.color : "var(--foreground-subtle)",
                          opacity: reliable ? 0.85 : 0.4,
                        }}
                      />
                      <span className="text-[10px] text-foreground-subtle">{year}</span>
                    </div>
                  ))}
                </div>
                {bancas.length > 0 && (
                  <p className="text-[11px] text-foreground-subtle mt-2">Bancas: {bancas.join(", ")}</p>
                )}
              </>
            )}
          </section>
        ))}
      </div>

      <p className="mt-5 flex items-start gap-1.5 text-[11px] text-foreground-muted">
        <Radar size={13} className="shrink-0 mt-0.5" aria-hidden />
        Baseado só nas questões reais já catalogadas em entregas/acervo_questoes_reais/ — não é uma
        garantia do que vai cair na sua prova.
      </p>
    </main>
  );
}
