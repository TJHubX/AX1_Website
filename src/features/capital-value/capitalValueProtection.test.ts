import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildCalculationSummary,
  calculateCapitalValueProtection,
  calculateGovernanceCapacity,
  EMPTY_CAPITAL_INPUTS,
  EMPTY_GOVERNANCE_INPUTS,
  EXAMPLE_CAPITAL_INPUTS,
  formatCurrency,
  validateCapitalInputs,
  type CapitalCalculatorInput,
} from './capitalValueProtection.js';
import { narrativeEvidence, numericalEvidence } from './industryEvidence.js';

function example(overrides: Partial<CapitalCalculatorInput> = {}): CapitalCalculatorInput {
  return { ...EXAMPLE_CAPITAL_INPUTS, ...overrides };
}

test('calculates the complete £100m example exactly', () => {
  const result = calculateCapitalValueProtection(example());
  assert.ok(result);
  assert.equal(result.costOverrunExposure, 10_000_000);
  assert.equal(result.delayedCapital, 50_000_000);
  assert.equal(result.delayCarryingCost, 1_000_000);
  assert.equal(result.identifiedExecutionExposure, 11_000_000);
  assert.equal(result.valueOfOnePercent, 110_000);
  assert.equal(result.scenarioValues[5], 550_000);
  assert.equal(result.scenarioValues[10], 1_100_000);
  assert.equal(result.scenarioValues[15], 1_650_000);
});

test('uses percentage cost-overrun mode', () => {
  const result = calculateCapitalValueProtection(example({ costOverrunPercent: 12 }));
  assert.equal(result?.costOverrunExposure, 12_000_000);
});

test('uses known-amount cost-overrun mode', () => {
  const result = calculateCapitalValueProtection(example({
    costOverrunMode: 'amount',
    knownCostOverrunAmount: 7_500_000,
  }));
  assert.ok(result);
  assert.equal(result.costOverrunExposure, 7_500_000);
  assert.equal(result.delayCarryingCost, 1_000_000);
  assert.equal(result.identifiedExecutionExposure, 8_500_000);
  assert.equal(result.valueOfOnePercent, 85_000);
  assert.equal(result.scenarioValues[10], 850_000);
  assert.equal(result.selectedValueProtected, 850_000);
});

test('includes delay carrying cost when enabled', () => {
  const result = calculateCapitalValueProtection(example({ includeDelayCarryingCost: true }));
  assert.equal(result?.identifiedExecutionExposure, 11_000_000);
});

test('excludes delay carrying cost when disabled', () => {
  const result = calculateCapitalValueProtection(example({ includeDelayCarryingCost: false }));
  assert.equal(result?.identifiedExecutionExposure, 10_000_000);
  assert.equal(result?.valueOfOnePercent, 100_000);
  assert.equal(result?.selectedValueProtected, 1_000_000);
});

test('handles zero delay', () => {
  const result = calculateCapitalValueProtection(example({ averageDelayMonths: 0 }));
  assert.equal(result?.delayCarryingCost, 0);
  assert.equal(result?.identifiedExecutionExposure, 10_000_000);
});

test('handles zero capital affected by delay', () => {
  const result = calculateCapitalValueProtection(example({ capitalAffectedByDelayPercent: 0 }));
  assert.equal(result?.delayedCapital, 0);
  assert.equal(result?.delayCarryingCost, 0);
  assert.equal(result?.identifiedExecutionExposure, 10_000_000);
});

test('handles zero overrun', () => {
  const result = calculateCapitalValueProtection(example({ costOverrunPercent: 0 }));
  assert.equal(result?.costOverrunExposure, 0);
  assert.equal(result?.identifiedExecutionExposure, 1_000_000);
});

test('excludes optional categories by default', () => {
  const result = calculateCapitalValueProtection(example({
    optionalReworkCost: 400_000,
    optionalDelayedOperatingValue: 300_000,
    optionalGovernanceCapacityValue: 200_000,
  }));
  assert.equal(result?.includedOptionalCosts, 0);
  assert.equal(result?.identifiedExecutionExposure, 11_000_000);
});

test('includes optional categories only when explicitly enabled', () => {
  const result = calculateCapitalValueProtection(example({
    optionalReworkCost: 400_000,
    includeOptionalReworkCost: true,
    optionalDelayedOperatingValue: 300_000,
    includeOptionalDelayedOperatingValue: true,
    optionalGovernanceCapacityValue: 200_000,
    includeOptionalGovernanceCapacityValue: true,
  }));
  assert.equal(result?.includedOptionalCosts, 900_000);
  assert.equal(result?.identifiedExecutionExposure, 11_900_000);
});

for (const percentage of [1, 5, 10, 15] as const) {
  test(`calculates the ${percentage}% scenario`, () => {
    const result = calculateCapitalValueProtection(example({ selectedImprovementPercent: percentage }));
    assert.equal(result?.selectedValueProtected, 11_000_000 * percentage / 100);
  });
}

test('accepts a custom 25% maximum scenario', () => {
  const result = calculateCapitalValueProtection(example({ selectedImprovementPercent: 25 }));
  assert.equal(result?.selectedValueProtected, 2_750_000);
});

test('currency switching changes formatting and does not convert the number', () => {
  const value = calculateCapitalValueProtection(example())?.identifiedExecutionExposure;
  assert.equal(value, 11_000_000);
  assert.equal(formatCurrency(value as number, 'GBP'), '£11,000,000');
  assert.equal(formatCurrency(value as number, 'EUR'), '€11,000,000');
  assert.equal(formatCurrency(value as number, 'USD'), 'US$11,000,000');
});

test('empty and partially typed inputs remain incomplete', () => {
  assert.equal(calculateCapitalValueProtection({ ...EMPTY_CAPITAL_INPUTS }), null);
  assert.equal(calculateCapitalValueProtection({
    ...EMPTY_CAPITAL_INPUTS,
    capitalUnderExecution: 100_000_000,
  }), null);
});

test('negative values produce validation errors', () => {
  const errors = validateCapitalInputs(example({ capitalUnderExecution: -1, averageDelayMonths: -2 }));
  assert.ok(errors.capitalUnderExecution);
  assert.ok(errors.averageDelayMonths);
});

test('out-of-range values produce validation errors', () => {
  const errors = validateCapitalInputs(example({
    costOverrunPercent: 501,
    capitalAffectedByDelayPercent: 101,
    averageDelayMonths: 121,
    annualCarryingRatePercent: 101,
    selectedImprovementPercent: 26,
  }));
  assert.ok(errors.costOverrunPercent);
  assert.ok(errors.capitalAffectedByDelayPercent);
  assert.ok(errors.averageDelayMonths);
  assert.ok(errors.annualCarryingRatePercent);
  assert.ok(errors.selectedImprovementPercent);
});

test('NaN and Infinity never produce a result', () => {
  assert.equal(calculateCapitalValueProtection(example({ costOverrunPercent: Number.NaN })), null);
  assert.equal(calculateCapitalValueProtection(example({ capitalUnderExecution: Number.POSITIVE_INFINITY })), null);
});

test('reset example is stable and reproduces the published example', () => {
  const reset = { ...EXAMPLE_CAPITAL_INPUTS };
  assert.equal(calculateCapitalValueProtection(reset)?.identifiedExecutionExposure, 11_000_000);
});

test('clear all leaves core financial fields empty', () => {
  assert.equal(EMPTY_CAPITAL_INPUTS.capitalUnderExecution, null);
  assert.equal(EMPTY_CAPITAL_INPUTS.costOverrunPercent, null);
  assert.equal(EMPTY_CAPITAL_INPUTS.capitalAffectedByDelayPercent, null);
  assert.equal(EMPTY_CAPITAL_INPUTS.averageDelayMonths, null);
  assert.equal(EMPTY_CAPITAL_INPUTS.annualCarryingRatePercent, null);
});

test('governance capacity preserves decisions × people × hours × cost logic', () => {
  assert.equal(calculateGovernanceCapacity({
    decisionsPerMonth: 6,
    peoplePerDecision: 7,
    preparationHoursPerPerson: 4,
    blendedHourlyCost: 85,
  }), 171_360);
  assert.equal(calculateGovernanceCapacity({ ...EMPTY_GOVERNANCE_INPUTS }), null);
});

test('copy summary contains the calculation, assumptions and disclaimer', () => {
  const input = example();
  const result = calculateCapitalValueProtection(input);
  assert.ok(result);
  const summary = buildCalculationSummary(input, result, 'GBP');
  assert.match(summary, /Capital under execution: £100,000,000/);
  assert.match(summary, /Identified execution exposure: £11,000,000/);
  assert.match(summary, /Value of each 1% improvement: £110,000/);
  assert.match(summary, /10% reduction in identified exposure/);
  assert.match(summary, /not a guarantee/i);
  assert.doesNotMatch(summary, /NaN|Infinity/);
});

test('copy summary states when calculated delay cost is excluded', () => {
  const input = example({ includeDelayCarryingCost: false });
  const result = calculateCapitalValueProtection(input);
  assert.ok(result);
  const summary = buildCalculationSummary(input, result, 'GBP');
  assert.match(summary, /Delay carrying cost: £1,000,000 \(calculated but excluded from combined exposure\)/);
  assert.match(summary, /Identified execution exposure: £10,000,000/);
  assert.match(summary, /Value of each 1% improvement: £100,000/);
});

test('evidence records retain official HTTPS sources and accessible titles', () => {
  const records = [...narrativeEvidence, ...numericalEvidence];
  assert.equal(records.length, 7);
  for (const record of records) {
    assert.match(record.sourceUrl, /^https:\/\//);
    assert.ok(record.organisation.length > 0);
    assert.ok(record.sourceTitle.length > 0);
    assert.ok(record.evidenceType.length > 0);
  }
});
