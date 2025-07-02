
'use client'
import { useEffect, useState } from 'react'
import { mockTrials } from '../utils/mockData'
import { useUser } from '@/hooks/useUser'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

type Trial = {
  id: string,
  title: string,
  location: string,
  status: string,
}

export default function Dashboard() {
  const { user, loading } = useUser()
  const [trials, setTrials] = useState<Trial[]>([])
  const [error, setError] = useState('')
  const router = useRouter()


  useEffect(() => {
    if (!loading && user) {
        fetchTrials()
    }
  }, [loading, user])

  const fetchTrials = async () => {
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 500)) // simulate API call delay
      setTrials(mockTrials)
    } catch (e) {
      console.error('Error fetching trials:', e)
      setError('Failed to fetch trials.')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
        return <div className="p-6 text-gray-600">Loading...</div>
    }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
      {user && <p className="mb-4 text-gray-600">Logged in as {user.email}</p>}
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
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mb-6">
        Logout
    </button>
    </div>
  )
}

