'use client';

import { useState } from 'react';
import { Printer, Share2, Check, FileCheck } from 'lucide-react';

interface ShareAndPrintProps {
  title: string;
  summaryText?: string;
}

export default function ShareAndPrint({ title, summaryText }: ShareAndPrintProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-semibold hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-2xs group"
        title="Print formal statement or save as PDF"
      >
        <Printer className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
        <span>Print Statement / PDF</span>
      </button>

      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
        title="Copy share link with calculation parameters"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700">Copied Link!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Share</span>
          </>
        )}
      </button>

      <span className="hidden xl:inline-flex items-center gap-1 text-[11px] text-slate-600 font-medium bg-slate-100 px-2 py-1 rounded-md">
        <FileCheck className="w-3 h-3 text-emerald-600" />
        <span>A4 Format Ready</span>
      </span>
    </div>
  );
}
