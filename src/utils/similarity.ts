import type { Dish } from "../types/content";

export type SuggestedPair = {
  mx: Dish;
  co: Dish;
  score: number;
  reason: string;
};

export const normalizeSimilarityText = (value?: string) => {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export const getCountry = (dish: Dish) => {
  const id = normalizeSimilarityText(dish.id).toUpperCase();

  if (id.startsWith("MX")) return "México";
  if (id.startsWith("CO")) return "Colombia";

  return dish.country;
};

export const getIntensityValue = (intensity?: string) => {
  const value = normalizeSimilarityText(intensity);

  if (value.includes("baja") || value.includes("suave")) return 1;
  if (value.includes("media")) return 2;
  if (value.includes("alta") || value.includes("fuerte")) return 3;

  return 2;
};

export const getSimilarity = (a: Dish, b: Dish) => {
  let score = 0;

  if (
    normalizeSimilarityText(a.dominantFlavor) ===
    normalizeSimilarityText(b.dominantFlavor)
  ) {
    score += 35;
  }

  if (normalizeSimilarityText(a.texture) === normalizeSimilarityText(b.texture)) {
    score += 25;
  }

  const intensityDiff = Math.abs(
    getIntensityValue(a.intensity) - getIntensityValue(b.intensity)
  );

  score += intensityDiff === 0 ? 20 : intensityDiff === 1 ? 10 : 0;

  const flavorsA = (a.secondaryFlavors ?? []).map(normalizeSimilarityText);
  const flavorsB = (b.secondaryFlavors ?? []).map(normalizeSimilarityText);

  const sharedFlavors = flavorsA.filter((flavor) => flavorsB.includes(flavor));

  score += Math.min(sharedFlavors.length * 10, 20);

  return Math.min(score, 100);
};

export const getReason = (a: Dish, b: Dish) => {
  const reasons: string[] = [];

  if (
    normalizeSimilarityText(a.dominantFlavor) ===
    normalizeSimilarityText(b.dominantFlavor)
  ) {
    reasons.push(`comparten sabor dominante ${a.dominantFlavor}`);
  }

  if (normalizeSimilarityText(a.texture) === normalizeSimilarityText(b.texture)) {
    reasons.push(`tienen textura ${a.texture}`);
  }

  if (getIntensityValue(a.intensity) === getIntensityValue(b.intensity)) {
    reasons.push(`manejan intensidad ${a.intensity}`);
  }

  const normalizedB = (b.secondaryFlavors ?? []).map(normalizeSimilarityText);

  const sharedFlavors = (a.secondaryFlavors ?? []).filter((flavor) =>
    normalizedB.includes(normalizeSimilarityText(flavor))
  );

  if (sharedFlavors.length > 0) {
    reasons.push(
      `coinciden en notas como ${sharedFlavors.slice(0, 2).join(", ")}`
    );
  }

  return reasons.length > 0
    ? reasons.join(", ")
    : "presentan perfiles gastronómicos cercanos por contraste equilibrado";
};

export const buildSuggestedPairs = (
  dishes: Dish[],
  limit = 6
): SuggestedPair[] => {
  const mexico = dishes.filter((dish) => getCountry(dish) === "México");
  const colombia = dishes.filter((dish) => getCountry(dish) === "Colombia");

  return mexico
    .flatMap((mx) =>
      colombia.map((co) => ({
        mx,
        co,
        score: getSimilarity(mx, co),
        reason: getReason(mx, co),
      }))
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};