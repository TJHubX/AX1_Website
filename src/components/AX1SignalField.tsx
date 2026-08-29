import React from 'react';

type AX1SignalFieldVariant = 'questions' | 'fragmented' | 'capabilities' | 'transition';

interface AX1SignalFieldProps {
  variant: AX1SignalFieldVariant;
}

const patterns: Record<AX1SignalFieldVariant, Array<{
  left: string;
  node: string;
  top: string;
  width: string;
}>> = {
  questions: [
    { top: '32%', left: '64%', width: '27%', node: '24%' },
    { top: '54%', left: '72%', width: '22%', node: '68%' },
    { top: '77%', left: '59%', width: '31%', node: '46%' },
  ],
  fragmented: [
    { top: '17%', left: '52%', width: '20%', node: '78%' },
    { top: '38%', left: '68%', width: '18%', node: '30%' },
    { top: '59%', left: '57%', width: '16%', node: '62%' },
    { top: '79%', left: '74%', width: '19%', node: '20%' },
  ],
  capabilities: [
    { top: '25%', left: '62%', width: '30%', node: '36%' },
    { top: '43%', left: '70%', width: '25%', node: '72%' },
    { top: '61%', left: '54%', width: '38%', node: '58%' },
  ],
  transition: [
    { top: '22%', left: '58%', width: '34%', node: '42%' },
    { top: '39%', left: '68%', width: '26%', node: '74%' },
    { top: '57%', left: '61%', width: '30%', node: '55%' },
  ],
};

/** Decorative, IP-safe fragments derived from the public AX1 signal language. */
export function AX1SignalField({ variant }: AX1SignalFieldProps) {
  return (
    <div className={`ax1-signal-field ax1-signal-field-${variant}`} aria-hidden="true">
      {patterns[variant].map((signal, index) => (
        <span
          className="ax1-signal-fragment"
          key={`${variant}-${index}`}
          style={{ left: signal.left, top: signal.top, width: signal.width }}
        >
          <i style={{ left: signal.node }} />
          <b />
        </span>
      ))}
    </div>
  );
}
