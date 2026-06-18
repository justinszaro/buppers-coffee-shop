import { useState } from "react"
import { Button } from "~/components/ui/button"
import { DuoMark } from "~/components/duo-mark"
import { Stepper } from "~/components/stepper"
import { addOrder } from "~/lib/order-store"
import type { CartItem, PlacedOrder } from "~/lib/order-store"

export function Cart({
  items,
  setItems,
  onPlaced,
}: {
  items: CartItem[]
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>
  onPlaced: (o: PlacedOrder) => void
}) {
  const [name, setName] = useState("")
  const count = items.reduce((s, i) => s + i.qty, 0)

  const setQty = (uid: string, q: number) =>
    setItems((arr) =>
      q <= 0
        ? arr.filter((i) => i.uid !== uid)
        : arr.map((i) => (i.uid === uid ? { ...i, qty: q } : i)),
    )

  const place = () =>
    onPlaced(
      addOrder({
        name: name.trim() || "Walk-in",
        items: items.map((i) => ({ name: i.name, detail: i.detail, qty: i.qty })),
      }),
    )

  return (
    <div
      className="sticky top-[94px] bg-white rounded-[20px] border border-line overflow-hidden"
      style={{ boxShadow: "var(--shadow-brand)" }}
    >
      {/* Header */}
      <div className="px-[22px] py-5 border-b border-line flex items-center gap-[10px]">
        <DuoMark size={28} variant="color" />
        <span className="font-heading font-semibold text-[18px] text-ink">Your order</span>
        <span className="ml-auto font-sans text-[13px] text-buppers-muted">
          {count} {count === 1 ? "drink" : "drinks"}
        </span>
      </div>

      {/* Items */}
      <div className="max-h-[360px] overflow-y-auto">
        {items.length === 0 ? (
          <div className="px-[22px] py-[46px] text-center">
            <div className="opacity-50 mb-3 flex justify-center">
              <DuoMark size={44} variant="ink" />
            </div>
            <p className="font-sans text-sm text-buppers-muted m-0">
              Nothing in the cup yet.
              <br />
              Pick a drink to get started.
            </p>
          </div>
        ) : (
          items.map((i) => (
            <div
              key={i.uid}
              className="px-[22px] py-4 border-b border-line-soft flex gap-3"
            >
              <div className="flex-1 min-w-0">
                <div className="font-heading font-semibold text-[15.5px] text-ink">
                  {i.name}
                </div>
                <div className="font-sans text-[12.5px] text-buppers-muted mt-0.5 leading-[1.4]">
                  {i.detail}
                </div>
                <div className="mt-[9px]">
                  <Stepper value={i.qty} onChange={(q) => setQty(i.uid, q)} min={0} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Place order */}
      {items.length > 0 && (
        <div className="px-[22px] pt-[18px] pb-[22px]">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name for the order"
            className="w-full box-border mb-3 font-sans text-[15px] px-[14px] py-3 rounded-[11px] border border-line outline-none bg-paper"
          />
          <Button
            className="w-full bg-teal text-white rounded-full font-semibold text-base px-[26px] py-[14px] h-auto border-none hover:bg-teal-deep"
            onClick={place}
          >
            Send to the bar →
          </Button>
          <p className="font-sans text-[12px] text-buppers-muted text-center mt-3 mb-0">
            Ready for pickup in about 6 minutes
          </p>
        </div>
      )}
    </div>
  )
}
