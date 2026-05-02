import { describe, expect, it } from "vitest";
import { createShareLinks } from "./share";

describe("share utilities", () => {
  it("creates encoded social sharing links", () => {
    const links = createShareLinks(
      "https://saborsinestech.com/maridaje/dish-co-001",
      "Arepa de queso"
    );

    expect(links.whatsapp).toContain("Arepa%20de%20queso");
    expect(links.facebook).toContain(
      "saborsinestech.com%2Fmaridaje%2Fdish-co-001"
    );
    expect(links.x).toContain("twitter.com/intent/tweet");
  });
});