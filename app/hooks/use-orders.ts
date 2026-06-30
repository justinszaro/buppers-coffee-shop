import { useState, useEffect, useCallback } from 'react'
import { client } from '~/lib/feathers-client'

export type OrderStatus = 'ordered' | 'brewing' | 'ready-for-pickup' | 'complete'

export interface ApiOrder {
  orderId: number
  drinkId: number
  milkId: number | null
  name: string
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

export interface CreateOrderData {
  drinkId: number
  milkId?: number | null
  name: string
  status?: OrderStatus
}

export interface PatchOrderData {
  status?: OrderStatus
  drinkId?: number
  milkId?: number | null
  name?: string
}

const POLL_INTERVAL = 5000

export function useApiOrders() {
  const [orders, setOrders] = useState<ApiOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchOrders = useCallback(() => {
    return client
      .service('orders')
      .find({ query: { $limit: 200, $sort: { createdAt: -1 } } })
      .then((result: { total: number; data: ApiOrder[]; skip: number; limit: number }) => {
        setOrders(result.data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchOrders()
    const iv = setInterval(fetchOrders, POLL_INTERVAL)
    return () => clearInterval(iv)
  }, [fetchOrders])

  const createOrder = useCallback(async (data: CreateOrderData): Promise<ApiOrder> => {
    const order = await client.service('orders').create(data)
    await fetchOrders()
    return order as ApiOrder
  }, [fetchOrders])

  const patchOrder = useCallback(async (orderId: number, data: PatchOrderData): Promise<ApiOrder> => {
    const order = await client.service('orders').patch(orderId, data)
    setOrders(prev => prev.map(o => (o.orderId === orderId ? (order as ApiOrder) : o)))
    return order as ApiOrder
  }, [])

  const advanceOrder = useCallback(async (orderId: number) => {
    const STATUS_NEXT: Record<OrderStatus, OrderStatus | null> = {
      ordered: 'brewing',
      brewing: 'ready-for-pickup',
      'ready-for-pickup': 'complete',
      complete: null,
    }
    const order = orders.find(o => o.orderId === orderId)
    if (!order) return
    const next = STATUS_NEXT[order.status]
    if (!next) return
    await patchOrder(orderId, { status: next })
  }, [orders, patchOrder])

  return { orders, loading, error, createOrder, patchOrder, advanceOrder, refresh: fetchOrders }
}
