import { Badge as ShadBadge } from "~/components/ui/badge"
import { cn } from "~/lib/utils"

export type BadgeTone = "teal" | "amber" | "red" | "green" | "grey"

const toneClasses: Record<BadgeTone, string> = {
  teal: "bg-teal-wash text-teal-deep border-transparent",
  amber: "bg-[#f7eddc] text-[#8a5a1e] border-transparent",
  red: "bg-[#f7e3e1] text-red-deep border-transparent",
  green: "bg-[#dff0e8] text-[#1f6e4f] border-transparent",
  grey: "bg-[#eeece7] text-ink-soft border-transparent",
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
    <ShadBadge
      className={cn(
        "h-auto font-semibold text-[11.5px] tracking-[0.06em] uppercase rounded-full px-[10px] py-[4px] whitespace-nowrap",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </ShadBadge>
  )
}
