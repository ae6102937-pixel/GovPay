import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'GovPay TrueFunds - 8th Pay Commission & Central Govt Salary Calculator',
  description:
    'Comprehensive 8th Pay Commission salary calculator, central government pay matrix levels 1-18, in-hand salary breakdown, UPS vs NPS, pension, and DA calculators.',
  keywords: [
    '8th pay commission salary calculator',
    '8th cpc pay matrix',
    'fitment factor calculator',
    'level 7 salary after 8th pay commission',
    'ups vs nps calculator',
    'central government salary calculator',
    'da arrears calculator',
    'pension commutation calculator 7th cpc 8th cpc',
    'govpay truefunds',
  ],
  authors: [{ name: 'TrueFunds GovPay Team' }],
  metadataBase: new URL('https://govpay.truefunds.co.in'),
  alternates: {
    canonical: 'https://govpay.truefunds.co.in',
  },
  openGraph: {
    title: 'GovPay TrueFunds - 8th Pay Commission & Central Govt Salary Calculator',
    description:
      'Explore 8th Pay Commission projected salary by level (1 to 18), fitment factor scenarios, in-hand pay, UPS vs NPS, and pension calculators.',
    url: 'https://govpay.truefunds.co.in',
    siteName: 'GovPay TrueFunds',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GovPay TrueFunds - 8th Pay Commission & Central Govt Salary Calculator',
    description:
      'Accurate in-hand salary projections, pay matrix levels 1-18, fitment factor scenarios, UPS vs NPS, and pension calculators.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GovPay TrueFunds',
    url: 'https://govpay.truefunds.co.in',
    description:
      'Central government pay, allowance, and pension research portal providing calculators for the 8th Pay Commission, 7th CPC pay matrix, UPS vs NPS, and DA.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://govpay.truefunds.co.in/calculator?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
