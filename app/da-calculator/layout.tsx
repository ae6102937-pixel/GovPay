import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DA & Arrears Calculator for Central Govt Employees | GovPay TrueFunds',
  description:
    'Work out the DA arrears due after a Dearness Allowance increase, and see the DA rate history from 2020 to the current 63% (from July 2026).',
  alternates: {
    canonical: 'https://govpay.truefunds.co.in/da-calculator',
  },
  openGraph: {
    title: 'Dearness Allowance (DA) & Arrears Calculator | GovPay TrueFunds',
    description:
      'Current DA is 63% from 1 July 2026. Calculate the monthly difference and total arrears after a DA increase.',
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
