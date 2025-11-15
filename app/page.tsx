'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import '../styles/globals.css'

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
    <section className="max-w-6xl mx-auto mt-20 px-4 sm:px-6 lg:px-0 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Linke Seite: Öffnungszeiten + Status */}
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A2F25]">Öffnungszeiten</h3>
        <ul className="text-[#5C4B3E] font-light space-y-1 text-sm sm:text-base">
          <li>Mo–Fr: 10:00 – 18:00</li>
          <li>Sa: 10:00 – 16:00</li>
          <li>So: Geschlossen</li>
        </ul>
        <div className="flex items-center gap-3 mt-4">
          <motion.div
            animate={{ scale: [0.95, 1.1, 1], rotate: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
          >
            {/* Glow / Ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: isOpen
                  ? '0 0 8px #00ff00, 0 0 16px #00ff00, 0 0 24px #FFD700'
                  : '0 0 6px #8B0000, 0 0 12px #B22222, 0 0 20px #FFD700',
                background: isOpen ? '' : 'radial-gradient(circle at center, #8B0000, #5C0000)',
              }}
            ></div>
            {/* Inner Circle */}
            <div
              className={`w-3 sm:w-4 h-3 sm:h-4 rounded-full ${
                isOpen ? 'bg-green-500' : 'bg-red-700'
              } border-2 border-yellow-400`}
            ></div>
          </motion.div>
          <span className="text-[#3A2F25] font-medium text-sm sm:text-base">
            {isOpen ? 'Der Salon ist geöffnet' : 'Der Salon ist geschlossen'}
          </span>
        </div>
      </div>

      {/* Rechte Seite: Google Map */}
      <div className="rounded-xl overflow-hidden shadow-lg w-full h-64 sm:h-80 md:h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.123456789!2d13.404954!3d52.520008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851d2b1a1f6d3%3A0xabcdef123456789!2sMusterstraße+10%2C+10115+Berlin!5e0!3m2!1sde!2sde!4v1690000000000!5m2!1sde!2sde"
          width="100%"
          height="100%"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen w-full font-sans relative bg-[#F5F0EC] text-[#3A2F25]">

      {/* Navigation */}
      <nav className="w-full flex flex-col sm:flex-row justify-between items-center px-4 sm:px-12 py-6 sticky top-0 z-50 bg-[#F5F0EC]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-wide mb-2 sm:mb-0">Lunera Beauty</h1>
        <div className="flex gap-6 sm:gap-8 text-[#3A2F25] font-light text-sm sm:text-base">
          <a href="/services" className="hover:text-[#D4AF37] transition">Services</a>
          <a href="/kontakt" className="hover:text-[#D4AF37] transition">Kontakt</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="w-full flex flex-col items-center text-center px-4 sm:px-6 pt-32 sm:pt-40 pb-32 sm:pb-40 relative bg-gradient-to-b from-[#F5F0EC] to-[#EDE6DF]">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-[5rem] font-serif font-bold text-[#3A2F25] leading-tight mb-4 sm:mb-6 tracking-tight"
        >
          Lunera Beauty
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-xl sm:max-w-2xl text-sm sm:text-lg md:text-xl font-light text-[#5C4B3E] mb-8 sm:mb-12"
        >
          Luxuriöse Beauty-Behandlungen – minimalistisch, elegant und zeitlos.
        </motion.p>
      </section>

      {/* Services Kurzübersicht */}
      <section className="w-full px-4 sm:px-6 lg:px-12 py-24">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center text-[#3A2F25] mb-12 sm:mb-16 tracking-tight">
          Unsere Services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {['Wimpernverlängerung', 'Nageldesign', 'Brows & Pflege'].map((service, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.03 }} className="p-6 sm:p-8 text-center bg-[#EDE6DF] rounded-xl shadow-lg">
              <h4 className="text-xl sm:text-2xl md:text-2xl font-serif font-semibold mb-2">{service}</h4>
              <p className="text-[#5C4B3E] font-light text-sm sm:text-base">Professionelle, luxuriöse Behandlungen für höchste Ansprüche.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Salon Status + Map */}
      <SalonStatusMap />

      {/* Footer */}
      <footer className="w-full py-12 sm:py-16 text-center text-[#5C4B3E] bg-[#EDE6DF] border-t border-[#D9CFC2] flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 items-center text-sm sm:text-base">
        <a href="/impressum" className="hover:text-[#D4AF37] transition">Impressum</a>
        <a href="/datenschutz" className="hover:text-[#D4AF37] transition">Datenschutzerklärung</a>
      </footer>

    </div>
  )
}
