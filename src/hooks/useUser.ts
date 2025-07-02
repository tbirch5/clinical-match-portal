'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export const useUser = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session?.user) {
        router.push('/login')
      } else {
        setUser(data.session.user)
      }

      setLoading(false)
    }

    getSession()
  }, [])

  return { user, loading }
}