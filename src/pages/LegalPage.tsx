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
        lastUpdated="30 August 2026"
        intro="Formal company, operator and legal information for the Axis One public website."
        onContact={() => onOpenContact({ source: 'legal_notice' })}
        sections={[
          {
            heading: 'Company details',
            paragraphs: [
              'AX1 Structura Ltd is a company registered in England and Wales under company number 17151320. Its registered office is 66 Paul Street, London EC2A 4NA, England.',
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
              'This notice forms part of the Axis One legal suite. If a separate written agreement is signed for a product evaluation, pilot or other engagement, that agreement governs the relevant relationship and takes precedence to the extent of any conflict.',
            ],
          },
        ]}
      />
      <Footer onOpenContact={onOpenContact} />
    </>
  );
}
