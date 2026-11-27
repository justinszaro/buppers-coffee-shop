import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { DrinksData, DrinksPatch, DrinksQuery } from "@justinszaro/api-client"
import client from "~/lib/feathers-client"

export function useDrinks(query: DrinksQuery = {}) {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["drinks", query],
    queryFn: () => client.service("buppers/drinks").find({ query }),
  })

  const mutator = useMutation({
    mutationFn: (drink: DrinksData | (DrinksPatch & { drinkId: number })) => {
      if ("drinkId" in drink) {
        const { drinkId, ...fields } = drink
        return client.service("buppers/drinks").patch(drinkId, fields)
      }
      return client.service("buppers/drinks").create(drink)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "drinks",
      })
    },
  })

  const remover = useMutation({
    mutationFn: (drinkId: number) =>
      client.service("buppers/drinks").remove(drinkId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "drinks",
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
