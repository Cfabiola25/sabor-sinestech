import Seo from "../components/seo/Seo";
import PairingEngine from "../components/sections/PairingEngine";

const Pairings = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#faf6ef] text-[#2e1a0e]">
      <Seo
        title="Maridajes interculturales"
        description="Descubre combinaciones sensoriales entre platillos mexicanos y colombianos con narrativa y perfiles de sabor."
        path="/maridajes"
      />
      <PairingEngine />
    </main>
  );
};

export default Pairings;