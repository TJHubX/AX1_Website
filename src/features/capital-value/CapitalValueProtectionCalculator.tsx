import React from 'react';
import {
  Calculator,
  Check,
  ChevronDown,
  CircleDollarSign,
  Copy,
  ExternalLink,
  Info,
  LockKeyhole,
  RefreshCcw,
  ShieldAlert,
  Trash2,
} from 'lucide-react';
import { Badge, Button } from '../../components';
import { BrandedSelect } from '../../components/BrandedSelect';
import {
  buildCalculationSummary,
  calculateCapitalValueProtection,
  calculateGovernanceCapacity,
  EMPTY_CAPITAL_INPUTS,
  EMPTY_GOVERNANCE_INPUTS,
  EXAMPLE_CAPITAL_INPUTS,
  formatCompactCurrency,
  formatCurrency,
  IMPROVEMENT_SCENARIOS,
  validateCapitalInputs,
  type CapitalCalculatorInput,
  type CurrencyCode,
  type GovernanceCapacityInput,
} from './capitalValueProtection';
import { narrativeEvidence, numericalEvidence } from './industryEvidence';

const observedOutcomeEvidence = numericalEvidence.filter(({ organisation }) =>
  organisation === 'Accenture' || organisation === 'PwC');

const externalPracticeBenchmarkEvidence = numericalEvidence.filter(({ organisation }) =>
  organisation === 'BCG' || organisation === 'McKinsey & Company');

type NumericInputKey = {
  [Key in keyof CapitalCalculatorInput]: CapitalCalculatorInput[Key] extends number | null ? Key : never;
}[keyof CapitalCalculatorInput];

type NumberFieldProps = {
  inputId?: string;
  label: string;
  helper: string;
  value: number | null;
  onChange: (value: number | null) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  error?: string;
  basis?: string;
};

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = { GBP: '£', EUR: '€', USD: '$' };

function formatInputNumber(value: number | null) {
  if (value === null || !Number.isFinite(value)) return '';
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 4 }).format(value);
}

function sanitiseNumberDraft(value: string) {
  const clean = value.replace(/[\s,]/g, '').replace(/[^\d.-]/g, '');
  const negative = clean.startsWith('-');
  const unsigned = clean.replace(/-/g, '');
  const [integer = '', ...fractionParts] = unsigned.split('.');
  const fraction = fractionParts.join('').slice(0, 4);
  const number = fractionParts.length > 0 ? `${integer}.${fraction}` : integer;
  return `${negative ? '-' : ''}${number}`;
}

function NumberField({
  inputId,
  label,
  helper,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  error,
  basis,
}: NumberFieldProps) {
  const generatedId = React.useId();
  const id = inputId ?? generatedId;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const [focused, setFocused] = React.useState(false);
  const [draft, setDraft] = React.useState(value === null ? '' : String(value));

  React.useEffect(() => {
    if (!focused) setDraft(value === null ? '' : String(value));
  }, [value, focused]);

  const updateDraft = (nextValue: string) => {
    const nextDraft = sanitiseNumberDraft(nextValue);
    setDraft(nextDraft);
    if (nextDraft === '' || nextDraft === '-' || nextDraft === '.' || nextDraft === '-.') {
      onChange(null);
      return;
    }
    const numeric = Number(nextDraft);
    if (Number.isFinite(numeric)) onChange(numeric);
  };

  return (
    <label className={`cvp-field${error ? ' has-error' : ''}`} htmlFor={id}>
      <span className="cvp-field-label">
        <span>{label}</span>
        {basis && <small className="cvp-basis-tag">{basis}</small>}
      </span>
      <span className="cvp-input-wrap">
        {prefix && <small aria-hidden="true">{prefix}</small>}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          data-min={min}
          data-max={max}
          data-step={step}
          value={focused ? draft : formatInputNumber(value)}
          aria-invalid={Boolean(error)}
          aria-describedby={`${helperId}${error ? ` ${errorId}` : ''}`}
          onFocus={() => {
            setDraft(value === null ? '' : String(value));
            setFocused(true);
          }}
          onBlur={() => setFocused(false)}
          onChange={(event) => updateDraft(event.target.value)}
        />
        {suffix && <small aria-hidden="true">{suffix}</small>}
      </span>
      <small id={helperId} className="cvp-field-helper">{helper}</small>
      {error && <small id={errorId} className="cvp-field-error">{error}</small>}
    </label>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  helper,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  helper: string;
}) {
  return (
    <label className="cvp-toggle">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span><strong>{label}</strong><small>{helper}</small></span>
      <i aria-hidden="true" />
    </label>
  );
}

function EvidenceLink({
  href,
  organisation,
  sourceTitle,
}: {
  href: string;
  organisation: string;
  sourceTitle: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read ${sourceTitle} by ${organisation}, opens in a new tab`}
    >
      View original source <ExternalLink size={13} aria-hidden="true" />
    </a>
  );
}

export function CapitalValueProtectionCalculator({
  onOpenAccess,
  showContext = true,
}: {
  onOpenAccess: () => void;
  showContext?: boolean;
}) {
  const [currency, setCurrency] = React.useState<CurrencyCode>('GBP');
  const [inputs, setInputs] = React.useState<CapitalCalculatorInput>({ ...EXAMPLE_CAPITAL_INPUTS });
  const [governanceInputs, setGovernanceInputs] = React.useState<GovernanceCapacityInput>({ ...EMPTY_GOVERNANCE_INPUTS });
  const [editedFields, setEditedFields] = React.useState<Set<string>>(new Set());
  const [isExample, setIsExample] = React.useState(true);
  const [copyState, setCopyState] = React.useState<'idle' | 'copied' | 'error'>('idle');

  const governanceCapacity = calculateGovernanceCapacity(governanceInputs);
  const calculationInputs = React.useMemo(() => ({
    ...inputs,
    optionalGovernanceCapacityValue: governanceCapacity,
  }), [inputs, governanceCapacity]);
  const errors = React.useMemo(() => validateCapitalInputs(calculationInputs), [calculationInputs]);
  const result = React.useMemo(() => calculateCapitalValueProtection(calculationInputs), [calculationInputs]);

  const markEdited = (field: string) => {
    setIsExample(false);
    setEditedFields((current) => new Set(current).add(field));
  };

  const updateInput = (key: NumericInputKey) => (value: number | null) => {
    markEdited(key);
    setInputs((current) => ({ ...current, [key]: value }));
  };

  const updateGovernance = (key: keyof GovernanceCapacityInput) => (value: number | null) => {
    markEdited(`governance-${key}`);
    setGovernanceInputs((current) => ({ ...current, [key]: value }));
  };

  const updateBoolean = (
    key: 'includeDelayCarryingCost'
      | 'includeOptionalReworkCost'
      | 'includeOptionalDelayedOperatingValue'
      | 'includeOptionalGovernanceCapacityValue',
  ) => (value: boolean) => {
    markEdited(key);
    setInputs((current) => ({ ...current, [key]: value }));
  };

  const setImprovement = (value: number) => {
    markEdited('selectedImprovementPercent');
    setInputs((current) => ({ ...current, selectedImprovementPercent: value }));
  };

  const resetExample = () => {
    setCurrency('GBP');
    setInputs({ ...EXAMPLE_CAPITAL_INPUTS });
    setGovernanceInputs({ ...EMPTY_GOVERNANCE_INPUTS });
    setEditedFields(new Set());
    setIsExample(true);
    setCopyState('idle');
  };

  const clearAll = () => {
    setInputs({ ...EMPTY_CAPITAL_INPUTS });
    setGovernanceInputs({ ...EMPTY_GOVERNANCE_INPUTS });
    setEditedFields(new Set());
    setIsExample(false);
    setCopyState('idle');
  };

  const basisFor = (field: string, assumption = false) => {
    if (editedFields.has(field)) return 'User-entered';
    return assumption ? 'Editable assumption' : 'Example value';
  };

  const copySummary = async () => {
    if (!result) return;
    const summary = buildCalculationSummary(calculationInputs, result, currency);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(summary);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = summary;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 2400);
    } catch {
      setCopyState('error');
    }
  };

  const fullMoney = (value: number) => formatCurrency(value, currency);
  const compactMoney = (value: number) => formatCompactCurrency(value, currency);
  const optionalRows = result ? [
    inputs.includeOptionalReworkCost && { label: 'Rework, claims or dispute cost', value: inputs.optionalReworkCost as number },
    inputs.includeOptionalDelayedOperatingValue && { label: 'Delayed operating value', value: inputs.optionalDelayedOperatingValue as number },
    inputs.includeOptionalGovernanceCapacityValue && governanceCapacity !== null && { label: 'Governance capacity value', value: governanceCapacity },
  ].filter(Boolean) as { label: string; value: number }[] : [];

  const [liveMessage, setLiveMessage] = React.useState('');
  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setLiveMessage(result
        ? `Estimated identified exposure ${fullMoney(result.identifiedExecutionExposure)}. Every one percent improvement is worth approximately ${fullMoney(result.valueOfOnePercent)}.`
        : 'The estimate is incomplete. Complete the required fields to calculate a result.');
    }, 450);
    return () => window.clearTimeout(timer);
  }, [result, currency]);

  const scrollToTarget = (targetId: string, focusTarget = false) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    if (focusTarget) {
      window.setTimeout(() => target.focus({ preventScroll: true }), reduceMotion ? 0 : 450);
    }
  };

  return (
    <section className="section decision-value-section" aria-labelledby={showContext ? 'capital-performance-heading' : 'decision-cost-title'}>
      {showContext && <article className="cvp-story" id="capital-performance">
        <div className="cvp-story-layout">
          <div className="cvp-story-copy">
            <Badge>Capital performance</Badge>
            <h2 id="capital-performance-heading">Capital is approved once.<br />Its value is won or lost through execution.</h2>
            <p>The investment decision is only the beginning. Value can continue to erode after approval when milestones, evidence, ownership, risk and capital-release decisions are managed across disconnected processes.</p>
            <p>Teams spend time reconciling information instead of acting on it. Approvals slow down. Risks remain open without clear ownership. Contingency is consumed without a complete view of execution. Capital decisions can move forward before delivery is sufficiently proven.</p>
          </div>

          <div className="cvp-story-definition">
            <span className="cvp-story-definition-kicker">Capital execution gap</span>
            <h3>What is disconnected capital execution?</h3>
            <p className="cvp-story-definition-lede">Disconnected capital execution is the gap between capital approval and verified delivery.</p>
            <p className="cvp-story-definition-detail">It occurs when the people making decisions, the teams executing the work and the evidence proving progress do not operate through the same governed system.</p>
            <div className="cvp-problem-cards">
              <article><b>01</b><div><strong>Fragmented evidence</strong><p>Progress information is spread across documents, meetings, emails and disconnected systems.</p></div></article>
              <article><b>02</b><div><strong>Delayed decisions</strong><p>Decision-makers do not receive complete, current and decision-ready information at the right moment.</p></div></article>
              <article><b>03</b><div><strong>Unverified capital release</strong><p>Funding, approvals or commitments move forward without a clear connection to verified execution.</p></div></article>
            </div>
          </div>
        </div>

        <div className="cvp-research-bridge">
          <span>The pattern is documented across the industry</span>
          <div>
            <p>Research from McKinsey, BCG, Accenture, PwC, Deloitte and EY examines different aspects of the same capital-performance problem: fragmented information, delayed decisions, weak governance, insufficient evidence and value lost during execution.</p>
            <strong>The external research demonstrates the scale of the issue. It does not determine the result of your calculation.</strong>
          </div>
        </div>

        <div className="cvp-story-transition">
          <div>
            <span>From industry context to your exposure</span>
            <h3>The problem is documented.<br />The estimate should be yours.</h3>
            <p>Benchmarks cannot tell you what disconnected execution may be costing your organisation. Your capital exposure depends on your portfolio, overruns, delays and financial assumptions.</p>
          </div>
          <div className="cvp-story-action">
            <p>Use your own figures below to estimate:</p>
            <ul>
              <li>Value exposed to cost overruns</li>
              <li>Carrying cost of delayed capital</li>
              <li>What every 1% reduction could represent</li>
            </ul>
            <strong>No consulting benchmark is applied automatically.</strong>
            <div className="cvp-story-buttons">
              <Button onClick={() => scrollToTarget('capital-under-execution', true)}>Estimate my capital exposure</Button>
              <button type="button" onClick={() => scrollToTarget('independent-evidence', true)}>Explore the independent research <ChevronDown size={14} /></button>
            </div>
            <small className="cvp-story-privacy"><LockKeyhole size={13} />Calculated in your browser. Your financial inputs are not submitted or stored.</small>
          </div>
        </div>
      </article>}

      <div className="decision-value-shell cvp-shell" id="decision-cost">
        <header className="cvp-intro">
          <div className="cvp-intro-copy">
            <Badge>Capital value protection calculator</Badge>
            <h2 id="decision-cost-title">Where is capital value currently exposed?</h2>
            <p>Enter your portfolio figures to estimate the value exposed to overruns and delay. Then test transparent reduction scenarios without treating them as guaranteed Axis One savings.</p>
          </div>
          <div className="cvp-intro-actions">
            <div className="cvp-currency">
              <label htmlFor="cvp-currency-select">Currency <small>Display only, no FX conversion</small></label>
              <BrandedSelect
                id="cvp-currency-select"
                value={currency}
                ariaLabel="Display currency"
                options={[
                  { value: 'GBP', label: 'GBP (£)' },
                  { value: 'EUR', label: 'EUR (€)' },
                  { value: 'USD', label: 'USD ($)' },
                ]}
                onChange={(nextCurrency) => {
                  setCurrency(nextCurrency);
                  markEdited('currency');
                }}
              />
            </div>
            <div className="cvp-reset-actions">
              <button type="button" onClick={resetExample}><RefreshCcw size={13} />Reset example</button>
              <button type="button" onClick={clearAll}><Trash2 size={13} />Clear all</button>
            </div>
          </div>
        </header>

        <div className="cvp-status" data-state={isExample ? 'example' : 'estimate'}>
          <Info size={15} />
          <span><strong>{isExample ? 'Example' : 'Your estimate'}</strong>{isExample ? 'Example figures are loaded. Change any value to create your estimate.' : 'Your figures are updating the calculation live in this browser.'}</span>
        </div>

        <div className="cvp-workspace">
          <form className="cvp-form" onSubmit={(event) => event.preventDefault()} noValidate>
            <fieldset className="cvp-step">
              <legend><b>01</b><span><strong>Define the capital exposure</strong><small>Use one programme or one consistent portfolio period.</small></span></legend>
              <div className="cvp-field-grid">
                <NumberField
                  inputId="capital-under-execution"
                  label="Capital under execution"
                  helper="Use one programme or one consistent portfolio period."
                  value={inputs.capitalUnderExecution}
                  onChange={updateInput('capitalUnderExecution')}
                  min={0}
                  max={1_000_000_000_000_000}
                  step={100_000}
                  prefix={CURRENCY_SYMBOLS[currency]}
                  error={errors.capitalUnderExecution}
                  basis={basisFor('capitalUnderExecution')}
                />
                <div className="cvp-overrun-field">
                  <span className="cvp-field-label"><span>Typical cost overrun</span><small className="cvp-basis-tag">{basisFor(inputs.costOverrunMode === 'percentage' ? 'costOverrunPercent' : 'knownCostOverrunAmount')}</small></span>
                  <div className="cvp-segmented" role="group" aria-label="Cost overrun input mode">
                    <button
                      type="button"
                      aria-pressed={inputs.costOverrunMode === 'percentage'}
                      onClick={() => {
                        markEdited('costOverrunMode');
                        setInputs((current) => ({ ...current, costOverrunMode: 'percentage' }));
                      }}
                    >Percentage</button>
                    <button
                      type="button"
                      aria-pressed={inputs.costOverrunMode === 'amount'}
                      onClick={() => {
                        markEdited('costOverrunMode');
                        setInputs((current) => ({ ...current, costOverrunMode: 'amount' }));
                      }}
                    >Known amount</button>
                  </div>
                  {inputs.costOverrunMode === 'percentage' ? (
                    <NumberField
                      label="Overrun percentage"
                      helper="Use a current forecast or historical average. Valid range: 0% to 500%."
                      value={inputs.costOverrunPercent}
                      onChange={updateInput('costOverrunPercent')}
                      min={0}
                      max={500}
                      step={0.1}
                      suffix="%"
                      error={errors.costOverrunPercent}
                    />
                  ) : (
                    <NumberField
                      label="Known exposed amount"
                      helper="Enter the direct amount currently exposed to overrun."
                      value={inputs.knownCostOverrunAmount}
                      onChange={updateInput('knownCostOverrunAmount')}
                      min={0}
                      max={1_000_000_000_000_000}
                      step={100_000}
                      prefix={CURRENCY_SYMBOLS[currency]}
                      error={errors.knownCostOverrunAmount}
                    />
                  )}
                </div>
              </div>
            </fieldset>

            <fieldset className="cvp-step">
              <legend><b>02</b><span><strong>Add delay exposure</strong><small>Make the affected capital and time period explicit.</small></span></legend>
              <div className="cvp-field-grid">
                <NumberField
                  label="Capital affected by delay"
                  helper="Estimate the portion of the capital above that is currently affected."
                  value={inputs.capitalAffectedByDelayPercent}
                  onChange={updateInput('capitalAffectedByDelayPercent')}
                  min={0}
                  max={100}
                  step={0.1}
                  suffix="%"
                  error={errors.capitalAffectedByDelayPercent}
                  basis={basisFor('capitalAffectedByDelayPercent')}
                />
                <NumberField
                  label="Average delay"
                  helper="Use the average delay across the affected projects."
                  value={inputs.averageDelayMonths}
                  onChange={updateInput('averageDelayMonths')}
                  min={0}
                  max={120}
                  step={0.25}
                  suffix="months"
                  error={errors.averageDelayMonths}
                  basis={basisFor('averageDelayMonths')}
                />
              </div>
              <div className="cvp-assumption-panel">
                <NumberField
                  label="Annual capital carrying rate"
                  helper="Use your approved financing rate, WACC or another appropriate carrying rate. The preloaded 8% is an editable example, not an industry benchmark."
                  value={inputs.annualCarryingRatePercent}
                  onChange={updateInput('annualCarryingRatePercent')}
                  min={0}
                  max={100}
                  step={0.1}
                  suffix="%"
                  error={errors.annualCarryingRatePercent}
                  basis={basisFor('annualCarryingRatePercent', true)}
                />
                <Toggle
                  checked={inputs.includeDelayCarryingCost}
                  onChange={updateBoolean('includeDelayCarryingCost')}
                  label="Include delay carrying cost in the combined exposure"
                  helper="Turn this off when financing or delay-related costs are already included in the cost-overrun figure."
                />
              </div>
            </fieldset>

            <details className="cvp-refine">
              <summary><span><b>03</b><span><strong>Refine your estimate</strong><small>Optional direct costs and governance capacity</small></span></span><ChevronDown size={18} /></summary>
              <div className="cvp-refine-body">
                <div className="cvp-refine-card">
                  <Toggle
                    checked={inputs.includeOptionalReworkCost}
                    onChange={updateBoolean('includeOptionalReworkCost')}
                    label="Known rework, claims or dispute cost"
                    helper="Include only when this is a distinct amount from the same period."
                  />
                  {inputs.includeOptionalReworkCost && <NumberField
                    label="Direct amount"
                    helper="Exclude anything already included in the overrun or delay figures."
                    value={inputs.optionalReworkCost}
                    onChange={updateInput('optionalReworkCost')}
                    min={0}
                    max={1_000_000_000_000_000}
                    step={10_000}
                    prefix={CURRENCY_SYMBOLS[currency]}
                    error={errors.optionalReworkCost}
                    basis={basisFor('optionalReworkCost')}
                  />}
                </div>
                <div className="cvp-refine-card">
                  <Toggle
                    checked={inputs.includeOptionalDelayedOperatingValue}
                    onChange={updateBoolean('includeOptionalDelayedOperatingValue')}
                    label="Known delayed operating value"
                    helper="Include only when this is a distinct, supportable amount from the same period."
                  />
                  {inputs.includeOptionalDelayedOperatingValue && <NumberField
                    label="Direct amount"
                    helper="Exclude deferred value unless the amount is genuinely lost and not counted elsewhere."
                    value={inputs.optionalDelayedOperatingValue}
                    onChange={updateInput('optionalDelayedOperatingValue')}
                    min={0}
                    max={1_000_000_000_000_000}
                    step={10_000}
                    prefix={CURRENCY_SYMBOLS[currency]}
                    error={errors.optionalDelayedOperatingValue}
                    basis={basisFor('optionalDelayedOperatingValue')}
                  />}
                </div>
                <div className="cvp-refine-card cvp-governance-card">
                  <Toggle
                    checked={inputs.includeOptionalGovernanceCapacityValue}
                    onChange={updateBoolean('includeOptionalGovernanceCapacityValue')}
                    label="Decision-governance capacity"
                    helper="Capacity value, not automatic cash savings. Excluded unless you explicitly include it."
                  />
                  {inputs.includeOptionalGovernanceCapacityValue && <>
                    <div className="cvp-governance-grid">
                      <NumberField label="Decisions / month" helper="Repeated decisions in the same period." value={governanceInputs.decisionsPerMonth} onChange={updateGovernance('decisionsPerMonth')} min={0} max={10_000} />
                      <NumberField label="People / decision" helper="People contributing to each decision." value={governanceInputs.peoplePerDecision} onChange={updateGovernance('peoplePerDecision')} min={0} max={10_000} />
                      <NumberField label="Hours / person" helper="Preparation hours per person." value={governanceInputs.preparationHoursPerPerson} onChange={updateGovernance('preparationHoursPerPerson')} min={0} max={10_000} step={0.25} suffix="hrs" />
                      <NumberField label="Blended hourly cost" helper="Approved blended internal cost." value={governanceInputs.blendedHourlyCost} onChange={updateGovernance('blendedHourlyCost')} min={0} max={100_000} step={5} prefix={CURRENCY_SYMBOLS[currency]} />
                    </div>
                    <div className="cvp-capacity-result">
                      <span>Capacity value</span>
                      <strong>{governanceCapacity === null ? 'Complete all four fields' : fullMoney(governanceCapacity)}</strong>
                      <small>Decisions × 12 × people × hours × blended hourly cost</small>
                    </div>
                    {errors.optionalGovernanceCapacityValue && <small className="cvp-field-error">Complete valid governance inputs before including this category.</small>}
                  </>}
                </div>
                <div className="cvp-overlap-note"><ShieldAlert size={15} /><span>Include each optional category only when it is a distinct amount from the same period and is not already included elsewhere.</span></div>
              </div>
            </details>
          </form>

          <aside className="cvp-results" aria-labelledby="cvp-results-title">
            <div className="cvp-results-head">
              <div><span>Your capital execution picture</span><h3 id="cvp-results-title">See the parts before the total</h3></div>
              <small className="cvp-basis-tag">{isExample ? 'Example' : 'Your estimate'}</small>
            </div>

            {result ? <>
              <div className="cvp-breakdown">
                <span className="cvp-breakdown-context">{fullMoney(result.delayedCapital)} of capital is affected by delay</span>
                <div><span>Cost-overrun exposure <small>Calculated</small></span><strong>{fullMoney(result.costOverrunExposure)}</strong></div>
                <div className={inputs.includeDelayCarryingCost ? '' : 'is-excluded'}>
                  <span>Delay carrying cost <small>{inputs.includeDelayCarryingCost ? 'Included' : 'Calculated, not included'}</small></span>
                  <strong>{fullMoney(result.delayCarryingCost)}</strong>
                </div>
                {optionalRows.map((row) => <div key={row.label}><span>{row.label} <small>Explicitly included</small></span><strong>{fullMoney(row.value)}</strong></div>)}
              </div>

              <div className="cvp-exposure-total">
                <span>Estimated identified exposure <small>Calculated</small></span>
                <strong>{compactMoney(result.identifiedExecutionExposure)}</strong>
                <small>{fullMoney(result.identifiedExecutionExposure)} using the categories included above</small>
              </div>

              <div className="cvp-one-percent">
                <span>Every 1% improvement is worth approximately</span>
                <strong>{fullMoney(result.valueOfOnePercent)}</strong>
                <small>One percent of the identified exposure, not a predicted Axis One result.</small>
              </div>

              <div className="cvp-scenario">
                <div className="cvp-scenario-title">
                  <span>Test an improvement</span>
                  <label className="cvp-custom-improvement">
                    <span>Custom</span>
                    <input
                      type="number"
                      min="1"
                      max="25"
                      step="1"
                      value={inputs.selectedImprovementPercent}
                      aria-label="Custom reduction in identified exposure"
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        if (Number.isFinite(value) && value >= 1 && value <= 25) setImprovement(value);
                      }}
                    />
                    <b>%</b>
                  </label>
                </div>
                <div className="cvp-scenario-buttons" role="group" aria-label="Improvement scenarios">
                  {IMPROVEMENT_SCENARIOS.map((percentage) => <button
                    key={percentage}
                    type="button"
                    className={inputs.selectedImprovementPercent === percentage ? 'is-selected' : ''}
                    aria-pressed={inputs.selectedImprovementPercent === percentage}
                    onClick={() => setImprovement(percentage)}
                  >{percentage}%</button>)}
                </div>
                <label className="cvp-range" htmlFor="cvp-improvement-range">
                  <span>Custom reduction in identified exposure <small>1% to 25%</small></span>
                  <input id="cvp-improvement-range" type="range" min="1" max="25" step="1" value={inputs.selectedImprovementPercent} onChange={(event) => setImprovement(Number(event.target.value))} />
                </label>
                <div className="cvp-selected-value">
                  <strong>{compactMoney(result.selectedValueProtected)}</strong>
                  <span>Illustrative value potentially protected at a {inputs.selectedImprovementPercent}% reduction in identified exposure</span>
                </div>
                <div className="cvp-scenario-table" aria-label="Scenario comparison">
                  {IMPROVEMENT_SCENARIOS.map((percentage) => <div key={percentage} className={inputs.selectedImprovementPercent === percentage ? 'is-selected' : ''}><span>{percentage}%</span><strong>{fullMoney(result.scenarioValues[percentage])}</strong></div>)}
                </div>
              </div>

              <p className="cvp-result-notice">This scenario applies your selected improvement percentage to the exposure identified from your inputs. It is not a guarantee, accounting valuation or predicted Axis One result.</p>

              <div className="cvp-basis-list">
                <span>Estimate basis</span>
                <div><small>Capital</small><b>{basisFor('capitalUnderExecution')}</b></div>
                <div><small>Overrun</small><b>{basisFor(inputs.costOverrunMode === 'percentage' ? 'costOverrunPercent' : 'knownCostOverrunAmount')}</b></div>
                <div><small>Delay</small><b>{editedFields.has('capitalAffectedByDelayPercent') || editedFields.has('averageDelayMonths') ? 'User-entered' : 'Example value'}</b></div>
                <div><small>Carrying rate</small><b>{basisFor('annualCarryingRatePercent', true)}</b></div>
                <div><small>Results</small><b>Calculated</b></div>
              </div>
            </> : (
              <div className="cvp-incomplete">
                <Calculator size={28} />
                <strong>Complete the required fields</strong>
                <p>The total will appear when each core figure and the carrying-rate assumption contains a valid value.</p>
                <ul>{Object.values(errors).slice(0, 5).map((error) => <li key={error}>{error}</li>)}</ul>
              </div>
            )}
            <span className="cvp-live" aria-live="polite" aria-atomic="true">{liveMessage}</span>
          </aside>
        </div>

        <details className="cvp-methodology">
          <summary><span><Calculator size={17} />See the calculation and safeguards</span><ChevronDown size={18} /></summary>
          <div className="cvp-methodology-body">
            <div className="cvp-methodology-grid">
              <article><span>01</span><strong>Cost-overrun exposure</strong><p>Percentage mode: capital under execution × cost-overrun percentage. Known amount mode: the amount entered by the user.</p></article>
              <article><span>02</span><strong>Delay carrying cost</strong><p>Capital under execution × portion affected by delay × annual carrying rate × delay months / 12.</p></article>
              <article><span>03</span><strong>Optional observed costs</strong><p>Only direct, explicitly enabled values are added to the combined identified exposure.</p></article>
              <article><span>04</span><strong>Illustrative value protected</strong><p>Identified execution exposure × the selected improvement percentage.</p></article>
            </div>
            <div className="cvp-safeguard">
              <ShieldAlert size={18} />
              <div>
                <strong>Prevent double counting</strong>
                <p>Use one consistent programme or portfolio period and include only non-overlapping amounts. Turn off delay carrying cost when financing or delay costs are already represented in the overrun figure.</p>
                <p>Do not add the full capital principal, contingency reserves, full loss severity, generic overrun benchmarks, consulting percentages, financing already represented elsewhere, or duplicate rework or claims. Validate material assumptions with Finance and the programme team.</p>
              </div>
            </div>
          </div>
        </details>
      </div>

        <section className="cvp-evidence" id="independent-evidence" tabIndex={-1} aria-labelledby="cvp-evidence-heading">
          <div className="cvp-evidence-head">
            <div><span>Independent industry evidence</span><h3 id="cvp-evidence-heading">The problem is documented.<br />The estimate is yours.</h3></div>
            <p>Independent research consistently connects capital-project underperformance with fragmented information, delayed decisions, weak governance and inadequate evidence. The calculator above uses the visitor's own data. The research below provides context and is not automatically included in the estimate.</p>
          </div>

          <div className="cvp-evidence-group-title"><span>01</span><strong>What independent research identifies</strong></div>
          <div className="cvp-narrative-grid">
            {narrativeEvidence.map((item) => <article className="cvp-evidence-card cvp-narrative-card" key={item.sourceUrl}>
              <div className="cvp-source-meta"><span>{item.organisation}</span><small>{item.evidenceType} · {item.year}</small></div>
              <h4>{item.heading}</h4>
              <p>{item.copy}</p>
              <small className="cvp-source-title">{item.sourceTitle}</small>
              <EvidenceLink href={item.sourceUrl} organisation={item.organisation} sourceTitle={item.sourceTitle} />
            </article>)}
          </div>

          <section className="cvp-evidence-band cvp-evidence-band-observed" aria-labelledby="cvp-observed-outcomes-heading">
            <header className="cvp-evidence-band-head">
              <div className="cvp-evidence-band-title">
                <span>02</span>
                <div>
                  <strong id="cvp-observed-outcomes-heading">Observed delivery outcomes</strong>
                  <small>Published survey findings</small>
                </div>
              </div>
              <p>Reported outcomes from independent industry surveys. These figures describe their research populations and are not inputs to the calculator.</p>
            </header>
            <div className="cvp-evidence-rows">
              {observedOutcomeEvidence.map((item) => <article className="cvp-evidence-card cvp-number-card cvp-evidence-row" key={item.sourceUrl}>
                <div className="cvp-evidence-row-source">
                  <div className="cvp-source-meta"><span>{item.organisation}</span><small>{item.evidenceType}{item.year ? ` · ${item.year}` : ''}</small></div>
                </div>
                <div className="cvp-evidence-row-metric">
                  <strong className="cvp-evidence-figure">{item.primaryFigure}</strong>
                  <h4>{item.metric}</h4>
                </div>
                <div className="cvp-evidence-row-context">
                  {item.secondaryFigures && <ul>{item.secondaryFigures.map((figure) => <li key={figure}>{figure}</li>)}</ul>}
                  <p>{item.copy}</p>
                  {item.scope && <span className="cvp-evidence-scope">Scope: {item.scope}</span>}
                </div>
                <div className="cvp-evidence-row-citation">
                  <small className="cvp-source-title">{item.sourceTitle}</small>
                  <EvidenceLink href={item.sourceUrl} organisation={item.organisation} sourceTitle={item.sourceTitle} />
                </div>
              </article>)}
            </div>
          </section>

          <section className="cvp-evidence-band cvp-evidence-band-benchmarks" aria-labelledby="cvp-practice-benchmarks-heading">
            <header className="cvp-evidence-band-head">
              <div className="cvp-evidence-band-title">
                <span>03</span>
                <div>
                  <strong id="cvp-practice-benchmarks-heading">External practice benchmarks</strong>
                  <small>Context only · not used in the calculation</small>
                </div>
              </div>
              <p>Published consulting-practice estimates provide external context only. They are not Axis One results, predictions or guaranteed savings.</p>
            </header>
            <div className="cvp-evidence-rows">
              {externalPracticeBenchmarkEvidence.map((item) => <article className="cvp-evidence-card cvp-number-card cvp-evidence-row" key={item.sourceUrl}>
                <div className="cvp-evidence-row-source">
                  <div className="cvp-source-meta"><span>{item.organisation}</span><small>{item.evidenceType}{item.year ? ` · ${item.year}` : ''}</small></div>
                </div>
                <div className="cvp-evidence-row-metric">
                  <strong className="cvp-evidence-figure">{item.primaryFigure}</strong>
                  <h4>{item.metric}</h4>
                </div>
                <div className="cvp-evidence-row-context">
                  {item.secondaryFigures && <ul>{item.secondaryFigures.map((figure) => <li key={figure}>{figure}</li>)}</ul>}
                  <p>{item.copy}</p>
                  {item.scope && <span className="cvp-evidence-scope">Scope: {item.scope}</span>}
                </div>
                <div className="cvp-evidence-row-citation">
                  <small className="cvp-source-title">{item.sourceTitle}</small>
                  <EvidenceLink href={item.sourceUrl} organisation={item.organisation} sourceTitle={item.sourceTitle} />
                </div>
              </article>)}
            </div>
          </section>

          <p className="cvp-research-disclaimer">Independent research context. The figures above come from different sectors, geographies, project types, methodologies and intervention scopes. They are not Axis One results, are not applied automatically in this calculator and do not represent guaranteed savings. Company names are used for source attribution only; no affiliation or endorsement is implied.</p>
        </section>

        <div className="cvp-cta">
          <div><CircleDollarSign size={22} /><span><strong>Validate this against a live capital programme</strong><small>Use the estimate as a starting point. Axis One can help structure the milestones, evidence, ownership and release controls behind a live capital decision.</small></span></div>
          <div className="cvp-cta-actions">
            <Button onClick={onOpenAccess}>Prepare a Decision Brief</Button>
            <button type="button" className="cvp-copy-button" onClick={copySummary} disabled={!result}>
              {copyState === 'copied' ? <Check size={14} /> : <Copy size={14} />}
              {copyState === 'copied' ? 'Copied' : copyState === 'error' ? 'Copy unavailable' : 'Copy calculation summary'}
            </button>
          </div>
        </div>
    </section>
  );
}
