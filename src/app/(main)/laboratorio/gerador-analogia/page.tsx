"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Info, Shuffle } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/ui/PageHeader";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { ALL_QUESTIONS } from "@/content/questions";
import { SUBJECTS } from "@/content/curriculum";
import { generateAnalogyQuestion, type AnalogyResult } from "@/lib/lab/analogyGenerator";
import { recordAttempt } from "@/lib/pedagogy/service";
import { newIdempotencyKey } from "@/lib/pedagogy/ids";

/** Só questões REAIS com algum termo de cenário genérico variável entram no sorteio — o resto é
 * puramente conceitual/definicional e não tem nada honesto pra "variar" (ver
 * src/lib/lab/analogyGenerator.ts). */
const VARIABLE_REAL_QUESTIONS = ALL_QUESTIONS.filter((q) => q.source.origin === "real" && generateAnalogyQuestion(q) !== null);

export default function GeradorAnalogiaPage() {
  const [subjectFilter, setSubjectFilter] = useState("todas");
  const [result, setResult] = useState<AnalogyResult | null>(null);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [revealed, setRevealed] = useState(false);

  const pool = useMemo(
    () => (subjectFilter === "todas" ? VARIABLE_REAL_QUESTIONS : VARIABLE_REAL_QUESTIONS.filter((q) => q.subjectSlug === subjectFilter)),
    [subjectFilter],
  );

  function generate() {
    if (pool.length === 0) return;
    const source = pool[Math.floor(Math.random() * pool.length)];
    const generated = generateAnalogyQuestion(source);
    setResult(generated);
    setSelected(undefined);
    setRevealed(false);
  }

  function handleSelect(key: string) {
    if (!result || revealed) return;
    setSelected(key);
    setRevealed(true);
    const correctKey = result.question.options.find((o) => o.isCorrect)?.key;
    const isCorrect = correctKey === key;
    // Grava a tentativa contra a questão REAL de origem — o texto mudou (nome/cenário), mas a
    // regra testada e a alternativa correta são as mesmas, então conta pro mesmo tópico no Motor 1
    // e no Caderno de Erros, em vez de ficar solta sem ligação com a fundação pedagógica real.
    void recordAttempt({
      questionId: result.sourceQuestionId,
      selectedKey: key as "A" | "B" | "C" | "D" | "E",
      correctKey: correctKey as "A" | "B" | "C" | "D" | "E" | undefined,
      isCorrect,
      mode: "treino",
      activityId: "laboratorio-gerador-analogia",
      questionOrigin: "adaptada",
      idempotencyKey: newIdempotencyKey(),
    });
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <Link href="/laboratorio" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
        <ArrowLeft size={14} aria-hidden /> Laboratório
      </Link>

      <PageHeader
        eyebrow="Laboratório · questão por analogia"
        title="Questão por analogia"
        description="Pega uma questão REAL de prova e varia só o cenário (nome da empresa/cargo, por exemplo), mantendo a mesma regra testada e a mesma resposta correta."
      />

      <div className="mb-4 flex items-start gap-2 rounded-lg bg-brand-soft p-3 text-[11.5px] text-foreground">
        <Info size={14} className="text-brand shrink-0 mt-0.5" aria-hidden />
        <p>
          Só varia questões que têm um cenário narrativo genérico (ex.: &quot;uma empresa...&quot;) — a
          maioria do acervo real é conceitual/definicional e não tem o que variar com segurança, sem
          arriscar mudar o sentido. {VARIABLE_REAL_QUESTIONS.length} questões reais no acervo servem
          de base hoje.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-xs"
          aria-label="Filtrar por disciplina"
        >
          <option value="todas">Todas as disciplinas ({VARIABLE_REAL_QUESTIONS.length})</option>
          {SUBJECTS.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name} ({VARIABLE_REAL_QUESTIONS.filter((q) => q.subjectSlug === s.slug).length})
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={generate}
          disabled={pool.length === 0}
          className="flex items-center gap-1.5 rounded-lg bg-brand text-brand-foreground px-3 py-2 text-xs font-medium hover:opacity-90 disabled:opacity-50"
        >
          <Shuffle size={13} aria-hidden />
          Gerar questão
        </button>
      </div>

      {pool.length === 0 ? (
        <EmptyState
          icon={Shuffle}
          title="Nenhuma questão variável nesta disciplina"
          description="Ainda não há, no acervo real desta disciplina, uma questão com cenário narrativo seguro pra variar."
        />
      ) : result ? (
        <>
          <div className="mb-2.5 rounded-lg border border-warning/30 bg-warning-soft px-3 py-2 text-[11.5px] text-foreground">
            <strong>Questão inédita</strong>, baseada na questão real nº{" "}
            <code className="text-[10.5px]">{result.sourceQuestionId}</code> — não é uma questão oficial de prova.
          </div>
          <QuestionCard question={result.question} selected={selected} onSelect={handleSelect} revealed={revealed} showLessonLink />
        </>
      ) : (
        <div className="card p-6 text-center text-sm text-foreground-muted">Clique em &quot;Gerar questão&quot; pra começar.</div>
      )}
    </main>
  );
}
