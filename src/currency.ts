import type { LocaleCode } from './i18n.js';

export const currencyCodes = ['GBP', 'EUR', 'USD', 'CZK', 'HUF', 'RSD', 'AED', 'SAR'] as const;

export type CurrencyCode = (typeof currencyCodes)[number];

export const currencyOptions: Array<{ value: CurrencyCode; label: string }> = [
  { value: 'GBP', label: 'GBP (£)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'USD', label: 'USD ($)' },
  { value: 'CZK', label: 'CZK (Kč)' },
  { value: 'HUF', label: 'HUF (Ft)' },
  { value: 'RSD', label: 'RSD (din.)' },
  { value: 'AED', label: 'AED (د.إ)' },
  { value: 'SAR', label: 'SAR (ر.س)' },
];

const defaultCurrencies: Record<LocaleCode, CurrencyCode> = {
  'en-gb': 'GBP',
  'en-us': 'USD',
  es: 'EUR',
  de: 'EUR',
  it: 'EUR',
  pt: 'EUR',
  fr: 'EUR',
  cs: 'CZK',
  hu: 'HUF',
  sr: 'RSD',
  ar: 'AED',
};

export function defaultCurrencyForLocale(locale: LocaleCode): CurrencyCode {
  return defaultCurrencies[locale];
}

export function currencySymbol(currency: CurrencyCode, locale = 'en-GB'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).formatToParts(0).find((part) => part.type === 'currency')?.value ?? currency;
}

export function formatMoney(
  value: number,
  currency: CurrencyCode,
  locale = 'en-GB',
  maximumFractionDigits = 0,
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits,
  }).format(value);
}
