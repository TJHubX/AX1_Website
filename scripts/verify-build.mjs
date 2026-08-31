import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const origin = 'https://ax1.capital';
const routes = [
  '/', '/system', '/capital', '/deployment', '/trust', '/founder',
  '/privacy', '/cookies', '/terms', '/disclaimer', '/legal', '/accessibility',
];

const routeFile = (route) => route === '/' ? join('dist', 'index.html') : join('dist', `${route.slice(1)}.html`);
const attr = (html, pattern, label) => {
  const match = html.match(pattern);
  assert.ok(match, `${label} is missing`);
  return match[1];
};

const titles = new Set();
const descriptions = new Set();

for (const route of routes) {
  const html = await readFile(routeFile(route), 'utf8');
  const canonical = route === '/' ? `${origin}/` : `${origin}${route}`;
  assert.ok(!html.includes('<div id="root"></div>'), `${route} has an empty application root`);
  assert.ok(!html.includes('server rendering errored'), `${route} contains an SSR fallback error`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${route} must have exactly one H1`);
  assert.equal((html.match(/<main\b/g) ?? []).length, 1, `${route} must have exactly one main landmark`);
  assert.equal((html.match(/<footer\b/g) ?? []).length, 1, `${route} must have exactly one footer`);
  assert.equal((html.match(/id="ax1-page-schema"/g) ?? []).length, 1, `${route} must have exactly one page schema`);
  assert.equal(attr(html, /<link rel="canonical" href="([^"]+)"/, `${route} canonical`), canonical);
  assert.match(attr(html, /<meta name="robots" content="([^"]+)"/, `${route} robots`), /^index, follow/);

  const title = attr(html, /<title>([^<]+)<\/title>/, `${route} title`);
  const description = attr(html, /<meta name="description" content="([^"]+)"/, `${route} description`);
  assert.ok(!titles.has(title), `${route} duplicates title: ${title}`);
  assert.ok(!descriptions.has(description), `${route} duplicates description: ${description}`);
  titles.add(title);
  descriptions.add(description);

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${route} contains duplicate element IDs`);
  for (const image of html.matchAll(/<img\b[^>]*>/g)) {
    assert.match(image[0], /\salt="[^"]*"/, `${route} contains an image without alt text`);
  }

  const schemaText = attr(html, /<script id="ax1-page-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/, `${route} schema`);
  const schema = JSON.parse(schemaText);
  assert.equal(schema['@id'], `${canonical}#webpage`, `${route} schema ID does not match its canonical URL`);
}

const notFound = await readFile(join('dist', '404.html'), 'utf8');
assert.equal((notFound.match(/<h1\b/g) ?? []).length, 1, '404 document must have exactly one H1');
assert.match(notFound, /<meta name="robots" content="noindex, nofollow"/);

const redirects = await readFile(join('dist', '_redirects'), 'utf8');
assert.ok(!redirects.includes('/* /index.html 200'), 'SPA catch-all would turn missing pages into soft 404s');

const headers = await readFile(join('dist', '_headers'), 'utf8');
for (const requiredHeader of ['Content-Security-Policy:', 'Permissions-Policy:', 'Strict-Transport-Security:', 'X-Content-Type-Options:']) {
  assert.ok(headers.includes(requiredHeader), `${requiredHeader} is missing from Pages headers`);
}
assert.ok(headers.includes('X-Robots-Tag: noindex, nofollow'), 'Pages preview domains must be noindex');

const sitemap = await readFile(join('dist', 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(sitemapUrls.sort(), routes.map((route) => route === '/' ? `${origin}/` : `${origin}${route}`).sort());

await stat(join('dist', 'llms.txt'));
await stat(join('dist', 'llms-full.txt'));
await stat(join('dist', 'robots.txt'));
const securityTxt = await readFile(join('dist', '.well-known', 'security.txt'), 'utf8');
assert.match(securityTxt, /^Contact: mailto:info@ax1\.capital$/m);
assert.match(securityTxt, /^Expires: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/m);
assert.match(securityTxt, /^Canonical: https:\/\/ax1\.capital\/\.well-known\/security\.txt$/m);

console.log(`Verified ${routes.length} static routes, metadata, schema, crawler and security files, headers and the 404 document.`);
