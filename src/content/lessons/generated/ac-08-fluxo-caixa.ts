import type { LessonContent } from "@/content/lessonTypes";

export const AC_08_FLUXO_CAIXA: LessonContent = {
  slug: "ac-08-fluxo-caixa",
  topicSlug: "ac-08-fluxo-caixa",
  subjectSlug: "especificas",
  moduleSlug: "especificas-financas-contabilidade",
  title: `Fluxo de caixa`,
  learningObjective: `Diferenciar fluxo de caixa (regime de caixa, entradas/saídas efetivas) do resultado contábil (regime de competência), reconhecer os três blocos do fluxo (operacional/investimento/financiamento) e entender como o orçamento mestre se divide em orçamento operacional e orçamento financeiro — a Cesgranrio adora dar uma lista de eventos e pedir qual deles é (ou não é) um evento de caixa de verdade.`,
  syllabusCodes: ["AC-08"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-08 — Fluxo de Caixa

## 1. Regime de caixa x regime de competência — a distinção central do código

O **fluxo de caixa** registra apenas **movimentações efetivas de dinheiro** (regime de caixa): dinheiro que de fato entrou ou saiu do caixa da empresa naquele momento. Isso é diferente do **regime de competência**, usado na contabilidade, que registra o evento no momento em que ele **economicamente ocorre**, independente de o dinheiro ter circulado.

**Consequência prática**: uma venda a prazo gera receita contábil (competência) no momento da venda, mas só entra no fluxo de caixa quando a parcela é efetivamente **recebida**. Da mesma forma, a depreciação é uma despesa contábil (desgaste do ativo), mas **nunca é um evento de caixa** — não existe saída de dinheiro associada a ela, é só um lançamento contábil.

**Exemplos do que NÃO é evento de caixa** (mesmo parecendo movimentação financeira): faturamento de uma compra a prazo (o compromisso foi assumido, mas o dinheiro ainda não saiu), emissão de nota fiscal de venda a prazo (documento fiscal, não movimento de caixa), emissão de nota fiscal de transferência de estoque (movimento físico de mercadoria, não de dinheiro), depreciação (lançamento contábil sem contrapartida em caixa).

**Exemplo do que É evento de caixa**: o recebimento efetivo de uma parcela de venda a prazo — é nesse momento, e só nesse momento, que o dinheiro de fato entra.

## 2. Os três blocos do fluxo de caixa (DFC)

A Demonstração do Fluxo de Caixa organiza os movimentos em três categorias:

- **Fluxo operacional**: ligado às atividades principais do negócio (recebimento de clientes, pagamento a fornecedores, salários) — é o fluxo que mostra se a operação em si gera ou consome caixa.
- **Fluxo de investimento**: compra e venda de ativos de longo prazo (imobilizado, participações societárias) — mostra quanto a empresa está investindo em sua capacidade futura.
- **Fluxo de financiamento**: captação e pagamento de capital próprio (aumento de capital, dividendos) e de terceiros (empréstimos, financiamentos) — mostra como a empresa se financia.

## 3. Método direto x método indireto (DFC operacional)

Existem duas formas de apresentar o fluxo operacional na DFC:

- **Método direto**: mostra os recebimentos e pagamentos **brutos** das operações (ex.: "recebido de clientes: X", "pago a fornecedores: Y") — mais transparente, mas trabalhoso de montar.
- **Método indireto**: parte do **lucro líquido** (regime de competência) e faz **ajustes** para eliminar itens que não movimentam caixa (como a depreciação, que é somada de volta) e para refletir variações do capital de giro (contas a receber, estoques, contas a pagar) — é o método mais usado na prática, justamente porque parte de algo que a contabilidade já calculou.

**Por que lucro não é caixa**: o lucro (competência) e o caixa (regime de caixa) têm "relógios" diferentes — uma empresa pode ser lucrativa no papel e ainda assim ficar sem caixa, se suas vendas a prazo não tiverem sido recebidas ainda.

## 4. Saldo inicial, geração líquida e saldo final

A lógica do fluxo de caixa em qualquer período é sempre:

**Saldo final = Saldo inicial + Geração líquida de caixa do período**

Onde a geração líquida é a soma algébrica dos três fluxos (operacional + investimento + financiamento). Se a geração líquida for negativa, o saldo final cai mesmo que a empresa tenha lucro contábil no período — reforçando por que acompanhar caixa é tão importante quanto acompanhar lucro.

## 5. Capital de giro e liquidez

O **capital de giro** é o recurso necessário para financiar o ciclo operacional (comprar, produzir, vender, receber) até que as vendas virem caixa. Se o prazo de recebimento dos clientes é maior que o prazo de pagamento aos fornecedores, a empresa precisa de mais capital de giro para "segurar" essa diferença de tempo — é aqui que entra a **liquidez**: a capacidade de honrar compromissos de curto prazo com o caixa e ativos rapidamente conversíveis em caixa disponíveis.

## 6. Orçamento mestre: orçamento operacional x orçamento financeiro

O orçamento é a ferramenta que apoia os gestores no **planejamento e controle**, servindo como referência para comparar desempenho real com o desejado — e é fundamental para a **prestação de contas** dos gestores, por consolidar metas e permitir a comparação entre previsto e realizado.

O **orçamento mestre** se divide em dois grandes blocos:

- **Orçamento operacional**: cobre as atividades do dia a dia do negócio — orçamento de **vendas**, de **compras**, de **custo dos produtos vendidos** e de **despesas operacionais**.
- **Orçamento financeiro**: cobre decisões de investimento e financiamento de longo prazo — o principal componente é o **orçamento de capital** (investimentos em ativos de longo prazo, como máquinas e instalações).

**Regra de decoreba útil**: se o item orçado é do ciclo operacional recorrente (vender, comprar, produzir, gastar para operar), é orçamento **operacional**; se é investimento em ativo de longo prazo, é orçamento **financeiro** (de capital).

## 7. Integração entre fluxo de caixa e orçamento

Projeções de fluxo de caixa devem sempre explicitar suas **premissas** (prazos médios de recebimento/pagamento, sazonalidade) e cenários (otimista/realista/pessimista), e precisam ser **conciliadas** com o orçamento da empresa — do contrário, a projeção de caixa e o orçamento operacional caminham em direções diferentes e nenhum dos dois serve para prever o futuro com confiança.

**Consequência de não fazer isso bem**: a ausência de administração financeira adequada compromete o conhecimento real dos custos e despesas da empresa, o que leva a um **cálculo de preço de venda inadequado** — se você não sabe quanto custa produzir, não sabe por quanto vender com margem positiva.

## Síntese

O núcleo do AC-08 é a distinção caixa x competência, os três blocos do DFC, a diferença entre método direto e indireto, e a divisão do orçamento mestre em operacional x financeiro. A pegadinha mais recorrente da banca é listar eventos parecidos com movimentação de dinheiro (nota fiscal, depreciação, faturamento) e pedir qual deles é de fato um evento de caixa.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Fluxo de Caixa — AC-08))
    Regime de caixa x competência
      Caixa: dinheiro que entrou/saiu de fato
      Competência: evento economico, independente do dinheiro
      Depreciacao nunca é evento de caixa
    Tres blocos do DFC
      Operacional: atividade principal
      Investimento: ativos de longo prazo
      Financiamento: capital proprio e de terceiros
    Metodos
      Direto: recebimentos/pagamentos brutos
      Indireto: parte do lucro, ajusta itens sem caixa
    Saldo
      Final = Inicial + Geracao liquida
    Orcamento mestre
      Operacional: vendas, compras, CPV, despesas
      Financeiro: orcamento de capital
\`\`\``,
  mustMemorize: [
    `Fluxo de caixa = regime de CAIXA (dinheiro que entrou/saiu de fato); contabilidade = regime de COMPETÊNCIA (evento econômico, independente do dinheiro).`,
    `Depreciação NUNCA é evento de caixa — é lançamento contábil sem saída de dinheiro.`,
    `Fluxo operacional = atividade principal; investimento = ativos de longo prazo; financiamento = capital próprio e de terceiros.`,
    `Método direto mostra recebimentos/pagamentos brutos; método indireto parte do lucro e ajusta itens sem caixa (soma depreciação de volta).`,
    `Saldo final = Saldo inicial + Geração líquida de caixa do período.`,
    `Orçamento operacional: vendas, compras, custo dos produtos vendidos, despesas operacionais. Orçamento financeiro: orçamento de capital (ativos de longo prazo).`,
  ],
  workedExamples: [
    `O orçamento de capital (investimentos em ativos de longo prazo) integra o orçamento FINANCEIRO, enquanto vendas, compras, custo dos produtos vendidos e despesas operacionais fazem parte do orçamento OPERACIONAL.`,
    `Numa lista com faturamento a prazo, depreciação, emissão de nota fiscal, transferência de estoque e recebimento de parcela: apenas o RECEBIMENTO DE PARCELA é evento de caixa — os demais são eventos contábeis/documentais sem movimentação efetiva de dinheiro naquele momento.`,
    `A ausência de administração financeira adequada compromete o conhecimento dos custos e despesas da empresa, levando a um cálculo de preço de venda inadequado — as demais alternativas de uma questão assim costumam descrever boas práticas, não problemas causados pela ausência de gestão.`,
    `O orçamento é o plano financeiro considerado fundamental para a PRESTAÇÃO DE CONTAS das atividades dos gestores, por consolidar metas e permitir comparação entre previsto e realizado.`,
  ],
  commonMistakes: [
    `Achar que faturamento a prazo, emissão de nota fiscal ou depreciação são eventos de caixa — só o recebimento/pagamento EFETIVO de dinheiro é evento de caixa.`,
    `Confundir lucro contábil com caixa disponível — uma empresa pode ter lucro no papel (competência) e falta de caixa (regime de caixa) ao mesmo tempo.`,
    `Trocar orçamento operacional por financeiro — vendas/compras/CPV/despesas são operacionais; investimento em ativo de longo prazo (orçamento de capital) é financeiro.`,
    `Achar que método indireto "ignora" a depreciação — na verdade ele SOMA a depreciação de volta ao lucro, porque ela tinha sido subtraída no cálculo contábil sem representar saída de caixa.`,
    `Padrão observado no acervo real (AC-08-2012-CESGRANRIO-37): identificar corretamente que orçamento de capital é o único item, entre vendas/compras/CPV/despesas/capital, que pertence ao orçamento financeiro.`,
    `Padrão observado no acervo real (AC-08-2012-CESGRANRIO-47): reconhecer que só o recebimento efetivo de dinheiro (não faturamento, nota fiscal ou depreciação) é registro de movimento de caixa.`,
    `Padrão observado no acervo real (AC-08-2012-CESGRANRIO-51): a ausência de administração financeira leva a preço de venda mal calculado — não confundir com alternativas que descrevem boas práticas.`,
    `Padrão observado no acervo real (AC-08-2012-CESGRANRIO-57): o orçamento serve, acima de tudo, para a prestação de contas dos gestores via comparação previsto x realizado.`,
  ],
  howBoardMightAsk: [
    `Dá uma lista de eventos (venda a prazo, depreciação, nota fiscal, recebimento) e pede qual é registrado no movimento/fluxo de caixa.`,
    `Pede para classificar um item de orçamento (vendas, compras, capital) como operacional ou financeiro.`,
    `Descreve consequências da má gestão financeira e pede qual alternativa é realmente um PROBLEMA (não uma boa prática).`,
    `Pede a finalidade central do orçamento como ferramenta de gestão (planejamento, controle, prestação de contas).`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `Caixa = dinheiro que entrou/saiu de fato. Competência = evento econômico, independente do dinheiro.`,
    `Depreciação nunca é evento de caixa.`,
    `Operacional / Investimento / Financiamento — os três blocos do DFC.`,
    `Método direto = bruto. Método indireto = parte do lucro, ajusta itens sem caixa.`,
    `Saldo final = Saldo inicial + Geração líquida.`,
    `Orçamento operacional (vendas/compras/CPV/despesas) x orçamento financeiro (capital).`,
  ],
  flashcards: [
    { front: "Diferença entre regime de caixa e regime de competência?", back: "Caixa: dinheiro que entrou/saiu de fato. Competência: evento econômico registrado quando ocorre, independente do dinheiro ter circulado." },
    { front: "A depreciação é um evento de caixa?", back: "Não — nunca. É um lançamento contábil sem saída efetiva de dinheiro; no método indireto, ela é somada de volta ao lucro." },
    { front: "Vendas, compras, CPV e despesas pertencem a qual orçamento?", back: "Ao orçamento operacional. O orçamento de capital (ativos de longo prazo) pertence ao orçamento financeiro." },
    { front: "Fórmula do saldo final de caixa?", back: "Saldo final = Saldo inicial + Geração líquida de caixa do período." },
  ],
  miniQuiz: [
    {
      statement: `O orçamento é uma ferramenta que apoia os gestores em suas funções de planejamento e controle. Pode ser utilizado como um nível de referência que permite aos gestores comparar o desempenho real com o desempenho estimado ou desejado. O orçamento mestre pode ser dividido em orçamento operacional e orçamento financeiro.

O componente que faz parte do orçamento financeiro é o orçamento de`,
      options: [
        { key: "A", text: `capital`, isCorrect: true, explanation: `Correto: o orçamento de capital (investimentos em ativos de longo prazo) integra o orçamento financeiro, enquanto vendas, compras, custo dos produtos vendidos e despesas operacionais fazem parte do orçamento operacional.` },
        { key: "B", text: `vendas`, isCorrect: false, explanation: `O orçamento de vendas é parte do orçamento OPERACIONAL — cobre a atividade recorrente do negócio, não investimento de longo prazo.` },
        { key: "C", text: `compras`, isCorrect: false, explanation: `O orçamento de compras é operacional — está ligado ao ciclo recorrente de produção/revenda, não a ativos de longo prazo.` },
        { key: "D", text: `custo dos produtos vendidos`, isCorrect: false, explanation: `O CPV é um item do orçamento operacional, calculado a partir do volume de vendas e do custo de produção/aquisição — não é orçamento financeiro.` },
        { key: "E", text: `despesas operacionais`, isCorrect: false, explanation: `Despesas operacionais são, pela própria nomenclatura, parte do orçamento OPERACIONAL, não do financeiro.` },
      ],
    },
    {
      statement: `O fluxo de caixa da empresa demonstra o movimento de entradas e saídas monetárias.

Dentre os registros realizados no movimento de caixa, está o(a)`,
      options: [
        { key: "A", text: `recebimento de parcela de venda a prazo`, isCorrect: true, explanation: `Correto: o fluxo de caixa registra apenas movimentações efetivas de dinheiro (regime de caixa). O recebimento da parcela é o momento em que o dinheiro de fato entra — os demais itens são eventos contábeis/documentais sem movimentação efetiva de caixa naquele momento.` },
        { key: "B", text: `faturamento da compra a prazo`, isCorrect: false, explanation: `O faturamento é o registro do compromisso assumido (regime de competência) — o dinheiro ainda não saiu do caixa nesse momento.` },
        { key: "C", text: `depreciação de equipamento da fábrica`, isCorrect: false, explanation: `A depreciação é um lançamento contábil que reflete o desgaste do ativo ao longo do tempo — nunca representa saída efetiva de dinheiro do caixa.` },
        { key: "D", text: `emissão de nota fiscal de venda a prazo`, isCorrect: false, explanation: `A nota fiscal é um documento fiscal que formaliza a venda — não é, por si só, uma movimentação de caixa; o caixa só se movimenta quando o valor é efetivamente recebido.` },
        { key: "E", text: `emissão de nota fiscal de transferência de estoque`, isCorrect: false, explanation: `Transferência de estoque é movimentação física de mercadoria entre locais, documentada por nota fiscal — não envolve entrada ou saída de dinheiro do caixa.` },
      ],
    },
  ],
};
