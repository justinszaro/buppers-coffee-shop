import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { BeansData, BeansPatch, BeansQuery } from "@justinszaro/api-client"
import client from "~/lib/feathers-client"

export function useBeans(query: BeansQuery = {}) {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["beans", query],
    queryFn: () => client.service("buppers/beans").find({ query }),
  })

  const mutator = useMutation({
    mutationFn: (bean: BeansData | (BeansPatch & { beanId: number })) => {
      if ("beanId" in bean) {
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
