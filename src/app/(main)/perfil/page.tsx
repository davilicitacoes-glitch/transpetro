"use client";

import { useRouter } from "next/navigation";
import { LogOut, Mail } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useAuth } from "@/lib/supabase/AuthProvider";

export default function PerfilPage() {
  const router = useRouter();
  const { user, signOut, configured } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-xl mx-auto w-full animate-fade-in">
      <PageHeader eyebrow="Conta" title="Meu perfil" />

      {!configured ? (
        <div className="card p-4 border-warning bg-warning-soft text-sm">
          Login não está configurado neste ambiente.
        </div>
      ) : user ? (
        <div className="card p-5 space-y-4">
          {typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name.trim() && (
            <p className="text-[17px] font-display font-semibold">{user.user_metadata.full_name}</p>
          )}
          <div className="flex items-center gap-2 text-sm">
            <Mail size={15} className="text-foreground-muted" aria-hidden />
            {user.email}
          </div>
          <button type="button" onClick={handleSignOut} className="btn btn-secondary w-full">
            <LogOut size={16} aria-hidden />
            Sair
          </button>
        </div>
      ) : (
        <p className="text-sm text-foreground-muted">Você não está logado.</p>
      )}
    </main>
  );
}
