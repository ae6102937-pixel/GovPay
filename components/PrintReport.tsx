import React from 'react';
import { RupeeIcon } from './Rupee';

export interface PrintReportRow {
  label: string;
  sublabel?: string;
  col1?: React.ReactNode;
  col2?: React.ReactNode;
  col3?: React.ReactNode;
  isTotal?: boolean;
  isHeader?: boolean;
}

export interface PrintReportSection {
  title: string;
  rows: PrintReportRow[];
}

export interface PrintReportProps {
  title: string;
  subtitle?: string;
  referenceNumber?: string;
  metadata: Array<{ label: string; value: React.ReactNode }>;
  colHeaders?: [string, string, string?];
  sections: PrintReportSection[];
  notes?: string[];
}

function renderPrintValue(val: React.ReactNode): React.ReactNode {
  if (typeof val === 'string' && val.includes('₹')) {
    const parts = val.split('₹');
    return (
      <span className="inline-flex items-center gap-[0.1em]">
        {parts.map((part, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <RupeeIcon className="inline-block w-[0.8em] h-[0.8em] shrink-0" />}
            <span>{part}</span>
          </React.Fragment>
        ))}
      </span>
    );
  }
  return val;
}

export default function PrintReport({
  title,
  subtitle = 'Central Government Pay & Allowance Assessment Report',
  referenceNumber,
  metadata,
  colHeaders = ['Pay Component / Description', '7th CPC (Current)', '8th CPC (Projected)'],
  sections,
  notes = [
    'Calculations are based on 7th CPC baseline rates and officially approved 8th CPC Terms of Reference (ToR).',
    'Fitment factor and pay matrix figures represent modelled projections until the Union Cabinet notification.',
    'HRA is calculated based on Department of Expenditure revisions following DA crossing the 50% threshold.',
  ],
}: PrintReportProps) {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const refNo = referenceNumber || `GP-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="print-only font-serif text-slate-900 bg-white p-2">
      {/* Official Document Header */}
      <div className="print-header flex items-start justify-between border-b-2 border-slate-900 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest bg-slate-900 text-white px-2 py-0.5">
              TRUEFUNDS GOVPAY
            </span>
            <span className="text-xs text-slate-600">govpay.truefunds.co.in</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 mt-1 uppercase tracking-tight">
            {title}
          </h1>
          <p className="text-xs text-slate-600">{subtitle}</p>
        </div>

        <div className="text-right text-xs text-slate-600 space-y-0.5">
          <div>
            <span className="font-semibold">Ref No: </span>
            <span className="font-mono">{refNo}</span>
          </div>
          <div>
            <span className="font-semibold">Generated: </span>
            <span>{currentDate}</span>
          </div>
          <div className="text-[10px] text-slate-500">Official Planning Statement</div>
        </div>
      </div>

      {/* Employee / Parameter Metadata Card */}
      <div className="border border-slate-400 bg-slate-50/50 p-3 mb-4 rounded-xs text-xs avoid-page-break">
        <div className="grid grid-cols-3 gap-3">
          {metadata.map((item, idx) => (
            <div key={idx}>
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                {item.label}
              </div>
              <div className="font-bold text-slate-900 mt-0.5">{renderPrintValue(item.value)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Structured Table */}
      <div className="border border-slate-400 mb-4 avoid-page-break">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-200 text-slate-900 font-bold border-b border-slate-400">
              <th className="py-2 px-3 border-r border-slate-300">{colHeaders[0]}</th>
              <th className="py-2 px-3 text-right border-r border-slate-300">{colHeaders[1]}</th>
              {colHeaders[2] && (
                <th className="py-2 px-3 text-right border-r border-slate-300">{colHeaders[2]}</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {sections.map((section, sIdx) => (
              <React.Fragment key={sIdx}>
                {/* Section Header */}
                <tr className="bg-slate-100 font-bold text-slate-800 border-t border-b border-slate-400">
                  <td colSpan={colHeaders[2] ? 3 : 2} className="py-1.5 px-3 uppercase tracking-wider text-[11px]">
                    {section.title}
                  </td>
                </tr>

                {/* Rows */}
                {section.rows.map((row, rIdx) => {
                  if (row.isHeader) {
                    return (
                      <tr key={rIdx} className="bg-slate-50 font-semibold text-slate-800">
                        <td colSpan={colHeaders[2] ? 3 : 2} className="py-1 px-3">
                          {row.label}
                        </td>
                      </tr>
                    );
                  }

                  const rowClasses = row.isTotal
                    ? 'font-bold bg-slate-100 text-slate-900 border-t-2 border-slate-400'
                    : 'text-slate-800';

                  return (
                    <tr key={rIdx} className={rowClasses}>
                      <td className="py-1.5 px-3 border-r border-slate-300">
                        <div className="font-medium">{row.label}</div>
                        {row.sublabel && (
                          <div className="text-[10px] text-slate-500">{renderPrintValue(row.sublabel)}</div>
                        )}
                      </td>
                      <td className="py-1.5 px-3 text-right border-r border-slate-300 font-medium">
                        {renderPrintValue(row.col1)}
                      </td>
                      {colHeaders[2] && (
                        <td className="py-1.5 px-3 text-right border-r border-slate-300 font-semibold">
                          {renderPrintValue(row.col2)}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Regulatory & Methodology Notes */}
      <div className="border-t border-slate-300 pt-3 mb-4 text-[10px] text-slate-600 space-y-1 avoid-page-break">
        <div className="font-bold uppercase tracking-wider text-slate-700">Notes & Regulatory Basis:</div>
        <ul className="list-disc pl-4 space-y-0.5">
          {notes.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </div>

      {/* Official Authentication Block */}
      <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-300 text-xs text-slate-600 avoid-page-break">
        <div>
          <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
            Statement Verification & Disclaimer
          </div>
          <div className="text-[9px] text-slate-500 mt-1 leading-snug">
            Generated via GovPay TrueFunds Research Engine. <strong>Notice:</strong> This data shown is for educational purpose only and is not 100% correct. truefunds.co.in doesn&apos;t take any responsibility for this data. Subject to official Ministry of Finance circulars.
          </div>
        </div>

        <div className="text-right">
          <div className="inline-block border-t border-slate-400 pt-1 px-8 text-center">
            <div className="text-[11px] font-semibold text-slate-800">Prepared / Verified By</div>
            <div className="text-[9px] text-slate-500">(Signature / Office Seal)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
