import Link from 'next/link';
import { ExternalLink, ShieldCheck, Heart, AlertTriangle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                GP
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-lg">GovPay</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-900/80 text-blue-300 font-semibold border border-blue-700">
                  truefunds.co.in
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Dedicated central government employee pay, pension, and allowance portal. Built to provide transparent, verified, and ad-free calculations based strictly on official Gazette notifications and Pay Commission reports.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Independent financial analysis by TrueFunds.</span>
            </div>
          </div>

          {/* Quick Calculators */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Calculators</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/calculator" className="hover:text-white transition-colors">
                  8th CPC Salary Calculator
                </Link>
              </li>
              <li>
                <Link href="/pay-matrix" className="hover:text-white transition-colors">
                  Pay Matrix (Levels 1–18)
                </Link>
              </li>
              <li>
                <Link href="/ups-vs-nps" className="hover:text-white transition-colors">
                  UPS vs NPS Comparison
                </Link>
              </li>
              <li>
                <Link href="/pension" className="hover:text-white transition-colors">
                  Pension & Commutation
                </Link>
              </li>
              <li>
                <Link href="/da-calculator" className="hover:text-white transition-colors">
                  DA & Arrears Calculator
                </Link>
              </li>
              <li>
                <Link href="/gratuity-leave" className="hover:text-white transition-colors">
                  Gratuity & Leave Encashment
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Posts */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Salary by Post</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/salary-of/constable-gd" className="hover:text-white transition-colors">
                  Police Constable GD (Level 3)
                </Link>
              </li>
              <li>
                <Link href="/salary-of/ssc-cgl-inspector" className="hover:text-white transition-colors">
                  SSC CGL Inspector (Level 7)
                </Link>
              </li>
              <li>
                <Link href="/salary-of/aso-css" className="hover:text-white transition-colors">
                  ASO in CSS / MEA (Level 7)
                </Link>
              </li>
              <li>
                <Link href="/salary-of/railway-alp" className="hover:text-white transition-colors">
                  Railway ALP (Level 2)
                </Link>
              </li>
              <li>
                <Link href="/salary-of/station-master" className="hover:text-white transition-colors">
                  Station Master (Level 6)
                </Link>
              </li>
              <li>
                <Link href="/salary-of/kvs-tgt-pgt-teacher" className="hover:text-white transition-colors">
                  KVS Teachers (Level 6-8)
                </Link>
              </li>
              <li>
                <Link href="/salary-of/defence-ranks" className="hover:text-white transition-colors">
                  Defence Ranks & MSP
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Official Portals</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a
                  href="https://8cpc.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>8cpc.gov.in (Official)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://dopt.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>DoPT Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://doe.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Dept of Expenditure</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://pib.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>PIB Cabinet Releases</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors text-blue-400">
                  8th CPC Verified Timeline &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Educational Purpose & Liability Disclaimer */}
        <div className="mt-10 p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-400 font-semibold uppercase tracking-wider">Educational Notice: </strong>
            This data shown is only for educational purpose and is not 100% correct. truefunds.co.in doesn&apos;t take any responsibility of this data.
            All calculations, projections, and fitment factors are simulation models based on historical Pay Commission trends. Please refer to official Government of India Gazette notifications for statutory figures.
          </div>
        </div>

        <div className="border-t border-slate-800 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} govpay.truefunds.co.in &bull; TrueFunds Central Pay & Pension Research.
          </p>
          <p className="text-slate-400 text-center sm:text-right">
            Data shown is for educational purpose only. truefunds.co.in takes no responsibility for this data.
          </p>
        </div>
      </div>
    </footer>
  );
}
