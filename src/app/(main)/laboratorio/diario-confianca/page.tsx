"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Info, SmilePlus } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/ui/PageHeader";
import { getDB } from "@/lib/db/dexie";
import { recordConfidenceCheckin, computeConfidencePattern, type ConfidencePattern } from "@/lib/lab/confidenceJournal";
import { DEFAULT_STUDENT_ID, type ConfidenceCheckin, type ConfidenceCheckinMoment } from "@/lib/models/schema";

const VALUE_LABEL: Record<number, string> = {
  1: "Muito ansioso(a)",
  2: "Um pouco ansioso(a)",
  3: "Neutro",
  4: "Confiante",
  5: "Muito confiante",
};

export default function DiarioConfiancaPage() {
  const [moment, setMoment] = useState<ConfidenceCheckinMoment>("antes");
  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState<ConfidenceCheckin[]>([]);
  const [pattern, setPattern] = useState<ConfidencePattern | null>(null);

  async function load() {
    const db = getDB();
    const all = await db.confidenceCheckins.where("studentId").equals(DEFAULT_STUDENT_ID).toArray();
    setHistory(all.sort((a, b) => b.occurredAt.localeCompare(a.occurredAt)).slice(0, 20));
    setPattern(await computeConfidencePattern());
  }

  useEffect(() => {
    load();
  }, []);

  async function checkIn(value: number) {
    setSaving(true);
    await recordConfidenceCheckin(moment, value);
    await load();
    setSaving(false);
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <Link href="/laboratorio" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
        <ArrowLeft size={14} aria-hidden /> Laboratório
      </Link>

      <PageHeader
        eyebrow="Laboratório · diário de confiança"
        title="Diário de confiança"
        description="Check-in rápido e opcional, sem julgamento — só um espelho pra você mesmo ver se existe um padrão real entre como você chega pro estudo e como se sai."
      />

      <div className="card p-4 mb-5">
        <div className="flex gap-1.5 mb-3 p-1 bg-surface-muted rounded-lg w-fit">
          {(["antes", "depois"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMoment(m)}
              className={`rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                moment === m ? "bg-surface text-foreground shadow-sm" : "text-foreground-muted hover:text-foreground"
              }`}
            >
              {m === "antes" ? "Antes de estudar" : "Depois de estudar"}
            </button>
          ))}
        </div>
        <p className="text-[12.5px] text-foreground-muted mb-3">Como você está se sentindo agora?</p>
        <div className="grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => checkIn(v)}
              disabled={saving}
              className="flex flex-col items-center gap-1 rounded-lg border border-border py-2.5 hover:border-brand hover:bg-brand-soft transition-colors disabled:opacity-50"
            >
              <span className="text-[16px] font-bold">{v}</span>
              <span className="text-[9.5px] text-foreground-muted text-center leading-tight">{VALUE_LABEL[v]}</span>
            </button>
          ))}
        </div>
      </div>

      <section className="card p-4 mb-5">
        <h2 className="text-[13px] font-semibold mb-2.5">Padrão real (confiança × desempenho)</h2>
        {!pattern || !pattern.hasEnoughData ? (
          <p className="text-[12.5px] text-foreground-muted">
            Coletando dados — {pattern?.daysAnalyzed ?? 0} dia(s) com check-in e estudo no mesmo dia até agora. Precisa de pelo menos 2 dias de
            confiança baixa e 2 de confiança alta pra comparar com honestidade.
          </p>
        ) : (
          <div className="flex items-start gap-2 text-[12.5px]">
            <Info size={14} className="text-brand shrink-0 mt-0.5" aria-hidden />
            <p>
              Nos {pattern.lowConfidenceDayCount} dia(s) em que sua confiança registrada foi baixa, sua acurácia média foi{" "}
              <strong>{Math.round((pattern.lowConfidenceAccuracy ?? 0) * 100)}%</strong>. Nos {pattern.highConfidenceDayCount} dia(s) de confiança
              alta, foi <strong>{Math.round((pattern.highConfidenceAccuracy ?? 0) * 100)}%</strong>. Pode ser coincidência de amostra pequena —
              não é diagnóstico de nada, só um dado real seu pra observar ao longo do tempo.
            </p>
          </div>
        )}
      </section>

      {history.length === 0 ? (
        <EmptyState icon={SmilePlus} title="Nenhum check-in ainda" description="Registre acima, antes ou depois de estudar — leva 2 segundos." />
      ) : (
        <div className="space-y-1.5">
          {history.map((c) => (
            <div key={c.id} className="flex items-center justify-between text-[12.5px] py-1.5 border-b border-border last:border-0">
              <span className="text-foreground-muted">
                {new Date(c.occurredAt).toLocaleDateString("pt-BR")} · {c.moment === "antes" ? "antes" : "depois"} de estudar
              </span>
              <span className="font-medium">
                {c.value} · {VALUE_LABEL[c.value]}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
