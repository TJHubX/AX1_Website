import React, { useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Zap, X } from 'lucide-react';

export function FloatingAIBadge() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [footerClearance, setFooterClearance] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelHeadingRef = useRef<HTMLHeadingElement>(null);
  const panelId = useId();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpanded(false);
        toggleRef.current?.focus();
      }
    };
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, { passive: true });

    if (panelHeadingRef.current) panelHeadingRef.current.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isExpanded]);

  useEffect(() => {
    let frame = 0;
    let resizeObserver: ResizeObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const FOOTER_GAP = 12;

    const attachFooterObserver = () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }

      const footer = document.querySelector<HTMLElement>('footer.footer');
      if (!footer || typeof ResizeObserver === 'undefined') return;

      resizeObserver = new ResizeObserver(() => {
        if (frame) return;
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          updateClearance();
        });
      });

      resizeObserver.observe(footer);
    };

    const updateClearance = () => {
      const badge = containerRef.current;
      const footer = document.querySelector<HTMLElement>('footer.footer');
      if (!footer || !badge) {
        setFooterClearance(0);
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      const badgeRect = badge.getBoundingClientRect();
      const badgeStyles = getComputedStyle(badge);
      const baseBottom = Number.parseFloat(badgeStyles.getPropertyValue('--ai-badge-bottom')) || 16;

      const neededClearance = window.innerHeight - baseBottom - footerRect.top + FOOTER_GAP;
      const next = neededClearance > 0 ? Math.ceil(neededClearance) : 0;

      // If footer is fully below the viewport, force reset to the base position.
      if (footerRect.top >= window.innerHeight + badgeRect.height) {
        setFooterClearance(0);
        return;
      }

      setFooterClearance((current) => (Math.abs(current - next) > 1 ? next : current));
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateClearance();
      });
    };

    updateClearance();
    attachFooterObserver();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    mutationObserver = new MutationObserver(() => {
      attachFooterObserver();
      schedule();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
      if (resizeObserver) resizeObserver.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, [pathname]);

  const toggle = () => setIsExpanded((v) => !v);
  const close = () => {
    setIsExpanded(false);
    toggleRef.current?.focus();
  };

  const badgeStyle = { '--ai-footer-clearance': `${footerClearance}px` } as React.CSSProperties;

  return (
    <div className="floating-ai-badge" ref={containerRef} style={badgeStyle}>
      <button
        ref={toggleRef}
        type="button"
        className="ai-badge-toggle"
        aria-label={isExpanded ? 'Close AI Insight Layer panel' : 'Open AI Insight Layer panel'}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={toggle}
      >
        <span className="ai-badge-icon" aria-hidden="true">
          <Zap size={16} />
        </span>
        <span className="ai-badge-title">AI</span>
      </button>

      <div
        id={panelId}
        className={`ai-badge-panel${isExpanded ? ' ai-badge-panel--open' : ''}`}
        role="dialog"
        aria-labelledby={`${panelId}-title`}
        aria-hidden={!isExpanded}
      >
        <div className="ai-panel-header">
          <h3 id={`${panelId}-title`} ref={panelHeadingRef} tabIndex={-1}>AI-assisted interpretation</h3>
          <button
            type="button"
            className="ai-panel-close"
            aria-label="Close panel"
            onClick={close}
          >
            <X size={15} />
          </button>
        </div>

        <p className="ai-panel-copy">
          Axis One uses an LLM-connected intelligence layer to help interpret capital readiness, evidence coverage, validator activity, and release-state changes. The deterministic governance core remains responsible for release logic.
        </p>

        <div className="ai-panel-rows">
          <div className="ai-row"><span>AI-supported review</span></div>
          <div className="ai-row"><span>Structured intelligence layer</span></div>
          <div className="ai-row"><span>Decision explanation</span></div>
          <div className="ai-row"><span>Capital readiness narrative</span></div>
          <div className="ai-row"><span>Scenario interpretation</span></div>
          <div className="ai-row"><span>Evidence and risk summaries</span></div>
        </div>

        <div className="ai-panel-safety">
          <strong>How it works:</strong>
          <ul>
            <li>AI interprets available data and context</li>
            <li>Humans and validators remain in control</li>
            <li>Release logic stays deterministic and auditable</li>
            <li>Governance core is always the source of truth</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
