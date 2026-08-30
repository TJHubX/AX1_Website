import React from 'react';
import { Footer, PageProps } from '../components';
import LegalPageLayout from '../components/LegalPageLayout';

export default function AccessibilityPage({ onOpenContact }: PageProps) {
  return (
    <>
      <LegalPageLayout
        label="Accessibility"
        title="Accessibility Statement"
        lastUpdated="30 August 2026"
        intro="AX1 Structura Ltd wants the Axis One website to be clear, operable and usable across devices, input methods and access needs. This statement describes the present position and how to report a barrier."
        onContact={() => onOpenContact({ source: 'accessibility_statement' })}
        sections={[
          {
            heading: 'Our accessibility aim',
            paragraphs: [
              'We use the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA as the target for the public website. Accessibility is treated as an ongoing product-quality requirement rather than a one-time certification exercise.',
            ],
          },
          {
            heading: 'Current status',
            paragraphs: [
              'The website has been designed with semantic structure, keyboard use, visible focus, responsive layouts, contrast and reduced motion in mind. It has not yet completed an independent accessibility audit, so AX1 Structura Ltd does not currently claim full WCAG 2.2 AA conformance.',
            ],
          },
          {
            heading: 'Features currently supported',
            paragraphs: ['The current public website includes:'],
            bullets: [
              'Keyboard-operable primary navigation, forms, buttons and modal controls',
              'A skip link to bypass repeated navigation',
              'Visible focus indicators and descriptive labels for interactive controls',
              'Responsive layouts for mobile, tablet and desktop widths',
              'Reduced-motion behaviour that follows the user’s operating-system preference',
              'Modal focus management, Escape-key dismissal and focus return',
              'Structured headings, landmarks and descriptive alternative text',
            ],
          },
          {
            heading: 'Known limitations',
            paragraphs: [
              'Some dense product illustrations and interactive calculator results may require further assistive-technology refinement. External source pages and the user’s email client are outside our control. We continue to review new and revised content as the site develops.',
            ],
          },
          {
            heading: 'Alternative access and feedback',
            paragraphs: [
              'If you cannot access information or complete an action, contact info@ax1.capital and describe the page, task and assistive technology involved where possible. You may also request the relevant information in a reasonable alternative format.',
              'We will review accessibility feedback and aim to provide an initial response within five working days.',
            ],
          },
          {
            heading: 'Assessment and review',
            paragraphs: [
              'This statement is based on internal design and code review of the current public website. It will be updated after material changes or more formal accessibility testing.',
            ],
          },
        ]}
      />
      <Footer onOpenContact={onOpenContact} />
    </>
  );
}
