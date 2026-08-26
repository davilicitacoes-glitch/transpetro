"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, PlayCircle } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/ui/PageHeader";
import { YouTubePlayer } from "@/components/video/YouTubePlayer";
import { getCourseDay } from "@/lib/course/service";
import { getDeferredComplementaryDays, setComplementaryReviewChoice } from "@/lib/course/service";
import { getComplementaryVideosForDay } from "@/lib/course/complementary";
import { DEFAULT_STUDENT_ID, type CourseDay } from "@/lib/models/schema";
import type { VideoLesson } from "@/content/videos";

interface DeferredDayEntry {
  day: CourseDay;
  videos: VideoLesson[];
}

export default function RevisaoConteudosEstudadosPage() {
  const [entries, setEntries] = useState<DeferredDayEntry[] | null>(null);

  async function load() {
    const days = await getDeferredComplementaryDays(DEFAULT_STUDENT_ID);
    const built = days
      .map((day) => {
        const planDay = getCourseDay(day);
        const videos = getComplementaryVideosForDay(planDay);
        return { day: planDay, videos };
      })
      .filter((e) => e.videos.length > 0);
    setEntries(built);
  }

  useEffect(() => {
    load();
  }, []);

  async function markDone(day: number) {
    await setComplementaryReviewChoice(DEFAULT_STUDENT_ID, day, "feito");
    await load();
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
      <PageHeader
        eyebrow="Meu Curso"
        title="Revisão de Conteúdos Estudados"
        description="Vídeos complementares que você deixou para depois, organizados por dia, na ordem em que foram estudados."
      />

      {entries === null ? (
        <p className="text-sm text-foreground-muted">Carregando…</p>
      ) : entries.length === 0 ? (
        <EmptyState
          icon={PlayCircle}
          title="Nada pendente por aqui"
          description="Quando você escolher 'Prefiro depois' no fechamento de um dia, os vídeos complementares daquele dia aparecem aqui, organizados por ordem de estudo."
        />
      ) : (
        <div className="space-y-4">
          {entries.map(({ day, videos }) => (
            <DayReviewCard key={day.day} day={day} videos={videos} onMarkDone={() => markDone(day.day)} />
          ))}
        </div>
      )}
    </main>
  );
}

function DayReviewCard({ day, videos, onMarkDone }: { day: CourseDay; videos: VideoLesson[]; onMarkDone: () => void }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="card p-5">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="min-w-0">
          <span className="chip bg-brand-soft text-brand mb-1.5 inline-flex">Dia {day.day}</span>
          <h2 className="text-[15px] font-display font-semibold leading-tight">{day.title}</h2>
        </div>
        <Link href={`/meu-curso/dia/${day.day}`} className="text-xs text-brand hover:underline shrink-0">
          Ver dia
        </Link>
      </div>

      <ul className="space-y-2 mb-3">
        {videos.map((v) => {
          const open = openId === v.id;
          return (
            <li key={v.id} className="rounded-lg border border-border p-2.5">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : v.id)}
                className="w-full flex items-center justify-between gap-2 text-left text-sm font-medium"
              >
                <span>{v.title}</span>
                <span className="shrink-0 text-xs text-brand">{open ? "Ocultar" : "Assistir"}</span>
              </button>
              {open && (
                <div className="mt-2">
                  <YouTubePlayer youtubeId={v.youtubeId} title={v.title} channel={v.channel} />
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={onMarkDone}
        className="flex items-center gap-1.5 text-xs font-medium text-foreground-muted hover:text-brand"
      >
        <CheckCircle2 size={14} aria-hidden />
        Marcar como revisado
      </button>
    </section>
  );
}
