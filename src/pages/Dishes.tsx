import Seo from "../components/seo/Seo";
import DishesSection from "../components/sections/DishesSection";

const Dishes = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#faf6ef] text-[#2e1a0e]">
      <Seo
        title="Platillos típicos"
        description="Explora platillos representativos de Colombia y México con ingredientes, regiones, perfiles de sabor y contexto cultural."
        path="/platillos"
      />
      <DishesSection />
    </main>
  );
};

export default Dishes;