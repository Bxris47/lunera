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
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  const services = [
    {
      title: "Wimpernverlängerung",
      description: "Schöne Wimpern, die deinen Blick verfeinern – von 1:1 bis Volumen.",
      images: ["/test1.jpg", "/test2.jpg", "/test3.jpg", "/test4.mp4"],
      points: ["1:1 Technik & Volumen", "Innovative UV-Technik", "Sehr leicht & schonend"],
    },
    {
      title: "Handpflege",
      description: "Elegante, gepflegte Hände durch Maniküre oder Nagelverlängerung.",
      images: ["/test1.jpg", "/test2.jpg", "/test3.jpg", "/test4.mp4"],
      points: ["Klassische Maniküre", "UV-Lack", "Nagelverlängerung"],
    },
    {
      title: "Fußpflege",
      description: "Entspannung & Pflege für schöne, gepflegte Füße.",
      images: ["/test1.jpg", "/test2.jpg", "/test3.jpg", "/test4.mp4"],
      points: ["Sanfte Pflege", "Entspannung", "UV-Lack optional"],
    },
    {
      title: "Augenpaket",
      description: "Wimpern & Augenbrauen färben + Formen für einen ausdrucksstarken Look.",
      images: ["/test1.jpg", "/test2.jpg", "/test3.jpg", "/test4.mp4"],
      points: ["Wimpern färben", "Augenbrauen färben", "Augenbrauen formen"],
    },
  ];

  const openGallery = (images: any, i: any) => {
    setSlides(images.map((src: any) => ({ src })));
    setIndex(i);
    setOpen(true);
  };

  const textVariant = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };
  const imageVariant = { hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } } };

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
      <section className="pt-6 pb-10 text-center px-6 relative overflow-hidden">
        {/* Dekoratives Element */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#111] tracking-tight"
        >
          Service Vorschau
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mt-4 text-lg sm:text-xl text-[#5A5A5A] max-w-2xl mx-auto font-light"
        >
          Entdecke unsere hochwertigen Beauty-Behandlungen und lasse dich inspirieren.  
          Jede Behandlung ist auf deine Schönheit abgestimmt.
        </motion.p>
      </section>


      {/* SERVICES */}
      <main className="max-w-6xl mx-auto px-6 pb-20 space-y-16">
        {services.map((s, idx) => (
          <motion.section
            key={idx}
            className={`flex flex-col md:flex-row gap-10 p-8 rounded-2xl shadow-lg border border-[#EEE] ${idx % 2 === 0 ? "bg-[#FFFDF8]" : "bg-[#FAFAFA]"}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >

            {/* TEXT */}
            <motion.div
              variants={textVariant}
              className={`md:w-1/2 ${idx % 2 === 1 ? "md:order-2" : ""}`}
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
              variants={imageVariant}
              className="md:w-1/2"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[#EFECEC] hover:shadow-2xl transition-shadow duration-300">
                <Swiper pagination={{ clickable: true }} modules={[Pagination]} slidesPerView={1} spaceBetween={12}>
                  {s.images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <motion.div
                        className="relative w-full h-[330px] sm:h-[400px] md:h-[420px] cursor-zoom-in overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => openGallery(s.images, i)}
                      >
                        {img.endsWith(".mp4") ? (
                          <video className="w-full h-full object-cover" src={img} autoPlay muted loop playsInline />
                        ) : (
                          <Image src={img} alt={`${s.title} ${i + 1}`} fill sizes="100vw" className="object-cover" />
                        )}
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>
          </motion.section>
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
          width: 10px;
          height: 10px;
          transition: all 0.3s;
        }
        :global(.swiper-pagination-bullet-active) {
          opacity: 1 !important;
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
}
