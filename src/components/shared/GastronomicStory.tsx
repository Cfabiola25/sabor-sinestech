import type { Dish } from "../../types/content";
import { useI18n } from "../../contexts/I18nProvider";

type GastronomicStoryProps = {
  dish: Dish;
};

const buildInfluence = (dish: Dish) => {
  const base =
    dish.country === "México"
      ? "maíz, chile y técnicas regionales"
      : "maíz, tubérculos y tradición familiar";

  return `Su identidad combina ${base}, con una experiencia sensorial marcada por el sabor ${dish.dominantFlavor.toLowerCase()} y una textura ${dish.texture.toLowerCase()}.`;
};

const GastronomicStory = ({ dish }: GastronomicStoryProps) => {
  const { t } = useI18n();

  const highlights = [
    dish.dominantFlavor,
    ...(dish.secondaryFlavors ?? []).slice(0, 3),
  ].filter(Boolean);

  return (
    <section
      className="mt-8 rounded-3xl border border-[#b05c2e]/15 bg-white p-6 shadow-sm"
      aria-labelledby="gastronomic-story-title"
    >
      <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-[#b05c2e]">
        {t("story.title")}
      </p>

      <h3
        id="gastronomic-story-title"
        className="mb-5 text-2xl font-black text-[#4b2a21]"
      >
        {dish.name} como relato cultural
      </h3>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl bg-[#fff7ed] p-4">
          <h4 className="mb-2 text-sm font-black text-[#4b2a21]">
            {t("story.origin")}
          </h4>
          <p className="text-sm leading-6 text-[#6b4a3f]">
            {dish.culturalNote ??
              `Representa prácticas alimentarias de ${dish.region}, ${dish.country}.`}
          </p>
        </article>

        <article className="rounded-2xl bg-[#fff7ed] p-4">
          <h4 className="mb-2 text-sm font-black text-[#4b2a21]">
            {t("story.ingredients")}
          </h4>

          <div className="flex flex-wrap gap-2">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#b05c2e]/20 px-3 py-1 text-xs font-bold text-[#b05c2e]"
              >
                {item}
              </span>
            ))}
          </div>
        </article>

        <article className="rounded-2xl bg-[#fff7ed] p-4">
          <h4 className="mb-2 text-sm font-black text-[#4b2a21]">
            {t("story.influence")}
          </h4>
          <p className="text-sm leading-6 text-[#6b4a3f]">
            {buildInfluence(dish)}
          </p>
        </article>
      </div>
    </section>
  );
};

export default GastronomicStory;