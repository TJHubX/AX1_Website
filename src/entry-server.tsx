import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { SiteApp, type RouteComponents } from './SiteApp';
import { PAGE_METADATA, PUBLIC_PATHS, NOT_FOUND_METADATA } from './pageMetadata';
import HomePage from './pages/HomePage';
import SystemPage from './pages/SystemPage';
import CapitalPage from './pages/CapitalPage';
import DeploymentPage from './pages/DeploymentPage';
import FounderPage from './pages/FounderPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiesPage from './pages/CookiesPage';
import TermsPage from './pages/TermsPage';
import DisclaimerPage from './pages/DisclaimerPage';
import TrustPage from './pages/TrustPage';
import LegalPage from './pages/LegalPage';
import AccessibilityPage from './pages/AccessibilityPage';
import NotFoundPage from './pages/NotFoundPage';

const pages: RouteComponents = {
  home: HomePage,
  system: SystemPage,
  capital: CapitalPage,
  deployment: DeploymentPage,
  founder: FounderPage,
  privacy: PrivacyPage,
  cookies: CookiesPage,
  terms: TermsPage,
  disclaimer: DisclaimerPage,
  trust: TrustPage,
  legal: LegalPage,
  accessibility: AccessibilityPage,
  notFound: NotFoundPage,
};

export { PAGE_METADATA, PUBLIC_PATHS, NOT_FOUND_METADATA };

export function render(pathname: string) {
  return renderToString(
    <MotionConfig reducedMotion="user">
      <MemoryRouter initialEntries={[pathname]}>
        <SiteApp pages={pages} />
      </MemoryRouter>
    </MotionConfig>,
  );
}
