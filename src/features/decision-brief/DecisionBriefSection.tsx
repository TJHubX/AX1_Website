import React, { useEffect, useId, useState } from 'react';
import { ArrowRight, CheckCircle2, Copy, Mail, ShieldCheck } from 'lucide-react';
import type { DecisionExposureScenario } from '../decision-exposure/DecisionExposureSnapshot';

type Props = {
  scenario?: DecisionExposureScenario | null;
};

type FormValues = {
  decision: string;
  conditions: string;
  evidenceLocation: string;
  workEmail: string;
  context: string;
};

const initialValues: FormValues = {
  decision: '',
  conditions: '',
  evidenceLocation: '',
  workEmail: '',
  context: '',
};

export function buildDecisionBrief(values: FormValues) {
  return [
    'AX1 CAPITAL DECISION BRIEF',
    '',
    'What capital decision is approaching?',
    values.decision,
    '',
    'What must be true before it moves?',
    values.conditions,
    '',
    'Where is the proof today?',
    values.evidenceLocation,
    '',
    `Work email: ${values.workEmail}`,
    '',
    'Optional context or decision-exposure scenario:',
    values.context || 'None provided.',
  ].join('\n');
}

export function DecisionBriefSection({ scenario }: Props) {
  const decisionId = useId();
  const conditionsId = useId();
  const evidenceId = useId();
  const emailId = useId();
  const contextId = useId();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!scenario) return;
    setValues((current) => ({
      ...current,
      context: current.context.includes('Capital governed through the next decision:')
        ? scenario.summary
        : [current.context, scenario.summary].filter(Boolean).join('\n\n'),
    }));
    setStatus('Decision-exposure scenario added below.');
  }, [scenario]);

  const update = (key: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatus('');
  };

  const validate = () => {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.decision.trim()) next.decision = 'Describe the approaching capital decision.';
    if (!values.conditions.trim()) next.conditions = 'Describe what must be true before capital moves.';
    if (!values.evidenceLocation) next.evidenceLocation = 'Select where the proof is today.';
    if (!values.workEmail.trim()) next.workEmail = 'Enter a work email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.workEmail)) next.workEmail = 'Enter a valid email address.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const prepareBrief = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      setStatus('Complete the highlighted fields before preparing the brief.');
      return;
    }

    const brief = buildDecisionBrief(values);
    try {
      await navigator.clipboard.writeText(brief);
      setStatus('Brief copied. Your email client is opening so you remain in control of sending it.');
    } catch {
      setStatus('Your email client is opening. Review the brief before sending it.');
    }
    const subject = encodeURIComponent(`AX1 decision brief: ${values.decision.slice(0, 72)}`);
    const body = encodeURIComponent(brief);
    window.location.href = `mailto:info@ax1.capital?subject=${subject}&body=${body}`;
  };

  return (
    <section className="cg-brief" id="decision-brief" aria-labelledby="decision-brief-title">
      <div className="cg-shell cg-brief-layout">
        <div className="cg-brief-copy">
          <span className="cg-eyebrow"><Mail size={15} /> Decision brief</span>
          <h2 id="decision-brief-title">Bring the next capital decision, not a requirements list.</h2>
          <p>Frame one approaching action. AX1 can then examine the decision basis, evidence boundary and controlled first scope without asking you to disclose protected programme data on this page.</p>
          <div className="cg-brief-principle"><ShieldCheck size={18} /><p><strong>Capital, governed by execution.</strong>Configured rules determine readiness. Authorised people determine action.</p></div>
          <div className="cg-brief-contact"><span>Direct recipient</span><a href="mailto:info@ax1.capital">info@ax1.capital</a></div>
        </div>

        <form className="cg-brief-form" onSubmit={prepareBrief} noValidate>
          <div className="cg-form-progress" aria-hidden="true"><span className="is-active" /><span /><span /></div>
          <label className={errors.decision ? 'is-invalid' : ''} htmlFor={decisionId}>
            <span>What capital decision is approaching?</span>
            <textarea id={decisionId} rows={3} value={values.decision} onChange={(event) => update('decision', event.target.value)} placeholder="For example: authorise the next infrastructure release" />
            {errors.decision && <small>{errors.decision}</small>}
          </label>
          <label className={errors.conditions ? 'is-invalid' : ''} htmlFor={conditionsId}>
            <span>What must be true before it moves?</span>
            <textarea id={conditionsId} rows={3} value={values.conditions} onChange={(event) => update('conditions', event.target.value)} placeholder="The outcome, evidence and authority conditions that must be satisfied" />
            {errors.conditions && <small>{errors.conditions}</small>}
          </label>
          <div className="cg-brief-form-row">
            <label className={errors.evidenceLocation ? 'is-invalid' : ''} htmlFor={evidenceId}>
              <span>Where is the proof today?</span>
              <select id={evidenceId} value={values.evidenceLocation} onChange={(event) => update('evidenceLocation', event.target.value)}>
                <option value="">Select current position</option>
                <option>Open in one current system</option>
                <option>Split across tools and stakeholders</option>
                <option>Rebuilt for each decision meeting</option>
                <option>Not consistently available</option>
              </select>
              {errors.evidenceLocation && <small>{errors.evidenceLocation}</small>}
            </label>
            <label className={errors.workEmail ? 'is-invalid' : ''} htmlFor={emailId}>
              <span>Work email</span>
              <input id={emailId} type="email" autoComplete="email" value={values.workEmail} onChange={(event) => update('workEmail', event.target.value)} placeholder="you@organisation.com" />
              {errors.workEmail && <small>{errors.workEmail}</small>}
            </label>
          </div>
          <label htmlFor={contextId}>
            <span>Optional context</span>
            <textarea id={contextId} rows={scenario ? 9 : 4} value={values.context} onChange={(event) => update('context', event.target.value)} placeholder="Programme, timing or stakeholder context. Do not include confidential information." />
          </label>
          <button className="cg-button cg-button-primary cg-brief-submit" type="submit">Prepare the decision brief <ArrowRight size={16} /></button>
          <div className="cg-form-boundary"><Copy size={14} /><span>The brief is copied and opened in your email client. Nothing is silently submitted from this website.</span></div>
          {status && <p className="cg-form-status" role="status"><CheckCircle2 size={15} />{status}</p>}
        </form>
      </div>
    </section>
  );
}
