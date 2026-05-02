import logoFesc from "../../assets/logos/logoFesc.png";
import logoTurismoMexico from "../../assets/logos/logoTurismoMexico.png";
import logoSoftware from "../../assets/logos/logoSoftware.png";

export type CountryCode = "MX" | "COL";

export type InstitutionLink = {
  id: string;
  country: CountryCode;
  full: string;
  logos: string[];
};

export type NavLinkItem = {
  name: string;
  to: string;
  labelKey: string;
};

export const INSTITUTIONS: InstitutionLink[] = [
  {
    id: "uabc",
    country: "MX",
    full: "Universidad Autónoma de Baja California",
    logos: [logoTurismoMexico],
  },
  {
    id: "fesc",
    country: "COL",
    full: "Fundación de Estudios Superiores Comfanorte",
    logos: [logoFesc, logoSoftware],
  },
];

export const NAV_LINKS: NavLinkItem[] = [
  { name: "Inicio", to: "/", labelKey: "nav.home" },
  { name: "Platillos", to: "/platillos", labelKey: "nav.dishes" },
  { name: "Países", to: "/paises", labelKey: "nav.countries" },
  { name: "Maridajes", to: "/maridajes", labelKey: "nav.pairings" },
  { name: "Comparador", to: "/comparador", labelKey: "nav.comparator" },
  { name: "Quiz", to: "/quiz", labelKey: "nav.quiz" },
  { name: "Equipo", to: "/equipo", labelKey: "nav.team" },
];