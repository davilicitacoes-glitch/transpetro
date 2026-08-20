"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/supabase/AuthProvider";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { signIn, configured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    router.push(params.get("next") ?? "/meu-curso");
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <p className="text-sm font-medium text-brand mb-1">Transpetro Estudos</p>
        <h1 className="text-2xl font-semibold mb-2">Entrar</h1>
        <p className="text-foreground-muted text-sm mb-6">
          Use a mesma conta no celular e no notebook para ver o mesmo progresso nos dois.
        </p>

        {!configured && (
          <div className="mb-4 rounded-lg border border-warning bg-warning-soft p-3 text-[13px]">
            Login ainda não está configurado neste ambiente (faltam as variáveis do Supabase).
          </div>
        )}

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
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Senha
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm min-h-[44px]"
            />
          </div>

          {error && <p className="text-sm text-danger">{error}</p>}

          <button type="submit" disabled={loading || !configured} className="btn btn-primary w-full">
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm">
          <Link href="/recuperar-senha" className="text-brand hover:underline">
            Esqueci minha senha
          </Link>
          <Link href="/cadastro" className="text-brand hover:underline">
            Criar conta
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
