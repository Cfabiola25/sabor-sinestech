import { Github, Instagram, Linkedin, ExternalLink } from "lucide-react";
import { members } from "../../data/members";
import placeholder from "../../assets/images/placeholder.webp";

const categoryClasses: Record<string, string> = {
  Desarrollo: "bg-[#2e1a0e] text-[#f5e8d8]",
  Gastronomía: "bg-[#94442e] text-white",
  Maridaje: "bg-[#b05c2e] text-white",
  Cultura: "bg-[#745853] text-white",
  Sensorial: "bg-[#D4AF37] text-[#221a17]",
  Tradición: "bg-[#6b4a38] text-white",
  Documentación: "bg-[#8a5a44] text-white",
  Experiencia: "bg-[#a66a3f] text-white",
};

const MembersSection = () => {
  return (
    <section
      id="equipo"
      className="relative overflow-hidden bg-[#faf6ef] px-8 py-28"
      aria-labelledby="team-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        aria-hidden="true"
      />

<div className="relative z-10 mx-auto max-w-[1360px]">
  <header className="mb-16">
    <div className="mb-6 flex items-center gap-3.5">
      <span
        className="block h-[1.5px] w-10 shrink-0 bg-[#b05c2e]"
        aria-hidden="true"
      />

      <p className="m-0 text-[11px] font-medium uppercase tracking-[0.22em] text-[#b05c2e]">
        Equipo interdisciplinario
      </p>
    </div>

    <h2
      id="team-title"
      className="m-0 mb-8 font-serif text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-[#2e1a0e]"
    >
      Talento que une{" "}
      <em className="italic text-[#b05c2e]">
        tecnología y gastronomía
      </em>
    </h2>

    <p className="m-0 max-w-none text-[1.05rem] font-light leading-8 tracking-[-0.01em] text-[#7a5a48]">
      SaborSinestech integra desarrollo web, investigación gastronómica,
      análisis cultural y experiencia sensorial para construir una
      plataforma intercultural México–Colombia.
    </p>
  </header>

        <div className="mb-14 grid gap-5 rounded-3xl border border-[#b05c2e]/[0.12] bg-[#fffdf9] p-6 shadow-[0_20px_50px_rgba(46,26,14,0.06)] md:grid-cols-3">
          <div>
            <p className="font-serif text-4xl font-semibold text-[#2e1a0e]">
              07
            </p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#b05c2e]">
              Integrantes
            </p>
          </div>

          <div>
            <p className="font-serif text-4xl font-semibold text-[#2e1a0e]">
              02
            </p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#b05c2e]">
              Áreas principales
            </p>
          </div>

          <div>
            <p className="font-serif text-4xl font-semibold text-[#2e1a0e]">
              MX · COL
            </p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#b05c2e]">
              Enfoque intercultural
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-7">
          {members.map((member) => (
            <article
              key={member.id}
              className="group overflow-hidden rounded-[22px] border border-[#b05c2e]/[0.12] bg-[#fffdf9] shadow-[0_18px_45px_rgba(46,26,14,0.07)] transition duration-300 hover:-translate-y-1.5 hover:border-[#b05c2e]/30 hover:shadow-[0_24px_60px_rgba(46,26,14,0.12)]"
              aria-labelledby={`member-${member.id}`}
            >
              <div className="relative h-64 overflow-hidden bg-[#f5e8d8]">
                <img
                  src={member.image}
                  alt={`${member.name}, ${member.role} del proyecto SaborSinestech.`}
                  onError={(e) => {
                    e.currentTarget.src = placeholder;
                  }}
                  className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-[1.05] group-hover:grayscale-0"
                  loading="lazy"
                                  decoding="async"
/>

                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#2e1a0e]/65 via-transparent to-transparent"
                  aria-hidden="true"
                />

                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${
                    categoryClasses[member.category] ||
                    "bg-[#94442e] text-white"
                  }`}
                >
                  {member.category}
                </span>
              </div>

              <div className="flex min-h-[280px] flex-col p-6">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#b05c2e]">
                  {member.affiliation}
                </p>

                <h3
                  id={`member-${member.id}`}
                  className="mb-2 font-serif text-2xl font-semibold leading-tight text-[#2e1a0e]"
                >
                  {member.name}
                </h3>

                <p className="mb-4 text-sm font-semibold text-[#5a3820]">
                  {member.role}
                </p>

                <p className="mb-6 text-sm font-light leading-6 text-[#6b4a38]">
                  {member.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                  {member.social?.instagram && (
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Instagram de ${member.name}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#b05c2e]/20 px-3 py-1.5 text-[12px] text-[#5a3820] no-underline transition hover:border-[#b05c2e] hover:bg-[#f5e8d8]"
                    >
                      <Instagram size={14} aria-hidden="true" />
                      Instagram
                    </a>
                  )}

                  {member.social?.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn de ${member.name}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#b05c2e]/20 px-3 py-1.5 text-[12px] text-[#5a3820] no-underline transition hover:border-[#b05c2e] hover:bg-[#f5e8d8]"
                    >
                      <Linkedin size={14} aria-hidden="true" />
                      LinkedIn
                    </a>
                  )}

                  {member.social?.portfolio && (
                    <a
                      href={member.social.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Portafolio de ${member.name}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#b05c2e]/20 px-3 py-1.5 text-[12px] text-[#5a3820] no-underline transition hover:border-[#b05c2e] hover:bg-[#f5e8d8]"
                    >
                      <ExternalLink size={14} aria-hidden="true" />
                      Portafolio
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-[#b05c2e]/[0.12] bg-[#2e1a0e] p-8 text-[#f5e8d8] shadow-[0_24px_70px_rgba(46,26,14,0.18)]">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#f5c89a]">
                Rol del equipo
              </p>

              <h3 className="mb-4 font-serif text-3xl font-semibold">
                Investigación gastronómica + desarrollo digital
              </h3>

              <p className="max-w-3xl text-sm font-light leading-7 text-[#f5e8d8]/75">
                El proyecto combina la mirada técnica de Ingeniería de Software
                con la investigación culinaria de estudiantes de Gastronomía,
                permitiendo transformar datos culturales, sabores, texturas y
                narrativas en una experiencia web interactiva.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              <span className="rounded-full border border-[#f5e8d8]/15 px-4 py-2">
                Desarrollo frontend
              </span>
              <span className="rounded-full border border-[#f5e8d8]/15 px-4 py-2">
                Curaduría gastronómica
              </span>
              <span className="rounded-full border border-[#f5e8d8]/15 px-4 py-2">
                Narrativa cultural
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembersSection;