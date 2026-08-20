import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useSyncStatus } from "@/lib/supabase/syncStatus";
import { getDB } from "@/lib/db/dexie";
import { DEFAULT_STUDENT_ID } from "@/lib/models/schema";
import type {
  Attempt,
  CourseDayProgress,
  CourseEnrollment,
  Doubt,
  ErrorEntry,
  EssaySubmission,
  LearningEvent,
  MasterySnapshot,
  MockExamAttempt,
  ReviewAttempt,
  ReviewSchedule,
  StudySession,
} from "@/lib/models/schema";

/**
 * Sincronização "online-first" com o Supabase: cada gravação pessoal já existente (Dexie, via
 * `src/lib/pedagogy/service.ts` e `src/lib/course/service.ts`) chama uma função deste arquivo logo
 * em seguida, para espelhar a MESMA linha no banco central. O Dexie continua sendo a fonte de
 * leitura rápida da UI (nada na lógica pedagógica existente foi reescrita); o Supabase passa a ser
 * a fonte da verdade entre dispositivos — em cada login, `pullCloudIntoLocalCache` hidrata o Dexie
 * do dispositivo novo com os dados reais da conta.
 *
 * Todas as funções são silenciosamente no-op quando o Supabase não está configurado (ambiente sem
 * `.env.local`) ou quando não há usuário autenticado — o app continua funcionando 100% local nesse
 * caso, exatamente como antes desta missão.
 */

async function getUserId(): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseBrowserClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

/** Envolve uma sincronização individual: atualiza o indicador global e nunca lança — falha de rede
 * vira estado "error"/"offline" visível na UI, não uma exceção que quebra o fluxo pedagógico local. */
async function withSyncStatus<T>(fn: () => Promise<T>): Promise<T | null> {
  const setStatus = useSyncStatus.getState().set;
  try {
    setStatus("syncing");
    const result = await fn();
    setStatus("synced");
    return result;
  } catch (err) {
    const offline = typeof navigator !== "undefined" && !navigator.onLine;
    setStatus(offline ? "offline" : "error", err instanceof Error ? err.message : String(err));
    return null;
  }
}

export async function syncStudySession(session: StudySession): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;
  await withSyncStatus(async () => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("study_sessions").upsert(
      {
        id: session.id,
        user_id: userId,
        origin: session.origin,
        started_at: session.startedAt,
        ended_at: session.endedAt ?? null,
        active_ms: session.activeMs ?? null,
        status: session.status,
        resume_point_ref: session.resumePointRef ?? null,
        related_activity_ids: session.relatedActivityIds,
        schema_version: session.schemaVersion,
      },
      { onConflict: "id" },
    );
    if (error) throw error;
  });
}

export async function syncLearningEvent(event: LearningEvent): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;
  await withSyncStatus(async () => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("learning_events").upsert(
      {
        id: event.id,
        user_id: userId,
        session_id: event.sessionId ?? null,
        kind: event.kind,
        content_ref: event.contentRef ?? null,
        activity_id: event.activityId ?? null,
        metadata: event.metadata ?? null,
        occurred_at: event.occurredAt,
        idempotency_key: event.idempotencyKey,
      },
      { onConflict: "user_id,idempotency_key", ignoreDuplicates: true },
    );
    if (error) throw error;
  });
}

export async function syncAttempt(attempt: Attempt): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;
  await withSyncStatus(async () => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("attempts").upsert(
      {
        id: attempt.id,
        user_id: userId,
        question_id: attempt.questionId,
        session_id: attempt.sessionId ?? null,
        activity_id: attempt.activityId ?? null,
        subject_slug: attempt.subjectSlug ?? null,
        topic_slug: attempt.topicSlug ?? null,
        syllabus_codes: attempt.syllabusCodes,
        selected_key: attempt.selectedKey,
        correct_key: attempt.correctKey ?? null,
        is_correct: attempt.isCorrect,
        result: attempt.result ?? null,
        attempt_number: attempt.attemptNumber ?? null,
        response_time_ms: attempt.responseTimeMs ?? null,
        confidence: attempt.confidence ?? null,
        consulted_aid_before_answering: attempt.consultedAidBeforeAnswering ?? null,
        question_origin: attempt.questionOrigin ?? null,
        mode: attempt.mode,
        mock_exam_attempt_id: attempt.mockExamAttemptId ?? null,
        idempotency_key: attempt.idempotencyKey,
      },
      { onConflict: "user_id,idempotency_key", ignoreDuplicates: true },
    );
    if (error) throw error;
  });
}

export async function syncErrorEntry(entry: ErrorEntry): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;
  await withSyncStatus(async () => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("error_entries").upsert(
      {
        id: entry.id,
        user_id: userId,
        question_id: entry.questionId ?? null,
        subject_slug: entry.subjectSlug ?? null,
        topic_slug: entry.topicSlug,
        syllabus_codes: entry.syllabusCodes,
        concept: entry.concept ?? null,
        cause: entry.cause,
        correct_rule: entry.correctRule,
        source_ref: entry.sourceRef ?? null,
        next_review_date: entry.nextReviewDate,
        resolved: entry.resolved,
        first_occurrence_at: entry.firstOccurrenceAt,
        last_occurrence_at: entry.lastOccurrenceAt,
        occurrence_count: entry.occurrenceCount,
        evidence_attempt_ids: entry.evidenceAttemptIds,
        subsequent_correct_attempt_ids: entry.subsequentCorrectAttemptIds,
        severity: entry.severity,
        status: entry.status,
        status_history: entry.statusHistory,
        student_note: entry.studentNote ?? null,
        error_nature: entry.errorNature,
        error_nature_origin: entry.errorNatureOrigin ?? null,
        error_nature_confidence: entry.errorNatureConfidence ?? null,
        origin: entry.origin,
      },
      { onConflict: "id" },
    );
    if (error) throw error;
  });
}

export async function syncReviewSchedule(review: ReviewSchedule): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;
  await withSyncStatus(async () => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("review_schedules").upsert(
      {
        id: review.id,
        user_id: userId,
        item_type: review.itemType,
        item_id: review.itemId,
        error_entry_id: review.errorEntryId ?? null,
        reason: review.reason,
        interval_index: review.intervalIndex,
        strategy_version: review.strategyVersion,
        priority: review.priority,
        next_review_date: review.nextReviewDate,
        last_reviewed_at: review.lastReviewedAt ?? null,
        status: review.status,
        recommended_activity_refs: review.recommendedActivityRefs,
      },
      { onConflict: "id" },
    );
    if (error) throw error;
  });
}

export async function syncReviewAttempt(reviewAttempt: ReviewAttempt): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;
  await withSyncStatus(async () => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("review_attempts").upsert(
      {
        id: reviewAttempt.id,
        user_id: userId,
        review_schedule_id: reviewAttempt.reviewScheduleId,
        reviewed_at: reviewAttempt.reviewedAt,
        result: reviewAttempt.result,
        result_before: reviewAttempt.resultBefore ?? null,
        result_after: reviewAttempt.resultAfter ?? null,
        related_attempt_ids: reviewAttempt.relatedAttemptIds,
        decision: reviewAttempt.decision ?? null,
      },
      { onConflict: "id" },
    );
    if (error) throw error;
  });
}

export async function syncMasterySnapshot(snapshot: MasterySnapshot): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;
  await withSyncStatus(async () => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("mastery_snapshots").upsert(
      {
        user_id: userId,
        subject_slug: snapshot.subjectSlug ?? null,
        syllabus_codes: snapshot.syllabusCodes,
        topic_slug: snapshot.topicSlug,
        concept: snapshot.concept ?? null,
        lessons_completed: snapshot.lessonsCompleted,
        accuracy_rate: snapshot.accuracyRate,
        recent_accuracy_rate: snapshot.recentAccuracyRate ?? null,
        attempts_count: snapshot.attemptsCount,
        average_response_time_ms: snapshot.averageResponseTimeMs ?? null,
        average_confidence: snapshot.averageConfidence ?? null,
        correct_low_confidence_count: snapshot.correctLowConfidenceCount,
        wrong_high_confidence_count: snapshot.wrongHighConfidenceCount,
        recent_result_sequence: snapshot.recentResultSequence,
        open_difficulty_count: snapshot.openDifficultyCount,
        recurrent_difficulty_count: snapshot.recurrentDifficultyCount,
        reviews_completed: snapshot.reviewsCompleted,
        performance_before_review: snapshot.performanceBeforeReview ?? null,
        performance_after_review: snapshot.performanceAfterReview ?? null,
        last_activity_at: snapshot.lastActivityAt ?? null,
        next_review_date: snapshot.nextReviewDate ?? null,
        mastery_level: snapshot.masteryLevel,
        evidence_attempt_ids: snapshot.evidenceAttemptIds,
        rule_version: snapshot.ruleVersion,
        computed_at: snapshot.computedAt,
      },
      { onConflict: "user_id,topic_slug,concept" },
    );
    if (error) throw error;
  });
}

export async function syncEssaySubmission(submission: EssaySubmission): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;
  await withSyncStatus(async () => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("essay_submissions").upsert(
      {
        id: submission.id,
        user_id: userId,
        essay_prompt_id: submission.essayPromptId,
        session_id: submission.sessionId ?? null,
        previous_version_id: submission.previousVersionId ?? null,
        content: submission.content,
        line_count: submission.lineCount ?? null,
        time_spent_ms: submission.timeSpentMs ?? null,
        evaluation: submission.evaluation ?? null,
        points_fixed_from_previous: submission.pointsFixedFromPrevious,
        points_pending_from_previous: submission.pointsPendingFromPrevious,
      },
      { onConflict: "id" },
    );
    if (error) throw error;
  });
}

export async function syncMockExamAttempt(attempt: MockExamAttempt): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;
  await withSyncStatus(async () => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("mock_exam_attempts").upsert(
      {
        id: attempt.id,
        user_id: userId,
        mock_exam_id: attempt.mockExamId,
        session_id: attempt.sessionId ?? null,
        started_at: attempt.startedAt,
        finished_at: attempt.finishedAt ?? null,
        status: attempt.status,
        answers: attempt.answers,
        attempt_ids: attempt.attemptIds,
        score_by_subject: attempt.scoreBySubject ?? null,
        total_score: attempt.totalScore ?? null,
        compared_to_previous_attempt_id: attempt.comparedToPreviousAttemptId ?? null,
        generated_review_ids: attempt.generatedReviewIds,
      },
      { onConflict: "id" },
    );
    if (error) throw error;
  });
}

export async function syncDoubt(doubt: Doubt): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;
  await withSyncStatus(async () => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("doubts").upsert(
      {
        id: doubt.id,
        user_id: userId,
        kind: doubt.kind,
        content_ref: doubt.contentRef,
        excerpt: doubt.excerpt ?? null,
        message: doubt.message ?? null,
        status: doubt.status,
        resolved_at: doubt.resolvedAt ?? null,
      },
      { onConflict: "id" },
    );
    if (error) throw error;
  });
}

export async function syncCourseEnrollment(enrollment: CourseEnrollment): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;
  await withSyncStatus(async () => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("course_enrollments").upsert(
      {
        user_id: userId,
        course_id: enrollment.courseId,
        plan_version: enrollment.planVersion,
        start_date: enrollment.startDate,
      },
      { onConflict: "user_id,course_id" },
    );
    if (error) throw error;
  });
}

/* ------------------------------------------------------------------------------------------------
 * Hidratação: puxa os dados reais da conta do Supabase para o cache local (Dexie) — chamado logo
 * após o login em qualquer dispositivo (ver AuthProvider). Todo o app lê o Dexie sob a chave local
 * única `DEFAULT_STUDENT_ID` desde a missão anterior; em vez de reescrever cada tela para usar o
 * `user_id` real, remapeamos aqui: linha da nuvem (user_id = uuid real) vira registro local
 * (studentId = DEFAULT_STUDENT_ID). Isso faz o dispositivo novo enxergar o progresso da conta sem
 * tocar em nenhuma tela existente. Idempotente: pode rodar em todo login sem duplicar nada (bulkPut
 * por id é upsert).
 */
export async function pullCloudIntoLocalCache(): Promise<{ pulled: boolean; counts: Record<string, number> }> {
  const userId = await getUserId();
  if (!userId) return { pulled: false, counts: {} };

  const supabase = getSupabaseBrowserClient();
  const db = getDB();
  const counts: Record<string, number> = {};

  const [sessions, events, attempts, errors, reviews, reviewAttempts, mastery, mockAttempts, essays, doubts, enrollments, dayProgress] =
    await Promise.all([
      supabase.from("study_sessions").select("*").eq("user_id", userId),
      supabase.from("learning_events").select("*").eq("user_id", userId),
      supabase.from("attempts").select("*").eq("user_id", userId),
      supabase.from("error_entries").select("*").eq("user_id", userId),
      supabase.from("review_schedules").select("*").eq("user_id", userId),
      supabase.from("review_attempts").select("*").eq("user_id", userId),
      supabase.from("mastery_snapshots").select("*").eq("user_id", userId),
      supabase.from("mock_exam_attempts").select("*").eq("user_id", userId),
      supabase.from("essay_submissions").select("*").eq("user_id", userId),
      supabase.from("doubts").select("*").eq("user_id", userId),
      supabase.from("course_enrollments").select("*").eq("user_id", userId),
      supabase.from("course_day_progress").select("*").eq("user_id", userId),
    ]);

  if (sessions.data) {
    const rows: StudySession[] = sessions.data.map((r: any) => ({
      id: r.id,
      studentId: DEFAULT_STUDENT_ID,
      origin: r.origin,
      startedAt: r.started_at,
      endedAt: r.ended_at ?? undefined,
      activeMs: r.active_ms ?? undefined,
      status: r.status,
      resumePointRef: r.resume_point_ref ?? undefined,
      relatedActivityIds: r.related_activity_ids ?? [],
      schemaVersion: r.schema_version,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
    await db.studySessions.bulkPut(rows);
    counts.studySessions = rows.length;
  }

  if (events.data) {
    const rows: LearningEvent[] = events.data.map((r: any) => ({
      id: r.id,
      studentId: DEFAULT_STUDENT_ID,
      sessionId: r.session_id ?? undefined,
      kind: r.kind,
      contentRef: r.content_ref ?? undefined,
      activityId: r.activity_id ?? undefined,
      metadata: r.metadata ?? undefined,
      occurredAt: r.occurred_at,
      idempotencyKey: r.idempotency_key,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
    await db.learningEvents.bulkPut(rows);
    counts.learningEvents = rows.length;
  }

  if (attempts.data) {
    const rows: Attempt[] = attempts.data.map((r: any) => ({
      id: r.id,
      studentId: DEFAULT_STUDENT_ID,
      questionId: r.question_id,
      sessionId: r.session_id ?? undefined,
      activityId: r.activity_id ?? undefined,
      subjectSlug: r.subject_slug ?? undefined,
      topicSlug: r.topic_slug ?? undefined,
      syllabusCodes: r.syllabus_codes ?? [],
      selectedKey: r.selected_key,
      correctKey: r.correct_key ?? undefined,
      isCorrect: r.is_correct,
      result: r.result ?? undefined,
      attemptNumber: r.attempt_number ?? undefined,
      responseTimeMs: r.response_time_ms ?? undefined,
      confidence: r.confidence ?? undefined,
      consultedAidBeforeAnswering: r.consulted_aid_before_answering ?? undefined,
      questionOrigin: r.question_origin ?? undefined,
      mode: r.mode,
      mockExamAttemptId: r.mock_exam_attempt_id ?? undefined,
      idempotencyKey: r.idempotency_key,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
    await db.attempts.bulkPut(rows);
    counts.attempts = rows.length;
  }

  if (errors.data) {
    const rows: ErrorEntry[] = errors.data.map((r: any) => ({
      id: r.id,
      studentId: DEFAULT_STUDENT_ID,
      questionId: r.question_id ?? undefined,
      subjectSlug: r.subject_slug ?? undefined,
      topicSlug: r.topic_slug,
      syllabusCodes: r.syllabus_codes ?? [],
      concept: r.concept ?? undefined,
      cause: r.cause,
      correctRule: r.correct_rule,
      sourceRef: r.source_ref ?? undefined,
      nextReviewDate: r.next_review_date,
      resolved: r.resolved,
      firstOccurrenceAt: r.first_occurrence_at,
      lastOccurrenceAt: r.last_occurrence_at,
      occurrenceCount: r.occurrence_count,
      evidenceAttemptIds: r.evidence_attempt_ids ?? [],
      subsequentCorrectAttemptIds: r.subsequent_correct_attempt_ids ?? [],
      severity: r.severity,
      status: r.status,
      statusHistory: r.status_history ?? [],
      studentNote: r.student_note ?? undefined,
      errorNature: r.error_nature,
      errorNatureOrigin: r.error_nature_origin ?? undefined,
      errorNatureConfidence: r.error_nature_confidence ?? undefined,
      origin: r.origin,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
    await db.errorEntries.bulkPut(rows);
    counts.errorEntries = rows.length;
  }

  if (reviews.data) {
    const rows: ReviewSchedule[] = reviews.data.map((r: any) => ({
      id: r.id,
      studentId: DEFAULT_STUDENT_ID,
      itemType: r.item_type,
      itemId: r.item_id,
      errorEntryId: r.error_entry_id ?? undefined,
      reason: r.reason,
      intervalIndex: r.interval_index,
      strategyVersion: r.strategy_version,
      priority: r.priority,
      nextReviewDate: r.next_review_date,
      lastReviewedAt: r.last_reviewed_at ?? undefined,
      status: r.status,
      recommendedActivityRefs: r.recommended_activity_refs ?? [],
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
    await db.reviewSchedules.bulkPut(rows);
    counts.reviewSchedules = rows.length;
  }

  if (reviewAttempts.data) {
    const rows: ReviewAttempt[] = reviewAttempts.data.map((r: any) => ({
      id: r.id,
      reviewScheduleId: r.review_schedule_id,
      reviewedAt: r.reviewed_at,
      result: r.result,
      resultBefore: r.result_before ?? undefined,
      resultAfter: r.result_after ?? undefined,
      relatedAttemptIds: r.related_attempt_ids ?? [],
      decision: r.decision ?? undefined,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
    await db.reviewAttempts.bulkPut(rows);
    counts.reviewAttempts = rows.length;
  }

  if (mastery.data) {
    const rows: MasterySnapshot[] = mastery.data.map((r: any) => ({
      id: `mastery-${DEFAULT_STUDENT_ID}-${r.topic_slug}-${r.concept ?? "all"}`,
      studentId: DEFAULT_STUDENT_ID,
      subjectSlug: r.subject_slug ?? undefined,
      syllabusCodes: r.syllabus_codes ?? [],
      topicSlug: r.topic_slug,
      concept: r.concept ?? undefined,
      lessonsCompleted: r.lessons_completed,
      accuracyRate: r.accuracy_rate,
      recentAccuracyRate: r.recent_accuracy_rate ?? undefined,
      attemptsCount: r.attempts_count,
      averageResponseTimeMs: r.average_response_time_ms ?? undefined,
      averageConfidence: r.average_confidence ?? undefined,
      correctLowConfidenceCount: r.correct_low_confidence_count,
      wrongHighConfidenceCount: r.wrong_high_confidence_count,
      recentResultSequence: r.recent_result_sequence ?? [],
      openDifficultyCount: r.open_difficulty_count,
      recurrentDifficultyCount: r.recurrent_difficulty_count,
      reviewsCompleted: r.reviews_completed,
      performanceBeforeReview: r.performance_before_review ?? undefined,
      performanceAfterReview: r.performance_after_review ?? undefined,
      lastActivityAt: r.last_activity_at ?? undefined,
      nextReviewDate: r.next_review_date ?? undefined,
      masteryLevel: r.mastery_level,
      evidenceAttemptIds: r.evidence_attempt_ids ?? [],
      ruleVersion: r.rule_version,
      computedAt: r.computed_at,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
    await db.masterySnapshots.bulkPut(rows);
    counts.masterySnapshots = rows.length;
  }

  if (mockAttempts.data) {
    const rows: MockExamAttempt[] = mockAttempts.data.map((r: any) => ({
      id: r.id,
      studentId: DEFAULT_STUDENT_ID,
      mockExamId: r.mock_exam_id,
      sessionId: r.session_id ?? undefined,
      startedAt: r.started_at,
      finishedAt: r.finished_at ?? undefined,
      status: r.status,
      answers: r.answers ?? [],
      attemptIds: r.attempt_ids ?? [],
      scoreBySubject: r.score_by_subject ?? undefined,
      totalScore: r.total_score ?? undefined,
      comparedToPreviousAttemptId: r.compared_to_previous_attempt_id ?? undefined,
      generatedReviewIds: r.generated_review_ids ?? [],
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
    await db.mockExamAttempts.bulkPut(rows);
    counts.mockExamAttempts = rows.length;
  }

  if (essays.data) {
    const rows: EssaySubmission[] = essays.data.map((r: any) => ({
      id: r.id,
      studentId: DEFAULT_STUDENT_ID,
      essayPromptId: r.essay_prompt_id,
      sessionId: r.session_id ?? undefined,
      previousVersionId: r.previous_version_id ?? undefined,
      content: r.content,
      lineCount: r.line_count ?? undefined,
      timeSpentMs: r.time_spent_ms ?? undefined,
      evaluation: r.evaluation ?? undefined,
      pointsFixedFromPrevious: r.points_fixed_from_previous ?? [],
      pointsPendingFromPrevious: r.points_pending_from_previous ?? [],
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
    await db.essaySubmissions.bulkPut(rows);
    counts.essaySubmissions = rows.length;
  }

  if (doubts.data) {
    const rows: Doubt[] = doubts.data.map((r: any) => ({
      id: r.id,
      studentId: DEFAULT_STUDENT_ID,
      kind: r.kind,
      contentRef: r.content_ref,
      excerpt: r.excerpt ?? undefined,
      message: r.message ?? undefined,
      status: r.status,
      resolvedAt: r.resolved_at ?? undefined,
      resolutionNote: r.resolution_note ?? undefined,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
    await db.doubts.bulkPut(rows);
    counts.doubts = rows.length;
  }

  if (enrollments.data) {
    const rows: CourseEnrollment[] = enrollments.data.map((r: any) => ({
      id: `course-enrollment-${DEFAULT_STUDENT_ID}-${r.course_id}`,
      studentId: DEFAULT_STUDENT_ID,
      courseId: r.course_id,
      planVersion: r.plan_version,
      startDate: r.start_date,
      schemaVersion: 1,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
    await db.courseEnrollments.bulkPut(rows);
    counts.courseEnrollments = rows.length;
  }

  if (dayProgress.data) {
    const rows: CourseDayProgress[] = dayProgress.data.map((r: any) => ({
      id: `course-progress-${DEFAULT_STUDENT_ID}-${r.course_id}-${r.day}`,
      studentId: DEFAULT_STUDENT_ID,
      courseId: r.course_id,
      planVersion: r.plan_version,
      day: r.day,
      status: r.status,
      currentStepId: r.current_step_id,
      completedStepIds: r.completed_step_ids ?? [],
      sessionId: r.session_id ?? undefined,
      startedAt: r.started_at ?? undefined,
      completedAt: r.completed_at ?? undefined,
      schemaVersion: 1,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
    await db.courseDayProgress.bulkPut(rows);
    counts.courseDayProgress = rows.length;
  }

  return { pulled: true, counts };
}

export async function syncCourseDayProgress(progress: CourseDayProgress): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;
  await withSyncStatus(async () => {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.from("course_day_progress").upsert(
      {
        user_id: userId,
        course_id: progress.courseId,
        plan_version: progress.planVersion,
        day: progress.day,
        status: progress.status,
        current_step_id: progress.currentStepId,
        completed_step_ids: progress.completedStepIds,
        session_id: progress.sessionId ?? null,
        started_at: progress.startedAt ?? null,
        completed_at: progress.completedAt ?? null,
      },
      { onConflict: "user_id,course_id,day" },
    );
    if (error) throw error;
  });
}
