import React from 'react';
import { Check, ChevronDown } from 'lucide-react';

export type BrandedSelectOption<T extends string = string> = {
  value: T;
  label: string;
};

type BrandedSelectProps<T extends string> = {
  id?: string;
  value: T;
  options: BrandedSelectOption<T>[];
  onChange: (value: T) => void;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  className?: string;
  invalid?: boolean;
};

export function BrandedSelect<T extends string>({
  id,
  value,
  options,
  onChange,
  ariaLabel,
  ariaDescribedBy,
  className = '',
  invalid = false,
}: BrandedSelectProps<T>) {
  const generatedId = React.useId();
  const controlId = id ?? `${generatedId}-control`;
  const listboxId = `${controlId}-listbox`;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value));
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(selectedIndex);

  React.useEffect(() => {
    if (!open) setActiveIndex(selectedIndex);
  }, [open, selectedIndex]);

  React.useEffect(() => {
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnResize = () => setOpen(false);
    document.addEventListener('pointerdown', closeOnOutsidePointer);
    window.addEventListener('resize', closeOnResize);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
      window.removeEventListener('resize', closeOnResize);
    };
  }, []);

  const choose = (index: number) => {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setOpen(false);
    window.requestAnimationFrame(() => buttonRef.current?.focus());
  };

  const move = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + options.length) % options.length);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setActiveIndex(selectedIndex);
      } else {
        move(event.key === 'ArrowDown' ? 1 : -1);
      }
      return;
    }
    if (event.key === 'Home' && open) {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (event.key === 'End' && open) {
      event.preventDefault();
      setActiveIndex(options.length - 1);
      return;
    }
    if ((event.key === 'Enter' || event.key === ' ') && open) {
      event.preventDefault();
      choose(activeIndex);
      return;
    }
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
    }
  };

  const selected = options[selectedIndex];

  return (
    <div ref={rootRef} className={`ax1-select ${open ? 'is-open' : ''} ${invalid ? 'is-invalid' : ''} ${className}`.trim()}>
      <button
        ref={buttonRef}
        id={controlId}
        type="button"
        className="ax1-select-trigger"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={open ? `${listboxId}-option-${activeIndex}` : undefined}
        aria-describedby={ariaDescribedBy}
        aria-invalid={invalid || undefined}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onKeyDown}
      >
        <span>{selected?.label ?? 'Select an option'}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      {open && (
        <ul id={listboxId} className="ax1-select-menu" role="listbox" aria-label={ariaLabel}>
          {options.map((option, index) => (
            <li
              id={`${listboxId}-option-${index}`}
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`${index === activeIndex ? 'is-active' : ''} ${option.value === value ? 'is-selected' : ''}`.trim()}
              onPointerMove={() => setActiveIndex(index)}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
            >
              <span>{option.label}</span>
              {option.value === value && <Check size={15} aria-hidden="true" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
