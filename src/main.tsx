import React, { useEffect } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import type { PageProps } from './components';
import { SiteApp, type RouteComponents } from './SiteApp';
import { NOT_FOUND_METADATA, PAGE_METADATA, normalizePath } from './pageMetadata';
import './fonts.css';
import './styles.css';

type RouteModule = { default: React.ComponentType<PageProps> };
type RouteImporter = () => Promise<RouteModule>;

const routeImporters = {
  home: () => import('./pages/HomePage'),
  system: () => import('./pages/SystemPage'),
  capital: () => import('./pages/CapitalPage'),
  deployment: () => import('./pages/DeploymentPage'),
  founder: () => import('./pages/FounderPage'),
  privacy: () => import('./pages/PrivacyPage'),
  cookies: () => import('./pages/CookiesPage'),
  terms: () => import('./pages/TermsPage'),
  disclaimer: () => import('./pages/DisclaimerPage'),
  trust: () => import('./pages/TrustPage'),
  legal: () => import('./pages/LegalPage'),
  accessibility: () => import('./pages/AccessibilityPage'),
  notFound: () => import('./pages/NotFoundPage'),
} satisfies Record<string, RouteImporter>;

const staleRouteChunkPattern = /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Unable to preload CSS|ChunkLoadError|Loading chunk .* failed|\bLoad failed\b/i;

async function loadRoute(importer: RouteImporter): Promise<RouteModule> {
  const reloadKey = `ax1:route-chunk-reload:${window.location.pathname}`;
  try {
    const route = await importer();
    try {
      window.sessionStorage.removeItem(reloadKey);
    } catch {
      // Storage can be unavailable in restricted browser modes.
    }
    return route;
  } catch (error) {
    const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    let alreadyReloaded = true;
    try {
      alreadyReloaded = window.sessionStorage.getItem(reloadKey) === '1';
      if (!alreadyReloaded) window.sessionStorage.setItem(reloadKey, '1');
    } catch {
      // Storage can be unavailable in restricted browser modes. Avoid a reload loop.
    }
    if (staleRouteChunkPattern.test(message) && !alreadyReloaded) {
      window.location.reload();
      return new Promise<RouteModule>(() => undefined);
    }
    throw error;
  }
}

const lazyRoute = (importer: RouteImporter) => React.lazy(() => loadRoute(importer));
const HomePage = lazyRoute(routeImporters.home);
const SystemPage = lazyRoute(routeImporters.system);
const CapitalPage = lazyRoute(routeImporters.capital);
const DeploymentPage = lazyRoute(routeImporters.deployment);
const FounderPage = lazyRoute(routeImporters.founder);
const PrivacyPage = lazyRoute(routeImporters.privacy);
const CookiesPage = lazyRoute(routeImporters.cookies);
const TermsPage = lazyRoute(routeImporters.terms);
const DisclaimerPage = lazyRoute(routeImporters.disclaimer);
const TrustPage = lazyRoute(routeImporters.trust);
const LegalPage = lazyRoute(routeImporters.legal);
const AccessibilityPage = lazyRoute(routeImporters.accessibility);
const NotFoundPage = lazyRoute(routeImporters.notFound);

function PrimaryRoutePreloader() {
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (connection?.saveData || connection?.effectiveType?.includes('2g')) return;

    const preload = () => {
      void Promise.allSettled([
        routeImporters.system(),
        routeImporters.capital(),
        routeImporters.deployment(),
        routeImporters.trust(),
        routeImporters.founder(),
      ]);
    };
    const idleWindow = window as Window & typeof globalThis & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (idleWindow.requestIdleCallback) {
      const handle = idleWindow.requestIdleCallback(preload, { timeout: 2500 });
      return () => idleWindow.cancelIdleCallback?.(handle);
    }
    const handle = window.setTimeout(preload, 1800);
    return () => window.clearTimeout(handle);
  }, []);
  return null;
}

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
    const normalizedPath = normalizePath(pathname);
    const isKnownPage = Boolean(PAGE_METADATA[normalizedPath]);
    const metadata = PAGE_METADATA[normalizedPath] ?? NOT_FOUND_METADATA;
    const canonicalPath = isKnownPage ? normalizedPath : window.location.pathname;
    const canonicalUrl = `https://ax1.capital${canonicalPath === '/' ? '/' : canonicalPath}`;
    document.title = metadata.title;
    document.documentElement.lang = 'en-GB';
    document.documentElement.dir = 'ltr';
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', 'en_GB');
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[name="robots"]')?.setAttribute(
      'content',
      isKnownPage ? 'index, follow, max-image-preview:large' : 'noindex, nofollow',
    );

    document.querySelectorAll('link[data-ax1-hreflang], meta[data-ax1-og-locale]').forEach((element) => element.remove());

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
      inLanguage: 'en-GB',
      isPartOf: { '@id': 'https://ax1.capital/#website' },
      about: { '@id': 'https://ax1.capital/#organization' },
    };
    if (['/', '/system', '/capital', '/deployment', '/trust'].includes(normalizedPath)) {
      pageSchema.mainEntity = { '@id': 'https://ax1.capital/#service' };
    }
    if (isKnownPage && normalizedPath !== '/') {
      pageSchema.breadcrumb = {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ax1.capital/' },
          { '@type': 'ListItem', position: 2, name: metadata.title.split(' | ')[0], item: canonicalUrl },
        ],
      };
    }
    schemaElement.textContent = JSON.stringify(pageSchema);
  }, [pathname]);
  return null;
}

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

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <PrimaryRoutePreloader />
        <ScrollToTop />
        <PageMetadata />
        <SiteApp pages={pages} loadingFallback={<PageLoader />} />
      </BrowserRouter>
    </MotionConfig>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Axis One application root was not found.');

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
