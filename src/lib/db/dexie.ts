import Dexie, { type EntityTable } from "dexie";
import type {
  Attempt,
  Bookmark,
  ConfidenceCheckin,
  CourseDayProgress,
  CourseEnrollment,
  Doubt,
  ErrorEntry,
  EssayPrompt,
  EssaySubmission,
  Exam,
  ExamBlueprint,
  Flashcard,
  FocusSession,
  IntegrationSetting,
  LearnerProfile,
  LearningEvent,
  Lesson,
  MasterySnapshot,
  MediaAsset,
  MockExam,
  MockExamAttempt,
  Note,
  NotebookPackage,
  OfficialSource,
  ProfessorConversation,
  Question,
  ReviewAttempt,
  ReviewSchedule,
  CourseModule,
  StudyPlanRecord,
  StudySession,
  StudyTask,
  Subject,
  SyllabusItem,
  Topic,
} from "@/lib/models/schema";

/**
 * Banco local (IndexedDB via Dexie). Esta é a implementação padrão do repositório —
 * ver `src/lib/db/repository.ts` para a interface trocável (permite plugar Supabase depois
 * sem reescrever telas).
 */
export class TranspetroDB extends Dexie {
  officialSources!: EntityTable<OfficialSource, "id">;
  exams!: EntityTable<Exam, "id">;
  examBlueprints!: EntityTable<ExamBlueprint, "id">;
  syllabusItems!: EntityTable<SyllabusItem, "id">;

  subjects!: EntityTable<Subject, "id">;
  modules!: EntityTable<CourseModule, "id">;
  topics!: EntityTable<Topic, "id">;
  lessons!: EntityTable<Lesson, "id">;

  studyPlans!: EntityTable<StudyPlanRecord, "id">;
  studyTasks!: EntityTable<StudyTask, "id">;
  focusSessions!: EntityTable<FocusSession, "id">;

  questions!: EntityTable<Question, "id">;
  attempts!: EntityTable<Attempt, "id">;

  mockExams!: EntityTable<MockExam, "id">;
  mockExamAttempts!: EntityTable<MockExamAttempt, "id">;

  essayPrompts!: EntityTable<EssayPrompt, "id">;
  essaySubmissions!: EntityTable<EssaySubmission, "id">;

  flashcards!: EntityTable<Flashcard, "id">;
  reviewSchedules!: EntityTable<ReviewSchedule, "id">;
  reviewAttempts!: EntityTable<ReviewAttempt, "id">;

  errorEntries!: EntityTable<ErrorEntry, "id">;
  notes!: EntityTable<Note, "id">;
  bookmarks!: EntityTable<Bookmark, "id">;

  mediaAssets!: EntityTable<MediaAsset, "id">;
  notebookPackages!: EntityTable<NotebookPackage, "id">;

  learnerProfiles!: EntityTable<LearnerProfile, "id">;
  masterySnapshots!: EntityTable<MasterySnapshot, "id">;
  integrationSettings!: EntityTable<IntegrationSetting, "id">;

  // --- Memória pedagógica (ver docs/MEMORIA_PEDAGOGICA.md) ---
  studySessions!: EntityTable<StudySession, "id">;
  learningEvents!: EntityTable<LearningEvent, "id">;
  doubts!: EntityTable<Doubt, "id">;

  // --- Meu Curso — plano guiado de 34 dias (ver docs/REGRAS_PEDAGOGICAS_MEU_CURSO.md) ---
  courseEnrollments!: EntityTable<CourseEnrollment, "id">;
  courseDayProgress!: EntityTable<CourseDayProgress, "id">;

  // --- Professor (ver docs/PROFESSOR.md) ---
  professorConversations!: EntityTable<ProfessorConversation, "id">;

  // --- Laboratório (Recursos Extras) ---
  confidenceCheckins!: EntityTable<ConfidenceCheckin, "id">;

  constructor() {
    super("transpetro-estudos-db");
    this.version(1).stores({
      officialSources: "id, kind",
      exams: "id",
      examBlueprints: "id, examId",
      syllabusItems: "id, code, subjectId",

      subjects: "id, slug",
      modules: "id, slug, subjectSlug",
      topics: "id, slug, moduleSlug",
      lessons: "id, slug, topicSlug, subjectSlug",

      studyPlans: "id, learnerProfileId",
      studyTasks: "id, studyPlanId, date, kind, completed",
      focusSessions: "id, studyTaskId, startedAt",

      questions: "id, subjectSlug, topicSlug, difficulty, [subjectSlug+topicSlug]",
      attempts: "id, questionId, mockExamAttemptId, createdAt",

      mockExams: "id, kind, subjectSlug",
      mockExamAttempts: "id, mockExamId, status, startedAt",

      essayPrompts: "id",
      essaySubmissions: "id, essayPromptId, previousVersionId, createdAt",

      flashcards: "id, lessonSlug",
      reviewSchedules: "id, itemType, itemId, nextReviewDate",
      reviewAttempts: "id, reviewScheduleId, reviewedAt",

      errorEntries: "id, topicSlug, resolved, nextReviewDate",
      notes: "id, lessonSlug",
      bookmarks: "id, targetType, targetId",

      mediaAssets: "id, kind, topicSlug, linkStatus",
      notebookPackages: "id, topicSlug",

      learnerProfiles: "id",
      masterySnapshots: "id, topicSlug, computedAt",
      integrationSettings: "id, provider",
    });

    // --- v2: memória pedagógica (ver docs/MEMORIA_PEDAGOGICA.md) ---
    // Dexie só exige, em cada versão, as tabelas/índices que MUDAM; tabelas não listadas aqui
    // mantêm a definição da v1 e seus dados são preservados automaticamente na atualização.
    this.version(2).stores({
      // `&idempotencyKey` = índice único: reenvio com a mesma chave lança ConstraintError,
      // que o serviço central usa para devolver o registro já existente em vez de duplicar.
      attempts:
        "id, questionId, mockExamAttemptId, createdAt, studentId, sessionId, topicSlug, mode, &idempotencyKey, [studentId+questionId]",
      errorEntries:
        "id, topicSlug, resolved, nextReviewDate, studentId, status, origin, questionId, [studentId+topicSlug]",
      reviewSchedules:
        "id, itemType, itemId, nextReviewDate, studentId, status, errorEntryId, [itemType+itemId]",
      masterySnapshots: "id, topicSlug, computedAt, studentId, subjectSlug, [studentId+topicSlug]",
      mockExamAttempts: "id, mockExamId, status, startedAt, studentId, sessionId",
      essaySubmissions: "id, essayPromptId, previousVersionId, createdAt, studentId, sessionId",

      studySessions: "id, studentId, origin, status, startedAt",
      learningEvents: "id, studentId, sessionId, kind, occurredAt, &idempotencyKey, [studentId+kind]",
      doubts: "id, studentId, status, kind, createdAt",
    });

    // --- v3: Meu Curso — plano guiado de 34 dias ---
    this.version(3).stores({
      courseEnrollments: "id, studentId, courseId, [studentId+courseId]",
      courseDayProgress: "id, studentId, courseId, day, status, [studentId+courseId+day]",
    });

    // --- v4: Professor — histórico de conversas ---
    this.version(4).stores({
      professorConversations: "id, studentId, activeFunction, updatedAt, [studentId+activeFunction]",
    });

    // --- v5: Laboratório — diário de confiança emocional (ferramenta 2.8) ---
    this.version(5).stores({
      confidenceCheckins: "id, studentId, moment, occurredAt, [studentId+occurredAt]",
    });
  }
}

let dbInstance: TranspetroDB | null = null;

/** Singleton lazy — evita instanciar Dexie durante SSR (o Next.js renderiza módulos no servidor). */
export function getDB(): TranspetroDB {
  if (typeof window === "undefined") {
    throw new Error("TranspetroDB só pode ser usado no cliente (IndexedDB não existe no servidor).");
  }
  if (!dbInstance) {
    dbInstance = new TranspetroDB();
  }
  return dbInstance;
}
