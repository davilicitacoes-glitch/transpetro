import type { LessonContent } from "@/content/lessonTypes";

export const MAT_07_ESTATISTICA: LessonContent = {
  slug: "mat-07-estatistica",
  topicSlug: "mat-07-estatistica",
  subjectSlug: "matematica",
  moduleSlug: "matematica-geral",
  title: `Estatística básica: tabelas, gráficos e medidas de tendência/dispersão`,
  learningObjective: `Calcular média a partir de subgrupos com médias parciais conhecidas (sistema de equações), mediana e moda em tabelas de frequência, variância a partir de dados binários, e média ponderada de dados agrupados por classe — a Cesgranrio gosta de dar uma tabela de frequência completa e pedir múltiplas medidas ao mesmo tempo (moda e mediana juntas, por exemplo).`,
  syllabusCodes: ["MAT-07"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# MAT-07 — Estatística Básica

## 1. Média a partir de médias de subgrupos (sistema de equações)

Quando o problema dá a média **geral** e as médias de **dois subgrupos** (mas não a quantidade de cada subgrupo), a solução exige montar uma equação com uma incógnita:

**Exemplo real**: a média das notas de 110 aprovados foi 6,08; a média dos homens foi 6,6 e a das mulheres foi 5,5. Quantos homens foram aprovados?

Sejam **h** homens e **m = 110 − h** mulheres. A soma total das notas é:

6,6h + 5,5(110 − h) = 6,08 × 110

6,6h + 605 − 5,5h = 668,8

1,1h = 63,8

**h = 58** homens.

**Método geral**: sempre que houver médias de subgrupos e uma média geral, monte a equação "soma dos subgrupos = média geral × total", substituindo a quantidade do segundo subgrupo por (total − primeira incógnita).

## 2. Moda e mediana a partir de tabela de frequência

- **Moda**: o valor com **maior frequência** — direto da tabela, sem cálculo.
- **Mediana**: exige primeiro construir a **posição** dos dados ordenados. Com **n** dados, se n é ímpar, a mediana é o valor central; se n é **par**, é a **média dos dois valores centrais** (posições n/2 e n/2+1).

**Exemplo real**: numa pesquisa de preços com 30 postos, frequências: R$2,18 (9 postos), R$2,20 (6), R$2,28 (3), R$2,31 (7), R$2,36 (5).

- **Moda** = R$2,18 (maior frequência, 9).
- **Mediana**: com 30 dados (par), é a média entre o 15º e o 16º valor ordenados. Somando as frequências acumuladas: até R$2,18 chegam 9 valores; até R$2,20 chegam 9+6=15 valores. Logo o 15º valor é R$2,20, e o 16º valor (primeiro da próxima faixa) é R$2,28. Mediana = (2,20+2,28)/2 = **R$2,24**.

**Erro comum**: esquecer de acumular as frequências para localizar exatamente qual posição cai em qual valor — contar direto sem organizar a frequência acumulada é a fonte mais comum de erro nesse tipo de questão.

## 3. Variância com dados binários (proporção)

Quando os dados são binários (só dois valores possíveis, ex.: 1 e 0, representando presença/ausência de uma característica), a variância pode ser calculada diretamente a partir das frequências relativas:

**Exemplo real**: 80 em cada 100 elementos têm valor 1, e 20 têm valor 0. Média = 80×1/100 = **0,8**.

Variância = Σ(xi − média)² / n = [80×(1−0,8)² + 20×(0−0,8)²] / 100 = [80×0,04 + 20×0,64] / 100 = [3,2+12,8]/100 = 16/100 = **0,16**.

## 4. Média ponderada de dados agrupados por classe

Quando os dados vêm agrupados em **classes** (faixas de valores), usa-se o **ponto médio** de cada classe como representante, ponderado pela frequência da classe:

**Exemplo real**: classes com pontos médios 400, 650, 1.000 e 1.350, com frequências 100, 60, 50 e 40 (total 250):

Média = (100×400 + 60×650 + 50×1.000 + 40×1.350) / 250 = (40.000+39.000+50.000+54.000)/250 = 183.000/250 = **R$732,00**.

## 5. Medidas de dispersão: amplitude, variância e desvio padrão

- **Amplitude**: máximo − mínimo — a medida mais simples, mas muito sensível a um único valor extremo.
- **Variância**: média dos **desvios quadráticos** em relação à média — mede dispersão, mas fica em unidade "ao quadrado".
- **Desvio padrão**: a **raiz quadrada** da variância — volta à unidade original dos dados, por isso é mais interpretável na prática.

## 6. Sensibilidade a valores extremos

A **média** é **sensível a extremos** — um único valor muito alto ou muito baixo puxa a média na sua direção. A **mediana** é **mais resistente** a esse efeito, pois depende apenas da posição central dos dados ordenados, não do valor exato dos extremos.

## 7. Gráficos enganosos

**Escalas truncadas** (eixo que não começa em zero) e **áreas desproporcionais** em gráficos podem tornar visualmente uma diferença pequena parecer muito maior do que realmente é — um cuidado de leitura crítica exigido em interpretação de gráficos.

## Síntese

O MAT-07 exige, acima de tudo, organização: montar equações corretas para médias de subgrupos, acumular frequências corretamente para achar mediana, e usar pontos médios de classe ponderados pela frequência em dados agrupados.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Estatística Básica — MAT-07))
    Media de subgrupos
      Equacao: soma dos subgrupos = media geral x total
    Moda e Mediana
      Moda: maior frequencia
      Mediana: acumular frequencia ate achar a posicao
    Variancia dados binarios
      Media = proporcao
      Variancia = soma dos desvios quadraticos / n
    Dados agrupados
      Media ponderada pelo ponto medio de cada classe
    Dispersao
      Amplitude: max - min
      Desvio padrao: raiz da variancia
    Sensibilidade
      Media sensivel a extremos
      Mediana mais resistente
\`\`\``,
  mustMemorize: [
    `Média de subgrupos: monte "soma dos subgrupos = média geral × total" com uma incógnita.`,
    `Moda = maior frequência. Mediana com n par = média dos dois valores centrais (use frequência ACUMULADA para localizar a posição).`,
    `Variância de dados binários: Σ(xi−média)²/n, usando as frequências relativas de cada valor.`,
    `Dados agrupados: média ponderada usando o PONTO MÉDIO de cada classe.`,
    `Amplitude = máximo − mínimo. Desvio padrão = raiz quadrada da variância.`,
    `Média é sensível a extremos; mediana é mais resistente.`,
  ],
  workedExamples: [
    `Média geral de 6,08 (110 aprovados), média dos homens 6,6, das mulheres 5,5: 6,6h+5,5(110-h)=6,08×110 → 1,1h=63,8 → h=58 homens.`,
    `Tabela com 30 dados: moda = valor de maior frequência (2,18, freq. 9); mediana = média do 15º e 16º valor ordenados, usando frequência acumulada (2,20 e 2,28) = 2,24.`,
    `Dados binários com 80% de valor 1: média=0,8; variância = [80×(0,2)²+20×(0,8)²]/100 = [3,2+12,8]/100 = 0,16.`,
    `Dados agrupados com pontos médios 400/650/1000/1350 e frequências 100/60/50/40: média ponderada = 183.000/250 = 732,00.`,
  ],
  commonMistakes: [
    `Tentar achar a quantidade de cada subgrupo sem montar a equação com uma incógnita — sem isso, não há como isolar "h" a partir das médias parciais.`,
    `Contar a posição da mediana sem acumular as frequências corretamente — é fácil errar qual valor cai em qual posição sem esse passo organizado.`,
    `Esquecer que, com n par, a mediana é a MÉDIA dos dois valores centrais, não um deles isoladamente.`,
    `Usar o valor da classe (limite inferior/superior) em vez do PONTO MÉDIO ao calcular média de dados agrupados.`,
    `Confundir variância (unidade ao quadrado) com desvio padrão (mesma unidade dos dados originais) — são medidas relacionadas, mas não intercambiáveis.`,
    `Padrão observado no acervo real (MAT-07-2012-CESGRANRIO-19): montar a equação de médias de subgrupos corretamente para achar o número de homens aprovados (h=58).`,
    `Padrão observado no acervo real (MAT-07-2006-CESGRANRIO-27): identificar a mediana como o elemento central de uma lista já ordenada com número ímpar de elementos.`,
    `Padrão observado no acervo real (MAT-07-2006-CESGRANRIO-28): calcular a variância de dados binários a partir da proporção (0,16).`,
    `Padrão observado no acervo real (MAT-07-2006-CESGRANRIO-30): calcular a média ponderada de dados agrupados usando pontos médios de classe (732,00).`,
  ],
  howBoardMightAsk: [
    `Dá a média geral e as médias de dois subgrupos, pedindo a quantidade de um dos subgrupos.`,
    `Dá uma tabela de frequência completa e pede moda e mediana simultaneamente.`,
    `Dá dados binários (proporção de sucesso/fracasso) e pede a variância ou o desvio padrão.`,
    `Dá dados agrupados em classes com frequências e pede a média ponderada pelos pontos médios.`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `Média de subgrupos: monte equação com uma incógnita.`,
    `Moda = maior frequência. Mediana: use frequência acumulada.`,
    `n par → mediana = média dos dois centrais.`,
    `Dados agrupados: use ponto médio de cada classe.`,
    `Desvio padrão = raiz da variância, volta à unidade original.`,
  ],
  flashcards: [
    { front: "Como achar a quantidade de um subgrupo quando se conhece a média geral e as médias parciais?", back: "Monte a equação: soma ponderada dos subgrupos = média geral × total, com uma incógnita para o subgrupo desconhecido." },
    { front: "Como calcular a mediana com número par de dados numa tabela de frequência?", back: "Acumule as frequências para localizar o valor nas posições n/2 e n/2+1, e calcule a média entre esses dois valores." },
    { front: "O que representa cada classe ao calcular média de dados agrupados?", back: "O ponto médio da classe, ponderado pela frequência daquela classe." },
    { front: "Qual medida é mais sensível a valores extremos: média ou mediana?", back: "A média — a mediana é mais resistente por depender apenas da posição central dos dados ordenados." },
  ],
  miniQuiz: [
    {
      statement: `A média aritmética das notas dos 110 aprovados em um concurso foi 6,08. Mas os candidatos do sexo masculino saíram-se melhor: a média aritmética das notas obtidas pelos homens foi 6,6, enquanto a média das mulheres foi 5,5.

Quantos homens foram aprovados nesse concurso?`,
      options: [
        { key: "A", text: `52`, isCorrect: false, explanation: `Esse valor não satisfaz a equação 6,6h + 5,5(110-h) = 6,08×110.` },
        { key: "B", text: `54`, isCorrect: false, explanation: `Esse valor não satisfaz a equação de médias ponderadas do problema.` },
        { key: "C", text: `56`, isCorrect: false, explanation: `Esse valor está próximo mas não satisfaz exatamente a equação — o valor correto de h é 58.` },
        { key: "D", text: `58`, isCorrect: true, explanation: `Correto: montando h homens e (110-h) mulheres, 6,6h + 5,5(110-h) = 6,08×110 → 1,1h = 63,8 → h = 58.` },
        { key: "E", text: `62`, isCorrect: false, explanation: `Esse valor não satisfaz a equação — resultaria numa média geral diferente de 6,08 dado as médias parciais informadas.` },
      ],
    },
    {
      statement: `A tabela abaixo apresenta o resultado de uma pesquisa sobre o preço de venda do etanol em 30 postos de abastecimento de São Paulo, em abril de 2011.

Preço (R$) | Frequência
2,18 | 9
2,20 | 6
2,28 | 3
2,31 | 7
2,36 | 5
Total | 30

Os valores, em reais, da moda e da mediana dos preços pesquisados são, respectivamente,`,
      options: [
        { key: "A", text: `2,18 e 2,24`, isCorrect: true, explanation: `Correto: a moda é o valor de maior frequência (2,18, freq. 9). Com 30 dados, a mediana é a média entre o 15º e o 16º valor ordenados; a frequência acumulada mostra que o 15º valor é 2,20 e o 16º é 2,28, cuja média é (2,20+2,28)/2 = 2,24.` },
        { key: "B", text: `2,18 e 2,28`, isCorrect: false, explanation: `A moda (2,18) está correta, mas a mediana não é 2,28 isoladamente — é a MÉDIA entre o 15º valor (2,20) e o 16º (2,28), resultando em 2,24.` },
        { key: "C", text: `2,24 e 2,28`, isCorrect: false, explanation: `2,24 não é um valor da tabela, logo não pode ser a moda (que exige um valor observado com maior frequência) — a moda correta é 2,18.` },
        { key: "D", text: `2,28 e 2,18`, isCorrect: false, explanation: `Inverte moda e mediana: 2,28 não é o valor de maior frequência (a moda é 2,18), e 2,18 não é a mediana calculada corretamente (2,24).` },
        { key: "E", text: `2,36 e 2,26`, isCorrect: false, explanation: `2,36 tem frequência 5, menor que a de 2,18 (9) — não é a moda. E 2,26 não corresponde ao cálculo correto da mediana (2,24).` },
      ],
    },
  ],
};
