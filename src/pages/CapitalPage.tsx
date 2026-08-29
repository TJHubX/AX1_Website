import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileCheck2,
  GitBranch,
  LockKeyhole,
  Users,
  X,
} from 'lucide-react';
import {
  Badge, Pill, Button, BoundarySection, FinalCTA, Footer,
  fade, Tone, PageProps,
} from '../components';
import { CapitalValueProtectionCalculator } from '../features/capital-value/CapitalValueProtectionCalculator';

// ─── Sections ─────────────────────────────────────────────────────────────────

function ReleaseEnforcementGuardSection() {
  const blocked = [
    'Required validation is incomplete',
    'A mandatory dependency remains unresolved',
    'Required evidence is missing or rejected',
    'The authorised decision has not been made',
  ];
  const eligible = [
    'Agreed execution conditions are satisfied',
    'Assigned validation is complete',
    'Evidence remains linked to the decision',
    'Decision authority is confirmed',
  ];
  return (
    <section className="section cap-feature-section cap-alt">
      <motion.div className="cap-feature-head" {...fade}>
        <Badge>Decision Readiness</Badge>
        <h2>Conditions determine eligibility.</h2>
        <p>AX1 continuously evaluates whether the agreed evidence, validation and mandatory conditions are satisfied. If they are not, the workflow remains blocked. When they are, the authorised stakeholder receives a traceable basis for the next decision.</p>
      </motion.div>
      <div className="cap-guard-grid">
        <motion.div className="cap-guard-panel cap-guard-blocked" {...fade}>
          <div className="cap-guard-label"><Pill tone="amber">Blocked</Pill><span>Decision not ready</span></div>
          <ul className="cap-guard-list">
            {blocked.map(item => <li key={item}><X size={14} />{item}</li>)}
          </ul>
        </motion.div>
        <motion.div className="cap-guard-panel cap-guard-eligible" {...fade}>
          <div className="cap-guard-label"><Pill tone="green">Ready</Pill><span>Authorised decision required</span></div>
          <ul className="cap-guard-list">
            {eligible.map(item => <li key={item}><CheckCircle2 size={14} />{item}</li>)}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function InvestorDecisionSurfaceSection() {
  const actions = [
    { icon: Eye, label: 'Execution visibility', copy: 'See the current outcome, unresolved blockers and readiness state across the execution timeline.' },
    { icon: ClipboardCheck, label: 'Connected evidence', copy: 'Review the proof and assessment attached to the decision it supports.' },
    { icon: Users, label: 'Assigned validation', copy: 'See which assigned reviewers have completed their assessment and what remains open.' },
    { icon: LockKeyhole, label: 'Condition visibility', copy: 'Understand which agreed requirement is satisfied, missing, disputed or blocking.' },
    { icon: GitBranch, label: 'Applicable process record', copy: 'Review the process and authority basis that applied when the decision was made.' },
    { icon: FileCheck2, label: 'Decision lifecycle', copy: 'Follow the attributable history from execution evidence through authorised outcome.' },
  ];
  return (
    <section className="section cap-feature-section">
      <motion.div className="cap-feature-head" {...fade}>
        <Badge>Investor Decision Surface</Badge>
        <h2>Visibility that supports decisions.</h2>
        <p>AX1 does not replace investor judgement. It provides a structured surface for reviewing execution, evidence, validation, unresolved conditions and decision authority, so authorised action is based on a governed record, not a reported summary.</p>
      </motion.div>
      <div className="cap-actions-grid">
        {actions.map(({ icon: Icon, label, copy }) => (
          <motion.div className="cap-action-card" key={label} {...fade}>
            <div className="layer-icon"><Icon size={18} /></div>
            <strong>{label}</strong>
            <p>{copy}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TamperEvidenceSection() {
  const chain = [
    { step: '01', label: 'Policy Version', note: 'Gate structure and release rules defined' },
    { step: '02', label: 'Gate Evaluation', note: 'Conditions assessed against evidence and quorum' },
    { step: '03', label: 'Evidence Snapshot', note: 'Supporting proof linked to the evaluated gate' },
    { step: '04', label: 'Validator State', note: 'Confirmation and quorum status recorded' },
    { step: '05', label: 'Release Clearance', note: 'Eligibility determined by policy outcome' },
    { step: '06', label: 'Decision Record', note: 'Outcome and decision context linked to the lifecycle' },
  ];
  const row1 = chain.slice(0, 3);
  const row2 = chain.slice(3).reverse(); // [06, 05, 04]: snake flows right to left
  return (
    <section className="section cap-feature-section cap-alt">
      <motion.div className="cap-feature-head" {...fade}>
        <Badge>Tamper-Evident Records</Badge>
        <h2>Every release decision is traceable.</h2>
        <p>Axis One connects each stage of the release-readiness lifecycle through a tamper-evident chain. Policy versions, gate evaluations, evidence snapshots, validator states, and release decisions are linked, making the decision history auditable end to end.</p>
      </motion.div>
      <div className="cap-snake">
        {/* Row 1: 01 → 02 → 03 */}
        <div className="cap-snake-row">
          {row1.map(({ step, label, note }, i) => (
            <React.Fragment key={step}>
              <motion.div className="cap-snake-card" {...fade}>
                <div className="cap-snake-num">{step}</div>
                <div className="cap-snake-body">
                  <strong>{label}</strong>
                  <p>{note}</p>
                </div>
              </motion.div>
              {i < 2 && <div className="cap-snake-h-conn"><ArrowRight size={15} /></div>}
            </React.Fragment>
          ))}
        </div>
        {/* Turn connector: right-aligned under card 03, above card 04 */}
        <div className="cap-snake-turn"><ArrowDown size={15} /></div>
        {/* Row 2: 06 ← 05 ← 04 (visual snake, reads right→left) */}
        <div className="cap-snake-row">
          {row2.map(({ step, label, note }, i) => (
            <React.Fragment key={step}>
              <motion.div className="cap-snake-card" {...fade}>
                <div className="cap-snake-num">{step}</div>
                <div className="cap-snake-body">
                  <strong>{label}</strong>
                  <p>{note}</p>
                </div>
              </motion.div>
              {i < 2 && <div className="cap-snake-h-conn"><ArrowLeft size={15} /></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReleaseStateSection() {
  const states = [
    { state: 'In review', desc: 'Evidence or assigned validation is still being completed.', tone: 'muted' as Tone },
    { state: 'Decision ready', desc: 'The agreed conditions are satisfied and authority is confirmed.', tone: 'green' as Tone },
    { state: 'Decision required', desc: 'An authorised stakeholder must approve, hold, reject or request evidence.', tone: 'blue' as Tone },
    { state: 'Blocked', desc: 'A mandatory condition is missing, failed, disputed or unresolved.', tone: 'amber' as Tone },
    { state: 'Externally executed', desc: 'The external provider status is linked back to the decision record.', tone: 'blue' as Tone },
  ];
  return (
    <section className="section cap-feature-section">
      <motion.div className="cap-feature-head" {...fade}>
        <Badge>Decision States</Badge>
        <h2>Every state has a defined outcome.</h2>
        <p>AX1 gives capital programs a shared decision-readiness layer. Every state change is attributable, visible to the correct participants and connected to the decision record.</p>
      </motion.div>
      <div className="cap-states-grid">
        {states.map(({ state, desc, tone }) => (
          <motion.div className="cap-state-card" key={state} {...fade}>
            <Pill tone={tone}>{state}</Pill>
            <p>{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CapitalPage({ onOpenAccess, onOpenContact }: PageProps) {
  const states = [
    ['Proven', 'Decision ready', 'Agreed execution evidence and assigned validation are complete.'],
    ['Authorised', 'Capital action approved', 'The responsible stakeholder records the decision and conditions.'],
    ['Blocked', 'Capital action withheld', 'Missing evidence or a failed mandatory condition keeps the workflow blocked.'],
    ['Executed', 'External provider status', 'The bank or authorised provider executes and AX1 preserves the reference.'],
  ];
  return (
    <main>
      <section className="section page-hero">
        <motion.div className="narrow" {...fade}>
          <Badge>Capital governance</Badge>
          <h1>Proven execution. Authorised capital action.</h1>
          <p>AX1 connects execution evidence, validation and decision authority in real time. It governs the basis for action while custody and transfer remain with authorised external providers.</p>
          <div className="actions center-actions"><Button onClick={onOpenAccess}>Frame a Capital Decision</Button><Button variant="secondary" to="/system">See How It Works</Button></div>
        </motion.div>
      </section>
      <CapitalValueProtectionCalculator onOpenAccess={onOpenAccess} />
      <BoundarySection />
      <section className="section behavior-section">
        <motion.div className="section-head" {...fade}>
          <Badge>Capital Behavior</Badge>
          <h2>Capital responds to execution state.</h2>
        </motion.div>
        <div className="behavior-grid">{states.map(([state, behavior, copy]) => <motion.div className="behavior-card" key={state} {...fade}><Pill tone={state === 'Blocked' ? 'amber' : 'blue'}>{state}</Pill><h3>{behavior}</h3><p>{copy}</p></motion.div>)}</div>
      </section>
      <ReleaseEnforcementGuardSection />
      <InvestorDecisionSurfaceSection />
      <TamperEvidenceSection />
      <ReleaseStateSection />
      <FinalCTA
        onOpenAccess={onOpenAccess}
        variant="bar"
        heading="Review the decision before the capital action."
        primaryLabel="Frame a Capital Decision"
        secondaryLabel="See How It Works"
        secondaryTo="/system"
      />
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
