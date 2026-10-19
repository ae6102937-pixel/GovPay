'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Calculator,
  Sliders,
  DollarSign,
  ChevronDown,
} from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import ShareAndPrint from '@/components/ShareAndPrint';
import {
  calculate8thCPCSalary,
  ENTRY_PAY_7TH,
  get7thCPCPayMatrix,
  CityClass,
} from '@/lib/cpc-calculator';
import { FormatINR, RupeeIcon } from '@/components/Rupee';
import PrintReport from '@/components/PrintReport';

function CalculatorContent() {
  const searchParams = useSearchParams();

  // Query parameter defaults
  const paramLevel = Number(searchParams.get('level')) || 7;
  const paramCity = (searchParams.get('city') as CityClass) || 'X';
  const paramFF = Number(searchParams.get('ff')) || 2.57;

  const [level, setLevel] = useState<number>(paramLevel);
  const [stage, setStage] = useState<number>(1);
  const [customBasic, setCustomBasic] = useState<number>(
    ENTRY_PAY_7TH[paramLevel]?.entryPay || 44900
  );
  const [fitmentFactor, setFitmentFactor] = useState<number>(paramFF);
  const [isCustomFF, setIsCustomFF] = useState<boolean>(false);
  const [cityClass, setCityClass] = useState<CityClass>(paramCity);
  const [currentDA, setCurrentDA] = useState<number>(53);
  const [projectedDA8th, setProjectedDA8th] = useState<number>(0);
  const [pensionScheme, setPensionScheme] = useState<'NPS_UPS' | 'OPS'>('NPS_UPS');

  // Sync basic when level or stage changes
  const handleLevelChange = (newLevel: number) => {
    setLevel(newLevel);
    const newBasic = get7thCPCPayMatrix(newLevel, stage);
    setCustomBasic(newBasic);
  };

  const handleStageChange = (newStage: number) => {
    setStage(newStage);
    const newBasic = get7thCPCPayMatrix(level, newStage);
    setCustomBasic(newBasic);
  };

  const calculation = calculate8thCPCSalary({
    level,
    basic7th: customBasic,
    fitmentFactor,
    cityClass,
    currentDA,
    projectedDA8th,
  });

  // Adjust for OPS if selected
  const activeNps7th = pensionScheme === 'OPS' ? 0 : calculation.npsDeduction7th;
  const activeNps8th = pensionScheme === 'OPS' ? 0 : calculation.npsDeduction8th;
  
  const totalDed7th = activeNps7th + calculation.cghs7th + calculation.cgegis7th + calculation.profTax7th;
  const inHand7th = calculation.gross7th - totalDed7th;

  const totalDed8th = activeNps8th + calculation.cghs8th + calculation.cgegis8th + calculation.profTax8th;
  const inHand8th = calculation.gross8th - totalDed8th;

  const netDiff = inHand8th - inHand7th;
  const netDiffPercent = inHand7th > 0 ? Number(((netDiff / inHand7th) * 100).toFixed(1)) : 0;

  const fitmentPresets = [
    { factor: 1.92, label: '1.92', desc: 'Conservative (Merge Pay + 53% DA)' },
    { factor: 2.15, label: '2.15', desc: 'Moderate Inflation Precedent' },
    { factor: 2.57, label: '2.57', desc: '7th CPC Equivalent Factor' },
    { factor: 2.86, label: '2.86', desc: 'JCM Staff Side Demand' },
    { factor: 3.00, label: '3.00', desc: 'Round Benchmark' },
    { factor: 3.68, label: '3.68', desc: 'Upper Union Demand' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Web Screen UI (Hidden in Print) */}
      <div className="no-print space-y-8">
        {/* Header with Title & Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Calculators</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            8th Pay Commission Salary Calculator
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Project your revised basic pay, gross earnings, and in-hand salary with customizable fitment factors
          </p>
        </div>

        <ShareAndPrint title="8th Pay Commission Salary Calculation" />
      </div>

      <DisclaimerBanner />

      {/* Main Grid: Controls on left, Live Breakdown on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-600" />
              <span>Input Parameters</span>
            </h2>
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold">
              Levels 1 to 18
            </span>
          </div>

          {/* Pay Level Selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Pay Level (7th CPC)
            </label>
            <select
              value={level}
              onChange={(e) => handleLevelChange(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              {Object.entries(ENTRY_PAY_7TH).map(([lvl, data]) => (
                <option key={lvl} value={lvl}>
                  Level {lvl} (GP {data.gradePay}) - {data.designation}
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-500 flex justify-between">
              <span>Grade Pay: <FormatINR value={Number(ENTRY_PAY_7TH[level]?.gradePay) || 0} /></span>
              <span>Group: {ENTRY_PAY_7TH[level]?.group}</span>
            </div>
          </div>

          {/* Stage or Custom Basic Pay */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Matrix Stage
              </label>
              <select
                value={stage}
                onChange={(e) => handleStageChange(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                {Array.from({ length: 40 }, (_, i) => i + 1).map((s) => (
                  <option key={s} value={s}>
                    Stage {s} ({s === 1 ? 'Entry' : `+${(s - 1) * 3}%`})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Current Basic Pay (<RupeeIcon className="w-3 h-3 inline" />)
              </label>
              <input
                type="number"
                step="100"
                value={customBasic}
                onChange={(e) => setCustomBasic(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Fitment Factor Scenario Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Fitment Factor Scenario
              </label>
              <button
                type="button"
                onClick={() => setIsCustomFF(!isCustomFF)}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
              >
                {isCustomFF ? 'Use Presets' : 'Custom Slider'}
              </button>
            </div>

            {!isCustomFF ? (
              <div className="grid grid-cols-3 gap-2">
                {fitmentPresets.map((item) => (
                  <button
                    key={item.factor}
                    type="button"
                    onClick={() => setFitmentFactor(item.factor)}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      fitmentFactor === item.factor
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-sm font-bold">{item.label}</div>
                    <div className={`text-[10px] truncate ${fitmentFactor === item.factor ? 'text-blue-100' : 'text-slate-500'}`}>
                      {item.desc.split('(')[0]}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span>Custom Factor:</span>
                  <span className="text-blue-600 text-base">{fitmentFactor.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="1.80"
                  max="3.70"
                  step="0.01"
                  value={fitmentFactor}
                  onChange={(e) => setFitmentFactor(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>1.80 (Low)</span>
                  <span>2.57 (7th CPC)</span>
                  <span>2.86 (JCM)</span>
                  <span>3.70 (High)</span>
                </div>
              </div>
            )}
            <p className="text-[11px] text-amber-700 italic">
              * Assumption clearly labeled. The Union Cabinet will notify the final factor.
            </p>
          </div>

          {/* City Class for HRA & TA */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              City Classification (HRA & Transport Allowance)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['X', 'Y', 'Z'] as CityClass[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCityClass(c)}
                  className={`py-2 px-3 rounded-lg border text-center transition-all ${
                    cityClass === c
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-bold">Class {c}</div>
                  <div className="text-[10px] text-slate-400">
                    {c === 'X' ? '30% HRA' : c === 'Y' ? '20% HRA' : '10% HRA'}
                  </div>
                </button>
              ))}
            </div>
            <div className="text-[11px] text-slate-500">
              {cityClass === 'X' && 'Class X: Delhi, Mumbai, Kolkata, Chennai, Bengaluru, Hyderabad, Pune, Ahmedabad'}
              {cityClass === 'Y' && 'Class Y: State Capitals, Tier-2 cities with population > 5 Lakh'}
              {cityClass === 'Z' && 'Class Z: All other cities and rural postings'}
            </div>
          </div>

          {/* Current DA & 8th CPC DA */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Current 7th DA (%)
              </label>
              <input
                type="number"
                value={currentDA}
                onChange={(e) => setCurrentDA(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-hidden"
              />
              <span className="text-[10px] text-slate-400">Notified rate: 53%+</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Projected 8th DA (%)
              </label>
              <input
                type="number"
                value={projectedDA8th}
                onChange={(e) => setProjectedDA8th(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-hidden"
              />
              <span className="text-[10px] text-slate-400">Standard 0% upon launch</span>
            </div>
          </div>

          {/* Scheme Toggles */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-800">Pension Deduction</div>
              <div className="text-[11px] text-slate-500">NPS/UPS (10%) or OPS (0%)</div>
            </div>
            <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => setPensionScheme('NPS_UPS')}
                className={`px-3 py-1 rounded-md transition-all ${
                  pensionScheme === 'NPS_UPS' ? 'bg-white shadow-xs text-blue-700' : 'text-slate-600'
                }`}
              >
                UPS / NPS
              </button>
              <button
                type="button"
                onClick={() => setPensionScheme('OPS')}
                className={`px-3 py-1 rounded-md transition-all ${
                  pensionScheme === 'OPS' ? 'bg-white shadow-xs text-blue-700' : 'text-slate-600'
                }`}
              >
                OPS
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Comparative Results & Pay Slip (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Summary Banner */}
          <div className="bg-linear-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                  Summary Estimation
                </span>
                <h3 className="text-xl font-bold text-white">
                  Level {level} Salary Projection ({fitmentFactor.toFixed(2)}x)
                </h3>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-full font-bold">
                +{netDiffPercent}% Jump
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="text-xs text-slate-300">7th CPC In-Hand</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-1">
                  <FormatINR value={inHand7th} />
                </div>
                <div className="text-[10px] text-slate-400">Current Take-Home</div>
              </div>

              <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="text-xs text-blue-200">8th CPC In-Hand</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-300 mt-1">
                  <FormatINR value={inHand8th} />
                </div>
                <div className="text-[10px] text-blue-200">Projected Take-Home</div>
              </div>

              <div className="col-span-2 sm:col-span-1 bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="text-xs text-emerald-200">Net Monthly Gain</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                  <FormatINR value={netDiff} prefix="+" />
                </div>
                <div className="text-[10px] text-emerald-200">
                  +<FormatINR value={netDiff * 12} />/yr
                </div>
              </div>
            </div>
          </div>

          {/* Full Itemized Pay-Slip Comparison Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Comparative Pay-Slip Breakdown
                </h3>
                <p className="text-xs text-slate-500">
                  Item-by-item breakdown of allowances and statutory deductions
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs">
                City Class {cityClass}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100/70 text-slate-700 text-xs font-bold border-b border-slate-200">
                    <th className="py-3 px-4">Pay Component</th>
                    <th className="py-3 px-4 text-right">7th CPC Current</th>
                    <th className="py-3 px-4 text-right bg-blue-50/50 text-blue-900">
                      8th CPC Projected
                    </th>
                    <th className="py-3 px-4 text-right">Difference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {/* Earnings Group */}
                  <tr className="bg-slate-50/80 font-bold text-slate-800 text-xs uppercase tracking-wider">
                    <td colSpan={4} className="py-2 px-4">
                      A. Monthly Earnings (Allowances)
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-4 font-medium text-slate-800">
                      Basic Pay
                      <span className="block text-[11px] text-slate-400">
                        {fitmentFactor.toFixed(2)}x fitment factor applied
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-700 font-semibold">
                      <FormatINR value={calculation.basic7th} />
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-blue-900 bg-blue-50/30">
                      <FormatINR value={calculation.projectedBasic8th} />
                    </td>
                    <td className="py-2.5 px-4 text-right text-emerald-600 font-semibold">
                      <FormatINR value={calculation.projectedBasic8th - calculation.basic7th} prefix="+" />
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-4 font-medium text-slate-800">
                      Dearness Allowance (DA)
                      <span className="block text-[11px] text-slate-400">
                        7th: {calculation.daPercent7th}% | 8th: {calculation.daPercent8th}%
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-700">
                      <FormatINR value={calculation.daAmount7th} />
                    </td>
                    <td className="py-2.5 px-4 text-right font-medium text-blue-900 bg-blue-50/30">
                      <FormatINR value={calculation.daAmount8th} />
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-500">
                      Merged into Basic
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-4 font-medium text-slate-800">
                      House Rent Allowance (HRA)
                      <span className="block text-[11px] text-slate-400">
                        {cityClass} City ({calculation.hraPercent7th}% vs {calculation.hraPercent8th}%)
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-700">
                      <FormatINR value={calculation.hraAmount7th} />
                    </td>
                    <td className="py-2.5 px-4 text-right font-medium text-blue-900 bg-blue-50/30">
                      <FormatINR value={calculation.hraAmount8th} />
                    </td>
                    <td className="py-2.5 px-4 text-right text-emerald-600 font-semibold">
                      <FormatINR value={calculation.hraAmount8th - calculation.hraAmount7th} prefix="+" />
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-4 font-medium text-slate-800">
                      Transport Allowance (TA + DA)
                      <span className="block text-[11px] text-slate-400">
                        Base TA <FormatINR value={calculation.taBase7th} /> + DA
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-700">
                      <FormatINR value={calculation.taTotal7th} />
                    </td>
                    <td className="py-2.5 px-4 text-right font-medium text-blue-900 bg-blue-50/30">
                      <FormatINR value={calculation.taTotal8th} />
                    </td>
                    <td className="py-2.5 px-4 text-right text-emerald-600 font-semibold">
                      <FormatINR value={calculation.taTotal8th - calculation.taTotal7th} prefix="+" />
                    </td>
                  </tr>

                  {/* Gross Total Row */}
                  <tr className="bg-slate-100 font-bold text-slate-900">
                    <td className="py-3 px-4">Gross Monthly Salary</td>
                    <td className="py-3 px-4 text-right">
                      <FormatINR value={calculation.gross7th} />
                    </td>
                    <td className="py-3 px-4 text-right text-blue-950 bg-blue-100/60 font-black">
                      <FormatINR value={calculation.gross8th} />
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-700 font-black">
                      <FormatINR value={calculation.grossIncrease} prefix="+" />
                    </td>
                  </tr>

                  {/* Deductions Group */}
                  <tr className="bg-slate-50/80 font-bold text-slate-800 text-xs uppercase tracking-wider">
                    <td colSpan={4} className="py-2 px-4">
                      B. Monthly Deductions
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-4 font-medium text-slate-800">
                      NPS / UPS Employee Deduction
                      <span className="block text-[11px] text-slate-400">
                        10% of (Basic + DA)
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right text-rose-700">
                      -<FormatINR value={activeNps7th} />
                    </td>
                    <td className="py-2.5 px-4 text-right text-rose-700 bg-blue-50/30 font-medium">
                      -<FormatINR value={activeNps8th} />
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-500">
                      -<FormatINR value={activeNps8th - activeNps7th} />
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-4 font-medium text-slate-800">
                      CGHS Contribution
                      <span className="block text-[11px] text-slate-400">Health scheme slab</span>
                    </td>
                    <td className="py-2.5 px-4 text-right text-rose-700">
                      -<FormatINR value={calculation.cghs7th} />
                    </td>
                    <td className="py-2.5 px-4 text-right text-rose-700 bg-blue-50/30 font-medium">
                      -<FormatINR value={calculation.cghs8th} />
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-500">
                      -<FormatINR value={calculation.cghs8th - calculation.cghs7th} />
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-4 font-medium text-slate-800">
                      CGEGIS & Professional Tax
                      <span className="block text-[11px] text-slate-400">Group insurance + State PT</span>
                    </td>
                    <td className="py-2.5 px-4 text-right text-rose-700">
                      -<FormatINR value={calculation.cgegis7th + calculation.profTax7th} />
                    </td>
                    <td className="py-2.5 px-4 text-right text-rose-700 bg-blue-50/30 font-medium">
                      -<FormatINR value={calculation.cgegis8th + calculation.profTax8th} />
                    </td>
                    <td className="py-2.5 px-4 text-right text-slate-500">
                      <FormatINR value={0} />
                    </td>
                  </tr>

                  {/* Total Deductions Row */}
                  <tr className="bg-rose-50/50 font-bold text-rose-900">
                    <td className="py-3 px-4">Total Monthly Deductions</td>
                    <td className="py-3 px-4 text-right">
                      -<FormatINR value={totalDed7th} />
                    </td>
                    <td className="py-3 px-4 text-right bg-blue-50/50 font-black">
                      -<FormatINR value={totalDed8th} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      -<FormatINR value={totalDed8th - totalDed7th} />
                    </td>
                  </tr>

                  {/* Net In Hand Row */}
                  <tr className="bg-emerald-50 text-emerald-950 font-black text-sm sm:text-base border-t-2 border-emerald-300">
                    <td className="py-4 px-4">
                      Net Take-Home Salary (In-Hand)
                      <span className="block text-xs font-normal text-emerald-800">
                        Direct monthly bank credit
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-slate-800">
                      <FormatINR value={inHand7th} />
                    </td>
                    <td className="py-4 px-4 text-right text-emerald-900 bg-emerald-100/70 text-base sm:text-lg">
                      <FormatINR value={inHand8th} />
                    </td>
                    <td className="py-4 px-4 text-right text-emerald-700">
                      <FormatINR value={netDiff} prefix="+" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Print-Only Report Section */}
      <PrintReport
        title="8th Central Pay Commission Salary Assessment Statement"
        subtitle="Comparative Pay Slip & Allowance Breakdown"
        metadata={[
          { label: 'Pay Level & Scale', value: `Level ${level} (GP ${ENTRY_PAY_7TH[level]?.gradePay})` },
          { label: 'Current 7th Basic', value: `₹${customBasic.toLocaleString('en-IN')}` },
          { label: 'Projected 8th Factor', value: `${fitmentFactor.toFixed(2)}x Multiplier` },
          { label: 'City Classification', value: `Class ${cityClass} (${cityClass === 'X' ? '30%' : cityClass === 'Y' ? '20%' : '10%'} HRA)` },
          { label: 'Current DA Rate', value: `${currentDA}% (Notified)` },
          { label: 'Pension Scheme', value: pensionScheme === 'NPS_UPS' ? 'UPS / NPS (10% Ded)' : 'OPS (0% Ded)' },
        ]}
        sections={[
          {
            title: '1. Monthly Earnings (Allowances)',
            rows: [
              {
                label: 'Basic Pay',
                sublabel: `${fitmentFactor.toFixed(2)}x factor applied`,
                col1: `₹${calculation.basic7th.toLocaleString('en-IN')}`,
                col2: `₹${calculation.projectedBasic8th.toLocaleString('en-IN')}`,
              },
              {
                label: 'Dearness Allowance (DA)',
                sublabel: `7th: ${calculation.daPercent7th}% | 8th: ${calculation.daPercent8th}%`,
                col1: `₹${calculation.daAmount7th.toLocaleString('en-IN')}`,
                col2: `₹${calculation.daAmount8th.toLocaleString('en-IN')}`,
              },
              {
                label: 'House Rent Allowance (HRA)',
                sublabel: `Class ${cityClass} (${calculation.hraPercent7th}% vs ${calculation.hraPercent8th}%)`,
                col1: `₹${calculation.hraAmount7th.toLocaleString('en-IN')}`,
                col2: `₹${calculation.hraAmount8th.toLocaleString('en-IN')}`,
              },
              {
                label: 'Transport Allowance (TA + DA on TA)',
                sublabel: `Base TA ₹${calculation.taBase7th}`,
                col1: `₹${calculation.taTotal7th.toLocaleString('en-IN')}`,
                col2: `₹${calculation.taTotal8th.toLocaleString('en-IN')}`,
              },
              {
                label: 'Gross Monthly Salary',
                isTotal: true,
                col1: `₹${calculation.gross7th.toLocaleString('en-IN')}`,
                col2: `₹${calculation.gross8th.toLocaleString('en-IN')}`,
              },
            ],
          },
          {
            title: '2. Monthly Deductions',
            rows: [
              {
                label: 'NPS / UPS Employee Contribution',
                sublabel: '10% of (Basic + DA)',
                col1: `-₹${activeNps7th.toLocaleString('en-IN')}`,
                col2: `-₹${activeNps8th.toLocaleString('en-IN')}`,
              },
              {
                label: 'CGHS Health Scheme',
                col1: `-₹${calculation.cghs7th.toLocaleString('en-IN')}`,
                col2: `-₹${calculation.cghs8th.toLocaleString('en-IN')}`,
              },
              {
                label: 'CGEGIS & Professional Tax',
                col1: `-₹${(calculation.cgegis7th + calculation.profTax7th).toLocaleString('en-IN')}`,
                col2: `-₹${(calculation.cgegis8th + calculation.profTax8th).toLocaleString('en-IN')}`,
              },
              {
                label: 'Total Deductions',
                isTotal: true,
                col1: `-₹${totalDed7th.toLocaleString('en-IN')}`,
                col2: `-₹${totalDed8th.toLocaleString('en-IN')}`,
              },
            ],
          },
          {
            title: '3. Net In-Hand Take Home Salary',
            rows: [
              {
                label: 'Net Monthly Bank Credit',
                sublabel: 'Gross Earnings minus Total Statutory Deductions',
                isTotal: true,
                col1: `₹${inHand7th.toLocaleString('en-IN')}`,
                col2: `₹${inHand8th.toLocaleString('en-IN')} (+₹${netDiff.toLocaleString('en-IN')} /mo)`,
              },
            ],
          },
        ]}
      />
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading 8th CPC Calculator...</div>}>
      <CalculatorContent />
    </Suspense>
  );
}
