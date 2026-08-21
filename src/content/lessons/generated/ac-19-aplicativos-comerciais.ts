import type { LessonContent } from "@/content/lessonTypes";

export const AC_19_APLICATIVOS_COMERCIAIS: LessonContent = {
  slug: "ac-19-aplicativos-comerciais",
  topicSlug: "ac-19-aplicativos-comerciais",
  subjectSlug: "especificas",
  moduleSlug: "especificas-informatica",
  title: `Aplicativos comerciais (Microsoft Office 2024)`,
  learningObjective: `Dominar as funcionalidades de Word (estilos, quebras, tabelas), Excel (referências, fórmulas, funções, filtros) e PowerPoint (temas, layouts, transições/animações) cobradas de forma prática pela Cesgranrio — a banca gosta de dar uma planilha ou documento concreto e pedir o resultado de uma fórmula ou o efeito de um comando, não só teoria solta.`,
  syllabusCodes: ["AC-19"],
  estimatedMinutes: 45,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-19 — Aplicativos Comerciais (Microsoft Office)

Este código é muito prático: a banca costuma dar uma planilha com valores concretos e pedir o resultado exato de uma fórmula, ou descrever uma ação num documento e pedir o comando/atalho correto. Treinar com exemplos numéricos reais é mais importante aqui do que decorar definições soltas.

## 1. Word: estilos, formatação e estrutura de documento

**Estilos** (Título 1, Título 2, Normal etc.) fazem mais do que só mudar a aparência — eles **estruturam** o documento de forma que o Word reconheça a hierarquia. Isso é o que permite gerar um **Sumário automático**: o Word varre os parágrafos marcados com estilos de título e monta a lista. Formatar um texto manualmente (deixar negrito e aumentar a fonte "na mão") pode parecer um título, mas **não entra no sumário automático**, porque o Word não sabe que aquilo é um título — só sabe que tem formatação diferente.

## 2. Word: quebras de página e de seção

- **Quebra de página** (Ctrl+Enter): força o conteúdo seguinte a começar numa nova página, sem criar várias linhas em branco (diferente de apertar Enter várias vezes, que é frágil — se o texto anterior mudar de tamanho, o "espaçamento manual" quebra o layout).
- **Quebra de seção**: divide o documento em seções que podem ter **configurações diferentes** entre si (números de página distintos, orientação de página diferente — retrato numa seção, paisagem em outra, cabeçalhos/rodapés diferentes).

**Armadilha**: tratar quebra de página e quebra de seção como sinônimos — a quebra de seção é a única que permite configurações de página diferentes entre as partes do documento.

## 3. Excel: tipos de referência de célula

Ao **copiar uma fórmula** para outras células, o comportamento da referência muda conforme o tipo:

- **Referência relativa** (ex.: A1): muda automaticamente conforme a fórmula é copiada para outras células (se copiar de B2 para B3, A1 vira A2).
- **Referência absoluta** (ex.: $A$1): usa cifrão antes da letra e do número — **nunca muda**, não importa para onde a fórmula seja copiada.
- **Referência mista** (ex.: $A1 ou A$1): fixa só a linha OU só a coluna, deixando a outra livre para variar.

**Uso típico de referência absoluta**: uma fórmula que sempre precisa consultar a MESMA célula (ex.: uma taxa de imposto fixa numa célula), mesmo copiada para uma coluna inteira.

## 4. Excel: sintaxe de fórmulas e funções

Toda fórmula começa com **sinal de igual (=)**. A sintaxe correta de uma função usa o nome da função em português da interface (ex.: SOMA, não SOMATORIO — "somatório" não é o nome da função no Excel em português) seguido de parênteses com os argumentos.

Dentro dos parênteses, o **dois-pontos (:)** indica um **intervalo contínuo** de células (ex.: B2:B5 = de B2 até B5, incluindo todas as intermediárias). O **ponto e vírgula (;)** separa **argumentos individuais**, não um intervalo (ex.: B2;B5 soma só B2 e B5, ignorando B3 e B4).

**Exemplo de cálculo**: =SOMA(A1:C3) numa planilha soma TODAS as células do retângulo formado entre A1 e C3 (A1, B1, C1, A2, B2, C2, A3, B3, C3) — nove células, não apenas a diagonal ou a primeira linha/coluna.

## 5. Excel: filtrar, ordenar e organizar dados em tabela

- **Filtrar**: oculta temporariamente as linhas que **não atendem** a um critério, sem apagar nem reordenar os dados — a informação continua lá, só não está visível.
- **Ordenar**: reorganiza fisicamente as linhas de acordo com um critério (crescente/decrescente). Ponto de atenção: ordenar precisa considerar a **tabela inteira** (todas as colunas relacionadas) — ordenar só uma coluna isoladamente "desalinha" os dados das outras colunas daquela linha.

## 6. PowerPoint: tema, layout e slide mestre

Três níveis de organização visual, do mais geral ao mais específico:

- **Tema**: define a paleta de cores, fontes e efeitos padronizados para toda a apresentação.
- **Layout**: organiza os **placeholders** (espaços reservados) de um tipo específico de slide (ex.: layout "Título e Conteúdo" tem uma caixa de título e uma de conteúdo).
- **Slide mestre**: controla os padrões que se aplicam a **todos** os slides da apresentação de uma vez — mudar algo no slide mestre reflete em todos os slides que usam aquele layout.

## 7. PowerPoint: transições e animações — a diferença mais cobrada

- **Transição**: o efeito que ocorre **entre** um slide e o próximo (ex.: dissolver, cortina) — afeta a troca de slides inteiros.
- **Animação**: o efeito aplicado a um **objeto dentro do slide** (texto, imagem, forma) — controla como aquele elemento específico aparece, se move ou desaparece **dentro** do mesmo slide.

**Regra rápida**: se o efeito acontece ao trocar de slide, é transição; se acontece com um elemento específico dentro do slide, é animação.

## Síntese

AC-19 mistura teoria de organização de documento (estilos, quebras, tema/layout/mestre) com prática de cálculo (fórmulas, referências, filtros). O jeito mais seguro de estudar é simular: pegar uma planilha ou documento de exemplo e efetivamente calcular/aplicar o comando, não só ler a definição.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Aplicativos Comerciais — AC-19))
    Word
      Estilos: estruturam, geram sumário automático
      Quebra de página x de seção
    Excel — Referências
      Relativa: muda ao copiar
      Absoluta: fixa com $
      Mista: fixa linha OU coluna
    Excel — Fórmulas
      Começa com =
      : intervalo contínuo
      ; argumentos separados
    Excel — Organização
      Filtrar: oculta, não apaga
      Ordenar: reorganiza a tabela inteira
    PowerPoint
      Tema: cores/fontes gerais
      Layout: placeholders do slide
      Mestre: padrão de todos os slides
      Transição: entre slides
      Animação: dentro do slide
\`\`\``,
  mustMemorize: [
    `Estilos estruturam o documento e geram sumário automático; formatação manual isolada não entra no sumário.`,
    `Quebra de página força nova página; quebra de SEÇÃO permite configurações diferentes (numeração, orientação) entre partes do documento.`,
    `Referência relativa muda ao copiar; absoluta ($A$1) nunca muda; mista fixa só linha ou só coluna.`,
    `Fórmula sempre começa com "="; ":" indica intervalo contínuo; ";" separa argumentos individuais.`,
    `Filtrar OCULTA linhas (dado continua ali); ordenar REORGANIZA a tabela inteira, não só uma coluna.`,
    `Tema = cores/fontes gerais. Layout = placeholders do slide específico. Mestre = padrão de TODOS os slides.`,
    `Transição = efeito entre slides. Animação = efeito num objeto dentro do mesmo slide.`,
  ],
  workedExamples: [
    `A fórmula =SOMA(A1:C3) soma o intervalo retangular de A1 até C3 (todas as 9 células do retângulo, não só a diagonal): (140+77+25)+(210+88+30)+(55+99+40) = 242+328+194 = 764.`,
    `A função de soma no Excel em português é "=SOMA(...)", não "=SOMATORIO(...)" — e o intervalo contínuo B2 a B5 usa dois-pontos "B2:B5"; usar ponto e vírgula "B2;B5" somaria só B2 e B5, ignorando B3 e B4.`,
    `A tecla Tab é o mecanismo padrão de navegação por teclado entre campos/controles de uma caixa de diálogo do Windows, movendo o foco sequencialmente entre eles.`,
    `O atalho Ctrl+I aplica/remove o efeito de itálico ao texto selecionado no Word — atalho padrão que se mantém em todas as versões.`,
  ],
  commonMistakes: [
    `Achar que formatação manual (negrito + fonte grande) cria um título reconhecido pelo Word — só estilos aplicados entram no sumário automático.`,
    `Confundir quebra de página (Ctrl+Enter, só pula para próxima página) com quebra de seção (permite configurações de página diferentes).`,
    `Esquecer de fixar uma referência com "$" quando a fórmula precisa sempre apontar para a mesma célula ao ser copiada — resultado: a fórmula copiada aponta para a célula errada.`,
    `Usar ";" em vez de ":" numa fórmula de intervalo — ";" soma só as células citadas isoladamente, não o intervalo entre elas.`,
    `Confundir "filtrar" (esconde temporariamente, dado continua na planilha) com "excluir dados" (apaga de verdade).`,
    `Tratar transição e animação como sinônimos — transição é ENTRE slides, animação é DENTRO do slide, num objeto específico.`,
    `Padrão observado no acervo real (AC-19-2012-CESGRANRIO-55): cálculo de =SOMA(A1:C3) — exige somar TODAS as 9 células do intervalo retangular, não confundir com soma de apenas uma linha/coluna.`,
    `Padrão observado no acervo real (AC-19-2006-CESGRANRIO-13): Tab move o foco sequencialmente entre campos de uma caixa de diálogo — atalho de navegação, não de edição de texto.`,
    `Padrão observado no acervo real (AC-19-2006-CESGRANRIO-15): Ctrl+I aplica/remove itálico — não confundir com Ctrl+B (negrito) ou Ctrl+U (sublinhado).`,
  ],
  howBoardMightAsk: [
    `Dá uma planilha com valores concretos em células nomeadas e pede o resultado exato de uma fórmula (SOMA, SE, MULT) — exige calcular de verdade, não só reconhecer o nome da função.`,
    `Descreve uma ação de formatação/edição em Word ou PowerPoint e pede o comando ou atalho correto, com distratores de comandos parecidos.`,
    `Testa a sintaxe correta de uma fórmula (nome certo da função, uso de ":" x ";"), oferecendo alternativas com erros sutis de sintaxe.`,
    `Pede para diferenciar transição de animação, ou tema/layout/mestre, a partir de uma descrição de efeito específico.`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `Estilos → estrutura → sumário automático.`,
    `Quebra de página ≠ quebra de seção (só a de seção muda configurações de página).`,
    `Relativa muda, absoluta ($) nunca muda, mista fixa uma das duas.`,
    `":" = intervalo. ";" = argumentos separados.`,
    `Filtrar oculta; ordenar reorganiza a tabela inteira.`,
    `Tema (geral) → Layout (placeholders do slide) → Mestre (padrão de todos).`,
    `Transição = entre slides. Animação = dentro do slide.`,
  ],
  flashcards: [
    { front: "Por que formatação manual não entra no Sumário automático do Word?", back: "Porque o Sumário automático lê ESTILOS (Título 1, Título 2 etc.), não formatação visual aplicada manualmente." },
    { front: "Diferença entre referência relativa e absoluta no Excel?", back: "Relativa muda ao copiar a fórmula; absoluta ($A$1) nunca muda, não importa para onde for copiada." },
    { front: "Diferença entre ':' e ';' numa fórmula do Excel?", back: "':' indica intervalo contínuo de células. ';' separa argumentos/células individuais." },
    { front: "Diferença entre transição e animação no PowerPoint?", back: "Transição: efeito entre slides. Animação: efeito num objeto específico dentro do mesmo slide." },
  ],
  miniQuiz: [
    {
      statement: `Considere a Figura 2, uma planilha eletrônica (típica do Excel 2007) com os seguintes valores: célula A1=140, B1=77, C1=25; A2=210, B2=88, C2=30; A3=55, B3=99, C3=40; A4=133, B4=140, C4=vazia (célula ativa, D4).

Com base na Figura F2, inserindo-se na célula D4 a fórmula =SOMA(A1:C3), o resultado obtido nessa célula será`,
      options: [
        { key: "A", text: `180`, isCorrect: false, explanation: `Esse valor não corresponde à soma do intervalo retangular completo A1:C3 — parece somar só parte das células.` },
        { key: "B", text: `194`, isCorrect: false, explanation: `Esse é o subtotal de apenas UMA das linhas (A3+B3+C3=55+99+40=194), não do intervalo A1:C3 inteiro.` },
        { key: "C", text: `242`, isCorrect: false, explanation: `Esse é o subtotal de apenas uma linha (A1+B1+C1=140+77+25=242), não da soma completa do intervalo.` },
        { key: "D", text: `764`, isCorrect: true, explanation: `Correto: =SOMA(A1:C3) soma todas as 9 células do retângulo A1 até C3: (140+77+25)+(210+88+30)+(55+99+40) = 242+328+194 = 764.` },
        { key: "E", text: `1082`, isCorrect: false, explanation: `Esse valor extrapola a soma correta — provavelmente inclui células fora do intervalo A1:C3 (como a linha 4).` },
      ],
    },
    {
      statement: `Uma pessoa, ao lançar dados de uma compra em uma planilha eletrônica do Excel, precisa somar os valores que são apresentados na figura abaixo: célula A1 'Peça', B1 'preço'; A2 'Parafusos com porcas', B2 '0,5'; A3 'Parafuso comum', B3 '0,4'; A4 'Arruela semi-círculo de borracha', B4 '0,4'; A5 'Arruela semi-círculo metálica', B5 '0,2'; A6 'Total do Gasto', B6 (célula a preencher).

A fórmula do Excel a ser utilizada na célula B6 para obter o resultado de 1,5 é`,
      options: [
        { key: "A", text: `=SOMATORIO(B2+B3+B4+B5)`, isCorrect: false, explanation: `"SOMATORIO" não é o nome da função de soma no Excel em português — o nome correto é "SOMA".` },
        { key: "B", text: `=SOMATORIO(B2:B5)`, isCorrect: false, explanation: `Mesmo erro de nome de função ("SOMATORIO" em vez de "SOMA"), mesmo usando o intervalo correto ":".` },
        { key: "C", text: `=SOMATORIO(B2;B5)`, isCorrect: false, explanation: `Erra o nome da função E usa ";" em vez de ":", o que somaria só B2 e B5 (ignorando B3 e B4) mesmo se o nome estivesse certo.` },
        { key: "D", text: `=SOMA(B2:B5)`, isCorrect: true, explanation: `Correto: a função de soma é "=SOMA(...)", e o intervalo contínuo de B2 a B5 é indicado com dois-pontos ":" — soma as quatro células (0,5+0,4+0,4+0,2=1,5).` },
        { key: "E", text: `=SOMA(B2;B5)`, isCorrect: false, explanation: `Usa o nome certo da função, mas ";" soma só B2 e B5 isoladamente (0,5+0,2=0,7), ignorando B3 e B4 — não chega a 1,5.` },
      ],
    },
  ],
};
