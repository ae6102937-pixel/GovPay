/**
 * Facts this site states as official, each with its source and the date it was checked.
 * Every page reads them from here, so a change is made once. Before changing a value, check the
 * source and update CHECKED_ON. Anything not listed here is a projection or an assumption, and the
 * pages must say so.
 */

/** The date these facts were last checked against their sources */
export const CHECKED_ON = '11 November 2026';

export const PUBLISHER = {
  name: 'Orbit Labs',
  brand: 'TrueFunds',
  team: 'TrueFunds Editorial Team',
  email: 'orbitlabs.apps@gmail.com',
  mainSite: 'https://www.truefunds.co.in',
};

/** Policy pages on the main TrueFunds site, which also apply to GovPay */
export const POLICY_LINKS = [
  { name: 'About TrueFunds', href: 'https://www.truefunds.co.in/about' },
  { name: 'Editorial Policy', href: 'https://www.truefunds.co.in/editorial-policy' },
  { name: 'Privacy Policy', href: 'https://www.truefunds.co.in/privacy-policy' },
  { name: 'Terms of Use', href: 'https://www.truefunds.co.in/terms' },
  { name: 'Disclaimer', href: 'https://www.truefunds.co.in/disclaimer' },
];

export const SOURCES = {
  cpc8Site: { name: '8th Central Pay Commission (8cpc.gov.in)', url: 'https://8cpc.gov.in/' },
  torRelease: {
    name: 'PIB, 28 October 2025: Cabinet approves Terms of Reference of 8th Central Pay Commission',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2183289',
  },
  daJan2026: {
    name: 'PIB, 18 April 2026: DA/DR instalment from 1 January 2026',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2253245',
  },
  daJul2026: {
    name: 'PM India, 28 October 2026: DA/DR instalment from 1 July 2026',
    url: 'https://www.pmindia.gov.in/?p=16966378',
  },
  upsRelease: {
    name: 'PIB, 24 August 2024: Cabinet approves Unified Pension Scheme',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2048607',
  },
  doppw: { name: 'Department of Pension & Pensioners’ Welfare', url: 'https://doppw.gov.in/' },
  doe: { name: 'Department of Expenditure', url: 'https://doe.gov.in/' },
  dopt: { name: 'Department of Personnel & Training', url: 'https://dopt.gov.in/' },
};

/** 8th Central Pay Commission: only facts published by the Government or the Commission */
export const CPC8 = {
  torApproved: '28 October 2025',
  constituted: '3 November 2025',
  chairperson: 'Justice Ranjana Prakash Desai',
  memberPartTime: 'Prof. Pulak Ghosh',
  memberSecretary: 'Shri Pankaj Jain',
  /** The ToR gives the Commission 18 months from its constitution */
  reportWithinMonths: 18,
  /** 18 months from 3 November 2025 */
  reportDueBy: 'May 2027',
  /** PIB, 28 Oct 2025: the effect "would normally be expected from 01.01.2026" */
  normalEffectFrom: '1 January 2026',
};

/** Dearness Allowance under the 7th CPC, as a percentage of basic pay */
export const CURRENT_DA = {
  rate: 63,
  effectiveFrom: '1 July 2026',
  approvedOn: '28 October 2026',
  source: SOURCES.daJul2026,
};

/** Beneficiaries named in the latest DA release (28 October 2026) */
export const BENEFICIARIES = {
  employeesLakh: 48.54,
  pensionersLakh: 68.71,
  asOf: '28 October 2026',
  source: SOURCES.daJul2026,
};

/**
 * Fitment factors used for projections. None of them is official: the 8th CPC has not reported.
 * 2.57 was the 7th CPC's factor. The NC-JCM Staff Side's memorandum of 14 April 2026, as reported,
 * asked for 3.83.
 */
export const FITMENT_SCENARIOS = [
  { factor: 1.92, label: 'Low scenario' },
  { factor: 2.15, label: 'Middle scenario' },
  { factor: 2.57, label: 'Same as 7th CPC' },
  { factor: 2.86, label: 'High scenario' },
];
