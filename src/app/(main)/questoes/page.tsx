"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ListChecks, RotateCcw } from "lucide-react";
import { ALL_QUESTIONS } from "@/content/questions";
import { SUBJECTS } from "@/content/curriculum";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { PageHeader, EmptyState } from "@/components/ui/PageHeader";
import { recordAttempt, startOrResumeSession } from "@/lib/pedagogy/service";
import { newIdempotencyKey } from "@/lib/pedagogy/ids";

type Filter = "todas" | "nao_respondidas" | "erradas";
type OriginFilter = "todas" | "real" | "inedita";

export default function QuestoesPage() {
  const [subjectFilter, setSubjectFilter] = useState<string>("todas");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("todas");
  const [statusFilter, setStatusFilter] = useState<Filter>("todas");
  const [originFilter, setOriginFilter] = useState<OriginFilter>("todas");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sessionId, setSessionId] = useState<string | null>(null);
  const idempotencyKeysRef = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    (async () => {
      const session = await startOrResumeSession("questoes");
      setSessionId(session.id);
    })();
  }, []);

  function answerQuestion(questionId: string, key: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: key }));
    const question = ALL_QUESTIONS.find((q) => q.id === questionId);
    const correctKey = question?.options.find((o) => o.isCorrect)?.key;
    if (!idempotencyKeysRef.current.has(questionId)) {
      idempotencyKeysRef.current.set(questionId, newIdempotencyKey());
    }
    void recordAttempt({
      questionId,
      selectedKey: key as "A" | "B" | "C" | "D" | "E",
      correctKey: correctKey as "A" | "B" | "C" | "D" | "E" | undefined,
      isCorrect: key === correctKey,
      mode: "treino",
      sessionId: sessionId ?? undefined,
      questionOrigin: question?.source.origin,
      idempotencyKey: idempotencyKeysRef.current.get(questionId),
    });
  }

  const filtered = useMemo(() => {
    return ALL_QUESTIONS.filter((q) => {
      if (subjectFilter !== "todas" && q.subjectSlug !== subjectFilter) return false;
      if (difficultyFilter !== "todas" && q.difficulty !== difficultyFilter) return false;
      if (originFilter === "real" && q.source.origin !== "real") return false;
      if (originFilter === "inedita" && q.source.origin === "real") return false;
      const answer = answers[q.id];
      if (statusFilter === "nao_respondidas" && answer) return false;
      if (statusFilter === "erradas") {
        if (!answer) return false;
        const correct = q.options.find((o) => o.isCorrect)?.key;
        if (answer === correct) return false;
      }
      return true;
    });
  }, [subjectFilter, difficultyFilter, statusFilter, originFilter, answers]);

  const realCount = useMemo(() => ALL_QUESTIONS.filter((q) => q.source.origin === "real").length, []);

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.entries(answers).filter(([id, key]) => {
    const q = ALL_QUESTIONS.find((x) => x.id === id);
    return q?.options.find((o) => o.key === key)?.isCorrect;
  }).length;

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
      <PageHeader
        eyebrow="Banco de questões"
        title={`${ALL_QUESTIONS.length} questões comentadas`}
        description="Questões reais de provas da banca Cesgranrio (marcadas 'Questão real', com fonte oficial) e questões inéditas Transpetro Estudos no estilo da banca (marcadas 'Inédita Transpetro Estudos') — a origem de cada uma está sempre identificada no card."
        action={
          answeredCount > 0 ? (
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                idempotencyKeysRef.current = new Map();
              }}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-surface-muted"
            >
              <RotateCcw size={13} aria-hidden />
              Recomeçar
            </button>
          ) : undefined
        }
      />

      {answeredCount > 0 && (
        <div className="card-raised p-4 mb-5 flex items-center gap-4 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(400px 200px at 100% 0%, color-mix(in srgb, var(--brand) 10%, transparent), transparent 65%)" }}
            aria-hidden
          />
          <p className="relative text-[26px] font-display font-bold text-gradient-brand leading-none shrink-0">
            {Math.round((correctCount / answeredCount) * 100)}%
          </p>
          <div className="relative">
            <p className="text-sm font-medium">Seu aproveitamento nesta sessão</p>
            <p className="text-xs text-foreground-muted">
              {correctCount} acertos em {answeredCount} questões respondidas
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-5">
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          aria-label="Filtrar por disciplina"
          className="rounded-lg border border-border bg-surface px-3 py-2 text-xs"
        >
          <option value="todas">Todas as disciplinas</option>
          {SUBJECTS.filter((s) => s.slug !== "redacao").map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          aria-label="Filtrar por dificuldade"
          className="rounded-lg border border-border bg-surface px-3 py-2 text-xs"
        >
          <option value="todas">Qualquer dificuldade</option>
          <option value="facil">Fácil</option>
          <option value="medio">Médio</option>
          <option value="dificil">Difícil</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as Filter)}
          aria-label="Filtrar por situação"
          className="rounded-lg border border-border bg-surface px-3 py-2 text-xs"
        >
          <option value="todas">Todas</option>
          <option value="nao_respondidas">Não respondidas</option>
          <option value="erradas">Só as que errei</option>
        </select>

        <select
          value={originFilter}
          onChange={(e) => setOriginFilter(e.target.value as OriginFilter)}
          aria-label="Filtrar por origem"
          className="rounded-lg border border-border bg-surface px-3 py-2 text-xs"
        >
          <option value="todas">Reais e inéditas</option>
          <option value="real">Só questões reais ({realCount})</option>
          <option value="inedita">Só inéditas Transpetro Estudos</option>
        </select>
      </div>

      <p className="text-xs text-foreground-muted mb-3">{filtered.length} questões neste filtro</p>

      {filtered.length === 0 ? (
        <EmptyState
          icon={ListChecks}
          title="Nenhuma questão neste filtro"
          description="Ajuste os filtros acima para ver outras questões do banco."
        />
      ) : (
        <div className="space-y-3">
          {filtered.slice(0, 40).map((q, i) => (
            <QuestionCard
              key={q.id}
              question={q}
              index={i}
              selected={answers[q.id]}
              revealed={!!answers[q.id]}
              onSelect={(key) => answerQuestion(q.id, key)}
            />
          ))}
          {filtered.length > 40 && (
            <p className="text-center text-xs text-foreground-muted py-4">
              Mostrando as 40 primeiras de {filtered.length}. Use os filtros para refinar.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
