'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  PieChart,
  DollarSign,
  Scale,
} from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import ShareAndPrint from '@/components/ShareAndPrint';
import { compareUPSvsNPS } from '@/lib/cpc-calculator';
import { FormatINR, RupeeIcon } from '@/components/Rupee';
import PrintReport from '@/components/PrintReport';

export default function UPSvsNPSPage() {
  const [currentAge, setCurrentAge] = useState<number>(35);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [currentBasic, setCurrentBasic] = useState<number>(44900);
  const [completedService, setCompletedService] = useState<number>(8);
  const [currentDA, setCurrentDA] = useState<number>(53);
  const [expectedNPSReturn, setExpectedNPSReturn] = useState<number>(9.5);
  const [annuityReturnRate, setAnnuityReturnRate] = useState<number>(6.2);
  const [salaryGrowthRate, setSalaryGrowthRate] = useState<number>(6.0);

  const comparison = compareUPSvsNPS({
    currentAge,
    retirementAge,
    currentBasic,
    currentDaPercent: currentDA,
    annualSalaryGrowthRate: salaryGrowthRate / 100,
    npsExpectedReturn: expectedNPSReturn / 100,
    annuityReturnRate: annuityReturnRate / 100,
    completedYearsOfService: completedService,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Pension Analysis</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            UPS vs NPS Pension Scheme Calculator
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Compare the Unified Pension Scheme (UPS: 50% assured + DR) against the National Pension System (NPS market corpus)
          </p>
        </div>

        <ShareAndPrint title="UPS vs NPS Pension Comparison" />
      </div>

      <DisclaimerBanner />

      {/* Main Grid: Inputs + Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              <span>Career & Pay Details</span>
            </h2>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold">
              Govt Notification
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Current Basic Pay (<RupeeIcon className="w-3 h-3 inline" />)
              </label>
              <input
                type="number"
                step="100"
                value={currentBasic}
                onChange={(e) => setCurrentBasic(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current Age (Yrs)
                </label>
                <input
                  type="number"
                  min="20"
                  max="59"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Retirement Age
                </label>
                <input
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Completed Service (Years)
              </label>
              <input
                type="number"
                min="0"
                max="35"
                value={completedService}
                onChange={(e) => setCompletedService(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-hidden"
              />
              <span className="text-[11px] text-slate-400">Total at retirement: {comparison.totalServiceYears} years</span>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Market & Growth Assumptions
              </h3>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>NPS Annual Fund Return:</span>
                  <span className="text-blue-700">{expectedNPSReturn}%</span>
                </div>
                <input
                  type="range"
                  min="7.0"
                  max="12.0"
                  step="0.5"
                  value={expectedNPSReturn}
                  onChange={(e) => setExpectedNPSReturn(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Annuity Purchase Rate:</span>
                  <span className="text-blue-700">{annuityReturnRate}%</span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="8.0"
                  step="0.1"
                  value={annuityReturnRate}
                  onChange={(e) => setAnnuityReturnRate(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Annual Salary Growth (Increments + DA):</span>
                  <span className="text-blue-700">{salaryGrowthRate}%</span>
                </div>
                <input
                  type="range"
                  min="4.0"
                  max="9.0"
                  step="0.5"
                  value={salaryGrowthRate}
                  onChange={(e) => setSalaryGrowthRate(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Comparison Display (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Head-to-Head Top Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* UPS Card */}
            <div className="bg-linear-to-br from-emerald-900 to-teal-950 text-white rounded-2xl p-6 shadow-md border border-emerald-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Unified Pension Scheme (UPS)
                </span>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-200 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold">
                  Government Assured
                </span>
              </div>

              <div>
                <div className="text-xs text-emerald-200">Guaranteed Initial Monthly Pension</div>
                <div className="text-3xl font-black text-white mt-1 flex items-baseline">
                  <FormatINR value={comparison.ups.guaranteedMonthlyPension} suffix=" /mo" />
                </div>
                <div className="text-xs text-emerald-300 font-medium mt-1">
                  Base <FormatINR value={comparison.ups.basePension} /> + DR <FormatINR value={comparison.ups.drAmount} />
                </div>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-emerald-800 text-xs text-emerald-100">
                <div className="flex justify-between">
                  <span>Superannuation Lump Sum:</span>
                  <span className="font-bold text-white">
                    <FormatINR value={comparison.ups.superannuationLumpSum} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Inflation (DR) Protected:</span>
                  <span className="font-bold text-emerald-300">Yes (100% Indexation)</span>
                </div>
                <div className="flex justify-between">
                  <span>Govt Contribution:</span>
                  <span className="font-bold text-white">18.5% (Raised from 14%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Family Pension (60%):</span>
                  <span className="font-bold text-white">
                    <FormatINR value={comparison.ups.familyPension} suffix="/mo" />
                  </span>
                </div>
              </div>
            </div>

            {/* NPS Card */}
            <div className="bg-linear-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-blue-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  National Pension System (NPS)
                </span>
                <span className="text-[10px] bg-blue-400/20 text-blue-200 border border-blue-400/40 px-2 py-0.5 rounded-full font-bold">
                  Market Linked
                </span>
              </div>

              <div>
                <div className="text-xs text-blue-200">Estimated Monthly Annuity Pension</div>
                <div className="text-3xl font-black text-white mt-1 flex items-baseline">
                  <FormatINR value={comparison.nps.monthlyAnnuity} suffix=" /mo" />
                </div>
                <div className="text-xs text-blue-300 font-medium mt-1">
                  From 40% Annuity Corpus of <FormatINR value={comparison.nps.annuityCorpus} />
                </div>
              </div>

              <div className="space-y-1.5 pt-3 border-t border-blue-800 text-xs text-blue-100">
                <div className="flex justify-between">
                  <span>60% Tax-Free Lump Sum:</span>
                  <span className="font-bold text-white">
                    <FormatINR value={comparison.nps.taxFreeLumpSum} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Accumulated Corpus:</span>
                  <span className="font-bold text-white">
                    <FormatINR value={comparison.nps.totalCorpus} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Inflation (DR) Protected:</span>
                  <span className="font-bold text-amber-300">No (Fixed Annuity)</span>
                </div>
                <div className="flex justify-between">
                  <span>Govt Contribution:</span>
                  <span className="font-bold text-white">14%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Feature Comparison Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">
                Key Differences: Unified Pension Scheme vs National Pension System
              </h3>
              <p className="text-xs text-slate-500">
                Based on Ministry of Finance notification and PFRDA guidelines
              </p>
            </div>

            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4 bg-emerald-50/50 text-emerald-900 font-extrabold">UPS (Notified)</th>
                  <th className="py-3 px-4 bg-blue-50/50 text-blue-900 font-extrabold">NPS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-800">Monthly Pension Guarantee</td>
                  <td className="py-3 px-4 text-emerald-800 font-bold bg-emerald-50/20">
                    Assured 50% of last 12 months average basic
                  </td>
                  <td className="py-3 px-4 text-slate-600 bg-blue-50/20">
                    Not guaranteed; depends on market returns & annuity rates
                  </td>
                </tr>

                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-800">Inflation Protection (DR)</td>
                  <td className="py-3 px-4 text-emerald-800 font-bold bg-emerald-50/20">
                    Yes. Dearness Relief indexed to AICPIN, matching central pensioners
                  </td>
                  <td className="py-3 px-4 text-slate-600 bg-blue-50/20">
                    No. Annuity payouts are normally fixed for life without indexation
                  </td>
                </tr>

                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-800">Lump Sum at Retirement</td>
                  <td className="py-3 px-4 text-emerald-800 font-semibold bg-emerald-50/20">
                    1/10th of (Pay+DA) for every 6 months service (Does not reduce pension!)
                  </td>
                  <td className="py-3 px-4 text-slate-600 bg-blue-50/20">
                    60% of total corpus tax-free; remaining 40% locked into annuity
                  </td>
                </tr>

                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-800">Family Pension</td>
                  <td className="py-3 px-4 text-emerald-800 font-bold bg-emerald-50/20">
                    Assured 60% of employee pension immediately upon death
                  </td>
                  <td className="py-3 px-4 text-slate-600 bg-blue-50/20">
                    Annuity return of purchase price to nominee or spouse annuity
                  </td>
                </tr>

                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-800">Government Contribution</td>
                  <td className="py-3 px-4 text-emerald-800 font-bold bg-emerald-50/20">
                    18.5% of (Basic + DA)
                  </td>
                  <td className="py-3 px-4 text-slate-600 bg-blue-50/20">
                    14% of (Basic + DA)
                  </td>
                </tr>

                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-800">Minimum Qualifying Service</td>
                  <td className="py-3 px-4 text-slate-700 bg-emerald-50/20">
                    25 years for full 50% pension; pro-rata for 10-25 yrs (Min <FormatINR value={10000} />)
                  </td>
                  <td className="py-3 px-4 text-slate-700 bg-blue-50/20">
                    Any tenure; corpus is based on accumulated contributions
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Print-Only Report */}
      <PrintReport
        title="Unified Pension Scheme (UPS) vs National Pension System (NPS) Statement"
        subtitle="Comparative Retirement Benefit Assessment"
        metadata={[
          { label: 'Current Basic Pay', value: `₹${currentBasic.toLocaleString('en-IN')}` },
          { label: 'Current Age / Retirement', value: `${currentAge} Yrs / ${retirementAge} Yrs` },
          { label: 'Total Service Tenure', value: `${comparison.totalServiceYears} Years` },
          { label: 'Projected Last Basic', value: `₹${comparison.projectedLastBasic.toLocaleString('en-IN')}` },
          { label: 'NPS Fund Return Assumed', value: `${expectedNPSReturn}% p.a.` },
          { label: 'Annuity Purchase Rate', value: `${annuityReturnRate}% p.a.` },
        ]}
        colHeaders={['Benefit Dimension', 'Unified Pension Scheme (UPS)', 'National Pension System (NPS)']}
        sections={[
          {
            title: '1. Monthly Pension & Inflation Protection',
            rows: [
              {
                label: 'Initial Monthly Pension',
                sublabel: 'UPS guaranteed 50% vs NPS 40% annuity',
                col1: `₹${comparison.ups.guaranteedMonthlyPension.toLocaleString('en-IN')} /mo`,
                col2: `₹${comparison.nps.monthlyAnnuity.toLocaleString('en-IN')} /mo`,
              },
              {
                label: 'Inflation / Dearness Relief (DR)',
                sublabel: 'Indexation to Consumer Price Index',
                col1: '100% DR Guaranteed for life',
                col2: 'None (Fixed commercial annuity)',
              },
              {
                label: 'Assured Family Pension',
                sublabel: 'Payable to spouse upon demise',
                col1: `₹${comparison.ups.familyPension.toLocaleString('en-IN')} /mo (60%)`,
                col2: 'Return of purchase price or joint annuity',
              },
            ],
          },
          {
            title: '2. Lump Sum Terminal Benefits',
            rows: [
              {
                label: 'Lump Sum at Superannuation',
                sublabel: 'UPS 1/10th per 6m vs NPS 60% corpus',
                col1: `₹${comparison.ups.superannuationLumpSum.toLocaleString('en-IN')}`,
                col2: `₹${comparison.nps.taxFreeLumpSum.toLocaleString('en-IN')} (60% Corpus)`,
              },
              {
                label: 'Impact on Monthly Pension',
                sublabel: 'Does receiving lump sum reduce pension?',
                col1: 'No Reduction (Full 50% pension remains)',
                col2: 'Locks remaining 40% into annuity',
              },
            ],
          },
          {
            title: '3. Contribution Structure',
            rows: [
              {
                label: 'Employee Contribution',
                col1: '10% of (Basic + DA)',
                col2: '10% of (Basic + DA)',
              },
              {
                label: 'Central Govt Contribution',
                col1: '18.5% (Enhanced under UPS)',
                col2: '14.0%',
              },
            ],
          },
        ]}
        notes={[
          'Unified Pension Scheme (UPS) was notified with 50% assured pension and 100% inflation indexation.',
          'NPS payouts are subject to fund performance across Scheme E, C, and G investment allocations.',
          'Terminal gratuity up to ₹25 Lakh is paid separately in both schemes under CCS (Gratuity) rules.',
        ]}
      />
    </div>
  );
}
