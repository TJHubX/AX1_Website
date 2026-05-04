import React, { useEffect, useState } from 'react';

const INITIAL_SECONDS = 60 * 24 * 60 * 60;

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const totalSeconds = INITIAL_SECONDS;
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

interface LaunchCountdownProps {
  onOpenAccess: () => void;
}

export function LaunchCountdown({ onOpenAccess }: LaunchCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(INITIAL_SECONDS);
  const isZero = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const days = Math.floor(remainingSeconds / (24 * 60 * 60));
    const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
    const seconds = remainingSeconds % 60;
    setTimeLeft({ days, hours, minutes, seconds });
  }, [remainingSeconds]);

  const units: { label: string; value: number }[] = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="section countdown-section">
      <div className="countdown-inner">
        <div className="countdown-header">
          <span className="countdown-label">Private Access Cohort</span>
          <h2 className="countdown-title">
            Axis One is preparing for controlled launch.
          </h2>
          <p className="countdown-copy">
            The platform is moving through final build, testing, and workflow validation. Early registrants will be considered for a private demo cohort ahead of wider availability.
          </p>
        </div>

        {isZero ? (
          <div className="countdown-open">
            Private demo window is opening.
          </div>
        ) : (
          <div className="countdown-grid">
            {units.map(({ label, value }) => (
              <div className="countdown-card" key={label}>
                <span className="countdown-numeral">{pad(value)}</span>
                <span className="countdown-unit">{label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="countdown-cta">
          <button
            className="button button-primary"
            type="button"
            onClick={onOpenAccess}
          >
            Request Demo Access
          </button>
          <p className="countdown-note">
            Private demo access is intended for investors, operators, founders, and execution partners evaluating governed capital release workflows.
          </p>
        </div>
      </div>
    </section>
  );
}
