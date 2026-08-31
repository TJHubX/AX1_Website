export type DiagnosticAnswer = 'yes' | 'partly' | 'no';

export type DiagnosticResult = {
  state: 'governed' | 'partial' | 'reconstructed';
  label: string;
  headline: string;
  explanation: string;
  nextStep: string;
  score: number;
};

const answerScore: Record<DiagnosticAnswer, number> = {
  yes: 2,
  partly: 1,
  no: 0,
};

export function calculateDiagnosticResult(answers: DiagnosticAnswer[]): DiagnosticResult | null {
  if (answers.length !== 4) return null;
  const score = answers.reduce((total, answer) => total + answerScore[answer], 0);

  if (score >= 7) {
    return {
      state: 'governed',
      label: 'Governed basis',
      headline: 'The next decision appears accessible and well supported.',
      explanation: 'The operating question is whether that basis remains current as execution changes and whether authority stays explicit.',
      nextStep: 'Test the capital exposure around the decision',
      score,
    };
  }

  if (score >= 4) {
    return {
      state: 'partial',
      label: 'Partially governed',
      headline: 'Part of the decision basis still depends on reconstruction.',
      explanation: 'Evidence, ownership or authority may be visible in parts, but not yet as one current basis for action.',
      nextStep: 'Quantify the decision exposure',
      score,
    };
  }

  return {
    state: 'reconstructed',
    label: 'Reconstructed basis',
    headline: 'The decision is likely being governed through preparation work.',
    explanation: 'When evidence and authority are assembled only for the meeting, the decision process becomes dependent on reconstruction.',
    nextStep: 'Assess the exposure associated with delay',
    score,
  };
}
