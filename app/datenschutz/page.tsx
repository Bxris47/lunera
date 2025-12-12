"use client";
import Image from "next/image";

export default function Datenschutz() {
  return (
    <div className="min-h-screen w-full bg-white text-[#1A1A1A]">

      {/* HEADER */}
      <header className="w-full pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
          <Image src="/lunera-logo.png" width={120} height={120} alt="Lunera Beauty" />

          <nav className="flex items-center gap-4 text-lg font-medium text-[#1A1A1A] tracking-wide">
            <a href="/" className="hover:text-[#D4AF37] transition">Home</a>
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>
            <a href="/termin" className="hover:text-[#D4AF37] transition">Termin buchen</a>
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>
            <a href="/vorschau" className="hover:text-[#D4AF37] transition">Vorschau</a>
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        <h1 className="text-5xl font-serif font-bold text-center tracking-tight">
          Datenschutz
        </h1>

        <p className="text-center text-lg text-[#7A6E63]">
          Der Schutz deiner persönlichen Daten ist uns wichtig. Wir verarbeiten nur die Daten, die für die Nutzung unserer Website und Dienstleistungen notwendig sind.
        </p>

        <div className="bg-white rounded-3xl shadow-sm border border-[#E8E0D7] p-12 space-y-6">

          <Section
            title="1. Cookies"
            text={`Unsere Website verwendet Cookies ausschließlich zur Grundfunktionalität, z. B. um deine Auswahl beim Cookie-Hinweis zu speichern. Cookies dienen nicht zur Erstellung von Nutzerprofilen und werden nicht an Dritte weitergegeben.`}
          />

          <Section
            title="2. Server-Logfiles"
            text={`Beim Besuch unserer Website werden automatisch technische Daten erfasst, wie IP-Adresse, Datum, Uhrzeit und aufgerufene Seiten. Diese Daten werden ausschließlich zu Sicherheitszwecken genutzt und helfen uns, die Website stabil und sicher zu betreiben.`}
          />

          <Section
            title="3. Kontakt über Formulare oder WhatsApp"
            text={`Wenn du uns über ein Kontaktformular oder WhatsApp erreichst, werden die angegebenen Daten (z. B. Name, Telefonnummer, Nachricht) nur für die Bearbeitung deiner Anfrage verwendet. Eine Weitergabe an Dritte erfolgt nicht. Bitte beachte, dass bei der Nutzung von WhatsApp die Datenverarbeitung durch WhatsApp/Meta erfolgt.`}
          />

          <Section
            title="4. Analyse & Tracking"
            text={`Wir verwenden keine personenbezogenen Tracking-Tools, außer um die Grundfunktionalität der Website sicherzustellen. Statistische Auswertungen über Besucherzahlen erfolgen anonymisiert, sodass keine Rückschlüsse auf einzelne Personen möglich sind.`}
          />

          <Section
            title="5. Weitergabe von Daten"
            text={`Es findet keine Weitergabe deiner personenbezogenen Daten an Dritte statt, außer wenn wir gesetzlich dazu verpflichtet sind. Deine Daten bleiben bei uns sicher und werden nur für den beschriebenen Zweck genutzt.`}
          />

          <Section
            title="6. Deine Rechte"
            text={`Du hast das Recht auf Auskunft über die gespeicherten Daten, Berichtigung, Löschung sowie Einschränkung der Verarbeitung. Außerdem kannst du jederzeit der Nutzung deiner Daten widersprechen. Kontaktiere uns dafür über die im Impressum angegebenen Kontaktmöglichkeiten.`}
          />

          <Section
            title="7. Änderungen dieser Datenschutzerklärung"
            text={`Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, z. B. bei Änderungen der Website oder der rechtlichen Vorgaben. Bitte schaue regelmäßig hier vorbei, um informiert zu bleiben.`}
          />

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#FAFAFA] border-t border-[#EEE] mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center text-[#6E6E6E] flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} Lunera Beauty</div>
          <div className="flex gap-6">
            <a href="/impressum" className="hover:text-[#1A1A1A]">Impressum</a>
            <a href="/datenschutz" className="hover:text-[#1A1A1A]">Datenschutz</a>
            <a href="/preisliste" className="hover:text-[#1A1A1A]">Preisliste</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-serif font-semibold">{title}</h2>
      <p className="text-[#4A423B] leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  );
}
