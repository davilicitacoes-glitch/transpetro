import { COURSE_ID, COURSE_PLAN_VERSION, type CourseDay, type CoursePlan } from "@/lib/models/schema";

/**
 * Cronograma "Meu Curso" — Fase 1 (conteúdo geral, dias 1-30) + Fase 2 (revisão, dias
 * 31-48, só estrutura/casca — ver docs/CONTINUIDADE_ENSIPETRO.md).
 *
 * Fase 1 cobre os 39 códigos do Anexo IV (PT-01..08, MAT-01..10, AC-01..21) combinados em 24 dias
 * de 2-3 códigos cada (nunca 1 código isolado por dia), intercalando disciplinas por round-robin
 * ponderado de "maior resto" — cada dia tem aula em slide narrado + videoaula obrigatória (quando
 * há vídeo curado para o código) + checagem de compreensão para cada tópico do dia — intercalada
 * com 6 dias de revisão de bloco. Distribuída pelo motor entre a data de início do aluno e o começo
 * da Fase 2 (ver src/lib/course/schedule.ts, que espalha esses dias sobre os dias úteis
 * disponíveis). Fase 2 (últimas semanas antes da prova) tem só a casca — fase "reta_final", sem
 * conteúdo específico ainda, aguardando prompt futuro de detalhamento.
 *
 * TOTAL_MISSIONS em config/concurso.ts deve ser sempre igual a days.length aqui. Gerado por
 * scripts/merge-course-days.js a partir da versão anterior (1 código por dia) — ver esse script
 * para o algoritmo exato caso o conteúdo precise ser regenerado no futuro.
 */
const DAYS: CourseDay[] = [
  {
    day: 1,
    phase: "consolidacao",
    title: "Dia 1 — Conjuntos numéricos (MAT-01) + Logística e Gestão da Cadeia de Suprimentos (AC-10)",
    learningObjectives: ["Dominar Conjuntos numéricos, código MAT-01 do Anexo IV.", "Dominar Logística e Gestão da Cadeia de Suprimentos, código AC-10 do Anexo IV."],
    subjects: ["matematica", "especificas"],
    syllabusCodes: ["MAT-01", "AC-10"],
    prerequisites: [],
    steps: [
      {
        id: "dia-1-s01",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-1-s02",
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
        id: "dia-1-s03",
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
        id: "dia-1-s04",
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
        id: "dia-1-s05",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Logística e Gestão da Cadeia de Suprimentos (AC-10)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-10-79",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-10"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-1-s06",
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
        id: "dia-1-s07",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-1-s08",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 115,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Conjuntos numéricos. Consegue responder corretamente questões objetivas sobre Logística e Gestão da Cadeia de Suprimentos."
  },
  {
    day: 2,
    phase: "desenvolvimento",
    title: "Dia 2 — Compreensão de textos de gêneros variados (PT-01) + Recursos Humanos (AC-01)",
    learningObjectives: ["Dominar Compreensão de textos de gêneros variados, código PT-01 do Anexo IV.", "Dominar Recursos Humanos, código AC-01 do Anexo IV."],
    subjects: ["portugues", "especificas"],
    syllabusCodes: ["PT-01", "AC-01"],
    prerequisites: [],
    steps: [
      {
        id: "dia-2-s09",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-2-s10",
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
        id: "dia-2-s11",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Compreensão de textos de gêneros variados (PT-01)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-pt-01-1",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-01"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-2-s12",
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
        id: "dia-2-s13",
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
        id: "dia-2-s14",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Recursos Humanos (AC-01)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-01-52",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-01"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-2-s15",
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
        id: "dia-2-s16",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-2-s17",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 127,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Compreensão de textos de gêneros variados. Consegue responder corretamente questões objetivas sobre Recursos Humanos."
  },
  {
    day: 3,
    phase: "desenvolvimento",
    title: "Dia 3 — Razão e proporção (MAT-02) + Matemática Financeira (AC-06)",
    learningObjectives: ["Dominar Razão e proporção, código MAT-02 do Anexo IV.", "Dominar Matemática Financeira, código AC-06 do Anexo IV."],
    subjects: ["matematica", "especificas"],
    syllabusCodes: ["MAT-02", "AC-06"],
    prerequisites: [],
    steps: [
      {
        id: "dia-3-s18",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-3-s19",
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
        id: "dia-3-s20",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Razão e proporção (MAT-02)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-mat-02-25",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-02"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-3-s21",
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
        id: "dia-3-s22",
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
        id: "dia-3-s23",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Matemática Financeira (AC-06)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-06-67",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-06"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-3-s24",
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
        id: "dia-3-s25",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-3-s26",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 127,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Razão e proporção. Consegue responder corretamente questões objetivas sobre Matemática Financeira."
  },
  {
    day: 4,
    phase: "fechamento_edital",
    title: "Dia 4 — Modalidades de transporte (AC-11) + Fundamentos de computação (AC-18)",
    learningObjectives: ["Dominar Modalidades de transporte, código AC-11 do Anexo IV.", "Dominar Fundamentos de computação, código AC-18 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-11", "AC-18"],
    prerequisites: [],
    steps: [
      {
        id: "dia-4-s27",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-4-s28",
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
        id: "dia-4-s29",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Modalidades de transporte (AC-11)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-11-82",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-11"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-4-s30",
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
        id: "dia-4-s31",
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
        id: "dia-4-s32",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Fundamentos de computação (AC-18)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-18-101",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-18"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-4-s33",
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
        id: "dia-4-s34",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-4-s35",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 127,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Modalidades de transporte. Consegue responder corretamente questões objetivas sobre Fundamentos de computação."
  },
  {
    day: 5,
    phase: "fundamentos",
    title: "Dia 5 — Relações e funções (MAT-03) + Ortografia oficial (PT-02)",
    learningObjectives: ["Dominar Relações e funções, código MAT-03 do Anexo IV.", "Dominar Ortografia oficial, código PT-02 do Anexo IV."],
    subjects: ["matematica", "portugues"],
    syllabusCodes: ["MAT-03", "PT-02"],
    prerequisites: [],
    steps: [
      {
        id: "dia-5-s36",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-5-s37",
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
        id: "dia-5-s38",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Relações e funções (MAT-03)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-mat-03-28",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-03"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-5-s39",
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
        id: "dia-5-s40",
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
        id: "dia-5-s41",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Ortografia oficial (PT-02)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-pt-02-4",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-02"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-5-s42",
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
        id: "dia-5-s43",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-5-s44",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 127,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Relações e funções. Consegue responder corretamente questões objetivas sobre Ortografia oficial."
  },
  {
    day: 6,
    phase: "desenvolvimento",
    title: "Dia 6 — Gestão de Estoques (AC-12) + Relações e funções (MAT-03)",
    learningObjectives: ["Dominar Gestão de Estoques, código AC-12 do Anexo IV.", "Dominar Relações e funções, código MAT-03 do Anexo IV."],
    subjects: ["especificas", "matematica"],
    syllabusCodes: ["AC-12", "MAT-03"],
    prerequisites: [],
    steps: [
      {
        id: "dia-6-s45",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-6-s46",
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
        id: "dia-6-s47",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Gestão de Estoques (AC-12)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-12-85",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-12"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-6-s48",
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
        id: "dia-6-s49",
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
        id: "dia-6-s50",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-6-s51",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 97,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Gestão de Estoques. Consegue responder corretamente questões objetivas sobre Relações e funções."
  },
  {
    day: 7,
    phase: "desenvolvimento",
    title: "Dia 7 — Recursos Humanos (AC-01) + Registros contábeis (AC-07)",
    learningObjectives: ["Dominar Recursos Humanos, código AC-01 do Anexo IV.", "Dominar Registros contábeis, código AC-07 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-01", "AC-07"],
    prerequisites: [],
    steps: [
      {
        id: "dia-7-s52",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-7-s53",
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
        id: "dia-7-s54",
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
        id: "dia-7-s55",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Registros contábeis (AC-07)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-07-70",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-07"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-7-s56",
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
        id: "dia-7-s57",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-7-s58",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 97,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Recursos Humanos. Consegue responder corretamente questões objetivas sobre Registros contábeis."
  },
  {
    day: 8,
    phase: "fundamentos",
    title: "Dia 8 — Equações e sistemas lineares (MAT-04) + Mecanismos de coesão textual (PT-03)",
    learningObjectives: ["Dominar Equações e sistemas lineares, código MAT-04 do Anexo IV.", "Dominar Mecanismos de coesão textual, código PT-03 do Anexo IV."],
    subjects: ["matematica", "portugues"],
    syllabusCodes: ["MAT-04", "PT-03"],
    prerequisites: [],
    steps: [
      {
        id: "dia-8-s59",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-8-s60",
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
        id: "dia-8-s61",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Equações e sistemas lineares (MAT-04)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-mat-04-31",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-04"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-8-s62",
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
        id: "dia-8-s63",
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
        id: "dia-8-s64",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Mecanismos de coesão textual (PT-03)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-pt-03-7",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-03"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-8-s65",
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
        id: "dia-8-s66",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-8-s67",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 127,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Equações e sistemas lineares. Consegue responder corretamente questões objetivas sobre Mecanismos de coesão textual."
  },
  {
    day: 9,
    phase: "desenvolvimento",
    title: "Dia 9 — Gestão de Estoques (AC-12) + Equações e sistemas lineares (MAT-04)",
    learningObjectives: ["Dominar Gestão de Estoques, código AC-12 do Anexo IV.", "Dominar Equações e sistemas lineares, código MAT-04 do Anexo IV."],
    subjects: ["especificas", "matematica"],
    syllabusCodes: ["AC-12", "MAT-04"],
    prerequisites: [],
    steps: [
      {
        id: "dia-9-s68",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-9-s69",
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
        id: "dia-9-s70",
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
        id: "dia-9-s71",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-9-s72",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 67,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Gestão de Estoques. Consegue responder corretamente questões objetivas sobre Equações e sistemas lineares."
  },
  {
    day: 10,
    phase: "consolidacao",
    title: "Dia 10 — Aplicativos comerciais (AC-19) + Armazenagem (AC-13)",
    learningObjectives: ["Dominar Aplicativos comerciais, código AC-19 do Anexo IV.", "Dominar Armazenagem, código AC-13 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-19", "AC-13"],
    prerequisites: [],
    steps: [
      {
        id: "dia-10-s73",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-10-s74",
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
        id: "dia-10-s75",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Aplicativos comerciais (AC-19)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-19-104",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-19"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-10-s76",
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
        id: "dia-10-s77",
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
        id: "dia-10-s78",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Armazenagem (AC-13)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-13-88",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-13"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-10-s79",
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
        id: "dia-10-s80",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-10-s81",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 127,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Aplicativos comerciais. Consegue responder corretamente questões objetivas sobre Armazenagem."
  },
  {
    day: 11,
    phase: "desenvolvimento",
    title: "Dia 11 — Sistema de Gestão Integrado (AC-02) + Análise combinatória (MAT-05)",
    learningObjectives: ["Dominar Sistema de Gestão Integrado, código AC-02 do Anexo IV.", "Dominar Análise combinatória, código MAT-05 do Anexo IV."],
    subjects: ["especificas", "matematica"],
    syllabusCodes: ["AC-02", "MAT-05"],
    prerequisites: [],
    steps: [
      {
        id: "dia-11-s82",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-11-s83",
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
        id: "dia-11-s84",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Sistema de Gestão Integrado (AC-02)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-02-55",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-02"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-11-s85",
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
        id: "dia-11-s86",
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
        id: "dia-11-s87",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Análise combinatória (MAT-05)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-mat-05-34",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-05"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-11-s88",
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
        id: "dia-11-s89",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-11-s90",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 127,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Sistema de Gestão Integrado. Consegue responder corretamente questões objetivas sobre Análise combinatória."
  },
  {
    day: 12,
    phase: "desenvolvimento",
    title: "Dia 12 — Emprego das classes de palavras (PT-04) + Registros contábeis (AC-07)",
    learningObjectives: ["Dominar Emprego das classes de palavras, código PT-04 do Anexo IV.", "Dominar Registros contábeis, código AC-07 do Anexo IV."],
    subjects: ["portugues", "especificas"],
    syllabusCodes: ["PT-04", "AC-07"],
    prerequisites: [],
    steps: [
      {
        id: "dia-12-s91",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-12-s92",
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
        id: "dia-12-s93",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Emprego das classes de palavras (PT-04)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-pt-04-10",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-04"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-12-s94",
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
        id: "dia-12-s95",
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
        id: "dia-12-s96",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-12-s97",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 97,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Emprego das classes de palavras. Consegue responder corretamente questões objetivas sobre Registros contábeis."
  },
  {
    day: 13,
    phase: "consolidacao",
    title: "Dia 13 — Probabilidade básica (MAT-06) + Manuseio de Materiais (AC-14)",
    learningObjectives: ["Dominar Probabilidade básica, código MAT-06 do Anexo IV.", "Dominar Manuseio de Materiais, código AC-14 do Anexo IV."],
    subjects: ["matematica", "especificas"],
    syllabusCodes: ["MAT-06", "AC-14"],
    prerequisites: [],
    steps: [
      {
        id: "dia-13-s98",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-13-s99",
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
        id: "dia-13-s100",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Probabilidade básica (MAT-06)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-mat-06-37",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-06"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-13-s101",
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
        id: "dia-13-s102",
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
        id: "dia-13-s103",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Manuseio de Materiais (AC-14)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-14-91",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-14"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-13-s104",
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
        id: "dia-13-s105",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-13-s106",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 127,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Probabilidade básica. Consegue responder corretamente questões objetivas sobre Manuseio de Materiais."
  },
  {
    day: 14,
    phase: "desenvolvimento",
    title: "Dia 14 — Concordância nominal e verbal (PT-05) + Estatística básica (MAT-07)",
    learningObjectives: ["Dominar Concordância nominal e verbal, código PT-05 do Anexo IV.", "Dominar Estatística básica, código MAT-07 do Anexo IV."],
    subjects: ["portugues", "matematica"],
    syllabusCodes: ["PT-05", "MAT-07"],
    prerequisites: [],
    steps: [
      {
        id: "dia-14-s107",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-14-s108",
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
        id: "dia-14-s109",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Concordância nominal e verbal (PT-05)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-pt-05-13",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-05"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-14-s110",
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
        id: "dia-14-s111",
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
        id: "dia-14-s112",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Estatística básica (MAT-07)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-mat-07-40",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-07"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-14-s113",
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
        id: "dia-14-s114",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-14-s115",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 127,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Concordância nominal e verbal. Consegue responder corretamente questões objetivas sobre Estatística básica."
  },
  {
    day: 15,
    phase: "consolidacao",
    title: "Dia 15 — Função Administração Patrimonial (AC-03) + Embalagem (AC-15)",
    learningObjectives: ["Dominar Função Administração Patrimonial, código AC-03 do Anexo IV.", "Dominar Embalagem, código AC-15 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-03", "AC-15"],
    prerequisites: [],
    steps: [
      {
        id: "dia-15-s116",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-15-s117",
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
        id: "dia-15-s118",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Função Administração Patrimonial (AC-03)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-03-58",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-03"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-15-s119",
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
        id: "dia-15-s120",
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
        id: "dia-15-s121",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Embalagem (AC-15)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-15-93",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-15"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-15-s122",
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
        id: "dia-15-s123",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-15-s124",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 127,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Função Administração Patrimonial. Consegue responder corretamente questões objetivas sobre Embalagem."
  },
  {
    day: 16,
    phase: "desenvolvimento",
    title: "Dia 16 — Internet e intranet (AC-20) + Estatística básica (MAT-07)",
    learningObjectives: ["Dominar Internet e intranet, código AC-20 do Anexo IV.", "Dominar Estatística básica, código MAT-07 do Anexo IV."],
    subjects: ["especificas", "matematica"],
    syllabusCodes: ["AC-20", "MAT-07"],
    prerequisites: [],
    steps: [
      {
        id: "dia-16-s125",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-16-s126",
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
        id: "dia-16-s127",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Internet e intranet (AC-20)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-20-107",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-20"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-16-s128",
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
        id: "dia-16-s129",
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
        id: "dia-16-s130",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-16-s131",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 97,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Internet e intranet. Consegue responder corretamente questões objetivas sobre Estatística básica."
  },
  {
    day: 17,
    phase: "fundamentos",
    title: "Dia 17 — Gestão de Compras (AC-16) + Emprego do sinal indicativo de crase (PT-06)",
    learningObjectives: ["Dominar Gestão de Compras, código AC-16 do Anexo IV.", "Dominar Emprego do sinal indicativo de crase, código PT-06 do Anexo IV."],
    subjects: ["especificas", "portugues"],
    syllabusCodes: ["AC-16", "PT-06"],
    prerequisites: [],
    steps: [
      {
        id: "dia-17-s132",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-17-s133",
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
        id: "dia-17-s134",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Gestão de Compras (AC-16)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-16-95",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-16"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-17-s135",
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
        id: "dia-17-s136",
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
        id: "dia-17-s137",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Emprego do sinal indicativo de crase (PT-06)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-pt-06-16",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-06"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-17-s138",
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
        id: "dia-17-s139",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-17-s140",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 127,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Gestão de Compras. Consegue responder corretamente questões objetivas sobre Emprego do sinal indicativo de crase."
  },
  {
    day: 18,
    phase: "desenvolvimento",
    title: "Dia 18 — Matemática financeira (MAT-08) + Fluxo de caixa (AC-08)",
    learningObjectives: ["Dominar Matemática financeira, código MAT-08 do Anexo IV.", "Dominar Fluxo de caixa, código AC-08 do Anexo IV."],
    subjects: ["matematica", "especificas"],
    syllabusCodes: ["MAT-08", "AC-08"],
    prerequisites: [],
    steps: [
      {
        id: "dia-18-s141",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-18-s142",
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
        id: "dia-18-s143",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Matemática financeira (MAT-08)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-mat-08-43",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-08"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-18-s144",
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
        id: "dia-18-s145",
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
        id: "dia-18-s146",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Fluxo de caixa (AC-08)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-08-73",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-08"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-18-s147",
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
        id: "dia-18-s148",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-18-s149",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 127,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Matemática financeira. Consegue responder corretamente questões objetivas sobre Fluxo de caixa."
  },
  {
    day: 19,
    phase: "desenvolvimento",
    title: "Dia 19 — Gestão da manutenção (AC-04) + Geometria plana (MAT-09)",
    learningObjectives: ["Dominar Gestão da manutenção, código AC-04 do Anexo IV.", "Dominar Geometria plana, código MAT-09 do Anexo IV."],
    subjects: ["especificas", "matematica"],
    syllabusCodes: ["AC-04", "MAT-09"],
    prerequisites: [],
    steps: [
      {
        id: "dia-19-s150",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-19-s151",
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
        id: "dia-19-s152",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Gestão da manutenção (AC-04)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-04-61",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-04"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-19-s153",
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
        id: "dia-19-s154",
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
        id: "dia-19-s155",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Geometria plana (MAT-09)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-mat-09-46",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-09"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-19-s156",
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
        id: "dia-19-s157",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-19-s158",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 127,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Gestão da manutenção. Consegue responder corretamente questões objetivas sobre Geometria plana."
  },
  {
    day: 20,
    phase: "fundamentos",
    title: "Dia 20 — Gestão de Compras (AC-16) + Sinais de pontuação (PT-07)",
    learningObjectives: ["Dominar Gestão de Compras, código AC-16 do Anexo IV.", "Dominar Sinais de pontuação, código PT-07 do Anexo IV."],
    subjects: ["especificas", "portugues"],
    syllabusCodes: ["AC-16", "PT-07"],
    prerequisites: [],
    steps: [
      {
        id: "dia-20-s159",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-20-s160",
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
        id: "dia-20-s161",
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
        id: "dia-20-s162",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Sinais de pontuação (PT-07)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-pt-07-19",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-07"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-20-s163",
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
        id: "dia-20-s164",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-20-s165",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 97,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Gestão de Compras. Consegue responder corretamente questões objetivas sobre Sinais de pontuação."
  },
  {
    day: 21,
    phase: "consolidacao",
    title: "Dia 21 — Geometria plana (MAT-09) + Gestão de Contratos (AC-17)",
    learningObjectives: ["Dominar Geometria plana, código MAT-09 do Anexo IV.", "Dominar Gestão de Contratos, código AC-17 do Anexo IV."],
    subjects: ["matematica", "especificas"],
    syllabusCodes: ["MAT-09", "AC-17"],
    prerequisites: [],
    steps: [
      {
        id: "dia-21-s166",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-21-s167",
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
        id: "dia-21-s168",
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
        id: "dia-21-s169",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Gestão de Contratos (AC-17)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-17-98",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-17"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-21-s170",
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
        id: "dia-21-s171",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-21-s172",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 97,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Geometria plana. Consegue responder corretamente questões objetivas sobre Gestão de Contratos."
  },
  {
    day: 22,
    phase: "desenvolvimento",
    title: "Dia 22 — Segurança da informação e LGPD (AC-21) + Balanço Patrimonial e DRE (AC-09)",
    learningObjectives: ["Dominar Segurança da informação e LGPD, código AC-21 do Anexo IV.", "Dominar Balanço Patrimonial e DRE, código AC-09 do Anexo IV."],
    subjects: ["especificas"],
    syllabusCodes: ["AC-21", "AC-09"],
    prerequisites: [],
    steps: [
      {
        id: "dia-22-s173",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-22-s174",
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
        id: "dia-22-s175",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Segurança da informação e LGPD (AC-21)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-21-110",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-21"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-22-s176",
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
        id: "dia-22-s177",
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
        id: "dia-22-s178",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Balanço Patrimonial e DRE (AC-09)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-09-76",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-09"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-22-s179",
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
        id: "dia-22-s180",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-22-s181",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 127,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Segurança da informação e LGPD. Consegue responder corretamente questões objetivas sobre Balanço Patrimonial e DRE."
  },
  {
    day: 23,
    phase: "fechamento_edital",
    title: "Revisão intercalada — Noções de Informática (AC-18 a AC-21)",
    learningObjectives: ["Consolidar todo o bloco de Noções de Informática (AC-18 a AC-21) antes de seguir para a próxima disciplina."],
    subjects: ["especificas"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-23-s182",
        type: "abertura",
        title: "Abertura da revisão",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação da revisão."
      },
      {
        id: "dia-23-s183",
        type: "revisao_programada",
        title: "Revisão de tudo que foi visto em Noções de Informática (AC-18 a AC-21)",
        estimatedMinutes: 30,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Revisar flashcards, pontos de memorização e mapas mentais do bloco recém-concluído."
      },
      {
        id: "dia-23-s184",
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
    day: 24,
    phase: "desenvolvimento",
    title: "Revisão intercalada — Finanças e Contabilidade (AC-06 a AC-09)",
    learningObjectives: ["Consolidar todo o bloco de Finanças e Contabilidade (AC-06 a AC-09) antes de seguir para a próxima disciplina."],
    subjects: ["especificas"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-24-s185",
        type: "abertura",
        title: "Abertura da revisão",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação da revisão."
      },
      {
        id: "dia-24-s186",
        type: "revisao_programada",
        title: "Revisão de tudo que foi visto em Finanças e Contabilidade (AC-06 a AC-09)",
        estimatedMinutes: 30,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Revisar flashcards, pontos de memorização e mapas mentais do bloco recém-concluído."
      },
      {
        id: "dia-24-s187",
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
    day: 25,
    phase: "desenvolvimento",
    title: "Dia 25 — Geometria espacial (MAT-10) + Gestão de Indicadores (AC-05)",
    learningObjectives: ["Dominar Geometria espacial, código MAT-10 do Anexo IV.", "Dominar Gestão de Indicadores, código AC-05 do Anexo IV."],
    subjects: ["matematica", "especificas"],
    syllabusCodes: ["MAT-10", "AC-05"],
    prerequisites: [],
    steps: [
      {
        id: "dia-25-s188",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-25-s189",
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
        id: "dia-25-s190",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Geometria espacial (MAT-10)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-mat-10-49",
          subjectSlug: "matematica",
          syllabusCodes: ["MAT-10"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-25-s191",
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
        id: "dia-25-s192",
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
        id: "dia-25-s193",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Gestão de Indicadores (AC-05)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-ac-05-64",
          subjectSlug: "especificas",
          syllabusCodes: ["AC-05"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-25-s194",
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
        id: "dia-25-s195",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-25-s196",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 127,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Geometria espacial. Consegue responder corretamente questões objetivas sobre Gestão de Indicadores."
  },
  {
    day: 26,
    phase: "desenvolvimento",
    title: "Revisão intercalada — Processos Administrativos e Legislação (AC-01 a AC-05)",
    learningObjectives: ["Consolidar todo o bloco de Processos Administrativos e Legislação (AC-01 a AC-05) antes de seguir para a próxima disciplina."],
    subjects: ["especificas"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-26-s197",
        type: "abertura",
        title: "Abertura da revisão",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação da revisão."
      },
      {
        id: "dia-26-s198",
        type: "revisao_programada",
        title: "Revisão de tudo que foi visto em Processos Administrativos e Legislação (AC-01 a AC-05)",
        estimatedMinutes: 30,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Revisar flashcards, pontos de memorização e mapas mentais do bloco recém-concluído."
      },
      {
        id: "dia-26-s199",
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
    day: 27,
    phase: "desenvolvimento",
    title: "Dia 27 — Significação das palavras (PT-08) + Gestão de Contratos (AC-17) + Geometria espacial (MAT-10)",
    learningObjectives: ["Dominar Significação das palavras, código PT-08 do Anexo IV.", "Dominar Gestão de Contratos, código AC-17 do Anexo IV.", "Dominar Geometria espacial, código MAT-10 do Anexo IV."],
    subjects: ["portugues", "especificas", "matematica"],
    syllabusCodes: ["PT-08", "AC-17", "MAT-10"],
    prerequisites: [],
    steps: [
      {
        id: "dia-27-s200",
        type: "abertura",
        title: "Abertura do dia",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação do dia."
      },
      {
        id: "dia-27-s201",
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
        id: "dia-27-s202",
        type: "videoaula_obrigatoria",
        title: "Videoaula — Significação das palavras (PT-08)",
        estimatedMinutes: 12,
        contentRef: {
          kind: "video",
          id: "video-pt-08-22",
          subjectSlug: "portugues",
          syllabusCodes: ["PT-08"]
        },
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Assistir (ou abrir e marcar como assistido) a videoaula obrigatória do tópico."
      },
      {
        id: "dia-27-s203",
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
        id: "dia-27-s204",
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
        id: "dia-27-s205",
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
        id: "dia-27-s206",
        type: "revisao_programada",
        title: "Revisão programada do dia",
        estimatedMinutes: 10,
        extraContentRefs: [],
        optional: true,
        completionCriteria: "Revisar os flashcards e revisões vencidos hoje (se houver)."
      },
      {
        id: "dia-27-s207",
        type: "fechamento_dia",
        title: "Fechamento do dia",
        estimatedMinutes: 5,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Registrar confiança e dificuldades percebidas no dia."
      }
    ],
    estimatedMinutesTotal: 122,
    expectedOutcome: "Consegue responder corretamente questões objetivas sobre Significação das palavras. Consegue responder corretamente questões objetivas sobre Gestão de Contratos. Consegue responder corretamente questões objetivas sobre Geometria espacial."
  },
  {
    day: 28,
    phase: "fundamentos",
    title: "Revisão intercalada — Língua Portuguesa (PT-01 a PT-08)",
    learningObjectives: ["Consolidar todo o bloco de Língua Portuguesa (PT-01 a PT-08) antes de seguir para a próxima disciplina."],
    subjects: ["portugues"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-28-s208",
        type: "abertura",
        title: "Abertura da revisão",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação da revisão."
      },
      {
        id: "dia-28-s209",
        type: "revisao_programada",
        title: "Revisão de tudo que foi visto em Língua Portuguesa (PT-01 a PT-08)",
        estimatedMinutes: 30,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Revisar flashcards, pontos de memorização e mapas mentais do bloco recém-concluído."
      },
      {
        id: "dia-28-s210",
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
    day: 29,
    phase: "consolidacao",
    title: "Revisão intercalada — Logística e Cadeia de Suprimentos (AC-10 a AC-17)",
    learningObjectives: ["Consolidar todo o bloco de Logística e Cadeia de Suprimentos (AC-10 a AC-17) antes de seguir para a próxima disciplina."],
    subjects: ["especificas"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-29-s211",
        type: "abertura",
        title: "Abertura da revisão",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação da revisão."
      },
      {
        id: "dia-29-s212",
        type: "revisao_programada",
        title: "Revisão de tudo que foi visto em Logística e Cadeia de Suprimentos (AC-10 a AC-17)",
        estimatedMinutes: 30,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Revisar flashcards, pontos de memorização e mapas mentais do bloco recém-concluído."
      },
      {
        id: "dia-29-s213",
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
    day: 30,
    phase: "desenvolvimento",
    title: "Revisão intercalada — Matemática (MAT-01 a MAT-10)",
    learningObjectives: ["Consolidar todo o bloco de Matemática (MAT-01 a MAT-10) antes de seguir para a próxima disciplina."],
    subjects: ["matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-30-s214",
        type: "abertura",
        title: "Abertura da revisão",
        estimatedMinutes: 2,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Ler a apresentação da revisão."
      },
      {
        id: "dia-30-s215",
        type: "revisao_programada",
        title: "Revisão de tudo que foi visto em Matemática (MAT-01 a MAT-10)",
        estimatedMinutes: 30,
        extraContentRefs: [],
        optional: false,
        completionCriteria: "Revisar flashcards, pontos de memorização e mapas mentais do bloco recém-concluído."
      },
      {
        id: "dia-30-s216",
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
    day: 31,
    phase: "reta_final",
    title: "Revisão geral — Dia 1",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-31-s217",
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
    day: 32,
    phase: "reta_final",
    title: "Revisão geral — Dia 2",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-32-s218",
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
    day: 33,
    phase: "reta_final",
    title: "Revisão geral — Dia 3",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-33-s219",
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
    day: 34,
    phase: "reta_final",
    title: "Revisão geral — Dia 4",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-34-s220",
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
    day: 35,
    phase: "reta_final",
    title: "Revisão geral — Dia 5",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-35-s221",
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
    day: 36,
    phase: "reta_final",
    title: "Revisão geral — Dia 6",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-36-s222",
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
    day: 37,
    phase: "reta_final",
    title: "Revisão geral — Dia 7",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-37-s223",
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
    day: 38,
    phase: "reta_final",
    title: "Revisão geral — Dia 8",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-38-s224",
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
    day: 39,
    phase: "reta_final",
    title: "Revisão geral — Dia 9",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-39-s225",
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
    day: 40,
    phase: "reta_final",
    title: "Revisão geral — Dia 10",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-40-s226",
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
    day: 41,
    phase: "reta_final",
    title: "Revisão geral — Dia 11",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-41-s227",
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
    day: 42,
    phase: "reta_final",
    title: "Revisão geral — Dia 12",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-42-s228",
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
    day: 43,
    phase: "reta_final",
    title: "Revisão geral — Dia 13",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-43-s229",
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
    day: 44,
    phase: "reta_final",
    title: "Revisão geral — Dia 14",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-44-s230",
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
    day: 45,
    phase: "reta_final",
    title: "Revisão geral — Dia 15",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-45-s231",
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
    day: 46,
    phase: "reta_final",
    title: "Revisão geral — Dia 16",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-46-s232",
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
    day: 47,
    phase: "reta_final",
    title: "Revisão geral — Dia 17",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-47-s233",
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
    day: 48,
    phase: "reta_final",
    title: "Revisão geral — Dia 18",
    learningObjectives: ["PENDENTE — Fase 2 de revisão será detalhada em prompt futuro."],
    subjects: ["especificas", "portugues", "matematica"],
    syllabusCodes: [],
    prerequisites: [],
    steps: [
      {
        id: "dia-48-s234",
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
