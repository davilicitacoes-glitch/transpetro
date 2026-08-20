export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-6 flex items-start justify-between gap-4 flex-wrap">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand mb-1">{eyebrow}</p>
        <h1 className="text-[26px] font-bold tracking-tight leading-tight">{title}</h1>
        {description && <p className="text-foreground-muted text-sm mt-1.5 max-w-2xl">{description}</p>}
      </div>
      {action}
    </header>
  );
}

export function EmptyState({ icon: Icon, title, description, action }: { icon: React.ElementType; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="card p-8 text-center">
      <span className="inline-flex w-12 h-12 rounded-full bg-surface-muted text-foreground-muted items-center justify-center mb-3">
        <Icon size={22} aria-hidden />
      </span>
      <p className="font-semibold text-[15px] mb-1">{title}</p>
      <p className="text-sm text-foreground-muted max-w-md mx-auto mb-4">{description}</p>
      {action}
    </div>
  );
}
