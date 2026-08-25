import type { LessonContent } from "@/content/lessonTypes";

export const MAT_02_RAZAO_PROPORCAO: LessonContent = {
  slug: "mat-02-razao-proporcao",
  topicSlug: "mat-02-razao-proporcao",
  subjectSlug: "matematica",
  moduleSlug: "matematica-geral",
  title: `Razão e proporção: regra de três e porcentagem`,
  learningObjective: `Calcular o valor original a partir de um valor com desconto percentual conhecido, resolver problemas de razão/proporção com regra de três simples, e identificar corretamente a base de cada cálculo percentual — a Cesgranrio gosta de problemas em que o percentual dado NÃO incide sobre o valor final apresentado, exigindo reconstruir o valor original antes de calcular a resposta pedida.`,
  syllabusCodes: ["MAT-02"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# MAT-02 — Razão, Proporção e Porcentagem

## 1. Razão

Uma **razão** é a comparação entre duas grandezas por meio de uma divisão (a/b). Pode comparar grandezas da **mesma natureza** (ex.: número de pipocas doces para o total de pipocas) ou de **naturezas diferentes** (ex.: distância por tempo = velocidade).

## 2. Proporção e propriedade fundamental

Uma **proporção** é a igualdade entre duas razões: a/b = c/d. A **propriedade fundamental das proporções**: com denominadores não nulos, vale que **a·d = b·c** (o produto dos extremos é igual ao produto dos meios) — essa propriedade é a base de toda regra de três.

## 3. Grandezas direta e inversamente proporcionais

- **Diretamente proporcionais**: variam **no mesmo sentido**, com **quociente constante** (aumenta uma, aumenta a outra na mesma proporção).
- **Inversamente proporcionais**: variam em **sentidos opostos**, com **produto constante** (aumenta uma, diminui a outra na proporção inversa).

Reconhecer corretamente se duas grandezas de um problema são diretas ou inversas é o passo decisivo antes de montar qualquer regra de três — inverter essa relação inverte o resultado.

## 4. Regra de três simples — método passo a passo

Para resolver um problema de regra de três simples:
1. Identifique as duas grandezas envolvidas e a incógnita.
2. Determine se a relação é direta ou inversa.
3. Monte a proporção mantendo a correspondência entre as colunas.
4. Aplique a propriedade fundamental (produto dos extremos = produto dos meios) e resolva a equação.

**Exemplo real**: um pipoqueiro vende pipoca salgada e doce na proporção de 5 salgadas para 12 saquinhos totais (logo, 7 doces em cada 12). Se ele vende 96 saquinhos, quantos são de pipoca doce? Regra de três: 7/12 = x/96 → 12x = 7×96 = 672 → x = 672/12 = **56** saquinhos doces.

## 5. Porcentagem: base correta é essencial

**p por cento** equivale a p/100, também usado como fator decimal (p ÷ 100). Um **aumento** de p% multiplica o valor original por **(1 + p/100)**; um **desconto** de p% multiplica por **(1 − p/100)**.

**Ponto crítico**: em muitos problemas, o valor apresentado no enunciado JÁ É o valor COM desconto/aumento aplicado — não o valor original. Para achar o valor original, é preciso "desfazer" a operação, dividindo pelo fator (não multiplicando).

**Exemplo real**: um empréstimo, se quitado antecipadamente, custaria R$ 7.350,00, representando um desconto de 12,5% sobre o valor combinado inicialmente. Como 7.350,00 já é o valor **após** o desconto de 12,5%, ele corresponde a **87,5%** (100% − 12,5%) do valor original — não aos 100%. Para achar o valor original: 7.350 ÷ 0,875 = **8.400,00**. O desconto em reais foi 8.400,00 − 7.350,00 = **R$ 1.050,00**.

**Pegadinha clássica**: calcular 12,5% diretamente sobre R$ 7.350,00 (dando 918,75) — esse é o erro mais comum, porque ignora que 7.350 já é o valor COM desconto, não o valor original sobre o qual o percentual foi calculado.

## 6. Variações percentuais sucessivas

Variações percentuais sucessivas se combinam por **multiplicação de fatores**, não por soma direta dos percentuais. Um aumento de 10% seguido de um desconto de 10% **não** volta ao valor original: (1,10)×(0,90) = 0,99 — resulta em uma redução líquida de 1%, não em zero. Percentuais opostos aplicados sobre **bases diferentes** (a segunda base já alterada pela primeira operação) não se anulam.

## Síntese

O MAT-02 exige, acima de tudo, identificar corretamente a BASE de cada cálculo percentual (o valor apresentado é o original ou já tem desconto/aumento aplicado?) e montar a proporção certa em problemas de razão, respeitando se a relação é direta ou inversa.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Razão e Proporção — MAT-02))
    Razao
      Comparacao entre duas grandezas a/b
    Proporcao
      a/b = c/d
      Propriedade: a.d = b.c
    Grandezas
      Diretas: mesmo sentido, quociente constante
      Inversas: sentidos opostos, produto constante
    Regra de tres
      Identificar grandezas e relacao
      Montar proporcao correspondente
    Porcentagem
      Valor apresentado pode JA ter desconto aplicado
      Para achar original: dividir pelo fator, nao multiplicar
    Variacoes sucessivas
      Multiplicam fatores
      Percentuais opostos nao se anulam
\`\`\``,
  mustMemorize: [
    `Propriedade fundamental da proporção: a/b = c/d → a·d = b·c.`,
    `Diretas: mesmo sentido, quociente constante. Inversas: sentidos opostos, produto constante.`,
    `Aumento de p%: multiplica por (1+p/100). Desconto de p%: multiplica por (1-p/100).`,
    `Se o valor dado no enunciado já é COM desconto, ele corresponde a (100%-desconto%) do original — para achar o original, DIVIDA pelo fator, não multiplique pelo percentual.`,
    `Variações sucessivas multiplicam fatores; um aumento de p% seguido de desconto de p% NÃO volta ao valor original.`,
  ],
  workedExamples: [
    `Se R$ 7.350,00 corresponde a 87,5% do valor original (100% − 12,5% de desconto), o valor original é 7.350/0,875 = 8.400,00; o desconto em reais é 8.400,00 − 7.350,00 = 1.050,00.`,
    `Se de cada 12 saquinhos, 7 são doces, a proporção para 96 saquinhos é 7/12 = x/96 → x = 7×96/12 = 56.`,
    `Se um trajeto de ida dura 54 min e o de volta dura 12 min a menos (42 min), a razão ida/volta é 54/42, que simplificada é 9/7.`,
    `Se sobraram 15% de um lote de 120 camisetas, o número de camisetas restantes é 0,15×120 = 18.`,
  ],
  commonMistakes: [
    `Calcular o percentual diretamente sobre o valor apresentado no enunciado, sem verificar se esse valor já é o resultado de um desconto/aumento aplicado ao valor original.`,
    `Inverter a relação direta/inversa entre duas grandezas ao montar a regra de três, gerando um resultado invertido.`,
    `Achar que um aumento de p% seguido de um desconto de p% (ou vice-versa) sempre volta ao valor original — na verdade gera uma pequena diferença líquida, porque a segunda operação incide sobre uma base já alterada.`,
    `Somar percentuais de operações sucessivas em vez de multiplicar os fatores correspondentes.`,
    `Padrão observado no acervo real (MAT-02-2012-CESGRANRIO-13): reconstruir o valor original a partir de um valor já com desconto de 12,5% aplicado, calculando o desconto real em reais (R$ 1.050,00).`,
    `Padrão observado no acervo real (MAT-02-2013-CESGRANRIO-26): montar corretamente a regra de três de proporção (7/12 = x/96) para achar a quantidade de itens de uma categoria.`,
    `Padrão observado no acervo real (MAT-02-2013-CESGRANRIO-27): calcular a razão entre dois tempos (ida e volta) após determinar o tempo de volta pela diferença informada.`,
    `Padrão observado no acervo real (MAT-02-2013-CESGRANRIO-28): calcular corretamente um percentual simples sobre uma quantidade total (15% de 120 = 18).`,
  ],
  howBoardMightAsk: [
    `Dá um valor que já reflete um desconto/aumento percentual e pede o valor original ou o valor do desconto/aumento em reais.`,
    `Dá uma proporção entre categorias (ex.: doce/salgado) e pede a quantidade de uma categoria para um novo total, via regra de três.`,
    `Pede a razão entre duas grandezas calculadas a partir de dados do enunciado (ex.: tempos de ida e volta).`,
    `Testa se duas variações percentuais sucessivas se anulam (elas normalmente não se anulam exatamente).`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `a/b = c/d → a·d = b·c.`,
    `Diretas: mesmo sentido. Inversas: sentidos opostos.`,
    `Valor com desconto já aplicado = (100%-desconto%) do original — divida para achar o original.`,
    `Variações sucessivas multiplicam fatores, não somam percentuais.`,
  ],
  flashcards: [
    { front: "Propriedade fundamental das proporções?", back: "Em a/b = c/d, vale a·d = b·c (produto dos extremos = produto dos meios)." },
    { front: "Se um valor já tem 12,5% de desconto aplicado, que fração do original ele representa?", back: "87,5% (100% - 12,5%) — para achar o valor original, divida o valor dado por 0,875." },
    { front: "Um aumento de 10% seguido de desconto de 10% volta ao valor original?", back: "Não — resulta em (1,10)×(0,90) = 0,99, ou seja, 1% a menos que o valor original." },
  ],
  miniQuiz: [
    {
      statement: `João solicitou a uma instituição financeira a liquidação antecipada de um empréstimo e foi informado que, se a quitação do mesmo fosse feita até o final do mês em curso, o valor pago seria R$ 7.350,00, o que representaria um desconto de 12,5% sobre o valor a ser pago na data combinada inicialmente.

Qual foi, em reais, o valor do desconto oferecido para a liquidação antecipada?`,
      options: [
        { key: "A", text: `882,00`, isCorrect: false, explanation: `Esse valor não corresponde ao cálculo correto — não reflete a diferença entre o valor original (8.400,00) e o valor com desconto (7.350,00).` },
        { key: "B", text: `918,75`, isCorrect: false, explanation: `Esse valor é o resultado de calcular 12,5% diretamente sobre R$ 7.350,00 — erro clássico, pois 7.350,00 já é o valor COM desconto, não o valor original sobre o qual o percentual foi calculado.` },
        { key: "C", text: `1.044,05`, isCorrect: false, explanation: `Esse valor não corresponde a nenhum cálculo correto do problema.` },
        { key: "D", text: `1.050,00`, isCorrect: true, explanation: `Correto: como 7.350,00 corresponde a 87,5% (100%-12,5%) do valor original, o valor original é 7.350/0,875 = 8.400,00; o desconto é 8.400,00 − 7.350,00 = 1.050,00.` },
        { key: "E", text: `1.368,50`, isCorrect: false, explanation: `Esse valor está muito acima do desconto real de R$ 1.050,00 — não corresponde ao cálculo correto do problema.` },
      ],
    },
    {
      statement: `Um pipoqueiro observou que, de cada 12 saquinhos de pipoca que vendia, 5 eram de pipoca salgada e os restantes, de pipoca doce.

Considerando-se essa proporção, se ele vender 96 saquinhos de pipoca, quantos serão de pipoca doce?`,
      options: [
        { key: "A", text: `8`, isCorrect: false, explanation: `Esse valor não corresponde à proporção correta de 7/12 aplicada a 96 saquinhos.` },
        { key: "B", text: `20`, isCorrect: false, explanation: `Esse valor não resulta da regra de três correta (7/12 = x/96).` },
        { key: "C", text: `40`, isCorrect: false, explanation: `Esse valor não corresponde ao cálculo correto da proporção de pipocas doces.` },
        { key: "D", text: `48`, isCorrect: false, explanation: `Esse valor corresponderia a 5/12 de 96 (pipocas salgadas), não a 7/12 (pipocas doces) — troca a categoria pedida.` },
        { key: "E", text: `56`, isCorrect: true, explanation: `Correto: de cada 12 saquinhos, 7 são doces (12-5). Pela regra de três, 7/12 = x/96 → x = 7×96/12 = 56.` },
      ],
    },
  ],
};
