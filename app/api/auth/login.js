import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

const ADMIN_USER = 'admin'
const ADMIN_PASS_HASH = '$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' // gehashtes Passwort

export async function POST(req) {
  const { username, password } = await req.json()

  if (username === ADMIN_USER && await bcrypt.compare(password, ADMIN_PASS_HASH)) {
    const token = 'secure-jwt-token-hier'
    const res = NextResponse.json({ success: true })
    res.cookies.set('admin_token', token, { httpOnly: true, secure: true, path: '/' })
    return res
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
