import { currencySymbol, formatMoney, type CurrencyCode } from '../../currency.js';

export type { CurrencyCode } from '../../currency.js';

export type CostOverrunMode = 'percentage' | 'amount';

export interface CapitalCalculatorInput {
  capitalUnderExecution: number | null;
  costOverrunMode: CostOverrunMode;
  costOverrunPercent: number | null;
  knownCostOverrunAmount: number | null;
  capitalAffectedByDelayPercent: number | null;
  averageDelayMonths: number | null;
  annualCarryingRatePercent: number | null;
  includeDelayCarryingCost: boolean;
  selectedImprovementPercent: number;
  optionalReworkCost: number | null;
  includeOptionalReworkCost: boolean;
  optionalDelayedOperatingValue: number | null;
  includeOptionalDelayedOperatingValue: boolean;
  optionalGovernanceCapacityValue: number | null;
  includeOptionalGovernanceCapacityValue: boolean;
}

export interface GovernanceCapacityInput {
  decisionsPerMonth: number | null;
  peoplePerDecision: number | null;
  preparationHoursPerPerson: number | null;
  blendedHourlyCost: number | null;
}

export interface CapitalCalculatorResult {
  costOverrunExposure: number;
  delayedCapital: number;
  delayCarryingCost: number;
  includedOptionalCosts: number;
  identifiedExecutionExposure: number;
  valueOfOnePercent: number;
  selectedValueProtected: number;
  scenarioValues: Record<number, number>;
}

export type CapitalInputErrors = Partial<Record<keyof CapitalCalculatorInput, string>>;

export const IMPROVEMENT_SCENARIOS = [1, 5, 10, 15] as const;
export const MAX_CURRENCY_VALUE = 1_000_000_000_000_000;

export const EXAMPLE_CAPITAL_INPUTS: CapitalCalculatorInput = {
  capitalUnderExecution: 100_000_000,
  costOverrunMode: 'percentage',
  costOverrunPercent: 10,
  knownCostOverrunAmount: null,
  capitalAffectedByDelayPercent: 50,
  averageDelayMonths: 3,
  annualCarryingRatePercent: 8,
  includeDelayCarryingCost: true,
  selectedImprovementPercent: 10,
  optionalReworkCost: null,
  includeOptionalReworkCost: false,
  optionalDelayedOperatingValue: null,
  includeOptionalDelayedOperatingValue: false,
  optionalGovernanceCapacityValue: null,
  includeOptionalGovernanceCapacityValue: false,
};

export const EMPTY_CAPITAL_INPUTS: CapitalCalculatorInput = {
  capitalUnderExecution: null,
  costOverrunMode: 'percentage',
  costOverrunPercent: null,
  knownCostOverrunAmount: null,
  capitalAffectedByDelayPercent: null,
  averageDelayMonths: null,
  annualCarryingRatePercent: null,
  includeDelayCarryingCost: true,
  selectedImprovementPercent: 10,
  optionalReworkCost: null,
  includeOptionalReworkCost: false,
  optionalDelayedOperatingValue: null,
  includeOptionalDelayedOperatingValue: false,
  optionalGovernanceCapacityValue: null,
  includeOptionalGovernanceCapacityValue: false,
};

export const EMPTY_GOVERNANCE_INPUTS: GovernanceCapacityInput = {
  decisionsPerMonth: null,
  peoplePerDecision: null,
  preparationHoursPerPerson: null,
  blendedHourlyCost: null,
};

function isFiniteNumber(value: number | null): value is number {
  return value !== null && Number.isFinite(value);
}

function validateRequiredNumber(
  value: number | null,
  label: string,
  min: number,
  max: number,
): string | undefined {
  if (value === null) return `${label} is required.`;
  if (!Number.isFinite(value)) return `${label} must be a valid number.`;
  if (value < min || value > max) return `${label} must be between ${min} and ${max}.`;
  return undefined;
}

export function validateCapitalInputs(input: CapitalCalculatorInput): CapitalInputErrors {
  const errors: CapitalInputErrors = {};

  errors.capitalUnderExecution = validateRequiredNumber(
    input.capitalUnderExecution,
    'Capital under execution',
    0,
    MAX_CURRENCY_VALUE,
  );

  if (input.costOverrunMode === 'percentage') {
    errors.costOverrunPercent = validateRequiredNumber(
      input.costOverrunPercent,
      'Typical cost overrun',
      0,
      500,
    );
  } else {
    errors.knownCostOverrunAmount = validateRequiredNumber(
      input.knownCostOverrunAmount,
      'Known cost overrun',
      0,
      MAX_CURRENCY_VALUE,
    );
  }

  errors.capitalAffectedByDelayPercent = validateRequiredNumber(
    input.capitalAffectedByDelayPercent,
    'Capital affected by delay',
    0,
    100,
  );
  errors.averageDelayMonths = validateRequiredNumber(input.averageDelayMonths, 'Average delay', 0, 120);
  errors.annualCarryingRatePercent = validateRequiredNumber(
    input.annualCarryingRatePercent,
    'Annual carrying rate',
    0,
    100,
  );
  errors.selectedImprovementPercent = validateRequiredNumber(
    input.selectedImprovementPercent,
    'Reduction in identified exposure',
    1,
    25,
  );

  if (input.includeOptionalReworkCost) {
    errors.optionalReworkCost = validateRequiredNumber(
      input.optionalReworkCost,
      'Known rework, claims or dispute cost',
      0,
      MAX_CURRENCY_VALUE,
    );
  }
  if (input.includeOptionalDelayedOperatingValue) {
    errors.optionalDelayedOperatingValue = validateRequiredNumber(
      input.optionalDelayedOperatingValue,
      'Known delayed operating value',
      0,
      MAX_CURRENCY_VALUE,
    );
  }
  if (input.includeOptionalGovernanceCapacityValue) {
    errors.optionalGovernanceCapacityValue = validateRequiredNumber(
      input.optionalGovernanceCapacityValue,
      'Decision-governance capacity value',
      0,
      MAX_CURRENCY_VALUE,
    );
  }

  return Object.fromEntries(Object.entries(errors).filter(([, error]) => error)) as CapitalInputErrors;
}

export function calculateGovernanceCapacity(input: GovernanceCapacityInput): number | null {
  const values = [
    input.decisionsPerMonth,
    input.peoplePerDecision,
    input.preparationHoursPerPerson,
    input.blendedHourlyCost,
  ];
  if (!values.every(isFiniteNumber) || values.some((value) => (value as number) < 0)) return null;

  return (
    (input.decisionsPerMonth as number)
    * 12
    * (input.peoplePerDecision as number)
    * (input.preparationHoursPerPerson as number)
    * (input.blendedHourlyCost as number)
  );
}

export function calculateCapitalValueProtection(
  input: CapitalCalculatorInput,
): CapitalCalculatorResult | null {
  if (Object.keys(validateCapitalInputs(input)).length > 0) return null;

  const capitalUnderExecution = input.capitalUnderExecution as number;
  const costOverrunExposure = input.costOverrunMode === 'percentage'
    ? capitalUnderExecution * (input.costOverrunPercent as number) / 100
    : input.knownCostOverrunAmount as number;
  const delayedCapital = capitalUnderExecution * (input.capitalAffectedByDelayPercent as number) / 100;
  const delayCarryingCost = delayedCapital
    * (input.annualCarryingRatePercent as number) / 100
    * (input.averageDelayMonths as number) / 12;

  const includedOptionalCosts = (
    (input.includeOptionalReworkCost ? input.optionalReworkCost as number : 0)
    + (input.includeOptionalDelayedOperatingValue ? input.optionalDelayedOperatingValue as number : 0)
    + (input.includeOptionalGovernanceCapacityValue ? input.optionalGovernanceCapacityValue as number : 0)
  );
  const identifiedExecutionExposure = costOverrunExposure
    + (input.includeDelayCarryingCost ? delayCarryingCost : 0)
    + includedOptionalCosts;
  const valueOfOnePercent = identifiedExecutionExposure * 0.01;
  const selectedValueProtected = identifiedExecutionExposure * input.selectedImprovementPercent / 100;
  const scenarioValues = Object.fromEntries(
    IMPROVEMENT_SCENARIOS.map((percentage) => [percentage, identifiedExecutionExposure * percentage / 100]),
  ) as Record<number, number>;

  const result = {
    costOverrunExposure,
    delayedCapital,
    delayCarryingCost,
    includedOptionalCosts,
    identifiedExecutionExposure,
    valueOfOnePercent,
    selectedValueProtected,
    scenarioValues,
  };

  return Object.values(result).some((value) => typeof value === 'number' && !Number.isFinite(value))
    ? null
    : result;
}

export function formatCurrency(value: number, currency: CurrencyCode): string {
  return formatMoney(value, currency);
}

export function formatCompactCurrency(value: number, currency: CurrencyCode): string {
  const symbol = currencySymbol(currency);

  const absolute = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  if (absolute >= 1_000_000_000) return `${sign}${symbol}${(absolute / 1_000_000_000).toFixed(1)}bn`;
  if (absolute >= 1_000_000) return `${sign}${symbol}${(absolute / 1_000_000).toFixed(1)}m`;
  if (absolute >= 1_000) return `${sign}${symbol}${(absolute / 1_000).toFixed(1)}k`;
  return formatCurrency(value, currency);
}

export function buildCalculationSummary(
  input: CapitalCalculatorInput,
  result: CapitalCalculatorResult,
  currency: CurrencyCode,
): string {
  const overrunBasis = input.costOverrunMode === 'percentage'
    ? `${input.costOverrunPercent}% of capital under execution`
    : 'known amount entered by the user';
  const delayStatus = input.includeDelayCarryingCost
    ? 'included in combined exposure'
    : 'calculated but excluded from combined exposure';

  return [
    'Axis One Capital Value Protection Calculator',
    `Capital under execution: ${formatCurrency(input.capitalUnderExecution as number, currency)}`,
    `Cost-overrun exposure: ${formatCurrency(result.costOverrunExposure, currency)} (${overrunBasis})`,
    `Delayed capital: ${formatCurrency(result.delayedCapital, currency)}`,
    `Delay carrying cost: ${formatCurrency(result.delayCarryingCost, currency)} (${delayStatus})`,
    `Identified execution exposure: ${formatCurrency(result.identifiedExecutionExposure, currency)}`,
    `Value of each 1% improvement: ${formatCurrency(result.valueOfOnePercent, currency)}`,
    `Selected scenario: ${input.selectedImprovementPercent}% reduction in identified exposure`,
    `Illustrative value potentially protected: ${formatCurrency(result.selectedValueProtected, currency)}`,
    `Assumptions: ${input.capitalAffectedByDelayPercent}% of capital affected by delay, ${input.averageDelayMonths} months average delay, ${input.annualCarryingRatePercent}% annual carrying rate. Currency changes display only; no FX conversion.`,
    'Disclaimer: This is an illustrative scenario based on the inputs supplied. It is not a guarantee, accounting valuation or predicted Axis One result. Validate material assumptions with Finance and the programme team.',
  ].join('\n');
}
