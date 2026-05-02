import React from 'react';
import { Globe, BookOpen, Users, Sparkles } from 'lucide-react';

// Content representing the COIL methodology. Each item summarises a core
// aspect of the collaborative project and uses an icon to aid visual
// recognition. The colour palette aligns with the rest of the site.
const coilItems = [
  {
    title: 'Aprendizaje global',
    icon: Globe,
    description:
      'Intercambio transnacional de conocimientos culinarios y culturales entre México y Colombia.',
  },
  {
    title: 'Narrativa digital',
    icon: BookOpen,
    description:
      'Uso de tecnologías para contar historias gastronómicas y compartir experiencias sensoriales.',
  },
  {
    title: 'Colaboración académica',
    icon: Users,
    description:
      'Alumnos y docentes trabajan juntos en proyectos de investigación y maridaje intercultural.',
  },
  {
    title: 'Innovación cultural',
    icon: Sparkles,
    description:
      'Exploración de nuevas formas de maridar sabores ancestrales con creatividad contemporánea.',
  },
];

const CoilSection: React.FC = () => {
  return (
    <section id="coil" className="py-24 px-4 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl text-on-background mb-4">
            Sobre el proyecto COIL
          </h2>
          <p className="max-w-3xl mx-auto text-on-background/70 leading-relaxed">
            Una metodología de Aprendizaje Colaborativo Internacional en Línea (COIL) que conecta a
            estudiantes y docentes de México y Colombia para investigar, compartir y reinventar la
            gastronomía a través del maridaje intercultural.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coilItems.map((item) => (
            <div
              key={item.title}
              className="bg-background border border-accent/10 rounded-xl p-6 flex flex-col items-start hover:shadow-lg transition-shadow"
            >
              <item.icon className="w-8 h-8 mb-4 text-primary" />
              <h3 className="font-serif text-xl mb-2 text-on-background">{item.title}</h3>
              <p className="text-sm text-on-background/70 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoilSection;