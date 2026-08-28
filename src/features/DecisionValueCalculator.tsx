import React from 'react';
import { motion } from 'motion/react';
import {
  Calculator, ChevronDown, CircleDollarSign, Clock3, ExternalLink,
  Info, RefreshCcw, ShieldAlert, TimerReset, Users,
} from 'lucide-react';
import { Badge, Button, fade } from '../components';

type Currency = 'GBP' | 'EUR' | 'USD';

type CalculatorInputs = {
  decisionsPerMonth: number;
  peoplePerDecision: number;
  preparationHours: number;
  hourlyCost: number;
  averageCapitalWaiting: number;
  delayedDecisionsPerYear: number;
  averageDelayDays: number;
  annualCarryRate: number;
  unrecoverableValuePerDay: number;
  reworkDisputeCost: number;
  prematureActionExposure: number;
  preparationImprovementRate: number;
  delayDaysAvoidedPerDecision: number;
  observedCostImprovementRate: number;
  riskImprovementRate: number;
};

type NumberFieldProps = {
  label: string;
  helper?: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
};

type BurdenRowProps = {
  icon: React.ReactNode;
  label: string;
  tag: string;
  value: string;
  included?: boolean;
  status: string;
};

const EXAMPLE_INPUTS: CalculatorInputs = {
  decisionsPerMonth: 6,
  peoplePerDecision: 7,
  preparationHours: 4,
  hourlyCost: 85,
  averageCapitalWaiting: 0,
  delayedDecisionsPerYear: 0,
  averageDelayDays: 0,
  annualCarryRate: 0,
  unrecoverableValuePerDay: 0,
  reworkDisputeCost: 0,
  prematureActionExposure: 0,
  preparationImprovementRate: 10,
  delayDaysAvoidedPerDecision: 0,
  observedCostImprovementRate: 0,
  riskImprovementRate: 0,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = { GBP: '£', EUR: '€', USD: '$' };

const RESEARCH = [
  {
    figure: '5-8%',
    label: 'capital expenditure reduction',
    detail: 'McKinsey reports this alongside stronger data discipline and wider delivery changes across capital projects. It is not a software-only benchmark.',
    source: 'McKinsey, 2026',
    href: 'https://www.mckinsey.com/uk/our-insights/impatient-for-infrastructure-four-changes-to-improve-uk-project-delivery',
  },
  {
    figure: '66%',
    label: 'missed targets by more than 10%',
    detail: 'Accenture surveyed 700 capital-project leaders. The group missing targets reported average cost overruns of 29%.',
    source: 'Accenture, 2025',
    href: 'https://www.accenture.com/content/dam/accenture/final/accenture-com/document-3/Accenture-Blueprint-for-Success-FINAL.pdf',
  },
  {
    figure: '22%',
    label: 'schedule improvement in one case',
    detail: 'KPMG reports this result, plus $320m in cost savings, for one US transport implementation managing $5.2bn in annual capital spend.',
    source: 'KPMG, 2025',
    href: 'https://kpmg.com/ca/en/insights/2025/06/project-management-information-systems.html',
  },
  {
    figure: '81%',
    label: 'reported cost overruns',
    detail: 'PwC also found 79% reported delays in a Middle East survey of more than 100 capital-project specialists.',
    source: 'PwC, 2025',
    href: 'https://www.pwc.com/m1/en/publications/2025/docs/capital-projects-and-infrastructure-survey-2025.pdf',
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function NumberField({ label, helper, value, onChange, min, max, step = 1, prefix, suffix }: NumberFieldProps) {
  const inputId = React.useId();
  const helperId = helper ? `${inputId}-helper` : undefined;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [draft, setDraft] = React.useState(String(value));

  React.useEffect(() => {
    if (document.activeElement !== inputRef.current) setDraft(String(value));
  }, [value]);

  const commitValue = (raw: string) => {
    const parsed = Number(raw);
    const nextValue = Number.isFinite(parsed) ? clamp(parsed, min, max) : min;
    setDraft(String(nextValue));
    onChange(nextValue);
  };

  return (
    <label className="value-field" htmlFor={inputId}>
      <span>{label}</span>
      <div className="value-input-wrap">
        {prefix && <small aria-hidden="true">{prefix}</small>}
        <input
          ref={inputRef}
          id={inputId}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={draft}
          aria-describedby={helperId}
          onChange={(event) => {
            const raw = event.target.value;
            setDraft(raw);
            if (raw !== '' && Number.isFinite(Number(raw))) {
              const parsed = Number(raw);
              const nextValue = clamp(parsed, min, max);
              if (nextValue !== parsed) setDraft(String(nextValue));
              onChange(nextValue);
            }
          }}
          onBlur={(event) => commitValue(event.target.value)}
        />
        {suffix && <small aria-hidden="true">{suffix}</small>}
      </div>
      {helper && <small id={helperId}>{helper}</small>}
    </label>
  );
}

function BurdenRow({ icon, label, tag, value, included = true, status }: BurdenRowProps) {
  return (
    <div className={`value-burden-row ${included ? 'is-included' : 'is-excluded'}`}>
      <div className="value-burden-label">
        {icon}
        <span><small>{tag}</small><strong>{label}</strong></span>
      </div>
      <div className="value-burden-amount">
        <strong>{included ? value : 'Not included'}</strong>
        <small>{status}</small>
      </div>
    </div>
  );
}

export function DecisionValueCalculator({ onOpenAccess }: { onOpenAccess: () => void }) {
  const [currency, setCurrency] = React.useState<Currency>('GBP');
  const [inputs, setInputs] = React.useState<CalculatorInputs>(EXAMPLE_INPUTS);
  const [includeDelay, setIncludeDelay] = React.useState(false);
  const [includeObservedCost, setIncludeObservedCost] = React.useState(false);
  const [includeExpectedLoss, setIncludeExpectedLoss] = React.useState(false);
  const [hasEdited, setHasEdited] = React.useState(false);

  const updateInput = (key: keyof CalculatorInputs) => (value: number) => {
    setHasEdited(true);
    setInputs(current => {
      const next = { ...current, [key]: value };
      if (key === 'decisionsPerMonth') {
        next.delayedDecisionsPerYear = Math.min(current.delayedDecisionsPerYear, value * 12);
      }
      return next;
    });
  };

  const updateAverageDelayDays = (value: number) => {
    setHasEdited(true);
    setInputs(current => ({
      ...current,
      averageDelayDays: value,
      delayDaysAvoidedPerDecision: Math.min(current.delayDaysAvoidedPerDecision, value),
    }));
  };

  const resetExample = () => {
    setInputs(EXAMPLE_INPUTS);
    setCurrency('GBP');
    setIncludeDelay(false);
    setIncludeObservedCost(false);
    setIncludeExpectedLoss(false);
    setHasEdited(false);
  };

  const annualDecisions = inputs.decisionsPerMonth * 12;
  const annualPreparationHours = annualDecisions * inputs.peoplePerDecision * inputs.preparationHours;
  const preparationWorkingDays = annualPreparationHours / 8;
  const preparationCapacityCost = annualPreparationHours * inputs.hourlyCost;
  const totalDelayDays = includeDelay ? inputs.delayedDecisionsPerYear * inputs.averageDelayDays : 0;
  const dailyCapitalCarry = inputs.averageCapitalWaiting * (inputs.annualCarryRate / 100) / 365;
  const capitalCarryingCost = includeDelay ? dailyCapitalCarry * totalDelayDays : 0;
  const permanentOperatingValueLoss = includeDelay ? inputs.unrecoverableValuePerDay * totalDelayDays : 0;
  const observedCashCost = includeObservedCost ? inputs.reworkDisputeCost : 0;
  const expectedLossExposure = includeExpectedLoss ? inputs.prematureActionExposure : 0;
  const hasCapitalCarryingCost = includeDelay && capitalCarryingCost > 0;
  const hasPermanentValueLoss = includeDelay && permanentOperatingValueLoss > 0;
  const hasObservedCashCost = includeObservedCost && observedCashCost > 0;
  const hasExpectedLoss = includeExpectedLoss && expectedLossExposure > 0;
  const currentAnnualBurden = preparationCapacityCost + capitalCarryingCost + permanentOperatingValueLoss + observedCashCost;
  const annualEconomicBurden = currentAnnualBurden + expectedLossExposure;

  const capacityOpportunity = preparationCapacityCost * (inputs.preparationImprovementRate / 100);
  const hoursPotentiallyReleased = annualPreparationHours * (inputs.preparationImprovementRate / 100);
  const totalDelayDaysAvoided = includeDelay
    ? inputs.delayedDecisionsPerYear * Math.min(inputs.delayDaysAvoidedPerDecision, inputs.averageDelayDays)
    : 0;
  const delayOpportunity = (dailyCapitalCarry + inputs.unrecoverableValuePerDay) * totalDelayDaysAvoided;
  const cashOpportunity = observedCashCost * (inputs.observedCostImprovementRate / 100);
  const riskOpportunity = expectedLossExposure * (inputs.riskImprovementRate / 100);
  const costPerDecision = annualDecisions > 0 ? preparationCapacityCost / annualDecisions : 0;

  const formatMoney = (value: number) => new Intl.NumberFormat('en-GB', {
    style: 'currency', currency, maximumFractionDigits: 0,
  }).format(value);
  const formatNumber = (value: number) => Math.round(value).toLocaleString('en-GB');

  const unusualAssumption = includeDelay && (inputs.averageDelayDays > 90 || inputs.annualCarryRate > 25);
  const totalLabel = hasExpectedLoss
    ? 'Estimated risk-adjusted annual economic burden'
    : 'Estimated annual economic burden';

  return (
    <section className="section decision-value-section" id="decision-cost">
      <motion.div className="decision-value-shell" {...fade}>
        <div className="decision-value-intro">
          <div>
            <Badge>Capital performance calculator</Badge>
            <h2>What is disconnected capital execution costing you?</h2>
            <p>Start with four figures everyone can answer. Add delay, rework and risk only when you have evidence for them.</p>
          </div>
          <div className="value-intro-tools">
            <label className="value-currency-control">
              <span>Currency <small>No FX conversion</small></span>
              <select
                value={currency}
                onChange={(event) => {
                  setCurrency(event.target.value as Currency);
                  setHasEdited(true);
                }}
              >
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
              </select>
            </label>
            <button className="value-reset" type="button" onClick={resetExample}>
              <RefreshCcw size={14} /> Reset example
            </button>
          </div>
        </div>

        <div className="decision-value-workspace">
          <form className="decision-value-form" onSubmit={(event) => event.preventDefault()}>
            <div className="value-example-note">
              <Info size={15} />
              <span>{hasEdited ? 'Your estimate is updating live. Your figures stay in this browser unless you choose to share them.' : 'Example figures are loaded. Change any number to create your estimate. Nothing leaves your browser.'}</span>
            </div>

            <fieldset className="value-fieldset value-core-fieldset">
              <legend><span>01</span><div><strong>How much work goes into each decision?</strong><small>Use one workflow your team repeats throughout the year</small></div></legend>
              <div className="value-fields-grid value-core-fields">
                <NumberField label="Decisions each month" value={inputs.decisionsPerMonth} onChange={updateInput('decisionsPerMonth')} min={1} max={200} />
                <NumberField label="People per decision" value={inputs.peoplePerDecision} onChange={updateInput('peoplePerDecision')} min={1} max={200} />
                <NumberField label="Hours each person spends" value={inputs.preparationHours} onChange={updateInput('preparationHours')} min={0.25} max={160} step={0.25} suffix="hrs" />
                <NumberField label="Average hourly cost" value={inputs.hourlyCost} onChange={updateInput('hourlyCost')} min={10} max={5000} step={5} prefix={CURRENCY_SYMBOLS[currency]} />
              </div>
              <div className="value-readable-math">
                <span>Your year in one line</span>
                <strong>{formatNumber(annualDecisions)} decisions × {inputs.peoplePerDecision} people × {inputs.preparationHours} hours = {formatNumber(annualPreparationHours)} team hours</strong>
                <small>About {formatNumber(preparationWorkingDays)} eight-hour working days, valued at {formatMoney(preparationCapacityCost)}.</small>
              </div>
            </fieldset>

            <section className="value-addon-section" aria-labelledby="additional-costs-heading">
              <div className="value-section-heading">
                <span>02</span>
                <div><h3 id="additional-costs-heading">Add costs you can support</h3><small>Optional. Include only distinct amounts from the same 12-month period.</small></div>
              </div>

              <div className={`value-addon-toggle-grid ${includeDelay ? 'has-open-delay' : ''}`}>
                <div className={`value-addon-card value-delay-card ${includeDelay ? 'is-open' : ''}`}>
                  <label className="value-module-toggle">
                    <input type="checkbox" checked={includeDelay} onChange={(event) => { setIncludeDelay(event.target.checked); setHasEdited(true); }} />
                    <span><strong>Decisions delay capital</strong><small>Add financing cost and permanent value lost.</small></span>
                    <i aria-hidden="true" />
                  </label>
                  {includeDelay && (
                    <div className="value-fields-grid value-module-fields">
                      <NumberField label="Typical amount waiting" helper="Use the average capital balance, not annual throughput." value={inputs.averageCapitalWaiting} onChange={updateInput('averageCapitalWaiting')} min={0} max={1_000_000_000_000} step={100_000} prefix={CURRENCY_SYMBOLS[currency]} />
                      <NumberField label="Delayed decisions each year" helper="Count only decisions delayed by evidence, approval or authority gaps." value={inputs.delayedDecisionsPerYear} onChange={updateInput('delayedDecisionsPerYear')} min={0} max={annualDecisions} />
                      <NumberField label="Average delay each time" helper="Use incremental critical-path days, not the whole programme delay." value={inputs.averageDelayDays} onChange={updateAverageDelayDays} min={0} max={365} suffix="days" />
                      <NumberField label="Annual financing rate" helper="Use a Finance-approved cost of capital or carrying rate." value={inputs.annualCarryRate} onChange={updateInput('annualCarryRate')} min={0} max={50} step={0.1} suffix="%" />
                      <NumberField label="Permanent value lost per day" helper="Optional net value that is genuinely lost, not merely deferred." value={inputs.unrecoverableValuePerDay} onChange={updateInput('unrecoverableValuePerDay')} min={0} max={1_000_000_000} step={1000} prefix={CURRENCY_SYMBOLS[currency]} />
                      <div className="value-module-equation">
                        <span>{formatNumber(inputs.delayedDecisionsPerYear)} delayed decisions × {inputs.averageDelayDays} days = {formatNumber(totalDelayDays)} annual delay days</span>
                        <strong>{formatMoney(capitalCarryingCost)} financing cost + {formatMoney(permanentOperatingValueLoss)} permanent value loss</strong>
                      </div>
                    </div>
                  )}
                </div>

                <div className={`value-addon-card ${includeObservedCost ? 'is-open' : ''}`}>
                  <label className="value-module-toggle">
                    <input type="checkbox" checked={includeObservedCost} onChange={(event) => { setIncludeObservedCost(event.target.checked); setHasEdited(true); }} />
                    <span><strong>You pay for rework or disputes</strong><small>Add observed external cash spend.</small></span>
                    <i aria-hidden="true" />
                  </label>
                  {includeObservedCost && (
                    <div className="value-single-module-field">
                      <NumberField label="External rework and dispute spend" helper="Last 12 months. Exclude internal team time already entered above." value={inputs.reworkDisputeCost} onChange={updateInput('reworkDisputeCost')} min={0} max={10_000_000_000} step={10_000} prefix={CURRENCY_SYMBOLS[currency]} />
                    </div>
                  )}
                </div>

                <div className={`value-addon-card ${includeExpectedLoss ? 'is-open' : ''}`}>
                  <label className="value-module-toggle">
                    <input type="checkbox" checked={includeExpectedLoss} onChange={(event) => { setIncludeExpectedLoss(event.target.checked); setHasEdited(true); }} />
                    <span><strong>Acting too early creates risk</strong><small>Add a Finance-approved expected loss.</small></span>
                    <i aria-hidden="true" />
                  </label>
                  {includeExpectedLoss && (
                    <div className="value-single-module-field">
                      <NumberField label="Expected annual loss" helper="Probability × net loss severity. Do not enter the full capital amount." value={inputs.prematureActionExposure} onChange={updateInput('prematureActionExposure')} min={0} max={10_000_000_000} step={10_000} prefix={CURRENCY_SYMBOLS[currency]} />
                    </div>
                  )}
                </div>
              </div>

              {(includeObservedCost || includeExpectedLoss) && (
                <div className="value-overlap-note"><ShieldAlert size={15} /><span>Exclude internal time already entered in step 01, financing cost entered in the delay module, and any impact represented in more than one field.</span></div>
              )}
            </section>

            <details className="value-scenario-details">
              <summary>
                <span><b>03</b><span><strong>Test a potential improvement</strong><small>{inputs.preparationImprovementRate}% less preparation time selected</small></span></span>
                <ChevronDown size={18} />
              </summary>
              <div className="value-scenario-control">
                <div className="value-scenario-group">
                  <div className="value-scenario-top"><label htmlFor="preparation-rate">Preparation time reduction</label><output htmlFor="preparation-rate">{inputs.preparationImprovementRate}%</output></div>
                  <input id="preparation-rate" type="range" min="0" max="30" step="1" value={inputs.preparationImprovementRate} onChange={(event) => updateInput('preparationImprovementRate')(Number(event.target.value))} />
                  <div className="value-scenario-presets" aria-label="Preparation improvement presets">
                    {[0, 5, 10, 20, 30].map(rate => <button aria-pressed={inputs.preparationImprovementRate === rate} className={inputs.preparationImprovementRate === rate ? 'is-active' : ''} type="button" key={rate} onClick={() => updateInput('preparationImprovementRate')(rate)}>{rate}%</button>)}
                  </div>
                </div>
                {includeDelay && <NumberField label="Delay days avoided per delayed decision" helper="Scenario only. It cannot exceed the current average delay." value={inputs.delayDaysAvoidedPerDecision} onChange={updateInput('delayDaysAvoidedPerDecision')} min={0} max={inputs.averageDelayDays} suffix="days" />}
                {includeObservedCost && (
                  <div className="value-scenario-group">
                    <div className="value-scenario-top"><label htmlFor="observed-cost-rate">Observed cash-cost reduction</label><output htmlFor="observed-cost-rate">{inputs.observedCostImprovementRate}%</output></div>
                    <input id="observed-cost-rate" type="range" min="0" max="30" step="1" value={inputs.observedCostImprovementRate} onChange={(event) => updateInput('observedCostImprovementRate')(Number(event.target.value))} />
                    <div className="value-scenario-presets" aria-label="Observed cost improvement presets">
                      {[0, 5, 10, 20, 30].map(rate => <button aria-pressed={inputs.observedCostImprovementRate === rate} className={inputs.observedCostImprovementRate === rate ? 'is-active' : ''} type="button" key={rate} onClick={() => updateInput('observedCostImprovementRate')(rate)}>{rate}%</button>)}
                    </div>
                  </div>
                )}
                {includeExpectedLoss && (
                  <div className="value-scenario-group">
                    <div className="value-scenario-top"><label htmlFor="expected-loss-rate">Expected-loss exposure reduction</label><output htmlFor="expected-loss-rate">{inputs.riskImprovementRate}%</output></div>
                    <input id="expected-loss-rate" type="range" min="0" max="30" step="1" value={inputs.riskImprovementRate} onChange={(event) => updateInput('riskImprovementRate')(Number(event.target.value))} />
                    <div className="value-scenario-presets" aria-label="Expected loss improvement presets">
                      {[0, 5, 10, 20, 30].map(rate => <button aria-pressed={inputs.riskImprovementRate === rate} className={inputs.riskImprovementRate === rate ? 'is-active' : ''} type="button" key={rate} onClick={() => updateInput('riskImprovementRate')(rate)}>{rate}%</button>)}
                    </div>
                  </div>
                )}
                <p>These are your assumptions, not AX1 performance claims. A finance-ready case must also validate addressability, workflow coverage, adoption and cash realisation.</p>
              </div>
            </details>

            <a className="value-mobile-estimate-link" href="#decision-estimate">View the annual cost picture</a>
          </form>

          <aside className="decision-value-results" id="decision-estimate" aria-label="Capital performance estimate">
            <p className="value-live-summary" role="status" aria-live="polite" aria-atomic="true">{totalLabel} is {formatMoney(annualEconomicBurden)}. {hasExpectedLoss ? `This includes ${formatMoney(expectedLossExposure)} of risk-adjusted expected loss.` : 'Expected loss is not included.'}</p>
            <div className="value-result-kicker"><Calculator size={19} /><span>Your annual cost picture</span></div>
            <div className="value-results-heading">
              <strong>See every part before the total</strong>
              <small>Included categories update as you enter figures</small>
            </div>

            <div className="value-burden-list" aria-label="Annual burden by component">
              <BurdenRow icon={<Users size={17} />} label="Staff time used to prepare decisions" tag="Capacity value" value={formatMoney(preparationCapacityCost)} status="Always included" />
              <BurdenRow icon={<Clock3 size={17} />} label="Capital carrying cost during delays" tag="Financing cost" value={formatMoney(capitalCarryingCost)} included={hasCapitalCarryingCost} status={hasCapitalCarryingCost ? 'From your delay inputs' : includeDelay ? 'Complete the delay inputs' : 'Optional'} />
              <BurdenRow icon={<CircleDollarSign size={17} />} label="Permanent operating value lost" tag="Value loss" value={formatMoney(permanentOperatingValueLoss)} included={hasPermanentValueLoss} status={hasPermanentValueLoss ? 'From your delay inputs' : includeDelay ? 'Enter only if value is lost' : 'Optional'} />
              <BurdenRow icon={<CircleDollarSign size={17} />} label="External rework and dispute spend" tag="Observed cash cost" value={formatMoney(observedCashCost)} included={hasObservedCashCost} status={hasObservedCashCost ? 'Last 12 months' : includeObservedCost ? 'Enter the last 12 months' : 'Optional'} />
              <BurdenRow icon={<ShieldAlert size={17} />} label="Expected loss from acting before proof" tag="Risk-adjusted" value={formatMoney(expectedLossExposure)} included={hasExpectedLoss} status={hasExpectedLoss ? 'Finance-approved estimate' : includeExpectedLoss ? 'Enter a Finance-approved estimate' : 'Optional'} />
            </div>

            <div className="value-total-story">
              <span>{totalLabel}</span>
              <strong>{formatMoney(annualEconomicBurden)}</strong>
              <p>{hasExpectedLoss ? `${formatMoney(currentAnnualBurden)} is modelled current burden and ${formatMoney(expectedLossExposure)} is risk-adjusted expected loss.` : 'This total currently excludes expected loss from acting before execution is proven.'}</p>
              <small>Combines the value of staff time, financing cost, permanent value loss, observed cash spend and, when selected, Finance-approved expected loss. It is an economic estimate, not an accounting expense, cash outflow or forecast of AX1 savings.</small>
            </div>

            <div className="value-unit-economics">
              <span><small>Decisions modelled</small><strong>{formatNumber(annualDecisions)} / year</strong></span>
              <span><small>Team time</small><strong>{formatNumber(annualPreparationHours)} hours</strong></span>
              <span><small>Preparation cost / decision</small><strong>{formatMoney(costPerDecision)}</strong></span>
            </div>

            <div className="value-opportunity-story">
              <div><span>Illustrative improvement, shown separately</span><strong>{formatMoney(capacityOpportunity)}</strong></div>
              <p>At {inputs.preparationImprovementRate}% less preparation time, about {formatNumber(hoursPotentiallyReleased)} team hours could be released. This is capacity value, not automatically cash savings.</p>
              {((includeDelay && inputs.delayDaysAvoidedPerDecision > 0) || (includeObservedCost && inputs.observedCostImprovementRate > 0) || (includeExpectedLoss && inputs.riskImprovementRate > 0)) && (
                <div className="value-opportunity-lines">
                  {includeDelay && inputs.delayDaysAvoidedPerDecision > 0 && <span><small>{formatNumber(totalDelayDaysAvoided)} delay days avoided</small><strong>{formatMoney(delayOpportunity)}</strong></span>}
                  {includeObservedCost && inputs.observedCostImprovementRate > 0 && <span><small>Rework and dispute scenario at {inputs.observedCostImprovementRate}%</small><strong>{formatMoney(cashOpportunity)}</strong></span>}
                  {includeExpectedLoss && inputs.riskImprovementRate > 0 && <span><small>Expected-loss scenario at {inputs.riskImprovementRate}%</small><strong>{formatMoney(riskOpportunity)}</strong></span>}
                </div>
              )}
              <small>Category opportunities are not totalled. They require validated addressability, workflow coverage, adoption, cash realisation and implementation cost.</small>
            </div>

            {unusualAssumption && <div className="value-assumption-warning"><ShieldAlert size={15} /><span>One or more delay assumptions is unusually high. Validate it with Finance before relying on the result.</span></div>}
            <p className="value-result-disclaimer">Include only distinct amounts from the same 12-month period. Do not add capital principal, full contingency reserves, full loss severity or consulting benchmark percentages.</p>
          </aside>
        </div>

        <details className="value-methodology">
          <summary><span><Info size={17} />See the calculation and safeguards</span><ChevronDown size={18} /></summary>
          <div className="value-methodology-grid">
            <article><strong>Staff time</strong><p>Decisions per month × 12 × people per decision × hours per person × average hourly cost.</p></article>
            <article><strong>Delay cost</strong><p>Typical amount waiting × financing rate ÷ 365 × total delay days. Permanent net value lost per day is shown as a separate line.</p></article>
            <article><strong>Observed cost and expected loss</strong><p>External cash spend stays separate from expected loss, which should equal event probability × net loss severity.</p></article>
            <article><strong>Economic burden total</strong><p>Adds only the included annual categories. Selecting expected loss changes the result to a risk-adjusted economic burden.</p></article>
          </div>
          <div className="value-safeguards"><TimerReset size={17} /><p>Use non-overlapping delay days and costs. Do not add a full contingency reserve, generic cost overrun and dispute value if they describe the same exposure. Validate material assumptions with Finance and the programme team.</p></div>
        </details>

        <details className="value-research-details">
          <summary>
            <span><ExternalLink size={17} /><span><strong>Explore independent industry evidence</strong><small>Major consulting research, with context and source links</small></span></span>
            <ChevronDown size={18} />
          </summary>
          <div className="value-research-block">
            <div className="value-research-head"><div><span>Industry evidence</span><h3>What major consulting research says</h3></div><p>These figures demonstrate the scale of the problem. They cover different sectors, interventions and methodologies. None is an AX1 result or an automatic calculator assumption.</p></div>
            <div className="value-research-grid">
              {RESEARCH.map(item => (
                <a href={item.href} target="_blank" rel="noreferrer" className="value-research-card" key={item.source}>
                  <div><strong>{item.figure}</strong><ExternalLink size={15} /></div>
                  <span>{item.label}</span>
                  <p>{item.detail}</p>
                  <small>{item.source}</small>
                </a>
              ))}
            </div>
          </div>
        </details>

        <div className="value-calculator-cta">
          <div><strong>Turn this estimate into a finance-ready baseline.</strong><span>We map one live workflow, validate the figures with the right stakeholders and define the outcomes a pilot must prove.</span></div>
          <Button onClick={onOpenAccess}>Build My Verified Business Case</Button>
        </div>
      </motion.div>
    </section>
  );
}
