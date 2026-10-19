import { AlertCircle, Calendar, FileText, CheckCircle2 } from 'lucide-react';

export default function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="bg-amber-50 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold text-amber-950">Educational Purpose Notice: </strong>
          <span>
            This data shown is for educational purposes only and is not 100% correct. truefunds.co.in doesn&apos;t take any responsibility for this data.
            8th Pay Commission figures are estimates based on the Terms of Reference (ToR) approved Nov 3, 2025.
            The final fitment factor and minimum basic will be notified by the Union Cabinet post the Commission&apos;s report (expected May 2027). All scenarios are assumptions.
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
            <h4 className="font-bold text-amber-950 text-sm sm:text-base">
              Official Status & Projection Methodology Notice
            </h4>
            <span className="text-[11px] font-medium bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded-full">
              Transparent Model
            </span>
            <span className="text-[11px] font-semibold bg-amber-200/80 text-amber-950 px-2 py-0.5 rounded-full border border-amber-300">
              Educational Purpose Only
            </span>
          </div>

          <div className="p-2.5 bg-amber-100/80 rounded-lg border border-amber-300 text-xs text-amber-950 leading-relaxed">
            <strong className="font-bold text-amber-950">Important Notice: </strong>
            This data shown is for educational purposes only and is not 100% correct. truefunds.co.in doesn&apos;t take any responsibility for this data. Central government employees and pensioners should verify details with official Gazette circulars and DoPT notifications.
          </div>

          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            The <strong>8th Central Pay Commission</strong> was formally constituted on <strong>3 November 2025</strong> under the chairmanship of <strong>Justice Ranjana Prakash Desai</strong>. The Commission is currently conducting consultations with employee unions (JCM Staff Side) and ministries. Its formal report is <strong>expected around May 2027</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs text-amber-950">
            <div className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-md border border-amber-200/60">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>Report Target: <strong>May 2027</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-md border border-amber-200/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Scenarios: <strong>Modelled Assumptions</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/70 px-2.5 py-1.5 rounded-md border border-amber-200/60">
              <FileText className="w-3.5 h-3.5 text-blue-700" />
              <span>Reference: <strong>8cpc.gov.in / DoPT</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
