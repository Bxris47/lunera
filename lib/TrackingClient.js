const ENDPOINT = "/api/admin/analytics"
export async function sendVisit({ page, role = "guest", meta = {} } = {}) {
  try {
    const finalPage =
      page ||
      (typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : "unknown")

    const payload = {
      page: finalPage,
      role,
      // "so" (optional): referrer, language, viewport, timezone, etc.
      meta: {
        referrer: typeof document !== "undefined" ? document.referrer || "" : "",
        language:
          typeof navigator !== "undefined" ? navigator.language || "" : "",
        tz:
          typeof Intl !== "undefined"
            ? Intl.DateTimeFormat().resolvedOptions().timeZone || ""
            : "",
        viewport:
          typeof window !== "undefined"
            ? { w: window.innerWidth, h: window.innerHeight }
            : null,
        ...meta,
      },
    }

    // sendBeacon ist beim Unload / Tab close am zuverlässigsten
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const ok = navigator.sendBeacon(
        ENDPOINT,
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      )
      if (ok) return
      // falls sendBeacon fehlschlägt: fallback auf fetch
    }

    // fetch fallback mit keepalive + Timeout
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null
    const timeoutId = controller ? setTimeout(() => controller.abort(), 4000) : null

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
      signal: controller?.signal,
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      console.error("sendVisit Fehler:", res.status, text)
    }

    if (timeoutId) clearTimeout(timeoutId)
  } catch (err) {
    // Abort nicht als Fehler loggen
    if (err && err.name === "AbortError") return
    console.error("sendVisit Exception:", err)
  }
}

/**
 * Optionaler Helper: trackt automatisch "page views" bei History-Änderungen (SPA).
 * Call z.B. einmal in deinem App-Entry.
 */
export function initPageTracking({ role = "guest", extraMeta = {} } = {}) {
  if (typeof window === "undefined") return () => {}

  let last = window.location.pathname + window.location.search

  const fire = () => {
    const current = window.location.pathname + window.location.search
    if (current === last) return
    last = current
    sendVisit({ page: current, role, meta: extraMeta })
  }

  // back/forward
  window.addEventListener("popstate", fire)

  // pushState/replaceState hooken (für SPA router ohne popstate)
  const { pushState, replaceState } = window.history
  window.history.pushState = function (...args) {
    const ret = pushState.apply(this, args)
    queueMicrotask(fire)
    return ret
  }
  window.history.replaceState = function (...args) {
    const ret = replaceState.apply(this, args)
    queueMicrotask(fire)
    return ret
  }

  // initial
  sendVisit({ page: last, role, meta: extraMeta })

  // cleanup
  return () => {
    window.removeEventListener("popstate", fire)
    window.history.pushState = pushState
    window.history.replaceState = replaceState
  }
}
