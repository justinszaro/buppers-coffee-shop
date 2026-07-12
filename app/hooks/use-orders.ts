import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import client from "~/lib/feathers-client"

type OrderStatus =
  | "ordered"
  | "brewing"
  | "ready-for-pickup"
  | "complete"

interface OrderAddon {
  addonId: number
  name: string
}

export interface ApiOrder {
  orderId: number
  drinkId: number
  milkId: number | null
  addons: OrderAddon[]
  name: string
  status: OrderStatus
  isHot: boolean
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  uid: string
  drinkId: string
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

export const STATUS: Record<string, { label: string; tone: string; next: string | null }> = {
  ordered: { label: "New", tone: "red", next: "brewing" },
  brewing: { label: "Brewing", tone: "amber", next: "ready-for-pickup" },
  "ready-for-pickup": { label: "Ready", tone: "green", next: "complete" },
  complete: { label: "Picked up", tone: "grey", next: null },
}

export const ACTION: Record<string, string> = {
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

export function useOrders(query: Record<string, unknown> = {}) {
  const queryClient = useQueryClient()

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["orders", query],
    queryFn: async () => {
      const response = await client.service("buppers/orders").find({ query })
      return response as { data: ApiOrder[]; total: number }
    },
    refetchInterval: 5000,
  })

  const mutator = useMutation({
    mutationFn: (order: { orderId?: number; [key: string]: unknown }) => {
      if (order.orderId) {
        const { orderId, ...fields } = order
        return client.service("buppers/orders").patch(orderId, fields) as Promise<ApiOrder>
      }
      return client.service("buppers/orders").create(order) as Promise<ApiOrder>
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
