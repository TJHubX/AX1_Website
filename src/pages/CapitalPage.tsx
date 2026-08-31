import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calculator, CircleDollarSign, Gavel, ShieldCheck } from 'lucide-react';
import type { PageProps} from '../components';
import { Footer, fade } from '../components';
import { CapitalValueProtectionCalculator } from '../features/capital-value/CapitalValueProtectionCalculator';
import { trackAX1Event } from '../utils/analytics';

const interpretation = [
  { icon: Calculator, title: 'An exposure estimate', copy: 'The calculator organises the figures you enter. It is not a forecast of Axis One savings or programme performance.' },
  { icon: CircleDollarSign, title: 'A capital exposure discussion', copy: 'The result identifies where capital, delay and execution assumptions require closer governance attention.' },
  { icon: Gavel, title: 'An input to human judgement', copy: 'Axis One can make the basis clearer. It does not approve, transfer or autonomously allocate capital.' },
];

function ExposureModelPreview() {
  return (
    <motion.div className="cg-exposure-preview" {...fade} aria-label="Illustrative capital exposure decomposition">
      <div className="cg-exposure-preview-head"><div><span>Illustrative exposure model</span><strong>See the parts before the total</strong></div><ShieldCheck size={18} /></div>
      <div className="cg-exposure-preview-ledger"><div><span>Known overrun exposure</span><strong>£7.50M</strong></div><i>+</i><div><span>Delay carrying cost</span><strong>£1.00M</strong></div></div>
      <div className="cg-exposure-preview-total"><span>Identified execution exposure</span><strong>£8.50M</strong><small>Based only on the assumptions entered</small></div>
      <div className="cg-exposure-preview-scenario"><span>Each 1% of identified exposure</span><strong>£85,000</strong><i><b style={{ width: '40%' }} /></i></div>
      <p>Inputs calculate in your browser and are not submitted or stored.</p>
    </motion.div>
  );
}

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
            <h1 id="capital-title">Make the exposure visible while authority remains human.</h1>
            <p>Model the financial burden around overrun and delay using your own assumptions. Axis One does not convert the result into a promised saving or automatic capital action.</p>
            <div className="cg-actions"><a className="cg-button cg-button-primary" href="#decision-cost">Open the full exposure model<ArrowRight size={16} /></a><a className="cg-button cg-button-secondary" href="/#decision-brief">Frame the decision</a></div>
          </motion.div>
          <ExposureModelPreview />
        </div>
      </section>

      <CapitalValueProtectionCalculator onOpenAccess={openDecisionBrief} />

      <section className="cg-public-section is-light" aria-labelledby="capital-meaning-title"><div className="cg-shell">
        <motion.header className="cg-section-heading" {...fade}><span className="cg-eyebrow">Interpreting the exposure</span><h2 id="capital-meaning-title">The estimate informs judgement; it does not predict an outcome.</h2><p>Use the model to identify assumptions that require investigation without implying a predetermined result.</p></motion.header>
        <div className="cg-public-card-grid is-three">{interpretation.map(({ icon: Icon, title, copy }, index) => <motion.article key={title} {...fade}><span>0{index + 1}</span><Icon size={21} /><h3>{title}</h3><p>{copy}</p></motion.article>)}</div>
      </div></section>

      <section className="cg-public-cta"><div className="cg-shell"><div><span>Move from scenario to decision context</span><h2>Use the figures to frame one approaching capital decision.</h2></div><a className="cg-button cg-button-primary" href="/#decision-brief" onClick={() => trackAX1Event('primary_cta_selected', { location: 'capital_footer', action: 'decision_brief' })}>Prepare a Decision Brief<ArrowRight size={16} /></a></div></section>
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
