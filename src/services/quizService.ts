import { quiz as rawQuiz } from "../data/quiz";
import type { QuizQuestion } from "../types/content";
import { assertUniqueIds, normalizeText, uniqueBy } from "../utils/dataQuality";

export const getQuizQuestions = (): QuizQuestion[] => {
  const normalized = rawQuiz
    .filter((question) => question.id && question.question && question.answerId)
    .map((question) => {
      const options = uniqueBy(
        question.options
          .filter((option) => option.id && option.text)
          .map((option) => ({
            id: normalizeText(option.id),
            text: normalizeText(option.text),
          })),
        (option) => `${option.id}-${option.text}`
      );

      return {
        id: normalizeText(question.id),
        question: normalizeText(question.question),
        options,
        answerId: normalizeText(question.answerId),
      };
    })
    .filter((question) => question.options.some((option) => option.id === question.answerId));

  const deduped = uniqueBy(normalized, (question) => question.question);
  return assertUniqueIds(deduped, "preguntas del quiz");
};
