import { describe, expect, it } from "vitest";
import type { Dish } from "../types/content";
import { buildSuggestedPairs, getIntensityValue, getSimilarity } from "./similarity";

const mexicoDish: Dish = {
  id: "MX-test",
  name: "Taco de Maíz",
  country: "México",
  region: "Centro",
  dominantFlavor: "Salado",
  secondaryFlavors: ["Maíz", "Picante", "Crujiente"],
  texture: "Crujiente",
  intensity: "Media",
  image: "placeholder.webp",
};

const colombiaDish: Dish = {
  id: "CO-test",
  name: "Empanada de Maíz",
  country: "Colombia",
  region: "Nacional",
  dominantFlavor: "Salado",
  secondaryFlavors: ["Maíz", "Picante", "Frito"],
  texture: "Crujiente",
  intensity: "Media",
  image: "placeholder.webp",
};

describe("similarity utilities", () => {
  it("maps intensity labels to comparable numeric values", () => {
    expect(getIntensityValue("Suave")).toBe(1);
    expect(getIntensityValue("Media")).toBe(2);
    expect(getIntensityValue("Fuerte")).toBe(3);
  });

  it("returns a high score when two dishes share flavor, texture, intensity and notes", () => {
    expect(getSimilarity(mexicoDish, colombiaDish)).toBeGreaterThanOrEqual(80);
  });

  it("builds cross-country suggestions ordered by score", () => {
    const suggestions = buildSuggestedPairs([mexicoDish, colombiaDish], 1);

    expect(suggestions).toHaveLength(1);
    expect(suggestions[0].mx.country).toBe("México");
    expect(suggestions[0].co.country).toBe("Colombia");
    expect(suggestions[0].score).toBeGreaterThan(0);
  });
});