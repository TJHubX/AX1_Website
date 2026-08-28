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
  annualCarryRate: number;
  delayDays: number;
  unrecoverableValuePerDay: number;
  reworkDisputeCost: number;
  prematureActionExposure: number;
  preparationImprovementRate: number;
  delayDaysAvoided: number;
  observedCostImprovementRate: number;
  riskImprovementRate: number;
};

type NumberFieldProps = {
  label: string;
  helper: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
};

const EXAMPLE_INPUTS: CalculatorInputs = {
  decisionsPerMonth: 6,
  peoplePerDecision: 7,
  preparationHours: 4,
  hourlyCost: 85,
  averageCapitalWaiting: 25_000_000,
  annualCarryRate: 10,
  delayDays: 10,
  unrecoverableValuePerDay: 0,
  reworkDisputeCost: 0,
  prematureActionExposure: 0,
  preparationImprovementRate: 10,
  delayDaysAvoided: 1,
  observedCostImprovementRate: 10,
  riskImprovementRate: 10,
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
  const helperId = `${inputId}-helper`;
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
      <small id={helperId}>{helper}</small>
    </label>
  );
}

export function DecisionValueCalculator({ onOpenAccess }: { onOpenAccess: () => void }) {
  const [currency, setCurrency] = React.useState<Currency>('GBP');
  const [inputs, setInputs] = React.useState<CalculatorInputs>(EXAMPLE_INPUTS);
  const [includeDelay, setIncludeDelay] = React.useState(false);
  const [includeObservedImpact, setIncludeObservedImpact] = React.useState(false);

  const updateInput = (key: keyof CalculatorInputs) => (value: number) => {
    setInputs(current => ({ ...current, [key]: value }));
  };

  const updateDelayDays = (value: number) => {
    setInputs(current => ({
      ...current,
      delayDays: value,
      delayDaysAvoided: Math.min(current.delayDaysAvoided, value),
    }));
  };

  const resetExample = () => {
    setInputs(EXAMPLE_INPUTS);
    setCurrency('GBP');
    setIncludeDelay(false);
    setIncludeObservedImpact(false);
  };

  const annualDecisions = inputs.decisionsPerMonth * 12;
  const annualPreparationHours = annualDecisions * inputs.peoplePerDecision * inputs.preparationHours;
  const preparationCapacityCost = annualPreparationHours * inputs.hourlyCost;
  const dailyCapitalCarry = inputs.averageCapitalWaiting * (inputs.annualCarryRate / 100) / 365;
  const valuePerDelayDay = includeDelay ? dailyCapitalCarry + inputs.unrecoverableValuePerDay : 0;
  const delayExposure = includeDelay ? valuePerDelayDay * inputs.delayDays : 0;
  const observedCashCost = includeObservedImpact ? inputs.reworkDisputeCost : 0;
  const expectedLossExposure = includeObservedImpact ? inputs.prematureActionExposure : 0;
  const capacityOpportunity = preparationCapacityCost * (inputs.preparationImprovementRate / 100);
  const capitalOpportunity = valuePerDelayDay * Math.min(inputs.delayDaysAvoided, inputs.delayDays);
  const cashOpportunity = observedCashCost * (inputs.observedCostImprovementRate / 100);
  const riskOpportunity = expectedLossExposure * (inputs.riskImprovementRate / 100);
  const hoursPotentiallyReleased = annualPreparationHours * (inputs.preparationImprovementRate / 100);
  const costPerDecision = annualDecisions > 0 ? preparationCapacityCost / annualDecisions : 0;

  const formatMoney = (value: number) => new Intl.NumberFormat('en-GB', {
    style: 'currency', currency, maximumFractionDigits: 0,
  }).format(value);
  const formatNumber = (value: number) => Math.round(value).toLocaleString('en-GB');

  const unusualAssumption = includeDelay && (inputs.delayDays > 90 || inputs.annualCarryRate > 25);

  return (
    <section className="section decision-value-section" id="decision-cost">
      <motion.div className="decision-value-shell" {...fade}>
        <div className="decision-value-intro">
          <div>
            <Badge>Capital performance calculator</Badge>
            <h2>What is disconnected capital execution costing you?</h2>
            <p>Start with the preparation time you can measure. Then add decision delay, rework, disputes and capital action before proof only where you have defensible data.</p>
          </div>
          <button className="value-reset" type="button" onClick={resetExample}>
            <RefreshCcw size={14} /> Reset example
          </button>
        </div>

        <div className="decision-value-workspace">
          <form className="decision-value-form" onSubmit={(event) => event.preventDefault()}>
            <div className="value-example-note"><Info size={15} /><span>Illustrative values are loaded. Replace them with your own figures. Calculations stay in your browser.</span></div>

            <fieldset className="value-fieldset">
              <legend><span>01</span><div><strong>Visible preparation burden</strong><small>People-time used to reconstruct evidence and decision context</small></div></legend>
              <div className="value-fields-grid">
                <NumberField label="Capital decisions per month" helper="Material decisions prepared through this workflow." value={inputs.decisionsPerMonth} onChange={updateInput('decisionsPerMonth')} min={1} max={200} />
                <NumberField label="People involved per decision" helper="Count contributors, reviewers and approvers." value={inputs.peoplePerDecision} onChange={updateInput('peoplePerDecision')} min={1} max={200} />
                <NumberField label="Preparation hours per person" helper="Hours per person for each decision, including reconciliation." value={inputs.preparationHours} onChange={updateInput('preparationHours')} min={0.25} max={160} step={0.25} suffix="hrs" />
                <NumberField label="Fully loaded hourly cost" helper="Salary, on-cost and relevant overhead in the selected currency." value={inputs.hourlyCost} onChange={updateInput('hourlyCost')} min={10} max={5000} step={5} prefix={CURRENCY_SYMBOLS[currency]} />
                <label className="value-field value-currency-field">
                  <span>Currency</span>
                  <div className="value-input-wrap">
                    <select value={currency} onChange={(event) => setCurrency(event.target.value as Currency)} aria-describedby="currency-helper">
                      <option value="GBP">GBP (£)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>
                  <small id="currency-helper">Display denomination only. Values are not converted.</small>
                </label>
              </div>
            </fieldset>

            <fieldset className="value-fieldset value-optional-module">
              <legend><span>02</span><div><strong>Add decision-delay exposure</strong><small>Include only delay attributable to evidence, approval or authority gaps</small></div></legend>
              <label className="value-module-toggle">
                <input type="checkbox" checked={includeDelay} onChange={(event) => setIncludeDelay(event.target.checked)} />
                <span><strong>{includeDelay ? 'Included in result' : 'Not included'}</strong><small>Model capital carry and optional operating value for non-overlapping critical-path days.</small></span>
                <i aria-hidden="true" />
              </label>
              {includeDelay && (
                <div className="value-fields-grid value-module-fields">
                  <NumberField label="Average capital awaiting decision" helper="Average outstanding balance during the delay days. Do not use total annual throughput." value={inputs.averageCapitalWaiting} onChange={updateInput('averageCapitalWaiting')} min={0} max={1_000_000_000_000} step={100_000} prefix={CURRENCY_SYMBOLS[currency]} />
                  <NumberField label="Annual financing or carry rate" helper="Use your finance-approved cost of capital or carrying rate." value={inputs.annualCarryRate} onChange={updateInput('annualCarryRate')} min={0} max={50} step={0.1} suffix="%" />
                  <NumberField label="Capital-weighted delay days per year" helper="Days the average balance was actually held. Do not sum overlapping decision delays." value={inputs.delayDays} onChange={updateDelayDays} min={0} max={365} suffix="days" />
                  <NumberField label="Unrecoverable operating value per day" helper="Optional net value permanently lost per day. Leave zero when value is only deferred." value={inputs.unrecoverableValuePerDay} onChange={updateInput('unrecoverableValuePerDay')} min={0} max={1_000_000_000} step={1000} prefix={CURRENCY_SYMBOLS[currency]} />
                </div>
              )}
            </fieldset>

            <fieldset className="value-fieldset value-optional-module">
              <legend><span>03</span><div><strong>Add direct cost and expected loss</strong><small>Keep realised cost separate from finance-approved risk exposure</small></div></legend>
              <label className="value-module-toggle">
                <input type="checkbox" checked={includeObservedImpact} onChange={(event) => setIncludeObservedImpact(event.target.checked)} />
                <span><strong>{includeObservedImpact ? 'Included in result' : 'Not included'}</strong><small>Add realised non-labour cost and, separately, an annual expected-loss amount. Leave unknown values at zero.</small></span>
                <i aria-hidden="true" />
              </label>
              {includeObservedImpact && (
                <>
                  <div className="value-overlap-note"><ShieldAlert size={15} /><span>Exclude internal preparation time already entered in step 01, financing carry already entered in step 02, and any amount represented in both fields below.</span></div>
                  <div className="value-fields-grid value-module-fields">
                    <NumberField label="Non-labour rework and dispute cost" helper="Observed external fees, claims, settlement or repeated-work spend in the last 12 months." value={inputs.reworkDisputeCost} onChange={updateInput('reworkDisputeCost')} min={0} max={10_000_000_000} step={10_000} prefix={CURRENCY_SYMBOLS[currency]} />
                    <NumberField label="Premature-action expected loss" helper="Annual probability × loss severity, approved by Finance. Do not enter the full capital amount." value={inputs.prematureActionExposure} onChange={updateInput('prematureActionExposure')} min={0} max={10_000_000_000} step={10_000} prefix={CURRENCY_SYMBOLS[currency]} />
                  </div>
                </>
              )}
            </fieldset>

            <fieldset className="value-fieldset value-scenario-fieldset">
              <legend><span>04</span><div><strong>Test an improvement scenario</strong><small>This is your assumption, not an AX1 performance claim</small></div></legend>
              <div className="value-scenario-control">
                <div className="value-scenario-group">
                  <div className="value-scenario-top"><label htmlFor="preparation-rate">Preparation time reduction</label><output htmlFor="preparation-rate">{inputs.preparationImprovementRate}%</output></div>
                  <input id="preparation-rate" type="range" min="0" max="30" step="1" value={inputs.preparationImprovementRate} onChange={(event) => updateInput('preparationImprovementRate')(Number(event.target.value))} />
                  <div className="value-scenario-presets" aria-label="Preparation improvement presets">
                    {[0, 5, 10, 20, 30].map(rate => <button aria-pressed={inputs.preparationImprovementRate === rate} className={inputs.preparationImprovementRate === rate ? 'is-active' : ''} type="button" key={rate} onClick={() => updateInput('preparationImprovementRate')(rate)}>{rate}%</button>)}
                  </div>
                </div>
                {includeDelay && <NumberField label="Decision-delay days avoided" helper="Scenario days only. The value cannot exceed your current delay baseline." value={inputs.delayDaysAvoided} onChange={updateInput('delayDaysAvoided')} min={0} max={inputs.delayDays} suffix="days" />}
                {includeObservedImpact && (
                  <>
                    <div className="value-scenario-group">
                      <div className="value-scenario-top"><label htmlFor="observed-cost-rate">Observed cash-cost reduction</label><output htmlFor="observed-cost-rate">{inputs.observedCostImprovementRate}%</output></div>
                      <input id="observed-cost-rate" type="range" min="0" max="30" step="1" value={inputs.observedCostImprovementRate} onChange={(event) => updateInput('observedCostImprovementRate')(Number(event.target.value))} />
                      <div className="value-scenario-presets" aria-label="Observed cost improvement presets">
                        {[0, 5, 10, 20, 30].map(rate => <button aria-pressed={inputs.observedCostImprovementRate === rate} className={inputs.observedCostImprovementRate === rate ? 'is-active' : ''} type="button" key={rate} onClick={() => updateInput('observedCostImprovementRate')(rate)}>{rate}%</button>)}
                      </div>
                    </div>
                    <div className="value-scenario-group">
                      <div className="value-scenario-top"><label htmlFor="expected-loss-rate">Expected-loss exposure reduction</label><output htmlFor="expected-loss-rate">{inputs.riskImprovementRate}%</output></div>
                      <input id="expected-loss-rate" type="range" min="0" max="30" step="1" value={inputs.riskImprovementRate} onChange={(event) => updateInput('riskImprovementRate')(Number(event.target.value))} />
                      <div className="value-scenario-presets" aria-label="Expected loss improvement presets">
                        {[0, 5, 10, 20, 30].map(rate => <button aria-pressed={inputs.riskImprovementRate === rate} className={inputs.riskImprovementRate === rate ? 'is-active' : ''} type="button" key={rate} onClick={() => updateInput('riskImprovementRate')(rate)}>{rate}%</button>)}
                      </div>
                    </div>
                  </>
                )}
                <p>Capacity, capital timing and cash cost use separate levers and stay separate in the result. A finance-ready case should also validate addressability, workflow coverage, adoption ramp and cash realisation.</p>
              </div>
            </fieldset>
          </form>

          <aside className="decision-value-results" aria-label="Capital performance estimate">
            <p className="value-live-summary" role="status" aria-live="polite" aria-atomic="true">Annual preparation capacity is {formatMoney(preparationCapacityCost)}. The capacity scenario is {formatMoney(capacityOpportunity)}. {includeDelay ? `Decision-delay timing cost is ${formatMoney(delayExposure)} and the selected days avoided are worth ${formatMoney(capitalOpportunity)}.` : 'Decision delay is not included.'} {includeObservedImpact ? `Observed cash impact is ${formatMoney(observedCashCost)} with a scenario value of ${formatMoney(cashOpportunity)}. Annual expected loss is ${formatMoney(expectedLossExposure)} with a scenario value of ${formatMoney(riskOpportunity)}.` : 'Direct cost and expected loss are not included.'}</p>
            <div className="value-result-kicker"><Calculator size={19} /><span>Live model</span></div>
            <div className="value-current-result">
              <span>Annual preparation capacity cost</span>
              <strong>{formatMoney(preparationCapacityCost)}</strong>
              <small>Time value, not automatically cashable savings</small>
            </div>

            <div className="value-baseline-list" aria-label="Separate current baselines">
              <span><small>Decision-delay timing cost</small><strong>{formatMoney(delayExposure)}</strong><em>{includeDelay ? 'Included' : 'Not included'}</em></span>
              <span><small>Observed cash impact</small><strong>{formatMoney(observedCashCost)}</strong><em>{includeObservedImpact ? 'Included' : 'Not included'}</em></span>
              <span><small>Annual expected loss</small><strong>{formatMoney(expectedLossExposure)}</strong><em>{includeObservedImpact ? 'Risk adjusted' : 'Not included'}</em></span>
            </div>

            <div className="value-outcome-heading"><span>Illustrative category outcomes</span><small>Shown separately. Never totalled.</small></div>
            <div className="value-outcome-grid">
              <div><Users size={16} /><span>Capacity value at {inputs.preparationImprovementRate}%</span><strong>{formatMoney(capacityOpportunity)}</strong><small>{formatNumber(hoursPotentiallyReleased)} hours potentially released</small></div>
              <div><Clock3 size={16} /><span>Capital value for {inputs.delayDaysAvoided} day{inputs.delayDaysAvoided === 1 ? '' : 's'}</span><strong>{formatMoney(capitalOpportunity)}</strong><small>{includeDelay ? `${formatMoney(valuePerDelayDay)} per delay day` : 'Add delay data to model'}</small></div>
              <div><CircleDollarSign size={16} /><span>Cash-cost value at {inputs.observedCostImprovementRate}%</span><strong>{formatMoney(cashOpportunity)}</strong><small>{includeObservedImpact ? 'Based on entered realised cost' : 'Add direct cost to model'}</small></div>
              <div><ShieldAlert size={16} /><span>Risk value at {inputs.riskImprovementRate}%</span><strong>{formatMoney(riskOpportunity)}</strong><small>{includeObservedImpact ? 'Based on annual expected loss' : 'Add expected loss to model'}</small></div>
            </div>

            <div className="value-unit-economics">
              <span><small>Decisions modelled</small><strong>{formatNumber(annualDecisions)} / year</strong></span>
              <span><small>Cost per decision</small><strong>{formatMoney(costPerDecision)}</strong></span>
              <span><small>Preparation load</small><strong>{formatNumber(annualPreparationHours)} hours</strong></span>
            </div>

            {unusualAssumption && <div className="value-assumption-warning"><ShieldAlert size={15} /><span>One or more delay assumptions is unusually high. Validate it with Finance before relying on the result.</span></div>}
            <p className="value-result-disclaimer">This model keeps capacity, capital timing and cash impact separate because they are not automatically additive. Each scenario is neither a forecast nor guaranteed AX1 savings. Validate addressability, coverage, adoption, cash realisation and implementation cost before making an investment decision.</p>
          </aside>
        </div>

        <details className="value-methodology">
          <summary><span><Info size={17} />See the calculation and safeguards</span><ChevronDown size={18} /></summary>
          <div className="value-methodology-grid">
            <article><strong>Preparation capacity</strong><p>Annual decisions × people per decision × preparation hours × fully loaded hourly cost.</p></article>
            <article><strong>Decision-delay timing cost</strong><p>Average capital awaiting decision × annual carry rate × capital-weighted delay days ÷ 365, plus any genuinely unrecoverable daily operating value.</p></article>
            <article><strong>Direct cost and expected loss</strong><p>Realised non-labour cost stays separate from annual expected loss, which must equal event probability × loss severity. Unknown amounts stay excluded.</p></article>
            <article><strong>Illustrative category outcomes</strong><p>Preparation capacity uses a time-reduction rate, capital value uses days avoided, and direct cost and expected loss use separate rates. They are never totalled.</p></article>
          </div>
          <div className="value-safeguards"><TimerReset size={17} /><p>Use non-overlapping delay days and costs. Do not add a full contingency reserve, generic cost overrun and dispute value if they describe the same exposure. Validate material assumptions with Finance and the programme team.</p></div>
        </details>

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

        <div className="value-calculator-cta">
          <div><strong>Turn this estimate into a finance-ready baseline.</strong><span>In an AX1 working session, we map one live capital workflow, validate the inputs and define the outcomes a pilot must prove.</span></div>
          <Button onClick={onOpenAccess}>Validate My Baseline</Button>
        </div>
      </motion.div>
    </section>
  );
}
