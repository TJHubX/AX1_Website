import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ArrowRight, Calculator, Check, Clock3, Eye, EyeOff, Plus, TriangleAlert } from 'lucide-react';
import { BrandedSelect } from '../../components/BrandedSelect';
import { currencyOptions, formatMoney, type CurrencyCode } from '../../currency';
import { trackAX1Event } from '../../utils/analytics';
import { calculateDecisionExposure } from './decisionExposure';

export type DecisionExposureScenario = {
  capital: number;
  days: number;
  annualRate: number;
  currency: CurrencyCode;
  carryingBurden: number;
  additionalBurden: number;
  evidenceVisibility: EvidenceVisibility;
  summary: string;
};

type EvidenceVisibility = 'yes' | 'partly' | 'no';

type Props = {
  onUseScenario: (scenario: DecisionExposureScenario) => void;
};

const visibilityCopy: Record<EvidenceVisibility, { title: string; copy: string }> = {
  yes: {
    title: 'The basis is accessible.',
    copy: 'Now test whether the evidence is attributable, current and inside the correct authority boundary.',
  },
  partly: {
    title: 'The basis is being partially reconstructed.',
    copy: 'Review which evidence, ownership or authority conditions still need to be assembled for the decision.',
  },
  no: {
    title: 'This is governance latency.',
    copy: 'Frame the evidence, authority and permitted action before capital pressure turns reconstruction into the control process.',
  },
};

function cleanNumber(value: string, fallback = 0) {
  const parsed = Number(value.replace(/[\s,]/g, ''));
  return Number.isFinite(parsed) ? Math.max(0, parsed) : fallback;
}

export function DecisionExposureSnapshot({ onUseScenario }: Props) {
  const capitalId = useId();
  const daysId = useId();
  const rateId = useId();
  const currencyId = useId();
  const additionalId = useId();
  const [capital, setCapital] = useState(12_400_000);
  const [capitalFocused, setCapitalFocused] = useState(false);
  const [days, setDays] = useState(21);
  const [annualRate, setAnnualRate] = useState(8);
  const [currency, setCurrency] = useState<CurrencyCode>('EUR');
  const [additionalBurden, setAdditionalBurden] = useState(0);
  const [evidenceVisibility, setEvidenceVisibility] = useState<EvidenceVisibility>('partly');
  const initialCalculation = useRef(true);

  const formatCurrency = (value: number, maximumFractionDigits = 0) => formatMoney(value, currency, 'en-GB', maximumFractionDigits);

  const compactMoney = (value: number) => new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);

  const { carryingBurden, sevenDayBurden } = useMemo(
    () => calculateDecisionExposure(capital, annualRate, days),
    [annualRate, capital, days],
  );
  const combinedVisibleBurden = carryingBurden + additionalBurden;
  const visibility = visibilityCopy[evidenceVisibility];

  useEffect(() => {
    if (initialCalculation.current) {
      initialCalculation.current = false;
      return undefined;
    }
    const timer = window.setTimeout(() => {
      trackAX1Event('decision_exposure_calculated', {
        currency,
        delay_days: days,
        carrying_rate: annualRate,
        separate_burden_included: additionalBurden > 0,
      });
    }, 700);
    return () => window.clearTimeout(timer);
  }, [additionalBurden, annualRate, capital, currency, days]);

  const buildScenario = (): DecisionExposureScenario => {
    const summary = [
      `Capital governed through the next decision: ${formatCurrency(capital)}`,
      `Decision basis incomplete for: ${days} day${days === 1 ? '' : 's'}`,
      `Annual carrying or financing rate: ${annualRate}%`,
      `Minimum visible carrying burden: ${formatCurrency(carryingBurden)}`,
      `Each additional 7 days: ${formatCurrency(sevenDayBurden)}`,
      additionalBurden > 0 ? `Separate verified burden: ${formatCurrency(additionalBurden)}` : '',
      `Can the current decision basis be opened now? ${evidenceVisibility === 'yes' ? 'Yes' : evidenceVisibility === 'partly' ? 'Partly' : 'No'}`,
    ].filter(Boolean).join('\n');

    return {
      capital,
      days,
      annualRate,
      currency,
      carryingBurden,
      additionalBurden,
      evidenceVisibility,
      summary,
    };
  };

  return (
    <section className="cg-exposure" id="decision-exposure" aria-labelledby="decision-exposure-title">
      <div className="cg-shell">
        <header className="cg-section-heading cg-section-heading-dark">
          <span className="cg-eyebrow"><Calculator size={15} /> Capital decision exposure</span>
          <h2 id="decision-exposure-title">How much capital is waiting while the decision basis is rebuilt?</h2>
          <p>Use three figures to expose the minimum visible carrying burden. This is not a savings promise or an ROI forecast.</p>
        </header>

        <div className="cg-exposure-workspace">
          <form className="cg-exposure-inputs" onSubmit={(event) => event.preventDefault()}>
            <div className="cg-exposure-form-head">
              <span>01</span>
              <div><strong>Frame the decision</strong><small>Use a live decision or a realistic scenario.</small></div>
            </div>

            <div className="cg-exposure-field">
              <label htmlFor={capitalId}>Capital governed through the next decision</label>
              <div className="cg-money-input">
                <BrandedSelect<CurrencyCode> id={currencyId} className="is-money" ariaLabel="Display currency" value={currency} options={currencyOptions} onChange={setCurrency} />
                <input id={capitalId} type="text" inputMode="decimal" value={capitalFocused ? String(capital) : new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(capital)} onFocus={() => setCapitalFocused(true)} onBlur={() => setCapitalFocused(false)} onChange={(event) => setCapital(cleanNumber(event.target.value))} />
              </div>
              <small>Currency changes display only. No exchange-rate conversion is performed.</small>
            </div>

            <div className="cg-input-pair">
              <label htmlFor={daysId}>
                <span>Days the decision basis remains incomplete</span>
                <div className="cg-suffixed-input"><input id={daysId} type="number" min="0" max="3650" step="1" value={days} onChange={(event) => setDays(cleanNumber(event.target.value))} /><b>days</b></div>
              </label>
              <label htmlFor={rateId}>
                <span>Annual carrying or financing rate</span>
                <div className="cg-suffixed-input"><input id={rateId} type="number" min="0" max="100" step="0.1" value={annualRate} onChange={(event) => setAnnualRate(cleanNumber(event.target.value))} /><b>%</b></div>
              </label>
            </div>

            <details className="cg-verified-burden">
              <summary><Plus size={15} /> Add another verified burden</summary>
              <label htmlFor={additionalId}>
                <span>Separate, evidenced cost</span>
                <div className="cg-suffixed-input"><input id={additionalId} type="number" min="0" step="1000" value={additionalBurden} onChange={(event) => setAdditionalBurden(cleanNumber(event.target.value))} /><b>{currency}</b></div>
                <small>Include only evidenced costs not already represented in the carrying-cost estimate above.</small>
              </label>
            </details>
          </form>

          <div className="cg-exposure-results" aria-live="polite">
            <div className="cg-exposure-form-head">
              <span>02</span>
              <div><strong>See the visible burden</strong><small>Capital × annual rate × days ÷ 365</small></div>
            </div>
            <div className="cg-result-primary">
              <span>Minimum visible carrying burden</span>
              <strong>{formatCurrency(carryingBurden)}</strong>
              <small>{compactMoney(capital)} governed for {days} days at {annualRate}% per year</small>
            </div>
            <div className="cg-result-ledger">
              <div><span>Capital governed</span><strong>{formatCurrency(capital)}</strong></div>
              <div><span>Decision latency</span><strong>{days} days</strong></div>
              <div><span>Each additional 7 days</span><strong>{formatCurrency(sevenDayBurden)}</strong></div>
              {additionalBurden > 0 && <div><span>Combined visible burden</span><strong>{formatCurrency(combinedVisibleBurden)}</strong></div>}
            </div>
            <div className="cg-exposure-timeline" aria-label="Decision latency timeline">
              {[0, 7, 14, days].filter((value, index, values) => values.indexOf(value) === index).sort((a, b) => a - b).map((day, index, values) => (
                <div className={index === values.length - 1 ? 'is-current' : ''} key={day}><i /><span>Day {day}</span></div>
              ))}
            </div>
            <p className="cg-result-interpretation">The number worth investigating is not only <strong>{formatCurrency(carryingBurden)}</strong>. It is whether <strong>{compactMoney(capital)}</strong> is governed through current, attributable evidence or reconstructed for the decision meeting.</p>
          </div>
        </div>

        <div className="cg-evidence-check">
          <div>
            <span className="cg-step-index">03</span>
            <h3>Can the current decision basis be opened now?</h3>
          </div>
          <div className="cg-choice-group" role="group" aria-label="Current decision basis visibility">
            {(['yes', 'partly', 'no'] as EvidenceVisibility[]).map((choice) => (
              <button className={evidenceVisibility === choice ? 'is-active' : ''} key={choice} type="button" aria-pressed={evidenceVisibility === choice} onClick={() => { setEvidenceVisibility(choice); trackAX1Event('decision_exposure_visibility_set', { answer: choice }); }}>
                {choice === 'yes' ? <Check size={15} /> : choice === 'partly' ? <Eye size={15} /> : <EyeOff size={15} />}
                {choice === 'yes' ? 'Yes' : choice === 'partly' ? 'Partly' : 'No'}
              </button>
            ))}
          </div>
          <div className={`cg-visibility-message is-${evidenceVisibility}`}>
            {evidenceVisibility === 'no' ? <TriangleAlert size={18} /> : <Clock3 size={18} />}
            <p><strong>{visibility.title}</strong>{visibility.copy}</p>
          </div>
          <button className="cg-button cg-button-primary cg-use-scenario" type="button" onClick={() => { trackAX1Event('decision_exposure_scenario_used', { currency, delay_days: days, evidence_visibility: evidenceVisibility }); onUseScenario(buildScenario()); }}>
            Use this scenario in a decision brief <ArrowRight size={16} />
          </button>
        </div>

        <div className="cg-exposure-footer">
          <p className="cg-exposure-boundary">Illustrative decision-exposure estimate. It excludes delay impacts beyond the entered carrying rate, opportunity cost, disputes, rework and unverified assumptions. Axis One does not guarantee savings or delivery outcomes.</p>
          <a href="/capital">Open the full exposure model <ArrowRight size={14} /></a>
        </div>
      </div>
    </section>
  );
}
