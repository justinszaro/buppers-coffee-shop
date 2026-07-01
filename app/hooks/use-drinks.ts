import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '~/lib/feathers-client'

export interface Drink {
  drinkId: number
  name: string
  description: string
  active: boolean
  featured: boolean
  createdAt: string
  updatedAt: string
}

export function useDrinks(query: Record<string, unknown> = {}) {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['drinks', query],
    queryFn: async () => {
      const response = await client.service('buppers/drinks').find({ query })
      return response as { data: Drink[]; total: number }
    },
  })

  const mutator = useMutation({
    mutationFn: (drink: { drinkId?: number; [key: string]: unknown }) => {
      if (drink.drinkId) {
        const { drinkId, ...fields } = drink
        return client.service('buppers/drinks').patch(drinkId, fields)
      }
      return client.service('buppers/drinks').create(drink)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === 'drinks' })
    },
  })

  const remover = useMutation({
    mutationFn: (drinkId: number) => client.service('buppers/drinks').remove(drinkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === 'drinks' })
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
