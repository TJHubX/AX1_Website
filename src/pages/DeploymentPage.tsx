import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Check, Layers3, Network, Rocket, Users } from 'lucide-react';
import type { PageProps} from '../components';
import { Footer, fade } from '../components';
import type { PackageName } from '../features/package-inquiry/packageInquiry';
import { trackAX1Event } from '../utils/analytics';

const options = [
  {
    number: '01', icon: Rocket, title: 'AX1.Pilot', note: 'Initial governed scope',
    copy: 'Establish one governed decision model around an approaching capital action and a defined stakeholder group. Connect the current decision basis, responsibilities and review point.',
    points: ['One decision boundary', 'Defined participants', 'Current-state baseline', 'Measured review point'],
  },
  {
    number: '02', icon: Network, title: 'AX1.Core', note: 'Single programme',
    copy: 'Operate one programme with its milestones, evidence, ownership and capital decision states connected through a permissioned environment.',
    points: ['Programme-wide context', 'Role-scoped collaboration', 'Attributable evidence', 'Reviewable decisions'],
  },
  {
    number: '03', icon: Layers3, title: 'AX1.Enterprise', note: 'Multiple programmes',
    copy: 'Extend an established governance model across multiple programmes, entities or capital decision environments without losing local responsibility.',
    points: ['Multiple programmes', 'Shared governance language', 'Portfolio visibility', 'Controlled expansion'],
  },
];

function DeploymentPathObject() {
  const path = [
    { number: '01', name: 'AX1.Pilot', scope: 'One approaching decision', note: 'Initial governed scope', Icon: Rocket },
    { number: '02', name: 'AX1.Core', scope: 'One programme', note: 'Established programme model', Icon: Network },
    { number: '03', name: 'AX1.Enterprise', scope: 'Multiple programmes', note: 'Controlled extension', Icon: Layers3 },
  ];

  return (
    <motion.div className="cg-deployment-path" {...fade} aria-label="Axis One deployment path">
      <div className="cg-deployment-path-head"><span>Controlled deployment</span><strong>Scope extends through an established model</strong></div>
      <div className="cg-deployment-path-list">{path.map(({ number, name, scope, note, Icon }, index) => <div className={index === 0 ? 'is-current' : ''} key={name}><span>{number}</span><i><Icon size={17} /></i><div><strong>{name}</strong><small>{scope}</small></div><b>{note}</b></div>)}</div>
      <p><Users size={14} />Begin with one approaching decision and an explicit operating boundary.</p>
    </motion.div>
  );
}

export default function DeploymentPage({ onOpenContact }: PageProps) {
  const openPackageInquiry = (packageName: PackageName) => {
    trackAX1Event('deployment_option_selected', { option: packageName.toLowerCase().replaceAll('.', '_') });
    onOpenContact({ packageName, source: 'deployment_package' });
  };

  return (
    <main className="cg-public-page cg-deployment-page">
      <section className="cg-public-hero" aria-labelledby="deployment-title">
        <div className="cg-shell cg-public-hero-grid">
          <motion.div {...fade}>
            <span className="cg-eyebrow">Deployment</span>
            <h1 id="deployment-title"><span className="cg-deployment-title-line">Start with the decision</span>{' '}<span className="cg-deployment-title-line">that matters most.</span></h1>
            <p>Establish a governed decision model where fragmented evidence, stakeholder coordination and unclear readiness already create friction. Then extend what works across the wider capital process.</p>
            <div className="cg-actions"><a className="cg-button cg-button-primary" href="/#decision-brief" onClick={() => trackAX1Event('primary_cta_selected', { location: 'deployment_hero', action: 'decision_brief' })}>Define the first decision<ArrowRight size={16} /></a><a className="cg-button cg-button-secondary" href="/system">See the decision framework</a></div>
          </motion.div>
          <DeploymentPathObject />
        </div>
      </section>

      <section className="cg-public-section is-light" id="deployment-options" aria-labelledby="deployment-options-title"><div className="cg-shell">
        <motion.header className="cg-section-heading" {...fade}><span className="cg-eyebrow">Deployment scope</span><h2 id="deployment-options-title">Select the operating scope appropriate to the decision.</h2><p>AX1.Pilot establishes the initial governed decision model. AX1.Core and AX1.Enterprise extend that model across broader programme environments.</p></motion.header>
        <div className="cg-package-grid">{options.map(({ number, icon: Icon, title, note, copy, points }, index) => <motion.article id={title.toLowerCase().replace('.', '-')} className={index === 0 ? 'is-featured' : ''} key={title} {...fade}>
          <div className="cg-package-head"><span>{number}</span><Icon size={22} /><small>{note}</small></div><h3>{title}</h3><p>{copy}</p><ul>{points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul><button type="button" className="cg-package-inquiry-trigger" onClick={() => openPackageInquiry(title as PackageName)}>Discuss {title}<ArrowRight size={16} /></button>
        </motion.article>)}</div>
      </div></section>

      <section className="cg-public-section is-dark" aria-labelledby="deployment-value-title"><div className="cg-shell cg-public-split">
        <motion.div {...fade}><span className="cg-eyebrow">Initial operating standard</span><h2 id="deployment-value-title">A governed decision basis that remains current under execution.</h2><p>The first engagement establishes whether the decision basis remains current, attributable and accessible to the people responsible.</p></motion.div>
        <motion.div className="cg-deployment-proof" {...fade}>
          <div><span>01</span><strong>Can the decision basis be opened without reconstruction?</strong></div>
          <div><span>02</span><strong>Can evidence, ownership and authority be understood together?</strong></div>
          <div><span>03</span><strong>Can the authorised outcome remain connected to the operating record?</strong></div>
        </motion.div>
      </div></section>

      <section className="cg-public-section is-light" aria-labelledby="deployment-collaboration-title"><div className="cg-shell cg-public-editorial-split">
        <motion.div {...fade}><span className="cg-eyebrow">Collaboration infrastructure</span><h2 id="deployment-collaboration-title">One programme reality. Different responsibilities.</h2></motion.div>
        <motion.div className="cg-public-editorial-copy" {...fade}><p>Capital owners, execution teams, assurance participants, partners and workspace administrators work through permissioned views of the same relevant context. Shared visibility does not collapse authority.</p><Link to="/trust#trust-boundaries">Review roles and responsibilities<ArrowRight size={15} /></Link></motion.div>
      </div></section>

      <section className="cg-public-cta"><div className="cg-shell"><div><span>Initial governed scope</span><h2>Establish the first governed decision with AX1.Pilot.</h2></div><a className="cg-button cg-button-primary" href="/#decision-brief" onClick={() => trackAX1Event('primary_cta_selected', { location: 'deployment_footer', action: 'decision_brief' })}>Prepare a Decision Brief<ArrowRight size={16} /></a></div></section>
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
