import { useState } from "react"
import { cn } from "~/lib/utils"
import { OrderCard } from "~/components/admin/order-card"
import { advance } from "~/lib/order-store"
import type { Order } from "~/lib/order-store"

const COLS: [string, string][] = [
  ["new", "New"],
  ["brewing", "Brewing"],
  ["ready", "Ready for pickup"],
  ["done", "Picked up"],
]

const DOT_CLASS: Record<string, string> = {
  new: "bg-buppers-red",
  brewing: "bg-amber",
  ready: "bg-buppers-green",
  done: "bg-buppers-muted",
}

export function Board({ orders }: { orders: Order[] }) {
  const [, forceRender] = useState(0)

  const doAdvance = (id: number) => {
    advance(id)
    forceRender((n) => n + 1)
  }

  return (
    <div className="grid grid-cols-4 gap-[18px] items-start">
      {COLS.map(([key, label]) => {
        const list = orders
          .filter((o) => o.status === key)
          .sort((a, b) => b.placedAt - a.placedAt)

        return (
          <div
            key={key}
            className={cn(
              "rounded-[16px] p-[6px]",
              key === "done" ? "bg-transparent" : "bg-white/40",
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

            <div className={cn("flex flex-col gap-3", key === "done" && "opacity-[0.62]")}>
              {list.length === 0 && (
                <div className="font-sans text-[12.5px] text-buppers-muted text-center py-6">
                  —
                </div>
              )}
              {list.slice(0, key === "done" ? 4 : 20).map((o) => (
                <OrderCard key={o.id} o={o} onAdvance={() => doAdvance(o.id)} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
