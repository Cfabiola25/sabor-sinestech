export type Country = "México" | "Colombia";

export type Intensity =
  | "Baja"
  | "Media"
  | "Media Alta"
  | "Alta"
  | "Fuerte"
  | "Suave";

export interface Dish {
  id: string;
  name: string;
  country: Country;
  region: string;

  // Clasificación gastronómica (opcional pero recomendado)
  courseType?: string;

  // Perfil sensorial
  dominantFlavor: string;
  secondaryFlavors: string[];
  texture: string;
  intensity: Intensity | string;

  // Extras para experiencia
  sensoryProfile?: string;
  experienceTags?: string[];

  // Media
  image: string;

  // Contexto cultural
  culturalNote?: string;
}

export interface Pairing {
  id: string;
  dishId: string;
  pairingName: string;
  pairingType: string;
  sensoryCategory: string;
  justification: string;

  description?: string;
  culturalContext?: string;
  audioMood?: string;
  recommendedSound?: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  answerId: string;
}