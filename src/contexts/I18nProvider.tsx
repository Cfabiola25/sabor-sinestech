import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type Language = "es" | "en";
type Dictionary = Record<string, string>;

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const STORAGE_KEY = "sabor-sinestech-language";

const dictionaries: Record<Language, Dictionary> = {
  es: {
    "nav.home": "Inicio",
    "nav.dishes": "Platillos",
    "nav.countries": "Países",
    "nav.pairings": "Maridajes",
    "nav.comparator": "Comparador",
    "nav.quiz": "Quiz",
    "nav.team": "Equipo",

    "header.explore": "Explorar",
    "header.exploreDishes": "Explorar platillos",

    "language.label": "Idioma",

    "share.title": "Comparte esta experiencia",
    "share.native": "Compartir",
    "share.whatsapp": "WhatsApp",
    "share.facebook": "Facebook",
    "share.x": "X",

    "story.title": "Historia gastronómica",
    "story.origin": "Origen cultural",
    "story.ingredients": "Ingredientes protagonistas",
    "story.influence": "Influencia culinaria",
  },
  en: {
    "nav.home": "Home",
    "nav.dishes": "Dishes",
    "nav.countries": "Countries",
    "nav.pairings": "Pairings",
    "nav.comparator": "Comparator",
    "nav.quiz": "Quiz",
    "nav.team": "Team",

    "header.explore": "Explore",
    "header.exploreDishes": "Explore dishes",

    "language.label": "Language",

    "share.title": "Share this experience",
    "share.native": "Share",
    "share.whatsapp": "WhatsApp",
    "share.facebook": "Facebook",
    "share.x": "X",

    "story.title": "Gastronomic story",
    "story.origin": "Cultural origin",
    "story.ingredients": "Main ingredients",
    "story.influence": "Culinary influence",
  },
};

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "es";

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" ? "en" : "es";
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () =>
        setLanguage((current) => (current === "es" ? "en" : "es")),
      t: (key) => dictionaries[language][key] ?? dictionaries.es[key] ?? key,
    }),
    [language]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n debe usarse dentro de I18nProvider.");
  }

  return context;
};