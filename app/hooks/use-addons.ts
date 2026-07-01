import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { client } from '~/lib/feathers-client'

export interface Addon {
  addonId: number
  name: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export function useAddons(query: Record<string, unknown> = {}) {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['addons', query],
    queryFn: async () => {
      const response = await client.service('buppers/addons').find({ query })
      return response as { data: Addon[]; total: number }
    },
  })

  const mutator = useMutation({
    mutationFn: (addon: { addonId?: number; [key: string]: unknown }) => {
      if (addon.addonId) {
        const { addonId, ...fields } = addon
        return client.service('buppers/addons').patch(addonId, fields)
      }
      return client.service('buppers/addons').create(addon)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === 'addons' })
    },
  })

  const remover = useMutation({
    mutationFn: (addonId: number) => client.service('buppers/addons').remove(addonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === 'addons' })
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
