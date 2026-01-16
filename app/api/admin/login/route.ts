import { NextResponse } from "next/server"
import crypto from "crypto"

export const runtime = "nodejs"

const attempts: Record<string, { count: number; first: number; last: number }> = {}
const MAX_ATTEMPTS = 5
const WINDOW_MS = 10 * 60 * 1000
const LOCK_MS = 10 * 60 * 1000

function json(res: unknown, status = 200) {
  return NextResponse.json(res, { status })
}

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a)
  const bb = Buffer.from(b)
  if (aa.length !== bb.length) return false
  return crypto.timingSafeEqual(aa, bb)
}

function getClientIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for")
  const ip = xf?.split(",")[0]?.trim()
  return ip && ip.length < 128 ? ip : "unknown"
}

function base64url(input: string) {
  return Buffer.from(input, "utf8").toString("base64url")
}

function sign(payloadB64: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url")
}

function makeAdminToken(secret: string, ttlMs: number) {
  const payload = { role: "admin", iat: Date.now(), exp: Date.now() + ttlMs }
  const payloadB64 = base64url(JSON.stringify(payload))
  const sig = sign(payloadB64, secret)
  return `${payloadB64}.${sig}`
}

function normalizeText(v: unknown) {
  if (typeof v !== "string") return ""
  return v.trim()
}

// removes surrounding quotes if someone saved env like "value"
function unquote(v: string) {
  const s = v.trim()
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1)
  }
  return s
}

function getLimiter(ip: string, now: number) {
  if (!attempts[ip]) attempts[ip] = { count: 0, first: now, last: now }
  const a = attempts[ip]
  if (now - a.first > WINDOW_MS) {
    a.count = 0
    a.first = now
  }
  a.last = now
  return a
}

export async function POST(req: Request) {
  const ip = getClientIp(req)
  const now = Date.now()
  const limiter = getLimiter(ip, now)

  if (limiter.count >= MAX_ATTEMPTS && now - limiter.last < LOCK_MS) {
    return json({ error: "Zu viele Login-Versuche. Bitte später erneut versuchen." }, 429)
  }

  const body = await req.json().catch(() => null)
  const username = String(body?.username ?? "")
    .replace(/\r?\n/g, "")
    .trim()
  const password = String(body?.password ?? "")
    .replace(/\r?\n/g, "")
    .trim()


  if (!username || !password) return json({ error: "Ungültige Eingabe" }, 400)

  // read env safely (trim + unquote)
  const ADMIN_USER = unquote(normalizeText(process.env.ADMIN_USER))
  const ADMIN_PASS = unquote(normalizeText(process.env.ADMIN_PASS))
  const SECRET = unquote(normalizeText(process.env.ADMIN_SESSION_SECRET))

  if (!ADMIN_USER || !ADMIN_PASS || !SECRET) {
    return json({ error: "Server ist nicht konfiguriert" }, 500)
  }

  // Debug without leaking secrets (remove later)
  console.log("ADMIN_LOGIN_CHECK", {
    userLen: ADMIN_USER.length,
    passLen: ADMIN_PASS.length,
    inputUserLen: username.length,
    inputPassLen: password.length,
    userHash: crypto.createHash("sha256").update(ADMIN_USER).digest("hex").slice(0, 8),
    passHash: crypto.createHash("sha256").update(ADMIN_PASS).digest("hex").slice(0, 8)
  })

  const userOk = safeEqual(username, ADMIN_USER)
  const passOk = safeEqual(password, ADMIN_PASS)

  if (userOk && passOk) {
    limiter.count = 0
    limiter.first = now
    limiter.last = now

    const token = makeAdminToken(SECRET, 7 * 24 * 60 * 60 * 1000)
    const res = json({ success: true }, 200)

    res.cookies.set("admin-session", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60
    })

    return res
  }

  limiter.count += 1
  return json({ error: "Falscher Benutzername oder Passwort" }, 401)
}