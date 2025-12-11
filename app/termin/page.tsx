"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, MessageCircle } from "lucide-react";

export default function TerminPage() {
  const contacts = [
    {
      title: "WhatsApp",
      text: "Jetzt per WhatsApp schreiben",
      icon: <MessageCircle className="w-7 h-7" />,
      href: "https://wa.me/49123456789",
      color: "#25D366",
    },
    {
      title: "Instagram",
      text: "@lunera_beauty",
      icon: <Instagram className="w-7 h-7" />,
      href: "https://instagram.com/",
      color: "#D62976",
    },
    {
      title: "TikTok",
      text: "@lunera",
      icon: "/tiktok.png", // Aus public-Ordner
      href: "https://tiktok.com/@lunera",
      color: "#000000",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white text-[#111]">

      {/* HEADER */}
      <header className="w-full pt-10 pb-8 bg-white/70 backdrop-blur-xl border-b border-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
          <Image src="/lunera-logo.png" width={120} height={120} alt="Lunera Beauty" />

          <nav className="flex items-center gap-4 text-lg font-medium text-[#1A1A1A] tracking-wide whitespace-nowrap">
            <a href="/" className="hover:text-[#D4AF37] transition">Home</a>
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
            <a href="/termin" className="text-[#D4AF37] font-semibold">Termin buchen</a>
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
            <a href="/vorschau" className="hover:text-[#D4AF37] transition">Vorschau</a>
          </nav>
        </div>
      </header>

      {/* TITLE */}
      <section className="px-6 pt-20 pb-6">
        <h1 className="text-center text-5xl font-serif font-bold text-[#111] mb-6">
          Kontakt & Termin-Anfrage
        </h1>
        <p className="text-center text-lg text-[#444] max-w-xl mx-auto font-light">
          Du möchtest einen Termin vereinbaren?  
          Wähle einfach einen unserer Kontaktwege — wir melden uns schnellstmöglich bei dir.
        </p>
      </section>

      {/* CONTACT BUTTON GRID */}
      <motion.section
        className="max-w-5xl mx-auto px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {contacts.map((c, i) => (
            <motion.a
              key={i}
              href={c.href}
              target="_blank"
              variants={itemVariants}
              whileHover={{
                scale: 1.08,
                rotate: 2,
                boxShadow: "0px 20px 30px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-8 rounded-3xl border border-[#ECECEC] bg-white flex flex-col items-center text-center gap-4 cursor-pointer"
            >
              <motion.div
                className="w-16 h-16 flex items-center justify-center rounded-full text-white"
                style={{ backgroundColor: c.color }}
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {typeof c.icon === "string" ? (
                  <Image src={c.icon} width={32} height={32} alt={c.title} />
                ) : (
                  c.icon
                )}
              </motion.div>

              <h3 className="text-xl font-serif font-semibold">{c.title}</h3>
              <p className="text-[#555] text-lg font-light">{c.text}</p>
            </motion.a>
          ))}
        </div>
      </motion.section>

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
