import React from 'react';
import type { PageProps } from '../components';
import { Footer } from '../components';
import LegalPageLayout from '../components/LegalPageLayout';

export default function LegalPage({ onOpenContact }: PageProps) {
  return (
    <>
      <LegalPageLayout
        label="Legal"
        title="Legal Notice"
        lastUpdated="26 November 2026"
        intro="Formal company, operator and legal information for the Axis One public website."
        onContact={() => onOpenContact({ source: 'legal_notice' })}
        sections={[
          {
            heading: 'Company details',
            paragraphs: [
              'AX1 Structura Ltd is a private limited company registered in England and Wales under company number 17151320. Its registered office is 66 Paul Street, London EC2A 4NA, England.',
              <>Company information is available from the official <a href="https://find-and-update.company-information.service.gov.uk/company/17151320" target="_blank" rel="noopener noreferrer">Companies House register</a>.</>,
            ],
          },
          {
            heading: 'Website and brand operator',
            paragraphs: [
              'AX1 Structura Ltd operates this website. “Axis One” and “AX1” are brand and product references used by AX1 Structura Ltd. Company and legal enquiries may be sent to info@ax1.capital.',
            ],
          },
          {
            heading: 'Intellectual property',
            paragraphs: [
              'Unless otherwise stated, website content, design, copy, graphics, marks, product names and system visuals are owned by or licensed to AX1 Structura Ltd. Independent research and third-party names remain the property of their respective owners and are identified for attribution.',
            ],
          },
          {
            heading: 'Product and regulatory boundary',
            paragraphs: [
              'Axis One is described as non-custodial capital-governance infrastructure. Unless expressly stated in a separate written agreement or regulatory disclosure, AX1 Structura Ltd is not presenting itself as a bank, custodian, broker-dealer, investment adviser, payment institution, settlement provider or regulated exchange.',
            ],
          },
          {
            heading: 'External sources and links',
            paragraphs: [
              'Where the website cites external research, the original source is identified where practical. A citation does not imply affiliation or endorsement. External websites and services operate under their own terms, privacy notices and availability.',
            ],
          },
          {
            heading: 'Order of documents',
            paragraphs: [
              'This notice forms part of the Axis One legal suite. If a separate written agreement is signed for a product evaluation, pilot or other engagement, it governs the relevant contractual relationship to the extent of any conflict, subject to applicable mandatory law and rights that cannot be waived.',
              <>Our <a href="/privacy">Privacy Policy</a> describes personal-information processing and rights, including how to object to direct marketing or raise a data-protection complaint. Nothing in a website or commercial agreement overrides statutory data-protection or electronic-communications rights.</>,
            ],
          },
        ]}
      />
      <Footer onOpenContact={onOpenContact} />
    </>
  );
}
