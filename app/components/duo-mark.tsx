// Buppers mascot duo mark — ported from brand.jsx
// Renders the bear + moose pair in color, cream, or ink colorways.

interface DuoMarkProps {
  size?: number
  variant?: "color" | "cream" | "ink"
}

const T = {
  teal: "#00786f",
  tealDeep: "#005650",
  tealDark: "#06463f",
  ink: "#17171a",
  muted: "#6b6b72",
  fur: "#7d8086",
  furDeep: "#4f5359",
  furDark: "#232329",
  coat: "#f1f0ed",
  coatShade: "#dad9d3",
  cream: "#f8f7f2",
  red: "#c54b42",
  brown: "#73553c",
}

export function DuoMark({ size = 40, variant = "color" }: DuoMarkProps) {
  const c =
    variant === "color" ? null : variant === "cream" ? T.cream : T.ink

  const Bear = c ? (
    <g fill={c}>
      <circle cx="33" cy="45" r="13" />
      <circle cx="87" cy="45" r="13" />
      <circle cx="60" cy="66" r="35" />
      <path d="M28 49 C28 22 92 22 92 49 Z" />
      <rect x="26" y="44" width="68" height="12" rx="6" />
      <circle cx="60" cy="19" r="7" />
    </g>
  ) : (
    <g>
      <circle cx="36" cy="48" r="15" fill={T.furDark} />
      <circle cx="84" cy="48" r="15" fill={T.furDark} />
      <circle cx="36" cy="48" r="7" fill={T.furDeep} />
      <circle cx="84" cy="48" r="7" fill={T.furDeep} />
      <circle cx="60" cy="66" r="35" fill={T.fur} />
      <ellipse cx="60" cy="82" rx="22" ry="16" fill={T.cream} />
      <circle cx="47" cy="64" r="4.4" fill={T.ink} />
      <circle cx="73" cy="64" r="4.4" fill={T.ink} />
      <ellipse cx="60" cy="74" rx="7.5" ry="6" fill={T.ink} />
      <path
        d="M60 80 v5 M60 85 q-6 6 -12 2 M60 85 q6 6 12 2"
        stroke={T.ink}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M27 49 C27 21 93 21 93 49 Z" fill={T.teal} />
      <rect x="24" y="44" width="72" height="13" rx="6.5" fill={T.tealDeep} />
      <circle cx="60" cy="18" r="7.5" fill={T.cream} />
    </g>
  )

  const Moose = c ? (
    <g>
      <g
        stroke={c}
        strokeWidth="6.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M44 36 C34 28 30 22 28 14 M34 26 L22 24 M31 20 L24 13" />
        <path d="M76 36 C86 28 90 22 92 14 M86 26 L98 24 M89 20 L96 13" />
      </g>
      <ellipse
        cx="28"
        cy="52"
        rx="11"
        ry="7.5"
        transform="rotate(-24 28 52)"
        fill={c}
      />
      <ellipse
        cx="92"
        cy="52"
        rx="11"
        ry="7.5"
        transform="rotate(24 92 52)"
        fill={c}
      />
      <path
        d="M32 58 C32 40 88 40 88 58 C88 74 80 80 76 88 C72 98 64 102 60 102 C56 102 48 98 44 88 C40 80 32 74 32 58 Z"
        fill={c}
      />
    </g>
  ) : (
    <g>
      <g
        stroke={T.brown}
        strokeWidth="6.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M44 34 C34 26 30 20 28 12 M34 24 L22 22 M31 18 L24 11" />
        <path d="M76 34 C86 26 90 20 92 12 M86 24 L98 22 M89 18 L96 11" />
      </g>
      <ellipse
        cx="28"
        cy="50"
        rx="11"
        ry="7.5"
        transform="rotate(-24 28 50)"
        fill={T.coatShade}
      />
      <ellipse
        cx="92"
        cy="50"
        rx="11"
        ry="7.5"
        transform="rotate(24 92 50)"
        fill={T.coatShade}
      />
      <path
        d="M32 56 C32 38 88 38 88 56 C88 72 80 78 76 86 C72 96 64 100 60 100 C56 100 48 96 44 86 C40 78 32 72 32 56 Z"
        fill={T.coat}
      />
      <circle cx="48" cy="58" r="4" fill={T.ink} />
      <circle cx="72" cy="58" r="4" fill={T.ink} />
      <ellipse cx="60" cy="82" rx="15" ry="12" fill={T.ink} />
      <ellipse cx="55" cy="79" rx="3.2" ry="2.2" fill={T.muted} />
      <path
        d="M40 96 q20 10 40 0 l3 7 q-23 11 -46 0 Z"
        fill={T.red}
      />
    </g>
  )

  const w = (size * 222) / 131

  return (
    <svg
      width={w}
      height={size}
      viewBox="16 4 190 112"
      className="block overflow-visible"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Bear}
      <g transform="translate(98.4,0)">{Moose}</g>
    </svg>
  )
}
