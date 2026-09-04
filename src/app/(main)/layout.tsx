"use client";

import { NavShell } from "@/components/nav/NavShell";
import { AppBootScreen } from "@/components/ui/PageSkeleton";
import { useTranspetroStore } from "@/lib/store/useTranspetroStore";

/**
 * ANTES: este layout — que envolve TODA página autenticada, inclusive /meu-curso — travava
 * qualquer navegação até existir um `profile` local (Dexie, do onboarding legado de
 * horas-disponíveis/nível percebido, sistema StudyPlan anterior ao "Meu Curso"). Um dispositivo
 * novo (primeiro login, PWA reinstalado) sempre começa com esse profile vazio, então TODO aluno
 * novo era redirecionado pra /onboarding -> /diagnostico ANTES de conseguir chegar em /meu-curso —
 * um funil de entrada completamente desconectado da matrícula real (que já existe dentro da
 * própria tela de /meu-curso). Nenhuma outra tela do app lê esse `profile` (só /configuracoes, que
 * já trata a ausência dele com fallback), então o gate era só um obstáculo, não uma dependência
 * real. Removido — só espera o banco local abrir (`ready`) antes de renderizar.
 */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  const ready = useTranspetroStore((s) => s.ready);

  if (!ready) return <AppBootScreen />;

  return <NavShell>{children}</NavShell>;
}
