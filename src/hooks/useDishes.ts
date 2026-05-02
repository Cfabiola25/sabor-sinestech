import { useMemo } from "react";
import { getDishes } from "../services/dishService";

export const useDishes = () => {
  return useMemo(() => getDishes(), []);
};