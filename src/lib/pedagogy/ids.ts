/** Gera um ID único e razoavelmente ordenável no tempo, sem depender de biblioteca externa. */
export function newId(prefix: string): string {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}_${rand}`;
}

/**
 * Chave de idempotência gerada no cliente no momento do envio de uma ação (resposta de questão,
 * conclusão de evento etc.). Tabelas com índice único nesta chave (ver `dexie.ts`) garantem que
 * um reenvio — duplo clique, retry de rede — nunca produz um segundo registro.
 */
export function newIdempotencyKey(): string {
  return newId("idem");
}

export function nowIso(): string {
  return new Date().toISOString();
}
