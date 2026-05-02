import Seo from "../components/seo/Seo";
import QuizSection from "../components/sections/QuizSection";

const Quiz = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#faf6ef] text-[#2e1a0e]">
      <Seo
        title="Quiz sensorial"
        description="Pon a prueba tus conocimientos sobre maridajes, sabores, texturas y cultura gastronómica de México y Colombia."
        path="/quiz"
      />
      <QuizSection />
    </main>
  );
};

export default Quiz;