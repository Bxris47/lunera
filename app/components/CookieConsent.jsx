"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getCookie, setCookie } from "cookies-next";

export default function CookieConsent({ onAccept }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = getCookie("cookiesAccepted") === "true";
    if (!accepted) setVisible(true);
  }, []);

  const handleAccept = () => {
    setCookie("cookiesAccepted", "true", { path: "/" });
    setVisible(false);
    if (onAccept) onAccept();
  };

  const handleDecline = () => {
    setCookie("cookiesAccepted", "false", { path: "/" });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] sm:w-[500px] 
          bg-white border border-[#e5e5e5] shadow-xl rounded-2xl p-6 z-[9999]"
        >
          <h4 className="text-xl font-serif font-semibold text-[#111] mb-2">
            Cookies & Datenschutz
          </h4>

          <p className="text-[#555] font-light leading-relaxed mb-5">
            Wir verwenden Cookies, um unsere Website zu verbessern. 
            Mit einem Klick auf „Akzeptieren“ stimmst du der Nutzung zu.
          </p>

          <div className="flex justify-end gap-4">
            <button
              onClick={handleDecline}
              className="px-4 py-2 rounded-xl border border-[#ddd] hover:bg-[#f8f8f8] transition"
            >
              Ablehnen
            </button>

            <button
              onClick={handleAccept}
              className="px-5 py-2 rounded-xl bg-[#D4AF37] text-white font-medium hover:opacity-90 transition"
            >
              Akzeptieren
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
