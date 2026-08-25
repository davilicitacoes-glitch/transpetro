import type { LessonContent } from "@/content/lessonTypes";

export const AC_06_MATEMATICA_FINANCEIRA: LessonContent = {
  slug: "ac-06-matematica-financeira",
  topicSlug: "ac-06-matematica-financeira",
  subjectSlug: "especificas",
  moduleSlug: "especificas-financas-contabilidade",
  title: `Matemática Financeira (Específicas)`,
  learningObjective: `Calcular percentuais de desconto e de aumento em cenários compostos (soma de categorias, produção mensal), dominar as fórmulas de juros simples (J=C·i·t) e compostos (M=C(1+i)^t), e diferenciar desconto comercial de racional — a Cesgranrio gosta de dar um problema numérico concreto e completo, exigindo cálculo passo a passo, não só a fórmula solta.`,
  syllabusCodes: ["AC-06"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-06 — Matemática Financeira Aplicada

## 1. Porcentagem: a base de tudo

Um percentual sempre se calcula sobre uma **base de referência específica** — o erro mais comum é calcular o percentual sobre a base errada (ex.: sobre o valor final em vez do inicial, ou sobre um subtotal em vez do total).

**Fórmula do percentual de desconto**: Desconto% = (Valor original − Valor pago) ÷ **Valor original**.

**Exemplo**: um produto de R$ 80,00 vendido por R$ 75,00 teve desconto de R$ 5,00. O percentual de desconto é 5 ÷ 80 = 0,0625 = **6,25%** — a base é o valor ORIGINAL (80), não o valor pago (75). Dividir por 75 em vez de 80 é o erro mais comum nesse tipo de questão.

## 2. Percentual de aumento numa produção com múltiplas categorias

Quando o aumento percentual incide sobre **apenas uma parte** de um total composto por várias categorias, o percentual de aumento do TOTAL é diferente do percentual de aumento daquela categoria isolada:

**Método**: 1) some o total original de todas as categorias; 2) calcule o aumento em valor absoluto (não em %) apenas na categoria afetada; 3) divida esse aumento absoluto pelo TOTAL ORIGINAL (não pelo total da categoria isolada).

**Exemplo**: uma empresa produz 8.000 bolas de futebol, 3.000 de vôlei e 1.500 de basquete (total = 12.500). Um aumento de 12% só nas bolas de futebol representa 12% × 8.000 = 960 unidades a mais. O percentual de aumento sobre a **produção total** é 960 ÷ 12.500 = 0,0768 = **7,68%** — bem menor que os 12% da categoria isolada, porque o aumento se dilui no total.

**Pegadinha clássica**: confundir o percentual de aumento de uma categoria (12%) com o percentual de aumento do total consolidado (7,68%) — são cálculos diferentes com bases diferentes.

## 3. Diferença percentual entre dois grupos

Para calcular a diferença percentual entre dois grupos (ex.: "quantos % a mais o grupo A tem em relação ao grupo B"), a fórmula é:

Diferença% = (Total A − Total B) ÷ **Total B** (a base é sempre o grupo de referência/comparação, não o grupo maior).

**Exemplo**: um total de 49 homens (32+17) contra 23 mulheres (15+8). A diferença é (49−23) ÷ 23 = 26 ÷ 23 ≈ 1,13 = **113%** — ou seja, o grupo de homens é 113% MAIOR que o de mulheres (não 113% do total, nem a diferença simples de 26 pessoas).

## 4. Juros simples

**Fórmula**: J = C · i · t

Onde: **J** = juro (valor pago pelo uso do dinheiro), **C** = capital inicial, **i** = taxa de juros (na mesma unidade de tempo que t), **t** = tempo/prazo.

**Cálculo de taxa a partir do juro total**: se um capital de R$ 3.000,00 rendeu R$ 3.600,00 em 5 meses, o juro total foi 3.600 − 3.000 = R$ 600,00. A taxa total do período é 600 ÷ 3.000 = 0,20 = 20% em 5 meses. Para achar a taxa **mensal simples**, divide-se a taxa total pelo número de períodos: 20% ÷ 5 = **4% ao mês** (em juros simples, a taxa se divide/multiplica linearmente pelo número de períodos — diferente de juros compostos, onde essa divisão simples não vale).

## 5. Juros compostos

**Fórmula**: M = C · (1 + i)^t

Onde **M** = montante final, **C** = capital inicial, **i** = taxa por período, **t** = número de períodos. A diferença essencial para juros simples: nos compostos, os juros de cada período **incidem sobre o montante acumulado** (capital + juros anteriores), não sempre sobre o capital inicial — por isso o crescimento é exponencial, não linear.

## 6. Desconto comercial x desconto racional

- **Desconto comercial (por fora)**: incide **nominalmente sobre o valor futuro** (valor de face do título) — é o mais comum em operações bancárias de desconto de duplicatas.
- **Desconto racional (por dentro)**: relaciona-se ao **valor presente** — o desconto é calculado de forma que, somado ao valor líquido recebido, reproduza corretamente o valor futuro à taxa dada (equivalente ao raciocínio de juros compostos "de trás para frente").

## 7. Compatibilidade de taxa e prazo

Uma regra fundamental, sempre verificada antes de qualquer cálculo: taxa e prazo devem estar na **mesma unidade de tempo**. Uma taxa de 12% ao ano aplicada a um prazo em meses precisa ser convertida (ou o prazo convertido para anos) antes do cálculo — misturar unidades sem conversão gera resultado sistematicamente errado.

## 8. Valor presente x valor futuro

Valor presente (hoje) e valor futuro (numa data posterior) são valores em **momentos diferentes no tempo** e **não devem ser comparados diretamente** sem trazê-los para a mesma data (usando a taxa de juros/desconto adequada) — comparar R$ 1.000 hoje com R$ 1.000 daqui a um ano ignora o valor do dinheiro no tempo.

## Síntese

O AC-06 exige, acima de tudo, disciplina no cálculo: identificar corretamente a BASE de cada percentual (total original, grupo de referência), aplicar juros simples ou compostos conforme o enunciado pedir, e nunca comparar valores de datas diferentes sem trazê-los à mesma referência temporal.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Matemática Financeira — AC-06))
    Porcentagem
      Desconto% = (original - pago) / original
      Aumento parcial dilui no total
      Diferenca% usa o grupo de referencia como base
    Juros Simples
      J = C x i x t
      Taxa se divide linearmente pelo periodo
    Juros Compostos
      M = C x (1+i)^t
      Juros incidem sobre montante acumulado
    Desconto
      Comercial: sobre valor futuro
      Racional: sobre valor presente
    Compatibilidade
      Taxa e prazo na mesma unidade
    VP x VF
      Datas diferentes, nao comparar direto
\`\`\``,
  mustMemorize: [
    `Percentual de desconto = (valor original − valor pago) ÷ VALOR ORIGINAL (não o valor pago).`,
    `Aumento percentual numa categoria específica DILUI ao ser recalculado sobre o total consolidado.`,
    `Diferença percentual entre grupos usa o grupo de REFERÊNCIA como base do cálculo.`,
    `Juros simples: J = C · i · t. Taxa se divide/multiplica LINEARMENTE pelo número de períodos.`,
    `Juros compostos: M = C · (1+i)^t. Juros incidem sobre o montante ACUMULADO, não sempre sobre o capital inicial.`,
    `Desconto comercial incide sobre o VALOR FUTURO; desconto racional relaciona-se ao VALOR PRESENTE.`,
    `Taxa e prazo sempre precisam estar na MESMA unidade de tempo antes do cálculo.`,
  ],
  workedExamples: [
    `Desconto = 80 − 75 = 5,00. Percentual de desconto = 5/80 = 0,0625 = 6,25% — a base é o valor ORIGINAL (80), não o valor pago (75).`,
    `Produção total antes: 8.000+3.000+1.500=12.500. Aumento nas bolas de futebol: 12% de 8.000 = 960. Nova produção total: 12.500+960=13.460. Percentual de aumento sobre o TOTAL: 960/12.500 = 0,0768 = 7,68% — bem menor que os 12% da categoria isolada.`,
    `Total de homens: 32+17=49. Total de mulheres: 15+8=23. Diferença percentual: (49−23)/23 = 26/23 ≈ 1,13 = 113% — a base é o grupo de referência (mulheres, 23), não o total geral.`,
    `Juro total = 3.600−3.000 = 600,00. Taxa total no período = 600/3.000 = 0,20 = 20% em 5 meses. Taxa mensal simples = 20%/5 = 4% — em juros simples, a taxa se divide linearmente pelo número de períodos.`,
  ],
  commonMistakes: [
    `Calcular o percentual de desconto dividindo pelo valor PAGO em vez do valor ORIGINAL — a base do desconto é sempre o valor antes do desconto.`,
    `Achar que o aumento percentual de uma categoria isolada (12%) é igual ao aumento percentual do total consolidado — o aumento se dilui quando recalculado sobre o total.`,
    `Usar o total geral como base ao calcular diferença percentual entre dois grupos, em vez de usar o grupo de referência/comparação específico.`,
    `Aplicar a divisão linear da taxa (usada em juros simples) para problemas de juros COMPOSTOS — em compostos, essa divisão simples não é válida, pois os juros incidem sobre o montante acumulado.`,
    `Misturar taxa e prazo em unidades diferentes (ex.: taxa ao ano com prazo em meses) sem converter antes do cálculo.`,
    `Padrão observado no acervo real (AC-06-2012-CESGRANRIO-43): calcular corretamente o percentual de desconto usando o valor original como base (5/80=6,25%), não o valor pago.`,
    `Padrão observado no acervo real (AC-06-2012-CESGRANRIO-44): calcular o percentual de aumento sobre o total consolidado (7,68%), não sobre a categoria isolada (12%).`,
    `Padrão observado no acervo real (AC-06-2012-CESGRANRIO-48): calcular a diferença percentual entre grupos usando o grupo de referência (23) como base, chegando a 113%.`,
    `Padrão observado no acervo real (AC-06-2012-CESGRANRIO-49): calcular a taxa de juros simples mensal a partir do juro total e do número de períodos (20%/5=4%).`,
  ],
  howBoardMightAsk: [
    `Dá um valor original e um valor com desconto e pede o percentual de desconto, com distratores que usam a base errada (valor pago em vez de original).`,
    `Dá a produção de várias categorias e um aumento percentual em apenas uma delas, pedindo o aumento percentual do total consolidado.`,
    `Dá dois grupos com subtotais e pede a diferença percentual entre eles, testando qual grupo é a base de referência.`,
    `Dá capital inicial, montante final e prazo, pedindo a taxa de juros simples do período ou a taxa mensal equivalente.`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `Desconto% = (original − pago) / original.`,
    `Aumento numa categoria dilui ao ser recalculado sobre o total.`,
    `Diferença% usa o grupo de referência como base.`,
    `J = C·i·t (simples). M = C(1+i)^t (composto).`,
    `Desconto comercial = valor futuro. Desconto racional = valor presente.`,
    `Taxa e prazo sempre na mesma unidade.`,
  ],
  flashcards: [
    { front: "Qual é a base correta para calcular percentual de desconto?", back: "O valor ORIGINAL (antes do desconto), não o valor pago." },
    { front: "Um aumento de 12% numa categoria gera quanto de aumento no total consolidado?", back: "Menos que 12% — o aumento se dilui proporcionalmente ao peso da categoria no total." },
    { front: "Fórmula de juros simples e de juros compostos?", back: "Simples: J = C·i·t. Compostos: M = C·(1+i)^t." },
    { front: "Diferença entre desconto comercial e racional?", back: "Comercial incide sobre o valor futuro (nominal). Racional relaciona-se ao valor presente." },
  ],
  miniQuiz: [
    {
      statement: `Uma dona de casa comprou um novo botijão de gás pelo valor de R$ 75,00, à vista.

Sabendo-se que o valor inicial do produto era R$ 80,00, qual foi o percentual de desconto concedido à dona de casa?`,
      options: [
        { key: "A", text: `5%`, isCorrect: false, explanation: `Esse seria o resultado de dividir o desconto (5,00) por 100, sem relação com a base correta do cálculo — não corresponde a 5/80.` },
        { key: "B", text: `6,25%`, isCorrect: true, explanation: `Correto: Desconto = 80 − 75 = 5,00. Percentual de desconto = 5/80 = 0,0625 = 6,25% — usando o valor ORIGINAL (80) como base.` },
        { key: "C", text: `6,67%`, isCorrect: false, explanation: `Esse valor corresponde a calcular 5/75 (usando o valor PAGO como base) em vez de 5/80 (valor original) — erro de base do percentual.` },
        { key: "D", text: `75%`, isCorrect: false, explanation: `Esse número corresponde ao valor pago em si (75), não a um cálculo percentual de desconto sobre a base correta.` },
        { key: "E", text: `80%`, isCorrect: false, explanation: `Esse número corresponde ao valor original em si (80), não ao percentual de desconto calculado corretamente.` },
      ],
    },
    {
      statement: `A empresa Show de Bola Ltda. produz mensalmente 8.000 bolas de futebol, 3.000 bolas de vôlei e 1.500 bolas de basquete. No mês de junho de 2014, está previsto um aumento na produção de bolas de futebol, equivalente a 12%.

O percentual de aumento na produção total da empresa, no mês de junho de 2014, é de`,
      options: [
        { key: "A", text: `7,13%`, isCorrect: false, explanation: `Esse valor não corresponde ao cálculo correto de 960/12.500 — indica um erro no valor do aumento absoluto ou na base usada.` },
        { key: "B", text: `7,68%`, isCorrect: true, explanation: `Correto: aumento absoluto de 12% de 8.000 = 960 unidades; sobre o total original de 12.500, isso representa 960/12.500 = 7,68% de aumento na produção total.` },
        { key: "C", text: `12%`, isCorrect: false, explanation: `12% é o aumento APENAS na categoria de bolas de futebol — não o aumento do total consolidado, que é menor porque se dilui entre as três categorias.` },
        { key: "D", text: `36%`, isCorrect: false, explanation: `Esse valor não corresponde a nenhum cálculo correto do problema — não reflete o aumento absoluto (960) dividido pelo total (12.500).` },
        { key: "E", text: `64%`, isCorrect: false, explanation: `Esse percentual está muito acima do que o aumento de 960 unidades representa sobre o total de 12.500 — não corresponde ao cálculo correto.` },
      ],
    },
  ],
};
