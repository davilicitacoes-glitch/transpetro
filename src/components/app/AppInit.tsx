"use client";

import { useEffect } from "react";
import { useTranspetroStore } from "@/lib/store/useTranspetroStore";

/** Inicializa o banco local (seed) e o tema salvo assim que o app carrega no cliente. */
export function AppInit() {
  const init = useTranspetroStore((s) => s.init);

  useEffect(() => {
    init();

    const savedTheme = window.localStorage.getItem("transpetro-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, [init]);

  return null;
}
