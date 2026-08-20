"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Moon, Sun, X } from "lucide-react";
import { PRIMARY_NAV, SECONDARY_NAV, MOBILE_MORE_ITEM } from "@/components/nav/navItems";

function useTheme() {
  const [, setTheme] = useState<"light" | "dark" | null>(null);

  function toggle() {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    window.localStorage.setItem("transpetro-theme", next);
    setTheme(next);
  }

  return { toggle };
}

/** Rotas de imersão (players de aula, chat do Professor) têm sua própria barra fixa de controles
 * no rodapé. A navegação global do celular ocupa a mesma faixa da tela — sem isso, os botões da
 * aula ficam escondidos/inacessíveis atrás da barra de navegação (bug real reportado no celular). */
function isImmersiveRoute(pathname: string): boolean {
  return (
    pathname.startsWith("/meu-curso/dia/") ||
    pathname.startsWith("/meu-curso/revisao-vespera") ||
    pathname.startsWith("/professor/conversar/")
  );
}

export function NavShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const { toggle } = useTheme();
  const immersive = isImmersiveRoute(pathname ?? "");

  return (
    <div className="flex flex-1 min-h-screen">
      <aside className="hidden md:flex md:flex-col w-60 shrink-0 bg-navy text-navy-foreground px-3 py-5 gap-1">
        <Link href="/hoje" className="px-3 mb-6 flex items-center gap-2.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand text-brand-foreground font-bold text-sm shrink-0">
            T
          </span>
          <span>
            <span className="block text-[15px] font-semibold leading-tight text-white">Transpetro Estudos</span>
            <span className="block text-[11px] leading-tight text-navy-foreground/60">Nível Médio — Administração e Controle</span>
          </span>
        </Link>
        <nav className="flex flex-col gap-0.5" aria-label="Navegação principal">
          {PRIMARY_NAV.map((item) => {
            const active = pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors ${
                  active
                    ? "bg-brand text-brand-foreground shadow-sm"
                    : "text-navy-foreground/75 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={17} aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="h-px bg-white/10 my-3 mx-1" />
        <nav className="flex flex-col gap-0.5 overflow-y-auto scrollbar-thin" aria-label="Navegação secundária">
          {SECONDARY_NAV.map((item) => {
            const active = pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-colors ${
                  active
                    ? "bg-white/10 text-white font-medium"
                    : "text-navy-foreground/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={16} aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={toggle}
          className="mt-auto flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-navy-foreground/60 hover:bg-white/5 hover:text-white"
        >
          <Sun size={15} className="dark:hidden" aria-hidden />
          <Moon size={15} className="hidden dark:inline" aria-hidden />
          Alternar tema
        </button>
      </aside>

      <div className={`flex-1 flex flex-col ${immersive ? "pb-0" : "pb-16 md:pb-0"} min-w-0 bg-background`}>{children}</div>

      {!immersive && (
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border flex items-stretch z-40 shadow-lg"
          aria-label="Navegação principal"
        >
          {PRIMARY_NAV.map((item) => {
            const active = pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] ${
                  active ? "text-brand" : "text-foreground-muted"
                }`}
              >
                <Icon size={20} aria-hidden />
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] text-foreground-muted"
          >
            <MOBILE_MORE_ITEM.icon size={20} aria-hidden />
            {MOBILE_MORE_ITEM.label}
          </button>
        </nav>
      )}

      {moreOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40" role="dialog" aria-modal="true">
          <div className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-2xl p-4 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <p className="font-medium">Mais</p>
              <button type="button" onClick={() => setMoreOpen(false)} aria-label="Fechar menu">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {SECONDARY_NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className="flex flex-col items-center justify-center gap-1 rounded-lg border border-border py-3 text-[11px] text-center text-foreground hover:bg-surface-muted"
                  >
                    <Icon size={20} aria-hidden />
                    {item.label}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={toggle}
                className="flex flex-col items-center justify-center gap-1 rounded-lg border border-border py-3 text-[11px] text-center text-foreground hover:bg-surface-muted"
              >
                <Sun size={20} aria-hidden />
                Tema
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
