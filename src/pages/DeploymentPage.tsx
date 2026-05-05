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
    'Axis One preserves the execution record.',
  ];

  return (
    <section className="section dep-ownership-section">
      <motion.div className="dep-ownership-panel" {...fade}>
        <Badge>Coordination Context</Badge>
        <h2>Complex delivery needs shared ownership.</h2>
        <p>In multi-party deployments, execution risk often comes from unclear ownership, scattered communication, and delayed decisions. Axis One connects stakeholders around milestones, evidence, validators, and release readiness so delivery teams and partners can operate from the same record.</p>
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
      copy: 'Capital programs structured around sequential or parallel milestones. Each milestone carries its own gate, evidence requirements, validator policy, and release formula. Execution moves forward only when conditions are satisfied.',
      steps: ['Define milestone gates', 'Attach evidence requirements', 'Set validator quorum', 'Gate evaluation determines release readiness'],
    },
    {
      icon: Network,
      label: 'Multi-Party Execution',
      copy: 'Programs involving investors, operators, validators, partners, and project teams. Each participant has a defined role and scoped visibility. Release decisions are not owned by any single party — they follow the policy.',
      steps: ['Assign participant roles', 'Scope visibility and actions', 'Validate across parties', 'Policy governs release'],
    },
    {
      icon: Layers3,
      label: 'Phased Capital Deployment',
      copy: 'Capital structured in tranches across phases, with holdback rules, conditional release thresholds, and downstream gate dependencies. Each phase builds on the verified state of the previous one.',
      steps: ['Structure tranches and holdbacks', 'Set phase dependencies', 'Define readiness thresholds', 'Sequential gate clearance'],
    },
  ];
  return (
    <section className="section dep-workflow-section">
      <motion.div className="dep-workflow-head" {...fade}>
        <Badge>Execution Patterns</Badge>
        <h2>One system. Different execution patterns.</h2>
        <p>Axis One adapts to the shape of each capital program. Whether the structure is sequential, multi-party, or phased, the governance model remains consistent — gates, evidence, validation, and release logic all follow the same underlying policy framework.</p>
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
          <Button onClick={onOpenAccess}>Request Demo Access</Button>
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
          <Badge>Deployment</Badge>
          <h1>Built for complex execution.</h1>
          <p>Axis One is designed for capital programs where milestones, stakeholders, dependencies, evidence and release decisions must remain coordinated across time.</p>
          <div className="actions center-actions"><Button onClick={onOpenAccess}>Request Access</Button><Button variant="ghost" to="/capital">View Capital Logic</Button></div>
        </motion.div>
      </section>
      <section className="section"><DeploymentGrid /></section>
      <DeploymentWorkflowSection onOpenAccess={onOpenAccess} />
      <DeploymentOwnershipBlock />
      <FinalCTA
        onOpenAccess={onOpenAccess}
        heading="Evaluate Axis One for complex execution environments."
        subcopy="Designed for multi-party, milestone-gated programs where governance, evidence, and release must remain coordinated."
        showLogo={false}
        secondaryLabel="Review Capital Logic"
        secondaryTo="/capital"
      />
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
