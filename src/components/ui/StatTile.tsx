const ACCENT_CLASS = {
  brand: "text-brand",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  accent: "text-accent-hover",
} as const;

/** Bloco de estatística compacto (número grande + rótulo pequeno) — reaproveitado em todo canto do
 * app que antes só listava números soltos num `.card` genérico (ver docs/CONTINUIDADE_ENSIPETRO.md,
 * passe de polimento visual 2026-09-04). */
export function StatTile({
  value,
  label,
  accent = "brand",
}: {
  value: string | number;
  label: string;
  accent?: keyof typeof ACCENT_CLASS;
}) {
  return (
    <div className="rounded-xl bg-surface-muted py-3 px-1 text-center">
      <p className={`text-[19px] font-display font-bold leading-none mb-1 ${ACCENT_CLASS[accent]}`}>{value}</p>
      <p className="text-[10px] uppercase tracking-wide text-foreground-muted">{label}</p>
    </div>
  );
}
