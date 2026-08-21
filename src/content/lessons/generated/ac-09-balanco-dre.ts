import type { LessonContent } from "@/content/lessonTypes";

export const AC_09_BALANCO_DRE: LessonContent = {
  slug: "ac-09-balanco-dre",
  topicSlug: "ac-09-balanco-dre",
  subjectSlug: "especificas",
  moduleSlug: "especificas-financas-contabilidade",
  title: `Balanço Patrimonial e DRE`,
  learningObjective: `Dominar a estrutura do Balanço Patrimonial (Ativo/Passivo/PL, circulante x não circulante), a lógica da DRE (receita → deduções → custos → despesas → resultado) e as demais demonstrações contábeis correlatas (DVA, DFC, DMPL) — a Cesgranrio gosta de dar uma conta contábil concreta e pedir em qual demonstração ou grupo ela se encaixa.`,
  syllabusCodes: ["AC-09"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-09 — Balanço Patrimonial e DRE

## 1. Balanço x DRE — naturezas diferentes de demonstração

- **Balanço Patrimonial**: uma **fotografia** da situação patrimonial em uma **data específica** — mostra o que a empresa tem, deve e possui de patrimônio líquido naquele instante exato.
- **DRE** (Demonstração do Resultado do Exercício): mede o **desempenho ao longo de um período** (mês, trimestre, ano) — mostra como a empresa chegou ao lucro ou prejuízo daquele intervalo de tempo, pelo regime de competência.

## 2. Estrutura do Balanço: Ativo, Passivo e Patrimônio Líquido

- **Ativo**: reúne os **recursos controlados** pela entidade — inclui tanto **bens** (imóveis, equipamentos, estoques, caixa) quanto **direitos** (valores a receber de terceiros, aplicações financeiras). Os direitos entram no Ativo junto com os bens — não no Passivo.
- **Passivo**: reúne as **obrigações** da entidade — o que ela deve a terceiros (fornecedores, empréstimos, impostos a pagar).
- **Patrimônio Líquido (PL)**: o **interesse residual** — o que sobra do Ativo depois de descontadas todas as obrigações do Passivo. Representa a parte do patrimônio que pertence aos sócios/acionistas.

**Equação patrimonial**: Ativo = Passivo + Patrimônio Líquido.

## 3. Circulante x Não Circulante

A classificação em **circulante** ou **não circulante** depende do **ciclo operacional** e do **horizonte de realização (Ativo) ou exigibilidade (Passivo)**:

- **Ativo Circulante**: bens e direitos que devem se realizar (virar caixa) em até 12 meses (ou dentro do ciclo operacional, se maior).
- **Ativo Não Circulante**: realização em prazo superior a 12 meses (imobilizado, investimentos de longo prazo).
- **Passivo Circulante**: obrigações a vencer em até 12 meses.
- **Passivo Não Circulante**: obrigações de prazo mais longo — por exemplo, **financiamentos de longo prazo** (vencimento superior a 12 meses) são classificados aqui, não no PL nem no Passivo Circulante.

## 4. Estrutura da DRE

A DRE encadeia os elementos em sequência lógica: **Receita bruta** → **deduções** (impostos sobre vendas, devoluções) = Receita líquida → **custos** (dos produtos/serviços vendidos) = Lucro bruto → **despesas** (operacionais, administrativas, financeiras) → **resultado** (lucro ou prejuízo do período). Cada etapa subtrai um componente diferente até chegar ao resultado final — pular uma etapa ou trocar sua ordem altera o significado da demonstração.

## 5. Relação entre lucro e Patrimônio Líquido

O **lucro** apurado na DRE, quando **destinado** (distribuído como dividendos) ou **retido** (reinvestido na empresa), afeta o **Patrimônio Líquido** do Balanço — é a ponte entre as duas demonstrações. Importante: lucro **não equivale necessariamente a entrada de caixa** — uma empresa pode ter lucro contábil (regime de competência) sem ter recebido efetivamente esse valor em dinheiro (ver AC-08, fluxo de caixa).

## 6. Outras demonstrações contábeis correlatas

- **DFC** (Demonstração do Fluxo de Caixa): explica a **variação do saldo de caixa** entre o início e o fim do período (ver AC-08).
- **DMPL** (Demonstração das Mutações do Patrimônio Líquido): explica os **movimentos** que alteraram o PL no período (aumento de capital, lucro do exercício, distribuição de dividendos).
- **Notas explicativas**: detalham **políticas contábeis** adotadas e **riscos** relevantes, complementando os números das demonstrações principais.
- **DVA** (Demonstração do Valor Adicionado): tem a finalidade de informar a **riqueza gerada** pela empresa durante determinado período, e sua **distribuição** entre os públicos envolvidos — empregados, governo, financiadores, acionistas. É uma demonstração distinta do Balanço, da DRE e da DFC, com esse foco específico de "quem ficou com o valor gerado".

**Pegadinha clássica**: confundir a DVA (foco em geração e distribuição de riqueza) com a DRE (foco em receitas/custos/despesas/resultado) ou com a DFC (foco em movimentação de caixa) — são demonstrações com propósitos diferentes.

## Síntese

O AC-09 exige conhecer a estrutura do Balanço (Ativo/Passivo/PL, circulante x não circulante) e da DRE (encadeamento receita→resultado), além de saber onde uma conta específica (direitos, financiamento de longo prazo) se encaixa, e diferenciar as demonstrações correlatas (DVA, DFC, DMPL) pela finalidade de cada uma.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Balanço e DRE — AC-09))
    Balanço x DRE
      Balanco: foto em uma data
      DRE: desempenho no periodo
    Estrutura do Balanco
      Ativo: bens + direitos
      Passivo: obrigacoes
      PL: interesse residual
      Ativo = Passivo + PL
    Circulante x Nao Circulante
      Ate 12 meses x mais de 12 meses
      Financiamento longo prazo: Passivo Nao Circulante
    DRE
      Receita - deducoes - custos - despesas = resultado
    Lucro e PL
      Lucro destinado/retido afeta o PL
      Lucro nao e igual a caixa
    Outras demonstracoes
      DFC: variacao de caixa
      DMPL: movimentos do PL
      DVA: riqueza gerada e distribuida
\`\`\``,
  mustMemorize: [
    `Balanço = fotografia patrimonial numa DATA. DRE = desempenho ao longo de um PERÍODO.`,
    `Direitos entram no ATIVO (junto com os bens), não no Passivo.`,
    `Equação patrimonial: Ativo = Passivo + Patrimônio Líquido.`,
    `Financiamentos de longo prazo (vencimento > 12 meses) vão no Passivo NÃO CIRCULANTE.`,
    `DRE encadeia: receita → deduções → custos → despesas → resultado.`,
    `Lucro destinado/retido afeta o PL, mas NÃO equivale necessariamente a entrada de caixa.`,
    `DVA = riqueza gerada e sua distribuição (empregados, governo, financiadores, acionistas) — diferente de DRE, DFC e DMPL.`,
  ],
  workedExamples: [
    `Os direitos (bens a receber, valores a receber de terceiros etc.) integram o ATIVO do Balanço Patrimonial, junto aos bens; as obrigações compõem o Passivo.`,
    `A Demonstração do Valor Adicionado (DVA) mede a riqueza gerada pela empresa e sua distribuição entre empregados, governo, financiadores e acionistas — diferente da DRE, que mede receitas/custos/despesas/resultado.`,
    `Financiamentos de longo prazo (vencimento superior a 12 meses) são classificados no Passivo Não Circulante — não no Patrimônio Líquido nem no Passivo Circulante.`,
    `Uma demonstração elaborada pelo regime de competência, que informa receitas, custos, despesas e resultado do período, é a Demonstração do Resultado do Exercício (DRE).`,
  ],
  commonMistakes: [
    `Colocar direitos (valores a receber) no Passivo — direitos são recursos controlados pela entidade e pertencem ao ATIVO, junto com os bens.`,
    `Confundir circulante e não circulante sem considerar o horizonte de 12 meses (ou ciclo operacional) — é esse prazo que define a classificação, não o "tipo" da conta isoladamente.`,
    `Achar que financiamento de longo prazo é conta de Patrimônio Líquido — é uma OBRIGAÇÃO de prazo estendido, portanto Passivo Não Circulante.`,
    `Tratar lucro contábil como sinônimo de caixa disponível — lucro pode não ter virado dinheiro ainda (regime de competência x regime de caixa, ver AC-08).`,
    `Confundir DVA (riqueza gerada e distribuída) com DRE (receitas/custos/despesas/resultado) ou com DFC (movimentação de caixa) — cada demonstração tem um propósito específico e distinto.`,
    `Padrão observado no acervo real (AC-09-2012-CESGRANRIO-21): identificar corretamente que os direitos integram o Ativo do Balanço Patrimonial, não o Passivo, PL, Exigível a Longo Prazo ou Reserva de Lucros.`,
    `Padrão observado no acervo real (AC-09-2012-CESGRANRIO-22): reconhecer a DVA como a demonstração que informa riqueza gerada e sua distribuição, distinta de Balanço, DFC, DRE e Demonstração de Lucros/Prejuízos Acumulados.`,
    `Padrão observado no acervo real (AC-09-2012-CESGRANRIO-23): classificar financiamentos de longo prazo no Passivo Não Circulante, não em contas de PL ou Passivo Circulante.`,
    `Padrão observado no acervo real (AC-09-2012-CESGRANRIO-24): identificar a DRE como a demonstração elaborada pelo regime de competência que apura o resultado do período.`,
  ],
  howBoardMightAsk: [
    `Pede em qual grupo do Balanço (Ativo, Passivo, PL) uma conta específica se encaixa (direitos, financiamento de longo prazo).`,
    `Descreve a finalidade de uma demonstração contábil (riqueza gerada e distribuída, variação de caixa, resultado do período) e pede seu nome correto, com as demais demonstrações como distratores.`,
    `Pede a sequência correta de elementos da DRE (receita, deduções, custos, despesas, resultado).`,
    `Pergunta se um financiamento de longo prazo vai no circulante ou não circulante, a partir do prazo de vencimento dado.`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `Balanço = foto numa data. DRE = desempenho no período.`,
    `Direitos vão no Ativo, junto com os bens.`,
    `Ativo = Passivo + PL.`,
    `Financiamento de longo prazo = Passivo Não Circulante.`,
    `DRE: receita → deduções → custos → despesas → resultado.`,
    `DVA = riqueza gerada e distribuída — diferente de DRE, DFC, DMPL.`,
  ],
  flashcards: [
    { front: "Diferença entre Balanço Patrimonial e DRE?", back: "Balanço é uma fotografia patrimonial numa data. DRE mede o desempenho (resultado) ao longo de um período." },
    { front: "Onde entram os 'direitos' no Balanço?", back: "No Ativo, junto com os bens — não no Passivo." },
    { front: "Onde se classifica um financiamento com vencimento em 3 anos?", back: "No Passivo Não Circulante (prazo de exigibilidade superior a 12 meses)." },
    { front: "O que mede a DVA?", back: "A riqueza gerada pela empresa no período e sua distribuição entre empregados, governo, financiadores e acionistas." },
  ],
  miniQuiz: [
    {
      statement: `Na contabilidade, o conceito de patrimônio envolve o conjunto de bens, direitos e obrigações.

No que se refere aos direitos, quando apresentados no Balanço Patrimonial, são encontrados no(a)`,
      options: [
        { key: "A", text: `Ativo`, isCorrect: true, explanation: `Correto: os direitos (bens a receber, valores a receber de terceiros etc.) integram o Ativo do Balanço Patrimonial, junto aos bens; as obrigações é que compõem o Passivo.` },
        { key: "B", text: `Passivo`, isCorrect: false, explanation: `O Passivo reúne as OBRIGAÇÕES da entidade (o que ela deve), não os direitos (o que ela tem a receber).` },
        { key: "C", text: `Patrimônio Líquido`, isCorrect: false, explanation: `O PL é o interesse residual (Ativo menos Passivo) — não é o grupo onde os direitos são registrados diretamente.` },
        { key: "D", text: `Exigível a Longo Prazo`, isCorrect: false, explanation: `Exigível a Longo Prazo é uma nomenclatura ligada a obrigações de longo prazo (Passivo Não Circulante) — não aos direitos da entidade.` },
        { key: "E", text: `Reserva de Lucros`, isCorrect: false, explanation: `Reserva de Lucros é uma conta específica do Patrimônio Líquido, não o grupo geral onde os direitos são classificados.` },
      ],
    },
    {
      statement: `A demonstração contábil que tem a finalidade de informar a riqueza gerada pela empresa, durante determinado período, bem como a sua distribuição, é denominada`,
      options: [
        { key: "A", text: `Balanço Patrimonial`, isCorrect: false, explanation: `O Balanço Patrimonial é uma fotografia da situação patrimonial numa data — não mede riqueza gerada e distribuída no período.` },
        { key: "B", text: `Demonstração do Fluxo de Caixa`, isCorrect: false, explanation: `A DFC explica a variação do saldo de caixa entre início e fim do período — não é seu propósito medir riqueza gerada/distribuída.` },
        { key: "C", text: `Demonstração do Valor Adicionado`, isCorrect: true, explanation: `Correto: a DVA mede a riqueza gerada pela empresa e sua distribuição entre empregados, governo, financiadores e acionistas.` },
        { key: "D", text: `Demonstração do Resultado do Exercício`, isCorrect: false, explanation: `A DRE apura o resultado (lucro ou prejuízo) do período via receitas/custos/despesas — não tem como foco a distribuição da riqueza gerada entre os diversos públicos.` },
        { key: "E", text: `Demonstração dos Lucros ou Prejuízos Acumulados`, isCorrect: false, explanation: `Essa demonstração acompanha a movimentação da conta de lucros/prejuízos acumulados — não mede a riqueza gerada e sua distribuição a múltiplos públicos como a DVA.` },
      ],
    },
  ],
};
