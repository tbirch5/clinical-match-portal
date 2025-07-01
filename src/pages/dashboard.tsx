
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { mockTrials } from '../utils/mockData'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [trials, setTrials] = useState<any[]>([])
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        router.push('/login')
      } else {
        setUser(data.user)
        fetchTrials()
      }
    }

    fetchUser()
  }, [])

  const fetchTrials = async () => {
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 500)) // delay
      setTrials(mockTrials)
    } catch (e: any) {
      setError('Failed to fetch trials.')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {trials.map((trial) => (
          <li key={trial.id} className="border p-4 rounded bg-white shadow">
            <h2 className="text-xl font-semibold">{trial.title}</h2>
            <p>Location: {trial.location}</p>
            <p>Status: {trial.status}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
