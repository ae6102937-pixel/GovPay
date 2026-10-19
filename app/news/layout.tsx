import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '8th Pay Commission News, Timeline & Committee Updates | GovPay TrueFunds',
  description:
    'Track latest official government notifications, 8th CPC terms of reference, committee constitution status, expected timeline (May 2027), and JCM staff side demands.',
  alternates: {
    canonical: 'https://govpay.truefunds.co.in/news',
  },
  openGraph: {
    title: '8th Pay Commission Latest News & Committee Updates | GovPay TrueFunds',
    description:
      'Verified news, Gazette updates, timeline tracker, and staff council demands regarding the 8th Central Pay Commission.',
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
