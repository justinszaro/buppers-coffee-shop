import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import client from "~/lib/feathers-client"

export interface Bean {
  beanId: number
  name: string
  description: string | null
  roaster: string
  notes: string
  roast: string
  active: boolean
  onDeck: boolean
  createdAt: string
  updatedAt: string
}

export function useBeans(query: Record<string, unknown> = {}) {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["beans", query],
    queryFn: async () => {
      const response = await client.service("buppers/beans").find({ query })
      return response as { data: Bean[]; total: number }
    },
  })

  const mutator = useMutation({
    mutationFn: (bean: { beanId?: number; [key: string]: unknown }) => {
      if (bean.beanId) {
        const { beanId, ...fields } = bean
        return client.service("buppers/beans").patch(beanId, fields)
      }
      return client.service("buppers/beans").create(bean)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "beans",
      })
    },
  })

  const remover = useMutation({
    mutationFn: (beanId: number) =>
      client.service("buppers/beans").remove(beanId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "beans",
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
