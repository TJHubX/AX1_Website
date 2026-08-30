import { ArrowRight, Check, Fingerprint, Scale, ShieldCheck, Waypoints } from 'lucide-react';
import { Footer, type PageProps } from '../components';
import { localeContent, localeFromPath } from '../i18n';
import { useLocation } from 'react-router-dom';
import type { PackageName } from '../features/package-inquiry/packageInquiry';

const principleIcons = [Waypoints, Fingerprint, Scale, ShieldCheck];

// Keep short articles and prepositions with the word they introduce. This
// prevents translated display copy from leaving one or two letters on a line.
const displayText = (value: string) => value.replace(/(^|\s)([\p{L}\p{N}]{1,2})\s+(?=\S)/gu, '$1$2\u00a0');

export default function LocalizedOverviewPage({ onOpenContact }: PageProps) {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const copy = localeContent[locale];

  return (
    <div className="localized-page" dir={copy.dir}>
      <main>
        <section className="localized-hero" id="decision-exposure">
          <div className="localized-frame localized-hero-grid">
            <div className="localized-hero-copy">
              <span className="localized-kicker">{copy.page.eyebrow}</span>
              <h1>{displayText(copy.page.title)}</h1>
              <p>{copy.page.intro}</p>
              <div className="localized-actions">
                <a className="button button-primary" href="#decision-brief">{copy.page.primary}<ArrowRight size={15} /></a>
                <a className="button button-secondary" href="#system">{copy.page.secondary}</a>
              </div>
            </div>
            <div className="localized-decision-object" aria-label={copy.page.systemTitle}>
              <div className="localized-object-head"><span>AX1</span><i /></div>
              <strong>{copy.page.sequence.at(-1)}</strong>
              <div className="localized-object-sequence">
                {copy.page.sequence.map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p>{index < copy.page.sequence.length - 1 && <i />}</div>)}
              </div>
              <small>{copy.page.boundaryEyebrow}</small>
            </div>
          </div>
        </section>

        <section className="localized-why" id="why-ax1">
          <div className="localized-frame">
            <header className="localized-section-head">
              <span className="localized-kicker">{copy.page.whyEyebrow}</span>
              <h2>{displayText(copy.page.whyTitle)}</h2>
              <p>{copy.page.whyBody}</p>
            </header>
            <div className="localized-principles">
              {copy.page.principles.map((principle, index) => {
                const Icon = principleIcons[index];
                return <article key={principle.title}><div><span>{String(index + 1).padStart(2, '0')}</span><Icon size={19} /></div><h3>{principle.title}</h3><p>{principle.body}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className="localized-system" id="system">
          <div className="localized-frame localized-system-grid">
            <div>
              <span className="localized-kicker">{copy.page.systemEyebrow}</span>
              <h2>{displayText(copy.page.systemTitle)}</h2>
              <p>{copy.page.systemBody}</p>
            </div>
            <ol>
              {copy.page.sequence.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong><Check size={15} /></li>)}
            </ol>
          </div>
        </section>

        <section className="localized-deployment" id="deployment">
          <div className="localized-frame">
            <header className="localized-section-head">
              <span className="localized-kicker">{copy.page.deploymentEyebrow}</span>
              <h2>{displayText(copy.page.deploymentTitle)}</h2>
              <p>{copy.page.deploymentBody}</p>
            </header>
            <div className="localized-packages">
              {copy.page.packages.map((item) => <article key={item.name}><span>{item.scope}</span><h3>{item.name}</h3><p>{item.body}</p><button type="button" onClick={() => onOpenContact({ packageName: item.name as PackageName, source: `localized_${locale}` })}>{copy.footer.contact}<ArrowRight size={14} /></button></article>)}
            </div>
          </div>
        </section>

        <section className="localized-boundary" id="trust">
          <div className="localized-frame localized-boundary-grid">
            <span className="localized-kicker">{copy.page.boundaryEyebrow}</span>
            <h2>{displayText(copy.page.boundaryTitle)}</h2>
            <p>{copy.page.boundaryBody}</p>
          </div>
        </section>

        <section className="localized-cta" id="decision-brief">
          <div className="localized-frame localized-cta-grid">
            <div><span className="localized-kicker">{copy.page.ctaEyebrow}</span><h2>{displayText(copy.page.ctaTitle)}</h2><p>{copy.page.ctaBody}</p></div>
            <button className="button button-primary" type="button" onClick={() => onOpenContact({ source: `localized_cta_${locale}` })}>{copy.page.cta}<ArrowRight size={15} /></button>
          </div>
        </section>
      </main>
      <Footer onOpenContact={onOpenContact} />
    </div>
  );
}
