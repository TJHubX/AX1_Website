import React, { Suspense, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Header, type ContactIntent } from './components';
import { PackageInquiryModal } from './features/package-inquiry/PackageInquiryModal';
import { localeCodes, localeContent, localeFromPath, localeHome } from './i18n';
import '@fontsource-variable/inter';
import './styles.css';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const SystemPage = React.lazy(() => import('./pages/SystemPage'));
const CapitalPage = React.lazy(() => import('./pages/CapitalPage'));
const DeploymentPage = React.lazy(() => import('./pages/DeploymentPage'));
const FounderPage = React.lazy(() => import('./pages/FounderPage'));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage'));
const CookiesPage = React.lazy(() => import('./pages/CookiesPage'));
const TermsPage = React.lazy(() => import('./pages/TermsPage'));
const DisclaimerPage = React.lazy(() => import('./pages/DisclaimerPage'));
const TrustPage = React.lazy(() => import('./pages/TrustPage'));
const LegalPage = React.lazy(() => import('./pages/LegalPage'));
const AccessibilityPage = React.lazy(() => import('./pages/AccessibilityPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const LocalizedOverviewPage = React.lazy(() => import('./pages/LocalizedOverviewPage'));

const PAGE_METADATA: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Axis One | Capital Governance Infrastructure',
    description: 'Axis One connects committed capital to verified milestones, attributable evidence and controlled decision states.',
  },
  '/system': {
    title: 'Axis One System | Capital Governance Infrastructure',
    description: 'See how Axis One connects execution, evidence, validation, authority and controlled capital decision states.',
  },
  '/capital': {
    title: 'Decision Exposure | Axis One Capital Governance',
    description: 'Model cost-overrun, delay and decision exposure while preserving human decision authority and controlled capital action.',
  },
  '/deployment': {
    title: 'Deployment | Axis One Capital Governance',
    description: 'Start with AX1.Pilot, then expand through AX1.Core or AX1.Enterprise after a credible operating result.',
  },
  '/trust': {
    title: 'Trust, Security & Governance | Axis One',
    description: 'Review Axis One product boundaries, permissioned collaboration model, attributable records and non-custodial approach.',
  },
  '/founder': {
    title: 'Tania Jokic, Founder | Axis One',
    description: 'Why Axis One was built to connect proven execution, stakeholder authority and governed capital decisions.',
  },
  '/privacy': {
    title: 'Privacy Policy | Axis One',
    description: 'How AX1 Structura Ltd handles personal information connected with the Axis One public website and enquiries.',
  },
  '/cookies': {
    title: 'Cookie Policy | Axis One',
    description: 'The current cookie and similar-technology position for the Axis One public website.',
  },
  '/terms': {
    title: 'Terms of Use | Axis One',
    description: 'Terms governing access to and use of the public Axis One website operated by AX1 Structura Ltd.',
  },
  '/disclaimer': {
    title: 'Website Disclaimer | Axis One',
    description: 'Important boundaries concerning Axis One website content, product descriptions, benchmarks and decision-support materials.',
  },
  '/legal': {
    title: 'Legal Notice | Axis One',
    description: 'Company, operator and legal information for Axis One and AX1 Structura Ltd.',
  },
  '/accessibility': {
    title: 'Accessibility Statement | Axis One',
    description: 'The Axis One accessibility approach, current status, supported features and feedback channel.',
  },
};

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-label="Loading">
      <div className="page-loader-ring" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    let cancelled = false;
    const scrollToHash = () => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return false;
      window.requestAnimationFrame(() => {
        if (!cancelled) target.scrollIntoView({ block: 'start' });
      });
      return true;
    };
    if (scrollToHash()) return;

    const observer = new MutationObserver(() => {
      if (scrollToHash()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timeoutId = window.setTimeout(() => observer.disconnect(), 5000);
    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, [pathname, hash]);
  return null;
}

function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    const locale = localeFromPath(normalizedPath);
    const localeCopy = localeContent[locale];
    const isLocaleLanding = locale !== 'en-gb' && normalizedPath === localeHome(locale);
    const fallback = {
      title: 'Axis One | Capital Governance Infrastructure',
      description: 'Capital governance infrastructure connecting proven execution to governed capital action in a non-custodial, permissioned environment.',
    };
    const isKnownPage = Boolean(PAGE_METADATA[normalizedPath]) || isLocaleLanding;
    const metadata = isLocaleLanding ? {
      title: `${localeCopy.page.title} | Axis One`,
      description: localeCopy.page.intro,
    } : PAGE_METADATA[normalizedPath] ?? {
      ...fallback,
      title: 'Page not found | Axis One',
      description: 'The requested Axis One page could not be found.',
    };
    const canonicalPath = isKnownPage ? normalizedPath : window.location.pathname;
    const canonicalUrl = `https://ax1-website.pages.dev${canonicalPath === '/' ? '/' : canonicalPath}`;
    document.title = metadata.title;
    document.documentElement.lang = localeCopy.htmlLang;
    document.documentElement.dir = localeCopy.dir;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', localeCopy.hreflang.replace('-', '_'));
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[name="robots"]')?.setAttribute(
      'content',
      isKnownPage ? 'index, follow, max-image-preview:large' : 'noindex, nofollow',
    );

    document.querySelectorAll('link[data-ax1-hreflang]').forEach((element) => element.remove());
    if (normalizedPath === '/' || isLocaleLanding) {
      const alternates = [
        ...localeCodes.map((code) => ({ hreflang: localeContent[code].hreflang, href: `https://ax1-website.pages.dev${localeHome(code)}` })),
        { hreflang: 'x-default', href: 'https://ax1-website.pages.dev/' },
      ];
      alternates.forEach(({ hreflang, href }) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = hreflang;
        link.href = href;
        link.dataset.ax1Hreflang = 'true';
        document.head.appendChild(link);
      });
    }

    const schemaId = 'ax1-page-schema';
    let schemaElement = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!schemaElement) {
      schemaElement = document.createElement('script');
      schemaElement.id = schemaId;
      schemaElement.type = 'application/ld+json';
      document.head.appendChild(schemaElement);
    }
    const pageSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: metadata.title,
      description: metadata.description,
      inLanguage: localeCopy.htmlLang,
      isPartOf: { '@id': 'https://ax1-website.pages.dev/#website' },
      about: { '@id': 'https://ax1-website.pages.dev/#organization' },
    };
    if (isKnownPage && normalizedPath !== '/') {
      pageSchema.breadcrumb = {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ax1-website.pages.dev/' },
          { '@type': 'ListItem', position: 2, name: metadata.title.split(' | ')[0], item: canonicalUrl },
        ],
      };
    }
    schemaElement.textContent = JSON.stringify(pageSchema);
  }, [pathname]);
  return null;
}

function App() {
  const [contactIntent, setContactIntent] = useState<ContactIntent | null>(null);
  const pageProps = {
    onOpenAccess: () => { window.location.href = '/#decision-brief'; },
    onOpenContact: (intent: ContactIntent = {}) => setContactIntent(intent),
  };
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <PageMetadata />
        <Header {...pageProps} />
        <div id="main-content" tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage {...pageProps} />} />
            <Route path="/system" element={<SystemPage {...pageProps} />} />
            <Route path="/capital" element={<CapitalPage {...pageProps} />} />
            <Route path="/deployment" element={<DeploymentPage {...pageProps} />} />
            <Route path="/founder" element={<FounderPage {...pageProps} />} />
            <Route path="/privacy" element={<PrivacyPage {...pageProps} />} />
            <Route path="/cookies" element={<CookiesPage {...pageProps} />} />
            <Route path="/terms" element={<TermsPage {...pageProps} />} />
            <Route path="/disclaimer" element={<DisclaimerPage {...pageProps} />} />
            <Route path="/trust" element={<TrustPage {...pageProps} />} />
            <Route path="/legal" element={<LegalPage {...pageProps} />} />
            <Route path="/accessibility" element={<AccessibilityPage {...pageProps} />} />
            {localeCodes.filter((code) => code !== 'en-gb').map((code) => (
              <Route key={code} path={`/${code}`} element={<LocalizedOverviewPage {...pageProps} />} />
            ))}
            <Route path="*" element={<NotFoundPage {...pageProps} />} />
          </Routes>
        </Suspense>
        </div>
        {contactIntent && <PackageInquiryModal packageName={contactIntent.packageName} source={contactIntent.source} onClose={() => setContactIntent(null)} />}
      </BrowserRouter>
    </MotionConfig>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
