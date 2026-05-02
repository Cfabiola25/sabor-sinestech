import { useParams } from "react-router-dom";
import Seo from "../components/seo/Seo";
import GastronomicStory from "../components/shared/GastronomicStory";
import ShareButtons from "../components/shared/ShareButtons";
import { useDishes } from "../hooks/useDishes";
import { usePairings } from "../hooks/usePairings";
import { getDishImage } from "../utils/getDishImage";
import placeholder from "../assets/images/placeholder.webp";

const Maridaje = () => {
  const { id } = useParams();
  const dishes = useDishes();
  const pairings = usePairings();

  const dish = dishes.find((d) => d.id === id);
  const pairing = pairings.find((p) => p.dishId === id);

  if (!dish) {
    return (
      <main className="px-6 py-20 pt-40">
        <Seo
          title="Platillo no encontrado"
          description="No se encontró el platillo solicitado dentro del catálogo de SaborSinestech."
          path={`/maridaje/${id ?? "no-encontrado"}`}
        />
        <h1 className="text-4xl font-black">Platillo no encontrado</h1>
      </main>
    );
  }

  const dishImage = getDishImage(dish.image);

  return (
    <main className="overflow-x-hidden bg-[#fff7ed] px-6 py-20 pt-40 dark:bg-[#120b08]">
      <Seo
        title={`Maridaje de ${dish.name}`}
        description={`Explora el maridaje intercultural de ${dish.name}, un platillo de ${dish.country} con perfil ${dish.dominantFlavor}.`}
        path={`/maridaje/${dish.id}`}
        type="article"
      />

      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-xs font-black uppercase tracking-[0.3em] text-[#b85c38]">
          Ficha del platillo
        </p>

        <h1 className="mb-8 text-4xl font-black text-[#4b2a21] dark:text-[#f5e8d8]">
          Detalle de maridaje
        </h1>

        <div className="grid overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-xl dark:border-white/10 dark:bg-[#1b100c] lg:grid-cols-[1.1fr_1fr]">
          <div className="relative min-h-[420px]">
            <img
              src={dishImage}
              alt={dish.name}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = placeholder;
              }}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-xs font-black uppercase tracking-[0.25em]">
                {dish.region}
              </p>
              <h2 className="mt-2 text-4xl font-black">{dish.name}</h2>
              <p className="mt-1 text-sm">{dish.country}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-[#b85c38] dark:bg-white/10 dark:text-[#f5c89a]">
                {dish.dominantFlavor}
              </span>
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-[#b85c38] dark:bg-white/10 dark:text-[#f5c89a]">
                {dish.texture}
              </span>
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-[#b85c38] dark:bg-white/10 dark:text-[#f5c89a]">
                {dish.intensity}
              </span>
            </div>

            <h3 className="mb-3 text-xl font-black text-[#4b2a21] dark:text-[#f5e8d8]">
              Maridaje intercultural
            </h3>

            <div className="mb-8 rounded-2xl border border-orange-200 bg-[#fff7ed] p-5 dark:border-white/10 dark:bg-white/10">
              <p className="text-xs text-[#8a6a5f] dark:text-[#f5e8d8]/60">
                Producto sugerido de otro país
              </p>

              <h4 className="mt-1 text-2xl font-black text-[#bf5f3a] dark:text-[#f5c89a]">
                {pairing?.pairingName ?? "Maridaje no registrado"}
              </h4>

              <p className="mt-3 text-sm leading-relaxed text-[#6b4a3f] dark:text-[#f5e8d8]/70">
                {pairing?.justification ??
                  "Este platillo todavía no tiene una justificación registrada."}
              </p>
            </div>

            <h3 className="mb-3 text-xl font-black text-[#4b2a21] dark:text-[#f5e8d8]">
              Contexto cultural
            </h3>

            <p className="text-sm leading-relaxed text-[#6b4a3f] dark:text-[#f5e8d8]/70">
              Este platillo representa la identidad gastronómica de {dish.region}, con un perfil de
              sabor <strong>{dish.dominantFlavor}</strong>, textura{" "}
              <strong>{dish.texture}</strong> e intensidad <strong>{dish.intensity}</strong>.
            </p>

            <div className="mt-8">
              <ShareButtons
                title={`Maridaje de ${dish.name}`}
                text={`Descubre el maridaje intercultural de ${dish.name} en SaborSinestech.`}
                path={`/maridaje/${dish.id}`}
              />
            </div>
          </div>
        </div>

        <GastronomicStory dish={dish} />
      </div>
    </main>
  );
};

export default Maridaje;