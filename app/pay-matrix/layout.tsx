import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '8th Pay Commission Pay Matrix Table (Levels 1 to 18) | GovPay TrueFunds',
  description:
    'Complete comparison table between 7th CPC and projected 8th CPC pay matrix across all pay levels (Level 1 GP 1800 to Level 18 Cabinet Secretary).',
  alternates: {
    canonical: 'https://govpay.truefunds.co.in/pay-matrix',
  },
  openGraph: {
    title: '8th Pay Commission Pay Matrix Table (Levels 1 to 18) | GovPay TrueFunds',
    description:
      'Compare 7th CPC basic pay stages with projected 8th CPC revised basic pay across all 18 pay levels and stages.',
    url: 'https://govpay.truefunds.co.in/pay-matrix',
  },
};

export default function PayMatrixLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
