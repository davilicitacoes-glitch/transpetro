import type { LessonContent } from "@/content/lessonTypes";

export const AC_12_GESTAO_ESTOQUES: LessonContent = {
  slug: "ac-12-gestao-estoques",
  topicSlug: "ac-12-gestao-estoques",
  subjectSlug: "especificas",
  moduleSlug: "especificas-logistica-cadeia-suprimentos",
  title: `Gestão de Estoques`,
  learningObjective: `Dominar os tipos de estoque (ciclo, segurança, antecipação, trânsito, operacional), a lógica do Lote Econômico de Compras (LEC), a classificação ABC e de criticidade, e os modelos de previsão de demanda (quantitativos x qualitativos) — a Cesgranrio gosta de dar um problema numérico completo (demanda, custo de pedido, custo de manutenção) e pedir a fórmula ou o resultado exato do LEC.`,
  syllabusCodes: ["AC-12"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-12 — Gestão de Estoques

## 1. Tipos de estoque — por que cada um existe

Cada tipo de estoque existe para resolver um problema logístico diferente:

- **Estoque de ciclo**: decorre do **tamanho dos lotes** de compra/produção — se você compra de uma vez mais do que consome no curto prazo, sobra estoque até o próximo lote ser consumido. Quanto maior o lote, maior o estoque médio de ciclo.
- **Estoque de segurança**: protege contra a **incerteza** — variações na demanda ou no prazo de entrega do fornecedor. É um "colchão" para não faltar produto quando a realidade foge da previsão.
- **Estoque de antecipação**: constituído **antes** de um evento previsto (sazonalidade, promoção, greve anunciada) — diferente do de segurança, que cobre incerteza, o de antecipação cobre algo já sabido de antemão.
- **Estoque em trânsito**: material que já saiu da origem mas ainda não chegou ao destino — existe pelo tempo de transporte, não por decisão de estocagem.
- **Estoque operacional (WIP — work in process)**: produtos **em processo**, ainda não finalizados, que fluem entre os estágios de fabricação — diferente de matéria-prima (ainda não entrou em produção), produtos acabados (já saiu da produção) ou sobressalentes (estoque de manutenção, não de produção).

## 2. Classificação ABC e critérios de criticidade

A **Curva ABC** classifica os itens de estoque pelo **valor de consumo anual** (quantidade × valor unitário), não pela quantidade física isolada — um item de baixo valor unitário mas alto giro pode ter maior valor de consumo anual que um item caro e de baixo giro.

- **Classe A**: poucos itens, alto valor de consumo — merecem controle rigoroso e individualizado.
- **Classe B**: quantidade intermediária de itens e valor.
- **Classe C**: muitos itens, baixo valor de consumo — controle simplificado, menos custoso que o benefício de um controle rígido.

Além do valor de consumo, materiais também podem ser classificados por **critérios de criticidade**, cada um medindo um risco diferente:

- **Segurança**: refere-se especificamente à **periculosidade** do material — risco de acidentes, explosão, contaminação. Não confundir com os demais critérios.
- **Perecibilidade**: critério de tempo/prazo de validade — o material se deteriora se não for usado a tempo.
- **Escassez**: dificuldade de **obtenção** do material no mercado (fornecedor único, importação demorada).
- **Custo**: relevância por razões puramente **econômicas**.
- **Dificuldade de acomodação**: relacionada à **armazenagem** física (volume, condições especiais de guarda).

**Pegadinha clássica**: a banca troca "segurança" (periculosidade) por "perecibilidade" (validade) ou por "escassez" (obtenção) — são cinco critérios distintos que respondem a perguntas diferentes.

## 3. Lote Econômico de Compras (LEC) — a fórmula mais cobrada

O **Lote Econômico de Compras** é a quantidade de material a ser comprada de cada vez que **minimiza o custo total** de estoque, equilibrando dois custos que se movem em direções opostas:

- **Custo de pedido**: quanto mais vezes você pede (lotes menores), mais vezes paga o custo fixo de fazer o pedido.
- **Custo de manutenção**: quanto maior o lote, maior o estoque médio parado, e maior o custo de manter esse estoque (armazenagem, capital parado, obsolescência).

A fórmula clássica é:

$$LEC = \\sqrt{\\dfrac{2 \\times D \\times S}{H}}$$

Onde:
- **D** = demanda anual (quantidade total consumida no ano)
- **S** = custo de fazer **cada pedido** (setup/pedido)
- **H** = custo de **manter** uma unidade em estoque por ano (holding cost)

**Como memorizar a estrutura**: dentro da raiz, o numerador é "2 × Demanda × Custo do Pedido" e o denominador é o "Custo de Manutenção". Trocar H pelo numerador ou D pelo denominador é o erro mais comum ao tentar decorar a fórmula sem entender o que cada letra representa.

**Exemplo numérico**: se D = 2.000 toneladas/ano, S = R$ 50/pedido e H = R$ 300/tonelada/ano, o LEC é √((2×2.000×50)/300).

## 4. Ponto de pedido e estoque de segurança

O **ponto de pedido** é o nível de estoque em que se deve disparar um novo pedido de reposição, calculado considerando a **demanda durante o tempo de reposição** (lead time) **mais** o estoque de segurança:

Ponto de Pedido = (Demanda média diária × Lead time) + Estoque de segurança

Isso garante que, mesmo no pior cenário razoável (demanda um pouco acima da média durante a espera do fornecedor), o estoque de segurança evita a ruptura.

## 5. Sistemas de revisão: contínua x periódica

- **Revisão contínua**: o estoque é monitorado constantemente e o pedido é disparado assim que atinge o ponto de pedido — a quantidade pedida é fixa (geralmente o LEC), mas o momento do pedido varia.
- **Revisão periódica**: o estoque é verificado em **intervalos fixos de tempo** (ex.: toda segunda-feira), e a quantidade pedida varia conforme o que falta para completar um nível-alvo — aqui o momento é fixo, mas a quantidade varia.

## 6. Nível de serviço e ruptura

O **nível de serviço** mede a capacidade de atender a demanda sem faltar produto. Quanto **maior** o nível de serviço desejado, **maior** a proteção necessária (mais estoque de segurança) e, consequentemente, **maior** o custo de manutenção de estoque — não existe nível de serviço alto "de graça". A **ruptura** (stockout) é justamente o evento que o estoque de segurança tenta evitar: faltar o item no momento em que é demandado.

## 7. Previsão de demanda: modelos quantitativos x qualitativos

Os modelos de previsão de demanda se dividem em duas famílias:

- **Modelos quantitativos**: baseados em dados históricos. O principal é o de **séries temporais**, que decompõe a demanda histórica em três componentes: **tendência** (direção de longo prazo, crescimento ou queda), **sazonalidade/ciclicidade** (padrões que se repetem em intervalos regulares) e **variação aleatória** (ruído não explicado pelos outros dois). Outro modelo quantitativo é a **suavização exponencial**, que dá peso maior às observações mais recentes.
- **Modelos qualitativos**: baseados em julgamento e experiência, não em dados históricos estruturados. Os principais são **Delphi** (rodadas sucessivas de consulta a especialistas, buscando convergência de opinião) e **mini-Delphi** (versão simplificada/mais rápida do método) — usados quando não há histórico de dados suficiente (produto novo, mercado inédito).

**Pegadinha clássica**: a banca descreve os componentes de tendência/ciclicidade/aleatoriedade (que são de séries temporais, um método quantitativo) e oferece Delphi ou mini-Delphi como distratores — mas esses são métodos qualitativos, incompatíveis com a descrição.

## 8. Tecnologia de apoio: ERP, WMS, código de barras e RFID

- **ERP** (Enterprise Resource Planning): sistema integrado que conecta os módulos de toda a empresa (estoque, compras, financeiro, produção).
- **WMS** (Warehouse Management System): controla especificamente a **localização física** e as **operações dentro do armazém** (endereçamento, separação, conferência).
- **Código de barras**: exige **leitura visual direta** (linha de visada) do leitor sobre o código.
- **RFID**: permite leitura **sem contato visual direto** (por radiofrequência), possibilitando ler múltiplos itens simultaneamente e a distância — vantagem operacional relevante em armazéns de alto volume.

## Síntese

O núcleo do AC-12 combina classificação de estoques (por que cada tipo existe), classificação ABC/criticidade (por valor e por risco), a fórmula do LEC (que exige cálculo, não só reconhecimento) e os modelos de previsão de demanda (quantitativo x qualitativo). Pratique a fórmula do LEC com números reais — é o ponto mais provável de pegadinha por troca de posição das variáveis.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Gestão de Estoques — AC-12))
    Tipos de estoque
      Ciclo: tamanho do lote
      Seguranca: incerteza
      Antecipacao: evento previsto
      Transito: tempo de transporte
      Operacional/WIP: em producao
    Classificacao
      ABC: valor de consumo anual
      Criticidade: seguranca, perecibilidade, escassez, custo, acomodacao
    Lote Economico LEC
      raiz de 2DS sobre H
      D=demanda, S=custo pedido, H=custo manutencao
    Ponto de pedido
      Demanda no lead time + estoque de seguranca
    Revisao
      Continua: quantidade fixa, momento variavel
      Periodica: momento fixo, quantidade variavel
    Previsao de demanda
      Quantitativo: series temporais, suavizacao
      Qualitativo: Delphi, mini-Delphi
    Tecnologia
      ERP: integra a empresa
      WMS: localizacao no armazem
      RFID: sem contato visual
\`\`\``,
  mustMemorize: [
    `Estoque de segurança protege contra INCERTEZA; estoque de antecipação cobre um evento JÁ PREVISTO; estoque de ciclo decorre do tamanho dos lotes.`,
    `Curva ABC classifica por VALOR DE CONSUMO ANUAL (quantidade × valor unitário), não só por quantidade física.`,
    `Critério "segurança" na criticidade = periculosidade (risco de acidente/explosão) — não confundir com perecibilidade (validade) ou escassez (obtenção).`,
    `LEC = √((2×D×S)/H): D=demanda anual, S=custo de cada pedido, H=custo de manutenção por unidade/ano.`,
    `Ponto de pedido = (Demanda média × Lead time) + Estoque de segurança.`,
    `Modelo de séries temporais (quantitativo) usa tendência + sazonalidade + aleatoriedade; Delphi e mini-Delphi são QUALITATIVOS.`,
    `RFID lê sem contato visual direto; código de barras exige linha de visada. WMS controla localização/operações do armazém.`,
  ],
  workedExamples: [
    `Com D=2.000 toneladas/ano, S=R$ 50/pedido e H=R$ 300/tonelada/ano, a expressão correta do LEC é √((2×2.000×50)/300) — trocar a posição de D, S ou H na fórmula é o erro mais comum ao tentar decorá-la sem entender o papel de cada variável.`,
    `Um modelo que decompõe a demanda histórica em tendência, sazonalidade/ciclicidade e aleatoriedade é o modelo de SÉRIES TEMPORAIS (quantitativo) — Delphi e mini-Delphi são métodos QUALITATIVOS e não fazem esse tipo de decomposição estatística.`,
    `O critério "segurança" na classificação de materiais críticos refere-se à periculosidade (risco de acidentes, explosão, contaminação) — distinto de perecibilidade (prazo/validade), escassez (dificuldade de obtenção), custo (razão econômica) e dificuldade de acomodação (armazenagem).`,
    `"Estoques operacionais" (WIP — work in process) são produtos EM PROCESSO, ainda não finalizados, fluindo entre estágios de fabricação — diferentes de matéria-prima, sobressalentes, materiais administrativos ou produtos acabados.`,
  ],
  commonMistakes: [
    `Confundir estoque de segurança (cobre incerteza) com estoque de antecipação (cobre evento já previsto) — a diferença é se o gatilho é conhecido de antemão ou não.`,
    `Achar que a Curva ABC classifica só por quantidade física — na verdade é por VALOR DE CONSUMO ANUAL (quantidade × valor unitário).`,
    `Trocar a posição de D, S e H na fórmula do LEC — memorizar a fórmula decorando símbolos sem entender o papel de cada variável facilita esse erro.`,
    `Confundir os cinco critérios de criticidade entre si — segurança (periculosidade) é o mais frequentemente trocado por perecibilidade (validade) ou escassez (obtenção).`,
    `Achar que séries temporais é um método qualitativo — é quantitativo, baseado em dados históricos decompostos estatisticamente; Delphi/mini-Delphi são os qualitativos.`,
    `Padrão observado no acervo real (AC-12-2012-CESGRANRIO-31): calcular corretamente a expressão do LEC a partir de D, S e H dados no enunciado, sem trocar a posição das variáveis.`,
    `Padrão observado no acervo real (AC-12-2012-CESGRANRIO-34): identificar séries temporais como o modelo quantitativo que usa tendência/ciclicidade/aleatoriedade, descartando Delphi e mini-Delphi (qualitativos).`,
    `Padrão observado no acervo real (AC-12-2012-CESGRANRIO-36): reconhecer que "segurança" na classificação de criticidade significa periculosidade, não perecibilidade/escassez/custo/acomodação.`,
    `Padrão observado no acervo real (AC-12-2012-CESGRANRIO-38): identificar "estoques operacionais" (WIP) como produtos em processo, distintos de matéria-prima/sobressalentes/produtos acabados.`,
  ],
  howBoardMightAsk: [
    `Dá D, S e H num problema concreto e pede a expressão ou o valor exato do LEC, com distratores que trocam a posição das variáveis.`,
    `Descreve os componentes de um modelo de previsão (tendência/ciclicidade/aleatoriedade) e pede se é quantitativo ou qualitativo, com Delphi/mini-Delphi como distratores.`,
    `Pede para identificar o critério de criticidade correto (segurança, perecibilidade, escassez, custo, acomodação) a partir de uma descrição de risco.`,
    `Pede para classificar um tipo de estoque (ciclo, segurança, antecipação, trânsito, operacional) a partir de uma situação descrita.`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `Segurança = incerteza. Antecipação = evento previsto. Ciclo = tamanho do lote.`,
    `Curva ABC = valor de consumo anual, não só quantidade.`,
    `LEC = raiz de (2×D×S)/H.`,
    `Ponto de pedido = demanda no lead time + estoque de segurança.`,
    `Séries temporais = quantitativo. Delphi/mini-Delphi = qualitativo.`,
    `RFID = sem contato visual. Código de barras = exige linha de visada.`,
  ],
  flashcards: [
    { front: "Diferença entre estoque de segurança e de antecipação?", back: "Segurança cobre incerteza (variação imprevisível). Antecipação cobre um evento já previsto (sazonalidade, promoção)." },
    { front: "Fórmula do Lote Econômico de Compras (LEC)?", back: "LEC = √((2×D×S)/H), onde D=demanda anual, S=custo por pedido, H=custo de manutenção por unidade/ano." },
    { front: "O critério 'segurança' na classificação de criticidade de materiais significa o quê?", back: "Periculosidade — risco de acidentes, explosão ou contaminação. Não é perecibilidade (validade) nem escassez (obtenção)." },
    { front: "Séries temporais é modelo quantitativo ou qualitativo? E Delphi?", back: "Séries temporais: quantitativo (dados históricos). Delphi e mini-Delphi: qualitativos (julgamento de especialistas)." },
  ],
  miniQuiz: [
    {
      statement: `O Lote Econômico de Compras representa a quantidade de materiais comprada pela empresa que reduz o custo de manutenção de estoque. Uma empresa do setor de alimentos adquire anualmente 2.000 toneladas de açúcar, que é consumido em seu sistema de produção. O custo anual de manutenção de estoque é de R$ 300,00/tonelada, e o custo estimado para a efetivação de cada pedido é de R$ 50,00/pedido.

Pela abordagem do Lote Econômico de Compras (LEC), a expressão a ser utilizada para se calcular o tamanho do lote de fornecimento desse item é`,
      options: [
        { key: "A", text: `√((2×2000×50)/300)`, isCorrect: true, explanation: `Correto: LEC = √((2×D×S)/H), com D=2.000 (demanda anual), S=50 (custo de pedido) e H=300 (custo de manutenção) — exatamente a expressão desta alternativa.` },
        { key: "B", text: `√((2×2000×300)/50)`, isCorrect: false, explanation: `Inverte S e H na fórmula — coloca o custo de manutenção (300) no lugar do custo de pedido e vice-versa, o que altera o resultado.` },
        { key: "C", text: `√((50×2000×300)/2)`, isCorrect: false, explanation: `Coloca o "2" da fórmula no denominador em vez do numerador — estrutura errada da fórmula do LEC.` },
        { key: "D", text: `√((2000×300)/(50/2))`, isCorrect: false, explanation: `Divide S por 2 em vez de multiplicar D×S por 2 — a fórmula correta multiplica todo o numerador por 2, não divide S.` },
        { key: "E", text: `√((2000×50)/(300/2))`, isCorrect: false, explanation: `Divide H por 2 e omite a multiplicação por 2 no numerador — estrutura incorreta da fórmula do LEC.` },
      ],
    },
    {
      statement: `Com base nos sistemas de previsão qualitativa e quantitativa se estabelecem políticas de controle para sistemas de estoques. Os sistemas podem ser alimentados por dados históricos e experiência gerencial. Também é necessário definir a periodicidade com que o modelo de decisão será revisto e atualizado.

O modelo quantitativo que se apoia nos componentes tendência, ciclicidade e aleatoriedade é o(a)`,
      options: [
        { key: "A", text: `delphi`, isCorrect: false, explanation: `Delphi é um método QUALITATIVO baseado em rodadas de consulta a especialistas — não decompõe a demanda em tendência/ciclicidade/aleatoriedade.` },
        { key: "B", text: `mini-delphi`, isCorrect: false, explanation: `Mini-Delphi é uma variação simplificada do Delphi — também qualitativo, não trabalha com decomposição estatística de séries.` },
        { key: "C", text: `de analogia histórica`, isCorrect: false, explanation: `A analogia histórica projeta o comportamento de um produto novo com base em outro similar já existente — não decompõe a série em tendência/ciclicidade/aleatoriedade.` },
        { key: "D", text: `de séries temporais`, isCorrect: true, explanation: `Correto: o modelo de séries temporais decompõe a demanda histórica exatamente nos componentes tendência, sazonalidade/ciclicidade e variação aleatória — é o modelo quantitativo descrito no enunciado.` },
        { key: "E", text: `de suavização exponencial`, isCorrect: false, explanation: `A suavização exponencial é quantitativa, mas funciona dando peso decrescente a observações mais antigas — não é definida pela decomposição em tendência/ciclicidade/aleatoriedade como as séries temporais clássicas.` },
      ],
    },
  ],
};
