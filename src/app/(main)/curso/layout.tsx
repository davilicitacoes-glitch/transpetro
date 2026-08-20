"use client";

import { useState } from "react";
import { List, X } from "lucide-react";
import { CourseSidebar } from "@/components/course/CourseSidebar";

export default function CursoLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex flex-1 min-h-0">
      <aside className="hidden lg:flex lg:flex-col w-72 shrink-0 border-r border-border bg-surface overflow-y-auto scrollbar-thin">
        <CourseSidebar />
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="lg:hidden sticky top-0 z-30 flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground-muted"
        >
          <List size={16} aria-hidden />
          Trilha do curso
        </button>
        {children}
      </div>

      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40" role="dialog" aria-modal="true">
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-surface overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border sticky top-0 bg-surface">
              <p className="text-sm font-semibold">Trilha do curso</p>
              <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Fechar">
                <X size={18} />
              </button>
            </div>
            <CourseSidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
