import React from 'react';
import { Footer, PageProps } from '../components';
import LegalPageLayout from '../components/LegalPageLayout';

export default function PrivacyPage({ onOpenContact }: PageProps) {
  return (
    <>
      <LegalPageLayout
        label="Privacy"
        title="Privacy Policy"
        lastUpdated="May 2026"
        intro="This Privacy Policy explains how AX1 Structura Ltd collects, uses, stores, and protects personal information submitted through the Axis One website, request-access forms, contact channels, and related pre-launch communications."
        sections={[
          {
            heading: '1. Who we are',
            paragraphs: [
              'AX1 Structura Ltd',
              '66 Paul Street, London EC2A 4NA, England',
              'Registered in England and Wales',
              'Company Registration No. 17151320',
            ],
          },
          {
            heading: '2. Information we collect',
            paragraphs: [
              'When you engage with Axis One through the website and request-access flow, AX1 Structura Ltd may collect the following information.',
            ],
            bullets: [
              'Full name',
              'Work email',
              'Organization',
              'Role or inquiry context, if provided',
              'Industry',
              'Project value range',
              'Brief intent or deployment scope',
              'Communication preferences',
              'Technical information such as browser, device, IP address, and website usage data if analytics are enabled',
            ],
          },
          {
            heading: '3. How we use information',
            paragraphs: [
              'AX1 Structura Ltd may use submitted information to support the website and pre-launch communication process.',
            ],
            bullets: [
              'Respond to inquiries',
              'Evaluate request-access submissions',
              'Arrange demos or pre-launch communications',
              'Improve website and product messaging',
              'Maintain security and abuse prevention',
              'Comply with legal obligations',
            ],
          },
          {
            heading: '4. Legal basis / lawful grounds',
            paragraphs: [
              'Where applicable, AX1 Structura Ltd relies on legitimate interests, consent where required, pre-contractual steps, and legal obligations as lawful grounds for processing personal information.',
            ],
          },
          {
            heading: '5. Sharing of information',
            paragraphs: [
              'AX1 Structura Ltd may share information with service providers supporting hosting, analytics, communications, CRM, email, or security functions. AX1 Structura Ltd does not sell personal data.',
            ],
          },
          {
            heading: '6. International transfers',
            paragraphs: [
              'Some service providers may process data outside the UK or EEA. Where required, AX1 Structura Ltd may use appropriate safeguards for international transfers.',
            ],
          },
          {
            heading: '7. Data retention',
            paragraphs: [
              'AX1 Structura Ltd retains personal data only for as long as reasonably necessary for inquiry handling, demo access, legal compliance, security, and legitimate business purposes.',
            ],
          },
          {
            heading: '8. Security',
            paragraphs: [
              'AX1 Structura Ltd applies reasonable technical and organizational measures to protect personal information. No system or transmission method can be guaranteed to be fully secure.',
            ],
          },
          {
            heading: '9. Your rights',
            paragraphs: [
              'Depending on applicable law, you may have rights regarding your personal information.',
            ],
            bullets: [
              'Access',
              'Correction',
              'Deletion',
              'Objection',
              'Restriction',
              'Portability',
              'Withdrawal of consent where applicable',
              'Complaint rights with a relevant supervisory authority',
            ],
          },
          {
            heading: '10. Cookies and analytics',
            paragraphs: [
              'For information about cookies and related technologies, please review the Cookie Policy at /cookies.',
            ],
          },
          {
            heading: '11. Use of AI-assisted services',
            paragraphs: [
              'AX1 Structura Ltd may use AI-assisted tools or LLM-connected services to support inquiry handling, product insights, user guidance, summarization, and platform interpretation features. Where such tools are used, AX1 Structura Ltd aims to apply appropriate data minimization, access control, vendor review, human oversight, and security measures.',
              'Users should not submit unnecessary sensitive personal data through public website forms, request-access forms, or general inquiry channels.',
              'AI-assisted services may process information submitted through the website or platform where necessary to provide relevant interpretation, support, or product functionality, subject to applicable privacy, security, and contractual controls.',
            ],
          },
          {
            heading: '12. Contact',
            paragraphs: [
              'AX1 Structura Ltd',
              '66 Paul Street, London EC2A 4NA, England',
              'info@ax1.network',
              'info@ax1.capital',
            ],
          },
          {
            heading: '13. Changes to this policy',
            paragraphs: [
              'AX1 Structura Ltd may update this Privacy Policy from time to time to reflect legal, operational, or product changes.',
            ],
          },
        ]}
      />
      <Footer onOpenContact={onOpenContact} />
    </>
  );
}
