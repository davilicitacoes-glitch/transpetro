"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Rota antiga "Mapa dos 34 dias" — o calendário real (grade mensal + agenda) assumiu o lugar dela.
 * Mantida como redirect para não quebrar links/favoritos já existentes. */
export default function MapaRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/meu-curso/calendario");
  }, [router]);
  return null;
}
