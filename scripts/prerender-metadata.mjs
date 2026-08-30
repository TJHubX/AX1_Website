import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const origin = 'https://ax1-website.pages.dev';
const pages = {
  system: {
    title: 'Axis One System | Capital Governance Infrastructure',
    description: 'See how Axis One connects execution, evidence, validation, authority and controlled capital decision states.',
  },
  capital: {
    title: 'Decision Exposure | Axis One Capital Governance',
    description: 'Model cost-overrun, delay and decision exposure while preserving human decision authority and controlled capital action.',
  },
  deployment: {
    title: 'Deployment | Axis One Capital Governance',
    description: 'Start with AX1.Pilot, then expand through AX1.Core or AX1.Enterprise after a credible operating result.',
  },
  trust: {
    title: 'Trust, Security & Governance | Axis One',
    description: 'Review Axis One product boundaries, permissioned collaboration model, attributable records and non-custodial approach.',
  },
  founder: {
    title: 'Tania Jokic, Founder | Axis One',
    description: 'Why Axis One was built to connect proven execution, stakeholder authority and governed capital decisions.',
  },
  privacy: {
    title: 'Privacy Policy | Axis One',
    description: 'How AX1 Structura Ltd handles personal information connected with the Axis One public website and enquiries.',
  },
  cookies: {
    title: 'Cookie Policy | Axis One',
    description: 'The current cookie and similar-technology position for the Axis One public website.',
  },
  terms: {
    title: 'Terms of Use | Axis One',
    description: 'Terms governing access to and use of the public Axis One website operated by AX1 Structura Ltd.',
  },
  disclaimer: {
    title: 'Website Disclaimer | Axis One',
    description: 'Important boundaries concerning Axis One website content, product descriptions, benchmarks and decision-support materials.',
  },
  legal: {
    title: 'Legal Notice | Axis One',
    description: 'Company, operator and legal information for Axis One and AX1 Structura Ltd.',
  },
  accessibility: {
    title: 'Accessibility Statement | Axis One',
    description: 'The Axis One accessibility approach, current status, supported features and feedback channel.',
  },
};

const escapeAttribute = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const template = await readFile(join('dist', 'index.html'), 'utf8');

for (const [route, metadata] of Object.entries(pages)) {
  const canonicalUrl = `${origin}/${route}`;
  const title = escapeAttribute(metadata.title);
  const description = escapeAttribute(metadata.description);
  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/, `$1${description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, `$1${canonicalUrl}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/, `$1${canonicalUrl}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*("\s*\/?>)/, `$1${description}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*("\s*\/?>)/, `$1${title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*("\s*\/?>)/, `$1${description}$2`);

  await writeFile(join('dist', `${route}.html`), html, 'utf8');
}

console.log(`Prepared route-specific metadata for ${Object.keys(pages).length} public pages.`);
