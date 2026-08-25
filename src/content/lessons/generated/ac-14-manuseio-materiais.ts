import type { LessonContent } from "@/content/lessonTypes";

export const AC_14_MANUSEIO_MATERIAIS: LessonContent = {
  slug: "ac-14-manuseio-materiais",
  topicSlug: "ac-14-manuseio-materiais",
  subjectSlug: "especificas",
  moduleSlug: "especificas-logistica-cadeia-suprimentos",
  title: `Manuseio de Materiais`,
  learningObjective: `Diferenciar equipamentos de movimentação (empilhadeiras, transportadores, guindastes) de estruturas de armazenamento (paletes, estanterias), dominar os princípios clássicos de movimentação (flexibilidade, redução de distância, segurança), e reconhecer vantagens e desvantagens da paletização — a Cesgranrio gosta de pedir pares de equipamentos classificados corretamente por função (movimentação x armazenamento).`,
  syllabusCodes: ["AC-14"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-14 — Manuseio de Materiais

## 1. Equipamentos de movimentação x estruturas de armazenamento

A distinção mais cobrada do código é entre o que **movimenta** e o que **armazena**:

- **Equipamentos de movimentação**: **deslocam** cargas de um ponto a outro — empilhadeiras, paleteiras, transportadores contínuos, guindastes, tratores.
- **Estruturas/unidades de armazenamento**: servem de **base de apoio** para as cargas armazenadas, sem deslocar nada por si só — paletes, estanterias, contêineres (quando parados, servindo de unidade de carga).

**Exemplo clássico**: empilhadeira (movimentação) e palete (armazenamento) formam o par correto numa questão que pede "equipamento de movimentação e de armazenamento, respectivamente" — a empilhadeira desloca a carga; o palete é a base sobre a qual a carga fica apoiada e armazenada.

**Pegadinha clássica**: misturar dois equipamentos de movimentação (ex.: "empilhadeiras e tratores") ou dois de armazenamento (ex.: "paletes e estanterias") quando a pergunta pede um par com funções diferentes — é preciso que um item movimente e o outro sirva de estrutura de apoio.

## 2. Tipos de equipamento de movimentação

- **Transportador contínuo** (esteiras, roletes): atende **fluxo repetitivo** de materiais entre pontos fixos — alta eficiência para volume constante, baixa flexibilidade de rota.
- **Empilhadeira**: oferece **flexibilidade** — pode se mover livremente pelo armazém, atendendo diferentes rotas e cargas.
- **Guindaste**: atende operações de **içamento** — movimentação vertical de cargas pesadas.
- **AGV (Automated Guided Vehicle)**: segue **rotas guiadas** fixas (fios, marcações, sensores em trilha pré-definida).
- **AMR (Autonomous Mobile Robot)**: navega de forma mais **autônoma e adaptativa**, desviando de obstáculos dinamicamente, sem depender de rota fisicamente marcada.
- **AS/RS (Automated Storage and Retrieval System)**: automatiza a **armazenagem e recuperação** de itens, tipicamente em estruturas verticais de alta densidade.

## 3. Princípios clássicos de movimentação de materiais

Entre os princípios clássicos de projeto de sistemas de movimentação, destaca-se a **lei da flexibilidade**: recomenda o uso de **equipamentos versáteis**, capazes de manusear **diferentes tipos de carga** — em vez de investir em equipamentos hiperespecializados para uma única carga, prioriza-se a capacidade de adaptação a variações no mix de produtos e volumes ao longo do tempo.

Outros princípios complementares (não confundir entre si): **redução de distâncias** (encurtar trajetos de movimentação), **manutenção da sequência das operações** (organizar o fluxo em ordem lógica), **segurança e redução de fadiga** (proteger o trabalhador), e **utilização máxima dos equipamentos** (evitar ociosidade de máquinas caras). Cada um desses é um princípio distinto — a lei da FLEXIBILIDADE, especificamente, é sobre versatilidade do equipamento frente a diferentes cargas, não sobre distância, segurança ou sequência.

## 4. Movimentação eficiente: reduzir sem transferir risco

Uma movimentação eficiente reduz **distância**, **espera**, **manuseios** (número de vezes que a carga é tocada/movida) e **danos** — mas isso deve ser feito **sem transferir o risco ao trabalhador**. Um erro de projeto comum é "otimizar" o processo às custas da ergonomia do operador (ex.: eliminar um equipamento e exigir esforço manual maior) — isso não é eficiência real, é apenas deslocamento do custo/risco para a saúde do trabalhador.

## 5. Paletização: vantagens e a desvantagem real

A **paletização** (uso de paletes como unidade de carga) traz vantagens conhecidas: **maior densidade** de armazenamento, **rapidez** no manuseio, melhor uso do **espaço vertical**, e **redução de custos de manuseio** (menos manuseios individuais, mais movimentação em bloco).

**Desvantagem real**: o **maior custo operacional decorrente da vida útil limitada dos paletes** — paletes se desgastam, quebram e precisam ser substituídos ou reparados periodicamente, gerando um custo contínuo de manutenção do próprio ativo de paletização.

**Pegadinha clássica**: listar as vantagens conhecidas (densidade, rapidez, espaço vertical, menor custo de manuseio) como se fossem a "desvantagem" perguntada — a desvantagem real e específica é o custo pela vida útil limitada dos paletes.

## 6. Segurança e requisitos operacionais

A escolha e operação de equipamentos de movimentação deve considerar: **ergonomia** (adequação ao corpo humano), **estabilidade** (evitar tombamento com carga), **capacidade nominal** (nunca exceder o limite de carga do equipamento) e **inspeção periódica** (detectar desgaste antes de falhas).

## Síntese

O AC-14 exige, acima de tudo, saber diferenciar equipamento de movimentação de estrutura de armazenamento (empilhadeira x palete), reconhecer a lei da flexibilidade entre os princípios clássicos, e saber que a desvantagem real da paletização é o custo pela vida útil limitada dos paletes, não algo relacionado às suas (numerosas) vantagens.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Manuseio de Materiais — AC-14))
    Movimentacao x Armazenamento
      Movimentacao: empilhadeira, transportador, guindaste
      Armazenamento: palete, estanteria
    Tipos de equipamento
      Transportador continuo: fluxo repetitivo
      Empilhadeira: flexibilidade
      Guindaste: icamento
      AGV: rota guiada fixa
      AMR: navegacao autonoma
      AS-RS: automatiza guarda/recuperacao
    Principios classicos
      Lei da flexibilidade: equipamento versatil
      Reducao de distancia, sequencia, seguranca
    Movimentacao eficiente
      Reduz distancia/espera/manuseio/dano
      Sem transferir risco ao trabalhador
    Paletizacao
      Vantagens: densidade, rapidez, espaco vertical
      Desvantagem real: vida util limitada do palete
\`\`\``,
  mustMemorize: [
    `Equipamentos de MOVIMENTAÇÃO deslocam cargas (empilhadeira, transportador, guindaste). Estruturas de ARMAZENAMENTO servem de apoio (palete, estanteria).`,
    `A lei da FLEXIBILIDADE recomenda equipamentos versáteis, capazes de manusear diferentes tipos de carga.`,
    `Movimentação eficiente reduz distância/espera/manuseios/danos SEM transferir risco ao trabalhador.`,
    `Desvantagem real da paletização = maior custo operacional pela VIDA ÚTIL LIMITADA dos paletes (não densidade, rapidez, espaço vertical ou custo de manuseio, que são vantagens).`,
    `Transportador contínuo = fluxo repetitivo. Empilhadeira = flexibilidade. Guindaste = içamento. AGV = rota guiada fixa. AMR = navegação autônoma.`,
  ],
  workedExamples: [
    `Empilhadeiras são equipamentos de MOVIMENTAÇÃO (deslocam cargas), enquanto paletes são unidades/estruturas de ARMAZENAMENTO (base de apoio para as cargas armazenadas).`,
    `A lei da flexibilidade, entre os princípios clássicos de movimentação de materiais, recomenda o uso de equipamentos versáteis, capazes de manusear diferentes tipos de carga.`,
    `O maior custo operacional decorrente da vida útil limitada dos paletes é uma desvantagem da paletização; as demais características (maior densidade, rapidez, uso de espaço vertical, redução de custos de manuseio) são vantagens.`,
  ],
  commonMistakes: [
    `Trocar equipamento de movimentação por estrutura de armazenamento numa questão que pede o par correto — empilhadeira movimenta; palete armazena/serve de base.`,
    `Confundir a lei da flexibilidade (equipamento versátil para diferentes cargas) com outros princípios distintos (redução de distância, sequência de operações, segurança/fadiga, utilização máxima do equipamento).`,
    `Achar que "eficiência" na movimentação justifica transferir esforço/risco ao trabalhador — eficiência real reduz distância/manuseios SEM aumentar risco humano.`,
    `Listar vantagens conhecidas da paletização (densidade, rapidez, espaço vertical, custo de manuseio) como se fossem a desvantagem perguntada — a desvantagem real é o custo pela vida útil limitada do palete.`,
    `Confundir AGV (rota guiada fixa) com AMR (navegação autônoma e adaptativa) — são níveis diferentes de automação de movimentação.`,
    `Padrão observado no acervo real (AC-14-2012-CESGRANRIO-27): identificar empilhadeiras como equipamento de movimentação e paletes como estrutura de armazenamento, no par correto pedido pela questão.`,
    `Padrão observado no acervo real (AC-14-2011-CESGRANRIO-59): reconhecer a lei da flexibilidade como o princípio que recomenda equipamentos versáteis para diferentes tipos de carga.`,
    `Padrão observado no acervo real (AC-14-2011-CESGRANRIO-60): identificar o custo pela vida útil limitada dos paletes como a desvantagem real da paletização, descartando as vantagens como distratores.`,
  ],
  howBoardMightAsk: [
    `Pede um par de equipamentos "de movimentação e de armazenamento, respectivamente", com distratores que misturam dois equipamentos da mesma categoria.`,
    `Descreve um dos princípios clássicos de movimentação e pede seu nome (lei da flexibilidade, redução de distância, etc.), com os demais princípios como distratores.`,
    `Pede a desvantagem real da paletização, com as vantagens conhecidas como distratores.`,
    `Descreve o modo de navegação de um veículo automatizado e pede se é AGV ou AMR.`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `Movimentação desloca (empilhadeira, transportador). Armazenamento serve de apoio (palete, estanteria).`,
    `Lei da flexibilidade = equipamento versátil para cargas diferentes.`,
    `Eficiência não deve transferir risco ao trabalhador.`,
    `Desvantagem da paletização = vida útil limitada dos paletes.`,
    `AGV = rota fixa guiada. AMR = navegação autônoma.`,
  ],
  flashcards: [
    { front: "Empilhadeira e palete: qual é equipamento de movimentação e qual de armazenamento?", back: "Empilhadeira = movimentação (desloca a carga). Palete = armazenamento (serve de base de apoio)." },
    { front: "O que recomenda a lei da flexibilidade em movimentação de materiais?", back: "O uso de equipamentos versáteis, capazes de manusear diferentes tipos de carga." },
    { front: "Qual é a desvantagem real da paletização?", back: "O maior custo operacional decorrente da vida útil limitada dos paletes — não suas vantagens (densidade, rapidez, espaço vertical, custo de manuseio)." },
    { front: "Diferença entre AGV e AMR?", back: "AGV segue rota guiada fixa (fios/marcações). AMR navega de forma autônoma e adaptativa, desviando de obstáculos dinamicamente." },
  ],
  miniQuiz: [
    {
      statement: `Os equipamentos de movimentação devem ser escolhidos dentro de um planejamento global que envolve as características dos materiais, suas formas de acondicionamento e o fluxo dos materiais no armazém. A escolha dos equipamentos de movimentação e armazenamento varia em função das características da movimentação e da carga.

São equipamentos de movimentação e de armazenamento, respectivamente,`,
      options: [
        { key: "A", text: `contêineres e paleteiras`, isCorrect: false, explanation: `A ordem está invertida em relação à função: contêineres tendem a servir de unidade de carga/armazenamento quando parados, e paleteiras são equipamento de movimentação — o par não corresponde à ordem "movimentação e armazenamento" pedida.` },
        { key: "B", text: `empilhadeiras e tratores`, isCorrect: false, explanation: `Ambos são equipamentos de MOVIMENTAÇÃO — a questão pede um par com funções diferentes (movimentação E armazenamento).` },
        { key: "C", text: `empilhadeiras e paletes`, isCorrect: true, explanation: `Correto: empilhadeiras são equipamentos de movimentação (deslocam cargas), enquanto paletes são unidades/estruturas de armazenamento (base de apoio para as cargas armazenadas).` },
        { key: "D", text: `paleteiras e tratores`, isCorrect: false, explanation: `Ambos são equipamentos de MOVIMENTAÇÃO — não há um item de armazenamento nesse par.` },
        { key: "E", text: `paletes e estanterias`, isCorrect: false, explanation: `Ambos são estruturas de ARMAZENAMENTO — não há um item de movimentação nesse par.` },
      ],
    },
    {
      statement: `A eficiência do projeto de um sistema de movimentação e transporte de materiais deve seguir algumas recomendações, tal como a citada na lei da flexibilidade, que indica a necessidade de`,
      options: [
        { key: "A", text: `construir as trajetórias de movimentação dos materiais, de forma a manter a sequência das operações.`, isCorrect: false, explanation: `Essa descrição corresponde a um princípio de sequenciamento das operações, não à lei da flexibilidade, que trata da versatilidade do equipamento.` },
        { key: "B", text: `reduzir as distâncias na movimentação e no transporte.`, isCorrect: false, explanation: `Essa descrição corresponde ao princípio de redução de distâncias, um princípio distinto da lei da flexibilidade.` },
        { key: "C", text: `manter a segurança dos empregados e reduzir a fadiga no trabalho.`, isCorrect: false, explanation: `Essa descrição corresponde a um princípio de segurança/ergonomia, não à lei da flexibilidade especificamente.` },
        { key: "D", text: `utilizar equipamentos que possam ser usados na movimentação e no transporte de vários tipos de cargas.`, isCorrect: true, explanation: `Correto: a lei da flexibilidade recomenda o uso de equipamentos versáteis, capazes de manusear diferentes tipos de carga.` },
        { key: "E", text: `utilizar ao máximo os equipamentos.`, isCorrect: false, explanation: `Essa descrição corresponde a um princípio de utilização máxima dos equipamentos (evitar ociosidade), distinto da lei da flexibilidade.` },
      ],
    },
  ],
};
