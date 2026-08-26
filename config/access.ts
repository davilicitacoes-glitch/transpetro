/**
 * Controle de acesso da conta administradora (dona do curso). O Professor (IA) é restrito por
 * padrão: só quem bate com OWNER_EMAIL tem acesso automático; para liberar outra conta específica,
 * marque `professor_access = true` na linha dela na tabela `profiles` do Supabase (painel do
 * projeto, ou SQL Editor) — ver instrução no final de supabase/migrations/0001_init.sql.
 */
export const OWNER_EMAIL = "dsena089@gmail.com";

export function isOwnerEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === OWNER_EMAIL.toLowerCase();
}
