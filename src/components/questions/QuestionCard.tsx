"use client";

import Link from "next/link";
import { BookOpen, CheckCircle2, Lightbulb, XCircle } from "lucide-react";
import type { Question } from "@/lib/models/schema";
import { QUESTION_LESSON_SLUG } from "@/content/questions";
import { SUBJECTS } from "@/content/curriculum";
import { buildAnswerExplanation } from "@/lib/pedagogy/answerExplanation";

const ORIGIN_LABEL: Record<string, { label: string; className: string }> = {
  real: { label: "Questão real", className: "bg-success-soft text-success" },
  adaptada: { label: "Adaptada", className: "bg-warning-soft text-warning" },
  inedita: { label: "Inédita Transpetro Estudos", className: "bg-brand-soft text-brand" },
};

export function QuestionCard({
  question,
  index,
  selected,
  onSelect,
  revealed,
  showLessonLink = true,
}: {
  question: Question;
  index?: number;
  selected?: string;
  onSelect: (key: string) => void;
  /** Em modo prova, a resposta só é revelada no final. */
  revealed: boolean;
  showLessonLink?: boolean;
}) {
  const subject = SUBJECTS.find((s) => s.slug === question.subjectSlug);
  const origin = ORIGIN_LABEL[question.source.origin] ?? ORIGIN_LABEL.inedita;
  const lessonSlug = QUESTION_LESSON_SLUG.get(question.id);
  const correctKey = question.options.find((o) => o.isCorrect)?.key;
  const isCorrect = selected === correctKey;
  // Explicação de erro universal (mesmo componente central de src/lib/pedagogy/answerExplanation.ts
  // usado por recordAttempt pra gravar no Caderno de Erros) — nunca deixa uma resposta errada sem
  // dizer por que a certa é certa e por que a marcada está errada.
  const explanation = revealed && selected ? buildAnswerExplanation(question, selected) : null;

  return (
    <article className="card p-4">
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        {index !== undefined && (
          <span className="chip bg-surface-muted text-foreground-muted">Q{index + 1}</span>
        )}
        {subject && (
          <span className="chip" style={{ backgroundColor: `${subject.color}1a`, color: subject.color }}>
            {subject.name}
          </span>
        )}
        <span className={`chip ${origin.className}`}>{origin.label}</span>
        {revealed && selected && (
          <span className={`chip ml-auto ${isCorrect ? "bg-success-soft text-success" : "bg-danger-soft text-danger"}`}>
            {isCorrect ? <CheckCircle2 size={11} aria-hidden /> : <XCircle size={11} aria-hidden />}
            {isCorrect ? "Acertou" : "Errou"}
          </span>
        )}
      </div>

      <p className="text-[14px] leading-relaxed font-medium mb-3">{question.statement}</p>

      <div className="space-y-1.5">
        {question.options.map((opt) => {
          const isSelected = selected === opt.key;
          const showAsCorrect = revealed && opt.isCorrect;
          const showAsWrong = revealed && isSelected && !opt.isCorrect;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSelect(opt.key)}
              disabled={revealed}
              className={`w-full text-left rounded-lg border px-3 py-2 text-[13px] transition-colors ${
                showAsCorrect
                  ? "border-success bg-success-soft"
                  : showAsWrong
                    ? "border-danger bg-danger-soft"
                    : isSelected
                      ? "border-brand bg-brand-soft"
                      : "border-border hover:bg-surface-muted"
              }`}
            >
              <span className="font-semibold mr-2">{opt.key}</span>
              {opt.text}
              {revealed && (isSelected || opt.isCorrect) && (
                <span className="block text-[12px] text-foreground-muted mt-1">{opt.explanation}</span>
              )}
            </button>
          );
        })}
      </div>

      {explanation?.matchedPegadinha && (
        <div className="mt-3 rounded-lg bg-warning-soft p-3 flex gap-2">
          <Lightbulb size={14} className="text-warning shrink-0 mt-0.5" aria-hidden />
          <p className="text-[12px] text-foreground">
            <strong>
              Essa é a pegadinha nº {explanation.matchedPegadinha.index} de {explanation.matchedPegadinha.total} deste tema:
            </strong>{" "}
            {explanation.matchedPegadinha.text}
          </p>
        </div>
      )}

      {revealed && showLessonLink && lessonSlug && (
        <Link
          href={`/curso/${lessonSlug}`}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:underline"
        >
          <BookOpen size={13} aria-hidden />
          Revisar a aula desta questão
        </Link>
      )}
    </article>
  );
}
