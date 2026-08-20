"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";

/**
 * Acessada a partir do link enviado por e-mail (redirectTo em resetPasswordForEmail). O Supabase já
 * troca o link por uma sessão temporária autenticada antes desta página carregar; aqui só pedimos a
 * nova senha e chamamos updateUser.
 */
export default function RedefinirSenhaPage() {
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/meu-curso");
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <p className="text-sm font-medium text-brand mb-1">Transpetro Estudos</p>
        <h1 className="text-2xl font-semibold mb-2">Escolher nova senha</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-surface border border-border rounded-xl p-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Nova senha
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm min-h-[44px]"
            />
          </div>
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium mb-1">
              Confirmar nova senha
            </label>
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm min-h-[44px]"
            />
          </div>
          {error && <p className="text-sm text-danger">{error}</p>}
          <button type="submit" disabled={loading || !configured} className="btn btn-primary w-full">
            {loading ? "Salvando…" : "Salvar nova senha"}
          </button>
        </form>
      </div>
    </main>
  );
}
