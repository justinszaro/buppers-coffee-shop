import { useState, useEffect } from 'react'
import { client } from '~/lib/feathers-client'

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

export function useBeans() {
  const [beans, setBeans] = useState<Bean[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    client
      .service('beans')
      .find({ query: { $limit: 100 } })
      .then((result: { total: number; data: Bean[]; skip: number; limit: number }) => {
        setBeans(result.data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return { beans, loading, error }
}
