import { createReadStream } from 'node:fs';
import { access, readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, isAbsolute, join, normalize, relative, resolve } from 'node:path';

const root = resolve('dist');
const port = Number(process.env.PORT || 4173);
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};

const legacyLocale = /^\/(?:en-us|es|de|it|pt|fr|cs|hu|sr|ar)(?:\/|$)/;

async function existingFile(pathname) {
  const requestedPath = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
  const candidates = extname(requestedPath) ? [requestedPath] : [`${requestedPath}.html`, requestedPath];
  for (const candidate of candidates) {
    const fullPath = resolve(root, normalize(candidate));
    const relativePath = relative(root, fullPath);
    if (relativePath.startsWith('..') || isAbsolute(relativePath)) return null;
    try {
      await access(fullPath);
      return fullPath;
    } catch {
      // Try the next static-path candidate.
    }
  }
  return null;
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  if (legacyLocale.test(url.pathname)) {
    response.writeHead(301, { Location: '/' });
    response.end();
    return;
  }

  const path = await existingFile(decodeURIComponent(url.pathname));
  if (!path) {
    const body = await readFile(join(root, '404.html'));
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    if (request.method !== 'HEAD') response.end(body);
    else response.end();
    return;
  }

  response.writeHead(200, {
    'Content-Type': types[extname(path)] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  if (request.method === 'HEAD') response.end();
  else createReadStream(path).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`AX1 static test server listening on http://127.0.0.1:${port}`);
});
