import Seo from "../components/seo/Seo";
import CountriesSection from "../components/sections/CountriesSection";

const Countries = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#faf6ef] text-[#2e1a0e]">
      <Seo
        title="Países e infografías gastronómicas"
        description="Conoce datos culturales, geográficos e ingredientes principales de México y Colombia dentro del proyecto COIL."
        path="/paises"
      />
      <CountriesSection />
    </main>
  );
};

export default Countries;