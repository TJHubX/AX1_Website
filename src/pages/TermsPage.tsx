import React from 'react';
import type { PageProps } from '../components';
import { Footer } from '../components';
import LegalPageLayout from '../components/LegalPageLayout';

export default function TermsPage({ onOpenContact }: PageProps) {
  return (
    <>
      <LegalPageLayout
        label="Terms"
        title="Terms of Use"
        lastUpdated="30 August 2026"
        intro="These terms govern access to and use of the public Axis One website. They do not replace any separate written product or commercial agreement."
        onContact={() => onOpenContact({ source: 'terms_of_use' })}
        sections={[
          {
            heading: 'Website operator and acceptance',
            paragraphs: [
              'This website is operated by AX1 Structura Ltd, registered in England and Wales under company number 17151320. By using the website, you agree to these Terms of Use. If you do not agree, please do not use the website.',
            ],
          },
          {
            heading: 'Informational purpose',
            paragraphs: [
              'The website provides general information about Axis One, its intended product architecture and related capital-governance concepts. Content is not financial, investment, legal, tax, accounting, regulatory or other professional advice.',
            ],
          },
          {
            heading: 'Decision Briefs and enquiries',
            paragraphs: [
              'Decision Brief and enquiry content is generated in your browser from information you choose to enter. You are responsible for checking that content before copying or sending it and for ensuring you are authorised to share it.',
              'Sending an enquiry does not create a client relationship, guarantee a response, confirm product access or constitute acceptance of proposed commercial terms.',
            ],
          },
          {
            heading: 'Permitted use',
            paragraphs: [
              'You may view, link to and quote limited portions of the public website for lawful informational purposes with clear attribution. Standard search and AI crawlers may access public pages in accordance with robots.txt and applicable law.',
            ],
          },
          {
            heading: 'Prohibited use',
            paragraphs: ['You must not use the website to:'],
            bullets: [
              'Break the law, infringe rights or misrepresent your identity or affiliation',
              'Bypass access controls, probe security or attempt unauthorised access',
              'Introduce malware, disrupt availability or place unreasonable load on the service',
              'Use automated means in a way that degrades the service, bypasses controls or infringes intellectual-property rights',
              'Misuse an enquiry channel or submit information you are not authorised to disclose',
            ],
          },
          {
            heading: 'Intellectual property',
            paragraphs: [
              'Unless otherwise stated, website design, copy, graphics, marks, product names and system visuals are owned by or licensed to AX1 Structura Ltd. Except for the limited permitted use above, no licence is granted without prior written permission.',
            ],
          },
          {
            heading: 'Third-party material and links',
            paragraphs: [
              'The website may cite independent research or link to third-party services. References are provided for context and attribution. AX1 Structura Ltd does not control and is not responsible for third-party content, availability or practices.',
            ],
          },
          {
            heading: 'Accuracy, availability and change',
            paragraphs: [
              'We aim to keep public information clear and current, but do not guarantee that every item is complete, error-free or continuously available. We may update, suspend or withdraw website content without notice.',
            ],
          },
          {
            heading: 'Liability',
            paragraphs: [
              'Nothing in these terms excludes liability that cannot lawfully be excluded. Subject to that limitation, AX1 Structura Ltd is not liable for indirect or consequential loss arising solely from reliance on the public website, or for loss caused by third-party services outside its control.',
            ],
          },
          {
            heading: 'Governing law and changes',
            paragraphs: [
              'These terms are governed by the laws of England and Wales, and the courts of England and Wales have exclusive jurisdiction. We may update these terms from time to time; the current version and effective date will remain available here.',
            ],
          },
        ]}
      />
      <Footer onOpenContact={onOpenContact} />
    </>
  );
}
