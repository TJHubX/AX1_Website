import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateDiagnosticResult } from './diagnostic/diagnosticModel.js';
import { buildDecisionBrief, buildDecisionEmail, type DecisionBriefValues } from './decision-brief/decisionBrief.js';
import { calculateDecisionExposure } from './decision-exposure/decisionExposure.js';

const briefValues: DecisionBriefValues = {
  decision: 'Authorise the next infrastructure release',
  decisionDate: '2026-10-14',
  capitalAffected: '12400000',
  currency: 'EUR',
  conditions: 'Execution evidence is current and authority is confirmed.',
  evidenceLocation: 'Split across tools and stakeholders',
  workEmail: 'decision.owner@example.com',
  context: 'Illustrative context only.',
};

test('homepage exposure snapshot reproduces the published example', () => {
  const result = calculateDecisionExposure(12_400_000, 8, 21);
  assert.equal(Math.round(result.carryingBurden), 57_074);
  assert.equal(Math.round(result.sevenDayBurden), 19_025);
});

test('homepage exposure calculation is safe for invalid input', () => {
  assert.deepEqual(calculateDecisionExposure(Number.NaN, Number.POSITIVE_INFINITY, -4), {
    carryingBurden: 0,
    sevenDayBurden: 0,
  });
});

test('diagnostic distinguishes governed, partial and reconstructed states', () => {
  assert.equal(calculateDiagnosticResult(['yes', 'yes', 'yes', 'yes'])?.state, 'governed');
  assert.equal(calculateDiagnosticResult(['yes', 'partly', 'partly', 'partly'])?.state, 'partial');
  assert.equal(calculateDiagnosticResult(['no', 'no', 'partly', 'no'])?.state, 'reconstructed');
  assert.equal(calculateDiagnosticResult(['yes']), null);
});

test('Decision Brief includes the decision, date, capital, evidence and boundary', () => {
  const brief = buildDecisionBrief(briefValues);
  assert.match(brief, /Authorise the next infrastructure release/);
  assert.match(brief, /2026-10-14/);
  assert.match(brief, /€12400000 EUR/);
  assert.match(brief, /Split across tools and stakeholders/);
  assert.match(brief, /does not authorise a capital action/i);
});

test('Decision Brief email is inspectable before launch', () => {
  const email = buildDecisionEmail(briefValues);
  assert.match(email.subject, /^AX1 decision brief:/);
  assert.equal(email.body, buildDecisionBrief(briefValues));
});
