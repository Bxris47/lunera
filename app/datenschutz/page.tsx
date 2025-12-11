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
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-5xl font-serif font-bold mb-6 text-center tracking-tight">
          Datenschutz
        </h1>

        <p className="mb-10 text-center text-lg text-[#7A6E63]">
          Kurze Datenschutzerklärung gemäß DSGVO
        </p>

        <div className="bg-white rounded-3xl shadow-sm border border-[#E8E0D7] p-12 space-y-10">

          <Section
            title="1. Verantwortliche Stelle"
            text="Die Verantwortlichen für diese Website finden Sie im Impressum."
          />

          <Section
            title="2. Erhebung und Speicherung personenbezogener Daten"
            text="Unsere Website dient ausschließlich der Bereitstellung von Informationen.
Wir erfassen selbst keine personenbezogenen Daten über Formulare oder Konten."
          />

          <Section
            title="3. Kontakt über WhatsApp"
            text={`Wenn Sie über WhatsApp einen Termin anfragen, werden Ihre Daten (z. B. Telefonnummer, Nachricht) 
direkt durch WhatsApp verarbeitet.  
Bitte beachten Sie hierzu die Datenschutzrichtlinie von WhatsApp/Meta.`}
          />

          <Section
            title="4. Server-Logfiles"
            text="Der Hosting-Anbieter erhebt automatisch grundlegende technische Daten (z. B. IP-Adresse, Zeitpunkt des Zugriffs). Diese Daten dienen der Sicherheit und werden nicht zur Auswertung genutzt."
          />

          <Section
            title="5. Weitergabe von Daten"
            text="Es findet keine Weitergabe personenbezogener Daten an Dritte statt."
          />

          <Section
            title="6. Ihre Rechte"
            text={`Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten.
Wenden Sie sich dazu an die im Impressum genannten Kontaktmöglichkeiten.`}
          />

        </div>
      </div>

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

function Section({ title, text }: any) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-serif font-semibold">{title}</h2>
      <p className="text-[#4A423B] leading-relaxed whitespace-pre-line">
        {text}
      </p>
    </div>
  );
}
