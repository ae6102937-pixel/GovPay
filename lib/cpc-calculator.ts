/**
 * Central Government Pay & Pension Calculation Engine
 * Accurate formulations based on 7th CPC, DoPT guidelines, MoF circulars,
 * 8th CPC Terms of Reference (Justice Ranjana Prakash Desai Committee),
 * and Unified Pension Scheme (UPS) notified guidelines.
 */

export interface PayMatrixCell {
  level: number;
  stage: number;
  basic7th: number;
  projected8th: number;
}

export type CityClass = 'X' | 'Y' | 'Z';

export interface SalaryBreakdown {
  level: number;
  gradePayEquivalent: string;
  basic7th: number;
  fitmentFactor: number;
  projectedBasic8th: number;
  
  // 7th CPC Current
  daPercent7th: number;
  daAmount7th: number;
  hraPercent7th: number;
  hraAmount7th: number;
  taBase7th: number;
  taTotal7th: number;
  gross7th: number;
  npsDeduction7th: number;
  cghs7th: number;
  cgegis7th: number;
  profTax7th: number;
  totalDeductions7th: number;
  inHand7th: number;

  // 8th CPC Projected
  daPercent8th: number;
  daAmount8th: number;
  hraPercent8th: number;
  hraAmount8th: number;
  taBase8th: number;
  taTotal8th: number;
  gross8th: number;
  npsDeduction8th: number;
  cghs8th: number;
  cgegis8th: number;
  profTax8th: number;
  totalDeductions8th: number;
  inHand8th: number;

  // Differences
  grossIncrease: number;
  inHandIncrease: number;
  percentageIncrease: number;
}

// 7th CPC Entry Pay Table for Levels 1 to 18
export const ENTRY_PAY_7TH: Record<number, { entryPay: number; gradePay: string; group: 'A' | 'B' | 'C'; designation: string }> = {
  1: { entryPay: 18000, gradePay: '1800', group: 'C', designation: 'MTS, Peon, Attendant, Helper' },
  2: { entryPay: 19900, gradePay: '1900', group: 'C', designation: 'LDC, Junior Clerk, Constable GD Entry' },
  3: { entryPay: 21700, gradePay: '2000', group: 'C', designation: 'Central Police Constable, CISF/CRPF/BSF/ITBP' },
  4: { entryPay: 25500, gradePay: '2400', group: 'C', designation: 'UDC, Head Constable, Postal Assistant, Tax Assistant' },
  5: { entryPay: 29200, gradePay: '2800', group: 'C', designation: 'Auditor, Accountant, ASI, Senior Clerk' },
  6: { entryPay: 35400, gradePay: '4200', group: 'B', designation: 'Sub-Inspector, Railway Station Master, KVS PRT' },
  7: { entryPay: 44900, gradePay: '4600', group: 'B', designation: 'SSC CGL Inspector (Income Tax/Excise), ASO, KVS TGT' },
  8: { entryPay: 47600, gradePay: '4800', group: 'B', designation: 'Assistant Accounts Officer, KVS PGT, Section Officer' },
  9: { entryPay: 53100, gradePay: '5400', group: 'B', designation: 'Senior Section Officer, Medical Officer, Accounts Officer' },
  10: { entryPay: 56100, gradePay: '5400', group: 'A', designation: 'Civil Services Entry (IAS, IPS, IRS), Captain, Assistant Commissioner' },
  11: { entryPay: 67700, gradePay: '6600', group: 'A', designation: 'Major, Deputy Secretary, Joint Commissioner' },
  12: { entryPay: 78800, gradePay: '7600', group: 'A', designation: 'Lt. Colonel, Director, Additional Commissioner' },
  13: { entryPay: 123100, gradePay: '8700', group: 'A', designation: 'Colonel, DIG, Joint Secretary' },
  131: { entryPay: 131100, gradePay: '8900', group: 'A', designation: 'Brigadier, IG' },
  14: { entryPay: 144200, gradePay: '10000', group: 'A', designation: 'Major General, Joint Secretary (Senior), Additional Secretary' },
  15: { entryPay: 182200, gradePay: 'HAG', group: 'A', designation: 'Lt. General, Principal Secretary, Additional Secretary' },
  16: { entryPay: 205400, gradePay: 'HAG+', group: 'A', designation: 'Special Secretary, Army Commander' },
  17: { entryPay: 225000, gradePay: 'Apex', group: 'A', designation: 'Secretary to Govt. of India, DGP, Vice Chief of Staff' },
  18: { entryPay: 250000, gradePay: 'Cabinet Sec', group: 'A', designation: 'Cabinet Secretary, Chief of Defence Staff' }
};

// 7th CPC full level sample steps (stages 1 to 10 for quick lookups and calculations)
export function get7thCPCPayMatrix(level: number, stage: number = 1): number {
  const entry = ENTRY_PAY_7TH[level]?.entryPay || 18000;
  // Annual increment is ~3% rounded to next multiple of 100
  let pay = entry;
  for (let s = 1; s < stage; s++) {
    pay = Math.round((pay * 1.03) / 100) * 100;
  }
  return pay;
}

// Commutation factor table (Age on next birthday -> Factor)
export const COMMUTATION_TABLE: Record<number, number> = {
  55: 8.595,
  56: 8.532,
  57: 8.463,
  58: 8.385,
  59: 8.297,
  60: 8.194, // Standard retirement age
  61: 8.077,
  62: 7.947,
  63: 7.802,
  64: 7.641,
  65: 7.465,
};

export function getHRAPercent(cityClass: CityClass, daPercent: number): number {
  // As per 7th CPC rules, HRA revised when DA crossed 50%:
  // X: 30%, Y: 20%, Z: 10%
  // (Previously 24%, 16%, 8% before DA hit 25%, and 27%, 18%, 9% between 25-50%)
  if (daPercent >= 50) {
    if (cityClass === 'X') return 30;
    if (cityClass === 'Y') return 20;
    return 10;
  }
  if (daPercent >= 25) {
    if (cityClass === 'X') return 27;
    if (cityClass === 'Y') return 18;
    return 9;
  }
  if (cityClass === 'X') return 24;
  if (cityClass === 'Y') return 16;
  return 8;
}

export function getBaseTransportAllowance(level: number, cityClass: CityClass): number {
  // Higher TPTA cities (X cities and specified 19 major cities):
  // Level 1-2: 1350 (Other: 900)
  // Level 3-8: 3600 (Other: 1800)
  // Level 9+: 7200 (Other: 3600)
  const isHigherCity = cityClass === 'X';
  if (level <= 2) {
    return isHigherCity ? 1350 : 900;
  }
  if (level <= 8) {
    return isHigherCity ? 3600 : 1800;
  }
  return isHigherCity ? 7200 : 3600;
}

export function getCGHSDeduction(level: number): number {
  if (level <= 5) return 250;
  if (level === 6) return 450;
  if (level <= 11) return 650;
  return 1000;
}

export function getCGEGISDeduction(level: number): number {
  if (level <= 5) return 30; // Group C
  if (level <= 9) return 60; // Group B
  return 120; // Group A
}

export function calculate8thCPCSalary(params: {
  level: number;
  basic7th: number;
  fitmentFactor: number;
  cityClass: CityClass;
  currentDA?: number;
  projectedDA8th?: number;
  isUPS?: boolean;
}): SalaryBreakdown {
  const {
    level,
    basic7th,
    fitmentFactor,
    cityClass,
    currentDA = 53,
    projectedDA8th = 0, // Usually resets to 0% or low initial DA upon implementation
  } = params;

  const meta = ENTRY_PAY_7TH[level] || ENTRY_PAY_7TH[1];

  // 1. Current 7th CPC Calculation
  const daAmount7th = Math.round((basic7th * currentDA) / 100);
  const hraPercent7th = getHRAPercent(cityClass, currentDA);
  const hraAmount7th = Math.round((basic7th * hraPercent7th) / 100);
  const taBase7th = getBaseTransportAllowance(level, cityClass);
  const daOnTa7th = Math.round((taBase7th * currentDA) / 100);
  const taTotal7th = taBase7th + daOnTa7th;
  const gross7th = basic7th + daAmount7th + hraAmount7th + taTotal7th;

  // Deductions 7th
  const npsDeduction7th = Math.round(((basic7th + daAmount7th) * 10) / 100);
  const cghs7th = getCGHSDeduction(level);
  const cgegis7th = getCGEGISDeduction(level);
  const profTax7th = 200;
  const totalDeductions7th = npsDeduction7th + cghs7th + cgegis7th + profTax7th;
  const inHand7th = gross7th - totalDeductions7th;

  // 2. Projected 8th CPC Calculation
  // Fitment factor replaces (Basic + DA merged) into new basic pay, rounded to next 100
  const unrounded8th = basic7th * fitmentFactor;
  const projectedBasic8th = Math.round(unrounded8th / 100) * 100;

  const daPercent8th = projectedDA8th;
  const daAmount8th = Math.round((projectedBasic8th * daPercent8th) / 100);
  // Initial HRA on fresh pay commission: 24/16/8% until DA reaches 25% again
  const hraPercent8th = getHRAPercent(cityClass, daPercent8th);
  const hraAmount8th = Math.round((projectedBasic8th * hraPercent8th) / 100);
  // Transport allowance is also typically multiplied by fitment or adjusted; let's project base TA with fitment
  const taBase8th = Math.round((taBase7th * fitmentFactor) / 100) * 100;
  const daOnTa8th = Math.round((taBase8th * daPercent8th) / 100);
  const taTotal8th = taBase8th + daOnTa8th;
  const gross8th = projectedBasic8th + daAmount8th + hraAmount8th + taTotal8th;

  // Deductions 8th
  const npsDeduction8th = Math.round(((projectedBasic8th + daAmount8th) * 10) / 100);
  const cghs8th = Math.round((cghs7th * 1.5) / 50) * 50; // estimated revision
  const cgegis8th = cgegis7th;
  const profTax8th = 200;
  const totalDeductions8th = npsDeduction8th + cghs8th + cgegis8th + profTax8th;
  const inHand8th = gross8th - totalDeductions8th;

  const grossIncrease = gross8th - gross7th;
  const inHandIncrease = inHand8th - inHand7th;
  const percentageIncrease = inHand7th > 0 ? Number(((inHandIncrease / inHand7th) * 100).toFixed(1)) : 0;

  return {
    level,
    gradePayEquivalent: meta.gradePay,
    basic7th,
    fitmentFactor,
    projectedBasic8th,
    daPercent7th: currentDA,
    daAmount7th,
    hraPercent7th,
    hraAmount7th,
    taBase7th,
    taTotal7th,
    gross7th,
    npsDeduction7th,
    cghs7th,
    cgegis7th,
    profTax7th,
    totalDeductions7th,
    inHand7th,
    daPercent8th,
    daAmount8th,
    hraPercent8th,
    hraAmount8th,
    taBase8th,
    taTotal8th,
    gross8th,
    npsDeduction8th,
    cghs8th,
    cgegis8th,
    profTax8th,
    totalDeductions8th,
    inHand8th,
    grossIncrease,
    inHandIncrease,
    percentageIncrease,
  };
}

// Pension calculation
export function calculatePensionDetails(params: {
  lastBasic: number;
  drPercent: number;
  commutationPercent?: number; // 0 to 40%
  ageNextBirthday?: number;
  qualifyingServiceYears?: number;
}) {
  const {
    lastBasic,
    drPercent,
    commutationPercent = 40,
    ageNextBirthday = 61,
    qualifyingServiceYears = 30,
  } = params;

  // Minimum service for full pension is 10 years, full pension is 50% of last pay
  const isEligible = qualifyingServiceYears >= 10;
  const fullPension = Math.round(lastBasic * 0.5);
  const drAmount = Math.round((fullPension * drPercent) / 100);
  const totalMonthlyPensionBeforeCommutation = fullPension + drAmount;

  // Commutation
  const commFactor = COMMUTATION_TABLE[ageNextBirthday] || 8.194;
  const commPortion = Math.min(Math.max(commutationPercent, 0), 40);
  const commutedPensionMonthly = Math.round((fullPension * commPortion) / 100);
  const commutedLumpSum = Math.round(commutedPensionMonthly * 12 * commFactor);

  // Reduced monthly pension: (Full pension - Commuted portion) + Full DR on Original Pension
  const residualPension = fullPension - commutedPensionMonthly;
  const reducedMonthlyPension = residualPension + drAmount;

  // Family Pension:
  // Normal Family Pension: 30% of last pay
  // Enhanced Family Pension: 50% of last pay (up to 10 years or age 67)
  const normalFamilyPension = Math.max(9000, Math.round(lastBasic * 0.3));
  const enhancedFamilyPension = Math.round(lastBasic * 0.5);

  return {
    isEligible,
    fullPension,
    drPercent,
    drAmount,
    totalMonthlyPensionBeforeCommutation,
    commPortion,
    commFactor,
    commutedPensionMonthly,
    commutedLumpSum,
    residualPension,
    reducedMonthlyPension,
    normalFamilyPension,
    normalFamilyPensionWithDR: normalFamilyPension + Math.round((normalFamilyPension * drPercent) / 100),
    enhancedFamilyPension,
    enhancedFamilyPensionWithDR: enhancedFamilyPension + Math.round((enhancedFamilyPension * drPercent) / 100),
  };
}

// UPS vs NPS Comprehensive Comparison
export function compareUPSvsNPS(params: {
  currentAge: number;
  retirementAge?: number;
  currentBasic: number;
  currentDaPercent: number;
  annualSalaryGrowthRate?: number; // default 5% (annual increment + DA hikes)
  npsExpectedReturn?: number; // default 9.5%
  annuityReturnRate?: number; // default 6.0%
  completedYearsOfService: number;
  totalServiceYearsAtRetirement?: number;
}) {
  const {
    currentAge,
    retirementAge = 60,
    currentBasic,
    currentDaPercent,
    annualSalaryGrowthRate = 0.06,
    npsExpectedReturn = 0.095,
    annuityReturnRate = 0.06,
    completedYearsOfService,
  } = params;

  const yearsToRetirement = Math.max(1, retirementAge - currentAge);
  const totalServiceYears = completedYearsOfService + yearsToRetirement;

  // Project final basic at retirement
  const projectedLastBasic = Math.round(currentBasic * Math.pow(1 + annualSalaryGrowthRate, yearsToRetirement));
  const projectedLastDA = currentDaPercent + yearsToRetirement * 6; // approximate DA rising ~6% p.a.
  const projectedLastEmoluments = projectedLastBasic * (1 + projectedLastDA / 100);

  // 1. UPS (Unified Pension Scheme)
  // Assured pension: 50% of avg basic pay of last 12 months for 25+ years (pro-rata for 10-25 yrs, min ₹10,000)
  let upsPensionRatio = 0.5;
  if (totalServiceYears < 25) {
    upsPensionRatio = (0.5 * totalServiceYears) / 25;
  }
  const upsMonthlyBasePension = Math.max(10000, Math.round(projectedLastBasic * upsPensionRatio));
  const upsMonthlyDR = Math.round((upsMonthlyBasePension * projectedLastDA) / 100);
  const upsInitialMonthlyPension = upsMonthlyBasePension + upsMonthlyDR;

  // UPS Superannuation Lump Sum: 1/10th of monthly emoluments (Pay + DA) for every completed 6 months
  const sixMonthBlocks = Math.floor(totalServiceYears * 2);
  const upsSuperannuationLumpSum = Math.round((projectedLastEmoluments / 10) * sixMonthBlocks);

  // 2. NPS (National Pension System)
  // Monthly contribution: 10% employee + 14% govt = 24% of Basic + DA
  // Let's project accumulated corpus
  let corpus = 0;
  let runningBasic = currentBasic;
  let runningDA = currentDaPercent;
  const monthlyReturn = Math.pow(1 + npsExpectedReturn, 1 / 12) - 1;

  for (let y = 0; y < yearsToRetirement; y++) {
    const monthlyEmoluments = runningBasic * (1 + runningDA / 100);
    const monthlyContribution = monthlyEmoluments * 0.24; // 10% + 14%
    for (let m = 0; m < 12; m++) {
      corpus = (corpus + monthlyContribution) * (1 + monthlyReturn);
    }
    runningBasic *= 1 + annualSalaryGrowthRate;
    runningDA += 6;
  }

  const npsTotalCorpus = Math.round(corpus);
  const npsLumpSum60 = Math.round(npsTotalCorpus * 0.6); // 60% tax-free lump sum
  const npsAnnuityCorpus40 = Math.round(npsTotalCorpus * 0.4); // 40% mandatory annuity
  const npsMonthlyAnnuity = Math.round((npsAnnuityCorpus40 * annuityReturnRate) / 12);

  return {
    yearsToRetirement,
    totalServiceYears,
    projectedLastBasic,
    projectedLastDA,
    projectedLastEmoluments: Math.round(projectedLastEmoluments),
    ups: {
      guaranteedMonthlyPension: upsInitialMonthlyPension,
      basePension: upsMonthlyBasePension,
      drAmount: upsMonthlyDR,
      familyPension: Math.round(upsInitialMonthlyPension * 0.6),
      superannuationLumpSum: upsSuperannuationLumpSum,
      hasInflationIndexation: true,
      minServiceRequired: 10,
      govtContributionPercent: 18.5,
    },
    nps: {
      totalCorpus: npsTotalCorpus,
      taxFreeLumpSum: npsLumpSum60,
      annuityCorpus: npsAnnuityCorpus40,
      monthlyAnnuity: npsMonthlyAnnuity,
      hasInflationIndexation: false,
      marketRisk: 'Subject to fund performance (equity & bond returns)',
    },
  };
}

// Retirement Gratuity & Leave Encashment
export function calculateGratuityAndLeave(params: {
  lastBasic: number;
  daPercent: number;
  qualifyingServiceYears: number; // Max 33 years
  earnedLeaveDays?: number; // Max 300 days
  halfPayLeaveDays?: number;
}) {
  const {
    lastBasic,
    daPercent,
    qualifyingServiceYears,
    earnedLeaveDays = 300,
  } = params;

  const emoluments = lastBasic + Math.round((lastBasic * daPercent) / 100);
  
  // Qualifying service capped at 33 years (66 six-month periods)
  const cappedYears = Math.min(33, qualifyingServiceYears);
  const completedSixMonths = Math.floor(cappedYears * 2);

  // Gratuity = (Emoluments * completed six month periods) / 4
  // Max cap: ₹20 Lakhs under 7th CPC, enhanced by 25% to ₹25 Lakhs after DA reached 50%!
  const rawGratuity = Math.round((emoluments * completedSixMonths) / 4);
  const gratuityCap = daPercent >= 50 ? 2500000 : 2000000;
  const gratuityPayable = Math.min(rawGratuity, gratuityCap);

  // Leave Encashment = (Emoluments / 30) * capped leave days (max 300)
  const cappedLeave = Math.min(300, Math.max(0, earnedLeaveDays));
  const leaveEncashmentPayable = Math.round((emoluments / 30) * cappedLeave);

  return {
    emoluments,
    completedSixMonths,
    rawGratuity,
    gratuityCap,
    gratuityPayable,
    cappedLeave,
    leaveEncashmentPayable,
    totalRetirementBenefits: gratuityPayable + leaveEncashmentPayable,
  };
}
