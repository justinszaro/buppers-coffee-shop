import { useState, useEffect } from 'react'
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

export function useDrinks() {
  const [drinks, setDrinks] = useState<Drink[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    client
      .service('drinks')
      .find({ query: { active: true, $limit: 100 } })
      .then((result: { total: number; data: Drink[]; skip: number; limit: number }) => {
        setDrinks(result.data)
        setTotal(result.total)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return { drinks, total, loading, error }
}
