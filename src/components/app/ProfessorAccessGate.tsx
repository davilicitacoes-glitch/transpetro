"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { useProfessorAccess } from "@/lib/professor/useProfessorAccess";

/** Trava todo o subtree de /professor: só o dono (OWNER_EMAIL) ou quem ele liberar manualmente
 * (coluna `professor_access` em `profiles`, no Supabase) consegue ver o conteúdo. Qualquer outra
 * conta vê uma tela de acesso restrito, sem expor nada do Professor. */
export function ProfessorAccessGate({ children }: { children: React.ReactNode }) {
  const { loading, configured } = useAuth();
  const allowed = useProfessorAccess();

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-foreground-muted">Verificando acesso…</p>
      </main>
    );
  }

  if (allowed) return <>{children}</>;

  return (
    <main className="flex-1 flex items-center justify-center min-h-[60vh] px-4">
      <div className="card p-6 max-w-sm text-center">
        <span className="inline-flex w-12 h-12 rounded-full bg-surface-muted text-foreground-muted items-center justify-center mb-3">
          <Lock size={20} aria-hidden />
        </span>
        <p className="font-display font-semibold text-[15px] mb-1.5">Acesso restrito</p>
        <p className="text-sm text-foreground-muted mb-4">
          {!configured
            ? "O Professor ainda não está disponível neste ambiente."
            : "O Professor (IA) está disponível apenas para contas liberadas. Fale com quem te enviou o acesso ao curso."}
        </p>
        <Link href="/meu-curso" className="btn btn-primary w-full inline-flex justify-center">
          Voltar ao Meu Curso
        </Link>
      </div>
    </main>
  );
}
