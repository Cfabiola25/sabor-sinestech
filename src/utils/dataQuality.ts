export const normalizeText = (value = "") =>
  value.normalize("NFC").trim().replace(/\s+/g, " ");

export const normalizeKey = (value = "") =>
  normalizeText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const normalizeId = (value = "") =>
  normalizeKey(value)
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const titleCase = (value = "") => {
  const lowercaseWords = new Set([
    "de",
    "del",
    "la",
    "las",
    "el",
    "los",
    "y",
    "con",
    "en",
    "a",
  ]);

  return normalizeText(value)
    .toLowerCase()
    .split(" ")
    .map((word, index) => {
      if (index > 0 && lowercaseWords.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export const sentenceCase = (value = "") => {
  const text = normalizeText(value);
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const uniqueBy = <T>(items: T[], getKey: (item: T) => string) => {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = normalizeKey(getKey(item));

    if (!key || seen.has(key)) return false;

    seen.add(key);
    return true;
  });
};

export const hasUniqueIds = <T extends { id: string }>(items: T[]) => {
  const ids = items.map((item) => normalizeKey(item.id));
  return ids.length === new Set(ids).size;
};

export const assertUniqueIds = <T extends { id: string }>(
  items: T[],
  entityName: string
) => {
  if (!hasUniqueIds(items)) {
    throw new Error(
      `Hay IDs duplicados en ${entityName}. Revisa la fuente de datos.`
    );
  }

  return items;
};