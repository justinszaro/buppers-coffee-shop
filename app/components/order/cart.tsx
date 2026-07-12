import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"
import { DuoMark } from "~/components/duo-mark"
import { Stepper } from "~/components/stepper"
import { useOrders } from "~/hooks/use-orders"
import type { CartItem, PlacedOrder } from "~/hooks/use-orders"

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
  const [placing, setPlacing] = useState(false)
  const { mutator } = useOrders()
  const count = items.reduce((s, i) => s + i.qty, 0)

  const setQty = (uid: string, q: number) =>
    setItems((arr) =>
      q <= 0
        ? arr.filter((i) => i.uid !== uid)
        : arr.map((i) => (i.uid === uid ? { ...i, qty: q } : i)),
    )

  const place = async () => {
    setPlacing(true)
    const customerName = name.trim()
    try {
      const results = await Promise.all(
        items.map((item) =>
          mutator.mutateAsync({
            drinkId: Number(item.drinkId),
            milkId: item.milkId,
            addonIds: item.addonIds,
            isHot: item.isHot,
            name: customerName,
          }),
        ),
      )
      onPlaced({
        id: results[0].orderId,
        name: customerName,
        items: items.map((i) => ({ name: i.name, detail: i.detail, qty: i.qty })),
      })
    } finally {
      setPlacing(false)
    }
  }

  return (
    <Card
      className="sticky top-[94px] rounded-[20px] border border-line ring-0 overflow-hidden [--card-spacing:0px] shadow-[var(--shadow-brand)] max-[980px]:static max-[980px]:top-auto"
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
          items.map((i, idx) => (
            <div key={i.uid}>
              <div className="px-[22px] py-4 flex gap-3">
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
              {idx < items.length - 1 && <Separator className="bg-line-soft" />}
            </div>
          ))
        )}
      </div>

      {/* Place order */}
      {items.length > 0 && (
        <div className="px-[22px] pt-[18px] pb-[22px]">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name for the order"
            className="mb-3 font-sans text-[15px] rounded-[11px] border-line bg-paper h-auto py-3"
          />
          <Button
            className="w-full bg-teal text-white rounded-full font-semibold text-base px-[26px] py-[14px] h-auto border-none hover:bg-teal-deep"
            onClick={place}
            disabled={placing || !name.trim()}
          >
            {placing ? "Sending…" : "Send to the bar →"}
          </Button>
        </div>
      )}
    </Card>
  )
}
