"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

/**
 * Registra o service worker e mostra "Nova versão do Transpetro Estudos disponível — Atualizar agora" quando
 * o navegador baixa um SW novo (= novo deploy). Atualizar não apaga nada local: o Dexie e a fila de
 * sincronização pendente continuam intactos, só o HTML/JS trocam (skipWaiting + reload controlado
 * pelo próprio clique do usuário, nunca automático, para não interromper uma resposta em andamento).
 */
export function UpdatePrompt() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return; // evita cache de chunks do "next dev" (sem hash estável) mascarando edições locais

    navigator.serviceWorker.register("/sw.js").then((registration) => {
      if (registration.waiting) setWaitingWorker(registration.waiting);

      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            setWaitingWorker(newWorker);
          }
        });
      });
    });

    let reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    });
  }, []);

  if (!waitingWorker) return null;

  function handleUpdate() {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-3 bg-brand text-brand-foreground px-4 py-2.5 text-sm"
      role="status"
    >
      <span>Nova versão do Transpetro Estudos disponível.</span>
      <button
        type="button"
        onClick={handleUpdate}
        className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 font-medium hover:bg-white/30"
      >
        <RefreshCw size={13} aria-hidden />
        Atualizar agora
      </button>
    </div>
  );
}
