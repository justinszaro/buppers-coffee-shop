import { useState } from "react"
import { NavBar } from "~/components/nav-bar"
import { Eyebrow } from "~/components/eyebrow"
import { StatCard } from "~/components/admin/stat-card"
import { Board } from "~/components/admin/board"
import { RecipeBook } from "~/components/admin/recipe-book"
import { useOrders, simulateOrder } from "~/lib/order-store"

export default function Admin() {
  const orders = useOrders()
  const [tab, setTab] = useState<"orders" | "recipes">("orders")
  const [, forceRender] = useState(0)

  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)
  const today = orders.filter((o) => o.placedAt >= startOfDay.getTime())
  const active = orders.filter((o) => o.status === "new" || o.status === "brewing").length
  const ready = orders.filter((o) => o.status === "ready").length
  const completed = today.filter((o) => o.status === "done").length

  const handleSimulate = () => {
    simulateOrder()
    forceRender((n) => n + 1)
  }

  const TABS: ["orders" | "recipes", string][] = [
    ["orders", "Order board"],
    ["recipes", "Recipe book"],
  ]

  return (
    <div className="bg-paper min-h-screen">
      <NavBar active="admin" />

      {/* Page header */}
      <div className="max-w-[1240px] mx-auto px-7 pt-10 pb-6">
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <Eyebrow>Staff portal</Eyebrow>
            <h1 className="font-heading font-bold text-[38px] tracking-[-0.025em] text-ink mt-3 mb-0">
              Behind the bar
            </h1>
          </div>

          <div className="flex gap-[10px] items-center">
            <button
              onClick={handleSimulate}
              className="font-sans font-semibold text-[13.5px] cursor-pointer rounded-full px-4 py-2 bg-transparent text-ink-soft border border-line"
            >
              + Simulate order
            </button>
            <div className="flex items-center gap-[7px] font-sans text-[13px] rounded-full px-[14px] py-2 bg-[#dff0e8] text-buppers-green">
              <span className="w-[7px] h-[7px] rounded-full bg-buppers-green animate-bpulse" />
              Live
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-4 mt-[26px]">
          <StatCard label="Orders today" value={today.length} />
          <StatCard label="In progress" value={active} color="#c98a3c" />
          <StatCard label="Ready now" value={ready} color="#3f8d6e" />
          <StatCard label="Completed today" value={completed} color="#00786f" />
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-[1240px] mx-auto px-7 pt-2 pb-0">
        <div className="flex gap-1 border-b border-line">
          {TABS.map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className="font-sans font-semibold text-[15px] cursor-pointer border-none bg-transparent px-[18px] py-[14px] -mb-px"
              style={{
                color: tab === k ? "#00786f" : "#6b6b72",
                borderBottom: `2px solid ${tab === k ? "#00786f" : "transparent"}`,
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-[1240px] mx-auto px-7 pt-7 pb-20">
        {tab === "orders" ? <Board orders={orders} /> : <RecipeBook />}
      </div>
    </div>
  )
}
