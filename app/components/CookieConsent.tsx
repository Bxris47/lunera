"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { getCookie, setCookie } from "cookies-next"
import { ShieldCheck, X } from "lucide-react"

type CookieConsentProps = {
  onAccept?: () => void
}

export default function CookieConsent({ onAccept }: CookieConsentProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const v = getCookie("cookiesAccepted")
    // nur anzeigen, wenn noch keine Entscheidung existiert
    if (v !== "true" && v !== "false") setVisible(true)
  }, [])

  const accept = () => {
    setCookie("cookiesAccepted", "true", {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 180
    })
    setVisible(false)
    onAccept?.()
  }

  const decline = () => {
    setCookie("cookiesAccepted", "false", {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 180
    })
    setVisible(false)
  }

  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] w-[92%] max-w-md"
        role="dialog"
        aria-modal="true"
        aria-label="Cookie Hinweis"
      >
        <div className="rounded-3xl border border-[#EEE] bg-white/90 backdrop-blur-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="mt-0.5 rounded-2xl border border-[#EEE] bg-[#FAFAFA] p-2">
                <ShieldCheck className="h-5 w-5 text-[#111]" />
              </div>

              <div className="min-w-0">
                <div className="text-[13px] sm:text-sm font-semibold text-[#111] leading-tight">
                  Cookies & Datenschutz
                </div>
                <div className="mt-1 text-[11px] sm:text-xs text-[#777] leading-relaxed">
                  Wir nutzen Cookies nur für grundlegende Funktionen und anonyme Statistiken.
                </div>
              </div>
            </div>

            <button
              onClick={() => setVisible(false)}
              className="shrink-0 rounded-2xl border border-[#EEE] bg-white p-2 hover:bg-[#FAFAFA] transition"
              aria-label="Schließen"
            >
              <X className="h-5 w-5 text-[#111]" />
            </button>
          </div>

          {/* Premium Message Panel */}
          <div className="px-4 sm:px-5 pb-4 sm:pb-5">
            <div className="rounded-2xl border border-[#EEE] bg-[#FAFAFA] p-3 sm:p-4">
              <div className="text-[11px] sm:text-xs text-[#666] leading-relaxed">
                Mit <span className="font-semibold text-[#111]">„Akzeptieren“</span> erlaubst du die Speicherung für
                bessere Bedienung (z. B. Cookie-Auswahl).{" "}
                <Link href="/datenschutz" className="text-[#111] underline underline-offset-4 hover:opacity-80">
                  Details
                </Link>
                .
              </div>
            </div>

            {/* Links */}
            <div className="mt-3 flex flex-wrap gap-4 text-[11px] sm:text-xs">
              <Link href="/datenschutz" className="text-[#111] underline underline-offset-4 hover:opacity-80">
                Datenschutz
              </Link>
              <Link href="/impressum" className="text-[#666] underline underline-offset-4 hover:text-[#111]">
                Impressum
              </Link>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={decline}
                className="w-full rounded-2xl border border-[#EEE] bg-white px-4 py-2.5 text-[12px] sm:text-sm font-semibold text-[#111] hover:bg-[#FAFAFA] transition"
              >
                Ablehnen
              </button>

              <button
                onClick={accept}
                className="w-full rounded-2xl border border-[#111] bg-[#111] px-4 py-2.5 text-[12px] sm:text-sm font-semibold text-white hover:opacity-90 transition"
              >
                Akzeptieren
              </button>
            </div>

            {/* tiny footer note */}
            <div className="mt-3 text-[10px] sm:text-[11px] text-[#888] leading-relaxed">
              Speicherdauer: 180 Tage • SameSite=Lax
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
