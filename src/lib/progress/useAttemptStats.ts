"use client";

import { useEffect, useState } from "react";
import { getDB } from "@/lib/db/dexie";
import { DEFAULT_STUDENT_ID } from "@/lib/models/schema";

export interface SubjectAccuracy {
  total: number;
  correct: number;
  accuracy: number; // 0-100
}

export interface AttemptStats {
  totalAttempts: number;
  totalCorrect: number;
  overallAccuracy: number; // 0-100
  bySubject: Record<string, SubjectAccuracy>;
}

const EMPTY_STATS: AttemptStats = { totalAttempts: 0, totalCorrect: 0, overallAccuracy: 0, bySubject: {} };

/** Lê o histórico real de tentativas de questão (`attempts`, gravado por `recordAttempt` no
 * serviço pedagógico central) e agrega acerto/erro geral e por disciplina. Só leitura — não
 * recalcula nem substitui a Fundação de Dados do Professor (mastery/reviewSchedules), é uma visão
 * simples pra exibição num painel de desempenho. */
export function useAttemptStats(): { stats: AttemptStats; refresh: () => Promise<void> } {
  const [stats, setStats] = useState<AttemptStats>(EMPTY_STATS);

  async function refresh() {
    const db = getDB();
    const attempts = await db.attempts.where({ studentId: DEFAULT_STUDENT_ID }).toArray();
    const bySubject: Record<string, SubjectAccuracy> = {};
    let totalCorrect = 0;
    for (const a of attempts) {
      if (a.isCorrect) totalCorrect++;
      const key = a.subjectSlug ?? "outros";
      if (!bySubject[key]) bySubject[key] = { total: 0, correct: 0, accuracy: 0 };
      bySubject[key].total++;
      if (a.isCorrect) bySubject[key].correct++;
    }
    for (const key of Object.keys(bySubject)) {
      const s = bySubject[key];
      s.accuracy = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
    }
    setStats({
      totalAttempts: attempts.length,
      totalCorrect,
      overallAccuracy: attempts.length > 0 ? Math.round((totalCorrect / attempts.length) * 100) : 0,
      bySubject,
    });
  }

  useEffect(() => {
    refresh();
  }, []);

  return { stats, refresh };
}
