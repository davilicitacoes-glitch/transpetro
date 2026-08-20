import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Cliente Supabase do servidor (Route Handlers / Server Components), usando cookies para manter
 * a sessão. Nunca usa a service_role key — roda com os mesmos privilégios do usuário autenticado,
 * então continua protegido pelas mesmas políticas RLS do cliente do navegador.
 */
export async function getSupabaseServerClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Supabase não configurado: defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // chamado de um Server Component sem permissão de escrita de cookie — o middleware
          // já cuida de renovar a sessão nesse caso, então é seguro ignorar aqui.
        }
      },
    },
  });
}
