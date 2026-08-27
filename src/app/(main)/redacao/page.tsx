"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, FileText, Printer, Save } from "lucide-react";
import { ESSAY_PROMPTS, type EssayPromptContent } from "@/content/essays/prompts";
import { ESSAY_MAX_LINES, ESSAY_MIN_LINES, ESSAY_RUBRIC, ESSAY_TOTAL_POINTS, ESSAY_MIN_PASSING_POINTS, HAS_ESSAY_STAGE } from "@config/concurso";
import { PageHeader } from "@/components/ui/PageHeader";
import { recordEssaySubmission, startOrResumeSession } from "@/lib/pedagogy/service";

/** Estimativa de linhas manuscritas: a folha oficial comporta ~85 caracteres por linha. */
const CHARS_PER_LINE = 85;

export default function RedacaoPage() {
  const [selected, setSelected] = useState<EssayPromptContent | null>(null);
  const [text, setText] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [lastSubmissionId, setLastSubmissionId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    if (!selected) return;
    setText("");
    setLastSubmissionId(null);
    setSavedAt(null);
    (async () => {
      const session = await startOrResumeSession("redacao", selected.id);
      setSessionId(session.id);
    })();
  }, [selected]);

  const lineCount = useMemo(() => {
    if (!text.trim()) return 0;
    return text
      .split(/\n/)
      .reduce((sum, paragraph) => sum + Math.max(1, Math.ceil(paragraph.length / CHARS_PER_LINE)), 0);
  }, [text]);

  const withinRange = lineCount >= ESSAY_MIN_LINES && lineCount <= ESSAY_MAX_LINES;

  async function saveDraft() {
    if (!selected || !text.trim() || saving) return;
    setSaving(true);
    const submission = await recordEssaySubmission({
      essayPromptId: selected.id,
      lineCount,
      content: text,
      previousVersionId: lastSubmissionId ?? undefined,
      sessionId: sessionId ?? undefined,
    });
    setLastSubmissionId(submission.id);
    setSavedAt(Date.now());
    setSaving(false);
  }

  if (!selected) {
    return (
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
        <PageHeader
          eyebrow="Redação"
          title={`${ESSAY_PROMPTS.length} propostas de treino`}
          description={
            HAS_ESSAY_STAGE
              ? `Dissertativo-argumentativa, de ${ESSAY_MIN_LINES} a ${ESSAY_MAX_LINES} linhas, valendo ${ESSAY_TOTAL_POINTS} pontos (mínimo ${ESSAY_MIN_PASSING_POINTS}). Propostas inéditas Transpetro Estudos — não são previsão do tema real.`
              : "Propostas inéditas Transpetro Estudos, para treinar argumentação e escrita — não são previsão de tema real."
          }
        />

        {!HAS_ESSAY_STAGE && (
          <div className="card p-3.5 mb-5 border-brand/30 bg-brand-soft/30 text-[12.5px]">
            O Edital nº 03/2026.3 da Transpetro <strong>não tem etapa de redação</strong> — a prova é só objetiva. Este
            espaço é um treino extra opcional (não vale nota na prova), útil pra fixar conteúdo e treinar argumentação.
          </div>
        )}

        {HAS_ESSAY_STAGE && ESSAY_RUBRIC.length > 0 && (
          <section className="card p-5 mb-5">
            <h2 className="font-semibold text-[14px] mb-3">Rubrica oficial de correção</h2>
            <ul className="space-y-1.5">
              {ESSAY_RUBRIC.map((c) => (
                <li key={c.id} className="flex justify-between text-[13px] border-b border-border/50 pb-1.5 last:border-0">
                  <span className="text-foreground-muted pr-3">{c.name}</span>
                  <span className="font-semibold shrink-0">{c.maxPoints} pts</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="space-y-3">
          {ESSAY_PROMPTS.map((prompt, i) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => setSelected(prompt)}
              className="card p-4 w-full text-left hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="chip bg-brand-soft text-brand">Proposta {i + 1}</span>
                <span className="chip bg-surface-muted text-foreground-muted">Inédita Transpetro Estudos</span>
              </div>
              <p className="font-semibold text-[14px] mb-1">{prompt.title}</p>
              <p className="text-xs text-foreground-muted line-clamp-2">{prompt.themeText}</p>
            </button>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
      <button
        type="button"
        onClick={() => setSelected(null)}
        className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4"
      >
        <ArrowLeft size={14} aria-hidden /> Todas as propostas
      </button>

      <h1 className="text-[22px] font-bold tracking-tight mb-3">{selected.title}</h1>

      <section className="card p-5 mb-4">
        <h2 className="font-semibold text-[13px] mb-2 flex items-center gap-2">
          <FileText size={15} className="text-brand" aria-hidden />
          Proposta
        </h2>
        <p className="text-[13.5px] leading-relaxed mb-4">{selected.themeText}</p>

        <div className="space-y-2.5">
          {selected.supportingTexts.map((t, i) => (
            <p key={i} className="text-[12.5px] leading-relaxed text-foreground-muted border-l-2 border-border-strong pl-3">
              {t}
            </p>
          ))}
        </div>
      </section>

      <section className="card p-5 mb-4">
        <h2 className="font-semibold text-[13px] mb-2">Roteiro sugerido (checklist de autocorreção)</h2>
        <ul className="list-disc pl-5 space-y-1 text-[13px] text-foreground-muted">
          {selected.suggestedApproach.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      {(selected.repertoire?.length || selected.highScoreModel || selected.modelComment) && (
        <section className="card p-5 mb-4 space-y-4">
          {selected.repertoire && selected.repertoire.length > 0 && <div><h2 className="font-semibold text-[13px] mb-2">Repertório seguro sugerido</h2><ul className="list-disc pl-5 text-[13px] text-foreground-muted space-y-1">{selected.repertoire.map((item) => <li key={item}>{item}</li>)}</ul></div>}
          {selected.highScoreModel && <details><summary className="cursor-pointer font-semibold text-[13px]">Ver modelo de nota alta (depois de escrever)</summary><p className="mt-3 whitespace-pre-line text-[13px] leading-relaxed text-foreground-muted">{selected.highScoreModel}</p></details>}
          {selected.modelComment && <details><summary className="cursor-pointer font-semibold text-[13px]">Ver comentário do modelo pelos cinco critérios</summary><p className="mt-3 text-[13px] leading-relaxed text-foreground-muted">{selected.modelComment}</p></details>}
        </section>
      )}

      <section className="card p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[13px]">Sua redação</h2>
          <span
            className={`chip ${
              lineCount === 0
                ? "bg-surface-muted text-foreground-muted"
                : !HAS_ESSAY_STAGE
                  ? "bg-brand-soft text-brand"
                  : withinRange
                    ? "bg-success-soft text-success"
                    : "bg-danger-soft text-danger"
            }`}
          >
            ~{lineCount} linhas
            {HAS_ESSAY_STAGE && lineCount > 0 && !withinRange && (lineCount < ESSAY_MIN_LINES ? " · curta demais" : " · longa demais")}
          </span>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={16}
          placeholder="Escreva aqui para treinar sua argumentação e escrita."
          aria-label="Texto da redação"
          className="w-full rounded-lg border border-border bg-surface-muted px-3.5 py-3 text-[13.5px] leading-[1.9] resize-y"
        />

        <p className="text-[11px] text-foreground-muted mt-2">
          {HAS_ESSAY_STAGE
            ? `A contagem é uma estimativa (${CHARS_PER_LINE} caracteres por linha). Menos de ${ESSAY_MIN_LINES} linhas zera a redação; o que passar de ${ESSAY_MAX_LINES} é desconsiderado.`
            : `A contagem é uma estimativa (${CHARS_PER_LINE} caracteres por linha), só como referência — sem limite oficial, já que este edital não tem etapa de redação.`}
        </p>
      </section>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={saveDraft}
          disabled={!text.trim() || saving}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-brand text-brand-foreground font-medium py-2.5 text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {savedAt && Date.now() - savedAt < 3000 ? <Check size={16} aria-hidden /> : <Save size={16} aria-hidden />}
          {saving ? "Salvando…" : lastSubmissionId ? "Salvar nova versão (reescrita)" : "Salvar esta versão"}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-brand text-brand font-medium py-2.5 text-sm hover:bg-brand-soft transition-colors"
        >
          <Printer size={16} aria-hidden />
          Imprimir folha manuscrita
        </button>
      </div>
      {lastSubmissionId && (
        <p className="text-center text-[11px] text-foreground-muted mt-2">
          Versão salva. A correção por critério (rubrica do edital) chegará em uma etapa futura — por
          enquanto, o texto e a contagem de linhas ficam guardados para você acompanhar sua evolução.
        </p>
      )}
    </main>
  );
}
