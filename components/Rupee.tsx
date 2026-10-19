import React from 'react';

export function RupeeIcon({ className = 'inline-block w-[0.8em] h-[0.8em] self-center -mt-[0.05em]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 3h12" />
      <path d="M6 8h12" />
      <path d="M6 13l8.5 8" />
      <path d="M6 13h3a4 4 0 0 0 0-8" />
    </svg>
  );
}

interface FormatINRProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  fractionDigits?: number;
}

export function FormatINR({
  value,
  prefix = '',
  suffix = '',
  className = '',
  fractionDigits = 0,
}: FormatINRProps) {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const formatted = absValue.toLocaleString('en-IN', {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  });

  const sign = isNegative ? '-' : (prefix.startsWith('+') ? '+' : '');

  return (
    <span className={`inline-flex items-center gap-[0.1em] font-inherit ${className}`}>
      {sign}
      <RupeeIcon />
      <span>{formatted}</span>
      {suffix && <span className="ml-[0.1em]">{suffix}</span>}
    </span>
  );
}

export default FormatINR;
