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
      'Running Allowance (KMA - Kilometerage Allowance) adds ₹15,000 to ₹35,000+ monthly',
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
    careerProgression: ['Lieutenant Level 10', 'Captain Level 10B', 'Major Level 11', 'Lt. Colonel Level 12', 'Colonel Level 13', 'Brigadier Level 13A'],
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
  date: string;
  source: string;
  sourceUrl: string;
  title: string;
  summary: string;
  officialTag: 'Cabinet Approval' | 'DoPT' | 'Finance Ministry' | '8th CPC Committee' | 'Analysis';
  isOfficial: boolean;
}

export const OFFICIAL_NEWS_UPDATES: NewsItem[] = [
  {
    id: 'news-1',
    date: 'November 3, 2025',
    source: 'Ministry of Finance, Govt of India',
    sourceUrl: 'https://8cpc.gov.in',
    title: '8th Central Pay Commission Officially Constituted under Justice Ranjana Prakash Desai',
    summary: 'The Union Cabinet officially approved the formation of the 8th Central Pay Commission, headed by former Supreme Court Justice Ranjana Prakash Desai. The Commission is mandated to examine salary structures, allowances, pensionary benefits, and parity issues for over 50 lakh central government employees and 69 lakh pensioners.',
    officialTag: 'Cabinet Approval',
    isOfficial: true,
  },
  {
    id: 'news-2',
    date: 'February 2026',
    source: 'DoPT & Staff Side JCM',
    sourceUrl: 'https://dopt.gov.in',
    title: 'Staff Side of National Council (JCM) Submits Memorandum for Minimum 2.86 Fitment Factor',
    summary: 'The Joint Consultative Machinery (JCM) staff side submitted a comprehensive memorandum proposing minimum entry basic pay of ₹34,500 for Level 1, reflecting a 2.86 fitment factor to offset inflation since the 7th CPC base year.',
    officialTag: 'DoPT',
    isOfficial: true,
  },
  {
    id: 'news-3',
    date: 'August 24, 2024 / Notified 2025',
    source: 'Union Cabinet / Ministry of Finance',
    sourceUrl: 'https://pib.gov.in',
    title: 'Unified Pension Scheme (UPS) Cleared with 50% Assured Pension & Inflation Indexation',
    summary: 'Cabinet approved UPS providing central employees with an assured 50% pension based on last 12 months average basic pay, minimum ₹10,000 pension, 60% family pension, and dearness relief (DR) linkage, with government contribution increased to 18.5%.',
    officialTag: 'Cabinet Approval',
    isOfficial: true,
  },
  {
    id: 'news-4',
    date: 'Current Schedule',
    source: 'Terms of Reference (ToR) Gazette',
    sourceUrl: 'https://8cpc.gov.in',
    title: 'Report Expected by May 2027: Implementation & Arrears Outlook',
    summary: 'As per standard CPC terms, the Commission has been granted an 18-month tenure to hold stakeholder consultations with staff unions, state governments, and defence services. Final implementation decisions and potential retroactive effect from January 1, 2026 will be determined by the Union Cabinet post-report submission.',
    officialTag: '8th CPC Committee',
    isOfficial: true,
  },
  {
    id: 'news-5',
    date: 'July 2024 Notification',
    source: 'Department of Expenditure',
    sourceUrl: 'https://doe.gov.in',
    title: 'Gratuity Ceiling Enhanced by 25% to ₹25 Lakh as DA Crossed 50% Threshold',
    summary: 'Following the increase of Dearness Allowance to 50%+, the statutory cap on Retirement Gratuity and Death Gratuity was formally raised from ₹20 Lakh to ₹25 Lakh under 7th CPC recommendations.',
    officialTag: 'Finance Ministry',
    isOfficial: true,
  },
];

export const DA_RATES_HISTORY = [
  { period: 'Jan 2026 (Projected)', rate: 58, hike: 3, aicpinAvg: '143.5' },
  { period: 'July 2025 (Projected)', rate: 55, hike: 2, aicpinAvg: '141.2' },
  { period: 'Jan 2025', rate: 53, hike: 0, aicpinAvg: '139.8' },
  { period: 'July 2024', rate: 53, hike: 3, aicpinAvg: '139.1' },
  { period: 'Jan 2024', rate: 50, hike: 4, aicpinAvg: '138.5' },
  { period: 'July 2023', rate: 46, hike: 4, aicpinAvg: '136.0' },
  { period: 'Jan 2023', rate: 42, hike: 4, aicpinAvg: '132.8' },
  { period: 'July 2022', rate: 38, hike: 4, aicpinAvg: '129.2' },
  { period: 'Jan 2022', rate: 34, hike: 3, aicpinAvg: '125.1' },
  { period: 'July 2021', rate: 31, hike: 3, aicpinAvg: '122.8' },
  { period: 'Jan 2020 - Jun 2021', rate: 17, hike: 0, aicpinAvg: 'Frozen (Covid-19)' },
];
