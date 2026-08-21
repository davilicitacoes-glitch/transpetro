import { z } from "zod";

/* ------------------------------------------------------------------------------------------------
 * Modelo de dados do motor (esquema genérico, reaproveitado de projetos de estudo anteriores).
 * Todas as entidades têm id, createdAt/updatedAt e, quando fizer sentido, origem/licença.
 * ---------------------------------------------------------------------------------------------- */

export const OrigemContentSchema = z.enum(["expresso", "desdobramento", "complementar"]);
export type OrigemContent = z.infer<typeof OrigemContentSchema>;

export const AuditFieldsSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/* ---------------- Exam ---------------- */

export const OfficialSourceSchema = AuditFieldsSchema.extend({
  title: z.string(),
  url: z.string().url(),
  kind: z.enum(["edital", "retificacao", "lei", "sumula", "manual", "prova_publica", "outro"]),
  publishedAt: z.string().optional(),
  consultedAt: z.string(),
  notes: z.string().optional(),
});
export type OfficialSource = z.infer<typeof OfficialSourceSchema>;

/** ID local fixo do único perfil de aluno (app single-user, sem autenticação). Reaproveitado em
 * toda a camada pedagógica para não introduzir um segundo conceito de identidade. */
export const DEFAULT_STUDENT_ID = "learner-profile-default";

export const ExamBlueprintSubjectSchema = z.object({
  subjectId: z.string(),
  name: z.string(),
  questionCount: z.number().int().positive(),
  pointsPerQuestion: z.number().positive(),
});
export type ExamBlueprintSubject = z.infer<typeof ExamBlueprintSubjectSchema>;

export const ExamSchema = AuditFieldsSchema.extend({
  organizer: z.string(),
  position: z.string(),
  examDate: z.string(),
  lastStudyDate: z.string(),
  shift: z.string(),
  durationHours: z.number(),
  minPassingPoints: z.number(),
  targetPoints: z.number(),
  essayMinLines: z.number(),
  essayMaxLines: z.number(),
  essayTotalPoints: z.number(),
  essayMinPassingPoints: z.number(),
  sourceIds: z.array(z.string()),
});
export type Exam = z.infer<typeof ExamSchema>;

export const ExamBlueprintSchema = AuditFieldsSchema.extend({
  examId: z.string(),
  subjects: z.array(ExamBlueprintSubjectSchema),
});
export type ExamBlueprint = z.infer<typeof ExamBlueprintSchema>;

export const SyllabusItemSchema = AuditFieldsSchema.extend({
  code: z.string(), // ex.: "CE-14"
  subjectId: z.string(), // slug do subject — genérico, definido pelo config do concurso, não fixo no schema
  text: z.string(),
  origem: OrigemContentSchema,
  origemJustificativa: z.string().optional(),
  lessonSlugs: z.array(z.string()),
  sourceIds: z.array(z.string()),
});
export type SyllabusItem = z.infer<typeof SyllabusItemSchema>;

/* ---------------- Curso ---------------- */

export const SubjectSchema = AuditFieldsSchema.extend({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  color: z.string(),
  examWeightPoints: z.number(),
});
export type Subject = z.infer<typeof SubjectSchema>;

export const ModuleSchema = AuditFieldsSchema.extend({
  slug: z.string(),
  subjectSlug: z.string(),
  name: z.string(),
  order: z.number().int(),
});
export type CourseModule = z.infer<typeof ModuleSchema>;

export const TopicSchema = AuditFieldsSchema.extend({
  slug: z.string(),
  moduleSlug: z.string(),
  name: z.string(),
  syllabusCodes: z.array(z.string()),
  order: z.number().int(),
});
export type Topic = z.infer<typeof TopicSchema>;

export const LessonSourceSchema = z.object({
  title: z.string(),
  url: z.string().url().optional(),
  consultedAt: z.string().optional(),
  note: z.string().optional(),
});
export type LessonSource = z.infer<typeof LessonSourceSchema>;

export const LessonSchema = AuditFieldsSchema.extend({
  slug: z.string(),
  topicSlug: z.string(),
  subjectSlug: z.string(),
  title: z.string(),
  learningObjective: z.string(),
  syllabusCodes: z.array(z.string()),
  estimatedMinutes: z.number().int().positive(),
  expectedMastery: z.enum(["introdutorio", "intermediario", "avancado"]),
  bodyMdx: z.string(), // conteúdo didático completo (markdown/MDX)
  mustMemorize: z.array(z.string()),
  workedExamples: z.array(z.string()),
  commonMistakes: z.array(z.string()).min(3),
  howBoardMightAsk: z.array(z.string()),
  legalReferences: z.array(LessonSourceSchema),
  reviewSummaryPoints: z.array(z.string()).max(24),
  flashcardIds: z.array(z.string()),
  miniQuizQuestionIds: z.array(z.string()),
  furtherReading: z.array(LessonSourceSchema).optional(),
  version: z.number().int().default(1),
});
export type Lesson = z.infer<typeof LessonSchema>;

/* ---------------- Plano de estudo ---------------- */

export const StudyPlanDaySchema = z.object({
  date: z.string(),
  missionIndex: z.number().int().nullable(),
  missionIndexes: z.array(z.number().int()),
  phase: z.enum(["base_diagnostico", "cobertura_acelerada", "consolidacao", "reta_final"]).nullable(),
  dayType: z.enum(["missao", "simulado", "revisao", "reta_final", "descanso"]),
  needsEssaySession: z.boolean(),
});
export type StudyPlanDayModel = z.infer<typeof StudyPlanDaySchema>;

export const StudyPlanRecordSchema = AuditFieldsSchema.extend({
  learnerProfileId: z.string(),
  startDate: z.string(),
  lastStudyDate: z.string(),
  missionCount: z.number().int(),
  compressed: z.boolean(),
  compressionNote: z.string().nullable(),
  days: z.array(StudyPlanDaySchema),
});
export type StudyPlanRecord = z.infer<typeof StudyPlanRecordSchema>;

export const StudyTaskSchema = AuditFieldsSchema.extend({
  studyPlanId: z.string(),
  date: z.string(),
  missionIndex: z.number().int().nullable(),
  kind: z.enum(["aquecimento", "aula", "questoes", "revisao", "redacao", "simulado", "fechamento"]),
  refId: z.string().optional(), // lessonSlug, questionSetId etc.
  title: z.string(),
  estimatedMinutes: z.number().int(),
  completed: z.boolean().default(false),
  completedAt: z.string().datetime().optional(),
});
export type StudyTask = z.infer<typeof StudyTaskSchema>;

export const FocusSessionSchema = AuditFieldsSchema.extend({
  studyTaskId: z.string().optional(),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().optional(),
  plannedMinutes: z.number().int(),
  actualMinutes: z.number().int().optional(),
});
export type FocusSession = z.infer<typeof FocusSessionSchema>;

/* ---------------- Questões ---------------- */

export const QuestionOptionSchema = z.object({
  key: z.enum(["A", "B", "C", "D", "E"]),
  text: z.string(),
  isCorrect: z.boolean(),
  explanation: z.string(),
});
export type QuestionOption = z.infer<typeof QuestionOptionSchema>;

export const QuestionOriginSchema = z.enum(["real", "adaptada", "inedita"]);
export type QuestionOrigin = z.infer<typeof QuestionOriginSchema>;

export const QuestionSourceSchema = z.object({
  origin: QuestionOriginSchema,
  banca: z.string().optional(),
  orgao: z.string().optional(),
  cargo: z.string().optional(),
  ano: z.number().int().optional(),
  numero: z.string().optional(),
  pagina: z.string().optional(),
  cadernoUrl: z.string().url().optional(),
  gabaritoUrl: z.string().url().optional(),
  normativeReference: z.string().optional(),
  didacticSource: z.string().optional(),
});
export type QuestionSource = z.infer<typeof QuestionSourceSchema>;

export const QuestionSchema = AuditFieldsSchema.extend({
  subjectSlug: z.string(),
  topicSlug: z.string(),
  syllabusCodes: z.array(z.string()),
  statement: z.string(),
  /** Questões comuns têm 5 opções (A-E, formato real da banca Cesgranrio); a revisão de véspera usa 2 opções (V/F). */
  options: z.array(QuestionOptionSchema).min(2).max(5),
  difficulty: z.enum(["facil", "medio", "dificil"]),
  source: QuestionSourceSchema,
  legislativeUpdateAlert: z.string().optional(),
  version: z.number().int().default(1),
})
  .refine((q) => q.options.filter((o) => o.isCorrect).length === 1, {
    message: "A questão deve ter exatamente uma alternativa correta.",
  })
  .refine((q) => new Set(q.options.map((o) => o.key)).size === q.options.length, {
    message: "As alternativas devem ter chaves únicas.",
  });
export type Question = z.infer<typeof QuestionSchema>;

/** Contexto de onde a tentativa partiu — miniquiz de aula, treino livre, revisão, simulado ou o futuro Professor. */
export const AttemptModeSchema = z.enum(["miniquiz", "treino", "revisao", "simulado", "teste_professor", "curso"]);
export type AttemptMode = z.infer<typeof AttemptModeSchema>;

export const AttemptSchema = AuditFieldsSchema.extend({
  studentId: z.string().default(DEFAULT_STUDENT_ID),
  questionId: z.string(),
  /** Sessão de estudo em que a tentativa ocorreu (ver StudySessionSchema). Ausente = sessão não rastreada. */
  sessionId: z.string().optional(),
  /** Atividade concreta de origem: lessonSlug, mockExamId, reviewScheduleId etc. */
  activityId: z.string().optional(),
  /** Campos denormalizados da questão no momento da tentativa — permitem consultar o histórico
   * mesmo que a questão seja reclassificada depois, sem precisar de join. */
  subjectSlug: z.string().optional(),
  topicSlug: z.string().optional(),
  syllabusCodes: z.array(z.string()).default([]),
  selectedKey: z.enum(["A", "B", "C", "D", "E"]).nullable(),
  correctKey: z.enum(["A", "B", "C", "D", "E"]).optional(),
  isCorrect: z.boolean(),
  result: z.enum(["correta", "incorreta", "parcial", "nao_corrigivel"]).optional(),
  /** Nº sequencial desta tentativa para esta questão por este aluno (1ª, 2ª, 3ª vez respondendo). */
  attemptNumber: z.number().int().positive().optional(),
  /** Ausente = tempo não medido de forma confiável. Nunca inventar um valor aqui. */
  responseTimeMs: z.number().int().optional(),
  confidence: z.number().int().min(1).max(5).optional(),
  consultedAidBeforeAnswering: z.boolean().optional(),
  /** Espelha Question.source.origin no momento da tentativa (real/adaptada/inedita). */
  questionOrigin: z.string().optional(),
  sourceRef: z.string().optional(),
  mode: AttemptModeSchema,
  questionVersion: z.number().int().optional(),
  mockExamAttemptId: z.string().optional(),
  /** Chave gerada pelo cliente no momento do envio; a tabela tem índice único nela — reenvio
   * (duplo clique, retry de rede) com a mesma chave retorna a tentativa já gravada, sem duplicar. */
  idempotencyKey: z.string(),
});
export type Attempt = z.infer<typeof AttemptSchema>;

/* ---------------- Simulados ---------------- */

export const MockExamSchema = AuditFieldsSchema.extend({
  title: z.string(),
  kind: z.enum(["completo", "rapido", "por_disciplina", "por_erro"]),
  subjectSlug: z.string().optional(),
  questionIds: z.array(z.string()),
  blueprint: z.array(ExamBlueprintSubjectSchema).optional(),
});
export type MockExam = z.infer<typeof MockExamSchema>;

export const MockExamAnswerSchema = z.object({
  questionId: z.string(),
  selectedKey: z.enum(["A", "B", "C", "D", "E"]).nullable(),
  responseTimeMs: z.number().int(),
});
export type MockExamAnswer = z.infer<typeof MockExamAnswerSchema>;

export const MockExamAttemptSchema = AuditFieldsSchema.extend({
  mockExamId: z.string(),
  studentId: z.string().default(DEFAULT_STUDENT_ID),
  sessionId: z.string().optional(),
  startedAt: z.string().datetime(),
  finishedAt: z.string().datetime().optional(),
  status: z.enum(["em_andamento", "concluido", "interrompido"]),
  answers: z.array(MockExamAnswerSchema),
  /** IDs de `attempts` reais gerados por este simulado — a nota agregada nunca substitui o histórico por questão. */
  attemptIds: z.array(z.string()).default([]),
  scoreBySubject: z.record(z.string(), z.number()).optional(),
  totalScore: z.number().optional(),
  comparedToPreviousAttemptId: z.string().optional(),
  /** IDs de `reviewSchedules` abertas automaticamente a partir dos erros deste simulado. */
  generatedReviewIds: z.array(z.string()).default([]),
});
export type MockExamAttempt = z.infer<typeof MockExamAttemptSchema>;

/* ---------------- Redação ---------------- */

export const EssayPromptSchema = AuditFieldsSchema.extend({
  title: z.string(),
  themeText: z.string(),
  supportingTexts: z.array(z.string()).optional(),
  isOriginalContent: z.boolean().default(true),
});
export type EssayPrompt = z.infer<typeof EssayPromptSchema>;

export const EssayCriterionSchema = z.enum(["tipologia", "abordagem", "coerenciaCoesao", "morfossintaxe", "acentuacaoOrtografia"]);
export type EssayCriterion = z.infer<typeof EssayCriterionSchema>;

export const EssayIssueSchema = z.object({
  criterion: EssayCriterionSchema,
  excerpt: z.string().optional(),
  location: z.string().optional(),
  classification: z.string(),
  guidance: z.string(),
});
export type EssayIssue = z.infer<typeof EssayIssueSchema>;

export const EssayEvaluationSchema = z.object({
  tipologia: z.number().min(0).max(5),
  abordagem: z.number().min(0).max(10),
  coerenciaCoesao: z.number().min(0).max(10),
  morfossintaxe: z.number().min(0).max(5),
  acentuacaoOrtografia: z.number().min(0).max(5),
  totalScore: z.number().min(0).max(35),
  feedback: z.string(),
  /** Problemas localizados por critério — substitui "nota + comentário livre" por dado estruturado. */
  issues: z.array(EssayIssueSchema).default([]),
  rewriteExercise: z.string().optional(),
  evaluatedBy: z.enum(["ia", "manual", "autocorrecao"]),
  /** Versão da rubrica oficial usada (a do edital, ver ESSAY_RUBRIC em exam/constants.ts). */
  rubricVersion: z.number().int().default(1),
  /** Quem/o que avaliou, de forma rastreável: "regra:x" | "humano:nome" | "ia:modelo@versão". */
  evaluatorRef: z.string().optional(),
});
export type EssayEvaluation = z.infer<typeof EssayEvaluationSchema>;

export const EssaySubmissionSchema = AuditFieldsSchema.extend({
  studentId: z.string().default(DEFAULT_STUDENT_ID),
  sessionId: z.string().optional(),
  essayPromptId: z.string(),
  lineCount: z.number().int(),
  content: z.string(),
  imageUrl: z.string().optional(),
  /** Ausente = tempo de produção não medido. Nunca inventar. */
  timeSpentMs: z.number().int().optional(),
  evaluation: EssayEvaluationSchema.optional(),
  previousVersionId: z.string().optional(),
  /** Pontos que a reescrita corrigiu / ainda não corrigiu, em relação à versão anterior. */
  pointsFixedFromPrevious: z.array(z.string()).default([]),
  pointsPendingFromPrevious: z.array(z.string()).default([]),
});
export type EssaySubmission = z.infer<typeof EssaySubmissionSchema>;

/* ---------------- Revisão / erros ---------------- */

export const FlashcardSchema = AuditFieldsSchema.extend({
  lessonSlug: z.string(),
  front: z.string(),
  back: z.string(),
});
export type Flashcard = z.infer<typeof FlashcardSchema>;

/** Por que esta revisão existe — usado tanto para explicar ao aluno quanto para o futuro Professor. */
export const ReviewReasonSchema = z.enum(["regular", "erro", "baixa_confianca", "esquecimento", "simulado", "redacao", "reforco"]);
export type ReviewReason = z.infer<typeof ReviewReasonSchema>;

export const ReviewStatusSchema = z.enum(["pendente", "disponivel", "iniciada", "concluida", "adiada", "vencida"]);
export type ReviewStatus = z.infer<typeof ReviewStatusSchema>;

export const ReviewScheduleSchema = AuditFieldsSchema.extend({
  studentId: z.string().default(DEFAULT_STUDENT_ID),
  itemType: z.enum(["flashcard", "topic", "question", "difficulty"]),
  itemId: z.string(),
  /** Presente quando a revisão foi gerada a partir de um ErrorEntry específico. */
  errorEntryId: z.string().optional(),
  reason: ReviewReasonSchema.default("regular"),
  intervalIndex: z.number().int().min(0).max(4),
  /** Versão da regra de espaçamento usada (ver REVIEW_SCHEDULE_DAYS em priority.ts) — muda só se a regra mudar. */
  strategyVersion: z.number().int().default(1),
  priority: z.enum(["baixa", "media", "alta"]).default("media"),
  nextReviewDate: z.string(),
  lastReviewedAt: z.string().datetime().optional(),
  status: ReviewStatusSchema.default("pendente"),
  recommendedActivityRefs: z.array(z.string()).default([]),
});
export type ReviewSchedule = z.infer<typeof ReviewScheduleSchema>;

export const ReviewAttemptSchema = AuditFieldsSchema.extend({
  reviewScheduleId: z.string(),
  result: z.enum(["dominado", "duvida", "erro"]),
  reviewedAt: z.string().datetime(),
  /** Tentativas de questão realizadas dentro desta sessão de revisão, se houver. */
  relatedAttemptIds: z.array(z.string()).default([]),
  resultBefore: z.string().optional(),
  resultAfter: z.string().optional(),
  decision: z.enum(["manter_aberta", "monitorar", "reagendar", "considerar_superada"]).optional(),
});
export type ReviewAttempt = z.infer<typeof ReviewAttemptSchema>;

/**
 * Natureza provável do erro. Começa sempre em "ainda_nao_classificado" — o sistema não adivinha
 * causa psicológica/pedagógica sozinho. Só muda por regra objetiva (ex.: 3 erros no mesmo
 * distrator = confusão conceitual) ou por informação explícita do aluno/professor futuro, e
 * sempre registrando `errorNatureOrigin` e `errorNatureConfidence`.
 */
export const ErrorNatureSchema = z.enum([
  "ainda_nao_classificado",
  "desconhecimento_conteudo",
  "confusao_conceitual",
  "erro_interpretacao",
  "desatencao",
  "erro_calculo_procedimento",
  "esquecimento",
  "gestao_tempo",
  "outro",
]);
export type ErrorNature = z.infer<typeof ErrorNatureSchema>;

/** De onde veio uma classificação: regra determinística do sistema, o próprio aluno, ou (no
 * futuro) uma proposta do Professor de IA — nunca apresentada como fato sem essa origem. */
export const ClassificationOriginSchema = z.enum(["sistema_regra", "aluno_informado", "ia_proposta"]);
export type ClassificationOrigin = z.infer<typeof ClassificationOriginSchema>;

export const DifficultyStatusSchema = z.enum(["aberto", "em_revisao", "em_monitoramento", "superado"]);
export type DifficultyStatus = z.infer<typeof DifficultyStatusSchema>;

export const StatusHistoryEntrySchema = z.object({
  status: DifficultyStatusSchema,
  changedAt: z.string().datetime(),
  rule: z.string(),
});
export type StatusHistoryEntry = z.infer<typeof StatusHistoryEntrySchema>;

/**
 * Caderno de Erros / Registro de Dificuldade. Uma mesma entidade serve aos dois usos exigidos:
 * (a) o registro manual que o aluno já preenche na tela "Caderno de Erros" (`origin: "aluno_manual"`);
 * (b) a dificuldade agregada por conceito, aberta automaticamente pelo serviço pedagógico central
 * a partir de tentativas erradas reais (`origin: "auto_tentativa"`), com trilha de evidência.
 * Os campos herdados (cause/correctRule/resolved) são mantidos por compatibilidade; os novos
 * campos abaixo são todos opcionais/defaultados para não quebrar registros já existentes.
 */
export const ErrorEntrySchema = AuditFieldsSchema.extend({
  studentId: z.string().default(DEFAULT_STUDENT_ID),
  questionId: z.string().optional(),
  subjectSlug: z.string().optional(),
  topicSlug: z.string(),
  syllabusCodes: z.array(z.string()).default([]),
  /** Subtema/conceito específico dentro do tópico, quando conhecido (ex.: "dispensa x inexigibilidade"). */
  concept: z.string().optional(),
  cause: z.string(),
  correctRule: z.string(),
  sourceRef: z.string().optional(),
  newQuestionId: z.string().optional(),
  nextReviewDate: z.string(),
  /** Mantido por compatibilidade; sempre derivado de `status === "superado"` pelo serviço central. */
  resolved: z.boolean().default(false),

  firstOccurrenceAt: z.string().datetime().optional(),
  lastOccurrenceAt: z.string().datetime().optional(),
  occurrenceCount: z.number().int().min(1).default(1),
  /** IDs de `attempts` que comprovam este erro — a evidência nunca é resumida sem manter a origem. */
  evidenceAttemptIds: z.array(z.string()).default([]),
  /** IDs de `attempts` corretos posteriores ao mesmo conceito — usados para decidir superação, sem apagar o histórico do erro. */
  subsequentCorrectAttemptIds: z.array(z.string()).default([]),
  severity: z.enum(["baixa", "media", "alta"]).default("media"),
  status: DifficultyStatusSchema.default("aberto"),
  statusHistory: z.array(StatusHistoryEntrySchema).default([]),
  studentNote: z.string().optional(),
  errorNature: ErrorNatureSchema.default("ainda_nao_classificado"),
  errorNatureOrigin: ClassificationOriginSchema.optional(),
  errorNatureConfidence: z.number().min(0).max(1).optional(),
  origin: z.enum(["auto_tentativa", "aluno_manual"]).default("aluno_manual"),
});
export type ErrorEntry = z.infer<typeof ErrorEntrySchema>;

export const NoteSchema = AuditFieldsSchema.extend({
  lessonSlug: z.string().optional(),
  body: z.string(),
});
export type Note = z.infer<typeof NoteSchema>;

export const BookmarkSchema = AuditFieldsSchema.extend({
  targetType: z.enum(["lesson", "question", "video", "document"]),
  targetId: z.string(),
});
export type Bookmark = z.infer<typeof BookmarkSchema>;

/* ---------------- Mídia / NotebookLM ---------------- */

export const MediaAssetSchema = AuditFieldsSchema.extend({
  kind: z.enum(["video_youtube", "roteiro_podcast", "roteiro_video", "audio_sintetizado", "pdf", "mapa_mental"]),
  title: z.string(),
  url: z.string().url().optional(),
  topicSlug: z.string().optional(),
  channel: z.string().optional(),
  durationSeconds: z.number().int().optional(),
  publishedAt: z.string().optional(),
  justification: z.string().optional(),
  linkVerifiedAt: z.string().optional(),
  linkStatus: z.enum(["ok", "quebrado", "nao_verificado"]).default("nao_verificado"),
});
export type MediaAsset = z.infer<typeof MediaAssetSchema>;

export const NotebookPackageSchema = AuditFieldsSchema.extend({
  topicSlug: z.string(),
  sources: z.array(z.string()),
  summary: z.string(),
  suggestedQuestions: z.array(z.string()),
  instructionsMdPath: z.string(),
});
export type NotebookPackage = z.infer<typeof NotebookPackageSchema>;

/* ---------------- Perfil / desempenho ---------------- */

export const LearnerProfileSchema = AuditFieldsSchema.extend({
  weekdayHours: z.number().min(0),
  weekendHours: z.number().min(0),
  perceivedLevel: z.enum(["iniciante", "intermediario", "avancado"]),
  focusBlockMinutes: z.number().int().default(50),
  breakMinutes: z.number().int().default(10),
  onboardingCompletedAt: z.string().datetime().optional(),
  diagnosticCompletedAt: z.string().datetime().optional(),
});
export type LearnerProfile = z.infer<typeof LearnerProfileSchema>;

/**
 * Seis níveis (em vez dos 4 originais) para não tratar "60% de acerto com 2 questões" como a
 * mesma coisa que "60% de acerto com 40 questões". Um único acerto NUNCA produz "dominado" —
 * isso é validado em `src/lib/pedagogy/masteryRules.ts`, não apenas documentado aqui.
 */
export const MasteryLevelSchema = z.enum(["nao_estudado", "apresentado", "em_pratica", "fragil", "em_consolidacao", "dominado"]);
export type MasteryLevel = z.infer<typeof MasteryLevelSchema>;

export const MasterySnapshotSchema = AuditFieldsSchema.extend({
  studentId: z.string().default(DEFAULT_STUDENT_ID),
  subjectSlug: z.string().optional(),
  syllabusCodes: z.array(z.string()).default([]),
  topicSlug: z.string(),
  /** Ausente = granularidade é o tópico inteiro; presente = subtema/conceito específico. */
  concept: z.string().optional(),
  lessonsCompleted: z.number().int().default(0),
  accuracyRate: z.number().min(0).max(1),
  /** Acurácia calculada só sobre as últimas N tentativas (janela recente) — pode divergir da geral. */
  recentAccuracyRate: z.number().min(0).max(1).optional(),
  attemptsCount: z.number().int(),
  averageResponseTimeMs: z.number().int().optional(),
  averageConfidence: z.number().min(1).max(5).optional(),
  /** Acerto com confiança declarada baixa — indício de "acertou no chute". */
  correctLowConfidenceCount: z.number().int().default(0),
  /** Erro com confiança declarada alta — o sinal mais importante de fragilidade real. */
  wrongHighConfidenceCount: z.number().int().default(0),
  /** Sequência recente (mais nova por último) para detectar tendência, não só a média. */
  recentResultSequence: z.array(z.enum(["acerto", "erro"])).default([]),
  openDifficultyCount: z.number().int().default(0),
  recurrentDifficultyCount: z.number().int().default(0),
  reviewsCompleted: z.number().int().default(0),
  performanceBeforeReview: z.number().min(0).max(1).optional(),
  performanceAfterReview: z.number().min(0).max(1).optional(),
  lastActivityAt: z.string().datetime().optional(),
  nextReviewDate: z.string().optional(),
  masteryLevel: MasteryLevelSchema,
  /** IDs de `attempts` que fundamentam este snapshot — a pergunta "com base em quê?" sempre tem resposta. */
  evidenceAttemptIds: z.array(z.string()).default([]),
  /** Versão da regra de cálculo (ver `src/lib/pedagogy/masteryRules.ts`); muda só se a fórmula mudar. */
  ruleVersion: z.number().int().default(1),
  computedAt: z.string().datetime(),
});
export type MasterySnapshot = z.infer<typeof MasterySnapshotSchema>;

export const IntegrationSettingSchema = AuditFieldsSchema.extend({
  provider: z.enum(["anthropic", "youtube", "supabase", "google_notebooklm_enterprise", "tts"]),
  enabled: z.boolean(),
  configuredAt: z.string().datetime().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});
export type IntegrationSetting = z.infer<typeof IntegrationSettingSchema>;

/* ------------------------------------------------------------------------------------------------
 * MEMÓRIA PEDAGÓGICA — fundação de dados para o futuro Professor Transpetro Estudos.
 * Ver docs/MEMORIA_PEDAGOGICA.md para o mapa de entidades, dicionário de campos e regras.
 * Nenhuma entidade abaixo chama IA nem persiste chave de API — são apenas fatos observados,
 * dados informados pelo aluno e cálculos determinísticos (a distinção é proposital, ver missão).
 * ---------------------------------------------------------------------------------------------- */

/** Tipos de conteúdo/atividade que o contrato de referência (`ContentRef`) sabe apontar. */
export const ContentKindSchema = z.enum(["lesson", "video", "question", "mock_exam", "essay_prompt", "flashcard", "topic", "final_review"]);
export type ContentKind = z.infer<typeof ContentKindSchema>;

/**
 * Contrato mínimo de referência a um conteúdo/atividade já existente no catálogo (aula, vídeo,
 * questão, simulado, proposta de redação, flashcard ou tópico). NÃO substitui nem redefine os
 * catálogos atuais — é resolvido a partir deles em runtime por `src/lib/pedagogy/contentRef.ts`,
 * sem alterar nenhum arquivo de conteúdo. `concept` é opcional porque nem todo conteúdo legado
 * tem granularidade de subtema; quando ausente, o dado é tratado no nível do tópico inteiro.
 */
export const ContentRefSchema = z.object({
  kind: ContentKindSchema,
  id: z.string(),
  subjectSlug: z.string().optional(),
  syllabusCodes: z.array(z.string()).default([]),
  topicSlug: z.string().optional(),
  concept: z.string().optional(),
});
export type ContentRef = z.infer<typeof ContentRefSchema>;

/* ---------------- Sessão de estudo ---------------- */

export const SessionOriginSchema = z.enum(["curso", "biblioteca", "revisao", "questoes", "simulado", "redacao", "professor"]);
export type SessionOrigin = z.infer<typeof SessionOriginSchema>;

export const SessionStatusSchema = z.enum(["iniciada", "pausada", "concluida", "abandonada"]);
export type SessionStatus = z.infer<typeof SessionStatusSchema>;

export const StudySessionSchema = AuditFieldsSchema.extend({
  studentId: z.string().default(DEFAULT_STUDENT_ID),
  origin: SessionOriginSchema,
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().optional(),
  /** Tempo ativo real, só quando medido por interação (não por "página aberta"). Ausente = não medido — nunca inventado. */
  activeMs: z.number().int().min(0).optional(),
  status: SessionStatusSchema,
  /** Referência para retomar exatamente de onde parou (lessonSlug, questionId, mockExamAttemptId...). */
  resumePointRef: z.string().optional(),
  relatedActivityIds: z.array(z.string()).default([]),
  schemaVersion: z.number().int().default(1),
});
export type StudySession = z.infer<typeof StudySessionSchema>;

/* ---------------- Evento de aprendizagem ---------------- */

export const LearningEventKindSchema = z.enum([
  "aula_iniciada",
  "aula_concluida",
  "video_iniciado",
  "video_retomado",
  "video_concluido",
  "questao_respondida",
  "miniquiz_concluido",
  "revisao_iniciada",
  "revisao_concluida",
  "simulado_iniciado",
  "simulado_finalizado",
  "redacao_criada",
  "redacao_corrigida",
  "redacao_reescrita",
  "conteudo_marcado_dificil",
  "duvida_registrada",
  "etapa_retomada",
  "curso_dia_iniciado",
  "curso_dia_concluido",
  "curso_etapa_concluida",
  "teste_professor_concluido",
]);
export type LearningEventKind = z.infer<typeof LearningEventKindSchema>;

/**
 * Evento granular e imutável. Nunca é a mesma coisa que "concluir a atividade": abrir uma página
 * não gera "aula_concluida" — só a ação explícita do aluno (ou uma regra objetiva verificável) gera.
 */
export const LearningEventSchema = AuditFieldsSchema.extend({
  studentId: z.string().default(DEFAULT_STUDENT_ID),
  sessionId: z.string().optional(),
  kind: LearningEventKindSchema,
  contentRef: ContentRefSchema.optional(),
  /** ID da atividade concreta associada (lessonSlug, questionId, mockExamAttemptId, reviewScheduleId...). */
  activityId: z.string().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
  occurredAt: z.string().datetime(),
  /** Mesma lógica de dedupe de Attempt: reenvio com a mesma chave não duplica o evento. */
  idempotencyKey: z.string(),
});
export type LearningEvent = z.infer<typeof LearningEventSchema>;

/* ---------------- Dúvidas e marcações do aluno ---------------- */

export const DoubtKindSchema = z.enum(["nao_entendi", "quero_revisar", "achei_dificil", "duvida_especifica", "anotacao"]);
export type DoubtKind = z.infer<typeof DoubtKindSchema>;

export const DoubtStatusSchema = z.enum(["aberta", "resolvida"]);
export type DoubtStatus = z.infer<typeof DoubtStatusSchema>;

export const DoubtSchema = AuditFieldsSchema.extend({
  studentId: z.string().default(DEFAULT_STUDENT_ID),
  kind: DoubtKindSchema,
  contentRef: ContentRefSchema,
  excerpt: z.string().optional(),
  message: z.string().optional(),
  status: DoubtStatusSchema.default("aberta"),
  resolvedAt: z.string().datetime().optional(),
  resolutionNote: z.string().optional(),
});
export type Doubt = z.infer<typeof DoubtSchema>;

/* ---------------- Contexto do futuro Professor (contrato tipado, sem IA) ---------------- */

export const ProfessorActionKindSchema = z.enum([
  "revisar_aula",
  "resolver_questoes",
  "realizar_teste",
  "retomar_redacao",
  "agendar_revisao",
  "criar_plano_reforco",
]);
export type ProfessorActionKind = z.infer<typeof ProfessorActionKindSchema>;

export const ProfessorSuggestedActionSchema = z.object({
  action: ProfessorActionKindSchema,
  targetRef: ContentRefSchema.optional(),
  priority: z.enum(["baixa", "media", "alta"]),
  reason: z.string(),
  /** IDs (attempts, errorEntries, reviewSchedules...) que sustentam esta sugestão — nunca uma frase solta. */
  evidenceIds: z.array(z.string()).default([]),
  relatedResourceRefs: z.array(ContentRefSchema).default([]),
});
export type ProfessorSuggestedAction = z.infer<typeof ProfessorSuggestedActionSchema>;

const WeakConceptSchema = z.object({
  topicSlug: z.string(),
  concept: z.string().optional(),
  masteryLevel: MasteryLevelSchema,
  evidenceCount: z.number().int(),
});

const RecentActivitySchema = z.object({
  kind: z.string(),
  ref: ContentRefSchema.optional(),
  occurredAt: z.string(),
});

const OpenDifficultySummarySchema = z.object({
  id: z.string(),
  topicSlug: z.string(),
  concept: z.string().optional(),
  evidenceIds: z.array(z.string()),
});

const MockExamPerformanceSummarySchema = z.object({
  mockExamAttemptId: z.string(),
  totalScore: z.number().optional(),
  finishedAt: z.string().optional(),
});

/**
 * Resumo técnico enxuto e filtrável, montado só a partir de dados reais (nunca chama IA). É a
 * "memória" que uma futura integração com a API da OpenAI consultaria como contexto — por isso
 * não inclui transcrições completas de aulas nem o banco de questões inteiro, apenas IDs e
 * agregados que permitem buscar detalhe depois. Ver `src/lib/pedagogy/professorContext.ts`.
 */
export const ProfessorContextSchema = z.object({
  schemaVersion: z.number().int().default(1),
  generatedAt: z.string().datetime(),
  studentId: z.string(),
  examId: z.string().optional(),
  currentPosition: z.object({ missionIndex: z.number().nullable(), date: z.string() }).optional(),
  contentCompleted: z.array(z.string()),
  contentInProgress: z.array(z.string()),
  contentNotStarted: z.array(z.string()),
  recentActivities: z.array(RecentActivitySchema),
  reviewsDue: z.array(z.string()),
  reviewsAvailable: z.array(z.string()),
  reviewsUpcoming: z.array(z.string()),
  weakestConcepts: z.array(WeakConceptSchema),
  recentErrors: z.array(z.string()),
  recurrentErrors: z.array(z.string()),
  highConfidenceErrors: z.array(z.string()),
  openDifficulties: z.array(OpenDifficultySummarySchema),
  improvedAfterReview: z.array(z.string()),
  insufficientEvidence: z.array(z.string()),
  recentQuestionPerformance: z.object({ answered: z.number(), accuracy: z.number().nullable() }),
  recentMockExamPerformance: z.array(MockExamPerformanceSummarySchema),
  essayProgress: z.object({
    submissionsCount: z.number(),
    latestScore: z.number().optional(),
    fragileCriteria: z.array(z.string()),
  }),
  openDoubts: z.array(z.string()),
  suggestedActions: z.array(ProfessorSuggestedActionSchema),
});
export type ProfessorContext = z.infer<typeof ProfessorContextSchema>;

/* ------------------------------------------------------------------------------------------------
 * "Meu Curso" — plano guiado versionado.
 * Dados 100% versionados e separados da interface (ver src/content/coursePlan.ts). O que se adapta
 * por aluno é o calendário (data de início, atrasos) e o progresso — nunca a existência/ordem do
 * conteúdo obrigatório dentro de uma versão do plano.
 * ---------------------------------------------------------------------------------------------- */

export const COURSE_ID = "transpetro-nivel-medio-administracao-controle-2026";
export const COURSE_PLAN_VERSION = "v2";

export const CoursePhaseSchema = z.enum(["fundamentos", "desenvolvimento", "fechamento_edital", "consolidacao", "reta_final"]);
export type CoursePhase = z.infer<typeof CoursePhaseSchema>;

export const CourseStepTypeSchema = z.enum([
  "abertura",
  "revisao_programada",
  "aula_textual",
  "videoaula_obrigatoria",
  "exemplo_guiado",
  "checagem_compreensao",
  "questoes",
  "analise_erros",
  "pratica_redacao",
  "simulado_parcial",
  "simulado_completo",
  "fechamento_dia",
  "revisao_vespera",
]);
export type CourseStepType = z.infer<typeof CourseStepTypeSchema>;

/**
 * Uma etapa dentro de um dia do curso. `contentRef` aponta para o recurso real já existente no
 * catálogo (aula, vídeo, questão, proposta de redação) — a etapa nunca inventa conteúdo, apenas
 * referencia. Etapas sem `contentRef` (abertura, revisão programada, fechamento) são resolvidas em
 * runtime a partir da Fundação de Dados do Professor (ex.: revisões realmente devidas hoje).
 */
export const CourseStepSchema = z.object({
  id: z.string(),
  type: CourseStepTypeSchema,
  title: z.string(),
  estimatedMinutes: z.number().int().min(1),
  contentRef: ContentRefSchema.optional(),
  /** IDs adicionais quando a etapa cobre mais de um recurso (ex.: bloco de questões). */
  extraContentRefs: z.array(ContentRefSchema).default([]),
  optional: z.boolean().default(false),
  completionCriteria: z.string(),
});
export type CourseStep = z.infer<typeof CourseStepSchema>;

export const CourseDaySchema = z.object({
  day: z.number().int().min(1),
  phase: CoursePhaseSchema,
  title: z.string(),
  learningObjectives: z.array(z.string()).min(1),
  subjects: z.array(z.string()).min(1),
  syllabusCodes: z.array(z.string()).default([]),
  /** Dias (números 1..34) que precisam estar concluídos antes deste, dentro da mesma versão do plano. */
  prerequisites: z.array(z.number().int()).default([]),
  steps: z.array(CourseStepSchema).min(1),
  estimatedMinutesTotal: z.number().int().min(1),
  expectedOutcome: z.string(),
});
export type CourseDay = z.infer<typeof CourseDaySchema>;

export const CoursePlanSchema = z.object({
  courseId: z.string(),
  version: z.string(),
  generatedAt: z.string(),
  // PENDENTE DE CONFIRMAÇÃO — quantidade de dias do plano depende do cronograma real da Fase 2
  // (TOTAL_MISSIONS em config/concurso.ts ainda não definido). Relaxado para .min(0) até lá.
  days: z.array(CourseDaySchema).min(0),
});
export type CoursePlan = z.infer<typeof CoursePlanSchema>;

/* ---------------- Progresso do aluno no curso (dados pessoais, isolados do catálogo) ---------------- */

export const CourseEnrollmentSchema = AuditFieldsSchema.extend({
  studentId: z.string().default(DEFAULT_STUDENT_ID),
  courseId: z.string().default(COURSE_ID),
  planVersion: z.string().default(COURSE_PLAN_VERSION),
  /** Data local (YYYY-MM-DD, America/Bahia) escolhida/confirmada pelo aluno como Dia 1. */
  startDate: z.string(),
  schemaVersion: z.number().int().default(1),
});
export type CourseEnrollment = z.infer<typeof CourseEnrollmentSchema>;

export const CourseDayStatusSchema = z.enum(["nao_iniciado", "em_andamento", "concluido"]);
export type CourseDayStatus = z.infer<typeof CourseDayStatusSchema>;

/**
 * Agregado recalculável de progresso por dia — nunca é a fonte histórica (isso são os
 * `LearningEvent`/`StudySession`), apenas um cache de leitura rápida para "retomar de onde parei".
 */
/* ------------------------------------------------------------------------------------------------
 * Histórico de conversas com o Professor — retido só com consentimento do aluno (opt-out em
 * Configurações), com finalidade clara (rever o que foi explicado) e exclusão disponível a
 * qualquer momento. Nunca inclui áudio, só o texto (transcrito) da conversa.
 * ---------------------------------------------------------------------------------------------- */

export const ProfessorMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  occurredAt: z.string().datetime(),
});
export type ProfessorMessage = z.infer<typeof ProfessorMessageSchema>;

export const ProfessorConversationSchema = AuditFieldsSchema.extend({
  studentId: z.string().default(DEFAULT_STUDENT_ID),
  activeFunction: z.enum(["conversar", "revisar_erros", "tirar_duvida", "me_teste_agora", "plano_de_reforco", "corrigir_redacao"]),
  messages: z.array(ProfessorMessageSchema).default([]),
  viaVoz: z.boolean().default(false),
});
export type ProfessorConversation = z.infer<typeof ProfessorConversationSchema>;

export const CourseDayProgressSchema = AuditFieldsSchema.extend({
  studentId: z.string().default(DEFAULT_STUDENT_ID),
  courseId: z.string().default(COURSE_ID),
  planVersion: z.string().default(COURSE_PLAN_VERSION),
  day: z.number().int().min(1).max(34),
  status: CourseDayStatusSchema.default("nao_iniciado"),
  currentStepId: z.string().nullable().default(null),
  completedStepIds: z.array(z.string()).default([]),
  sessionId: z.string().optional(),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  schemaVersion: z.number().int().default(1),
});
export type CourseDayProgress = z.infer<typeof CourseDayProgressSchema>;
