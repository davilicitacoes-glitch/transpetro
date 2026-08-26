"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarCheck2,
  ListChecks,
  ClipboardList,
  MonitorPlay,
  RotateCcw,
  NotebookPen,
  Briefcase,
  Landmark,
  Users,
  Wallet,
} from "lucide-react";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { CONCURSO_INFO, EXAM_DATE, OBJECTIVE_TOTAL_QUESTIONS, TOTAL_MISSIONS } from "@config/concurso";
import { formatDateBR } from "@/lib/schedule/dates";

const FEATURES = [
  {
    icon: CalendarCheck2,
    title: "Trilha guiada dia a dia",
    description:
      `Um cronograma fechado com ${TOTAL_MISSIONS} dias de estudo, do primeiro dia até a véspera da prova. Cada dia libera exatamente o conteúdo, os vídeos e as questões daquele momento — você não perde tempo decidindo o que estudar.`,
  },
  {
    icon: MonitorPlay,
    title: "Aulas em slides narrados + vídeos",
    description:
      "Microaulas com narração e mapa mental de cada assunto do Anexo IV, complementadas por vídeos curados de professores especializados em concursos.",
  },
  {
    icon: ListChecks,
    title: `Mais de ${OBJECTIVE_TOTAL_QUESTIONS === 60 ? "350" : "300"} questões reais de banca`,
    description:
      `Banco com questões reais da ${CONCURSO_INFO.banca} e bancas correlatas, cada uma com gabarito comentado alternativa por alternativa — não é só a resposta certa, é o porquê de cada alternativa errada.`,
  },
  {
    icon: ClipboardList,
    title: "Simulados no formato oficial",
    description: `Simulados com ${OBJECTIVE_TOTAL_QUESTIONS} questões, no mesmo formato da prova real, com correção detalhada e comparação de desempenho ao longo do tempo.`,
  },
  {
    icon: RotateCcw,
    title: "Revisão espaçada de verdade",
    description:
      "O sistema calcula sozinho quando cada assunto precisa voltar para revisão, com base nos seus próprios erros e acertos — não num calendário genérico.",
  },
  {
    icon: NotebookPen,
    title: "Caderno de erros automático",
    description:
      "Todo erro que você comete vira um registro rastreável, com a causa identificada, e reaparece na hora certa para reforço — até você dominar de verdade.",
  },
];

const STEPS = [
  { title: "Diagnóstico inicial", description: "Um teste curto (até 30 min) calibra seu ponto de partida em cada matéria do edital." },
  { title: "Estudo guiado, dia após dia", description: "Cada dia libera exatamente o que você precisa estudar — aula, vídeo, questões e revisão do dia." },
  { title: "Reta final com simulados", description: "Nas últimas semanas, o foco vira revisão intensiva e simulados completos até a data da prova." },
];

const EDITAL_FACTS = [
  { icon: Landmark, label: "Órgão / Banca", value: `${CONCURSO_INFO.orgao} · ${CONCURSO_INFO.banca}` },
  { icon: Briefcase, label: "Cargo", value: `${CONCURSO_INFO.cargo} — ${CONCURSO_INFO.enfase}` },
  { icon: Wallet, label: "Remuneração básica", value: CONCURSO_INFO.salarioBasico },
  { icon: Users, label: "Vagas", value: `${CONCURSO_INFO.vagasImediatas} imediatas + ${CONCURSO_INFO.vagasTotalComCadastroReserva} cadastro reserva` },
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
              className="flex items-center justify-center w-9 h-9 rounded-lg text-brand-foreground font-display font-bold text-base shrink-0"
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

      <section className="px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand mb-3">
            <span className="inline-block w-4 h-[3px] rounded-full" style={{ background: "linear-gradient(90deg, var(--brand), var(--accent))" }} aria-hidden />
            {CONCURSO_INFO.edital.split(",")[0]}
          </p>
          <h1 className="text-[32px] md:text-[42px] font-display font-bold tracking-tight leading-tight mb-4">
            Preparação intensiva e guiada para o concurso Transpetro
          </h1>
          <p className="text-foreground-muted text-base md:text-lg mb-8 max-w-xl mx-auto">
            {CONCURSO_INFO.cargo}, {CONCURSO_INFO.enfase}. Uma trilha diária pronta até {formatDateBR(EXAM_DATE)} — sem
            perder tempo decidindo o que estudar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link href="/cadastro" className="btn btn-primary w-full sm:w-auto px-8">
              Criar minha conta
            </Link>
            <Link href="/login" className="btn btn-secondary w-full sm:w-auto px-8">
              Já tenho conta
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            <div>
              <span className="block font-display font-bold text-[20px] text-brand">{TOTAL_MISSIONS}</span>
              <span className="text-foreground-muted text-xs">dias de trilha</span>
            </div>
            <div>
              <span className="block font-display font-bold text-[20px] text-brand">350+</span>
              <span className="text-foreground-muted text-xs">questões reais</span>
            </div>
            <div>
              <span className="block font-display font-bold text-[20px] text-brand">39</span>
              <span className="text-foreground-muted text-xs">códigos do edital</span>
            </div>
            <div>
              <span className="block font-display font-bold text-[20px] text-brand">{formatDateBR(EXAM_DATE)}</span>
              <span className="text-foreground-muted text-xs">data da prova</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 py-12 bg-surface-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[15px] font-display font-semibold text-center mb-6 text-foreground-muted uppercase tracking-wide">
            Sobre o concurso
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EDITAL_FACTS.map((f) => (
              <div key={f.label} className="card p-4">
                <f.icon size={16} className="text-brand mb-2" aria-hidden />
                <p className="text-xs text-foreground-muted mb-0.5">{f.label}</p>
                <p className="text-[13.5px] font-semibold leading-snug">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-[24px] font-display font-bold text-center mb-2">O que vem incluso</h2>
          <p className="text-foreground-muted text-sm text-center mb-10 max-w-lg mx-auto">
            Tudo pensado para quem tem pouco tempo e precisa de um caminho claro até a aprovação.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-5">
                <span
                  className="inline-flex w-10 h-10 rounded-lg text-brand-foreground items-center justify-center mb-3"
                  style={{ background: "linear-gradient(135deg, var(--brand), var(--accent))" }}
                >
                  <f.icon size={18} aria-hidden />
                </span>
                <p className="font-semibold text-[15px] mb-1.5">{f.title}</p>
                <p className="text-sm text-foreground-muted leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 py-16 md:py-20 bg-surface-muted/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[24px] font-display font-bold text-center mb-10">Como funciona</h2>
          <div className="space-y-6">
            {STEPS.map((s, i) => (
              <div key={s.title} className="flex items-start gap-4">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-full text-brand-foreground font-display font-bold text-sm shrink-0"
                  style={{ background: "linear-gradient(135deg, var(--brand), var(--accent))" }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-[15px] mb-0.5">{s.title}</p>
                  <p className="text-sm text-foreground-muted">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/cadastro" className="btn btn-primary px-8">
              Criar minha conta
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-4 md:px-8 py-8 border-t border-border">
        <div className="max-w-5xl mx-auto text-center space-y-2">
          <p className="text-xs text-foreground-muted">
            Transpetro Estudos — material de apoio independente para o {CONCURSO_INFO.edital.split(",")[0]}. Não possui
            vínculo oficial com a Transpetro ou com a {CONCURSO_INFO.banca}.
          </p>
          <p className="text-xs text-foreground-subtle">
            Idealizado e desenvolvido por David Sena Nascimento, em parceria com inteligência artificial.
          </p>
        </div>
      </footer>
    </main>
  );
}
