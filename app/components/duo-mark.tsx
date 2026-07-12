interface DuoMarkProps {
  size?: number
  variant?: "color" | "cream" | "ink"
}

const MARK_SRC: Record<NonNullable<DuoMarkProps["variant"]>, string> = {
  color: "/assets/buppers-mark-color.svg",
  cream: "/assets/buppers-mark-cream.svg",
  ink: "/assets/buppers-mark-ink.svg",
}

export function DuoMark({ size = 40, variant = "color" }: DuoMarkProps) {
  const w = Math.round((size * 222) / 131)
  return (
    <span>
      <img
        src={MARK_SRC[variant]}
        width={w}
        height={size}
        alt="Buppers"
        className="block"
      />
    </span>
  )
}
