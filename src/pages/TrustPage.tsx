import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Database, Fingerprint, Gavel, LockKeyhole, ShieldCheck, Users } from 'lucide-react';
import { AX1MilestoneTrace } from '../components/AX1MilestoneTrace';
import { Footer, PageProps, fade } from '../components';
import { trackAX1Event } from '../utils/analytics';

const trustTrace = [
  { number: '01', label: 'Scoped access' },
  { number: '02', label: 'Attributable evidence' },
  { number: '03', label: 'Explicit authority' },
  { number: '04', label: 'Reviewable record' },
];

const boundaries = [
  { icon: Gavel, label: 'Authority', claim: 'Authorised stakeholders make material decisions.', boundary: 'Axis One does not replace investment, release or programme judgement.' },
  { icon: Users, label: 'Roles', claim: 'Visibility and actions follow participant responsibility.', boundary: 'Shared context does not give every participant the same authority.' },
  { icon: Database, label: 'Evidence', claim: 'Material proof can remain connected and attributable.', boundary: 'Axis One does not independently certify evidence outside assigned review responsibilities.' },
  { icon: Fingerprint, label: 'Decision trace', claim: 'Material context and authorised outcomes remain reviewable.', boundary: 'Axis One does not replace underlying source systems or legal records.' },
  { icon: LockKeyhole, label: 'Capital boundary', claim: 'The platform is designed to remain non-custodial.', boundary: 'Axis One does not hold, transfer or manage client funds.' },
  { icon: ShieldCheck, label: 'Public claims', claim: 'Security and assurance claims are stated with boundaries.', boundary: 'Axis One does not claim certifications that have not been independently achieved.' },
];

export default function TrustPage({ onOpenContact }: PageProps) {
  return (
    <main className="cg-public-page cg-trust-page">
      <section className="cg-public-hero" aria-labelledby="trust-title">
        <div className="cg-shell cg-public-hero-grid">
          <motion.div {...fade}>
            <span className="cg-eyebrow">Trust through clarity</span>
            <h1 id="trust-title" className="cg-structured-headline" aria-label="Know what Axis One governs. Know what remains human."><span>Know what Axis One governs.</span><span>Know what remains human.</span></h1>
            <p>Institutional trust requires explicit authority, attributable evidence, scoped access and honest product limits. Axis One makes each responsibility visible.</p>
            <div className="cg-actions"><a className="cg-button cg-button-primary" href="#trust-boundaries">Review responsibilities<ArrowRight size={16} /></a><a className="cg-button cg-button-secondary" href="/#decision-brief">Frame a decision</a></div>
          </motion.div>
          <motion.div className="cg-public-trace-card" {...fade}>
            <div><span>Trust architecture</span><strong>Responsibility remains attributable</strong></div>
            <AX1MilestoneTrace items={trustTrace} activeIndex={3} ariaLabel="Axis One trust and governance progression" theme="dark" />
            <p><ShieldCheck size={14} />Illustrative trust model. Client environments, permissions and controls are separately configured.</p>
          </motion.div>
        </div>
      </section>

      <section className="cg-public-section is-light" id="trust-boundaries" aria-labelledby="trust-boundaries-title"><div className="cg-shell">
        <motion.header className="cg-section-heading" {...fade}><span className="cg-eyebrow">Responsibility and control</span><h2 id="trust-boundaries-title">Trust begins with clear responsibility.</h2><p>See what Axis One makes visible, what authorised people decide, and which responsibilities remain with client organisations and external providers.</p></motion.header>
        <div className="cg-trust-matrix">{boundaries.map(({ icon: Icon, label, claim, boundary }) => <motion.article key={label} {...fade}><div><Icon size={19} /><span>{label}</span></div><strong>{claim}</strong><p>{boundary}</p></motion.article>)}</div>
      </div></section>

      <section className="cg-public-section is-dark" aria-labelledby="not-ax1-title"><div className="cg-shell cg-public-split">
        <motion.div {...fade}><span className="cg-eyebrow">Operating responsibilities</span><h2 id="not-ax1-title">The right decisions stay with the right people.</h2><p>Axis One supports governed context and progression. Responsibility remains with the authorised organisations and people.</p></motion.div>
        <motion.ul className="cg-not-list" {...fade}>
          <li><Check size={16} />Not a bank, payment provider or custodian</li>
          <li><Check size={16} />Not an autonomous capital allocator</li>
          <li><Check size={16} />Not a substitute for investor or programme judgement</li>
          <li><Check size={16} />Not a guarantee of savings, delivery or financial performance</li>
          <li><Check size={16} />Not a public disclosure of configured operating mechanics</li>
        </motion.ul>
      </div></section>

      <section className="cg-public-section is-light" aria-labelledby="assurance-title"><div className="cg-shell cg-public-editorial-split">
        <motion.div {...fade}><span className="cg-eyebrow">Assurance and access</span><h2 id="assurance-title">Security claims should match the current position.</h2></motion.div>
        <motion.div className="cg-public-editorial-copy" {...fade}><p>Axis One is designed around permissioned access, scoped roles, attributable programme records and non-custodial capital boundaries. Any future third-party certification will be stated only after it has been independently achieved.</p><div className="cg-trust-contact"><span>Trust and governance enquiries</span><button type="button" onClick={() => onOpenContact({ source: 'trust_governance_enquiry' })}>Contact Axis One</button></div></motion.div>
      </div></section>

      <section className="cg-public-cta cg-trust-cta"><div className="cg-shell"><div className="cg-trust-cta-copy"><span>Apply the boundary to a real decision</span><h2>Frame the action, evidence position and responsible authority.</h2></div><a className="cg-button cg-button-primary cg-trust-cta-action" href="/#decision-brief" onClick={() => trackAX1Event('primary_cta_selected', { location: 'trust_footer', action: 'decision_brief' })}>Prepare a Decision Brief<ArrowRight size={16} /></a></div></section>
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
