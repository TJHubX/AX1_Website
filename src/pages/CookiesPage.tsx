import React from 'react';
import type { PageProps } from '../components';
import { Footer } from '../components';
import LegalPageLayout from '../components/LegalPageLayout';

export default function CookiesPage({ onOpenContact }: PageProps) {
  return (
    <>
      <LegalPageLayout
        label="Cookies"
        title="Cookie Policy"
        lastUpdated="30 August 2026"
        intro="This policy describes the current use of cookies and similar technologies on the public Axis One website. Axis One does not currently set non-essential analytics or advertising cookies."
        onContact={() => onOpenContact({ source: 'cookie_policy' })}
        sections={[
          {
            heading: 'Current position',
            paragraphs: [
              'The public Axis One website does not currently use advertising cookies, cross-site tracking pixels or a non-essential browser analytics provider. It does not set cookies to build marketing profiles.',
              'The Decision Brief and enquiry tools prepare information locally in your browser. Entries are not transferred to Axis One unless you choose to send them through your own email client.',
            ],
          },
          {
            heading: 'Strictly necessary technology',
            paragraphs: [
              'Website hosting, network delivery and security providers may use short-lived or equivalent technical measures where necessary to deliver pages, balance traffic, prevent abuse or protect the service. These measures are not used by Axis One for advertising.',
            ],
          },
          {
            heading: 'Local browser state',
            paragraphs: [
              'Interactive interface state may exist temporarily while a page is open. The current public site does not use localStorage or sessionStorage to create a persistent marketing or analytics profile.',
            ],
          },
          {
            heading: 'External services and links',
            paragraphs: [
              'If you follow a link to another website or open your email provider, that service may use its own cookies or similar technologies. Its own policy and settings apply after you leave Axis One.',
            ],
          },
          {
            heading: 'Future changes and consent',
            paragraphs: [
              'If Axis One introduces non-essential analytics or similar technology, this policy will be updated and an appropriate consent control will be provided before that technology is activated where required by law.',
            ],
          },
          {
            heading: 'Browser controls',
            paragraphs: [
              'Most browsers let you inspect, block and delete cookies. Blocking strictly necessary technology may affect website availability or security. Consult your browser help documentation for device-specific controls.',
            ],
          },
          {
            heading: 'Policy updates',
            paragraphs: [
              'We may revise this policy when the website, its providers or applicable requirements change. The current position and effective date will remain available on this page.',
            ],
          },
        ]}
      />
      <Footer onOpenContact={onOpenContact} />
    </>
  );
}
