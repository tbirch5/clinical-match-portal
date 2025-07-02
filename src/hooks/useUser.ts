'use client'
import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)
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
  }, [router])

  return { user, loading }
}