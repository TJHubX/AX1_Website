import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calculator, CircleDollarSign, Gavel, ShieldCheck } from 'lucide-react';
import { AX1MilestoneTrace } from '../components/AX1MilestoneTrace';
import { Footer, PageProps, fade } from '../components';
import { CapitalValueProtectionCalculator } from '../features/capital-value/CapitalValueProtectionCalculator';
import { trackAX1Event } from '../utils/analytics';

const capitalTrace = [
  { number: '01', label: 'Exposure framed' },
  { number: '02', label: 'Assumptions visible' },
  { number: '03', label: 'Scenario understood' },
  { number: '04', label: 'Decision remains human' },
];

const interpretation = [
  { icon: Calculator, title: 'An exposure estimate', copy: 'The calculator organises the figures you enter. It is not a forecast of Axis One savings or programme performance.' },
  { icon: CircleDollarSign, title: 'A value-at-risk conversation', copy: 'The result helps expose where capital, delay and execution assumptions deserve closer governance attention.' },
  { icon: Gavel, title: 'A human decision input', copy: 'Axis One can make the basis clearer. It does not approve, transfer or autonomously allocate capital.' },
];

export default function CapitalPage({ onOpenContact }: PageProps) {
  const openDecisionBrief = () => {
    trackAX1Event('primary_cta_selected', { location: 'capital_calculator', action: 'decision_brief' });
    window.location.href = '/#decision-brief';
  };

  return (
    <main className="cg-public-page cg-capital-page">
      <section className="cg-public-hero" aria-labelledby="capital-title">
        <div className="cg-shell cg-public-hero-grid">
          <motion.div {...fade}>
            <span className="cg-eyebrow">Capital decision exposure</span>
            <h1 id="capital-title">See the exposure. Keep the decision human.</h1>
            <p>Model the financial burden around overrun and delay using your own assumptions. Axis One does not convert the result into a promised saving or automatic capital action.</p>
            <div className="cg-actions"><a className="cg-button cg-button-primary" href="#decision-cost">Open the full exposure model<ArrowRight size={16} /></a><a className="cg-button cg-button-secondary" href="/#decision-brief">Frame the decision</a></div>
          </motion.div>
          <motion.div className="cg-public-trace-card" {...fade}>
            <div><span>Transparent modelling</span><strong>See the parts before the total</strong></div>
            <AX1MilestoneTrace items={capitalTrace} activeIndex={1} ariaLabel="Capital exposure modelling progression" theme="dark" />
            <p><ShieldCheck size={14} />Inputs calculate in your browser and are not submitted or stored.</p>
          </motion.div>
        </div>
      </section>

      <CapitalValueProtectionCalculator onOpenAccess={openDecisionBrief} />

      <section className="cg-public-section is-light" aria-labelledby="capital-meaning-title"><div className="cg-shell">
        <motion.header className="cg-section-heading" {...fade}><span className="cg-eyebrow">Interpret the number correctly</span><h2 id="capital-meaning-title">Exposure is not the same as guaranteed value.</h2><p>Use the model to frame questions and assumptions that deserve investigation, not to claim a predetermined Axis One result.</p></motion.header>
        <div className="cg-public-card-grid is-three">{interpretation.map(({ icon: Icon, title, copy }, index) => <motion.article key={title} {...fade}><span>0{index + 1}</span><Icon size={21} /><h3>{title}</h3><p>{copy}</p></motion.article>)}</div>
      </div></section>

      <section className="cg-public-cta"><div className="cg-shell"><div><span>Move from scenario to decision context</span><h2>Use the figures to frame one real capital decision.</h2></div><a className="cg-button cg-button-primary" href="/#decision-brief" onClick={() => trackAX1Event('primary_cta_selected', { location: 'capital_footer', action: 'decision_brief' })}>Prepare a Decision Brief<ArrowRight size={16} /></a></div></section>
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
