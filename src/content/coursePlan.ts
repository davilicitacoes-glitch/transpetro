import { COURSE_ID, COURSE_PLAN_VERSION, type CourseDay, type CoursePlan } from "@/lib/models/schema";

/**
 * Cronograma "Meu Curso" — Fase 1 (conteúdo geral, dias 1-55) + Fase 2 (revisão, dias
 * 56-73, só estrutura/casca — ver docs/CONTINUIDADE_ENSIPETRO.md).
 *
 * Fase 1 cobre os 39 códigos do Anexo IV (PT-01..08, MAT-01..10, AC-01..21), com 1-2 dias por
 * código conforme peso (subtemas + questões do acervo), intercalada com 6 dias de revisão de
 * bloco. Distribuída pelo motor entre a data de início do aluno e 10/11/2026 (ver
 * src/lib/course/schedule.ts). Fase 2 (11/11 a 28/11/2026, véspera da prova) tem só a casca —
 * fase "reta_final", sem conteúdo específico ainda, aguardando prompt futuro de detalhamento.
 *
 * TOTAL_MISSIONS em config/concurso.ts deve ser sempre igual a days.length aqui.
 */
const DAYS: CourseDay[] = [
  {
    day: 1,
    phase: "desenvolvimento",
    title: "Conjuntos numéricos (MAT-01)",
    learningObjectives: ["Dominar Conjuntos numéricos, código MAT-01 do Anexo IV."],
    subjects: ["matematica"],
    syllabusCodes: ["MAT-01"],
    prerequisites: [],
    steps: [
      {
        id: "dia-1-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-1-aula",
        type: "aula_textual",
        title: "Aula: Conjuntos numéricos (MAT-01)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "mat-01-conjuntos-numericos",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-01"],
          topicSlug: "mat-01-conjuntos-numericos"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-1-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — MAT-01",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "MAT-01-2012-CESGRANRIO-11",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-01"],
          topicSlug: "mat-01-conjuntos-numericos"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-1-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-1-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Conjuntos numéricos."
  },
  {
    day: 2,
    phase: "consolidacao",
    title: "Logística e Gestão da Cadeia de Suprimentos (AC-10)",
    learningObjectives: ["Dominar Logística e Gestão da Cadeia de Suprimentos, código AC-10 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-10"],
    prerequisites: [],
    steps: [
      {
        id: "dia-2-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-2-aula",
        type: "aula_textual",
        title: "Aula: Logística e Gestão da Cadeia de Suprimentos (AC-10)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-10-logistica-cadeia-suprimentos",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-10"],
          topicSlug: "ac-10-logistica-cadeia-suprimentos"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-2-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-10",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-10-2012-CESGRANRIO-39",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-10"],
          topicSlug: "ac-10-logistica-cadeia-suprimentos"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-2-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-2-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Logística e Gestão da Cadeia de Suprimentos."
  },
  {
    day: 3,
    phase: "fundamentos",
    title: "Compreensão de textos de gêneros variados (PT-01)",
    learningObjectives: ["Dominar Compreensão de textos de gêneros variados, código PT-01 do Anexo IV."],
    subjects: ["portugues"],
    syllabusCodes: ["PT-01"],
    prerequisites: [],
    steps: [
      {
        id: "dia-3-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-3-aula",
        type: "aula_textual",
        title: "Aula: Compreensão de textos de gêneros variados (PT-01)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "pt-01-compreensao-textos",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-01"],
          topicSlug: "pt-01-compreensao-textos"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-3-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — PT-01",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "PT-01-2012-CESGRANRIO-1",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-01"],
          topicSlug: "pt-01-compreensao-textos"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-3-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-3-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Compreensão de textos de gêneros variados."
  },
  {
    day: 4,
    phase: "desenvolvimento",
    title: "Recursos Humanos (AC-01) — Parte 1",
    learningObjectives: ["Dominar Recursos Humanos, código AC-01 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-01"],
    prerequisites: [],
    steps: [
      {
        id: "dia-4-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-4-aula",
        type: "aula_textual",
        title: "Aula: Recursos Humanos (AC-01)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-01-recursos-humanos",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-01"],
          topicSlug: "ac-01-recursos-humanos"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-4-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-01",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-01-2012-CESGRANRIO-22",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-01"],
          topicSlug: "ac-01-recursos-humanos"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-4-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-4-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Recursos Humanos."
  },
  {
    day: 5,
    phase: "desenvolvimento",
    title: "Razão e proporção (MAT-02)",
    learningObjectives: ["Dominar Razão e proporção, código MAT-02 do Anexo IV."],
    subjects: ["matematica"],
    syllabusCodes: ["MAT-02"],
    prerequisites: [],
    steps: [
      {
        id: "dia-5-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-5-aula",
        type: "aula_textual",
        title: "Aula: Razão e proporção (MAT-02)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "mat-02-razao-proporcao",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-02"],
          topicSlug: "mat-02-razao-proporcao"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-5-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — MAT-02",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "MAT-02-2012-CESGRANRIO-13",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-02"],
          topicSlug: "mat-02-razao-proporcao"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-5-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-5-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Razão e proporção."
  },
  {
    day: 6,
    phase: "desenvolvimento",
    title: "Matemática Financeira (AC-06)",
    learningObjectives: ["Dominar Matemática Financeira, código AC-06 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-06"],
    prerequisites: [],
    steps: [
      {
        id: "dia-6-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-6-aula",
        type: "aula_textual",
        title: "Aula: Matemática Financeira (AC-06)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-06-matematica-financeira",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-06"],
          topicSlug: "ac-06-matematica-financeira"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-6-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-06",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-06-2012-CESGRANRIO-43",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-06"],
          topicSlug: "ac-06-matematica-financeira"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-6-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-6-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Matemática Financeira."
  },
  {
    day: 7,
    phase: "consolidacao",
    title: "Modalidades de transporte (AC-11)",
    learningObjectives: ["Dominar Modalidades de transporte, código AC-11 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-11"],
    prerequisites: [],
    steps: [
      {
        id: "dia-7-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-7-aula",
        type: "aula_textual",
        title: "Aula: Modalidades de transporte (AC-11)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-11-modalidades-transporte",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-11"],
          topicSlug: "ac-11-modalidades-transporte"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-7-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-11",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-11-2012-CESGRANRIO-40",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-11"],
          topicSlug: "ac-11-modalidades-transporte"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-7-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-7-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Modalidades de transporte."
  },
  {
    day: 8,
    phase: "fechamento_edital",
    title: "Fundamentos de computação (AC-18)",
    learningObjectives: ["Dominar Fundamentos de computação, código AC-18 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-18"],
    prerequisites: [],
    steps: [
      {
        id: "dia-8-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-8-aula",
        type: "aula_textual",
        title: "Aula: Fundamentos de computação (AC-18)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-18-fundamentos-computacao",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-18"],
          topicSlug: "ac-18-fundamentos-computacao"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-8-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-18",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-18-2025-CESGRANRIO-28",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-18"],
          topicSlug: "ac-18-fundamentos-computacao"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-8-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-8-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Fundamentos de computação."
  },
  {
    day: 9,
    phase: "desenvolvimento",
    title: "Relações e funções (MAT-03) — Parte 1",
    learningObjectives: ["Dominar Relações e funções, código MAT-03 do Anexo IV."],
    subjects: ["matematica"],
    syllabusCodes: ["MAT-03"],
    prerequisites: [],
    steps: [
      {
        id: "dia-9-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-9-aula",
        type: "aula_textual",
        title: "Aula: Relações e funções (MAT-03)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "mat-03-funcoes",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-03"],
          topicSlug: "mat-03-funcoes"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-9-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — MAT-03",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "MAT-03-2012-CESGRANRIO-15",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-03"],
          topicSlug: "mat-03-funcoes"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-9-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-9-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Relações e funções."
  },
  {
    day: 10,
    phase: "fundamentos",
    title: "Ortografia oficial (PT-02)",
    learningObjectives: ["Dominar Ortografia oficial, código PT-02 do Anexo IV."],
    subjects: ["portugues"],
    syllabusCodes: ["PT-02"],
    prerequisites: [],
    steps: [
      {
        id: "dia-10-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-10-aula",
        type: "aula_textual",
        title: "Aula: Ortografia oficial (PT-02)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "pt-02-ortografia-oficial",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-02"],
          topicSlug: "pt-02-ortografia-oficial"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-10-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — PT-02",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "PT-02-2012-CESGRANRIO-9",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-02"],
          topicSlug: "pt-02-ortografia-oficial"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-10-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-10-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Ortografia oficial."
  },
  {
    day: 11,
    phase: "consolidacao",
    title: "Gestão de Estoques (AC-12) — Parte 1",
    learningObjectives: ["Dominar Gestão de Estoques, código AC-12 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-12"],
    prerequisites: [],
    steps: [
      {
        id: "dia-11-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-11-aula",
        type: "aula_textual",
        title: "Aula: Gestão de Estoques (AC-12)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-12-gestao-estoques",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-12"],
          topicSlug: "ac-12-gestao-estoques"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-11-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-12",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-12-2012-CESGRANRIO-31",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-12"],
          topicSlug: "ac-12-gestao-estoques"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-11-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-11-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Gestão de Estoques."
  },
  {
    day: 12,
    phase: "desenvolvimento",
    title: "Relações e funções (MAT-03) — Parte 2",
    learningObjectives: ["Dominar Relações e funções, código MAT-03 do Anexo IV."],
    subjects: ["matematica"],
    syllabusCodes: ["MAT-03"],
    prerequisites: [],
    steps: [
      {
        id: "dia-12-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-12-pratica",
        type: "questoes",
        title: "Prática adicional — MAT-03 (Relações e funções)",
        estimatedMinutes: 25,
        contentRef: {
          kind: "question",
          id: "MAT-03-2018-CESGRANRIO-17",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-03"],
          topicSlug: "mat-03-funcoes"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder ao bloco de questões adicionais."
      },
      {
        id: "dia-12-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-12-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 42,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Relações e funções."
  },
  {
    day: 13,
    phase: "desenvolvimento",
    title: "Recursos Humanos (AC-01) — Parte 2",
    learningObjectives: ["Dominar Recursos Humanos, código AC-01 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-01"],
    prerequisites: [],
    steps: [
      {
        id: "dia-13-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-13-pratica",
        type: "questoes",
        title: "Prática adicional — AC-01 (Recursos Humanos)",
        estimatedMinutes: 25,
        contentRef: {
          kind: "question",
          id: "AC-01-2012-CESGRANRIO-23",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-01"],
          topicSlug: "ac-01-recursos-humanos"
        },
        extraContentRefs: [
          {
            kind: "question",
            id: "AC-01-2012-CESGRANRIO-24",
            subjectSlug: "especificas",
            syllabusCodes: ["AC-01"],
            topicSlug: "ac-01-recursos-humanos"
          },
          {
            kind: "question",
            id: "AC-01-2012-CESGRANRIO-25",
            subjectSlug: "especificas",
            syllabusCodes: ["AC-01"],
            topicSlug: "ac-01-recursos-humanos"
          }
        ],
        optional: false,
        completionCriteria: "Responder ao bloco de questões adicionais."
      },
      {
        id: "dia-13-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-13-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 42,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Recursos Humanos."
  },
  {
    day: 14,
    phase: "desenvolvimento",
    title: "Registros contábeis (AC-07) — Parte 1",
    learningObjectives: ["Dominar Registros contábeis, código AC-07 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-07"],
    prerequisites: [],
    steps: [
      {
        id: "dia-14-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-14-aula",
        type: "aula_textual",
        title: "Aula: Registros contábeis (AC-07)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-07-registros-contabeis",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-07"],
          topicSlug: "ac-07-registros-contabeis"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-14-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-07",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-07-2012-CESGRANRIO-41",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-07"],
          topicSlug: "ac-07-registros-contabeis"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-14-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-14-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Registros contábeis."
  },
  {
    day: 15,
    phase: "desenvolvimento",
    title: "Equações e sistemas lineares (MAT-04) — Parte 1",
    learningObjectives: ["Dominar Equações e sistemas lineares, código MAT-04 do Anexo IV."],
    subjects: ["matematica"],
    syllabusCodes: ["MAT-04"],
    prerequisites: [],
    steps: [
      {
        id: "dia-15-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-15-aula",
        type: "aula_textual",
        title: "Aula: Equações e sistemas lineares (MAT-04)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "mat-04-equacoes",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-04"],
          topicSlug: "mat-04-equacoes"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-15-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — MAT-04",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "MAT-04-2013-CESGRANRIO-13",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-04"],
          topicSlug: "mat-04-equacoes"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-15-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-15-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Equações e sistemas lineares."
  },
  {
    day: 16,
    phase: "fundamentos",
    title: "Mecanismos de coesão textual (PT-03)",
    learningObjectives: ["Dominar Mecanismos de coesão textual, código PT-03 do Anexo IV."],
    subjects: ["portugues"],
    syllabusCodes: ["PT-03"],
    prerequisites: [],
    steps: [
      {
        id: "dia-16-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-16-aula",
        type: "aula_textual",
        title: "Aula: Mecanismos de coesão textual (PT-03)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "pt-03-coesao-textual",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-03"],
          topicSlug: "pt-03-coesao-textual"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-16-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — PT-03",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "PT-03-2012-CESGRANRIO-2",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-03"],
          topicSlug: "pt-03-coesao-textual"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-16-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-16-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Mecanismos de coesão textual."
  },
  {
    day: 17,
    phase: "consolidacao",
    title: "Gestão de Estoques (AC-12) — Parte 2",
    learningObjectives: ["Dominar Gestão de Estoques, código AC-12 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-12"],
    prerequisites: [],
    steps: [
      {
        id: "dia-17-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-17-pratica",
        type: "questoes",
        title: "Prática adicional — AC-12 (Gestão de Estoques)",
        estimatedMinutes: 25,
        contentRef: {
          kind: "question",
          id: "AC-12-2012-CESGRANRIO-34",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-12"],
          topicSlug: "ac-12-gestao-estoques"
        },
        extraContentRefs: [
          {
            kind: "question",
            id: "AC-12-2012-CESGRANRIO-36",
            subjectSlug: "especificas",
            syllabusCodes: ["AC-12"],
            topicSlug: "ac-12-gestao-estoques"
          },
          {
            kind: "question",
            id: "AC-12-2012-CESGRANRIO-38",
            subjectSlug: "especificas",
            syllabusCodes: ["AC-12"],
            topicSlug: "ac-12-gestao-estoques"
          }
        ],
        optional: false,
        completionCriteria: "Responder ao bloco de questões adicionais."
      },
      {
        id: "dia-17-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-17-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 42,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Gestão de Estoques."
  },
  {
    day: 18,
    phase: "desenvolvimento",
    title: "Equações e sistemas lineares (MAT-04) — Parte 2",
    learningObjectives: ["Dominar Equações e sistemas lineares, código MAT-04 do Anexo IV."],
    subjects: ["matematica"],
    syllabusCodes: ["MAT-04"],
    prerequisites: [],
    steps: [
      {
        id: "dia-18-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-18-pratica",
        type: "questoes",
        title: "Prática adicional — MAT-04 (Equações e sistemas lineares)",
        estimatedMinutes: 25,
        contentRef: {
          kind: "question",
          id: "MAT-04-2013-CESGRANRIO-15",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-04"],
          topicSlug: "mat-04-equacoes"
        },
        extraContentRefs: [
          {
            kind: "question",
            id: "MAT-04-2011-CESGRANRIO-17",
            subjectSlug: "matematica",
            syllabusCodes: ["MAT-04"],
            topicSlug: "mat-04-equacoes"
          },
          {
            kind: "question",
            id: "MAT-04-2025-CESGRANRIO-12",
            subjectSlug: "matematica",
            syllabusCodes: ["MAT-04"],
            topicSlug: "mat-04-equacoes"
          }
        ],
        optional: false,
        completionCriteria: "Responder ao bloco de questões adicionais."
      },
      {
        id: "dia-18-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-18-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 42,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Equações e sistemas lineares."
  },
  {
    day: 19,
    phase: "fechamento_edital",
    title: "Aplicativos comerciais (AC-19)",
    learningObjectives: ["Dominar Aplicativos comerciais, código AC-19 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-19"],
    prerequisites: [],
    steps: [
      {
        id: "dia-19-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-19-aula",
        type: "aula_textual",
        title: "Aula: Aplicativos comerciais (AC-19)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-19-aplicativos-comerciais",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-19"],
          topicSlug: "ac-19-aplicativos-comerciais"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-19-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-19",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-19-2012-CESGRANRIO-55",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-19"],
          topicSlug: "ac-19-aplicativos-comerciais"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-19-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-19-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Aplicativos comerciais."
  },
  {
    day: 20,
    phase: "consolidacao",
    title: "Armazenagem (AC-13)",
    learningObjectives: ["Dominar Armazenagem, código AC-13 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-13"],
    prerequisites: [],
    steps: [
      {
        id: "dia-20-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-20-aula",
        type: "aula_textual",
        title: "Aula: Armazenagem (AC-13)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-13-armazenagem",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-13"],
          topicSlug: "ac-13-armazenagem"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-20-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-13",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-13-2012-CESGRANRIO-30",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-13"],
          topicSlug: "ac-13-armazenagem"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-20-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-20-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Armazenagem."
  },
  {
    day: 21,
    phase: "desenvolvimento",
    title: "Sistema de Gestão Integrado (AC-02)",
    learningObjectives: ["Dominar Sistema de Gestão Integrado, código AC-02 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-02"],
    prerequisites: [],
    steps: [
      {
        id: "dia-21-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-21-aula",
        type: "aula_textual",
        title: "Aula: Sistema de Gestão Integrado (AC-02)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-02-sistema-gestao-integrado",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-02"],
          topicSlug: "ac-02-sistema-gestao-integrado"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-21-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-02",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-02-2012-CESGRANRIO-21",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-02"],
          topicSlug: "ac-02-sistema-gestao-integrado"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-21-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-21-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Sistema de Gestão Integrado."
  },
  {
    day: 22,
    phase: "desenvolvimento",
    title: "Análise combinatória (MAT-05)",
    learningObjectives: ["Dominar Análise combinatória, código MAT-05 do Anexo IV."],
    subjects: ["matematica"],
    syllabusCodes: ["MAT-05"],
    prerequisites: [],
    steps: [
      {
        id: "dia-22-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-22-aula",
        type: "aula_textual",
        title: "Aula: Análise combinatória (MAT-05)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "mat-05-analise-combinatoria",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-05"],
          topicSlug: "mat-05-analise-combinatoria"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-22-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — MAT-05",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "MAT-05-2012-CESGRANRIO-14",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-05"],
          topicSlug: "mat-05-analise-combinatoria"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-22-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-22-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Análise combinatória."
  },
  {
    day: 23,
    phase: "fundamentos",
    title: "Emprego das classes de palavras (PT-04)",
    learningObjectives: ["Dominar Emprego das classes de palavras, código PT-04 do Anexo IV."],
    subjects: ["portugues"],
    syllabusCodes: ["PT-04"],
    prerequisites: [],
    steps: [
      {
        id: "dia-23-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-23-aula",
        type: "aula_textual",
        title: "Aula: Emprego das classes de palavras (PT-04)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "pt-04-classes-palavras",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-04"],
          topicSlug: "pt-04-classes-palavras"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-23-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — PT-04",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "PT-04-2013-CESGRANRIO-6",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-04"],
          topicSlug: "pt-04-classes-palavras"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-23-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-23-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Emprego das classes de palavras."
  },
  {
    day: 24,
    phase: "desenvolvimento",
    title: "Registros contábeis (AC-07) — Parte 2",
    learningObjectives: ["Dominar Registros contábeis, código AC-07 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-07"],
    prerequisites: [],
    steps: [
      {
        id: "dia-24-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-24-pratica",
        type: "questoes",
        title: "Prática adicional — AC-07 (Registros contábeis)",
        estimatedMinutes: 25,
        contentRef: {
          kind: "question",
          id: "AC-07-2012-CESGRANRIO-42",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-07"],
          topicSlug: "ac-07-registros-contabeis"
        },
        extraContentRefs: [
          {
            kind: "question",
            id: "AC-07-2012-CESGRANRIO-26",
            subjectSlug: "especificas",
            syllabusCodes: ["AC-07"],
            topicSlug: "ac-07-registros-contabeis"
          },
          {
            kind: "question",
            id: "AC-07-2012-CESGRANRIO-27",
            subjectSlug: "especificas",
            syllabusCodes: ["AC-07"],
            topicSlug: "ac-07-registros-contabeis"
          }
        ],
        optional: false,
        completionCriteria: "Responder ao bloco de questões adicionais."
      },
      {
        id: "dia-24-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-24-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 42,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Registros contábeis."
  },
  {
    day: 25,
    phase: "desenvolvimento",
    title: "Probabilidade básica (MAT-06)",
    learningObjectives: ["Dominar Probabilidade básica, código MAT-06 do Anexo IV."],
    subjects: ["matematica"],
    syllabusCodes: ["MAT-06"],
    prerequisites: [],
    steps: [
      {
        id: "dia-25-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-25-aula",
        type: "aula_textual",
        title: "Aula: Probabilidade básica (MAT-06)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "mat-06-probabilidade",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-06"],
          topicSlug: "mat-06-probabilidade"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-25-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — MAT-06",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "MAT-06-2012-CESGRANRIO-12",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-06"],
          topicSlug: "mat-06-probabilidade"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-25-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-25-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Probabilidade básica."
  },
  {
    day: 26,
    phase: "consolidacao",
    title: "Manuseio de Materiais (AC-14)",
    learningObjectives: ["Dominar Manuseio de Materiais, código AC-14 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-14"],
    prerequisites: [],
    steps: [
      {
        id: "dia-26-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-26-aula",
        type: "aula_textual",
        title: "Aula: Manuseio de Materiais (AC-14)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-14-manuseio-materiais",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-14"],
          topicSlug: "ac-14-manuseio-materiais"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-26-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-14",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-14-2012-CESGRANRIO-27",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-14"],
          topicSlug: "ac-14-manuseio-materiais"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-26-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-26-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Manuseio de Materiais."
  },
  {
    day: 27,
    phase: "fundamentos",
    title: "Concordância nominal e verbal (PT-05)",
    learningObjectives: ["Dominar Concordância nominal e verbal, código PT-05 do Anexo IV."],
    subjects: ["portugues"],
    syllabusCodes: ["PT-05"],
    prerequisites: [],
    steps: [
      {
        id: "dia-27-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-27-aula",
        type: "aula_textual",
        title: "Aula: Concordância nominal e verbal (PT-05)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "pt-05-concordancia",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-05"],
          topicSlug: "pt-05-concordancia"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-27-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — PT-05",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "PT-05-2012-CESGRANRIO-4",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-05"],
          topicSlug: "pt-05-concordancia"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-27-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-27-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Concordância nominal e verbal."
  },
  {
    day: 28,
    phase: "desenvolvimento",
    title: "Estatística básica (MAT-07) — Parte 1",
    learningObjectives: ["Dominar Estatística básica, código MAT-07 do Anexo IV."],
    subjects: ["matematica"],
    syllabusCodes: ["MAT-07"],
    prerequisites: [],
    steps: [
      {
        id: "dia-28-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-28-aula",
        type: "aula_textual",
        title: "Aula: Estatística básica (MAT-07)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "mat-07-estatistica",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-07"],
          topicSlug: "mat-07-estatistica"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-28-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — MAT-07",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "MAT-07-2012-CESGRANRIO-19",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-07"],
          topicSlug: "mat-07-estatistica"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-28-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-28-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Estatística básica."
  },
  {
    day: 29,
    phase: "desenvolvimento",
    title: "Função Administração Patrimonial (AC-03)",
    learningObjectives: ["Dominar Função Administração Patrimonial, código AC-03 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-03"],
    prerequisites: [],
    steps: [
      {
        id: "dia-29-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-29-aula",
        type: "aula_textual",
        title: "Aula: Função Administração Patrimonial (AC-03)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-03-administracao-patrimonial",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-03"],
          topicSlug: "ac-03-administracao-patrimonial"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-29-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-03",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-03-2013-CESGRANRIO-21",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-03"],
          topicSlug: "ac-03-administracao-patrimonial"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-29-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-29-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Função Administração Patrimonial."
  },
  {
    day: 30,
    phase: "consolidacao",
    title: "Embalagem (AC-15)",
    learningObjectives: ["Dominar Embalagem, código AC-15 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-15"],
    prerequisites: [],
    steps: [
      {
        id: "dia-30-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-30-aula",
        type: "aula_textual",
        title: "Aula: Embalagem (AC-15)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-15-embalagem",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-15"],
          topicSlug: "ac-15-embalagem"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-30-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-15",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-15-2018-CESGRANRIO-46",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-15"],
          topicSlug: "ac-15-embalagem"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-30-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-30-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Embalagem."
  },
  {
    day: 31,
    phase: "fechamento_edital",
    title: "Internet e intranet (AC-20)",
    learningObjectives: ["Dominar Internet e intranet, código AC-20 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-20"],
    prerequisites: [],
    steps: [
      {
        id: "dia-31-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-31-aula",
        type: "aula_textual",
        title: "Aula: Internet e intranet (AC-20)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-20-internet-intranet",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-20"],
          topicSlug: "ac-20-internet-intranet"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-31-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-20",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-20-2012-CESGRANRIO-51",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-20"],
          topicSlug: "ac-20-internet-intranet"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-31-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-31-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Internet e intranet."
  },
  {
    day: 32,
    phase: "desenvolvimento",
    title: "Estatística básica (MAT-07) — Parte 2",
    learningObjectives: ["Dominar Estatística básica, código MAT-07 do Anexo IV."],
    subjects: ["matematica"],
    syllabusCodes: ["MAT-07"],
    prerequisites: [],
    steps: [
      {
        id: "dia-32-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-32-pratica",
        type: "questoes",
        title: "Prática adicional — MAT-07 (Estatística básica)",
        estimatedMinutes: 25,
        contentRef: {
          kind: "question",
          id: "MAT-07-2011-CESGRANRIO-13",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-07"],
          topicSlug: "mat-07-estatistica"
        },
        extraContentRefs: [
          {
            kind: "question",
            id: "MAT-07-2011-CESGRANRIO-15",
            subjectSlug: "matematica",
            syllabusCodes: ["MAT-07"],
            topicSlug: "mat-07-estatistica"
          },
          {
            kind: "question",
            id: "MAT-07-2018-CESGRANRIO-14",
            subjectSlug: "matematica",
            syllabusCodes: ["MAT-07"],
            topicSlug: "mat-07-estatistica"
          }
        ],
        optional: false,
        completionCriteria: "Responder ao bloco de questões adicionais."
      },
      {
        id: "dia-32-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-32-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 42,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Estatística básica."
  },
  {
    day: 33,
    phase: "consolidacao",
    title: "Gestão de Compras (AC-16) — Parte 1",
    learningObjectives: ["Dominar Gestão de Compras, código AC-16 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-16"],
    prerequisites: [],
    steps: [
      {
        id: "dia-33-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-33-aula",
        type: "aula_textual",
        title: "Aula: Gestão de Compras (AC-16)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-16-gestao-compras",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-16"],
          topicSlug: "ac-16-gestao-compras"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-33-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-16",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-16-2012-CESGRANRIO-39",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-16"],
          topicSlug: "ac-16-gestao-compras"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-33-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-33-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Gestão de Compras."
  },
  {
    day: 34,
    phase: "fundamentos",
    title: "Emprego do sinal indicativo de crase (PT-06)",
    learningObjectives: ["Dominar Emprego do sinal indicativo de crase, código PT-06 do Anexo IV."],
    subjects: ["portugues"],
    syllabusCodes: ["PT-06"],
    prerequisites: [],
    steps: [
      {
        id: "dia-34-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-34-aula",
        type: "aula_textual",
        title: "Aula: Emprego do sinal indicativo de crase (PT-06)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "pt-06-crase",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-06"],
          topicSlug: "pt-06-crase"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-34-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — PT-06",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "PT-06-2012-CESGRANRIO-7",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-06"],
          topicSlug: "pt-06-crase"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-34-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-34-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Emprego do sinal indicativo de crase."
  },
  {
    day: 35,
    phase: "desenvolvimento",
    title: "Matemática financeira (MAT-08)",
    learningObjectives: ["Dominar Matemática financeira, código MAT-08 do Anexo IV."],
    subjects: ["matematica"],
    syllabusCodes: ["MAT-08"],
    prerequisites: [],
    steps: [
      {
        id: "dia-35-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-35-aula",
        type: "aula_textual",
        title: "Aula: Matemática financeira (MAT-08)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "mat-08-matematica-financeira",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-08"],
          topicSlug: "mat-08-matematica-financeira"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-35-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — MAT-08",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "MAT-08-2018-CESGRANRIO-11",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-08"],
          topicSlug: "mat-08-matematica-financeira"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-35-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-35-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Matemática financeira."
  },
  {
    day: 36,
    phase: "desenvolvimento",
    title: "Fluxo de caixa (AC-08)",
    learningObjectives: ["Dominar Fluxo de caixa, código AC-08 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-08"],
    prerequisites: [],
    steps: [
      {
        id: "dia-36-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-36-aula",
        type: "aula_textual",
        title: "Aula: Fluxo de caixa (AC-08)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-08-fluxo-caixa",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-08"],
          topicSlug: "ac-08-fluxo-caixa"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-36-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-08",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-08-2012-CESGRANRIO-37",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-08"],
          topicSlug: "ac-08-fluxo-caixa"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-36-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-36-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Fluxo de caixa."
  },
  {
    day: 37,
    phase: "desenvolvimento",
    title: "Gestão da manutenção (AC-04)",
    learningObjectives: ["Dominar Gestão da manutenção, código AC-04 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-04"],
    prerequisites: [],
    steps: [
      {
        id: "dia-37-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-37-aula",
        type: "aula_textual",
        title: "Aula: Gestão da manutenção (AC-04)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-04-gestao-manutencao",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-04"],
          topicSlug: "ac-04-gestao-manutencao"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-37-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-04",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-04-2012-CESGRANRIO-21",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-04"],
          topicSlug: "ac-04-gestao-manutencao"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-37-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-37-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Gestão da manutenção."
  },
  {
    day: 38,
    phase: "desenvolvimento",
    title: "Geometria plana (MAT-09) — Parte 1",
    learningObjectives: ["Dominar Geometria plana, código MAT-09 do Anexo IV."],
    subjects: ["matematica"],
    syllabusCodes: ["MAT-09"],
    prerequisites: [],
    steps: [
      {
        id: "dia-38-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-38-aula",
        type: "aula_textual",
        title: "Aula: Geometria plana (MAT-09)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "mat-09-geometria-plana",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-09"],
          topicSlug: "mat-09-geometria-plana"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-38-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — MAT-09",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "MAT-09-2012-CESGRANRIO-18",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-09"],
          topicSlug: "mat-09-geometria-plana"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-38-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-38-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Geometria plana."
  },
  {
    day: 39,
    phase: "consolidacao",
    title: "Gestão de Compras (AC-16) — Parte 2",
    learningObjectives: ["Dominar Gestão de Compras, código AC-16 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-16"],
    prerequisites: [],
    steps: [
      {
        id: "dia-39-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-39-pratica",
        type: "questoes",
        title: "Prática adicional — AC-16 (Gestão de Compras)",
        estimatedMinutes: 25,
        contentRef: {
          kind: "question",
          id: "AC-16-2013-CESGRANRIO-47",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-16"],
          topicSlug: "ac-16-gestao-compras"
        },
        extraContentRefs: [
          {
            kind: "question",
            id: "AC-16-2012-CESGRANRIO-28",
            subjectSlug: "especificas",
            syllabusCodes: ["AC-16"],
            topicSlug: "ac-16-gestao-compras"
          },
          {
            kind: "question",
            id: "AC-16-2012-CESGRANRIO-29b",
            subjectSlug: "especificas",
            syllabusCodes: ["AC-16"],
            topicSlug: "ac-16-gestao-compras"
          }
        ],
        optional: false,
        completionCriteria: "Responder ao bloco de questões adicionais."
      },
      {
        id: "dia-39-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-39-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 42,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Gestão de Compras."
  },
  {
    day: 40,
    phase: "fundamentos",
    title: "Sinais de pontuação (PT-07)",
    learningObjectives: ["Dominar Sinais de pontuação, código PT-07 do Anexo IV."],
    subjects: ["portugues"],
    syllabusCodes: ["PT-07"],
    prerequisites: [],
    steps: [
      {
        id: "dia-40-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-40-aula",
        type: "aula_textual",
        title: "Aula: Sinais de pontuação (PT-07)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "pt-07-pontuacao",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-07"],
          topicSlug: "pt-07-pontuacao"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-40-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — PT-07",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "PT-07-2013-CESGRANRIO-7",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-07"],
          topicSlug: "pt-07-pontuacao"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-40-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-40-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Sinais de pontuação."
  },
  {
    day: 41,
    phase: "desenvolvimento",
    title: "Geometria plana (MAT-09) — Parte 2",
    learningObjectives: ["Dominar Geometria plana, código MAT-09 do Anexo IV."],
    subjects: ["matematica"],
    syllabusCodes: ["MAT-09"],
    prerequisites: [],
    steps: [
      {
        id: "dia-41-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-41-pratica",
        type: "questoes",
        title: "Prática adicional — MAT-09 (Geometria plana)",
        estimatedMinutes: 25,
        contentRef: {
          kind: "question",
          id: "MAT-09-2013-CESGRANRIO-14",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-09"],
          topicSlug: "mat-09-geometria-plana"
        },
        extraContentRefs: [
          {
            kind: "question",
            id: "MAT-09-2011-CESGRANRIO-18",
            subjectSlug: "matematica",
            syllabusCodes: ["MAT-09"],
            topicSlug: "mat-09-geometria-plana"
          },
          {
            kind: "question",
            id: "MAT-09-2018-CESGRANRIO-18",
            subjectSlug: "matematica",
            syllabusCodes: ["MAT-09"],
            topicSlug: "mat-09-geometria-plana"
          }
        ],
        optional: false,
        completionCriteria: "Responder ao bloco de questões adicionais."
      },
      {
        id: "dia-41-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-41-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 42,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Geometria plana."
  },
  {
    day: 42,
    phase: "consolidacao",
    title: "Gestão de Contratos (AC-17) — Parte 1",
    learningObjectives: ["Dominar Gestão de Contratos, código AC-17 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-17"],
    prerequisites: [],
    steps: [
      {
        id: "dia-42-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-42-aula",
        type: "aula_textual",
        title: "Aula: Gestão de Contratos (AC-17)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-17-gestao-contratos",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-17"],
          topicSlug: "ac-17-gestao-contratos"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-42-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-17",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-17-2013-CESGRANRIO-48",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-17"],
          topicSlug: "ac-17-gestao-contratos"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-42-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-42-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Gestão de Contratos."
  },
  {
    day: 43,
    phase: "fechamento_edital",
    title: "Segurança da informação e LGPD (AC-21)",
    learningObjectives: ["Dominar Segurança da informação e LGPD, código AC-21 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-21"],
    prerequisites: [],
    steps: [
      {
        id: "dia-43-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-43-aula",
        type: "aula_textual",
        title: "Aula: Segurança da informação e LGPD (AC-21)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-21-seguranca-informacao-lgpd",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-21"],
          topicSlug: "ac-21-seguranca-informacao-lgpd"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-43-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-21",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-21-2012-CESGRANRIO-58",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-21"],
          topicSlug: "ac-21-seguranca-informacao-lgpd"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-43-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-43-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Segurança da informação e LGPD."
  },
  {
    day: 44,
    phase: "fechamento_edital",
    title: "Revisão intercalada — Noções de Informática (AC-18 a AC-21)",
    learningObjectives: ["Consolidar todo o bloco de Noções de Informática (AC-18 a AC-21) antes de seguir para a próxima disciplina."],
    subjects: ["especificas"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-44-abertura",
        type: "abertura",
        title: "Abertura da revisão",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação da revisão."
      },
      {
        id: "dia-44-revisao-programada",
        type: "revisao_programada",
        title: "Revisão de tudo que foi visto em Noções de Informática (AC-18 a AC-21)",
        estimatedMinutes: 30,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Revisar flashcards, pontos de memorização e mapas mentais do bloco recém-concluído."
      },
      {
        id: "dia-44-fechamento",
        type: "fechamento_dia",
        title: "Fechamento da revisão",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas na revisão."
      }
    ],
    estimatedMinutesTotal: 37,
    expectedOutcome: "Revisão consolidada de Noções de Informática (AC-18 a AC-21), pronto para avançar sem lacunas do bloco anterior."
  },
  {
    day: 45,
    phase: "desenvolvimento",
    title: "Balanço Patrimonial e DRE (AC-09)",
    learningObjectives: ["Dominar Balanço Patrimonial e DRE, código AC-09 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-09"],
    prerequisites: [],
    steps: [
      {
        id: "dia-45-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-45-aula",
        type: "aula_textual",
        title: "Aula: Balanço Patrimonial e DRE (AC-09)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-09-balanco-dre",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-09"],
          topicSlug: "ac-09-balanco-dre"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-45-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-09",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-09-2012-CESGRANRIO-21",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-09"],
          topicSlug: "ac-09-balanco-dre"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-45-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-45-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Balanço Patrimonial e DRE."
  },
  {
    day: 46,
    phase: "desenvolvimento",
    title: "Revisão intercalada — Finanças e Contabilidade (AC-06 a AC-09)",
    learningObjectives: ["Consolidar todo o bloco de Finanças e Contabilidade (AC-06 a AC-09) antes de seguir para a próxima disciplina."],
    subjects: ["especificas"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-46-abertura",
        type: "abertura",
        title: "Abertura da revisão",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação da revisão."
      },
      {
        id: "dia-46-revisao-programada",
        type: "revisao_programada",
        title: "Revisão de tudo que foi visto em Finanças e Contabilidade (AC-06 a AC-09)",
        estimatedMinutes: 30,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Revisar flashcards, pontos de memorização e mapas mentais do bloco recém-concluído."
      },
      {
        id: "dia-46-fechamento",
        type: "fechamento_dia",
        title: "Fechamento da revisão",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas na revisão."
      }
    ],
    estimatedMinutesTotal: 37,
    expectedOutcome: "Revisão consolidada de Finanças e Contabilidade (AC-06 a AC-09), pronto para avançar sem lacunas do bloco anterior."
  },
  {
    day: 47,
    phase: "desenvolvimento",
    title: "Geometria espacial (MAT-10) — Parte 1",
    learningObjectives: ["Dominar Geometria espacial, código MAT-10 do Anexo IV."],
    subjects: ["matematica"],
    syllabusCodes: ["MAT-10"],
    prerequisites: [],
    steps: [
      {
        id: "dia-47-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-47-aula",
        type: "aula_textual",
        title: "Aula: Geometria espacial (MAT-10)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "mat-10-geometria-espacial",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-10"],
          topicSlug: "mat-10-geometria-espacial"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-47-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — MAT-10",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "MAT-10-2012-CESGRANRIO-17",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-10"],
          topicSlug: "mat-10-geometria-espacial"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-47-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-47-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Geometria espacial."
  },
  {
    day: 48,
    phase: "desenvolvimento",
    title: "Gestão de Indicadores (AC-05)",
    learningObjectives: ["Dominar Gestão de Indicadores, código AC-05 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-05"],
    prerequisites: [],
    steps: [
      {
        id: "dia-48-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-48-aula",
        type: "aula_textual",
        title: "Aula: Gestão de Indicadores (AC-05)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "ac-05-gestao-indicadores",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-05"],
          topicSlug: "ac-05-gestao-indicadores"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-48-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — AC-05",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "AC-05-2013-CESGRANRIO-49",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-05"],
          topicSlug: "ac-05-gestao-indicadores"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-48-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-48-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Gestão de Indicadores."
  },
  {
    day: 49,
    phase: "desenvolvimento",
    title: "Revisão intercalada — Processos Administrativos e Legislação (AC-01 a AC-05)",
    learningObjectives: ["Consolidar todo o bloco de Processos Administrativos e Legislação (AC-01 a AC-05) antes de seguir para a próxima disciplina."],
    subjects: ["especificas"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-49-abertura",
        type: "abertura",
        title: "Abertura da revisão",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação da revisão."
      },
      {
        id: "dia-49-revisao-programada",
        type: "revisao_programada",
        title: "Revisão de tudo que foi visto em Processos Administrativos e Legislação (AC-01 a AC-05)",
        estimatedMinutes: 30,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Revisar flashcards, pontos de memorização e mapas mentais do bloco recém-concluído."
      },
      {
        id: "dia-49-fechamento",
        type: "fechamento_dia",
        title: "Fechamento da revisão",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas na revisão."
      }
    ],
    estimatedMinutesTotal: 37,
    expectedOutcome: "Revisão consolidada de Processos Administrativos e Legislação (AC-01 a AC-05), pronto para avançar sem lacunas do bloco anterior."
  },
  {
    day: 50,
    phase: "fundamentos",
    title: "Significação das palavras (PT-08)",
    learningObjectives: ["Dominar Significação das palavras, código PT-08 do Anexo IV."],
    subjects: ["portugues"],
    syllabusCodes: ["PT-08"],
    prerequisites: [],
    steps: [
      {
        id: "dia-50-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-50-aula",
        type: "aula_textual",
        title: "Aula: Significação das palavras (PT-08)",
        estimatedMinutes: 40,
        contentRef: {
          kind: "lesson",
          id: "pt-08-significacao-palavras",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-08"],
          topicSlug: "pt-08-significacao-palavras"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a aula completa até o fim."
      },
      {
        id: "dia-50-checagem",
        type: "checagem_compreensao",
        title: "Checagem de compreensão — PT-08",
        estimatedMinutes: 3,
        contentRef: {
          kind: "question",
          id: "PT-08-2012-CESGRANRIO-6",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-08"],
          topicSlug: "pt-08-significacao-palavras"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Responder a questão de checagem."
      },
      {
        id: "dia-50-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-50-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 60,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Significação das palavras."
  },
  {
    day: 51,
    phase: "fundamentos",
    title: "Revisão intercalada — Língua Portuguesa (PT-01 a PT-08)",
    learningObjectives: ["Consolidar todo o bloco de Língua Portuguesa (PT-01 a PT-08) antes de seguir para a próxima disciplina."],
    subjects: ["portugues"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-51-abertura",
        type: "abertura",
        title: "Abertura da revisão",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação da revisão."
      },
      {
        id: "dia-51-revisao-programada",
        type: "revisao_programada",
        title: "Revisão de tudo que foi visto em Língua Portuguesa (PT-01 a PT-08)",
        estimatedMinutes: 30,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Revisar flashcards, pontos de memorização e mapas mentais do bloco recém-concluído."
      },
      {
        id: "dia-51-fechamento",
        type: "fechamento_dia",
        title: "Fechamento da revisão",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas na revisão."
      }
    ],
    estimatedMinutesTotal: 37,
    expectedOutcome: "Revisão consolidada de Língua Portuguesa (PT-01 a PT-08), pronto para avançar sem lacunas do bloco anterior."
  },
  {
    day: 52,
    phase: "consolidacao",
    title: "Gestão de Contratos (AC-17) — Parte 2",
    learningObjectives: ["Dominar Gestão de Contratos, código AC-17 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-17"],
    prerequisites: [],
    steps: [
      {
        id: "dia-52-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-52-releitura",
        type: "aula_textual",
        title: "Releitura e aprofundamento — AC-17",
        estimatedMinutes: 25,
        contentRef: {
          kind: "lesson",
          id: "ac-17-gestao-contratos",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-17"],
          topicSlug: "ac-17-gestao-contratos"
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Reler os pontos de memorização e o mapa mental da aula."
      },
      {
        id: "dia-52-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-52-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 42,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Gestão de Contratos."
  },
  {
    day: 53,
    phase: "consolidacao",
    title: "Revisão intercalada — Logística e Cadeia de Suprimentos (AC-10 a AC-17)",
    learningObjectives: ["Consolidar todo o bloco de Logística e Cadeia de Suprimentos (AC-10 a AC-17) antes de seguir para a próxima disciplina."],
    subjects: ["especificas"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-53-abertura",
        type: "abertura",
        title: "Abertura da revisão",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação da revisão."
      },
      {
        id: "dia-53-revisao-programada",
        type: "revisao_programada",
        title: "Revisão de tudo que foi visto em Logística e Cadeia de Suprimentos (AC-10 a AC-17)",
        estimatedMinutes: 30,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Revisar flashcards, pontos de memorização e mapas mentais do bloco recém-concluído."
      },
      {
        id: "dia-53-fechamento",
        type: "fechamento_dia",
        title: "Fechamento da revisão",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas na revisão."
      }
    ],
    estimatedMinutesTotal: 37,
    expectedOutcome: "Revisão consolidada de Logística e Cadeia de Suprimentos (AC-10 a AC-17), pronto para avançar sem lacunas do bloco anterior."
  },
  {
    day: 54,
    phase: "desenvolvimento",
    title: "Geometria espacial (MAT-10) — Parte 2",
    learningObjectives: ["Dominar Geometria espacial, código MAT-10 do Anexo IV."],
    subjects: ["matematica"],
    syllabusCodes: ["MAT-10"],
    prerequisites: [],
    steps: [
      {
        id: "dia-54-abertura",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-54-pratica",
        type: "questoes",
        title: "Prática adicional — MAT-10 (Geometria espacial)",
        estimatedMinutes: 25,
        contentRef: {
          kind: "question",
          id: "MAT-10-2013-CESGRANRIO-12",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-10"],
          topicSlug: "mat-10-geometria-espacial"
        },
        extraContentRefs: [
          {
            kind: "question",
            id: "MAT-10-2018-CESGRANRIO-15",
            subjectSlug: "matematica",
            syllabusCodes: ["MAT-10"],
            topicSlug: "mat-10-geometria-espacial"
          }
        ],
        optional: false,
        completionCriteria: "Responder ao bloco de questões adicionais."
      },
      {
        id: "dia-54-revisao-programada",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-54-fechamento",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 42,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Geometria espacial."
  },
  {
    day: 55,
    phase: "desenvolvimento",
    title: "Revisão intercalada — Matemática (MAT-01 a MAT-10)",
    learningObjectives: ["Consolidar todo o bloco de Matemática (MAT-01 a MAT-10) antes de seguir para a próxima disciplina."],
    subjects: ["matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-55-abertura",
        type: "abertura",
        title: "Abertura da revisão",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação da revisão."
      },
      {
        id: "dia-55-revisao-programada",
        type: "revisao_programada",
        title: "Revisão de tudo que foi visto em Matemática (MAT-01 a MAT-10)",
        estimatedMinutes: 30,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Revisar flashcards, pontos de memorização e mapas mentais do bloco recém-concluído."
      },
      {
        id: "dia-55-fechamento",
        type: "fechamento_dia",
        title: "Fechamento da revisão",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas na revisão."
      }
    ],
    estimatedMinutesTotal: 37,
    expectedOutcome: "Revisão consolidada de Matemática (MAT-01 a MAT-10), pronto para avançar sem lacunas do bloco anterior."
  },
  {
    day: 56,
    phase: "reta_final",
    title: "Revisão geral — Dia 1",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-56-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 57,
    phase: "reta_final",
    title: "Revisão geral — Dia 2",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-57-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 58,
    phase: "reta_final",
    title: "Revisão geral — Dia 3",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-58-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 59,
    phase: "reta_final",
    title: "Revisão geral — Dia 4",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-59-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 60,
    phase: "reta_final",
    title: "Revisão geral — Dia 5",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-60-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 61,
    phase: "reta_final",
    title: "Revisão geral — Dia 6",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-61-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 62,
    phase: "reta_final",
    title: "Revisão geral — Dia 7",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-62-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 63,
    phase: "reta_final",
    title: "Revisão geral — Dia 8",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-63-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 64,
    phase: "reta_final",
    title: "Revisão geral — Dia 9",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-64-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 65,
    phase: "reta_final",
    title: "Revisão geral — Dia 10",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-65-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 66,
    phase: "reta_final",
    title: "Revisão geral — Dia 11",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-66-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 67,
    phase: "reta_final",
    title: "Revisão geral — Dia 12",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-67-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 68,
    phase: "reta_final",
    title: "Revisão geral — Dia 13",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-68-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 69,
    phase: "reta_final",
    title: "Revisão geral — Dia 14",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-69-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 70,
    phase: "reta_final",
    title: "Revisão geral — Dia 15",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-70-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 71,
    phase: "reta_final",
    title: "Revisão geral — Dia 16",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-71-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 72,
    phase: "reta_final",
    title: "Revisão geral — Dia 17",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-72-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  },
  {
    day: 73,
    phase: "reta_final",
    title: "Revisão geral — Dia 18",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-73-abertura",
        type: "abertura",
        title: "Revisão geral (estrutura ainda não detalhada)",
        estimatedMinutes: 1,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "PENDENTE — Fase 2 (11/11 a 28/11) será detalhada em uma missão futura: resumão geral, reassistir aulas importantes, mais questões, simulados e provas reais completas. Este dia existe só como estrutura no calendário por enquanto."
      }
    ],
    estimatedMinutesTotal: 1,
    expectedOutcome: "PENDENTE — conteúdo específico deste dia de revisão será definido em prompt futuro."
  }
];

export function buildCoursePlanV2(): CoursePlan {
  return {
    courseId: COURSE_ID,
    version: COURSE_PLAN_VERSION,
    generatedAt: new Date().toISOString(),
    days: DAYS,
  };
}

export const COURSE_PLAN_V2: CoursePlan = buildCoursePlanV2();
