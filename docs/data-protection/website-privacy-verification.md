# Website privacy verification

Controller: AX1 Structura Ltd

Scope: public website release configuration

Verified: 31 August 2026

Verifier: technical source and browser release checks

## Result

The public website is configured as a privacy-minimised informational service. The controls below were verified in source and are protected by automated build and browser checks. This record confirms technical behaviour; it does not approve provider contracts or replace the controller decisions in the action register.

| Control | Verified position | Evidence |
| --- | --- | --- |
| Enquiry transport | Enquiry and Decision Brief content is assembled in the browser and opens a `mailto:` link only after the visitor acts. No website endpoint receives the content. | Contact, package-enquiry and Decision Brief components; browser interaction tests |
| Analytics and advertising | No analytics SDK, tag manager, advertising pixel or network submission is configured. Internal interface events are browser-only custom events and have no consumer by default. | Dependency and source inspection; Cloudflare Web Analytics recorded as disabled |
| Browser storage | No persistent marketing or analytics profile is created. Session storage is used only as a one-time recovery guard if a stale deployment chunk fails to load. | Client entry source inspection |
| Cookies | The application does not set an application cookie. Cloudflare may apply strictly necessary security or delivery measures according to its configuration. | Application source inspection and Cookie Policy |
| Server-side personal-data store | No AX1 application database, CRM submission or server-side form handler is part of the public website. | Build output and route inspection |
| Automated decision-making | The public site does not make decisions about individuals or automate capital decisions. Calculators and programme views are illustrative or directional. | Product boundary copy and source inspection |
| Search and AI files | Public crawler files contain company and product facts only; they do not contain visitor or customer information. | `robots.txt`, sitemap, `llms.txt` and `llms-full.txt` |

## Release controls

- Build verification checks every public route, canonical URL, index directive, schema block, crawler file, security-header file and real 404 document.
- Browser tests check direct loads, first-click navigation, modal keyboard behaviour, representative accessibility rules and mobile overflow.
- Cloudflare preview hosts are configured with a `noindex, nofollow` response header; the canonical public host remains `https://ax1.capital`.
- Non-essential analytics, CRM ingestion, profiling, AI processing of visitor data or persistent identifiers require a new privacy review before activation.

## Evidence limitations

The source repository cannot establish that contractual terms have been accepted, that supplier evidence has been retained, that mailbox deletion practice matches the public retention statement, or that named controller approvals have been given. Those items remain open in the controller action register until dated evidence is recorded.
