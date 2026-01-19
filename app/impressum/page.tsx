"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Building2, Phone, Mail, User, Receipt, Link2, Copyright, Shield } from "lucide-react"

const SALON = {
  name: "Lunera Beauty",
  zipCity: "49477 Ibbenbüren"
} as const

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
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
          <Link href="/" className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA]" onClick={onClose}>
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

          <Link href="/impressum" className="rounded-2xl border border-[#111] p-4 bg-[#111] text-white" onClick={onClose}>
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

function Pill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#EEE] bg-white px-3 py-1.5 text-xs font-semibold text-[#111] shadow-sm">
      {text}
    </span>
  )
}

function InfoCard({
  icon: Icon,
  title,
  text
}: {
  icon: any
  title: string
  text: string
}) {
  return (
    <div className="rounded-3xl border border-[#EEE] bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border border-[#EEE] bg-[#FAFAFA] p-2.5">
          <Icon className="h-5 w-5 text-[#111]" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-serif font-semibold text-[#111]">{title}</h2>
          <p className="mt-2 text-sm sm:text-base text-[#555] leading-relaxed whitespace-pre-line">{text}</p>
        </div>
      </div>
    </div>
  )
}

export default function Impressum() {
  const [menuOpen, setMenuOpen] = useState(false)

  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <div className="min-h-screen w-full bg-white text-[#111] overflow-x-hidden">
      {/* HEADER (wie Startseite) */}
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
            <Link href="/" className="hover:text-[#D4AF37] transition">
              Home
            </Link>
            <Link href="/leistung" className="hover:text-[#D4AF37] transition">
              Leistung
            </Link>
            <Link href="/preisliste" className="hover:text-[#D4AF37] transition">
              Preisliste
            </Link>
            <Link href="/termin" className="hover:text-[#D4AF37] transition">
              Termin
            </Link>
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

      {/* HERO */}
      <section className="w-full px-4 sm:px-6 pt-10 sm:pt-14 pb-10 bg-gradient-to-b from-white to-[#F5F5F5] border-b border-[#EEE]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-2">
            <Pill text="Angaben gemäß § 5 TMG" />
            <Pill text="Kontakt & Verantwortliche" />
            <Pill text="Rechtliches" />
          </div>

          <h1 className="mt-5 text-4xl sm:text-5xl font-serif font-bold text-[#111] tracking-tight">
            Impressum
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#666] max-w-2xl mx-auto leading-relaxed">
            Transparente Informationen zum Betreiber dieser Website und zu rechtlichen Hinweisen.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Quick contact row */}
        <div className="rounded-3xl border border-[#EEE] bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-[#111]">Kontakt</div>
              <div className="mt-1 text-sm text-[#666]">
                Für Fragen zu Terminen oder rechtlichen Themen erreichst du uns hier.
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:info@lunerabeauty.de"
                className="inline-flex items-center gap-2 rounded-full border border-[#EEE] bg-white px-5 py-2.5 text-sm font-semibold hover:bg-[#FAFAFA] transition"
              >
                <Mail className="h-4 w-4" /> info@lunerabeauty.de
              </a>
              <a
                href="tel:01234567890"
                className="inline-flex items-center gap-2 rounded-full border border-[#EEE] bg-white px-5 py-2.5 text-sm font-semibold hover:bg-[#FAFAFA] transition"
              >
                <Phone className="h-4 w-4" /> 01234 / 567890
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <InfoCard
            icon={Building2}
            title="Betreiber der Website"
            text={`Lunera Beauty\nWidukindstraße 27\n49477 Ibbenbüren\nDeutschland`}
          />

          <InfoCard
            icon={User}
            title="Verantwortlich i. S. d. § 18 Abs. 2 MStV"
            text={`Maria Lunera\n(Anschrift wie oben)`}
          />

          <InfoCard
            icon={Receipt}
            title="Umsatzsteuer-ID"
            text={`Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:\nDE123456789`}
          />

          <InfoCard
            icon={Shield}
            title="Haftung für Inhalte"
            text={`Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.`}
          />

          <InfoCard
            icon={Link2}
            title="Haftung für Links"
            text={`Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.`}
          />

          <InfoCard
            icon={Copyright}
            title="Urheberrecht"
            text={`Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
Beiträge Dritter sind als solche gekennzeichnet. Vervielfältigung, Bearbeitung, Verbreitung oder Verwertung außerhalb des Urheberrechts bedürfen der schriftlichen Zustimmung.`}
          />
        </div>

        {/* Links */}
        <div className="mt-6 rounded-3xl border border-[#EEE] bg-[#FAFAFA] p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-[#111]">Weitere Seiten</div>
              <div className="text-sm text-[#666]">Datenschutz & Preise – schnell erreichbar.</div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/datenschutz"
                className="inline-flex items-center justify-center rounded-full border border-[#EEE] bg-white px-5 py-2.5 text-sm font-semibold hover:bg-[#FAFAFA] transition"
              >
                Datenschutz
              </Link>
              <Link
                href="/preisliste"
                className="inline-flex items-center justify-center rounded-full border border-[#EEE] bg-white px-5 py-2.5 text-sm font-semibold hover:bg-[#FAFAFA] transition"
              >
                Preisliste
              </Link>
              <Link
                href="/termin"
                className="inline-flex items-center justify-center rounded-full border border-[#111] bg-white px-5 py-2.5 text-sm font-semibold hover:bg-[#111] hover:text-white transition"
              >
                Termin anfragen
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER (wie Startseite) */}
      <footer className="bg-[#FAFAFA] border-t border-[#EEE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[#6E6E6E] text-sm">
            © {year} {SALON.name}
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
