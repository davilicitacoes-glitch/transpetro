"use client";

import { useEffect, useState } from "react";
import { NotebookPen, Plus, Trash2 } from "lucide-react";
import { getDB } from "@/lib/db/dexie";
import { TOPICS } from "@/content/curriculum";
import { formatDateBR, todayInExamTimezone } from "@/lib/schedule/dates";
import { openOrUpdateDifficulty } from "@/lib/pedagogy/service";
import { subjectOfTopic } from "@/lib/pedagogy/contentRef";
import { PageHeader, EmptyState } from "@/components/ui/PageHeader";
import { DEFAULT_STUDENT_ID, type ErrorEntry } from "@/lib/models/schema";

export default function CadernoErrosPage() {
  const [entries, setEntries] = useState<ErrorEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [topicSlug, setTopicSlug] = useState(TOPICS[0]?.slug ?? "");
  const [cause, setCause] = useState("");
  const [correctRule, setCorrectRule] = useState("");
  const [sourceRef, setSourceRef] = useState("");

  async function load() {
    const db = getDB();
    const all = await db.errorEntries.toArray();
    setEntries(all.sort((a, b) => a.nextReviewDate.localeCompare(b.nextReviewDate)));
  }

  useEffect(() => {
    load();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!cause.trim() || !correctRule.trim()) return;
    // Passa pelo serviço pedagógico central: além de gravar o erro, já agenda a revisão espaçada
    // automaticamente (mesmo caminho usado quando um erro é detectado a partir de uma tentativa real).
    await openOrUpdateDifficulty({
      studentId: DEFAULT_STUDENT_ID,
      topicSlug,
      subjectSlug: subjectOfTopic(topicSlug),
      syllabusCodes: TOPICS.find((t) => t.slug === topicSlug)?.syllabusCodes ?? [],
      cause: cause.trim(),
      correctRule: correctRule.trim(),
      sourceRef: sourceRef.trim() || undefined,
      origin: "aluno_manual",
    });
    setCause("");
    setCorrectRule("");
    setSourceRef("");
    setShowForm(false);
    await load();
  }

  async function remove(id: string) {
    const db = getDB();
    await db.errorEntries.delete(id);
    await load();
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <PageHeader
        eyebrow="Caderno de erros"
        title={`${entries.length} ${entries.length === 1 ? "erro registrado" : "erros registrados"}`}
        description="Registre o erro, a causa e a regra correta. Cada registro entra automaticamente na fila de revisão espaçada."
        action={
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg bg-brand text-brand-foreground px-3 py-2 text-xs font-medium hover:opacity-90"
          >
            <Plus size={14} aria-hidden />
            Registrar erro
          </button>
        }
      />

      {showForm && (
        <form onSubmit={save} className="card p-5 mb-5 space-y-3 animate-fade-in">
          <div>
            <label htmlFor="topic" className="block text-xs font-medium mb-1.5">
              Tópico
            </label>
            <select
              id="topic"
              value={topicSlug}
              onChange={(e) => setTopicSlug(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
            >
              {TOPICS.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cause" className="block text-xs font-medium mb-1.5">
              O que eu errei e por quê
            </label>
            <textarea
              id="cause"
              value={cause}
              onChange={(e) => setCause(e.target.value)}
              rows={2}
              required
              placeholder="Ex.: confundi controle de mérito com controle de legalidade"
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm resize-y"
            />
          </div>

          <div>
            <label htmlFor="rule" className="block text-xs font-medium mb-1.5">
              A regra correta
            </label>
            <textarea
              id="rule"
              value={correctRule}
              onChange={(e) => setCorrectRule(e.target.value)}
              rows={2}
              required
              placeholder="Ex.: o Judiciário só controla legalidade; mérito é da própria Administração"
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm resize-y"
            />
          </div>

          <div>
            <label htmlFor="source" className="block text-xs font-medium mb-1.5">
              Fonte (opcional)
            </label>
            <input
              id="source"
              value={sourceRef}
              onChange={(e) => setSourceRef(e.target.value)}
              placeholder="Ex.: Súmula 473 do STF"
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
            />
          </div>

          <button type="submit" className="w-full rounded-lg bg-brand text-brand-foreground py-2.5 text-sm font-medium hover:opacity-90">
            Salvar e agendar revisão
          </button>
        </form>
      )}

      {entries.length === 0 && !showForm ? (
        <EmptyState
          icon={NotebookPen}
          title="Nenhum erro registrado ainda"
          description="Sempre que errar uma questão, registre aqui a causa e a regra correta. É o material mais valioso para a reta final."
        />
      ) : (
        <ul className="space-y-3">
          {entries.map((entry) => {
            const topic = TOPICS.find((t) => t.slug === entry.topicSlug);
            const isDue = entry.nextReviewDate <= todayInExamTimezone();
            return (
              <li key={entry.id} className="card p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="chip bg-surface-muted text-foreground-muted">{topic?.name ?? entry.topicSlug}</span>
                  <button
                    type="button"
                    onClick={() => remove(entry.id)}
                    aria-label="Excluir registro"
                    className="text-foreground-subtle hover:text-danger shrink-0"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <p className="text-[13.5px] mb-2">
                  <span className="font-semibold">Erro: </span>
                  {entry.cause}
                </p>
                <p className="text-[13.5px] mb-2 text-success">
                  <span className="font-semibold">Regra correta: </span>
                  {entry.correctRule}
                </p>
                {entry.sourceRef && <p className="text-xs text-foreground-muted mb-2">Fonte: {entry.sourceRef}</p>}
                <span className={`chip ${isDue ? "bg-danger-soft text-danger" : "bg-surface-muted text-foreground-muted"}`}>
                  {isDue ? "Revisar hoje" : `Próxima revisão: ${formatDateBR(entry.nextReviewDate)}`}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
