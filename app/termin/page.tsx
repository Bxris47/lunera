"use client";

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

          </nav>
        </div>
      </header>



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
