import type { LessonContent } from "@/content/lessonTypes";

export const AC_07_REGISTROS_CONTABEIS: LessonContent = {
  slug: "ac-07-registros-contabeis",
  topicSlug: "ac-07-registros-contabeis",
  subjectSlug: "especificas",
  moduleSlug: "especificas-financas-contabilidade",
  title: `Registros contábeis`,
  learningObjective: `Dominar a lógica das partidas dobradas (débito/crédito conforme a natureza da conta), a equação patrimonial, o regime de competência, e os livros/relatórios que organizam o registro contábil (Diário, Razão, Balancete) — é o código com mais questões no acervo desta ênfase, e a base para AC-08 (fluxo de caixa) e AC-09 (Balanço/DRE).`,
  syllabusCodes: ["AC-07"],
  estimatedMinutes: 50,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-07 — Registros Contábeis

Este é o código com mais questões no acervo real da ênfase — a Cesgranrio cobra muito lançamento contábil concreto (débito/crédito de contas específicas), não só teoria solta. Domine a lógica antes de decorar exemplos.

## 1. Patrimônio, contas e equação patrimonial

O patrimônio de uma empresa é representado por três grandes grupos de contas, ligados pela equação fundamental da contabilidade:

**Ativo = Passivo + Patrimônio Líquido**

- **Ativo**: tudo que a empresa possui e que gera benefício futuro (caixa, estoque, equipamentos, contas a receber).
- **Passivo**: as obrigações da empresa com terceiros (fornecedores, empréstimos, tributos a pagar).
- **Patrimônio Líquido (PL)**: a diferença entre Ativo e Passivo — o que "sobra" para os sócios/acionistas (capital social, lucros acumulados).

Essa equação precisa estar **sempre em equilíbrio** — todo lançamento contábil, por menor que seja, não pode quebrá-la.

## 2. Método das partidas dobradas

O princípio central da contabilidade: **todo lançamento tem, no mínimo, um débito e um crédito, e a soma dos débitos é sempre igual à soma dos créditos**. Não existe lançamento "de um lado só" — se uma conta aumenta (ou diminui), outra conta precisa se ajustar para manter a equação patrimonial em equilíbrio.

Exemplo simples: a empresa compra um equipamento à vista. O Ativo "Equipamentos" aumenta (débito) e o Ativo "Caixa/Banco" diminui (crédito) no mesmo valor — dois ativos se movimentam, mas o total do Ativo não muda (só a composição interna).

## 3. Débito, crédito e natureza das contas — a armadilha mais comum do código

**Débito NÃO significa sempre "aumento" e crédito NÃO significa sempre "diminuição"** — isso depende do grupo da conta:

| Grupo | Débito | Crédito |
|---|---|---|
| Ativo | Aumenta | Diminui |
| Despesa | Aumenta | Diminui |
| Passivo | Diminui | Aumenta |
| Patrimônio Líquido | Diminui | Aumenta |
| Receita | Diminui | Aumenta |

Regra de memorização: **Ativo e Despesa se comportam igual** (débito aumenta); **Passivo, PL e Receita se comportam igual** (crédito aumenta) — são "grupos espelhados". A banca adora testar isso com uma conta de passivo ou receita, esperando que o candidato aplique automaticamente a regra do ativo (achando que débito sempre aumenta).

## 4. Atos e fatos contábeis

- **Ato contábil**: um evento que, sozinho, ainda não modifica o patrimônio (ex.: assinar um contrato, admitir um funcionário) — é um compromisso, não uma variação patrimonial já registrável.
- **Fato contábil**: um evento que **efetivamente altera** o patrimônio (compra, venda, pagamento, recebimento) — é isso que gera o lançamento contábil.

A prova pode descrever uma situação e perguntar se aquilo já é um fato contábil (gera lançamento) ou ainda é só um ato preparatório (não gera).

## 5. Livro Diário, Livro Razão e Balancete

Três instrumentos com funções diferentes e complementares:

- **Livro Diário**: registra os lançamentos **em ordem cronológica**, um após o outro, conforme acontecem.
- **Livro Razão**: reorganiza as mesmas informações do Diário **por conta** — mostra tudo que aconteceu numa conta específica (ex.: todos os lançamentos de "Banco"), facilitando ver o saldo de cada conta.
- **Balancete de verificação**: lista todas as contas com seus saldos devedores e credores, servindo para **conferir se a soma dos débitos bate com a soma dos créditos** — é um instrumento de checagem, não de registro original.

## 6. Regime de competência x regime de caixa

- **Regime de competência** (usado pela contabilidade societária/oficial): reconhece receitas e despesas **quando ocorrem** (quando o fato gerador acontece), independentemente de quando o dinheiro efetivamente entra ou sai do caixa.
- **Regime de caixa**: reconhece receitas e despesas **apenas quando o dinheiro** efetivamente entra ou sai.

Exemplo: uma venda a prazo é registrada como receita no regime de competência assim que a venda ocorre — mesmo que o dinheiro só entre 30 dias depois. No regime de caixa, só seria registrada quando o cliente efetivamente pagasse.

## 7. Obrigações acessórias e controles fiscais

Obrigações acessórias são declarações e documentos que **informam** o Fisco sobre fatos geradores de tributos (ex.: notas fiscais, declarações eletrônicas) — elas **documentam e comunicam**, mas não se confundem com o tributo principal em si (o valor efetivamente devido). Uma empresa pode estar em dia com uma obrigação acessória (entregou a declaração) e ainda assim dever o tributo, ou vice-versa — são obrigações independentes uma da outra.

## Síntese

A base de AC-07 é entender que débito/crédito dependem da NATUREZA da conta (ativo/despesa vs. passivo/PL/receita), que todo lançamento preserva a equação patrimonial, e que Diário, Razão e Balancete são instrumentos com papéis diferentes no mesmo processo de registro. Essa base é o que sustenta AC-08 (fluxo de caixa) e AC-09 (Balanço/DRE) na sequência.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Registros Contábeis — AC-07))
    Equação patrimonial
      Ativo = Passivo + PL
    Partidas dobradas
      Débito = Crédito sempre
    Natureza das contas
      Ativo/Despesa: débito aumenta
      Passivo/PL/Receita: crédito aumenta
    Atos x Fatos contábeis
      Ato: ainda não altera patrimônio
      Fato: altera o patrimônio, gera lançamento
    Livros e relatórios
      Diário: cronológico
      Razão: por conta
      Balancete: verificação de saldos
    Regimes
      Competência: quando ocorre
      Caixa: quando o dinheiro se move
    Obrigações acessórias
      Informam o Fisco
      Não se confundem com o tributo principal
\`\`\``,
  mustMemorize: [
    `Ativo = Passivo + Patrimônio Líquido — equação sempre em equilíbrio.`,
    `Toda partida dobrada: soma dos débitos = soma dos créditos.`,
    `Ativo e Despesa: débito AUMENTA. Passivo, PL e Receita: débito DIMINUI (crédito aumenta) — grupos "espelhados".`,
    `Ato contábil: ainda não altera o patrimônio. Fato contábil: altera o patrimônio e gera lançamento.`,
    `Diário = ordem cronológica. Razão = organizado por conta. Balancete = verifica se débitos batem com créditos.`,
    `Regime de competência: reconhece quando o fato ocorre. Regime de caixa: reconhece quando o dinheiro se move.`,
    `Obrigações acessórias informam o Fisco (declarações, notas fiscais) e são independentes do tributo principal em si.`,
  ],
  workedExamples: [
    `Escrituração é a técnica contábil de registro cronológico dos fatos contábeis, com o objetivo de controlar o patrimônio e suas variações — o termo técnico correto para "a atividade de registrar", não confundir com controladoria (área de gestão), consolidação (juntar demonstrações de grupos empresariais), combinação ou demonstração (relatórios finais).`,
    `Compra de estoque por R$ 3.700,00, com 50% pago em cheque e 50% a prazo: debita Estoque (ativo, aumenta) R$ 3.700,00; credita Banco (ativo, diminui) R$ 1.850,00; credita Fornecedores (passivo, aumenta) R$ 1.850,00. A soma dos débitos (3.700) bate com a soma dos créditos (1.850+1.850=3.700) — partida dobrada correta.`,
    `O objetivo final da contabilidade, ao fornecer informações úteis a usuários internos e externos, é subsidiar a tomada de decisões desses usuários — controle patrimonial, registro de fatos e atendimento a exigências legais são MEIOS para chegar nesse objetivo, não o fim último em si.`,
    `Encerramento de conta de resultado: debita 'Vendas' (zerando seu saldo credor) e credita 'Apuração do Resultado' pelo mesmo valor — procedimento padrão ao final do período contábil para apurar o resultado do exercício, zerando as contas de receita/despesa para o próximo período começar do zero.`,
  ],
  commonMistakes: [
    `Achar que débito sempre significa "aumento" — só é verdade para Ativo e Despesa; em Passivo, PL e Receita, débito DIMINUI.`,
    `Confundir ato contábil (ainda não altera o patrimônio) com fato contábil (altera e gera lançamento).`,
    `Tratar Diário, Razão e Balancete como a mesma coisa — cada um organiza a informação de um jeito e serve a um propósito diferente (cronológico, por conta, verificação).`,
    `Confundir regime de competência (quando o fato ocorre) com regime de caixa (quando o dinheiro se move) — a contabilidade societária oficial usa competência.`,
    `Achar que cumprir uma obrigação acessória (entregar a declaração) significa que o tributo principal já foi pago — são obrigações independentes.`,
    `Padrão observado no acervo real (AC-07-2012-CESGRANRIO-41): escrituração é a técnica de registro cronológico com objetivo de controlar o patrimônio — termo técnico específico, não confundir com controladoria, consolidação, combinação ou demonstração.`,
    `Padrão observado no acervo real (AC-07-2012-CESGRANRIO-42): num lançamento de compra parcelada, o estoque (ativo) é debitado pelo valor total, e as saídas de caixa/banco e o passivo em fornecedores são creditados nas proporções corretas — atenção a distribuir corretamente entre as contas de crédito.`,
    `Padrão observado no acervo real (AC-07-2006-CESGRANRIO-31): o objetivo final da contabilidade é subsidiar decisões dos usuários — não confundir o objetivo final com os meios (controle patrimonial, registro, exigências legais).`,
    `Padrão observado no acervo real (AC-07-2006-CESGRANRIO-36): encerramento de conta de resultado (ex.: Vendas) contra Apuração do Resultado é procedimento padrão de fim de período, não um lançamento "estranho" ou incomum.`,
  ],
  howBoardMightAsk: [
    `Pede o nome técnico de um processo contábil (ex.: escrituração) a partir de uma definição, com distratores de termos parecidos (controladoria, consolidação).`,
    `Apresenta uma transação concreta (compra parcelada, venda, pagamento) e pede o lançamento contábil correto (quais contas, débito ou crédito, valores).`,
    `Testa se o candidato sabe que débito/crédito dependem da natureza da conta, geralmente usando uma conta de passivo ou receita para verificar se ele erra achando que débito sempre aumenta.`,
    `Pede para diferenciar regime de competência de regime de caixa a partir de uma situação de venda a prazo.`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `Ativo = Passivo + PL, sempre em equilíbrio.`,
    `Toda partida dobrada: débitos = créditos.`,
    `Ativo/Despesa: débito aumenta. Passivo/PL/Receita: crédito aumenta.`,
    `Ato contábil ≠ fato contábil (só o fato gera lançamento).`,
    `Diário (cronológico) x Razão (por conta) x Balancete (verificação).`,
    `Competência (quando ocorre) x Caixa (quando o dinheiro se move).`,
    `Obrigações acessórias informam o Fisco, independentes do tributo principal.`,
  ],
  flashcards: [
    { front: "Qual a equação patrimonial fundamental da contabilidade?", back: "Ativo = Passivo + Patrimônio Líquido." },
    { front: "Débito sempre significa aumento?", back: "Não — só em Ativo e Despesa. Em Passivo, PL e Receita, débito DIMINUI (crédito aumenta)." },
    { front: "Diferença entre Livro Diário e Livro Razão?", back: "Diário: registro em ordem cronológica. Razão: reorganiza os mesmos lançamentos por conta." },
    { front: "Diferença entre regime de competência e regime de caixa?", back: "Competência: reconhece quando o fato ocorre. Caixa: reconhece só quando o dinheiro efetivamente se move." },
  ],
  miniQuiz: [
    {
      statement: `A técnica empregada para o registro dos fatos contábeis e que tem como objetivo o controle do patrimônio e de suas variações é denominada`,
      options: [
        { key: "A", text: `controladoria`, isCorrect: false, explanation: `Controladoria é a área/função de gestão que usa informações contábeis para decisão, não a técnica de registro em si.` },
        { key: "B", text: `consolidação`, isCorrect: false, explanation: `Consolidação é o processo de juntar demonstrações contábeis de um grupo de empresas, não a técnica de registro cotidiano.` },
        { key: "C", text: `combinação`, isCorrect: false, explanation: `Não é um termo técnico contábil padrão para a técnica de registro dos fatos.` },
        { key: "D", text: `demonstração`, isCorrect: false, explanation: `Demonstração é o relatório final (ex.: Balanço, DRE), resultado do processo de registro — não o processo de registro em si.` },
        { key: "E", text: `escrituração`, isCorrect: true, explanation: `Correto: escrituração é a técnica contábil de registro cronológico dos fatos contábeis, com o objetivo de controlar o patrimônio e suas variações.` },
      ],
    },
    {
      statement: `A empresa Juventude Ltda. comercializa, entre outros produtos, desodorizadores para veículos. No dia 05 de abril de 2012, comprou 370 unidades pelo valor de R$ 3.700,00, sendo o pagamento feito com entrada de 50% em cheque, e o restante, com vencimento para trinta dias.

Qual é o registro contábil efetuado pela contabilidade no dia da aquisição do produto?`,
      options: [
        { key: "A", text: `Debita Banco R$ 1.850,00; Debita Fornecedores R$ 1.850,00; Credita Estoque R$ 3.700,00`, isCorrect: false, explanation: `Inverte a lógica: o Estoque deveria ser debitado (entrou na empresa), e Banco/Fornecedores creditados (saída de recurso/geração de obrigação), não o contrário.` },
        { key: "B", text: `Debita Estoque R$ 3.700,00; Credita Caixa R$ 1.850,00; Credita Banco R$ 1.850,00`, isCorrect: false, explanation: `O pagamento foi feito com CHEQUE (conta Banco), não com Caixa — usar Caixa duplica incorretamente o valor pago via cheque.` },
        { key: "C", text: `Debita Estoque R$ 3.700,00; Credita Banco R$ 1.850,00; Credita Fornecedores R$ 1.850,00`, isCorrect: true, explanation: `Correto: o Estoque (ativo) aumenta R$ 3.700,00 (débito). O pagamento com cheque reduz Banco em R$ 1.850,00 (crédito) e o saldo a prazo gera obrigação em Fornecedores de R$ 1.850,00 (crédito) — soma dos créditos (3.700) bate com o débito.` },
        { key: "D", text: `Debita Estoque R$ 1.850,00; Debita Caixa R$ 1.850,00; Credita Banco R$ 3.700,00`, isCorrect: false, explanation: `O Estoque deveria entrar pelo valor TOTAL (R$ 3.700,00), não pela metade — e Caixa não foi utilizado nesta transação (o pagamento foi em cheque).` },
        { key: "E", text: `Debita Estoque R$ 1.850,00; Debita Banco R$ 1.850,00; Credita Banco R$ 3.700,00`, isCorrect: false, explanation: `O Estoque deveria entrar pelo valor total (R$ 3.700,00), e Banco não pode aparecer ao mesmo tempo como débito e crédito nessa transação.` },
      ],
    },
  ],
};
