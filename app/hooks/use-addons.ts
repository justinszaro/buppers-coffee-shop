import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { AddonsData, AddonsPatch, AddonsQuery } from "@justinszaro/api-client"
import client from "~/lib/feathers-client"

export function useAddons(query: AddonsQuery = {}) {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["addons", query],
    queryFn: () => client.service("buppers/addons").find({ query }),
  })

  const mutator = useMutation({
    mutationFn: (addon: AddonsData | (AddonsPatch & { addonId: number })) => {
      if ("addonId" in addon) {
        const { addonId, ...fields } = addon
        return client.service("buppers/addons").patch(addonId, fields)
      }
      return client.service("buppers/addons").create(addon)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "addons",
      })
    },
  })

  const remover = useMutation({
    mutationFn: (addonId: number) =>
      client.service("buppers/addons").remove(addonId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "addons",
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
