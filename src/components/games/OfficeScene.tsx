"use client";

import { useEffect, useRef, useState } from "react";
import { OfficeAvatar, type AvatarAction } from "./OfficeAvatar";
import type { OfficeLocation } from "@/lib/games/types";

/** Posição horizontal (%) de cada ponto do escritório na cena — mesma ordem visual da porta até o
 * arquivo, da esquerda pra direita. */
const LOCATION_X: Record<OfficeLocation, number> = {
  corredor: 8,
  mesa: 36,
  sala_reuniao: 66,
  arquivo: 90,
};

const WALK_DURATION_MS = 700;

/**
 * Cena 2D do escritório (missão "camada visual"). O personagem se move fisicamente entre os
 * pontos — não troca de imagem estática — via transição CSS na posição horizontal, com o ciclo de
 * caminhada tocando durante o trajeto. `arrivedAction` é o estado exibido assim que o personagem
 * chega no ponto certo (idle/sentado/digitando/reagindo), decidido pela tela que chama este
 * componente a partir da cena/tarefa atual do jogo — a lógica de conteúdo continua 100% na tela
 * do jogo, este componente só sabe desenhar e mover.
 */
export function OfficeScene({ location, arrivedAction }: { location: OfficeLocation; arrivedAction: AvatarAction }) {
  const [displayedLocation, setDisplayedLocation] = useState(location);
  const [walking, setWalking] = useState(false);
  const previousLocationRef = useRef(location);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (location === previousLocationRef.current) return;
    setWalking(true);
    setDisplayedLocation(location); // dispara a transição CSS pra nova posição
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setWalking(false), WALK_DURATION_MS);
    previousLocationRef.current = location;
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [location]);

  const facingLeft = LOCATION_X[displayedLocation] < LOCATION_X[previousLocationRef.current] && walking;
  const action: AvatarAction = walking ? "walking" : arrivedAction;

  return (
    <div className="relative w-full h-40 sm:h-48 rounded-xl overflow-hidden border border-border bg-surface-muted mb-3" aria-hidden>
      {/* Fundo simples — parede + piso, sem detalhe pesado. */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--surface-muted) 0%, var(--surface-muted) 62%, var(--border) 62%, var(--border) 100%)" }} />

      {/* Porta (corredor) */}
      <div className="absolute" style={{ left: `${LOCATION_X.corredor}%`, top: "18%", transform: "translateX(-50%)" }}>
        <div className="w-8 h-20 rounded-sm border-2" style={{ borderColor: "var(--navy)", background: "var(--brand-soft)" }} />
      </div>

      {/* Mesa com computador e cadeira */}
      <div className="absolute" style={{ left: `${LOCATION_X.mesa}%`, top: "34%", transform: "translateX(-50%)" }}>
        <div className="relative w-24 flex flex-col items-center">
          <div className="w-14 h-9 rounded-sm border-2 flex items-center justify-center" style={{ borderColor: "var(--navy)", background: "var(--surface)" }}>
            <div className="w-9 h-5 rounded-[2px]" style={{ background: "var(--accent)" }} />
          </div>
          <div className="w-20 h-2.5 rounded-sm mt-1" style={{ background: "var(--border-strong)" }} />
          <div className="w-10 h-6 rounded-sm -mt-0.5" style={{ background: "var(--navy-soft)" }} />
        </div>
      </div>

      {/* Mesa redonda de reunião */}
      <div className="absolute" style={{ left: `${LOCATION_X.sala_reuniao}%`, top: "38%", transform: "translateX(-50%)" }}>
        <div className="w-16 h-16 rounded-full border-2" style={{ borderColor: "var(--navy)", background: "var(--accent-soft)" }} />
      </div>

      {/* Arquivo */}
      <div className="absolute" style={{ left: `${LOCATION_X.arquivo}%`, top: "26%", transform: "translateX(-50%)" }}>
        <div className="w-10 h-16 rounded-sm border-2" style={{ borderColor: "var(--navy)", background: "var(--surface)" }}>
          <div className="w-full h-[3px] mt-3" style={{ background: "var(--border-strong)" }} />
          <div className="w-full h-[3px] mt-3" style={{ background: "var(--border-strong)" }} />
        </div>
      </div>

      {/* Personagem — posição transiciona via CSS (office-scene-avatar-wrapper, ver globals.css) */}
      <div
        className="office-scene-avatar-wrapper absolute bottom-0"
        style={{ left: `${LOCATION_X[displayedLocation]}%`, transform: "translateX(-50%)" }}
      >
        <OfficeAvatar action={action} facingLeft={facingLeft} />
      </div>
    </div>
  );
}
