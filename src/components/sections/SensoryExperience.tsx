import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Coffee, Layers, Music, Eye } from 'lucide-react';

// Data describing each sensory dimension. The icons come from lucide-react
// and help communicate the concept quickly. Feel free to extend this
// array with additional senses or descriptions.
const sensoryItems = [
  {
    title: 'Sabor',
    icon: Utensils,
    description: 'Explora combinaciones de sabores dominantes y secundarios que despiertan el paladar.',
  },
  {
    title: 'Aroma',
    icon: Coffee,
    description: 'Los aromas evocan recuerdos y conectan culturas a través de sus fragancias.',
  },
  {
    title: 'Textura',
    icon: Layers,
    description: 'Las texturas aportan personalidad y sorpresa en cada bocado.',
  },
  {
    title: 'Sonido',
    icon: Music,
    description: 'El crujido o la suavidad también son parte de la experiencia sensorial.',
  },
  {
    title: 'Vista',
    icon: Eye,
    description: 'La presentación es arte; admira los colores y formas de cada platillo.',
  },
];

// SensoryExperience introduces the concept of multisensory gastronomy. Each card
// animates slightly on hover to encourage exploration. The layout is
// responsive, adjusting to different screen sizes gracefully.
const SensoryExperience: React.FC = () => {
  return (
    <section id="experiencia" className="py-24 px-4 bg-surface">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl text-on-background mb-12 text-center">
          Experiencia sensorial
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {sensoryItems.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}
              className="bg-background border border-accent/10 rounded-xl p-6 flex flex-col items-start"
            >
              <item.icon className="w-8 h-8 mb-4 text-primary" />
              <h4 className="font-serif text-xl mb-2 text-on-background">{item.title}</h4>
              <p className="text-sm text-on-background/70 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SensoryExperience;