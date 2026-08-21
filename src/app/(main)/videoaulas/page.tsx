"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, MonitorPlay, Video } from "lucide-react";
import { VIDEO_LESSONS, VIDEO_COUNT_BY_SUBJECT } from "@/content/videos";
import { ALL_LESSONS } from "@/content/lessons";
import { SUBJECTS } from "@/content/curriculum";
import { YouTubePlayer, WatchOnYouTubeLink } from "@/components/video/YouTubePlayer";
import { SlidePlayer } from "@/components/video/SlidePlayer";
import { buildSlides } from "@/lib/slides/buildSlides";
import { PageHeader } from "@/components/ui/PageHeader";

type Tab = "youtube" | "microaulas";

const PAGE_SIZE = 12;

export default function VideoaulasPage() {
  const [tab, setTab] = useState<Tab>("youtube");
  const [subjectFilter, setSubjectFilter] = useState("todas");
  const [codeFilter, setCodeFilter] = useState("todos");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [microaulaSlug, setMicroaulaSlug] = useState(ALL_LESSONS[0]?.slug ?? "");

  const filteredVideos = useMemo(() => {
    let list = subjectFilter === "todas" ? VIDEO_LESSONS : VIDEO_LESSONS.filter((v) => v.subjectSlug === subjectFilter);
    if (codeFilter !== "todos") list = list.filter((v) => v.syllabusCodes.includes(codeFilter));
    return list;
  }, [subjectFilter, codeFilter]);

  /** Códigos do edital disponíveis dentro da disciplina escolhida, ordenados. */
  const availableCodes = useMemo(() => {
    const base = subjectFilter === "todas" ? VIDEO_LESSONS : VIDEO_LESSONS.filter((v) => v.subjectSlug === subjectFilter);
    return [...new Set(base.flatMap((v) => v.syllabusCodes))].sort((a, b) => {
      const [pa, na] = a.split("-");
      const [pb, nb] = b.split("-");
      return pa === pb ? parseInt(na) - parseInt(nb) : pa.localeCompare(pb);
    });
  }, [subjectFilter]);

  const visibleVideos = filteredVideos.slice(0, visibleCount);

  const filteredLessons = useMemo(
    () => (subjectFilter === "todas" ? ALL_LESSONS : ALL_LESSONS.filter((l) => l.subjectSlug === subjectFilter)),
    [subjectFilter],
  );

  const microaula = ALL_LESSONS.find((l) => l.slug === microaulaSlug);
  const slides = useMemo(() => (microaula ? buildSlides(microaula) : []), [microaula]);

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
      <PageHeader
        eyebrow="Videoaulas"
        title="Assista sem sair do Transpetro Estudos"
        description={`${VIDEO_LESSONS.length} videoaulas públicas do YouTube tocam aqui dentro, cobrindo os 39 códigos do edital, e as ${ALL_LESSONS.length} aulas do curso viram microaulas em slides narrados.`}
      />

      <div className="flex gap-1.5 mb-5 p-1 bg-surface-muted rounded-lg w-fit">
        <button
          type="button"
          onClick={() => setTab("youtube")}
          className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
            tab === "youtube" ? "bg-surface text-foreground shadow-sm" : "text-foreground-muted hover:text-foreground"
          }`}
        >
          <Video size={15} aria-hidden />
          Do YouTube ({VIDEO_LESSONS.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("microaulas")}
          className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
            tab === "microaulas" ? "bg-surface text-foreground shadow-sm" : "text-foreground-muted hover:text-foreground"
          }`}
        >
          <MonitorPlay size={15} aria-hidden />
          Microaulas Transpetro Estudos ({ALL_LESSONS.length})
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <select
          value={subjectFilter}
          onChange={(e) => {
            setSubjectFilter(e.target.value);
            setCodeFilter("todos");
            setVisibleCount(PAGE_SIZE);
          }}
          aria-label="Filtrar por disciplina"
          className="rounded-lg border border-border bg-surface px-3 py-2 text-xs"
        >
          <option value="todas">Todas as disciplinas</option>
          {SUBJECTS.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name} ({tab === "youtube" ? (VIDEO_COUNT_BY_SUBJECT[s.slug] ?? 0) : ALL_LESSONS.filter((l) => l.subjectSlug === s.slug).length})
            </option>
          ))}
        </select>

        {tab === "youtube" && (
          <select
            value={codeFilter}
            onChange={(e) => {
              setCodeFilter(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            aria-label="Filtrar por item do edital"
            className="rounded-lg border border-border bg-surface px-3 py-2 text-xs"
          >
            <option value="todos">Todos os itens do edital</option>
            {availableCodes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
      </div>

      {tab === "youtube" ? (
        <>
          <div className="flex items-center justify-between mb-4 gap-3">
            <p className="text-[11px] text-foreground-muted">
              Player oficial do YouTube em modo de privacidade reforçada. Cada visualização conta para o canal de
              origem. Todos os links verificados em 07/08/2026.
            </p>
            <span className="chip bg-surface-muted text-foreground-muted shrink-0">{filteredVideos.length} vídeos</span>
          </div>

          {filteredVideos.length === 0 ? (
            <div className="card p-6 text-center text-sm text-foreground-muted">
              Ainda não há vídeo curado para este filtro.
            </div>
          ) : (
            <div className="space-y-6">
              {visibleVideos.map((video) => {
                const subject = SUBJECTS.find((s) => s.slug === video.subjectSlug);
                return (
                  <article key={video.id}>
                    <YouTubePlayer youtubeId={video.youtubeId} title={video.title} channel={video.channel} />
                    <div className="mt-2.5">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                        {subject && (
                          <span className="chip" style={{ backgroundColor: `${subject.color}1a`, color: subject.color }}>
                            {subject.name}
                          </span>
                        )}
                        {video.syllabusCodes.map((c) => (
                          <span key={c} className="chip bg-surface-muted text-foreground-muted">
                            {c}
                          </span>
                        ))}
                      </div>
                      <p className="text-[13px] text-foreground-muted mb-1.5">{video.justification}</p>
                      <WatchOnYouTubeLink youtubeId={video.youtubeId} />
                    </div>
                  </article>
                );
              })}

              {visibleCount < filteredVideos.length && (
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="w-full rounded-lg border border-border py-2.5 text-sm font-medium hover:bg-surface-muted transition-colors"
                >
                  Carregar mais ({filteredVideos.length - visibleCount} restantes)
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mb-4">
            <label htmlFor="microaula" className="block text-xs font-medium mb-1.5">
              Escolha a microaula
            </label>
            <select
              id="microaula"
              value={microaulaSlug}
              onChange={(e) => setMicroaulaSlug(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
            >
              {filteredLessons.map((l) => (
                <option key={l.slug} value={l.slug}>
                  {l.title}
                </option>
              ))}
            </select>
          </div>

          {microaula && slides.length > 0 && (
            <>
              <SlidePlayer slides={slides} title={microaula.title} />
              <Link
                href={`/curso/${microaula.slug}`}
                className="mt-4 flex items-center justify-center gap-1.5 text-[13px] font-medium text-brand hover:underline"
              >
                <BookOpen size={14} aria-hidden />
                Abrir a aula completa com questões
              </Link>
            </>
          )}
        </>
      )}
    </main>
  );
}
