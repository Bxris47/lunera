'use client'
import { motion } from 'framer-motion'

export default function KpiCard({ label, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-[#E5DED6]"
    >
      <p className="text-lg text-[#6C5F53] mb-2">{label}</p>
      <h3 className="text-5xl font-bold text-[#3A2F25]">{value}</h3>
    </motion.div>
  )
}
