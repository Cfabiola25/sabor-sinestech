export interface Member {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  category: string;
  description: string;
  image: string;
  social?: {
    instagram?: string;
    linkedin?: string;
    portfolio?: string;
  };
}

export const members: Member[] = [
  {
    id: "m1",
    name: "Nelly Fabiola Cano Oviedo",
    role: "Desarrolladora web del proyecto",
    affiliation: "Ingeniería de Software · FESC",
    category: "Desarrollo",
    description:
      "Responsable de la arquitectura visual, desarrollo frontend, experiencia de usuario e integración interactiva de la plataforma SaborSinestech.",
    image: "/members/nelly.jpg",
    social: {
      linkedin: "#",
      portfolio: "#",
    },
  },
  {
    id: "m2",
    name: "Dana Sofia Garcia Salgado",
    role: "Investigadora gastronómica en formación",
    affiliation: "Licenciatura en Gastronomía",
    category: "Gastronomía y Maridaje",
    description:
      "Apoya la investigación de ingredientes, técnicas culinarias y referentes culturales de la cocina mexicana y colombiana.",
    image: "/members/member-2.jpg",
    social: {
      instagram: "#",
    },
  },
  {
    id: "m3",
    name: "Adriana Yañez Hernandez",
    role: "Investigadora gastronómica en formación",
    affiliation: "Licenciatura en Gastronomía",
    category: "Gastronomía y Maridaje",
    description:
      "Participa en la selección de combinaciones gastronómicas, análisis sensorial y construcción de relaciones entre sabores, texturas y aromas.",
    image: "/members/member-3.jpg",
    social: {
      instagram: "#",
    },
  },
  {
    id: "m4",
    name: "Marco Antonio Orduño Miranda",
    role: "Investigadora gastronómica en formación",
    affiliation: "Licenciatura en Gastronomía",
    category: "Gastronomía y Maridaje",
    description:
      "Contribuye al análisis del contexto cultural de los platillos, sus regiones de origen y su valor dentro de la identidad alimentaria.",
    image: "/members/member-4.jpg",
    social: {
      instagram: "#",
    },
  },
  {
    id: "m5",
    name: "Luis Angel Romero Alvarez",
    role: "Investigadora gastronómica en formación",
    affiliation: "Licenciatura en Gastronomía",
    category: "Gastronomía y Maridaje",
    description:
      "Apoya la identificación de perfiles sensoriales como sabor dominante, intensidad, textura, aroma y experiencia emocional del maridaje.",
    image: "/members/member-5.jpg",
    social: {
      instagram: "#",
    },
  },
  {
    id: "m6",
    name: "Frida Liliana Segovia Lozano",
    role: "Investigadora gastronómica en formación",
    affiliation: "Licenciatura en Gastronomía",
    category: "Gastronomía y Maridaje",
    description:
      "Aporta información sobre preparaciones tradicionales, ingredientes característicos y técnicas propias de las cocinas regionales.",
    image: "/members/member-6.jpg",
    social: {
      instagram: "#",
    },
  },
  {
    id: "m7",
    name: "Cristian Alfonso Montes Aguilera",
    role: "Investigadora gastronómica en formación",
    affiliation: "Licenciatura en Gastronomía",
    category: "Gastronomía y Maridaje",
    description:
      "Organiza información, referencias, fichas de platillos y contenidos necesarios para fortalecer la narrativa académica del proyecto.",
    image: "/members/member-7.jpg",
    social: {
      instagram: "#",
    },
  },
];