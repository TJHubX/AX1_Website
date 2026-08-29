import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight, Check, CheckCircle2, Clock3, FileCheck2, Fingerprint, Gavel,
  Landmark, LockKeyhole, ShieldCheck, Users, Workflow,
} from 'lucide-react';
import { Footer, PageProps, fade } from '../components';
import { DecisionExposureSnapshot, type DecisionExposureScenario } from '../features/decision-exposure/DecisionExposureSnapshot';
import { DecisionBriefSection } from '../features/decision-brief/DecisionBriefSection';
import { DecisionDiagnostic } from '../features/diagnostic/DecisionDiagnostic';
import { trackAX1Event } from '../utils/analytics';

const gapSteps = [
  ['01', 'Intent approved', 'Capital and outcomes are agreed.'],
  ['02', 'Execution begins', 'Delivery moves faster than the decision record.'],
  ['03', 'Evidence fragments', 'Proof separates across tools, files and people.'],
  ['04', 'Decision rebuilt', 'The current basis is reconstructed for the meeting.'],
  ['05', 'Capital must move', 'Time pressure competes with governance quality.'],
];

const states = [
  { state: 'VALIDATED', action: 'RELEASE', copy: 'Required proof is current and the authorised release path is available.', tone: 'green' },
  { state: 'PARTIAL', action: 'CONDITIONAL RELEASE', copy: 'A bounded action may proceed subject to visible conditions and authority.', tone: 'amber' },
  { state: 'BLOCKED', action: 'HOLD', copy: 'A mandatory condition is missing, unresolved or outside tolerance.', tone: 'warning' },
  { state: 'FAILED', action: 'STOP / REVIEW', copy: 'A failed condition requires intervention before the programme can proceed.', tone: 'red' },
];

const roleViews = [
  {
    id: 'capital', tab: 'Capital owner', eyebrow: 'Capital decision view',
    headline: 'See what is ready, what is exposed and what action is permitted.',
    copy: 'The capital owner sees the current decision basis without reconstructing delivery detail from multiple reports.',
    metrics: [['Capital in scope', '€12.4M'], ['Current state', 'Validated'], ['Permitted action', 'Release']],
    checks: ['Decision basis recorded', 'Authority confirmed', 'Exceptions visible'], icon: Landmark,
  },
  {
    id: 'execution', tab: 'Execution owner', eyebrow: 'Delivery responsibility view',
    headline: 'Know what must be delivered, evidenced and resolved next.',
    copy: 'The execution owner sees the current milestone, the proof attached to it and any commitment that blocks progression.',
    metrics: [['Current milestone', '03'], ['Execution', '84%'], ['Open actions', '02']],
    checks: ['Ownership attributable', 'Evidence requirements visible', 'Dependencies current'], icon: Workflow,
  },
  {
    id: 'assurance', tab: 'Assurance & audit', eyebrow: 'Independent review view',
    headline: 'Review the evidence trail without rebuilding the decision history.',
    copy: 'Assurance teams can examine attribution, state changes and decision records through a permissioned boundary.',
    metrics: [['Evidence items', '18'], ['Attributable', '100%'], ['Record state', 'Reviewable']],
    checks: ['Source and actor retained', 'State history preserved', 'Authority boundary explicit'], icon: ShieldCheck,
  },
];

function HeroDecisionSurface() {
  return (
    <motion.div className="cg-decision-surface" {...fade} transition={{ duration: 0.7, delay: 0.12 }} aria-label="Illustrative AX1 programme decision state">
      <div className="cg-surface-topline"><div><span>Programme</span><strong>AX-1048</strong></div><div className="cg-live-state"><i /> Current state</div></div>
      <div className="cg-surface-commitment"><span>Capital commitment</span><strong>€12,400,000</strong></div>
      <div className="cg-surface-milestone"><div><span>Gate 03</span><strong>Infrastructure delivery</strong></div><span className="cg-state-badge is-validated"><Check size={13} /> VALIDATED</span></div>
      <div className="cg-surface-progress"><i style={{ width: '84%' }} /><span>84%</span></div>
      <div className="cg-surface-signals">
        <div><span>Evidence</span><strong><CheckCircle2 size={14} /> Current</strong></div>
        <div><span>Dependencies</span><strong><CheckCircle2 size={14} /> Cleared</strong></div>
        <div><span>Authority</span><strong><Users size={14} /> 4 / 4</strong></div>
      </div>
      <div className="cg-surface-action"><div><span>Capital action</span><strong>€1,850,000</strong></div><div><span>Decision position</span><strong>Clear for authorised release</strong></div></div>
      <div className="cg-surface-record"><Fingerprint size={14} /><span>Snapshot AX1-8F29D7</span><strong>Decision basis recorded</strong></div>
      <p>Illustrative programme state, not customer data.</p>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="cg-hero" aria-labelledby="cg-hero-title">
      <div className="cg-shell cg-hero-layout">
        <motion.div className="cg-hero-copy" {...fade}>
          <span className="cg-eyebrow">Capital governance infrastructure</span>
          <h1 id="cg-hero-title"><span className="cg-hero-question">What proves the next capital move?</span>Capital,<br /><span className="cg-hero-keep">governed by</span><br />execution.</h1>
          <p>AX1 connects committed capital to verified milestones, attributable evidence and controlled decision states. Configured rules determine readiness. Authorised people determine action.</p>
          <div className="cg-actions"><a className="cg-button cg-button-primary" href="#decision-brief" onClick={() => trackAX1Event('primary_cta_selected', { location: 'hero', action: 'decision_brief' })}>Frame a capital decision <ArrowRight size={16} /></a><a className="cg-button cg-button-secondary" href="#system">See the system</a><a className="cg-button cg-button-tertiary" href="#diagnostic">Take the 60-second test</a></div>
          <div className="cg-hero-principle"><LockKeyhole size={15} /><span>Money moves only when execution is proven and an authorised stakeholder decides.</span></div>
        </motion.div>
        <HeroDecisionSurface />
      </div>
      <div className="cg-hero-index" aria-hidden="true"><span>COMMITMENT</span><i /><span>EXECUTION</span><i /><span>EVIDENCE</span><i /><span>DECISION</span></div>
    </section>
  );
}

function GovernanceGap() {
  return (
    <section className="cg-gap" id="why-ax1" aria-labelledby="cg-gap-title"><div className="cg-shell">
      <motion.header className="cg-section-heading" {...fade}><span className="cg-eyebrow">The governance gap</span><h2 id="cg-gap-title">The next decision can arrive before its proof is current.</h2><p>Approval, delivery, evidence and capital action often live in separate operating environments. The decision context is then reconstructed at the point of pressure.</p></motion.header>
      <div className="cg-gap-rail">{gapSteps.map(([number, title, copy], index) => <motion.article className={index > 1 ? 'is-fragmented' : ''} key={number} {...fade}><div className="cg-gap-marker"><span>{number}</span><i /></div><h3>{title}</h3><p>{copy}</p></motion.article>)}</div>
      <motion.blockquote {...fade}>If proof is assembled for the meeting, governance is already late.</motion.blockquote>
    </div></section>
  );
}

function GovernedObject() {
  const [step, setStep] = useState(0);
  const stages = [
    { state: 'CHANGE VISIBLE', evidence: 'Execution update received', review: 'Evidence review required', consequence: 'Hold current position', button: 'Connect current evidence' },
    { state: 'PARTIAL', evidence: 'Current evidence connected', review: 'Assigned review in progress', consequence: 'Conditional or hold', button: 'Complete assigned review' },
    { state: 'VALIDATED', evidence: 'Decision basis is current', review: 'Review position recorded', consequence: 'Authorised action available', button: 'Record authorised action' },
    { state: 'RECORDED', evidence: 'Current basis retained', review: 'Authorised action attributable', consequence: 'Decision record complete', button: 'Reset illustration' },
  ];
  const current = stages[step];
  const milestoneLabels = ['Execution changed', 'Evidence current', 'Readiness visible', 'Action recorded'];
  const advance = () => {
    const nextStep = step === stages.length - 1 ? 0 : step + 1;
    setStep(nextStep);
    trackAX1Event('decision_room_advanced', { from_step: step + 1, to_step: nextStep + 1 });
  };
  return (
    <motion.div className={`cg-governed-object is-step-${step}`} {...fade}>
      <div className="cg-object-header"><div><span>Illustrative Decision Room</span><strong>Infrastructure delivery / Decision 03</strong></div><span className={`cg-state-badge ${step >= 2 ? 'is-validated' : 'is-partial'}`}>{current.state}</span></div>
      <div className="cg-object-body">
        <div className="cg-object-milestones">{milestoneLabels.map((label, index) => <div className={index < step ? 'is-complete' : index === step ? 'is-current' : 'is-future'} key={label}><span>M0{index + 1}</span><i /><strong>{label}</strong></div>)}</div>
        <div className="cg-object-detail"><span>Current evidence position</span><strong>{current.evidence}</strong><div><span>Review position</span><b>{current.review}</b></div><div><span>Capital consequence</span><b>{current.consequence}</b></div><button type="button" onClick={advance}>{step === stages.length - 1 ? <Clock3 size={15} /> : <CheckCircle2 size={15} />}{current.button}</button></div>
      </div>
      <p>Public illustration. It shows causality between execution, evidence, readiness and human action without disclosing AX1 rules or configuration.</p>
    </motion.div>
  );
}

function SystemReveal() {
  const rail = ['COMMIT', 'DEFINE GATE', 'EXECUTE', 'VERIFY', 'DECIDE', 'RELEASE'];
  return (
    <section className="cg-system" id="system" aria-labelledby="cg-system-title"><div className="cg-shell">
      <div className="cg-system-layout">
        <motion.div className="cg-system-copy" {...fade}><span className="cg-eyebrow">The AX1 system</span><h2 id="cg-system-title">One governed object from commitment to release.</h2><p>AX1 keeps execution, proof, ownership and authority connected to the capital decision they support. Different stakeholders work through one permissioned context without sharing the same authority.</p><ul><li><FileCheck2 size={17} /><span><strong>Verified milestones</strong>Progress is linked to the proof required for the current decision.</span></li><li><Users size={17} /><span><strong>Attributable evidence</strong>Material inputs retain their source, actor and review position.</span></li><li><Gavel size={17} /><span><strong>Controlled decision states</strong>Readiness and authorised action remain distinct.</span></li></ul></motion.div>
        <GovernedObject />
      </div>
      <div className="cg-operating-rail" aria-label="Public editorial progression, not an internal AX1 workflow">{rail.map((label, index) => <React.Fragment key={label}><div className={label === 'DECIDE' ? 'is-active' : ''}><span>{String(index + 1).padStart(2, '0')}</span><strong>{label}</strong></div>{index < rail.length - 1 && <i />}</React.Fragment>)}</div>
      <p className="cg-public-boundary"><LockKeyhole size={14} />Editorial progression only. It does not disclose AX1 gate policies, thresholds, scoring, automation or decision mechanics.</p>
    </div></section>
  );
}

function DecisionStates() {
  return (
    <section className="cg-states" aria-labelledby="cg-states-title"><div className="cg-shell">
      <motion.header className="cg-section-heading" {...fade}><span className="cg-eyebrow">State has consequence</span><h2 id="cg-states-title">A decision state should change what can happen next.</h2><p>Visible state language helps stakeholders understand whether the permitted direction is release, conditional action, hold or review.</p></motion.header>
      <div className="cg-state-list">{states.map(({ state, action, copy, tone }, index) => <motion.article className={`is-${tone}`} key={state} {...fade}><span className="cg-state-number">0{index + 1}</span><div className="cg-state-name"><i /><strong>{state}</strong></div><ArrowRight size={18} /><h3>{action}</h3><p>{copy}</p></motion.article>)}</div>
    </div></section>
  );
}

function RoleViews() {
  const [activeRole, setActiveRole] = useState(roleViews[0].id);
  const current = roleViews.find((role) => role.id === activeRole) ?? roleViews[0];
  const Icon = current.icon;
  const handleTabKey = (event: React.KeyboardEvent<HTMLButtonElement>, roleIndex: number) => {
    let nextIndex = roleIndex;
    if (event.key === 'ArrowRight') nextIndex = (roleIndex + 1) % roleViews.length;
    else if (event.key === 'ArrowLeft') nextIndex = (roleIndex - 1 + roleViews.length) % roleViews.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = roleViews.length - 1;
    else return;
    event.preventDefault();
    const nextRole = roleViews[nextIndex];
    setActiveRole(nextRole.id);
    window.requestAnimationFrame(() => document.getElementById(`role-tab-${nextRole.id}`)?.focus());
  };
  return (
    <section className="cg-roles" aria-labelledby="cg-roles-title"><div className="cg-shell">
      <motion.header className="cg-section-heading cg-section-heading-dark" {...fade}><span className="cg-eyebrow">Permissioned collaboration</span><h2 id="cg-roles-title">One programme reality. Different responsibilities.</h2><p>Shared context does not mean shared authority. Each participant sees the decision through the responsibility they hold.</p></motion.header>
      <div className="cg-role-tabs" role="tablist" aria-label="AX1 stakeholder views">{roleViews.map((role, roleIndex) => <button id={`role-tab-${role.id}`} key={role.id} type="button" role="tab" aria-selected={activeRole === role.id} aria-controls="role-panel" tabIndex={activeRole === role.id ? 0 : -1} className={activeRole === role.id ? 'is-active' : ''} onClick={() => setActiveRole(role.id)} onKeyDown={(event) => handleTabKey(event, roleIndex)}>{role.tab}</button>)}</div>
      <motion.div className="cg-role-panel" id="role-panel" role="tabpanel" aria-labelledby={`role-tab-${current.id}`} key={current.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="cg-role-copy"><Icon size={24} /><span>{current.eyebrow}</span><h3>{current.headline}</h3><p>{current.copy}</p></div>
        <div className="cg-role-surface"><div className="cg-role-metrics">{current.metrics.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="cg-role-checks">{current.checks.map((check) => <div key={check}><Check size={14} />{check}</div>)}</div><small>Illustrative role-scoped view</small></div>
      </motion.div>
    </div></section>
  );
}

function TrustBoundaries() {
  const claims = [
    ['Authority', 'Human authority remains explicit.', 'AX1 does not make investment or release decisions.'],
    ['Evidence', 'Material proof remains attributable and reviewable.', 'AX1 does not certify evidence outside configured review responsibilities.'],
    ['Decision trace', 'Material changes and decisions remain connected.', 'AX1 does not replace the underlying source records or responsible parties.'],
    ['State', 'Current readiness and consequence are visible.', 'AX1 does not guarantee programme performance or savings.'],
    ['Security', 'Visibility follows a permissioned operating boundary.', 'Public illustrations do not represent a live client environment or security certification.'],
    ['Boundaries', 'Capital execution remains non-custodial.', 'AX1 does not hold, transfer or manage client funds.'],
  ];
  return (
    <section className="cg-trust" id="trust" aria-labelledby="cg-trust-title"><div className="cg-shell cg-trust-layout">
      <motion.header className="cg-section-heading" {...fade}><span className="cg-eyebrow">Trust through boundaries</span><h2 id="cg-trust-title">Institutional claims should come with visible boundaries.</h2><p>AX1 is designed to make responsibility, evidence and decision state clearer without obscuring where the platform stops.</p><a className="cg-text-link" href="/trust">Review trust and governance <ArrowRight size={15} /></a></motion.header>
      <div><div className="cg-claim-list">{claims.map(([title, claim, boundary]) => <motion.article key={title} {...fade}><span>{title}</span><div><strong>{claim}</strong><p>{boundary}</p></div><ShieldCheck size={17} /></motion.article>)}</div><aside className="cg-not-block"><strong>What AX1 is not</strong><p>Not a bank, custodian, autonomous allocator, guarantee of performance or substitute for authorised judgement.</p></aside></div>
    </div></section>
  );
}

function Deployment() {
  const options = [
    ['01', 'Launch programme', 'Frame one approaching capital decision, agree the boundary and measure whether the decision basis becomes more current and defensible.', 'Recommended first step'],
    ['02', 'Single programme', 'Operate one defined programme with its milestones, stakeholders, evidence and capital decision states connected.', 'Focused operating scope'],
    ['03', 'Portfolio expansion', 'Extend a proven governance pattern across multiple programmes, entities or capital decision environments.', 'Scale after proof'],
  ];
  return (
    <section className="cg-deployment" id="deployment" aria-labelledby="cg-deployment-title"><div className="cg-shell">
      <motion.header className="cg-section-heading" {...fade}><span className="cg-eyebrow">Start narrow. Prove value. Expand.</span><h2 id="cg-deployment-title">Begin where capital decision friction matters now.</h2><p>A bounded first scope creates a credible basis for expansion without requiring an enterprise-wide transformation.</p></motion.header>
      <div className="cg-deployment-list">{options.map(([number, title, copy, note], index) => <motion.article className={index === 0 ? 'is-featured' : ''} key={number} {...fade}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><small>{note}</small><a href="#decision-brief" aria-label={`Frame a ${title.toLowerCase()} decision`} onClick={() => trackAX1Event('deployment_option_selected', { option: title.toLowerCase().replaceAll(' ', '_') })}><ArrowRight size={18} /></a></motion.article>)}</div>
    </div></section>
  );
}

export default function HomePage({ onOpenContact }: PageProps) {
  const [scenario, setScenario] = useState<DecisionExposureScenario | null>(null);
  const useScenario = (nextScenario: DecisionExposureScenario) => {
    setScenario(nextScenario);
    window.requestAnimationFrame(() => document.querySelector('#decision-brief')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };
  return <main className="cg-home"><Hero /><GovernanceGap /><DecisionDiagnostic /><SystemReveal /><DecisionExposureSnapshot onUseScenario={useScenario} /><DecisionStates /><RoleViews /><TrustBoundaries /><Deployment /><DecisionBriefSection scenario={scenario} /><Footer onOpenContact={onOpenContact} /></main>;
}
