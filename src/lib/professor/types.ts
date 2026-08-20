/** Tipos compartilhados entre o cliente (executa ferramentas, tem acesso ao Dexie) e a rota de
 * servidor (fala com a OpenAI, nunca acessa dados do aluno diretamente). */

export type ProfessorFunction =
  | "conversar"
  | "revisar_erros"
  | "tirar_duvida"
  | "me_teste_agora"
  | "plano_de_reforco"
  | "corrigir_redacao";

export interface ProfessorChatMessage {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  /** Presente só em mensagens role="tool": nome da ferramenta e id da chamada que ela responde. */
  toolCallId?: string;
  toolName?: string;
}

export interface ProfessorToolCallRequest {
  id: string;
  name: string;
  /** Argumentos já parseados (JSON.parse do que o modelo devolveu). */
  arguments: Record<string, unknown>;
}

/** Resposta da rota de servidor a um turno: ou o modelo quer texto final, ou pediu ferramenta(s). */
export type ProfessorTurnResult =
  | { type: "message"; content: string }
  | { type: "tool_calls"; calls: ProfessorToolCallRequest[]; assistantContent: string | null };

/** Nível de risco de uma ferramenta — define se o cliente pode executar direto ou precisa
 * confirmação explícita do aluno antes de persistir o resultado como definitivo (seção 6/12 do
 * PROMPT 6). Ferramentas só de leitura são sempre "auto". */
export type ProfessorToolRisk = "auto" | "confirm";
