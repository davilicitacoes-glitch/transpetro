import { create } from "zustand";

export type SyncState = "idle" | "syncing" | "synced" | "offline" | "error";

interface SyncStatusStore {
  state: SyncState;
  lastError: string | null;
  set: (state: SyncState, lastError?: string | null) => void;
}

/**
 * Estado global e discreto de sincronização com a nuvem, para a interface mostrar algo honesto
 * ("Salvo e sincronizado" / "Salvando…" / "Sem internet — será sincronizado depois" /
 * "Falha ao sincronizar — tentar novamente") em vez de esconder falhas de rede.
 */
export const useSyncStatus = create<SyncStatusStore>((set) => ({
  state: "idle",
  lastError: null,
  set: (state, lastError = null) => set({ state, lastError }),
}));

export const SYNC_STATE_LABEL: Record<SyncState, string> = {
  idle: "",
  syncing: "Salvando…",
  synced: "Salvo e sincronizado",
  offline: "Sem internet — será sincronizado depois",
  error: "Falha ao sincronizar — tentar novamente",
};
