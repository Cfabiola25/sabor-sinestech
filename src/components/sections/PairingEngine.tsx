import { useEffect, useMemo, useState, type ElementType } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Coffee,
  Flame,
  Heart,
  Music2,
  Sparkles,
  Utensils,
  Waves,
} from "lucide-react";
import { useDishes } from "../../hooks/useDishes";
import { usePairings } from "../../hooks/usePairings";
import type { Dish, Pairing } from "../../types/content";
import { normalizeId, normalizeText } from "../../utils/dataQuality";

const ITEMS_PER_PAGE = 10;

type PairingView = {
  id: string;
  dishId: string;
  dishName: string;
  country: Dish["country"];
  category: string;
  match: string;
  relation: string;
  mood: string;
  music: string;
  color: string;
  icon: ElementType;
  story: string;
  sensory: string[];
};

const getVisualData = (category: string) => {
  const normalized = normalizeText(category);

  if (normalized.includes("picante")) {
    return {
      icon: Flame,
      color: "from-orange-50 to-red-100",
      mood: "Picante que se transforma",
      music: "Percusión tropical + ritmo intenso",
    };
  }

  if (normalized.includes("cremoso")) {
    return {
      icon: Coffee,
      color: "from-amber-50 to-stone-200",
      mood: "Calor de casa",
      music: "Bolero cálido + guitarra suave",
    };
  }

  if (normalized.includes("crujiente")) {
    return {
      icon: Utensils,
      color: "from-yellow-50 to-orange-100",
      mood: "Antojo de tarde",
      music: "Cumbia ligera + ambiente de plaza",
    };
  }

  if (normalized.includes("intenso")) {
    return {
      icon: Music2,
      color: "from-stone-100 to-amber-200",
      mood: "Profundo y elegante",
      music: "Bolero oscuro + notas de café",
    };
  }

  if (normalized.includes("fresco")) {
    return {
      icon: Waves,
      color: "from-cyan-50 to-emerald-100",
      mood: "Costa, brisa y frescura",
      music: "Guitarra suave + sonido de mar",
    };
  }

  return {
    icon: Sparkles,
    color: "from-[#fff7ed] to-[#f5e8d8]",
    mood: "Encuentro cultural",
    music: "Fusión México–Colombia",
  };
};

const getRelation = (pairing: Pairing) => {
  const text = normalizeText(
    `${pairing.pairingType} ${pairing.sensoryCategory} ${pairing.justification}`
  );

  if (text.includes("contraste")) return "Contraste";
  if (text.includes("equilibrio")) return "Equilibrio";
  if (text.includes("complement")) return "Complemento";

  return pairing.pairingType || "Maridaje";
};

const getSensoryTags = (dish: Dish, pairing: Pairing) => {
  return [
    pairing.sensoryCategory,
    dish.dominantFlavor,
    dish.texture,
    dish.intensity,
    ...(dish.secondaryFlavors ?? []),
  ]
    .filter(Boolean)
    .slice(0, 4);
};

const buildPairingViews = (
  dishes: Dish[],
  pairings: Pairing[]
): PairingView[] => {
  return pairings
    .map((pairing) => {
      const dish = dishes.find(
        (item) => normalizeId(item.id) === normalizeId(pairing.dishId)
      );

      if (!dish) return null;

      const category =
        pairing.sensoryCategory || dish.dominantFlavor || "Sensorial";

      const visual = getVisualData(category);

      return {
        id: pairing.id,
        dishId: dish.id,
        dishName: dish.name,
        country: dish.country,
        category,
        match: pairing.pairingName,
        relation: getRelation(pairing),
        mood: visual.mood,
        music: visual.music,
        color: visual.color,
        icon: visual.icon,
        story: pairing.justification,
        sensory: getSensoryTags(dish, pairing),
      };
    })
    .filter(Boolean) as PairingView[];
};

const PairingEngine = () => {
  const dishes = useDishes();
  const pairings = usePairings();

  const pairingViews = useMemo(
    () => buildPairingViews(dishes, pairings),
    [dishes, pairings]
  );

  const filters = useMemo(() => {
    const categories = Array.from(
      new Set(pairingViews.map((pairing) => pairing.category).filter(Boolean))
    );

    return ["Todos", ...categories];
  }, [pairingViews]);

  const [activeFilter, setActiveFilter] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPairings = useMemo(() => {
    if (activeFilter === "Todos") return pairingViews;

    return pairingViews.filter(
      (pairing) =>
        normalizeText(pairing.category) === normalizeText(activeFilter)
    );
  }, [activeFilter, pairingViews]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPairings.length / ITEMS_PER_PAGE)
  );

  const paginatedPairings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPairings.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPairings, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section
      id="maridajes"
      className="relative overflow-hidden bg-[#faf6ef] px-5 py-24 text-[#2e1a0e] md:px-8 md:py-28"
      aria-labelledby="maridajes-title"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(176,92,46,0.14),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(245,232,216,0.85),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(176,92,46,0.11),transparent_35%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-[#efb889] bg-[#fff2e5] px-5 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#b05c2e]">
              Sabores y texturas
            </span>

            <h2
              id="maridajes-title"
              className="mt-5 max-w-3xl font-serif text-4xl font-black leading-tight tracking-tight text-[#2e1a0e] md:text-5xl"
            >
              Maridajes sensoriales que también se escuchan.
            </h2>

            <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-[#7a5947] md:text-lg">
              Una experiencia México–Colombia donde cada combinación tiene
              sabor, emoción, memoria cultural y una atmósfera sonora propia.
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-3 text-sm font-black transition ${
                activeFilter === filter
                  ? "bg-[#2e1a0e] text-white shadow-lg"
                  : "border border-[#efcfb6] bg-white text-[#7a5947] hover:-translate-y-0.5 hover:bg-[#fff1e4]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-col gap-3 rounded-[1.3rem] border border-[#efd4bd] bg-white/70 px-5 py-4 text-sm font-bold text-[#7a5947] shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <span>
            Mostrando {paginatedPairings.length} de {filteredPairings.length}{" "}
            maridajes
          </span>

          <span>
            Página {currentPage} de {totalPages}
          </span>
        </div>

        {paginatedPairings.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {paginatedPairings.map((pairing) => (
                <PairingCard key={pairing.id} pairing={pairing} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevious={goToPreviousPage}
              onNext={goToNextPage}
              onSelectPage={setCurrentPage}
            />
          </>
        ) : (
          <div className="rounded-[1.8rem] border border-[#efd4bd] bg-white/80 px-6 py-14 text-center shadow-[0_18px_55px_rgba(91,45,20,0.06)]">
            <Heart className="mx-auto text-[#b05c2e]" size={38} />
            <h3 className="mt-4 font-serif text-2xl font-black text-[#2e1a0e]">
              No hay maridajes para este filtro.
            </h3>
            <p className="mt-2 text-sm font-medium text-[#7a5947]">
              Prueba con otra categoría sensorial.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const PairingCard = ({ pairing }: { pairing: PairingView }) => {
  const Icon = pairing.icon;

  return (
    <article
      className={`group overflow-hidden rounded-[1.8rem] border border-[#efd4bd] bg-gradient-to-br ${pairing.color} p-6 shadow-[0_18px_55px_rgba(91,45,20,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(91,45,20,0.14)]`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#8b492d] shadow-sm">
            {pairing.country} · {pairing.category}
          </span>

          <h3 className="mt-4 font-serif text-2xl font-black leading-tight text-[#2e1a0e]">
            {pairing.dishName}
          </h3>
        </div>

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/75 text-[#b05c2e] shadow-inner">
          <Icon size={28} aria-hidden="true" />
        </div>
      </div>

      <div className="rounded-2xl bg-white/72 p-5 shadow-sm backdrop-blur">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#a15a37]">
          Marida con
        </p>

        <h4 className="mt-2 font-serif text-2xl font-black text-[#2e1a0e]">
          {pairing.match}
        </h4>

        <div className="mt-3 inline-flex rounded-full bg-[#2e1a0e] px-4 py-2 text-xs font-black text-white">
          {pairing.relation}
        </div>

        <p className="mt-4 text-sm font-medium leading-relaxed text-[#6c4a38]">
          {pairing.story}
        </p>
      </div>

      <div className="mt-5 grid gap-3 rounded-2xl bg-white/50 p-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#a15a37]">
            Sensación
          </p>
          <p className="mt-1 font-serif text-lg font-black text-[#2e1a0e]">
            {pairing.mood}
          </p>
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#a15a37]">
            Atmósfera sonora
          </p>
          <p className="mt-1 text-sm font-bold text-[#6c4a38]">
            {pairing.music}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {pairing.sensory.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/75 px-4 py-2 text-xs font-black text-[#8b492d] shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onSelectPage,
}: {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelectPage: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-[1.5rem] border border-[#efd4bd] bg-white/75 p-5 shadow-[0_18px_55px_rgba(91,45,20,0.06)] backdrop-blur md:flex-row">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#e2ad86] bg-white px-7 py-4 text-sm font-black text-[#7a3d25] transition hover:-translate-y-0.5 hover:bg-[#fff1e4] disabled:cursor-not-allowed disabled:opacity-40 md:w-auto"
      >
        <ChevronLeft size={19} aria-hidden="true" />
        Anterior
      </button>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onSelectPage(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-black transition ${
                currentPage === page
                  ? "bg-[#b05c2e] text-white shadow-lg"
                  : "bg-[#f8e6d4] text-[#8b492d] hover:-translate-y-0.5 hover:bg-[#efcfb6]"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#b05c2e] px-7 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#8f4525] disabled:cursor-not-allowed disabled:opacity-40 md:w-auto"
      >
        Siguiente
        <ChevronRight size={19} aria-hidden="true" />
      </button>
    </div>
  );
};

export default PairingEngine;