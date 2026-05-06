import React from "react";
import { Github, ExternalLink } from "lucide-react";
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
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Cfabiola25/sabor-sinestech",
  },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[#b05c2e]/20 bg-[#241209] bg-[radial-gradient(ellipse_80%_70%_at_0%_100%,rgba(176,92,46,0.22)_0%,transparent_58%),radial-gradient(ellipse_60%_55%_at_100%_0%,rgba(245,200,154,0.12)_0%,transparent_56%),linear-gradient(135deg,#1b0c05_0%,#2a1409_48%,#140803_100%)]">
      
      {/* GRID TEXTURE */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(245,232,216,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(245,232,216,0.08)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="relative z-10 mx-auto max-w-[1360px] px-6 pb-10 pt-20 md:px-8">
        
        {/* TOP */}
        <div className="mb-14 grid gap-14 lg:grid-cols-[1.15fr_1.85fr] lg:gap-24">
          
          {/* BRAND */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              
              <span className="flex h-[56px] w-[56px] shrink-0 items-center justify-center overflow-hidden rounded-[18px] border border-[#f5c89a]/20 bg-[#fff7ed]/8 p-2 shadow-[0_14px_34px_rgba(0,0,0,0.28)]">
                <img
                  src={logoSaborSinestech}
                  alt="Logo SaborSinestech"
                  className="h-full w-full object-contain"
                />
              </span>

              <div>
                <span className="block font-serif text-[2rem] font-bold leading-none tracking-[-0.03em] text-[#fff8f1]">
                  SaborSinestech
                </span>

                <span className="mt-1 block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f5c89a]">
                  Sinestesia gastronómica
                </span>
              </div>
            </div>

            <p className="m-0 max-w-[390px] text-[15px] font-light leading-8 text-[#f8efe5]">
              Una plataforma que celebra el encuentro de las cocinas mexicana y
              colombiana a través de maridajes, relatos e innovación educativa.
            </p>

            {/* SOCIALS */}
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#f5c89a]/25 bg-[#fff7ed]/10 px-4 py-2 text-[12px] font-medium text-[#fff4ea] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f5c89a]/60 hover:bg-[#b05c2e]/22 hover:text-white"
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {NAV_COLS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-5">
                
                <h4 className="m-0 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f5c89a]">
                  {col.heading}
                </h4>

                <ul className="m-0 flex list-none flex-col gap-1 p-0">
                  {col.links.map((link) => {
                    const className =
                      "group flex items-center gap-1.5 py-1 text-[13.5px] font-light text-[#f7ede2] no-underline transition-all duration-300 hover:translate-x-1 hover:text-white";

                    return (
                      <li key={link.name}>
                        {link.external ? (
                          <a
                            href={link.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={className}
                          >
                            {link.name}

                            <ExternalLink
                              size={12}
                              className="opacity-60 transition-opacity group-hover:opacity-100"
                              aria-hidden="true"
                            />
                          </a>
                        ) : (
                          <Link to={link.to} className={className}>
                            {link.name}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-[#f5c89a]/40 to-transparent" />

        {/* BOTTOM */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          <span className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#f3dfcf]">
            Proyecto académico COIL México–Colombia
          </span>

          <p className="m-0 text-[11.5px] text-[#e7cdb7]">
            © {year} SaborSinestech — Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;