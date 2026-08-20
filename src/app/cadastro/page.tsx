"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/supabase/AuthProvider";

export default function CadastroPage() {
  const { signUp, configured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
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
    const { error } = await signUp(email, password);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm text-center">
          <p className="text-sm font-medium text-brand mb-1">Transpetro Estudos</p>
          <h1 className="text-2xl font-semibold mb-3">Quase lá</h1>
          <p className="text-foreground-muted text-sm mb-6">
            Enviamos um e-mail de confirmação para <strong>{email}</strong>. Abra-o e clique no link para ativar sua
            conta — depois é só entrar normalmente.
          </p>
          <Link href="/login" className="btn btn-primary w-full inline-flex justify-center">
            Ir para o login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <p className="text-sm font-medium text-brand mb-1">Transpetro Estudos</p>
        <h1 className="text-2xl font-semibold mb-2">Criar conta</h1>
        <p className="text-foreground-muted text-sm mb-6">
          Sua conta guarda o progresso do Meu Curso e sincroniza entre o celular e o notebook.
        </p>

        {!configured && (
          <div className="mb-4 rounded-lg border border-warning bg-warning-soft p-3 text-[13px]">
            Cadastro ainda não está configurado neste ambiente (faltam as variáveis do Supabase).
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
              Confirmar senha
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
            {loading ? "Criando conta…" : "Criar conta"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Já tem conta?{" "}
          <Link href="/login" className="text-brand hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
