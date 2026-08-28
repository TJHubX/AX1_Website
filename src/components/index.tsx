import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Copy,
  Globe,
  Landmark,
  Layers3,
  Mail,
  Menu,
  Rocket,
  Route as RouteIcon,
  Send,
  Sparkles,
  Users,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import logo from '../assets/ax1-logo.png';

// ─── Types ───────────────────────────────────────────────────────────────────

export type Tone = 'blue' | 'green' | 'amber' | 'muted' | 'white';
export type ModalProps = { onClose: () => void };
export type PageProps = { onOpenAccess: () => void; onOpenContact: () => void };
export type AccessErrors = Partial<Record<'fullName' | 'workEmail' | 'organization', string>>;

// ─── Constants ───────────────────────────────────────────────────────────────

export const fade = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.72 },
};

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export const deploymentUseCases = [
  {
    title: 'Real Estate Development',
    icon: Building2,
    copy: 'Multi-phase construction with stage-gate capital release.',
    points: ['Milestone-linked draws', 'Independent evidence', 'Multi-party approvals'],
  },
  {
    title: 'Infrastructure Projects',
    icon: Globe,
    copy: 'Large-scale public and private infrastructure deployment.',
    points: ['Staged capital programs', 'Multi-stakeholder coordination', 'Evidence-led oversight'],
  },
  {
    title: 'Energy & Sustainability',
    icon: Zap,
    copy: 'Renewable energy projects with measurable impact milestones.',
    points: ['Performance evidence', 'Outcome-linked funding', 'Impact reporting context'],
  },
  {
    title: 'Enterprise Construction',
    icon: Layers3,
    copy: 'Commercial and industrial builds with complex funding structures.',
    points: ['Complex stakeholder groups', 'Defined validation', 'Multi-tranche decisions'],
  },
  {
    title: 'Startups & Scaleups',
    icon: Rocket,
    copy: 'High-growth ventures with performance-linked funding tranches.',
    points: ['Milestone-driven rounds', 'Governed tranche readiness', 'Investor-operator alignment'],
  },
  {
    title: 'Life Sciences & R&D',
    icon: Sparkles,
    copy: 'Deep tech and biotech ventures with rigid clinical or lab-to-market phases.',
    points: ['Phase-gated capital decisions', 'Specialist validation', 'Evidence-led checkpoints'],
  },
];

// ─── UI Primitives ────────────────────────────────────────────────────────────

export function Logo({ className = '' }: { className?: string }) {
  return <img className={`ax1-logo ${className}`} src={logo} alt="AX1" />;
}

export function ModuleMark({ name }: { name: string }) {
  return (
    <span className="module-mark" aria-label={`AX1 ${name}`}>
      <Logo className="module-mark-logo" />
      <span className="module-mark-divider" aria-hidden="true" />
      <span className="module-mark-name">{name}</span>
    </span>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="badge"><span className="badge-dot" />{children}</span>;
}

export function Pill({ children, tone = 'blue' }: { children: React.ReactNode; tone?: Tone }) {
  return <span className={`pill pill-${tone}`}>{children}</span>;
}

export function Button({ children, variant = 'primary', onClick, to }: { children: React.ReactNode; variant?: 'primary' | 'secondary' | 'ghost'; onClick?: () => void; to?: string }) {
  const className = `button button-${variant}`;
  if (to) {
    return <Link className={className} to={to}>{children}<ArrowRight size={14} /></Link>;
  }
  return <button className={className} onClick={onClick} type="button">{children}<ArrowRight size={14} /></button>;
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export function Header({ onOpenAccess, onOpenContact }: PageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="header">
      <nav className="nav" aria-label="Primary navigation">
        <Link to="/" className="logo-link" aria-label="Axis One home"><Logo /></Link>
        <div className="nav-tag"><span />Global decision infrastructure</div>
        <div className="nav-links">
          <NavLink to="/system">How It Works</NavLink>
          <NavLink to="/capital">Capital Governance</NavLink>
          <NavLink to="/deployment">Pilot &amp; Programs</NavLink>
          <NavLink to="/trust">Trust</NavLink>
          <button type="button" onClick={onOpenContact}>Contact</button>
        </div>
        <button className="nav-cta" onClick={onOpenAccess} type="button">Assess Workflow <ArrowRight size={13} /></button>
        <button
          className="nav-menu-toggle"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileMenuOpen((current) => !current)}
        >
          <Menu size={18} />
          Menu
        </button>
      </nav>
      {mobileMenuOpen && (
        <div className="mobile-nav-backdrop" onMouseDown={closeMobileMenu}>
          <div
            className="mobile-nav-panel"
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="mobile-nav-head">
              <span>Navigation</span>
              <button type="button" onClick={closeMobileMenu} aria-label="Close navigation menu"><X size={16} /></button>
            </div>
            <Link to="/system" onClick={closeMobileMenu}>How It Works</Link>
            <Link to="/capital" onClick={closeMobileMenu}>Capital Governance</Link>
            <Link to="/deployment" onClick={closeMobileMenu}>Pilot &amp; Programs</Link>
            <Link to="/trust" onClick={closeMobileMenu}>Trust</Link>
            <div className="mobile-nav-divider" />
            <button type="button" className="mobile-nav-contact" onClick={() => { closeMobileMenu(); onOpenContact(); }}>Direct Channels</button>
            <button className="mobile-nav-request" type="button" onClick={() => { closeMobileMenu(); onOpenAccess(); }}>Assess a Capital Workflow</button>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p>
            <img className="footer-inline-logo" src={logo} alt="Axis One" />
            is global decision infrastructure for governed capital execution, connecting proven execution to attributable, authorised decisions.
          </p>
          <div className="footer-links">
            <Link to="/privacy">Privacy</Link>
            <span aria-hidden="true">&middot;</span>
            <Link to="/cookies">Cookies</Link>
            <span aria-hidden="true">&middot;</span>
            <Link to="/terms">Terms</Link>
            <span aria-hidden="true">&middot;</span>
            <Link to="/disclaimer">Disclaimer</Link>
            <span aria-hidden="true">&middot;</span>
            <Link to="/trust">Trust</Link>
            <span aria-hidden="true">&middot;</span>
            <Link to="/legal">Legal</Link>
            <span aria-hidden="true">&middot;</span>
            <Link to="/accessibility">Accessibility</Link>
          </div>
        </div>
        <div className="footer-nav">
          <Link to="/">HOME</Link>
          <Link to="/system">How It Works</Link>
          <Link to="/capital">Capital Governance</Link>
          <Link to="/deployment">Pilot &amp; Programs</Link>
          <Link to="/trust">Trust</Link>
          <Link to="/founder">Founder</Link>
          <button className="footer-nav-contact" onClick={onOpenContact}>Contact</button>
        </div>
        <div className="footer-legal">
          <strong>AX1 Structura Ltd</strong>
          <span>66 Paul Street, London EC2A 4NA, England</span>
          <span>Registered in England and Wales</span>
          <span>Company Registration No. 17151320</span>
          <span className="footer-disclaimer">AX1 does not hold, transfer, manage, or guarantee client capital. Authorised external financial providers execute any transfer.</span>
        </div>
      </div>
      <div className="footer-bottom">© 2026 AX1 Structura Ltd • GLOBAL DECISION INFRASTRUCTURE • ALL RIGHTS RESERVED</div>
    </footer>
  );
}

// ─── Modals ───────────────────────────────────────────────────────────────────

export function ModalShell({ children, onClose, className = '', labelledBy }: { children: React.ReactNode; onClose: () => void; className?: string; labelledBy?: string }) {
  const reduceMotion = useReducedMotion();
  const shellRef = React.useRef<HTMLDivElement>(null);
  const returnFocusRef = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    returnFocusRef.current = document.activeElement as HTMLElement;
    shellRef.current?.focus();
    return () => {
      returnFocusRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !shellRef.current) return;
      const focusable = Array.from(
        shellRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
      ).filter(el => el.closest('[aria-hidden="true"]') === null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <motion.div
        ref={shellRef}
        className={`modal-shell ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduceMotion ? 0.15 : 0.28 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close"><X size={19} /></button>
        {children}
      </motion.div>
    </div>
  );
}

export function SelectField({ label, options, value, onChange }: { label: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  const selected = options.find(o => o.value === value);
  return (
    <div className="field custom-select" ref={containerRef}>
      <span>{label}</span>
      <button type="button" className="select-trigger" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(c => !c)}>
        {selected?.label ?? 'Select...'}<ChevronDown size={15} className={open ? 'up' : ''} />
      </button>
      {open && (
        <div className="select-menu">
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              className={option.value === value ? 'selected' : ''}
              onClick={() => { onChange(option.value); setOpen(false); }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export const industries = [
  { value: 'real-estate', label: 'Real Estate Development' },
  { value: 'infrastructure', label: 'Infrastructure & Energy' },
  { value: 'venture', label: 'Venture Capital / Scaleups' },
  { value: 'startups', label: 'Early-Stage Startups' },
  { value: 'biotech', label: 'Life Sciences & R&D' },
  { value: 'consulting', label: 'Management Consulting' },
  { value: 'sovereign', label: 'Sovereign Wealth / Gov' },
];

export const projectValues = [
  { value: '1-10', label: '$1M - $10M' },
  { value: '10-50', label: '$10M - $50M' },
  { value: '50-200', label: '$50M - $200M' },
  { value: '200-1b', label: '$200M - $1B' },
  { value: '1b+', label: '$1B+' },
];

export function RequestAccessModal({ onClose }: ModalProps) {
  const [isPrepared, setIsPrepared] = useState(false);
  const [errors, setErrors] = useState<AccessErrors>({});
  const [summary, setSummary] = useState('');
  const [copied, setCopied] = useState(false);

  const fullNameRef = React.useRef<HTMLInputElement>(null);
  const workEmailRef = React.useRef<HTMLInputElement>(null);
  const organizationRef = React.useRef<HTMLInputElement>(null);
  const preparedHeadingRef = React.useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isPrepared && preparedHeadingRef.current) preparedHeadingRef.current.focus();
  }, [isPrepared]);

  const validate = (values: { fullName: string; workEmail: string; organization: string }): AccessErrors => {
    const next: AccessErrors = {};
    if (!values.fullName) next.fullName = 'Please enter your full name.';
    if (!values.workEmail) next.workEmail = 'Work email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.workEmail)) next.workEmail = 'Enter a valid work email address.';
    if (!values.organization) next.organization = 'Organization is required.';
    return next;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const values = {
      fullName: String(form.get('fullName') ?? '').trim(),
      workEmail: String(form.get('workEmail') ?? '').trim(),
      organization: String(form.get('organization') ?? '').trim(),
      briefIntent: String(form.get('briefIntent') ?? '').trim(),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const order: Array<[keyof AccessErrors, React.RefObject<HTMLElement>]> = [
        ['fullName', fullNameRef],
        ['workEmail', workEmailRef],
        ['organization', organizationRef],
      ];
      const firstInvalid = order.find(([key]) => nextErrors[key]);
      if (firstInvalid && firstInvalid[1].current) firstInvalid[1].current.focus();
      return;
    }

    const summaryText = [
      'AX1: Capital Workflow Assessment',
      '---------------------------------',
      `Full Name:     ${values.fullName}`,
      `Work Email:    ${values.workEmail}`,
      `Organization:  ${values.organization}`,
      '',
      'Workflow or decision to assess:',
      values.briefIntent || 'To be discussed during the assessment.',
    ].join('\n');

    setSummary(summaryText);
    setIsPrepared(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleEmailFallback = () => {
    const subject = encodeURIComponent('AX1 Capital Workflow Assessment');
    const body = encodeURIComponent(summary);
    window.location.href = `mailto:info@ax1.capital?subject=${subject}&body=${body}`;
  };

  const fieldClass = (key: keyof AccessErrors) => `field${errors[key] ? ' field-invalid' : ''}`;

  return (
    <ModalShell onClose={onClose} labelledBy="request-access-title">
      {isPrepared ? (
        <div className="access-success">
          <div className="access-success-icon"><CheckCircle2 size={28} /></div>
          <h3 ref={preparedHeadingRef} tabIndex={-1}>Assessment request prepared</h3>
          <p>Send the prepared email so the AX1 team can receive and review your workflow. No request has been transmitted yet.</p>
          <pre className="access-summary" aria-label="Request summary">{summary}</pre>
          <div className="access-fallback-actions">
            <button type="button" className="submit-request" onClick={handleCopy}>
              {copied ? 'Copied to Clipboard' : 'Copy Assessment Summary'}
              {!copied && <Copy size={15} />}
            </button>
            <button type="button" className="submit-request submit-request-ghost" onClick={handleEmailFallback}>
              Send Assessment by Email
              <Send size={15} />
            </button>
          </div>
          <p className="access-fallback-note">If your mail client does not open, copy the summary above and send to info@ax1.capital.</p>
        </div>
      ) : (
        <>
          <div className="modal-title">
            <h2 id="request-access-title">Assess a Capital Workflow</h2>
            <p>Start with one decision process</p>
          </div>
          <form className="access-form" onSubmit={handleSubmit} noValidate aria-labelledby="request-access-title">
            <label className={fieldClass('fullName')}>
              <span>Full Name</span>
              <input
                ref={fullNameRef}
                name="fullName"
                placeholder="Your name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'err-fullName' : undefined}
              />
              {errors.fullName && <em id="err-fullName" className="field-error">{errors.fullName}</em>}
            </label>
            <label className={fieldClass('workEmail')}>
              <span>Work Email</span>
              <input
                ref={workEmailRef}
                name="workEmail"
                type="email"
                placeholder="name@institution.com"
                aria-invalid={Boolean(errors.workEmail)}
                aria-describedby={errors.workEmail ? 'err-workEmail' : undefined}
              />
              {errors.workEmail && <em id="err-workEmail" className="field-error">{errors.workEmail}</em>}
            </label>
            <label className={`${fieldClass('organization')} field-wide`}>
              <span>Organization</span>
              <input
                ref={organizationRef}
                name="organization"
                placeholder="Your organization"
                aria-invalid={Boolean(errors.organization)}
                aria-describedby={errors.organization ? 'err-organization' : undefined}
              />
              {errors.organization && <em id="err-organization" className="field-error">{errors.organization}</em>}
            </label>
            <label className="field field-wide">
              <span>Workflow or decision to assess <small>(optional)</small></span>
              <textarea
                name="briefIntent"
                placeholder="For example: a staged investment tranche, construction draw, or portfolio approval process."
              />
            </label>
            <button className="submit-request" type="submit">
              Prepare Assessment Request
              <Send size={15} />
            </button>
          </form>
        </>
      )}
    </ModalShell>
  );
}

export function ContactChannelsModal({ onClose }: ModalProps) {
  const copy = (email: string) => void navigator.clipboard?.writeText(email);
  const openEmail = (email: string, channel: string) => {
    const subject = encodeURIComponent(`AX1 Inquiry - ${channel}`);
    const body = encodeURIComponent('Hello AX1 team,%0D%0A%0D%0AI would like to discuss:%0D%0A');
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };
  return (
    <ModalShell onClose={onClose} className="modal-shell-contact" labelledBy="contact-channels-title">
      <div className="contact-modal">
        <Badge>Contact Infrastructure Team</Badge>
        <h2 id="contact-channels-title">Direct Support Channels</h2>
        <p>Select the relevant department for your inquiry. Our infrastructure team monitors these channels for institutional coordination.</p>
        {[
          ['Infrastructure Network', 'info@ax1.network'],
          ['Capital Relations', 'info@ax1.capital'],
        ].map(([label, email]) => (
          <div className="channel-card" key={email}>
            <div className="channel-icon"><Mail size={20} /></div>
            <div><span>{label}</span><strong>{email}</strong></div>
            <button type="button" onClick={() => copy(email)}><Copy size={14} />Copy</button>
            <button type="button" onClick={() => openEmail(email, label)}><Send size={14} />Send</button>
          </div>
        ))}
        <div className="acknowledge"><Globe size={14} /><div><strong>Acknowledge</strong><p>All communications are recorded for institutional coordination, compliance review, and audit continuity where applicable.</p></div></div>
      </div>
    </ModalShell>
  );
}

// ─── Shared Sections ──────────────────────────────────────────────────────────

export function BoundarySection() {
  return (
    <section className="section boundary-section">
      <motion.div className="boundary-panel" {...fade}>
        <div className="boundary-copy">
          <Badge>Non-custodial boundary</Badge>
          <h2>AX1 governs the decision. It never holds the money.</h2>
          <p>AX1 connects proven execution to release readiness, confirms the applicable authority and preserves the decision record. Custody and transfer remain with authorised external financial providers.</p>
        </div>
        <div className="boundary-layers">
          <div className="boundary-layer"><Landmark size={18} /><strong>Bank, custodian or authorised provider</strong><span>Client capital remains outside AX1 custody.</span></div>
          <ChevronDown className="layer-arrow" size={18} />
          <div className="boundary-layer highlight"><Workflow size={18} /><strong>AX1 governed execution record</strong><span>Evidence, validation, readiness, responsibility and authority stay connected.</span></div>
          <ChevronDown className="layer-arrow" size={18} />
          <div className="boundary-layer"><Users size={18} /><strong>Authorised stakeholder decision</strong><span>The responsible party approves, holds, rejects or requests more evidence.</span></div>
          <ChevronDown className="layer-arrow" size={18} />
          <div className="boundary-layer"><RouteIcon size={18} /><strong>External execution and record</strong><span>The provider executes; AX1 records the status and preserves the audit trail.</span></div>
        </div>
      </motion.div>
    </section>
  );
}

export function DeploymentGrid({ preview = false }: { preview?: boolean }) {
  const items = preview ? deploymentUseCases.slice(0, 6) : deploymentUseCases;
  return (
    <div className="deployment-grid">
      {items.map(({ title, copy, points, icon: Icon }) => (
        <motion.div className="deployment-card" key={title} {...fade}>
          <div className="layer-icon"><Icon size={21} /></div>
          <h3>{title}</h3>
          <p>{copy}</p>
          <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>
        </motion.div>
      ))}
    </div>
  );
}

export function FinalCTA({
  onOpenAccess,
  heading = "Capital should not move without proof.",
  subcopy = "Axis One aligns governance, evidence, and release policy so capital responds to verified execution.",
  primaryLabel = "Request Access",
  variant = 'centered',
  secondaryLabel = "View System",
  secondaryTo = "/system",
  showLogo = true,
  points,
}: {
  onOpenAccess: () => void;
  heading?: string;
  subcopy?: string;
  primaryLabel?: string;
  variant?: 'centered' | 'split' | 'bar';
  secondaryLabel?: string;
  secondaryTo?: string;
  showLogo?: boolean;
  points?: string[];
}) {
  if (variant === 'bar') {
    return (
      <section className="final-cta final-cta--bar">
        <motion.div className="final-cta-bar-inner" {...fade}>
          <h2>{heading}</h2>
          <div className="actions">
            <Button onClick={onOpenAccess}>{primaryLabel}</Button>
            <Button variant="ghost" to={secondaryTo}>{secondaryLabel}</Button>
          </div>
        </motion.div>
      </section>
    );
  }
  if (variant === 'split') {
    return (
      <section className="final-cta final-cta--split">
        <motion.div className="final-cta-split-inner" {...fade}>
          <div className="final-cta-split-left">
            <h2>{heading}</h2>
            {subcopy && <p>{subcopy}</p>}
            <div className="actions">
              <Button onClick={onOpenAccess}>{primaryLabel}</Button>
              <Button variant="ghost" to={secondaryTo}>{secondaryLabel}</Button>
            </div>
          </div>
          {points && points.length > 0 && (
            <ul className="final-cta-split-points">
              {points.map(pt => <li key={pt}><CheckCircle2 size={14} /><span>{pt}</span></li>)}
            </ul>
          )}
        </motion.div>
      </section>
    );
  }
  return (
    <section className="final-cta">
      <motion.div {...fade}>
        {showLogo && <Logo />}
        <h2>{heading}</h2>
        {subcopy && <p>{subcopy}</p>}
        <div className="actions center-actions">
          <Button onClick={onOpenAccess}>{primaryLabel}</Button>
          <Button variant="ghost" to={secondaryTo}>{secondaryLabel}</Button>
        </div>
      </motion.div>
    </section>
  );
}
