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
  'en-us': { lang: 'en-US', title: 'Capital, governed by execution. | Axis One', description: 'Axis One connects committed capital to verified milestones, attributable evidence, and controlled decision states—without taking custody of client capital.' },
  es: { lang: 'es', title: 'Capital, gobernado por la ejecución. | Axis One', description: 'Axis One conecta el capital comprometido con hitos verificados, evidencia atribuible y estados de decisión controlados, sin custodiar el capital del cliente.' },
  de: { lang: 'de', title: 'Kapital, gesteuert durch Ausführung. | Axis One', description: 'Axis One verbindet zugesagtes Kapital mit verifizierten Meilensteinen, zurechenbaren Nachweisen und kontrollierten Entscheidungszuständen.' },
  it: { lang: 'it', title: 'Capitale, governato dall’esecuzione. | Axis One', description: 'Axis One collega il capitale impegnato a traguardi verificati, prove attribuibili e stati decisionali controllati.' },
  pt: { lang: 'pt-PT', title: 'Capital, governado pela execução. | Axis One', description: 'A Axis One liga capital comprometido a marcos verificados, evidência atribuível e estados de decisão controlados.' },
  fr: { lang: 'fr', title: 'Le capital, gouverné par l’exécution. | Axis One', description: 'Axis One relie le capital engagé à des jalons vérifiés, des preuves attribuables et des états de décision contrôlés.' },
  cs: { lang: 'cs', title: 'Kapitál řízený skutečným plněním. | Axis One', description: 'Axis One propojuje přidělený kapitál s ověřenými milníky, přiřaditelnými důkazy a kontrolovanými rozhodnutími.' },
  hu: { lang: 'hu', title: 'A végrehajtás által irányított tőke. | Axis One', description: 'Az Axis One az elkötelezett tőkét ellenőrzött mérföldkövekhez, bizonyítékokhoz és szabályozott döntésekhez kapcsolja.' },
  sr: { lang: 'sr-Latn', title: 'Kapital kojim upravlja izvršenje. | Axis One', description: 'Axis One povezuje angažovani kapital sa potvrđenim prekretnicama, pripisivim dokazima i kontrolisanim odlukama.' },
  ar: { lang: 'ar', dir: 'rtl', title: 'رأس مال تحكمه نتائج التنفيذ. | Axis One', description: 'تربط Axis One رأس المال الملتزم به بالمراحل المتحقق منها والأدلة المنسوبة وحالات القرار المنضبطة.' },
};

const escapeAttribute = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const template = await readFile(join('dist', 'index.html'), 'utf8');
const localeAlternates = [
  ['en-GB', '/'], ['en-US', '/en-us'], ['es', '/es'], ['de', '/de'], ['it', '/it'], ['pt', '/pt'],
  ['fr', '/fr'], ['cs', '/cs'], ['hu', '/hu'], ['sr-Latn', '/sr'], ['ar', '/ar'], ['x-default', '/'],
];
const alternateMarkup = localeAlternates.map(([lang, path]) => `  <link rel="alternate" hreflang="${lang}" href="${origin}${path}" data-ax1-hreflang="true" />`).join('\n');
const withAlternates = (html) => html.replace('</head>', `${alternateMarkup}\n</head>`);

await writeFile(join('dist', 'index.html'), withAlternates(template), 'utf8');

for (const [route, metadata] of Object.entries(pages)) {
  const canonicalUrl = `${origin}/${route}`;
  const title = escapeAttribute(metadata.title);
  const description = escapeAttribute(metadata.description);
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/, `$1${description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, `$1${canonicalUrl}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/, `$1${canonicalUrl}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*("\s*\/?>)/, `$1${description}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*("\s*\/?>)/, `$1${title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*("\s*\/?>)/, `$1${description}$2`);

  if (metadata.lang) {
    html = html.replace('lang="en-GB"', `lang="${metadata.lang}"${metadata.dir ? ` dir="${metadata.dir}"` : ''}`);
    html = withAlternates(html);
  }

  await writeFile(join('dist', `${route}.html`), html, 'utf8');
}

console.log(`Prepared route-specific metadata for ${Object.keys(pages).length} public pages.`);
