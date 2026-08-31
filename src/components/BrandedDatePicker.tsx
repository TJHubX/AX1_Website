import React from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

type BrandedDatePickerProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  invalid?: boolean;
};

const MONTH_FORMATTER = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });
const DAY_FORMATTER = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function parseIsoDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function displayDate(value: string) {
  const date = parseIsoDate(value);
  if (!date) return 'dd/mm/yyyy';
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

function calendarDays(viewDate: Date) {
  const first = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const mondayOffset = (first.getDay() + 6) % 7;
  const start = new Date(first);
  start.setDate(first.getDate() - mondayOffset);
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

export function BrandedDatePicker({ id, value, onChange, ariaLabel, invalid = false }: BrandedDatePickerProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const selected = React.useMemo(() => parseIsoDate(value), [value]);
  const today = React.useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);
  const [open, setOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState(() => selected ?? today);

  React.useEffect(() => {
    if (open) setViewDate(selected ?? today);
  }, [open, selected, today]);

  React.useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const selectDate = (date: Date) => {
    onChange(toIsoDate(date));
    setOpen(false);
    window.requestAnimationFrame(() => buttonRef.current?.focus());
  };

  const moveMonth = (offset: number) => {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  };

  return (
    <div ref={rootRef} className={`ax1-date ${open ? 'is-open' : ''} ${invalid ? 'is-invalid' : ''}`.trim()}>
      <button
        ref={buttonRef}
        id={id}
        type="button"
        className="ax1-date-trigger"
        aria-label={`${ariaLabel}: ${selected ? DAY_FORMATTER.format(selected) : 'not selected'}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${id}-calendar`}
        aria-invalid={invalid || undefined}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={selected ? '' : 'is-placeholder'}>{displayDate(value)}</span>
        <CalendarDays size={17} aria-hidden="true" />
      </button>

      {open && (
        <div id={`${id}-calendar`} className="ax1-calendar" role="dialog" aria-modal="false" aria-label={ariaLabel}>
          <div className="ax1-calendar-head">
            <strong aria-live="polite">{MONTH_FORMATTER.format(viewDate)}</strong>
            <div>
              <button type="button" aria-label="Previous month" onClick={() => moveMonth(-1)}><ChevronLeft size={17} /></button>
              <button type="button" aria-label="Next month" onClick={() => moveMonth(1)}><ChevronRight size={17} /></button>
            </div>
          </div>
          <div className="ax1-calendar-weekdays" aria-hidden="true">
            {WEEKDAYS.map((day) => <span key={day}>{day}</span>)}
          </div>
          <div className="ax1-calendar-grid">
            {calendarDays(viewDate).map((date) => {
              const iso = toIsoDate(date);
              const isSelected = value === iso;
              const isToday = toIsoDate(today) === iso;
              const isOutside = date.getMonth() !== viewDate.getMonth();
              return (
                <button
                  key={iso}
                  type="button"
                  className={`${isSelected ? 'is-selected' : ''} ${isToday ? 'is-today' : ''} ${isOutside ? 'is-outside' : ''}`.trim()}
                  aria-label={DAY_FORMATTER.format(date)}
                  aria-pressed={isSelected}
                  aria-current={isToday ? 'date' : undefined}
                  onClick={() => selectDate(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
          <div className="ax1-calendar-actions">
            <button type="button" onClick={() => { onChange(''); setOpen(false); }}>Clear</button>
            <button type="button" onClick={() => selectDate(today)}>Today</button>
          </div>
        </div>
      )}
    </div>
  );
}
