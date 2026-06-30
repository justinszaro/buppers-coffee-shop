import { cn } from "~/lib/utils"
import { Card, CardContent } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/badge"
import { STATUS, ACTION, timeAgo } from "~/lib/order-store"
import type { Order } from "~/lib/order-store"

const BOARD_LEFT_CLASS: Record<string, string> = {
  new: "border-l-[3px] border-l-buppers-red",
  brewing: "border-l-[3px] border-l-amber",
  ready: "border-l-[3px] border-l-buppers-green",
  done: "border-l-[3px] border-l-line",
}

export function OrderCard({
  o,
  onAdvance,
}: {
  o: Order
  onAdvance: () => void
}) {
  const st = STATUS[o.status]
  const totalDrinks = o.items.reduce((s, i) => s + i.qty, 0)

  return (
    <Card
      className={cn(
        "rounded-[14px] border border-line ring-0 [--card-spacing:0px] shadow-[var(--shadow-brand-sm)]",
        BOARD_LEFT_CLASS[o.status] ?? "border-l-[3px] border-l-line",
      )}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-[10px]">
          <span className="font-heading font-bold text-base text-ink">
            #{o.id} · {o.name}
          </span>
          <span className="font-sans text-[12px] text-buppers-muted">
            {timeAgo(o.placedAt)}
          </span>
        </div>

        <div className="flex flex-col gap-[6px] mb-3">
          {o.items.map((i, n) => (
            <div key={n} className="flex gap-2">
              <span className="font-heading font-semibold text-[13.5px] text-teal shrink-0">
                {i.qty}×
              </span>
              <div className="min-w-0">
                <div className="font-heading font-semibold text-[13.5px] text-ink">
                  {i.name}
                </div>
                <div className="font-sans text-[11.5px] text-buppers-muted leading-[1.35]">
                  {i.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <span className="font-sans text-[12.5px] text-buppers-muted">
            {totalDrinks} {totalDrinks === 1 ? "drink" : "drinks"}
          </span>
          {st?.next ? (
            <Button
              size="sm"
              className="rounded-full font-semibold text-[13px] bg-teal text-white border-none hover:bg-teal-deep"
              onClick={onAdvance}
            >
              {ACTION[o.status]}
            </Button>
          ) : (
            <Badge tone="grey">Done</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
