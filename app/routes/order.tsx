import { useState } from "react"
import { NavBar } from "~/components/nav-bar"
import { Footer } from "~/components/footer"
import { Eyebrow } from "~/components/eyebrow"
import { DrinkCard } from "~/components/order/drink-card"
import { Customizer } from "~/components/order/customizer"
import { Cart } from "~/components/order/cart"
import { Confirm } from "~/components/order/confirm"
import { DRINKS, CURRENT_BEAN } from "~/lib/menu-data"
import type { DrinkDef } from "~/lib/menu-data"
import type { CartItem, PlacedOrder } from "~/lib/order-store"

export default function Order() {
  const [items, setItems] = useState<CartItem[]>([])
  const [active, setActive] = useState<DrinkDef | null>(null)
  const [placed, setPlaced] = useState<PlacedOrder | null>(null)

  if (placed) {
    return (
      <Confirm
        order={placed}
        onAgain={() => {
          setPlaced(null)
          setItems([])
        }}
      />
    )
  }

  return (
    <div className="bg-paper min-h-screen">
      <NavBar active="order" />

      {/* Page header */}
      <div className="max-w-[1160px] mx-auto px-7 pt-11 pb-7">
        <Eyebrow>Order ahead</Eyebrow>
        <h1 className="font-heading font-bold text-[40px] tracking-[-0.025em] text-ink mt-3 mb-1">
          Build your cup
        </h1>
        <p className="font-sans text-base text-buppers-muted m-0">
          Pick a drink, make it yours, and skip the line. Everything&apos;s
          made with this week&apos;s bean — {CURRENT_BEAN.name}.
        </p>
      </div>

      {/* Drink grid + cart */}
      <div
        className="max-w-[1160px] mx-auto px-7 pb-20 grid gap-8 items-start"
        style={{ gridTemplateColumns: "1fr 372px" }}
      >
        {/* Drinks grid */}
        <div className="grid grid-cols-2 gap-[18px]">
          {DRINKS.map((d) => (
            <DrinkCard key={d.id} drink={d} onSelect={() => setActive(d)} />
          ))}
        </div>

        {/* Cart */}
        <Cart items={items} setItems={setItems} onPlaced={setPlaced} />
      </div>

      {/* Customizer modal */}
      {active && (
        <Customizer
          drink={active}
          onClose={() => setActive(null)}
          onAdd={(it) => {
            setItems((a) => [...a, it])
            setActive(null)
          }}
        />
      )}

      <Footer />
    </div>
  )
}
