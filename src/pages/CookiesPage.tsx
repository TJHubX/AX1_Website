import React from 'react';
import { Footer, PageProps } from '../components';
import LegalPageLayout from '../components/LegalPageLayout';

export default function CookiesPage({ onOpenContact }: PageProps) {
  return (
    <>
      <LegalPageLayout
        label="Cookies"
        title="Cookie Policy"
        lastUpdated="May 2026"
        intro="This Cookie Policy explains how AX1 Structura Ltd may use cookies and similar technologies on the Axis One website."
        sections={[
          {
            heading: '1. What cookies are',
            paragraphs: [
              'Cookies are small text files placed on your device when you visit a website. They are widely used to make websites function correctly, improve performance, and provide information to the website operator.',
            ],
          },
          {
            heading: '2. Types of cookies we may use',
            paragraphs: [
              'The Axis One website may use the following categories of cookies.',
            ],
            bullets: [
              'Strictly necessary cookies — required for the website to function correctly',
              'Preference cookies — remember choices you make to improve your experience',
              'Analytics cookies — help understand how visitors use the website',
              'Embedded content cookies — may be set by third-party embeds such as fonts or video',
            ],
          },
          {
            heading: '3. Strictly necessary cookies',
            paragraphs: [
              'These cookies support core website functionality and security. They do not require consent and cannot be disabled without affecting how the website operates.',
            ],
          },
          {
            heading: '4. Analytics cookies',
            paragraphs: [
              'The Axis One website may introduce privacy-conscious analytics in the future. Any non-essential analytics cookies will be handled in accordance with applicable consent requirements and will be disclosed in an updated version of this policy.',
            ],
          },
          {
            heading: '5. Marketing cookies',
            paragraphs: [
              'AX1 Structura Ltd does not currently rely on advertising or marketing cookies for the basic request-access flow. If this changes, this policy and any consent controls will be updated accordingly.',
            ],
          },
          {
            heading: '6. Managing cookies',
            paragraphs: [
              'You can control or delete cookies through your browser settings. Most browsers allow you to refuse new cookies, delete existing cookies, or be notified when a new cookie is placed.',
              'Please note that disabling certain cookies may affect the functionality of the Axis One website.',
            ],
          },
          {
            heading: '7. Updates',
            paragraphs: [
              'AX1 Structura Ltd may update this Cookie Policy from time to time to reflect changes in technology, legal requirements, or the way the website operates.',
            ],
          },
          {
            heading: '8. Contact',
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
