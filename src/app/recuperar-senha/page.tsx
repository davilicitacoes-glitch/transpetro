"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/supabase/AuthProvider";

export default function RecuperarSenhaPage() {
  const { resetPassword, configured } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    setSent(true);
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <p className="text-sm font-medium text-brand mb-1">Transpetro Estudos</p>
        <h1 className="text-2xl font-semibold mb-2">Recuperar senha</h1>
        <p className="text-foreground-muted text-sm mb-6">
          Informe o e-mail da sua conta. Enviaremos um link para você escolher uma nova senha.
        </p>

        {sent ? (
          <div className="rounded-lg border border-success bg-success-soft p-4 text-sm">
            Se existir uma conta com esse e-mail, enviamos um link de redefinição. Confira sua caixa de entrada.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-surface border border-border rounded-xl p-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm min-h-[44px]"
              />
            </div>
            {error && <p className="text-sm text-danger">{error}</p>}
            <button type="submit" disabled={loading || !configured} className="btn btn-primary w-full">
              {loading ? "Enviando…" : "Enviar link de recuperação"}
            </button>
          </form>
        )}

        <p className="mt-4 text-sm text-center">
          <Link href="/login" className="text-brand hover:underline">
            Voltar para o login
          </Link>
        </p>
      </div>
    </main>
  );
}
