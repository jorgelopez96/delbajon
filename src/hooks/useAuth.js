import { useState, useEffect } from 'react'
import { getSession, onAuthChange } from '../services/auth'

export function useAuth() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSession().then(s => {
      setSession(s)
      setLoading(false)
    })
    const { data: { subscription } } = onAuthChange(s => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  return { session, loading, isAdmin: !!session }
}
