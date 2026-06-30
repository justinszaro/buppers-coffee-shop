import { useState, useEffect } from 'react'
import { client } from '~/lib/feathers-client'

export interface Milk {
  milkId: number
  name: string
  description: string | null
  active: boolean
  createdAt: string
  updatedAt: string
}

export function useMilks() {
  const [milks, setMilks] = useState<Milk[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    client
      .service('milks')
      .find({ query: { $limit: 100 } })
      .then((result: { total: number; data: Milk[]; skip: number; limit: number }) => {
        setMilks(result.data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return { milks, loading, error }
}
