"use client";

import { useState } from "react";
import { ChevronDown, GraduationCap, Headphones, Mic2 } from "lucide-react";
import { ESTUCAST_EPISODES, groupEstucastByCompetencia } from "@/content/estucast";
import { TOPICS } from "@/content/curriculum";
import { PageHeader } from "@/components/ui/PageHeader";

const FORMAT_LABEL: Record<string, { label: string; icon: typeof GraduationCap; className: string }> = {
  aula: { label: "Aula com a professora", icon: GraduationCap, className: "bg-brand-soft text-brand" },
  podcast: { label: "Discussão em podcast", icon: Mic2, className: "bg-warning-soft text-warning" },
};

export default function EstucastPage() {
  const competencias = groupEstucastByCompetencia(ESTUCAST_EPISODES);
  const [openTopic, setOpenTopic] = useState<string | null>(competencias[0]?.topicSlug ?? null);

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
      <PageHeader
        eyebrow="Estucast · piloto de teste"
        title="Aulas em áudio, por competência"
        description={`Escolha a competência do edital: clique pra abrir e ouvir a aula narrada e a discussão em podcast daquele tema. Piloto ainda cobre só ${competencias.length} competência${competencias.length === 1 ? "" : "s"}, como teste.`}
      />

      <div className="mb-5 rounded-lg border border-warning/30 bg-warning-soft p-3 text-[12px] text-foreground">
        <strong>Piloto em teste.</strong> Áudios grandes (24–29 MB cada) — o carregamento pode levar alguns segundos.
      </div>

      <div className="space-y-2.5">
        {competencias.map((comp) => {
          const topic = TOPICS.find((t) => t.slug === comp.topicSlug);
          const isOpen = openTopic === comp.topicSlug;
          return (
            <div key={comp.topicSlug} className="card overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenTopic(isOpen ? null : comp.topicSlug)}
                className="w-full flex items-center gap-2.5 p-4 text-left hover:bg-surface-muted transition-colors"
                aria-expanded={isOpen}
              >
                <span className="chip bg-surface-muted text-foreground-muted shrink-0">{comp.syllabusCode}</span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[14px] font-semibold truncate">{topic?.name ?? comp.topicSlug}</span>
                  <span className="block text-[11px] text-foreground-muted mt-0.5">
                    {comp.episodes.length} áudio{comp.episodes.length > 1 ? "s" : ""} disponíve
                    {comp.episodes.length > 1 ? "is" : "l"}
                  </span>
                </span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-foreground-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-4 border-t border-border pt-4 animate-fade-in">
                  {comp.episodes.map((ep) => {
                    const format = FORMAT_LABEL[ep.format];
                    const Icon = format.icon;
                    return (
                      <div key={ep.id}>
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <span className={`chip ${format.className}`}>
                            <Icon size={11} aria-hidden />
                            {format.label}
                          </span>
                          <span className="chip bg-surface-muted text-foreground-muted ml-auto">
                            ~{ep.approxSizeMb} MB
                          </span>
                        </div>
                        <p className="text-[13px] font-medium mb-1">{ep.title}</p>
                        <p className="text-[12px] text-foreground-muted mb-2">{ep.description}</p>
                        <audio controls preload="none" className="w-full" src={ep.audioSrc}>
                          Seu navegador não suporta áudio HTML5.{" "}
                          <a href={ep.audioSrc} className="text-brand underline">
                            Baixar o arquivo
                          </a>
                          .
                        </audio>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-start gap-2 text-[12px] text-foreground-muted">
        <Headphones size={14} className="shrink-0 mt-0.5" aria-hidden />
        <p>
          Estes áudios também aparecem dentro de <strong>Revisões</strong>, quando o flashcard em revisão é da mesma
          competência. O Estucast é uma aba independente de &quot;Meu Curso&quot; — testar aqui não altera seu
          cronograma nem sua jornada diária.
        </p>
      </div>
    </main>
  );
}
