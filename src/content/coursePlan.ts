import { COURSE_ID, COURSE_PLAN_VERSION, type CourseDay, type CoursePlan } from "@/lib/models/schema";

/**
 * Fase 2 em andamento — plano guiado populado incrementalmente, um dia por vez, com conteúdo
 * genuíno (aulas reais em `src/content/lessons/`, questões reais em `src/content/questions/`).
 * Hoje cobre apenas o Dia 1 (AC-01 Recursos Humanos + PT-01 Compreensão de textos). Os demais dias
 * (cobrindo os outros 37 códigos da matriz — ver MATRIZ_EDITAL_TRANSPETRO.md) ainda serão escritos.
 *
 * `config/concurso.ts` → TOTAL_MISSIONS deve ser mantido igual a `days.length` abaixo (o motor de
 * calendário e "dia atual" depende dessa igualdade — ver src/lib/course/schedule.ts).
 */
const DAY_1: CourseDay = {
  day: 1,
  phase: "fundamentos",
  title: "Recursos Humanos e Compreensão de Textos",
  learningObjectives: [
    "Diferenciar corretamente os subprocessos de Gestão de Pessoas cobrados no edital (recrutamento e seleção, cargos e carreira, T&D, gestão de desempenho e competências, relações de trabalho).",
    "Aplicar técnicas de leitura ativa para responder questões de interpretação de texto, reconhecendo a diferença entre ideia central, detalhe, inferência válida e extrapolação.",
  ],
  subjects: ["especificas", "portugues"],
  syllabusCodes: ["AC-01", "PT-01"],
  prerequisites: [],
  estimatedMinutesTotal: 90,
  expectedOutcome:
    "Ao final do dia, o aluno reconhece os 5 subtemas de RH do edital sem confundi-los entre si, e consegue justificar cada resposta de interpretação de texto apontando a evidência no texto, não em conhecimento externo.",
  steps: [
    {
      id: "dia-1-abertura",
      type: "abertura",
      title: "Abertura do Dia 1",
      estimatedMinutes: 2,
      extraContentRefs: [],
      optional: false,
      completionCriteria: "Ler a apresentação do dia e seguir para a primeira aula.",
    },
    {
      id: "dia-1-aula-ac-01",
      type: "aula_textual",
      title: "Aula: Recursos Humanos (AC-01)",
      estimatedMinutes: 35,
      contentRef: {
        kind: "lesson",
        id: "ac-01-recursos-humanos",
        subjectSlug: "especificas",
        syllabusCodes: ["AC-01"],
        topicSlug: "ac-01-recursos-humanos",
      },
      extraContentRefs: [],
      optional: false,
      completionCriteria: "Ler a aula completa até o fim.",
    },
    {
      id: "dia-1-checagem-ac-01",
      type: "checagem_compreensao",
      title: "Checagem de compreensão — Recursos Humanos",
      estimatedMinutes: 3,
      contentRef: {
        kind: "question",
        id: "q-ac-01-recursos-humanos-1",
        subjectSlug: "especificas",
        syllabusCodes: ["AC-01"],
        topicSlug: "ac-01-recursos-humanos",
      },
      extraContentRefs: [],
      optional: false,
      completionCriteria: "Responder a questão de checagem.",
    },
    {
      id: "dia-1-aula-pt-01",
      type: "aula_textual",
      title: "Aula: Compreensão de textos de gêneros variados (PT-01)",
      estimatedMinutes: 30,
      contentRef: {
        kind: "lesson",
        id: "pt-01-compreensao-textos",
        subjectSlug: "portugues",
        syllabusCodes: ["PT-01"],
        topicSlug: "pt-01-compreensao-textos",
      },
      extraContentRefs: [],
      optional: false,
      completionCriteria: "Ler a aula completa até o fim.",
    },
    {
      id: "dia-1-checagem-pt-01",
      type: "checagem_compreensao",
      title: "Checagem de compreensão — Compreensão de textos",
      estimatedMinutes: 3,
      contentRef: {
        kind: "question",
        id: "q-pt-01-compreensao-textos-1",
        subjectSlug: "portugues",
        syllabusCodes: ["PT-01"],
        topicSlug: "pt-01-compreensao-textos",
      },
      extraContentRefs: [],
      optional: false,
      completionCriteria: "Responder a questão de checagem.",
    },
    {
      id: "dia-1-revisao-programada",
      type: "revisao_programada",
      title: "Revisão programada do dia",
      estimatedMinutes: 12,
      extraContentRefs: [],
      optional: true,
      completionCriteria: "Revisar os flashcards e revisões que estiverem vencidos hoje (se houver).",
    },
    {
      id: "dia-1-fechamento",
      type: "fechamento_dia",
      title: "Fechamento do Dia 1",
      estimatedMinutes: 5,
      extraContentRefs: [],
      optional: false,
      completionCriteria: "Registrar confiança e dificuldades percebidas no dia.",
    },
  ],
};

export function buildCoursePlanV2(): CoursePlan {
  return {
    courseId: COURSE_ID,
    version: COURSE_PLAN_VERSION,
    generatedAt: new Date().toISOString(),
    days: [DAY_1],
  };
}

export const COURSE_PLAN_V2: CoursePlan = buildCoursePlanV2();
