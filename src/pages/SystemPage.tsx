import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Eye, FileCheck2, Fingerprint, LockKeyhole, ShieldCheck, Users } from 'lucide-react';
import { AX1MilestoneTrace } from '../components/AX1MilestoneTrace';
import { Footer, PageProps, fade } from '../components';
import { trackAX1Event } from '../utils/analytics';

const capabilityTrace = [
  { number: '01', label: 'Governed execution' },
  { number: '02', label: 'Evidence position' },
  { number: '03', label: 'Decision readiness' },
  { number: '04', label: 'Human action' },
];

const capabilities = [
  { icon: Eye, title: 'Current execution context', copy: 'See the relevant delivery position without rebuilding it from separate status reports.' },
  { icon: FileCheck2, title: 'Attributable evidence', copy: 'Keep material proof connected to its source, responsible actor and present review position.' },
  { icon: Users, title: 'Permissioned collaboration', copy: 'Give each stakeholder the shared context they need without giving everyone the same authority.' },
  { icon: Fingerprint, title: 'Decision continuity', copy: 'Retain the basis, timing and authorised outcome as part of one reviewable programme record.' },
];

const beforeAfter = [
  ['Execution context', 'Reconstructed from updates', 'Current position remains connected'],
  ['Evidence', 'Scattered across files and people', 'Attributable to the decision it supports'],
  ['Ownership', 'Clarified during escalation', 'Visible beside the required action'],
  ['Authority', 'Inferred from meeting participation', 'Explicit and permissioned'],
  ['Decision record', 'Created after the fact', 'Retained with the operating context'],
];

function DecisionReadinessObject() {
  return (
    <motion.div className="cg-readiness-object" {...fade} aria-label="Illustrative decision-readiness position">
      <div className="cg-readiness-head"><div><span>Current decision basis</span><strong>Infrastructure delivery / Decision 03</strong></div><b><i /> Current</b></div>
      <AX1MilestoneTrace items={capabilityTrace} activeIndex={2} ariaLabel="Public Axis One capability progression" theme="dark" />
      <div className="cg-readiness-summary"><div><span>Execution change</span><strong>Visible</strong></div><div><span>Evidence position</span><strong>Current</strong></div><div className="is-active"><span>Decision readiness</span><strong>Ready for review</strong></div></div>
      <p><LockKeyhole size={14} />Illustrative outcome. Client rules and operating configuration remain protected.</p>
    </motion.div>
  );
}

export default function SystemPage({ onOpenContact }: PageProps) {
  return (
    <main className="cg-public-page cg-system-page">
      <section className="cg-public-hero" aria-labelledby="system-title">
        <div className="cg-shell cg-public-hero-grid">
          <motion.div {...fade}>
            <span className="cg-eyebrow">The Axis One system</span>
            <h1 id="system-title">See what is decision-ready now.</h1>
            <p>Axis One connects execution, attributable evidence, ownership and human authority in one governed programme context. The public website shows the outcome without exposing protected operating mechanics.</p>
            <div className="cg-actions"><a className="cg-button cg-button-primary" href="/#decision-brief" onClick={() => trackAX1Event('primary_cta_selected', { location: 'system_hero', action: 'decision_brief' })}>Frame a capital decision<ArrowRight size={16} /></a><a className="cg-button cg-button-secondary" href="/#system">See the governed workflow</a></div>
          </motion.div>
          <DecisionReadinessObject />
        </div>
      </section>

      <section className="cg-public-section is-light" aria-labelledby="system-context-title"><div className="cg-shell">
        <motion.header className="cg-section-heading" {...fade}><span className="cg-eyebrow">One governed context</span><h2 id="system-context-title">Connect the decision to what is happening now.</h2><p>Axis One is not another reporting layer. It keeps the material basis for the next action visible as execution changes.</p></motion.header>
        <div className="cg-public-card-grid">{capabilities.map(({ icon: Icon, title, copy }, index) => <motion.article key={title} {...fade}><span>0{index + 1}</span><Icon size={21} /><h3>{title}</h3><p>{copy}</p></motion.article>)}</div>
      </div></section>

      <section className="cg-public-section is-dark" aria-labelledby="system-shift-title"><div className="cg-shell">
        <motion.header className="cg-section-heading cg-section-heading-dark" {...fade}><span className="cg-eyebrow">The operating shift</span><h2 id="system-shift-title">From reconstructed decisions to governed progression.</h2><p>The difference is not more information. It is whether current execution, evidence and authority remain connected when action is required.</p></motion.header>
        <div className="cg-public-comparison" role="table" aria-label="Before Axis One and with Axis One comparison">
          <div className="cg-public-comparison-head" role="row"><span role="columnheader">Decision element</span><strong role="columnheader">Before Axis One</strong><strong role="columnheader">With Axis One</strong></div>
          {beforeAfter.map(([label, before, after]) => <div role="row" key={label}><span role="cell">{label}</span><p role="cell">{before}</p><p role="cell"><ShieldCheck size={15} />{after}</p></div>)}
        </div>
      </div></section>

      <section className="cg-public-section is-light" aria-labelledby="system-boundary-title"><div className="cg-shell cg-public-editorial-split">
        <motion.div {...fade}><span className="cg-eyebrow">Protected by design</span><h2 id="system-boundary-title">Decision clarity without exposing the operating model.</h2><p>Clients can see the context needed for action while their configured rules and governance design remain private.</p></motion.div>
        <motion.div className="cg-public-editorial-copy cg-system-boundary-copy" {...fade}><p>Axis One makes the present decision position understandable without turning protected client configuration into public product detail.</p><ul><li><ShieldCheck size={16} />Current execution and evidence position</li><li><ShieldCheck size={16} />Visible ownership and responsible authority</li><li><ShieldCheck size={16} />Clear decision readiness and permitted direction</li><li><ShieldCheck size={16} />Private client rules, thresholds and configuration</li></ul></motion.div>
      </div></section>

      <section className="cg-public-cta"><div className="cg-shell"><div><span>Bring one approaching decision</span><h2>See whether its basis is current, attributable and actionable.</h2></div><a className="cg-button cg-button-primary" href="/#decision-brief" onClick={() => trackAX1Event('primary_cta_selected', { location: 'system_footer', action: 'decision_brief' })}>Prepare a Decision Brief<ArrowRight size={16} /></a></div></section>
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
