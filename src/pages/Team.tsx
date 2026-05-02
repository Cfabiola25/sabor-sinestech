import Seo from "../components/seo/Seo";
import MembersSection from "../components/sections/MembersSection";

const Team = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#faf6ef] text-[#2e1a0e]">
      <Seo
        title="Equipo del proyecto"
        description="Conoce al equipo interdisciplinario de SaborSinestech y su participación en la experiencia COIL México-Colombia."
        path="/equipo"
      />
      <MembersSection />
    </main>
  );
};

export default Team;