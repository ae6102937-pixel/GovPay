import { AlertCircle, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { CHECKED_ON, CPC8, CURRENT_DA, SOURCES } from '@/lib/facts';

const linkClass = 'underline font-semibold hover:text-amber-700';

/**
 * Says which figures on the page follow official orders and which are projections, with sources.
 * Shown on every calculator and post page.
 */
export default function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="bg-amber-50 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold text-amber-950">Official figures and projections: </strong>
          <span>
            7th CPC pay and the current DA of {CURRENT_DA.rate}% follow official orders. Every 8th Pay Commission figure is a
            projection: the Commission&apos;s report is due by {CPC8.reportDueBy}, and the fitment factor will be decided by the
            Government after that. Last reviewed {CHECKED_ON}.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-r from-amber-50 via-amber-50/70 to-orange-50 border border-amber-200 rounded-xl p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        <div className="p-2 bg-amber-100 rounded-lg text-amber-800 shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-bold text-amber-950 text-sm sm:text-base">
              What is official here, and what is a projection
            </h2>
            <span className="text-[11px] font-medium bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded-full">
              Last reviewed {CHECKED_ON}
            </span>
          </div>

          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-amber-950 leading-relaxed">
            <li>
              <strong>Official:</strong> 7th CPC pay levels and entry pay, and Dearness Allowance at {CURRENT_DA.rate}% of basic pay
              from {CURRENT_DA.effectiveFrom} (
              <a href={CURRENT_DA.source.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Cabinet decision of {CURRENT_DA.approvedOn}
              </a>
              ).
            </li>
            <li>
              <strong>Projection:</strong> every 8th Pay Commission figure. We show results for fitment factors of 1.92, 2.15, 2.57
              and 2.86 because the final factor is not yet known. None of these is an official figure.
            </li>
          </ul>

          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            The <strong>8th Central Pay Commission</strong> was constituted on <strong>{CPC8.constituted}</strong>, chaired by{' '}
            <strong>{CPC8.chairperson}</strong> (
            <a href={SOURCES.cpc8Site.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
              8cpc.gov.in
            </a>
            ). Its Terms of Reference give it {CPC8.reportWithinMonths} months to report, which means by about{' '}
            <strong>{CPC8.reportDueBy}</strong> (
            <a href={SOURCES.torRelease.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
              PIB, {CPC8.torApproved}
            </a>
            ). Check official orders from your department before relying on any figure.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs text-amber-950">
            <div className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-md border border-amber-200/60">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>Report due by: <strong>{CPC8.reportDueBy}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-md border border-amber-200/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Current DA: <strong>{CURRENT_DA.rate}%</strong> from {CURRENT_DA.effectiveFrom}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-md border border-amber-200/60">
              <FileText className="w-3.5 h-3.5 text-blue-700" />
              <span>8th CPC figures: <strong>projections</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
