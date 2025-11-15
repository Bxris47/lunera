'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import KpiCard from './components/KpiCard'
import TableCard from './components/TableCard'

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Dummy Daten
  const [stats] = useState({
    todayAppointments: 8,
    pending: 3,
    accepted: 5,
    newsletter: 132,
    monthAppointments: 61
  })

  const appointmentsToday = [
    { name: "Sara", service: "Wimpernverlängerung", time: "09:00", status: "accepted" },
    { name: "Mia", service: "Nageldesign", time: "10:30", status: "pending" },
    { name: "Lina", service: "Brows", time: "12:00", status: "accepted" },
  ]

  const customers = [
    { name: "Lara", visits: 12, fav: "Wimpern" },
    { name: "Tina", visits: 3, fav: "Nails" },
    { name: "Eva", visits: 7, fav: "Brows" },
  ]

  const newsletter = [
    { email: "anna@example.com" },
    { email: "sara@example.com" },
    { email: "mia@example.com" },
  ]

  const handleLogin = async () => {
    // Hier echte API einbinden, z.B. /api/auth/login
    if (username === 'admin' && password === 'passwort') { // Demo
      setLoggedIn(true)
    } else {
      setError('Falscher Username oder Passwort')
    }
  }

  if (!loggedIn) {
    // Login-Form direkt auf Dashboard-Seite
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

  // Wenn eingeloggt, Dashboard anzeigen
  return (
    <div className="min-h-screen bg-[#F5F0EC] text-[#3A2F25] p-10">
      <h1 className="text-4xl font-serif font-bold mb-12 text-center">Admin Dashboard</h1>

      {/* KPI */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <KpiCard label="Termine Heute" value={stats.todayAppointments} />
        <KpiCard label="Offene Anfragen" value={stats.pending} />
        <KpiCard label="Newsletter Gesamt" value={stats.newsletter} />
      </div>

      {/* Tables */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <TableCard title="Termine Heute" data={appointmentsToday} type="appointments" />
        <TableCard title="Stammkunden Übersicht" data={customers} type="customers" />
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <TableCard title="Newsletter Liste" data={newsletter} type="newsletter" />
      </div>

      <footer className="text-center text-sm text-[#6C5F53] mt-10">
        © {new Date().getFullYear()} Lunera Beauty Admin – Internal Use Only
      </footer>
    </div>
  )
}
