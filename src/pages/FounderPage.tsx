import React from 'react';
import portrait from '../assets/founder-portrait.webp';
import type { PageProps } from '../components';
import { Button, Footer } from '../components';

const operatingSignals = [
  {
    index: '01',
    title: 'Current execution was difficult to see.',
    body: 'Activity could be described, but the present delivery position was rarely held in one verifiable context.',
  },
  {
    index: '02',
    title: 'Evidence and ownership were fragmented.',
    body: 'Documents, conversations and responsibilities moved independently of the decision they were meant to support.',
  },
  {
    index: '03',
    title: 'Decision readiness depended on interpretation.',
    body: 'Decision-makers received reports, but not always a governed basis for deciding whether capital should move next.',
  },
];

const decisionBasis = [
  ['Evidence', 'Current and attributable'],
  ['Conditions', 'Evaluated consistently'],
  ['Responsibility', 'Visible in context'],
  ['Authority', 'Explicit and human'],
];

export default function FounderPage({ onOpenContact }: PageProps) {
  const openDecisionBrief = () => { window.location.href = '/#decision-brief'; };

  return (
    <main className="cg-founder-page">
      <section className="founder-editorial-hero" aria-labelledby="founder-title">
        <div className="cg-shell founder-editorial-hero-grid">
          <div className="founder-editorial-copy">
            <span className="founder-editorial-eyebrow"><i aria-hidden="true" /> Founder</span>
            <h1 id="founder-title">Built from a structural gap.</h1>
            <p className="founder-editorial-lead">Axis One emerged from a recurring operating problem where capital decisions became separated from current execution.</p>
            <blockquote>Capital can be available while decision-grade trust is not.</blockquote>
          </div>

          <figure className="founder-editorial-portrait">
            <div className="founder-editorial-portrait-frame">
              <img src={portrait} alt="Tania Jokic, Founder of Axis One" loading="eager" decoding="async" />
            </div>
            <figcaption>
              <span>Founder</span>
              <strong>Tania Jokic</strong>
              <small>AX1 Structura Ltd</small>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="founder-pattern" aria-labelledby="founder-pattern-title">
        <div className="cg-shell founder-pattern-grid">
          <header className="founder-section-heading">
            <span>What kept recurring</span>
            <h2 id="founder-pattern-title">The decision was separated from the reality of delivery.</h2>
            <p>Across investors, brokers, operators and partners, the same structural separation recurred: execution lived in one place, evidence in another and the capital decision somewhere else entirely.</p>
          </header>

          <div className="founder-pattern-list">
            {operatingSignals.map((signal) => (
              <article key={signal.index}>
                <span>{signal.index}</span>
                <div>
                  <h3>{signal.title}</h3>
                  <p>{signal.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="founder-governed-shift" aria-labelledby="founder-shift-title">
        <div className="cg-shell">
          <header className="founder-shift-heading">
            <span>The architectural shift</span>
            <h2 id="founder-shift-title">From reporting to governed evaluation.</h2>
            <p>Reporting can describe progress. Axis One was designed to keep the evidence, agreed conditions, responsibility and authority connected to the decision they support.</p>
          </header>

          <div className="founder-shift-grid">
            <blockquote>Current, attributable execution should form the basis of the next capital decision.</blockquote>

            <div className="founder-decision-basis" aria-label="Axis One decision basis">
              <div className="founder-decision-basis-head">
                <span>Decision basis</span>
                <small>Structured context</small>
              </div>
              {decisionBasis.map(([label, value], index) => (
                <div className="founder-decision-basis-row" key={label}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{label}</strong>
                  <p>{value}</p>
                </div>
              ))}
              <div className="founder-decision-basis-foot">
                <i aria-hidden="true" />
                Human authority remains explicit.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="founder-principle" aria-labelledby="founder-principle-title">
        <div className="cg-shell founder-principle-grid">
          <header className="founder-section-heading">
            <span>Design principle</span>
            <h2 id="founder-principle-title">Structured for clarity. Explicit in its boundaries.</h2>
          </header>

          <div className="founder-principle-copy">
            <p>A trustworthy governance system should evaluate agreed conditions consistently. If required evidence or validation is missing, the position remains incomplete. If the conditions are satisfied, the system can show that the decision is ready.</p>
            <p>That does not remove human judgement. It gives the authorised person a clear, attributable basis from which to decide what happens next.</p>
            <aside>
              <span>Operating boundary</span>
              <p>Axis One connects execution, evidence and decision authority. It does not hold, transfer or manage client capital, and it does not replace the authorised decision-maker.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="founder-closing" aria-labelledby="founder-closing-title">
        <div className="cg-shell founder-closing-inner">
          <span>Founder conviction</span>
          <blockquote id="founder-closing-title">Capital decisions require more than strategic intent. They require a current, attributable basis in execution.</blockquote>
          <div className="founder-closing-footer">
            <div>
              <strong>Tania Jokic</strong>
              <small>Founder, Axis One</small>
            </div>
            <div className="actions">
              <Button onClick={openDecisionBrief}>Frame a capital decision</Button>
              <Button variant="ghost" to="/system">See how Axis One works</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
