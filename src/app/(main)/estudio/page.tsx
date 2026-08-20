"use client";

import { useState } from "react";
import { Download, ExternalLink, Info, Volume2, Square } from "lucide-react";
import { ALL_LESSONS } from "@/content/lessons";
import { PageHeader } from "@/components/ui/PageHeader";

export default function EstudioPage() {
  const [selectedSlug, setSelectedSlug] = useState(ALL_LESSONS[0]?.slug ?? "");
  const [speaking, setSpeaking] = useState(false);

  const lesson = ALL_LESSONS.find((l) => l.slug === selectedSlug);

  function speak() {
    if (!lesson || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `${lesson.title}. ${lesson.learningObjective}. ${lesson.bodyMdx.replace(/\*\*/g, "")}`,
    );
    utterance.lang = "pt-BR";
    utterance.rate = 1;
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }

  function stopSpeaking() {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  function downloadNotebookPackage() {
    if (!lesson) return;
    const content = [
      `# Pacote NotebookLM — ${lesson.title}`,
      "",
      `## Item do edital`,
      lesson.syllabusCodes.join(", "),
      "",
      `## Objetivo de aprendizagem`,
      lesson.learningObjective,
      "",
      `## Conteúdo da aula`,
      lesson.bodyMdx,
      "",
      `## O que memorizar`,
      ...lesson.mustMemorize.map((m) => `- ${m}`),
      "",
      `## Pegadinhas`,
      ...lesson.commonMistakes.map((m) => `- ${m}`),
      "",
      `## Resumo de revisão`,
      ...lesson.reviewSummaryPoints.map((m) => `- ${m}`),
      "",
      `## Fontes`,
      ...lesson.legalReferences.map((r) => `- ${r.title}${r.url ? ` (${r.url})` : ""}`),
      "",
      "---",
      "",
      "## INSTRUÇÕES DE USO NO NOTEBOOKLM",
      "",
      "1. Acesse https://notebooklm.google.com e crie um novo notebook.",
      "2. Clique em 'Adicionar fonte' e envie este arquivo .md.",
      "3. Com a fonte carregada, você pode gerar:",
      "   - Audio Overview (podcast em áudio com dois apresentadores discutindo o tema);",
      "   - Video Overview (apresentação narrada);",
      "   - Mapa mental do conteúdo;",
      "   - Flashcards e quiz automáticos.",
      "4. Perguntas sugeridas para fazer ao NotebookLM sobre esta fonte:",
      ...lesson.flashcards.map((f) => `   - ${f.front}`),
      "",
      "OBSERVAÇÃO: o Transpetro Estudos não se integra automaticamente ao NotebookLM.",
      "Este é um pacote de exportação manual — você faz o upload da fonte.",
    ].join("\n");

    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `notebooklm-${lesson.slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <PageHeader
        eyebrow="Estúdio de conteúdo"
        title="Transforme uma aula em outros formatos"
        description="Tudo aqui funciona sem nenhuma chave de API paga, usando recursos do próprio navegador e exportação manual."
      />

      <div className="card p-4 mb-5 border-l-4 border-l-brand">
        <p className="flex items-start gap-2 text-[13px] text-foreground-muted">
          <Info size={15} className="text-brand shrink-0 mt-0.5" aria-hidden />
          <span>
            O Transpetro Estudos <strong className="text-foreground">não gera vídeo nem arquivo de áudio</strong> por conta própria.
            A leitura em voz alta usa a síntese de fala do navegador (não gera arquivo), e o pacote NotebookLM é uma
            exportação que você envia manualmente. Nenhuma integração automática é prometida aqui.
          </span>
        </p>
      </div>

      <div className="mb-5">
        <label htmlFor="lesson" className="block text-xs font-medium mb-1.5">
          Escolha a aula
        </label>
        <select
          id="lesson"
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
        >
          {ALL_LESSONS.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <section className="card p-4">
          <h2 className="font-semibold text-[14px] mb-1">Ouvir a aula (voz do navegador)</h2>
          <p className="text-xs text-foreground-muted mb-3">
            Usa a Web Speech API. Funciona offline e sem custo, mas não gera um arquivo para baixar.
          </p>
          {speaking ? (
            <button
              type="button"
              onClick={stopSpeaking}
              className="flex items-center gap-2 rounded-lg border border-danger text-danger px-3 py-2 text-xs font-medium hover:bg-danger-soft"
            >
              <Square size={14} aria-hidden />
              Parar leitura
            </button>
          ) : (
            <button
              type="button"
              onClick={speak}
              className="flex items-center gap-2 rounded-lg bg-brand text-brand-foreground px-3 py-2 text-xs font-medium hover:opacity-90"
            >
              <Volume2 size={14} aria-hidden />
              Ouvir esta aula
            </button>
          )}
        </section>

        <section className="card p-4">
          <h2 className="font-semibold text-[14px] mb-1">Pacote para NotebookLM</h2>
          <p className="text-xs text-foreground-muted mb-3">
            Baixa um arquivo .md com a aula formatada como fonte, mais instruções para gerar Audio Overview, Video
            Overview, mapa mental e quiz dentro do NotebookLM.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={downloadNotebookPackage}
              className="flex items-center gap-2 rounded-lg bg-brand text-brand-foreground px-3 py-2 text-xs font-medium hover:opacity-90"
            >
              <Download size={14} aria-hidden />
              Baixar pacote
            </button>
            <a
              href="https://notebooklm.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-surface-muted"
            >
              Abrir NotebookLM
              <ExternalLink size={12} aria-hidden />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
