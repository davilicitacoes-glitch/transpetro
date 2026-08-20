import { getDB } from "@/lib/db/dexie";
import { DEFAULT_STUDENT_ID } from "@/lib/models/schema";
import {
  syncStudySession,
  syncLearningEvent,
  syncAttempt,
  syncErrorEntry,
  syncReviewSchedule,
  syncReviewAttempt,
  syncMasterySnapshot,
  syncEssaySubmission,
  syncMockExamAttempt,
  syncDoubt,
  syncCourseEnrollment,
  syncCourseDayProgress,
} from "@/lib/supabase/sync";

/**
 * Migração local -> nuvem (seção 8 da missão): existe quando o aluno já tinha progresso real salvo
 * no Dexie ANTES de criar conta/logar (ex.: usou o app um tempo, só depois criou login). O fluxo
 * "online-first" desta etapa cobre todo escrita NOVA a partir do login; esta função cobre o que já
 * existia antes disso — sem apagar o IndexedDB automaticamente e sem migrar dado de teste/seed
 * (conteúdo do curso não é pessoal e nunca é tocado aqui).
 */
export interface MigrationPreview {
  studySessions: number;
  learningEvents: number;
  attempts: number;
  errorEntries: number;
  courseEnrollments: number;
  courseDayProgress: number;
  hasRealProgress: boolean;
}

export async function previewLocalPersonalData(): Promise<MigrationPreview> {
  const db = getDB();
  const [studySessions, learningEvents, attempts, errorEntries, courseEnrollments, courseDayProgress] = await Promise.all([
    db.studySessions.where({ studentId: DEFAULT_STUDENT_ID }).count(),
    db.learningEvents.where({ studentId: DEFAULT_STUDENT_ID }).count(),
    db.attempts.where({ studentId: DEFAULT_STUDENT_ID }).count(),
    db.errorEntries.where({ studentId: DEFAULT_STUDENT_ID }).count(),
    db.courseEnrollments.where({ studentId: DEFAULT_STUDENT_ID }).count(),
    db.courseDayProgress.where({ studentId: DEFAULT_STUDENT_ID }).count(),
  ]);
  // "progresso real" = pelo menos uma tentativa, evento ou matrícula — não conta um perfil vazio.
  const hasRealProgress = attempts > 0 || learningEvents > 0 || courseEnrollments > 0;
  return { studySessions, learningEvents, attempts, errorEntries, courseEnrollments, courseDayProgress, hasRealProgress };
}

function migrationFlagKey(userId: string): string {
  return `transpetro-migrated-${userId}`;
}

/** true se este dispositivo já confirmou o envio do progresso local para esta conta. */
export function wasLocalDataMigrated(userId: string): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(migrationFlagKey(userId)) === "1";
}

/**
 * Envia todo o progresso pessoal local (Dexie, sob DEFAULT_STUDENT_ID) para a conta autenticada.
 * Idempotente: reaproveita as mesmas funções sync* (upsert por id/idempotency_key), então rodar
 * duas vezes não duplica nada. NÃO apaga o IndexedDB — o Dexie continua como cache local normal.
 */
export async function migrateLocalDataToCloud(userId: string): Promise<MigrationPreview> {
  const db = getDB();
  const [sessions, events, attempts, errors, reviews, reviewAttempts, mastery, mockAttempts, essays, doubts, enrollments, dayProgress] =
    await Promise.all([
      db.studySessions.where({ studentId: DEFAULT_STUDENT_ID }).toArray(),
      db.learningEvents.where({ studentId: DEFAULT_STUDENT_ID }).toArray(),
      db.attempts.where({ studentId: DEFAULT_STUDENT_ID }).toArray(),
      db.errorEntries.where({ studentId: DEFAULT_STUDENT_ID }).toArray(),
      db.reviewSchedules.where({ studentId: DEFAULT_STUDENT_ID }).toArray(),
      db.reviewAttempts.toArray(),
      db.masterySnapshots.where({ studentId: DEFAULT_STUDENT_ID }).toArray(),
      db.mockExamAttempts.where({ studentId: DEFAULT_STUDENT_ID }).toArray(),
      db.essaySubmissions.where({ studentId: DEFAULT_STUDENT_ID }).toArray(),
      db.doubts.where({ studentId: DEFAULT_STUDENT_ID }).toArray(),
      db.courseEnrollments.where({ studentId: DEFAULT_STUDENT_ID }).toArray(),
      db.courseDayProgress.where({ studentId: DEFAULT_STUDENT_ID }).toArray(),
    ]);

  // sequencial (não Promise.all) para não estourar a taxa de requisições do Supabase de uma vez só
  // com um histórico grande — aceitável aqui pois é uma operação única, não um caminho de UI quente.
  for (const s of sessions) await syncStudySession(s);
  for (const e of events) await syncLearningEvent(e);
  for (const a of attempts) await syncAttempt(a);
  for (const e of errors) await syncErrorEntry(e);
  for (const r of reviews) await syncReviewSchedule(r);
  for (const r of reviewAttempts) await syncReviewAttempt(r);
  for (const m of mastery) await syncMasterySnapshot(m);
  for (const m of mockAttempts) await syncMockExamAttempt(m);
  for (const e of essays) await syncEssaySubmission(e);
  for (const d of doubts) await syncDoubt(d);
  for (const e of enrollments) await syncCourseEnrollment(e);
  for (const p of dayProgress) await syncCourseDayProgress(p);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(migrationFlagKey(userId), "1");
  }

  return {
    studySessions: sessions.length,
    learningEvents: events.length,
    attempts: attempts.length,
    errorEntries: errors.length,
    courseEnrollments: enrollments.length,
    courseDayProgress: dayProgress.length,
    hasRealProgress: attempts.length > 0 || events.length > 0 || enrollments.length > 0,
  };
}
