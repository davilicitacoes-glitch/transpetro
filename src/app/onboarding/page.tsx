"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranspetroStore } from "@/lib/store/useTranspetroStore";
import type { LearnerProfile } from "@/lib/models/schema";

export default function OnboardingPage() {
  const router = useRouter();
  const completeOnboarding = useTranspetroStore((s) => s.completeOnboarding);
  const [weekdayHours, setWeekdayHours] = useState(4);
  const [weekendHours, setWeekendHours] = useState(5);
  const [perceivedLevel, setPerceivedLevel] = useState<LearnerProfile["perceivedLevel"]>("intermediario");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await completeOnboarding({ weekdayHours, weekendHours, perceivedLevel });
    router.push("/diagnostico");
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <p className="text-sm font-medium text-brand mb-1">Transpetro Estudos</p>
        <h1 className="text-2xl font-semibold mb-2">Vamos calibrar sua rotina de estudo</h1>
        <p className="text-foreground-muted text-sm mb-8">
          Três escolhas rápidas — dá para ajustar depois em Configurações. Em seguida, um diagnóstico curto (até 30
          minutos) libera sua primeira missão hoje mesmo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-surface border border-border rounded-xl p-6">
          <div>
            <label htmlFor="weekday" className="block text-sm font-medium mb-1">
              Horas disponíveis em dias úteis
            </label>
            <input
              id="weekday"
              type="number"
              min={1}
              max={12}
              step={0.5}
              value={weekdayHours}
              onChange={(e) => setWeekdayHours(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus-visible:outline-none"
            />
            <p className="text-xs text-foreground-muted mt-1">Padrão intensivo: 4h.</p>
          </div>

          <div>
            <label htmlFor="weekend" className="block text-sm font-medium mb-1">
              Horas disponíveis aos fins de semana
            </label>
            <input
              id="weekend"
              type="number"
              min={1}
              max={14}
              step={0.5}
              value={weekendHours}
              onChange={(e) => setWeekendHours(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus-visible:outline-none"
            />
            <p className="text-xs text-foreground-muted mt-1">Padrão intensivo: 5h.</p>
          </div>

          <fieldset>
            <legend className="block text-sm font-medium mb-2">Nível inicial percebido</legend>
            <div className="grid grid-cols-3 gap-2">
              {(["iniciante", "intermediario", "avancado"] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setPerceivedLevel(level)}
                  aria-pressed={perceivedLevel === level}
                  className={`rounded-lg border px-3 py-2 text-sm capitalize transition-colors ${
                    perceivedLevel === level
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border bg-surface text-foreground hover:bg-surface-muted"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-brand text-brand-foreground font-medium py-2.5 hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Salvando…" : "Continuar para o diagnóstico"}
          </button>
        </form>
      </div>
    </main>
  );
}
