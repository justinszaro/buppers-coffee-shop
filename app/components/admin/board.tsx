import { cn } from "~/lib/utils"
import { OrderCard } from "~/components/admin/order-card"
import { useDrinks } from "~/hooks/use-drinks"
import { useMilks } from "~/hooks/use-milks"
import type { ApiOrder } from "~/hooks/use-orders"

const COLS: [string, string][] = [
  ["ordered", "New"],
  ["brewing", "Brewing"],
  ["ready-for-pickup", "Ready for pickup"],
  ["complete", "Picked up"],
]

const DOT_CLASS: Record<string, string> = {
  ordered: "bg-buppers-red",
  brewing: "bg-amber",
  "ready-for-pickup": "bg-buppers-green",
  complete: "bg-buppers-muted",
}

export function Board({
  orders,
  onAdvance,
}: {
  orders: ApiOrder[]
  onAdvance: (order: ApiOrder) => void
}) {
  const { data: drinks } = useDrinks({ $limit: 100 })
  const { data: milks } = useMilks({ $limit: 100 })

  const drinkLabel = (drinkId: number) =>
    drinks?.find((d) => d.drinkId === drinkId)?.name ?? `Drink #${drinkId}`

  const milkLabel = (milkId: number | null) =>
    milkId ? (milks?.find((m) => m.milkId === milkId)?.name ?? null) : null

  return (
    <div className="grid grid-cols-4 gap-[18px] items-start max-[1100px]:grid-cols-2 max-[560px]:grid-cols-1">
      {COLS.map(([key, label]) => {
        const list = orders
          .filter((o) => o.status === key)
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

        return (
          <div
            key={key}
            className={cn(
              "rounded-[16px] p-[6px]",
              key === "complete" ? "bg-transparent" : "bg-white/40",
            )}
          >
            <div className="flex items-center gap-2 px-[10px] pt-[6px] pb-3">
              <span className={cn("w-2 h-2 rounded-full shrink-0", DOT_CLASS[key])} />
              <span className="font-heading font-semibold text-[14.5px] text-ink">
                {label}
              </span>
              <span className="font-sans text-[12.5px] text-buppers-muted ml-auto">
                {list.length}
              </span>
            </div>

            <div className={cn("flex flex-col gap-3", key === "complete" && "opacity-[0.62]")}>
              {list.length === 0 ? (
                <div className="font-sans text-[12.5px] text-buppers-muted text-center py-6">
                  —
                </div>
              ) : null}
              {list.slice(0, key === "complete" ? 4 : 20).map((o) => (
                <OrderCard
                  key={o.orderId}
                  o={o}
                  drinkLabel={drinkLabel(o.drinkId)}
                  milkLabel={milkLabel(o.milkId)}
                  onAdvance={() => onAdvance(o)}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
