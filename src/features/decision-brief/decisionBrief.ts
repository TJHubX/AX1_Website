import { currencySymbol, type CurrencyCode } from '../../currency.js';

export type DecisionBriefValues = {
  decision: string;
  decisionDate: string;
  capitalAffected: string;
  currency: CurrencyCode;
  conditions: string;
  evidenceLocation: string;
  workEmail: string;
  context: string;
};

export type DecisionBriefEmail = {
  subject: string;
  body: string;
};

export function buildDecisionBrief(values: DecisionBriefValues): string {
  const capital = values.capitalAffected.trim()
    ? `${currencySymbol(values.currency)}${values.capitalAffected.trim()} ${values.currency}`
    : 'Not specified';

  return [
    'AXIS ONE CAPITAL DECISION BRIEF',
    '',
    'DECISION',
    values.decision.trim(),
    '',
    'NEXT DECISION DATE',
    values.decisionDate || 'Not specified',
    '',
    'CAPITAL AFFECTED',
    capital,
    '',
    'WHAT MUST BE TRUE BEFORE CAPITAL MOVES',
    values.conditions.trim(),
    '',
    'CURRENT EVIDENCE POSITION',
    values.evidenceLocation,
    '',
    'OPTIONAL CONTEXT OR DECISION-EXPOSURE SCENARIO',
    values.context.trim() || 'None provided.',
    '',
    'CONTACT',
    values.workEmail.trim(),
    '',
    'This brief frames an initial conversation. It does not authorise a capital action or disclose Axis One operating rules.',
  ].join('\n');
}

export function buildDecisionEmail(values: DecisionBriefValues): DecisionBriefEmail {
  return {
    subject: `Axis One decision brief: ${values.decision.trim().slice(0, 72)}`,
    body: buildDecisionBrief(values),
  };
}
