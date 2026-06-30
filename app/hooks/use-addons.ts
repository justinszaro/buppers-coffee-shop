import { useState, useEffect } from 'react'
import { client } from '~/lib/feathers-client'

export interface Addon {
  addonId: number
  name: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export function useAddons() {
  const [addons, setAddons] = useState<Addon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    client
      .service('addons')
      .find({ query: { $limit: 100 } })
      .then((result: { total: number; data: Addon[]; skip: number; limit: number }) => {
        setAddons(result.data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return { addons, loading, error }
}
