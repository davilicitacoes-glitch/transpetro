"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase do navegador. Usa apenas variáveis públicas (URL + chave anon) — a segurança
 * de acesso aos dados pessoais vem das políticas RLS no Postgres (ver supabase/migrations/0001_init.sql),
 * nunca do sigilo da chave anon, que é pública por design do Supabase.
 */
let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (typeof window === "undefined") {
    throw new Error("getSupabaseBrowserClient só pode ser chamado no cliente.");
  }
  if (!browserClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anonKey) {
      throw new Error(
        "Supabase não configurado: defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY em .env.local (ver .env.example).",
      );
    }
    browserClient = createBrowserClient(url, anonKey);
  }
  return browserClient;
}

/** true quando as variáveis públicas do Supabase estão presentes — usado para degradar a UI
 * (mostrar aviso de configuração pendente) em vez de quebrar com uma exceção não tratada. */
export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
