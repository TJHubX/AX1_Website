# Axis One Premium Website

Premium multi-page Axis One / AX1 website built with React, TypeScript, Vite, Motion, React Router, and Lucide icons.

## Pages

- `/` — Homepage
- `/system` — Execution State Engine
- `/capital` — Capital boundary and non-custodial release logic
- `/deployment` — Deployment use cases
- `/founder` — Founder / origin story

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run lint
npm run build
```

## Cloudflare Pages deployment

Use these settings in Cloudflare Pages:

- Framework preset: None
- Build command: npm run build:cloudflare
- Build output directory: dist

SPA routing fallback is configured in public/_redirects so routes like /system, /capital, /deployment, /founder, and legal routes resolve correctly.

CLI deploy (optional):

```bash
npm install
npm run build:cloudflare
npm run deploy:cloudflare -- --project-name <your-cloudflare-pages-project>
```

## Brand notes

- Editorial copy uses **Axis One**.
- Visual logo and modules use **AX1**.
- Product modules are labeled **AX1 | Network**, **AX1 | Core**, **AX1 | Capital**, and **AX1 | Exchange**.
- Primary interactive color is the uploaded AX1 logo blue.
