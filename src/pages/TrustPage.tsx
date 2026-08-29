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
        intro="AX1 is global decision infrastructure designed to support sensitive capital execution workflows through structured governance, role-based visibility, evidence traceability, and tamper-evident lifecycle records."
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
              'AX1 is designed as non-custodial decision infrastructure for governed capital execution. It does not custody investor funds. Release logic, readiness, evidence, and decision records are kept separate from capital custody and provider execution.',
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
            heading: '5. Reviewable lifecycle records',
            paragraphs: [
              'Axis One is designed to keep material execution updates, evidence, reviews and decisions connected to the relevant programme record. This supports controlled review and traceability across the capital execution lifecycle.',
            ],
          },
          {
            heading: '6. AX1 intelligence system',
            paragraphs: [
              'The AX1 intelligence system helps authorised users understand execution state, evidence coverage, unresolved commitments and decision context from the records available to them. It supports human review and does not replace the responsible decision-maker.',
            ],
          },
          {
            heading: '7. Human authority and platform boundaries',
            paragraphs: [
              'AX1 is designed to keep decision context visible while preserving human responsibility. Validators and authorised stakeholders remain responsible for their reviews and approval decisions.',
              'The public website intentionally describes outcomes and selected product context without publishing protected rules, scoring, thresholds, configuration, automation or technical architecture.',
            ],
            bullets: [
              'Human authority: Authorised stakeholders remain responsible for material decisions.',
              'Role separation: Visibility and actions follow the participant\'s responsibility.',
              'Traceable context: Material outputs can remain connected to the underlying programme record.',
              'Data minimisation: Public enquiries should not contain unnecessary confidential information.',
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
