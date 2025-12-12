import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "data", "analytics.json")

export interface Visitor {
  date: string
  page: string
  role: string
  country: string
  city: string
  ip: string
}

export interface AnalyticsFile {
  today: Record<string, number>
  month: Record<string, number>
  total: number
  visitors: Visitor[]
}

// Datei laden / speichern
function loadAnalytics(): AnalyticsFile {
  try {
    if (!fs.existsSync(filePath)) return { today: {}, month: {}, total: 0, visitors: [] }
    return JSON.parse(fs.readFileSync(filePath, "utf8"))
  } catch {
    return { today: {}, month: {}, total: 0, visitors: [] }
  }
}

function saveAnalytics(data: AnalyticsFile) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8")
}

// Admin-Check
function checkAdmin(req: Request) {
  const cookie = req.headers.get("cookie") || ""
  return cookie.includes("admin-session=securetoken123")
}

// GET → Dashboard Daten
export async function GET(req: Request) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
  }

  const json = loadAnalytics()
  const todayKey = new Date().toISOString().slice(0, 10)
  const monthKey = new Date().toISOString().slice(0, 7)

  const countries: Record<string, number> = {}
  json.visitors.forEach(v => {
    countries[v.country] = (countries[v.country] || 0) + 1
  })

  return NextResponse.json({
    stats: {
      today: json.today[todayKey] || 0,
      month: json.month[monthKey] || 0,
      total: json.total || 0,
    },
    today: json.today,
    month: json.month,
    countries,
    visitors: json.visitors,
  })
}

// POST → neuen Besuch speichern
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { page, role } = body
    if (!page) return NextResponse.json({ error: "Page required" }, { status: 400 })

    const json = loadAnalytics()
    const now = new Date()
    const todayKey = now.toISOString().slice(0, 10)
    const monthKey = now.toISOString().slice(0, 7)

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"

    let country = "unknown"
    let city = "Unbekannt"

    if (ip !== "unknown") {
      try {
        const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,city`)
        const geo = await res.json()
        if (geo.status === "success") {
          country = geo.country || "unknown"
          city = geo.city || "Unbekannt"
        }
      } catch (e) {
        console.error("GeoIP lookup failed:", e)
      }
    }

    const alreadyExists = json.visitors.some(
      v => v.ip === ip && v.page === page && v.date.startsWith(todayKey)
    )

    if (!alreadyExists) {
      json.today[todayKey] = (json.today[todayKey] || 0) + 1
      json.month[monthKey] = (json.month[monthKey] || 0) + 1
      json.total = (json.total || 0) + 1

      json.visitors.push({
        date: now.toISOString(),
        page,
        role,
        ip,
        country,
        city,
      })

      saveAnalytics(json)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
