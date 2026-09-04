/**
 * Esqueleto de carregamento das telas internas — substitui o "Carregando…" em texto puro que
 * aparecia igual em ~12 telas. Desenha a silhueta do que está prestes a aparecer (cabeçalho +
 * cards), então a tela não "pula" quando o conteúdo real chega.
 */
export function PageSkeleton({ cards = 3, header = true }: { cards?: number; header?: boolean }) {
  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full" aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando…</span>
      {header && (
        <div className="mb-6">
          <div className="skeleton h-3 w-24 mb-2.5" />
          <div className="skeleton h-6 w-56 mb-2" />
          <div className="skeleton h-3 w-full max-w-md" />
        </div>
      )}
      <div className="space-y-3">
        {Array.from({ length: cards }, (_, i) => (
          <div key={i} className="card p-4">
            <div className="skeleton h-3 w-20 mb-3" />
            <div className="skeleton h-4 w-3/4 mb-2.5" />
            <div className="skeleton h-3 w-1/2" />
          </div>
        ))}
      </div>
    </main>
  );
}

/** Esqueleto para um trecho de tela que carrega depois do resto (lista, resumo, histórico). */
export function ListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-2" aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando…</span>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="card p-3.5">
          <div className="skeleton h-3.5 w-2/3 mb-2" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      ))}
    </div>
  );
}

/** Splash de abertura do app (layout autenticado), enquanto a sessão é resolvida. */
export function AppBootScreen() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-screen gap-3" aria-busy="true" aria-live="polite">
      <span
        className="animate-brand-pulse flex items-center justify-center w-12 h-12 rounded-xl text-brand-foreground font-display font-bold shrink-0"
        style={{ background: "linear-gradient(135deg, var(--brand), var(--accent))", boxShadow: "var(--shadow-brand)" }}
        aria-hidden
      >
        T
      </span>
      <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">Transpetro Estudos</p>
    </main>
  );
}
