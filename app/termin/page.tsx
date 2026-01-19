"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Instagram, MessageCircle, Music2, Menu, X, ArrowRight } from "lucide-react"
import { cn } from "../../lib/utils"

type Contact = {
  title: string
  handle: string
  href: string
  icon: any
  tone: "whatsapp" | "instagram" | "tiktok"
}

const BRAND = { name: "Lunera Beauty", logoSrc: "/lunera-logo.png" } as const

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
          <div className="text-sm font-semibold">{BRAND.name}</div>
          <button onClick={onClose} className="p-2 rounded-xl border border-[#EEE] bg-white" aria-label="Menü schließen">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-5 flex flex-col gap-3 text-sm font-medium">
          <Link href="/" className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA]" onClick={onClose}>
            Home
          </Link>
          <Link href="/leistung" className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA]" onClick={onClose}>
            Leistung
          </Link>
          <Link href="/preisliste" className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA]" onClick={onClose}>
            Preisliste
          </Link>
          <Link href="/termin" className="rounded-2xl border border-[#111] p-4 bg-[#111] text-white" onClick={onClose}>
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

function ContactIcon({ tone, Icon }: { tone: Contact["tone"]; Icon: any }) {
  const styles =
    tone === "whatsapp"
      ? "bg-[#25D366]/10 border-[#25D366]/20"
      : tone === "instagram"
        ? "bg-[#D62976]/10 border-[#D62976]/20"
        : "bg-[#111]/5 border-[#111]/15"

  const iconColor =
    tone === "whatsapp" ? "text-[#25D366]" : tone === "instagram" ? "text-[#D62976]" : "text-[#111]"

  return (
    <div className={`h-12 w-12 rounded-2xl border ${styles} flex items-center justify-center`}>
      <Icon className={`h-6 w-6 ${iconColor}`} />
    </div>
  )
}

function ContactCard({ c, i }: { c: Contact; i: number }) {
  return (
    <motion.a
      href={c.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="group rounded-3xl border border-[#EAEAEA] bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <ContactIcon tone={c.tone} Icon={c.icon} />
          <div className="min-w-0">
            <div className="text-base font-semibold text-[#111]">{c.title}</div>
            <div className="text-sm text-[#666] truncate">{c.handle}</div>
          </div>
        </div>

        <div className="rounded-full border border-[#EEE] bg-white px-3 py-1 text-xs font-semibold text-[#111] opacity-0 group-hover:opacity-100 transition">
          Öffnen <ArrowRight className="inline-block h-3.5 w-3.5 ml-1" />
        </div>
      </div>

      <p className="mt-4 text-sm sm:text-base text-[#555] leading-relaxed">
        {c.tone === "whatsapp"
          ? "Schreib uns kurz dein Wunschdatum + Service – wir antworten schnell."
          : c.tone === "instagram"
            ? "DM für Fragen, Ergebnisse & Inspiration."
            : "Kurz & direkt – Updates und Looks."}
      </p>

      <div className="mt-5 h-px w-full bg-[#F2F2F2]" />

      <div className="mt-4 text-sm font-semibold text-[#111]">
        Jetzt kontaktieren <span className="ml-1 group-hover:ml-2 transition-all">→</span>
      </div>
    </motion.a>
  )
}

export default function TerminPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  const contacts: Contact[] = useMemo(
    () => [
      {
        title: "WhatsApp",
        handle: "Schnell & unkompliziert",
        href: "https://wa.me/49123456789",
        icon: MessageCircle,
        tone: "whatsapp"
      },
      {
        title: "Instagram",
        handle: "@lunera_beauty",
        href: "https://instagram.com/",
        icon: Instagram,
        tone: "instagram"
      },
      {
        title: "TikTok",
        handle: "@lunera",
        href: "https://tiktok.com/@lunera",
        icon: Music2, // cleaner than png, consistent icon set
        tone: "tiktok"
      }
    ],
    []
  )

  return (
    <div className="min-h-screen bg-white text-[#111]">
      {/* HEADER (same look as the other pages) */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <Image src={BRAND.logoSrc} width={40} height={40} alt={BRAND.name} className="opacity-95" priority />
            <div className="leading-tight min-w-0">
              <div className="text-sm font-semibold tracking-wide truncate">{BRAND.name}</div>
              <div className="text-xs text-[#666] truncate">Kontakt & Termin</div>
            </div>
          </Link>

          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-[#1A1A1A]">
            <Link href="/" className="hover:text-[#D4AF37] transition">
              Home
            </Link>
            <Link href="/leistung" className="hover:text-[#D4AF37] transition">
              Leistung
            </Link>
            <Link href="/preisliste" className="hover:text-[#D4AF37] transition">
              Preisliste
            </Link>
            <Link href="/termin" className="text-[#D4AF37] font-semibold">
              Termin
            </Link>
          </nav>

          {/* mobile menu */}
          <button
            onClick={() => setMenuOpen(true)}
            className="sm:hidden inline-flex items-center justify-center rounded-2xl border border-[#EEE] bg-white p-2.5"
            aria-label="Menü öffnen"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* desktop only: subtle active pill */}
          <Link
            href="/termin"
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-[#111] bg-[#111] px-4 py-2 text-sm font-semibold text-white"
            aria-current="page"
          >
            Termin
          </Link>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* HERO / TITLE (mobile first) */}
      <section className="px-4 sm:px-6 pt-10 sm:pt-14 pb-8 sm:pb-10 bg-gradient-to-b from-white to-[#F6F6F6]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.12, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mx-auto mb-5 h-1 w-32 sm:w-40 rounded-full bg-gradient-to-r from-[#D4AF37] to-transparent"
          />

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-[34px] leading-[1.08] sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-[#111]"
          >
            Kontakt & Termin
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: "easeOut" }}
            className="mt-4 text-[15px] sm:text-lg text-[#666] max-w-2xl mx-auto font-light leading-relaxed"
          >
            Wähle den Kanal, der dir am liebsten ist. Schreib kurz <span className="font-semibold text-[#111]">Service</span> +{" "}
            <span className="font-semibold text-[#111]">Wunschtermin</span> – wir melden uns schnell.
          </motion.p>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#EEE] bg-white px-4 py-2 text-xs sm:text-sm text-[#444] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" aria-hidden />
            Tipp: Für die schnellste Antwort → WhatsApp
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {contacts.map((c, i) => (
            <ContactCard key={c.title} c={c} i={i} />
          ))}
        </div>

        {/* Gutschein */}
        <div className="max-w-3xl mx-auto mt-10 sm:mt-12 rounded-3xl border border-[#EEE] bg-white p-6 sm:p-8 shadow-sm">
          <div className="text-lg sm:text-xl font-serif font-bold text-[#111]">Gutscheine bei Lunera</div>

          <div className="mt-3 text-sm sm:text-base text-[#666] leading-relaxed">
            Du kannst bei uns auch <span className="font-semibold text-[#111]">Gutscheine</span> kaufen – perfekt als Geschenk
            oder einfach für dich selbst.
          </div>

          <div className="mt-5 rounded-2xl border border-[#EEE] bg-[#FAFAFA] p-4 sm:p-5">
            <div className="text-sm sm:text-base text-[#555] leading-relaxed">Schreib uns kurz:</div>

            <ul className="mt-4 space-y-3 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#D4AF37]" aria-hidden />
                <span>
                  <span className="font-semibold text-[#111]">Gutscheinwert</span> (z.B. 25€, 50€, 100€)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#D4AF37]" aria-hidden />
                <span>
                  <span className="font-semibold text-[#111]">Für wen?</span> (Name optional – wenn du’s drauf haben willst)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#D4AF37]" aria-hidden />
                <span>
                  <span className="font-semibold text-[#111]">Abholung oder digital</span> (PDF/WhatsApp)
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-5 text-xs sm:text-sm text-[#777] leading-relaxed">
            Tipp: Am schnellsten geht’s über <span className="font-semibold text-[#111]">WhatsApp</span>.
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#FAFAFA] border-t border-[#EEE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[#6E6E6E] text-sm">
            © {new Date().getFullYear()} {BRAND.name}
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
