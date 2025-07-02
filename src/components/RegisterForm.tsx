'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

// new user registration. Email, password error states
export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      alert('Check your email to confirm your account!');
      router.push('/login');
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="border w-full mb-3 p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border w-full mb-3 p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 w-full disabled:opacity-50" disabled={loading}>
        {loading ? 'Registering...' : 'Sign Up'}
      </button>
    </form>
  );
}
