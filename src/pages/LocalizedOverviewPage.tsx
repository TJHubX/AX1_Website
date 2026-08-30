import { useMemo, useState } from 'react';
import { ArrowRight, Check, Fingerprint, Landmark, Scale, ShieldCheck, Users, Waypoints, Workflow } from 'lucide-react';
import { Footer, type PageProps } from '../components';
import { localeContent, localeFromPath } from '../i18n';
import { localizedExperienceCopy } from '../localizedExperience';
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
  const experience = localizedExperienceCopy[locale];
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Array<number | null>>([null, null, null, null]);
  const [activeRole, setActiveRole] = useState(0);
  const [capital, setCapital] = useState(12_400_000);
  const [days, setDays] = useState(21);
  const [rate, setRate] = useState(8);
  const answered = diagnosticAnswers.filter((answer) => answer !== null).length;
  const readiness = Math.round((diagnosticAnswers.reduce<number>((total, answer) => total + (answer ?? 0), 0) / 8) * 100);
  const carryingExposure = useMemo(() => Math.max(0, capital) * (Math.max(0, rate) / 100) * (Math.max(0, days) / 365), [capital, days, rate]);
  const stateNames = ['VALIDATED', 'PARTIAL', 'BLOCKED', 'FAILED'];
  const roleIcons = [Landmark, Workflow, ShieldCheck];
  const ActiveRoleIcon = roleIcons[activeRole];
  const money = new Intl.NumberFormat(copy.htmlLang, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  const englishDetail = (path: string) => (
    <a className="localized-detail-link" href={path} lang="en">
      {experience.detail.label}<span>EN</span><ArrowRight size={14} />
    </a>
  );

  return (
    <div className="localized-page" dir={copy.dir}>
      <main id="main-content">
        <section className="localized-hero">
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

        <section className="localized-diagnostic" id="diagnostic" aria-labelledby="localized-diagnostic-title">
          <div className="localized-frame">
            <header className="localized-section-head localized-section-head-dark">
              <span className="localized-kicker">{experience.diagnostic.eyebrow}</span>
              <h2 id="localized-diagnostic-title">{displayText(experience.diagnostic.title)}</h2>
              <p>{experience.diagnostic.body}</p>
            </header>
            <div className="localized-diagnostic-layout">
              <div className="localized-diagnostic-questions">
                {copy.page.principles.map((principle, index) => (
                  <article key={principle.title}>
                    <div><span>{experience.diagnostic.question} {String(index + 1).padStart(2, '0')}</span><strong>{principle.title}</strong><p>{principle.body}</p></div>
                    <div role="group" aria-label={`${experience.diagnostic.question} ${index + 1}`}>
                      {[experience.diagnostic.no, experience.diagnostic.partial, experience.diagnostic.yes].map((label, value) => (
                        <button key={label} type="button" className={diagnosticAnswers[index] === value ? 'is-active' : ''} aria-pressed={diagnosticAnswers[index] === value} onClick={() => setDiagnosticAnswers((current) => current.map((answer, answerIndex) => answerIndex === index ? value : answer))}>{label}</button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
              <aside className="localized-readiness" aria-live="polite">
                <span>{experience.diagnostic.result}</span>
                <strong>{answered === 4 ? `${readiness}%` : `${answered}/4`}</strong>
                <div><i style={{ inlineSize: `${answered === 4 ? readiness : answered * 25}%` }} /></div>
                <p>{answered === 4 ? copy.page.principles[readiness >= 75 ? 0 : readiness >= 45 ? 1 : 3].body : experience.diagnostic.complete}</p>
                <Users size={20} />
              </aside>
            </div>
          </div>
        </section>

        <section className="localized-system" id="system">
          <div className="localized-frame localized-system-grid">
            <div>
              <span className="localized-kicker">{copy.page.systemEyebrow}</span>
              <h2>{displayText(copy.page.systemTitle)}</h2>
              <p>{copy.page.systemBody}</p>
              {englishDetail('/system')}
            </div>
            <ol>
              {copy.page.sequence.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong><Check size={15} /></li>)}
            </ol>
          </div>
        </section>

        <section className="localized-exposure" id="decision-exposure" aria-labelledby="localized-exposure-title">
          <div className="localized-frame localized-exposure-layout">
            <header className="localized-section-head">
              <span className="localized-kicker">{experience.exposure.eyebrow}</span>
              <h2 id="localized-exposure-title">{displayText(experience.exposure.title)}</h2>
              <p>{experience.exposure.body}</p>
              {englishDetail('/capital')}
            </header>
            <div className="localized-exposure-tool">
              <div className="localized-exposure-inputs">
                <label><span>{experience.exposure.capital}</span><b>EUR</b><input type="number" min="0" step="100000" value={capital} onChange={(event) => setCapital(Number(event.target.value))} /></label>
                <label><span>{experience.exposure.days}</span><input type="number" min="0" max="365" value={days} onChange={(event) => setDays(Number(event.target.value))} /></label>
                <label><span>{experience.exposure.rate}</span><input type="number" min="0" max="100" step="0.5" value={rate} onChange={(event) => setRate(Number(event.target.value))} /><b>%</b></label>
              </div>
              <div className="localized-exposure-result"><span>{experience.exposure.result}</span><strong>{money.format(carryingExposure)}</strong><small>{money.format(capital)} × {rate}% × {days}/365</small></div>
            </div>
          </div>
        </section>

        <section className="localized-states" id="decision-states" aria-labelledby="localized-states-title">
          <div className="localized-frame">
            <header className="localized-section-head">
              <span className="localized-kicker">{experience.states.eyebrow}</span>
              <h2 id="localized-states-title">{displayText(experience.states.title)}</h2>
              <p>{experience.states.body}</p>
            </header>
            <div className="localized-state-list">
              {stateNames.map((state, index) => <article className={`is-state-${index}`} key={state}><span>0{index + 1}</span><strong><i />{state}</strong><ArrowRight size={17} /><h3>{experience.states.actions[index]}</h3><p>{copy.page.principles[index].body}</p></article>)}
            </div>
          </div>
        </section>

        <section className="localized-roles" id="permissioned-collaboration" aria-labelledby="localized-roles-title">
          <div className="localized-frame">
            <header className="localized-section-head localized-section-head-dark">
              <span className="localized-kicker">{experience.roles.eyebrow}</span>
              <h2 id="localized-roles-title">{displayText(experience.roles.title)}</h2>
              <p>{experience.roles.body}</p>
            </header>
            <div className="localized-role-tabs" role="tablist" aria-label={experience.roles.eyebrow}>
              {experience.roles.labels.map((label, index) => <button key={label} id={`localized-role-tab-${index}`} type="button" role="tab" aria-selected={activeRole === index} aria-controls="localized-role-panel" className={activeRole === index ? 'is-active' : ''} onClick={() => setActiveRole(index)}>{label}</button>)}
            </div>
            <div className="localized-role-panel" id="localized-role-panel" role="tabpanel" aria-labelledby={`localized-role-tab-${activeRole}`}>
              <div><ActiveRoleIcon size={24} /><span>{experience.roles.labels[activeRole]}</span><h3>{copy.page.principles[activeRole].title}</h3><p>{copy.page.principles[activeRole].body}</p></div>
              <div>{copy.page.sequence.slice(0, 3).map((step, index) => <p key={step}><span>0{index + 1}</span><strong>{step}</strong><Check size={14} /></p>)}</div>
            </div>
          </div>
        </section>

        <section className="localized-boundary" id="trust">
          <div className="localized-frame localized-boundary-grid">
            <span className="localized-kicker">{copy.page.boundaryEyebrow}</span>
            <h2>{displayText(copy.page.boundaryTitle)}</h2>
            <div><p>{copy.page.boundaryBody}</p>{englishDetail('/trust')}</div>
          </div>
        </section>

        <section className="localized-deployment" id="deployment">
          <div className="localized-frame">
            <header className="localized-section-head">
              <span className="localized-kicker">{copy.page.deploymentEyebrow}</span>
              <h2>{displayText(copy.page.deploymentTitle)}</h2>
              <p>{copy.page.deploymentBody}</p>
              {englishDetail('/deployment')}
            </header>
            <div className="localized-packages">
              {copy.page.packages.map((item) => <article key={item.name}><span>{item.scope}</span><h3>{item.name}</h3><p>{item.body}</p><button type="button" onClick={() => onOpenContact({ packageName: item.name as PackageName, source: `localized_${locale}` })}>{copy.footer.contact}<ArrowRight size={14} /></button></article>)}
            </div>
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
