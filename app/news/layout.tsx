import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '8th Pay Commission News, Timeline & Committee Updates | GovPay TrueFunds',
  description:
    'Dated 8th Pay Commission and DA decisions, each linked to its source: the Terms of Reference, the Commission’s constitution, its May 2027 deadline and DA changes.',
  alternates: {
    canonical: 'https://govpay.truefunds.co.in/news',
  },
  openGraph: {
    title: '8th Pay Commission Latest News & Committee Updates | GovPay TrueFunds',
    description:
      '8th Pay Commission and DA decisions with dates and sources. Media reports are labelled as such.',
    url: 'https://govpay.truefunds.co.in/news',
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
