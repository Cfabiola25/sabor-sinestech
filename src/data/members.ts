const memberImages = import.meta.glob("../assets/images/members/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const getMemberImage = (name: string) =>
  memberImages[`../assets/images/members/${name}.webp`];

export interface Member {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  category: string;
  description: string;
  image: string;
  social?: {
    linkedin?: string;
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
      "Responsable de la arquitectura visual, el desarrollo frontend, la experiencia de usuario y la integración interactiva de la plataforma SaborSinestech.",
    image: getMemberImage("nelly"),
  },
  {
    id: "m2",
    name: "Dana Sofia Garcia Salgado",
    role: "Investigadora gastronómica en formación",
    affiliation: "Licenciatura en Gastronomía",
    category: "Gastronomía y Maridaje",
    description:
      "Participó en la investigación comparativa sobre los enfoques de maridaje en México y Colombia, analizando ingredientes tradicionales, bebidas representativas, influencias culturales y diferencias gastronómicas.",
    image: getMemberImage("dana"),
  },
  {
    id: "m3",
    name: "Adriana Yañez Hernandez",
    role: "Investigadora gastronómica en formación",
    affiliation: "Licenciatura en Gastronomía",
    category: "Gastronomía y Maridaje",
    description:
      "Realizó un estudio comparativo del maridaje en la cultura mexicana y colombiana, documentando tipos de maridaje, ingredientes, bebidas emblemáticas y factores culturales que influyen en las preferencias gastronómicas.",
    image: getMemberImage("adriana"),
  },
  {
    id: "m4",
    name: "Marco Antonio Orduño Miranda",
    role: "Investigador gastronómico en formación",
    affiliation: "Licenciatura en Gastronomía",
    category: "Gastronomía y Maridaje",
    description:
      "Apoyó el desarrollo del concepto de maridaje México–Colombia mediante la organización de contenidos y la selección de platillos, ingredientes y bebidas representativas de ambos países.",
    image: getMemberImage("marco"),
  },
  {
    id: "m5",
    name: "Luis Angel Romero Alvarez",
    role: "Investigador gastronómico en formación",
    affiliation: "Licenciatura en Gastronomía",
    category: "Gastronomía y Maridaje",
    description:
      "Colaboró en la estructuración de la información gastronómica y en la elección de platillos, ingredientes y bebidas representativas, integrando elementos culturales para formular propuestas de maridaje armónicas.",
    image: getMemberImage("luis"),
  },
  {
    id: "m6",
    name: "Frida Liliana Segovia Lozano",
    role: "Investigadora gastronómica en formación",
    affiliation: "Licenciatura en Gastronomía",
    category: "Gastronomía y Maridaje",
    description:
      "Aportó al desarrollo conceptual del proyecto, la organización temática y la elaboración de un documento base con platillos representativos de Colombia y México junto con sus propuestas de maridaje.",
    image: getMemberImage("frida"),
  },
  {
    id: "m7",
    name: "Cristian Alfonso Montes Aguilera",
    role: "Investigador gastronómico en formación",
    affiliation: "Licenciatura en Gastronomía",
    category: "Gastronomía y Maridaje",
    description:
      "Organizó información, referencias, fichas de platillos y contenidos gastronómicos necesarios para fortalecer la narrativa académica y cultural del proyecto.",
    image: getMemberImage("cristian"),
  },
];