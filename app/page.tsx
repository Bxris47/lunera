"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import TypingText from "../components/ui/shadcn-io/typing-text"

function SalonStatusMap() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()
    const open =
      (day >= 1 && day <= 5 && hour >= 10 && hour < 18) ||
      (day === 6 && hour >= 10 && hour < 16)
    setIsOpen(open)
  }, [])

  const openingHours = {
    Montag: "10:00 – 18:00",
    Dienstag: "10:00 – 18:00",
    Mittwoch: "10:00 – 18:00",
    Donnerstag: "10:00 – 18:00",
    Freitag: "10:00 – 18:00",
    Samstag: "10:00 – 16:00",
    Sonntag: "Geschlossen"
  }

  return (
    <section className="max-w-6xl mx-auto mt-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div className="flex flex-col gap-4">
        <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#111]">Öffnungszeiten</h3>
        <ul className="text-[#555] font-light space-y-1 text-base sm:text-lg">
          {Object.entries(openingHours).map(([day, time]) => (
            <li key={day} className="flex justify-between">
              <span className="font-medium">{day}:</span>
              <span>{time}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 mt-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isOpen ? { opacity: 1 } : { opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: isOpen ? 0 : Infinity }}
            className="w-3 h-6 rounded-md"
            style={{ background: isOpen ? "#4CD964" : "#FF3B30" }}
          />
          <span className="text-[#111] font-medium text-sm sm:text-base">
            {isOpen ? "Der Salon ist geöffnet" : "Der Salon ist geschlossen"}
          </span>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden shadow-xl w-full h-64 sm:h-80 md:h-96 bg-[#F7F7F7]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2505.123456789!2d7.699123!3d52.290456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b9845d3c1a2bcd%3A0xabcdef123456789!2sWidukindstraße+27%2C+49477+Ibbenb%C3%BCren!5e0!3m2!1sde!2sde!4v1690000000000!5m2!1sde!2sde"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white text-[#111] overflow-x-hidden">
      {/* HEADER */}
      <header className="w-full py-8 sm:py-10 bg-white/70 backdrop-blur-xl border-b border-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
          <Image src="/lunera-logo.png" width={100} height={100} alt="Lunera Beauty Logo" className="opacity-90" />
          <nav className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base font-medium text-[#1A1A1A] tracking-wide whitespace-nowrap">
            <a href="/" className="text-[#D4AF37] font-semibold">Home</a>
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>
            <a href="/termin" className="hover:text-[#D4AF37] transition">Termin buchen</a>
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>
            <a href="/vorschau" className="hover:text-[#D4AF37] transition">Vorschau</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative w-full flex flex-col items-center text-center px-6 pt-28 sm:pt-32 pb-32 sm:pb-40 bg-gradient-to-b from-white to-[#F3F3F3] overflow-hidden">
        <TypingText
          text={["Schönheit. Präzision. Eleganz."]}
          typingSpeed={90}
          pauseDuration={800}
          showCursor={true}
          cursorCharacter="|"
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#111] tracking-tight mb-6 sm:mb-8"
          textColors={['#111', '#111', '#111']}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 3 }}
          className="max-w-xl sm:max-w-2xl text-base sm:text-lg font-light text-[#555]"
        >
          Willkommen bei <span className="font-semibold">Lunera Beauty</span> – dein exklusiver Salon für Wimpern, Hände und Füße.
        </motion.p>
      </section>

      {/* SERVICES */}
      <section className="w-full px-6 py-16 sm:py-20 bg-white">
        <h3 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-12 sm:mb-16">Unsere Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {[
            { title: "Wimpernverlängerung", text: "Elegante Wimpern von 1:1 bis Mega-Volume." },
            { title: "Handpflege", text: "Maniküre, UV-Lack und moderne Nagelverlängerungen." },
            { title: "Fußpflege", text: "Wellness für saubere und gepflegte Füße." },
            { title: "Augenpaket", text: "Brauen & Wimpern färben und formen für strahlende Augen." }
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 bg-white border border-[#EAEAEA] shadow-md hover:shadow-xl rounded-2xl transition-all"
            >
              <h4 className="text-xl sm:text-2xl font-serif font-semibold mb-2 sm:mb-3">{s.title}</h4>
              <p className="text-[#555] font-light text-sm sm:text-base leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SALON STATUS + MAP */}
      <SalonStatusMap />

      {/* FOOTER */}
      <footer className="bg-[#FAFAFA] border-t border-[#EEE] mt-16 sm:mt-20">
        <div className="max-w-6xl mx-auto px-6 py-10 sm:py-12 text-center text-[#6E6E6E] flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} Lunera Beauty</div>
          <div className="flex gap-4 sm:gap-6">
            <a href="/impressum" className="hover:text-[#1A1A1A] text-sm sm:text-base">Impressum</a>
            <a href="/datenschutz" className="hover:text-[#1A1A1A] text-sm sm:text-base">Datenschutz</a>
            <a href="/preisliste" className="hover:text-[#1A1A1A] text-sm sm:text-base">Preisliste</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
