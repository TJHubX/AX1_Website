export type PackageName = 'AX1.Pilot' | 'AX1.Core' | 'AX1.Enterprise';
export type InquiryScope = PackageName | 'General Axis One inquiry';

export type PackageInquiryValues = {
  packageName: InquiryScope;
  fullName: string;
  workEmail: string;
  organisation: string;
  context: string;
};

export function buildPackageInquiry(values: PackageInquiryValues) {
  const heading = values.packageName === 'General Axis One inquiry'
    ? 'AXIS ONE INQUIRY'
    : 'AXIS ONE DEPLOYMENT INQUIRY';
  return [
    heading,
    '-'.repeat(heading.length),
    `Selected scope: ${values.packageName}`,
    `Name:           ${values.fullName}`,
    `Work email:     ${values.workEmail}`,
    `Organisation:   ${values.organisation}`,
    '',
    'What we would like to explore:',
    values.context || 'We would like to discuss the appropriate deployment scope and next step.',
  ].join('\n');
}

export function buildPackageInquiryEmail(values: PackageInquiryValues) {
  return {
    subject: values.packageName === 'General Axis One inquiry'
      ? `Axis One inquiry — ${values.organisation}`
      : `${values.packageName} deployment inquiry — ${values.organisation}`,
    body: buildPackageInquiry(values),
  };
}
