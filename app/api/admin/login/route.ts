// app/api/admin/login/route.ts
import { NextResponse } from "next/server"

const attempts: Record<string, { count: number; lastAttempt: number }> = {}
const MAX_ATTEMPTS = 5
const BLOCK_TIME = 10 * 60 * 1000 // 10 Minuten

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const now = Date.now()

  if (!attempts[ip]) attempts[ip] = { count: 0, lastAttempt: now }
  const attempt = attempts[ip]

  // Reset nach Block-Time
  if (now - attempt.lastAttempt > BLOCK_TIME) {
    attempt.count = 0
  }

  attempt.lastAttempt = now

  if (attempt.count >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: "Zu viele Login-Versuche. Bitte später erneut versuchen." },
      { status: 429 }
    )
  }

  const body = await req.json()
  const { username, password } = body

  const ADMIN_USER = "admin"
  const ADMIN_PASS = "securepass123"

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    attempt.count = 0
    const res = NextResponse.json({ success: true }, { status: 200 })
    // Cookie setzen, damit Analytics-API weiß, dass Admin eingeloggt ist
    res.cookies.set("admin-session", "securetoken123", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60, // 1 Stunde
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    return res
  } else {
    attempt.count++
    return NextResponse.json({ error: "Falscher Benutzername oder Passwort" }, { status: 401 })
  }
}
