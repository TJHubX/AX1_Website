export interface NarrativeEvidence {
  organisation: string;
  heading: string;
  copy: string;
  evidenceType: string;
  sourceTitle: string;
  year: number;
  sourceUrl: string;
}

export interface NumericalEvidence {
  organisation: string;
  primaryFigure: string;
  metric: string;
  secondaryFigures?: string[];
  copy: string;
  scope?: string;
  evidenceType: string;
  sourceTitle: string;
  year?: number;
  sourceUrl: string;
}

export const narrativeEvidence: NarrativeEvidence[] = [
  {
    organisation: 'McKinsey & Company',
    heading: 'Fragmented systems weaken decision visibility',
    copy: 'McKinsey describes project information as historically distributed across disparate and fragmented systems, with important links between project data and decision insight often lost.',
    evidenceType: 'Research article',
    sourceTitle: 'Increasing transparency in megaproject execution',
    year: 2023,
    sourceUrl: 'https://www.mckinsey.com/capabilities/operations/our-insights/increasing-transparency-in-megaproject-execution',
  },
  {
    organisation: 'Deloitte',
    heading: 'Weak governance delays decisions',
    copy: 'Deloitte identifies inadequate project governance as including inconsistent or delayed decisions, siloed or inadequate information and difficulty measuring progress or success.',
    evidenceType: 'Industry analysis',
    sourceTitle: 'Managing power and utility risks in a new era of uncertainty',
    year: 2025,
    sourceUrl: 'https://www.deloitte.com/us/en/insights/industry/power-and-utilities/enterprise-risk-management-for-utilities.html',
  },
  {
    organisation: 'EY',
    heading: 'Unsupported approvals increase cost exposure',
    copy: 'EY reports control breakdowns in which certifications were made without sufficient supporting documentation or entitlement validation, creating unchecked approvals, cost exposure and delayed recovery.',
    evidenceType: 'Capital-project review findings',
    sourceTitle: 'How to optimize value and maximize potential in capital projects',
    year: 2025,
    sourceUrl: 'https://www.ey.com/en_eg/insights/financial-accounting-advisory-services/how-to-optimize-value-and-maximize-potential-in-capital-projects',
  },
];

export const numericalEvidence: NumericalEvidence[] = [
  {
    organisation: 'Accenture',
    primaryFigure: '92%',
    metric: 'of capital projects do not meet their commitments',
    copy: 'Accenture reports that 92% of infrastructure and capital projects fail to deliver expected outcomes on time and on budget. Only 6% of organisations consistently meet or exceed their commitments.',
    scope: 'Global survey of 700 infrastructure and capital-project leaders',
    evidenceType: 'Global survey',
    sourceTitle: 'Blueprint for success',
    year: 2025,
    sourceUrl: 'https://www.accenture.com/us-en/insights/infrastructure-capital-projects/blueprint-success',
  },
  {
    organisation: 'PwC',
    primaryFigure: '81% / 79%',
    metric: 'reported cost overruns / reported delays',
    copy: 'PwC\'s 2025 Middle East Capital Projects and Infrastructure survey found that 81% of respondents had experienced cost overruns in the previous year and 79% had experienced delays.',
    scope: 'More than 100 capital-project specialists across the region',
    evidenceType: 'Regional survey',
    sourceTitle: 'Navigating uncertainty with a strategic roadmap for capex budgeting',
    year: 2025,
    sourceUrl: 'https://www.pwc.com/m1/en/media-centre/articles/navigating-uncertainty-with-strategic-roadmap-for-capex-budgeting.html',
  },
  {
    organisation: 'BCG',
    primaryFigure: '10-15%',
    metric: 'overall project capex savings',
    secondaryFigures: [
      '25% project schedule reduction',
      '30% reduction in use of overall contingency',
      '15% value-loss mitigation during execution',
    ],
    copy: 'BCG publishes these as indicative Capital Projects Excellence impact figures. They are external practice benchmarks and are not applied automatically in this calculator.',
    evidenceType: 'Consulting practice impact benchmark',
    sourceTitle: 'Capital Projects Excellence',
    sourceUrl: 'https://www.bcg.com/capabilities/operations/capital-projects-excellence',
  },
  {
    organisation: 'McKinsey & Company',
    primaryFigure: '15-30%',
    metric: 'project-cost savings associated with capital-management best practices',
    copy: 'McKinsey states that companies applying capital-management best practices across the project lifecycle can save 15-30% of project cost, while also noting that individual improvement levers can overlap.',
    evidenceType: 'Experience-based consulting estimate',
    sourceTitle: 'How capital expenditure management can drive performance',
    year: 2022,
    sourceUrl: 'https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/how-capital-expenditure-management-can-drive-performance',
  },
];
