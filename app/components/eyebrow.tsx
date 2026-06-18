import { cn } from "~/lib/utils"

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "font-sans font-bold text-[12.5px] tracking-[0.22em] uppercase text-teal",
        className,
      )}
    >
      {children}
    </div>
  )
}
