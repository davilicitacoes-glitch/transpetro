import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isOwnerEmail } from "@config/access";

/** Confere, no servidor, se quem chamou a rota tem acesso ao Professor — dono (OWNER_EMAIL) ou
 * conta liberada manualmente (`profiles.professor_access`). Gatekeeping só na UI (ProfessorAccessGate)
 * não impede uma chamada direta às rotas /api/professor/*; este check fecha essa brecha. */
export async function hasProfessorAccess(): Promise<boolean> {
  try {
    const supabase = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;
    if (isOwnerEmail(user.email)) return true;
    const { data } = await supabase.from("profiles").select("professor_access").eq("id", user.id).maybeSingle();
    return Boolean(data?.professor_access);
  } catch {
    return false;
  }
}
