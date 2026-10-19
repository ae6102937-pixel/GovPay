'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileSpreadsheet, ShieldCheck } from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import ShareAndPrint from '@/components/ShareAndPrint';
import { calculateGratuityAndLeave } from '@/lib/cpc-calculator';
import { FormatINR, RupeeIcon } from '@/components/Rupee';
import PrintReport from '@/components/PrintReport';

export default function GratuityLeavePage() {
  const [lastBasic, setLastBasic] = useState<number>(78800);
  const [daPercent, setDaPercent] = useState<number>(53);
  const [serviceYears, setServiceYears] = useState<number>(33);
  const [leaveDays, setLeaveDays] = useState<number>(300);

  const result = calculateGratuityAndLeave({
    lastBasic,
    daPercent,
    qualifyingServiceYears: serviceYears,
    earnedLeaveDays: leaveDays,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Retirement Benefits</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            Gratuity & Leave Encashment Calculator
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Updated with the enhanced ₹25 Lakh statutory gratuity ceiling and 300 days leave encashment rules
          </p>
        </div>

        <ShareAndPrint title="Gratuity & Leave Encashment Calculation" />
      </div>

      <DisclaimerBanner />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileSpreadsheet className="w-5 h-5 text-blue-600" />
            <span>Retirement Service Inputs</span>
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

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                DA at Retirement (%)
              </label>
              <input
                type="number"
                value={daPercent}
                onChange={(e) => setDaPercent(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-hidden"
              />
              <span className="text-[10px] text-slate-400">
                Current DA: 53%+ (Gratuity ceiling active at <FormatINR value={2500000} />)
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Qualifying Service:</span>
                <span className="text-blue-700 font-bold">{serviceYears} Years (Max 33 Yrs)</span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                value={serviceYears}
                onChange={(e) => setServiceYears(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>5 Yrs (Min for Gratuity)</span>
                <span>20 Yrs</span>
                <span>33 Yrs (Max Ceiling)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Accumulated Earned Leave:</span>
                <span className="text-blue-700 font-bold">{leaveDays} Days (Max 300)</span>
              </div>
              <input
                type="range"
                min="0"
                max="300"
                step="10"
                value={leaveDays}
                onChange={(e) => setLeaveDays(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>0 Days</span>
                <span>150 Days</span>
                <span>300 Days (Max Cap)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Big Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-linear-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md space-y-3">
              <span className="text-xs text-blue-200 uppercase tracking-wider font-semibold">
                Retirement Gratuity
              </span>
              <div className="text-3xl font-black text-amber-300">
                <FormatINR value={result.gratuityPayable} />
              </div>
              <div className="text-xs text-blue-200">
                Formula: (Emoluments &times; {result.completedSixMonths}) / 4
                {result.rawGratuity > result.gratuityCap && (
                  <span className="block text-amber-300 font-semibold mt-1">
                    *Capped at enhanced statutory limit of <FormatINR value={2500000} />
                  </span>
                )}
              </div>
            </div>

            <div className="bg-linear-to-br from-emerald-900 to-teal-950 text-white rounded-2xl p-6 shadow-md space-y-3">
              <span className="text-xs text-emerald-200 uppercase tracking-wider font-semibold">
                Leave Encashment Payout
              </span>
              <div className="text-3xl font-black text-white">
                <FormatINR value={result.leaveEncashmentPayable} />
              </div>
              <div className="text-xs text-emerald-200">
                For {result.cappedLeave} days accumulated EL (Formula: Emoluments &divide; 30 &times; Days)
              </div>
            </div>
          </div>

          {/* Combined Total */}
          <div className="bg-white border-2 border-emerald-500 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Combined Terminal Payout
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">
                <FormatINR value={result.totalRetirementBenefits} />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Total lump sum receivable on superannuation day (in addition to monthly pension)
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="text-[11px] font-bold text-emerald-800 block">
                100% Tax-Exempt
              </span>
              <span className="text-[10px] text-emerald-600">Under Sec 10(10)</span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">Monthly Emoluments (Basic + DA)</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    <FormatINR value={result.emoluments} />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">
                    Completed 6-Month Qualifying Periods
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    {result.completedSixMonths} periods (capped at 66)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">Calculated Raw Gratuity</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    <FormatINR value={result.rawGratuity} />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-slate-700">Statutory Cap Applicable</td>
                  <td className="py-3 px-4 text-right font-bold text-blue-700">
                    <FormatINR value={result.gratuityCap} />
                  </td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="py-3 px-4 text-slate-900">Final Gratuity Payable</td>
                  <td className="py-3 px-4 text-right text-emerald-800 text-base">
                    <FormatINR value={result.gratuityPayable} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Print-Only Report */}
      <PrintReport
        title="Retirement Gratuity & Leave Encashment Statement"
        subtitle="Statutory Superannuation Entitlements Under CCS Rules"
        metadata={[
          { label: 'Last Basic Pay Drawn', value: `₹${lastBasic.toLocaleString('en-IN')}` },
          { label: 'Applicable DA Rate', value: `${daPercent}% (Ceiling ₹25 Lakhs Active)` },
          { label: 'Qualifying Service', value: `${serviceYears} Years (${result.completedSixMonths} Six-Month Periods)` },
          { label: 'Monthly Emoluments (Pay+DA)', value: `₹${result.emoluments.toLocaleString('en-IN')}` },
          { label: 'Accumulated Earned Leave', value: `${leaveDays} Days (Max 300 Days)` },
          { label: 'Statutory Gratuity Cap', value: `₹${result.gratuityCap.toLocaleString('en-IN')}` },
        ]}
        colHeaders={['Benefit Head', 'Calculated Entitlement']}
        sections={[
          {
            title: '1. Retirement Gratuity Computation',
            rows: [
              {
                label: 'Monthly Emoluments Basis',
                sublabel: 'Basic Pay + Dearness Allowance at superannuation',
                col1: `₹${result.emoluments.toLocaleString('en-IN')}`,
              },
              {
                label: 'Qualifying Six-Month Blocks',
                sublabel: 'Capped at 66 six-month periods (33 years)',
                col1: `${result.completedSixMonths} periods`,
              },
              {
                label: 'Computed Raw Gratuity',
                sublabel: 'Formula: (Emoluments × Periods) ÷ 4',
                col1: `₹${result.rawGratuity.toLocaleString('en-IN')}`,
              },
              {
                label: 'Statutory Cap Enforced',
                sublabel: 'Enhanced to ₹25 Lakh when DA crossed 50%',
                col1: `₹${result.gratuityCap.toLocaleString('en-IN')}`,
              },
              {
                label: 'Net Retirement Gratuity Payable',
                isTotal: true,
                col1: `₹${result.gratuityPayable.toLocaleString('en-IN')} (100% Tax-Exempt)`,
              },
            ],
          },
          {
            title: '2. Earned Leave Encashment Computation',
            rows: [
              {
                label: 'Earned Leave Balance Admitted',
                sublabel: 'Capped at maximum of 300 days',
                col1: `${result.cappedLeave} Days`,
              },
              {
                label: 'Net Leave Encashment Payable',
                sublabel: 'Formula: (Emoluments ÷ 30) × Leave Days',
                isTotal: true,
                col1: `₹${result.leaveEncashmentPayable.toLocaleString('en-IN')} (100% Tax-Exempt)`,
              },
            ],
          },
          {
            title: '3. Total Terminal Lump Sum',
            rows: [
              {
                label: 'Combined Terminal Benefit Payout',
                sublabel: 'Gratuity + Leave Encashment combined receivable on retirement',
                isTotal: true,
                col1: `₹${result.totalRetirementBenefits.toLocaleString('en-IN')}`,
              },
            ],
          },
        ]}
        notes={[
          'Under Section 10(10) of the Income Tax Act, retirement gratuity received by central government employees is wholly exempt from income tax without monetary ceiling.',
          'Under Section 10(10AA)(i), leave encashment received at superannuation by central government employees is completely tax-exempt.',
          'The enhanced ₹25 Lakh gratuity ceiling came into force following Department of Expenditure orders as DA exceeded 50%.',
        ]}
      />
    </div>
  );
}
