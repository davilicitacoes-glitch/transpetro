"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { AuthHeader } from "@/components/ui/AuthHeader";

const OCCUPATION_OPTIONS = [
  "Estudante",
  "Empregado(a) — setor privado",
  "Servidor(a) público(a)",
  "Concurseiro(a) em tempo integral",
  "Desempregado(a)",
  "Autônomo(a)/empreendedor(a)",
  "Outro",
];

const REFERRAL_OPTIONS = [
  "Indicação de amigo/colega",
  "Instagram",
  "TikTok",
  "YouTube",
  "Grupo de WhatsApp/Telegram",
  "Google/pesquisa",
  "Outro",
];

export default function CadastroPage() {
  const { signUp, configured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [occupation, setOccupation] = useState("");
  const [studyGoal, setStudyGoal] = useState("");
  const [referralSource, setReferralSource] = useState("");
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
    const { error } = await signUp(email, password, {
      full_name: fullName,
      whatsapp,
      occupation,
      study_goal: studyGoal,
      referral_source: referralSource,
    });
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
          <AuthHeader title="Quase lá" />
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
      <div className="w-full max-w-sm animate-fade-in">
        <AuthHeader title="Criar conta" description="Sua conta guarda o progresso do Meu Curso e sincroniza entre o celular e o notebook." />

        {!configured && (
          <div className="mb-4 rounded-lg border border-warning bg-warning-soft p-3 text-[13px]">
            Cadastro ainda não está configurado neste ambiente (faltam as variáveis do Supabase).
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 card-raised p-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-1">
              Nome completo
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm min-h-[44px]"
            />
          </div>

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
            <label htmlFor="whatsapp" className="block text-sm font-medium mb-1">
              WhatsApp
            </label>
            <input
              id="whatsapp"
              type="tel"
              autoComplete="tel"
              placeholder="(00) 00000-0000"
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
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

          <div className="h-px bg-border" />

          <div>
            <label htmlFor="occupation" className="block text-sm font-medium mb-1">
              O que você faz hoje?
            </label>
            <select
              id="occupation"
              required
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm min-h-[44px]"
            >
              <option value="" disabled>
                Selecione…
              </option>
              {OCCUPATION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="studyGoal" className="block text-sm font-medium mb-1">
              Por que você está estudando para a Transpetro?
            </label>
            <textarea
              id="studyGoal"
              rows={2}
              placeholder="Ex.: estabilidade, salário, mudar de área..."
              value={studyGoal}
              onChange={(e) => setStudyGoal(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm resize-none"
            />
          </div>

          <div>
            <label htmlFor="referralSource" className="block text-sm font-medium mb-1">
              Como você conheceu esse curso?
            </label>
            <select
              id="referralSource"
              value={referralSource}
              onChange={(e) => setReferralSource(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm min-h-[44px]"
            >
              <option value="" disabled>
                Selecione…
              </option>
              {REFERRAL_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
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
