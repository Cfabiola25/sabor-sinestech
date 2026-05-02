import { describe, expect, it } from "vitest";
import { dishes } from "../data/dishes";
import { quiz } from "../data/quiz";
import { getPairings } from "../services/pairingService";
import { assertUniqueIds, normalizeKey, titleCase, uniqueBy } from "./dataQuality";

describe("data quality utilities", () => {
  it("normalizes accent-insensitive keys", () => {
    expect(normalizeKey("  México  ")).toBe("mexico");
  });

  it("formats names with gastronomic title casing", () => {
    expect(titleCase("tacos de pescado estilo baja")).toBe(
      "Tacos de Pescado Estilo Baja"
    );
  });

  it("removes duplicates by normalized key", () => {
    const items = uniqueBy(
      [
        { id: "A", name: "Arepa" },
        { id: "B", name: " arepa " },
      ],
      (item) => item.name
    );

    expect(items).toHaveLength(1);
  });

  it("keeps production datasets with unique ids", () => {
    const normalizedPairings = getPairings();

    expect(() => assertUniqueIds(dishes, "dishes")).not.toThrow();
    expect(() => assertUniqueIds(normalizedPairings, "pairings")).not.toThrow();
    expect(() => assertUniqueIds(quiz, "quiz")).not.toThrow();
  });

  it("keeps quiz answers linked to an existing option id", () => {
    const invalid = quiz.filter(
      (question) =>
        !question.options.some((option) => option.id === question.answerId)
    );

    expect(invalid).toHaveLength(0);
  });
});