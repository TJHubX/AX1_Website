import React from 'react';
import { Footer, PageProps } from '../components';
import LegalPageLayout from '../components/LegalPageLayout';

export default function DisclaimerPage({ onOpenContact }: PageProps) {
  return (
    <>
      <LegalPageLayout
        label="Disclaimer"
        title="Website Disclaimer"
        lastUpdated="30 August 2026"
        intro="This notice sets the boundaries around the public Axis One website, product descriptions, illustrative interfaces, calculators and independent benchmarks."
        onContact={() => onOpenContact({ source: 'website_disclaimer' })}
        sections={[
          {
            heading: 'General information only',
            paragraphs: [
              'Website content is provided for general information. It is not financial, investment, legal, tax, accounting, regulatory or other professional advice. Obtain advice appropriate to your circumstances before making a decision.',
            ],
          },
          {
            heading: 'No offer or regulated service',
            paragraphs: [
              'Nothing on this website is an offer or solicitation to buy or sell a security, an invitation to invest, or the provision of a regulated financial service. Unless expressly stated in a separate written disclosure, AX1 Structura Ltd is not presenting itself as a bank, custodian, broker-dealer, investment adviser, payment institution, settlement provider or regulated exchange.',
            ],
          },
          {
            heading: 'Non-custodial boundary',
            paragraphs: [
              'Axis One is designed as non-custodial capital-governance infrastructure. The public website does not hold, custody, transfer, settle, manage or guarantee client capital. Any capital movement would be executed by an appropriately authorised external financial provider under the relevant arrangement.',
            ],
          },
          {
            heading: 'Product and interface descriptions',
            paragraphs: [
              'References to gates, evidence, validators, release readiness, decision records and authority describe product concepts and workflows. Screens and programme states shown on the website are illustrative and are not customer data, proof of deployment or a guarantee of legal or financial outcomes.',
            ],
          },
          {
            heading: 'Calculators and estimates',
            paragraphs: [
              'Calculator outputs are directional estimates based on information entered by the user and stated assumptions. They are not valuations, forecasts, promises of savings or recommendations. Inputs, overlaps, timing and project circumstances can materially change any result.',
            ],
          },
          {
            heading: 'Independent research and benchmarks',
            paragraphs: [
              'Third-party statistics and practice benchmarks are attributed to their original sources and may cover different sectors, geographies, project types, methods and intervention scopes. They are not Axis One results, are not applied automatically to calculator outputs and do not imply affiliation, endorsement or guaranteed performance.',
            ],
          },
          {
            heading: 'Decision support and human authority',
            paragraphs: [
              'Axis One is intended to organise authorised records and present decision context. It does not autonomously approve or reject capital action, replace human judgement, make an investment decision or guarantee settlement. The responsible authorised person retains decision authority.',
            ],
          },
          {
            heading: 'Roadmap and certification statements',
            paragraphs: [
              'References to future features, launch plans or certification preparation are forward-looking and may change. Axis One does not claim SOC 2, ISO 27001 or another third-party certification unless the achievement is expressly and separately stated after independent completion.',
            ],
          },
          {
            heading: 'No guarantee of outcomes',
            paragraphs: [
              'AX1 Structura Ltd does not guarantee project success, investment returns, capital availability, settlement, the elimination of risk or any particular commercial result from use of website information or a future product deployment.',
            ],
          },
        ]}
      />
      <Footer onOpenContact={onOpenContact} />
    </>
  );
}
