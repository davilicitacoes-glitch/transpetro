"use client";

import { useEffect, useState } from "react";
import { getDB } from "@/lib/db/dexie";
import { DEFAULT_STUDENT_ID } from "@/lib/models/schema";

const LEGACY_PROGRESS_PREFIX = "__progress__";

/** @deprecated Mantido só para a migração de dados antigos gravados antes da memória pedagógica. */
export function progressKey(lessonSlug: string): string {
  return `${LEGACY_PROGRESS_PREFIX}${lessonSlug}`;
}

/**
 * Lê o conjunto de slugs de aula concluídos. Fonte de verdade atual: `learningEvents` (kind
 * "aula_concluida"), gravado por `recordLessonCompleted` no serviço pedagógico central. Também
 * lê os marcadores antigos em `notes` (gravados antes desta missão, prefixo `__progress__`) e os
 * inclui na união — nenhum dado local existente é perdido pela migração, mas nenhuma escrita nova
 * passa a usar `notes` para isso.
 */
export function useCompletedLessons(): { completed: Set<string>; refresh: () => Promise<void> } {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  async function refresh() {
    const db = getDB();
    const [events, legacyNotes] = await Promise.all([
      db.learningEvents.where({ studentId: DEFAULT_STUDENT_ID, kind: "aula_concluida" }).toArray(),
      db.notes.where("lessonSlug").startsWith(LEGACY_PROGRESS_PREFIX).toArray(),
    ]);
    const fromEvents = events.map((e) => e.activityId).filter((x): x is string => !!x);
    const fromLegacy = legacyNotes.map((n) => (n.lessonSlug ?? "").replace(LEGACY_PROGRESS_PREFIX, ""));
    setCompleted(new Set([...fromEvents, ...fromLegacy]));
  }

  useEffect(() => {
    refresh();
  }, []);

  return { completed, refresh };
}
