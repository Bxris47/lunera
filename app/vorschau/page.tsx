"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, A11y, Keyboard } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import { motion, type Variants } from "framer-motion"

import Lightbox from "yet-another-react-lightbox"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Video from "yet-another-react-lightbox/plugins/video"
import "yet-another-react-lightbox/styles.css"

import { Sparkles, ShieldCheck, Play, Menu, X, ArrowRight } from "lucide-react"

type MediaItem = { src: string; type?: "image" | "video" }

type Service = {
  title: string
  description: string
  media: MediaItem[]
  points: string[]
  accent?: "warm" | "neutral"
}

const textVariant: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const mediaVariant: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
}

const BRAND = {
  name: "Lunera Beauty",
  logoSrc: "/lunera-logo.png",
  city: "49477 Ibbenbüren"
} as const

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function isVideo(src: string) {
  return src.toLowerCase().endsWith(".mp4")
}

function toLightboxSlides(media: MediaItem[]) {
  return media.map((m) => {
    if (m.type === "video" || isVideo(m.src)) {
      return { type: "video", sources: [{ src: m.src, type: "video/mp4" }] }
    }
    return { src: m.src }
  })
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#EEE] bg-white px-3 py-1 text-xs font-semibold text-[#111] shadow-sm">
      {children}
    </span>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={cn("sm:hidden fixed inset-0 z-50 transition", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
    >
      <div
        className={cn("absolute inset-0 bg-black/30 transition-opacity", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white border-l border-[#EEE] shadow-xl transition-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-5 border-b border-[#F0F0F0] flex items-center justify-between">
          <div className="text-sm font-semibold">{BRAND.name}</div>
          <button onClick={onClose} className="p-2 rounded-xl border border-[#EEE] bg-white" aria-label="Menü schließen">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-5 flex flex-col gap-3 text-sm font-medium">
          <Link href="/" className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA]" onClick={onClose}>
            Home
          </Link>
          <Link href="/vorschau" className="rounded-2xl border border-[#111] p-4 bg-[#111] text-white" onClick={onClose}>
            Vorschau
          </Link>
          <Link href="/preisliste" className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA]" onClick={onClose}>
            Preisliste
          </Link>
          <Link href="/termin" className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA]" onClick={onClose}>
            Termin
          </Link>

          <div className="mt-2 h-px w-full bg-[#F2F2F2]" />

          <Link href="/impressum" className="rounded-2xl border border-[#EEE] p-4 bg-[#FAFAFA]" onClick={onClose}>
            Impressum
          </Link>
          <Link href="/datenschutz" className="rounded-2xl border border-[#EEE] p-4 hover:bg-[#FAFAFA]" onClick={onClose}>
            Datenschutz
          </Link>
        </nav>
      </div>
    </div>
  )
}

function ServiceCard({
  service,
  idx,
  onOpen
}: {
  service: Service
  idx: number
  onOpen: (media: MediaItem[], startIndex: number) => void
}) {
  const bg =
    service.accent === "warm"
      ? "bg-gradient-to-b from-[#FFFDF8] to-white"
      : "bg-gradient-to-b from-[#FAFAFA] to-white"

  return (
    <motion.section
      className={cn(
        "rounded-3xl border border-[#EEE]",
        bg,
        "shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="p-5 sm:p-8 md:p-10">
        <div className="flex flex-col lg:flex-row gap-7 sm:gap-10 items-stretch">
          {/* TEXT */}
          <motion.div variants={textVariant} className={cn("lg:w-[46%]", idx % 2 === 1 && "lg:order-2")}>
            <div className="flex flex-wrap items-center gap-2">
              <Pill>
                <Sparkles className="h-3.5 w-3.5" />
                Premium
              </Pill>
              <Pill>
                <ShieldCheck className="h-3.5 w-3.5" />
                Clean Finish
              </Pill>
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#111]">
              {service.title}
            </h2>

            <p className="mt-3 text-[15px] sm:text-base text-[#555] leading-relaxed">{service.description}</p>

            <ul className="mt-6 space-y-3">
              {service.points.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] sm:text-base text-[#333]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]" aria-hidden />
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/termin"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#111] bg-[#111] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
              >
                Termin anfragen <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="text-xs text-[#777] sm:self-center">Tipp: Tippe auf ein Bild/Video, um es groß zu öffnen.</div>
            </div>
          </motion.div>

          {/* MEDIA */}
          <motion.div variants={mediaVariant} className="lg:w-[54%]">
            <div className="rounded-3xl overflow-hidden border border-[#EFECEC] bg-white shadow-sm">
              <Swiper
                modules={[Pagination, A11y, Keyboard]}
                slidesPerView={1}
                spaceBetween={12}
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                className="w-full"
              >
                {service.media.map((m, i) => {
                  const video = m.type === "video" || isVideo(m.src)
                  return (
                    <SwiperSlide key={m.src + i}>
                      <button
                        type="button"
                        onClick={() => onOpen(service.media, i)}
                        className="group relative w-full h-[300px] sm:h-[420px] md:h-[460px] cursor-zoom-in overflow-hidden focus:outline-none"
                        aria-label={`${service.title} Medien ${i + 1} öffnen`}
                      >
                        <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.25 }} className="absolute inset-0">
                          {video ? (
                            <video
                              className="w-full h-full object-cover"
                              src={m.src}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                            />
                          ) : (
                            <Image
                              src={m.src}
                              alt={`${service.title} ${i + 1}`}
                              fill
                              sizes="(max-width: 1024px) 100vw, 54vw"
                              className="object-cover"
                              priority={idx === 0 && i === 0}
                            />
                          )}
                        </motion.div>

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

                        {video && (
                          <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-semibold text-[#111] border border-white/60">
                            <Play className="h-3.5 w-3.5" />
                            Video
                          </div>
                        )}

                        <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-semibold text-[#111] border border-white/60 opacity-0 group-hover:opacity-100 transition">
                          Öffnen
                        </div>
                      </button>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default function VorschauPremium() {
  const [lbOpen, setLbOpen] = useState(false)
  const [slides, setSlides] = useState<any[]>([])
  const [index, setIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const services: Service[] = useMemo(
    () => [
      {
        title: "Wimpernverlängerung",
        description: "Schöne Wimpern, die deinen Blick verfeinern – von 1:1 bis Volumen.",
        media: [
          { src: "/test1.jpg", type: "image" },
          { src: "/test2.jpg", type: "image" },
          { src: "/test3.jpg", type: "image" },
          { src: "/test4.mp4", type: "video" }
        ],
        points: ["1:1 Technik & Volumen", "Innovative UV-Technik", "Sehr leicht & schonend"],
        accent: "warm"
      },
      {
        title: "Handpflege",
        description: "Elegante, gepflegte Hände durch Maniküre oder Nagelverlängerung.",
        media: [
          { src: "/test1.jpg", type: "image" },
          { src: "/test2.jpg", type: "image" },
          { src: "/test3.jpg", type: "image" },
          { src: "/test4.mp4", type: "video" }
        ],
        points: ["Klassische Maniküre", "UV-Lack", "Nagelverlängerung"],
        accent: "neutral"
      },
      {
        title: "Fußpflege",
        description: "Entspannung & Pflege für schöne, gepflegte Füße.",
        media: [
          { src: "/test1.jpg", type: "image" },
          { src: "/test2.jpg", type: "image" },
          { src: "/test3.jpg", type: "image" },
          { src: "/test4.mp4", type: "video" }
        ],
        points: ["Sanfte Pflege", "Entspannung", "UV-Lack optional"],
        accent: "warm"
      },
      {
        title: "Augenpaket",
        description: "Wimpern & Augenbrauen färben + Formen für einen ausdrucksstarken Look.",
        media: [
          { src: "/test1.jpg", type: "image" },
          { src: "/test2.jpg", type: "image" },
          { src: "/test3.jpg", type: "image" },
          { src: "/test4.mp4", type: "video" }
        ],
        points: ["Wimpern färben", "Augenbrauen färben", "Augenbrauen formen"],
        accent: "neutral"
      }
    ],
    []
  )

  const openGallery = (media: MediaItem[], startIndex: number) => {
    setSlides(toLightboxSlides(media))
    setIndex(startIndex)
    setLbOpen(true)
  }

  return (
    <div className="min-h-screen w-full bg-white text-[#111]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <Image src={BRAND.logoSrc} width={40} height={40} alt={BRAND.name} className="opacity-95" priority />
            <div className="leading-tight min-w-0">
              <div className="text-sm font-semibold tracking-wide truncate">{BRAND.name}</div>
              <div className="text-xs text-[#666] truncate">Service Vorschau</div>
            </div>
          </Link>

          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-[#1A1A1A]">
            <Link href="/" className="hover:text-[#D4AF37] transition">
              Home
            </Link>
            <Link href="/vorschau" className="text-[#D4AF37] font-semibold">
              Vorschau
            </Link>
            <Link href="/preisliste" className="hover:text-[#D4AF37] transition">
              Preisliste
            </Link>
            <Link href="/termin" className="hover:text-[#D4AF37] transition">
              Termin
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="sm:hidden inline-flex items-center justify-center rounded-2xl border border-[#EEE] bg-white p-2.5"
            aria-label="Menü öffnen"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link
            href="/termin"
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-[#EEE] bg-white px-4 py-2 text-sm font-semibold text-[#111] hover:bg-[#FAFAFA] transition"
          >
            Termin
          </Link>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* TITLE */}
      <section className="px-4 sm:px-6 pt-10 sm:pt-14 pb-8 sm:pb-10 bg-gradient-to-b from-white to-[#F6F6F6]">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.12, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mx-auto mb-5 sm:mb-6 h-1 w-32 sm:w-40 rounded-full bg-gradient-to-r from-[#D4AF37] to-transparent"
          />

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-[34px] leading-[1.08] sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-[#111]"
          >
            Service Vorschau
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="mt-4 text-[15px] sm:text-lg text-[#666] max-w-2xl mx-auto font-light leading-relaxed"
          >
            Klar, elegant und auf dich abgestimmt – für Ergebnisse, die man sofort sieht.
          </motion.p>
        </div>
      </section>

      {/* SERVICES */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 space-y-8 sm:space-y-12 mt-8 sm:mt-10">
        {services.map((s, idx) => (
          <ServiceCard key={s.title} service={s} idx={idx} onOpen={openGallery} />
        ))}
      </main>

      {/* LIGHTBOX */}
      <Lightbox open={lbOpen} close={() => setLbOpen(false)} slides={slides} index={index} plugins={[Zoom, Video]} />

      {/* FOOTER */}
      <footer className="bg-[#FAFAFA] border-t border-[#EEE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[#6E6E6E]">
          <div className="text-sm">© {new Date().getFullYear()} {BRAND.name}</div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
            <Link href="/impressum" className="hover:text-[#1A1A1A]">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-[#1A1A1A]">Datenschutz</Link>
            <Link href="/preisliste" className="hover:text-[#1A1A1A]">Preisliste</Link>
          </div>
        </div>
      </footer>

      {/* Swiper bullets */}
      <style jsx>{`
        :global(.swiper-pagination) {
          bottom: 14px !important;
        }
        :global(.swiper-pagination-bullet) {
          background: #d4af37 !important;
          opacity: 0.28 !important;
          width: 10px;
          height: 10px;
          transition: all 0.25s;
        }
        :global(.swiper-pagination-bullet-active) {
          opacity: 1 !important;
          transform: scale(1.25);
        }
      `}</style>
    </div>
  )
}
