import { cn } from "~/lib/utils"
import type { BadgeTone } from "~/lib/menu-data"

const toneClasses: Record<BadgeTone, string> = {
  teal: "bg-teal-wash text-teal-deep",
  amber: "bg-[#f7eddc] text-[#8a5a1e]",
  red: "bg-[#f7e3e1] text-red-deep",
  green: "bg-[#dff0e8] text-[#1f6e4f]",
  grey: "bg-[#eeece7] text-ink-soft",
}

export function Badge({
  children,
  tone = "teal",
  className,
}: {
  children: React.ReactNode
  tone?: BadgeTone
  className?: string
}) {
  return (
    <span
      className={cn(
        "font-sans font-semibold text-[11.5px] tracking-[0.06em] uppercase rounded-full px-[10px] py-[4px] whitespace-nowrap",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
