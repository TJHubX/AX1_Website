import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Layers3, Network, Rocket, Users } from 'lucide-react';
import { AX1MilestoneTrace } from '../components/AX1MilestoneTrace';
import { Footer, PageProps, fade } from '../components';
import { trackAX1Event } from '../utils/analytics';

const deploymentTrace = [
  { number: '01', label: 'Frame one decision' },
  { number: '02', label: 'Prove the operating value' },
  { number: '03', label: 'Establish the pattern' },
  { number: '04', label: 'Expand deliberately' },
];

const options = [
  {
    number: '01', icon: Rocket, title: 'AX1.Pilot', note: 'Recommended first step',
    copy: 'Start with one approaching capital decision and a bounded stakeholder group. Establish the baseline, connect the present decision basis and agree how value will be judged.',
    points: ['One decision boundary', 'Defined participants', 'Current-state baseline', 'Measured review point'],
  },
  {
    number: '02', icon: Network, title: 'AX1.Core', note: 'Single programme',
    copy: 'Operate one programme with its milestones, evidence, ownership and capital decision states connected through a permissioned environment.',
    points: ['Programme-wide context', 'Role-scoped collaboration', 'Attributable evidence', 'Reviewable decisions'],
  },
  {
    number: '03', icon: Layers3, title: 'AX1.Enterprise', note: 'Multiple programmes',
    copy: 'Extend a proven governance pattern across multiple programmes, entities or capital decision environments without losing local responsibility.',
    points: ['Multiple programmes', 'Shared governance language', 'Portfolio visibility', 'Controlled expansion'],
  },
];

export default function DeploymentPage({ onOpenContact }: PageProps) {
  return (
    <main className="cg-public-page cg-deployment-page">
      <section className="cg-public-hero" aria-labelledby="deployment-title">
        <div className="cg-shell cg-public-hero-grid">
          <motion.div {...fade}>
            <span className="cg-eyebrow">Deployment</span>
            <h1 id="deployment-title" className="cg-structured-headline" aria-label="Start narrow. Prove value. Expand."><span>Start narrow.</span><span className="cg-headline-accent">Prove value. Expand.</span></h1>
            <p>Begin with the capital decision where fragmented evidence, stakeholder coordination and unclear readiness already create friction. Expansion follows proof, not ambition alone.</p>
            <div className="cg-actions"><a className="cg-button cg-button-primary" href="#deployment-options">Choose the starting scope<ArrowRight size={16} /></a><a className="cg-button cg-button-secondary" href="/#decision-brief">Frame the decision</a></div>
          </motion.div>
          <motion.div className="cg-public-trace-card" {...fade}>
            <div><span>Adoption path</span><strong>A controlled progression from one decision</strong></div>
            <AX1MilestoneTrace items={deploymentTrace} activeIndex={0} ariaLabel="Axis One deployment progression" theme="dark" />
            <p><Users size={14} />Different stakeholders collaborate through one context while responsibility remains distinct.</p>
          </motion.div>
        </div>
      </section>

      <section className="cg-public-section is-light" id="deployment-options" aria-labelledby="deployment-options-title"><div className="cg-shell">
        <motion.header className="cg-section-heading" {...fade}><span className="cg-eyebrow">Choose the operating scope</span><h2 id="deployment-options-title">Use the package that matches the decision maturity.</h2><p>AX1.Pilot is the recommended first step. Broader deployment should be earned through a clear operating result.</p></motion.header>
        <div className="cg-package-grid">{options.map(({ number, icon: Icon, title, note, copy, points }, index) => <motion.article className={index === 0 ? 'is-featured' : ''} key={title} {...fade}>
          <div className="cg-package-head"><span>{number}</span><Icon size={22} /><small>{note}</small></div><h3>{title}</h3><p>{copy}</p><ul>{points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul><a href="/#decision-brief" onClick={() => trackAX1Event('deployment_option_selected', { option: title.toLowerCase().replaceAll('.', '_') })}>Frame {title}<ArrowRight size={16} /></a>
        </motion.article>)}</div>
      </div></section>

      <section className="cg-public-section is-dark" aria-labelledby="deployment-value-title"><div className="cg-shell cg-public-split">
        <motion.div {...fade}><span className="cg-eyebrow">What the first scope must prove</span><h2 id="deployment-value-title">A credible operating result, not a generic pilot.</h2><p>The first engagement should test whether the decision basis becomes more current, attributable and defensible for the people responsible.</p></motion.div>
        <motion.div className="cg-deployment-proof" {...fade}>
          <div><span>01</span><strong>Can the decision basis be opened without reconstruction?</strong></div>
          <div><span>02</span><strong>Can evidence, ownership and authority be understood together?</strong></div>
          <div><span>03</span><strong>Can the authorised outcome remain connected to the operating record?</strong></div>
        </motion.div>
      </div></section>

      <section className="cg-public-section is-light" aria-labelledby="deployment-collaboration-title"><div className="cg-shell cg-public-editorial-split">
        <motion.div {...fade}><span className="cg-eyebrow">Collaboration infrastructure</span><h2 id="deployment-collaboration-title">One programme reality. Different responsibilities.</h2></motion.div>
        <motion.div className="cg-public-editorial-copy" {...fade}><p>Capital owners, execution teams, assurance participants, partners and workspace administrators work through permissioned views of the same relevant context. Shared visibility does not collapse authority.</p><a href="/#decision-brief">Bring the stakeholder context<ArrowRight size={15} /></a></motion.div>
      </div></section>

      <section className="cg-public-cta"><div className="cg-shell"><div><span>Recommended first step</span><h2>Frame one live decision for AX1.Pilot.</h2></div><a className="cg-button cg-button-primary" href="/#decision-brief" onClick={() => trackAX1Event('primary_cta_selected', { location: 'deployment_footer', action: 'decision_brief' })}>Prepare a Decision Brief<ArrowRight size={16} /></a></div></section>
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
