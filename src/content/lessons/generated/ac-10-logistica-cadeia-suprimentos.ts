import type { LessonContent } from "@/content/lessonTypes";

export const AC_10_LOGISTICA_CADEIA_SUPRIMENTOS: LessonContent = {
  slug: "ac-10-logistica-cadeia-suprimentos",
  topicSlug: "ac-10-logistica-cadeia-suprimentos",
  subjectSlug: "especificas",
  moduleSlug: "especificas-logistica-cadeia-suprimentos",
  title: `Logística e Gestão da Cadeia de Suprimentos`,
  learningObjective: `Diferenciar logística de cadeia de suprimentos, entender o custo logístico total (não otimizar transporte/estoque/armazenagem isoladamente), o efeito chicote, o CPFR (com suas vantagens e desvantagens reais), a distinção entre administração de materiais e de suprimentos, e os tipos de sistema de produção (lotes, contínua) — a Cesgranrio gosta de listar afirmações (I, II, III) sobre um cenário e pedir quais são corretas.`,
  syllabusCodes: ["AC-10"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-10 — Logística e Gestão da Cadeia de Suprimentos

## 1. Cadeia de suprimentos x Logística

- **Cadeia de suprimentos (Supply Chain)**: **integra organizações** — fornecedores, fabricante, distribuidores, varejo, cliente final — numa rede de relacionamentos.
- **Logística**: a função que **planeja e controla os fluxos** (materiais, informações, recursos financeiros) **dentro** dessa rede — é uma parte da cadeia de suprimentos, não sinônimo dela. A cadeia é o conjunto de organizações; a logística é o processo de fazer os fluxos funcionarem entre elas.

## 2. Os três fluxos da cadeia de suprimentos

- **Fluxo de materiais**: movimento físico de produtos/matérias-primas.
- **Fluxo de informações**: pedidos, previsões de demanda, status de entrega — na direção de ida e volta.
- **Fluxo de recursos financeiros**: pagamentos, créditos, condições comerciais.

Uma cadeia de suprimentos madura sincroniza os três fluxos — um fluxo de informação atrasado, por exemplo, compromete a eficiência do fluxo físico de materiais.

## 3. Custo logístico total — não otimizar isoladamente

O princípio central da gestão logística é olhar o **custo logístico TOTAL** (transporte + estoque + armazenagem + processamento de pedidos), não otimizar cada componente isoladamente. Reduzir custo de transporte usando lotes maiores, por exemplo, pode **aumentar** o custo de manutenção de estoque — o resultado líquido pode ser pior mesmo que o transporte, isoladamente, tenha ficado mais barato.

## 4. Nível de serviço logístico

O **nível de serviço** ao cliente numa cadeia de suprimentos envolve múltiplas dimensões, não só rapidez: **disponibilidade** (o produto está em estoque quando pedido?), **prazo** (tempo de entrega cumprido), **confiabilidade** (consistência do serviço ao longo do tempo) e **informação** (visibilidade sobre status do pedido). Otimizar só uma dimensão (ex.: só velocidade) sem as demais não garante um bom nível de serviço percebido pelo cliente.

## 5. Efeito chicote (Bullwhip Effect)

O **efeito chicote** é a **amplificação da variabilidade da demanda à medida que se caminha a montante** na cadeia (do varejo em direção ao fabricante e fornecedores) — pequenas variações reais na demanda do consumidor final geram oscilações cada vez maiores nos pedidos de cada elo anterior, mesmo sem mudança real proporcional na demanda de base. Causas típicas: previsões feitas isoladamente por cada elo, lotes de pedido grandes, e falta de compartilhamento de informação real de demanda.

## 6. CPFR — vantagens e a desvantagem real

O **CPFR** (Planejamento Colaborativo de Previsão e Reabastecimento) coordena atividades de previsão e reabastecimento entre diversos elos da cadeia (fornecedores, distribuidores, varejo), compartilhando informações de demanda.

**Vantagens**: redução do **efeito chicote** e **melhoria da acurácia** das previsões — quando todos os elos enxergam a mesma informação de demanda real, param de amplificar variações artificialmente.

**Desvantagem real**: o compartilhamento de informações **sensíveis** de previsão de demanda entre elos da cadeia traz **risco à segurança/confidencialidade** dessa informação — um parceiro comercial passa a ter acesso a dados estratégicos da empresa, o que exige controles de governança e confiança entre as partes.

**Pegadinha clássica**: listar "aumentar o efeito chicote" ou "diminuir a acurácia" como desvantagem — são exatamente o OPOSTO do que o CPFR entrega; a desvantagem real é o risco de segurança da informação compartilhada.

## 7. Administração de materiais x administração de suprimentos

- **Administração de materiais (AM)**: escopo mais amplo, abrangendo desde a **programação** até a **saída dos materiais rumo ao cliente** — cobre o fluxo interno completo.
- **Administração de suprimentos (AS)**: foco mais específico no **abastecimento do processo produtivo** — a entrada de insumos necessários à produção.

**Regra de decoreba**: AM é o guarda-chuva mais amplo (entrada até saída); AS é a parte de trás (garantir que o processo produtivo tenha insumos).

## 8. Sistemas de produção: lotes x contínua

- **Produção em lotes**: caracteriza-se por um **plano de produção específico para cada produto** e **arranjos sequenciais** de máquinas/equipamentos/pessoas — mas **não** tem previsibilidade total, porque a produção alterna entre diferentes produtos/lotes ao longo do tempo.
- **Produção contínua**: é a que de fato tem **previsibilidade total** — o processo roda de forma ininterrupta, com um único produto (ou família muito homogênea) fluindo constantemente pela linha.

**Pegadinha clássica**: atribuir "previsibilidade total" à produção em lotes — essa característica pertence à produção contínua, não à produção em lotes (que por natureza alterna entre produtos).

## Síntese

O AC-10 cobre desde os conceitos-base (logística x cadeia, custo total, nível de serviço, efeito chicote) até ferramentas colaborativas (CPFR, com sua vantagem real e desvantagem real) e classificações de sistema produtivo (lotes x contínua). A pegadinha mais recorrente é inverter vantagem/desvantagem do CPFR ou atribuir "previsibilidade total" ao sistema errado.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Logística e Cadeia de Suprimentos — AC-10))
    Logistica x Cadeia
      Cadeia: integra organizacoes
      Logistica: planeja fluxos dentro da rede
    Tres fluxos
      Materiais, Informacoes, Recursos financeiros
    Custo logistico total
      Nao otimizar componentes isolados
    Nivel de servico
      Disponibilidade, prazo, confiabilidade, informacao
    Efeito chicote
      Amplifica variabilidade a montante
    CPFR
      Vantagem: reduz chicote, melhora acuracia
      Desvantagem real: risco de seguranca da informacao
    AM x AS
      AM: programacao ate saida ao cliente
      AS: abastecimento do processo produtivo
    Sistemas de producao
      Lotes: plano especifico, arranjo sequencial, SEM previsibilidade total
      Continua: previsibilidade total
\`\`\``,
  mustMemorize: [
    `Cadeia de suprimentos integra ORGANIZAÇÕES; logística planeja e controla FLUXOS dentro dessa rede.`,
    `Custo logístico total evita otimizar transporte, estoque ou armazenagem ISOLADAMENTE.`,
    `Efeito chicote = amplificação da variabilidade da demanda À MONTANTE (em direção ao fabricante/fornecedor).`,
    `CPFR reduz efeito chicote e melhora acurácia; sua DESVANTAGEM real é o risco à segurança/confidencialidade da informação compartilhada.`,
    `Administração de Materiais (AM) = programação até saída ao cliente. Administração de Suprimentos (AS) = abastecimento do processo produtivo.`,
    `Produção em lotes tem plano específico por produto e arranjo sequencial, mas NÃO tem previsibilidade total — essa é característica da produção CONTÍNUA.`,
  ],
  workedExamples: [
    `O compartilhamento de informações sensíveis de previsão de demanda entre elos da cadeia no CPFR traz como desvantagem o risco à segurança/confidencialidade da informação — mesmo trazendo benefícios como redução do efeito chicote e melhoria da acurácia das previsões.`,
    `Na produção em lotes, há plano de produção específico por produto (I) e arranjo sequencial de recursos (II), mas NÃO previsibilidade total (III), que é característica da produção contínua.`,
    `A administração de materiais (AM) abrange desde a programação até a saída dos materiais rumo ao cliente, enquanto a administração de suprimentos (AS) foca no abastecimento do processo produtivo.`,
    `Serviços de baixo contato com o cliente tendem a ser padronizados, já que o processo é mais desacoplado da presença do cliente durante a execução.`,
  ],
  commonMistakes: [
    `Tratar logística e cadeia de suprimentos como sinônimos — cadeia integra organizações; logística é a função que planeja/controla fluxos dentro dela.`,
    `Otimizar transporte, estoque ou armazenagem isoladamente sem olhar o custo logístico TOTAL — pode piorar o resultado geral mesmo melhorando um componente.`,
    `Achar que o CPFR "aumenta o efeito chicote" ou "diminui a acurácia" — são exatamente o oposto: o CPFR reduz o chicote e melhora a acurácia; a desvantagem real é o risco de segurança da informação.`,
    `Atribuir "previsibilidade total" à produção em lotes — essa característica pertence à produção CONTÍNUA, não à produção em lotes, que alterna entre produtos.`,
    `Confundir administração de materiais (escopo amplo, até a saída ao cliente) com administração de suprimentos (foco no abastecimento da produção).`,
    `Padrão observado no acervo real (AC-10-2012-CESGRANRIO-39): identificar o risco de segurança da informação como a desvantagem real do compartilhamento no CPFR, descartando alternativas que invertem os benefícios reais.`,
    `Padrão observado no acervo real (AC-10-2013-CESGRANRIO-43): reconhecer que a produção em lotes tem plano específico e arranjo sequencial (I e II), mas não previsibilidade total (III).`,
    `Padrão observado no acervo real (AC-10-2013-CESGRANRIO-44): diferenciar administração de materiais (até a saída ao cliente) de administração de suprimentos (abastecimento da produção).`,
    `Padrão observado no acervo real (AC-10-2011-CESGRANRIO-39): reconhecer que serviços de baixo contato com o cliente tendem a ser padronizados, por serem mais desacoplados da presença do cliente.`,
  ],
  howBoardMightAsk: [
    `Pede a desvantagem real do compartilhamento de informação no CPFR, com distratores que invertem os benefícios reais (chicote, acurácia).`,
    `Dá afirmações (I, II, III) sobre um sistema de produção e pede quais são corretas, testando a atribuição certa de "previsibilidade total".`,
    `Pede para diferenciar administração de materiais de administração de suprimentos a partir do escopo descrito.`,
    `Descreve um cenário de otimização isolada (só transporte, só estoque) e pede a consequência sobre o custo logístico total.`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `Cadeia integra organizações; logística planeja fluxos.`,
    `Custo logístico total > otimização isolada de componentes.`,
    `Efeito chicote = amplificação de variabilidade a montante.`,
    `CPFR: vantagem = reduz chicote/melhora acurácia; desvantagem = risco de segurança da informação.`,
    `AM = programação até saída ao cliente. AS = abastecimento da produção.`,
    `Lotes = plano específico + arranjo sequencial, SEM previsibilidade total. Contínua = previsibilidade total.`,
  ],
  flashcards: [
    { front: "Diferença entre cadeia de suprimentos e logística?", back: "Cadeia integra organizações (rede). Logística planeja e controla os fluxos (materiais, informação, recursos financeiros) dentro dessa rede." },
    { front: "Qual é a desvantagem real do CPFR?", back: "Risco à segurança/confidencialidade da informação sensível compartilhada entre os elos da cadeia." },
    { front: "Produção em lotes tem previsibilidade total?", back: "Não — tem plano específico por produto e arranjo sequencial, mas a previsibilidade total é característica da produção contínua." },
    { front: "Diferença entre administração de materiais e de suprimentos?", back: "Materiais: da programação até a saída ao cliente. Suprimentos: foco no abastecimento do processo produtivo." },
  ],
  miniQuiz: [
    {
      statement: `O CPFR (Planejamento Colaborativo de Previsão e Reabastecimento) é uma técnica cada vez mais usada na gestão de cadeias de suprimento e corresponde à coordenação de atividades de previsão e reabastecimento entre diversos elos da cadeia.

Representa uma desvantagem no compartilhamento de informações de previsão de demanda entre elos de uma cadeia de suprimento o fato de o CPFR`,
      options: [
        { key: "A", text: `aumentar o efeito chicote da demanda.`, isCorrect: false, explanation: `É o oposto do efeito real: o CPFR REDUZ o efeito chicote, ao sincronizar a informação de demanda entre os elos da cadeia.` },
        { key: "B", text: `diminuir a acurácia das previsões.`, isCorrect: false, explanation: `É o oposto do efeito real: o CPFR MELHORA a acurácia das previsões, por basear-se em informação de demanda compartilhada e mais completa.` },
        { key: "C", text: `diminuir a segurança da informação.`, isCorrect: true, explanation: `Correto: o compartilhamento de informações sensíveis de previsão de demanda entre elos da cadeia traz como desvantagem real o risco à segurança/confidencialidade dessa informação.` },
        { key: "D", text: `possibilitar o aumento de estoques.`, isCorrect: false, explanation: `O CPFR tende a reduzir estoques desnecessários (efeito do efeito chicote reduzido), não a aumentá-los — não é a desvantagem correta.` },
        { key: "E", text: `possibilitar o aumento de lotes.`, isCorrect: false, explanation: `O CPFR não tem como efeito característico o aumento de lotes de pedido — essa não é a desvantagem associada ao compartilhamento de informação.` },
      ],
    },
    {
      statement: `Uma empresa adota um sistema de produção em lotes. O diretor dessa empresa decidiu adotar as seguintes diretrizes:
I - plano de produção específico para cada produto;
II - arranjos sequenciais de máquinas, equipamentos e pessoas;
III - previsibilidade total da produção.

É(São) diretriz(es) adequada(s) à produção em lotes APENAS`,
      options: [
        { key: "A", text: `I`, isCorrect: false, explanation: `A diretriz I está correta, mas incompleta — a diretriz II (arranjo sequencial de recursos) também é característica válida da produção em lotes.` },
        { key: "B", text: `II`, isCorrect: false, explanation: `A diretriz II está correta, mas incompleta — a diretriz I (plano específico por produto) também é característica válida da produção em lotes.` },
        { key: "C", text: `III`, isCorrect: false, explanation: `A previsibilidade total NÃO é característica da produção em lotes — pertence à produção contínua, que roda de forma ininterrupta.` },
        { key: "D", text: `I e II`, isCorrect: true, explanation: `Correto: na produção em lotes há plano de produção específico por produto (I) e arranjo sequencial de recursos (II), mas não previsibilidade total (III), que é característica da produção contínua.` },
        { key: "E", text: `II e III`, isCorrect: false, explanation: `A diretriz III (previsibilidade total) não se aplica à produção em lotes — apenas I e II são corretas.` },
      ],
    },
  ],
};
