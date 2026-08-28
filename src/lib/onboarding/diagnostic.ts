import { ALL_QUESTIONS, getQuestionsBySyllabusCode } from "@/content/questions";
import { TOPICS } from "@/content/curriculum";
import type { Question } from "@/lib/models/schema";
import { MIN_ATTEMPTS_FOR_SIGNAL } from "@/lib/pedagogy/masteryRules";

/**
 * Diagnóstico inicial de triagem (missão "Método Vetor", seção 5) — pra um aluno novo ver uma
 * PRIMEIRA nota estimada real nos primeiros minutos de uso, sem esperar dias de uso acumulado.
 *
 * Restrição real que molda o desenho: o Motor 3 (src/lib/pedagogy/scoreEstimate.ts) só considera
 * um código com "dado suficiente" a partir de `MIN_ATTEMPTS_FOR_SIGNAL` (3) tentativas NAQUELE
 * código — o mesmo limiar usado em todo o resto do app, pra não inventar precisão que não existe.
 * Por isso o diagnóstico NÃO espalha 1 questão por código (isso nunca cruzaria o limiar em nenhum
 * código, e a nota estimada continuaria "coletando dados" mesmo depois do diagnóstico inteiro) —
 * em vez disso, concentra 3 questões em cada um de poucos códigos (2 de Específicas, 1 de
 * Português, 1 de Matemática — proporcional ao peso da prova), o suficiente pra pelo menos esses 4
 * códigos cruzarem o limiar real e gerarem uma nota estimada de verdade, ainda que parcial.
 */
const TOPICS_PER_SUBJECT: Record<string, number> = { especificas: 2, portugues: 1, matematica: 1 };
const QUESTIONS_PER_TOPIC = MIN_ATTEMPTS_FOR_SIGNAL; // 3 — o mínimo exato pro código cruzar o limiar.

export interface DiagnosticTopicPick {
  topicSlug: string;
  syllabusCode: string;
  subjectSlug: string;
  questions: Question[];
}

/** Escolhe os tópicos e questões do diagnóstico. Só usa tópicos com pelo menos
 * `QUESTIONS_PER_TOPIC` questões reais/inéditas disponíveis — nunca completa com repetição
 * silenciosa. */
export function pickDiagnosticTopics(): DiagnosticTopicPick[] {
  const bySubject = new Map<string, string[]>(); // subjectSlug -> topicSlugs candidatos, ordenados por nº de questões
  for (const topic of TOPICS) {
    const code = topic.syllabusCodes[0];
    if (!code) continue;
    const questions = getQuestionsBySyllabusCode(code);
    if (questions.length < QUESTIONS_PER_TOPIC) continue;
    const questionSubject = questions[0]?.subjectSlug;
    if (!questionSubject) continue;
    const list = bySubject.get(questionSubject) ?? [];
    list.push(topic.slug);
    bySubject.set(questionSubject, list);
  }

  const picks: DiagnosticTopicPick[] = [];
  for (const [subjectSlug, topicCount] of Object.entries(TOPICS_PER_SUBJECT)) {
    const candidates = (bySubject.get(subjectSlug) ?? []).sort(
      (a, b) => getQuestionsBySyllabusCode(TOPICS.find((t) => t.slug === b)!.syllabusCodes[0]).length -
        getQuestionsBySyllabusCode(TOPICS.find((t) => t.slug === a)!.syllabusCodes[0]).length,
    );
    for (const topicSlug of candidates.slice(0, topicCount)) {
      const topic = TOPICS.find((t) => t.slug === topicSlug)!;
      const code = topic.syllabusCodes[0];
      const pool = getQuestionsBySyllabusCode(code);
      const questions = [...pool].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_TOPIC);
      picks.push({ topicSlug, syllabusCode: code, subjectSlug, questions });
    }
  }
  return picks;
}

export function pickDiagnosticQuestions(): Question[] {
  return pickDiagnosticTopics().flatMap((p) => p.questions);
}
