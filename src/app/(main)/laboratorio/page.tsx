"use client";

import Link from "next/link";
import {
  Award,
  CheckSquare,
  Clock3,
  FlaskConical,
  Gamepad2,
  Layers,
  MessageSquareQuote,
  Radar,
  Shuffle,
  SlidersHorizontal,
  SmilePlus,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

interface LabTool {
  href: string;
  icon: typeof FlaskConical;
  title: string;
  description: string;
  status: "disponivel" | "em_construcao";
}

/** Aba "Laboratório" — missão "Recursos Extras": as 10 ferramentas experimentais vivem aqui,
 * isoladas de "Meu Curso" (o aluno pode ignorar esta aba inteira sem perder nada da rotina
 * guiada). Cada card só aparece "disponível" quando a tela por trás usa dado real do aluno/
 * questões/edital — nunca uma tela decorativa. As marcadas "em construção" ainda não existem
 * (não fingimos funcionalidade). Ver docs/CONTINUIDADE_ENSIPETRO.md para o status detalhado. */
const TOOLS: LabTool[] = [
  {
    href: "/laboratorio/cartao-emergencia",
    icon: Award,
    title: "Cartão de emergência",
    description: "Resumo de 1 página dos SEUS pontos fracos reais, pra véspera de prova.",
    status: "disponivel",
  },
  {
    href: "/laboratorio/checklist-vespera",
    icon: CheckSquare,
    title: "Checklist da véspera",
    description: "O que confirmar antes da prova, citando o edital item a item.",
    status: "disponivel",
  },
  {
    href: "/laboratorio/radar-banca",
    icon: Radar,
    title: "Radar de tendência da banca",
    description: "Como o peso dos temas mudou nas provas reais já catalogadas.",
    status: "disponivel",
  },
  {
    href: "/laboratorio/cronotipo",
    icon: Clock3,
    title: "Melhor horário pra estudar",
    description: "Cruza seu histórico real de acerto e tempo de resposta por horário do dia.",
    status: "disponivel",
  },
  {
    href: "/laboratorio/gerador-analogia",
    icon: Shuffle,
    title: "Questão por analogia",
    description: "Varia nome/cenário de uma questão real, mantendo a mesma regra testada.",
    status: "disponivel",
  },
  {
    href: "/laboratorio/simulado-cartao-resposta",
    icon: Layers,
    title: "Simulado em condição real",
    description: "Cartão-resposta cronometrado, igual ao dia da prova.",
    status: "disponivel",
  },
  {
    href: "/laboratorio/feynman",
    icon: MessageSquareQuote,
    title: "Técnica de Feynman",
    description: "Explique um tema com suas palavras; o Professor avalia de verdade e vira flashcard de revisão.",
    status: "disponivel",
  },
  {
    href: "/laboratorio/diario-confianca",
    icon: SmilePlus,
    title: "Diário de confiança",
    description: "Check-in rápido de humor antes/depois de estudar.",
    status: "disponivel",
  },
  {
    href: "/laboratorio/simulado-adaptativo",
    icon: SlidersHorizontal,
    title: "Simulado adaptativo",
    description: "O próximo tópico muda conforme você acerta ou erra, usando seu histórico real.",
    status: "disponivel",
  },
  {
    href: "/laboratorio/jogos",
    icon: Gamepad2,
    title: "Jogos",
    description: "Viva um dia de trabalho — e-mails, colegas e decisões testando o edital de verdade.",
    status: "disponivel",
  },
];

const STATUS_LABEL: Record<LabTool["status"], { label: string; className: string }> = {
  disponivel: { label: "Disponível", className: "bg-success-soft text-success" },
  em_construcao: { label: "Em construção", className: "bg-surface-muted text-foreground-muted" },
};

export default function LaboratorioPage() {
  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-3xl mx-auto w-full animate-fade-in">
      <PageHeader
        eyebrow="Laboratório · ferramentas extras"
        title="Recursos extras, fora da rotina diária"
        description="Nada aqui é obrigatório — Meu Curso continua sendo sua trilha principal. Estas ferramentas usam seus dados reais quando existem; quando ainda não há dado suficiente, dizemos isso, em vez de inventar."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          const status = STATUS_LABEL[tool.status];
          const disabled = tool.status === "em_construcao";
          const content = (
            <>
              <span className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex w-9 h-9 rounded-lg bg-brand-soft text-brand items-center justify-center shrink-0">
                  <Icon size={17} aria-hidden />
                </span>
                <span className={`chip ${status.className}`}>{status.label}</span>
              </span>
              <span className="block text-[14px] font-semibold mb-1">{tool.title}</span>
              <span className="block text-[12.5px] text-foreground-muted leading-relaxed">{tool.description}</span>
            </>
          );
          return disabled ? (
            <div key={tool.href} className="card p-4 opacity-60 cursor-not-allowed">
              {content}
            </div>
          ) : (
            <Link key={tool.href} href={tool.href} className="card p-4 hover:border-brand/40 transition-colors">
              {content}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
