export function AuthHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2.5 mb-5">
        <span
          className="flex items-center justify-center w-9 h-9 rounded-lg text-brand-foreground font-display font-bold text-sm shrink-0"
          style={{ background: "linear-gradient(135deg, var(--brand), var(--accent))", boxShadow: "var(--shadow-brand)" }}
        >
          T
        </span>
        <p className="text-sm font-bold text-foreground-muted tracking-wide uppercase">Transpetro Estudos</p>
      </div>
      <h1 className="text-2xl font-display font-bold mb-2">{title}</h1>
      {description && <p className="text-foreground-muted text-sm mb-6">{description}</p>}
    </div>
  );
}
