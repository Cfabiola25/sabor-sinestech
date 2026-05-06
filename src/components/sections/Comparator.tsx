import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftRight,
  ChefHat,
  Flame,
  Layers,
  MapPin,
  Sparkles,
  Utensils,
} from "lucide-react";
import type { Dish } from "../../types/content";
import { useContentLoading } from "../../hooks/useContentLoading";
import { useDishes } from "../../hooks/useDishes";
import { buildSuggestedPairs } from "../../utils/similarity";
import { getDishImage } from "../../utils/getDishImage";
import SkeletonCard from "../ui/SkeletonCard";
import placeholder from "../../assets/images/placeholder.webp";

const Comparator = () => {
  const validDishes = useDishes();
  const isLoading = useContentLoading(400);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const suggestedPairs = useMemo(() => {
    return buildSuggestedPairs(validDishes, 6);
  }, [validDishes]);

  const selectedPair = suggestedPairs[selectedIndex];

  useEffect(() => {
    if (selectedIndex >= suggestedPairs.length) {
      setSelectedIndex(0);
    }
  }, [selectedIndex, suggestedPairs.length]);

  if (isLoading) {
    return (
      <section
        id="comparador"
        className="relative overflow-hidden bg-[#faf6ef] px-6 py-24"
      >
        <div className="mx-auto max-w-[1280px]">
          <HeaderBlock />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!selectedPair) {
    return (
      <section
        id="comparador"
        className="bg-[#faf6ef] px-6 py-24 text-center"
      >
        <p className="text-[#6b4a38]">
          No hay suficientes platillos de México y Colombia para comparar.
        </p>
      </section>
    );
  }

  return (
    <section
      id="comparador"
      aria-labelledby="comparador-title"
      className="relative overflow-hidden bg-[#faf6ef] px-6 py-24"
    >
      <div className="pointer-events-none absolute left-[-140px] top-20 h-80 w-80 rounded-full bg-[#f2c27d]/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-[-140px] h-80 w-80 rounded-full bg-[#b05c2e]/15 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px]">
        <HeaderBlock />

        <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {suggestedPairs.map((pair, index) => (
            <button
              key={`${pair.mx.id}-${pair.co.id}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-pressed={selectedIndex === index}
              className={`rounded-[24px] border p-5 text-left transition duration-300 hover:-translate-y-1 ${
                selectedIndex === index
                  ? "border-[#b05c2e] bg-[#fff7ed] shadow-[0_20px_50px_rgba(46,26,14,0.12)]"
                  : "border-[#b05c2e]/15 bg-white/75 hover:border-[#b05c2e]/35"
              }`}
            >
              <span className="mb-4 inline-flex rounded-full bg-[#f1dfca] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#8a421f]">
                {pair.score}% similitud
              </span>

              <h3 className="font-serif text-2xl font-semibold leading-tight text-[#2e1a0e]">
                {pair.mx.name}
                <span className="mx-2 text-[#b05c2e]">vs</span>
                {pair.co.name}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#6b4a38]">
                {pair.reason}.
              </p>
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px_1fr]">
          <DishCard dish={selectedPair.mx} country="México" />

          <CenterComparison
            score={selectedPair.score}
            reason={selectedPair.reason}
            mx={selectedPair.mx}
            co={selectedPair.co}
          />

          <DishCard dish={selectedPair.co} country="Colombia" />
        </div>
      </div>
    </section>
  );
};

const HeaderBlock = () => {
  return (
    <header className="mb-14">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-[2px] w-10 bg-[#b05c2e]" />

        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#b05c2e]">
          Comparador intercultural
        </p>
      </div>

      <h2
        id="comparador-title"
        className="font-serif text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-[#2e1a0e]"
      >
        Platillos{" "}
        <em className="italic text-[#b05c2e]">
          similares
        </em>
      </h2>

      <p className="mt-6 max-w-none text-[1.05rem] font-light leading-8 tracking-[-0.01em] text-[#7a5a48]">
        Explora cómo dos preparaciones de México y Colombia pueden compartir
        sabor, textura e intensidad, aunque conserven una identidad cultural
        propia.
      </p>
    </header>
  );
};

const DishCard = ({ dish, country }: { dish: Dish; country: string }) => {
  const imageSrc =
    dish.image && !dish.image.toLowerCase().includes("placeholder")
      ? getDishImage(dish.image)
      : placeholder;

  return (
    <article className="overflow-hidden rounded-[32px] border border-[#b05c2e]/15 bg-[#fffdf9] shadow-[0_30px_80px_rgba(46,26,14,0.10)]">
      <div className="relative h-[280px] overflow-hidden">
        <img
          src={imageSrc}
          alt={`${dish.name}, platillo representativo de ${country}`}
          className="h-full w-full object-cover transition duration-700 hover:scale-105"
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.src = placeholder;
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#2e1a0e]/65 via-[#2e1a0e]/10 to-transparent" />

        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#b05c2e]">
          {country}
        </span>

        <div className="absolute bottom-5 left-5 right-5">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#ffe8d0]">
            <MapPin size={14} />
            {dish.region}
          </p>

          <h3 className="font-serif text-4xl font-black leading-tight text-white">
            {dish.name}
          </h3>
        </div>
      </div>

      <div className="p-7">
        <div className="mb-7 grid gap-3 sm:grid-cols-3">
          <InfoPill icon={ChefHat} label="Sabor" value={dish.dominantFlavor} />
          <InfoPill icon={Layers} label="Textura" value={dish.texture} />
          <InfoPill icon={Flame} label="Intensidad" value={dish.intensity} />
        </div>

        <div className="rounded-2xl bg-[#f6eadc] p-5">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#b05c2e]">
            Notas secundarias
          </p>

          <p className="text-sm leading-7 text-[#5f3e2d]">
            {dish.secondaryFlavors?.length
              ? dish.secondaryFlavors.join(", ")
              : "Sin notas secundarias registradas."}
          </p>
        </div>
      </div>
    </article>
  );
};

const CenterComparison = ({
  score,
  reason,
  mx,
  co,
}: {
  score: number;
  reason: string;
  mx: Dish;
  co: Dish;
}) => {
  return (
    <aside className="flex flex-col justify-center rounded-[32px] border border-[#b05c2e]/15 bg-[#fffdf9] p-7 text-center shadow-[0_24px_60px_rgba(46,26,14,0.08)]">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#b05c2e] text-white">
        <ArrowLeftRight size={28} />
      </div>

      <span className="font-serif text-6xl font-black leading-none text-[#b05c2e]">
        {score}%
      </span>

      <p className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-[#7a5a48]">
        Similitud sensorial
      </p>

      <div className="my-7 h-px bg-[#b05c2e]/20" />

      <ComparisonBlock
        icon={Sparkles}
        title="Similitud principal"
        text={`${reason}.`}
      />

      <ComparisonBlock
        icon={Utensils}
        title="Lectura cultural"
        text={`Ambos platos dialogan desde ingredientes, técnicas y memorias distintas: ${mx.name} representa una tradición mexicana, mientras ${co.name} conserva una identidad colombiana propia.`}
      />

      <div className="mt-6 space-y-4 text-left">
        <StatBar label="Sabor" value={score} />
        <StatBar label="Textura" value={Math.max(score - 8, 45)} />
        <StatBar label="Intensidad" value={Math.max(score - 12, 40)} />
      </div>
    </aside>
  );
};

const InfoPill = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => {
  return (
    <div className="rounded-2xl border border-[#b05c2e]/10 bg-[#fff8ef] p-4">
      <Icon className="mb-3 text-[#b05c2e]" size={20} />

      <p className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#9b6a4d]">
        {label}
      </p>

      <p className="text-sm font-bold text-[#2e1a0e]">{value}</p>
    </div>
  );
};

const ComparisonBlock = ({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) => {
  return (
    <div className="mb-6 text-left">
      <div className="mb-2 flex items-center gap-2">
        <Icon size={17} className="text-[#b05c2e]" />
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#b05c2e]">
          {title}
        </p>
      </div>

      <p className="text-sm leading-7 text-[#6b4a38]">{text}</p>
    </div>
  );
};

const StatBar = ({ label, value }: { label: string; value: number }) => {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <div>
      <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[0.12em] text-[#7a5a48]">
        <span>{label}</span>
        <span>{safeValue}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#ead8c5]">
        <div
          className="h-full rounded-full bg-[#b05c2e]"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
};

export default Comparator;