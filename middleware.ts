import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Roda em toda rota exceto assets estáticos do Next e arquivos de manifesto/ícone —
     * ver PUBLIC_ROUTES em src/lib/supabase/middleware.ts para as exceções de autenticação.
     */
    "/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|sw.js|icons/).*)",
  ],
};
