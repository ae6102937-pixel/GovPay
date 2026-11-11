export interface PostSalaryProfile {
  slug: string;
  title: string;
  department: string;
  level: number;
  gradePay: string;
  group: 'A' | 'B' | 'C';
  description: string;
  typicalRecruitment: string;
  entryBasic7th: number;
  responsibilities: string[];
  careerProgression: string[];
}

export const POPULAR_POSTS: PostSalaryProfile[] = [
  {
    slug: 'constable-gd',
    title: 'Central Police Constable (GD)',
    department: 'CAPF (BSF, CRPF, CISF, ITBP, SSB, SSF)',
    level: 3,
    gradePay: '2000',
    group: 'C',
    description: 'General Duty Constable across Central Armed Police Forces under the Ministry of Home Affairs.',
    typicalRecruitment: 'SSC GD Constable Examination (10th Pass)',
    entryBasic7th: 21700,
    responsibilities: [
      'Border security, counter-insurgency and internal security maintenance',
      'VIP security, airport protection and industrial installation guard duty',
      'Law and order assistance to state police forces',
    ],
    careerProgression: ['Constable (GD) Level 3', 'Head Constable Level 4', 'Assistant Sub-Inspector (ASI) Level 5', 'Sub-Inspector (SI) Level 6', 'Inspector Level 7'],
  },
  {
    slug: 'ssc-cgl-inspector',
    title: 'SSC CGL Inspector (Income Tax / GST & Central Excise)',
    department: 'Ministry of Finance (CBDT / CBIC)',
    level: 7,
    gradePay: '4600',
    group: 'B',
    description: 'Premier executive post recruited through Staff Selection Commission Combined Graduate Level Examination.',
    typicalRecruitment: 'SSC CGL Examination (Graduation)',
    entryBasic7th: 44900,
    responsibilities: [
      'Assessment, revenue collection, audits, and anti-evasion raids',
      'Investigation of financial transactions and verification of returns',
      'Border cargo examination, customs clearance and port surveillance',
    ],
    careerProgression: ['Inspector Level 7', 'Superintendent / ITO Level 8 / 9', 'Assistant Commissioner Level 10 (IRS equivalent)', 'Deputy Commissioner Level 11'],
  },
  {
    slug: 'aso-css',
    title: 'Assistant Section Officer (ASO in CSS / MEA / Railway)',
    department: 'Central Secretariat Service (CSS), MEA, Ministry of Defence',
    level: 7,
    gradePay: '4600',
    group: 'B',
    description: 'Core administrative backbone responsible for drafting government policies, cabinet notes, and official files.',
    typicalRecruitment: 'SSC CGL Examination (Top Rankers)',
    entryBasic7th: 44900,
    responsibilities: [
      'Scrutinizing policy proposals and preparing draft notes for Under Secretaries',
      'Inter-ministerial correspondence and parliamentary question replies',
      'Foreign posting opportunities with generous foreign allowances (for MEA ASO)',
    ],
    careerProgression: ['ASO Level 7', 'Section Officer (SO) Level 8/10', 'Under Secretary Level 11', 'Deputy Secretary Level 12', 'Director Level 13'],
  },
  {
    slug: 'railway-alp',
    title: 'Railway Assistant Loco Pilot (ALP)',
    department: 'Ministry of Railways (Indian Railways)',
    level: 2,
    gradePay: '1900',
    group: 'C',
    description: 'Locomotive piloting personnel operating express, passenger, and freight trains with substantial Running Allowances.',
    typicalRecruitment: 'RRB ALP Examination (ITI / Diploma / B.Tech)',
    entryBasic7th: 19900,
    responsibilities: [
      'Assisting Loco Pilot in train navigation and signal monitoring',
      'Engine checks, emergency braking and vigilance control verification',
      'Running Allowance, paid for kilometres run, which can add substantially to monthly pay',
    ],
    careerProgression: ['Assistant Loco Pilot Level 2', 'Senior ALP Level 4', 'Loco Pilot (Goods) Level 6', 'Loco Pilot (Passenger) Level 6', 'Loco Pilot (Mail/Express) Level 6'],
  },
  {
    slug: 'station-master',
    title: 'Railway Station Master',
    department: 'Indian Railways (Operating Branch)',
    level: 6,
    gradePay: '4200',
    group: 'B',
    description: 'Overall in-charge of railway station train movements, safety signalling, passenger amenities, and staff management.',
    typicalRecruitment: 'RRB NTPC Graduate Examination',
    entryBasic7th: 35400,
    responsibilities: [
      'Authorizing train line clearances, shunting, and panel operations',
      'Ensuring strict adherence to General and Subsidiary Railway Rules (G&SR)',
      'Night duty allowance, national holiday allowance, and stress allowance',
    ],
    careerProgression: ['Station Master Level 6', 'Station Superintendent Level 7', 'Assistant Operations Manager (AOM) Level 10', 'Divisional Operations Manager (DOM) Level 11'],
  },
  {
    slug: 'kvs-tgt-pgt-teacher',
    title: 'Kendriya Vidyalaya Teacher (PRT / TGT / PGT)',
    department: 'Ministry of Education (KVS / NVS / Central Schools)',
    level: 7,
    gradePay: '4600',
    group: 'B',
    description: 'Faculty in central autonomous residential and day schools catering to children of central government employees.',
    typicalRecruitment: 'KVS Direct Recruitment (Graduation + B.Ed + CTET)',
    entryBasic7th: 44900,
    responsibilities: [
      'Curriculum delivery, laboratory classes, and CBSE board examination preparation',
      'CCA activities, student counseling and academic evaluation',
      'Summer and winter vacation with full salary benefits',
    ],
    careerProgression: ['TGT Level 7', 'PGT Level 8 (GP 4800, Basic ₹47,600)', 'Vice-Principal Level 10 (Basic ₹56,100)', 'Principal Level 12 (Basic ₹78,800)'],
  },
  {
    slug: 'defence-ranks',
    title: 'Defence Forces (Sepoy, Subedar, Captain, Colonel)',
    department: 'Ministry of Defence (Indian Army, Navy, Air Force)',
    level: 10,
    gradePay: '5400',
    group: 'A',
    description: 'Armed forces officer and JCO/OR cadres receiving additional Military Service Pay (MSP: ₹5,200 for JCO/OR, ₹15,500 for Officers).',
    typicalRecruitment: 'NDA, CDS, AFCAT, Technical Entry & Agniveer/Recruitment Rallies',
    entryBasic7th: 56100,
    responsibilities: [
      'National territorial defence, combat readiness, and humanitarian disaster relief',
      'MSP addition counts for Dearness Allowance (DA) and Pension',
      'High altitude allowance, field area allowance, and canteen (CSD) subsidies',
    ],
    careerProgression: ['Lieutenant Level 10', 'Captain Level 10B', 'Major Level 11', 'Lt. Colonel Level 12A', 'Colonel Level 13', 'Brigadier Level 13A'],
  },
  {
    slug: 'civil-services-ias-ips',
    title: 'Civil Services (IAS / IPS / IRS Junior Time Scale)',
    department: 'DoPT, Ministry of Home Affairs, Ministry of Finance',
    level: 10,
    gradePay: '5400',
    group: 'A',
    description: 'Premier all-India civil service cadre leading district administration, policing, and central ministries.',
    typicalRecruitment: 'UPSC Civil Services Examination (CSE)',
    entryBasic7th: 56100,
    responsibilities: [
      'Sub-Divisional Magistrate (SDM) / Assistant Superintendent of Police (ASP)',
      'Implementation of central schemes, law enforcement and revenue administration',
      'Official residence (Type V/VI), vehicle with driver, and security detail',
    ],
    careerProgression: ['Junior Time Scale Level 10 (₹56,100)', 'Senior Time Scale Level 11 (₹67,700)', 'Junior Administrative Grade Level 12 (₹78,800)', 'Selection Grade Level 13 (₹1,23,100)', 'Super Time Scale (Joint Sec / IG) Level 14 (₹1,44,200)', 'Apex Scale (Chief Sec) Level 17 (₹2,25,000)', 'Cabinet Secretary Level 18 (₹2,50,000)'],
  },
];

export interface NewsItem {
  id: string;
  /** Date of the decision, notification or report */
  date: string;
  source: string;
  sourceUrl: string;
  title: string;
  summary: string;
  officialTag: 'Cabinet Approval' | 'Pay Commission' | 'Pension Department' | 'Media Report';
  /** True only when sourceUrl is the Government's or the Commission's own publication */
  isOfficial: boolean;
}

/** Newest first. Add only real, dated events, each with a link to its source. */
export const OFFICIAL_NEWS_UPDATES: NewsItem[] = [
  {
    id: 'da-jul-2026',
    date: '28 October 2026',
    source: 'Union Cabinet (PM India release)',
    sourceUrl: 'https://www.pmindia.gov.in/?p=16966378',
    title: 'DA raised to 63% from 1 July 2026',
    summary:
      'The Cabinet approved a 3% increase in Dearness Allowance and Dearness Relief, from 60% to 63% of basic pay or pension, with effect from 1 July 2026. The release puts the cost at ₹10,016.10 crore a year and says it covers about 48.54 lakh employees and 68.71 lakh pensioners.',
    officialTag: 'Cabinet Approval',
    isOfficial: true,
  },
  {
    id: 'da-jan-2026',
    date: '18 April 2026',
    source: 'Press Information Bureau',
    sourceUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2253245',
    title: 'DA raised to 60% from 1 January 2026',
    summary:
      'The Cabinet approved a 2% increase in Dearness Allowance and Dearness Relief, from 58% to 60%, with effect from 1 January 2026, under the 7th CPC formula.',
    officialTag: 'Cabinet Approval',
    isOfficial: true,
  },
  {
    id: 'jcm-memorandum-2026',
    date: '14 April 2026',
    source: 'Business Today (media report)',
    sourceUrl:
      'https://www.businesstoday.in/personal-finance/news/story/8th-pay-commission-nc-jcm-seeks-rs-69000-minimum-salary-6-annual-increment-check-key-demands-525740-2026-04-15',
    title: 'Staff Side of NC-JCM submits its memorandum to the 8th CPC',
    summary:
      'According to media reports, the Staff Side of the National Council (JCM) asked for a fitment factor of 3.83, which would raise the minimum basic pay from ₹18,000 to about ₹69,000, along with a 6% annual increment. These are the employees’ demands, not decisions.',
    officialTag: 'Media Report',
    isOfficial: false,
  },
  {
    id: 'cpc8-constituted',
    date: '3 November 2025',
    source: '8th Central Pay Commission',
    sourceUrl: 'https://8cpc.gov.in/',
    title: '8th Central Pay Commission constituted',
    summary:
      'The Government constituted the 8th Central Pay Commission by a notification dated 3 November 2025. Its chairperson is Justice Ranjana Prakash Desai, with Prof. Pulak Ghosh as part-time member and Shri Pankaj Jain as member-secretary.',
    officialTag: 'Pay Commission',
    isOfficial: true,
  },
  {
    id: 'cpc8-tor',
    date: '28 October 2025',
    source: 'Press Information Bureau',
    sourceUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2183289',
    title: 'Cabinet approves the 8th CPC’s Terms of Reference',
    summary:
      'The Commission is to make its recommendations within 18 months of its constitution, which puts its report by about May 2027. The release notes that, going by past practice, the recommendations would normally take effect from 1 January 2026; the actual date will be decided by the Government.',
    officialTag: 'Cabinet Approval',
    isOfficial: true,
  },
  {
    id: 'ups-approved',
    date: '24 August 2024',
    source: 'Press Information Bureau',
    sourceUrl: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2048607',
    title: 'Cabinet approves the Unified Pension Scheme (UPS)',
    summary:
      'UPS gives an assured pension of 50% of the average basic pay of the last 12 months for 25 years of qualifying service (proportionately less down to 10 years), a family pension of 60% of that pension, a minimum pension of ₹10,000 a month after 10 years, dearness relief on all three, and a lump sum at superannuation.',
    officialTag: 'Cabinet Approval',
    isOfficial: true,
  },
  {
    id: 'gratuity-25-lakh',
    date: 'May 2024',
    source: 'Department of Pension & Pensioners’ Welfare',
    sourceUrl: 'https://doppw.gov.in/',
    title: 'Gratuity ceiling raised from ₹20 lakh to ₹25 lakh',
    summary:
      'Following the 7th CPC recommendation that the gratuity ceiling rise by 25% when DA reaches 50%, the maximum retirement and death gratuity was raised to ₹25 lakh with effect from 1 January 2024, for employees covered by the CCS (Pension) Rules, 2021 and the CCS (Payment of Gratuity under NPS) Rules, 2021.',
    officialTag: 'Pension Department',
    isOfficial: true,
  },
];

/** DA under the 7th CPC, newest first. "change" is the increase over the previous rate. */
export const DA_RATES_HISTORY = [
  { period: 'From July 2026', rate: 63, change: 3 },
  { period: 'January 2026', rate: 60, change: 2 },
  { period: 'July 2025', rate: 58, change: 3 },
  { period: 'January 2025', rate: 55, change: 2 },
  { period: 'July 2024', rate: 53, change: 3 },
  { period: 'January 2024', rate: 50, change: 4 },
  { period: 'July 2023', rate: 46, change: 4 },
  { period: 'January 2023', rate: 42, change: 4 },
  { period: 'July 2022', rate: 38, change: 4 },
  { period: 'January 2022', rate: 34, change: 3 },
  { period: 'July 2021 (frozen instalments restored)', rate: 31, change: 14 },
  { period: 'January 2020 to June 2021 (frozen)', rate: 17, change: 0 },
];
