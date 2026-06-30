import { NavBar } from "~/components/nav-bar"
import { Eyebrow } from "~/components/eyebrow"
import { Button } from "~/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs"
import { StatCard } from "~/components/admin/stat-card"
import { Board } from "~/components/admin/board"
import { RecipeBook } from "~/components/admin/recipe-book"
import { useOrders, simulateOrder } from "~/lib/order-store"
import { useState } from "react"

export default function Admin() {
  const orders = useOrders()
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
            <Button
              variant="outline"
              size="sm"
              className="rounded-full font-semibold text-[13.5px] text-ink-soft border-line"
              onClick={handleSimulate}
            >
              + Simulate order
            </Button>
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
      <Tabs defaultValue="orders" className="max-w-[1240px] mx-auto px-7 gap-0">
        <div className="border-b border-line pt-2">
          <TabsList
            variant="line"
            className="w-full rounded-none justify-start h-auto bg-transparent p-0"
          >
            <TabsTrigger
              value="orders"
              className="px-[18px] py-[14px] rounded-none font-sans font-semibold text-[15px] border-0 border-b-2 border-b-transparent -mb-px data-[state=active]:text-teal data-[state=active]:border-b-teal data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Order board
            </TabsTrigger>
            <TabsTrigger
              value="recipes"
              className="px-[18px] py-[14px] rounded-none font-sans font-semibold text-[15px] border-0 border-b-2 border-b-transparent -mb-px data-[state=active]:text-teal data-[state=active]:border-b-teal data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Recipe book
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="orders" className="pt-7 pb-20 mt-0">
          <Board orders={orders} />
        </TabsContent>
        <TabsContent value="recipes" className="pt-7 pb-20 mt-0">
          <RecipeBook />
        </TabsContent>
      </Tabs>
    </div>
  )
}
