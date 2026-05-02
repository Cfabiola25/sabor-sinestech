import { useMemo } from "react";
import { getPairings } from "../services/pairingService";

export const usePairings = () => {
  return useMemo(() => getPairings(), []);
};