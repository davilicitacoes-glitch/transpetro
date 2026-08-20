import { ALL_LESSONS } from "@/content/lessons";
import type { LessonContent, SubjectSlug } from "@/content/lessonTypes";
import type { StudyPlanDay } from "@/lib/schedule/plan";

/** PENDENTE — Fase 2: rotação ajustada às disciplinas confirmadas da Transpetro (Gerais: Português
 * e Matemática). O projeto de origem rotacionava entre 3 disciplinas (Português/Lógica/Informática,
 * específicas daquele edital); aqui ficam só as 2 confirmadas em config/concurso.ts. */
const SECONDARY_ROTATION: SubjectSlug[] = ["portugues", "matematica"];

function lessonsBySubject(subject: SubjectSlug): LessonContent[] {
  return ALL_LESSONS.filter((l) => l.subjectSlug === subject);
}

const ESPECIFICAS_LESSONS = lessonsBySubject("especificas");

export interface MissionContent {
  missionIndex: number;
  primaryLesson: LessonContent;
  secondaryLesson: LessonContent;
  secondarySubject: SubjectSlug;
}

/** Escolhe deterministicamente a aula principal (Conhecimentos Específicos) e a secundária (rotação Port/Lógica/Info) para uma missão. */
export function getMissionContent(missionIndex: number): MissionContent {
  const primaryLesson = ESPECIFICAS_LESSONS[(missionIndex - 1) % ESPECIFICAS_LESSONS.length];
  const secondarySubject = SECONDARY_ROTATION[(missionIndex - 1) % SECONDARY_ROTATION.length];
  const pool = lessonsBySubject(secondarySubject);
  const secondaryLesson = pool[Math.floor((missionIndex - 1) / SECONDARY_ROTATION.length) % pool.length];

  return { missionIndex, primaryLesson, secondaryLesson, secondarySubject };
}

export type MissionTaskKind = "aquecimento" | "aula_principal" | "aula_secundaria" | "questoes" | "revisao" | "redacao" | "fechamento";

export interface MissionTask {
  kind: MissionTaskKind;
  title: string;
  description: string;
  estimatedMinutes: number;
  href?: string;
}

/** Monta a lista ordenada de tarefas da missão do dia, conforme a seção 6 do prompt mestre. */
export function buildMissionTasks(day: StudyPlanDay): MissionTask[] {
  if (day.dayType !== "missao" || day.missionIndex === null) return [];

  const { primaryLesson, secondaryLesson } = getMissionContent(day.missionIndex);
  const tasks: MissionTask[] = [
    {
      kind: "aquecimento",
      title: "Aquecimento — flashcards vencidos",
      description: "5 minutos revisando os flashcards que já venceram a data de revisão.",
      estimatedMinutes: 5,
      href: "/revisoes",
    },
    {
      kind: "aula_principal",
      title: `Conhecimentos Específicos — ${primaryLesson.title}`,
      description: primaryLesson.learningObjective,
      estimatedMinutes: primaryLesson.estimatedMinutes,
      href: `/curso/${primaryLesson.slug}`,
    },
    {
      kind: "aula_secundaria",
      title: `${secondarySubjectLabel(secondaryLesson.subjectSlug)} — ${secondaryLesson.title}`,
      description: secondaryLesson.learningObjective,
      estimatedMinutes: secondaryLesson.estimatedMinutes,
      href: `/curso/${secondaryLesson.slug}`,
    },
    {
      kind: "questoes",
      title: "Questões da missão",
      description: "Responda às questões vinculadas às duas aulas de hoje.",
      estimatedMinutes: 20,
      href: `/questoes?topico=${primaryLesson.topicSlug}`,
    },
    {
      kind: "revisao",
      title: "Revisão programada",
      description: "Fila de revisão espaçada do dia (1, 3, 7, 14 e 30 dias).",
      estimatedMinutes: 10,
      href: "/revisoes",
    },
  ];

  if (day.needsEssaySession) {
    tasks.push({
      kind: "redacao",
      title: "Sessão de redação",
      description: "Planejamento, escrita ou reescrita de uma redação dissertativo-argumentativa.",
      estimatedMinutes: 50,
      href: "/redacao",
    });
  }

  tasks.push({
    kind: "fechamento",
    title: "Fechamento do dia",
    description: "Registre sua confiança, dificuldade percebida e eventuais erros do dia.",
    estimatedMinutes: 5,
  });

  return tasks;
}

function secondarySubjectLabel(subject: SubjectSlug): string {
  switch (subject) {
    case "portugues":
      return "Língua Portuguesa";
    case "matematica":
      return "Matemática";
    default:
      return subject;
  }
}
