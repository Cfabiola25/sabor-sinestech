import React from "react";
import { Mail, Instagram, Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import logoSaborSinestech from "../../assets/logos/logoSaborSinestech.png";

const NAV_COLS = [
  {
    heading: "Descubrir",
    links: [
      { name: "Inicio", to: "/" },
      { name: "Platillos", to: "/platillos" },
      { name: "Países", to: "/paises" },
      { name: "Maridajes", to: "/maridajes" },
    ],
  },
  {
    heading: "Herramientas",
    links: [
      { name: "Comparador", to: "/comparador" },
      { name: "Quiz sensorial", to: "/quiz" },
      { name: "Explorar maridajes", to: "/maridajes" },
      { name: "Experiencia", to: "/#experiencia" },
    ],
  },
  {
    heading: "Proyecto",
    links: [
      { name: "COIL MX · COL", to: "/#coil" },
      { name: "Equipo", to: "/equipo" },

      // 🔥 LINKS REALES
      {
        name: "UABC",
        to: "https://ftm.tij.uabc.mx/",
        external: true,
      },
      {
        name: "FESC",
        to: "https://www.fesc.edu.co/micrositios/software/",
        external: true,
      },
    ],
  },
];

const SOCIALS = [
  { icon: Instagram, label: "@saborsinestech", href: "https://instagram.com" },
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: ExternalLink, label: "Sitio oficial", href: "https://saborsinestech.com" },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#1e0f07] bg-[radial-gradient(ellipse_70%_60%_at_0%_100%,#2e1a0e_0%,transparent_60%),radial-gradient(ellipse_50%_50%_at_100%_0%,#3a1e0c_0%,transparent_55%)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_256_256%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.85%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22_opacity=%220.04%22/%3E%3C/svg%3E')]"
      />

      <div className="relative z-10 mx-auto max-w-[1360px] px-6 pb-10 pt-20 md:px-8">
        <div className="mb-14 grid gap-12 lg:grid-cols-[1.2fr_1.8fr] lg:gap-20">
          
          {/* 🔥 LOGO */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-[#f5e8d8]/15 bg-[#f5e8d8]/10 p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
                <img
                  src={logoSaborSinestech}
                  alt="Logo SaborSinestech"
                  className="h-full w-full object-contain"
                />
              </span>

              <div>
                <span className="block font-serif text-xl font-bold leading-none tracking-tight text-[#f5e8d8]">
                  SaborSinestech
                </span>
                <span className="mt-0.5 block font-sans text-[9.5px] font-light uppercase tracking-[0.16em] text-[#b05c2e]">
                  Sinestesia gastronómica
                </span>
              </div>
            </div>

            <p className="m-0 max-w-[320px] font-sans text-sm font-light leading-7 text-[#f5e8d8]/55">
              Una plataforma que celebra el encuentro de las cocinas mexicana y
              colombiana a través de maridajes, relatos e innovación educativa.
            </p>

            <a
              href="mailto:contacto@saborsinestech.com"
              className="inline-flex items-center gap-2 font-sans text-[12.5px] text-[#f5e8d8]/65 transition hover:text-[#f5c89a]"
            >
              <Mail size={14} />
              contacto@saborsinestech.com
            </a>

            {/* SOCIALS */}
            <div className="flex flex-wrap gap-2">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#f5e8d8]/10 px-3.5 py-1.5 text-[11.5px] text-[#f5e8d8]/55 transition hover:border-[#b05c2e]/50 hover:bg-[#b05c2e]/10 hover:text-[#f5c89a]"
                >
                  <Icon size={13} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* 🔥 NAV */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {NAV_COLS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#b05c2e]">
                  {col.heading}
                </h4>

                <ul className="flex flex-col">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      {link.external ? (
                        <a
                          href={link.to}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-1.5 text-[13px] text-[#f5e8d8]/55 transition hover:pl-1.5 hover:text-[#f5e8d8]"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          to={link.to}
                          className="block py-1.5 text-[13px] text-[#f5e8d8]/55 transition hover:pl-1.5 hover:text-[#f5e8d8]"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* LINEA */}
        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-[#b05c2e]/30 to-transparent" />

        {/* FOOTER BOTTOM */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-[10px] uppercase tracking-[0.14em] text-[#f5e8d8]/30">
            Proyecto académico COIL México–Colombia
          </span>

          <p className="text-[11px] text-[#f5e8d8]/25">
            © {year} SaborSinestech — Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;