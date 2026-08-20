"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { pullCloudIntoLocalCache } from "@/lib/supabase/sync";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  configured: boolean;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/** Traduz as mensagens mais comuns do Supabase Auth para português — evita expor jargão de API. */
function translateAuthError(message: string): string {
  const map: Record<string, string> = {
    "Invalid login credentials": "E-mail ou senha incorretos.",
    "User already registered": "Já existe uma conta com este e-mail.",
    "Email not confirmed": "Confirme seu e-mail antes de entrar (veja sua caixa de entrada).",
    "Password should be at least 6 characters": "A senha precisa ter pelo menos 6 caracteres.",
    "Unable to validate email address: invalid format": "Digite um e-mail válido.",
  };
  return map[message] ?? message;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isSupabaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }
    const supabase = getSupabaseBrowserClient();

    supabase.auth.getSession().then((result: { data: { session: Session | null } }) => {
      setSession(result.data.session);
      setUser(result.data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event: string, newSession: Session | null) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      // Hidrata o cache local (Dexie) com os dados reais da conta a cada novo login — é assim que
      // um dispositivo novo (celular/notebook) passa a ver o progresso feito no outro.
      if (event === "SIGNED_IN") {
        pullCloudIntoLocalCache().catch(() => {
          // falha de hidratação não deve travar o login; o app volta a funcionar com cache vazio/antigo
          // e tentará sincronizar normalmente nas próximas gravações.
        });
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [configured]);

  async function signUp(email: string, password: string) {
    if (!configured) return { error: "Supabase não configurado neste ambiente." };
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/login` },
    });
    return { error: error ? translateAuthError(error.message) : null };
  }

  async function signIn(email: string, password: string) {
    if (!configured) return { error: "Supabase não configurado neste ambiente." };
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? translateAuthError(error.message) : null };
  }

  async function signOut() {
    if (!configured) return;
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
  }

  async function resetPassword(email: string) {
    if (!configured) return { error: "Supabase não configurado neste ambiente." };
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/redefinir-senha`,
    });
    return { error: error ? translateAuthError(error.message) : null };
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, configured, signUp, signIn, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de <AuthProvider>.");
  return ctx;
}
