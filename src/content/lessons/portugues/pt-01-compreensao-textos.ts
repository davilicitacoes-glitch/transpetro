import type { LessonContent } from "@/content/lessonTypes";

export const PT01_COMPREENSAO_TEXTOS: LessonContent = {
  slug: "pt-01-compreensao-textos",
  topicSlug: "pt-01-compreensao-textos",
  subjectSlug: "portugues",
  moduleSlug: "portugues-geral",
  title: "Compreensão de textos de gêneros variados",
  learningObjective:
    "Aplicar técnicas de leitura ativa para responder questões de interpretação de texto com segurança, reconhecendo os tipos de pergunta mais comuns e as armadilhas típicas de banca.",
  syllabusCodes: ["PT-01"],
  estimatedMinutes: 30,
  expectedMastery: "intermediario",
  bodyMdx: `# Compreensão de textos de gêneros variados

Interpretação de texto não é sobre "achar bonito" ou concordar com o autor — é sobre **provar, com base no que está escrito**, qual alternativa está correta. A prova sempre testa se você consegue voltar ao texto e apontar a linha que sustenta (ou refuta) cada alternativa.

## 1. O que muda entre "gêneros variados"

O edital fala em gêneros variados porque a banca pode trazer notícia, artigo de opinião, texto literário, propaganda, tirinha, e-mail corporativo, entre outros. Cada gênero tem um objetivo diferente:
- **Texto informativo/jornalístico**: quer informar. Pergunta comum: "qual é o fato principal relatado?"
- **Texto argumentativo/opinativo**: quer convencer. Pergunta comum: "qual é a tese do autor?" ou "qual argumento ele usa para defender X?"
- **Texto narrativo/literário**: quer contar uma história. Pergunta comum: sobre personagem, tempo, espaço, ou sentido conotativo de uma expressão.
- **Texto publicitário**: quer persuadir a agir (comprar, aderir). Pergunta comum: sobre o público-alvo ou a estratégia de persuasão usada.

Identificar o gênero logo no início da leitura já elimina alternativas que não fazem sentido para aquele tipo de texto (ex.: numa propaganda, é raro a pergunta pedir "fato objetivo relatado" — o texto não tem esse compromisso).

## 2. Ideia central x detalhe

A armadilha mais comum em prova objetiva: a alternativa pega um **detalhe verdadeiro** do texto, mas o apresenta como se fosse a **ideia central**. O detalhe está lá, então parece certo — mas ele não resume o texto, só ilustra um ponto secundário.

**Técnica**: depois de ler o texto, resuma mentalmente em uma frase "do que esse texto trata, no geral?". Se uma alternativa foge muito dessa frase-resumo, ela provavelmente está testando um detalhe, não a ideia central.

## 3. Inferência x extrapolação

- **Inferência válida**: uma conclusão que o texto **permite** tirar, mesmo sem estar escrita literalmente, porque as informações dadas levam logicamente a ela.
- **Extrapolação (armadilha)**: uma conclusão que **parece razoável no mundo real**, mas o texto não dá base suficiente para afirmá-la — é você "completando" com conhecimento de fora, não com o que está escrito.

Regra prática: se a única forma de justificar a alternativa é dizendo "mas isso é meio óbvio, todo mundo sabe" em vez de apontar uma frase do texto, desconfie — pode ser extrapolação.

## 4. Sentido literal x sentido conotativo (figurado)

Bancas gostam de testar se uma palavra ou expressão está sendo usada no sentido literal (denotativo) ou no sentido figurado (conotativo) dentro do contexto específico do texto. A mesma palavra pode mudar de sentido dependendo do texto — por isso a pergunta quase sempre vem como "no texto, a expressão X tem o sentido de...", exigindo que você volte ao contexto, não ao significado de dicionário isolado.

## 5. Método de leitura recomendado para prova

1. Leia o texto uma vez, sem parar em cada palavra desconhecida — o objetivo é pegar o assunto geral e o gênero.
2. Leia o comando de cada questão ANTES de reler o texto em detalhe — isso direciona sua segunda leitura para o que realmente importa.
3. Ao avaliar cada alternativa, tente localizar a linha/trecho do texto que a confirma ou refuta. Se não conseguir localizar nada, é forte sinal de extrapolação ou distorção.
4. Elimine primeiro as alternativas claramente erradas (contradizem o texto) antes de decidir entre as que sobraram.`,
  mustMemorize: [
    "Ideia central resume o texto inteiro; detalhe ilustra só uma parte — a armadilha mais comum é apresentar um detalhe verdadeiro como se fosse a ideia central.",
    "Inferência válida: o texto dá base lógica para a conclusão. Extrapolação: a conclusão parece razoável, mas o texto não sustenta.",
    "Sempre volte ao texto para justificar a alternativa — se a única justificativa é 'conhecimento geral', desconfie.",
    "Sentido conotativo (figurado) depende do contexto específico do texto, não do significado isolado da palavra.",
  ],
  workedExamples: [
    "Um texto sobre os impactos econômicos de uma nova lei cita, de passagem, que 'a lei foi sancionada em uma terça-feira'. Uma alternativa que afirma 'o texto trata principalmente do dia da semana em que a lei foi sancionada' está pegando um detalhe verdadeiro e vestindo-o de ideia central — errado, porque o texto trata dos impactos econômicos, não do dia da semana.",
    "Um texto afirma que 'as vendas da empresa caíram 20% após o aumento do preço do produto'. Uma alternativa que conclui 'o aumento do preço foi a única causa da queda nas vendas' é extrapolação — o texto relaciona os dois fatos (queda depois do aumento), mas não afirma que foi a ÚNICA causa; pode haver outros fatores não mencionados.",
  ],
  commonMistakes: [
    "Marcar a alternativa que menciona um trecho literal do texto sem checar se aquele trecho responde de fato à pergunta central feita.",
    "Confundir 'o texto sugere que...' (inferência, precisa de base textual) com 'na minha opinião, é razoável que...' (extrapolação, vem de fora do texto).",
    "Interpretar uma palavra pelo sentido mais comum do dicionário, ignorando que o contexto do texto pode estar usando-a de forma diferente (conotativa).",
    "Ler as alternativas antes de entender o texto como um todo, decidindo por 'achismo' em vez de voltar e localizar a evidência.",
  ],
  howBoardMightAsk: [
    "Pede para identificar a ideia central de um parágrafo ou do texto inteiro, com alternativas que trazem detalhes verdadeiros como distratores.",
    "Pede para julgar se uma afirmação 'pode ser inferida do texto' — testando a diferença entre inferência válida e extrapolação.",
    "Pergunta o sentido de uma palavra ou expressão 'no contexto do texto', testando conotação versus denotação.",
    "Traz uma alternativa que contraria explicitamente uma informação do texto (a mais fácil de eliminar, mas exige atenção a negações e detalhes numéricos).",
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    "Identificar o gênero do texto (informativo, argumentativo, narrativo, publicitário) ajuda a prever o tipo de pergunta.",
    "Ideia central ≠ detalhe — a armadilha mais comum troca um pelo outro.",
    "Inferência válida tem base no texto; extrapolação vem de fora do texto, mesmo parecendo razoável.",
    "Sentido conotativo depende do contexto específico, não do dicionário isolado.",
    "Método: ler o texto → ler os comandos das questões → voltar ao texto localizando evidência para cada alternativa → eliminar as claramente erradas primeiro.",
  ],
  flashcards: [
    { front: "Qual a armadilha mais comum entre 'ideia central' e 'detalhe' num texto?", back: "A alternativa pega um detalhe verdadeiro do texto e o apresenta como se fosse a ideia central, que na verdade é mais ampla." },
    { front: "Qual a diferença entre inferência válida e extrapolação?", back: "Inferência válida: o texto dá base lógica para a conclusão. Extrapolação: a conclusão parece razoável, mas não tem base no texto." },
    { front: "Sentido conotativo depende de quê?", back: "Do contexto específico em que a palavra/expressão aparece no texto, não apenas do significado de dicionário." },
    { front: "Qual é o método de leitura recomendado para questões de interpretação em prova?", back: "Ler o texto → ler o comando das questões → reler localizando evidência para cada alternativa → eliminar as erradas primeiro." },
  ],
  miniQuiz: [
    {
      statement:
        "Um texto relata que 'a empresa aumentou o investimento em treinamento de funcionários em 30% no último ano, e a taxa de rotatividade caiu de 18% para 12% no mesmo período'. Uma alternativa afirma: 'o texto comprova que o aumento do investimento em treinamento foi a única causa da redução da rotatividade'. Essa alternativa é um exemplo de:",
      options: [
        { key: "A", text: "Inferência válida, porque o texto relaciona diretamente as duas informações", isCorrect: false, explanation: "O texto relaciona os dois fatos (aumento de investimento e queda de rotatividade), mas não afirma que um foi a ÚNICA causa do outro — isso vai além do que o texto sustenta." },
        { key: "B", text: "Extrapolação, porque afirma uma relação de causa única que o texto não garante", isCorrect: true, explanation: "Correto: o texto apenas relata os dois fatos ocorrendo no mesmo período, sem afirmar exclusividade de causa — concluir 'única causa' é extrapolar além do que está escrito." },
        { key: "C", text: "A ideia central do texto", isCorrect: false, explanation: "A ideia central seria algo como 'a empresa investiu mais em treinamento e a rotatividade caiu' — a afirmação de causa única é uma conclusão adicional, não a ideia central em si." },
        { key: "D", text: "Um erro de digitação do texto original", isCorrect: false, explanation: "A questão não trata de erro no texto-fonte, e sim da relação lógica entre o que o texto afirma e o que a alternativa conclui." },
      ],
    },
    {
      statement:
        "Uma propaganda de um curso preparatório afirma: 'Nossos alunos aprovados dizem que o segredo foi a disciplina diária.' Considerando o gênero do texto (publicitário) e seu objetivo, qual é a leitura mais adequada dessa frase?",
      options: [
        { key: "A", text: "É um relato imparcial de uma pesquisa científica sobre hábitos de estudo", isCorrect: false, explanation: "Texto publicitário tem objetivo de persuadir/vender, não de apresentar pesquisa científica imparcial — não há indício de metodologia de pesquisa no texto." },
        { key: "B", text: "É uma estratégia de persuasão que usa depoimento de terceiros para reforçar a credibilidade do curso", isCorrect: true, explanation: "Correto: identificar o gênero (publicitário) ajuda a perceber que a frase busca persuadir usando o recurso do depoimento, não apenas informar um fato neutro." },
        { key: "C", text: "É uma ideia central alheia ao propósito do texto", isCorrect: false, explanation: "A frase está alinhada ao propósito persuasivo do gênero publicitário, não é alheia a ele." },
        { key: "D", text: "É uma inferência inválida, pois não pode ser feita nenhuma leitura sobre a intenção do texto", isCorrect: false, explanation: "É perfeitamente possível e esperado ler a intenção persuasiva de um texto publicitário — essa é justamente a habilidade que o código PT-01 cobra ao falar em 'gêneros variados'." },
      ],
    },
  ],
};
