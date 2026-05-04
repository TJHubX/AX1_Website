import React from 'react';
import { Link } from 'react-router-dom';

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

interface LegalPageLayoutProps {
  label: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

const legalNavLinks = [
  ['Privacy', '/privacy'],
  ['Cookies', '/cookies'],
  ['Terms', '/terms'],
  ['Disclaimer', '/disclaimer'],
  ['Trust', '/trust'],
  ['Legal', '/legal'],
  ['Accessibility', '/accessibility'],
] as const;

export default function LegalPageLayout({
  label,
  title,
  lastUpdated,
  intro,
  sections,
}: LegalPageLayoutProps) {
  return (
    <main className="legal-page">
      <section className="section legal-shell">
        <header className="legal-head">
          <span className="legal-eyebrow">{label}</span>
          <h1>{title}</h1>
          <p className="legal-updated">Last updated: {lastUpdated}</p>
          <p className="legal-intro">{intro}</p>
        </header>

        <nav className="legal-nav" aria-label="Legal pages">
          {legalNavLinks.map(([name, path]) => (
            <Link key={path} to={path}>{name}</Link>
          ))}
        </nav>

        <div className="legal-sections">
          {sections.map((section) => (
            <section className="legal-card" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section className="legal-contact-card" aria-label="Legal entity information">
          <h2>Legal Entity</h2>
          <p><strong>AX1 Structura Ltd</strong></p>
          <p>66 Paul Street, London EC2A 4NA, England</p>
          <p>Registered in England and Wales</p>
          <p>Company Registration No. 17151320</p>
          <p>Email: info@ax1.network | info@ax1.capital</p>
        </section>
      </section>
    </main>
  );
}
