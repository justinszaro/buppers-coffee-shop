import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/badge"
import { RECIPES } from "~/lib/menu-data"

export function RecipeBook() {
  return (
    <div className="grid grid-cols-2 gap-[22px]">
      {RECIPES.map((r) => (
        <Card
          key={r.id}
          className="rounded-[18px] border border-line ring-0 [--card-spacing:0px] shadow-[var(--shadow-brand-sm)]"
        >
          <CardContent className="px-[26px] py-6">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-heading font-bold text-[22px] text-ink m-0 tracking-[-0.01em]">
                {r.name}
              </h3>
              <Badge tone={r.tone}>{r.badge}</Badge>
            </div>

            <div className="font-sans text-[13.5px] text-buppers-muted mb-[18px]">
              Bean · {r.bean}
            </div>

            <div className="flex gap-[10px] mb-5">
              {([["Dose", r.dose], ["Yield", r.yield], ["Time", r.time]] as [string, string][]).map(([k, v]) => (
                <div
                  key={k}
                  className="flex-1 bg-teal-wash rounded-[12px] px-[14px] py-3 text-center"
                >
                  <div className="font-heading font-bold text-[18px] text-teal-deep">{v}</div>
                  <div className="font-sans text-[11px] tracking-[0.08em] uppercase text-teal mt-0.5">
                    {k}
                  </div>
                </div>
              ))}
            </div>

            <ol className="m-0 p-0 list-none flex flex-col gap-[11px]">
              {r.steps.map((s, n) => (
                <li key={n} className="flex gap-3">
                  <span className="shrink-0 w-[22px] h-[22px] rounded-full bg-teal-dark text-cream font-heading font-bold text-[12px] flex items-center justify-center">
                    {n + 1}
                  </span>
                  <span className="font-sans text-sm leading-[1.5] text-ink-soft">
                    {s}
                  </span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
