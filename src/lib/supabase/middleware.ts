import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Renova o token de sessão do Supabase a cada requisição (padrão recomendado do @supabase/ssr para
 * Next.js App Router) e protege as rotas pessoais: sem sessão válida, redireciona para /login.
 * Rotas de catálogo público (biblioteca, vídeos, edital) continuam acessíveis sem login.
 */
const PUBLIC_ROUTES = ["/login", "/cadastro", "/recuperar-senha", "/curso", "/videoaulas", "/biblioteca", "/edital"];

function isPublicRoute(pathname: string): boolean {
  if (pathname === "/") return true;
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/manifest")) return true;
  if (/\.(svg|png|jpg|jpeg|ico|webmanifest|json)$/.test(pathname)) return true;
  return PUBLIC_ROUTES.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    // Supabase ainda não configurado neste ambiente — deixa a aplicação funcionar sem proteção de
    // rota em vez de derrubar todo o app com uma exceção (ex.: preview local sem .env.local ainda).
    return response;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) response.cookies.set(name, value, options);
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isPublicRoute(request.nextUrl.pathname)) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
