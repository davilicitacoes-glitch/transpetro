"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * O antigo "Cronograma" (lista genérica de 34 missões) foi substituído por "Meu Curso" — um
 * percurso guiado real (dia -> etapas -> aula -> vídeo -> questões -> revisão), não apenas uma
 * lista de datas. Nenhum dado antigo foi apagado (o `StudyPlan`/`studyPlans` continua no Dexie);
 * esta rota apenas redireciona para não deixar um link morto no app.
 */
export default function CronogramaRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/meu-curso");
  }, [router]);
  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full">
      <p className="text-sm text-foreground-muted">O Cronograma virou Meu Curso — redirecionando…</p>
    </main>
  );
}
