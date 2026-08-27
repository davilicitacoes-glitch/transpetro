"use client";

import { useEffect, useState } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { previewLocalPersonalData, wasLocalDataMigrated, migrateLocalDataToCloud } from "@/lib/supabase/migration";

/**
 * Aparece só quando: há usuário logado + este dispositivo tem progresso local (Dexie) de antes do
 * login + esse progresso ainda não foi confirmado como migrado nesta conta. O envio é AUTOMÁTICO
 * assim que detectado (o aluno não deveria precisar apertar um botão pra salvar o próprio
 * progresso) — a função de migração é idempotente e só copia (nunca apaga o IndexedDB), então não
 * há risco em disparar sozinha. Este componente só mostra um aviso discreto e transitório do que
 * está/foi feito, sem exigir nenhuma ação do aluno.
 */
export function MigrationBanner() {
  const { user } = useAuth();
  const [status, setStatus] = useState<"idle" | "migrating" | "done">("idle");
  const [counts, setCounts] = useState<{ attempts: number; learningEvents: number; courseEnrollments: number } | null>(null);

  useEffect(() => {
    if (!user) return;
    if (wasLocalDataMigrated(user.id)) return;
    let cancelled = false;
    (async () => {
      const preview = await previewLocalPersonalData();
      if (cancelled || !preview.hasRealProgress) return;
      setCounts(preview);
      setStatus("migrating");
      await migrateLocalDataToCloud(user.id);
      if (cancelled) return;
      setStatus("done");
      // some sozinho depois de um tempo — é só uma confirmação passageira, não uma etapa a resolver.
      setTimeout(() => { if (!cancelled) setStatus("idle"); }, 4000);
    })();
    return () => { cancelled = true; };
  }, [user]);

  if (status === "idle" || !counts) return null;

  return (
    <div className="card p-3.5 mb-4 border-brand bg-brand-soft">
      <div className="flex items-center gap-2 text-[13px]">
        {status === "migrating" ? (
          <>
            <UploadCloud size={15} className="text-brand shrink-0 animate-pulse" aria-hidden />
            <span>Sincronizando seu progresso salvo neste aparelho com a sua conta…</span>
          </>
        ) : (
          <>
            <CheckCircle2 size={15} className="text-success shrink-0" aria-hidden />
            <span>Progresso sincronizado com a sua conta ({counts.attempts} tentativa(s), {counts.learningEvents} evento(s)).</span>
          </>
        )}
      </div>
    </div>
  );
}
