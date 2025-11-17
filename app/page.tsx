"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import Newsletter from "./components/NewsletterPopup"
import "../styles/globals.css"

/* -------------------------------------------------------------
   COMPONENT: Öffnungszeiten + Salon-Status + Google Map
--------------------------------------------------------------*/
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

  return (
    <section className="max-w-6xl mx-auto mt-32 px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
      
      {/* Linke Seite */}
      <div className="flex flex-col gap-6">
        <h3 className="text-4xl font-serif font-bold text-[#111]">
          Öffnungszeiten
        </h3>

        <ul className="text-[#444] font-light space-y-1 text-lg">
          <li>Mo–Fr: 10:00 – 18:00</li>
          <li>Sa: 10:00 – 16:00</li>
          <li>So: Geschlossen</li>
        </ul>

        <div className="flex items-center gap-4 mt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={
              isOpen
                ? { opacity: 1 }
                : { opacity: [1, 0.5, 1] }
            }
            transition={{
              duration: 1.5,
              repeat: isOpen ? 0 : Infinity,
            }}
            className="w-3 h-8 rounded-md"
            style={{
              background: isOpen ? "#4CD964" : "#FF3B30",
            }}
          />

          <span className="text-[#111] font-medium text-lg">
            {isOpen ? "Der Salon ist geöffnet" : "Der Salon ist geschlossen"}
          </span>
        </div>
      </div>

      {/* MAP */}
      <div className="rounded-xl overflow-hidden shadow-xl w-full h-96 bg-[#F7F7F7]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.123456789!2d13.404954!3d52.520008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851d2b1a1f6d3%3A0xabcdef123456789!2sMusterstraße+10%2C+10115+Berlin!5e0!3m2!1sde!2sde!4v1690000000000!5m2!1sde!2sde"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

    </section>
  )
}

/* -------------------------------------------------------------
   STARTSEITE – PREMIUM VERSION
--------------------------------------------------------------*/
export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white text-[#111]">

      {/* -------------------------------------------------------------
         HEADER – PREMIUM NAVIGATION
      -------------------------------------------------------------- */}
    <header className="w-full py-10 bg-white/70 backdrop-blur-xl border-b border-[#f0f0f0]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">

        {}
        <Image
          src="/lunera-logo.png"
          width={120}
          height={120}
          alt="Lunera Beauty Logo"
          className="opacity-90"
        />

        {}
        <nav className="flex items-center gap-4 text-lg font-medium text-[#1A1A1A] tracking-wide whitespace-nowrap">

          <a href="/" className="text-[#D4AF37] font-semibold">
            Home
          </a>

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




      {/* -------------------------------------------------------------
         HERO SECTION – ULTRA PREMIUM
      -------------------------------------------------------------- */}
      <section className="w-full flex flex-col items-center text-center px-6 pt-36 pb-40
      bg-gradient-to-b from-white to-[#F3F3F3]">

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl font-serif font-bold text-[#111] tracking-tight mb-10"
        >
          Schönheit. Präzision. Eleganz.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3 }}
          className="max-w-2xl text-xl font-light text-[#444]"
        >
          Willkommen bei <span className="font-semibold">Lunera Beauty</span> –  
          dein exklusiver Beauty-Salon für Wimpern, Hände und Füße.
        </motion.p>
      </section>



      {/* -------------------------------------------------------------
         SERVICES – PREMIUM CARDS
      -------------------------------------------------------------- */}
      <section className="w-full px-6 py-24 bg-white">
        <h3 className="text-5xl font-serif font-bold text-center mb-20">
          Unsere Services
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-7xl mx-auto">

          {/* SERVICE CARD */}
          {[
            {
              title: "Wimpernverlängerung",
              text: "Von 1:1 bis Mega-Volume elegante Wimpern, perfekt abgestimmt."
            },
            {
              title: "Handpflege",
              text: "UV-Lack, Maniküre & moderne Nagelverlängerung in Premium-Qualität."
            },
            {
              title: "Fußpflege",
              text: "Wellness für deine Füße sauber, schonend, professionell."
            },
            {
              title: "Augenpaket",
              text: "Färben & Formen von Brauen und Wimpern für einen strahlenden Look."
            }
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-10 bg-white border border-[#EAEAEA] shadow-md hover:shadow-xl rounded-3xl transition-all"
            >
              <h4 className="text-2xl font-serif font-semibold mb-3">{s.title}</h4>
              <p className="text-[#444] font-light text-lg leading-relaxed">{s.text}</p>
            </motion.div>
          ))}

        </div>
      </section>
      
      <Newsletter />

      {/* STATUS + MAP */}
      <SalonStatusMap />


      {/* -------------------------------------------------------------
         FOOTER
      -------------------------------------------------------------- */}
      <footer className="bg-[#FAFAFA] border-t border-[#EEE] mt-32">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between text-[#6E6E6E] text-lg">
          <div>© {new Date().getFullYear()} Lunera Beauty</div>

          <div className="flex gap-8">
            <a href="/impressum" className="hover:text-[#111]">Impressum</a>
            <a href="/datenschutz" className="hover:text-[#111]">Datenschutz</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
