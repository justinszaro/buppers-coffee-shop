import { NavBar } from "~/components/nav-bar"
import { Eyebrow } from "~/components/eyebrow"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs"
import { StatCard } from "~/components/admin/stat-card"
import { Board } from "~/components/admin/board"
import { RecipeBook } from "~/components/admin/recipe-book"
import { useOrders, STATUS } from "~/hooks/use-orders"
import type { ApiOrder } from "~/hooks/use-orders"

export function meta() {
  return [
    { title: "Admin | Buppers Coffee" },
    {
      name: "description",
      content: "Admin dashboard for managing the Buppers Coffee menu, orders, and settings.",
    },
  ]
}

export default function Admin() {
  const { data: orders, isFetching, mutator } = useOrders({ $sort: { createdAt: -1 }, $limit: 200 })

  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)
  const todayStr = startOfDay.toISOString()
  const today = orders.filter((o) => o.createdAt >= todayStr)
  const active = orders.filter((o) => o.status === "ordered" || o.status === "brewing").length
  const ready = orders.filter((o) => o.status === "ready-for-pickup").length
  const completed = today.filter((o) => o.status === "complete").length

  const doAdvance = (order: ApiOrder) => {
    const next = STATUS[order.status]?.next
    if (next) mutator.mutate({ orderId: order.orderId, status: next })
  }

  return (
    <div className="bg-paper min-h-screen">
      <NavBar active="admin" />

      {/* Page header */}
      <div className="max-w-[1240px] mx-auto px-7 pt-10 pb-6 max-[520px]:px-[18px]">
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <Eyebrow>Staff portal</Eyebrow>
            <h1 className="font-heading font-bold text-[38px] tracking-[-0.025em] text-ink mt-3 mb-0">
              Behind the bar
            </h1>
          </div>

          <div className="flex gap-[10px] items-center">
            <div className={`flex items-center gap-[7px] font-sans text-[13px] rounded-full px-[14px] py-2 transition-colors duration-300 ${isFetching ? "bg-buppers-green text-white" : "bg-[#dff0e8] text-buppers-green"}`}>
              <span className={`w-[7px] h-[7px] rounded-full ${isFetching ? "bg-white animate-bpulse" : "bg-buppers-green"}`} />
              {isFetching ? "Syncing…" : "Live"}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mt-[26px] max-[700px]:grid-cols-2">
          <StatCard label="Orders today" value={today.length} />
          <StatCard label="In progress" value={active} color="#c98a3c" />
          <StatCard label="Ready now" value={ready} color="#3f8d6e" />
          <StatCard label="Completed today" value={completed} color="#00786f" />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="max-w-[1240px] mx-auto px-7 gap-0 max-[520px]:px-[18px]">
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
          <Board orders={orders} onAdvance={doAdvance} />
        </TabsContent>
        <TabsContent value="recipes" className="pt-7 pb-20 mt-0">
          <RecipeBook />
        </TabsContent>
      </Tabs>
    </div>
  )
}
