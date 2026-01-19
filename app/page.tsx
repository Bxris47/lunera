"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import { motion } from "framer-motion"
import { MapPin, ShieldCheck, Sparkles, Star, Menu, X } from "lucide-react"

import TypingText from "../components/ui/shadcn-io/typing-text"
import { cn } from "@/lib/utils"

type Weekday =
  | "Montag"
  | "Dienstag"
  | "Mittwoch"
  | "Donnerstag"
  | "Freitag"
  | "Samstag"
  | "Sonntag"

type Hours = {
  day: Weekday
  open: string | null
  close: string | null
}

const SALON = {
  name: "Lunera Beauty",
  street: "Widukindstraße 27",
  zipCity: "49477 Ibbenbüren",
  country: "DE",
  timezone: "Europe/Berlin",
  mapsEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2505.123456789!2d7.699123!3d52.290456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b9845d3c1a2bcd%3A0xabcdef123456789!2sWidukindstraße+27%2C+49477+Ibbenb%C3%BCren!5e0!3m2!1sde!2sde!4v1690000000000!5m2!1sde!2sde"
} as const

const HOURS: Hours[] = [
  { day: "Montag", open: "10:00", close: "18:00" },
  { day: "Dienstag", open: "10:00", close: "18:00" },
  { day: "Mittwoch", open: "10:00", close: "18:00" },
  { day: "Donnerstag", open: "10:00", close: "18:00" },
  { day: "Freitag", open: "10:00", close: "18:00" },
  { day: "Samstag", open: "10:00", close: "16:00" },
  { day: "Sonntag", open: null, close: null }
]

const SERVICES = [
  { title: "Wimpern", text: "Von 1:1 bis Mega-Volume – präzise, leicht, harmonisch.", icon: Sparkles },
  { title: "Hände", text: "Maniküre, UV-Lack, Nail-Design – clean & langlebig.", icon: ShieldCheck },
  { title: "Füße", text: "Gepflegt mit Wellness-Finish – dezent und sauber.", icon: ShieldCheck },
  { title: "Augenpaket", text: "Brauen & Wimpern färben + formen – definiert in Minuten.", icon: Sparkles }
] as const

function timeToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

function getBerlinNowParts() {
  const fmt = new Intl.DateTimeFormat("de-DE", {
    timeZone: SALON.timezone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })

  const parts = fmt.formatToParts(new Date())
  const weekday = (parts.find((p) => p.type === "weekday")?.value ?? "").toLowerCase()
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0")
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0")

  const map: Record<string, Weekday> = {
    montag: "Montag",
    dienstag: "Dienstag",
    mittwoch: "Mittwoch",
    donnerstag: "Donnerstag",
    freitag: "Freitag",
    samstag: "Samstag",
    sonntag: "Sonntag"
  }

  return { day: map[weekday] ?? "Montag", minutesNow: hour * 60 + minute }
}

function computeOpenState() {
  const { day, minutesNow } = getBerlinNowParts()
  const today = HOURS.find((h) => h.day === day)!

  const openM = today.open ? timeToMinutes(today.open) : null
  const closeM = today.close ? timeToMinutes(today.close) : null

  if (openM === null || closeM === null) {
    const idx = HOURS.findIndex((h) => h.day === day)
    for (let i = 1; i <= 7; i++) {
      const next = HOURS[(idx + i) % 7]
      if (next.open && next.close) {
        return {
          label: "Geschlossen",
          hint: `Nächste Öffnung: ${next.day} um ${next.open}`,
          dotClass: "bg-red-500"
        }
      }
    }
    return { label: "Geschlossen", hint: "", dotClass: "bg-red-500" }
  }

  const isOpen = minutesNow >= openM && minutesNow < closeM
  if (isOpen) return { label: "Geöffnet", hint: `Heute bis ${today.close}`, dotClass: "bg-emerald-500" }

  if (minutesNow < openM) return { label: "Geschlossen", hint: `Heute ab ${today.open}`, dotClass: "bg-red-500" }

  const idx = HOURS.findIndex((h) => h.day === day)
  for (let i = 1; i <= 7; i++) {
    const next = HOURS[(idx + i) % 7]
    if (next.open && next.close) {
      return { label: "Geschlossen", hint: `Nächste Öffnung: ${next.day} um ${next.open}`, dotClass: "bg-red-500" }
    }
  }

  return { label: "Geschlossen", hint: "", dotClass: "bg-red-500" }
}

function MiniStat({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#EEE] bg-white p-4 shadow-sm">
      <div className="mt-0.5 rounded-xl border border-[#EEE] bg-[#FAFAFA] p-2">
        <Icon className="h-5 w-5 text-[#111]" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-[#111]">{title}</div>
        <div className="text-sm text-[#666] leading-relaxed">{text}</div>
      </div>
    </div>
  )
}

function SalonInfo() {
  const [state, setState] = useState(() => computeOpenState())

  useEffect(() => {
    const id = setInterval(() => setState(computeOpenState()), 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        <div className="rounded-3xl border border-[#EEE] bg-white p-5 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111]">Öffnungszeiten</h2>
              <p className="mt-2 text-sm sm:text-base text-[#666]">
                {SALON.street}, {SALON.zipCity}
              </p>
            </div>

            <div className="sm:text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#EEE] bg-[#FAFAFA] px-3 py-1.5">
                <span className={`h-2.5 w-2.5 rounded-full ${state.dotClass}`} aria-hidden />
                <span className="text-sm font-semibold text-[#111]">{state.label}</span>
              </div>
              <div className="mt-1 text-xs sm:text-sm text-[#666]">{state.hint}</div>
            </div>
          </div>

          <ul className="mt-6 divide-y divide-[#F2F2F2] text-sm sm:text-base">
            {HOURS.map((h) => {
              const label = h.open && h.close ? `${h.open} – ${h.close}` : "Geschlossen"
              return (
                <li key={h.day} className="py-3 flex items-center justify-between gap-4">
                  <span className="font-medium text-[#111]">{h.day}</span>
                  <span className="text-[#666]">{label}</span>
                </li>
              )
            })}
          </ul>

          <div className="mt-6">
            <Link
              href="/termin"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-[#111] bg-white px-5 py-3 text-sm font-semibold text-[#111] hover:bg-[#111] hover:text-white transition"
            >
              Termin anfragen
            </Link>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden border border-[#EEE] bg-[#F7F7F7] shadow-sm min-h-[280px] sm:min-h-[320px]">
          <iframe
            title="Google Maps Standort"
            src={SALON.mapsEmbedSrc}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={cn("sm:hidden fixed inset-0 z-50 transition", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
    >
      <div
        className={cn("absolute inset-0 bg-black/30 transition-opacity", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white border-l border-[#EEE] shadow-xl transition-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-5 border-b border-[#F0F0F0] flex items-center justify-between">
          <div className="text-sm font-semibold">{SALON.name}</div>
          <button onClick={onClose} className="p-2 rounded-xl border border-[#EEE] bg-white" aria-label="Menü schließen">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-5 flex flex-col gap-3 text-sm font-medium">
          <Link href="/" className="rounded-2xl border border-[#111] p-4 bg-[#111] text-white" onClick={onClose}>
            Home
          </Link>
          <Link href="/leistung" className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA]" onClick={onClose}>
            Leistung
          </Link>
          <Link href="/preisliste" className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA]" onClick={onClose}>
            Preisliste
          </Link>
          <Link href="/termin" className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA]" onClick={onClose}>
            Termin
          </Link>

          <div className="mt-2 h-px w-full bg-[#F2F2F2]" />

          <Link href="/impressum" className="rounded-2xl border border-[#EEE] p-4 bg-[#FAFAFA]" onClick={onClose}>
            Impressum
          </Link>
          <Link href="/datenschutz" className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA]" onClick={onClose}>
            Datenschutz
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      name: SALON.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: SALON.street,
        addressLocality: "Ibbenbüren",
        postalCode: "49477",
        addressCountry: SALON.country
      }
    }),
    []
  )

  return (
    <div className="min-h-screen w-full bg-white text-[#111] overflow-x-hidden">
      <Script
        id="json-ld-salon"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <Image src="/lunera-logo.png" width={40} height={40} alt="Lunera Beauty" className="opacity-95" priority />
            <div className="leading-tight min-w-0">
              <div className="text-sm font-semibold tracking-wide truncate">{SALON.name}</div>
              <div className="text-xs text-[#666] truncate">{SALON.zipCity}</div>
            </div>
          </Link>

          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-[#1A1A1A]">
            <Link href="/" className="text-[#D4AF37] font-semibold">Home</Link>
            <Link href="/leistung" className="hover:text-[#D4AF37] transition">Leistung</Link>
            <Link href="/preisliste" className="hover:text-[#D4AF37] transition">Preisliste</Link>
            <Link href="/termin" className="hover:text-[#D4AF37] transition">Termin</Link>
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="sm:hidden inline-flex items-center justify-center rounded-2xl border border-[#EEE] bg-white p-2.5"
            aria-label="Menü öffnen"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link
            href="/termin"
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-[#EEE] bg-white px-4 py-2 text-sm font-semibold text-[#111] hover:bg-[#FAFAFA] transition"
          >
            Termin
          </Link>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="relative w-full px-4 sm:px-6 pt-10 sm:pt-16 pb-10 sm:pb-16 bg-gradient-to-b from-white to-[#F5F5F5] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-10 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EEE] bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm text-[#333] shadow-sm">
              <Star className="h-4 w-4" />
              <span className="font-semibold">Premium Beauty Studio</span>
              <span className="h-1 w-1 rounded-full bg-[#D4AF37]" aria-hidden />
              <span className="text-[#666]">Wimpern • Hände • Füße</span>
            </div>

            <div className="mt-5 sm:mt-6">
              <TypingText
                text={["Schönheit. Präzision. Eleganz."]}
                typingSpeed={80}
                pauseDuration={700}
                showCursor={true}
                cursorCharacter="|"
                className="text-[34px] leading-[1.08] sm:text-5xl md:text-6xl font-serif font-bold text-[#111] tracking-tight"
                textColors={["#111", "#111", "#111"]}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mt-4 sm:mt-5 max-w-xl mx-auto lg:mx-0 text-[15px] sm:text-lg font-light text-[#555] leading-relaxed"
            >
              Willkommen bei <span className="font-semibold">{SALON.name}</span> – ruhige, saubere Beauty-Arbeit mit
              sichtbarer Präzision. Modern, elegant, ohne Overkill.
            </motion.p>

            <div className="mt-6 flex justify-center lg:justify-start">
              <Link
                href="/leistung"
                className="inline-flex items-center gap-2 rounded-full border border-[#EEE] bg-white px-5 sm:px-6 py-3 text-sm font-semibold text-[#111] hover:bg-[#FAFAFA] transition"
              >
                Arbeiten ansehen <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <MiniStat icon={ShieldCheck} title="Hygiene" text="Sauber, sorgfältig, professionell." />
              <MiniStat icon={Sparkles} title="Ästhetik" text="Clean Look mit feinen Details." />
              <MiniStat icon={MapPin} title="Lage" text={`${SALON.street}, ${SALON.zipCity}`} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="relative"
          >
            <div className="rounded-[28px] border border-[#EEE] bg-white shadow-sm overflow-hidden">
              <div className="relative aspect-[4/3] bg-[#F7F7F7]">
                <video
                  src="/Studio.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <div className="text-sm font-semibold text-[#111]">Ruhig. Präzise. Elegant.</div>
                <div className="mt-1 text-sm text-[#666]">Ein Studio, das Details ernst nimmt.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#111]">Services</h2>
            <p className="mt-3 text-sm sm:text-base text-[#666] max-w-2xl mx-auto leading-relaxed">
              Klar, modern, hochwertig – Behandlungen mit Fokus auf Haltbarkeit und ein sauberes Finish.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SERVICES.map((s) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.title}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-[#EAEAEA] bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="rounded-2xl border border-[#EEE] bg-[#FAFAFA] p-3 w-fit">
                    <Icon className="h-5 w-5 text-[#111]" />
                  </div>
                  <h3 className="mt-4 text-lg sm:text-xl font-serif font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-[#666] leading-relaxed">{s.text}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-8 sm:mt-10 flex justify-center">
            <Link
              href="/preisliste"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-[#EEE] bg-white px-6 py-3 text-sm font-semibold text-[#111] hover:bg-[#FAFAFA] transition"
            >
              Preisliste ansehen
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 py-12 sm:py-16 bg-[#FAFAFA] border-y border-[#EEE]">
        <div className="max-w-6xl mx-auto rounded-3xl border border-[#EEE] bg-white p-5 sm:p-8 shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#111]">Wofür Lunera steht</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm sm:text-base text-[#666]">
            <div className="rounded-2xl border border-[#EEE] bg-[#FAFAFA] p-5">
              <div className="text-sm font-semibold text-[#111]">Präzision</div>
              <div className="mt-1">Symmetrie, saubere Linien, natürliche Balance.</div>
            </div>
            <div className="rounded-2xl border border-[#EEE] bg-[#FAFAFA] p-5">
              <div className="text-sm font-semibold text-[#111]">Hygiene</div>
              <div className="mt-1">Sorgfalt in jedem Schritt – ohne Kompromisse.</div>
            </div>
            <div className="rounded-2xl border border-[#EEE] bg-[#FAFAFA] p-5">
              <div className="text-sm font-semibold text-[#111]">Ästhetik</div>
              <div className="mt-1">Modern, clean, elegant – genau “dein” Look.</div>
            </div>
          </div>
        </div>
      </section>

      <SalonInfo />

      <footer className="bg-[#FAFAFA] border-t border-[#EEE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[#6E6E6E] text-sm">
            © {new Date().getFullYear()} {SALON.name}
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="/impressum" className="hover:text-[#1A1A1A] text-sm">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-[#1A1A1A] text-sm">
              Datenschutz
            </Link>
            <Link href="/preisliste" className="hover:text-[#1A1A1A] text-sm">
              Preisliste
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
