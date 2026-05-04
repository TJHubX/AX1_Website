import React from 'react';
import { Footer, PageProps } from '../components';
import LegalPageLayout from '../components/LegalPageLayout';

export default function AccessibilityPage({ onOpenContact }: PageProps) {
  return (
    <>
      <LegalPageLayout
        label="Accessibility"
        title="Accessibility Statement"
        lastUpdated="May 2026"
        intro="AX1™ Structura Ltd is committed to making the Axis One™ website accessible and usable for as many people as possible."
        sections={[
          {
            heading: '1. Our approach',
            paragraphs: [
              'The Axis One website is being designed with accessibility, readability, keyboard navigation, contrast, reduced-motion support, and responsive layouts in mind. AX1 Structura Ltd treats accessibility as an ongoing commitment, not a one-time task.',
            ],
          },
          {
            heading: '2. Current status',
            paragraphs: [
              'We are actively improving the website and aim to align with recognised accessibility best practices over time. We do not currently claim full WCAG 2.1 AA compliance, as formal testing is ongoing.',
            ],
          },
          {
            heading: '3. Features we support or are working toward',
            paragraphs: [
              'The following features are implemented or actively being developed across the Axis One website.',
            ],
            bullets: [
              'Keyboard-accessible navigation throughout the site',
              'Visible focus states on interactive elements',
              'Responsive layouts that adapt to different screen sizes and orientations',
              'Readable colour contrast ratios for body text and interface elements',
              'Reduced-motion support via prefers-reduced-motion media query',
              'Accessible modal behaviour including focus trapping and Escape key dismissal',
              'Semantic headings and descriptive link text',
            ],
          },
          {
            heading: '4. Known limitations',
            paragraphs: [
              'There may be areas of the website that are still being improved, particularly as new content and features are added during the pre-launch phase. We welcome feedback to help us identify and address any issues.',
            ],
          },
          {
            heading: '5. Feedback',
            paragraphs: [
              'If you experience difficulty accessing any part of the Axis One website or have suggestions for improvement, please contact us. We will review all accessibility feedback and aim to respond in a timely manner.',
              'AX1 Structura Ltd',
              '66 Paul Street, London EC2A 4NA, England',
              'info@ax1.network',
              'info@ax1.capital',
            ],
          },
          {
            heading: '6. Updates',
            paragraphs: [
              'This Accessibility Statement may be updated as the Axis One website improves and as accessibility testing progresses.',
            ],
          },
        ]}
      />
      <Footer onOpenContact={onOpenContact} />
    </>
  );
}
