import { Badge } from "~/components/badge"
import { STATUS, ACTION, timeAgo } from "~/lib/order-store"
import type { Order } from "~/lib/order-store"

const BOARD_LEFT_COLOR: Record<string, string> = {
  new: "#c54b42",
  brewing: "#c98a3c",
  ready: "#3f8d6e",
  done: "#e9e6df",
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
    <div
      className="bg-white border border-line rounded-[14px] p-4"
      style={{
        boxShadow: "var(--shadow-brand-sm)",
        borderLeft: `3px solid ${BOARD_LEFT_COLOR[o.status] ?? "#e9e6df"}`,
      }}
    >
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
          <button
            onClick={onAdvance}
            className="font-sans font-semibold text-[13px] cursor-pointer border-none rounded-full px-[14px] py-[7px] bg-teal text-white"
          >
            {ACTION[o.status]}
          </button>
        ) : (
          <Badge tone="grey">Done</Badge>
        )}
      </div>
    </div>
  )
}
