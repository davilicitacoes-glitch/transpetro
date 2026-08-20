"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronDown, CheckCircle2, Circle } from "lucide-react";
import { SUBJECTS, MODULES, TOPICS } from "@/content/curriculum";
import { ALL_LESSONS } from "@/content/lessons";
import { useCompletedLessons } from "@/lib/progress/useCompletedLessons";

export function CourseSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const activeSlug = pathname?.startsWith("/curso/") ? pathname.replace("/curso/", "") : null;
  const { completed } = useCompletedLessons();

  const activeSubject = useMemo(() => {
    if (!activeSlug) return SUBJECTS[0]?.slug;
    const lesson = ALL_LESSONS.find((l) => l.slug === activeSlug);
    return lesson?.subjectSlug ?? SUBJECTS[0]?.slug;
  }, [activeSlug]);

  const [openSubject, setOpenSubject] = useState<string | null>(activeSubject ?? null);

  const lessonsBySlug = useMemo(() => new Map(ALL_LESSONS.map((l) => [l.slug, l])), []);

  return (
    <nav className="flex flex-col gap-1 p-3" aria-label="Trilha do curso">
      {SUBJECTS.map((subject) => {
        const modules = MODULES.filter((m) => m.subjectSlug === subject.slug);
        const subjectTopics = TOPICS.filter((t) => modules.some((m) => m.slug === t.moduleSlug));
        const subjectLessons = subjectTopics.map((t) => lessonsBySlug.get(t.slug)).filter(Boolean);
        const doneCount = subjectLessons.filter((l) => l && completed.has(l.slug)).length;
        const isOpen = openSubject === subject.slug;

        return (
          <div key={subject.slug} className="rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenSubject(isOpen ? null : subject.slug)}
              aria-expanded={isOpen}
              className="w-full flex items-center gap-2 px-2.5 py-2.5 text-left hover:bg-surface-muted rounded-lg transition-colors"
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: subject.color }} aria-hidden />
              <span className="flex-1 min-w-0">
                <span className="block text-[13px] font-semibold text-foreground truncate">{subject.name}</span>
                <span className="block text-[11px] text-foreground-muted">
                  {doneCount}/{subjectLessons.length} aulas · {subject.examWeightPoints} pts
                </span>
              </span>
              <ChevronDown
                size={15}
                className={`shrink-0 text-foreground-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>

            {isOpen && (
              <div className="pl-3 pb-2 animate-fade-in">
                {modules.map((mod) => {
                  const modTopics = subjectTopics.filter((t) => t.moduleSlug === mod.slug);
                  if (modTopics.length === 0) return null;
                  return (
                    <div key={mod.slug} className="mb-1.5">
                      <p className="text-[10.5px] font-semibold uppercase tracking-wide text-foreground-subtle px-2.5 py-1.5">
                        {mod.name}
                      </p>
                      <ul className="space-y-0.5">
                        {modTopics.map((topic) => {
                          const lesson = lessonsBySlug.get(topic.slug);
                          if (!lesson) return null;
                          const isActive = lesson.slug === activeSlug;
                          const isDone = completed.has(lesson.slug);
                          return (
                            <li key={topic.slug}>
                              <Link
                                href={`/curso/${lesson.slug}`}
                                onClick={onNavigate}
                                className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[12.5px] leading-snug transition-colors ${
                                  isActive
                                    ? "bg-brand-soft text-brand font-medium"
                                    : "text-foreground-muted hover:bg-surface-muted hover:text-foreground"
                                }`}
                              >
                                {isDone ? (
                                  <CheckCircle2 size={14} className="shrink-0 text-success" aria-hidden />
                                ) : (
                                  <Circle size={14} className="shrink-0 text-border-strong" aria-hidden />
                                )}
                                <span className="line-clamp-2">{lesson.title}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
