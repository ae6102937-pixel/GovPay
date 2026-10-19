'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Table2,
  Search,
  Sliders,
  Calculator,
  X,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import ShareAndPrint from '@/components/ShareAndPrint';
import {
  ENTRY_PAY_7TH,
  get7thCPCPayMatrix,
  calculate8thCPCSalary,
  CityClass,
} from '@/lib/cpc-calculator';
import { FormatINR, RupeeIcon } from '@/components/Rupee';

export default function PayMatrixPage() {
  const [fitmentFactor, setFitmentFactor] = useState<number>(2.57);
  const [viewMode, setViewMode] = useState<'both' | '7th' | '8th'>('both');
  const [selectedCell, setSelectedCell] = useState<{ level: number; stage: number; basic7th: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalCityClass, setModalCityClass] = useState<CityClass>('X');

  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  const maxStages = 30; // standard 30 stages for clear readable matrix

  // Filter levels based on search query
  const filteredLevels = levels.filter((lvl) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const meta = ENTRY_PAY_7TH[lvl];
    if (!meta) return false;
    return (
      `level ${lvl}`.includes(q) ||
      lvl.toString() === q ||
      meta.gradePay.includes(q) ||
      meta.designation.toLowerCase().includes(q) ||
      meta.entryPay.toString().includes(q)
    );
  });

  const cellCalculation = selectedCell
    ? calculate8thCPCSalary({
        level: selectedCell.level,
        basic7th: selectedCell.basic7th,
        fitmentFactor,
        cityClass: modalCityClass,
        currentDA: 53,
        projectedDA8th: 0,
      })
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Pay Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            Central Government Pay Matrix (Levels 1–18)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Complete 7th CPC official scale & projected 8th CPC matrix. Click any cell to inspect in-hand salary.
          </p>
        </div>

        <ShareAndPrint title="7th and 8th CPC Pay Matrix Table" />
      </div>

      <DisclaimerBanner />

      {/* Control Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Fitment factor pill selectors */}
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              8th CPC Projected Fitment Factor
            </span>
            <div className="flex flex-wrap gap-2">
              {[1.92, 2.15, 2.57, 2.86, 3.00, 3.68].map((ff) => (
                <button
                  key={ff}
                  type="button"
                  onClick={() => setFitmentFactor(ff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    fitmentFactor === ff
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {ff.toFixed(2)}x
                </button>
              ))}
            </div>
          </div>

          {/* View mode toggle */}
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Display Mode
            </span>
            <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-bold">
              <button
                type="button"
                onClick={() => setViewMode('both')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  viewMode === 'both' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                Side-by-Side (7th & 8th)
              </button>
              <button
                type="button"
                onClick={() => setViewMode('8th')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  viewMode === '8th' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                8th Projected Only
              </button>
              <button
                type="button"
                onClick={() => setViewMode('7th')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  viewMode === '7th' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                7th Official Only
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-64 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Quick Filter
            </span>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Level, GP (e.g. 4600) or post..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pay Matrix Scrollable Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600" />
            <span>
              Values shown in INR (<RupeeIcon className="w-3 h-3 inline" />). Click any cell to inspect detailed take-home pay, HRA, and allowances.
            </span>
          </div>
          <span className="hidden sm:inline font-semibold text-slate-700">
            Horizontal scroll enabled &rarr;
          </span>
        </div>

        <div className="overflow-x-auto max-h-[700px] relative">
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead className="sticky top-0 z-20 bg-slate-900 text-white shadow-sm">
              <tr>
                <th className="py-3 px-3 text-center border-r border-slate-800 sticky left-0 z-30 bg-slate-900 font-bold min-w-[70px]">
                  Stage
                </th>
                {filteredLevels.map((lvl) => {
                  const meta = ENTRY_PAY_7TH[lvl];
                  return (
                    <th
                      key={lvl}
                      className="py-3 px-3 border-r border-slate-800 text-center min-w-[130px]"
                    >
                      <div className="font-extrabold text-blue-300 text-sm">Level {lvl}</div>
                      <div className="text-[10px] text-slate-300">GP {meta?.gradePay}</div>
                      <div className="text-[9px] text-slate-400 truncate max-w-[120px]">
                        {meta?.group} &bull; {meta?.designation.split(',')[0]}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {Array.from({ length: maxStages }, (_, idx) => {
                const stageNum = idx + 1;
                return (
                  <tr key={stageNum} className="hover:bg-blue-50/40 transition-colors">
                    {/* Sticky Stage Column */}
                    <td className="py-2 px-3 text-center font-bold text-slate-700 border-r border-slate-200 sticky left-0 z-10 bg-slate-50">
                      #{stageNum}
                    </td>

                    {/* Pay cells per level */}
                    {filteredLevels.map((lvl) => {
                      const pay7th = get7thCPCPayMatrix(lvl, stageNum);
                      const pay8th = Math.round((pay7th * fitmentFactor) / 100) * 100;

                      return (
                        <td
                          key={lvl}
                          onClick={() => setSelectedCell({ level: lvl, stage: stageNum, basic7th: pay7th })}
                          className="py-2 px-2.5 border-r border-slate-200 text-right cursor-pointer hover:bg-blue-100/70 transition-colors group"
                          title={`Level ${lvl} Stage ${stageNum}: Click to inspect breakdown`}
                        >
                          {viewMode === 'both' && (
                            <div>
                              <div className="font-bold text-blue-900 group-hover:text-blue-700">
                                <FormatINR value={pay8th} />
                              </div>
                              <div className="text-[10px] text-slate-400">
                                7th: <FormatINR value={pay7th} />
                              </div>
                            </div>
                          )}
                          {viewMode === '8th' && (
                            <div className="font-bold text-blue-900">
                              <FormatINR value={pay8th} />
                            </div>
                          )}
                          {viewMode === '7th' && (
                            <div className="font-semibold text-slate-800">
                              <FormatINR value={pay7th} />
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Slide-over Drawer for Selected Cell Inspection */}
      {selectedCell && cellCalculation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Cell Inspection & Take-Home
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Level {selectedCell.level} &bull; Stage {selectedCell.stage} Breakdown
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCell(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* City Class Selector in Modal */}
            <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl text-xs">
              <span className="font-bold text-slate-700">City Classification:</span>
              <div className="flex gap-1">
                {(['X', 'Y', 'Z'] as CityClass[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setModalCityClass(c)}
                    className={`px-3 py-1 rounded-md font-bold transition-all ${
                      modalCityClass === c ? 'bg-blue-600 text-white shadow-2xs' : 'bg-white text-slate-700'
                    }`}
                  >
                    Class {c} ({c === 'X' ? '30%' : c === 'Y' ? '20%' : '10%'})
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <div className="text-[11px] text-slate-500 font-medium">7th CPC In-Hand</div>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  <FormatINR value={cellCalculation.inHand7th} />
                </div>
                <div className="text-[10px] text-slate-400">
                  Basic: <FormatINR value={selectedCell.basic7th} />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <div className="text-[11px] text-blue-700 font-medium">Projected 8th In-Hand</div>
                <div className="text-lg font-bold text-blue-900 mt-0.5">
                  <FormatINR value={cellCalculation.inHand8th} />
                </div>
                <div className="text-[10px] text-blue-600">
                  New Basic: <FormatINR value={cellCalculation.projectedBasic8th} />
                </div>
              </div>
            </div>

            {/* Detailed Mini Breakdown */}
            <div className="space-y-2 text-xs border border-slate-200 rounded-xl p-3 bg-slate-50/50">
              <div className="flex justify-between text-slate-700">
                <span>Fitment Factor Applied:</span>
                <span className="font-semibold text-slate-900">{fitmentFactor.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>8th CPC Gross Salary:</span>
                <span className="font-semibold text-slate-900">
                  <FormatINR value={cellCalculation.gross8th} />
                </span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>NPS/UPS Deduction (10%):</span>
                <span className="font-semibold text-rose-600">
                  -<FormatINR value={cellCalculation.npsDeduction8th} />
                </span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>HRA ({modalCityClass} City):</span>
                <span className="font-semibold text-emerald-700">
                  +<FormatINR value={cellCalculation.hraAmount8th} />
                </span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Transport Allowance:</span>
                <span className="font-semibold text-slate-900">
                  +<FormatINR value={cellCalculation.taTotal8th} />
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-emerald-700">
                <span>Net Monthly Increase:</span>
                <span>+<FormatINR value={cellCalculation.inHandIncrease} /> ({cellCalculation.percentageIncrease}%)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Link
                href={`/calculator?level=${selectedCell.level}&basic=${selectedCell.basic7th}&ff=${fitmentFactor}&city=${modalCityClass}`}
                className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-xs"
              >
                Open Full Pay-Slip Calculator &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
