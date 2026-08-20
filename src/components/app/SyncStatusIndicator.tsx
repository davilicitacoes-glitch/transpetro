"use client";

import { Cloud, CloudOff, CloudUpload, AlertCircle } from "lucide-react";
import { useSyncStatus, SYNC_STATE_LABEL } from "@/lib/supabase/syncStatus";

/**
 * Indicador discreto de sincronização (seção 7 da missão: nunca esconder falha de rede em silêncio).
 * Fica invisível em "idle"; some sozinho pouco depois de "synced" para não poluir a tela.
 */
export function SyncStatusIndicator() {
  const { state } = useSyncStatus();

  if (state === "idle") return null;

  const config = {
    syncing: { icon: CloudUpload, className: "bg-surface-muted text-foreground-muted" },
    synced: { icon: Cloud, className: "bg-success-soft text-success" },
    offline: { icon: CloudOff, className: "bg-warning-soft text-warning" },
    error: { icon: AlertCircle, className: "bg-danger-soft text-danger" },
  }[state];

  const Icon = config.icon;

  return (
    <div
      className={`fixed bottom-20 md:bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium shadow-md ${config.className}`}
      role="status"
    >
      <Icon size={13} aria-hidden />
      {SYNC_STATE_LABEL[state]}
    </div>
  );
}
