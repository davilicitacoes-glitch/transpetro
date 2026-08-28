"use client";

import { Headphones, Mic2, GraduationCap } from "lucide-react";
import { ESTUCAST_EPISODES } from "@/content/estucast";
import { PageHeader } from "@/components/ui/PageHeader";

const FORMAT_LABEL: Record<string, { label: string; icon: typeof GraduationCap; className: string }> = {
  aula: { label: "Aula com a professora", icon: GraduationCap, className: "bg-brand-soft text-brand" },
  podcast: { label: "Discussão em podcast", icon: Mic2, className: "bg-warning-soft text-warning" },
};

export default function EstucastPage() {
  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
      <PageHeader
        eyebrow="Estucast · piloto de teste"
        title="Aulas em áudio"
        description="Formato experimental: o mesmo conteúdo do curso narrado em áudio, em dois estilos — aula direta com a professora e discussão em podcast. Ainda cobrindo só 1 código do edital, como teste."
      />

      <div className="mb-5 rounded-lg border border-warning/30 bg-warning-soft p-3 text-[12px] text-foreground">
        <strong>Piloto em teste.</strong> Estes 2 áudios foram gerados como amostra (piloto v03) pra validar o formato
        antes de decidir se o Estucast cobre o edital inteiro. Áudios grandes (24–29 MB) — o carregamento pode levar
        alguns segundos dependendo da conexão.
      </div>

      <div className="space-y-5">
        {ESTUCAST_EPISODES.map((ep) => {
          const format = FORMAT_LABEL[ep.format];
          const Icon = format.icon;
          return (
            <article key={ep.id} className="card p-4">
              <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                <span className={`chip ${format.className}`}>
                  <Icon size={11} aria-hidden />
                  {format.label}
                </span>
                {ep.syllabusCodes.map((c) => (
                  <span key={c} className="chip bg-surface-muted text-foreground-muted">
                    {c}
                  </span>
                ))}
                <span className="chip bg-surface-muted text-foreground-muted ml-auto">~{ep.approxSizeMb} MB</span>
              </div>

              <h2 className="text-[15px] font-semibold mb-1">{ep.title}</h2>
              <p className="text-[13px] text-foreground-muted mb-3">{ep.description}</p>

              <audio controls preload="none" className="w-full" src={ep.audioSrc}>
                Seu navegador não suporta áudio HTML5.{" "}
                <a href={ep.audioSrc} className="text-brand underline">
                  Baixar o arquivo
                </a>
                .
              </audio>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex items-start gap-2 text-[12px] text-foreground-muted">
        <Headphones size={14} className="shrink-0 mt-0.5" aria-hidden />
        <p>
          O Estucast é uma aba independente de &quot;Meu Curso&quot; — testar aqui não altera seu cronograma nem sua
          jornada diária.
        </p>
      </div>
    </main>
  );
}
