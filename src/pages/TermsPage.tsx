import React from 'react';
import { Footer, PageProps } from '../components';
import LegalPageLayout from '../components/LegalPageLayout';

export default function TermsPage({ onOpenContact }: PageProps) {
  return (
    <>
      <LegalPageLayout
        label="Terms"
        title="Terms of Use"
        lastUpdated="May 2026"
        intro="These Terms of Use govern access to and use of the public Axis One™ website operated by AX1™ Structura Ltd."
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
            heading: '2. Website use',
            paragraphs: [
              'Visitors may use the Axis One website for lawful informational and inquiry purposes only. Use of the website is subject to these Terms of Use.',
            ],
          },
          {
            heading: '3. No offer or advice',
            paragraphs: [
              'Content published on the Axis One website is for general informational purposes only. Nothing on this website constitutes or should be relied upon as financial, investment, legal, tax, regulatory, or professional advice of any kind.',
            ],
          },
          {
            heading: '4. Request access',
            paragraphs: [
              'Submitting a request-access form does not guarantee access, onboarding, demo availability, commercial terms, or acceptance by AX1 Structura Ltd. Submission is an expression of interest only.',
            ],
          },
          {
            heading: '5. Intellectual property',
            paragraphs: [
              'Website content, design, copy, graphics, AX1\u2122 marks, Axis One\u2122 branding, and related materials are owned by or licensed to AX1 Structura Ltd. No right, title, or licence is granted to reproduce or use any materials without written permission.',
            ],
          },
          {
            heading: '6. Prohibited use',
            paragraphs: [
              'When accessing or using the Axis One website you must not:',
            ],
            bullets: [
              'Use the website for any unlawful purpose',
              'Scrape, copy, or systematically extract website content',
              'Attempt to reverse engineer any part of the website or platform',
              'Probe, scan, or test the security of website systems',
              'Misuse contact or request-access forms',
              'Impersonate AX1 Structura Ltd or any individual',
              'Introduce malware, viruses, or other harmful code',
              'Infringe the intellectual property rights of AX1 Structura Ltd or others',
            ],
          },
          {
            heading: '7. Third-party links and providers',
            paragraphs: [
              'The Axis One website may reference or link to third-party providers, platforms, or services. AX1 Structura Ltd is not responsible for the content, accuracy, or practices of any third-party website or service.',
            ],
          },
          {
            heading: '8. Availability',
            paragraphs: [
              'AX1 Structura Ltd may change, pause, or discontinue the Axis One website or any part of it at any time without notice. AX1 Structura Ltd makes no guarantee of continuous, uninterrupted availability.',
            ],
          },
          {
            heading: '9. Limitation of liability',
            paragraphs: [
              'To the fullest extent permitted by applicable law, AX1 Structura Ltd excludes liability for any loss or damage arising from your use of, or inability to use, the Axis One website or its content. This includes indirect, incidental, or consequential loss.',
            ],
          },
          {
            heading: '10. Changes to terms',
            paragraphs: [
              'AX1 Structura Ltd may update these Terms of Use from time to time. Continued use of the website after any changes constitutes acceptance of the updated terms.',
            ],
          },
          {
            heading: '11. Governing law',
            paragraphs: [
              'These Terms of Use are governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.',
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
        ]}
      />
      <Footer onOpenContact={onOpenContact} />
    </>
  );
}
