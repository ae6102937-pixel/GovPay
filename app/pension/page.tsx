'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Landmark } from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import ShareAndPrint from '@/components/ShareAndPrint';
import { calculatePensionDetails, COMMUTATION_TABLE } from '@/lib/cpc-calculator';
import { FormatINR, RupeeIcon } from '@/components/Rupee';
import PrintReport from '@/components/PrintReport';

export default function PensionPage() {
  const [lastBasic, setLastBasic] = useState<number>(67700);
  const [drPercent, setDrPercent] = useState<number>(53);
  const [commutationPercent, setCommutationPercent] = useState<number>(40);
  const [ageNextBirthday, setAgeNextBirthday] = useState<number>(61);
  const [serviceYears, setServiceYears] = useState<number>(30);

  const pension = calculatePensionDetails({
    lastBasic,
    drPercent,
    commutationPercent,
    ageNextBirthday,
    qualifyingServiceYears: serviceYears,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Web Screen UI (Hidden in Print) */}
      <div className="no-print space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Pension & Retirement</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            Central Govt Pension & Commutation Calculator
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Calculate basic pension (50%), 40% commutation lump sum, reduced monthly pension, and 15-year restoration
          </p>
        </div>

        <ShareAndPrint title="Central Govt Pension & Commutation Calculation" />
      </div>

      <DisclaimerBanner />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2 border-b border-slate-100 pb-3">
            <Landmark className="w-5 h-5 text-blue-600" />
            <span>Retirement Details</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Last Basic Pay Drawn (<RupeeIcon className="w-3 h-3 inline" />)
              </label>
              <input
                type="number"
                step="100"
                value={lastBasic}
                onChange={(e) => setLastBasic(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Age on Next Birthday
                </label>
                <select
                  value={ageNextBirthday}
                  onChange={(e) => setAgeNextBirthday(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-hidden"
                >
                  {Object.entries(COMMUTATION_TABLE).map(([age, factor]) => (
                    <option key={age} value={age}>
                      Age {age} (Factor {factor})
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-slate-400">Standard superannuation: 61</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Qualifying Service (Yrs)
                </label>
                <input
                  type="number"
                  min="10"
                  max="40"
                  value={serviceYears}
                  onChange={(e) => setServiceYears(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Commutation Percentage:</span>
                <span className="text-blue-700 font-bold">{commutationPercent}% (Max 40%)</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={commutationPercent}
                onChange={(e) => setCommutationPercent(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>0% (No Commutation)</span>
                <span>20%</span>
                <span>40% (Max Allowed)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Dearness Relief (DR Rate %)
              </label>
              <input
                type="number"
                value={drPercent}
                onChange={(e) => setDrPercent(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-hidden"
              />
              <span className="text-[10px] text-slate-400">Current DR matches DA at 53%+</span>
            </div>
          </div>
        </div>

        {/* Right Pension Results (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Pension Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-linear-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-5 shadow-sm space-y-2">
              <span className="text-xs text-blue-200 uppercase tracking-wider font-semibold">
                Commuted Cash Lump Sum
              </span>
              <div className="text-2xl sm:text-3xl font-black text-amber-300">
                <FormatINR value={pension.commutedLumpSum} />
              </div>
              <p className="text-[11px] text-blue-200">
                Immediate tax-free cash credit (Formula: Portion &times; 12 &times; {pension.commFactor})
              </p>
            </div>

            <div className="bg-linear-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-sm space-y-2">
              <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">
                Monthly Pension (Years 1-15)
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                <FormatINR value={pension.reducedMonthlyPension} suffix=" /mo" />
              </div>
              <p className="text-[11px] text-slate-400">
                Reduced Basic (<FormatINR value={pension.residualPension} />) + Full DR on Original (<FormatINR value={pension.drAmount} />)
              </p>
            </div>

            <div className="bg-linear-to-br from-emerald-900 to-teal-950 text-white rounded-2xl p-5 shadow-sm space-y-2">
              <span className="text-xs text-emerald-200 uppercase tracking-wider font-semibold">
                Full Restored Pension (After 15 Yrs)
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white">
                <FormatINR value={pension.totalMonthlyPensionBeforeCommutation} suffix=" /mo" />
              </div>
              <p className="text-[11px] text-emerald-200">
                Commuted portion restored automatically at 15 years mark
              </p>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">
                Pension Calculation Itemization (CCS Pension Rules)
              </h3>
            </div>

            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">Last Basic Pay Drawn</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    <FormatINR value={lastBasic} />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">
                    Basic Pension (50% of Last Basic)
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-blue-700">
                    <FormatINR value={pension.fullPension} />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">
                    Dearness Relief (DR @ {drPercent}%)
                    <span className="block text-[11px] text-slate-400">
                      Calculated on full basic pension even after commutation
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    <FormatINR value={pension.drAmount} />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">
                    Monthly Commuted Value ({commutationPercent}%)
                    <span className="block text-[11px] text-slate-400">
                      Deducted from monthly basic for 15 years
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-rose-600">
                    -<FormatINR value={pension.commutedPensionMonthly} />
                  </td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="py-3 px-4 text-slate-900">Commutation Factor (Age {ageNextBirthday})</td>
                  <td className="py-3 px-4 text-right text-slate-900">{pension.commFactor}</td>
                </tr>
                <tr className="bg-emerald-50/70 font-extrabold text-emerald-950">
                  <td className="py-3.5 px-4">Net Reduced Monthly Pension (Years 1 to 15)</td>
                  <td className="py-3.5 px-4 text-right text-base text-emerald-800">
                    <FormatINR value={pension.reducedMonthlyPension} suffix=" /mo" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">
                    Normal Family Pension (30% + DR)
                    <span className="block text-[11px] text-slate-400">Payable to surviving spouse</span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    <FormatINR value={pension.normalFamilyPensionWithDR} suffix=" /mo" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">
                    Enhanced Family Pension (50% + DR)
                    <span className="block text-[11px] text-slate-400">Payable up to 10 years or age 67</span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    <FormatINR value={pension.enhancedFamilyPensionWithDR} suffix=" /mo" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>

      {/* Print-Only Report */}
      <PrintReport
        title="Central Civil Services Pension & Commutation Statement"
        subtitle="Computation Under CCS (Pension) Rules & Commutation Tables"
        metadata={[
          { label: 'Last Basic Pay Drawn', value: `₹${lastBasic.toLocaleString('en-IN')}` },
          { label: 'Qualifying Service', value: `${serviceYears} Years` },
          { label: 'Commutation Opted', value: `${commutationPercent}% (Max 40%)` },
          { label: 'Age on Next Birthday', value: `Age ${ageNextBirthday} (Factor ${pension.commFactor})` },
          { label: 'Dearness Relief Rate', value: `${drPercent}%` },
          { label: 'Restoration Period', value: '15 Years from receipt' },
        ]}
        colHeaders={['Pension Component / Entitlement', 'Monthly Amount / Lump Sum']}
        sections={[
          {
            title: '1. Basic Pension & Dearness Relief',
            rows: [
              {
                label: 'Full Basic Pension (50% of Last Basic Pay)',
                sublabel: 'Minimum 10 years qualifying service',
                col1: `₹${pension.fullPension.toLocaleString('en-IN')} /mo`,
              },
              {
                label: `Dearness Relief (DR @ ${drPercent}%)`,
                sublabel: 'Calculated on original unreduced pension throughout',
                col1: `₹${pension.drAmount.toLocaleString('en-IN')} /mo`,
              },
              {
                label: 'Gross Pension Before Commutation',
                isTotal: true,
                col1: `₹${pension.totalMonthlyPensionBeforeCommutation.toLocaleString('en-IN')} /mo`,
              },
            ],
          },
          {
            title: '2. Commutation & Lump Sum Payout',
            rows: [
              {
                label: `Commuted Portion (${commutationPercent}%)`,
                sublabel: 'Monthly surrender value',
                col1: `-₹${pension.commutedPensionMonthly.toLocaleString('en-IN')} /mo`,
              },
              {
                label: `Lump Sum Commutation Value (CVP)`,
                sublabel: `Formula: Portion × 12 × ${pension.commFactor}`,
                isTotal: true,
                col1: `₹${pension.commutedLumpSum.toLocaleString('en-IN')} (Tax-Free Credit)`,
              },
            ],
          },
          {
            title: '3. Net Monthly Pension & Family Entitlements',
            rows: [
              {
                label: 'Net Monthly Pension Payable (Years 1 to 15)',
                sublabel: 'Reduced Basic + Full 100% Dearness Relief',
                isTotal: true,
                col1: `₹${pension.reducedMonthlyPension.toLocaleString('en-IN')} /mo`,
              },
              {
                label: 'Full Restored Monthly Pension (After 15 Years)',
                sublabel: 'Commuted cut is automatically restored after 180 months',
                col1: `₹${pension.totalMonthlyPensionBeforeCommutation.toLocaleString('en-IN')} /mo`,
              },
              {
                label: 'Normal Family Pension (30% + DR)',
                col1: `₹${pension.normalFamilyPensionWithDR.toLocaleString('en-IN')} /mo`,
              },
              {
                label: 'Enhanced Family Pension (50% + DR)',
                col1: `₹${pension.enhancedFamilyPensionWithDR.toLocaleString('en-IN')} /mo`,
              },
            ],
          },
        ]}
        notes={[
          'Commutation of pension is 100% tax-exempt under Section 10(10A) of the Income Tax Act.',
          'Full pension is restored on completion of 15 years from the date the commuted value is received.',
          'Dearness Relief is always admissible on the full basic pension, not on the reduced pension.',
        ]}
      />
    </div>
  );
}
