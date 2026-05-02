import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero.webp";
import imagenprincipal from "../../assets/images/imagenprincipal.webp";

const TAGS = ["México", "Colombia", "Gastronomía", "Narrativa Digital", "COIL"];

const Hero: React.FC = () => {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100vh-98px)] items-center overflow-hidden bg-[#faf6ef]"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          loading="eager"
          decoding="async"
          className="h-full w-full scale-[1.04] object-cover object-[center_30%] opacity-[0.13]"
        />

        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(250,246,239,0.95)_35%,rgba(250,246,239,0.6)_100%),radial-gradient(ellipse_60%_70%_at_80%_50%,rgba(240,228,208,0.6)_0%,transparent_70%)]" />

        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_256_256%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.85%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22_opacity=%220.03%22/%3E%3C/svg%3E')]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1360px] grid-cols-1 items-center gap-12 px-6 py-14 md:px-8 md:py-16 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col">
          <motion.div
            className="mb-7 flex flex-wrap items-center gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mr-1 block h-[1.5px] w-8 shrink-0 bg-[#b05c2e]" />

            {TAGS.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full border border-[#b05c2e]/25 bg-[#b05c2e]/5 px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-[#b05c2e]"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.h1
            className="mb-7 font-serif text-[clamp(3.2rem,5.5vw,5.2rem)] font-bold leading-[1.01] tracking-[-0.025em] text-[#2e1a0e]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Maridajes
            <br />
            interculturales
            <br />
            entre <em className="italic text-[#b05c2e]">México</em> &{" "}
            <em className="italic text-[#7a3e18]">Colombia</em>
          </motion.h1>

          <motion.p
            className="mb-9 max-w-[420px] font-sans text-base font-light leading-7 text-[#6b4a38]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            Un viaje sensorial a través de sabores, texturas y memorias
            culturales que unen dos naciones — impulsado por colaboración
            académica e innovación digital.
          </motion.p>

          <motion.div
            className="mb-10 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/platillos"
              className="inline-flex items-center gap-2 rounded-full bg-[#2e1a0e] px-6 py-3.5 font-sans text-[13px] font-medium tracking-[0.04em] text-[#f5e8d8] no-underline transition-all hover:-translate-y-0.5 hover:bg-[#b05c2e] hover:shadow-[0_10px_28px_rgba(176,92,46,0.3)]"
            >
              Explorar maridajes
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path
                  d="M3 7.5h9M8 3l4.5 4.5L8 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <a
              href="#coil"
              className="inline-flex items-center rounded-full border border-[#2e1a0e]/25 px-6 py-3.5 font-sans text-[13px] font-medium tracking-[0.04em] text-[#2e1a0e] no-underline transition-all hover:-translate-y-0.5 hover:border-[#b05c2e] hover:bg-[#b05c2e]/5"
            >
              Conocer el COIL
            </a>
          </motion.div>

          <motion.div
            className="flex gap-10 border-t border-[#b05c2e]/15 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {[
              { value: "2", label: "Países" },
              { value: "40+", label: "Platillos" },
              { value: "20+", label: "Maridajes" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="font-serif text-[2.2rem] font-bold leading-none tracking-tight text-[#2e1a0e]">
                  {stat.value}
                </span>
                <span className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#b05c2e]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, x: 32, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="group relative w-full max-w-[420px] overflow-hidden rounded-[24px] border border-[#b05c2e]/15 bg-[#fffdf9] shadow-[0_32px_80px_rgba(46,26,14,0.14),0_8px_24px_rgba(46,26,14,0.06)]">
            <div className="relative h-[260px] overflow-hidden">
              <img
                src={imagenprincipal}
                alt="Platillo destacado"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2e1a0e]/50 to-transparent" />
            </div>

            <div className="flex flex-col gap-2 px-7 pb-7 pt-6">
              <span className="flex items-center gap-2 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-[#b05c2e]">
                <span className="block h-[5px] w-[5px] rounded-full bg-[#b05c2e]" />
                Cultura & Origen
              </span>

              <h3 className="m-0 font-serif text-[1.7rem] font-bold leading-[1.15] tracking-tight text-[#2e1a0e]">
                La Alquimia del
                <br />
                Maíz y el Café
              </h3>

              <p className="m-0 font-sans text-[0.85rem] font-light leading-6 text-[#7a5a48]">
                Raíces compartidas del grano y el ritual de la molienda que
                conectan dos pueblos.
              </p>

              <Link
                to="/platillos"
                className="mt-2 inline-flex items-center gap-1.5 font-sans text-xs font-medium uppercase tracking-[0.08em] text-[#2e1a0e] no-underline transition-all hover:gap-2.5 hover:text-[#b05c2e]"
              >
                Ver platillos
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path
                    d="M2.5 6.5h8M6.5 2.5l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            <div
              className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-[#b05c2e]/20 bg-[#faf6ef]/90 px-3 py-1 text-sm backdrop-blur-md"
              aria-hidden="true"
            >
              <span>🇲🇽</span>
              <span className="font-sans text-xs font-medium text-[#b05c2e]">+</span>
              <span>🇨🇴</span>
            </div>
          </div>

          <div
            className="pointer-events-none absolute -bottom-16 -right-16 -z-10 h-[260px] w-[260px] rounded-full border border-[#b05c2e]/10 before:absolute before:inset-6 before:rounded-full before:border before:border-[#b05c2e]/10"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;