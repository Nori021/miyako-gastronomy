"use client";

export default function AttendanceChart({
  attended,
  total,
}: {
  attended: number;
  total: number;
}) {
  const pct = Math.round((attended / total) * 100);
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (c * pct) / 100;

  return (
    <div className="flex items-center gap-5">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke="#F0EBE3"
          strokeWidth="6"
        />
        <circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke="#7A8B6F"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 44 44)"
          className="transition-all duration-1000"
        />
        <text
          x="44"
          y="44"
          textAnchor="middle"
          dominantBaseline="central"
          className="font-serif"
          fontSize="16"
          fontWeight="600"
          fill="#1a1a2e"
        >
          {pct}%
        </text>
      </svg>
      <div className="text-sm text-ink-light">
        <p className="font-serif text-ink text-base font-semibold mb-0.5">
          {attended}<span className="text-xs font-normal text-ink-light">/{total}回</span>
        </p>
        <p className="text-xs">出席しました</p>
      </div>
    </div>
  );
}
