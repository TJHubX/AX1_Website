import React from 'react';
import { motion } from 'motion/react';
import portrait from '../assets/founder-portrait.png';
import {
  Badge, Button, FinalCTA, Footer,
  fade, PageProps,
} from '../components';

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FounderPage({ onOpenAccess, onOpenContact }: PageProps) {
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
          <div className="founder-shift"><span>The Fundamental Shift</span><h2>What if execution itself could control how capital is released?</h2><p>That is what Axis One enables: a system where progress is not just reported, but evidenced; where risk is not assumed, but structured; where capital is released based on what is actually delivered.</p></div>
          <div className="founder-deterministic">
            <span className="founder-det-label">Architecture Philosophy</span>
            <h3>Why the system had to be deterministic.</h3>
            <p>Early in the design process, one question shaped every architectural decision: what does it mean for a system to be trustworthy — not in theory, but in practice, under real execution pressure?</p>
            <p>The answer was not better reporting. It was not more dashboards, or smarter analytics, or faster communication. Those things exist. They did not solve the problem.</p>
            <p>The problem was that outcomes depended on interpretation. Every report could be read differently. Every milestone could be framed differently. Every delay had an explanation. There was no ground truth.</p>
            <div className="founder-det-callout">
              <p>A deterministic system does not interpret. It evaluates. If the conditions are satisfied, the outcome follows. If they are not, it does not. The decision is not made by a person in the moment — it is made by the policy that was agreed in advance.</p>
            </div>
            <p>That distinction — between interpretation and evaluation — is what Axis One is built around. Gates are not checkpoints to be negotiated. Evidence is not documentation to be submitted. Validation is not a formality to be completed. Each element is a structural condition with a defined outcome.</p>
            <p>This matters most when pressure is high, when relationships are strained, and when the gap between what was promised and what was delivered becomes visible. In those moments, a system that relies on human judgement tends to collapse. A system built on structured conditions holds its shape.</p>
            <p>That is why Axis One had to be deterministic. Not to remove human involvement from execution — but to ensure that the conditions governing release are clear, agreed, and enforced by the system rather than negotiated in the moment.</p>
          </div>
          <p>Axis One is not another tool added on top of workflows. It sits at the core, shaping how capital and execution interact.</p>
          <blockquote className="closing-quote">"Because in the end, capital does not fail because of strategy. It fails when execution cannot be trusted."</blockquote>
          <div className="actions"><Button onClick={onOpenAccess}>Request Access</Button><Button variant="ghost" to="/system">View System</Button></div>
        </motion.div>
        <motion.div className="founder-sticky" {...fade}>
          <img src={portrait} alt="Tania Jokic, Founder & CEO" />
          <div><span>Founder & CEO</span><strong>Tania Jokic</strong><small>Axis One Alpha</small></div>
        </motion.div>
      </section>
      <FinalCTA
        onOpenAccess={onOpenAccess}
        heading="Explore the system built from this structural gap."
        subcopy="Axis One is not a reporting layer. It is the structure that governs how capital moves."
        showLogo={false}
        secondaryLabel="Explore System"
        secondaryTo="/system"
      />
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
