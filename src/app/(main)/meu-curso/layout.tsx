"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, CheckCircle2, Home, ListTodo, RotateCcw } from "lucide-react";

const TABS = [
  { href: "/meu-curso", label: "Hoje", icon: Home },
  { href: "/meu-curso/calendario", label: "Calendário", icon: CalendarDays },
  { href: "/meu-curso/concluidas", label: "Concluídas", icon: CheckCircle2 },
  { href: "/meu-curso/proximas", label: "Próximas", icon: ListTodo },
  { href: "/meu-curso/revisoes", label: "Revisões", icon: RotateCcw },
];

/** Esconde a barra de abas nas telas de imersão (player do dia e revisão de véspera), onde a
 * navegação própria da aula (Voltar/Índice/Sair) já ocupa o espaço de controle. */
function isImmersiveRoute(pathname: string): boolean {
  return pathname.startsWith("/meu-curso/dia/") || pathname.startsWith("/meu-curso/revisao-vespera");
}

export default function MeuCursoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isImmersiveRoute(pathname)) return <>{children}</>;

  return (
    <div className="flex-1 flex flex-col w-full">
      <nav aria-label="Áreas do Meu Curso" className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur">
        <div className="max-w-2xl mx-auto flex items-stretch gap-0.5 px-2 overflow-x-auto">
          {TABS.map((tab) => {
            const active = tab.href === "/meu-curso" ? pathname === "/meu-curso" : pathname.startsWith(tab.href);
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`tap-target flex flex-1 min-w-[70px] flex-col items-center gap-1 px-1.5 py-2 text-[11px] font-medium border-b-2 transition-colors ${
                  active ? "border-brand text-brand" : "border-transparent text-foreground-muted hover:text-foreground"
                }`}
              >
                <Icon size={17} aria-hidden />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>
      {children}
    </div>
  );
}
