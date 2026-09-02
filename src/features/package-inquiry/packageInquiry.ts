export type PackageName = 'AX1.Pilot' | 'AX1.Core' | 'AX1.Enterprise';
export type InquiryScope = PackageName | 'General Axis One enquiry';

export type PackageInquiryValues = {
  packageName: InquiryScope;
  campaign?: 'capital-release-pilot';
  fullName: string;
  workEmail: string;
  organisation: string;
  capitalType?: string;
  decisionDate?: string;
  context: string;
};

export function buildPackageInquiry(values: PackageInquiryValues) {
  const isCapitalReleasePilot = values.campaign === 'capital-release-pilot';
  const heading = isCapitalReleasePilot
    ? 'AXIS ONE CAPITAL RELEASE PILOT'
    : values.packageName === 'General Axis One enquiry'
      ? 'AXIS ONE ENQUIRY'
      : 'AXIS ONE DEPLOYMENT ENQUIRY';
  const selectedScope = isCapitalReleasePilot ? 'Capital Release Pilot' : values.packageName;
  return [
    heading,
    '-'.repeat(heading.length),
    `Selected scope: ${selectedScope}`,
    `Name:           ${values.fullName}`,
    `Work email:     ${values.workEmail}`,
    `Organisation:   ${values.organisation}`,
    ...(values.capitalType ? [`Type of capital: ${values.capitalType}`] : []),
    ...(values.decisionDate ? [`Expected decision date: ${values.decisionDate}`] : []),
    '',
    isCapitalReleasePilot ? 'Approaching allocation and milestone decision:' : 'What we would like to discuss:',
    values.context || (isCapitalReleasePilot
      ? 'We would like to discuss one approaching capital allocation and milestone decision.'
      : 'We would like to discuss the appropriate deployment scope and next step.'),
  ].join('\n');
}

export function buildPackageInquiryEmail(values: PackageInquiryValues) {
  return {
    subject: values.campaign === 'capital-release-pilot'
      ? `Axis One Capital Release Pilot: ${values.organisation}`
      : values.packageName === 'General Axis One enquiry'
      ? `Axis One enquiry: ${values.organisation}`
      : `${values.packageName} deployment enquiry: ${values.organisation}`,
    body: buildPackageInquiry(values),
  };
}
