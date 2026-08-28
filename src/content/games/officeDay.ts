import type { GameEpisode } from "@/lib/games/types";

/**
 * "Um Dia no Escritório" — primeiro jogo temático do ENSIPETRO. Conteúdo desta primeira entrega:
 * 2 "dias de trabalho" completos (4 códigos no total), escolhidos por terem material rico já
 * validado (Prompt 10: aula + resumo + pegadinhas; Prompt 9: banco de questões reais/inéditas).
 *
 * REGRA DE OURO (seção 0 do prompt): toda `questionId` abaixo aponta pra uma Question REAL já no
 * banco (`src/content/questions/index.ts`) — nunca um enunciado/alternativa inventado pro jogo. O
 * texto narrativo (e-mail intro, fala do colega, situação da decisão) é só ambientação de
 * escritório; verificável em `question.source` (banca/órgão/ano para questões reais, "inedita"
 * para as do miniquiz de aula) e `question.topicSlug`.
 */
export const OFFICE_DAY_EPISODES: GameEpisode[] = [
  {
    id: "rh-e-processos",
    gameId: "um-dia-no-escritorio",
    title: "RH e Processos",
    description: "Um dia cuidando de pessoas e dos sistemas de gestão do escritório.",
    syllabusCodes: ["AC-01", "AC-02"],
    topicSlugs: ["ac-01-recursos-humanos", "ac-02-sistema-gestao-integrado"],
    scenes: [
      {
        id: "chegada",
        kind: "chegada",
        local: "corredor",
        title: "Chegada ao escritório",
        narrative:
          "Você chega ao escritório de Administração e Controle. Hoje o dia promete: um e-mail sobre educação corporativa te espera, e depois vai rolar uma reunião sobre os sistemas de gestão.",
      },
      {
        id: "email-educacao-corporativa",
        kind: "tarefa",
        local: "mesa",
        title: "Um e-mail sobre educação corporativa",
        narrative: "Você senta na sua mesa e abre o e-mail.",
        task: {
          kind: "email",
          questionId: "AC-01-2012-CESGRANRIO-22",
          remetente: "Coordenação de Desenvolvimento Humano",
          assunto: "Parecer sobre educação corporativa",
          intro:
            "Bom dia! Estamos revisando nossa política de educação corporativa e preciso do seu parecer técnico sobre o seguinte ponto:",
        },
      },
      {
        id: "colega-avaliacao-360",
        kind: "tarefa",
        local: "corredor",
        title: "Um colega te intercepta no corredor",
        narrative: "No caminho pra sala de reunião, um colega te chama.",
        task: {
          kind: "colega",
          questionId: "q-ac-01-recursos-humanos-2",
          colega: "Rafael, do RH",
          falaAbertura: "Ei, rapidinho: você lembra qual é o nome daquele formato de avaliação que pega feedback de todo mundo ao redor?",
        },
      },
      {
        id: "email-erp",
        kind: "tarefa",
        local: "mesa",
        title: "Dúvida sobre o sistema ERP",
        narrative: "De volta à mesa, chega outro e-mail — dessa vez de TI.",
        task: {
          kind: "email",
          questionId: "AC-02-2018-CESGRANRIO-21",
          remetente: "Equipe de TI",
          assunto: "Nível de dados no nosso ERP",
          intro: "Estamos documentando a arquitetura do nosso ERP. Você sabe responder:",
        },
      },
      {
        id: "decisao-controle-qualidade",
        kind: "tarefa",
        local: "sala_reuniao",
        title: "Reunião: qual ferramenta de controle usar?",
        narrative: "Na sala de reunião, o time de qualidade pede sua decisão sobre qual conceito aplicar.",
        task: {
          kind: "decisao",
          questionId: "AC-02-2012-CESGRANRIO-21",
          situacao: "O time de qualidade quer saber qual ferramenta, entre as opções, é de fato um conceito ESTATÍSTICO de controle de qualidade.",
        },
      },
      {
        id: "fechamento",
        kind: "fechamento",
        local: "corredor",
        title: "Fim do expediente",
        narrative: "Você bate o ponto de saída. Foi um dia cheio de RH e sistemas de gestão — hora de ver como você se saiu.",
      },
    ],
  },
  {
    id: "compras-e-estoques",
    gameId: "um-dia-no-escritorio",
    title: "Compras e Estoques",
    description: "Um dia entre pedidos de compra e planejamento de estoque.",
    syllabusCodes: ["AC-16", "AC-12"],
    topicSlugs: ["ac-16-gestao-compras", "ac-12-gestao-estoques"],
    scenes: [
      {
        id: "chegada",
        kind: "chegada",
        local: "corredor",
        title: "Chegada ao escritório",
        narrative:
          "Hoje é dia de Compras e Estoques. Sua caixa de entrada já está cheia de pedidos de compra e planilhas de previsão.",
      },
      {
        id: "email-compras-investimento",
        kind: "tarefa",
        local: "mesa",
        title: "Classificando um pedido de compra",
        narrative: "Você senta na mesa e abre o primeiro e-mail do dia.",
        task: {
          kind: "email",
          questionId: "AC-16-2012-CESGRANRIO-39",
          remetente: "Área de Compras",
          assunto: "Classificação de compra",
          intro: "Preciso que você classifique corretamente este tipo de aquisição, de acordo com a função compras:",
        },
      },
      {
        id: "colega-cadastro-fornecedor",
        kind: "tarefa",
        local: "corredor",
        title: "Uma dúvida sobre cadastro de fornecedores",
        narrative: "No corredor, um colega novo no setor te aborda.",
        task: {
          kind: "colega",
          questionId: "AC-16-2011-CESGRANRIO-21",
          colega: "Bianca, estagiária de Compras",
          falaAbertura: "Oi! Terminei de organizar o cadastro de fornecedores, mas fiquei em dúvida sobre uma informação. Você confere?",
        },
      },
      {
        id: "email-lote-economico",
        kind: "tarefa",
        local: "mesa",
        title: "Cálculo do Lote Econômico de Compras",
        narrative: "Chega um e-mail da área de Estoques pedindo um cálculo.",
        task: {
          kind: "email",
          questionId: "AC-12-2012-CESGRANRIO-31",
          remetente: "Área de Estoques",
          assunto: "Cálculo do LEC — açúcar",
          intro: "Preciso que você confirme a expressão certa pra calcular o Lote Econômico de Compras deste item:",
        },
      },
      {
        id: "decisao-modelo-previsao",
        kind: "tarefa",
        local: "sala_reuniao",
        title: "Reunião: qual modelo de previsão usar?",
        narrative: "Na sala de reunião, o time de planejamento pede sua decisão sobre o modelo de previsão de estoque.",
        task: {
          kind: "decisao",
          questionId: "AC-12-2012-CESGRANRIO-34",
          situacao: "O time quer saber qual modelo quantitativo de previsão se apoia em tendência, ciclicidade e aleatoriedade.",
        },
      },
      {
        id: "fechamento",
        kind: "fechamento",
        local: "corredor",
        title: "Fim do expediente",
        narrative: "Mais um dia de compras e estoques concluído. Vamos ver como foi seu desempenho.",
      },
    ],
  },
];
