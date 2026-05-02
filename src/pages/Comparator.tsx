import Seo from "../components/seo/Seo";
import ComparatorSection from "../components/sections/Comparator";

const Comparator = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#faf6ef] text-[#2e1a0e]">
      <Seo
        title="Comparador de platillos"
        description="Compara platillos de México y Colombia según ingredientes, textura, intensidad, región y similitud gastronómica."
        path="/comparador"
      />
      <ComparatorSection />
    </main>
  );
};

export default Comparator;