import type { SubjectSlug } from "@/content/lessonTypes";

export interface SubjectDef {
  slug: SubjectSlug;
  name: string;
  description: string;
  color: string;
  examWeightPoints: number;
}

export interface ModuleDef {
  slug: string;
  subjectSlug: SubjectSlug;
  name: string;
  order: number;
}

export interface TopicDef {
  slug: string;
  moduleSlug: string;
  name: string;
  syllabusCodes: string[];
  order: number;
}

/**
 * Pesos (examWeightPoints) refletem a estrutura CONFIRMADA da prova (60 questões: 40 Específicas +
 * 10 Português + 10 Matemática) — ver config/concurso.ts.
 */
export const SUBJECTS: SubjectDef[] = [
  { slug: "especificas", name: "Conhecimentos Específicos", description: "Administração e Controle (Anexo IV, códigos AC-01 a AC-21).", color: "#0f766e", examWeightPoints: 40 },
  { slug: "portugues", name: "Língua Portuguesa", description: "Anexo IV, códigos PT-01 a PT-08.", color: "#7c3aed", examWeightPoints: 10 },
  { slug: "matematica", name: "Matemática", description: "Anexo IV, códigos MAT-01 a MAT-10.", color: "#b45309", examWeightPoints: 10 },
];

/**
 * Módulos: para Específicas, seguem os 4 grupos do próprio Anexo IV (Processos Administrativos e
 * Legislação; Finanças e Contabilidade; Logística e Gestão da Cadeia de Suprimentos; Noções de
 * Informática). Português e Matemática ficam num módulo único cada, dado o tamanho menor do bloco.
 */
export const MODULES: ModuleDef[] = [
  { slug: "especificas-processos-legislacao", subjectSlug: "especificas", name: "Processos Administrativos e Legislação", order: 1 },
  { slug: "especificas-financas-contabilidade", subjectSlug: "especificas", name: "Finanças e Contabilidade", order: 2 },
  { slug: "especificas-logistica-cadeia-suprimentos", subjectSlug: "especificas", name: "Logística e Gestão da Cadeia de Suprimentos", order: 3 },
  { slug: "especificas-informatica", subjectSlug: "especificas", name: "Noções de Informática", order: 4 },
  { slug: "portugues-geral", subjectSlug: "portugues", name: "Compreensão, ortografia e gramática", order: 1 },
  { slug: "matematica-geral", subjectSlug: "matematica", name: "Matemática básica e aplicada", order: 1 },
];

/**
 * Os 39 tópicos oficiais do Anexo IV, um por código (PT-01..08, MAT-01..10, AC-01..21). `name`
 * reproduz o tema oficial do edital (ver MATRIZ_EDITAL_TRANSPETRO.md na raiz do projeto para os
 * subtemas detalhados de cada código AC). `order` define a sequência pedagógica dentro do módulo —
 * segue a ordem oficial do edital, exceto onde marcado.
 */
export const TOPICS: TopicDef[] = [
  // Português (PT-01..08)
  { slug: "pt-01-compreensao-textos", moduleSlug: "portugues-geral", name: "Compreensão de textos de gêneros variados", syllabusCodes: ["PT-01"], order: 1 },
  { slug: "pt-02-ortografia-oficial", moduleSlug: "portugues-geral", name: "Ortografia oficial", syllabusCodes: ["PT-02"], order: 2 },
  { slug: "pt-03-coesao-textual", moduleSlug: "portugues-geral", name: "Mecanismos de coesão textual", syllabusCodes: ["PT-03"], order: 3 },
  { slug: "pt-04-classes-palavras", moduleSlug: "portugues-geral", name: "Emprego das classes de palavras", syllabusCodes: ["PT-04"], order: 4 },
  { slug: "pt-05-concordancia", moduleSlug: "portugues-geral", name: "Concordância nominal e verbal", syllabusCodes: ["PT-05"], order: 5 },
  { slug: "pt-06-crase", moduleSlug: "portugues-geral", name: "Emprego do sinal indicativo de crase", syllabusCodes: ["PT-06"], order: 6 },
  { slug: "pt-07-pontuacao", moduleSlug: "portugues-geral", name: "Sinais de pontuação", syllabusCodes: ["PT-07"], order: 7 },
  { slug: "pt-08-significacao-palavras", moduleSlug: "portugues-geral", name: "Significação das palavras", syllabusCodes: ["PT-08"], order: 8 },

  // Matemática (MAT-01..10)
  { slug: "mat-01-conjuntos-numericos", moduleSlug: "matematica-geral", name: "Conjuntos numéricos: naturais, inteiros, racionais e reais", syllabusCodes: ["MAT-01"], order: 1 },
  { slug: "mat-02-razao-proporcao", moduleSlug: "matematica-geral", name: "Razão e proporção: regra de três e porcentagem", syllabusCodes: ["MAT-02"], order: 2 },
  { slug: "mat-03-funcoes", moduleSlug: "matematica-geral", name: "Relações e funções: polinomiais, exponenciais, logarítmicas e trigonométricas", syllabusCodes: ["MAT-03"], order: 3 },
  { slug: "mat-04-equacoes", moduleSlug: "matematica-geral", name: "Equações: 1º e 2º grau, exponenciais, logarítmicas e sistemas lineares", syllabusCodes: ["MAT-04"], order: 4 },
  { slug: "mat-05-analise-combinatoria", moduleSlug: "matematica-geral", name: "Análise combinatória: contagem, permutação, arranjo e combinação", syllabusCodes: ["MAT-05"], order: 5 },
  { slug: "mat-06-probabilidade", moduleSlug: "matematica-geral", name: "Probabilidade básica em espaços equiprováveis", syllabusCodes: ["MAT-06"], order: 6 },
  { slug: "mat-07-estatistica", moduleSlug: "matematica-geral", name: "Estatística básica: tabelas, gráficos e medidas de tendência/dispersão", syllabusCodes: ["MAT-07"], order: 7 },
  { slug: "mat-08-matematica-financeira", moduleSlug: "matematica-geral", name: "Matemática financeira: juros simples e compostos", syllabusCodes: ["MAT-08"], order: 8 },
  { slug: "mat-09-geometria-plana", moduleSlug: "matematica-geral", name: "Geometria plana: relações métricas, perímetros e áreas", syllabusCodes: ["MAT-09"], order: 9 },
  { slug: "mat-10-geometria-espacial", moduleSlug: "matematica-geral", name: "Geometria espacial: áreas e volumes", syllabusCodes: ["MAT-10"], order: 10 },

  // Específicas — Grupo A: Processos Administrativos e Legislação (AC-01..05)
  { slug: "ac-01-recursos-humanos", moduleSlug: "especificas-processos-legislacao", name: "Recursos Humanos", syllabusCodes: ["AC-01"], order: 1 },
  { slug: "ac-02-sistema-gestao-integrado", moduleSlug: "especificas-processos-legislacao", name: "Sistema de Gestão Integrado", syllabusCodes: ["AC-02"], order: 2 },
  { slug: "ac-03-administracao-patrimonial", moduleSlug: "especificas-processos-legislacao", name: "Função Administração Patrimonial", syllabusCodes: ["AC-03"], order: 3 },
  { slug: "ac-04-gestao-manutencao", moduleSlug: "especificas-processos-legislacao", name: "Gestão da manutenção", syllabusCodes: ["AC-04"], order: 4 },
  { slug: "ac-05-gestao-indicadores", moduleSlug: "especificas-processos-legislacao", name: "Gestão de Indicadores", syllabusCodes: ["AC-05"], order: 5 },

  // Específicas — Grupo B: Finanças e Contabilidade (AC-06..09)
  { slug: "ac-06-matematica-financeira", moduleSlug: "especificas-financas-contabilidade", name: "Matemática Financeira", syllabusCodes: ["AC-06"], order: 1 },
  { slug: "ac-07-registros-contabeis", moduleSlug: "especificas-financas-contabilidade", name: "Registros contábeis", syllabusCodes: ["AC-07"], order: 2 },
  { slug: "ac-08-fluxo-caixa", moduleSlug: "especificas-financas-contabilidade", name: "Fluxo de caixa", syllabusCodes: ["AC-08"], order: 3 },
  { slug: "ac-09-balanco-dre", moduleSlug: "especificas-financas-contabilidade", name: "Balanço Patrimonial e DRE", syllabusCodes: ["AC-09"], order: 4 },

  // Específicas — Grupo C: Logística e Gestão da Cadeia de Suprimentos (AC-10..17)
  { slug: "ac-10-logistica-cadeia-suprimentos", moduleSlug: "especificas-logistica-cadeia-suprimentos", name: "Logística e Gestão da Cadeia de Suprimentos", syllabusCodes: ["AC-10"], order: 1 },
  { slug: "ac-11-modalidades-transporte", moduleSlug: "especificas-logistica-cadeia-suprimentos", name: "Modalidades de transporte", syllabusCodes: ["AC-11"], order: 2 },
  { slug: "ac-12-gestao-estoques", moduleSlug: "especificas-logistica-cadeia-suprimentos", name: "Gestão de Estoques", syllabusCodes: ["AC-12"], order: 3 },
  { slug: "ac-13-armazenagem", moduleSlug: "especificas-logistica-cadeia-suprimentos", name: "Armazenagem", syllabusCodes: ["AC-13"], order: 4 },
  { slug: "ac-14-manuseio-materiais", moduleSlug: "especificas-logistica-cadeia-suprimentos", name: "Manuseio de Materiais", syllabusCodes: ["AC-14"], order: 5 },
  { slug: "ac-15-embalagem", moduleSlug: "especificas-logistica-cadeia-suprimentos", name: "Embalagem", syllabusCodes: ["AC-15"], order: 6 },
  { slug: "ac-16-gestao-compras", moduleSlug: "especificas-logistica-cadeia-suprimentos", name: "Gestão de Compras (Lei 13.303/2016 e Lei 14.133/2021)", syllabusCodes: ["AC-16"], order: 7 },
  { slug: "ac-17-gestao-contratos", moduleSlug: "especificas-logistica-cadeia-suprimentos", name: "Gestão de Contratos", syllabusCodes: ["AC-17"], order: 8 },

  // Específicas — Grupo D: Noções de Informática (AC-18..21)
  { slug: "ac-18-fundamentos-computacao", moduleSlug: "especificas-informatica", name: "Fundamentos de computação (Windows 11)", syllabusCodes: ["AC-18"], order: 1 },
  { slug: "ac-19-aplicativos-comerciais", moduleSlug: "especificas-informatica", name: "Aplicativos comerciais (Microsoft Office 2024)", syllabusCodes: ["AC-19"], order: 2 },
  { slug: "ac-20-internet-intranet", moduleSlug: "especificas-informatica", name: "Internet e intranet", syllabusCodes: ["AC-20"], order: 3 },
  { slug: "ac-21-seguranca-informacao-lgpd", moduleSlug: "especificas-informatica", name: "Segurança da informação e LGPD", syllabusCodes: ["AC-21"], order: 4 },
];
