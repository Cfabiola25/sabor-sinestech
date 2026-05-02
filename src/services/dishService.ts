import { dishes as rawDishes } from "../data/dishes";
import type { Dish } from "../types/content";
import { assertUniqueIds, titleCase, uniqueBy } from "../utils/dataQuality";

const cleanText = (value?: string) => {
  return String(value ?? "").trim();
};

const normalizeId = (value?: string) => {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const cleanArray = (values?: string[]) => {
  return Array.isArray(values)
    ? uniqueBy(
        values.map((value) => cleanText(value)).filter(Boolean),
        (value) => value.toLowerCase()
      )
    : [];
};

export const getDishes = (): Dish[] => {
  const normalized = rawDishes
    .filter((dish) => {
      return Boolean(dish.id && dish.name && dish.country && dish.region);
    })
    .map((dish) => ({
      ...dish,
      id: normalizeId(dish.id),
      name: cleanText(dish.name),
      country: dish.country,
      region: cleanText(dish.region),
      courseType: dish.courseType,
      dominantFlavor: cleanText(dish.dominantFlavor),
      secondaryFlavors: cleanArray(dish.secondaryFlavors),
      texture: cleanText(dish.texture),
      intensity: titleCase(dish.intensity),
      culturalNote: cleanText(dish.culturalNote),
      sensoryProfile: cleanText(dish.sensoryProfile),
      experienceTags: Array.isArray(dish.experienceTags)
        ? uniqueBy(dish.experienceTags, (tag) => tag)
        : [],
      image: cleanText(dish.image || "placeholder.png"),
    }));

  const deduped = uniqueBy(
    normalized,
    (dish) => `${dish.id}-${dish.name}-${dish.country}`
  );

  return assertUniqueIds(deduped, "platillos");
};