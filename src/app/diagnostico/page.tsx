"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getDB } from "@/lib/db/dexie";
import { ALL_QUESTIONS } from "@/content/questions";
import { recordAttempt, startOrResumeSession, endSession } from "@/lib/pedagogy/service";
import { newIdempotencyKey } from "@/lib/pedagogy/ids";
import type { Question } from "@/lib/models/schema";

const SUBJECT_ORDER = ["especificas", "portugues", "logica", "informatica"] as const;

export default function DiagnosticoPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [idempotencyKeys, setIdempotencyKeys] = useState<Record<string, string>>({});
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [finishing, setFinishing] = useState(false);

  const questions: Question[] = useMemo(() => {
    const bySubject = new Map<string, Question[]>();
    for (const q of ALL_QUESTIONS) {
      const list = bySubject.get(q.subjectSlug) ?? [];
      list.push(q);
      bySubject.set(q.subjectSlug, list);
    }
    const picked: Question[] = [];
    for (const subject of SUBJECT_ORDER) {
      const list = bySubject.get(subject) ?? [];
      picked.push(...list.slice(0, subject === "especificas" ? 4 : 2));
    }
    return picked;
  }, []);

  useEffect(() => {
    (async () => {
      const session = await startOrResumeSession("questoes", "diagnostico-inicial");
      setSessionId(session.id);
    })();
  }, []);

  const current = questions[index];

  function handleAnswer(key: string) {
    if (!current) return;
    setSelected((prev) => ({ ...prev, [current.id]: key }));
    // Gera a chave de idempotência no momento da escolha (não no envio), para que um duplo clique
    // no botão "Próxima" reenvie a MESMA chave em vez de criar uma tentativa nova.
    setIdempotencyKeys((prev) => (prev[current.id] ? prev : { ...prev, [current.id]: newIdempotencyKey() }));
  }

  async function handleNext() {
    if (!current) return;
    const selectedKey = selected[current.id] as "A" | "B" | "C" | "D" | "E";
    const correctKey = current.options.find((o) => o.isCorrect)?.key as "A" | "B" | "C" | "D" | "E" | undefined;
    const isCorrect = correctKey === selectedKey;

    await recordAttempt({
      questionId: current.id,
      selectedKey,
      correctKey,
      isCorrect,
      mode: "treino",
      sessionId: sessionId ?? undefined,
      activityId: "diagnostico-inicial",
      questionOrigin: current.source.origin,
      idempotencyKey: idempotencyKeys[current.id],
    });

    if (index < questions.length - 1) {
      setIndex(index + 1);
      return;
    }

    setFinishing(true);
    const db = getDB();
    const now = new Date().toISOString();
    const profiles = await db.learnerProfiles.toArray();
    if (profiles[0]) {
      await db.learnerProfiles.put({ ...profiles[0], diagnosticCompletedAt: now, updatedAt: now });
    }
    if (sessionId) await endSession(sessionId, { status: "concluida" });
    router.push("/meu-curso");
  }

  if (questions.length === 0) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <p className="text-foreground-muted text-sm">Nenhuma questão disponível ainda. Redirecionando…</p>
      </main>
    );
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-brand">Diagnóstico inicial</p>
          <p className="text-xs text-foreground-muted">
            {index + 1} de {questions.length} · até 30 min
          </p>
        </div>
        <div className="progress-track mb-6">
          <div
            className="progress-fill"
            style={{ width: `${((index + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <p className="text-xs uppercase tracking-wide text-foreground-muted mb-2">{current.subjectSlug}</p>
          <p className="text-base leading-relaxed mb-5">{current.statement}</p>

          <div className="space-y-2">
            {current.options.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => handleAnswer(opt.key)}
                aria-pressed={selected[current.id] === opt.key}
                className={`w-full text-left rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                  selected[current.id] === opt.key
                    ? "border-brand bg-brand/10"
                    : "border-border hover:bg-surface-muted"
                }`}
              >
                <span className="font-medium mr-2">{opt.key})</span>
                {opt.text}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!selected[current.id] || finishing}
            className="mt-6 w-full rounded-lg bg-brand text-brand-foreground font-medium py-2.5 hover:opacity-90 disabled:opacity-50"
          >
            {finishing ? "Salvando…" : index < questions.length - 1 ? "Próxima" : "Concluir diagnóstico"}
          </button>
        </div>
      </div>
    </main>
  );
}
