import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DA & Arrears Calculator for Central Govt Employees | GovPay TrueFunds',
  description:
    'Calculate Dearness Allowance (DA) hikes, AICPI-IW consumer price index projections, monthly difference, and total retroactive arrears calculation.',
  alternates: {
    canonical: 'https://govpay.truefunds.co.in/da-calculator',
  },
  openGraph: {
    title: 'Dearness Allowance (DA) & Arrears Calculator | GovPay TrueFunds',
    description:
      'Track current 53% DA, project next revision hikes based on AICPI-IW data, and calculate retroactive arrears payout.',
    url: 'https://govpay.truefunds.co.in/da-calculator',
  },
};

export default function DaCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
