import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '~/lib/feathers-client'

export interface Milk {
  milkId: number
  name: string
  description: string | null
  active: boolean
  createdAt: string
  updatedAt: string
}

export function useMilks(query: Record<string, unknown> = {}) {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['milks', query],
    queryFn: async () => {
      const response = await client.service('buppers/milks').find({ query })
      return response as { data: Milk[]; total: number }
    },
  })

  const mutator = useMutation({
    mutationFn: (milk: { milkId?: number; [key: string]: unknown }) => {
      if (milk.milkId) {
        const { milkId, ...fields } = milk
        return client.service('buppers/milks').patch(milkId, fields)
      }
      return client.service('buppers/milks').create(milk)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === 'milks' })
    },
  })

  const remover = useMutation({
    mutationFn: (milkId: number) => client.service('buppers/milks').remove(milkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === 'milks' })
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
