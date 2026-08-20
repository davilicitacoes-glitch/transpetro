"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import type { Slide } from "@/lib/slides/buildSlides";

const KIND_STYLE: Record<Slide["kind"], { accent: string; label: string }> = {
  capa: { accent: "var(--brand)", label: "Microaula Transpetro Estudos" },
  objetivo: { accent: "var(--brand)", label: "Objetivo" },
  conteudo: { accent: "var(--brand)", label: "Conteúdo" },
  memorizar: { accent: "var(--accent)", label: "Memorizar" },
  exemplo: { accent: "var(--success)", label: "Exemplo" },
  pegadinha: { accent: "var(--danger)", label: "Pegadinha" },
  resumo: { accent: "var(--brand)", label: "Resumo" },
  fim: { accent: "var(--success)", label: "Fim" },
};

export function SlidePlayer({ slides, title }: { slides: Slide[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [narrating, setNarrating] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [supported, setSupported] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const indexRef = useRef(index);
  const autoRef = useRef(autoAdvance);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  indexRef.current = index;
  autoRef.current = autoAdvance;

  const slide = slides[index];
  const style = KIND_STYLE[slide.kind];

  useEffect(() => {
    if (typeof window !== "undefined" && !("speechSynthesis" in window)) setSupported(false);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    function handleFsChange() {
      setFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  function speakSlide(i: number) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(slides[i].narration);
    utterance.lang = "pt-BR";
    utterance.rate = 1;
    utterance.onend = () => {
      if (autoRef.current && indexRef.current < slides.length - 1) {
        const next = indexRef.current + 1;
        setIndex(next);
        speakSlide(next);
      } else {
        setNarrating(false);
        setAutoAdvance(false);
      }
    };
    window.speechSynthesis.speak(utterance);
    setNarrating(true);
  }

  function stopNarration() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setNarrating(false);
    setAutoAdvance(false);
  }

  function goTo(next: number) {
    stopNarration();
    setIndex(Math.max(0, Math.min(slides.length - 1, next)));
  }

  function playAll() {
    setAutoAdvance(true);
    autoRef.current = true;
    speakSlide(index);
  }

  function toggleFullscreen() {
    if (!wrapperRef.current) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else wrapperRef.current.requestFullscreen?.();
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goTo(index - 1);
      else if (e.key === "ArrowRight") goTo(index + 1);
      else if (e.key === "Escape" && document.fullscreenElement) document.exitFullscreen();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, slides.length]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) goTo(delta < 0 ? index + 1 : index - 1);
    touchStartX.current = null;
  }

  return (
    <div
      ref={wrapperRef}
      className={
        fullscreen
          ? "fixed inset-0 z-50 bg-surface flex flex-col p-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
          : ""
      }
    >
      <div
        className={`rounded-xl border border-border overflow-hidden bg-surface flex flex-col ${fullscreen ? "flex-1" : ""}`}
        style={{ borderTopWidth: 4, borderTopColor: style.accent }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="px-5 pt-4 pb-2 flex items-center justify-between shrink-0">
          <span className="chip" style={{ backgroundColor: `${style.accent}1a`, color: style.accent }}>
            {style.label}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-foreground-muted">
              {index + 1} / {slides.length}
            </span>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={fullscreen ? "Sair da tela cheia" : "Tela cheia"}
              className="rounded-md p-1.5 hover:bg-surface-muted text-foreground-muted"
            >
              {fullscreen ? <X size={16} aria-hidden /> : <Maximize size={16} aria-hidden />}
            </button>
          </div>
        </div>

        <div
          className={`px-6 md:px-10 pb-6 pt-2 flex flex-col justify-center motion-reduce:transition-none ${
            fullscreen ? "flex-1 overflow-y-auto" : "min-h-[22rem]"
          }`}
        >
          {slide.kind === "capa" ? (
            <div className="text-center">
              <h2 className={`font-bold tracking-tight leading-tight mb-4 ${fullscreen ? "text-[clamp(28px,5vw,44px)]" : "text-[26px]"}`}>{slide.title}</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {slide.bullets.map((b, i) => (
                  <span key={i} className="chip bg-surface-muted text-foreground-muted">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <>
              <h2 className={`font-semibold mb-5 ${fullscreen ? "text-[clamp(20px,3vw,30px)]" : "text-[19px]"}`} style={{ color: style.accent }}>
                {slide.title}
              </h2>
              <ul className={slide.bullets.length > 1 ? "space-y-3.5" : ""}>
                {slide.bullets.map((b, i) => (
                  <li key={i} className={`flex gap-3 leading-relaxed ${fullscreen ? "text-[clamp(16px,2.2vw,22px)]" : "text-[15.5px]"}`}>
                    {slide.bullets.length > 1 && (
                      <span
                        className="shrink-0 w-2 h-2 rounded-full mt-2"
                        style={{ backgroundColor: style.accent }}
                        aria-hidden
                      />
                    )}
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="flex items-center justify-center gap-1 px-4 pb-2 shrink-0" aria-hidden>
          {slides.map((_, i) => (
            <span
              key={i}
              className="h-1 rounded-full transition-all"
              style={{
                width: i === index ? 16 : 5,
                backgroundColor: i === index ? style.accent : "var(--border)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3 shrink-0">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Slide anterior"
          className="tap-target rounded-lg border border-border p-2 hover:bg-surface-muted disabled:opacity-40"
        >
          <ChevronLeft size={17} />
        </button>

        {supported &&
          (narrating ? (
            <button
              type="button"
              onClick={stopNarration}
              className="tap-target flex-1 flex items-center justify-center gap-2 rounded-lg border border-danger text-danger py-2 text-sm font-medium hover:bg-danger-soft"
            >
              <Pause size={15} aria-hidden />
              Parar narração
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => speakSlide(index)}
                className="tap-target flex-1 flex items-center justify-center gap-2 rounded-lg border border-border py-2 text-sm font-medium hover:bg-surface-muted"
              >
                <Volume2 size={15} aria-hidden />
                Narrar slide
              </button>
              <button
                type="button"
                onClick={playAll}
                className="tap-target flex-1 flex items-center justify-center gap-2 rounded-lg bg-brand text-brand-foreground py-2 text-sm font-medium hover:opacity-90"
              >
                <Play size={15} aria-hidden />
                Assistir tudo
              </button>
            </>
          ))}

        {!supported && (
          <span className="flex-1 flex items-center justify-center gap-2 text-xs text-foreground-muted">
            <VolumeX size={14} aria-hidden />
            Seu navegador não tem síntese de voz
          </span>
        )}

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === slides.length - 1}
          aria-label="Próximo slide"
          className="tap-target rounded-lg border border-border p-2 hover:bg-surface-muted disabled:opacity-40"
        >
          <ChevronRight size={17} />
        </button>
      </div>

      {!fullscreen && (
        <p className="text-[11px] text-foreground-subtle mt-2 text-center">
          Narração pela voz do navegador (offline, sem custo). Microaula de &quot;{title}&quot;. Use as setas do teclado ou deslize para navegar.
        </p>
      )}
    </div>
  );
}
