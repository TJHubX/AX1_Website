export type PageMetadata = {
  title: string;
  description: string;
  robots?: string;
};

export const PAGE_METADATA: Record<string, PageMetadata> = {
  '/': {
    title: 'Axis One | Capital Governance Infrastructure',
    description: 'Axis One connects committed capital to verified milestones, attributable evidence and controlled decision states.',
  },
  '/system': {
    title: 'Axis One System | Capital Governance Infrastructure',
    description: 'See how Axis One connects execution, evidence, validation, authority and controlled capital decision states.',
  },
  '/capital': {
    title: 'Decision Exposure | Axis One Capital Governance',
    description: 'Model cost-overrun, delay and decision exposure while preserving human decision authority and controlled capital action.',
  },
  '/release-pilot': {
    title: 'Capital Release Pilot | Axis One',
    description: 'Bring milestone conditions, supporting evidence, approval rights and exceptions into one reviewable basis for release, conditional release, hold or stop with Axis One.',
    robots: 'noindex, follow',
  },
  '/deployment': {
    title: 'Deployment | Axis One Capital Governance',
    description: 'Begin with the capital decision that matters most, then extend the governed operating model through AX1.Core or AX1.Enterprise.',
  },
  '/trust': {
    title: 'Trust, Security & Governance | Axis One',
    description: 'Review Axis One product boundaries, permissioned collaboration model, attributable records and non-custodial approach.',
  },
  '/founder': {
    title: 'Tania Jokic, Founder | Axis One',
    description: 'Why Axis One was built to connect current execution, attributable evidence and authorised capital decisions.',
  },
  '/privacy': {
    title: 'Privacy Policy | Axis One',
    description: 'How AX1 Structura Ltd handles personal information connected with the Axis One public website and enquiries.',
  },
  '/cookies': {
    title: 'Cookie Policy | Axis One',
    description: 'The current cookie and similar-technology position for the Axis One public website.',
  },
  '/terms': {
    title: 'Terms of Use | Axis One',
    description: 'Terms governing access to and use of the public Axis One website operated by AX1 Structura Ltd.',
  },
  '/disclaimer': {
    title: 'Website Disclaimer | Axis One',
    description: 'Important boundaries concerning Axis One website content, product descriptions, benchmarks and decision-support materials.',
  },
  '/legal': {
    title: 'Legal Notice | Axis One',
    description: 'Company, operator and legal information for Axis One and AX1 Structura Ltd.',
  },
  '/accessibility': {
    title: 'Accessibility Statement | Axis One',
    description: 'The Axis One accessibility approach, current status, supported features and feedback channel.',
  },
};

export const NOT_FOUND_METADATA: PageMetadata = {
  title: 'Page not found | Axis One',
  description: 'The requested Axis One page could not be found.',
};

export const PUBLIC_PATHS = Object.keys(PAGE_METADATA);

export function normalizePath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}
