"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Maximize, Play } from "lucide-react";

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement | string, opts: Record<string, unknown>) => YTPlayerInstance;
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayerInstance {
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
}

let apiLoadPromise: Promise<void> | null = null;
function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (apiLoadPromise) return apiLoadPromise;
  apiLoadPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return apiLoadPromise;
}

function positionKey(youtubeId: string): string {
  return `transpetro:video-pos:${youtubeId}`;
}

/**
 * Player do YouTube embutido no Transpetro Estudos, com progresso salvo localmente (retomada exata) e
 * modo tela cheia. Usa youtube-nocookie.com; só carrega o iframe/API após o clique (nunca
 * autoplay com som ao entrar na etapa).
 */
export function YouTubePlayer({
  youtubeId,
  title,
  channel,
  onProgress,
  onCompleted,
}: {
  youtubeId: string;
  title: string;
  channel?: string;
  /** Chamado periodicamente com o percentual assistido (0-100), para o chamador registrar/sincronizar. */
  onProgress?: (percent: number) => void;
  /** Chamado quando o vídeo é considerado concluído (>= 90% assistido ou fim natural). */
  onCompleted?: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [embedFailed, setEmbedFailed] = useState(false);
  const [resumeSeconds, setResumeSeconds] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const completedFiredRef = useRef(false);
  const embedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(positionKey(youtubeId));
    if (raw) {
      const seconds = Number(raw);
      if (Number.isFinite(seconds) && seconds > 5) setResumeSeconds(seconds);
    }
  }, [youtubeId]);

  useEffect(() => {
    if (!playing || !containerRef.current) return;
    let cancelled = false;
    let progressInterval: ReturnType<typeof setInterval> | null = null;

    loadYouTubeApi().then(() => {
      if (cancelled || !window.YT || !containerRef.current) return;
      // Se a API não conseguir montar o player em tempo hábil, oferece o fallback em vez de travar.
      embedTimeoutRef.current = setTimeout(() => setEmbedFailed(true), 8000);

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: youtubeId,
        playerVars: { rel: 0, modestbranding: 1, start: Math.floor(resumeSeconds), origin: typeof window !== "undefined" ? window.location.origin : undefined },
        host: "https://www.youtube-nocookie.com",
        events: {
          onReady: () => {
            if (embedTimeoutRef.current) clearTimeout(embedTimeoutRef.current);
          },
          onError: () => setEmbedFailed(true),
          onStateChange: (e: { data: number }) => {
            if (!window.YT) return;
            if (e.data === window.YT.PlayerState.ENDED) {
              if (typeof window !== "undefined") window.localStorage.removeItem(positionKey(youtubeId));
              if (!completedFiredRef.current) {
                completedFiredRef.current = true;
                onCompleted?.();
              }
              onProgress?.(100);
            }
          },
        },
      });

      progressInterval = setInterval(() => {
        const p = playerRef.current;
        if (!p) return;
        try {
          const current = p.getCurrentTime();
          const duration = p.getDuration();
          if (!duration) return;
          if (typeof window !== "undefined") window.localStorage.setItem(positionKey(youtubeId), String(current));
          const percent = Math.min(100, Math.round((current / duration) * 100));
          onProgress?.(percent);
          if (percent >= 90 && !completedFiredRef.current) {
            completedFiredRef.current = true;
            onCompleted?.();
          }
        } catch {
          // player ainda não está pronto para consultas — ignora este tick
        }
      }, 5000);
    });

    return () => {
      cancelled = true;
      if (progressInterval) clearInterval(progressInterval);
      if (embedTimeoutRef.current) clearTimeout(embedTimeoutRef.current);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, youtubeId]);

  function toggleFullscreen() {
    if (!wrapperRef.current) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else wrapperRef.current.requestFullscreen?.();
  }

  if (embedFailed) {
    return (
      <div className="w-full aspect-video rounded-xl border border-border bg-surface-muted flex flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm text-foreground-muted">Este vídeo não pôde ser carregado aqui (incorporação bloqueada pelo canal).</p>
        <WatchOnYouTubeLink youtubeId={youtubeId} />
      </div>
    );
  }

  if (!playing) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="group relative block w-full aspect-video rounded-xl overflow-hidden bg-navy border border-border"
        aria-label={`Reproduzir: ${title}`}
      >
        <img
          src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
          alt=""
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          loading="lazy"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center w-16 h-16 rounded-full bg-danger text-white shadow-lg group-hover:scale-110 transition-transform">
            <Play size={26} fill="currentColor" aria-hidden />
          </span>
        </span>
        {resumeSeconds > 5 && (
          <span className="absolute top-2 right-2 chip bg-black/70 text-white text-[10px] py-0.5">
            Continuar de {Math.floor(resumeSeconds / 60)}:{String(Math.floor(resumeSeconds % 60)).padStart(2, "0")}
          </span>
        )}
        <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-3 py-2.5 text-left">
          <span className="block text-white text-[13px] font-medium line-clamp-2">{title}</span>
          {channel && <span className="block text-white/70 text-[11px] mt-0.5">{channel}</span>}
        </span>
      </button>
    );
  }

  return (
    <div ref={wrapperRef} className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-border">
      <div ref={containerRef} className="w-full h-full" />
      <button
        type="button"
        onClick={toggleFullscreen}
        aria-label="Tela cheia"
        className="absolute bottom-2 right-2 z-10 flex items-center justify-center w-9 h-9 rounded-lg bg-black/60 text-white hover:bg-black/80"
      >
        <Maximize size={16} aria-hidden />
      </button>
    </div>
  );
}

/** Link de escape, sempre disponível — para os vídeos cujo dono desativou a incorporação. */
export function WatchOnYouTubeLink({ youtubeId }: { youtubeId: string }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[11px] text-foreground-muted hover:text-brand"
    >
      Não carregou? Abrir no YouTube
      <ExternalLink size={11} aria-hidden />
    </a>
  );
}
