import React from 'react';
import { motion } from 'motion/react';
import {
  Activity, AlertTriangle, CheckCircle2, CircleDollarSign,
  ClipboardCheck, Clock3, FileCheck2, GitBranch, Landmark, Layers3,
  LockKeyhole, RotateCcw, ShieldCheck, TimerReset, Users, Workflow,
} from 'lucide-react';
import portrait from '../assets/founder-portrait.webp';
import { Badge, BoundarySection, Button, FinalCTA, Footer, PageProps, fade } from '../components';
import { CapitalValueProtectionCalculator } from '../features/capital-value/CapitalValueProtectionCalculator';

function Hero({ onOpenAccess }: { onOpenAccess: () => void }) {
  return (
    <section className="hero section-xl proof-hero">
      <motion.div className="proof-hero-copy" {...fade}>
        <Badge>Global decision infrastructure</Badge>
        <h1>Capital moves when execution is proven.</h1>
        <p>AX1 is global decision infrastructure for governed capital execution. It gives capital providers, operators, validators and advisors one permissioned environment to coordinate execution, validate evidence and make real-time, audit-ready decisions.</p>
        <div className="actions">
          <Button onClick={onOpenAccess}>Assess a Capital Workflow</Button>
          <a className="button button-ghost" href="#decision-flow">See the Decision Flow</a>
        </div>
        <div className="hero-proof-line" aria-label="AX1 operating principles">
          <span><CheckCircle2 size={15} />Real-time readiness</span>
          <span><CheckCircle2 size={15} />Permissioned collaboration</span>
          <span><CheckCircle2 size={15} />Non-custodial by design</span>
        </div>
      </motion.div>
      <motion.div className="readiness-preview" {...fade} transition={{ duration: 0.72, delay: 0.12 }} aria-label="Illustrative AX1 decision readiness view">
        <div className="readiness-preview-head">
          <div><span className="eyebrow">Illustrative live workflow</span><strong>Growth Capital Programme</strong></div>
          <span className="live-state"><i />Live</span>
        </div>
        <div className="readiness-milestone">
          <div><span>Milestone 03</span><strong>Production line commissioned</strong></div>
          <span className="readiness-pill">Decision ready</span>
        </div>
        <div className="readiness-stakeholders" aria-label="Stakeholders collaborating in AX1">
          {['Capital provider', 'Operator', 'Validator', 'Advisor'].map((stakeholder, index) => (
            <div key={stakeholder}><span>{String(index + 1).padStart(2, '0')}</span>{stakeholder}</div>
          ))}
        </div>
        <div className="readiness-chain">
          {[
            ['Execution proof', 'Verified'], ['Validation', 'Complete'],
            ['Decision authority', 'Ready'], ['Capital action', 'Awaiting approval'],
          ].map(([label, state], index) => (
            <div className={`readiness-chain-row ${index < 3 ? 'complete' : 'active'}`} key={label}>
              <span className="chain-marker">{index < 3 ? '✓' : '04'}</span>
              <div><span>{label}</span><strong>{state}</strong></div>
            </div>
          ))}
        </div>
        <div className="readiness-boundary"><ShieldCheck size={16} /><span>AX1 governs readiness and records the decision. Authorised external systems execute the transfer.</span></div>
      </motion.div>
    </section>
  );
}

function DecisionGapSection() {
  const gaps = [
    { icon: Clock3, title: 'The decision waits for context', copy: 'Senior stakeholders reconstruct execution state from emails, meetings, spreadsheets and documents before they can act.' },
    { icon: FileCheck2, title: 'Evidence is present, but disconnected', copy: 'Proof sits away from the milestone, requirement, validator and decision it is meant to support.' },
    { icon: Users, title: 'Authority becomes ambiguous', copy: 'Different organisations participate, but responsibility, visibility and decision rights are not held in one governed record.' },
    { icon: AlertTriangle, title: 'Risk appears at the release point', copy: 'Missing conditions and unresolved dependencies surface only when capital is already expected to move.' },
  ];
  return (
    <section className="section decision-gap-section">
      <motion.div className="decision-gap-intro" {...fade}>
        <Badge>The structural gap</Badge><h2>Reported progress is not proven execution.</h2>
        <p>Capital is committed against expected outcomes. Yet the next decision is often prepared through manual reconstruction, leaving investors with delay, operators with repeated reporting, and everyone with a different version of reality.</p>
      </motion.div>
      <div className="decision-gap-grid">
        {gaps.map(({ icon: Icon, title, copy }, index) => (
          <motion.article className="decision-gap-card" key={title} {...fade}>
            <div className="decision-gap-card-top"><span>{String(index + 1).padStart(2, '0')}</span><Icon size={18} /></div>
            <h3>{title}</h3><p>{copy}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function DecisionFlowSection() {
  const steps = [
    { title: 'Execute', copy: 'The operator delivers the agreed outcome.', icon: Workflow },
    { title: 'Prove', copy: 'Evidence is submitted into the shared record.', icon: FileCheck2 },
    { title: 'Validate', copy: 'Assigned validators review the correct proof.', icon: ClipboardCheck },
    { title: 'Evaluate', copy: 'AX1 updates readiness as the record changes.', icon: Activity },
    { title: 'Authorise', copy: 'Decision authority is confirmed under the agreed process.', icon: ShieldCheck },
    { title: 'Decide', copy: 'Authorised stakeholders approve, hold, reject or request evidence.', icon: CircleDollarSign },
    { title: 'Record', copy: 'External execution status and the decision history remain reviewable.', icon: Landmark },
  ];
  return (
    <section className="decision-flow-section" id="decision-flow">
      <div className="section decision-flow-inner">
        <motion.div className="section-head" {...fade}>
          <Badge>How AX1 works</Badge><h2>One governed path from work completed to capital action.</h2>
          <p>The public model is simple. AX1 keeps the collaboration, evidence, validation and authority behind a capital decision connected without taking custody of the funds.</p>
        </motion.div>
        <div className="decision-flow-grid">
          {steps.map(({ title, copy, icon: Icon }, index) => (
            <motion.article className="decision-flow-step" key={title} {...fade}>
              <div className="decision-flow-step-head"><span>{String(index + 1).padStart(2, '0')}</span><Icon size={17} /></div>
              <h3>{title}</h3><p>{copy}</p>
            </motion.article>
          ))}
        </div>
        <motion.p className="decision-flow-note" {...fade}><LockKeyhole size={15} />Missing mandatory evidence or failed conditions keep the workflow blocked. Readiness never becomes an automatic transfer.</motion.p>
      </div>
    </section>
  );
}

function CollaborationSection() {
  const roles = [
    { icon: Workflow, label: 'Operator', copy: 'Delivers outcomes, submits evidence and resolves execution blockers.' },
    { icon: Layers3, label: 'Workspace Admin', copy: 'Coordinates the program, access, milestones and required actions.' },
    { icon: ClipboardCheck, label: 'Validator', copy: 'Reviews evidence against agreed requirements and records an assessment.' },
    { icon: CircleDollarSign, label: 'Capital Provider', copy: 'Sees readiness, exceptions and the basis for the next capital decision.' },
    { icon: GitBranch, label: 'Advisor or Partner', copy: 'Keeps delivery, governance and stakeholder coordination aligned.' },
    { icon: ShieldCheck, label: 'Governance and Audit', copy: 'Reviews the attributable history without reconstructing it later.' },
  ];
  return (
    <section className="section collaboration-section">
      <motion.div className="section-head" {...fade}>
        <Badge>Shared infrastructure</Badge><h2>One governed environment. Different responsibilities.</h2>
        <p>AX1 provides global decision infrastructure for capital execution. It is not a shared folder where everyone sees everything. Each participant receives the context, evidence and actions relevant to their role and authority.</p>
      </motion.div>
      <div className="collaboration-layout">
        <div className="stakeholder-role-grid">
          {roles.map(({ icon: Icon, label, copy }) => (
            <motion.article className="stakeholder-role-card" key={label} {...fade}>
              <div className="layer-icon"><Icon size={17} /></div><div><h3>{label}</h3><p>{copy}</p></div>
            </motion.article>
          ))}
        </div>
        <motion.div className="shared-record-panel" {...fade}>
          <div className="shared-record-orbit" aria-hidden="true">
            <span className="orbit orbit-one" /><span className="orbit orbit-two" />
            <div className="shared-record-core"><LockKeyhole size={22} /><strong>Governed<br />execution record</strong></div>
            <i className="orbit-node node-one" /><i className="orbit-node node-two" /><i className="orbit-node node-three" /><i className="orbit-node node-four" />
          </div>
          <div className="shared-record-copy"><span>Permissioned by design</span><strong>Shared context does not mean shared authority.</strong><p>Visibility, validation, approval and administrative control remain separate. Every material action stays attributable to the person and organisation responsible.</p></div>
        </motion.div>
      </div>
    </section>
  );
}

function LiveDecisionDemo() {
  const [verified, setVerified] = React.useState(false);
  const rows = [
    ['Execution outcome', 'Production line commissioned', true],
    ['Required evidence', verified ? '9 of 9 accepted' : '8 of 9 accepted', verified],
    ['Assigned validation', verified ? 'Complete' : 'Final permit pending', verified],
    ['Decision authority', 'Capital committee confirmed', true],
  ] as const;
  return (
    <section className="section live-demo-section">
      <motion.div className="live-demo-copy" {...fade}>
        <Badge>See the difference</Badge><h2>A missing condition is visible before capital is at risk.</h2>
        <p>Explore an illustrative state change. When the final agreed condition is validated, AX1 updates the workflow from blocked to decision-ready in real time. An authorised person must still decide what happens next.</p>
        <div className="live-demo-legend"><span><i className="legend-complete" />Satisfied</span><span><i className="legend-blocked" />Blocking</span><span><i className="legend-action" />Human decision</span></div>
      </motion.div>
      <motion.div className={`live-decision-panel ${verified ? 'is-verified' : ''}`} {...fade}>
        <div className="live-decision-head">
          <div><span>Illustrative decision state</span><strong>Milestone 03 / Capital Tranche B</strong></div>
          <span className={`decision-status ${verified ? 'ready' : 'blocked'}`}>{verified ? 'Decision ready' : 'Blocked'}</span>
        </div>
        <div className="live-decision-rows">
          {rows.map(([label, value, complete]) => (
            <div className="live-decision-row" key={label}><span className={`row-check ${complete ? 'complete' : 'blocked'}`}>{complete ? '✓' : '!'}</span><div><span>{label}</span><strong>{value}</strong></div></div>
          ))}
        </div>
        <div className="live-decision-result">
          <div><span>Capital action</span><strong>{verified ? 'Awaiting authorised decision' : 'Withheld pending evidence'}</strong></div>
          <span className="illustrative-amount"><small>Illustrative tranche</small>£2.4m</span>
        </div>
        {verified && <div className="decision-options" aria-label="Available authorised decision options"><span>Approve</span><span>Hold</span><span>Reject</span><span>Request evidence</span></div>}
        <button className="demo-toggle" type="button" onClick={() => setVerified(current => !current)}>{verified ? <><RotateCcw size={15} />Reset illustration</> : <><CheckCircle2 size={15} />Validate final condition</>}</button>
        <p className="live-demo-disclaimer">Illustrative product state, not live financial data. AX1 records readiness and decisions; an authorised external provider executes any transfer.</p>
      </motion.div>
    </section>
  );
}

function OutcomesSection() {
  const outcomes = [
    { icon: TimerReset, title: 'Shorter evidence-to-decision time', copy: 'Measure how long it takes to move from a submitted evidence pack to an authorised decision.' },
    { icon: Users, title: 'Fewer duplicate information requests', copy: 'Give each authorised participant access to the same governed execution context.' },
    { icon: AlertTriangle, title: 'Earlier blocker visibility', copy: 'Surface missing evidence, dependencies and authority gaps before the decision date.' },
    { icon: ClipboardCheck, title: 'Faster committee and audit preparation', copy: 'Preserve the proof, review, authority and outcome instead of rebuilding the record later.' },
  ];
  return (
    <section className="section outcomes-section">
      <motion.div className="section-head" {...fade}><Badge>Measurable value</Badge><h2>A pilot measures outcomes, not software activity.</h2><p>AX1 establishes a baseline before the workflow begins, then measures whether the governed process became faster, more complete and easier to review.</p></motion.div>
      <div className="outcome-measure-grid">
        {outcomes.map(({ icon: Icon, title, copy }, index) => (
          <motion.article className="outcome-measure-card" key={title} {...fade}><div className="outcome-measure-top"><Icon size={18} /><span>Measure {String(index + 1).padStart(2, '0')}</span></div><h3>{title}</h3><p>{copy}</p></motion.article>
        ))}
      </div>
    </section>
  );
}

function EngagementSection({ onOpenAccess }: { onOpenAccess: () => void }) {
  const engagements = [
    { number: '01', title: 'Launch Programme', label: 'Recommended first step', copy: 'A bounded 10–12 week implementation proving one real capital-governance workflow with agreed baseline metrics and a final rollout decision.', points: ['One primary and up to one supporting workflow', '5–15 named users', 'Outcome report and rollout recommendation'] },
    { number: '02', title: 'Single Program', label: 'Focused operating environment', copy: 'A governed environment for one defined program, its stakeholders, execution evidence and capital decisions.', points: ['Role-scoped collaboration', 'Defined decision and evidence process', 'Ongoing program visibility'] },
    { number: '03', title: 'Multi-Program', label: 'Portfolio operating model', copy: 'A consistent governance model across multiple programs, entities or client engagements with portfolio-level decision visibility.', points: ['Reusable governance standards', 'Cross-program oversight', 'Expanded controls and integrations'] },
  ];
  return (
    <section className="section engagement-section">
      <motion.div className="section-head" {...fade}><Badge>Start narrow. Prove value. Expand.</Badge><h2>Bring one capital workflow, not your entire operating model.</h2><p>AX1 is introduced through a controlled engagement with a clear buyer, problem, scope, success criteria and decision date.</p></motion.div>
      <div className="engagement-grid">
        {engagements.map(({ number, title, label, copy, points }) => (
          <motion.article className={`engagement-card ${number === '01' ? 'featured' : ''}`} key={title} {...fade}><div className="engagement-card-top"><span>{number}</span><small>{label}</small></div><h3>{title}</h3><p>{copy}</p><ul>{points.map(point => <li key={point}><CheckCircle2 size={14} />{point}</li>)}</ul></motion.article>
        ))}
      </div>
      <motion.div className="engagement-action" {...fade}><div><strong>Not sure where to begin?</strong><span>We will map one current decision workflow and identify where evidence, authority or coordination breaks.</span></div><Button onClick={onOpenAccess}>Assess a Capital Workflow</Button></motion.div>
    </section>
  );
}

function TrustProofStrip() {
  const items = [
    { title: 'Non-custodial', copy: 'AX1 does not hold or transfer client capital.', icon: Landmark },
    { title: 'Role-scoped', copy: 'Visibility and actions follow defined responsibility and authority.', icon: Users },
    { title: 'Attributable', copy: 'Evidence, reviews and decisions remain connected to their actors.', icon: ClipboardCheck },
    { title: 'Independently reviewable', copy: 'Material decision records are designed for export and examination.', icon: ShieldCheck },
  ];
  return <section className="section trust-strip"><motion.div className="trust-strip-grid" {...fade}>{items.map(({ title, copy, icon: Icon }) => <article className="trust-item" key={title}><Icon size={17} /><strong>{title}</strong><p>{copy}</p></article>)}</motion.div></section>;
}

function ClaritySection() {
  const items = [
    ['Does AX1 move the money?', 'No. AX1 evaluates and records readiness, routes the authorised decision and preserves the record. A bank, custodian or authorised payment provider executes the transfer.'],
    ['What does “real time” mean?', 'Readiness and stakeholder visibility update as evidence, validation, conditions and decisions change. It does not mean guaranteed real-time financial settlement.'],
    ['Does AX1 replace project tools or data rooms?', 'No. Those systems manage tasks or files. AX1 connects the evidence, validation, authority and decision logic they leave fragmented.'],
    ['Does AX1 make the investment decision?', 'No. AX1 provides a governed, traceable basis for action. The authorised stakeholder remains responsible for the final capital decision.'],
  ];
  return <section className="section clarity-section"><motion.div className="section-head" {...fade}><Badge>Clear boundaries</Badge><h2>What AX1 does and what it does not do.</h2></motion.div><div className="clarity-list">{items.map(([question, answer]) => <motion.details key={question} {...fade}><summary>{question}<span>+</span></summary><p>{answer}</p></motion.details>)}</div></section>;
}

function OriginPreview({ onOpenAccess }: { onOpenAccess: () => void }) {
  return (
    <section className="section origin-preview"><motion.div className="origin-panel" {...fade}><div className="origin-copy"><Badge>Built from the problem</Badge><h2>Capital was available. Trusted execution was not.</h2><p>AX1 began with a recurring operating reality: the people doing the work, validating it and funding it were making critical decisions from disconnected evidence and different versions of execution.</p><blockquote>“The missing product was not another report. It was the governed infrastructure connecting execution proof to capital decisions.”</blockquote><div className="actions"><Button onClick={onOpenAccess}>Assess a Capital Workflow</Button><Button variant="ghost" to="/founder">Read the Founder Story</Button></div></div><div className="portrait-card"><img src={portrait} alt="Tania Jokic, Founder and CEO" loading="lazy" decoding="async" /><div><span>Founder &amp; CEO</span><strong>Tania Jokic</strong><small>AX1 Structura Ltd</small></div></div></motion.div></section>
  );
}

export default function HomePage({ onOpenAccess, onOpenContact }: PageProps) {
  return (
    <main>
      <Hero onOpenAccess={onOpenAccess} /><DecisionGapSection /><DecisionFlowSection /><CollaborationSection />
      <LiveDecisionDemo /><OutcomesSection /><CapitalValueProtectionCalculator onOpenAccess={onOpenAccess} /><EngagementSection onOpenAccess={onOpenAccess} />
      <BoundarySection /><TrustProofStrip /><ClaritySection /><OriginPreview onOpenAccess={onOpenAccess} />
      <FinalCTA onOpenAccess={onOpenAccess} heading="Start with the capital decision that creates the most friction." subcopy="Bring us one current workflow. We will identify where proof, authority and coordination break, then define how a controlled pilot would measure the improvement." primaryLabel="Assess a Capital Workflow" secondaryLabel="See How AX1 Works" secondaryTo="/system" />
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
