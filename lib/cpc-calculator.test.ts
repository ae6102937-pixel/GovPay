import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculate8thCPCSalary,
  calculatePensionDetails,
  compareUPSvsNPS,
  calculateGratuityAndLeave,
  get7thCPCPayMatrix,
  ENTRY_PAY_7TH,
  getHRAPercent,
} from './cpc-calculator.ts';

test('HRA percentages correctly adapt to DA crossing 50%', () => {
  // Above 50% DA: X=30%, Y=20%, Z=10%
  assert.equal(getHRAPercent('X', 53), 30);
  assert.equal(getHRAPercent('Y', 53), 20);
  assert.equal(getHRAPercent('Z', 53), 10);

  // Between 25% and 50% DA: X=27%, Y=18%, Z=9%
  assert.equal(getHRAPercent('X', 46), 27);
  assert.equal(getHRAPercent('Y', 46), 18);
  assert.equal(getHRAPercent('Z', 46), 9);
});

test('7th CPC Level 7 Inspector salary calculation', () => {
  const result = calculate8thCPCSalary({
    level: 7,
    basic7th: 44900,
    fitmentFactor: 2.57,
    cityClass: 'X',
    currentDA: 53,
    projectedDA8th: 0,
  });

  // Verify 7th CPC components
  assert.equal(result.basic7th, 44900);
  assert.equal(result.daAmount7th, Math.round(44900 * 0.53)); // 23797
  assert.equal(result.hraAmount7th, Math.round(44900 * 0.30)); // 13470
  assert.ok(result.inHand7th > 0);

  // Projected 8th CPC with 2.57 fitment factor
  const expected8thBasic = Math.round((44900 * 2.57) / 100) * 100;
  assert.equal(result.projectedBasic8th, expected8thBasic);
  assert.ok(result.inHand8th > result.inHand7th);
  assert.ok(result.grossIncrease > 0);
});

test('Pension calculation and 40% commutation', () => {
  const pension = calculatePensionDetails({
    lastBasic: 80000,
    drPercent: 53,
    commutationPercent: 40,
    ageNextBirthday: 61,
    qualifyingServiceYears: 30,
  });

  assert.equal(pension.isEligible, true);
  assert.equal(pension.fullPension, 40000); // 50% of 80000
  assert.equal(pension.drAmount, 21200); // 53% of 40000
  assert.equal(pension.commutedPensionMonthly, 16000); // 40% of 40000
  assert.equal(pension.residualPension, 24000); // 40000 - 16000
  assert.equal(pension.reducedMonthlyPension, 24000 + 21200); // Residual + Full DR
  assert.ok(pension.commutedLumpSum > 0);
  assert.equal(pension.normalFamilyPension, 24000); // 30% of 80000
});

test('Gratuity cap enhancement to 25 Lakhs when DA >= 50%', () => {
  const res = calculateGratuityAndLeave({
    lastBasic: 200000,
    daPercent: 53,
    qualifyingServiceYears: 33,
    earnedLeaveDays: 300,
  });

  assert.equal(res.gratuityCap, 2500000);
  assert.equal(res.gratuityPayable, 2500000); // Raw exceeds 25L so capped at 25L
  assert.ok(res.leaveEncashmentPayable > 0);
});

test('Pay matrix stages increment ~3% correctly', () => {
  const stage1 = get7thCPCPayMatrix(1, 1);
  const stage2 = get7thCPCPayMatrix(1, 2);
  assert.equal(stage1, 18000);
  assert.equal(stage2, 18500); // 18000 * 1.03 = 18540 rounded to 18500
});

test('UPS vs NPS comparison gives valid projections', () => {
  const comp = compareUPSvsNPS({
    currentAge: 35,
    retirementAge: 60,
    currentBasic: 45000,
    currentDaPercent: 53,
    completedYearsOfService: 10,
  });

  assert.ok(comp.ups.guaranteedMonthlyPension > 0);
  assert.ok(comp.ups.superannuationLumpSum > 0);
  assert.ok(comp.nps.totalCorpus > 0);
  assert.ok(comp.nps.monthlyAnnuity > 0);
});
