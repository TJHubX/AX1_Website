import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Database,
  Download,
  FileCheck2,
  Gavel,
  Link2,
  Linkedin,
  LockKeyhole,
  ShieldCheck,
  Users,
  Workflow,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Logo, type PageProps } from '../components';
import { trackAX1Event } from '../utils/analytics';

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.16 },
  transition: { duration: 0.55 },
};

const workflowSteps = [
  ['01', 'Define the Gate', 'Record the milestone, release conditions, required evidence and decision authority before the review starts.'],
  ['02', 'Connect the evidence', 'Bring the current evidence references, owners and versions into the context of the release decision.'],
  ['03', 'Review what changed', 'Assigned reviewers record their position while missing, stale or conflicting inputs remain visible.'],
  ['04', 'Surface exceptions', 'Missing, stale or disputed inputs remain visible and attached to the decision context.'],
  ['05', 'Record the decision', 'Authorised people record release, conditional release, hold or stop, then export the reviewable decision package.'],
];

const faqs = [
  ['Does Axis One move or hold the capital?', 'No. Axis One is non-custodial. Capital execution remains with the client’s authorised banking, legal and operating arrangements.'],
  ['Does Axis One make the investment decision?', 'No. Axis One organises the current decision basis and records the authorised outcome. Investment and release judgement remains with authorised people.'],
  ['Does Axis One replace our deal, accounting or project systems?', 'No. Axis One is a governed decision layer around the release event. Source evidence and operational records can remain in their approved systems.'],
  ['Does uploaded evidence become “verified truth”?', 'No. Axis One retains attribution, review positions and exceptions. Evidence still requires the appropriate human or independent validation for the decision.'],
  ['What is required for a pilot?', 'For the initial fit discussion, no confidential information is required. A live pilot needs one approaching milestone decision, a named decision owner and scoped access to agreed source evidence under the client’s controls.'],
];

function CapitalReleaseHeader({ onOpenContact }: Pick<PageProps, 'onOpenContact'>) {
  return (
    <header className="cr-header">
      <a className="skip-link" href="#cr-main-content">Skip to main content</a>
      <nav className="cr-shell cr-nav" aria-label="Capital release landing page navigation">
        <Link className="cr-logo" to="/" aria-label="Axis One home"><Logo /></Link>
        <span className="cr-nav-context">Milestone capital governance</span>
        <div className="cr-nav-actions">
          <Link to="/trust">Trust &amp; boundaries</Link>
          <button type="button" onClick={() => onOpenContact({ packageName: 'AX1.Pilot', source: 'capital_release_navigation' })}>
            Discuss a pilot <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>
  );
}

function ReleaseDecisionPreview() {
  return (
    <motion.aside
      className="cr-decision-preview"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.12 }}
      aria-label="Illustrative milestone release decision"
    >
      <div className="cr-preview-topline">
        <div><span>Illustrative decision</span><strong>Portfolio company expansion / Allocation decision</strong></div>
        <small><i /> Review open</small>
      </div>

      <div className="cr-preview-amount">
        <span>Capital allocation under review</span>
        <strong>€1.85M</strong>
        <p>Milestone · Operational readiness</p>
      </div>

      <div className="cr-preview-status">
        <div><span>Required evidence</span><strong><FileCheck2 size={15} aria-hidden="true" /> 12 of 14 current</strong></div>
        <div><span>Decision participants</span><strong><Users size={15} aria-hidden="true" /> 3 of 4 recorded</strong></div>
      </div>

      <div className="cr-preview-exception">
        <CircleAlert size={18} aria-hidden="true" />
        <div><span>Open exception</span><strong>Independent operational validation outstanding.</strong></div>
      </div>

      <div className="cr-preview-outcome">
        <span>Current decision position</span>
        <strong>HOLD</strong>
        <small>Required validation outstanding. Authorised stakeholders decide.</small>
      </div>
    </motion.aside>
  );
}

function OperatingProblem() {
  const fragments = [
    ['01', 'Conditions', 'The investment terms and milestone requirements live in documents and spreadsheets.'],
    ['02', 'Evidence', 'Delivery evidence arrives through files, email, shared drives and operating systems.'],
    ['03', 'Authority', 'Review roles and approval rights are interpreted again at the point of decision.'],
    ['04', 'Decision', 'The investment team rebuilds the current position under time pressure.'],
  ];

  return (
    <section className="cr-problem" aria-labelledby="cr-problem-title">
      <div className="cr-shell">
        <motion.header className="cr-section-heading" {...reveal}>
          <span className="cr-section-eyebrow">The operating problem</span>
          <h2 id="cr-problem-title">The release meeting should not be a reconstruction exercise.</h2>
          <p>Before capital can move, someone must establish what was required, what is current, what is missing and who can decide. In many teams, that position is assembled only when the decision is already due.</p>
        </motion.header>
        <div className="cr-fragment-grid">
          {fragments.map(([number, title, copy], index) => (
            <motion.article key={number} className={index === fragments.length - 1 ? 'is-decision' : ''} {...reveal}>
              <span>{number}</span><i />
              <h3>{title}</h3>
              <p>{copy}</p>
            </motion.article>
          ))}
        </div>
        <motion.blockquote {...reveal}>
          When the decision basis is rebuilt for each release, the team is paying repeatedly for context it should already possess.
        </motion.blockquote>
      </div>
    </section>
  );
}

function ReleaseWorkflow() {
  return (
    <section className="cr-workflow" id="how-it-works" aria-labelledby="cr-workflow-title">
      <div className="cr-shell">
        <motion.header className="cr-section-heading cr-section-heading-light" {...reveal}>
          <span className="cr-section-eyebrow">The Axis One release workflow</span>
          <h2 id="cr-workflow-title">One governed path from milestone to decision.</h2>
          <p>Axis One keeps the conditions, evidence, review positions, exceptions and authority connected to the release they support.</p>
        </motion.header>
        <ol className="cr-workflow-list">
          {workflowSteps.map(([number, title, copy], index) => (
            <motion.li key={number} {...reveal}>
              <div className="cr-step-marker"><span>{number}</span>{index < workflowSteps.length - 1 && <i />}</div>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function DecisionPackage() {
  return (
    <section className="cr-package" aria-labelledby="cr-package-title">
      <div className="cr-shell cr-package-layout">
        <motion.div className="cr-package-copy" {...reveal}>
          <span className="cr-section-eyebrow">The decision basis</span>
          <h2 id="cr-package-title">One release context. Not another system of record.</h2>
          <p>Axis One sits around the capital decision. It makes the current position reviewable while source documents, financial records and project data remain in their approved operating systems.</p>
          <ul>
            <li><Link2 size={17} aria-hidden="true" /><span><strong>Evidence stays attributable.</strong> Source, owner, version and review position remain visible.</span></li>
            <li><CircleAlert size={17} aria-hidden="true" /><span><strong>Exceptions stay attached.</strong> Missing or disputed inputs remain part of the decision context.</span></li>
            <li><Gavel size={17} aria-hidden="true" /><span><strong>Readiness stays separate from authority.</strong> Axis One shows the basis; authorised people decide.</span></li>
            <li><Download size={17} aria-hidden="true" /><span><strong>The record travels.</strong> Export the decision package for the authorised stakeholders and review process.</span></li>
          </ul>
        </motion.div>

        <motion.div className="cr-package-preview" {...reveal} aria-label="Illustrative decision package summary">
          <div className="cr-package-head">
            <div><span>Decision package</span><strong>Milestone · Operational readiness</strong></div>
            <span className="cr-package-version">v1.4</span>
          </div>
          <div className="cr-package-progress"><i /><span>Review position</span><strong>3 / 4 complete</strong></div>
          <div className="cr-package-table">
            <div className="is-complete"><Check size={14} aria-hidden="true" /><span>Operating milestone evidence</span><strong>Current</strong></div>
            <div className="is-complete"><Check size={14} aria-hidden="true" /><span>Financial condition review</span><strong>Accepted</strong></div>
            <div className="is-open"><Clock3 size={14} aria-hidden="true" /><span>Independent validation</span><strong>Awaiting</strong></div>
            <div className="is-complete"><Check size={14} aria-hidden="true" /><span>Decision authority</span><strong>Confirmed</strong></div>
          </div>
          <div className="cr-package-footer">
            <Database size={15} aria-hidden="true" />
            <span>Sources and review positions retained</span>
            <small>Illustrative public example</small>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PilotSection({ onOpenPilot }: { onOpenPilot: (source: string) => void }) {
  const scope = ['One live portfolio investment', 'One portfolio company', 'One defined capital allocation', 'One live milestone Gate', 'One lead investor team, with up to three participants', 'Up to two assigned validators'];
  const measures = ['Time required to prepare the decision', 'Missing evidence identified before the decision', 'Exceptions and rework recorded', 'Hours spent reconstructing decision context', 'Work completed outside the governed workflow', 'Completeness of the exported decision package'];
  return (
    <section className="cr-pilot" id="pilot" aria-labelledby="cr-pilot-title">
      <div className="cr-shell">
        <motion.div className="cr-pilot-intro" {...reveal}>
          <span className="cr-section-eyebrow">Paid private pilot</span>
          <h2 id="cr-pilot-title">Test Axis One on one live capital decision.</h2>
          <p>The pilot follows one live milestone decision from preparation through authorised outcome, typically over eight to twelve weeks. It runs against a live decision, not a synthetic demonstration.</p>
          <button className="cr-primary-button" type="button" onClick={() => onOpenPilot('capital_release_pilot_section')}>Discuss pilot fit <ArrowRight size={16} aria-hidden="true" /></button>
          <small>Commercial scope is agreed after a fit discussion. No confidential information is required in the first enquiry.</small>
        </motion.div>
        <div className="cr-pilot-panels">
          <motion.article {...reveal}>
            <div className="cr-pilot-panel-head"><Workflow size={20} aria-hidden="true" /><span>Defined scope</span></div>
            <ul>{scope.map((item) => <li key={item}><Check size={14} aria-hidden="true" />{item}</li>)}</ul>
          </motion.article>
          <motion.article {...reveal}>
            <div className="cr-pilot-panel-head"><FileCheck2 size={20} aria-hidden="true" /><span>What the pilot measures</span></div>
            <ul>{measures.map((item) => <li key={item}><Check size={14} aria-hidden="true" />{item}</li>)}</ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

function Boundaries() {
  const boundaries = [
    [LockKeyhole, 'Non-custodial', 'Axis One does not hold, transfer, settle or manage client capital.'],
    [Users, 'Human authority', 'Authorised stakeholders retain investment and release judgement.'],
    [ShieldCheck, 'Evidence-aware', 'Attribution and review are recorded; evidence is not declared true merely because it was uploaded.'],
    [Database, 'Source-system respectful', 'Axis One complements rather than replaces underlying legal, financial and operating records.'],
  ];
  return (
    <section className="cr-boundaries" aria-labelledby="cr-boundaries-title">
      <div className="cr-shell">
        <motion.header className="cr-section-heading" {...reveal}>
          <span className="cr-section-eyebrow">Clear operating boundaries</span>
          <h2 id="cr-boundaries-title">Decision support with authority kept explicit.</h2>
          <p>The operating model keeps platform support, human judgement and capital execution explicitly separated.</p>
        </motion.header>
        <div className="cr-boundary-grid">
          {boundaries.map(([Icon, title, copy]) => (
            <motion.article key={String(title)} {...reveal}>
              <Icon size={19} aria-hidden="true" />
              <h3>{String(title)}</h3>
              <p>{String(copy)}</p>
            </motion.article>
          ))}
        </div>
        <Link className="cr-inline-link" to="/trust">Review the full trust and governance position <ArrowRight size={15} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

function FrequentlyAskedQuestions() {
  return (
    <section className="cr-faq" aria-labelledby="cr-faq-title">
      <div className="cr-shell cr-faq-layout">
        <motion.header className="cr-section-heading" {...reveal}>
          <span className="cr-section-eyebrow">Questions before a pilot</span>
          <h2 id="cr-faq-title">What Axis One is and what it is not.</h2>
        </motion.header>
        <div className="cr-faq-list">
          {faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
        </div>
      </div>
    </section>
  );
}

function FinalCallToAction({ onOpenPilot }: { onOpenPilot: (source: string) => void }) {
  return (
    <section className="cr-final" aria-labelledby="cr-final-title">
      <div className="cr-shell cr-final-layout">
        <div>
          <span className="cr-section-eyebrow">A useful first conversation is specific</span>
          <h2 id="cr-final-title">Bring the next release decision, not a generic transformation brief.</h2>
        </div>
        <div>
          <p>Tell us which capital allocation is approaching a milestone decision, how the decision is prepared today and where the process creates friction.</p>
          <button className="cr-primary-button" type="button" onClick={() => onOpenPilot('capital_release_final_cta')}>Discuss your next release <ArrowRight size={16} aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}

function CapitalReleaseFooter() {
  return (
    <footer className="cr-footer">
      <div className="cr-shell cr-footer-layout">
        <Link className="cr-logo" to="/" aria-label="Axis One home"><Logo /></Link>
        <p>Capital governance infrastructure · Non-custodial · Human-authorised decisions</p>
        <nav aria-label="Landing page footer navigation">
          <a className="cr-linkedin-link" href="https://www.linkedin.com/company/ax1-capital/" target="_blank" rel="noopener noreferrer" aria-label="Axis One on LinkedIn, opens in a new tab"><Linkedin size={14} aria-hidden="true" />LinkedIn</a>
          <Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/disclaimer">Disclaimer</Link><Link to="/legal">Legal</Link>
        </nav>
        <span>© 2026 AX1 Structura Ltd</span>
      </div>
    </footer>
  );
}

export default function CapitalReleasePage({ onOpenContact }: PageProps) {
  const openPilot = (source: string) => {
    trackAX1Event('primary_cta_selected', { location: source, action: 'capital_release_pilot' });
    onOpenContact({ packageName: 'AX1.Pilot', source });
  };

  return (
    <div className="cr-page">
      <CapitalReleaseHeader onOpenContact={onOpenContact} />
      <main id="cr-main-content" tabIndex={-1}>
        <section className="cr-hero" aria-labelledby="cr-hero-title">
        <div className="cr-shell cr-hero-layout">
          <motion.div
            className="cr-hero-copy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="cr-eyebrow">For investment teams managing milestone-based capital</span>
            <h1 id="cr-hero-title">One clear basis for the next capital release.</h1>
            <p>Axis One brings milestone conditions, supporting evidence, approval rights and exceptions into one reviewable basis for release, conditional release, hold or stop.</p>
            <div className="cr-hero-actions">
              <button type="button" className="cr-primary-button" onClick={() => openPilot('capital_release_hero')}>
                Discuss your next release <ArrowRight size={16} aria-hidden="true" />
              </button>
              <a className="cr-secondary-button" href="#how-it-works">See the release workflow</a>
            </div>
            <div className="cr-boundary-line">
              <LockKeyhole size={15} aria-hidden="true" />
              <span>Axis One does not hold or move capital. Authorised people decide.</span>
            </div>
            <div className="cr-role-line" aria-label="Designed for">
              <span>Designed for</span>
              <strong><CheckCircle2 size={14} aria-hidden="true" /> Fund COO &amp; CFO</strong>
              <strong><CheckCircle2 size={14} aria-hidden="true" /> Investment teams</strong>
              <strong><CheckCircle2 size={14} aria-hidden="true" /> Portfolio operations</strong>
            </div>
          </motion.div>
          <ReleaseDecisionPreview />
        </div>
        </section>
        <OperatingProblem />
        <ReleaseWorkflow />
        <DecisionPackage />
        <PilotSection onOpenPilot={openPilot} />
        <Boundaries />
        <FrequentlyAskedQuestions />
        <FinalCallToAction onOpenPilot={openPilot} />
      </main>
      <CapitalReleaseFooter />
    </div>
  );
}
