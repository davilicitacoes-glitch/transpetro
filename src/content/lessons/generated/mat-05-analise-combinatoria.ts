import type { LessonContent } from "@/content/lessonTypes";

export const MAT_05_ANALISE_COMBINATORIA: LessonContent = {
  slug: "mat-05-analise-combinatoria",
  topicSlug: "mat-05-analise-combinatoria",
  subjectSlug: "matematica",
  moduleSlug: "matematica-geral",
  title: `Análise combinatória: contagem, permutação, arranjo e combinação`,
  learningObjective: `Este material cobre o conteúdo oficial de **Análise combinatória** com foco na prova objetiva da Cesgranrio. O tema deve ser estudado em três camadas: vocabulário técnico, relações entre os conceitos e aplicação em situações-problema. Questões da banca frequentemente exigem inferência controlada, comparação de alternativas próximas e atenção a exceções; por isso, a preparação deve combinar teoria, exemplos e revisão dos erros.`,
  syllabusCodes: ["MAT-05"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# MAT-05 — Análise combinatória

## Visão geral

Este material cobre o conteúdo oficial de **Análise combinatória** com foco na prova objetiva da Cesgranrio. O tema deve ser estudado em três camadas: vocabulário técnico, relações entre os conceitos e aplicação em situações-problema. Questões da banca frequentemente exigem inferência controlada, comparação de alternativas próximas e atenção a exceções; por isso, a preparação deve combinar teoria, exemplos e revisão dos erros.

## Núcleo conceitual e regras operacionais

1. Princípio multiplicativo multiplica quantidades de escolhas sucessivas; o aditivo soma casos excludentes.
2. n fatorial é n(n-1)...1 e 0!=1.
3. Permutação simples de n elementos é n!.
4. Permutação com repetições divide n! pelos fatoriais das multiplicidades.
5. Arranjo escolhe e ordena: A(n,p)=n!/(n-p)!.
6. Combinação apenas escolhe: C(n,p)=n!/[p!(n-p)!].

### 1. Princípio aditivo e princípio fundamental da contagem

Princípio aditivo e princípio fundamental da contagem integra o núcleo de **Análise combinatória**. Para a prova, não basta reconhecer o termo: é preciso distinguir conceito, finalidade, condições de aplicação e efeitos. A leitura correta começa pela pergunta “qual problema este conceito resolve?” e continua com “em que situação ele não se aplica?”. Essa dupla verificação evita respostas baseadas apenas em palavras familiares.

Em exercícios, escreva os dados, escolha a relação adequada, mantenha as unidades compatíveis e confira se o resultado satisfaz as condições do enunciado. A Cesgranrio costuma apresentar uma situação concreta e trocar um requisito, uma relação lógica ou a ordem de uma etapa. Por isso, compare cada alternativa com todos os dados do caso, não apenas com a primeira expressão que parece correta. Um bom resumo operacional é: definir, relacionar, aplicar e conferir.

### 2. Diagramas de árvore

Diagramas de árvore integra o núcleo de **Análise combinatória**. Para a prova, não basta reconhecer o termo: é preciso distinguir conceito, finalidade, condições de aplicação e efeitos. A leitura correta começa pela pergunta “qual problema este conceito resolve?” e continua com “em que situação ele não se aplica?”. Essa dupla verificação evita respostas baseadas apenas em palavras familiares.

Em exercícios, escreva os dados, escolha a relação adequada, mantenha as unidades compatíveis e confira se o resultado satisfaz as condições do enunciado. A Cesgranrio costuma apresentar uma situação concreta e trocar um requisito, uma relação lógica ou a ordem de uma etapa. Por isso, compare cada alternativa com todos os dados do caso, não apenas com a primeira expressão que parece correta. Um bom resumo operacional é: definir, relacionar, aplicar e conferir.

### 3. Fatorial

Fatorial integra o núcleo de **Análise combinatória**. Para a prova, não basta reconhecer o termo: é preciso distinguir conceito, finalidade, condições de aplicação e efeitos. A leitura correta começa pela pergunta “qual problema este conceito resolve?” e continua com “em que situação ele não se aplica?”. Essa dupla verificação evita respostas baseadas apenas em palavras familiares.

Em exercícios, escreva os dados, escolha a relação adequada, mantenha as unidades compatíveis e confira se o resultado satisfaz as condições do enunciado. A Cesgranrio costuma apresentar uma situação concreta e trocar um requisito, uma relação lógica ou a ordem de uma etapa. Por isso, compare cada alternativa com todos os dados do caso, não apenas com a primeira expressão que parece correta. Um bom resumo operacional é: definir, relacionar, aplicar e conferir.

### 4. Permutação simples e com repetição

Permutação simples e com repetição integra o núcleo de **Análise combinatória**. Para a prova, não basta reconhecer o termo: é preciso distinguir conceito, finalidade, condições de aplicação e efeitos. A leitura correta começa pela pergunta “qual problema este conceito resolve?” e continua com “em que situação ele não se aplica?”. Essa dupla verificação evita respostas baseadas apenas em palavras familiares.

Em exercícios, escreva os dados, escolha a relação adequada, mantenha as unidades compatíveis e confira se o resultado satisfaz as condições do enunciado. A Cesgranrio costuma apresentar uma situação concreta e trocar um requisito, uma relação lógica ou a ordem de uma etapa. Por isso, compare cada alternativa com todos os dados do caso, não apenas com a primeira expressão que parece correta. Um bom resumo operacional é: definir, relacionar, aplicar e conferir.

### 5. Arranjo simples

Arranjo simples integra o núcleo de **Análise combinatória**. Para a prova, não basta reconhecer o termo: é preciso distinguir conceito, finalidade, condições de aplicação e efeitos. A leitura correta começa pela pergunta “qual problema este conceito resolve?” e continua com “em que situação ele não se aplica?”. Essa dupla verificação evita respostas baseadas apenas em palavras familiares.

Em exercícios, escreva os dados, escolha a relação adequada, mantenha as unidades compatíveis e confira se o resultado satisfaz as condições do enunciado. A Cesgranrio costuma apresentar uma situação concreta e trocar um requisito, uma relação lógica ou a ordem de uma etapa. Por isso, compare cada alternativa com todos os dados do caso, não apenas com a primeira expressão que parece correta. Um bom resumo operacional é: definir, relacionar, aplicar e conferir.

### 6. Combinação simples

Combinação simples integra o núcleo de **Análise combinatória**. Para a prova, não basta reconhecer o termo: é preciso distinguir conceito, finalidade, condições de aplicação e efeitos. A leitura correta começa pela pergunta “qual problema este conceito resolve?” e continua com “em que situação ele não se aplica?”. Essa dupla verificação evita respostas baseadas apenas em palavras familiares.

Em exercícios, escreva os dados, escolha a relação adequada, mantenha as unidades compatíveis e confira se o resultado satisfaz as condições do enunciado. A Cesgranrio costuma apresentar uma situação concreta e trocar um requisito, uma relação lógica ou a ordem de uma etapa. Por isso, compare cada alternativa com todos os dados do caso, não apenas com a primeira expressão que parece correta. Um bom resumo operacional é: definir, relacionar, aplicar e conferir.

### 7. Distinção entre ordem relevante e escolha de grupos

Distinção entre ordem relevante e escolha de grupos integra o núcleo de **Análise combinatória**. Para a prova, não basta reconhecer o termo: é preciso distinguir conceito, finalidade, condições de aplicação e efeitos. A leitura correta começa pela pergunta “qual problema este conceito resolve?” e continua com “em que situação ele não se aplica?”. Essa dupla verificação evita respostas baseadas apenas em palavras familiares.

Em exercícios, escreva os dados, escolha a relação adequada, mantenha as unidades compatíveis e confira se o resultado satisfaz as condições do enunciado. A Cesgranrio costuma apresentar uma situação concreta e trocar um requisito, uma relação lógica ou a ordem de uma etapa. Por isso, compare cada alternativa com todos os dados do caso, não apenas com a primeira expressão que parece correta. Um bom resumo operacional é: definir, relacionar, aplicar e conferir.

## Método de resolução

1. Classifique o comando: definição, cálculo, aplicação, exceção ou interpretação.
2. Sublinhe restrições, negações, unidades, prazos e qualificadores como “sempre”, “apenas” e “necessariamente”.
3. Recupere a regra central antes de olhar as alternativas.
4. Elimine opções que misturam conceitos verdadeiros em relação errada.
5. Teste a resposta no caso concreto e faça uma conferência final.

## Síntese

O domínio de Análise combinatória resulta da conexão entre princípio aditivo e princípio fundamental da contagem, diagramas de árvore, fatorial e os demais pontos do edital. Revise o mapa mental, explique cada ramo com suas próprias palavras e resolva questões reais. Se uma regra parecer absoluta, procure condições, limites e exceções: é nesse deslocamento que se concentram muitas pegadinhas.

## Mapa mental

# MAT-05 — Mapa mental

\`\`\`mermaid
mindmap
  root((Análise combinatória))
    princípio aditivo e princípio fundamental da contagem
      Conceito e finalidade
      Condições de aplicação
      Exemplo de prova
      Contraste e exceção
    diagramas de árvore
      Conceito e finalidade
      Condições de aplicação
      Exemplo de prova
      Contraste e exceção
    fatorial
      Conceito e finalidade
      Condições de aplicação
      Exemplo de prova
      Contraste e exceção
    permutação simples e com repetição
      Conceito e finalidade
      Condições de aplicação
      Exemplo de prova
      Contraste e exceção
    arranjo simples
      Conceito e finalidade
      Condições de aplicação
      Exemplo de prova
      Contraste e exceção
    combinação simples
      Conceito e finalidade
      Condições de aplicação
      Exemplo de prova
      Contraste e exceção
    distinção entre ordem relevante e escolha de grupos
      Conceito e finalidade
      Condições de aplicação
      Exemplo de prova
      Contraste e exceção
    Estratégia Cesgranrio
      Ler o comando
      Eliminar extrapolações
      Conferir o caso
\`\`\``,
  mustMemorize: [
    `Princípio multiplicativo multiplica quantidades de escolhas sucessivas; o aditivo soma casos excludentes.`,
    `n fatorial é n(n-1)...1 e 0!=1.`,
    `Permutação simples de n elementos é n!.`,
    `Permutação com repetições divide n! pelos fatoriais das multiplicidades.`,
    `Arranjo escolhe e ordena: A(n,p)=n!/(n-p)!.`,
    `Combinação apenas escolhe: C(n,p)=n!/[p!(n-p)!].`,
    `**Princípio aditivo e princípio fundamental da contagem:** associe definição, finalidade, condição e contraste.`,
    `**Diagramas de árvore:** associe definição, finalidade, condição e contraste.`,
    `**Fatorial:** associe definição, finalidade, condição e contraste.`,
    `**Permutação simples e com repetição:** associe definição, finalidade, condição e contraste.`,
    `**Arranjo simples:** associe definição, finalidade, condição e contraste.`,
    `**Combinação simples:** associe definição, finalidade, condição e contraste.`,
  ],
  workedExamples: [
    `Como a ordem de exibição não importa (é uma escolha de conjunto, não um arranjo ordenado), trata-se de combinação simples: C(9,3) = 9!/(3!×6!) = (9×8×7)/(3×2×1) = 504/6 = 84. Núcleo do código MAT-05 (combinação). **Lição de prova:** identifique exatamente qual dado sustenta o gabarito e por que as demais opções extrapolam, invertem ou misturam conceitos.`,
    `No pior caso, a pessoa pega todas as 14 balas que não são de hortelã (6 morango + 8 caramelo) e mais 2 de hortelã: 14 + 2 = 16. Trata-se de um problema de garantia lógica (Princípio da Casa dos Pombos), tema correlato mas não idêntico ao 'princípio fundamental da contagem' listado explicitamente em MAT-05 (análise combinatória). Mapeado a MAT-05 por proximidade (raciocínio combinatório sobre conjuntos), com confiança baixa, pois o edital não cita explicitamente princípio da casa dos pombos/garantia lógica. **Lição de prova:** identifique exatamente qual dado sustenta o gabarito e por que as demais opções extrapolam, invertem ou misturam conceitos.`,
    `Os 5 dígitos seguintes ao dígito da cidade variam de 00001 a 99999, contando de 1 a 99.999 — o número máximo de candidatos numa mesma cidade é, portanto, 99.999 (princípio fundamental da contagem aplicado a uma sequência numérica de 5 posições). Núcleo do código MAT-05 (análise combinatória — princípio fundamental da contagem). **Lição de prova:** identifique exatamente qual dado sustenta o gabarito e por que as demais opções extrapolam, invertem ou misturam conceitos.`,
    `O produto de 5 números é negativo quando há uma quantidade ímpar de fatores negativos (1, 3 ou 5). Número de combinações: C(5,1)×C(5,4) + C(5,3)×C(5,2) + C(5,5)×C(5,0) = 5×5 + 10×10 + 1×1 = 25+100+1 = 126. Núcleo do código MAT-05 (análise combinatória — combinação). **Lição de prova:** identifique exatamente qual dado sustenta o gabarito e por que as demais opções extrapolam, invertem ou misturam conceitos.`,
  ],
  commonMistakes: [
    `Reconhecer palavra-chave e ignorar o contexto: **Por que engana:** a alternativa repete termos do enunciado, mas altera a relação entre eles. **Correto:** valide definição, condição e consequência no caso completo.`,
    `Transformar regra condicionada em regra absoluta: **Por que engana:** expressões como “sempre”, “nunca” e “somente” parecem categóricas. **Correto:** procure exceções e requisitos antes de aceitar a afirmação.`,
    `Confundir conceitos vizinhos: **Por que engana:** princípio aditivo e princípio fundamental da contagem e diagramas de árvore pertencem ao mesmo tema, mas não são sinônimos. **Correto:** compare finalidade, objeto e modo de aplicação.`,
    `Padrão observado no acervo real (MAT-05-2012-CESGRANRIO-14): Como a ordem de exibição não importa (é uma escolha de conjunto, não um arranjo ordenado), trata-se de combinação simples: C(9,3) = 9!/(3!×6!) = (9×8×7)/(3×2×1) = 504/6 = 84. Núcleo do código MAT-05 (combinação). **Lição de prova:** identifique exatamente qual dado sustenta o gabarito e por que as demais opções extrapolam, invertem ou misturam conceitos.`,
    `Padrão observado no acervo real (MAT-05-2013-CESGRANRIO-30): No pior caso, a pessoa pega todas as 14 balas que não são de hortelã (6 morango + 8 caramelo) e mais 2 de hortelã: 14 + 2 = 16. Trata-se de um problema de garantia lógica (Princípio da Casa dos Pombos), tema correlato mas não idêntico ao 'princípio fundamental da contagem' listado explicitamente em MAT-05 (análise combinatória). Mapeado a MAT-05 por proximidade (raciocínio combinatório sobre conjuntos), com confiança baixa, pois o edital não cita explicitamente princípio da casa dos pombos/garantia lógica. **Lição de prova:** identifique exatamente qual dado sustenta o gabarito e por que as demais opções extrapolam, invertem ou misturam conceitos.`,
    `Padrão observado no acervo real (MAT-05-2006-CESGRANRIO-20): Os 5 dígitos seguintes ao dígito da cidade variam de 00001 a 99999, contando de 1 a 99.999 — o número máximo de candidatos numa mesma cidade é, portanto, 99.999 (princípio fundamental da contagem aplicado a uma sequência numérica de 5 posições). Núcleo do código MAT-05 (análise combinatória — princípio fundamental da contagem). **Lição de prova:** identifique exatamente qual dado sustenta o gabarito e por que as demais opções extrapolam, invertem ou misturam conceitos.`,
    `Padrão observado no acervo real (MAT-05-2018-CESGRANRIO-19): O produto de 5 números é negativo quando há uma quantidade ímpar de fatores negativos (1, 3 ou 5). Número de combinações: C(5,1)×C(5,4) + C(5,3)×C(5,2) + C(5,5)×C(5,0) = 5×5 + 10×10 + 1×1 = 25+100+1 = 126. Núcleo do código MAT-05 (análise combinatória — combinação). **Lição de prova:** identifique exatamente qual dado sustenta o gabarito e por que as demais opções extrapolam, invertem ou misturam conceitos.`,
  ],
  howBoardMightAsk: [
    `Ver padrão real: MAT-05-2012-CESGRANRIO-14 — Como a ordem de exibição não importa (é uma escolha de conjunto, não um arranjo ordenado), trata-se de combinação simples: C(9,3) = 9!/(3!×6!) = (9×8×7)/(3×2×1)...`,
    `Ver padrão real: MAT-05-2013-CESGRANRIO-30 — No pior caso, a pessoa pega todas as 14 balas que não são de hortelã (6 morango + 8 caramelo) e mais 2 de hortelã: 14 + 2 = 16. Trata-se de um problema de garan...`,
    `Ver padrão real: MAT-05-2006-CESGRANRIO-20 — Os 5 dígitos seguintes ao dígito da cidade variam de 00001 a 99999, contando de 1 a 99.999 — o número máximo de candidatos numa mesma cidade é, portanto, 99.999...`,
    `Ver padrão real: MAT-05-2018-CESGRANRIO-19 — O produto de 5 números é negativo quando há uma quantidade ímpar de fatores negativos (1, 3 ou 5). Número de combinações: C(5,1)×C(5,4) + C(5,3)×C(5,2) + C(5,5)...`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `Princípio multiplicativo multiplica quantidades de escolhas sucessivas; o aditivo soma casos excludentes.`,
    `n fatorial é n(n-1)...1 e 0!=1.`,
    `Permutação simples de n elementos é n!.`,
    `Permutação com repetições divide n! pelos fatoriais das multiplicidades.`,
    `Arranjo escolhe e ordena: A(n,p)=n!/(n-p)!.`,
    `Combinação apenas escolhe: C(n,p)=n!/[p!(n-p)!].`,
    `**Princípio aditivo e princípio fundamental da contagem:** associe definição, finalidade, condição e contraste.`,
    `**Diagramas de árvore:** associe definição, finalidade, condição e contraste.`,
    `**Fatorial:** associe definição, finalidade, condição e contraste.`,
    `**Permutação simples e com repetição:** associe definição, finalidade, condição e contraste.`,
    `**Arranjo simples:** associe definição, finalidade, condição e contraste.`,
    `**Combinação simples:** associe definição, finalidade, condição e contraste.`,
  ],
  flashcards: [],
  miniQuiz: [
      {
        statement: `A vitrinista de uma loja de roupas femininas dispõe de 9 vestidos de modelos diferentes e deverá escolher 3 para serem exibidos na vitrine.

Quantas são as escolhas possíveis?`,
        options: [
        { key: "A", text: `84`, isCorrect: true, explanation: `Como a ordem de exibição não importa (é uma escolha de conjunto, não um arranjo ordenado), trata-se de combinação simples: C(9,3) = 9!/(3!×6!) = (9×8×7)/(3×2×1) = 504/6 = 84. Núcleo do código MAT-05 (combinação).` },
        { key: "B", text: `96`, isCorrect: false, explanation: `Alternativa incorreta — compare com o gabarito e a justificativa da alternativa correta.` },
        { key: "C", text: `168`, isCorrect: false, explanation: `Alternativa incorreta — compare com o gabarito e a justificativa da alternativa correta.` },
        { key: "D", text: `243`, isCorrect: false, explanation: `Alternativa incorreta — compare com o gabarito e a justificativa da alternativa correta.` },
        { key: "E", text: `504`, isCorrect: false, explanation: `Alternativa incorreta — compare com o gabarito e a justificativa da alternativa correta.` },
        ],
      },
      {
        statement: `Dentro de um saco há 24 balas, todas indistinguíveis, a não ser por seus sabores: 6 são de morango, 8 de caramelo e 10 de hortelã. Uma pessoa coloca a mão dentro do saco e pega n balas.

Para que essa pessoa tenha certeza de que pegou pelo menos duas balas de hortelã, o menor valor de n deverá ser`,
        options: [
        { key: "A", text: `4`, isCorrect: false, explanation: `Alternativa incorreta — compare com o gabarito e a justificativa da alternativa correta.` },
        { key: "B", text: `10`, isCorrect: false, explanation: `Alternativa incorreta — compare com o gabarito e a justificativa da alternativa correta.` },
        { key: "C", text: `16`, isCorrect: true, explanation: `No pior caso, a pessoa pega todas as 14 balas que não são de hortelã (6 morango + 8 caramelo) e mais 2 de hortelã: 14 + 2 = 16. Trata-se de um problema de garantia lógica (Princípio da Casa dos Pombos), tema correlato mas não idêntico ao 'princípio fundamental da contagem' listado explicitamente em MAT-05 (análise combinatória). Mapeado a MAT-05 por proximidade (raciocínio combinatório sobre conjuntos), com confiança baixa, pois o edital não cita explicitamente princípio da casa dos pombos/garantia lógica.` },
        { key: "D", text: `18`, isCorrect: false, explanation: `Alternativa incorreta — compare com o gabarito e a justificativa da alternativa correta.` },
        { key: "E", text: `20`, isCorrect: false, explanation: `Alternativa incorreta — compare com o gabarito e a justificativa da alternativa correta.` },
        ],
      },
  ],
};
