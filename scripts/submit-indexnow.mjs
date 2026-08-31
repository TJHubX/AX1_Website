import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const host = 'ax1.capital';
const key = 'd0f217e6-6616-4e25-aa73-dff1403389a9';
const keyLocation = `https://${host}/${key}.txt`;
const sitemap = await readFile(join('public', 'sitemap.xml'), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>(https:\/\/ax1\.capital\/[^<]*)<\/loc>/g)].map((match) => match[1]);

if (urlList.length === 0) {
  console.warn('IndexNow notification skipped: no canonical URLs were found in public/sitemap.xml.');
  process.exit(0);
}

try {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key, keyLocation, urlList }),
  });

  if (response.ok || response.status === 202) {
    console.log(`IndexNow accepted ${urlList.length} canonical URLs (${response.status}).`);
  } else {
    const details = (await response.text()).trim();
    console.warn(`IndexNow notification returned ${response.status}${details ? `: ${details}` : '.'}`);
  }
} catch (error) {
  console.warn(`IndexNow notification could not be completed: ${error instanceof Error ? error.message : String(error)}`);
}
