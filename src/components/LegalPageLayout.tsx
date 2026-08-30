import React from 'react';
import { ArrowRight, Building2, FileText, Mail, ShieldCheck } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

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
  onContact: () => void;
}

const legalNavLinks = [
  ['Privacy', '/privacy'],
  ['Cookies', '/cookies'],
  ['Terms', '/terms'],
  ['Disclaimer', '/disclaimer'],
  ['Legal', '/legal'],
  ['Accessibility', '/accessibility'],
] as const;

const sectionId = (heading: string, index: number) => {
  const slug = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `section-${String(index + 1).padStart(2, '0')}-${slug}`;
};

export default function LegalPageLayout({
  label,
  title,
  lastUpdated,
  intro,
  sections,
  onContact,
}: LegalPageLayoutProps) {
  return (
    <main className="legal-page">
      <section className="legal-hero" aria-labelledby="legal-title">
        <div className="cg-shell legal-hero-grid">
          <div className="legal-hero-copy">
            <span className="legal-eyebrow"><ShieldCheck size={14} aria-hidden="true" /> Legal / {label}</span>
            <h1 id="legal-title">{title}</h1>
            <p>{intro}</p>
          </div>
          <aside className="legal-hero-meta" aria-label="Document information">
            <div><FileText size={17} aria-hidden="true" /><span>Public website document</span></div>
            <dl>
              <div><dt>Operator</dt><dd>AX1 Structura Ltd</dd></div>
              <div><dt>Updated</dt><dd>{lastUpdated}</dd></div>
              <div><dt>Jurisdiction</dt><dd>England and Wales</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <nav className="legal-suite-nav" aria-label="Legal document suite">
        <div className="cg-shell legal-suite-nav-inner">
          <span>Legal suite</span>
          <div>
            {legalNavLinks.map(([name, path]) => (
              <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'is-active' : undefined}>{name}</NavLink>
            ))}
          </div>
        </div>
      </nav>

      <section className="legal-document">
        <div className="cg-shell legal-document-grid">
          <aside className="legal-document-aside">
            <div className="legal-document-guide">
              <span>In this document</span>
              <ol>
                {sections.map((section, index) => (
                  <li key={section.heading}>
                    <a href={`#${sectionId(section.heading, index)}`}>
                      <b>{String(index + 1).padStart(2, '0')}</b>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            <div className="legal-entity-summary">
              <Building2 size={17} aria-hidden="true" />
              <span>Website operator</span>
              <strong>AX1 Structura Ltd</strong>
              <p>66 Paul Street<br />London EC2A 4NA<br />England</p>
              <small>Registered in England and Wales<br />Company No. 17151320</small>
            </div>
          </aside>

          <article className="legal-document-body">
            <header className="legal-document-intro">
              <span>Current document</span>
              <p>Read this document together with the other policies in the Axis One legal suite. Product-specific or contractual terms, where agreed in writing, take precedence for that engagement.</p>
            </header>

            <div className="legal-sections">
              {sections.map((section, index) => (
                <section className="legal-section" id={sectionId(section.heading, index)} key={section.heading}>
                  <div className="legal-section-number">{String(index + 1).padStart(2, '0')}</div>
                  <div>
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.bullets && section.bullets.length > 0 && (
                      <ul>
                        {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>

            <section className="legal-contact-panel" aria-labelledby="legal-contact-title">
              <div>
                <span>Questions about this document?</span>
                <h2 id="legal-contact-title">Contact Axis One</h2>
                <p>Open a prepared enquiry in the website, then choose whether to copy it or send it through your own email client.</p>
              </div>
              <button type="button" onClick={onContact}><Mail size={16} aria-hidden="true" /> Start an enquiry <ArrowRight size={14} aria-hidden="true" /></button>
            </section>

            <Link className="legal-trust-link" to="/trust">
              <span><ShieldCheck size={16} aria-hidden="true" /> Product trust and governance boundaries</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
