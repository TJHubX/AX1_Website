import React, { useEffect, useId, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Copy, ExternalLink, Mail, ShieldCheck } from 'lucide-react';
import { BrandedDatePicker } from '../../components/BrandedDatePicker';
import { BrandedSelect } from '../../components/BrandedSelect';
import type { DecisionExposureScenario } from '../decision-exposure/DecisionExposureSnapshot';
import { trackAX1Event } from '../../utils/analytics';
import {
  buildDecisionEmail,
  type DecisionBriefEmail,
  type DecisionBriefValues,
} from './decisionBrief';

type Props = {
  scenario: DecisionExposureScenario | null;
};

type Errors = Partial<Record<keyof DecisionBriefValues, string>>;

const initialValues: DecisionBriefValues = {
  decision: '',
  decisionDate: '',
  capitalAffected: '',
  currency: 'EUR',
  conditions: '',
  evidenceLocation: '',
  workEmail: '',
  context: '',
};

function sanitiseCapitalInput(value: string) {
  const clean = value.replace(/[\s,]/g, '').replace(/[^\d.]/g, '');
  const [integer = '', ...fractionParts] = clean.split('.');
  const fraction = fractionParts.join('').slice(0, 2);
  return fractionParts.length > 0 ? `${integer}.${fraction}` : integer;
}

function formatCapitalInput(value: string) {
  if (!value) return '';
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return value;
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(numeric);
}

function recipientEmail() {
  return document.documentElement.dataset.ax1Email || 'info@ax1.capital';
}

export function DecisionBriefSection({ scenario }: Props) {
  const ids = {
    decision: useId(), decisionDate: useId(), capitalAffected: useId(), currency: useId(),
    conditions: useId(), evidenceLocation: useId(), workEmail: useId(), context: useId(),
    subject: useId(), body: useId(),
  };
  const [values, setValues] = useState<DecisionBriefValues>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [preview, setPreview] = useState<DecisionBriefEmail | null>(null);
  const [status, setStatus] = useState('');
  const [capitalFocused, setCapitalFocused] = useState(false);

  useEffect(() => {
    if (!scenario) return;
    setValues((current) => ({
      ...current,
      capitalAffected: scenario.capital > 0 ? String(Math.round(scenario.capital)) : current.capitalAffected,
      currency: scenario.currency,
      context: current.context.includes('Capital governed through the next decision:')
        ? scenario.summary
        : [current.context, scenario.summary].filter(Boolean).join('\n\n'),
    }));
    setPreview(null);
    setStatus('Decision-exposure scenario added. Complete the brief when ready.');
  }, [scenario]);

  const update = <K extends keyof DecisionBriefValues>(key: K, value: DecisionBriefValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setPreview(null);
    setStatus('');
  };

  const validate = () => {
    const next: Errors = {};
    if (!values.decision.trim()) next.decision = 'Describe the approaching capital decision.';
    if (!values.decisionDate) next.decisionDate = 'Add the expected decision date.';
    if (!values.capitalAffected.trim()) next.capitalAffected = 'Add the approximate capital affected.';
    else if (!Number.isFinite(Number(values.capitalAffected)) || Number(values.capitalAffected) <= 0) next.capitalAffected = 'Enter a positive amount.';
    if (!values.conditions.trim()) next.conditions = 'Describe what must be true before capital moves.';
    if (!values.evidenceLocation) next.evidenceLocation = 'Select where the proof is today.';
    if (!values.workEmail.trim()) next.workEmail = 'Enter a work email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.workEmail)) next.workEmail = 'Enter a valid email address.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const prepareBrief = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      setStatus('Complete the highlighted fields before preparing the brief.');
      return;
    }
    setPreview(buildDecisionEmail(values));
    setStatus('Brief prepared below. Review and edit it before copying or opening email.');
    trackAX1Event('decision_brief_prepared', {
      evidence_position: values.evidenceLocation,
      scenario_included: Boolean(scenario),
      currency: values.currency,
    });
    window.requestAnimationFrame(() => document.querySelector('.cg-brief-preview')?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
  };

  const updatePreview = (key: keyof DecisionBriefEmail, value: string) => {
    setPreview((current) => current ? { ...current, [key]: value } : current);
    setStatus('');
  };

  const copyBrief = async () => {
    if (!preview) return;
    try {
      await navigator.clipboard.writeText(`${preview.subject}\n\n${preview.body}`);
      setStatus('Decision Brief copied to your clipboard.');
      trackAX1Event('decision_brief_copied');
    } catch {
      setStatus('Copy was unavailable. Select the brief text and copy it manually.');
    }
  };

  const openEmail = () => {
    if (!preview) return;
    trackAX1Event('decision_brief_email_opened');
    const subject = encodeURIComponent(preview.subject);
    const body = encodeURIComponent(preview.body);
    window.location.href = `mailto:${recipientEmail()}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="cg-brief" id="decision-brief" aria-labelledby="decision-brief-title">
      <div className="cg-shell cg-brief-layout">
        <div className="cg-brief-copy cg-brief-editorial">
          <div className="cg-brief-intro cg-brief-intro-panel">
            <span className="cg-eyebrow"><Mail size={15} /> Decision Brief</span>
            <h2 id="decision-brief-title">Bring the next capital decision, not a requirements list.</h2>
            <p>Frame one approaching action. Review the generated brief on this page, edit it if needed, then decide whether to copy it or open your email client.</p>
          </div>
          <div className="cg-brief-meta">
            <div className="cg-brief-principle"><ShieldCheck size={18} /><p><strong>Capital, governed by execution.</strong>Configured rules determine readiness. Authorised people determine action.</p></div>
            <div className="cg-brief-contact"><span>Direct recipient</span><a href={`mailto:${recipientEmail()}`}>{recipientEmail()}</a></div>
            <p className="cg-brief-privacy">Your entries remain in this browser. Axis One does not receive anything until you choose to send the email.</p>
          </div>
        </div>

        <div className="cg-brief-workspace">
          <form className="cg-brief-form" onSubmit={prepareBrief} noValidate>
            <div className="cg-form-progress" aria-hidden="true"><span className="is-active" /><span className={preview ? 'is-active' : ''} /><span /></div>
            <label className={errors.decision ? 'is-invalid' : ''} htmlFor={ids.decision}>
              <span>What capital decision is approaching?</span>
              <textarea id={ids.decision} rows={3} value={values.decision} onChange={(event) => update('decision', event.target.value)} placeholder="For example: authorise the next infrastructure release" />
              {errors.decision && <small>{errors.decision}</small>}
            </label>
            <div className="cg-brief-form-row cg-brief-form-row-three">
              <div className={`cg-brief-field ${errors.decisionDate ? 'is-invalid' : ''}`.trim()}>
                <label htmlFor={ids.decisionDate}>When is the next decision?</label>
                <BrandedDatePicker id={ids.decisionDate} value={values.decisionDate} invalid={Boolean(errors.decisionDate)} ariaLabel="Next decision date" onChange={(nextDate) => update('decisionDate', nextDate)} />
                {errors.decisionDate && <small>{errors.decisionDate}</small>}
              </div>
              <div className={`cg-brief-field ${errors.capitalAffected ? 'is-invalid' : ''}`.trim()}>
                <label htmlFor={ids.capitalAffected}>Approximate capital affected</label>
                <div className="cg-brief-money"><BrandedSelect id={ids.currency} className="is-money" ariaLabel="Capital currency" value={values.currency} options={[{ value: 'EUR', label: 'EUR' }, { value: 'GBP', label: 'GBP' }, { value: 'USD', label: 'USD' }]} onChange={(nextCurrency) => update('currency', nextCurrency)} /><input id={ids.capitalAffected} type="text" inputMode="decimal" value={capitalFocused ? values.capitalAffected : formatCapitalInput(values.capitalAffected)} onFocus={() => setCapitalFocused(true)} onBlur={() => setCapitalFocused(false)} onChange={(event) => update('capitalAffected', sanitiseCapitalInput(event.target.value))} placeholder="12,400,000" /></div>
                {errors.capitalAffected && <small>{errors.capitalAffected}</small>}
              </div>
            </div>
            <label className={errors.conditions ? 'is-invalid' : ''} htmlFor={ids.conditions}>
              <span>What must be true before it moves?</span>
              <textarea id={ids.conditions} rows={3} value={values.conditions} onChange={(event) => update('conditions', event.target.value)} placeholder="The outcome, evidence and authority conditions that must be satisfied" />
              {errors.conditions && <small>{errors.conditions}</small>}
            </label>
            <div className="cg-brief-form-row">
              <div className={`cg-brief-field ${errors.evidenceLocation ? 'is-invalid' : ''}`.trim()}>
                <label htmlFor={ids.evidenceLocation}>Where is the proof today?</label>
                <BrandedSelect
                  id={ids.evidenceLocation}
                  value={values.evidenceLocation}
                  invalid={Boolean(errors.evidenceLocation)}
                  ariaLabel="Where the proof is today"
                  options={[
                    { value: '', label: 'Select current position' },
                    { value: 'Open in one current system', label: 'Open in one current system' },
                    { value: 'Split across tools and stakeholders', label: 'Split across tools and stakeholders' },
                    { value: 'Rebuilt for each decision meeting', label: 'Rebuilt for each decision meeting' },
                    { value: 'Not consistently available', label: 'Not consistently available' },
                  ]}
                  onChange={(nextLocation) => update('evidenceLocation', nextLocation)}
                />
                {errors.evidenceLocation && <small>{errors.evidenceLocation}</small>}
              </div>
              <label className={errors.workEmail ? 'is-invalid' : ''} htmlFor={ids.workEmail}>
                <span>Work email</span>
                <input id={ids.workEmail} type="email" autoComplete="email" value={values.workEmail} onChange={(event) => update('workEmail', event.target.value)} placeholder="you@organisation.com" />
                {errors.workEmail && <small>{errors.workEmail}</small>}
              </label>
            </div>
            <label htmlFor={ids.context}>
              <span>Optional context</span>
              <textarea id={ids.context} rows={scenario ? 8 : 4} value={values.context} onChange={(event) => update('context', event.target.value)} placeholder="Programme, timing or stakeholder context. Do not include confidential information." />
            </label>
            <button className="cg-button cg-button-primary cg-brief-submit" type="submit">Prepare the Decision Brief <ArrowRight size={16} /></button>
            <div className="cg-form-boundary"><Copy size={14} /><span>Preparing the brief does not submit data or open another application.</span></div>
            {status && <p className={`cg-form-status ${Object.values(errors).some(Boolean) ? 'is-error' : ''}`} role="status"><CheckCircle2 size={15} />{status}</p>}
          </form>

          {preview && (
            <section className="cg-brief-preview" aria-labelledby="cg-brief-preview-title">
              <div className="cg-brief-preview-head"><div><span>Step 02</span><h3 id="cg-brief-preview-title">Review the email before anything opens.</h3></div><button type="button" onClick={() => setPreview(null)}><ArrowLeft size={15} />Edit inputs</button></div>
              <label htmlFor={ids.subject}><span>Email subject</span><input id={ids.subject} value={preview.subject} onChange={(event) => updatePreview('subject', event.target.value)} /></label>
              <label htmlFor={ids.body}><span>Email body</span><textarea id={ids.body} rows={22} value={preview.body} onChange={(event) => updatePreview('body', event.target.value)} /></label>
              <div className="cg-brief-preview-actions"><button className="cg-button cg-button-secondary" type="button" onClick={copyBrief}><Copy size={16} />Copy brief</button><button className="cg-button cg-button-primary" type="button" onClick={openEmail}><ExternalLink size={16} />Open email</button></div>
              <p>Nothing is sent automatically. Your email client opens only when you select “Open email”.</p>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}
