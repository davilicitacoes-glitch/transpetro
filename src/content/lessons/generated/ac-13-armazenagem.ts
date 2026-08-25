import type { LessonContent } from "@/content/lessonTypes";

export const AC_13_ARMAZENAGEM: LessonContent = {
  slug: "ac-13-armazenagem",
  topicSlug: "ac-13-armazenagem",
  subjectSlug: "especificas",
  moduleSlug: "especificas-logistica-cadeia-suprimentos",
  title: `Armazenagem`,
  learningObjective: `Diferenciar estocagem fixa (má distribuição de espaço) de livre/aleatória (otimiza uso), entender as funções e serviços típicos de um armazém, o impacto do e-commerce B2C sobre o custo de armazenagem do produto final, e o papel central do picking nas operações internas — a Cesgranrio gosta de listar um serviço "intruso" (fora do escopo de armazenagem) e pedir para identificá-lo.`,
  syllabusCodes: ["AC-13"],
  estimatedMinutes: 40,
  expectedMastery: "intermediario",
  bodyMdx: `# AC-13 — Armazenagem

## 1. Funções do armazém: recebimento, guarda, separação e expedição

O ciclo básico de armazenagem passa por quatro etapas:

- **Recebimento**: confere **documento**, **quantidade**, **qualidade** e **condição** física da carga **antes** de autorizar a guarda — pular essa conferência propaga erros do fornecedor para dentro do estoque.
- **Guarda**: armazenamento físico, seguindo o sistema de endereçamento definido.
- **Separação (picking)**: retirada dos itens do estoque para atender pedidos.
- **Expedição**: preparação e despacho da carga separada para o destino final.

## 2. Sistema de estocagem fixa x livre (aleatória)

- **Estocagem fixa**: cada item tem um **local determinado** independentemente do volume presente naquele momento — o espaço é reservado para aquele item mesmo quando ele está com baixo estoque.
- **Estocagem livre (aleatória)**: usa **posições disponíveis** conforme necessário, controlada por sistema (WMS), sem reservar espaço fixo por item.

**Desvantagem da estocagem fixa**: pode gerar **má distribuição/aproveitamento das áreas de armazenagem** quando o volume de itens varia ao longo do tempo — um item com espaço reservado grande, mas estoque baixo no momento, deixa espaço ocioso, enquanto outro item pode não ter espaço suficiente. A estocagem livre resolve isso ao realocar dinamicamente o espaço conforme a necessidade real.

**Pegadinha clássica**: atribuir à estocagem fixa desvantagens que não são dela (quebra no transporte, depreciação, roubo) — a desvantagem característica e específica da estocagem fixa é a má distribuição do espaço, não riscos de transporte ou perda física.

## 3. Serviços típicos de um armazém — o que É e o que NÃO é

Os armazéns prestam serviços como **abrigo**, **consolidação** (juntar cargas menores numa maior), **transbordo** e **fracionamento** de cargas (dividir uma carga grande em menores). A **manutenção da frota de veículos**, por outro lado, **não é um serviço típico de armazenagem** — pertence à gestão de transporte, uma função logística distinta.

**Pegadinha clássica**: incluir manutenção de frota entre os "serviços de armazém" numa lista — é o item que não pertence ao escopo de armazenagem.

## 4. Impacto do e-commerce (B2C) sobre o custo de armazenagem

A venda direta ao consumidor via comércio eletrônico (**B2C**) **reduz a necessidade de manter estoques de produtos finais em pontos de venda intermediários** (lojas físicas, distribuidores regionais) — o produto vai direto do centro de distribuição/fabricante ao consumidor. Isso reduz diretamente o **custo de armazenagem do PRODUTO FINAL**, especificamente — não afeta da mesma forma o custo de armazenagem de matéria-prima ou produtos em processo, que continuam sendo necessários para a produção.

## 5. Layout e aproveitamento cúbico

Um bom layout de armazém deve **reduzir deslocamentos**, **evitar conflitos de fluxo** (cruzamento de operações de entrada e saída) e **minimizar manuseios** desnecessários, ao mesmo tempo em que aproveita o **volume disponível** (altura, não só área do piso) com segurança — desperdiçar altura útil é um erro comum de projeto de armazém.

## 6. Endereçamento e localização

- **Endereçamento fixo**: reserva uma posição específica para cada item (ligado à estocagem fixa).
- **Endereçamento aleatório/dinâmico**: usa posições disponíveis, controladas por sistema (ligado à estocagem livre).

## 7. Cross-docking e Picking

- **Cross-docking**: reduz ou **elimina a estocagem** entre o recebimento e a expedição — a carga chega, é reorganizada e sai quase imediatamente, sem passar pelo processo tradicional de guarda em estoque.
- **Picking (separação de pedidos)**: uma das atividades **centrais** do processo de armazenagem, consumindo tipicamente cerca de **1/3 do tempo total** das operações internas de um armazém — é por isso que otimizar o picking (métodos discreto, por lote, por zona, por onda) tem impacto desproporcional na eficiência geral do armazém.

## 8. Tecnologia de apoio

O **WMS** coordena endereços e tarefas de forma sistêmica. Importante: **automação não corrige processo mal desenhado** — automatizar um fluxo ineficiente só faz o erro acontecer mais rápido; o redesenho do processo precisa vir antes da automação.

## Síntese

O AC-13 exige diferenciar estocagem fixa (má distribuição) de livre (otimizada), reconhecer os serviços que pertencem (e os que NÃO pertencem) ao escopo de armazenagem, entender o impacto específico do e-commerce sobre o custo do produto final, e saber que o picking consome cerca de 1/3 do tempo operacional de um armazém.

## Mapa mental

\`\`\`mermaid
mindmap
  root((Armazenagem — AC-13))
    Ciclo
      Recebimento: confere doc/qtd/qualidade/condicao
      Guarda, Separacao, Expedicao
    Estocagem fixa x livre
      Fixa: local determinado, ma distribuicao
      Livre: posicoes dinamicas, otimiza espaco
    Servicos do armazem
      Abrigo, consolidacao, transbordo, fracionamento
      NAO inclui manutencao de frota
    E-commerce B2C
      Reduz custo de armazenagem do PRODUTO FINAL
    Layout
      Reduz deslocamentos, aproveita volume
    Cross-docking
      Elimina estocagem entre recebimento e expedicao
    Picking
      Consome ~1/3 do tempo operacional
\`\`\``,
  mustMemorize: [
    `Recebimento confere documento, quantidade, qualidade e condição ANTES da guarda.`,
    `Estocagem FIXA: local determinado por item — desvantagem é a MÁ DISTRIBUIÇÃO do espaço. Estocagem LIVRE: posições dinâmicas, otimiza uso.`,
    `Serviços típicos de armazém: abrigo, consolidação, transbordo, fracionamento. Manutenção de frota NÃO é serviço de armazenagem.`,
    `E-commerce B2C reduz o custo de armazenagem do PRODUTO FINAL (não de matéria-prima ou produtos em processo).`,
    `Cross-docking reduz/elimina estocagem entre recebimento e expedição.`,
    `Picking consome cerca de 1/3 do tempo total das operações internas de um armazém.`,
    `Automação NÃO corrige processo mal desenhado — o redesenho vem antes da automação.`,
  ],
  workedExamples: [
    `No sistema de estocagem fixa, cada item tem local determinado independentemente do volume, o que pode gerar má distribuição/aproveitamento das áreas de armazenagem quando o volume de itens varia — diferente do sistema de estocagem livre (aleatória), que otimiza o uso do espaço.`,
    `A venda direta ao consumidor via comércio eletrônico (B2C) reduz a necessidade de manter estoques de produtos finais em pontos de venda intermediários, reduzindo diretamente o custo de armazenagem do produto final.`,
    `Os armazéns prestam serviços de abrigo, consolidação, transbordo e fracionamento de cargas; a manutenção da frota de veículos não é um serviço típico de armazenagem, mas de gestão de transporte.`,
    `O picking (separação de pedidos) é uma das atividades centrais do processo de armazenagem, consumindo tipicamente cerca de 1/3 do tempo total das operações internas de um armazém.`,
  ],
  commonMistakes: [
    `Atribuir à estocagem fixa desvantagens de transporte/perda física (quebra, roubo, depreciação) — a desvantagem específica é a MÁ DISTRIBUIÇÃO do espaço de armazenagem.`,
    `Incluir manutenção de frota entre os serviços de armazenagem — pertence à gestão de transporte, não ao escopo de armazenagem.`,
    `Achar que o e-commerce B2C reduz igualmente o custo de armazenagem de matéria-prima — o impacto direto é especificamente sobre o custo de armazenagem do PRODUTO FINAL.`,
    `Confundir cross-docking (elimina estocagem) com um método normal de armazenagem — o cross-docking é justamente a exceção ao fluxo tradicional de guarda em estoque.`,
    `Subestimar o peso do picking nas operações — é uma das atividades que mais consome tempo (cerca de 1/3) dentro de um armazém, merecendo atenção especial na otimização.`,
    `Padrão observado no acervo real (AC-13-2012-CESGRANRIO-30): identificar a má distribuição do espaço como a desvantagem específica da estocagem fixa em relação à livre.`,
    `Padrão observado no acervo real (AC-13-2012-CESGRANRIO-33): reconhecer que o B2C reduz especificamente o custo de armazenagem do produto final, não de matéria-prima ou produtos em processo.`,
    `Padrão observado no acervo real (AC-13-2018-CESGRANRIO-27): identificar manutenção de frota como o item que NÃO é serviço típico de armazém, entre abrigo/consolidação/transbordo/fracionamento.`,
    `Padrão observado no acervo real (AC-13-2018-CESGRANRIO-28): reconhecer o picking como atividade central que consome cerca de 1/3 do tempo operacional de um armazém.`,
  ],
  howBoardMightAsk: [
    `Pede a desvantagem específica da estocagem fixa em relação à livre, com distratores de riscos de transporte/perda física.`,
    `Lista serviços de armazém e pede para identificar o que NÃO pertence a esse escopo (ex.: manutenção de frota).`,
    `Pergunta qual custo específico (matéria-prima, produto em processo, produto final) é reduzido pelo comércio eletrônico B2C.`,
    `Pede a proporção de tempo que o picking consome nas operações internas de um armazém.`,
  ],
  legalReferences: [],
  reviewSummaryPoints: [
    `Recebimento confere doc/quantidade/qualidade/condição antes da guarda.`,
    `Fixa = má distribuição do espaço. Livre = otimiza uso dinamicamente.`,
    `Serviços de armazém: abrigo, consolidação, transbordo, fracionamento — não manutenção de frota.`,
    `B2C reduz custo de armazenagem do produto final especificamente.`,
    `Cross-docking elimina estocagem entre recebimento e expedição.`,
    `Picking consome ~1/3 do tempo operacional.`,
  ],
  flashcards: [
    { front: "Qual é a desvantagem específica da estocagem fixa em relação à livre?", back: "Má distribuição/aproveitamento das áreas de armazenagem quando o volume de itens varia." },
    { front: "Manutenção de frota é um serviço típico de armazenagem?", back: "Não — pertence à gestão de transporte, não ao escopo de armazenagem (que inclui abrigo, consolidação, transbordo, fracionamento)." },
    { front: "O e-commerce B2C reduz o custo de armazenagem de quê especificamente?", back: "Do produto final — reduz a necessidade de estocá-lo em pontos de venda intermediários." },
    { front: "Quanto do tempo operacional de um armazém o picking consome tipicamente?", back: "Cerca de 1/3 do tempo total das operações internas." },
  ],
  miniQuiz: [
    {
      statement: `Uma desvantagem do sistema de estocagem fixa, em relação ao sistema de estocagem livre, é o risco de`,
      options: [
        { key: "A", text: `não encontrar materiais pedidos.`, isCorrect: false, explanation: `Na estocagem fixa, o local de cada item é conhecido e determinado — o risco de não encontrar materiais é mais associado a sistemas mal controlados de estocagem livre sem WMS adequado, não à fixa.` },
        { key: "B", text: `quebra de materiais no transporte.`, isCorrect: false, explanation: `Quebra durante transporte é um risco logístico geral, não uma desvantagem específica do sistema de estocagem FIXA em comparação com a livre.` },
        { key: "C", text: `depreciação dos materiais em estoque.`, isCorrect: false, explanation: `Depreciação está relacionada ao tempo de permanência em estoque, não é uma consequência específica de o sistema ser fixo em vez de livre.` },
        { key: "D", text: `perda por roubo.`, isCorrect: false, explanation: `Perda por roubo depende de controles de segurança, não é uma desvantagem intrínseca do sistema de estocagem fixa frente ao livre.` },
        { key: "E", text: `má distribuição das áreas de armazenagem.`, isCorrect: true, explanation: `Correto: no sistema de estocagem fixa, cada item tem local determinado independentemente do volume, o que pode gerar má distribuição/aproveitamento das áreas de armazenagem quando o volume de itens varia — diferente da estocagem livre, que otimiza o uso do espaço.` },
      ],
    },
    {
      statement: `O custo de estoque diretamente reduzido pela aplicação de comércio eletrônico na venda direta ao consumidor (B2C) é o custo`,
      options: [
        { key: "A", text: `financeiro da matéria-prima`, isCorrect: false, explanation: `O B2C afeta a distribuição do produto ACABADO ao consumidor final — não reduz diretamente o custo financeiro de manter matéria-prima em estoque.` },
        { key: "B", text: `de depreciação de produtos em processo`, isCorrect: false, explanation: `Produtos em processo (WIP) continuam sendo necessários para a produção, independente do canal de venda ser B2C ou tradicional.` },
        { key: "C", text: `de armazenagem da matéria-prima`, isCorrect: false, explanation: `A necessidade de armazenar matéria-prima para produção não é reduzida pelo canal de venda direta ao consumidor — é uma questão de suprimento, não de distribuição.` },
        { key: "D", text: `de depreciação da matéria-prima`, isCorrect: false, explanation: `A depreciação da matéria-prima está ligada ao tempo de estocagem antes da produção, não ao canal de venda do produto final.` },
        { key: "E", text: `de armazenagem do produto final`, isCorrect: true, explanation: `Correto: a venda direta ao consumidor via B2C reduz a necessidade de manter estoques de produtos finais em pontos de venda intermediários, reduzindo diretamente o custo de armazenagem do produto final.` },
      ],
    },
  ],
};
