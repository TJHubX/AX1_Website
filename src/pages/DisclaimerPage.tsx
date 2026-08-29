import React from 'react';
import { Footer, PageProps } from '../components';
import LegalPageLayout from '../components/LegalPageLayout';

export default function DisclaimerPage({ onOpenContact }: PageProps) {
  return (
    <>
      <LegalPageLayout
        label="Disclaimer"
        title="Disclaimer"
        lastUpdated="May 2026"
        intro="The information on the Axis One website is provided for general informational purposes only."
        sections={[
          {
            heading: '1. No financial, investment, legal, tax, or regulatory advice',
            paragraphs: [
              'Nothing on the Axis One website should be relied upon as financial, investment, legal, tax, accounting, regulatory, or professional advice of any kind. Visitors should seek independent professional advice before making any decisions based on website content.',
            ],
          },
          {
            heading: '2. No offer or solicitation',
            paragraphs: [
              'Content published on the Axis One website does not constitute an offer to sell securities, a solicitation of investment, the provision of regulated financial services, or an invitation to enter into any transaction. No part of this website should be interpreted as such.',
            ],
          },
          {
            heading: '3. Non-custodial positioning',
            paragraphs: [
              'AX1 is described as non-custodial global decision infrastructure for governed capital execution. AX1 Structura Ltd does not hold, custody, transfer, or guarantee the movement of funds through the public website. Release logic and governance workflows are separate from capital custody and provider execution.',
            ],
          },
          {
            heading: '4. No regulated status claim',
            paragraphs: [
              'Unless expressly stated in a separate written agreement or regulatory disclosure, AX1 Structura Ltd is not presenting itself as a bank, custodian, broker-dealer, investment adviser, payment institution, settlement provider, or regulated exchange. No part of this website should be read as such a claim.',
            ],
          },
          {
            heading: '5. Platform descriptions',
            paragraphs: [
              'References to gates, release readiness, evidence, validators, decision records, and capital governance are descriptions of platform workflows and product concepts. They are not guarantees of legal, financial, or investment outcomes for any party.',
            ],
          },
          {
            heading: '6. No guarantee of outcomes',
            paragraphs: [
              'Axis One does not guarantee project success, investment returns, settlement outcomes, capital availability, or the elimination of risk. Past descriptions of use cases or workflows do not imply future results.',
            ],
          },
          {
            heading: '7. Forward-looking statements',
            paragraphs: [
              'The Axis One website may include references to roadmap items, future features, private launch timelines, certification roadmaps, or future liquidity concepts. These are subject to change without notice and should not be treated as commitments or guarantees.',
            ],
          },
          {
            heading: '8. AX1 intelligence system',
            paragraphs: [
              'The AX1 intelligence system helps authorised users understand recorded execution state, evidence coverage, unresolved commitments and decision context within the platform.',
              'Its outputs do not replace human judgement, validation, legal review, financial advice, investment advice or the authority of the responsible decision-maker. AX1 does not autonomously approve or reject capital action, move funds, guarantee settlement or make investment decisions.',
              'Platform intelligence should be understood as decision support based on the records available to the authorised user, not as a final recommendation or regulated advice.',
            ],
          },
          {
            heading: '9. Certification disclaimer',
            paragraphs: [
              'References to audit readiness, certification roadmap, or security preparation on the Axis One website do not mean AX1 Structura Ltd is currently SOC 2, ISO 27001, or otherwise certified unless expressly and separately stated.',
            ],
          },
          {
            heading: '10. Contact',
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
