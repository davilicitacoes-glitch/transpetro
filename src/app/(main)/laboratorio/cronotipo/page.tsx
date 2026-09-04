"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/ui/PageHeader";
import { ListSkeleton } from "@/components/ui/PageSkeleton";
import { getDB } from "@/lib/db/dexie";
import { DEFAULT_STUDENT_ID } from "@/lib/models/schema";

interface Bucket {
  id: string;
  label: string;
  hourRange: [number, number];
  correct: number;
  total: number;
  totalResponseTimeMs: number;
  withTime: number;
}

const BUCKET_DEFS: Omit<Bucket, "correct" | "total" | "totalResponseTimeMs" | "withTime">[] = [
  { id: "madrugada", label: "Madrugada (0h–6h)", hourRange: [0, 6] },
  { id: "manha", label: "Manhã (6h–12h)", hourRange: [6, 12] },
  { id: "tarde", label: "Tarde (12h–18h)", hourRange: [12, 18] },
  { id: "noite", label: "Noite (18h–24h)", hourRange: [18, 24] },
];

/** Mínimo de tentativas no horário pra considerar o número honesto — abaixo disso é ruído, não
 * padrão real (mission: nunca inventar dado, estado "coletando dados" quando insuficiente). */
const MIN_ATTEMPTS_PER_BUCKET = 8;
const MIN_TOTAL_ATTEMPTS = 25;

export default function CronotipoPage() {
  const [buckets, setBuckets] = useState<Bucket[] | null>(null);
  const [totalAttempts, setTotalAttempts] = useState(0);

  useEffect(() => {
    (async () => {
      const db = getDB();
      const attempts = await db.attempts.where("studentId").equals(DEFAULT_STUDENT_ID).toArray();
      setTotalAttempts(attempts.length);

      const result: Bucket[] = BUCKET_DEFS.map((def) => ({ ...def, correct: 0, total: 0, totalResponseTimeMs: 0, withTime: 0 }));
      for (const a of attempts) {
        const hour = new Date(a.createdAt).getHours();
        const bucket = result.find((b) => hour >= b.hourRange[0] && hour < b.hourRange[1]);
        if (!bucket) continue;
        bucket.total += 1;
        if (a.isCorrect) bucket.correct += 1;
        if (a.responseTimeMs) {
          bucket.totalResponseTimeMs += a.responseTimeMs;
          bucket.withTime += 1;
        }
      }
      setBuckets(result);
    })();
  }, []);

  const hasEnoughData = totalAttempts >= MIN_TOTAL_ATTEMPTS;
  const reliableBuckets = buckets?.filter((b) => b.total >= MIN_ATTEMPTS_PER_BUCKET) ?? [];
  const best = reliableBuckets.length > 0 ? [...reliableBuckets].sort((a, b) => b.correct / b.total - a.correct / a.total)[0] : null;

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <Link href="/laboratorio" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
        <ArrowLeft size={14} aria-hidden /> Laboratório
      </Link>

      <PageHeader
        eyebrow="Laboratório · seu horário"
        title="Melhor horário pra estudar"
        description="Cruza seu histórico real de acerto e tempo de resposta com o horário em que você respondeu — só informativo, não muda seu calendário do Meu Curso."
      />

      {buckets === null ? (
        <ListSkeleton />
      ) : !hasEnoughData ? (
        <EmptyState
          icon={Clock3}
          title="Coletando dados"
          description={`Você tem ${totalAttempts} tentativa${totalAttempts === 1 ? "" : "s"} registrada${totalAttempts === 1 ? "" : "s"} até agora. Com pelo menos ${MIN_TOTAL_ATTEMPTS}, distribuídas em horários diferentes, começamos a mostrar um padrão real em vez de chute.`}
        />
      ) : (
        <>
          {best && (
            <div className="card p-4 mb-4 border-brand/30">
              <p className="text-[13px]">
                Seu melhor desempenho até agora é à <strong>{best.label.split(" (")[0].toLowerCase()}</strong>:{" "}
                <strong className="text-success">{Math.round((best.correct / best.total) * 100)}%</strong> de acerto em{" "}
                {best.total} tentativas.
              </p>
            </div>
          )}

          <div className="space-y-2.5">
            {buckets.map((b) => {
              const accuracy = b.total > 0 ? Math.round((b.correct / b.total) * 100) : null;
              const avgTime = b.withTime > 0 ? Math.round(b.totalResponseTimeMs / b.withTime / 1000) : null;
              const reliable = b.total >= MIN_ATTEMPTS_PER_BUCKET;
              return (
                <div key={b.id} className="card p-3.5 flex items-center justify-between gap-3">
                  <span className="text-[13px] font-medium">{b.label}</span>
                  {b.total === 0 ? (
                    <span className="text-[11px] text-foreground-subtle">sem tentativas</span>
                  ) : !reliable ? (
                    <span className="text-[11px] text-foreground-muted">
                      {b.total} tentativa{b.total === 1 ? "" : "s"} — poucos dados ainda
                    </span>
                  ) : (
                    <span className="text-[12px] text-foreground-muted">
                      <strong className={accuracy && accuracy >= 60 ? "text-success" : "text-foreground"}>{accuracy}%</strong> de{" "}
                      {b.total} · {avgTime ? `~${avgTime}s/questão` : "sem tempo medido"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}
