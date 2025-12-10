import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import NewsletterForm from "./NewsletterForm"

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 bg-white/90 backdrop-blur-md rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-8 w-80 max-w-full z-50 border border-[#D4AF37]"
        >
          <button
            onClick={() => setVisible(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl"
          >
            ×
          </button>

          <h3 className="text-xl md:text-2xl font-serif font-semibold mb-3">
            Newsletter
          </h3>

          <p className="text-gray-600 font-light mb-4">
            Bleibe informiert über exklusive Angebote.
          </p>

          <NewsletterForm onDone={() => setVisible(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
