"use client";

import { useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { previewLocalPersonalData, wasLocalDataMigrated, migrateLocalDataToCloud, type MigrationPreview } from "@/lib/supabase/migration";

/**
 * Aparece só quando: há usuário logado + este dispositivo tem progresso local (Dexie) de antes do
 * login + esse progresso ainda não foi confirmado como migrado nesta conta. Mostra uma prévia real
 * (contagens, não estimativas) antes de enviar — nunca migra em silêncio, nunca apaga o IndexedDB.
 */
export function MigrationBanner() {
  const { user } = useAuth();
  const [preview, setPreview] = useState<MigrationPreview | null>(null);
  const [migrating, setMigrating] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (wasLocalDataMigrated(user.id)) return;
    previewLocalPersonalData().then((p) => {
      if (p.hasRealProgress) setPreview(p);
    });
  }, [user]);

  if (!user || !preview || done) return null;

  async function handleMigrate() {
    if (!user) return;
    setMigrating(true);
    await migrateLocalDataToCloud(user.id);
    setMigrating(false);
    setDone(true);
  }

  return (
    <div className="card p-4 mb-4 border-brand bg-brand-soft">
      <div className="flex items-start gap-2 mb-2">
        <UploadCloud size={16} className="text-brand shrink-0 mt-0.5" aria-hidden />
        <p className="text-[13.5px]">
          Encontramos progresso salvo neste dispositivo de antes do login: <strong>{preview.attempts} tentativa(s)</strong>,{" "}
          <strong>{preview.learningEvents} evento(s)</strong>
          {preview.courseEnrollments > 0 ? ", matrícula no Meu Curso" : ""}. Quer enviar para a sua conta agora?
        </p>
      </div>
      <button type="button" onClick={handleMigrate} disabled={migrating} className="btn btn-primary w-full">
        {migrating ? "Enviando…" : "Enviar progresso para minha conta"}
      </button>
      <p className="text-[11px] text-foreground-muted mt-2">Nada é apagado deste aparelho — só é copiado para a nuvem.</p>
    </div>
  );
}
