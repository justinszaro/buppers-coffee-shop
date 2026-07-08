import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import client from "~/lib/feathers-client"

export type OrderStatus =
  | "ordered"
  | "brewing"
  | "ready-for-pickup"
  | "complete"

export interface ApiOrder {
  orderId: number
  drinkId: number
  milkId: number | null
  name: string
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

export function useOrders(query: Record<string, unknown> = {}) {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
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
    error,
    mutator,
    remover,
  }
}
