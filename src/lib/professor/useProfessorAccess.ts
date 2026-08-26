"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isOwnerEmail } from "@config/access";

/** true assim que confirmarmos que esta conta pode ver/usar o Professor — usado para esconder o
 * item de navegação e para o gate real em ProfessorAccessGate (fonte única de verdade). */
export function useProfessorAccess(): boolean {
  const { user, loading, configured } = useAuth();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (loading || !configured || !user) {
      setAllowed(false);
      return;
    }
    if (isOwnerEmail(user.email)) {
      setAllowed(true);
      return;
    }
    let cancelled = false;
    (async () => {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase.from("profiles").select("professor_access").eq("id", user.id).maybeSingle();
      if (!cancelled) setAllowed(Boolean(data?.professor_access));
    })();
    return () => {
      cancelled = true;
    };
  }, [user, loading, configured]);

  return allowed;
}
