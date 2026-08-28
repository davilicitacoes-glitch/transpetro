"use client";

import { useState, use as usePromise } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Briefcase, CheckCircle2, Mail, MapPin, MessageCircle, Scale, XCircle } from "lucide-react";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { getEpisodeById, getQuestionForTask } from "@/lib/games/catalog";
import { recordGameAttempt } from "@/lib/games/recordGameAttempt";
import type { GameScene, OfficeLocation } from "@/lib/games/types";

const LOCATION_LABEL: Record<OfficeLocation, string> = {
  mesa: "Mesa / computador",
  sala_reuniao: "Sala de reunião",
  corredor: "Corredor",
  arquivo: "Arquivo",
};

interface SceneResult {
  sceneId: string;
  title: string;
  isCorrect: boolean;
}

export default function UmDiaNoEscritorioEpisodioPage({ params }: { params: Promise<{ episodeId: string }> }) {
  const { episodeId } = usePromise(params);
  const found = getEpisodeById(episodeId);
  if (!found || found.gameId !== "um-dia-no-escritorio") notFound();
  const episode = found;

  const [sceneIndex, setSceneIndex] = useState(0);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<SceneResult[]>([]);

  const scene = episode.scenes[sceneIndex];
  const isLastScene = sceneIndex === episode.scenes.length - 1;

  async function handleSelect(key: string) {
    if (!scene.task || revealed) return;
    const question = getQuestionForTask(scene.task.questionId);
    if (!question) return;
    setSelected(key);
    setRevealed(true);
    const result = await recordGameAttempt(question, key as "A" | "B" | "C" | "D" | "E", episode.gameId, episode.id, scene.id);
    setResults((prev) => [...prev, { sceneId: scene.id, title: scene.title, isCorrect: result.attempt.isCorrect }]);
  }

  function advance() {
    setSceneIndex((i) => i + 1);
    setSelected(undefined);
    setRevealed(false);
  }

  if (sceneIndex >= episode.scenes.length) {
    const correctCount = results.filter((r) => r.isCorrect).length;
    return (
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
        <PageBack episode={episode} />
        <div className="card-raised p-5 text-center mb-4">
          <Briefcase size={22} className="text-brand mx-auto mb-2" aria-hidden />
          <p className="text-[22px] font-display font-bold mb-1">{episode.title} concluído</p>
          <p className="text-sm text-foreground-muted">
            {correctCount} de {results.length} tarefas certas — cada uma já entrou no seu Caderno de Erros e na sua nota estimada, como
            qualquer outra tentativa do app.
          </p>
        </div>
        <div className="space-y-1.5 mb-5">
          {results.map((r, i) => (
            <div key={i} className="flex items-center justify-between text-[13px] py-1.5 border-b border-border last:border-0">
              <span>{r.title}</span>
              {r.isCorrect ? (
                <span className="flex items-center gap-1 text-success">
                  <CheckCircle2 size={14} aria-hidden /> Certo
                </span>
              ) : (
                <span className="flex items-center gap-1 text-danger">
                  <XCircle size={14} aria-hidden /> Errou
                </span>
              )}
            </div>
          ))}
        </div>
        <Link href="/laboratorio/jogos/um-dia-no-escritorio" className="btn btn-primary w-full inline-flex justify-center">
          Ver outros dias de trabalho
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto w-full animate-fade-in">
      <PageBack episode={episode} />

      <div className="flex items-center gap-1.5 mb-4 text-[11px] text-foreground-muted">
        <MapPin size={12} aria-hidden />
        {LOCATION_LABEL[scene.local]}
        <span className="ml-auto">
          Cena {sceneIndex + 1} de {episode.scenes.length}
        </span>
      </div>

      <SceneView scene={scene} selected={selected} revealed={revealed} onSelect={handleSelect} />

      {(scene.kind !== "tarefa" || revealed) && (
        <button type="button" onClick={advance} className="w-full mt-4 flex items-center justify-center gap-2 rounded-lg bg-brand text-brand-foreground py-2.5 text-sm font-medium hover:opacity-90">
          {isLastScene ? "Ver resultado do dia" : "Continuar"}
          <ArrowRight size={15} aria-hidden />
        </button>
      )}
    </main>
  );
}

function PageBack({ episode }: { episode: { title: string } }) {
  return (
    <Link href="/laboratorio/jogos/um-dia-no-escritorio" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground mb-4">
      <ArrowLeft size={14} aria-hidden /> {episode.title}
    </Link>
  );
}

function SceneView({
  scene,
  selected,
  revealed,
  onSelect,
}: {
  scene: GameScene;
  selected: string | undefined;
  revealed: boolean;
  onSelect: (key: string) => void;
}) {
  if (scene.kind !== "tarefa" || !scene.task) {
    return (
      <div className="card p-5">
        <h2 className="text-[16px] font-display font-semibold mb-2">{scene.title}</h2>
        <p className="text-[13.5px] text-foreground-muted leading-relaxed">{scene.narrative}</p>
      </div>
    );
  }

  const question = getQuestionForTask(scene.task.questionId);
  if (!question) {
    return <p className="text-sm text-danger">Questão não encontrada — avise o suporte.</p>;
  }

  const task = scene.task;

  return (
    <div>
      {task.kind === "email" && (
        <div className="card p-4 mb-3">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground-muted mb-2">
            <Mail size={13} aria-hidden /> Nova mensagem
          </p>
          <p className="text-[12px] text-foreground-muted">
            De: <span className="text-foreground font-medium">{task.remetente}</span>
          </p>
          <p className="text-[12px] text-foreground-muted mb-2">
            Assunto: <span className="text-foreground font-medium">{task.assunto}</span>
          </p>
          <p className="text-[13.5px] leading-relaxed">{task.intro}</p>
        </div>
      )}

      {task.kind === "colega" && (
        <div className="card p-4 mb-3 flex gap-2.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-soft text-brand shrink-0">
            <MessageCircle size={15} aria-hidden />
          </span>
          <div>
            <p className="text-[12px] font-semibold mb-1">{task.colega}</p>
            <p className="text-[13.5px] leading-relaxed italic">&ldquo;{task.falaAbertura}&rdquo;</p>
          </div>
        </div>
      )}

      {task.kind === "decisao" && (
        <div className="card p-4 mb-3">
          <p className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground-muted mb-2">
            <Scale size={13} aria-hidden /> Decisão necessária
          </p>
          <p className="text-[13.5px] leading-relaxed">{task.situacao}</p>
        </div>
      )}

      {task.kind === "colega" && revealed && (
        <p className={`text-[12.5px] font-medium mb-2 ${selected === question.options.find((o) => o.isCorrect)?.key ? "text-success" : "text-warning"}`}>
          {selected === question.options.find((o) => o.isCorrect)?.key
            ? `${task.colega.split(",")[0]}: "Isso mesmo, era isso!"`
            : `${task.colega.split(",")[0]}: "Hmm, acho que não é bem assim..."`}
        </p>
      )}

      <QuestionCard question={question} selected={selected} onSelect={onSelect} revealed={revealed} showLessonLink />
    </div>
  );
}
