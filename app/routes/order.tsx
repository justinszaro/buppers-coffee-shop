import { useState } from "react"
import { NavBar } from "~/components/nav-bar"
import { Footer } from "~/components/footer"
import { Eyebrow } from "~/components/eyebrow"
import { DrinkCard } from "~/components/order/drink-card"
import { Customizer } from "~/components/order/customizer"
import { Cart } from "~/components/order/cart"
import { Confirm } from "~/components/order/confirm"
import { useDrinks } from "~/hooks/use-drinks"
import { useBeans } from "~/hooks/use-beans"
import { useMilks } from "~/hooks/use-milks"
import { useAddons } from "~/hooks/use-addons"
import type { DrinkDef } from "~/lib/menu-data"
import type { CartItem, PlacedOrder } from "~/lib/order-store"

export default function Order() {
  const [items, setItems] = useState<CartItem[]>([])
  const [active, setActive] = useState<DrinkDef | null>(null)
  const [placed, setPlaced] = useState<PlacedOrder | null>(null)

  const { data: apiDrinks, isLoading: drinksLoading } = useDrinks({ active: true, $limit: 100 })
  const { data: beans, isLoading: beansLoading } = useBeans({ active: true, $limit: 1 })
  const { data: apiMilks, isLoading: milksLoading } = useMilks({ $limit: 100 })
  const { data: apiAddons, isLoading: addonsLoading } = useAddons({ $limit: 100 })

  const currentBean = beans?.[0]
  const beanName = currentBean?.name ?? "this week's bean"

  const drinks: DrinkDef[] = (apiDrinks ?? []).map((d) => ({
    id: String(d.drinkId),
    name: d.name,
    tone: "cream",
    milk: true,
    seasonal: d.featured,
    desc: d.description,
  }))

  const milkOptions = (apiMilks ?? [])
    .filter((m) => m.active)
    .map((m) => ({ id: String(m.milkId), label: m.name }))

  const extraOptions = (apiAddons ?? [])
    .filter((a) => a.active)
    .map((a) => ({ id: String(a.addonId), label: a.name }))

  const loading = drinksLoading || beansLoading || milksLoading || addonsLoading

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
          made with this week&apos;s bean — {beanName}.
        </p>
      </div>

      {/* Drink grid + cart */}
      <div className="max-w-[1160px] mx-auto px-7 pb-20 grid grid-cols-[1fr_372px] gap-8 items-start">
        {/* Drinks grid */}
        <div className="grid grid-cols-2 gap-[18px]">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-line rounded-[18px] p-5 h-[106px] animate-pulse"
                />
              ))
            : drinks.map((d) => (
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
          milkOptions={milkOptions}
          extraOptions={extraOptions}
          beanName={beanName}
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
