"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Database, FileCheck2, Headphones, MonitorPlay } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { NOME_METODO } from "@config/metodo";
import { ALL_QUESTIONS } from "@/content/questions";
import { VIDEO_LESSONS } from "@/content/videos";
import { ESTUCAST_EPISODES } from "@/content/estucast";
import { TOPICS } from "@/content/curriculum";

/**
 * "Cobertura Real" (missão "Método Vetor", seção 4) — prova numérica, não propaganda. Todo número
 * aqui é calculado NA HORA a partir dos catálogos reais do app (mesmos que alimentam Questões,
 * Videoaulas, Estucast) — nunca um texto estático que pode ficar desatualizado, nunca um número
 * arredondado à mão pra parecer maior do que é.
 */
export default function CoberturaRealPage() {
  const stats = useMemo(() => {
    const realQuestions = ALL_QUESTIONS.filter((q) => q.source.origin === "real");
    const codesWithRealQuestions = new Set(realQuestions.flatMap((q) => q.syllabusCodes));
    const bancas = new Set(realQuestions.map((q) => q.source.banca).filter(Boolean));
    const provas = new Set(realQuestions.map((q) => `${q.source.orgao ?? "?"}-${q.source.ano ?? "?"}`));

    const codesWithVideo = new Set(VIDEO_LESSONS.flatMap((v) => v.syllabusCodes));

    const audioSecondsTotal = ESTUCAST_EPISODES.reduce((sum, ep) => sum + ep.durationSeconds, 0);
    const codesWithAudio = new Set(ESTUCAST_EPISODES.flatMap((ep) => ep.syllabusCodes));

    const totalCodes = TOPICS.length; // 39, mas lido do currículo real, nunca hardcoded aqui.

    return {
      totalQuestions: ALL_QUESTIONS.length,
      realQuestionsCount: realQuestions.length,
      codesWithRealQuestionsCount: codesWithRealQuestions.size,
      bancasCount: bancas.size,
      bancasList: [...bancas].sort(),
      provasCount: provas.size,
      videoCount: VIDEO_LESSONS.length,
      codesWithVideoCount: codesWithVideo.size,
      audioEpisodesCount: ESTUCAST_EPISODES.length,
      audioSecondsTotal,
      codesWithAudioCount: codesWithAudio.size,
      totalCodes,
    };
  }, []);

  const audioMinutes = Math.round(stats.audioSecondsTotal / 60);
  const audioHoursDecimal = Math.round((stats.audioSecondsTotal / 3600) * 100) / 100;

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <Link href="/meu-curso" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
        <ArrowLeft size={14} aria-hidden /> Meu Curso
      </Link>

      <PageHeader
        eyebrow={`${NOME_METODO} · prova, não propaganda`}
        title="Cobertura Real"
        description="Números calculados agora, direto do banco de dados do app — não um texto fixo, não uma estimativa arredondada. Se um número aqui parecer pequeno, é porque ainda é pequeno."
      />

      <div className="grid sm:grid-cols-2 gap-3 mb-5">
        <div className="card p-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">
            <FileCheck2 size={13} aria-hidden /> Questões reais de prova
          </span>
          <p className="text-[28px] font-display font-bold text-brand leading-none mb-1">{stats.realQuestionsCount}</p>
          <p className="text-[12px] text-foreground-muted">
            de {stats.totalQuestions} questões totais no banco · extraídas de {stats.provasCount} prova(s) reais catalogadas,{" "}
            {stats.bancasCount} banca(s): {stats.bancasList.join(", ") || "—"}.
          </p>
        </div>

        <div className="card p-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">
            <Database size={13} aria-hidden /> Códigos do edital cobertos
          </span>
          <p className="text-[28px] font-display font-bold text-brand leading-none mb-1">
            {stats.codesWithRealQuestionsCount}/{stats.totalCodes}
          </p>
          <p className="text-[12px] text-foreground-muted">códigos do Anexo IV com pelo menos 1 questão real catalogada.</p>
        </div>

        <div className="card p-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">
            <MonitorPlay size={13} aria-hidden /> Videoaulas mapeadas
          </span>
          <p className="text-[28px] font-display font-bold text-brand leading-none mb-1">{stats.videoCount}</p>
          <p className="text-[12px] text-foreground-muted">
            vídeos públicos curados e justificados, cobrindo {stats.codesWithVideoCount}/{stats.totalCodes} códigos do edital.
          </p>
        </div>

        <div className="card p-4">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground-muted mb-2">
            <Headphones size={13} aria-hidden /> Áudio original (Estucast)
          </span>
          <p className="text-[28px] font-display font-bold text-brand leading-none mb-1">
            {audioMinutes} min
          </p>
          <p className="text-[12px] text-foreground-muted">
            ({audioHoursDecimal}h) em {stats.audioEpisodesCount} episódio(s) gerados, cobrindo {stats.codesWithAudioCount}/{stats.totalCodes}{" "}
            códigos — piloto em teste, ver aba Estucast.
          </p>
        </div>
      </div>

      <div className="card p-4 flex items-start gap-2.5 text-[12px] text-foreground-muted">
        <BookOpen size={14} className="shrink-0 mt-0.5" aria-hidden />
        <p>
          Estes números mudam conforme o acervo cresce — volte aqui quando quiser conferir o estado real, sem precisar perguntar. Nenhum valor
          desta tela é arredondado pra parecer maior; se um dado (como horas de áudio) ainda não existir, o número mostrado é exatamente o que
          existe hoje.
        </p>
      </div>
    </main>
  );
}
