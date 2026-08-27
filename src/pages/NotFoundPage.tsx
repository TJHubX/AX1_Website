import React from 'react';
import { Button, Footer, PageProps } from '../components';

export default function NotFoundPage({ onOpenContact }: PageProps) {
  return (
    <main className="legal-page">
      <section className="legal-hero not-found-hero">
        <span className="eyebrow">404 / Page not found</span>
        <h1>This decision path does not exist.</h1>
        <p>The page may have moved. Return to the AX1 overview or follow the governed workflow from execution proof to capital decision.</p>
        <div className="actions">
          <Button to="/">Return Home</Button>
          <Button to="/system" variant="ghost">See How AX1 Works</Button>
        </div>
      </section>
      <Footer onOpenContact={onOpenContact} />
    </main>
  );
}
