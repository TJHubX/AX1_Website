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
        lastUpdated="26 November 2026"
        intro="This policy describes the current use of cookies and similar storage and access technologies on the public Axis One website, and the controls required before any additional tracking is introduced."
        onContact={() => onOpenContact({ source: 'cookie_policy' })}
        sections={[
          {
            heading: 'Current position',
            paragraphs: [
              'Axis One has not deployed a public-website advertising or business visitor identification integration for marketing profiling or automated sales outreach. Local interface events may be generated as part of the website code; they are not currently connected by Axis One to a public-site visitor-identification or outreach system.',
              'Cloudflare may process routine technical request information and aggregate service statistics. This does not mean that Axis One identifies individual visitors or companies from their browsing activity. The Privacy Policy explains the related processing.',
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
              'Interactive interface state may exist temporarily while a page is open. Session storage may be used as a short-lived, one-time recovery guard if a website code update fails to load correctly. It is not used for a persistent marketing or analytics profile.',
            ],
          },
          {
            heading: 'External services and links',
            paragraphs: [
              'If you follow a link to another website or open your email provider, that service may use its own cookies or similar technologies. Its own policy and settings apply after you leave Axis One.',
            ],
          },
          {
            heading: 'Analytics, tracking and privacy choices',
            paragraphs: [
              'Cookies, local storage, tags, tracking pixels and other technologies can store or access information on a device. Cookie-free operation does not in itself determine whether consent or another legal requirement applies.',
              'Before introducing any additional technology, we will identify its purpose, provider, information used and relevant lifetime. Where applicable law requires consent, the technology will remain inactive until valid consent is obtained and users can refuse or withdraw that consent as easily as they can give it.',
              'If a limited statistical-measurement exception is available under applicable law, we will use it only when its conditions are met, including clear information and a simple, free means of objecting where required. We will not use a statistical-measurement exception to justify marketing visitor identification or profiling.',
              <>For information about professional communications and separate email measurement, see our <a href="/privacy">Privacy Policy</a>. This Cookie Policy does not grant permission to send or track direct marketing.</>,
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
