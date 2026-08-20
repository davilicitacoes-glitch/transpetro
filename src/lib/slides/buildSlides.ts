import type { LessonContent } from "@/content/lessonTypes";

export interface Slide {
  kind: "capa" | "objetivo" | "conteudo" | "memorizar" | "exemplo" | "pegadinha" | "resumo" | "fim";
  title: string;
  bullets: string[];
  /** Texto lido em voz alta pela narração (sem marcação markdown). */
  narration: string;
}

function clean(text: string): string {
  return text.replace(/\*\*/g, "").replace(/`/g, "").trim();
}

const MAX_BULLETS_PER_SLIDE = 4;

/** Quebra um parágrafo em frases (heurística simples: ponto final seguido de maiúscula/fim). */
function splitSentences(paragraph: string): string[] {
  return paragraph
    .split(/(?<=[.!?])\s+(?=[A-ZÀ-Ú0-9])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Divide o corpo da aula em blocos de slide. Parágrafos longos viram vários slides de poucas
 * frases cada — em vez de um único slide com um parágrafo inteiro comprimido em fonte pequena.
 */
function splitBody(bodyMdx: string): string[][] {
  const paragraphs = bodyMdx
    .split(/\n\n+/)
    .map((p) => clean(p))
    .filter((p) => p.length > 40 && !p.startsWith("- "));

  const slides: string[][] = [];
  for (const paragraph of paragraphs) {
    const sentences = splitSentences(paragraph);
    if (sentences.length <= MAX_BULLETS_PER_SLIDE) {
      slides.push(sentences.length > 0 ? sentences : [paragraph]);
      continue;
    }
    for (let i = 0; i < sentences.length; i += MAX_BULLETS_PER_SLIDE) {
      slides.push(sentences.slice(i, i + MAX_BULLETS_PER_SLIDE));
    }
  }
  return slides;
}

/**
 * Constrói a apresentação de uma microaula a partir do conteúdo já existente da aula.
 * Nada é inventado aqui: todo texto vem dos campos da própria aula.
 */
export function buildSlides(lesson: LessonContent): Slide[] {
  const slides: Slide[] = [];

  slides.push({
    kind: "capa",
    title: lesson.title,
    bullets: [lesson.syllabusCodes.join(" · "), `${lesson.estimatedMinutes} minutos`],
    narration: `Microaula Transpetro Estudos. ${lesson.title}. Item do edital: ${lesson.syllabusCodes.join(", ")}.`,
  });

  slides.push({
    kind: "objetivo",
    title: "Objetivo desta aula",
    bullets: [lesson.learningObjective],
    narration: `Objetivo desta aula: ${clean(lesson.learningObjective)}`,
  });

  const bodyParts = splitBody(lesson.bodyMdx);
  bodyParts.forEach((bullets, i) => {
    slides.push({
      kind: "conteudo",
      title: bodyParts.length > 1 ? `Conteúdo (${i + 1}/${bodyParts.length})` : "Conteúdo",
      bullets,
      narration: bullets.join(" "),
    });
  });

  if (lesson.mustMemorize.length > 0) {
    slides.push({
      kind: "memorizar",
      title: "O que você precisa memorizar",
      bullets: lesson.mustMemorize.map(clean),
      narration: `O que você precisa memorizar. ${lesson.mustMemorize.map(clean).join(". ")}`,
    });
  }

  if (lesson.workedExamples.length > 0) {
    slides.push({
      kind: "exemplo",
      title: "Exemplos resolvidos",
      bullets: lesson.workedExamples.map(clean),
      narration: `Exemplos resolvidos. ${lesson.workedExamples.map(clean).join(". ")}`,
    });
  }

  if (lesson.commonMistakes.length > 0) {
    slides.push({
      kind: "pegadinha",
      title: "Pegadinhas: onde a banca derruba",
      bullets: lesson.commonMistakes.map(clean),
      narration: `Atenção às pegadinhas. ${lesson.commonMistakes.map(clean).join(". ")}`,
    });
  }

  if (lesson.reviewSummaryPoints.length > 0) {
    slides.push({
      kind: "resumo",
      title: "Resumo para revisão",
      bullets: lesson.reviewSummaryPoints.map(clean),
      narration: `Resumo para revisão. ${lesson.reviewSummaryPoints.map(clean).join(". ")}`,
    });
  }

  slides.push({
    kind: "fim",
    title: "Fim da microaula",
    bullets: ["Responda o miniquestionário da aula para fixar", "Marque a aula como concluída"],
    narration: "Fim da microaula. Agora responda o miniquestionário para fixar o conteúdo.",
  });

  return slides;
}
