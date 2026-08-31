import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { chromium } from '@playwright/test';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const fontPath = path.join(
  projectRoot,
  'node_modules',
  '@fontsource-variable',
  'inter',
  'files',
  'inter-latin-wght-normal.woff2',
);
const logoPath = path.join(projectRoot, 'src', 'assets', 'ax1-logo.svg');
const outputPath = path.join(projectRoot, 'public', 'og.png');

const [fontBuffer, logoSource] = await Promise.all([
  readFile(fontPath),
  readFile(logoPath, 'utf8'),
]);

const fontData = fontBuffer.toString('base64');
const whiteLogo = logoSource
  .replace(/<\?xml[^>]*>/g, '')
  .replaceAll('#2B63C5', '#F4F7FC')
  .replace('role="img" aria-label="AX1"', 'aria-hidden="true"');

const html = String.raw`<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face {
        font-family: Inter;
        src: url(data:font/woff2;base64,${fontData}) format('woff2');
        font-style: normal;
        font-weight: 100 900;
        font-display: block;
      }

      * { box-sizing: border-box; }

      html, body {
        width: 1200px;
        height: 630px;
        margin: 0;
        overflow: hidden;
      }

      body {
        font-family: Inter, Arial, sans-serif;
        color: #f4f7fc;
        background:
          radial-gradient(circle at 82% 38%, rgba(43, 99, 197, 0.18), transparent 32%),
          linear-gradient(135deg, #07111f 0%, #091525 58%, #0b192c 100%);
      }

      .frame {
        position: relative;
        display: grid;
        grid-template-columns: minmax(0, 1fr) 362px;
        gap: 64px;
        width: 100%;
        height: 100%;
        padding: 64px 70px 58px;
      }

      .frame::before {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0.13;
        background-image:
          linear-gradient(rgba(111, 145, 199, 0.28) 1px, transparent 1px),
          linear-gradient(90deg, rgba(111, 145, 199, 0.28) 1px, transparent 1px);
        background-size: 48px 48px;
        mask-image: linear-gradient(to right, transparent, black 52%, black);
      }

      .content, .system-card { position: relative; z-index: 1; }

      .content {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      .eyebrow {
        display: flex;
        align-items: center;
        gap: 11px;
        color: #79a9ff;
        font-size: 14px;
        font-weight: 720;
        letter-spacing: 0.17em;
        line-height: 1;
        text-transform: uppercase;
      }

      .eyebrow::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #3f82fa;
        box-shadow: 0 0 0 6px rgba(63, 130, 250, 0.12);
      }

      h1 {
        margin: 38px 0 0;
        max-width: 680px;
        font-size: 69px;
        font-weight: 690;
        letter-spacing: -0.058em;
        line-height: 0.97;
      }

      h1 span { display: block; }

      .support {
        margin: auto 0 0;
        padding-top: 36px;
        border-top: 1px solid rgba(116, 151, 207, 0.26);
        color: #aebdd3;
        font-size: 16px;
        font-weight: 470;
        letter-spacing: 0.012em;
      }

      .system-card {
        align-self: stretch;
        display: flex;
        flex-direction: column;
        padding: 30px 30px 28px;
        border: 1px solid rgba(112, 151, 214, 0.36);
        border-radius: 22px;
        background: linear-gradient(160deg, rgba(18, 38, 67, 0.95), rgba(10, 25, 45, 0.9));
        box-shadow: 0 26px 70px rgba(0, 0, 0, 0.3);
      }

      .logo {
        width: 148px;
        height: auto;
      }

      .position {
        margin-top: 54px;
        color: #7395c8;
        font-size: 11px;
        font-weight: 760;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      .trace {
        display: grid;
        grid-template-columns: 80px 1fr;
        align-items: center;
        gap: 18px;
        margin-top: 22px;
      }

      .trace-label {
        color: #d8e1ef;
        font-size: 12px;
        font-weight: 640;
        letter-spacing: 0.07em;
        text-transform: uppercase;
      }

      .line {
        position: relative;
        height: 1px;
        background: rgba(113, 152, 211, 0.36);
      }

      .line::after {
        content: '';
        position: absolute;
        top: 50%;
        right: var(--node);
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #4386fb;
        box-shadow: 0 0 0 6px rgba(67, 134, 251, 0.12);
        transform: translate(50%, -50%);
      }

      .decision {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: auto;
        padding-top: 28px;
        border-top: 1px solid rgba(116, 151, 207, 0.26);
      }

      .decision-label {
        color: #7698cb;
        font-size: 11px;
        font-weight: 760;
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }

      .decision-value {
        color: #f4f7fc;
        font-size: 16px;
        font-weight: 680;
      }

      .site {
        position: absolute;
        right: 70px;
        bottom: 28px;
        z-index: 2;
        color: #6883ac;
        font-size: 12px;
        font-weight: 650;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>
    <main class="frame">
      <section class="content">
        <div class="eyebrow">Capital governance infrastructure</div>
        <h1>
          <span>Evidence informs.</span>
          <span>People decide.</span>
          <span>Capital follows.</span>
        </h1>
        <p class="support">Current execution. Attributable evidence. Explicit authority.</p>
      </section>

      <aside class="system-card" aria-hidden="true">
        <div class="logo">${whiteLogo}</div>
        <div class="position">Decision basis</div>
        <div class="trace">
          <span class="trace-label">Execution</span>
          <span class="line" style="--node: 72%"></span>
        </div>
        <div class="trace">
          <span class="trace-label">Evidence</span>
          <span class="line" style="--node: 44%"></span>
        </div>
        <div class="trace">
          <span class="trace-label">Authority</span>
          <span class="line" style="--node: 16%"></span>
        </div>
        <div class="decision">
          <span class="decision-label">Decision state</span>
          <span class="decision-value">Current</span>
        </div>
      </aside>

      <div class="site">ax1.capital</div>
    </main>
  </body>
</html>`;

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => globalThis.document.fonts.ready);
  await page.screenshot({ path: outputPath, type: 'png' });
  console.log(`Generated ${path.relative(projectRoot, outputPath)} (1200x630).`);
} finally {
  await browser.close();
}
