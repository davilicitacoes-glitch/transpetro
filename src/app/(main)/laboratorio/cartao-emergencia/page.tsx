"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Award, Printer } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/ui/PageHeader";
import { ListSkeleton } from "@/components/ui/PageSkeleton";
import { getDB } from "@/lib/db/dexie";
import { TOPICS } from "@/content/curriculum";
import { SUBJECTS } from "@/content/curriculum";
import { subjectOfTopic } from "@/lib/pedagogy/contentRef";
import { DEFAULT_STUDENT_ID, type ErrorEntry } from "@/lib/models/schema";

interface TopicGroup {
  topicSlug: string;
  topicName: string;
  subjectSlug: string | undefined;
  entries: ErrorEntry[];
}

export default function CartaoEmergenciaPage() {
  const [groups, setGroups] = useState<TopicGroup[] | null>(null);

  useEffect(() => {
    (async () => {
      const db = getDB();
      const all = await db.errorEntries.where("studentId").equals(DEFAULT_STUDENT_ID).toArray();
      // "Aberto" = ainda não superado — exatamente os pontos fracos reais e atuais do aluno, não
      // um histórico completo (mission 2.7: só o que ainda importa pra véspera de prova).
      const open = all.filter((e) => e.status !== "superado" && !e.resolved);

      const byTopic = new Map<string, ErrorEntry[]>();
      for (const entry of open) {
        const list = byTopic.get(entry.topicSlug) ?? [];
        list.push(entry);
        byTopic.set(entry.topicSlug, list);
      }

      const result: TopicGroup[] = [...byTopic.entries()]
        .map(([topicSlug, entries]) => ({
          topicSlug,
          topicName: TOPICS.find((t) => t.slug === topicSlug)?.name ?? topicSlug,
          subjectSlug: subjectOfTopic(topicSlug),
          // Mais recorrente primeiro — o que mais voltou a errar é o que mais precisa aparecer
          // no cartão de emergência.
          entries: entries.sort((a, b) => (b.occurrenceCount ?? 1) - (a.occurrenceCount ?? 1)),
        }))
        // Tópicos com mais ocorrência total primeiro.
        .sort((a, b) => b.entries.reduce((s, e) => s + (e.occurrenceCount ?? 1), 0) - a.entries.reduce((s, e) => s + (e.occurrenceCount ?? 1), 0));

      setGroups(result);
    })();
  }, []);

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in print:px-0">
      <div className="print:hidden">
        <Link href="/laboratorio" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
          <ArrowLeft size={14} aria-hidden /> Laboratório
        </Link>

        <PageHeader
          eyebrow="Laboratório · véspera de prova"
          title="Cartão de emergência"
          description="Seus pontos fracos ABERTOS de verdade — não um resumo genérico do edital. Gerado a partir do seu Caderno de Erros real."
          action={
            groups && groups.length > 0 ? (
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-surface-muted"
              >
                <Printer size={13} aria-hidden />
                Imprimir / salvar PDF
              </button>
            ) : undefined
          }
        />
      </div>

      {groups === null ? (
        <ListSkeleton />
      ) : groups.length === 0 ? (
        <EmptyState
          icon={Award}
          title="Nenhum erro aberto no momento"
          description="Ou você ainda não errou nenhuma questão registrada, ou já superou todos os pontos fracos anteriores — sem dado real de erro aberto, não há o que colocar aqui."
        />
      ) : (
        <div className="space-y-4">
          {groups.map((group) => {
            const subject = SUBJECTS.find((s) => s.slug === group.subjectSlug);
            return (
              <section key={group.topicSlug} className="card p-4 break-inside-avoid">
                <div className="flex items-center gap-1.5 mb-2.5">
                  {subject && (
                    <span className="chip" style={{ backgroundColor: `${subject.color}1a`, color: subject.color }}>
                      {subject.name}
                    </span>
                  )}
                  <span className="text-[13.5px] font-semibold">{group.topicName}</span>
                </div>
                <ul className="space-y-2">
                  {group.entries.map((entry) => (
                    <li key={entry.id} className="text-[12.5px] border-l-2 border-warning pl-2.5">
                      <p>
                        <span className="text-foreground-muted">Erro: </span>
                        {entry.cause}
                      </p>
                      <p className="text-success mt-0.5">
                        <span className="text-foreground-muted">Regra: </span>
                        {entry.correctRule}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}
