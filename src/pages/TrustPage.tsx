import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Database, Fingerprint, Gavel, LockKeyhole, ShieldCheck, Users } from 'lucide-react';
import { AX1MilestoneTrace } from '../components/AX1MilestoneTrace';
import type { PageProps} from '../components';
import { Footer, fade } from '../components';
import { trackAX1Event } from '../utils/analytics';

const trustTrace = [
  { number: '01', label: 'Scoped access' },
  { number: '02', label: 'Attributable evidence' },
  { number: '03', label: 'Explicit authority' },
  { number: '04', label: 'Reviewable record' },
];

const boundaries = [
  { icon: Gavel, label: 'Authority', claim: 'Material decisions remain with authorised stakeholders.', boundary: 'Axis One supports the decision basis; it does not replace investment, release or programme judgement.' },
  { icon: Users, label: 'Roles', claim: 'Visibility and actions follow defined responsibility.', boundary: 'Shared context does not confer the same authority on every participant.' },
  { icon: Database, label: 'Evidence', claim: 'Material evidence remains attributable and reviewable.', boundary: 'Axis One connects evidence to assigned review responsibilities; it does not independently certify it.' },
  { icon: Fingerprint, label: 'Decision record', claim: 'Material context and authorised outcomes remain connected.', boundary: 'The Axis One record complements rather than replaces underlying source systems and legal records.' },
  { icon: LockKeyhole, label: 'Capital boundary', claim: 'Capital execution remains outside the platform.', boundary: 'Axis One does not hold, transfer or manage client funds.' },
  { icon: ShieldCheck, label: 'Assurance position', claim: 'Security and assurance statements remain evidence-based.', boundary: 'Certifications are communicated only after independent assessment and formal confirmation.' },
];

export default function TrustPage({ onOpenContact }: PageProps) {
  return (
    <main className="cg-public-page cg-trust-page">
      <section className="cg-public-hero" aria-labelledby="trust-title">
        <div className="cg-shell cg-public-hero-grid">
          <motion.div {...fade}>
            <span className="cg-eyebrow">Defined responsibility</span>
            <h1 id="trust-title" className="cg-structured-headline" aria-label="What Axis One governs and what remains human."><span>What Axis One governs</span><span>and what remains human.</span></h1>
            <p>Institutional trust requires explicit authority, attributable evidence, scoped access and explicit product boundaries. Axis One makes each responsibility visible.</p>
            <div className="cg-actions"><a className="cg-button cg-button-primary" href="#trust-boundaries">Review responsibilities<ArrowRight size={16} /></a><a className="cg-button cg-button-secondary" href="/#decision-brief">Frame a decision</a></div>
          </motion.div>
          <motion.div className="cg-public-trace-card" {...fade}>
            <div><span>Trust architecture</span><strong>Responsibility and authority remain explicit</strong></div>
            <AX1MilestoneTrace items={trustTrace} activeIndex={3} ariaLabel="Axis One trust and governance progression" theme="dark" />
            <p><ShieldCheck size={14} />Illustrative trust model. Client environments, permissions and controls are separately configured.</p>
          </motion.div>
        </div>
      </section>

      <section className="cg-public-section is-light" id="trust-boundaries" aria-labelledby="trust-boundaries-title"><div className="cg-shell">
        <motion.header className="cg-section-heading" {...fade}><span className="cg-eyebrow">Responsibility and control</span><h2 id="trust-boundaries-title">Authority remains explicit at every decision state.</h2><p>Axis One makes each operating boundary visible: what the platform governs, what authorised people decide and what remains with client organisations and external providers.</p></motion.header>
        <div className="cg-trust-matrix">{boundaries.map(({ icon: Icon, label, claim, boundary }) => <motion.article key={label} {...fade}><div><Icon size={19} /><span>{label}</span></div><strong>{claim}</strong><p>{boundary}</p></motion.article>)}</div>
      </div></section>

      <section className="cg-public-section is-dark" aria-labelledby="not-ax1-title"><div className="cg-shell cg-public-split">
        <motion.div {...fade}><span className="cg-eyebrow">Operating responsibilities</span><h2 id="not-ax1-title">Material decisions remain with authorised people.</h2><p>Axis One provides governed context and progression. Authorised organisations and individuals retain responsibility for the decision.</p></motion.div>
        <motion.ul className="cg-not-list" {...fade}>
          <li><Check size={16} />Not a bank, payment provider or custodian</li>
          <li><Check size={16} />Not an autonomous capital allocator</li>
          <li><Check size={16} />Not a substitute for investor or programme judgement</li>
          <li><Check size={16} />Not a guarantee of savings, delivery or financial performance</li>
          <li><Check size={16} />Not a public disclosure of configured operating mechanics</li>
        </motion.ul>
      </div></section>

      <section className="cg-public-section is-light" aria-labelledby="assurance-title"><div className="cg-shell cg-public-editorial-split">
        <motion.div {...fade}><span className="cg-eyebrow">Assurance and access</span><h2 id="assurance-title">Assurance statements remain evidence-based.</h2></motion.div>
        <motion.div className="cg-public-editorial-copy" {...fade}><p>Axis One is designed around permissioned access, scoped roles, attributable programme records and non-custodial capital boundaries. Certifications are communicated only after independent assessment and formal confirmation.</p><div className="cg-trust-contact"><span>Trust and governance enquiries</span><button type="button" onClick={() => onOpenContact({ source: 'trust_governance_enquiry' })}>Contact Axis One</button></div></motion.div>
      </div></section>

      <section className="cg-public-cta cg-trust-cta"><div className="cg-shell"><div className="cg-trust-cta-copy"><span>Apply these responsibilities to an approaching decision</span><h2>Frame the action, evidence position and decision authority.</h2></div><a className="cg-button cg-button-primary cg-trust-cta-action" href="/#decision-brief" onClick={() => trackAX1Event('primary_cta_selected', { location: 'trust_footer', action: 'decision_brief' })}>Prepare a Decision Brief<ArrowRight size={16} /></a></div></section>
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
