import React from 'react';
import type { PageProps } from '../components';
import { Button, Footer } from '../components';

export default function NotFoundPage({ onOpenContact }: PageProps) {
  return (
    <main className="legal-page">
      <section className="legal-hero not-found-hero">
        <span className="eyebrow">404 / Page not found</span>
        <h1>This page is not available.</h1>
        <p>The address may have changed. Return to the Axis One overview or continue to the system page.</p>
        <div className="actions">
          <Button to="/">Return home</Button>
          <Button to="/system" variant="ghost">See how Axis One works</Button>
        </div>
      </section>
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
