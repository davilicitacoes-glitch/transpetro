"use client";

import Link from "next/link";
import { ArrowLeft, Calculator, Target } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { NOME_METODO } from "@config/metodo";
import { OBJECTIVE_TOTAL_POINTS } from "@config/concurso";
import { MIN_ATTEMPTS_FOR_SIGNAL } from "@/lib/pedagogy/masteryRules";

export default function ComoCalculamosPage() {
  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <Link href="/meu-curso" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
        <ArrowLeft size={14} aria-hidden /> Meu Curso
      </Link>

      <PageHeader
        eyebrow={`${NOME_METODO} · transparência`}
        title="Como calculamos sua nota estimada"
        description="Sem mágica, sem número arredondado pra parecer melhor. A fórmula real, passo a passo."
      />

      <div className="space-y-4">
        <section className="card p-5">
          <h2 className="flex items-center gap-2 font-semibold text-[14px] mb-2.5">
            <Calculator size={16} className="text-brand" aria-hidden />
            1. Por código do edital
          </h2>
          <p className="text-[13.5px] leading-relaxed text-foreground-muted mb-3">
            A prova tem {OBJECTIVE_TOTAL_POINTS} pontos, divididos nas 3 disciplinas do edital. Dividimos o peso de cada disciplina igualmente
            entre os códigos que ela contém — o edital não publica peso por código, só por disciplina, então essa divisão é uma aproximação
            didática, não um dado oficial.
          </p>
          <p className="text-[13.5px] leading-relaxed text-foreground-muted">
            Pra cada código, calculamos sua <strong>acurácia real</strong> — o % de acerto nas questões que você respondeu daquele código,
            misturando desempenho recente (peso 70%) com o histórico geral (peso 30%), pra refletir tanto esquecimento quanto evolução.
          </p>
        </section>

        <section className="card p-5">
          <h2 className="flex items-center gap-2 font-semibold text-[14px] mb-2.5">
            <Target size={16} className="text-brand" aria-hidden />
            2. Só entra no cálculo com dado suficiente
          </h2>
          <p className="text-[13.5px] leading-relaxed text-foreground-muted">
            Um código só entra na estimativa quando você já respondeu pelo menos <strong>{MIN_ATTEMPTS_FOR_SIGNAL} questões</strong> dele — menos
            que isso é ruído estatístico, não sinal real. É por isso que a nota estimada só aparece "com dado suficiente" quando pelo menos um
            código atinge esse mínimo, e por isso ela mostra explicitamente quantos pontos da prova já têm dado por trás.
          </p>
        </section>

        <section className="card p-5">
          <h2 className="text-[14px] font-semibold mb-2.5">3. A extrapolação</h2>
          <p className="text-[13.5px] leading-relaxed text-foreground-muted mb-3">
            Calculamos sua acurácia média, ponderada pelo peso em pontos de cada código com dado suficiente — essa é sua{" "}
            <strong>acurácia conhecida</strong>. A nota estimada é essa acurácia aplicada aos {OBJECTIVE_TOTAL_POINTS} pontos inteiros da prova:
          </p>
          <div className="rounded-lg bg-surface-muted p-3.5 text-[13px] font-mono text-center mb-3">
            nota estimada = acurácia conhecida × {OBJECTIVE_TOTAL_POINTS}
          </div>
          <p className="text-[12.5px] text-foreground-muted">
            É uma <strong>extrapolação</strong>, não uma promessa: presume que seu desempenho nos códigos ainda sem dado suficiente vai ficar
            parecido com sua média atual — o que muda pra melhor conforme você estuda os códigos que ainda não tentou.
          </p>
        </section>

        <section className="card p-5">
          <h2 className="text-[14px] font-semibold mb-2.5">4. O que decide sua próxima recomendação (direção + magnitude)</h2>
          <p className="text-[13.5px] leading-relaxed text-foreground-muted">
            "Vetor" existe porque cada recomendação tem duas partes: <strong>direção</strong> (qual código estudar) e{" "}
            <strong>magnitude</strong> (o quanto isso importa). A magnitude cruza o peso do código na prova, a lacuna real que você ainda tem
            nele (quanto menor sua acurácia, maior a lacuna), a urgência de uma revisão vencida, e a incidência estimada do tema no acervo de
            questões reais catalogadas. O código com maior pontuação combinada é o "maior impacto hoje" mostrado na tela inicial.
          </p>
        </section>
      </div>
    </main>
  );
}
