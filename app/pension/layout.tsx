import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Central Govt Pension & Commutation Calculator (7th & 8th CPC) | GovPay TrueFunds',
  description:
    'Calculate qualifying service pension (50% basic), maximum 40% lump sum commutation, reduced monthly pension, restoration after 15 years, and DR relief.',
  alternates: {
    canonical: 'https://govpay.truefunds.co.in/pension',
  },
  openGraph: {
    title: 'Central Govt Pension & Commutation Calculator | GovPay TrueFunds',
    description:
      'Estimate your retirement pension, 40% commutation lump sum, monthly pension after commutation, and family pension under 7th and 8th CPC rules.',
    url: 'https://govpay.truefunds.co.in/pension',
  },
};

export default function PensionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
