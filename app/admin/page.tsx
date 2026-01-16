"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Chart from "chart.js/auto"
import { motion } from "framer-motion"
import { Menu, X, Shield, Activity, BarChart3, Globe2, RefreshCw, LogOut, Search } from "lucide-react"

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

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function formatDE(ts: string) {
  const d = new Date(ts)
  if (Number.isNaN(d.getTime())) return ts
  return d.toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" })
}

function safeCity(city?: string) {
  return city && city.trim() ? city : "Unbekannt"
}

function StatCard({
  label,
  value,
  icon: Icon
}: {
  label: string
  value: number
  icon: any
}) {
  return (
    <div className="rounded-3xl border border-[#EEE] bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-[#555]">{label}</div>
          <div className="mt-2 text-3xl sm:text-4xl font-semibold text-[#111] tracking-tight tabular-nums">
            {value}
          </div>
        </div>
        <div className="h-10 w-10 rounded-2xl border border-[#EEE] bg-[#FAFAFA] flex items-center justify-center">
          <Icon className="h-5 w-5 text-[#111]" />
        </div>
      </div>
    </div>
  )
}

function MobileMenu({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <div className={cn("lg:hidden fixed inset-0 z-50 transition", open ? "pointer-events-auto" : "pointer-events-none")}>
      <div
        className={cn("absolute inset-0 bg-black/30 transition-opacity", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-[86%] max-w-sm bg-white border-r border-[#EEE] shadow-xl transition-transform",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-5 border-b border-[#F0F0F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-[#111] text-white flex items-center justify-center">
              <Shield className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Lunera Admin</div>
              <div className="text-xs text-[#666]">Analytics</div>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl border border-[#EEE] bg-white" aria-label="Menü schließen">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-5 flex flex-col gap-3 text-sm font-medium">
          <span className="rounded-2xl border border-[#111] bg-[#111] text-white p-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </span>
          <a className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA] flex items-center gap-2">
            <Globe2 className="h-4 w-4" />
            Länder
          </a>
          <a className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA] flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Live
          </a>

          <div className="mt-2 h-px w-full bg-[#F2F2F2]" />

          <button className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA] flex items-center gap-2 text-left">
            <LogOut className="h-4 w-4" />
            Logout (optional)
          </button>
        </nav>
      </div>
    </div>
  )
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

  // UI helpers
  const [query, setQuery] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  // Chart refs + instances (so we can destroy and re-render cleanly)
  const dailyRef = useRef<HTMLCanvasElement | null>(null)
  const monthlyRef = useRef<HTMLCanvasElement | null>(null)
  const dailyChart = useRef<Chart | null>(null)
  const monthlyChart = useRef<Chart | null>(null)

  // ✅ IMPORTANT: keep hooks order stable (compute even when data is null)
  const lastVisitors = useMemo(() => {
    const q = query.trim().toLowerCase()
    const visitors = data?.visitors ?? []
    const base = [...visitors].slice(-60).reverse()

    if (!q) return base.slice(0, 20)

    return base
      .filter((v) => {
        const hay = `${v.page} ${v.role} ${v.ip} ${v.country} ${safeCity(v.city)} ${v.date}`.toLowerCase()
        return hay.includes(q)
      })
      .slice(0, 20)
  }, [data?.visitors, query])

  async function loadAnalytics() {
    try {
      setRefreshing(true)

      const res = await fetch("/api/admin/analytics", { credentials: "include" })
      if (res.status === 401) {
        setLoggedIn(false)
        setData(null)
        return
      }
      const json: AnalyticsData = await res.json()

      // normalize a bit
      const normalized: AnalyticsData = {
        ...json,
        visitors: json.visitors.map((v) => ({ ...v, city: safeCity(v.city) }))
      }

      setData(normalized)

      // Destroy existing charts first (prevents stacking / memory leaks)
      if (dailyChart.current) {
        dailyChart.current.destroy()
        dailyChart.current = null
      }
      if (monthlyChart.current) {
        monthlyChart.current.destroy()
        monthlyChart.current = null
      }

      // Charts
      if (dailyRef.current) {
        dailyChart.current = new Chart(dailyRef.current, {
          type: "line",
          data: {
            labels: Object.keys(normalized.today),
            datasets: [
              {
                label: "Besucher",
                data: Object.values(normalized.today),
                borderColor: "#111",
                backgroundColor: "rgba(17,17,17,0.08)",
                tension: 0.35,
                pointRadius: 2
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { intersect: false, mode: "index" }
            },
            scales: {
              x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true } },
              y: { grid: { color: "rgba(0,0,0,0.06)" }, ticks: { precision: 0 } }
            },
            animation: { duration: 250 }
          }
        })
      }

      if (monthlyRef.current) {
        monthlyChart.current = new Chart(monthlyRef.current, {
          type: "bar",
          data: {
            labels: Object.keys(normalized.month),
            datasets: [
              {
                label: "Besucher",
                data: Object.values(normalized.month),
                backgroundColor: "rgba(17,17,17,0.12)",
                borderColor: "#111",
                borderWidth: 1,
                borderRadius: 10
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { intersect: false, mode: "index" }
            },
            scales: {
              x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true } },
              y: { grid: { color: "rgba(0,0,0,0.06)" }, ticks: { precision: 0 } }
            },
            animation: { duration: 250 }
          }
        })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setRefreshing(false)
    }
  }

  // Check session on mount
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Live visitors = last 2 minutes
  useEffect(() => {
    if (!data) return
    const interval = setInterval(() => {
      const now = Date.now()
      const recent = data.visitors.filter((v) => new Date(v.date).getTime() > now - 2 * 60 * 1000)
      setOnlineUsers(recent)
    }, 5000)
    return () => clearInterval(interval)
  }, [data])

  // Cleanup charts on unmount
  useEffect(() => {
    return () => {
      if (dailyChart.current) dailyChart.current.destroy()
      if (monthlyChart.current) monthlyChart.current.destroy()
    }
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (blocked) return

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include"
    })

    if (res.status === 429) {
      setBlocked(true)
      setError("Zu viele Versuche. Bitte 10 Minuten warten.")
      return
    }

    if (res.ok) {
      setLoggedIn(true)
      await loadAnalytics()
    } else {
      const j = await res.json().catch(() => ({ error: "Login fehlgeschlagen" }))
      setError(j.error ?? "Login fehlgeschlagen")
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-white text-[#111] flex items-center justify-center">Lade…</div>
  }

  // LOGIN
  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-[#F6F6F6] text-[#111] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="w-full max-w-sm rounded-3xl border border-[#EEE] bg-white p-6 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-[#111] text-white flex items-center justify-center">
              <Shield className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Lunera Admin</div>
              <div className="text-xs text-[#666]">Bitte anmelden</div>
            </div>
          </div>

          <h1 className="mt-6 text-2xl font-serif font-bold tracking-tight">Login</h1>
          <p className="mt-2 text-sm text-[#666]">Zugriff auf Analytics & Besucherübersicht.</p>

          <form onSubmit={handleLogin} className="mt-6 space-y-3">
            <input
              type="text"
              placeholder="Benutzername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-2xl border border-[#EEE] bg-white px-4 py-3 text-sm outline-none focus:border-[#111]"
              autoComplete="username"
            />
            <input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-[#EEE] bg-white px-4 py-3 text-sm outline-none focus:border-[#111]"
              autoComplete="current-password"
            />

            {error && <div className="text-sm text-red-600">{error}</div>}

            <button
              type="submit"
              disabled={blocked}
              className={cn(
                "w-full rounded-2xl px-4 py-3 text-sm font-semibold transition",
                blocked ? "bg-[#111]/40 text-white cursor-not-allowed" : "bg-[#111] text-white hover:opacity-90"
              )}
            >
              Einloggen
            </button>

            {blocked && <div className="text-xs text-[#666]">Bitte später erneut versuchen.</div>}
          </form>
        </motion.div>
      </div>
    )
  }

  if (!data) {
    return <div className="min-h-screen bg-white text-[#111] flex items-center justify-center">Lade Analytics…</div>
  }

  return (
    <div className="min-h-screen bg-white text-[#111]">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-2xl bg-[#111] text-white flex items-center justify-center">
              <Shield className="h-5 w-5" />
            </div>
            <div className="leading-tight min-w-0">
              <div className="text-sm font-semibold tracking-wide truncate">Lunera Admin</div>
              <div className="text-xs text-[#666] truncate">Analytics Dashboard</div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={loadAnalytics}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#EEE] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#FAFAFA] transition"
            >
              <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
              Aktualisieren
            </button>

            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden inline-flex items-center justify-center rounded-2xl border border-[#EEE] bg-white p-2.5"
              aria-label="Menü öffnen"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <StatCard label="Heute" value={data.stats.today} icon={Activity} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <StatCard label="Monat" value={data.stats.month} icon={BarChart3} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <StatCard label="Gesamt" value={data.stats.total} icon={Globe2} />
          </motion.div>
        </div>

        {/* Charts */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="rounded-3xl border border-[#EEE] bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-[#111]">Besucher pro Tag</div>
                <div className="text-xs text-[#666]">Letzte Tage (laut Tracking)</div>
              </div>
            </div>
            <div className="mt-4 h-[240px]">
              <canvas ref={dailyRef} />
            </div>
          </div>

          <div className="rounded-3xl border border-[#EEE] bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-[#111]">Besucher pro Monat</div>
                <div className="text-xs text-[#666]">Monatsübersicht</div>
              </div>
            </div>
            <div className="mt-4 h-[240px]">
              <canvas ref={monthlyRef} />
            </div>
          </div>
        </div>

        {/* Live visitors */}
        <div className="mt-6 rounded-3xl border border-[#EEE] bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-[#111]">Live Besucher</div>
              <div className="text-xs text-[#666]">Aktivität der letzten 2 Minuten</div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EEE] bg-[#FAFAFA] px-3 py-1.5 text-xs font-semibold text-[#111] w-fit">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
              {onlineUsers.length} online
            </div>
          </div>

          {onlineUsers.length === 0 ? (
            <div className="mt-5 text-sm text-[#666]">Gerade keine aktiven Besucher.</div>
          ) : (
            <ul className="mt-5 space-y-2">
              {onlineUsers.slice(0, 12).map((v, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-[#EEE] bg-[#FAFAFA] px-4 py-3 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-[#111] truncate">{v.page}</div>
                    <div className="text-xs text-[#666] truncate">
                      {v.role} • {v.country} • {safeCity(v.city)}
                    </div>
                  </div>
                  <div className="text-xs text-[#666] tabular-nums">{formatDE(v.date)}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Last visitors */}
        <div className="mt-6 rounded-3xl border border-[#EEE] bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-[#111]">Letzte Besucher</div>
              <div className="text-xs text-[#666]">Die 20 neuesten Einträge (mit Suche)</div>
            </div>

            <div className="w-full sm:w-[320px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#777]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Suchen: Seite, IP, Land…"
                className="w-full rounded-2xl border border-[#EEE] bg-white pl-10 pr-3 py-2.5 text-sm outline-none focus:border-[#111]"
              />
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-[720px] w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-[#666]">
                  <th className="py-3 px-3 font-semibold">Datum</th>
                  <th className="py-3 px-3 font-semibold">Seite</th>
                  <th className="py-3 px-3 font-semibold">Rolle</th>
                  <th className="py-3 px-3 font-semibold">IP</th>
                  <th className="py-3 px-3 font-semibold">Land</th>
                  <th className="py-3 px-3 font-semibold">Stadt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F2F2]">
                {lastVisitors.map((v, i) => (
                  <tr key={i} className="hover:bg-[#FAFAFA]">
                    <td className="py-3 px-3 text-[#666] tabular-nums whitespace-nowrap">{formatDE(v.date)}</td>
                    <td className="py-3 px-3 font-semibold text-[#111] whitespace-nowrap">{v.page}</td>
                    <td className="py-3 px-3 text-[#666] whitespace-nowrap">{v.role}</td>
                    <td className="py-3 px-3 text-[#666] tabular-nums whitespace-nowrap">{v.ip}</td>
                    <td className="py-3 px-3 text-[#666] whitespace-nowrap">{v.country}</td>
                    <td className="py-3 px-3 text-[#666] whitespace-nowrap">{safeCity(v.city)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-xs text-[#777]">
            Hinweis: Suchfeld filtert nur die letzten ~60 Einträge (für Geschwindigkeit).
          </div>
        </div>
      </main>
    </div>
  )
}
