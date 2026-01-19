import { NextResponse, type NextRequest } from "next/server"
import fs from "fs"
import path from "path"
import crypto from "crypto"

export const runtime = "nodejs"

const filePath = path.join(process.cwd(), "data", "analytics.json")

export interface Visitor {
  date: string
  page: string
  role: string
  country: string
  city: string
  ip: string
  ipHash: string
  userAgent: string
  referer: string
}

export interface AnalyticsFile {
  today: Record<string, number>
  month: Record<string, number>
  total: number
  visitors: Visitor[]
}

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

function getIp(req: NextRequest) {
  // Next can provide ip (depends on host)
  const direct = (req as any).ip
  if (typeof direct === "string" && direct && direct.length < 128) return direct.trim()

  // Cloudflare
  const cf = req.headers.get("cf-connecting-ip")
  if (cf && cf.length < 128) return cf.trim()

  // Vercel
  const vercel = req.headers.get("x-vercel-forwarded-for")
  if (vercel) {
    const ip = vercel.split(",")[0].trim()
    if (ip && ip.length < 128) return ip
  }

  // Standard proxy header
  const xff = req.headers.get("x-forwarded-for")
  if (xff) {
    const ip = xff.split(",")[0].trim()
    if (ip && ip.length < 128) return ip
  }

  // Nginx / other proxies
  const xri = req.headers.get("x-real-ip")
  if (xri && xri.length < 128) return xri.trim()

  // RFC 7239 Forwarded
  const fwd = req.headers.get("forwarded")
  if (fwd) {
    const m = fwd.match(/for=(?:"?\[?)([a-fA-F0-9:.]+)(?:\]?"?)/)
    const ip = m?.[1]
    if (ip && ip.length < 128) return ip
  }

  return null
}

function hashIp(ip: string) {
  const salt = String(process.env.IP_HASH_SALT || "fallback").trim()
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex")
}

function parseCookie(cookieHeader: string, key: string) {
  const parts = cookieHeader.split(";").map((p) => p.trim())
  for (const p of parts) {
    if (!p) continue
    const idx = p.indexOf("=")
    if (idx === -1) continue
    const k = p.slice(0, idx)
    const v = p.slice(idx + 1)
    if (k === key) return decodeURIComponent(v)
  }
  return null
}

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a)
  const bb = Buffer.from(b)
  if (aa.length !== bb.length) return false
  return crypto.timingSafeEqual(aa, bb)
}

function sign(payloadB64: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url")
}

function verifyAdminToken(token: string, secret: string) {
  const [payloadB64, sig] = token.split(".")
  if (!payloadB64 || !sig) return false

  const expected = sign(payloadB64, secret)
  if (!safeEqual(sig, expected)) return false

  let payload: any = null
  try {
    payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"))
  } catch {
    return false
  }

  if (payload?.role !== "admin") return false
  if (typeof payload?.exp !== "number") return false
  if (Date.now() > payload.exp) return false

  return true
}

function isAdmin(req: NextRequest) {
  const secret = String(process.env.ADMIN_SESSION_SECRET || "").trim()
  if (!secret) return false

  const cookie = req.headers.get("cookie") || ""
  const token = parseCookie(cookie, "admin-session")
  if (!token) return false

  return verifyAdminToken(token, secret)
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })

  const json = loadAnalytics()
  const todayKey = new Date().toISOString().slice(0, 10)
  const monthKey = new Date().toISOString().slice(0, 7)

  const countries: Record<string, number> = {}
  for (const v of json.visitors || []) {
    const c = (v.country || "unknown").trim() || "unknown"
    countries[c] = (countries[c] || 0) + 1
  }

  return NextResponse.json({
    stats: {
      today: json.today?.[todayKey] || 0,
      month: json.month?.[monthKey] || 0,
      total: json.total || 0
    },
    today: json.today || {},
    month: json.month || {},
    countries,
    visitors: json.visitors || []
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    const page = String(body?.page ?? "").trim()
    const role = String(body?.role ?? "guest").trim()

    if (!page) return NextResponse.json({ error: "Page required" }, { status: 400 })

    const json = loadAnalytics()
    const now = new Date()
    const todayKey = now.toISOString().slice(0, 10)
    const monthKey = now.toISOString().slice(0, 7)

    const ip = getIp(req) ?? "unknown"
    const ipHash = ip !== "unknown" ? hashIp(ip) : "unknown"

    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      "unknown"

    const city =
      req.headers.get("x-vercel-ip-city") ||
      "Unbekannt"

    const userAgent = req.headers.get("user-agent") || ""
    const referer = req.headers.get("referer") || ""

    const alreadyExists = (json.visitors || []).some(
      (v) => v.ipHash === ipHash && v.page === page && v.date.startsWith(todayKey)
    )

    if (!alreadyExists) {
      json.today = json.today || {}
      json.month = json.month || {}
      json.visitors = json.visitors || []

      json.today[todayKey] = (json.today[todayKey] || 0) + 1
      json.month[monthKey] = (json.month[monthKey] || 0) + 1
      json.total = (json.total || 0) + 1

      json.visitors.push({
        date: now.toISOString(),
        page,
        role,
        country: String(country),
        city: String(city),
        ip,
        ipHash,
        userAgent,
        referer
      })

      saveAnalytics(json)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
