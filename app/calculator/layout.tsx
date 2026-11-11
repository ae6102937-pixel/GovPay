import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '8th Pay Commission Salary Calculator (Projection) | GovPay TrueFunds',
  description:
    'Calculate your projected 8th Pay Commission salary, revised basic pay, HRA (X/Y/Z cities), DA, NPS/UPS deductions, and net in-hand monthly salary.',
  alternates: {
    canonical: 'https://govpay.truefunds.co.in/calculator',
  },
  openGraph: {
    title: '8th Pay Commission Salary Calculator (Projection) | GovPay TrueFunds',
    description:
      'Project your 8th Pay Commission salary at fitment factors you choose, with HRA by city class and in-hand pay. Current pay uses DA at 63%.',
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
