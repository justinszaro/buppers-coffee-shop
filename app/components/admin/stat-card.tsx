import { Card, CardContent } from "~/components/ui/card"

export function StatCard({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color?: string
}) {
  return (
    <Card
      className="flex-1 rounded-[16px] border border-line ring-0 [--card-spacing:0px] shadow-[var(--shadow-brand-sm)]"
    >
      <CardContent className="px-5 py-[18px]">
        <div className="font-sans text-[12.5px] font-semibold tracking-[0.08em] uppercase text-buppers-muted">
          {label}
        </div>
        <div
          className="font-heading font-bold text-[30px] mt-[6px] tracking-[-0.02em] text-(--stat-color)"
          style={{ "--stat-color": color ?? "var(--color-ink)" } as React.CSSProperties}
        >
          {value}
        </div>
      </CardContent>
    </Card>
  )
}
