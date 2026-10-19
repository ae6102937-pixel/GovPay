import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unified Pension Scheme (UPS) vs NPS Calculator & Comparison | GovPay TrueFunds',
  description:
    'Compare Unified Pension Scheme (UPS) 50% guaranteed pension vs National Pension System (NPS) market returns, corpus, family pension, and lumpsum benefits.',
  alternates: {
    canonical: 'https://govpay.truefunds.co.in/ups-vs-nps',
  },
  openGraph: {
    title: 'UPS vs NPS Pension Scheme Calculator & Side-by-Side Comparison',
    description:
      'Detailed financial model comparing UPS guaranteed pension vs NPS market-linked returns for Central Government employees.',
    url: 'https://govpay.truefunds.co.in/ups-vs-nps',
  },
};

export default function UpsVsNpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
