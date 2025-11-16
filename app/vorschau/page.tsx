"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export default function VorschauPremium() {
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState<{ src: string }[]>([]);
  const [index, setIndex] = useState(0);

  const services = [
    {
      title: "Wimpernverlängerung",
      description:
        "Schöne Wimpern, die deinen Blick verfeinern: Von der natürlichen 1:1-Technik bis hin zu voluminösen Sets – dank innovativer UV-Technik besonders haltbar, leicht und perfekt auf dich abgestimmt.",
      images: ["/test1.jpg", "/test2.jpg", "/test3.jpg", "/test4.mp4"],
      points: ["1:1 Technik & Volumen", "Innovative UV-Technik", "Sehr leicht & schonend"],
    },
    {
      title: "Handpflege",
      description:
        "Sanfte Pflege für elegante Hände: Klassische Maniküre, hochwertiger UV-Lack oder stilvolle Nagelverlängerung für ein gepflegtes Ergebnis.",
      images: ["/test1.jpg", "/test2.jpg", "/test3.jpg", "/test4.mp4"],
      points: ["Klassische Maniküre", "UV-Lack", "Nagelverlängerung"],
    },
    {
      title: "Fußpflege",
      description:
        "Wohlfühlpflege für deine Füße: Sanfte Behandlung für entspannte und gepflegte Füße. Optional mit UV-Lack.",
      images: ["/test1.jpg", "/test2.jpg", "/test3.jpg", "/test4.mp4"],
      points: ["Sanfte Pflege", "Entspannung", "UV-Lack optional"],
    },
    {
      title: "Augenpaket",
      description:
        "Strahlend schöne Augen: Wimpern & Augenbrauen färben + Formen für einen starken, gepflegten Look.",
      images: ["/test1.jpg", "/test2.jpg", "/test3.jpg", "/test4.mp4"],
      points: ["Wimpern färben", "Augenbrauen färben", "Augenbrauen formen"],
    },
  ];

  const openGallery = (images: string[], i: number) => {
    setSlides(images.map((s) => ({ src: s })));
    setIndex(i);
    setOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-white text-[#1A1A1A]">

      {/* HEADER NAVIGATION */}
      <header className="w-full pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
          
          {/* NAVIGATION */}
          <nav className="flex items-center gap-4 text-lg font-medium text-[#1A1A1A] tracking-wide">

            <a href="/" className="hover:text-[#D4AF37] transition">Home</a>

            <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>

            <a href="/termin" className="hover:text-[#D4AF37] transition">
              Termin buchen
            </a>

            <span className="w-2 h-2 bg-[#D4AF37] rounded-full"></span>

            <a href="/vorschau" className="text-[#D4AF37] font-semibold">
              Vorschau
            </a>

          </nav>
        </div>
      </header>
      
      {/* Title */}
      <section className="pt-6 pb-10">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">Service Vorschau</h1>
          <p className="mt-3 text-lg text-[#5A5A5A]">
            Entdecke unsere hochwertigen Beauty-Behandlungen im Detail.
          </p>
        </div>
      </section>

      {/* Services */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 pb-20 space-y-24">

          {services.map((s, idx) => (
            <section key={idx} className="flex flex-col md:flex-row md:items-center gap-10">

              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">{s.title}</h2>
                <p className="text-[#444] leading-relaxed mb-6">{s.description}</p>

                <ul className="flex flex-col gap-2">
                  {s.points.map((p, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* IMAGES */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <div className="rounded-2xl overflow-hidden shadow-xl border border-[#EFECEC]">

                  <Swiper
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className="w-full"
                    slidesPerView={1}
                    spaceBetween={12}
                  >
                    {s.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <div
                          className="relative w-full h-[330px] sm:h-[400px] cursor-zoom-in"
                          onClick={() => openGallery(s.images, i)}
                        >
                          <Image
                            src={img}
                            alt={`${s.title} ${i + 1}`}
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                </div>
              </motion.div>

            </section>
          ))}

        </div>
      </main>

      {/* Lightbox */}
      <Lightbox open={open} close={() => setOpen(false)} slides={slides} index={index} plugins={[Zoom]} />

      {/* Footer */}
      <footer className="bg-[#FAFAFA] border-t border-[#EEE]">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center text-[#6E6E6E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Lunera Beauty</div>
          <div className="flex gap-6">
            <a href="/impressum" className="hover:text-[#1A1A1A]">Impressum</a>
            <a href="/datenschutz" className="hover:text-[#1A1A1A]">Datenschutz</a>
          </div>
        </div>
      </footer>

      {/* Swiper style overrides */}
      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          background: #D4AF37 !important;
          opacity: 0.4 !important;
          width: 9px; height: 9px;
        }
        :global(.swiper-pagination-bullet-active) {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
