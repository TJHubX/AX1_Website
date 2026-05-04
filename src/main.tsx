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

function ScrollHoverActivator() {
  const { pathname } = useLocation();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 1080px)');
    const selector = [
      '.how-step',
      '.stakeholder-card',
      '.stakeholder-strip-card',
      '.architecture-card',
      '.governs-card',
      '.role-gov-card',
      '.coord-signal-card',
      '.sys-audit-card',
      '.cap-action-card',
      '.cap-snake-card',
      '.cap-snake-mobile-card',
      '.cap-state-card',
      '.dep-workflow-card',
      '.countdown-card',
    ].join(',');

    const clearActiveState = () => {
      document.body.classList.remove('touch-scroll-hover');
      document.querySelectorAll<HTMLElement>('.is-scroll-hover').forEach((element) => {
        element.classList.remove('is-scroll-hover');
      });
    };

    if (!mediaQuery.matches) {
      clearActiveState();
      return;
    }

    document.body.classList.add('touch-scroll-hover');

    let frame = 0;
    let activeTarget: HTMLElement | null = null;
    let targets: HTMLElement[] = [];

    const syncTargets = () => {
      targets = Array.from(document.querySelectorAll<HTMLElement>(selector));
      if (activeTarget && !targets.includes(activeTarget)) {
        activeTarget.classList.remove('is-scroll-hover');
        activeTarget = null;
      }
    };

    const updateActiveTarget = () => {
      if (!mediaQuery.matches) {
        clearActiveState();
        return;
      }

      if (targets.length === 0) {
        if (activeTarget) {
          activeTarget.classList.remove('is-scroll-hover');
          activeTarget = null;
        }
        return;
      }

      const viewportHeight = window.innerHeight;
      const focusY = viewportHeight * 0.46;
      const visibleTop = viewportHeight * 0.12;
      const visibleBottom = viewportHeight * 0.9;

      let candidate: HTMLElement | null = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      targets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const intersectsFocusBand = rect.bottom > visibleTop && rect.top < visibleBottom;
        if (!intersectsFocusBand) return;

        const targetCenter = rect.top + (rect.height / 2);
        const distance = Math.abs(targetCenter - focusY);

        if (distance < bestDistance) {
          bestDistance = distance;
          candidate = target;
        }
      });

      if (candidate === activeTarget) return;

      if (activeTarget) activeTarget.classList.remove('is-scroll-hover');
      activeTarget = candidate;
      if (activeTarget) activeTarget.classList.add('is-scroll-hover');
    };

    const scheduleRefresh = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        syncTargets();
        updateActiveTarget();
      });
    };

    const mutationObserver = new MutationObserver(scheduleRefresh);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    scheduleRefresh();
    window.addEventListener('scroll', scheduleRefresh, { passive: true });
    window.addEventListener('resize', scheduleRefresh);

    return () => {
      mutationObserver.disconnect();
      window.removeEventListener('scroll', scheduleRefresh);
      window.removeEventListener('resize', scheduleRefresh);
      if (frame) window.cancelAnimationFrame(frame);
      clearActiveState();
    };
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
        <ScrollHoverActivator />
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
