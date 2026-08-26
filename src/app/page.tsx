"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarCheck2, ListChecks, ClipboardList, MonitorPlay } from "lucide-react";
import { useAuth } from "@/lib/supabase/AuthProvider";

const FEATURES = [
  {
    icon: CalendarCheck2,
    title: "Trilha guiada dia a dia",
    description: "Um cronograma fechado até a véspera da prova — você não decide o que estudar, o curso te leva pela mão.",
  },
  {
    icon: MonitorPlay,
    title: "Aulas em slides + vídeos",
    description: "Microaulas objetivas com narração e vídeos curados sobre cada assunto do edital.",
  },
  {
    icon: ListChecks,
    title: "Questões reais de banca",
    description: "Centenas de questões reais (Cesgranrio e correlatas), com gabarito comentado alternativa por alternativa.",
  },
  {
    icon: ClipboardList,
    title: "Simulados e revisão espaçada",
    description: "Simulados no formato oficial e revisão automática dos assuntos, calculada pelos seus próprios erros e acertos.",
  },
];

export default function LandingPage() {
  const router = useRouter();
  const { user, loading, configured } = useAuth();

  useEffect(() => {
    if (configured && !loading && user) {
      router.replace("/meu-curso");
    }
  }, [configured, loading, user, router]);

  return (
    <main className="flex-1 flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="flex items-center justify-center w-8 h-8 rounded-lg text-brand-foreground font-display font-bold text-sm shrink-0"
              style={{ background: "linear-gradient(135deg, var(--brand), var(--accent))", boxShadow: "var(--shadow-brand)" }}
            >
              T
            </span>
            <span className="text-[15px] font-display font-semibold">Transpetro Estudos</span>
          </div>
          <Link href="/login" className="btn btn-secondary min-h-9 px-4 text-sm">
            Entrar
          </Link>
        </div>
      </header>

      <section className="px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand mb-3">
            <span className="inline-block w-4 h-[3px] rounded-full" style={{ background: "linear-gradient(90deg, var(--brand), var(--accent))" }} aria-hidden />
            Edital nº 3/2026 — Nível Médio
          </p>
          <h1 className="text-[32px] md:text-[42px] font-display font-bold tracking-tight leading-tight mb-4">
            Preparação intensiva e guiada para o concurso Transpetro
          </h1>
          <p className="text-foreground-muted text-base md:text-lg mb-8 max-w-xl mx-auto">
            Ênfase Administração e Controle. Uma trilha diária pronta até o dia 29/11/2026 — sem perder tempo
            decidindo o que estudar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/cadastro" className="btn btn-primary w-full sm:w-auto px-8">
              Criar minha conta
            </Link>
            <Link href="/login" className="btn btn-secondary w-full sm:w-auto px-8">
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card p-5">
              <span
                className="inline-flex w-10 h-10 rounded-lg text-brand-foreground items-center justify-center mb-3"
                style={{ background: "linear-gradient(135deg, var(--brand), var(--accent))" }}
              >
                <f.icon size={18} aria-hidden />
              </span>
              <p className="font-semibold text-[15px] mb-1">{f.title}</p>
              <p className="text-sm text-foreground-muted">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-4 md:px-8 py-6 border-t border-border">
        <p className="max-w-5xl mx-auto text-xs text-foreground-muted text-center">
          Transpetro Estudos — material de apoio independente para o Edital nº 3/2026. Não possui vínculo oficial
          com a Transpetro ou com a Fundação Cesgranrio.
        </p>
      </footer>
    </main>
  );
}
