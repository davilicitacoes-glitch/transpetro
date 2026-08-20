/**
 * Definições JSON das ferramentas (function calling) que o Professor pode acionar — seção 6 do
 * PROMPT 6. Este arquivo NÃO importa nada do Dexie/pedagogia: é seguro de importar tanto no
 * servidor (para montar a chamada à OpenAI) quanto no cliente (para saber o que executar).
 * A execução de verdade fica em `toolExecutors.ts` (roda só no navegador, onde o Dexie existe).
 */

export interface ProfessorToolSchema {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: {
      type: "object";
      properties: Record<string, unknown>;
      required: string[];
    };
  };
  /** "confirm" = o cliente deve pedir confirmação explícita do aluno antes de persistir como
   * definitivo (seção 6/12). "auto" = pode executar e gravar direto (leitura, ou escrita de baixo
   * risco/reversível como agendar uma revisão). */
  risk: "auto" | "confirm";
}

export const PROFESSOR_TOOLS: ProfessorToolSchema[] = [
  {
    type: "function",
    risk: "auto",
    function: {
      name: "obter_contexto_professor",
      description:
        "Retorna o ProfessorContext atual do aluno (revisões pendentes, dificuldades abertas, domínio por tópico, desempenho recente). Use quando precisar de dados mais recentes do que os fornecidos no início da conversa.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    risk: "auto",
    function: {
      name: "obter_detalhe_dificuldade",
      description: "Retorna o detalhe de uma dificuldade/erro específico, com as tentativas (evidências) que a comprovam.",
      parameters: {
        type: "object",
        properties: { dificuldadeId: { type: "string", description: "ID da ErrorEntry (dificuldade)." } },
        required: ["dificuldadeId"],
      },
    },
  },
  {
    type: "function",
    risk: "auto",
    function: {
      name: "obter_revisoes_pendentes",
      description: "Lista as revisões vencidas, disponíveis hoje e futuras do aluno.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    risk: "auto",
    function: {
      name: "propor_agendar_revisao",
      description:
        "Agenda (ou reutiliza, se já existir) uma revisão espaçada para um tópico ou dificuldade específica. Ação reversível e de baixo risco — pode ser executada direto, sem confirmação do aluno.",
      parameters: {
        type: "object",
        properties: {
          topicSlug: { type: "string", description: "Slug do tópico a revisar." },
          motivo: { type: "string", description: "Por que esta revisão está sendo proposta agora." },
          dificuldadeId: { type: "string", description: "ID da ErrorEntry relacionada, se houver." },
        },
        required: ["topicSlug", "motivo"],
      },
    },
  },
  {
    type: "function",
    risk: "auto",
    function: {
      name: "propor_plano_de_reforco",
      description: "Monta uma lista estruturada de ações recomendadas (revisar aula X, resolver N questões do código Y etc.) a partir de dificuldades e domínio reais.",
      parameters: {
        type: "object",
        properties: {
          itens: {
            type: "array",
            description: "Lista de ações recomendadas.",
            items: {
              type: "object",
              properties: {
                acao: { type: "string", enum: ["revisar_aula", "resolver_questoes", "realizar_teste", "retomar_redacao", "agendar_revisao"] },
                topicSlug: { type: "string" },
                motivo: { type: "string" },
              },
              required: ["acao", "topicSlug", "motivo"],
            },
          },
        },
        required: ["itens"],
      },
    },
  },
  {
    type: "function",
    risk: "auto",
    function: {
      name: "registrar_duvida_resolvida",
      description: "Marca uma dúvida do aluno como resolvida, vinculada ao contexto exato (aula/tópico) discutido nesta conversa.",
      parameters: {
        type: "object",
        properties: {
          topicSlug: { type: "string" },
          resumoResolucao: { type: "string", description: "Resumo curto de como a dúvida foi esclarecida." },
        },
        required: ["topicSlug", "resumoResolucao"],
      },
    },
  },
  {
    type: "function",
    risk: "confirm",
    function: {
      name: "propor_classificacao_erro",
      description:
        "Propõe classificar a natureza de um erro já registrado (desconhecimento, confusão conceitual, interpretação, desatenção, cálculo/procedimento, esquecimento, gestão de tempo, outro). SEMPRE uma inferência da IA, nunca fato definitivo — exige confirmação do aluno antes de ser persistida.",
      parameters: {
        type: "object",
        properties: {
          dificuldadeId: { type: "string" },
          natureza: {
            type: "string",
            enum: ["desconhecimento_conteudo", "confusao_conceitual", "erro_interpretacao", "desatencao", "erro_calculo_procedimento", "esquecimento", "gestao_tempo", "outro"],
          },
          confianca: { type: "number", description: "0 a 1 — confiança da inferência." },
          justificativa: { type: "string" },
        },
        required: ["dificuldadeId", "natureza", "confianca", "justificativa"],
      },
    },
  },
  {
    type: "function",
    risk: "auto",
    function: {
      name: "solicitar_conjunto_de_questoes",
      description: "Pede um conjunto de questões reais do banco voltado a um código/tópico específico, para usar dentro da própria conversa (ex.: em 'Me teste agora').",
      parameters: {
        type: "object",
        properties: {
          topicSlug: { type: "string" },
          quantidade: { type: "number", description: "Quantas questões pedir (padrão 3, máximo 10)." },
        },
        required: ["topicSlug"],
      },
    },
  },
  {
    type: "function",
    risk: "confirm",
    function: {
      name: "registrar_resultado_teste_oral",
      description:
        "Ao final de uma sessão 'Me teste agora', grava a consequência pedagógica: domínio observado, dificuldade identificada, revisão necessária. Exige confirmação do aluno quando o resultado indica domínio ('dominei este assunto') — nunca marca algo como dominado sem essa confirmação explícita.",
      parameters: {
        type: "object",
        properties: {
          topicSlug: { type: "string" },
          resultado: { type: "string", enum: ["dominado", "duvida", "erro"] },
          resumo: { type: "string", description: "O que o aluno demonstrou saber e o que ainda falta." },
        },
        required: ["topicSlug", "resultado", "resumo"],
      },
    },
  },
  {
    type: "function",
    risk: "confirm",
    function: {
      name: "registrar_avaliacao_redacao",
      description:
        "Grava o resultado estruturado da correção/orientação de uma redação, por critério da rubrica oficial (tipologia, abordagem, coerência/coesão, morfossintaxe, acentuação/ortografia), vinculado à versão do texto. Exige confirmação do aluno antes de ser persistida como definitiva.",
      parameters: {
        type: "object",
        properties: {
          essaySubmissionId: { type: "string" },
          tipologia: { type: "number" },
          abordagem: { type: "number" },
          coerenciaCoesao: { type: "number" },
          morfossintaxe: { type: "number" },
          acentuacaoOrtografia: { type: "number" },
          feedback: { type: "string" },
        },
        required: ["essaySubmissionId", "tipologia", "abordagem", "coerenciaCoesao", "morfossintaxe", "acentuacaoOrtografia", "feedback"],
      },
    },
  },
];

export function findToolSchema(name: string): ProfessorToolSchema | undefined {
  return PROFESSOR_TOOLS.find((t) => t.function.name === name);
}
