"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckSquare, Square } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  CONCURSO_INFO,
  EXAM_DATE,
  EXAM_DURATION_HOURS,
  EXAM_SHIFT,
  CONFIRMATION_CARD_AVAILABLE_DATE,
} from "@config/concurso";
import { formatDateBR } from "@/lib/schedule/dates";

interface ChecklistItem {
  id: string;
  text: string;
  /** Toda citação vem do que está de fato documentado em config/concurso.ts (auditado contra o
   * edital oficial). Item sem citação exata do edital fica marcado como prática geral, pra não
   * fingir uma fonte que não temos. */
  source: string;
}

const ITEMS: ChecklistItem[] = [
  {
    id: "confirmacao",
    text: `Baixar/imprimir o Cartão de Confirmação de Inscrição (CCI), disponível a partir de ${formatDateBR(CONFIRMATION_CARD_AVAILABLE_DATE)}.`,
    source: "Edital oficial (Anexo V — cronograma), data de disponibilização do CCI.",
  },
  {
    id: "documento",
    text: "Levar documento de identificação oficial com foto (original, não cópia).",
    source: "Prática padrão de concursos Cesgranrio — confirmar a lista exata de documentos aceitos no edital/comunicado oficial mais próximo da prova.",
  },
  {
    id: "local",
    text: "Conferir o local de prova exato (pode ser diferente do que você imagina) assim que o CCI for divulgado.",
    source: "Confirmar no edital/comunicado oficial mais próximo da prova — o local definitivo só sai no CCI.",
  },
  {
    id: "horario",
    text: `Chegar com antecedência ao horário de fechamento dos portões (prova única, ${EXAM_SHIFT === "unico" ? "sem turno específico definido no edital" : EXAM_SHIFT}).`,
    source: "Edital não detalha turno (item 7); confirmar horário exato de fechamento dos portões no comunicado oficial mais próximo da prova.",
  },
  {
    id: "duracao",
    text: `A prova dura ${EXAM_DURATION_HOURS}h — planeje não ter compromissos logo depois.`,
    source: "config/concurso.ts (EXAM_DURATION_HOURS), auditado contra o edital oficial.",
  },
  {
    id: "caneta",
    text: "Levar caneta esferográfica de tinta preta ou azul (transparente, sem tampa colorida que possa gerar dúvida na fiscalização).",
    source: "Prática padrão de concursos Cesgranrio — confirmar regra exata de material permitido no edital/comunicado oficial mais próximo da prova.",
  },
  {
    id: "eletronicos",
    text: "Não levar celular ligado nem qualquer dispositivo eletrônico não autorizado para a sala.",
    source: "Confirmar a lista exata de itens proibidos no edital/comunicado oficial mais próximo da prova.",
  },
  {
    id: "sono",
    text: "Dormir uma noite completa antes — desempenho em prova de 60 questões cai visivelmente com privação de sono.",
    source: "Recomendação geral de estudo, não é uma regra do edital.",
  },
];

export default function ChecklistVesperaPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <Link href="/laboratorio" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
        <ArrowLeft size={14} aria-hidden /> Laboratório
      </Link>

      <PageHeader
        eyebrow="Laboratório · véspera de prova"
        title="Checklist da véspera"
        description={`Prova em ${formatDateBR(EXAM_DATE)} — ${CONCURSO_INFO.orgao}, ${CONCURSO_INFO.edital}. Cada item cita a fonte; o que não está confirmado no edital diz isso claramente.`}
      />

      <ul className="space-y-2.5">
        {ITEMS.map((item) => {
          const isChecked = checked.has(item.id);
          return (
            <li key={item.id} className="card p-3.5">
              <button type="button" onClick={() => toggle(item.id)} className="flex items-start gap-2.5 w-full text-left">
                {isChecked ? (
                  <CheckSquare size={18} className="text-success shrink-0 mt-0.5" aria-hidden />
                ) : (
                  <Square size={18} className="text-foreground-muted shrink-0 mt-0.5" aria-hidden />
                )}
                <span className="flex-1 min-w-0">
                  <span className={`block text-[13.5px] ${isChecked ? "line-through text-foreground-muted" : ""}`}>{item.text}</span>
                  <span className="block text-[11px] text-foreground-subtle mt-1">Fonte: {item.source}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-[11px] text-foreground-muted text-center">
        {checked.size} de {ITEMS.length} confirmados. Nada aqui substitui a leitura do edital oficial.
      </p>
    </main>
  );
}
