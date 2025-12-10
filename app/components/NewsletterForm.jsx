"use client";
import { useState } from "react";

export default function NewsletterForm({ onDone }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setSent(true);

    // Popup schließen
    setTimeout(() => {
      onDone?.();
    }, 1200);
  };

  return !sent ? (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button
        type="submit"
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition"
      >
        Anmelden
      </button>
    </form>
  ) : (
    <div className="p-3 bg-green-50 border border-green-200 text-center rounded-lg">
      🎉 Erfolgreich angemeldet!
    </div>
  );
}
