import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Eye,
  FileCheck2,
  GitBranch,
  Landmark,
  LockKeyhole,
  Route as RouteIcon,
  Users,
  Workflow,
  X,
} from 'lucide-react';
import {
  Badge, Pill, Button, FinalCTA, Footer,
  fade, Tone, PageProps,
} from '../components';

// ─── Sections ─────────────────────────────────────────────────────────────────

function ReleaseEnforcementGuardSection() {
  const blocked = [
    'Quorum threshold not reached',
    'Outstanding dependency unresolved',
    'Evidence requirement incomplete',
    'Readiness score below threshold',
  ];
  const eligible = [
    'All gate conditions satisfied',
    'Required validator confirmations received',
    'Evidence reviewed and linked',
    'Readiness score at or above threshold',
  ];
  return (
    <section className="section cap-feature-section cap-alt">
      <motion.div className="cap-feature-head" {...fade}>
        <Badge>Release Enforcement</Badge>
        <h2>Conditions determine eligibility.</h2>
        <p>Capital release is not manual. It follows the structured conditions attached to each gate. If conditions are not satisfied, the release instruction is not issued. There is no override path outside the defined policy.</p>
      </motion.div>
      <div className="cap-guard-grid">
        <motion.div className="cap-guard-panel cap-guard-blocked" {...fade}>
          <div className="cap-guard-label"><Pill tone="amber">Blocked</Pill><span>Release paused</span></div>
          <ul className="cap-guard-list">
            {blocked.map(item => <li key={item}><X size={14} />{item}</li>)}
          </ul>
        </motion.div>
        <motion.div className="cap-guard-panel cap-guard-eligible" {...fade}>
          <div className="cap-guard-label"><Pill tone="green">Eligible</Pill><span>Release conditions met</span></div>
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
    { icon: Eye, label: 'Milestone visibility', copy: 'View gate status, readiness scores, and dependency states across the execution timeline.' },
    { icon: ClipboardCheck, label: 'Evidence access', copy: 'Review linked evidence packs, documents, and requirement fulfilment for each gate.' },
    { icon: Users, label: 'Validator confirmation', copy: 'See which validators have confirmed and whether quorum thresholds have been reached.' },
    { icon: LockKeyhole, label: 'Release condition audit', copy: 'Inspect the exact conditions that determined whether a release instruction was issued or withheld.' },
    { icon: GitBranch, label: 'Policy version history', copy: 'Access a record of how governance policy was structured at the time of each gate evaluation.' },
    { icon: FileCheck2, label: 'Lifecycle record', copy: 'Follow the full audit trail from gate evaluation through to settlement record and payout entry.' },
  ];
  return (
    <section className="section cap-feature-section">
      <motion.div className="cap-feature-head" {...fade}>
        <Badge>Investor Decision Surface</Badge>
        <h2>Visibility that supports decisions.</h2>
        <p>Axis One does not replace investor judgement. It provides a structured surface for reviewing execution progress, evidence, validator confirmations, release conditions, and policy state — so decisions are based on verified data, not reported summaries.</p>
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
    { step: '03', label: 'Release Clearance', note: 'Eligibility determined by policy outcome' },
    { step: '04', label: 'Settlement Record', note: 'Release instruction logged with conditions state' },
    { step: '05', label: 'Reconciliation', note: 'Tranche amounts mapped to release outcome' },
    { step: '06', label: 'Payout Record', note: 'Final entry linked to lifecycle chain' },
  ];
  const row1 = chain.slice(0, 3);
  const row2 = chain.slice(3).reverse(); // [06, 05, 04] — snake flows right→left
  return (
    <section className="section cap-feature-section cap-alt">
      <motion.div className="cap-feature-head" {...fade}>
        <Badge>Tamper-Evident Records</Badge>
        <h2>Every release decision is traceable.</h2>
        <p>Axis One connects each stage of the capital release lifecycle through a tamper-evident chain. Policy versions, gate evaluations, release clearances, settlement records, and payout entries are linked, making the full decision history auditable end to end.</p>
      </motion.div>
      <div className="cap-snake cap-snake-desktop">
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
        {/* Turn connector — right-aligned under card 03, above card 04 */}
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
      <div className="cap-snake-mobile">
        {chain.map(({ step, label, note }, index) => (
          <React.Fragment key={step}>
            <motion.div className="cap-snake-mobile-card" {...fade}>
              <div className="cap-snake-num">{step}</div>
              <div className="cap-snake-body">
                <strong>{label}</strong>
                <p>{note}</p>
              </div>
            </motion.div>
            {index < chain.length - 1 && (
              <div className="cap-snake-mobile-conn" aria-hidden="true">
                <ArrowDown size={15} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

function SettlementVisibilitySection() {
  const states = [
    { state: 'Pending', desc: 'Gate evaluation in progress. Release instruction not yet issued.', tone: 'muted' as Tone },
    { state: 'Eligible', desc: 'All release conditions satisfied. Tranche cleared for instruction.', tone: 'green' as Tone },
    { state: 'Conditional', desc: 'Partial readiness met. Capped or weighted release permitted by policy.', tone: 'blue' as Tone },
    { state: 'Withheld', desc: 'Policy condition not satisfied. Release instruction withheld.', tone: 'amber' as Tone },
    { state: 'Holdback', desc: 'Reserved tranche remains deferred. Awaiting downstream gate conditions.', tone: 'amber' as Tone },
  ];
  return (
    <section className="section cap-feature-section">
      <motion.div className="cap-feature-head" {...fade}>
        <Badge>Settlement Visibility</Badge>
        <h2>Every state has a defined outcome.</h2>
        <p>Axis One gives capital programs a structured settlement layer. Each tranche moves through defined states, and every state transition is policy-driven and recorded. There are no ambiguous outcomes. Every settlement entry carries an audit trail.</p>
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

// ─── Capital Performance Section ──────────────────────────────────────────────

function CapitalPerformanceSection() {
  const rows = [
    {
      metric: '10%–15% capex savings',
      meaning: 'Lower total capital expenditure',
      impact: '$10M–$15M in potential savings',
    },
    {
      metric: '25% schedule reduction',
      meaning: 'Faster project completion',
      impact: '24 months → 18 months',
    },
    {
      metric: '30% reduction in contingency usage',
      meaning: 'Lower drawdown of reserve budget',
      impact: 'If contingency reserve is $15M, around $4.5M less may be used',
    },
    {
      metric: '15% value-loss mitigation',
      meaning: 'Less promised value lost during execution',
      impact: 'If projected value loss is $30M, around $4.5M may be preserved',
    },
  ];
  return (
    <section className="section cap-feature-section cap-alt">
      <motion.div className="cap-feature-head" {...fade}>
        <Badge>Capital Performance</Badge>
        <h2>The cost of disconnected capital execution.</h2>
        <p>Large capital projects often lose value after capital is committed — through fragmented approvals, delayed evidence, unclear ownership, contingency overuse, and release decisions disconnected from verified execution. Axis One is designed to reduce execution risk by linking capital readiness to governed proof.</p>
      </motion.div>
      <motion.div className="cap-perf-panel" {...fade}>
        <p className="cap-perf-table-title">Illustrative capital-performance impact on a $100M project</p>
        <div className="cap-perf-table-wrap">
          <table className="cap-perf-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>What it means</th>
                <th>Illustrative impact on $100M project</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ metric, meaning, impact }) => (
                <tr key={metric}>
                  <td><span className="cap-perf-metric">{metric}</span></td>
                  <td>{meaning}</td>
                  <td>{impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="cap-perf-disclaimer">Illustrative scenario based on capital-project performance improvement benchmarks. Actual outcomes depend on project type, governance quality, execution maturity, stakeholder behavior, and implementation scope. AX1 Structura Ltd does not guarantee savings, returns, or project outcomes.</p>
      </motion.div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CapitalPage({ onOpenAccess, onOpenContact }: PageProps) {
  const states = [
    ['Validated', 'Release', 'Capital becomes release-eligible when execution proof, dependencies, and quorum align.'],
    ['Partial', 'Conditional release', 'Capital may release under capped or weighted readiness conditions.'],
    ['Blocked', 'Hold', 'Dependencies, missing evidence or failed quorum pause release instruction.'],
    ['Protected', 'Holdback', 'Reserved capital remains deferred until policy conditions are satisfied.'],
  ];
  return (
    <main>
      <section className="section page-hero">
        <motion.div className="narrow" {...fade}>
          <Badge>Capital Boundary</Badge>
          <h1>Governed release. Not custody.</h1>
          <p>Axis One does not hold investor funds. It governs how capital is released by structuring conditions, validating execution, and coordinating release logic based on verified progress.</p>
          <div className="actions center-actions"><Button onClick={onOpenAccess}>Request Access</Button><Button variant="secondary" to="/system">View System</Button></div>
        </motion.div>
      </section>
      <section className="section boundary-section">
        <motion.div className="boundary-panel boundary-panel--full" {...fade}>
          <div className="boundary-layers">
            <div className="boundary-layer"><Landmark size={18} /><strong>Investor / licensed provider funds</strong><span>Capital remains outside Axis One custody.</span></div>
            <ChevronDown className="layer-arrow" size={18} />
            <div className="boundary-layer highlight"><Workflow size={18} /><strong>Axis One readiness logic</strong><span>Evidence, quorum, dependencies, holdbacks and release conditions.</span></div>
            <ChevronDown className="layer-arrow" size={18} />
            <div className="boundary-layer"><RouteIcon size={18} /><strong>Instruction + settlement visibility</strong><span>Release decisions remain reviewable and auditable.</span></div>
          </div>
        </motion.div>
      </section>
      <CapitalPerformanceSection />
      <section className="section behavior-section">
        <motion.div className="section-head" {...fade}>
          <Badge>Capital Behavior through AX1</Badge>
          <h2>Capital responds to execution state.</h2>
        </motion.div>
        <div className="behavior-grid">{states.map(([state, behavior, copy]) => <motion.div className="behavior-card" key={state} {...fade}><Pill tone={state === 'Blocked' ? 'amber' : 'blue'}>{state}</Pill><h3>{behavior}</h3><p>{copy}</p></motion.div>)}</div>
      </section>
      <ReleaseEnforcementGuardSection />
      <InvestorDecisionSurfaceSection />
      <TamperEvidenceSection />
      <SettlementVisibilitySection />
      <FinalCTA
        onOpenAccess={onOpenAccess}
        variant="bar"
        heading="Review non-custodial release governance."
        secondaryLabel="View System"
        secondaryTo="/system"
      />
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
