'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  Table2,
  Award,
  Landmark,
  TrendingUp,
  FileSpreadsheet,
  ArrowRight,
  Shield,
  Clock,
  Users,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { calculate8thCPCSalary, ENTRY_PAY_7TH, CityClass } from '@/lib/cpc-calculator';
import { POPULAR_POSTS, OFFICIAL_NEWS_UPDATES } from '@/lib/pay-data';
import { FormatINR, RupeeIcon } from '@/components/Rupee';

export default function HomePage() {
  // Quick Calculator state
  const [selectedLevel, setSelectedLevel] = useState<number>(7);
  const [fitmentFactor, setFitmentFactor] = useState<number>(2.57);
  const [cityClass, setCityClass] = useState<CityClass>('X');

  const entryPay = ENTRY_PAY_7TH[selectedLevel]?.entryPay || 44900;
  const quickCalc = calculate8thCPCSalary({
    level: selectedLevel,
    basic7th: entryPay,
    fitmentFactor,
    cityClass,
    currentDA: 53,
    projectedDA8th: 0,
  });

  const fitmentScenarios = [
    { factor: 1.92, label: '1.92 (Conservative / Base + DA Merge)' },
    { factor: 2.15, label: '2.15 (Moderate Inflation Precedent)' },
    { factor: 2.57, label: '2.57 (7th CPC Baseline Factor)' },
    { factor: 2.86, label: '2.86 (JCM Staff Side Demand)' },
    { factor: 3.68, label: '3.68 (Upper Union Demand)' },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-blue-900 via-indigo-950 to-slate-900 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Official 8th Central Pay Commission Research Portal</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              8th Pay Commission Salary & Pay Matrix Portal
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Calculate projected salaries across <strong>Pay Levels 1 to 18</strong>, test fitment factor scenarios (1.92 to 2.86), evaluate <strong>UPS vs NPS</strong> pension benefits, and compute DA arrears with transparent government methodologies.
            </p>
          </div>

          {/* Quick Hero Calculator Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-white/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Instant Estimate</span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Quick 8th CPC In-Hand Salary Estimator
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Select Pay Level and Fitment Scenario to see immediate 7th vs 8th CPC breakdown
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/calculator?level=${selectedLevel}&ff=${fitmentFactor}&city=${cityClass}`}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs hover:shadow"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Full Pay-Slip Mode</span>
                </Link>
              </div>
            </div>

            {/* Quick Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {/* Level Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Pay Level (7th CPC)
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  {Object.entries(ENTRY_PAY_7TH).map(([lvl, data]) => (
                    <option key={lvl} value={lvl}>
                      Level {lvl} (GP {data.gradePay}) - {data.designation.split(',')[0]}
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Starting Basic: <FormatINR value={entryPay} />
                </span>
              </div>

              {/* Fitment Factor Scenario */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Fitment Factor Scenario
                </label>
                <select
                  value={fitmentFactor}
                  onChange={(e) => setFitmentFactor(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  {fitmentScenarios.map((item) => (
                    <option key={item.factor} value={item.factor}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-amber-700 font-medium mt-1 block">
                  *Clearly labeled as assumption
                </span>
              </div>

              {/* City Classification */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  City Class (HRA & TA)
                </label>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-lg">
                  {(['X', 'Y', 'Z'] as CityClass[]).map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setCityClass(cls)}
                      className={`py-1.5 text-xs font-bold rounded-md transition-all ${
                        cityClass === cls
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {cls} City
                    </button>
                  ))}
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  {cityClass === 'X'
                    ? 'Metro (30% HRA - Delhi, Mumbai, etc.)'
                    : cityClass === 'Y'
                    ? 'Tier-2 (20% HRA - State Capitals, etc.)'
                    : 'Tier-3 / Rural (10% HRA)'}
                </span>
              </div>
            </div>

            {/* Quick Result Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <span className="text-xs font-semibold text-slate-500">Current 7th CPC In-Hand</span>
                <div className="text-2xl font-black text-slate-900 mt-1 flex items-baseline">
                  <FormatINR value={quickCalc.inHand7th} suffix=" /mo" />
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Gross: <FormatINR value={quickCalc.gross7th} /> (DA 53%)
                </div>
              </div>

              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
                <span className="text-xs font-semibold text-blue-700">Projected 8th CPC In-Hand</span>
                <div className="text-2xl font-black text-blue-900 mt-1 flex items-baseline">
                  <FormatINR value={quickCalc.inHand8th} suffix=" /mo" />
                </div>
                <div className="text-[11px] text-blue-700 mt-1">
                  Gross: <FormatINR value={quickCalc.gross8th} /> (New Basic)
                </div>
              </div>

              <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4">
                <span className="text-xs font-semibold text-emerald-800">Monthly Net Increase</span>
                <div className="text-2xl font-black text-emerald-700 mt-1 flex items-baseline">
                  <FormatINR value={quickCalc.inHandIncrease} prefix="+" suffix=" /mo" />
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                  +{quickCalc.percentageIncrease}% Take-Home Jump
                </div>
              </div>

              <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-purple-800">New Basic Pay</span>
                  <div className="text-2xl font-black text-purple-900 mt-1">
                    <FormatINR value={quickCalc.projectedBasic8th} />
                  </div>
                  <div className="text-[11px] text-purple-700 mt-1">
                    Up from <FormatINR value={entryPay} />
                  </div>
                </div>
                <Link
                  href={`/calculator?level=${selectedLevel}&ff=${fitmentFactor}&city=${cityClass}`}
                  className="mt-2 text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
                >
                  <span>View detailed pay slip</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wide">Notice</span>
              <span>This data shown is only for educational purpose and not 100% correct. truefunds.co.in doesn&apos;t take any responsibility of this data.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <DisclaimerBanner />

        {/* Core Calculators Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Calculators</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Central Govt Pay, Pension & Allowance Tools
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Every calculator uses officially notified DoPT rules, DA thresholds, and verified Pay Commission formulas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: 8th CPC Calculator */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    8th CPC Salary Calculator
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Custom fitment factors (1.86 to 3.68), HRA city tiers (X, Y, Z), Transport Allowance, NPS/UPS 10% deduction, and New vs Old Tax comparison.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">In-Hand Salary</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Fitment Factor</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Tax Estimate</span>
                </div>
              </div>
              <Link
                href="/calculator"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700 group-hover:text-blue-800"
              >
                <span>Calculate Salary</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Card 2: Pay Matrix (Levels 1-18) */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Table2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    Full Pay Matrix (Levels 1–18)
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Interactive matrix of all 18 pay levels and 40 stages. Click any cell to inspect projected 8th CPC basic pay, annual increments, and allowances.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Levels 1-18</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Stage Progression</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Interactive Grid</span>
                </div>
              </div>
              <Link
                href="/pay-matrix"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-700 group-hover:text-indigo-800"
              >
                <span>Explore Pay Matrix</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Card 3: UPS vs NPS */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    UPS vs NPS Calculator
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Unified Pension Scheme (50% guaranteed last pay + DR indexation + superannuation lump sum) versus NPS market corpus and annuity comparison.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Guaranteed 50%</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Inflation Linked</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">18.5% Govt Share</span>
                </div>
              </div>
              <Link
                href="/ups-vs-nps"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 group-hover:text-emerald-800"
              >
                <span>Compare UPS vs NPS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Card 4: Pension & Commutation */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    Pension & Commutation Calculator
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Compute full pension, 40% maximum commutation with official age factors, reduced monthly pension, 15-year restoration, and family pension.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">40% Commutation</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Age Factor CVP</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">15-Yr Restoration</span>
                </div>
              </div>
              <Link
                href="/pension"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber-700 group-hover:text-amber-800"
              >
                <span>Calculate Pension</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Card 5: DA Arrears */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    DA & Arrears Calculator
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Track All India Consumer Price Index (AICPIN-IW) numbers, current 53%+ DA rates, and calculate retroactive arrears for any payout interval.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">AICPIN Tracker</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">DA 53%+</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Month-by-Month</span>
                </div>
              </div>
              <Link
                href="/da-calculator"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-sky-700 group-hover:text-sky-800"
              >
                <span>Calculate DA Arrears</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Card 6: Gratuity & Leave */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    Gratuity & Leave Encashment
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    Includes the enhanced <FormatINR value={2500000} /> statutory cap (raised from 20L as DA passed 50%) and 300 days leave encashment calculations at superannuation.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">25L Gratuity Cap</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">300 Days Leave</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Tax-Free Rules</span>
                </div>
              </div>
              <Link
                href="/gratuity-leave"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-700 group-hover:text-teal-800"
              >
                <span>Calculate Gratuity</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Pay Matrix Levels 1 to 18 Quick Access Grid */}
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Level Directory</span>
              <h2 className="text-2xl font-bold text-slate-900">
                Pay Levels 1 to 18 Quick Navigator
              </h2>
              <p className="text-sm text-slate-500">
                Current 7th CPC entry pay vs projected 8th CPC entry pay (using 2.57 benchmark factor)
              </p>
            </div>
            <Link
              href="/pay-matrix"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-800"
            >
              <span>View Full 40-Stage Grid</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Object.entries(ENTRY_PAY_7TH).slice(0, 18).map(([lvl, data]) => {
              const projectedEntry = Math.round((data.entryPay * 2.57) / 100) * 100;
              return (
                <Link
                  key={lvl}
                  href={`/calculator?level=${lvl}`}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/70 hover:border-blue-300 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700">Level {lvl}</span>
                    <span className="text-[10px] bg-slate-200/70 text-slate-700 px-1.5 py-0.5 rounded font-semibold">
                      GP {data.gradePay}
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-medium text-slate-500">
                    7th: <FormatINR value={data.entryPay} />
                  </div>
                  <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                    8th: <FormatINR value={projectedEntry} />
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-1">{data.designation}</div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* High Volume "Salary of X" Posts Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Post Profiles</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Salary Breakdown by Central Govt Designation
              </h2>
              <p className="text-sm text-slate-500">
                High-volume searches: Entry in-hand pay, grade pay, allowances, and 8th CPC forecasts
              </p>
            </div>
            <Link
              href="/salary-of"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-800"
            >
              <span>View All Posts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {POPULAR_POSTS.slice(0, 4).map((post) => {
              const calc = calculate8thCPCSalary({
                level: post.level,
                basic7th: post.entryBasic7th,
                fitmentFactor: 2.57,
                cityClass: 'X',
              });

              return (
                <div
                  key={post.slug}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        Level {post.level} &bull; GP {post.gradePay}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Group {post.group}</span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {post.department}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-3 text-xs space-y-1">
                      <div className="flex justify-between text-slate-600">
                        <span>Current 7th In-Hand:</span>
                        <span className="font-semibold text-slate-900">
                          <FormatINR value={calc.inHand7th} />
                        </span>
                      </div>
                      <div className="flex justify-between text-blue-700 font-bold">
                        <span>Projected 8th In-Hand:</span>
                        <span>
                          <FormatINR value={calc.inHand8th} />
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/salary-of/${post.slug}`}
                    className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center justify-between"
                  >
                    <span>Inspect Post Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8th CPC Committee & Official Timeline Section */}
        <section className="bg-linear-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-10 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Cabinet Constituted Panel
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              8th Pay Commission: Mandate, Timeline & Committee
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Official facts on the 8th Central Pay Commission approved by the Union Cabinet to address salary parity, inflation erosion, and pensionary revisions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-5 border border-white/10 space-y-2">
              <Clock className="w-6 h-6 text-blue-400" />
              <div className="text-xs text-slate-300">Constituted Date</div>
              <div className="text-lg font-bold text-white">3 November 2025</div>
              <div className="text-xs text-slate-400">Formal Gazette notification issued</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-5 border border-white/10 space-y-2">
              <Shield className="w-6 h-6 text-emerald-400" />
              <div className="text-xs text-slate-300">Commission Head</div>
              <div className="text-lg font-bold text-white">Justice Ranjana P. Desai</div>
              <div className="text-xs text-slate-400">Former Supreme Court Justice</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-5 border border-white/10 space-y-2">
              <Users className="w-6 h-6 text-amber-400" />
              <div className="text-xs text-slate-300">Total Beneficiaries</div>
              <div className="text-lg font-bold text-white">1.19 Crore Citizens</div>
              <div className="text-xs text-slate-400">50 Lakh staff + 69 Lakh pensioners</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-5 border border-white/10 space-y-2">
              <CheckCircle2 className="w-6 h-6 text-sky-400" />
              <div className="text-xs text-slate-300">Expected Submission</div>
              <div className="text-lg font-bold text-white">May 2027</div>
              <div className="text-xs text-slate-400">18-month tenure for consultations</div>
            </div>
          </div>
        </section>

        {/* Official News Feed */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Official Tracker</span>
              <h2 className="text-2xl font-bold text-slate-900">
                Verified News & Ministry Circulars
              </h2>
              <p className="text-sm text-slate-500">
                Sourced strictly from 8cpc.gov.in, DoPT, Ministry of Finance, and Cabinet releases
              </p>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-800"
            >
              <span>View All Updates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OFFICIAL_NEWS_UPDATES.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {item.officialTag}
                  </span>
                  <span>{item.date}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.summary}
                </p>
                <div className="text-xs font-semibold text-slate-500 pt-1 flex items-center gap-1">
                  <span>Source: {item.source}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Structured FAQ Section with JSON-LD Schema */}
        {(() => {
          const faqList = [
            {
              question: "When was the 8th Pay Commission officially approved?",
              answer: "The Union Cabinet approved the formation of the 8th Central Pay Commission on 3 November 2025. Former Supreme Court Justice Ranjana Prakash Desai was appointed as Chairperson.",
            },
            {
              question: "When will the 8th Pay Commission report be submitted?",
              answer: "Pay Commissions are traditionally given an 18-month tenure to consult stakeholders. The report is expected around May 2027, following which the Union Cabinet decides on implementation dates and arrears.",
            },
            {
              question: "What is the expected fitment factor for the 8th CPC?",
              answer: "Staff unions (JCM Staff Side) have proposed a fitment factor of 2.86 (minimum basic ₹34,500), while conservative estimates suggest 1.92 to 2.15. All published calculators represent projections until the Commission makes its recommendation.",
            },
            {
              question: "How does UPS differ from NPS for central employees?",
              answer: "The Unified Pension Scheme (UPS) guarantees an assured monthly pension of 50% of the last 12 months average basic pay with full inflation indexation (DR). In contrast, NPS pension depends on market returns and commercial annuity rates.",
            },
            {
              question: "How is HRA calculated after Dearness Allowance crossed 50%?",
              answer: "As per 7th CPC rules, when DA reached 50%, HRA rates automatically elevated to 30% for Class X (Metro), 20% for Class Y (Tier-2), and 10% for Class Z (Rural) cities.",
            },
            {
              question: "What is the enhanced statutory ceiling for Retirement Gratuity?",
              answer: "The ceiling on Retirement and Death Gratuity was statutorily enhanced by 25% from ₹20 Lakh to ₹25 Lakh immediately upon DA crossing the 50% benchmark.",
            },
          ];

          const faqJsonLd = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqList.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          };

          return (
            <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-8 shadow-xs">
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
              />
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Clear Facts</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Frequently Asked Questions (8th CPC & Pay Rules)
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Authoritative answers separating official government facts from social media rumors
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqList.map((item, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-5 space-y-2">
                    <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                      <span>{item.question}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })()}
      </div>
    </div>
  );
}
