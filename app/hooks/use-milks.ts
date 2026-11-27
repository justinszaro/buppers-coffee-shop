import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { MilksData, MilksPatch, MilksQuery } from "@justinszaro/api-client"
import client from "~/lib/feathers-client"

export function useMilks(query: MilksQuery = {}) {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["milks", query],
    queryFn: () => client.service("buppers/milks").find({ query }),
  })

  const mutator = useMutation({
    mutationFn: (milk: MilksData | (MilksPatch & { milkId: number })) => {
      if ("milkId" in milk) {
        const { milkId, ...fields } = milk
        return client.service("buppers/milks").patch(milkId, fields)
      }
      return client.service("buppers/milks").create(milk)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "milks",
      })
    },
  })

  const remover = useMutation({
    mutationFn: (milkId: number) =>
      client.service("buppers/milks").remove(milkId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "milks",
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
