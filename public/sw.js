// Service worker do TRANSPETRO. Estratégia deliberadamente simples e segura:
// - NUNCA intercepta chamadas ao Supabase nem qualquer requisição autenticada — evita cachear
//   dados pessoais em um cache compartilhado do navegador (proibido pela missão).
// - HTML/navegação: network-first (o aluno sempre vê a versão mais nova quando online); cai para
//   o cache só quando realmente está offline, mostrando a última página visitada.
// - Assets estáticos do Next (_next/static, ícones): cache-first — não mudam de conteúdo entre
//   deploys (nome de arquivo tem hash), então é seguro e rápido.
// - Versão do cache muda a cada deploy (o número abaixo) — isso é o que aciona o aviso de
//   "nova versão disponível" na interface (ver src/components/app/UpdatePrompt.tsx).

const VERSION = "transpetro-v1";
const STATIC_CACHE = `${VERSION}-static`;

const NEVER_CACHE_PATTERNS = [/supabase\.co/, /\/api\//];

self.addEventListener("install", () => {
  // não pula direto para "ativo" — só quando o usuário clicar em "Atualizar agora"
  // (ver src/components/app/UpdatePrompt.tsx), para não trocar a versão em uso no meio de uma ação.
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== STATIC_CACHE).map((k) => caches.delete(k)))),
  );
  self.clients.claim();
});

function isNeverCache(url) {
  return NEVER_CACHE_PATTERNS.some((re) => re.test(url));
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (isNeverCache(url.href)) return; // deixa passar direto para a rede, sem interceptar

  const isStaticAsset = url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/");
  const isNavigation = request.mode === "navigate";

  if (isStaticAsset) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (response.ok) cache.put(request, response.clone());
        return response;
      }),
    );
    return;
  }

  if (isNavigation) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, response.clone()));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached ?? caches.match("/meu-curso"))),
    );
  }
});
