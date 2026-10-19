'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, AlertCircle } from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import ShareAndPrint from '@/components/ShareAndPrint';
import { DA_RATES_HISTORY } from '@/lib/pay-data';
import { FormatINR, RupeeIcon } from '@/components/Rupee';
import PrintReport from '@/components/PrintReport';

export default function DACalculatorPage() {
  const [basicPay, setBasicPay] = useState<number>(44900);
  const [monthsCount, setMonthsCount] = useState<number>(3);
  const [oldDARate, setOldDARate] = useState<number>(50);
  const [newDARate, setNewDARate] = useState<number>(53);

  const daDiffPercent = newDARate - oldDARate;
  const monthlyArrearPerMonth = Math.round((basicPay * daDiffPercent) / 100);
  const totalArrearLumpSum = monthlyArrearPerMonth * monthsCount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Dearness Allowance</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            DA & Arrears Calculator (AICPIN Tracker)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Calculate exact retroactive Dearness Allowance arrears and track All India Consumer Price Index rates
          </p>
        </div>

        <ShareAndPrint title="DA Arrears Calculation" />
      </div>

      <DisclaimerBanner />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Arrear Calculator (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2 border-b border-slate-100 pb-3">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span>Arrears Calculator</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Basic Pay (<RupeeIcon className="w-3 h-3 inline" />)
              </label>
              <input
                type="number"
                step="100"
                value={basicPay}
                onChange={(e) => setBasicPay(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Old DA Rate (%)
                </label>
                <input
                  type="number"
                  value={oldDARate}
                  onChange={(e) => setOldDARate(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Revised DA Rate (%)
                </label>
                <input
                  type="number"
                  value={newDARate}
                  onChange={(e) => setNewDARate(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Arrear Duration (Months)
              </label>
              <select
                value={monthsCount}
                onChange={(e) => setMonthsCount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-hidden"
              >
                {[1, 2, 3, 4, 5, 6, 9, 12, 18, 24].map((m) => (
                  <option key={m} value={m}>
                    {m} Month{m > 1 ? 's' : ''} (Standard cycle is 3 months)
                  </option>
                ))}
              </select>
            </div>

            {/* Live Result Callout */}
            <div className="bg-linear-to-br from-blue-900 to-indigo-950 text-white rounded-xl p-5 space-y-3">
              <span className="text-xs text-blue-200 uppercase tracking-wider font-semibold">
                Total Arrears Payable
              </span>
              <div className="text-3xl font-black text-amber-300">
                <FormatINR value={totalArrearLumpSum} />
              </div>
              <div className="text-xs text-slate-300 space-y-1 pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span>DA Hike Difference:</span>
                  <span className="font-bold text-emerald-300">+{daDiffPercent}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Arrear Amount:</span>
                  <span className="font-bold text-white">
                    <FormatINR value={monthlyArrearPerMonth} suffix="/mo" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: AICPIN Tracker & DA History (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">
                Historical & Projected Dearness Allowance Rates
              </h3>
              <p className="text-xs text-slate-500">
                Determined by 12-month average of AICPIN-IW (Labour Bureau)
              </p>
            </div>

            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-3 px-4">Effective Period</th>
                  <th className="py-3 px-4 text-center">DA Rate</th>
                  <th className="py-3 px-4 text-center">Hike</th>
                  <th className="py-3 px-4 text-right">AICPIN Average</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DA_RATES_HISTORY.map((row, idx) => (
                  <tr key={idx} className={idx === 0 ? 'bg-blue-50/50 font-bold text-blue-950' : ''}>
                    <td className="py-2.5 px-4 font-medium">{row.period}</td>
                    <td className="py-2.5 px-4 text-center font-bold text-blue-700">{row.rate}%</td>
                    <td className="py-2.5 px-4 text-center text-emerald-700 font-semibold">
                      {row.hike > 0 ? `+${row.hike}%` : '0%'}
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-600">{row.aicpinAvg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-2">
            <div className="font-bold text-amber-950 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Why DA Reaching 50% Was a Historic Milestone</span>
            </div>
            <p className="leading-relaxed">
              Under 7th CPC recommendations accepted by the Union Cabinet, when Dearness Allowance crosses 50%:
              <strong> (1)</strong> HRA rates are elevated to 30%, 20%, and 10% for X, Y, and Z cities respectively;
              <strong> (2)</strong> The maximum ceiling on Retirement and Death Gratuity is statutorily enhanced by 25% from <FormatINR value={2000000} /> to <FormatINR value={2500000} />;
              <strong> (3)</strong> Children Education Allowance (CEA) and Hostel Subsidy receive an automatic 25% hike.
            </p>
          </div>
        </div>
      </div>

      {/* Print-Only Report */}
      <PrintReport
        title="Dearness Allowance (DA) Arrears Calculation Statement"
        subtitle="Retroactive Arrears Assessment Under Ministry of Finance AICPIN Orders"
        metadata={[
          { label: 'Basic Pay', value: `₹${basicPay.toLocaleString('en-IN')}` },
          { label: 'Old DA Rate', value: `${oldDARate}%` },
          { label: 'Revised DA Rate', value: `${newDARate}%` },
          { label: 'DA Increase Percentage', value: `+${daDiffPercent}%` },
          { label: 'Arrear Period Duration', value: `${monthsCount} Month${monthsCount > 1 ? 's' : ''}` },
          { label: 'Total Payable Payout', value: `₹${totalArrearLumpSum.toLocaleString('en-IN')}` },
        ]}
        colHeaders={['Calculation Parameter', 'Value / Entitlement']}
        sections={[
          {
            title: '1. Monthly Differential Breakdown',
            rows: [
              {
                label: 'Monthly Basic Pay Drawn',
                col1: `₹${basicPay.toLocaleString('en-IN')}`,
              },
              {
                label: `Old Dearness Allowance (${oldDARate}%)`,
                col1: `₹${Math.round((basicPay * oldDARate) / 100).toLocaleString('en-IN')} /mo`,
              },
              {
                label: `Revised Dearness Allowance (${newDARate}%)`,
                col1: `₹${Math.round((basicPay * newDARate) / 100).toLocaleString('en-IN')} /mo`,
              },
              {
                label: `Net Monthly DA Arrear Difference`,
                sublabel: `${daDiffPercent}% hike per month`,
                isTotal: true,
                col1: `₹${monthlyArrearPerMonth.toLocaleString('en-IN')} /mo`,
              },
            ],
          },
          {
            title: '2. Cumulative Arrear Payout',
            rows: [
              {
                label: 'Arrear Month Multiplier',
                col1: `${monthsCount} Month(s)`,
              },
              {
                label: 'Gross Arrears Due for Disbursal',
                sublabel: 'Calculated: Monthly Difference × Duration',
                isTotal: true,
                col1: `₹${totalArrearLumpSum.toLocaleString('en-IN')} (Lump Sum)`,
              },
            ],
          },
        ]}
        notes={[
          'DA arrears are payable for the retrospective period between the effective date and the Cabinet approval date.',
          'NPS/UPS deduction of 10% is applicable on the arrear amount as per PFRDA regulations.',
          'Tax deduction at source (TDS) is adjusted under Section 89(1) of the Income Tax Act via Form 10E.',
        ]}
      />
    </div>
  );
}
