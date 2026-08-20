"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NavShell } from "@/components/nav/NavShell";
import { useTranspetroStore } from "@/lib/store/useTranspetroStore";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const ready = useTranspetroStore((s) => s.ready);
  const profile = useTranspetroStore((s) => s.profile);

  useEffect(() => {
    if (ready && !profile) {
      router.replace("/onboarding");
    }
  }, [ready, profile, router]);

  if (!ready || !profile) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-screen">
        <p className="text-foreground-muted text-sm">Carregando o Transpetro Estudos…</p>
      </main>
    );
  }

  return <NavShell>{children}</NavShell>;
}
