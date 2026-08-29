import React from 'react';
import { motion } from 'motion/react';
import { Layers3, Network, Workflow } from 'lucide-react';
import {
  Badge, Button, DeploymentGrid, FinalCTA, Footer,
  fade, PageProps,
} from '../components';

// ─── Sections ─────────────────────────────────────────────────────────────────

function DeploymentOwnershipBlock() {
  const signals = [
    'Operators execute.',
    'Partners coordinate.',
    'Validators confirm.',
    'Capital providers decide.',
    'External providers execute.',
    'AX1 preserves the governed record.',
  ];

  return (
    <section className="section dep-ownership-section">
      <motion.div className="dep-ownership-panel" {...fade}>
        <Badge>Coordination Context</Badge>
        <h2>Complex delivery needs shared ownership.</h2>
        <p>In multi-party programs, execution risk often comes from unclear ownership, scattered evidence and delayed decisions. AX1 gives each stakeholder a permissioned place to act while keeping the complete decision context in one governed record.</p>
        <div className="dep-ownership-signals">
          {signals.map((item) => <span key={item}>{item}</span>)}
        </div>
      </motion.div>
    </section>
  );
}

function DeploymentWorkflowSection({ onOpenAccess }: { onOpenAccess: () => void }) {
  const workflows = [
    {
      icon: Workflow,
      label: 'Milestone-Gated Programs',
      copy: 'Capital programs structured around sequential or parallel outcomes. Each governed checkpoint connects required evidence, assigned validation and decision authority.',
      steps: ['Define the outcome', 'Attach evidence requirements', 'Assign validation and authority', 'Route the authorised decision'],
    },
    {
      icon: Network,
      label: 'Multi-Party Execution',
      copy: 'Programs involving investors, operators, validators, partners and project teams. Each participant has a defined role and scoped visibility. Eligibility follows the agreed process; authorised people make the decision.',
      steps: ['Assign participant roles', 'Scope visibility and actions', 'Validate across parties', 'Authorised stakeholder decides'],
    },
    {
      icon: Layers3,
      label: 'Phased Capital Deployment',
      copy: 'Capital structured in tranches across phases, with mandatory evidence, dependencies and defined decision points. Each phase builds on the governed record of the previous one.',
      steps: ['Structure the phases', 'Set required dependencies', 'Define readiness conditions', 'Record each capital decision'],
    },
  ];
  return (
    <section className="section dep-workflow-section">
      <motion.div className="dep-workflow-head" {...fade}>
        <Badge>Execution Patterns</Badge>
        <h2>One system. Different execution patterns.</h2>
        <p>AX1 adapts to the shape of each capital program. Whether the structure is sequential, multi-party or phased, evidence, validation, authority and decisions remain connected in the same governance framework.</p>
      </motion.div>
      <div className="dep-workflow-grid">
        {workflows.map(({ icon: Icon, label, copy, steps }) => (
          <motion.div className="dep-workflow-card" key={label} {...fade}>
            <div className="dep-workflow-card-head">
              <div className="layer-icon"><Icon size={18} /></div>
              <strong>{label}</strong>
            </div>
            <p>{copy}</p>
            <ol className="dep-workflow-steps">
              {steps.map((step, i) => (
                <li key={step}><span className="dep-step-num">{String(i + 1).padStart(2, '0')}</span><span>{step}</span></li>
              ))}
            </ol>
          </motion.div>
        ))}
        <motion.div className="dep-workflow-cta-cell" {...fade}>
          <p>One governance framework. Any execution structure.</p>
          <Button onClick={onOpenAccess}>Frame a Capital Decision</Button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DeploymentPage({ onOpenAccess, onOpenContact }: PageProps) {
  return (
    <main>
      <section className="section page-hero">
        <motion.div className="narrow" {...fade}>
          <Badge>Pilot &amp; Programs</Badge>
          <h1>Start with one workflow. Scale with evidence.</h1>
          <p>Begin with the capital decision where fragmented evidence, stakeholder coordination and unclear readiness already create delay or risk.</p>
          <div className="actions center-actions"><Button onClick={onOpenAccess}>Frame a Capital Decision</Button><Button variant="ghost" to="/capital">View Decision Exposure</Button></div>
        </motion.div>
      </section>
      <section className="section"><DeploymentGrid /></section>
      <DeploymentWorkflowSection onOpenAccess={onOpenAccess} />
      <DeploymentOwnershipBlock />
      <FinalCTA
        onOpenAccess={onOpenAccess}
        heading="Prove one governed workflow before expanding."
        subcopy="A controlled Launch Programme establishes the baseline, measures the result and defines the next rollout decision."
        primaryLabel="Frame a Capital Decision"
        showLogo={false}
        secondaryLabel="Review Capital Governance"
        secondaryTo="/capital"
      />
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
