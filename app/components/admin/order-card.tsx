import { Coffee, Snowflake } from 'lucide-react';
import { cn } from "~/lib/utils"
import { Card, CardContent } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { STATUS, ACTION, timeAgo } from "~/hooks/use-orders"
import type { ApiOrder } from "~/hooks/use-orders"

const BOARD_LEFT_CLASS: Record<string, string> = {
  ordered: "border-l-[3px] border-l-buppers-red",
  brewing: "border-l-[3px] border-l-amber",
  "ready-for-pickup": "border-l-[3px] border-l-buppers-green",
  complete: "border-l-[3px] border-l-line",
}

export function OrderCard({
  o,
  drinkLabel,
  milkLabel,
  onAdvance,
}: {
  o: ApiOrder
  drinkLabel: string
  milkLabel: string | null
  onAdvance: () => void
}) {
  const st = STATUS[o.status]

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
            #{o.orderId} · {o.name}
          </span>
          <span className="font-sans text-[12px] text-buppers-muted">
            {timeAgo(o.createdAt)}
          </span>
        </div>

        <div className="flex flex-col gap-[6px] mb-3">
          <div className="flex gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-[6px]">
                <span className="font-heading font-semibold text-[13.5px] text-ink">
                  {drinkLabel}
                </span>
                <span className="font-sans text-[11.5px] text-buppers-muted flex items-center gap-[3px]">
                  {o.isHot ? (
                    <><Coffee className="inline" size={11} /> Hot</>
                  ) : (
                    <><Snowflake className="inline" size={11} /> Iced</>
                  )}
                </span>
              </div>
              {milkLabel ? (
                <div className="font-sans text-[11.5px] text-buppers-muted leading-[1.35]">
                  {milkLabel}
                </div>
              ) : null}
              {o.addons.length > 0 ? (
                <div className="font-sans text-[11.5px] text-buppers-muted leading-[1.35]">
                  +{o.addons.map((a) => a.name).join(", ")}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-sans text-[12.5px] text-buppers-muted">
            {st?.label ?? o.status}
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
            <Badge className="h-auto font-semibold text-[11.5px] tracking-[0.06em] uppercase rounded-full px-[10px] py-[4px] whitespace-nowrap bg-[#eeece7] text-ink-soft border-transparent">Done</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
