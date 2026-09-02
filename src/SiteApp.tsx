import React, { Suspense, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header, type ContactIntent, type PageProps } from './components';
import { PackageInquiryModal } from './features/package-inquiry/PackageInquiryModal';
import { normalizePath } from './pageMetadata';

export type RouteComponents = {
  home: React.ComponentType<PageProps>;
  system: React.ComponentType<PageProps>;
  capital: React.ComponentType<PageProps>;
  capitalRelease: React.ComponentType<PageProps>;
  deployment: React.ComponentType<PageProps>;
  founder: React.ComponentType<PageProps>;
  privacy: React.ComponentType<PageProps>;
  cookies: React.ComponentType<PageProps>;
  terms: React.ComponentType<PageProps>;
  disclaimer: React.ComponentType<PageProps>;
  trust: React.ComponentType<PageProps>;
  legal: React.ComponentType<PageProps>;
  accessibility: React.ComponentType<PageProps>;
  notFound: React.ComponentType<PageProps>;
};

type SiteAppProps = {
  pages: RouteComponents;
  loadingFallback?: React.ReactNode;
};

export function SiteApp({ pages, loadingFallback = null }: SiteAppProps) {
  const { pathname } = useLocation();
  const normalizedPath = normalizePath(pathname);
  const usesCampaignHeader = normalizedPath === '/release-pilot' || normalizedPath === '/capital-release';
  const [contactIntent, setContactIntent] = useState<ContactIntent | null>(null);
  const pageProps: PageProps = {
    onOpenAccess: () => { window.location.href = '/#decision-brief'; },
    onOpenContact: (intent: ContactIntent = {}) => setContactIntent(intent),
  };

  const {
    home: HomePage,
    system: SystemPage,
    capital: CapitalPage,
    capitalRelease: CapitalReleasePage,
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
  } = pages;

  return (
    <>
      {!usesCampaignHeader && <Header {...pageProps} />}
      <div id="main-content" tabIndex={-1}>
        <Suspense fallback={loadingFallback}>
          <Routes>
            <Route path="/" element={<HomePage {...pageProps} />} />
            <Route path="/system" element={<SystemPage {...pageProps} />} />
            <Route path="/capital" element={<CapitalPage {...pageProps} />} />
            <Route path="/release-pilot" element={<CapitalReleasePage {...pageProps} />} />
            <Route path="/capital-release" element={<Navigate to="/release-pilot" replace />} />
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
      </div>
      {contactIntent && (
        <PackageInquiryModal
          packageName={contactIntent.packageName}
          source={contactIntent.source}
          onClose={() => setContactIntent(null)}
        />
      )}
    </>
  );
}
