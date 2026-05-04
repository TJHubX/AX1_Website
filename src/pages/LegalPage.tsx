import React from 'react';
import { Link } from 'react-router-dom';
import { Footer, PageProps } from '../components';
import LegalPageLayout from '../components/LegalPageLayout';

export default function LegalPage({ onOpenContact }: PageProps) {
  return (
    <>
      <LegalPageLayout
        label="Legal"
        title="Legal Notice"
        lastUpdated="May 2026"
        intro="This page sets out the formal company information and legal notice for the Axis One™ website, operated by AX1™ Structura Ltd."
        sections={[
          {
            heading: 'Company details',
            paragraphs: [
              'Company name: AX1 Structura Ltd',
              'Registered office: 66 Paul Street, London EC2A 4NA, England',
              'Registered in England and Wales',
              'Company Registration No. 17151320',
            ],
          },
          {
            heading: 'Website operator',
            paragraphs: [
              'This website is operated by AX1™ Structura Ltd. Axis One™ and AX1™ are brand and product references used by AX1 Structura Ltd.',
            ],
          },
          {
            heading: 'Contact',
            paragraphs: [
              'info@ax1.network',
              'info@ax1.capital',
            ],
          },
          {
            heading: 'Intellectual property',
            paragraphs: [
              'All website content, design, copy, graphics, logos, product names, system visuals, and related materials are owned by or licensed to AX1 Structura Ltd unless otherwise stated. No right, title, or licence is granted to reproduce or use any materials without written permission.',
            ],
          },
          {
            heading: 'Regulatory note',
            paragraphs: [
              'Unless expressly stated in a separate written agreement or regulatory disclosure, AX1 Structura Ltd is not presenting itself as a bank, custodian, broker-dealer, investment adviser, payment institution, settlement provider, or regulated exchange. No part of this website should be read as such a claim.',
            ],
          },
          {
            heading: 'Legal pages',
            paragraphs: [
              'For further legal information please review the following pages.',
            ],
          },
        ]}
      />
      <div style={{ width: 'min(1280px, calc(100% - 72px))', margin: '0 auto 72px', display: 'flex', flexWrap: 'wrap' as const, gap: '10px' }}>
        {([
          ['Privacy Policy', '/privacy'],
          ['Cookie Policy', '/cookies'],
          ['Terms of Use', '/terms'],
          ['Disclaimer', '/disclaimer'],
          ['Trust', '/trust'],
          ['Accessibility', '/accessibility'],
        ] as const).map(([label, path]) => (
          <Link key={path} to={path} className="legal-nav-pill">{label}</Link>
        ))}
      </div>
      <Footer onOpenContact={onOpenContact} />
    </>
  );
}
