import { pairings as rawPairings } from "../data/pairings";
import type { Pairing } from "../types/content";
import {
  assertUniqueIds,
  normalizeId,
  normalizeText,
  titleCase,
  uniqueBy,
} from "../utils/dataQuality";

type RawPairing = Partial<Pairing> & {
  pairingKind?: string;
  pairingReason?: string;
  technicalReview?: string;
};

const buildPairingId = (pairing: RawPairing) => {
  return normalizeId(
    pairing.id ||
      `${pairing.dishId ?? "platillo"}-${pairing.pairingName ?? "maridaje"}`
  );
};

export const getPairings = (): Pairing[] => {
  const normalized = rawPairings
    .filter((pairing: RawPairing) => {
      return Boolean(
        pairing.dishId &&
          pairing.pairingName &&
          (pairing.justification || pairing.pairingReason)
      );
    })
    .map((pairing: RawPairing) => {
      const justification = normalizeText(
        pairing.justification || pairing.pairingReason
      );

      const culturalContext = normalizeText(
        pairing.culturalContext || pairing.technicalReview
      );

      return {
        id: buildPairingId(pairing),
        dishId: normalizeId(pairing.dishId),

        pairingName: titleCase(normalizeText(pairing.pairingName)),
        pairingType: titleCase(
          normalizeText(pairing.pairingType || pairing.pairingKind || "Maridaje")
        ),
        sensoryCategory: titleCase(
          normalizeText(pairing.sensoryCategory || "Sensorial")
        ),

        justification,
        description: normalizeText(pairing.description || justification),
        culturalContext,
      };
    });

  const deduped = uniqueBy(
    normalized,
    (pairing) => `${pairing.dishId}-${pairing.pairingName}`
  );

  return assertUniqueIds(deduped, "maridajes");
};