import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { Dish } from "../../types/content";
import { useContentLoading } from "../../hooks/useContentLoading";
import { useDishes } from "../../hooks/useDishes";
import { usePairings } from "../../hooks/usePairings";
import SkeletonCard from "../ui/SkeletonCard";
import { getDishImage } from "../../utils/getDishImage";

const ITEMS_PER_PAGE = 10;

const normalizeText = (value?: string) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const normalizeId = (value?: string) =>
  normalizeText(value)
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getDishKeywords = (dish: Dish) => {
  const possibleIngredients = "ingredients" in dish ? dish.ingredients : [];

  const ingredients = Array.isArray(possibleIngredients)
    ? possibleIngredients
    : [];

  return [
    ...ingredients,
    dish.dominantFlavor,
    dish.texture,
    dish.intensity,
    ...(dish.secondaryFlavors ?? []),
  ]
    .filter(Boolean)
    .slice(0, 6);
};

const DishesSection = () => {
  const navigate = useNavigate();

  const dishes = useDishes();
  const pairings = usePairings();
  const isLoading = useContentLoading(450);

  const [selectedDishId, setSelectedDishId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("Todos");
  const [flavorFilter, setFlavorFilter] = useState("Todos");

  const countries = useMemo(() => {
    return ["Todos", ...Array.from(new Set(dishes.map((dish) => dish.country)))];
  }, [dishes]);

  const flavors = useMemo(() => {
    return [
      "Todos",
      ...Array.from(new Set(dishes.map((dish) => dish.dominantFlavor))),
    ];
  }, [dishes]);

  const filteredDishes = useMemo(() => {
    const search = normalizeText(searchTerm);

    return dishes.filter((dish) => {
      const searchableText = normalizeText(
        [
          dish.name,
          dish.country,
          dish.region,
          dish.dominantFlavor,
          dish.texture,
          dish.intensity,
          ...(dish.secondaryFlavors ?? []),
        ].join(" ")
      );

      const matchesSearch = !search || searchableText.includes(search);
      const matchesCountry =
        countryFilter === "Todos" || dish.country === countryFilter;
      const matchesFlavor =
        flavorFilter === "Todos" || dish.dominantFlavor === flavorFilter;

      return matchesSearch && matchesCountry && matchesFlavor;
    });
  }, [dishes, searchTerm, countryFilter, flavorFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDishes.length / ITEMS_PER_PAGE)
  );

  const paginatedDishes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDishes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDishes, currentPage]);

  const currentSelectedDish = useMemo(() => {
    if (!selectedDishId) return null;

    return (
      filteredDishes.find(
        (dish) => normalizeId(dish.id) === normalizeId(selectedDishId)
      ) ?? null
    );
  }, [filteredDishes, selectedDishId]);

  const selectedPairing = useMemo(() => {
    if (!currentSelectedDish) return null;

    return (
      pairings.find(
        (pairing) =>
          normalizeId(pairing.dishId) === normalizeId(currentSelectedDish.id)
      ) ?? null
    );
  }, [pairings, currentSelectedDish]);

  useEffect(() => {
    if (!selectedDishId) return;

    const selectedStillExists = filteredDishes.some(
      (dish) => normalizeId(dish.id) === normalizeId(selectedDishId)
    );

    if (!selectedStillExists) {
      setSelectedDishId(null);
    }
  }, [filteredDishes, selectedDishId]);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const resetPagination = () => {
    setCurrentPage(1);
    setSelectedDishId(null);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    resetPagination();
  };

  const handleCountryChange = (value: string) => {
    setCountryFilter(value);
    resetPagination();
  };

  const handleFlavorChange = (value: string) => {
    setFlavorFilter(value);
    resetPagination();
  };

  const handleSelectDish = (dish: Dish) => {
    setSelectedDishId(dish.id);

    window.setTimeout(() => {
      document
        .getElementById("detalle-maridaje")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const handleChangePage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(nextPage);
    setSelectedDishId(null);

    window.setTimeout(() => {
      document
        .getElementById("platillos")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <section
      id="platillos"
      className="relative overflow-hidden bg-[#faf6ef] bg-[radial-gradient(ellipse_80%_60%_at_10%_0%,#f0e4d0_0%,transparent_55%),radial-gradient(ellipse_60%_50%_at_90%_100%,#ede0cc_0%,transparent_50%)] px-5 py-24 md:px-8 md:py-28"
      aria-labelledby="platillos-title"
    >
      <div className="relative z-10 mx-auto max-w-[1360px]">
        <header className="mb-14 max-w-[720px] md:mb-16">
          <div className="mb-6 flex items-center gap-3.5">
            <span className="h-[1.5px] w-10 bg-[#b05c2e]" aria-hidden="true" />
            <p className="m-0 text-[11px] font-medium uppercase tracking-[0.22em] text-[#b05c2e]">
              Galería principal
            </p>
          </div>

          <h2
            id="platillos-title"
            className="m-0 mb-6 font-serif text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.02em] text-[#2e1a0e]"
          >
            Exploración de
            <br />
            <em className="italic text-[#b05c2e]">Platillos</em>
          </h2>

          <p className="m-0 max-w-xl text-base font-light leading-7 text-[#7a5a48]">
            Selecciona un platillo típico de México o Colombia para descubrir su
            perfil sensorial, su contexto cultural y un maridaje intercultural
            recomendado.
          </p>
        </header>

        <div
          className="mb-12 grid gap-4 rounded-3xl border border-[#b05c2e]/[0.12] bg-[#fffdf9] p-5 shadow-[0_20px_50px_rgba(46,26,14,0.06)] md:grid-cols-3"
          aria-label="Filtros de platillos"
        >
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#b05c2e]">
              Buscar platillo
            </span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Ej: ajiaco, taco, tamal..."
              className="rounded-xl border border-[#b05c2e]/20 bg-white px-4 py-3 text-sm text-[#2e1a0e] outline-none transition placeholder:text-[#9b7a62] focus:border-[#b05c2e]"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#b05c2e]">
              País
            </span>
            <select
              value={countryFilter}
              onChange={(event) => handleCountryChange(event.target.value)}
              className="rounded-xl border border-[#b05c2e]/20 bg-white px-4 py-3 text-sm text-[#2e1a0e] outline-none transition focus:border-[#b05c2e]"
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#b05c2e]">
              Sabor dominante
            </span>
            <select
              value={flavorFilter}
              onChange={(event) => handleFlavorChange(event.target.value)}
              className="rounded-xl border border-[#b05c2e]/20 bg-white px-4 py-3 text-sm text-[#2e1a0e] outline-none transition focus:border-[#b05c2e]"
            >
              {flavors.map((flavor) => (
                <option key={flavor} value={flavor}>
                  {flavor}
                </option>
              ))}
            </select>
          </label>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7"
            aria-label="Cargando platillos"
          >
            {Array.from({ length: 6 }, (_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : filteredDishes.length === 0 ? (
          <div
            className="rounded-3xl border border-[#b05c2e]/[0.12] bg-[#fffdf9] px-6 py-14 text-center"
            aria-live="polite"
          >
            <p className="font-serif text-2xl text-[#2e1a0e]">
              No encontramos platillos con esos filtros.
            </p>
            <p className="mt-2 text-sm text-[#7a5a48]">
              Prueba con otro nombre, país o sabor dominante.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7">
              {paginatedDishes.map((dish, index) => {
                const isSelected =
                  normalizeId(currentSelectedDish?.id) === normalizeId(dish.id);

                const realIndex =
                  (currentPage - 1) * ITEMS_PER_PAGE + index + 1;

                return (
                  <article
                    key={dish.id}
                    className={`group flex flex-col overflow-hidden rounded-[20px] border bg-[#fffdf9] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#b05c2e]/30 hover:shadow-[0_20px_50px_rgba(46,26,14,0.12),0_4px_16px_rgba(46,26,14,0.06)] ${
                      isSelected
                        ? "border-[#b05c2e] shadow-[0_0_0_2px_rgba(176,92,46,0.2)]"
                        : "border-[#b05c2e]/[0.12]"
                    }`}
                  >
                    <div className="relative h-[200px] overflow-hidden">
                      <img
                        src={getDishImage(dish.image)}
                        alt={`${dish.name}, platillo representativo de ${dish.region}, ${dish.country}.`}
                        onError={(event) => {
                          event.currentTarget.src = getDishImage();
                        }}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                        loading="lazy"
                        decoding="async"
                      />

                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#2e1a0e]/35 to-transparent"
                        aria-hidden="true"
                      />

                      <span
                        className="absolute right-4 top-3.5 font-serif text-[13px] font-semibold tracking-[0.06em] text-white/80"
                        aria-hidden="true"
                      >
                        {String(realIndex).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col gap-2.5 px-5 py-5">
                      <p className="m-0 text-[11px] font-medium uppercase tracking-[0.14em] text-[#b05c2e]">
                        {dish.country} · {dish.region}
                      </p>

                      <h3 className="m-0 font-serif text-[1.45rem] font-semibold leading-tight tracking-[-0.01em] text-[#2e1a0e]">
                        {dish.name}
                      </h3>

                      <div className="mt-0.5 flex flex-wrap gap-1.5">
                        <span className="rounded-full border border-[#7a3e18]/15 bg-[#f5e8d8] px-2.5 py-[3px] text-[11px] text-[#7a3e18]">
                          {dish.dominantFlavor}
                        </span>

                        <span className="rounded-full border border-[#5a4a38]/[0.12] bg-[#ede9e2] px-2.5 py-[3px] text-[11px] text-[#5a4a38]">
                          {dish.texture}
                        </span>

                        <span className="rounded-full border border-[#6b4a30]/[0.12] bg-[#f8f0e8] px-2.5 py-[3px] text-[11px] text-[#6b4a30]">
                          {dish.intensity}
                        </span>
                      </div>

                      <div className="mt-auto flex gap-2 pt-3">
                        <button
                          type="button"
                          className="flex flex-1 items-center justify-center gap-2 rounded-[10px] border-0 bg-[#2e1a0e] px-4 py-2.5 text-[13px] font-medium tracking-[0.02em] text-[#f5e8d8] transition hover:-translate-y-px hover:bg-[#b05c2e] active:translate-y-0"
                          onClick={() => handleSelectDish(dish)}
                          aria-label={`Ver detalle de ${dish.name}`}
                        >
                          Ver detalle
                        </button>

                        <button
                          type="button"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border-[1.5px] border-[#2e1a0e]/20 bg-transparent text-[#5a3820] transition hover:-translate-y-px hover:border-[#b05c2e] hover:bg-[#b05c2e]/[0.06]"
                          onClick={() => navigate(`/maridaje/${dish.id}`)}
                          aria-label={`Ver página completa de ${dish.name}`}
                        >
                          <ExternalLink size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-[1.5rem] border border-[#efd4bd] bg-white/75 p-5 shadow-[0_18px_55px_rgba(91,45,20,0.06)] backdrop-blur md:flex-row">
                <button
                  type="button"
                  onClick={() => handleChangePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#e2ad86] bg-white px-7 py-4 text-sm font-bold text-[#7a3d25] transition hover:-translate-y-0.5 hover:bg-[#fff1e4] disabled:cursor-not-allowed disabled:opacity-40 md:w-auto"
                >
                  <ChevronLeft size={19} />
                  Anterior
                </button>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;

                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => handleChangePage(page)}
                        aria-current={currentPage === page ? "page" : undefined}
                        aria-label={`Ir a la página ${page}`}
                        className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition ${
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
                  onClick={() => handleChangePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#b05c2e] px-7 py-4 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#8f4525] disabled:cursor-not-allowed disabled:opacity-40 md:w-auto"
                >
                  Siguiente
                  <ChevronRight size={19} />
                </button>
              </div>
            )}

            <p
              className="mt-5 text-center text-sm font-light text-[#7a5a48]"
              aria-live="polite"
            >
              Página {currentPage} de {totalPages} · Mostrando{" "}
              {paginatedDishes.length} de {filteredDishes.length} platillos
              filtrados
            </p>
          </>
        )}

        {currentSelectedDish && (
          <section
            id="detalle-maridaje"
            className="mt-24 scroll-mt-36"
            aria-labelledby="detalle-maridaje-title"
          >
            <div className="mb-10 flex items-center gap-3.5">
              <span className="h-[1.5px] w-10 bg-[#b05c2e]" aria-hidden="true" />
              <p className="m-0 text-[11px] font-medium uppercase tracking-[0.22em] text-[#b05c2e]">
                Maridaje seleccionado
              </p>
            </div>

            <div className="grid min-h-[520px] grid-cols-1 overflow-hidden rounded-3xl border border-[#b05c2e]/[0.14] bg-[#fffdf9] shadow-[0_30px_80px_rgba(46,26,14,0.09)] md:grid-cols-2">
              <div className="relative overflow-hidden">
                <img
                  src={getDishImage(currentSelectedDish.image)}
                  alt={`${currentSelectedDish.name}, platillo representativo de ${currentSelectedDish.region}, ${currentSelectedDish.country}.`}
                  onError={(event) => {
                    event.currentTarget.src = getDishImage();
                  }}
                  className="block h-full min-h-[340px] w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2e1a0e]/70 to-transparent px-6 pb-5 pt-8">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#fff8f0]/80">
                    {currentSelectedDish.country} · {currentSelectedDish.region}
                  </span>
                </div>
              </div>

              <div className="flex flex-col px-8 py-10 lg:px-14 lg:py-12">
                <h2
                  id="detalle-maridaje-title"
                  className="m-0 mb-6 font-serif text-[clamp(2rem,3.5vw,3rem)] font-bold leading-tight tracking-[-0.02em] text-[#2e1a0e]"
                >
                  {currentSelectedDish.name}
                </h2>

                <div
                  className="mb-8 h-0.5 w-12 rounded bg-[#b05c2e]"
                  aria-hidden="true"
                />

                <div className="mb-7">
                  <p className="m-0 mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#b05c2e]">
                    Perfil sensorial
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {getDishKeywords(currentSelectedDish).map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-[#5a3820]/[0.14] bg-[#f2e9dd] px-3.5 py-1.5 text-[12.5px] text-[#5a3820]"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-7">
                  <p className="m-0 mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#b05c2e]">
                    Maridaje recomendado
                  </p>

                  <p className="m-0 font-serif text-[1.6rem] font-semibold italic leading-snug text-[#2e1a0e]">
                    {selectedPairing?.pairingName ?? "Maridaje no disponible"}
                  </p>
                </div>

                <div className="mb-7">
                  <p className="m-0 text-[0.93rem] font-light leading-7 text-[#6b4a38]">
                    {selectedPairing?.justification ??
                      "Este platillo todavía no tiene una justificación de maridaje registrada en el catálogo."}
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-auto inline-flex items-center gap-2.5 self-start rounded-xl border-0 bg-[#2e1a0e] px-6 py-3.5 text-sm font-medium tracking-[0.03em] text-[#f5e8d8] transition hover:-translate-y-0.5 hover:bg-[#b05c2e] hover:shadow-[0_8px_24px_rgba(176,92,46,0.3)]"
                  onClick={() => navigate(`/maridaje/${currentSelectedDish.id}`)}
                >
                  Ver página completa
                  <ExternalLink size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default DishesSection;