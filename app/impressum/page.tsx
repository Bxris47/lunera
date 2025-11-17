"use client";

export default function Impressum() {
  return (
    <div className="min-h-screen w-full bg-white text-[#1A1A1A]">

      {/* HEADER NAVIGATION */}
    <header className="w-full pt-10 pb-8">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
        
        {/* NAVIGATION */}
        <nav className="flex items-center gap-4 text-lg font-medium text-[#1A1A1A] tracking-wide">

        <a href="/" className="hover:text-[#D4AF37] transition">Home</a>

        <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>

        <a href="/termin" className="hover:text-[#D4AF37] transition">
            Termin buchen
        </a>

        <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>

        <a href="/vorschau" className="hover:text-[#D4AF37] transition">
          Vorschau
        </a>
        </nav>
    </div>
    </header>



      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-5xl font-serif font-bold mb-6 text-center text-[#1A1A1A] tracking-tight">
          Impressum
        </h1>

        <p className="mb-10 text-center text-lg text-[#7A6E63]">
          Angaben gemäß § 5 TMG
        </p>

        {/* CARD */}
        <div className="bg-[#ffffff] rounded-3xl shadow-sm border border-[#E8E0D7] p-12 space-y-10">

          <Section
            title="Betreiber der Website"
            text={`Lunera Beauty\nMusterstraße 10\n10115 Berlin`}
          />

          <Section
            title="Kontakt"
            text={`Telefon: 01234 / 567890\nE-Mail: info@lunerabeauty.de`}
          />

          <Section
            title="Vertreten durch"
            text="Maria Lunera"
          />

          <Section
            title="Umsatzsteuer-ID"
            text="Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: DE123456789"
          />

          <Section
            title="Haftung für Inhalte"
            text="Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
                  Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,
                  übermittelte oder gespeicherte fremde Informationen zu überwachen."
          />

          <Section
            title="Haftung für Links"
            text="Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                  Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen."
          />

          <Section
            title="Urheberrecht"
            text="Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                  Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet."
          />

        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* PREMIUM FOOTER – wie Startseite */}
      {/* ------------------------------------------------ */}
      <footer className="bg-[#FAFAFA] border-t border-[#EEE]">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center text-[#6E6E6E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Lunera Beauty</div>
          <div className="flex gap-6">
            <a href="/impressum" className="hover:text-[#1A1A1A]">Impressum</a>
            <a href="/datenschutz" className="hover:text-[#1A1A1A]">Datenschutz</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

function Section({ title, text }: any) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-serif font-semibold text-[#1A1A1A]">
        {title}
      </h2>
      <p className="text-[#4A423B] leading-relaxed whitespace-pre-line">
        {text}
      </p>
    </div>
  );
}
