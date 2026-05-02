import { useMemo } from "react";
import { getQuizQuestions } from "../services/quizService";

export const useQuiz = () => {
  return useMemo(() => getQuizQuestions(), []);
};
