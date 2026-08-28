"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Info, SlidersHorizontal, TrendingDown, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { ALL_QUESTIONS } from "@/content/questions";
import { topicNameOf, subjectOfTopic } from "@/lib/pedagogy/contentRef";
import { SUBJECTS } from "@/content/curriculum";
import { getDB } from "@/lib/db/dexie";
import { recordAttempt } from "@/lib/pedagogy/service";
import { newIdempotencyKey } from "@/lib/pedagogy/ids";
import { DEFAULT_STUDENT_ID, type Question } from "@/lib/models/schema";

const TOTAL_QUESTIONS = 18;

interface AnsweredQuestion {
  question: Question;
  selectedKey: string;
  isCorrect: boolean;
}

/**
 * Simulado adaptativo (Laboratório, ferramenta 2.10).
 *
 * A dificuldade INTRÍNSECA de cada questão (`Question.difficulty`) não é um sinal real aqui — o
 * acervo inteiro está marcado "medio" por padrão, sem calibração própria por questão (ver
 * comentário em src/content/questions/index.ts). Fingir que a próxima questão "ficou mais difícil"
 * com base nesse campo seria decorativo, não real.
 *
 * Em vez disso, a "dificuldade" se adapta pelo TÓPICO, usando o dado real que o app já tem: a
 * acurácia histórica do próprio aluno por tópico (`MasterySnapshot.accuracyRate`, a mesma métrica
 * usada em Desempenho e no Motor 3). Regra, documentada aqui e na tela:
 * - Acertou → a próxima vem de um tópico onde você historicamente vai PIOR (mais desafiador).
 * - Errou → a próxima vem de um tópico onde você historicamente vai MELHOR (chão mais firme).
 * - Tópico sem histórico suficiente entra como neutro (nem fácil nem difícil).
 */
export default function SimuladoAdaptativoPage() {
  const [masteryByTopic, setMasteryByTopic] = useState<Map<string, number> | null>(null);
  const [askedIds, setAskedIds] = useState<string[]>([]);
  const [current, setCurrent] = useState<Question | null>(null);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [revealed, setRevealed] = useState(false);
  const [history, setHistory] = useState<AnsweredQuestion[]>([]);
  const [lastAdjustment, setLastAdjustment] = useState<"harder" | "easier" | "neutral">("neutral");
  const idempotencyRef = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    (async () => {
      const db = getDB();
      const snapshots = await db.masterySnapshots.where("studentId").equals(DEFAULT_STUDENT_ID).toArray();
      const map = new Map<string, number>();
      // Só conta como sinal real quem já tem tentativas suficientes pra a acurácia não ser ruído
      // (mesmo limiar de "hasEnoughData" usado no Motor 3 — ver src/lib/pedagogy/scoreEstimate.ts).
      for (const s of snapshots) {
        if (s.attemptsCount >= 3) map.set(s.topicSlug, s.accuracyRate);
      }
      setMasteryByTopic(map);
    })();
  }, []);

  function pickNext(direction: "harder" | "easier" | "neutral", asked: string[]) {
    const available = ALL_QUESTIONS.filter((q) => !asked.includes(q.id));
    if (available.length === 0) return null;

    const topicsWithQuestions = [...new Set(available.map((q) => q.topicSlug))];
    let orderedTopics: string[];
    if (direction === "harder") {
      // Menor acurácia primeiro = mais desafiador pra este aluno. Tópico sem dado (não está no
      // mapa) fica no meio da ordenação (nem priorizado nem descartado).
      orderedTopics = topicsWithQuestions.sort((a, b) => (masteryByTopic?.get(a) ?? 0.5) - (masteryByTopic?.get(b) ?? 0.5));
    } else if (direction === "easier") {
      orderedTopics = topicsWithQuestions.sort((a, b) => (masteryByTopic?.get(b) ?? 0.5) - (masteryByTopic?.get(a) ?? 0.5));
    } else {
      orderedTopics = topicsWithQuestions.sort((a, b) => Math.abs((masteryByTopic?.get(a) ?? 0.5) - 0.5) - Math.abs((masteryByTopic?.get(b) ?? 0.5) - 0.5));
    }

    const chosenTopic = orderedTopics[0];
    const candidates = available.filter((q) => q.topicSlug === chosenTopic);
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  useEffect(() => {
    if (masteryByTopic === null || current !== null || history.length >= TOTAL_QUESTIONS) return;
    const next = pickNext("neutral", askedIds);
    if (next) {
      setCurrent(next);
      setAskedIds((prev) => [...prev, next.id]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masteryByTopic]);

  async function handleSelect(key: string) {
    if (!current || revealed) return;
    setSelected(key);
    setRevealed(true);
    const correctKey = current.options.find((o) => o.isCorrect)?.key;
    const isCorrect = correctKey === key;
    setHistory((prev) => [...prev, { question: current, selectedKey: key, isCorrect }]);

    if (!idempotencyRef.current.has(current.id)) idempotencyRef.current.set(current.id, newIdempotencyKey());
    void recordAttempt({
      questionId: current.id,
      selectedKey: key as "A" | "B" | "C" | "D" | "E",
      correctKey: correctKey as "A" | "B" | "C" | "D" | "E" | undefined,
      isCorrect,
      mode: "simulado",
      activityId: "laboratorio-simulado-adaptativo",
      idempotencyKey: idempotencyRef.current.get(current.id),
    });

    setLastAdjustment(isCorrect ? "harder" : "easier");
  }

  function handleNext() {
    if (history.length >= TOTAL_QUESTIONS) {
      setCurrent(null);
      return;
    }
    const next = pickNext(lastAdjustment, askedIds);
    setSelected(undefined);
    setRevealed(false);
    if (next) {
      setCurrent(next);
      setAskedIds((prev) => [...prev, next.id]);
    } else {
      setCurrent(null);
    }
  }

  const finished = history.length >= TOTAL_QUESTIONS || (masteryByTopic !== null && current === null && history.length > 0);
  const correctCount = history.filter((h) => h.isCorrect).length;

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <Link href="/laboratorio" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
        <ArrowLeft size={14} aria-hidden /> Laboratório
      </Link>

      <PageHeader
        eyebrow="Laboratório · simulado adaptativo"
        title="Simulado adaptativo"
        description={`${TOTAL_QUESTIONS} questões. A cada resposta, a próxima vem de um tópico mais desafiador (se você acertou) ou mais firme (se errou) — com base no SEU histórico real, não num rótulo de dificuldade fixo por questão.`}
      />

      <div className="mb-4 flex items-start gap-2 rounded-lg bg-brand-soft p-3 text-[11.5px] text-foreground">
        <Info size={14} className="text-brand shrink-0 mt-0.5" aria-hidden />
        <p>
          Como funciona: o banco de questões ainda não tem dificuldade calibrada por questão (quase
          tudo entra como &quot;médio&quot;) — então aqui &quot;dificuldade&quot; é medida pelo TÓPICO, usando sua
          acurácia real (mesmo dado do painel Desempenho). Tópico sem histórico suficiente entra
          neutro.
        </p>
      </div>

      {masteryByTopic === null ? (
        <p className="text-sm text-foreground-muted">Carregando seu histórico...</p>
      ) : !finished && current ? (
        <>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-foreground-muted">
              Questão {history.length + 1} de {TOTAL_QUESTIONS}
            </span>
            {history.length > 0 && (
              <span className="chip bg-surface-muted text-foreground-muted">
                {lastAdjustment === "harder" ? (
                  <>
                    <TrendingUp size={11} aria-hidden /> mais desafiador
                  </>
                ) : (
                  <>
                    <TrendingDown size={11} aria-hidden /> chão mais firme
                  </>
                )}
              </span>
            )}
          </div>

          <QuestionCard question={current} selected={selected} onSelect={handleSelect} revealed={revealed} showLessonLink={false} />

          {revealed && (
            <button
              type="button"
              onClick={handleNext}
              className="w-full mt-4 rounded-lg bg-brand text-brand-foreground py-2.5 text-sm font-medium hover:opacity-90"
            >
              {history.length >= TOTAL_QUESTIONS ? "Ver resultado" : "Próxima questão"}
            </button>
          )}
        </>
      ) : (
        <div className="card p-5 text-center">
          <SlidersHorizontal size={22} className="text-brand mx-auto mb-2" aria-hidden />
          <p className="text-[20px] font-bold mb-1">
            {correctCount}/{history.length}
          </p>
          <p className="text-sm text-foreground-muted mb-4">
            {Math.round((correctCount / Math.max(1, history.length)) * 100)}% de acerto neste simulado adaptativo.
          </p>
          <div className="text-left space-y-1.5">
            {history.map((h, i) => {
              const subject = SUBJECTS.find((s) => s.slug === subjectOfTopic(h.question.topicSlug));
              return (
                <div key={i} className="flex items-center justify-between text-[12px] py-1 border-b border-border last:border-0">
                  <span className="flex items-center gap-1.5 min-w-0">
                    {subject && (
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: subject.color }} aria-hidden />
                    )}
                    <span className="truncate">{topicNameOf(h.question.topicSlug) ?? h.question.topicSlug}</span>
                  </span>
                  <span className={h.isCorrect ? "text-success shrink-0" : "text-danger shrink-0"}>{h.isCorrect ? "Acertou" : "Errou"}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
