import type { LessonContent } from "@/content/lessonTypes";

export const AC01_RECURSOS_HUMANOS: LessonContent = {
  slug: "ac-01-recursos-humanos",
  topicSlug: "ac-01-recursos-humanos",
  subjectSlug: "especificas",
  moduleSlug: "especificas-processos-legislacao",
  title: "Recursos Humanos",
  learningObjective:
    "Reconhecer os subprocessos centrais de Gestão de Pessoas (recrutamento e seleção, cargos e carreira, treinamento e desenvolvimento, gestão de desempenho e competências, relações de trabalho e benefícios) e identificar corretamente qual conceito está sendo descrito em uma questão de prova.",
  syllabusCodes: ["AC-01"],
  estimatedMinutes: 35,
  expectedMastery: "intermediario",
  bodyMdx: `# Recursos Humanos

O edital cobra cinco subtemas de RH (item 1.1 a 1.5 do Anexo IV). Eles formam o **ciclo de vida do colaborador** dentro da empresa: primeiro ele entra (recrutamento e seleção), depois é posicionado numa estrutura de carreira, é desenvolvido, tem seu desempenho avaliado, e mantém uma relação de trabalho com benefícios ao longo do tempo. Pensar nesse ciclo ajuda a não confundir os conceitos entre si — é o erro mais comum em prova.

## 1. Recrutamento e seleção

**Recrutamento** é a etapa de *atrair* candidatos — é sobre gerar um conjunto de pessoas interessadas na vaga. Pode ser:
- **Interno**: busca candidatos já dentro da empresa (promoção, transferência). Vantagens: motiva quem já está lá, é mais rápido, a pessoa já conhece a cultura. Risco: pode gerar "efeito cascata" (a vaga de quem foi promovido também precisa ser preenchida) e limita a entrada de ideias novas.
- **Externo**: busca no mercado. Vantagem: traz sangue novo, novas competências. Desvantagem: mais caro, mais demorado, risco de adaptação cultural.
- **Misto**: combina os dois — abre a vaga internamente primeiro e, se não achar, vai ao mercado.

**Seleção** é a etapa seguinte — é sobre *escolher*, dentre os recrutados, quem melhor se encaixa no perfil da vaga. Usa instrumentos como entrevistas, provas de conhecimento, testes psicológicos, dinâmicas de grupo e análise de currículo. A diferença central que a prova gosta de cobrar: **recrutamento atrai (gera o funil de candidatos); seleção escolhe (filtra dentro do funil)**.

## 2. Plano de cargos e carreira (PCC)

É a estrutura formal que organiza os cargos da empresa em níveis, define pré-requisitos e faixas salariais para cada um, e estabelece os caminhos possíveis de crescimento (carreira). Serve para dar previsibilidade ao colaborador ("se eu fizer X, posso chegar a Y") e para a empresa organizar sua folha de forma coerente (cargos parecidos com remunerações parecidas).

Dois movimentos típicos dentro de um PCC:
- **Progressão horizontal**: sobe de nível dentro do MESMO cargo (ex.: Analista I → Analista II), geralmente por tempo de casa e/ou desempenho, sem mudar de função.
- **Progressão vertical (promoção)**: muda de cargo para um de maior complexidade/responsabilidade (ex.: Analista → Coordenador).

## 3. Treinamento, desenvolvimento e educação (T&D)

Os três termos parecem sinônimos, mas a diferença de **foco temporal e escopo** é o que a banca costuma explorar:
- **Treinamento**: foco no **cargo atual**, curto prazo, competências técnicas específicas para o que a pessoa já faz hoje (ex.: treinar um novo sistema).
- **Desenvolvimento**: foco no **crescimento futuro** da pessoa, médio/longo prazo, prepara para cargos ou responsabilidades que ela ainda não tem.
- **Educação**: o mais amplo dos três — formação geral da pessoa como profissional e cidadão, não amarrada a um cargo específico (ex.: graduação, pós-graduação).

## 4. Gerenciamento de desempenho e gestão de competências

**Gestão de desempenho** avalia *resultados e comportamentos* de um colaborador em um período, geralmente contra metas previamente combinadas — é sobre "o que a pessoa entregou e como entregou".

**Gestão de competências** trabalha com o conjunto de conhecimentos, habilidades e atitudes (o famoso **CHA**: Conhecimento, Habilidade, Atitude) que a pessoa possui ou precisa desenvolver — é sobre "o que a pessoa tem/sabe", independentemente de estar sendo cobrada por uma meta específica agora.

Uma ferramenta clássica de avaliação de desempenho citada em provas é a **avaliação 360 graus**: o colaborador é avaliado por múltiplas fontes (chefe, pares, subordinados, às vezes clientes/ele mesmo), não só pelo superior direto — reduz o viés de uma avaliação vinda de uma única pessoa.

## 5. Relações de trabalho e benefícios

Cobre a relação formal entre empresa e empregado: normas internas, negociação coletiva (sindicatos), e o pacote de **benefícios** (vale-alimentação, plano de saúde, participação nos lucros e resultados — PLR, entre outros) oferecido além do salário-base. Benefícios podem ser:
- **Obrigatórios por lei** (ex.: FGTS, férias, 13º salário) — a empresa não escolhe se oferece.
- **Espontâneos/facultativos** — a empresa escolhe oferecer para atrair e reter talento (ex.: vale-cultura, day off de aniversário).`,
  mustMemorize: [
    "Recrutamento ATRAI (gera o funil de candidatos); Seleção ESCOLHE (filtra dentro do funil).",
    "Treinamento = cargo atual, curto prazo. Desenvolvimento = crescimento futuro, médio/longo prazo. Educação = formação ampla, não amarrada a um cargo.",
    "Gestão de desempenho avalia RESULTADOS/COMPORTAMENTOS entregues. Gestão de competências trabalha o CHA (Conhecimento, Habilidade, Atitude) que a pessoa tem.",
    "Avaliação 360 graus = múltiplas fontes avaliando o colaborador (chefe, pares, subordinados), não só o superior direto.",
    "Progressão horizontal = sobe de nível no MESMO cargo. Progressão vertical (promoção) = muda de cargo.",
  ],
  workedExamples: [
    "Uma empresa abre uma vaga de Coordenador de Compras primeiro para os próprios funcionários, e só recorre ao mercado externo se ninguém se candidatar. Isso é recrutamento interno com fallback misto — a etapa de recrutamento (atrair candidatos) aconteceu antes da seleção (escolher entre os candidatos atraídos).",
    "Um analista recém-contratado passa por um curso de 3 dias sobre o sistema ERP que a empresa usa no dia a dia. Isso é treinamento (foco no cargo atual, curto prazo, competência técnica específica) — não é desenvolvimento, porque não está preparando a pessoa para um cargo futuro.",
    "Uma avaliação de desempenho em que o colaborador recebe feedback do gestor, de dois colegas de mesmo nível e de um subordinado direto é uma avaliação 360 graus — o ponto central é vir de múltiplas fontes, não apenas do chefe.",
  ],
  commonMistakes: [
    "Trocar recrutamento por seleção (ou vice-versa) — lembrar que recrutamento é sobre ATRAIR (gerar candidatos) e seleção é sobre ESCOLHER entre eles.",
    "Confundir treinamento com desenvolvimento por achar que são sinônimos — a banca costuma testar exatamente essa diferença de foco temporal (cargo atual vs. futuro).",
    "Achar que gestão de desempenho e gestão de competências são a mesma coisa — desempenho olha para trás (o que foi entregue), competências olham para o potencial/capacidade (CHA) da pessoa.",
    "Pensar que todo benefício é obrigatório por lei — muitos (vale-cultura, day off, etc.) são espontâneos, oferecidos por decisão da empresa para reter talento.",
  ],
  howBoardMightAsk: [
    "Apresenta uma situação (ex.: empresa treinando um colaborador em um novo sistema para o cargo atual dele) e pede para classificar se é treinamento, desenvolvimento ou educação.",
    "Descreve uma avaliação de desempenho feita por múltiplas fontes e pede para identificar que se trata de avaliação 360 graus.",
    "Pede para diferenciar progressão horizontal de promoção (vertical) a partir de um exemplo concreto de movimentação de carreira.",
    "Testa se o candidato sabe que recrutamento precede seleção no processo, e que são etapas com objetivos distintos (atrair vs. escolher).",
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    "RH cobrado no edital tem 5 subtemas que formam o ciclo de vida do colaborador: recrutamento e seleção → cargos e carreira → treinamento e desenvolvimento → gestão de desempenho/competências → relações de trabalho e benefícios.",
    "Recrutamento atrai, seleção escolhe.",
    "Recrutamento pode ser interno, externo ou misto — cada um com vantagens/desvantagens diferentes.",
    "Treinamento (cargo atual, curto prazo) ≠ Desenvolvimento (futuro, médio/longo prazo) ≠ Educação (formação ampla).",
    "Gestão de desempenho = resultados/comportamentos entregues. Gestão de competências = CHA (Conhecimento, Habilidade, Atitude).",
    "Avaliação 360 graus = múltiplas fontes de avaliação.",
    "Progressão horizontal (mesmo cargo, sobe nível) ≠ progressão vertical/promoção (muda de cargo).",
    "Benefícios podem ser obrigatórios por lei (FGTS, férias, 13º) ou espontâneos (decisão da empresa).",
  ],
  flashcards: [
    { front: "Qual a diferença entre recrutamento e seleção?", back: "Recrutamento ATRAI candidatos (gera o funil); seleção ESCOLHE dentre eles quem melhor se encaixa na vaga." },
    { front: "Treinamento tem foco em quê? E desenvolvimento?", back: "Treinamento: cargo atual, curto prazo. Desenvolvimento: crescimento futuro do colaborador, médio/longo prazo." },
    { front: "O que é avaliação 360 graus?", back: "Avaliação de desempenho feita por múltiplas fontes (chefe, pares, subordinados), não apenas pelo superior direto." },
    { front: "O que significa CHA em gestão de competências?", back: "Conhecimento, Habilidade e Atitude — o conjunto que compõe uma competência." },
    { front: "Progressão horizontal x progressão vertical: qual a diferença?", back: "Horizontal: sobe de nível dentro do MESMO cargo. Vertical (promoção): muda para um cargo de maior responsabilidade." },
  ],
  miniQuiz: [
    {
      statement:
        "Uma empresa está com uma vaga de Analista de Compras em aberto. Ela publica o anúncio em plataformas de emprego e recebe 80 currículos. Em seguida, aplica uma prova técnica e entrevistas para reduzir esses 80 candidatos a 1 contratado. A etapa de publicar o anúncio e atrair os 80 currículos é chamada de:",
      options: [
        { key: "A", text: "Seleção", isCorrect: false, explanation: "Seleção é a etapa de escolher/filtrar entre os candidatos já atraídos — não a etapa de atraí-los." },
        { key: "B", text: "Recrutamento", isCorrect: true, explanation: "Correto: recrutamento é a etapa de atrair candidatos, gerando o funil (os 80 currículos) do qual a seleção depois vai escolher." },
        { key: "C", text: "Onboarding", isCorrect: false, explanation: "Onboarding é a integração do colaborador já contratado — etapa posterior, não coberta neste código do edital." },
        { key: "D", text: "Avaliação de desempenho", isCorrect: false, explanation: "Avaliação de desempenho acontece com o colaborador já efetivado, avaliando entregas — não tem relação com atrair candidatos." },
      ],
    },
    {
      statement:
        "Uma colaboradora recebe feedback formal sobre seu último trimestre não só do gestor direto, mas também de dois colegas de equipe e de uma pessoa que ela supervisiona. Esse formato de avaliação é conhecido como:",
      options: [
        { key: "A", text: "Avaliação 360 graus", isCorrect: true, explanation: "Correto: avaliação por múltiplas fontes (chefe, pares, subordinados) é a definição de avaliação 360 graus." },
        { key: "B", text: "Gestão de competências", isCorrect: false, explanation: "Gestão de competências trabalha o CHA (conhecimento, habilidade, atitude) que a pessoa tem — não é sobre quantas fontes avaliam o desempenho." },
        { key: "C", text: "Recrutamento interno", isCorrect: false, explanation: "Recrutamento interno é sobre buscar candidatos para uma vaga dentro da própria empresa — não tem relação com avaliação de desempenho." },
        { key: "D", text: "Progressão horizontal", isCorrect: false, explanation: "Progressão horizontal é sobre subir de nível no mesmo cargo — não descreve uma forma de avaliação." },
      ],
    },
  ],
};
