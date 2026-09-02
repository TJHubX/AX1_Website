import { readFile, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const origin = 'https://ax1.capital';
const serverBundlePath = resolve('.ssr-dist', 'entry-server.js');
const serverBundle = await import(pathToFileURL(serverBundlePath).href);
const { render, PAGE_METADATA, PUBLIC_PATHS, NOT_FOUND_METADATA } = serverBundle;
const template = await readFile(join('dist', 'index.html'), 'utf8');
const productRoutes = new Set(['/', '/system', '/capital', '/release-pilot', '/deployment', '/trust']);

const escapeAttribute = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;');

function replaceAttribute(html, pattern, value) {
  return html.replace(pattern, `$1${escapeAttribute(value)}$2`);
}

function buildPageSchema(pathname, canonicalUrl, metadata) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: metadata.title,
    description: metadata.description,
    inLanguage: 'en-GB',
    isPartOf: { '@id': `${origin}/#website` },
    about: { '@id': `${origin}/#organization` },
  };

  if (productRoutes.has(pathname)) schema.mainEntity = { '@id': `${origin}/#service` };
  if (pathname !== '/' && pathname !== '/404') {
    schema.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
        { '@type': 'ListItem', position: 2, name: metadata.title.split(' | ')[0], item: canonicalUrl },
      ],
    };
  }

  return schema;
}

function prepareHtml(pathname, metadata, renderedMarkup, robots = 'index, follow, max-image-preview:large') {
  const canonicalUrl = pathname === '/' ? `${origin}/` : `${origin}${pathname}`;
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttribute(metadata.title)}</title>`)
    .replace('<div id="root"></div>', `<div id="root">${renderedMarkup}</div>`);

  html = replaceAttribute(html, /(<meta name="description" content=")[^"]*("\s*\/?>)/, metadata.description);
  html = replaceAttribute(html, /(<meta name="robots" content=")[^"]*("\s*\/?>)/, robots);
  html = replaceAttribute(html, /(<link rel="canonical" href=")[^"]*("\s*\/?>)/, canonicalUrl);
  html = replaceAttribute(html, /(<meta property="og:url" content=")[^"]*("\s*\/?>)/, canonicalUrl);
  html = replaceAttribute(html, /(<meta property="og:title" content=")[^"]*("\s*\/?>)/, metadata.title);
  html = replaceAttribute(html, /(<meta property="og:description" content=")[^"]*("\s*\/?>)/, metadata.description);
  html = replaceAttribute(html, /(<meta name="twitter:title" content=")[^"]*("\s*\/?>)/, metadata.title);
  html = replaceAttribute(html, /(<meta name="twitter:description" content=")[^"]*("\s*\/?>)/, metadata.description);

  const schema = buildPageSchema(pathname, canonicalUrl, metadata);
  const serializedSchema = JSON.stringify(schema).replaceAll('<', '\\u003c');
  return html.replace('</head>', `  <script id="ax1-page-schema" type="application/ld+json">${serializedSchema}</script>\n</head>`);
}

try {
  for (const pathname of PUBLIC_PATHS) {
    const metadata = PAGE_METADATA[pathname];
    const markup = render(pathname);
    const outputPath = pathname === '/' ? join('dist', 'index.html') : join('dist', `${pathname.slice(1)}.html`);
    await writeFile(outputPath, prepareHtml(pathname, metadata, markup, metadata.robots), 'utf8');
  }

  const notFoundMarkup = render('/404');
  await writeFile(
    join('dist', '404.html'),
    prepareHtml('/404', NOT_FOUND_METADATA, notFoundMarkup, 'noindex, nofollow'),
    'utf8',
  );

  console.log(`Statically rendered ${PUBLIC_PATHS.length} public pages and a real 404 document.`);
} finally {
  await rm(resolve('.ssr-dist'), { recursive: true, force: true });
}
