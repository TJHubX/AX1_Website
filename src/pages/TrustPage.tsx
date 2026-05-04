import React from 'react';
import { Footer, PageProps } from '../components';
import LegalPageLayout from '../components/LegalPageLayout';

export default function TrustPage({ onOpenContact }: PageProps) {
  return (
    <>
      <LegalPageLayout
        label="Trust"
        title="Trust"
        lastUpdated="May 2026"
        intro="Axis One™ is designed to support sensitive capital execution workflows through structured governance, role-based visibility, evidence traceability, and tamper-evident lifecycle records."
        sections={[
          {
            heading: 'Built for audit readiness, traceability, and governed execution.',
            paragraphs: [
              'AX1 Structura Ltd has designed the Axis One platform around the principles of structured governance, scoped access, and verifiable execution records. The following sections describe key architectural commitments.',
            ],
          },
          {
            heading: '1. Non-custodial by design',
            paragraphs: [
              'Axis One is designed as a governance and execution-readiness layer. It does not custody investor funds. Release logic, readiness, evidence, and decision records are kept separate from capital custody and provider execution.',
            ],
          },
          {
            heading: '2. Role-based access',
            paragraphs: [
              'Axis One supports scoped visibility and authority so stakeholders can access the information and actions relevant to their role. Investors, operators, validators, and partners each operate within defined boundaries.',
            ],
          },
          {
            heading: '3. Evidence traceability',
            paragraphs: [
              'Milestone evidence, documents, signatures, decisions, and release conditions can remain connected to the relevant execution record. Evidence requirements are defined up front and evaluated against gate policy.',
            ],
          },
          {
            heading: '4. Audit trails',
            paragraphs: [
              'Gate evaluations, evidence updates, approvals, holds, overrides, and release-readiness changes are structured for reviewability. Decision context, timing, and outcome remain part of the execution record.',
            ],
          },
          {
            heading: '5. Tamper-evident lifecycle records',
            paragraphs: [
              'Axis One can link policy versions, evaluations, release records, settlement states, and payout events through a tamper-evident snapshot chain. This supports reviewability and traceability across the capital execution lifecycle without relying on a blockchain or immutable ledger.',
            ],
          },
          {
            heading: '6. LLM-assisted interpretation',
            paragraphs: [
              'LLM-connected interpretation can help explain readiness, evidence coverage, validator activity, and decision context within the platform. It does not replace deterministic governance logic or human decision-making. All LLM outputs are contextual guidance only.',
            ],
          },
          {
            heading: '7. AI governance readiness',
            paragraphs: [
              'AX1 Structura Ltd monitors developing AI governance frameworks, including the EU AI Act, and designs Axis One\'s AI-assisted features around transparency, human review, traceability, data minimization, and role separation between deterministic governance logic and LLM-assisted interpretation.',
              'Axis One\'s release governance is designed to remain deterministic. Gate logic, validator quorum, evidence requirements, holdbacks, readiness scoring, and release enforcement are governed by structured policy rules. LLM-connected features support explanation, summarization, review prioritization, anomaly interpretation, and capital-readiness narratives.',
              'AI-assisted interpretation is intended to help users understand what changed, what requires attention, and what context supports a review. It does not replace validators, investors, operators, legal reviewers, or authorized decision-makers.',
            ],
            bullets: [
              'Deterministic core — Release readiness follows structured policy logic.',
              'LLM-assisted interpretation — AI explains evidence, readiness, blockers, and decision context.',
              'Human review — Validators and authorized stakeholders remain responsible for approval decisions.',
              'Traceable outputs — AI-assisted narratives can be linked to underlying records and review context.',
              'AI governance roadmap — Feature classification, prompt/version records, source grounding, vendor governance, and human oversight are part of the trust model.',
            ],
          },
          {
            heading: '8. Certification roadmap',
            paragraphs: [
              'AX1 Structura Ltd is preparing the platform architecture to support future third-party security and compliance reviews. References to audit readiness or certification roadmap on this website do not mean the company is currently SOC 2 or ISO 27001 certified unless expressly and separately stated.',
            ],
          },
          {
            heading: '8. Contact',
            paragraphs: [
              'AX1 Structura Ltd',
              '66 Paul Street, London EC2A 4NA, England',
              'info@ax1.network',
              'info@ax1.capital',
            ],
          },
        ]}
      />
      <Footer onOpenContact={onOpenContact} />
    </>
  );
}
