import { useMemo, useState, type ReactNode } from "react";
import { useAudio } from "../../hooks/useAudio";

import {
  ChevronLeft,
  ChevronRight,
  Headphones,
  MapPin,
  Square,
  Sparkles,
  Utensils,
} from "lucide-react";
import { getDishImage } from "../../utils/getDishImage";

type Country = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  geography: string;
  ingredients: string[];
  influences: string[];
  dishes: {
    name: string;
    image: string;
  }[];
  soundTitle: string;
  soundDescription: string;
  soundTags: string[];
  audio: string;
};

const countries: Country[] = [
  {
    id: "colombia",
    name: "Colombia",
    subtitle: "Diversidad andina, caribeña, pacífica y amazónica",
    description:
      "Colombia destaca por su variedad de pisos térmicos, ingredientes regionales y una cocina marcada por el maíz, el café, el plátano, la yuca y las preparaciones tradicionales.",
    geography: "Andes, Caribe, Pacífico, Amazonía y Orinoquía.",
    ingredients: ["Café", "Maíz", "Plátano", "Yuca", "Aguacate", "Panela"],
    influences: ["Indígena", "Africana", "Española", "Campesina"],
    dishes: [
      { name: "Bandeja paisa", image: "bandejaPaisa.webp" },
      { name: "Ajiaco", image: "ajiacoSantafereno.webp" },
      { name: "Arepa", image: "arepaDeHuevo.webp" },
      { name: "Sancocho", image: "sancocho.webp" },
      { name: "Tamales", image: "tamalSantandereano.webp" },
      { name: "Lechona", image: "lechonaTolimense.webp" },
    ],
    soundTitle: "¿Cómo suena Colombia?",
    soundDescription:
      "Suena a cumbia, vallenato, tambora, marimba del Pacífico, feria, plaza de mercado y café recién servido.",
    soundTags: ["Cumbia", "Vallenato", "Tambora", "Marimba", "Café"],
    audio: "/src/assets/audio/countries/colombia.mp3",
  },
  {
    id: "mexico",
    name: "México",
    subtitle: "Cultura del maíz, el chile y la cocina ancestral",
    description:
      "México posee una identidad gastronómica profundamente ligada al maíz, los chiles, los frijoles, el cacao y técnicas tradicionales como la nixtamalización.",
    geography: "Sierras, costas, desiertos, valles y zonas tropicales.",
    ingredients: ["Maíz", "Chile", "Frijol", "Cacao", "Tomate", "Aguacate"],
    influences: ["Mesoamericana", "Española", "Regional", "Popular"],
    dishes: [
      { name: "Tacos", image: "tacosAlPastor.webp" },
      { name: "Mole", image: "molePoblano.webp" },
      { name: "Pozole", image: "pozoleRojo.webp" },
      { name: "Tamales", image: "tamalesOaxaquenos.webp" },
      { name: "Chiles en nogada", image: "chilesEnNogada.webp" },
      { name: "Cochinita pibil", image: "cochinitaPibil.webp" },
    ],
    soundTitle: "¿Cómo suena México?",
    soundDescription:
      "Suena a mariachi, son jarocho, jarabe tapatío, mercado tradicional, comal caliente y celebración popular.",
    soundTags: ["Mariachi", "Son jarocho", "Jarabe", "Comal", "Fiesta"],
    audio: "/src/assets/audio/countries/mexico.mp3",
  },
];

const CountriesSection = () => {
  const { toggle, stop, isPlaying, currentSrc } = useAudio();
  const [currentPage, setCurrentPage] = useState(0);
  const country = countries[currentPage];

  const isCurrentCountryPlaying = isPlaying && currentSrc === country.audio;

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % countries.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + countries.length) % countries.length);
  };

  const handleAudioToggle = () => {
    if (currentSrc === country.audio && isPlaying) {
      stop();
    } else {
      toggle(country.audio);
    }
  };

  const speechText = useMemo(() => {
    return `${country.name}. ${country.subtitle}. ${country.soundDescription}`;
  }, [country]);

  const listenCountry = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = country.id === "colombia" ? "es-CO" : "es-MX";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section
      id="paises"
      className="relative overflow-hidden bg-[#fffaf5] px-4 py-16 md:px-8 lg:py-20"
    >
      <div className="pointer-events-none absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-[#f6c58f]/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-120px] bottom-20 h-72 w-72 rounded-full bg-[#c65a32]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full border border-[#efb889] bg-[#fff2e5] px-6 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#c65a32]">
            México & Colombia
          </span>

          <h2 className="mt-5 font-serif text-4xl font-black tracking-tight text-[#341b10] md:text-5xl">
            Países que inspiran el sabor
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base font-medium text-[#7a5947] md:text-lg">
            Explora la identidad gastronómica, cultural, territorial y sonora de
            cada país.
          </p>

          <div className="mx-auto mt-5 flex w-44 items-center justify-center gap-3 text-[#edc9aa]">
            <span className="h-px flex-1 bg-[#edc9aa]" />
            <Sparkles size={18} />
            <span className="h-px flex-1 bg-[#edc9aa]" />
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#efd4bd] bg-white/80 p-5 shadow-[0_24px_80px_rgba(91,45,20,0.08)] backdrop-blur md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.45fr]">
            <article className="rounded-[1.6rem] bg-gradient-to-br from-[#ffd8a8] via-[#ffc78e] to-[#f3ad68] p-7 text-[#371b0e] shadow-[0_18px_45px_rgba(198,90,50,0.18)] md:p-8">
              <span className="inline-flex rounded-full bg-white/65 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#8b492d] shadow-sm">
                País {currentPage + 1} de {countries.length}
              </span>

              <h3 className="mt-5 font-serif text-4xl font-black leading-tight md:text-5xl">
                {country.name}
              </h3>

              <p className="mt-3 text-lg font-black text-[#4c2a19]">
                {country.subtitle}
              </p>

              <p className="mt-5 text-base font-medium leading-relaxed text-[#573622]">
                {country.description}
              </p>

              <div className="mt-8 rounded-2xl bg-white/58 p-5 shadow-inner backdrop-blur">
                <div className="mb-3 flex items-center gap-3 text-[#8e3f22]">
                  <Headphones size={22} />
                  <h4 className="font-serif text-lg font-black">
                    {country.soundTitle}
                  </h4>
                </div>

                <p className="text-sm font-medium leading-relaxed text-[#573622]">
                  {country.soundDescription}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {country.soundTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/75 px-3 py-1 text-xs font-black text-[#8b492d]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAudioToggle}
                  className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-black text-white shadow-[0_12px_24px_rgba(50,22,8,0.22)] transition hover:-translate-y-0.5 ${
                    isCurrentCountryPlaying
                      ? "bg-[#7a1f08] hover:bg-[#5e1806]"
                      : "bg-[#321608] hover:bg-[#4a220d]"
                  }`}
                >
                  {isCurrentCountryPlaying ? (
                    <>
                      <Square size={15} />
                      Detener país
                    </>
                  ) : (
                    <>
                      <Headphones size={15} />
                      Escuchar país
                    </>
                  )}
                </button>
              </div>
            </article>

            <div className="flex flex-col gap-6">
              <div className="grid gap-5 md:grid-cols-3">
                <InfoCard icon={<MapPin size={30} />} title="Geografía cultural">
                  <p className="text-sm font-medium leading-relaxed text-[#6c4a38]">
                    {country.geography}
                  </p>
                </InfoCard>

                <InfoCard
                  icon={<Utensils size={30} />}
                  title="Ingredientes principales"
                >
                  <TagList items={country.ingredients} />
                </InfoCard>

                <InfoCard
                  icon={<Sparkles size={30} />}
                  title="Influencias culinarias"
                >
                  <TagList items={country.influences} />
                </InfoCard>
              </div>

              <div className="rounded-[1.4rem] border border-[#efd4bd] bg-[#fffaf5] p-6">
                <div className="mb-6 flex items-center gap-3">
                  <Utensils className="text-[#c65a32]" size={30} />
                  <h4 className="font-serif text-xl font-black text-[#341b10]">
                    Platillos representativos
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
                  {country.dishes.map((dish) => (
                    <DishCard key={dish.name} dish={dish} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6 border-t border-[#f0ddca] pt-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              {countries.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentPage(index)}
                  aria-label={`Ver ${item.name}`}
                  className={`h-3 rounded-full transition-all ${
                    currentPage === index
                      ? "w-12 bg-[#c65a32]"
                      : "w-3 bg-[#edd0b6] hover:bg-[#d89a71]"
                  }`}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={prevPage}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e2ad86] bg-white px-8 py-4 text-base font-black text-[#7a3d25] transition hover:-translate-y-0.5 hover:bg-[#fff1e4]"
              >
                <ChevronLeft size={20} />
                Anterior
              </button>

              <button
                type="button"
                onClick={nextPage}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c65a32] px-8 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#a94725]"
              >
                Siguiente
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoCard = ({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) => {
  return (
    <article className="min-h-[165px] rounded-[1.3rem] border border-[#efd4bd] bg-[#fffaf5] p-5 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(91,45,20,0.08)]">
      <div className="mb-4 flex items-start gap-3">
        <div className="text-[#c65a32]">{icon}</div>
        <h4 className="font-serif text-base font-black leading-tight text-[#341b10]">
          {title}
        </h4>
      </div>

      {children}
    </article>
  );
};

const TagList = ({ items }: { items: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full bg-[#f4ddc8] px-4 py-2 text-sm font-black text-[#8b492d]"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

const DishCard = ({
  dish,
}: {
  dish: {
    name: string;
    image: string;
  };
}) => {
  return (
    <article className="group text-center">
      <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border border-[#f0cda9] bg-[#fff0df] shadow-inner transition group-hover:-translate-y-1 group-hover:scale-105">
        <img
          src={getDishImage(dish.image)}
          alt={dish.name}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.src = getDishImage();
          }}
          className="h-full w-full object-cover"
        />
      </div>

      <p className="mx-auto mt-3 inline-flex min-h-[42px] items-center justify-center rounded-full bg-[#f4ddc8] px-4 py-2 text-center text-sm font-black leading-tight text-[#8b492d]">
        {dish.name}
      </p>
    </article>
  );
};

export default CountriesSection;