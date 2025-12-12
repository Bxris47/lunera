export async function sendVisit({ page = "unknown", role = "guest" } = {}) {
  try {
    let ip = "unknown"
    let country = "unknown"

    if (typeof window !== "undefined") {
      country = navigator.language?.slice(-2) || "unknown"
    }

    const res = await fetch("/api/admin/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page, role, ip, country }),
    })

    if (!res.ok) {
      console.error("sendVisit Fehler:", await res.text())
    }
  } catch (err) {
    console.error("sendVisit Exception:", err)
  }
}
