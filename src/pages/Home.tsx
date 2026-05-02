import Seo from "../components/seo/Seo";
import Hero from "../components/sections/Hero";
import CoilSection from "../components/sections/CoilSection";
import SensoryExperience from "../components/sections/SensoryExperience";
import MembersSection from "../components/sections/MembersSection";

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#faf6ef] text-[#2e1a0e]">
      <Seo
        title="SaborSinestech | Maridaje intercultural México-Colombia"
        description="Explora experiencias sensoriales y maridajes gastronómicos entre México y Colombia."
        path="/"
      />

      <main className="flex flex-col">
        <section id="inicio" className="relative">
          <Hero />
        </section>

        <section className="relative border-t border-[#b05c2e]/10 py-20 md:py-28">
          <CoilSection />
        </section>

        <section className="relative bg-[#f5e8d8] py-20 md:py-28">
          <SensoryExperience />
        </section>

        <section className="relative bg-[#fdfaf6] py-20 md:py-28">
          <MembersSection />
        </section>
      </main>
    </div>
  );
};

export default Home;