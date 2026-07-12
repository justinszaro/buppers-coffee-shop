import { Card, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { useDrinks } from "~/hooks/use-drinks"

export function RecipeBook() {
  const { data: drinks, isLoading } = useDrinks({ active: true, $limit: 100, $sort: { position: 1 } })

  const recipes = (drinks ?? []).filter((d) => d.recipe != null && d.recipe.length > 0)

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-[22px]">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white border border-line rounded-[18px] h-[220px] animate-pulse" />
        ))}
      </div>
    )
  }

  if (recipes.length === 0) {
    return (
      <p className="font-sans text-sm text-buppers-muted text-center py-16">
        No recipes added yet.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-[22px]">
      {recipes.map((drink) => (
        <Card
          key={drink.drinkId}
          className="rounded-[18px] border border-line ring-0 [--card-spacing:0px] shadow-[var(--shadow-brand-sm)]"
        >
          <CardContent className="px-[26px] py-6">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-heading font-bold text-[22px] text-ink m-0 tracking-[-0.01em]">
                {drink.name}
              </h3>
              {drink.featured && <Badge className="h-auto font-semibold text-[11.5px] tracking-[0.06em] uppercase rounded-full px-[10px] py-[4px] whitespace-nowrap bg-[#f7e3e1] text-red-deep border-transparent">Seasonal</Badge>}
            </div>

            <div className="font-sans text-[13.5px] text-buppers-muted mb-[18px]">
              {drink.description}
            </div>

            <ol className="m-0 p-0 list-none flex flex-col gap-[11px]">
              {drink.recipe.map((step, n) => (
                <li key={n} className="flex gap-3">
                  <span className="shrink-0 w-[22px] h-[22px] rounded-full bg-teal-dark text-cream font-heading font-bold text-[12px] flex items-center justify-center">
                    {n + 1}
                  </span>
                  <span className="font-sans text-sm leading-[1.5] text-ink-soft">
                    {step}
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
