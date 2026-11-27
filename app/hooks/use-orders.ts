import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { OrderStatus, OrdersData, OrdersPatch, OrdersQuery } from "@justinszaro/api-client"
import client from "~/lib/feathers-client"

export interface CartItem {
  uid: string
  drinkId: number
  milkId: number | null
  addonIds: number[]
  isHot: boolean
  name: string
  detail: string
  qty: number
}

export interface PlacedOrder {
  id: number
  name: string
  items: { name: string; detail: string; qty: number }[]
}

export const STATUS: Record<OrderStatus, { label: string; tone: string; next: OrderStatus | null }> = {
  ordered: { label: "New", tone: "red", next: "brewing" },
  brewing: { label: "Brewing", tone: "amber", next: "ready-for-pickup" },
  "ready-for-pickup": { label: "Ready", tone: "green", next: "complete" },
  complete: { label: "Picked up", tone: "grey", next: null },
}

export const ACTION: Partial<Record<OrderStatus, string>> = {
  ordered: "Start brewing →",
  brewing: "Mark ready →",
  "ready-for-pickup": "Hand off →",
}

export function timeAgo(t: string) {
  const m = Math.round((Date.now() - new Date(t).getTime()) / 60000)
  if (m < 1) return "just now"
  if (m < 60) return m + " min ago"
  return Math.round(m / 60) + " hr ago"
}

export function useOrders(query: OrdersQuery = {}) {
  const queryClient = useQueryClient()

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["orders", query],
    queryFn: () => client.service("buppers/orders").find({ query }),
    refetchInterval: 5000,
  })

  const mutator = useMutation({
    mutationFn: (order: OrdersData | (OrdersPatch & { orderId: number })) => {
      if ("orderId" in order) {
        const { orderId, ...fields } = order
        return client.service("buppers/orders").patch(orderId, fields)
      }
      return client.service("buppers/orders").create(order)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "orders",
      })
    },
  })

  const remover = useMutation({
    mutationFn: (orderId: number) =>
      client.service("buppers/orders").remove(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "orders",
      })
    },
  })

  return {
    data: data?.data,
    total: data?.total,
    isLoading,
    isFetching,
    error,
    mutator,
    remover,
  }
}
