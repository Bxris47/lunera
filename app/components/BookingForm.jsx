import React, { useState } from 'react'

export default function BookingForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Danke ${name}, dein Termin wurde gebucht!`)
    setName(''); setEmail(''); setDate('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37]" required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37]" required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37]" required />
      <button type="submit" className="mt-4 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition shadow-sm">Buchen</button>
    </form>
  )
}
