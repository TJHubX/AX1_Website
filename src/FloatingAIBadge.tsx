import React, { useEffect, useId, useRef, useState } from 'react';
import { Zap, X } from 'lucide-react';

export function FloatingAIBadge() {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelHeadingRef = useRef<HTMLHeadingElement>(null);
  const panelId = useId();

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

  const toggle = () => setIsExpanded((v) => !v);
  const close = () => {
    setIsExpanded(false);
    toggleRef.current?.focus();
  };

  return (
    <div className="floating-ai-badge" ref={containerRef}>
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
