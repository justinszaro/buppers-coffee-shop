import { useState } from "react"
import { OrderCard } from "~/components/admin/order-card"
import { advance } from "~/lib/order-store"
import type { Order } from "~/lib/order-store"

const COLS: [string, string][] = [
  ["new", "New"],
  ["brewing", "Brewing"],
  ["ready", "Ready for pickup"],
  ["done", "Picked up"],
]

const DOT_COLOR: Record<string, string> = {
  new: "#c54b42",
  brewing: "#c98a3c",
  ready: "#3f8d6e",
  done: "#6b6b72",
}

export function Board({ orders }: { orders: Order[] }) {
  const [, forceRender] = useState(0)

  const doAdvance = (id: number) => {
    advance(id)
    forceRender((n) => n + 1)
  }

  return (
    <div className="grid gap-[18px] items-start" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
      {COLS.map(([key, label]) => {
        const list = orders
          .filter((o) => o.status === key)
          .sort((a, b) => b.placedAt - a.placedAt)

        return (
          <div
            key={key}
            className="rounded-[16px] p-[6px]"
            style={{ background: key === "done" ? "transparent" : "rgba(255,255,255,.4)" }}
          >
            <div className="flex items-center gap-2 px-[10px] pt-[6px] pb-3">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: DOT_COLOR[key] }}
              />
              <span className="font-heading font-semibold text-[14.5px] text-ink">
                {label}
              </span>
              <span className="font-sans text-[12.5px] text-buppers-muted ml-auto">
                {list.length}
              </span>
            </div>

            <div
              className="flex flex-col gap-3"
              style={{ opacity: key === "done" ? 0.62 : 1 }}
            >
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
