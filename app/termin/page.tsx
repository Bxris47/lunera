"use client";

<<<<<<< HEAD
import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, MessageCircle } from "lucide-react";

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
      icon: "/tiktok.png", // <-- Aus dem public-Ordner
      href: "https://tiktok.com/@lunera",
      color: "#000000",
    },
  ];

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
=======
import type { JSX } from "react";
import React, { useState } from "react";
import { motion } from "framer-motion";
// Image optional falls du später Logo willst
import Image from "next/image";

type ApiResponse = { ok: boolean; message?: string };

export default function TerminPage(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const formDataObj: Record<string, string> = {};
    fd.forEach((value, key) => {
      if (typeof value === "string") formDataObj[key] = value;
    });

    if (formDataObj.honey) {
      console.log("Bot detected.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/termin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataObj),
      });

      const data = (await res.json()) as ApiResponse;

      setLoading(false);

      if (data.ok) {
        setSuccess(true);
        form.reset();
      } else {
        setError(data.message ?? "Etwas ist schiefgelaufen.");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Netzwerkfehler. Bitte versuche es später erneut.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">

      {/* ------------------------------------------------ */}
      {/* PREMIUM HEADER – wie auf deiner Startseite */}
      {/* ------------------------------------------------ */}
      <header className="w-full pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
          <nav className="flex items-center gap-4 text-lg font-medium text-[#1A1A1A] tracking-wide">
            
            <a href="/" className="hover:text-[#D4AF37] transition">Home</a>

            <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>

            <a href="/termin" className="text-[#D4AF37] font-semibold">
              Termin buchen
            </a>

            <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>

            <a href="/vorschau" className="hover:text-[#D4AF37] transition">
              Vorschau
            </a>

>>>>>>> 0fd74bbe3167266fff43d62984a98d9114d742cc
          </nav>
        </div>
      </header>

<<<<<<< HEAD
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
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {contacts.map((c, i) => (
            <motion.a
              href={c.href}
              key={i}
              target="_blank"
              whileHover={{ scale: 1.04 }}
              className="p-8 rounded-3xl border border-[#ECECEC] shadow-md hover:shadow-xl bg-white flex flex-col items-center text-center gap-4 transition-all"
            >
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full text-white"
                style={{ backgroundColor: c.color }}
              >
                {typeof c.icon === "string" ? (
                  <Image src={c.icon} width={32} height={32} alt={c.title} />
                ) : (
                  c.icon
                )}
              </div>

              <h3 className="text-xl font-serif font-semibold">{c.title}</h3>
              <p className="text-[#555] text-lg font-light">{c.text}</p>
            </motion.a>
          ))}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#FAFAFA] border-t border-[#EEE] mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center text-[#6E6E6E] flex flex-col sm:flex-row justify-between items-center gap-4">
=======


      {/* ------------------------------------------------ */}
      {/* TITEL */}
      {/* ------------------------------------------------ */}
      <section className="px-6 pt-20 pb-10">
        <h1 className="text-center text-4xl md:text-5xl font-serif font-bold mb-12 text-[#111]">
          Termin buchen
        </h1>
      </section>



      {/* ------------------------------------------------ */}
      {/* TERMIN FORMULAR */}
      {/* ------------------------------------------------ */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto flex flex-col gap-6 bg-[#FAFAFA] p-8 md:p-10 rounded-3xl border border-[#EEE] shadow-md mb-20"
      >
        {/* Honeypot */}
        <input type="text" name="honey" className="hidden" tabIndex={-1} />

        {/* Name */}
        <label className="flex flex-col gap-2">
          <span className="text-lg font-medium">Name *</span>
          <input
            name="name"
            required
            className="border border-[#DDD] rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#D4AF37] transition"
            placeholder="Dein Name"
          />
        </label>

        {/* Email */}
        <label className="flex flex-col gap-2">
          <span className="text-lg font-medium">E-Mail *</span>
          <input
            name="email"
            type="email"
            required
            className="border border-[#DDD] rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#D4AF37] transition"
            placeholder="deine@email.de"
          />
        </label>

        {/* Datum */}
        <label className="flex flex-col gap-2">
          <span className="text-lg font-medium">Datum *</span>
          <input
            name="date"
            type="date"
            required
            className="border border-[#DDD] rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#D4AF37] transition"
          />
        </label>

        {/* Zeit */}
        <label className="flex flex-col gap-2">
          <span className="text-lg font-medium">Uhrzeit *</span>
          <input
            name="time"
            type="time"
            required
            className="border border-[#DDD] rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#D4AF37] transition"
          />
        </label>

        {/* Nachricht */}
        <label className="flex flex-col gap-2">
          <span className="text-lg font-medium">Nachricht (optional)</span>
          <textarea
            name="message"
            className="border border-[#DDD] rounded-xl px-4 py-3 text-lg min-h-[120px] focus:outline-none focus:border-[#D4AF37] transition"
            placeholder="Optional: Wünsche oder Besonderheiten"
          />
        </label>

        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="mt-2 bg-[#D4AF37] text-white py-3 text-lg rounded-xl font-medium shadow-md hover:bg-[#C19A2E] transition disabled:opacity-50"
        >
          {loading ? "Senden..." : "Termin anfragen"}
        </motion.button>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 text-center font-medium"
          >
            Deine Anfrage wurde gesendet! Wir melden uns bald.
          </motion.p>
        )}
      </form>



      {/* ------------------------------------------------ */}
      {/* PREMIUM FOOTER – wie Startseite */}
      {/* ------------------------------------------------ */}
      <footer className="bg-[#FAFAFA] border-t border-[#EEE]">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center text-[#6E6E6E] flex flex-col sm:flex-row items-center justify-between gap-4">
>>>>>>> 0fd74bbe3167266fff43d62984a98d9114d742cc
          <div>© {new Date().getFullYear()} Lunera Beauty</div>
          <div className="flex gap-6">
            <a href="/impressum" className="hover:text-[#1A1A1A]">Impressum</a>
            <a href="/datenschutz" className="hover:text-[#1A1A1A]">Datenschutz</a>
<<<<<<< HEAD
            <a href="/preisliste" className="hover:text-[#1A1A1A]">Preisliste</a>
=======
>>>>>>> 0fd74bbe3167266fff43d62984a98d9114d742cc
          </div>
        </div>
      </footer>

    </div>
  );
}
