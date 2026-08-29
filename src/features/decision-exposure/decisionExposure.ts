export type DecisionExposureResult = {
  carryingBurden: number;
  sevenDayBurden: number;
};

export function calculateDecisionExposure(capital: number, annualRatePercent: number, days: number): DecisionExposureResult {
  const safeCapital = Number.isFinite(capital) ? Math.max(0, capital) : 0;
  const safeRate = Number.isFinite(annualRatePercent) ? Math.max(0, annualRatePercent) : 0;
  const safeDays = Number.isFinite(days) ? Math.max(0, days) : 0;
  return {
    carryingBurden: safeCapital * (safeRate / 100) * (safeDays / 365),
    sevenDayBurden: safeCapital * (safeRate / 100) * (7 / 365),
  };
}

