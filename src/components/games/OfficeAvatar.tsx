/**
 * Personagem 2D do motor de jogos (missão "camada visual", 2026-08-28) — vetor/flat design
 * desenhado 100% via SVG por código (cabeça, tronco, braços e pernas como formas separadas,
 * animadas por CSS), não um asset importado. Ver docs/MOTOR_DE_JOGOS.md, seção "Camada visual",
 * pra decisão de não usar um pacote de assets baixado (Kenney.nl etc.) e desenhar via SVG em vez
 * disso — a missão permite as duas abordagens, e SVG por código evita qualquer risco de licença.
 *
 * Poucos estados bem feitos, como pedido: idle, walking, sitting (parado sentado), typing
 * (sentado + mãos), reacting-positive (aceno), reacting-negative (coça a cabeça). Todas as
 * animações são só `transform`/`opacity` via @keyframes em globals.css — leve o suficiente pra
 * rodar bem em celular.
 */
export type AvatarAction = "idle" | "walking" | "sitting" | "typing" | "reacting-positive" | "reacting-negative";

export function OfficeAvatar({ action, facingLeft = false }: { action: AvatarAction; facingLeft?: boolean }) {
  const sitting = action === "sitting" || action === "typing";
  const walking = action === "walking";
  const reactingPositive = action === "reacting-positive";
  const reactingNegative = action === "reacting-negative";
  const typing = action === "typing";
  // Idle (respiração leve) roda sempre que não há uma animação mais específica tomando conta do
  // torso/cabeça — evita o personagem parecer travado entre uma ação e outra.
  const idleBreathing = action === "idle" || sitting;

  return (
    <svg
      viewBox="0 0 100 160"
      width="72"
      height="115"
      className={`office-avatar ${walking ? "office-avatar-walking" : ""}`}
      style={{ transform: facingLeft ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      {/* Pernas — sentado: dobradas 90° (canela horizontal); em pé: retas, com o ciclo de
          caminhada alternando quando `walking`. */}
      <g className={`avatar-leg avatar-leg-l ${walking ? "avatar-walk-leg-l" : ""}`} style={{ transformOrigin: "38px 100px" }}>
        <rect x="30" y="100" width="14" height={sitting ? "16" : "42"} rx="6" fill="var(--navy)" />
        {sitting && <rect x="30" y="112" width="30" height="12" rx="5" fill="var(--navy)" />}
      </g>
      <g className={`avatar-leg avatar-leg-r ${walking ? "avatar-walk-leg-r" : ""}`} style={{ transformOrigin: "62px 100px" }}>
        <rect x="56" y="100" width="14" height={sitting ? "16" : "42"} rx="6" fill="var(--navy-soft)" />
      </g>

      {/* Tronco */}
      <g className={idleBreathing ? "avatar-breathe" : ""} style={{ transformOrigin: "50px 95px" }}>
        <rect x="30" y="52" width="40" height={sitting ? "46" : "50"} rx="12" fill="var(--brand)" />

        {/* Braços — pivô no ombro; balançam no walk, digitam no typing, acenam/coçam na reação. */}
        <g
          className={`avatar-arm avatar-arm-l ${walking ? "avatar-walk-arm-l" : ""} ${typing ? "avatar-typing-arm-l" : ""} ${
            reactingNegative ? "avatar-scratch-arm" : ""
          }`}
          style={{ transformOrigin: "34px 58px" }}
        >
          <rect x="20" y="58" width="11" height={sitting ? "26" : "38"} rx="5" fill="var(--brand-hover)" />
        </g>
        <g
          className={`avatar-arm avatar-arm-r ${walking ? "avatar-walk-arm-r" : ""} ${typing ? "avatar-typing-arm-r" : ""} ${
            reactingPositive ? "avatar-wave-arm" : ""
          }`}
          style={{ transformOrigin: "66px 58px" }}
        >
          <rect x="69" y="58" width="11" height={sitting ? "26" : "38"} rx="5" fill="var(--brand-hover)" />
        </g>
      </g>

      {/* Cabeça */}
      <g className={idleBreathing ? "avatar-head-sway" : ""} style={{ transformOrigin: "50px 40px" }}>
        <circle cx="50" cy="28" r="17" fill="#e8b98f" />
        <circle cx="44" cy="26" r="2" fill="var(--navy)" />
        <circle cx="56" cy="26" r="2" fill="var(--navy)" />
        <path
          d={reactingPositive ? "M43 33 Q50 40 57 33" : reactingNegative ? "M44 34 Q50 32 56 34" : "M44 33 Q50 37 56 33"}
          stroke="var(--navy)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Cabelo simples */}
        <path d="M33 24 Q35 8 50 8 Q65 8 67 24 Q58 16 50 16 Q42 16 33 24 Z" fill="var(--navy)" />
      </g>
    </svg>
  );
}
