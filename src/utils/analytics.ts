export type AX1EventName =
  | 'diagnostic_started'
  | 'diagnostic_answered'
  | 'diagnostic_completed'
  | 'decision_room_advanced'
  | 'decision_exposure_calculated'
  | 'decision_exposure_visibility_set'
  | 'decision_exposure_scenario_used'
  | 'decision_brief_prepared'
  | 'decision_brief_copied'
  | 'decision_brief_email_opened'
  | 'deployment_option_selected'
  | 'package_inquiry_prepared'
  | 'package_inquiry_copied'
  | 'package_inquiry_email_opened'
  | 'primary_cta_selected';

type EventDetail = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Privacy-conscious first-party event instrumentation.
 *
 * The event deliberately excludes names, email addresses, programme names,
 * capital amounts and free-text answers. It can be consumed by a configured
 * analytics provider later without changing the interface components.
 */
export function trackAX1Event(name: AX1EventName, detail: EventDetail = {}) {
  if (typeof window === 'undefined') return;

  const event = { event: `ax1_${name}`, ...detail };
  window.dispatchEvent(new CustomEvent('ax1:analytics', { detail: event }));
  window.dataLayer?.push(event);
}
