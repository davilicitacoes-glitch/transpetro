"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranspetroStore } from "@/lib/store/useTranspetroStore";

export default function HomePage() {
  const router = useRouter();
  const ready = useTranspetroStore((s) => s.ready);
  const profile = useTranspetroStore((s) => s.profile);

  useEffect(() => {
    if (!ready) return;
    router.replace(profile ? "/hoje" : "/onboarding");
  }, [ready, profile, router]);

  return (
    <main className="flex-1 flex items-center justify-center">
      <p className="text-foreground-muted text-sm">Carregando o Transpetro Estudos…</p>
    </main>
  );
}
