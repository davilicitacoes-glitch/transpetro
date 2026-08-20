import { getDB } from "@/lib/db/dexie";
import { SUBJECTS, MODULES, TOPICS } from "@/content/curriculum";
import { ALL_LESSONS } from "@/content/lessons";
import {
  EXAM_BLUEPRINT,
  EXAM_DATE,
  ESSAY_MIN_LINES,
  ESSAY_MAX_LINES,
  ESSAY_TOTAL_POINTS,
  ESSAY_MIN_PASSING_POINTS,
  LAST_STUDY_DATE,
  OBJECTIVE_MIN_PASSING_POINTS,
  OBJECTIVE_TARGET_POINTS,
  EXAM_DURATION_HOURS,
  EXAM_SHIFT,
  CONCURSO_INFO,
} from "@config/concurso";
import type {
  Exam,
  ExamBlueprint,
  Flashcard,
  Lesson,
  OfficialSource,
  Question,
  CourseModule,
  Subject,
  SyllabusItem,
  Topic,
} from "@/lib/models/schema";

function nowIso(): string {
  return new Date().toISOString();
}

let counter = 0;
function makeId(prefix: string): string {
  counter += 1;
  return `${prefix}_${Date.now().toString(36)}_${counter.toString(36)}`;
}

/**
 * PENDENTE — Fase 2: substituir por fontes oficiais reais do Edital nº 3/2026 (Fundação Cesgranrio)
 * assim que o PDF oficial for lido linha a linha. Nenhuma URL/fonte foi inventada aqui; a lista
 * fica vazia até a Fase 2 confirmar e registrar as fontes normativas primárias.
 */
const OFFICIAL_SOURCES: Array<Omit<OfficialSource, "id" | "createdAt" | "updatedAt">> = [];

/**
 * Popula o banco local com o conteúdo-base oficial (edital, blueprint, matriz, curso e aulas).
 * Idempotente: pode ser chamado múltiplas vezes sem duplicar (usa `put`, que sobrescreve por id determinístico
 * derivado do slug/código, exceto para tabelas que já vierem vazias).
 */
export async function seedDatabase(): Promise<{ seeded: boolean; reason?: string }> {
  const db = getDB();

  const existingLessons = await db.lessons.count();
  if (existingLessons > 0) {
    return { seeded: false, reason: "already-seeded" };
  }

  const now = nowIso();

  // Fontes oficiais
  const sourceRecords: OfficialSource[] = OFFICIAL_SOURCES.map((s) => ({
    ...s,
    id: `source-${s.kind}-${s.consultedAt}-${s.title.slice(0, 12).replace(/\W+/g, "-").toLowerCase()}`,
    createdAt: now,
    updatedAt: now,
  }));
  await db.officialSources.bulkPut(sourceRecords);
  const sourceIds = sourceRecords.map((s) => s.id);

  // Exam + blueprint
  const exam: Exam = {
    id: "exam-transpetro-2026-nivel-medio-administracao-controle",
    organizer: CONCURSO_INFO.orgao,
    position: `${CONCURSO_INFO.cargo} — ${CONCURSO_INFO.enfase}`,
    examDate: EXAM_DATE,
    lastStudyDate: LAST_STUDY_DATE,
    shift: EXAM_SHIFT,
    durationHours: EXAM_DURATION_HOURS,
    minPassingPoints: OBJECTIVE_MIN_PASSING_POINTS,
    targetPoints: OBJECTIVE_TARGET_POINTS,
    essayMinLines: ESSAY_MIN_LINES,
    essayMaxLines: ESSAY_MAX_LINES,
    essayTotalPoints: ESSAY_TOTAL_POINTS,
    essayMinPassingPoints: ESSAY_MIN_PASSING_POINTS,
    sourceIds,
    createdAt: now,
    updatedAt: now,
  };
  await db.exams.put(exam);

  const blueprint: ExamBlueprint = {
    id: "blueprint-transpetro-2026-nivel-medio",
    examId: exam.id,
    subjects: EXAM_BLUEPRINT.map((s) => ({ subjectId: s.id, name: s.name, questionCount: s.questionCount, pointsPerQuestion: s.pointsPerQuestion })),
    createdAt: now,
    updatedAt: now,
  };
  await db.examBlueprints.put(blueprint);

  // Curso: subjects, modules, topics
  const subjectRecords: Subject[] = SUBJECTS.map((s) => ({
    id: `subject-${s.slug}`,
    slug: s.slug,
    name: s.name,
    description: s.description,
    color: s.color,
    examWeightPoints: s.examWeightPoints,
    createdAt: now,
    updatedAt: now,
  }));
  await db.subjects.bulkPut(subjectRecords);

  const moduleRecords: CourseModule[] = MODULES.map((m) => ({
    id: `module-${m.slug}`,
    slug: m.slug,
    subjectSlug: m.subjectSlug,
    name: m.name,
    order: m.order,
    createdAt: now,
    updatedAt: now,
  }));
  await db.modules.bulkPut(moduleRecords);

  const topicRecords: Topic[] = TOPICS.map((t) => ({
    id: `topic-${t.slug}`,
    slug: t.slug,
    moduleSlug: t.moduleSlug,
    name: t.name,
    syllabusCodes: t.syllabusCodes,
    order: t.order,
    createdAt: now,
    updatedAt: now,
  }));
  await db.topics.bulkPut(topicRecords);

  // SyllabusItem: 1 por código citado nas aulas, ligando a lessonSlugs
  const syllabusMap = new Map<string, { subjectSlug: string; lessonSlugs: string[] }>();
  for (const lesson of ALL_LESSONS) {
    for (const code of lesson.syllabusCodes) {
      const entry = syllabusMap.get(code) ?? { subjectSlug: lesson.subjectSlug, lessonSlugs: [] };
      entry.lessonSlugs.push(lesson.slug);
      syllabusMap.set(code, entry);
    }
  }
  const syllabusRecords: SyllabusItem[] = [...syllabusMap.entries()].map(([code, { subjectSlug, lessonSlugs }]) => ({
    id: `syllabus-${code}`,
    code,
    subjectId: subjectSlug as SyllabusItem["subjectId"],
    text: TOPICS.find((t) => t.syllabusCodes.includes(code))?.name ?? code,
    origem: code === "CE-22a" ? "desdobramento" : "expresso",
    origemJustificativa:
      code === "CE-22a"
        ? "Desdobramento normativo do item genérico 'noções de licitação' do Anexo IV, aplicando a lei vigente (14.133/2021)."
        : undefined,
    lessonSlugs,
    sourceIds: sourceIds.length > 0 ? [sourceIds[0]] : [],
    createdAt: now,
    updatedAt: now,
  }));
  await db.syllabusItems.bulkPut(syllabusRecords);

  // Lessons + Flashcards + mini-quiz Questions
  const lessonRecords: Lesson[] = [];
  const flashcardRecords: Flashcard[] = [];
  const questionRecords: Question[] = [];

  for (const lc of ALL_LESSONS) {
    const flashcardIds: string[] = [];
    lc.flashcards.forEach((fc, idx) => {
      const id = `flashcard-${lc.slug}-${idx}`;
      flashcardIds.push(id);
      flashcardRecords.push({
        id,
        lessonSlug: lc.slug,
        front: fc.front,
        back: fc.back,
        createdAt: now,
        updatedAt: now,
      });
    });

    const miniQuizQuestionIds: string[] = [];
    lc.miniQuiz.forEach((q, idx) => {
      const id = `question-${lc.slug}-mini-${idx}`;
      miniQuizQuestionIds.push(id);
      questionRecords.push({
        id,
        subjectSlug: lc.subjectSlug,
        topicSlug: lc.topicSlug,
        syllabusCodes: lc.syllabusCodes,
        statement: q.statement,
        options: q.options,
        difficulty: "medio",
        source: { origin: "inedita" },
        version: 1,
        createdAt: now,
        updatedAt: now,
      });
    });

    lessonRecords.push({
      id: `lesson-${lc.slug}`,
      slug: lc.slug,
      topicSlug: lc.topicSlug,
      subjectSlug: lc.subjectSlug,
      title: lc.title,
      learningObjective: lc.learningObjective,
      syllabusCodes: lc.syllabusCodes,
      estimatedMinutes: lc.estimatedMinutes,
      expectedMastery: lc.expectedMastery,
      bodyMdx: lc.bodyMdx,
      mustMemorize: lc.mustMemorize,
      workedExamples: lc.workedExamples,
      commonMistakes: lc.commonMistakes,
      howBoardMightAsk: lc.howBoardMightAsk,
      legalReferences: lc.legalReferences,
      reviewSummaryPoints: lc.reviewSummaryPoints,
      flashcardIds,
      miniQuizQuestionIds,
      version: 1,
      createdAt: now,
      updatedAt: now,
    });
  }

  await db.lessons.bulkPut(lessonRecords);
  await db.flashcards.bulkPut(flashcardRecords);
  await db.questions.bulkPut(questionRecords);

  return { seeded: true };
}
