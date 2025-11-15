'use client'
import { useState } from 'react'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    if (data.success) {
      window.location.href = '/admin/dashboard'
    } else {
      setError('Falscher Username oder Passwort')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F0EC]">
      <div className="bg-white/80 backdrop-blur-xl p-16 rounded-3xl shadow-2xl text-center border border-[#E4DDD5] w-full max-w-md">
        <h1 className="text-4xl font-serif text-[#3A2F25] mb-6">Admin Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg border border-[#D9CFC2]"
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg border border-[#D9CFC2]"
        />
        <button
          onClick={handleLogin}
          className="w-full py-3 mt-2 bg-black text-white font-medium rounded-full hover:bg-[#3A2F25] transition"
        >
          Login
        </button>
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  )
}
