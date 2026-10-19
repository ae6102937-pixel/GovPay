'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Calculator, Table2, ShieldAlert, Award, FileSpreadsheet, TrendingUp, Newspaper, Menu, X, Landmark, Users } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: '8th CPC Calculator', href: '/calculator', icon: Calculator },
    { name: 'Pay Matrix (1-18)', href: '/pay-matrix', icon: Table2 },
    { name: 'UPS vs NPS', href: '/ups-vs-nps', icon: Award },
    { name: 'Pension & Commutation', href: '/pension', icon: Landmark },
    { name: 'DA & Arrears', href: '/da-calculator', icon: TrendingUp },
    { name: 'Gratuity & Leave', href: '/gratuity-leave', icon: FileSpreadsheet },
    { name: 'Salary by Post', href: '/salary-of', icon: Users },
    { name: 'News & Committee', href: '/news', icon: Newspaper },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Govt / Official Notice Strip */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium">8th Central Pay Commission Tracker:</span>
            <span className="text-slate-300 hidden sm:inline">Constituted 3 Nov 2025 • Report Expected May 2027</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <span className="hidden md:inline">Affects 50L+ Employees & 69L+ Pensioners</span>
            <span className="bg-blue-600/60 text-blue-100 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide">
              govpay.truefunds.co.in
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xs ring-1 ring-blue-600/30 group-hover:scale-105 transition-transform shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/favicon.svg" alt="GovPay TrueFunds" className="w-full h-full object-cover" width={40} height={40} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-lg tracking-tight">GovPay</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  TrueFunds
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">8th Pay Commission & Govt Salary Portal</p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-700">
            <Link
              href="/calculator"
              className="px-3 py-2 rounded-md hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              8th CPC Calculator
            </Link>
            <Link
              href="/pay-matrix"
              className="px-3 py-2 rounded-md hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              Pay Matrix
            </Link>
            <Link
              href="/ups-vs-nps"
              className="px-3 py-2 rounded-md hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              UPS vs NPS
            </Link>
            <Link
              href="/pension"
              className="px-3 py-2 rounded-md hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              Pension
            </Link>
            <Link
              href="/da-calculator"
              className="px-3 py-2 rounded-md hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              DA Arrears
            </Link>
            <Link
              href="/salary-of"
              className="px-3 py-2 rounded-md hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              Posts
            </Link>
            <Link
              href="/news"
              className="px-3 py-2 rounded-md hover:text-blue-700 hover:bg-blue-50 transition-colors"
            >
              News
            </Link>

            <Link
              href="/calculator"
              className="ml-2 inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs transition-all hover:shadow"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculate Salary</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-2 rounded-md focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <Icon className="w-4 h-4 text-slate-500" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2.5 rounded-lg text-sm shadow-xs"
            >
              <Calculator className="w-4 h-4" />
              <span>Open 8th Pay Calculator</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
