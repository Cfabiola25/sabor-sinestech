import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Seo from "./components/seo/Seo";
import { I18nProvider } from "./contexts/I18nProvider";

const Home = lazy(() => import("./pages/Home"));
const Dishes = lazy(() => import("./pages/Dishes"));
const Maridaje = lazy(() => import("./pages/Maridaje"));
const Comparator = lazy(() => import("./pages/Comparator"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Countries = lazy(() => import("./pages/Countries"));
const Pairings = lazy(() => import("./pages/Pairings"));
const Team = lazy(() => import("./pages/Team"));

const PageLoader = () => (
  <main
    className="min-h-screen bg-[#faf6ef] px-6 py-24 text-center text-[#4b2a21]"
    aria-live="polite"
  >
    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#b05c2e]/20 border-t-[#b05c2e]" />
    <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em]">
      Cargando experiencia
    </p>
  </main>
);

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);

      if (el) {
        window.setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }

      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.hash]);

  return null;
};

const NotFound = () => (
  <main className="min-h-screen bg-[#faf6ef] px-6 py-24 text-center">
    <Seo
      title="Página no encontrada"
      description="La página solicitada no existe dentro de SaborSinestech."
      path="/404"
    />

    <h1 className="text-4xl font-black text-[#4b2a21]">
      404 - Página no encontrada
    </h1>
  </main>
);

function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <ScrollManager />
        <Header />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/platillos" element={<Dishes />} />
            <Route path="/paises" element={<Countries />} />
            <Route path="/maridajes" element={<Pairings />} />
            <Route path="/maridaje/:id" element={<Maridaje />} />
            <Route path="/comparador" element={<Comparator />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/equipo" element={<Team />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Footer />
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App;