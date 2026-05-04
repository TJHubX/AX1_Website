import React from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  Boxes,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  Eye,
  FileCheck2,
  GitBranch,
  Globe,
  Layers3,
  Lock,
  LockKeyhole,
  Mail,
  Network,
  ShieldCheck,
  Users,
  Workflow,
  Zap,
} from 'lucide-react';
import portrait from '../assets/founder-portrait.png';
import {
  Badge, Pill, Button, Logo, ModuleMark, BoundarySection, DeploymentGrid, FinalCTA, Footer,
  fade, deploymentUseCases, Tone, PageProps,
} from '../components';
import { LaunchCountdown } from '../LaunchCountdown';
import SystemVisual from '../components/SystemVisual';

// ─── Data ─────────────────────────────────────────────────────────────────────

const architectureLayers = [
  {
    kicker: 'Truth Layer',
    title: 'AX1 | Network',
    icon: Network,
    copy: 'Establishes truth by capturing execution data, including milestones, metrics, and dependencies, into a verifiable, real-time representation of project reality.',
    outcome: 'Complete visibility into execution.',
  },
  {
    kicker: 'Decision Engine',
    title: 'AX1 | Core',
    icon: Cpu,
    copy: 'The governance engine. Defines capital decisions by applying structured rules and objective validation logic to data from the Network layer.',
    outcome: 'Consistent, objective decision-making.',
  },
  {
    kicker: 'Execution Layer',
    title: 'AX1 | Capital',
    icon: Zap,
    copy: 'Orchestration layer that organizes capital into programmable gates and releases funds progressively based on proven outcomes.',
    outcome: 'Controlled, accountable capital flow.',
  },
  {
    kicker: 'Liquidity Layer',
    title: 'AX1 | Exchange',
    icon: Globe,
    copy: 'Unlocks liquidity by enabling execution-based capital positions to become tradable financial instruments on a secondary market.',
    outcome: 'Tradable execution positions.',
    future: true,
  },
];

const investorBenefits = [
  ['Risk Reduction', 'Capital released only on verified progress', ShieldCheck],
  ['Capital Control', 'Programmable release conditions and gates', Lock],
  ['Transparency', 'Real-time visibility into execution status', Activity],
  ['Auditability', 'Complete evidence trail and compliance logs', ClipboardCheck],
];

const operatorBenefits = [
  ['Faster Funding', 'Capital release linked to milestone completion', Zap],
  ['Structured Execution', 'Defined deliverables and clear execution cadence', Boxes],
  ['Investor Trust', 'Built-in transparency and validation layer', Users],
  ['Operational Clarity', 'Evidence requirements known up front', CheckCircle2],
];

// ─── Sections ─────────────────────────────────────────────────────────────────

function Hero({ onOpenAccess }: { onOpenAccess: () => void }) {
  return (
    <section className="hero section-xl">
      <motion.div className="hero-center" {...fade}>
        <Badge>V1.1 Execution Ready</Badge>
        <h1>Capital, governed<br />by execution.</h1>
        <p>Axis One transforms capital deployment into a programmable system where funds move only when reality proves progress.</p>
        <div className="actions center-actions">
          <Button onClick={onOpenAccess}>Request Access</Button>
          <Button variant="ghost" to="/system">View System</Button>
        </div>
      </motion.div>
    </section>
  );
}

function HowAxisWorksStrip() {
  const steps = [
    {
      title: 'Define Gates',
      copy: 'Capital is structured around milestone conditions, evidence requirements, validator rules, and release formulas.',
    },
    {
      title: 'Verify Execution',
      copy: 'Documents, signatures, metrics, dependencies, and validator decisions are evaluated against the gate policy.',
    },
    {
      title: 'Govern Release',
      copy: 'When readiness is satisfied, release clearance can be issued. When conditions fail, release is blocked and recorded.',
    },
  ];
  return (
    <section className="section how-strip">
      <motion.div className="how-strip-head" {...fade}>
        <Badge>Execution Sequence</Badge>
        <h2>How Axis One works.</h2>
      </motion.div>
      <motion.div className="how-strip-grid" {...fade}>
        {steps.map((step, index) => (
          <article className="how-step" key={step.title}>
            <span className="how-step-num">{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        ))}
      </motion.div>
    </section>
  );
}

function TrustProofStrip() {
  const items = [
    ['Non-custodial by design', 'Axis One governs release logic. It does not hold investor funds.'],
    ['Deterministic governance', 'Release readiness is evaluated through structured gate logic.'],
    ['Tamper-evident records', 'Policy, evaluation, release, and settlement states can be linked through snapshot hashes.'],
    ['Audit-readiness roadmap', 'Designed with traceability, RBAC, evidence history, and certification-readiness patterns.'],
  ];

  return (
    <section className="section trust-strip">
      <motion.div className="trust-strip-grid" {...fade}>
        {items.map(([title, copy]) => (
          <article className="trust-item" key={title}>
            <strong>{title}</strong>
            <p>{copy}</p>
          </article>
        ))}
      </motion.div>
    </section>
  );
}

function ShiftSection() {
  return (
    <section className="section shift-section">
      <motion.div className="shift-copy" {...fade}>
        <Badge>Structural Problem</Badge>
        <h2>Capital commits once. Execution keeps moving.</h2>
        <p>After capital is committed, execution fragments across emails, meetings, documents, reports, and stakeholder assumptions. Axis One does not simply store execution data — it structures collaboration around evidence, ownership, and release readiness, reducing capital risk as delivery unfolds.</p>
      </motion.div>
      <SystemVisual />
    </section>
  );
}

function AudienceSplit() {
  const groups = [
    {
      label: 'For Capital Providers',
      headline: 'Control without operational drag.',
      items: [
        { title: 'Reduced deployment risk', copy: 'Capital release is linked to verified milestone progress.', icon: ShieldCheck },
        { title: 'Real execution visibility', copy: 'Investors see readiness, blockers, evidence, and decision state.', icon: Eye },
        { title: 'Milestone-based control', copy: 'Funds are governed through structured gates and release conditions.', icon: LockKeyhole },
        { title: 'Verifiable reporting', copy: 'Evidence, approvals, and release records remain traceable.', icon: ClipboardCheck },
      ],
    },
    {
      label: 'For Operators / Delivery Teams',
      headline: 'Execution as proof of value.',
      items: [
        { title: 'Faster payments', copy: 'Reduced approval ambiguity when milestone conditions are clear.', icon: Zap },
        { title: 'Clear expectations', copy: 'Deliverables, evidence requirements, and validator rules are known upfront.', icon: CheckCircle2 },
        { title: 'Reduced disputes', copy: 'Progress is evidenced against agreed conditions, not debated after the fact.', icon: GitBranch },
        { title: 'Easier reporting', copy: 'Milestone status, documents, discussions, and execution proof stay connected in one workflow.', icon: FileCheck2 },
      ],
    },
    {
      label: 'For Consulting Firms / Partners',
      headline: 'Governance that scales delivery.',
      items: [
        { title: 'Structured project governance', copy: 'Partners can manage complex delivery around gates, owners, evidence, communications, and decisions.', icon: Workflow },
        { title: 'Clear accountability', copy: 'Ownership is visible across clients, operators, validators, and external stakeholders.', icon: Users },
        { title: 'Stronger client trust', copy: 'Delivery progress is supported by evidence, audit trails, communication context, and shared visibility.', icon: Building2 },
        { title: 'Scalable delivery systems', copy: 'Repeatable governance workflows reduce manual coordination, reporting friction, and stakeholder misalignment.', icon: Layers3 },
      ],
    },
  ];

  return (
    <section className="section stakeholder-section">
      <motion.div className="stakeholder-head" {...fade}>
        <Badge>Stakeholder Value</Badge>
        <h2>Execution ownership, visible to every stakeholder.</h2>
        <p>Axis One makes execution ownership clear when multiple parties are involved. Investors, operators, delivery teams, consultants, validators, and partners work from the same milestone logic, evidence requirements, communication context, decision state, and accountability record.</p>
      </motion.div>
      <div className="stakeholder-grid">
        {groups.map(({ label, headline, items }) => (
          <motion.article className="stakeholder-card" key={label} {...fade}>
            <span className="stakeholder-label">{label}</span>
            <h3>{headline}</h3>
            <div className="stakeholder-list">
              {items.map(({ title, copy }) => (
                <div className="stakeholder-row" key={title}>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function StakeholderRecordStrip() {
  const signals = [
    { title: 'Ownership visible', copy: 'Every milestone has a responsible owner and decision state.', icon: Users },
    { title: 'Evidence attached', copy: 'Documents, signatures, and proof remain connected to the relevant gate.', icon: FileCheck2 },
    { title: 'Decisions tracked', copy: 'Approvals, holds, requests, and release states stay visible.', icon: ClipboardCheck },
    { title: 'Blockers surfaced', copy: 'Dependencies and unresolved conditions are shown before release review.', icon: GitBranch },
    { title: 'Communication connected', copy: 'ChatHub and provider-based video workflows keep discussions tied to milestones and decisions.', icon: Mail },
    { title: 'Release state governed', copy: 'Capital readiness follows the record, not scattered updates.', icon: Lock },
  ];

  return (
    <section className="section stakeholder-strip-section">
      <motion.div className="stakeholder-strip-head" {...fade}>
        <h3>One execution record. Multiple stakeholders.</h3>
        <p>Axis One connects ownership, evidence, decisions, blockers, communication, and release state into a shared execution record.</p>
      </motion.div>
      <div className="stakeholder-strip-grid">
        {signals.map(({ title, copy, icon: Icon }) => (
          <motion.article className="stakeholder-strip-card" key={title} {...fade}>
            <div className="layer-icon"><Icon size={17} /></div>
            <strong>{title}</strong>
            <p>{copy}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function GovernsSection({ onOpenAccess }: { onOpenAccess: () => void }) {
  const cards = [
    { icon: GitBranch, title: 'Milestone Readiness', copy: 'Gates define what must be proven before release eligibility is evaluated.' },
    { icon: FileCheck2, title: 'Evidence Integrity', copy: 'Documents, signatures, and proof requirements are connected directly to readiness.' },
    { icon: Users, title: 'Validator Quorum', copy: 'Release confidence depends on named validators and configured approval thresholds.' },
    { icon: LockKeyhole, title: 'Release Enforcement', copy: 'If conditions are not satisfied, release clearance is blocked and the reason is recorded.' },
  ];

  const states = [
    { state: 'Validated', result: 'Release', tone: 'green' as Tone },
    { state: 'Partial', result: 'Conditional release', tone: 'blue' as Tone },
    { state: 'Blocked', result: 'Hold', tone: 'amber' as Tone },
    { state: 'Failed', result: 'Stop / Review', tone: 'muted' as Tone },
  ];

  return (
    <section className="section governs-section">
      <motion.div className="governs-head" {...fade}>
        <Badge>Platform</Badge>
        <h2>What Axis One governs.</h2>
        <p>Gates define conditions. Evidence proves progress. Validators confirm readiness. Release logic follows the record.</p>
      </motion.div>
      <motion.div className="governs-grid" {...fade}>
        {cards.map(({ icon: Icon, title, copy }) => (
          <div className="governs-card" key={title}>
            <div className="layer-icon"><Icon size={18} /></div>
            <strong>{title}</strong>
            <p>{copy}</p>
          </div>
        ))}
      </motion.div>
      <motion.div className="governs-states" {...fade}>
        <span className="governs-states-label">Capital responds to execution state.</span>
        <div className="governs-states-row">
          {states.map(({ state, result, tone }) => (
            <div className="governs-state-item" key={state}>
              <Pill tone={tone}>{state}</Pill>
              <span className="governs-arrow">→</span>
              <span className="governs-result">{result}</span>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div className="governs-links" {...fade}>
        <Button onClick={onOpenAccess}>Request Access</Button>
        <Button variant="ghost" to="/system">View System</Button>
        <Button variant="ghost" to="/capital">View Capital Logic</Button>
      </motion.div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section className="section architecture-section">
      <motion.div className="section-split-head" {...fade}>
        <h2>The Axis One Architecture.</h2>
        <p>Different sectors. One governance model. Four integrated layers turn fragmented updates into deterministic release decisions.</p>
      </motion.div>
      <div className="architecture-grid">
        {architectureLayers.map(({ kicker, title, copy, outcome, icon: Icon, future }) => (
          <motion.div className="architecture-card" key={title} {...fade}>
            {future && <Pill tone="blue">Future</Pill>}
            <div className="layer-icon"><Icon size={21} /></div>
            <span>{kicker}</span>
            <h3><ModuleMark name={title.replace('AX1 | ', '')} /></h3>
            <p>{copy}</p>
            <div className="outcome"><small>Outcome</small><strong>{outcome}</strong></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function DeploymentPreview({ onOpenAccess }: { onOpenAccess: () => void }) {
  return (
    <section className="section deployment-section">
      <motion.div className="section-head" {...fade}>
        <Badge>Deployment</Badge>
        <h2>Built for complex execution.</h2>
        <p>Structured release logic supports programs where milestones, dependencies, and stakeholders must stay aligned.</p>
      </motion.div>
      <DeploymentGrid preview />
      <div className="actions center-actions"><Button onClick={onOpenAccess}>Request Access</Button><Button variant="ghost" to="/deployment">View Deployment</Button></div>
    </section>
  );
}

function OriginPreview({ onOpenAccess }: { onOpenAccess: () => void }) {
  return (
    <section className="section origin-preview">
      <motion.div className="origin-panel" {...fade}>
        <div className="origin-copy">
          <Badge>The Origin</Badge>
          <h2>Built from the gap between capital and execution.</h2>
          <p>Axis One was built for a structural gap: capital may be available, but trust fails when execution cannot be verified.</p>
          <blockquote>"Capital does not fail because of strategy. It fails when execution cannot be trusted."</blockquote>
          <div className="actions"><Button onClick={onOpenAccess}>Request Access</Button><Button variant="ghost" to="/founder">Read Founder Story</Button></div>
        </div>
        <div className="portrait-card"><img src={portrait} alt="Tania Jokic, Founder & CEO" /><div><span>Founder & CEO</span><strong>Tania Jokic</strong><small>Axis One Alpha</small></div></div>
      </motion.div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage({ onOpenAccess, onOpenContact }: PageProps) {
  return (
    <main>
      <Hero onOpenAccess={onOpenAccess} />
      <ShiftSection />
      <HowAxisWorksStrip />
      <TrustProofStrip />
      <AudienceSplit />
      <StakeholderRecordStrip />
      <GovernsSection onOpenAccess={onOpenAccess} />
      <ArchitectureSection />
      <BoundarySection />
      <DeploymentPreview onOpenAccess={onOpenAccess} />
      <OriginPreview onOpenAccess={onOpenAccess} />
      <LaunchCountdown onOpenAccess={onOpenAccess} />
      <FinalCTA
        onOpenAccess={onOpenAccess}
        heading="Govern capital through verified execution."
        subcopy="Axis One structures the conditions governing release — so capital moves when proof is present, not when it is requested."
        secondaryLabel="View System"
        secondaryTo="/system"
      />
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
