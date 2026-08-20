import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { CODEX_LEGAL_REVIEW } from "@/content/legal/codex";

export default function LeiSecaPage() {
  const pending = CODEX_LEGAL_REVIEW.filter((item) => item.needsOfficialCheck).length;
  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
      <Link href="/biblioteca" className="tap-target gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4"><ArrowLeft size={14} /> Biblioteca</Link>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand mb-1">Prompt 9 · material de apoio</p>
      <h1 className="text-[23px] font-bold tracking-tight mb-2">Lei seca comentada</h1>
      <p className="text-sm text-foreground-muted mb-4">{CODEX_LEGAL_REVIEW.length} dispositivos com texto, comentário, pegadinha e forma de cobrança.</p>
      {pending > 0 && <div className="card p-4 mb-5 border-warning bg-warning-soft text-xs flex gap-2"><AlertTriangle size={15} className="shrink-0" /><span>{pending} sínteses permanecem marcadas <strong>[REDAÇÃO A CONFERIR]</strong>. Elas não são apresentadas como transcrição literal até conferência oficial; use o comentário didático e abra a fonte oficial citada nas aulas.</span></div>}
      <div className="space-y-3">
        {CODEX_LEGAL_REVIEW.map((item) => <details key={item.id} className="card p-4"><summary className="cursor-pointer text-sm font-semibold">{item.title}{item.needsOfficialCheck ? " · conferir literalidade" : ""}</summary><div className="mt-3 space-y-3 text-[13px]"><div><p className="text-[10px] uppercase tracking-wide text-foreground-muted mb-1">Texto legal / síntese sinalizada</p><p className="leading-relaxed">{item.literalText}</p></div><div className="rounded-lg bg-surface-muted p-3"><p className="font-medium mb-1">Comentário</p><p className="text-foreground-muted whitespace-pre-line">{item.comment}</p></div><p><strong>Pegadinha:</strong> {item.trap}</p><p><strong>Como cai:</strong> {item.howItAppears}</p></div></details>)}
      </div>
    </main>
  );
}
