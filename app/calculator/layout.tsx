import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '8th Pay Commission Salary Calculator 2026-2027 | GovPay TrueFunds',
  description:
    'Calculate your projected 8th Pay Commission salary, revised basic pay, HRA (X/Y/Z cities), DA, NPS/UPS deductions, and net in-hand monthly salary.',
  alternates: {
    canonical: 'https://govpay.truefunds.co.in/calculator',
  },
  openGraph: {
    title: '8th Pay Commission Salary Calculator 2026-2027 | GovPay TrueFunds',
    description:
      'Interactive 8th Pay Commission salary estimator with custom fitment factors (1.92 to 2.86), city tier HRA, and in-hand salary calculations.',
    url: 'https://govpay.truefunds.co.in/calculator',
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
