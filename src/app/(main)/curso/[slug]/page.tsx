"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  CheckCircle2,
  Clock,
  Lightbulb,
  ListChecks,
  MonitorPlay,
  Quote,
  Sparkles,
  TriangleAlert,
  Video,
} from "lucide-react";
import { ALL_LESSONS } from "@/content/lessons";
import { SUBJECTS } from "@/content/curriculum";
import { getVideosForSyllabusCodes } from "@/content/videos";
import { YouTubePlayer, WatchOnYouTubeLink } from "@/components/video/YouTubePlayer";
import { SlidePlayer } from "@/components/video/SlidePlayer";
import { buildSlides } from "@/lib/slides/buildSlides";
import { useCompletedLessons } from "@/lib/progress/useCompletedLessons";
import { resolveLessonRef, miniQuizQuestionId } from "@/lib/pedagogy/contentRef";
import { recordAttempt, recordLessonCompleted, recordLessonStarted, startOrResumeSession } from "@/lib/pedagogy/service";
import { newIdempotencyKey } from "@/lib/pedagogy/ids";

function renderInlineMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

function BodyMdx({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/);
  return (
    <div className="prose-lesson text-[14.5px] leading-[1.75] text-foreground">
      {paragraphs.map((p, i) => {
        const isList = p.trim().startsWith("- ");
        if (isList) {
          const items = p.split(/\n/).map((l) => l.replace(/^- /, ""));
          return (
            <ul key={i} className="list-disc pl-5 space-y-1.5 mb-4">
              {items.map((item, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(item) }} />
              ))}
            </ul>
          );
        }
        return <p key={i} dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(p) }} />;
      })}
    </div>
  );
}

const MASTERY_LABEL: Record<string, string> = {
  introdutorio: "Introdutório",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

function SectionCard({
  icon: Icon,
  title,
  tone,
  children,
}: {
  icon: React.ElementType;
  title: string;
  tone?: "default" | "danger";
  children: React.ReactNode;
}) {
  return (
    <section className="card p-5 mb-4">
      <h2 className="flex items-center gap-2 font-semibold text-[14px] mb-3">
        <Icon size={16} className={tone === "danger" ? "text-danger" : "text-brand"} aria-hidden />
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const lesson = ALL_LESSONS.find((l) => l.slug === slug);
  const { completed, refresh } = useCompletedLessons();
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [marking, setMarking] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const quizIdempotencyKeysRef = useRef<Map<number, string>>(new Map());

  const subjectLessons = useMemo(
    () => (lesson ? ALL_LESSONS.filter((l) => l.subjectSlug === lesson.subjectSlug) : []),
    [lesson],
  );
  const currentIndex = subjectLessons.findIndex((l) => l.slug === slug);
  const prevLesson = currentIndex > 0 ? subjectLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < subjectLessons.length - 1 ? subjectLessons[currentIndex + 1] : null;
  const subject = lesson ? SUBJECTS.find((s) => s.slug === lesson.subjectSlug) : null;

  useEffect(() => {
    setFlashcardIndex(0);
    setShowBack(false);
    setQuizAnswers({});
    quizIdempotencyKeysRef.current = new Map();
    setSessionId(null);
  }, [slug]);

  useEffect(() => {
    if (!lesson) return;
    let cancelled = false;
    (async () => {
      const session = await startOrResumeSession("curso", lesson.slug);
      if (cancelled) return;
      setSessionId(session.id);
      const ref = resolveLessonRef(lesson.slug);
      if (ref) await recordLessonStarted(lesson.slug, session.id);
    })();
    return () => {
      cancelled = true;
    };
  }, [lesson]);

  if (!lesson) {
    notFound();
  }

  const isDone = completed.has(lesson.slug);

  async function markComplete() {
    if (!lesson) return;
    setMarking(true);
    const ref = resolveLessonRef(lesson.slug);
    if (ref) {
      await recordLessonCompleted(lesson.slug, ref, sessionId ?? undefined);
    }
    await refresh();
    setMarking(false);
  }

  function handleQuizAnswer(qi: number, key: string) {
    if (!lesson) return;
    setQuizAnswers((prev) => ({ ...prev, [qi]: key }));
    const questionId = miniQuizQuestionId(lesson.slug, qi);
    const question = lesson.miniQuiz[qi];
    const correctKey = question.options.find((o) => o.isCorrect)?.key as "A" | "B" | "C" | "D" | "E" | undefined;
    const isCorrect = correctKey === key;
    if (!quizIdempotencyKeysRef.current.has(qi)) {
      quizIdempotencyKeysRef.current.set(qi, newIdempotencyKey());
    }
    void recordAttempt({
      questionId,
      selectedKey: key as "A" | "B" | "C" | "D" | "E",
      correctKey,
      isCorrect,
      mode: "miniquiz",
      sessionId: sessionId ?? undefined,
      activityId: lesson.slug,
      questionOrigin: "inedita",
      idempotencyKey: quizIdempotencyKeysRef.current.get(qi),
    });
  }

  const relatedVideos = getVideosForSyllabusCodes(lesson.syllabusCodes);
  const slides = buildSlides(lesson);
  const currentFlashcard = lesson.flashcards[flashcardIndex];
  const correctCount = Object.entries(quizAnswers).filter(
    ([qi, key]) => lesson.miniQuiz[Number(qi)]?.options.find((o) => o.key === key)?.isCorrect,
  ).length;
  const answeredAll = Object.keys(quizAnswers).length === lesson.miniQuiz.length && lesson.miniQuiz.length > 0;

  return (
    <div className="flex-1 flex flex-col animate-fade-in">
      <header
        className="px-4 md:px-8 py-6 md:py-8"
        style={{ background: `linear-gradient(135deg, ${subject?.color ?? "#1a4fd6"}14, transparent)` }}
      >
        <div className="max-w-3xl mx-auto w-full">
          <Link href="/curso" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
            <ArrowLeft size={14} aria-hidden /> Voltar ao curso
          </Link>

          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {lesson.syllabusCodes.map((code) => (
              <span key={code} className="chip bg-brand-soft text-brand">
                {code}
              </span>
            ))}
            <span className="chip bg-surface-muted text-foreground-muted">
              <Clock size={11} aria-hidden /> {lesson.estimatedMinutes} min
            </span>
            <span className="chip bg-surface-muted text-foreground-muted">{MASTERY_LABEL[lesson.expectedMastery]}</span>
            {isDone && (
              <span className="chip bg-success-soft text-success">
                <CheckCircle2 size={11} aria-hidden /> Concluída
              </span>
            )}
          </div>

          <h1 className="text-[24px] md:text-[28px] font-bold tracking-tight leading-tight mb-2">{lesson.title}</h1>
          <p className="text-foreground-muted text-sm max-w-2xl">{lesson.learningObjective}</p>
        </div>
      </header>

      <div className="flex-1 px-4 md:px-8 pb-28">
        <div className="max-w-3xl mx-auto w-full">
          <section className="card p-5 mb-4">
            <h2 className="flex items-center gap-2 font-semibold text-[14px] mb-3">
              <MonitorPlay size={16} className="text-brand" aria-hidden />
              Microaula em slides narrados
            </h2>
            <SlidePlayer slides={slides} title={lesson.title} />
          </section>

          {relatedVideos.length > 0 && (
            <section className="card p-5 mb-4">
              <h2 className="flex items-center gap-2 font-semibold text-[14px] mb-1">
                <Video size={16} className="text-danger" aria-hidden />
                Videoaulas sobre este tema ({relatedVideos.length})
              </h2>
              <p className="text-[11px] text-foreground-muted mb-3">
                Vídeos públicos do YouTube, tocando aqui dentro pelo player oficial.
              </p>
              <div className="space-y-5">
                {relatedVideos.slice(0, 3).map((video) => (
                  <div key={video.id}>
                    <YouTubePlayer youtubeId={video.youtubeId} title={video.title} channel={video.channel} />
                    <p className="text-[12px] text-foreground-muted mt-1.5">{video.justification}</p>
                    <WatchOnYouTubeLink youtubeId={video.youtubeId} />
                  </div>
                ))}
              </div>
              {relatedVideos.length > 3 && (
                <Link
                  href="/videoaulas"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:underline"
                >
                  Ver as outras {relatedVideos.length - 3} videoaulas deste tema
                </Link>
              )}
            </section>
          )}

          <SectionCard icon={BookMarked} title="Aula em texto">
            <BodyMdx text={lesson.bodyMdx} />
          </SectionCard>

          {lesson.mustMemorize.length > 0 && (
            <SectionCard icon={Lightbulb} title="O que preciso memorizar">
              <ul className="space-y-2">
                {lesson.mustMemorize.map((item, i) => (
                  <li
                    key={i}
                    className="text-[13.5px] leading-relaxed bg-brand-soft/60 rounded-lg px-3.5 py-2.5 border-l-2 border-brand"
                    dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(item) }}
                  />
                ))}
              </ul>
            </SectionCard>
          )}

          {lesson.workedExamples.length > 0 && (
            <SectionCard icon={Quote} title="Exemplos resolvidos">
              <ul className="space-y-2.5">
                {lesson.workedExamples.map((item, i) => (
                  <li
                    key={i}
                    className="text-[13.5px] leading-relaxed border-l-2 border-border-strong pl-3.5"
                    dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(item) }}
                  />
                ))}
              </ul>
            </SectionCard>
          )}

          <SectionCard icon={TriangleAlert} title="Pegadinhas e erros comuns" tone="danger">
            <ul className="space-y-2">
              {lesson.commonMistakes.map((item, i) => (
                <li key={i} className="text-[13.5px] leading-relaxed text-foreground bg-danger-soft rounded-lg px-3.5 py-2.5">
                  {item}
                </li>
              ))}
            </ul>
          </SectionCard>

          {lesson.howBoardMightAsk.length > 0 && (
            <SectionCard icon={Sparkles} title="Como a banca pode cobrar (análise didática)">
              <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-foreground-muted">
                {lesson.howBoardMightAsk.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </SectionCard>
          )}

          {lesson.legalReferences.length > 0 && (
            <SectionCard icon={BookMarked} title="Fontes e referências">
              <ul className="space-y-1.5 text-[13.5px]">
                {lesson.legalReferences.map((ref, i) => (
                  <li key={i}>
                    {ref.url ? (
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                        {ref.title}
                      </a>
                    ) : (
                      <span>{ref.title}</span>
                    )}
                    {ref.note && <span className="text-foreground-muted"> — {ref.note}</span>}
                  </li>
                ))}
              </ul>
            </SectionCard>
          )}

          <SectionCard icon={ListChecks} title="Resumo de revisão">
            <ol className="space-y-1.5 text-[13.5px]">
              {lesson.reviewSummaryPoints.map((item, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-surface-muted text-foreground-muted text-[11px] font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(item) }} />
                </li>
              ))}
            </ol>
          </SectionCard>

          {lesson.flashcards.length > 0 && currentFlashcard && (
            <section className="card p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-[14px]">Flashcards</h2>
                <p className="text-xs text-foreground-muted">
                  {flashcardIndex + 1}/{lesson.flashcards.length}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowBack((v) => !v)}
                className="w-full text-left bg-surface-muted border border-border rounded-xl p-6 min-h-28 flex items-center justify-center text-center hover:border-brand/40 transition-colors"
              >
                <span className="text-[14px]">
                  {showBack ? currentFlashcard.back : currentFlashcard.front}
                  <span className="block mt-2 text-[11px] text-foreground-subtle">
                    {showBack ? "Resposta — toque para ver a pergunta" : "Toque para ver a resposta"}
                  </span>
                </span>
              </button>
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowBack(false);
                    setFlashcardIndex((i) => (i > 0 ? i - 1 : lesson.flashcards.length - 1));
                  }}
                  className="flex-1 text-sm rounded-lg border border-border py-2 hover:bg-surface-muted transition-colors"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowBack(false);
                    setFlashcardIndex((i) => (i + 1) % lesson.flashcards.length);
                  }}
                  className="flex-1 text-sm rounded-lg bg-brand text-brand-foreground py-2 hover:opacity-90 transition-opacity"
                >
                  Próximo
                </button>
              </div>
            </section>
          )}

          {lesson.miniQuiz.length > 0 && (
            <section className="card p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-[14px]">Miniquestionário</h2>
                {answeredAll && (
                  <span className="chip bg-brand-soft text-brand">
                    {correctCount}/{lesson.miniQuiz.length} certas
                  </span>
                )}
              </div>
              <div className="space-y-4">
                {lesson.miniQuiz.map((q, qi) => {
                  const selected = quizAnswers[qi];
                  return (
                    <div key={qi} className="border border-border rounded-xl p-4">
                      <p className="text-[13.5px] mb-3 font-medium">{q.statement}</p>
                      <div className="space-y-1.5">
                        {q.options.map((opt) => {
                          const isSelected = selected === opt.key;
                          const showResult = !!selected;
                          return (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => handleQuizAnswer(qi, opt.key)}
                              disabled={!!selected}
                              className={`w-full text-left rounded-lg border px-3 py-2 text-[13px] transition-colors ${
                                showResult && opt.isCorrect
                                  ? "border-success bg-success-soft"
                                  : showResult && isSelected && !opt.isCorrect
                                    ? "border-danger bg-danger-soft"
                                    : "border-border hover:bg-surface-muted"
                              }`}
                            >
                              <span className="font-semibold mr-2">{opt.key}</span>
                              {opt.text}
                              {showResult && (isSelected || opt.isCorrect) && (
                                <span className="block text-[12px] text-foreground-muted mt-1">{opt.explanation}</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-border bg-surface/95 backdrop-blur px-4 md:px-8 py-3">
        <div className="max-w-3xl mx-auto w-full flex items-center gap-3">
          {prevLesson ? (
            <Link
              href={`/curso/${prevLesson.slug}`}
              className="hidden sm:flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground shrink-0"
            >
              <ArrowLeft size={14} aria-hidden /> Anterior
            </Link>
          ) : (
            <span className="hidden sm:block w-16 shrink-0" />
          )}

          <button
            type="button"
            onClick={markComplete}
            disabled={isDone || marking}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-brand text-brand-foreground font-medium py-2.5 text-sm hover:opacity-90 disabled:opacity-70 transition-opacity"
          >
            <CheckCircle2 size={16} aria-hidden />
            {isDone ? "Aula concluída" : "Marcar aula como concluída"}
          </button>

          {nextLesson ? (
            <Link
              href={`/curso/${nextLesson.slug}`}
              className="flex items-center gap-1.5 text-xs font-medium text-brand hover:underline shrink-0"
            >
              Próxima <ArrowRight size={14} aria-hidden />
            </Link>
          ) : (
            <span className="w-16 shrink-0" />
          )}
        </div>
      </div>
    </div>
  );
}
