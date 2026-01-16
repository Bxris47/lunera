"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShieldCheck, Cookie, Lock, Server, MessageCircle, Scale } from "lucide-react"

const SALON = {
  name: "Lunera Beauty",
  zipCity: "49477 Ibbenbüren"
} as const

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function Badge({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#EEE] bg-white px-3 py-1.5 text-xs font-semibold text-[#111] shadow-sm">
      <Icon className="h-4 w-4" />
      <span>{text}</span>
    </div>
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
          <div className="flex items-center gap-2 min-w-0">
            <Image src="/lunera-logo.png" width={34} height={34} alt="Lunera Beauty" className="opacity-95" priority />
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">{SALON.name}</div>
              <div className="text-xs text-[#666] truncate">{SALON.zipCity}</div>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl border border-[#EEE] bg-white" aria-label="Menü schließen">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-5 flex flex-col gap-3 text-sm font-medium">
          <Link href="/" className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA]" onClick={onClose}>
            Home
          </Link>
          <Link
            href="/vorschau"
            className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA]"
            onClick={onClose}
          >
            Vorschau
          </Link>
          <Link
            href="/preisliste"
            className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA]"
            onClick={onClose}
          >
            Preisliste
          </Link>
          <Link
            href="/termin"
            className="rounded-2xl border border-[#111] p-4 hover:bg-[#111] hover:text-white transition"
            onClick={onClose}
          >
            Termin anfragen
          </Link>

          <div className="mt-2 h-px w-full bg-[#F2F2F2]" />

          <Link
            href="/datenschutz"
            className="rounded-2xl border border-[#EEE] p-4 bg-[#FAFAFA] font-semibold"
            onClick={onClose}
          >
            Datenschutz
          </Link>
          <Link href="/impressum" className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA]" onClick={onClose}>
            Impressum
          </Link>
        </nav>
      </div>
    </div>
  )
}

function InfoCard({
  icon: Icon,
  title,
  children
}: {
  icon: any
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-3xl border border-[#EEE] bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border border-[#EEE] bg-[#FAFAFA] p-2.5">
          <Icon className="h-5 w-5 text-[#111]" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-serif font-semibold text-[#111]">{title}</h2>
          <div className="mt-2 text-sm sm:text-base text-[#555] leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

function TocLink({ id, label }: { id: string; label: string }) {
  return (
    <a
      href={`#${id}`}
      className="rounded-2xl border border-[#EEE] bg-white px-4 py-3 text-sm font-semibold text-[#111] hover:bg-[#FAFAFA] transition"
    >
      {label}
    </a>
  )
}

export default function Datenschutz() {
  const [menuOpen, setMenuOpen] = useState(false)

  const updatedAt = useMemo(() => {
    // nur Anzeige, kein SSR Problem (Client Component)
    const d = new Date()
    return d.toLocaleDateString("de-DE", { year: "numeric", month: "long" })
  }, [])

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
            <Link href="/vorschau" className="hover:text-[#D4AF37] transition">
              Vorschau
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge icon={ShieldCheck} text="Datenschutz & Transparenz" />
              <Badge icon={Lock} text="Keine Werbung-Profile" />
              <Badge icon={Server} text="Sicherer Betrieb" />
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl font-serif font-bold text-[#111] tracking-tight">
              Datenschutzerklärung
            </h1>

            <p className="mt-3 text-sm sm:text-base text-[#666] max-w-2xl mx-auto leading-relaxed">
              Wir erklären klar, welche Daten beim Besuch unserer Website verarbeitet werden – und warum. Kurz, sauber,
              verständlich.
            </p>

            <div className="mt-4 text-xs text-[#777]">Stand: {updatedAt}</div>

            {/* TOC */}
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <TocLink id="cookies" label="Cookies" />
              <TocLink id="logs" label="Logfiles" />
              <TocLink id="kontakt" label="Kontakt" />
              <TocLink id="tracking" label="Analyse" />
              <TocLink id="rechte" label="Deine Rechte" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div id="cookies">
            <InfoCard icon={Cookie} title="1. Cookies">
              Unsere Website nutzt Cookies nur für grundlegende Funktionen (z. B. Speichern deiner Cookie-Auswahl).
              <br />
              <span className="font-semibold text-[#111]">Wir erstellen keine Werbe-Profile</span> und geben keine
              Cookie-Daten zu Marketing-Zwecken weiter.
            </InfoCard>
          </div>

          <div id="logs">
            <InfoCard icon={Server} title="2. Server-Logfiles">
              Beim Besuch werden technische Daten automatisch verarbeitet (z. B. IP-Adresse, Datum/Uhrzeit, aufgerufene
              Seiten, Browser-Informationen).
              <br />
              Zweck: <span className="font-semibold text-[#111]">Sicherheit</span>, Missbrauchserkennung und stabiler
              Betrieb.
            </InfoCard>
          </div>

          <div id="kontakt">
            <InfoCard icon={MessageCircle} title="3. Kontakt (Formular / WhatsApp)">
              Wenn du uns kontaktierst, verarbeiten wir deine Angaben (z. B. Name, Telefonnummer, Nachricht) nur zur
              Bearbeitung deiner Anfrage und ggf. Terminabstimmung.
              <br />
              Hinweis: Bei WhatsApp erfolgt zusätzlich eine Verarbeitung durch WhatsApp/Meta – bitte beachte deren
              Richtlinien.
            </InfoCard>
          </div>

          <div id="tracking">
            <InfoCard icon={ShieldCheck} title="4. Analyse & Tracking">
              Wir verwenden keine personalisierte Werbung. Falls Besucherzahlen ausgewertet werden, erfolgt dies
              anonymisiert bzw. so, dass keine Rückschlüsse auf einzelne Personen möglich sind.
            </InfoCard>
          </div>

          <InfoCard icon={Lock} title="5. Weitergabe von Daten">
            Eine Weitergabe deiner personenbezogenen Daten an Dritte erfolgt grundsätzlich nicht – außer wenn wir
            gesetzlich dazu verpflichtet sind oder es zur Bearbeitung deiner Anfrage erforderlich ist.
          </InfoCard>

          <div id="rechte">
            <InfoCard icon={Scale} title="6. Deine Rechte">
              Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie Widerspruch.
              Außerdem kannst du erteilte Einwilligungen jederzeit widerrufen.
              <br />
              Kontakt dazu: bitte über die Angaben im <Link className="underline hover:text-[#111]" href="/impressum">Impressum</Link>.
            </InfoCard>
          </div>

          <InfoCard icon={ShieldCheck} title="7. Änderungen">
            Wir können diese Datenschutzerklärung anpassen, wenn sich Website/Prozesse oder rechtliche Vorgaben ändern.
            Bitte schaue gelegentlich vorbei, um auf dem aktuellen Stand zu bleiben.
          </InfoCard>
        </div>
      </main>

      {/* FOOTER (wie Startseite) */}
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
