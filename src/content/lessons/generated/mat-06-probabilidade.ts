import type { LessonContent } from "@/content/lessonTypes";

export const MAT_06_PROBABILIDADE: LessonContent = {
  slug: "mat-06-probabilidade",
  topicSlug: "mat-06-probabilidade",
  subjectSlug: "matematica",
  moduleSlug: "matematica-geral",
  title: `Probabilidade básica em espaços equiprováveis`,
  learningObjective: `Calcular probabilidades em espaços equiprováveis usando contagem (combinação) e o total de casos possíveis, aplicar probabilidade condicional e de interseção em eventos sem reposição, e resolver problemas com informações percentuais de subgrupos que se sobrepõem — a Cesgranrio gosta de dados que exigem montar corretamente o espaço amostral com C(n,k) antes de calcular a razão de casos favoráveis.`,
  syllabusCodes: ["MAT-06"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# MAT-06 — Probabilidade Básica

## 1. Fórmula fundamental em espaço equiprovável

Em um **espaço amostral finito equiprovável** (todos os resultados igualmente prováveis):

$$P(A) = \\dfrac{n(A)}{n(\\Omega)}$$

Onde n(A) = número de casos favoráveis ao evento A, e n(Ω) = número total de casos possíveis (o espaço amostral completo).

**Propriedades básicas**: 0 ≤ P(A) ≤ 1; evento certo tem P = 1; evento impossível tem P = 0.

## 2. Contagem: usando combinação para montar o espaço amostral

Quando o problema envolve **escolher um subconjunto** (sem ordem), o número de casos usa **combinação** C(n,k) = n!/(k!(n-k)!).

**Exemplo real**: um estojo tem 6 canetas de cores diferentes (incluindo 1 verde). Retirando-se 2 ao acaso, qual a probabilidade de nenhuma ser verde?

- **Espaço amostral**: C(6,2) = 15 formas de escolher 2 canetas entre as 6.
- **Casos favoráveis** (nenhuma verde = escolher 2 dentre as 5 não-verdes): C(5,2) = 10.
- **Probabilidade** = 10/15 = **2/3**.

**Erro comum**: contar apenas "5 canetas não-verdes de 6 totais" e usar 5/6 diretamente — isso ignora que estão sendo retiradas DUAS canetas simultaneamente, exigindo combinação, não uma fração simples de um único elemento.

## 3. Probabilidade simples com contagem direta

Quando o experimento é "escolher 1 elemento ao acaso de um grupo", a probabilidade é direta: número de elementos favoráveis dividido pelo total.

**Exemplo real**: uma equipe tem 32 funcionários, dos quais 12 são mulheres (logo 20 são homens). A probabilidade de escolher um homem ao acaso é 20/32, que simplificado é **5/8**.

**Pegadinha clássica**: usar o número de mulheres (12/32 = 3/8) quando a pergunta pede a probabilidade de ser homem — sempre confirme qual subgrupo específico a pergunta está pedindo.

## 4. Probabilidade de interseção com subgrupos sobrepostos

Quando duas perguntas de uma pesquisa têm respostas que se sobrepõem parcialmente (quem respondeu SIM à pergunta IV também respondeu SIM à pergunta III, por exemplo), calcular "SIM a uma questão e NÃO a outra" exige **subtrair a interseção**:

P(SIM III e NÃO IV) = P(SIM III) − P(SIM III **e** SIM IV)

**Exemplo real**: se 22% responderam SIM a III, e todos os 18% que responderam SIM a IV também responderam SIM a III (ou seja, a interseção SIM III ∩ SIM IV = 18%), então P(SIM III e NÃO IV) = 22% − 18% = 4% = **1/25**.

## 5. Probabilidade condicional e eventos sem reposição

Quando um evento é retirado e **não devolvido** (sem reposição), a probabilidade do segundo evento muda, condicionada ao resultado do primeiro — é a **probabilidade condicional**:

**Exemplo real**: de um total de 10 bolas, 4 são pretas. Retirando 2 bolas sem reposição, qual a probabilidade de ambas serem pretas?

- P(1ª preta) = 4/10.
- P(2ª preta | 1ª preta) = 3/9 (sobraram 3 pretas de 9 bolas totais, já que uma preta e uma bola no total saíram).
- P(ambas pretas) = (4/10) × (3/9) = 12/90 = **2/15**.

**Erro comum**: usar 4/10 duas vezes (como se houvesse reposição) em vez de ajustar o segundo fator para 3/9 — sem reposição, o denominador E o numerador do segundo evento mudam.

## 6. Evento complementar, união e mutuamente exclusivos

- **Evento complementar**: P(A^c) = 1 − P(A) — a probabilidade de A NÃO ocorrer.
- **União de eventos**: P(A ∪ B) = P(A) + P(B) − P(A ∩ B) — subtrai a interseção para não contar duas vezes.
- **Eventos mutuamente exclusivos**: têm **interseção vazia** (não podem ocorrer juntos) — mas isso **não significa independência** (que é outro conceito, relacionado a P(A∩B)=P(A)×P(B)).

## Síntese

O MAT-06 exige disciplina na contagem: usar combinação quando o problema envolve escolher vários elementos de uma vez, ajustar corretamente o denominador (e numerador) em problemas sem reposição, e subtrair a interseção corretamente ao lidar com subgrupos sobrepostos ou com a fórmula da união.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Probabilidade — MAT-06))
    Formula
      P(A) = n(A)/n(Omega)
    Contagem
      Combinacao C(n,k) quando escolhe varios de uma vez
    Interseccao
      P(A e nao-B) = P(A) - P(A e B)
    Sem reposicao
      Segundo evento condicionado ao primeiro
      Denominador e numerador mudam
    Complementar
      P(A^c) = 1 - P(A)
    Uniao
      P(A ou B) = P(A)+P(B)-P(A e B)
    Mutuamente exclusivos
      Interseccao vazia, NAO implica independencia
\`\`\``,
  mustMemorize: [
    `P(A) = n(A)/n(Ω) em espaço equiprovável. Probabilidade sempre entre 0 e 1.`,
    `Ao escolher VÁRIOS elementos de uma vez (sem ordem), use COMBINAÇÃO C(n,k) para contar o espaço amostral e os casos favoráveis.`,
    `P(A e NÃO B) = P(A) − P(A e B) — subtraia a interseção ao lidar com subgrupos sobrepostos.`,
    `Sem reposição: o segundo evento é condicionado ao primeiro — denominador E numerador mudam entre a 1ª e a 2ª retirada.`,
    `P(A^c) = 1 − P(A). P(A ∪ B) = P(A) + P(B) − P(A ∩ B).`,
    `Mutuamente exclusivos = interseção vazia — NÃO é o mesmo que independência.`,
  ],
  workedExamples: [
    `Estojo com 6 canetas (1 verde). Retirando 2 ao acaso: espaço amostral C(6,2)=15; casos favoráveis (nenhuma verde) C(5,2)=10; probabilidade = 10/15 = 2/3.`,
    `Equipe com 32 funcionários, 12 mulheres (20 homens): P(homem) = 20/32 = 5/8.`,
    `22% responderam SIM à pergunta III; os 18% que responderam SIM à IV também responderam SIM à III (interseção = 18%). P(SIM III e NÃO IV) = 22% − 18% = 4% = 1/25.`,
    `10 bolas, 4 pretas, sem reposição: P(1ª preta)=4/10; P(2ª preta|1ª preta)=3/9; P(ambas pretas) = (4/10)×(3/9) = 2/15.`,
  ],
  commonMistakes: [
    `Usar fração simples (ex.: 5/6) quando o problema exige escolher VÁRIOS elementos simultaneamente — nesse caso é preciso usar combinação C(n,k) para contar corretamente o espaço amostral.`,
    `Escolher o subgrupo errado (ex.: usar a fração de mulheres quando a pergunta pede a probabilidade de homens).`,
    `Esquecer de subtrair a interseção ao calcular "SIM a uma pergunta e NÃO a outra" quando os subgrupos se sobrepõem.`,
    `Em problemas sem reposição, usar a mesma fração nas duas retiradas (como se houvesse reposição) — o denominador e o numerador do segundo evento devem ser ajustados.`,
    `Confundir "mutuamente exclusivos" (interseção vazia) com "independentes" (P(A∩B)=P(A)×P(B)) — são conceitos diferentes que não se implicam.`,
    `Padrão observado no acervo real (MAT-06-2012-CESGRANRIO-12): calcular corretamente P(nenhuma verde) usando combinação C(5,2)/C(6,2) = 10/15 = 2/3.`,
    `Padrão observado no acervo real (MAT-06-2013-CESGRANRIO-11): calcular a probabilidade de escolher um homem (20/32=5/8), identificando corretamente o subgrupo pedido.`,
    `Padrão observado no acervo real (MAT-06-2006-CESGRANRIO-18): calcular P(SIM III e NÃO IV) subtraindo a interseção (22%-18%=4%=1/25).`,
    `Padrão observado no acervo real (MAT-06-2006-CESGRANRIO-29): calcular a probabilidade de dois eventos sem reposição, ajustando corretamente o segundo fator (4/10 × 3/9 = 2/15).`,
  ],
  howBoardMightAsk: [
    `Pede a probabilidade de um evento envolvendo escolha de vários elementos simultaneamente, exigindo montar C(n,k) para o espaço amostral e para os casos favoráveis.`,
    `Dá uma equipe com subgrupos (homens/mulheres) e pede a probabilidade de sortear um membro de um subgrupo específico.`,
    `Dá percentuais de respostas a duas perguntas de pesquisa, com uma sobreposição informada, e pede a probabilidade de uma combinação específica de respostas.`,
    `Dá uma retirada sem reposição de dois elementos e pede a probabilidade de ambos satisfazerem uma condição.`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `P(A) = n(A)/n(Ω).`,
    `Escolha de vários elementos = usar combinação C(n,k).`,
    `P(A e não B) = P(A) − P(A e B).`,
    `Sem reposição: segundo evento condicionado, denominador e numerador mudam.`,
    `P(A^c)=1-P(A). P(A∪B)=P(A)+P(B)-P(A∩B).`,
  ],
  flashcards: [
    { front: "Quando usar combinação C(n,k) num problema de probabilidade?", back: "Quando o experimento envolve escolher VÁRIOS elementos de uma vez, sem ordem — tanto para o espaço amostral quanto para os casos favoráveis." },
    { front: "Como calcular P(A e NÃO B) quando os grupos se sobrepõem?", back: "P(A) menos a interseção P(A e B)." },
    { front: "Em retiradas sem reposição, o que muda entre a 1ª e a 2ª retirada?", back: "Tanto o numerador quanto o denominador do segundo evento — a probabilidade é condicionada ao resultado da primeira retirada." },
    { front: "Mutuamente exclusivos implica independência?", back: "Não — são conceitos distintos. Mutuamente exclusivos significa interseção vazia; independência é outra propriedade (P(A∩B)=P(A)×P(B))." },
  ],
  miniQuiz: [
    {
      statement: `Dentro de um estojo, há somente 6 canetas, cada uma com uma cor diferente (rosa, roxo, verde, azul, vermelha e preta).

Retirando-se, ao acaso, duas canetas de dentro desse estojo, qual é a probabilidade de que nenhuma delas seja verde?`,
      options: [
        { key: "A", text: `1/3`, isCorrect: false, explanation: `Esse valor não corresponde ao cálculo correto de C(5,2)/C(6,2) = 10/15.` },
        { key: "B", text: `2/3`, isCorrect: true, explanation: `Correto: o espaço amostral tem C(6,2)=15 formas de escolher 2 canetas; os casos favoráveis (nenhuma verde, ou seja, 2 dentre as 5 não-verdes) são C(5,2)=10. Probabilidade = 10/15 = 2/3.` },
        { key: "C", text: `17/36`, isCorrect: false, explanation: `Esse valor sugere um cálculo com reposição/eventos independentes tratados incorretamente (denominador 36=6×6) — o problema é sem reposição e exige combinação.` },
        { key: "D", text: `25/36`, isCorrect: false, explanation: `Mesmo erro de base: usar 36 no denominador (como se fosse com reposição) em vez de C(6,2)=15.` },
        { key: "E", text: `5/6`, isCorrect: false, explanation: `Esse valor corresponde a considerar apenas 1 caneta retirada, não 2 simultaneamente — ignora que o problema pede a retirada de duas canetas.` },
      ],
    },
    {
      statement: `O gerente de vendas de certa empresa tem 32 funcionários em sua equipe, dos quais 12 são mulheres.

Se esse gerente escolher aleatoriamente um dos integrantes da sua equipe, qual a probabilidade de que a pessoa escolhida seja do sexo masculino?`,
      options: [
        { key: "A", text: `11/16`, isCorrect: false, explanation: `Esse valor não corresponde à razão correta de 20 homens para 32 funcionários.` },
        { key: "B", text: `5/8`, isCorrect: true, explanation: `Correto: há 20 homens (32-12) em 32 funcionários, logo P = 20/32 = 5/8.` },
        { key: "C", text: `3/8`, isCorrect: false, explanation: `Esse valor (12/32) corresponde à probabilidade de ser MULHER, não homem — inverte o subgrupo pedido pela questão.` },
        { key: "D", text: `3/4`, isCorrect: false, explanation: `Esse valor não corresponde à razão correta de homens para o total de funcionários.` },
        { key: "E", text: `1/4`, isCorrect: false, explanation: `Esse valor não corresponde ao cálculo correto de 20/32.` },
      ],
    },
  ],
};
