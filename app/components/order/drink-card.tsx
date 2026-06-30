import { Badge } from "~/components/badge"
import type { DrinkDef } from "~/lib/menu-data"

const drinkThumbClass: Record<string, string> = {
  cream: "drink-thumb-cream",
  dark: "drink-thumb-dark",
  teal: "drink-thumb-teal",
}

function DrinkThumb({ tone, size = 66 }: { tone: string; size?: number }) {
  const cls = drinkThumbClass[tone] ?? drinkThumbClass.cream
  return (
    <div
      className={`rounded-[12px] shrink-0 w-(--drink-thumb-size) h-(--drink-thumb-size) ${cls}`}
      style={{ "--drink-thumb-size": `${size}px` } as React.CSSProperties}
    />
  )
}

export function DrinkCard({
  drink,
  onSelect,
}: {
  drink: DrinkDef
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className="text-left cursor-pointer bg-white border border-line rounded-[18px] p-5 flex gap-4 transition-[transform,box-shadow] duration-[120ms] shadow-[var(--shadow-brand-sm)] hover:shadow-[var(--shadow-brand)] hover:-translate-y-[3px]"
    >
      <DrinkThumb tone={drink.tone} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-[3px]">
          <h3 className="font-heading font-semibold text-[18px] text-ink m-0">
            {drink.name}
          </h3>
          {drink.seasonal && <Badge tone="red">New</Badge>}
        </div>
        <p className="font-sans text-[13.5px] text-buppers-muted m-0 mb-3 leading-[1.4]">
          {drink.desc}
        </p>
        <span className="font-sans text-[13px] font-semibold text-teal-deep bg-teal-wash rounded-full px-[14px] py-[6px] whitespace-nowrap">
          Customize +
        </span>
      </div>
    </button>
  )
}
