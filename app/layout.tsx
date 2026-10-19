import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e40af' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1329' },
  ],
};

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
  authors: [{ name: 'TrueFunds GovPay Team', url: 'https://govpay.truefunds.co.in' }],
  creator: 'TrueFunds',
  publisher: 'TrueFunds India',
  applicationName: 'GovPay TrueFunds',
  generator: 'Next.js',
  metadataBase: new URL('https://govpay.truefunds.co.in'),
  alternates: {
    canonical: 'https://govpay.truefunds.co.in',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
        color: '#1e40af',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'GovPay TrueFunds - 8th Pay Commission & Central Govt Salary Calculator',
    description:
      'Explore 8th Pay Commission projected salary by level (1 to 18), fitment factor scenarios, in-hand pay, UPS vs NPS, and pension calculators.',
    url: 'https://govpay.truefunds.co.in',
    siteName: 'GovPay TrueFunds',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GovPay TrueFunds - 8th Pay Commission & Central Government Salary Calculator',
        type: 'image/png',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GovPay TrueFunds - 8th Pay Commission & Central Govt Salary Calculator',
    description:
      'Accurate in-hand salary projections, pay matrix levels 1-18, fitment factor scenarios, UPS vs NPS, and pension calculators.',
    site: '@TrueFundsIndia',
    creator: '@TrueFundsIndia',
    images: ['https://govpay.truefunds.co.in/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'truefunds-govpay-google-verification',
    yandex: 'truefunds-govpay-yandex-verification',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || 'truefunds-govpay-bing-verification',
    },
  },
  category: 'finance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GovPay TrueFunds',
    alternateName: 'GovPay Central Govt Salary Portal',
    url: 'https://govpay.truefunds.co.in',
    description:
      'Central government pay, allowance, and pension research portal providing calculators for the 8th Pay Commission, 7th CPC pay matrix, UPS vs NPS, and DA.',
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://govpay.truefunds.co.in/calculator?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TrueFunds',
    url: 'https://govpay.truefunds.co.in',
    logo: 'https://govpay.truefunds.co.in/android-chrome-512x512.png',
    sameAs: ['https://truefunds.co.in'],
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'GovPay TrueFunds Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    url: 'https://govpay.truefunds.co.in',
    description:
      'Interactive 8th Pay Commission salary calculator, pension estimation, UPS vs NPS comparison, and DA arrears tool for Central Government employees.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Favicons and App Icons for cross-browser, Bing, and Google search bar compliance */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="msapplication-TileImage" content="/android-chrome-192x192.png" />
        <meta name="msapplication-config" content="none" />

        {/* Structured Data (Schema.org JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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
