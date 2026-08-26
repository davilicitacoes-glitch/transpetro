"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** "Hoje" e "Meu Curso" eram duas telas separadas mostrando planos diferentes (plano de missões
 * antigo vs. trilha guiada por dia) — confuso para o aluno, que não sabia qual delas seguir de
 * verdade. "Meu Curso" é agora o único ponto de entrada; esta rota só existe para não quebrar
 * favoritos/atalhos antigos (inclusive o atalho instalado como PWA em celulares já configurados). */
export default function HojeRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/meu-curso");
  }, [router]);

  return (
    <main className="flex-1 flex items-center justify-center min-h-screen">
      <p className="text-foreground-muted text-sm">Redirecionando para Meu Curso…</p>
    </main>
  );
}
