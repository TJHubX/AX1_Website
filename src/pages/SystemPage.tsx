import React from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  ClipboardCheck,
  Database,
  FileCheck2,
  Gauge,
  GitBranch,
  Globe,
  Landmark,
  Lock,
  LockKeyhole,
  Mail,
  Rocket,
  Users,
  Workflow,
} from 'lucide-react';
import {
  Badge, Pill, Button, Logo, ModuleMark, FinalCTA, Footer,
  fade, Tone, PageProps,
} from '../components';

// ─── Data ─────────────────────────────────────────────────────────────────────

const releaseSteps = [
  'Capital committed',
  'Execution outcome agreed',
  'Evidence submitted',
  'Assigned validation',
  'Release readiness',
  'Authorised decision',
  'External execution recorded',
];

const systemMetrics = [
  ['Evidence state', 'Complete', FileCheck2],
  ['Validation state', 'Complete', Users],
  ['Dependency state', 'Clear', GitBranch],
  ['Decision authority', 'Confirmed', LockKeyhole],
  ['Decision history', 'Recorded', ClipboardCheck],
  ['Decision status', 'Review required', Activity],
];

const decisionQueue = [
  ['Review milestone evidence', 'Evidence coverage increased to 9/12. Two items remain unresolved.', 'Review'],
  ['Inspect uploaded proof', 'Documents, signatures and validation notes stay attached to the gate.', 'Inspect'],
  ['Confirm validator quorum', 'Two of three validators confirmed. Investor review remains open.', 'Confirm'],
  ['Approve / hold / request evidence', 'Release is eligible only when policy, evidence and dependencies align.', 'Decide'],
];

// ─── Sections ─────────────────────────────────────────────────────────────────

function ReleaseEnginePanel() {
  return (
    <motion.div className="engine-panel" {...fade}>
      <div className="panel-top">
        <div><span>Decision Readiness</span><h3>Governed readiness, not custody.</h3></div>
        <Pill tone="blue">illustrative state</Pill>
      </div>
      <div className="engine-flow">
        {releaseSteps.map((step, index) => (
          <div className="engine-step" key={step}>
            <div className="node">{index + 1}</div>
            <p>{step}</p>
            {index < releaseSteps.length - 1 && <div className="line" />}
          </div>
        ))}
      </div>
      <div className="engine-signals">
        <div className="signal signal-main"><span>Readiness</span><strong>Ready</strong><small>authorised decision required</small></div>
        <div className="signal"><span>Validation</span><strong>Complete</strong><small>assigned reviews recorded</small></div>
        <div className="signal"><span>Conditions</span><strong>Satisfied</strong><small>no unresolved mandatory condition</small></div>
        <div className="signal signal-boundary"><LockKeyhole size={16} /><strong>Non-custodial</strong><small>Funds remain with investors or licensed providers.</small></div>
      </div>
      <div className="boundary-strip"><Landmark size={15} /> AX1 evaluates readiness and records the authorised decision. An external provider executes the transfer.</div>
    </motion.div>
  );
}

function GateEvaluationSection() {
  const rows = [
    ['Required outcome', 'The execution result agreed for this decision'],
    ['Evidence requirement', 'The proof that must be supplied and reviewed'],
    ['Assigned validation', 'The parties responsible for evidence assessment'],
    ['Dependencies', 'The mandatory conditions that cannot be bypassed'],
    ['Decision authority', 'The authorised party responsible for the outcome'],
    ['Decision options', 'Approve, hold, reject, escalate or request evidence'],
    ['Versioned record', 'The applicable process, evidence and outcome remain linked'],
  ];
  return (
    <section className="section sys-feature-section">
      <motion.div className="sys-feature-head" {...fade}>
        <Badge>Gate Evaluation System</Badge>
        <h2>Every capital decision begins with agreed conditions.</h2>
        <p>AX1 structures the outcome, evidence, validation, dependencies and authority that form the basis of a capital decision. It shows why a workflow is ready or blocked while leaving the final decision with the authorised stakeholder.</p>
      </motion.div>
      <motion.div className="sys-panel" {...fade}>
        <div className="sys-panel-label"><span>Gate Policy</span><Pill tone="amber">review required</Pill></div>
        <div className="sys-rows">
          {rows.map(([label, value]) => (
            <div className="sys-row" key={label}>
              <span className="sys-row-label">{label}</span>
              <span className="sys-row-value">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function EvidenceLayerSection() {
  const items = [
    { label: 'Document status', value: 'Uploaded', state: 'green' },
    { label: 'Signature state', value: 'Awaiting 1', state: 'amber' },
    { label: 'Requirement match', value: '9 / 12', state: 'amber' },
    { label: 'Evidence completeness', value: '75%', state: 'amber' },
    { label: 'Source identity', value: 'Confirmed', state: 'green' },
    { label: 'Audit trail', value: 'Active', state: 'green' },
  ];
  return (
    <section className="section sys-feature-section sys-alt">
      <motion.div className="sys-panel" {...fade}>
        <div className="sys-panel-label"><span>Evidence Pack</span><Pill tone="blue">in review</Pill></div>
        <div className="sys-rows">
          {items.map(({ label, value, state }) => (
            <div className="sys-row" key={label}>
              <span className="sys-row-label">{label}</span>
              <span className={`sys-row-value sys-state-${state}`}>{value}</span>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div className="sys-feature-head evidence-feature-head" {...fade}>
        <Badge>Evidence Layer</Badge>
        <h2>Evidence is not storage. It is a release condition.</h2>
        <p>Axis One connects documents, signatures, milestone evidence, due diligence requirements, and validator confirmations directly to release readiness. Evidence is evaluated against defined requirements, not simply uploaded into a data room.</p>
      </motion.div>
    </section>
  );
}

function ValidatorQuorumSection() {
  const validators = [
    { name: 'Validator 1', status: 'confirmed', tone: 'green' as Tone },
    { name: 'Validator 2', status: 'confirmed', tone: 'green' as Tone },
    { name: 'Validator 3', status: 'pending', tone: 'amber' as Tone },
  ];
  return (
    <section className="section sys-feature-section">
      <motion.div className="sys-feature-head" {...fade}>
        <Badge>Validator / Quorum Workflow</Badge>
        <h2>Validation follows policy, not opinion.</h2>
        <p>Axis One can structure validator policies around named reviewers, quorum thresholds, investor visibility, and approval states. Release readiness depends on whether the required validation conditions have been satisfied.</p>
      </motion.div>
      <motion.div className="sys-quorum-strip" {...fade}>
        <div className="sys-quorum-validators">
          {validators.map(({ name, status, tone }) => (
            <div className="sys-validator" key={name}>
              <Pill tone={tone}>{status}</Pill>
              <span>{name}</span>
            </div>
          ))}
        </div>
        <div className="sys-quorum-result">
          <span className="sys-row-label">Quorum</span>
          <span className="sys-quorum-count">2 / 3</span>
          <Pill tone="amber">pending</Pill>
        </div>
      </motion.div>
    </section>
  );
}

function RoleGovernanceSection() {
  const roles = [
    { name: 'Investor',       initials: 'IN', color: '#2B63C5', desc: 'Release approval authority' },
    { name: 'Operator',       initials: 'OP', color: '#37B48B', desc: 'Execution & delivery' },
    { name: 'Validator',      initials: 'VA', color: '#9789D6', desc: 'Evidence confirmation' },
    { name: 'Workspace Admin', initials: 'WA', color: '#D8B25B', desc: 'Workspace configuration & control' },
    { name: 'Partner',        initials: 'PA', color: '#5B9AD8', desc: 'Cross-org coordination' },
    { name: 'Project Team',    initials: 'PT', color: '#6D79B6', desc: 'Task-level delivery' },
    { name: 'Client',         initials: 'CL', color: '#94A3B8', desc: 'Visibility & sign-off' },
    { name: 'Founder',        initials: 'FO', color: '#E06680', desc: 'Strategic oversight' },
  ];
  return (
    <section className="section role-gov-section">
      <motion.div className="role-gov-head" {...fade}>
        <Badge>Role-Based Governance</Badge>
        <h2>Built for multi-stakeholder execution.</h2>
        <p>AX1 supports role-based visibility and decision authority across capital providers, operators, validators, Workspace Admins, partners, and Project Teams. Each participant sees the information and actions relevant to their role.</p>
      </motion.div>
      <motion.div className="role-gov-grid" {...fade}>
        {roles.map((role) => (
          <div className="role-gov-card" key={role.name}>
            <div className="role-gov-avatar" style={{ background: role.color + '1a', borderColor: role.color + '55', color: role.color }}>{role.initials}</div>
            <div className="role-gov-card-body">
              <strong>{role.name}</strong>
              <span>{role.desc}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function ConnectedCoordinationLayerSection() {
  const signalCards = [
    { title: 'ChatHub context', copy: 'Conversations stay attached to execution records.', icon: Mail },
    { title: 'Video review', copy: 'Provider-based video workflows support stakeholder alignment and validator review.', icon: Globe },
    { title: 'Decision continuity', copy: 'Discussions remain connected to the decision they support.', icon: Activity },
    { title: 'Stakeholder alignment', copy: 'Operators, investors, partners, and validators work from one context.', icon: Users },
    { title: 'Reduced coordination drag', copy: 'Less scattered follow-up across tools and email.', icon: Workflow },
  ];

  const reviewRows = [
    ['ChatHub thread', 'Milestone #14 review / 9 linked messages'],
    ['Evidence pack', '12 files / signature packet attached'],
    ['Validator review', '2 of 3 confirmed'],
    ['Meeting link', 'Google / Teams'],
    ['Owner', 'Workspace Admin'],
    ['Blocker', 'Pending signature'],
    ['Release state', 'Hold'],
  ];

  return (
    <section className="section sys-feature-section sys-alt">
      <motion.div className="sys-feature-head" {...fade}>
        <Badge>Coordination Layer</Badge>
        <h2>Connected coordination layer.</h2>
        <p>Communication belongs inside the execution record.</p>
        <p>Axis One includes a coordination layer where ChatHub, stakeholder communication, and provider-based video workflows can stay connected to milestone state, evidence, blockers, validator review, and release decisions.</p>
        <p>This keeps discussions from becoming detached from execution. Teams, Google, and preferred provider workflows can support structured reviews, while the platform keeps ownership, evidence, and decision context visible.</p>
      </motion.div>
      <motion.div className="coord-panel" {...fade}>
        <div className="coord-panel-head">
          <strong>Milestone Review</strong>
          <Pill tone="amber">Release state: Hold</Pill>
        </div>
        <div className="coord-panel-rows">
          {reviewRows.map(([label, value]) => (
            <div className="coord-panel-row" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="coord-signal-grid">
        {signalCards.map(({ title, copy, icon: Icon }) => (
          <motion.article className="coord-signal-card" key={title} {...fade}>
            <div className="layer-icon"><Icon size={17} /></div>
            <strong>{title}</strong>
            <p>{copy}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function AuditReadinessSection() {
  const cards = [
    { icon: Lock, label: 'Role-Based Access', copy: 'Participants access only the information and actions scoped to their role.' },
    { icon: ClipboardCheck, label: 'Audit Trails', copy: 'All gate evaluations, evidence reviews, and release decisions are recorded.' },
    { icon: FileCheck2, label: 'Evidence Traceability', copy: 'Every evidence item is linked to its requirement, reviewer, and evaluation outcome.' },
    { icon: Database, label: 'Tamper-Evident Records', copy: 'Policy versions and lifecycle events are connected through deterministic snapshot hashes.' },
    { icon: Rocket, label: 'Certification Roadmap', copy: 'Formal third-party certification is a roadmap item as the platform moves toward institutional deployment.' },
  ];
  return (
    <section className="section sys-feature-section audit-feature-section">
      <motion.div className="sys-feature-head audit-feature-head" {...fade}>
        <Badge>Audit Readiness</Badge>
        <h2>Built for audit readiness.</h2>
        <p>Axis One is designed with role-based access, traceable evidence, deterministic evaluation records, audit logs, and tamper-evident lifecycle records. Formal third-party certification is a roadmap item as the platform moves toward institutional deployment.</p>
      </motion.div>
      <div className="sys-audit-grid">
        {cards.map(({ icon: Icon, label, copy }) => (
          <motion.div className="sys-audit-card" key={label} {...fade}>
            <div className="layer-icon"><Icon size={18} /></div>
            <strong>{label}</strong>
            <p>{copy}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ClosedLoopSection() {
  const loopItems = [
    { name: 'Single Program', summary: 'One dedicated environment for a defined program, its participants, milestones, evidence, and decision gates.' },
    { name: 'Multi-Program', summary: 'Coordinated governance across multiple programs, with shared standards and portfolio-level visibility.' },
  ];
  return (
    <section className="section closed-loop">
      <motion.div className="closed-copy" {...fade}>
        <Badge>Deployment Packages</Badge>
        <h2>Start with one program. Scale across many.</h2>
        <p>Choose the operating scope that fits today. The governance foundation remains consistent as participation and program complexity grow.</p>
        <div className="loop-list">
          {loopItems.map(({ name, summary }, index) => (
            <div className="loop-list-item" key={name}>
              <span className="loop-list-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="loop-list-copy">
                <strong>
                  <ModuleMark name={name} />
                  <span className="loop-list-dash" aria-hidden="true">-</span>
                  <span className="loop-list-summary-inline">{summary}</span>
                </strong>
                <p>{summary}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div className="loop-diagram-circle" {...fade} aria-label="Closed-Loop Capital System diagram">
        <span className="loop-axis loop-reality">Reality</span>
        <span className="loop-axis loop-logic">Logic</span>
        <span className="loop-axis loop-value">Value</span>
        <span className="loop-axis loop-capital">Capital</span>
        <div className="loop-circle">
          <motion.div
            className="loop-circle-ring"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          />
          <Logo />
          <Pill tone="white">Execution Proof</Pill>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SystemPage({ onOpenAccess, onOpenContact }: PageProps) {
  return (
    <main>
      <section className="section page-hero split-hero">
        <motion.div {...fade}>
          <Badge>How AX1 works</Badge>
          <h1>From live execution evidence to a decision-ready record.</h1>
          <p>AX1 connects execution evidence, assigned validation, mandatory conditions and decision authority in one inspectable, permissioned record.</p>
          <div className="actions"><Button onClick={onOpenAccess}>Frame a Capital Decision</Button><Button variant="secondary" to="/capital">Decision Exposure</Button></div>
        </motion.div>
        <ReleaseEnginePanel />
      </section>
      <section className="section cockpit-section">
        <motion.div className="section-head center" {...fade}>
          <Badge>Capital Operating System</Badge>
          <h2>The system speaks through execution state.</h2>
          <p>Illustrative system state. Not live financial data.</p>
        </motion.div>
        <motion.div className="cockpit" {...fade}>
          <div className="cockpit-label"><span>Gate Monitor</span><Pill tone="amber">release review required</Pill></div>
          <div className="cockpit-grid">
            <div className="readiness"><div className="ring"><Gauge size={30} /><strong>Ready</strong><span>decision readiness</span></div><p>Readiness updates as evidence, assigned validation and mandatory conditions change. It never replaces the authorised capital decision.</p></div>
            <div className="metric-grid">{systemMetrics.map(([label, value, Icon]) => { const MetricIcon = Icon as typeof FileCheck2; return <div className="metric" key={label as string}><MetricIcon size={16} /><span>{label as string}</span><strong>{value as string}</strong></div>; })}</div>
          </div>
        </motion.div>
      </section>
      <section className="section decisions-section">
        <motion.div className="section-head center" {...fade}>
          <Badge>Investor Decision Layer</Badge>
          <h2>Capital decisions stay inside the execution workflow.</h2>
          <p>Decision queues keep release approvals connected to milestone state, evidence quality, validator status, and decision history.</p>
        </motion.div>
        <motion.div className="decision-panel" {...fade}>
          <div className="decision-header"><span>Decision Queue</span><Pill tone="blue">{decisionQueue.length} open items</Pill></div>
          {decisionQueue.map(([title, copy, action]) => <div className="decision-row" key={title}><div><strong>{title}</strong><p>{copy}</p></div><span className="decision-action-label">{action}</span></div>)}
        </motion.div>
      </section>
      <GateEvaluationSection />
      <EvidenceLayerSection />
      <ValidatorQuorumSection />
      <RoleGovernanceSection />
      <ConnectedCoordinationLayerSection />
      <AuditReadinessSection />
      <ClosedLoopSection />
      <FinalCTA
        onOpenAccess={onOpenAccess}
        variant="split"
        heading="See how execution evidence becomes decision readiness."
        subcopy="Every outcome, evidence item, validation and decision remains connected in one permissioned execution state."
        primaryLabel="Frame a Capital Decision"
        secondaryLabel="Explore Capital Governance"
        secondaryTo="/capital"
        points={['Defined evidence requirements', 'Assigned validation and authority', 'Audit-ready decision record']}
      />
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
