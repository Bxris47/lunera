
"use client"
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
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  const services = [
    {
      title: "Wimpernverlängerung",
      description:
        "Schöne Wimpern, die deinen Blick verfeinern – von 1:1 bis Volumen, mit moderner UV-Technik für lange Haltbarkeit.",
      images: ["/test1.jpg", "/test2.jpg", "/test3.jpg", "/test4.mp4"],
      points: ["1:1 Technik & Volumen", "Innovative UV-Technik", "Sehr leicht & schonend"],
    },
    {
      title: "Handpflege",
      description:
        "Elegante, gepflegte Hände durch klassische Maniküre, UV-Lack oder hochwertige Nagelverlängerung.",
      images: ["/test1.jpg", "/test2.jpg", "/test3.jpg", "/test4.mp4"],
      points: ["Klassische Maniküre", "UV-Lack", "Nagelverlängerung"],
    },
    {
      title: "Fußpflege",
      description:
        "Entspannung & Pflege für schöne, gepflegte Füße. Optional mit UV-Lack.",
      images: ["/test1.jpg", "/test2.jpg", "/test3.jpg", "/test4.mp4"],
      points: ["Sanfte Pflege", "Entspannung", "UV-Lack optional"],
    },
    {
      title: "Augenpaket",
      description:
        "Wimpern & Augenbrauen färben + Formen für einen ausdrucksstarken Look.",
      images: ["/test1.jpg", "/test2.jpg", "/test3.jpg", "/test4.mp4"],
      points: ["Wimpern färben", "Augenbrauen färben", "Augenbrauen formen"],
    },
  ];

  const openGallery = (images: any, i: any) => {
    setSlides(images.map((src: any) => ({ src })));
    setIndex(i);
    setOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-white text-[#1A1A1A]">
      {/* HEADER */}
      <header className="w-full pt-10 pb-8 bg-white/70 backdrop-blur-xl border-b border-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
          <Image src="/lunera-logo.png" width={120} height={120} alt="Lunera Beauty" />

          <nav className="flex items-center gap-4 text-lg font-medium text-[#1A1A1A] tracking-wide whitespace-nowrap">
            <a href="/" className="hover:text-[#D4AF37] transition">Home</a>
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
            <a href="/termin" className="hover:text-[#D4AF37] transition">Termin buchen</a>
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
            <a href="/vorschau" className="text-[#D4AF37] transition">Vorschau</a>
          </nav>
        </div>
      </header>

      {/* TITLE */}
      <section className="pt-6 pb-10 text-center px-6">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold">Service Vorschau</h1>
        <p className="mt-3 text-lg text-[#5A5A5A]">Entdecke unsere hochwertigen Beauty-Behandlungen.</p>
      </section>

      {/* SERVICES */}
      <main className="max-w-6xl mx-auto px-6 pb-20 space-y-24">
        {services.map((s, idx) => (
          <section key={idx} className="flex flex-col md:flex-row gap-10">
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
                <Swiper pagination={{ clickable: true }} modules={[Pagination]} slidesPerView={1} spaceBetween={12}>
                  {s.images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <div
                        className="relative w-full h-[330px] sm:h-[400px] md:h-[420px] cursor-zoom-in overflow-hidden"
                        onClick={() => openGallery(s.images, i)}
                      >
                        {img.endsWith(".mp4") ? (
                          <video className="w-full h-full object-cover" src={img} autoPlay muted loop playsInline />
                        ) : (
                          <Image src={img} alt={`${s.title} ${i + 1}`} fill sizes="100vw" className="object-cover" />
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>
          </section>
        ))}
      </main>

      {/* LIGHTBOX */}
      <Lightbox open={open} close={() => setOpen(false)} slides={slides} index={index} plugins={[Zoom]} />

      {/* FOOTER */}
      <footer className="bg-[#FAFAFA] border-t border-[#EEE] mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center text-[#6E6E6E] flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} Lunera Beauty</div>
          <div className="flex gap-6">
            <a href="/impressum" className="hover:text-[#1A1A1A]">Impressum</a>
            <a href="/datenschutz" className="hover:text-[#1A1A1A]">Datenschutz</a>
            <a href="/preisliste" className="hover:text-[#1A1A1A]">Preisliste</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        :global(.swiper-pagination-bullet) {
          background: #D4AF37 !important;
          opacity: 0.4 !important;
          width: 9px;
          height: 9px;
        }
        :global(.swiper-pagination-bullet-active) {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
