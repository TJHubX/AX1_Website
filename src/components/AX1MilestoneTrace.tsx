import React from 'react';

export type AX1MilestoneTraceState = 'active' | 'connected' | 'inactive' | 'fragmented';

export interface AX1MilestoneTraceItem {
  number: string;
  label: string;
  state?: AX1MilestoneTraceState;
}

interface AX1MilestoneTraceProps {
  items: AX1MilestoneTraceItem[];
  activeIndex?: number;
  ariaLabel: string;
  className?: string;
  followScroll?: boolean;
  orientation?: 'horizontal' | 'vertical';
  theme?: 'dark' | 'light';
  variant?: 'coherent' | 'fragmented';
}

const stateLabels: Record<AX1MilestoneTraceState, string> = {
  active: 'Current',
  connected: 'Connected',
  inactive: 'Next',
  fragmented: 'Disconnected',
};

/**
 * Public, editorial derivative of the AX1 milestone language.
 *
 * This component deliberately contains no workflow, policy, scoring,
 * threshold, evidence, automation or capital-transformation logic.
 */
export function AX1MilestoneTrace({
  items,
  activeIndex = 0,
  ariaLabel,
  className = '',
  followScroll = false,
  orientation = 'horizontal',
  theme = 'light',
  variant = 'coherent',
}: AX1MilestoneTraceProps) {
  const [currentIndex, setCurrentIndex] = React.useState(activeIndex);
  const itemRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => setCurrentIndex(activeIndex), [activeIndex]);

  React.useEffect(() => {
    if (!followScroll || typeof window === 'undefined') return undefined;

    let frame = 0;
    const updateCurrent = () => {
      frame = 0;
      const anchor = window.innerHeight * .5;
      const closest = itemRefs.current.reduce(
        (best, item, index) => {
          if (!item) return best;
          const distance = Math.abs(item.getBoundingClientRect().top - anchor);
          return distance < best.distance ? { index, distance } : best;
        },
        { index: activeIndex, distance: Number.POSITIVE_INFINITY },
      );
      setCurrentIndex(closest.index);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateCurrent);
    };

    updateCurrent();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [followScroll, items.length]);

  return (
    <div
      className={`ax1-milestone-trace ax1-trace-${orientation} ax1-trace-${theme} ax1-trace-${variant} ${className}`.trim()}
      role="list"
      aria-label={ariaLabel}
    >
      {items.map((item, index) => {
        const state: AX1MilestoneTraceState = item.state ?? (
          variant === 'fragmented'
            ? (index === currentIndex ? 'active' : 'fragmented')
            : index === currentIndex
              ? 'active'
              : index < currentIndex
                ? 'connected'
                : 'inactive'
        );

        return (
          <div
            className={`ax1-trace-item is-${state}`}
            data-trace-index={index}
            key={`${item.number}-${item.label}`}
            onFocus={() => followScroll && setCurrentIndex(index)}
            ref={(node) => { itemRefs.current[index] = node; }}
            role="listitem"
            aria-current={state === 'active' ? 'true' : undefined}
            tabIndex={followScroll ? 0 : undefined}
          >
            <span className="ax1-trace-number">{item.number}</span>
            <span className="ax1-trace-geometry" aria-hidden="true">
              <span className="ax1-trace-node"><i /></span>
              <span className="ax1-trace-rail" />
              <span className="ax1-trace-angle" />
            </span>
            <span className="ax1-trace-copy">
              <strong>{item.label}</strong>
              <small>{stateLabels[state]}</small>
            </span>
          </div>
        );
      })}
    </div>
  );
}
