'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Newspaper, ExternalLink, Calendar, CheckCircle2, ShieldAlert, FileText, Filter } from 'lucide-react';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import ShareAndPrint from '@/components/ShareAndPrint';
import { OFFICIAL_NEWS_UPDATES } from '@/lib/pay-data';

export default function NewsPage() {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags = ['All', 'Cabinet Approval', 'DoPT', 'Finance Ministry', '8th CPC Committee'];

  const filteredNews = selectedTag === 'All'
    ? OFFICIAL_NEWS_UPDATES
    : OFFICIAL_NEWS_UPDATES.filter((item) => item.officialTag === selectedTag);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Official News & Updates</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            8th Pay Commission News & Gazette Tracker
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Verified updates strictly sourced from 8cpc.gov.in, DoPT, Ministry of Finance, and Cabinet releases
          </p>
        </div>

        <ShareAndPrint title="8th Pay Commission Official News Tracker" />
      </div>

      <DisclaimerBanner />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-xs font-bold text-slate-700 shrink-0">Filter by Source:</span>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              selectedTag === tag
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* News Feed */}
      <div className="space-y-4">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-slate-300 transition-all space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  {item.officialTag}
                </span>
                {item.isOfficial && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Source</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.date}</span>
              </div>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {item.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-slate-500 font-medium">
                Authority: <span className="font-semibold text-slate-800">{item.source}</span>
              </div>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-blue-700 hover:text-blue-900"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Historical Pay Commission Precedents Timeline */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Historical Precedents
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Pay Commission Timeline in Independent India
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Understanding the ~10 year cycle and fitment factors implemented across previous commissions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-white/10 rounded-xl p-4 border border-white/10 space-y-1">
            <div className="text-blue-300 font-bold">5th Pay Commission</div>
            <div className="text-slate-400">Effective: 1 Jan 1996</div>
            <div className="text-white font-medium">Minimum Pay: ₹2,550</div>
            <div className="text-slate-400">Chairman: Justice S.R. Pandian</div>
          </div>

          <div className="bg-white/10 rounded-xl p-4 border border-white/10 space-y-1">
            <div className="text-blue-300 font-bold">6th Pay Commission</div>
            <div className="text-slate-400">Effective: 1 Jan 2006</div>
            <div className="text-white font-medium">Minimum Pay: ₹7,000 (GP System)</div>
            <div className="text-slate-400">Fitment Factor: 1.86 &bull; Justice B.N. Srikrishna</div>
          </div>

          <div className="bg-white/10 rounded-xl p-4 border border-white/10 space-y-1">
            <div className="text-blue-300 font-bold">7th Pay Commission</div>
            <div className="text-slate-400">Effective: 1 Jan 2016</div>
            <div className="text-white font-medium">Minimum Pay: ₹18,000 (Pay Matrix)</div>
            <div className="text-slate-400">Fitment Factor: 2.57 &bull; Justice A.K. Mathur</div>
          </div>

          <div className="bg-blue-600/30 rounded-xl p-4 border border-blue-400/40 space-y-1">
            <div className="text-emerald-300 font-bold">8th Pay Commission (Current)</div>
            <div className="text-slate-300">Constituted: 3 Nov 2025</div>
            <div className="text-white font-bold">Report Expected: May 2027</div>
            <div className="text-emerald-200 font-medium">Head: Justice Ranjana Prakash Desai</div>
          </div>
        </div>
      </section>
    </div>
  );
}
