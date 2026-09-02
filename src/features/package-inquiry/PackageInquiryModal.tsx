import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Copy, LockKeyhole, Mail } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { ModalShell } from '../../components';
import { trackAX1Event } from '../../utils/analytics';
import { inquiryLanguageNotice, localeContent, localeFromPath } from '../../i18n';
import {
  buildPackageInquiry,
  buildPackageInquiryEmail,
  type PackageInquiryValues,
  type PackageName,
} from './packageInquiry';

type PackageInquiryModalProps = {
  packageName?: PackageName;
  source?: string;
  onClose: () => void;
};

type InquiryErrors = Partial<Record<'fullName' | 'workEmail' | 'organisation', string>>;

const PACKAGE_CONTEXT: Record<PackageName, { number: string; scope: string; description: string; headline: string }> = {
  'AX1.Pilot': {
    number: '01',
    scope: 'One live milestone decision',
    description: 'Test one defined capital allocation through one live milestone Gate.',
    headline: 'Discuss one approaching milestone decision.',
  },
  'AX1.Core': {
    number: '02',
    scope: 'One programme',
    description: 'Connect programme milestones, evidence, ownership and decision states.',
    headline: 'Discuss a single-programme deployment.',
  },
  'AX1.Enterprise': {
    number: '03',
    scope: 'Multiple programmes',
    description: 'Extend an established governance model across a portfolio or operating environment.',
    headline: 'Discuss a multi-programme deployment.',
  },
};

export function PackageInquiryModal({ packageName, source, onClose }: PackageInquiryModalProps) {
  const reduceMotion = useReducedMotion();
  const locale = localeFromPath(window.location.pathname);
  const isCapitalReleasePilot = packageName === 'AX1.Pilot' && source?.startsWith('capital_release_');
  const selectedScope = packageName ?? 'General Axis One enquiry';
  const displayScope = isCapitalReleasePilot ? 'Capital Release Pilot' : selectedScope;
  const preparedLabel = isCapitalReleasePilot ? 'Capital Release Pilot' : packageName ?? 'Axis One';
  const context = packageName ? PACKAGE_CONTEXT[packageName] : {
    number: 'AX1',
    scope: 'General enquiry',
    description: 'Discuss an approaching decision, operating challenge or the most appropriate Axis One scope.',
    headline: 'Discuss the appropriate Axis One scope.',
  };
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [draftValues, setDraftValues] = useState<PackageInquiryValues>({
    packageName: selectedScope,
    campaign: isCapitalReleasePilot ? 'capital-release-pilot' : undefined,
    fullName: '',
    workEmail: '',
    organisation: '',
    capitalType: '',
    decisionDate: '',
    context: '',
  });
  const [preparedValues, setPreparedValues] = useState<PackageInquiryValues | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const fullNameRef = useRef<HTMLInputElement>(null);
  const workEmailRef = useRef<HTMLInputElement>(null);
  const organisationRef = useRef<HTMLInputElement>(null);
  const preparedHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (preparedValues) preparedHeadingRef.current?.focus();
      else fullNameRef.current?.focus();
    }, reduceMotion ? 0 : 220);
    return () => window.clearTimeout(timeout);
  }, [preparedValues, reduceMotion]);

  const validate = (values: PackageInquiryValues): InquiryErrors => {
    const next: InquiryErrors = {};
    if (!values.fullName) next.fullName = 'Please enter your name.';
    if (!values.workEmail) next.workEmail = 'Work email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.workEmail)) next.workEmail = 'Enter a valid work email address.';
    if (!values.organisation) {
      next.organisation = isCapitalReleasePilot
        ? 'Organisation or fund is required.'
        : 'Organisation or programme is required.';
    }
    return next;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values: PackageInquiryValues = {
      packageName: selectedScope,
      campaign: isCapitalReleasePilot ? 'capital-release-pilot' : undefined,
      fullName: String(form.get('fullName') ?? '').trim(),
      workEmail: String(form.get('workEmail') ?? '').trim(),
      organisation: String(form.get('organisation') ?? '').trim(),
      capitalType: String(form.get('capitalType') ?? '').trim(),
      decisionDate: String(form.get('decisionDate') ?? '').trim(),
      context: String(form.get('context') ?? '').trim(),
    };
    setDraftValues(values);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const order: Array<[keyof InquiryErrors, React.RefObject<HTMLInputElement | null>]> = [
        ['fullName', fullNameRef],
        ['workEmail', workEmailRef],
        ['organisation', organisationRef],
      ];
      order.find(([field]) => nextErrors[field])?.[1].current?.focus();
      return;
    }
    setPreparedValues(values);
    trackAX1Event('package_inquiry_prepared', { package: selectedScope, source });
  };

  const handleCopy = async () => {
    if (!preparedValues) return;
    try {
      await navigator.clipboard.writeText(buildPackageInquiry(preparedValues));
      setCopyState('copied');
      trackAX1Event('package_inquiry_copied', { package: selectedScope, source });
      window.setTimeout(() => setCopyState('idle'), 2400);
    } catch {
      setCopyState('error');
    }
  };

  const handleEmail = () => {
    if (!preparedValues) return;
    const email = buildPackageInquiryEmail(preparedValues);
    trackAX1Event('package_inquiry_email_opened', { package: selectedScope, source });
    window.location.href = `mailto:info@ax1.capital?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
  };

  const handleEdit = () => {
    setCopyState('idle');
    setPreparedValues(null);
  };

  const fieldClass = (field: keyof InquiryErrors, wide = false) =>
    `package-inquiry-field${errors[field] ? ' is-invalid' : ''}${wide ? ' is-wide' : ''}`;

  return (
    <ModalShell onClose={onClose} className="modal-shell-package-inquiry" labelledBy="package-inquiry-title">
      {locale !== 'en-gb' && <p className="package-inquiry-language" lang={localeContent[locale].htmlLang} dir={localeContent[locale].dir}>{inquiryLanguageNotice[locale]}</p>}
      <div className="package-inquiry-modal" lang="en-GB" dir="ltr">
        <header className="package-inquiry-header">
          <span className="package-inquiry-eyebrow">{isCapitalReleasePilot ? 'Capital Release Pilot' : packageName ? `Deployment enquiry · ${packageName}` : 'General enquiry'}</span>
          <h2 id="package-inquiry-title">
            {packageName ? context.headline : <>Discuss the appropriate <span className="package-inquiry-brand-name">Axis One</span> scope.</>}
          </h2>
          <p>{isCapitalReleasePilot ? 'Share enough context to assess whether one approaching allocation and milestone decision fits the pilot. No request is sent from this website.' : 'Share enough context for a useful first discussion. No request is sent from this website.'}</p>
        </header>

        <div className="package-inquiry-scope" aria-label={`Selected enquiry scope: ${displayScope}`}>
          <span>{context.number}</span>
          <div><small>{packageName ? 'Selected scope' : 'Enquiry route'}</small><strong>{displayScope}</strong></div>
          <p><b>{context.scope}</b>{context.description}</p>
        </div>

        {preparedValues ? (
          <div className="package-inquiry-prepared">
            <CheckCircle2 size={28} aria-hidden="true" />
            <div>
              <span>Ready for your review</span>
              <h3 ref={preparedHeadingRef} tabIndex={-1}>Your {preparedLabel} enquiry is prepared.</h3>
              <p>Choose how to continue. Nothing has been submitted or stored by Axis One.</p>
            </div>
            <pre aria-label="Prepared enquiry" tabIndex={0}>{buildPackageInquiry(preparedValues)}</pre>
            <div className="package-inquiry-actions">
              <button type="button" className="package-inquiry-primary" onClick={handleEmail}>
                Open email draft<Mail size={16} />
              </button>
              <button type="button" className="package-inquiry-secondary" onClick={handleCopy}>
                {copyState === 'copied' ? 'Enquiry copied' : 'Copy enquiry'}<Copy size={16} />
              </button>
              <button type="button" className="package-inquiry-edit" onClick={handleEdit}>Edit enquiry</button>
            </div>
            <p className="package-inquiry-status" aria-live="polite">
              {copyState === 'copied' && 'The enquiry is ready to paste into your preferred channel.'}
              {copyState === 'error' && 'Copy was unavailable. Use “Open email draft” or select the text above.'}
            </p>
          </div>
        ) : (
          <form className="package-inquiry-form" onSubmit={handleSubmit} noValidate>
            <label className={fieldClass('fullName')}>
              <span>Your name <small>Required</small></span>
              <input
                ref={fullNameRef}
                name="fullName"
                autoComplete="name"
                defaultValue={draftValues.fullName}
                maxLength={120}
                placeholder="Decision owner or sponsor"
                aria-required="true"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'package-inquiry-name-error' : undefined}
              />
              {errors.fullName && <em id="package-inquiry-name-error">{errors.fullName}</em>}
            </label>
            <label className={fieldClass('workEmail')}>
              <span>Work email <small>Required</small></span>
              <input
                ref={workEmailRef}
                name="workEmail"
                type="email"
                autoComplete="email"
                defaultValue={draftValues.workEmail}
                maxLength={254}
                placeholder="you@organisation.com"
                aria-required="true"
                aria-invalid={Boolean(errors.workEmail)}
                aria-describedby={errors.workEmail ? 'package-inquiry-email-error' : undefined}
              />
              {errors.workEmail && <em id="package-inquiry-email-error">{errors.workEmail}</em>}
            </label>
            <label className={fieldClass('organisation', true)}>
              <span>{isCapitalReleasePilot ? 'Organisation or fund' : 'Organisation or programme'} <small>Required</small></span>
              <input
                ref={organisationRef}
                name="organisation"
                autoComplete="organization"
                defaultValue={draftValues.organisation}
                maxLength={180}
                placeholder={isCapitalReleasePilot ? 'Organisation or fund name' : 'Organisation, fund or programme name'}
                aria-required="true"
                aria-invalid={Boolean(errors.organisation)}
                aria-describedby={errors.organisation ? 'package-inquiry-organisation-error' : undefined}
              />
              {errors.organisation && <em id="package-inquiry-organisation-error">{errors.organisation}</em>}
            </label>
            {isCapitalReleasePilot && <>
              <label className="package-inquiry-field">
                <span>Type of capital <small>Optional</small></span>
                <input name="capitalType" defaultValue={draftValues.capitalType} maxLength={120} placeholder="Growth capital, private credit, project finance" />
              </label>
              <label className="package-inquiry-field">
                <span>Expected decision date <small>Optional</small></span>
                <input name="decisionDate" type="date" defaultValue={draftValues.decisionDate} />
              </label>
            </>}
            <label className="package-inquiry-field is-wide">
              <span>{isCapitalReleasePilot ? 'Approaching allocation and milestone decision' : 'What would you like to discuss?'} <small>Optional</small></span>
              <textarea name="context" defaultValue={draftValues.context} maxLength={1500} placeholder={isCapitalReleasePilot ? 'Briefly describe the capital allocation, milestone and expected decision. Please do not include confidential information.' : 'The approaching decision, operating scope or question you would like to discuss. Please do not include confidential information.'} />
            </label>
            <div className="package-inquiry-privacy">
              <LockKeyhole size={16} aria-hidden="true" />
              <p><strong>Private until you choose to send.</strong>Your entries remain in this browser and are used only to prepare an email you can review. <a href="/privacy" target="_blank" rel="noopener noreferrer">Read the Privacy Policy.</a></p>
            </div>
            <button type="submit" className="package-inquiry-primary is-wide">
              Review the enquiry<ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </ModalShell>
  );
}
