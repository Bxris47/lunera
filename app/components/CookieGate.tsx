"use client"

import CookieConsent from "./CookieConsent"
import { sendVisit } from "@/lib/TrackingClient"

export default function CookieGate() {
  return <CookieConsent onAccept={() => sendVisit().catch(() => {})} />
}
