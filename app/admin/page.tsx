"use client"

import { useEffect, useState, useRef } from "react"
import Chart from "chart.js/auto"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

interface Visitor {
  date: string
  page: string
  role: string
  country: string
  city: string
  ip: string
}

interface AnalyticsData {
  stats: { today: number; month: number; total: number }
  today: Record<string, number>
  month: Record<string, number>
  countries: Record<string, number>
  visitors: Visitor[]
}

export default function AdminPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<Visitor[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [blocked, setBlocked] = useState(false)

  const dailyRef = useRef<HTMLCanvasElement | null>(null)
  const monthlyRef = useRef<HTMLCanvasElement | null>(null)

  // ----------------------
  // Analytics laden
  // ----------------------
  async function loadAnalytics() {
    try {
      const res = await fetch("/api/admin/analytics", { credentials: "include" })
      if (res.status === 401) {
        setLoggedIn(false)
        setData(null)
        return
      }
      const json: AnalyticsData = await res.json()
      json.visitors.forEach(v => { if (!v.city) v.city = "Unbekannt" })
      setData(json)

      // Charts initialisieren
      if (dailyRef.current) {
        new Chart(dailyRef.current, {
          type: "line",
          data: {
            labels: Object.keys(json.today),
            datasets: [{
              label: "Besucher pro Tag",
              data: Object.values(json.today),
              borderColor: "#D4AF37",
              backgroundColor: "rgba(212,175,55,0.2)",
            }],
          },
          options: { animation: { duration: 200 } },
        })
      }

      if (monthlyRef.current) {
        new Chart(monthlyRef.current, {
          type: "bar",
          data: {
            labels: Object.keys(json.month),
            datasets: [{
              label: "Besucher pro Monat",
              data: Object.values(json.month),
              backgroundColor: "#D4AF37",
            }],
          },
          options: { animation: { duration: 200 } },
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  // ----------------------
  // Prüfen, ob Admin schon eingeloggt ist (Cookie prüfen)
  // ----------------------
  useEffect(() => {
    async function checkLogin() {
      const res = await fetch("/api/admin/analytics", { credentials: "include" })
      if (res.status === 200) {
        setLoggedIn(true)
        await loadAnalytics()
      }
      setLoading(false)
    }
    checkLogin()
  }, [])

  // ----------------------
  // Live Besucher
  // ----------------------
  useEffect(() => {
    if (!data) return
    const interval = setInterval(() => {
      const now = new Date()
      const recent = data.visitors.filter(v => new Date(v.date).getTime() > now.getTime() - 2 * 60 * 1000)
      setOnlineUsers(recent)
    }, 5000)
    return () => clearInterval(interval)
  }, [data])

  // ----------------------
  // Login Handler
  // ----------------------
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (blocked) return

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include", // wichtig für Cookie
    })

    if (res.status === 429) {
      setBlocked(true)
      setError("Zu viele Versuche. Bitte 10 Minuten warten.")
      return
    }

    if (res.ok) {
      setLoggedIn(true)
      await loadAnalytics() // sofort Daten laden nach Login
    } else {
      const data = await res.json()
      setError(data.error)
    }
  }

  if (loading) return <div>Lade...</div>

  // ----------------------
  // Login-Seite
  // ----------------------
  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-600 to-indigo-600">
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
          className="bg-white p-10 rounded-3xl shadow-2xl w-96 relative"
        >
          <h2 className="mb-6 text-2xl font-bold text-center">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Benutzername"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  // ----------------------
  // Dashboard
  // ----------------------
  if (!data) return <div className="p-10 text-center">Lade Analytics...</div>

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* MOBILE HEADER */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow z-50 flex items-center px-4 justify-between">
        <h1 className="font-bold text-lg">Lunera Admin</h1>
        <button onClick={() => setSidebarOpen(true)}><Menu size={28} /></button>
      </header>

      {/* OVERLAY */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* SIDEBAR */}
      <aside className={`fixed lg:static z-50 top-0 left-0 h-full w-64 bg-[#111] text-white transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} transition-transform duration-300`}>
        <div className="h-20 flex items-center justify-center font-bold text-xl text-white bg-gradient-to-r from-red-600 to-white/40">
          Lunera Admin
          <button className="absolute right-4 lg:hidden" onClick={() => setSidebarOpen(false)}><X size={26} /></button>
        </div>
        <nav className="px-4 py-6 space-y-2">
          <a className="block px-4 py-2 rounded hover:bg-white/10">Dashboard</a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 lg:ml-0 mt-16 lg:mt-0">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[{ label: "Heute", value: data.stats.today }, { label: "Monat", value: data.stats.month }, { label: "Gesamt", value: data.stats.total }].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-6 bg-white rounded-xl shadow border border-[#e5e5e5]">
              <h3 className="font-semibold text-gray-700">{item.label}</h3>
              <p className="text-3xl font-bold text-[#D4AF37]">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow border border-[#e5e5e5]">
            <h3 className="font-semibold mb-4">Besucher pro Tag</h3>
            <canvas ref={dailyRef} height={200}></canvas>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-[#e5e5e5]">
            <h3 className="font-semibold mb-4">Besucher pro Monat</h3>
            <canvas ref={monthlyRef} height={200}></canvas>
          </div>
        </div>

        {/* Live Besucher */}
        <div className="bg-white p-6 rounded-xl shadow border border-[#e5e5e5] mb-10">
          <h3 className="font-semibold mb-4">Live Besucher (letzte 2 Minuten)</h3>
          <ul className="space-y-2">
            {onlineUsers.map((v, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span>{v.page} • {v.role} • {v.ip} • {v.country} • {v.city} • {new Date(v.date).toLocaleString("de-DE")}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Letzte Besucher */}
        <div className="bg-white p-6 rounded-xl shadow border border-[#e5e5e5]">
          <h3 className="font-semibold mb-4">Letzte Besucher</h3>
          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Datum</th>
                  <th className="p-2 border">Seite</th>
                  <th className="p-2 border">IP</th>
                  <th className="p-2 border">Land</th>
                  <th className="p-2 border">Stadt</th>
                </tr>
              </thead>
              <tbody>
                {data.visitors.slice(-20).reverse().map((v, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2 border">{new Date(v.date).toLocaleString("de-DE")}</td>
                    <td className="p-2 border">{v.page}</td>
                    <td className="p-2 border">{v.ip}</td>
                    <td className="p-2 border">{v.country}</td>
                    <td className="p-2 border">{v.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
