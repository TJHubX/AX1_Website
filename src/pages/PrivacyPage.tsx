import React from 'react';
import { Footer, PageProps } from '../components';
import LegalPageLayout from '../components/LegalPageLayout';

export default function PrivacyPage({ onOpenContact }: PageProps) {
  return (
    <>
      <LegalPageLayout
        label="Privacy"
        title="Privacy Policy"
        lastUpdated="30 August 2026"
        intro="This policy explains how AX1 Structura Ltd handles personal information connected with the public Axis One website and enquiries. It is written to reflect the website as it operates today."
        onContact={() => onOpenContact({ source: 'privacy_policy' })}
        sections={[
          {
            heading: 'Controller and contact',
            paragraphs: [
              'AX1 Structura Ltd is the controller for personal information covered by this policy. The company is registered in England and Wales under company number 17151320, with its registered office at 66 Paul Street, London EC2A 4NA, England.',
              'Privacy questions and rights requests can be sent to info@ax1.capital.',
            ],
          },
          {
            heading: 'Information you choose to provide',
            paragraphs: [
              'The Decision Brief and enquiry experiences are prepared in your browser. Axis One does not receive those entries merely because you type them on the website. Information is sent only if you choose to open your email client and send the prepared message, or contact us through another channel.',
              'An enquiry may include your name, work email, organisation, role, decision context, package interest and any other information you choose to include. Please do not include confidential, special-category or otherwise sensitive personal information unless it is necessary and you are authorised to share it.',
            ],
          },
          {
            heading: 'Website and technical information',
            paragraphs: [
              'When you visit the website, hosting and security infrastructure may process routine request information such as IP address, browser and device details, timestamps, requested pages and security events. This information is used to deliver and protect the website.',
              'Axis One does not currently deploy advertising trackers or a non-essential browser analytics service on this public website. If that position changes, this policy and the Cookie Policy will be updated before the relevant technology is used where notice or consent is required.',
            ],
          },
          {
            heading: 'Purposes and lawful bases',
            paragraphs: [
              'We use information to respond to enquiries, consider potential engagements, maintain correspondence, operate and secure the website, keep appropriate business records and meet legal obligations.',
              'Depending on the context, the lawful basis may be taking steps at your request before a contract, our legitimate interests in operating and developing the business, consent where it is specifically requested, or compliance with a legal obligation.',
            ],
          },
          {
            heading: 'Sharing and service providers',
            paragraphs: [
              'Information may be shared with service providers that support website hosting, security, business email and professional advice, but only where needed for the relevant purpose. We may also disclose information where required by law, to protect legal rights or in connection with a corporate transaction.',
              'AX1 Structura Ltd does not sell personal information.',
            ],
          },
          {
            heading: 'International transfers',
            paragraphs: [
              'Some providers may process information outside the United Kingdom. Where UK data-protection law requires it, we use an applicable adequacy decision, approved contractual safeguards or another lawful transfer mechanism.',
            ],
          },
          {
            heading: 'Retention',
            paragraphs: [
              'We keep personal information only for as long as reasonably needed for the purpose for which it was obtained, including enquiry follow-up, relationship management, security, record-keeping and legal requirements. Retention periods depend on the nature of the communication and any resulting relationship.',
            ],
          },
          {
            heading: 'Your rights',
            paragraphs: [
              'Subject to applicable law and any exemptions, you may ask for access, correction, deletion, restriction, portability or objection to processing. You may withdraw consent where processing relies on consent. You also have the right to complain to the UK Information Commissioner’s Office at ico.org.uk.',
              'We may need to verify your identity before acting on a request.',
            ],
          },
          {
            heading: 'Security and links',
            paragraphs: [
              'We use proportionate organisational and technical measures to protect personal information. No online service or transmission method can be guaranteed to be completely secure.',
              'The website may link to third-party services. Their privacy practices are governed by their own notices, not this policy.',
            ],
          },
          {
            heading: 'Changes to this policy',
            paragraphs: [
              'We may update this policy to reflect legal, operational or technical changes. The current version and effective date will remain available on this page.',
            ],
          },
        ]}
      />
      <Footer onOpenContact={onOpenContact} />
    </>
  );
}
