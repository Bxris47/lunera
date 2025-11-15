import React, { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Danke, ${email} wurde zum Newsletter hinzugefügt!`)
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4AF37]" required />
      <button type="submit" className="mt-2 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition shadow-sm">Anmelden</button>
    </form>
  )
}
