import React, { Suspense, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Header, RequestAccessModal, ContactChannelsModal } from './components';
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
    description: 'Start with a bounded Launch Programme, then expand Axis One across one programme or a governed portfolio.',
  },
  '/trust': {
    title: 'Trust, Security & Governance | Axis One',
    description: 'Review Axis One product boundaries, permissioned collaboration model, attributable records and non-custodial approach.',
  },
  '/founder': {
    title: 'Founder Story | Axis One',
    description: 'Why Axis One was built to connect proven execution, stakeholder authority and governed capital decisions.',
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
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const fallback = {
      title: 'Axis One | Capital Governance Infrastructure',
      description: 'Capital governance infrastructure connecting proven execution to governed capital action in a non-custodial, permissioned environment.',
    };
    const metadata = PAGE_METADATA[pathname] ?? fallback;
    const canonicalPath = PAGE_METADATA[pathname] ? pathname : '/';
    const canonicalUrl = `https://ax1-website.pages.dev${canonicalPath === '/' ? '/' : canonicalPath}`;
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.description);
  }, [pathname]);
  return null;
}

function App() {
  const [accessOpen, setAccessOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const pageProps = { onOpenAccess: () => setAccessOpen(true), onOpenContact: () => setContactOpen(true) };
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <PageMetadata />
        <Header {...pageProps} />
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
            <Route path="*" element={<NotFoundPage {...pageProps} />} />
          </Routes>
        </Suspense>
        {accessOpen && <RequestAccessModal onClose={() => setAccessOpen(false)} />}
        {contactOpen && <ContactChannelsModal onClose={() => setContactOpen(false)} />}
      </BrowserRouter>
    </MotionConfig>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
