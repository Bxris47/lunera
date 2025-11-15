'use client'

export default function TableCard({ title, data, type }) {
  return (
    <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-[#E5DED6]">
      <h3 className="text-2xl font-serif font-semibold mb-6">{title}</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="border-b border-[#E5DED6]">
                {type === "appointments" && (
                  <>
                    <td className="py-4">{item.name}</td>
                    <td>{item.service}</td>
                    <td>{item.time}</td>
                    <td className="capitalize">{item.status}</td>
                  </>
                )}

                {type === "customers" && (
                  <>
                    <td className="py-4">{item.name}</td>
                    <td>{item.visits} Besuche</td>
                    <td>Favorit: {item.fav}</td>
                  </>
                )}

                {type === "newsletter" && (
                  <>
                    <td className="py-4">{item.email}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
