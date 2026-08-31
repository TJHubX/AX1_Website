import React from 'react';
import type { PageProps } from '../components';
import { Footer } from '../components';
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
              <>Privacy questions and rights requests can be sent to <a href="mailto:info@ax1.capital?subject=Data%20protection%20request">info@ax1.capital</a>. Please use the subject “Data protection request” so it can be identified promptly.</>,
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
              'We identify a lawful basis for each purpose before using personal information. The current website and enquiry purposes are mapped as follows:',
            ],
            bullets: [
              'Responding to an enquiry and considering an engagement: taking steps at your request before entering a contract and, where appropriate, our legitimate interest in responding to relevant business enquiries.',
              'Maintaining professional correspondence and relationship records: our legitimate interest in managing business relationships and preserving an accurate record of material communications.',
              'Delivering and securing the website: our legitimate interest in operating a reliable and secure public service, and compliance with a legal obligation where a specific security or record-keeping duty applies.',
              'Establishing, exercising or defending legal rights and meeting statutory duties: compliance with a legal obligation or our legitimate interest in protecting the company’s legal position, as applicable.',
            ],
          },
          {
            heading: 'Sharing and service providers',
            paragraphs: [
              'Cloudflare supports website hosting, delivery and security. Namecheap PrivateEmail processes a message only after you choose to send it. Information may also be shared with professional advisers where needed for the relevant purpose. We require providers acting as processors to protect personal information and use it only on documented instructions.',
              'We may disclose information where required by law, where necessary to protect legal rights, or in connection with a corporate transaction subject to appropriate confidentiality and data-protection safeguards.',
              'AX1 Structura Ltd does not sell personal information.',
            ],
          },
          {
            heading: 'International transfers',
            paragraphs: [
              'Some providers may process information outside the United Kingdom. Where UK data-protection law requires it, we rely on an applicable adequacy regulation, the UK International Data Transfer Agreement or Addendum, or another permitted safeguard, together with a transfer-risk assessment where required.',
              <>You can ask for further information about the safeguard relevant to your information by emailing <a href="mailto:info@ax1.capital?subject=International%20transfer%20safeguards">info@ax1.capital</a>.</>,
            ],
          },
          {
            heading: 'Retention',
            paragraphs: [
              'Information typed into the Decision Brief or enquiry tools is not retained by Axis One unless you choose to send it. Enquiry correspondence that does not progress to an engagement is reviewed and normally deleted within 24 months of the last meaningful contact.',
              'Where an engagement or contractual relationship is established, material correspondence and business records are normally kept for the relationship and for up to six years afterwards where needed for contractual, accounting or legal purposes. Hosting and security records are retained only for the period required to operate and protect the website, according to the provider configuration and our documented retention schedule.',
              'A legal hold, active dispute or statutory requirement may justify a longer period. When information is no longer needed, it is deleted or irreversibly anonymised.',
            ],
          },
          {
            heading: 'Your rights',
            paragraphs: [
              'Subject to applicable law and any exemptions, you may ask for access to your personal information, correction, deletion, restriction, portability or an explanation of how it is used. You may also object to processing as described separately below.',
              <>Send a request to <a href="mailto:info@ax1.capital?subject=Data%20protection%20request">info@ax1.capital</a>. We respond without undue delay and normally within one calendar month. We may ask only for information reasonably needed to verify your identity or authority. You also have the right to complain to the <a href="https://ico.org.uk/make-a-complaint/data-protection-complaints/" target="_blank" rel="noopener noreferrer">UK Information Commissioner’s Office</a>.</>,
            ],
          },
          {
            heading: 'Your right to object',
            emphasis: true,
            paragraphs: [
              <>You have the right to object at any time to our use of your personal information where we rely on legitimate interests. Tell us what processing you object to by emailing <a href="mailto:info@ax1.capital?subject=Objection%20to%20processing">info@ax1.capital</a>. We will stop the relevant processing unless we can demonstrate compelling legitimate grounds that override your interests, rights and freedoms, or the information is needed to establish, exercise or defend legal claims.</>,
              'If personal information is ever used for direct marketing, you may object at any time and that use will stop. The current public website does not operate behavioural advertising or marketing profiling.',
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
