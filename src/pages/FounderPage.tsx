import React from 'react';
import { motion } from 'motion/react';
import portrait from '../assets/founder-portrait.webp';
import {
  Badge, Button, FinalCTA, Footer,
  fade, PageProps,
} from '../components';

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FounderPage({ onOpenContact }: PageProps) {
  const openDecisionBrief = () => { window.location.href = '/#decision-brief'; };
  return (
    <main>
      <section className="section founder-page">
        <motion.div className="founder-story" {...fade}>
          <Badge>The Origin</Badge>
          <h1>Structural Alignment.</h1>
          <p>Axis One was not built from a product idea. It came from a problem I kept running into across capital and execution.</p>
          <p>Working closely with investors, brokers, operators and partners, and being directly involved in execution, one pattern became impossible to ignore:</p>
          <blockquote className="major-quote">Capital is available.<br /><span>Trust is not.</span></blockquote>
          <p>Strong projects were not moving forward. Not because they lacked potential, but because investors could not rely on what they were being told.</p>
          <p>Execution lived across fragmented tools, conversations, documents and assumptions, with no reliable way to verify what was actually happening.</p>
          <h3>There was no clear proof. No consistent accountability.</h3>
          <p>Decisions were made in boardrooms, often far from the reality of delivery. And when things broke, there was no system to understand where or why.</p>
          <p>At that point, it became clear this was not just an operational issue. It was a structural gap. Axis One was built to address that gap.</p>
          <div className="founder-shift"><span>The Fundamental Shift</span><h2>What if proven execution became the basis for the next capital decision?</h2><p>That is what Axis One enables: progress is evidenced, responsibility is visible, readiness is governed and authorised stakeholders act from the same execution record.</p></div>
          <div className="founder-deterministic">
            <span className="founder-det-label">Architecture Philosophy</span>
            <h3>Why readiness had to be structured and explainable.</h3>
            <p>Early in the design process, one question shaped every architectural decision: what does it mean for a system to be trustworthy, not in theory, but in practice, under real execution pressure?</p>
            <p>The answer was not better reporting. It was not more dashboards, or smarter analytics, or faster communication. Those things exist. They did not solve the problem.</p>
            <p>The problem was that outcomes depended on interpretation. Every report could be read differently. Every milestone could be framed differently. Every delay had an explanation. There was no ground truth.</p>
            <div className="founder-det-callout">
              <p>A trustworthy governance system evaluates agreed conditions consistently. If required evidence or validation is missing, the workflow remains blocked. If the conditions are satisfied, the system shows that the decision is ready, and the authorised person remains responsible for deciding what happens next.</p>
            </div>
            <p>That distinction between reporting and governed evaluation is what Axis One is built around. Evidence, validation, responsibility and authority are not loose context. They remain connected to the decision they support.</p>
            <p>This matters most when pressure is high, when relationships are strained, and when the gap between what was promised and what was delivered becomes visible. In those moments, a process built on scattered interpretation becomes difficult to defend. A structured, attributable record holds its context.</p>
            <p>That is why Axis One had to be structured and explainable. Not to remove human judgement, but to ensure that the conditions informing a capital decision are clear, agreed, attributable and visible when the decision is made.</p>
          </div>
          <p>Axis One is not another reporting layer. It is global decision infrastructure through which execution, evidence, stakeholders and capital decisions remain connected.</p>
          <blockquote className="closing-quote">“Capital needs more than a compelling strategy. It needs execution that decision-makers can trust.”</blockquote>
          <div className="actions"><Button onClick={openDecisionBrief}>Frame a Capital Decision</Button><Button variant="ghost" to="/system">See How Axis One Works</Button></div>
        </motion.div>
        <motion.div className="founder-sticky" {...fade}>
          <img src={portrait} alt="Tania Jokic, Founder & CEO" loading="eager" decoding="async" />
          <div><span>Founder & CEO</span><strong>Tania Jokic</strong><small>AX1 Structura Ltd</small></div>
        </motion.div>
      </section>
      <FinalCTA
        onOpenAccess={openDecisionBrief}
        heading="Explore the system built from this structural gap."
        subcopy="Axis One connects execution proof, decision authority and the governed record, while external providers remain responsible for custody and transfer."
        primaryLabel="Frame a Capital Decision"
        showLogo={false}
        secondaryLabel="See How Axis One Works"
        secondaryTo="/system"
      />
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
