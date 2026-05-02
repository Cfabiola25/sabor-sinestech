import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, RotateCcw, Sparkles, XCircle } from "lucide-react";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "¿Qué ingrediente conecta fuertemente la cocina tradicional de México y Colombia?",
    options: ["Maíz", "Salmón", "Trigo sarraceno", "Wasabi"],
    correctAnswer: "Maíz",
    explanation:
      "El maíz es base cultural y gastronómica en ambos países: aparece en tortillas, arepas, tamales, envueltos y muchas preparaciones tradicionales.",
  },
  {
    id: 2,
    question: "¿Qué bebida colombiana puede relacionarse sensorialmente con sabores dulces y aromáticos?",
    options: ["Café", "Té matcha", "Sake", "Kéfir"],
    correctAnswer: "Café",
    explanation:
      "El café colombiano tiene notas aromáticas, tostadas y dulces que pueden crear maridajes con postres, panes y preparaciones especiadas.",
  },
  {
    id: 3,
    question: "¿Qué preparación mexicana suele asociarse con sabores intensos, picantes y especiados?",
    options: ["Mole", "Ajiaco", "Changua", "Pandebono"],
    correctAnswer: "Mole",
    explanation:
      "El mole combina chiles, especias, semillas y, en algunas versiones, cacao. Por eso tiene una identidad sensorial compleja.",
  },
  {
    id: 4,
    question: "¿Qué plato colombiano se asocia principalmente con maíz y textura suave o esponjosa?",
    options: ["Arepa", "Taco al pastor", "Pozole", "Guacamole"],
    correctAnswer: "Arepa",
    explanation:
      "La arepa es una preparación emblemática de Colombia hecha a base de maíz, con múltiples versiones regionales.",
  },
  {
    id: 5,
    question: "En una experiencia sinestésica gastronómica, ¿qué se busca conectar?",
    options: [
      "Sabores, emociones, colores y sonidos",
      "Solo calorías y precios",
      "Solo recetas escritas",
      "Únicamente ingredientes importados",
    ],
    correctAnswer: "Sabores, emociones, colores y sonidos",
    explanation:
      "La sinestesia gastronómica permite relacionar lo que se prueba con sensaciones visuales, auditivas, emocionales y culturales.",
  },
];

const getResultMessage = (score: number, total: number) => {
  const percentage = score / total;

  if (percentage === 1) {
    return {
      title: "¡Lo lograste de forma perfecta!",
      message:
        "Dominas muy bien la conexión gastronómica entre México y Colombia. Tienes una lectura cultural y sensorial muy sólida.",
    };
  }

  if (percentage >= 0.7) {
    return {
      title: "¡Muy buen resultado!",
      message:
        "Tienes una buena comprensión de los sabores, ingredientes y vínculos culturales. Puedes reforzar algunos detalles para perfeccionarlo.",
    };
  }

  if (percentage >= 0.4) {
    return {
      title: "Vas por buen camino",
      message:
        "Reconoces varios elementos importantes, pero puedes mejorar explorando más platillos, maridajes y contextos culturales.",
    };
  }

  return {
    title: "Aún puedes mejorar",
    message:
      "Te invitamos a leer mejor las secciones de platillos, países y maridajes. Luego puedes volver a intentarlo y comparar tu avance.",
  };
};

const QuizSection = () => {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const totalQuestions = QUESTIONS.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const result = useMemo(
    () => getResultMessage(score, totalQuestions),
    [score, totalQuestions]
  );

  const handleSelectAnswer = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (answer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === totalQuestions - 1) {
      setFinished(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
  };

  if (!started) {
    return (
      <section className="relative overflow-hidden bg-[#faf6ef] px-4 py-24 text-[#2e1a0e] md:px-8">
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-[#b05c2e]/10 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-[#e5b85c]/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#b05c2e]/20 bg-white/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b05c2e]">
              <Sparkles size={15} />
              Quiz sensorial
            </div>

            <h2 className="max-w-3xl font-serif text-5xl font-bold leading-[0.95] text-[#2e1a0e] md:text-7xl">
              ¿Qué tanto aprendiste?
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#5a3820] md:text-lg">
              Antes de terminar la experiencia, pon a prueba tus sentidos.
              Responde algunas preguntas sobre sabores, ingredientes, cultura y
              conexiones gastronómicas entre México y Colombia.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[#2e1a0e] px-6 py-3 text-sm font-semibold text-[#f8efe4] shadow-[0_12px_30px_rgba(46,26,14,0.18)] transition hover:-translate-y-0.5 hover:bg-[#b05c2e]"
              >
                Iniciar quiz
                <ArrowRight size={17} />
              </button>

              <Link
                to="/platillos"
                className="inline-flex items-center rounded-full border border-[#2e1a0e]/15 bg-white/60 px-6 py-3 text-sm font-semibold text-[#2e1a0e] no-underline transition hover:border-[#b05c2e]/40 hover:bg-white"
              >
                Repasar platillos
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-[2rem] border border-[#b05c2e]/15 bg-white/70 p-6 shadow-[0_20px_70px_rgba(46,26,14,0.10)] backdrop-blur"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b05c2e]">
              Dinámica
            </p>

            <div className="mt-6 space-y-4">
              {[
                "Responde preguntas cortas.",
                "Recibe retroalimentación inmediata.",
                "Al final verás tu puntaje.",
                "Puedes volver a intentarlo para mejorar.",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-[#faf6ef] p-4 text-sm text-[#5a3820]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2e1a0e] text-xs font-bold text-[#f8efe4]">
                    {index + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (finished) {
    return (
      <section className="relative overflow-hidden bg-[#faf6ef] px-4 py-24 text-[#2e1a0e] md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-[2rem] border border-[#b05c2e]/15 bg-white/75 p-8 shadow-[0_20px_70px_rgba(46,26,14,0.10)] md:p-12"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#b05c2e]/10 text-[#b05c2e]">
              <Sparkles size={30} />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b05c2e]">
              Resultado final
            </p>

            <h2 className="mt-4 font-serif text-4xl font-bold text-[#2e1a0e] md:text-6xl">
              {result.title}
            </h2>

            <p className="mt-5 text-2xl font-bold text-[#b05c2e]">
              Sacaste {score} de {totalQuestions}
            </p>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#5a3820]">
              {result.message}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-2 rounded-full bg-[#2e1a0e] px-6 py-3 text-sm font-semibold text-[#f8efe4] transition hover:-translate-y-0.5 hover:bg-[#b05c2e]"
              >
                <RotateCcw size={17} />
                Intentar de nuevo
              </button>

              <Link
                to="/maridajes"
                className="inline-flex items-center rounded-full border border-[#2e1a0e]/15 bg-[#faf6ef] px-6 py-3 text-sm font-semibold text-[#2e1a0e] no-underline transition hover:border-[#b05c2e]/40 hover:bg-white"
              >
                Explorar maridajes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#faf6ef] px-4 py-24 text-[#2e1a0e] md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b05c2e]">
              Pregunta {currentIndex + 1} de {totalQuestions}
            </p>

            <p className="text-sm font-semibold text-[#5a3820]">
              Puntaje: {score}
            </p>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#e8d8c5]">
            <motion.div
              className="h-full rounded-full bg-[#b05c2e]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.3 }}
            className="rounded-[2rem] border border-[#b05c2e]/15 bg-white/75 p-6 shadow-[0_20px_70px_rgba(46,26,14,0.10)] md:p-10"
          >
            <h2 className="font-serif text-3xl font-bold leading-tight text-[#2e1a0e] md:text-5xl">
              {currentQuestion.question}
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {currentQuestion.options.map((option) => {
                const selected = selectedAnswer === option;
                const correct = option === currentQuestion.correctAnswer;
                const showCorrect = selectedAnswer && correct;
                const showWrong = selected && !correct;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelectAnswer(option)}
                    disabled={Boolean(selectedAnswer)}
                    className={`flex min-h-[72px] items-center justify-between rounded-2xl border px-5 py-4 text-left text-sm font-semibold transition ${
                      showCorrect
                        ? "border-green-500 bg-green-50 text-green-800"
                        : showWrong
                          ? "border-red-400 bg-red-50 text-red-800"
                          : selected
                            ? "border-[#b05c2e] bg-[#b05c2e]/10 text-[#2e1a0e]"
                            : "border-[#2e1a0e]/10 bg-[#faf6ef] text-[#5a3820] hover:border-[#b05c2e]/40 hover:bg-white"
                    }`}
                  >
                    <span>{option}</span>

                    {showCorrect && <CheckCircle2 size={20} />}
                    {showWrong && <XCircle size={20} />}
                  </button>
                );
              })}
            </div>

            {selectedAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-8 rounded-2xl border p-5 ${
                  isCorrect
                    ? "border-green-500/30 bg-green-50"
                    : "border-[#b05c2e]/20 bg-[#faf6ef]"
                }`}
              >
                <p className="font-semibold text-[#2e1a0e]">
                  {isCorrect ? "¡Correcto!" : "Casi, pero no era esa."}
                </p>

                <p className="mt-2 text-sm leading-7 text-[#5a3820]">
                  {currentQuestion.explanation}
                </p>

                <button
                  type="button"
                  onClick={handleNext}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#2e1a0e] px-5 py-2.5 text-sm font-semibold text-[#f8efe4] transition hover:bg-[#b05c2e]"
                >
                  {currentIndex === totalQuestions - 1 ? "Ver resultado" : "Siguiente"}
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            )}
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default QuizSection;