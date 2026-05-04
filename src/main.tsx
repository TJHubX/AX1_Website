import React, { Suspense, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Header, RequestAccessModal, ContactChannelsModal } from './components';
import { FloatingAIBadge } from './FloatingAIBadge';
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

function App() {
  const [accessOpen, setAccessOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const pageProps = { onOpenAccess: () => setAccessOpen(true), onOpenContact: () => setContactOpen(true) };
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
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
          </Routes>
        </Suspense>
        <FloatingAIBadge />
        {accessOpen && <RequestAccessModal onClose={() => setAccessOpen(false)} />}
        {contactOpen && <ContactChannelsModal onClose={() => setContactOpen(false)} />}
      </BrowserRouter>
    </MotionConfig>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
