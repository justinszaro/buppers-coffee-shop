import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Separator } from "~/components/ui/separator"
import { DuoMark } from "~/components/duo-mark"
import { NavBar } from "~/components/nav-bar"
import type { PlacedOrder } from "~/hooks/use-orders"

export function Confirm({
  order,
  onAgain,
}: {
  order: PlacedOrder
  onAgain: () => void
}) {
  return (
    <div className="bg-paper min-h-screen">
      <NavBar active="order" />
      <div className="max-w-[1160px] mx-auto px-7 py-[80px] flex justify-center">
        <Card
          className="w-[560px] max-w-full rounded-[24px] border border-line ring-0 overflow-hidden [--card-spacing:0px] shadow-[var(--shadow-brand)]"
        >
          {/* Dark header */}
          <div className="bg-teal-dark px-9 py-10 text-center text-cream">
            <div className="flex justify-center mb-[14px]">
              <DuoMark size={60} variant="cream" />
            </div>
            <h2 className="font-heading font-bold text-[30px] m-0 tracking-[-0.02em]">
              Order in, {order.name}!
            </h2>
          </div>

          {/* Order details */}
          <CardContent className="px-9 py-7">
            <div className="flex justify-between items-center mb-2">
              <span className="font-sans text-sm text-buppers-muted">Order number</span>
              <span className="font-heading font-bold text-[24px] text-teal">
                #{order.id}
              </span>
            </div>

            {order.items.map((i, n) => (
              <div key={n}>
                <Separator className="bg-line-soft" />
                <div className="flex gap-[10px] py-3">
                  <span className="font-heading font-bold text-[15px] text-teal">
                    {i.qty}×
                  </span>
                  <div>
                    <span className="font-heading font-semibold text-[15px] text-ink">
                      {i.name}
                    </span>
                    <div className="font-sans text-[12.5px] text-buppers-muted">
                      {i.detail}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-3 mt-[26px]">
              <Button
                variant="outline"
                className="flex-1 rounded-full font-semibold text-base px-[26px] py-[14px] h-auto border-line text-ink"
                onClick={onAgain}
              >
                Order another
              </Button>
              <Link to="/admin" className="no-underline flex-1">
                <Button className="w-full bg-teal text-white rounded-full font-semibold text-base px-[26px] py-[14px] h-auto border-none hover:bg-teal-deep">
                  Track on the bar →
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
