import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PUBLISHER } from '@/lib/facts';

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

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
    '8th Pay Commission salary projections, the 7th CPC pay matrix for levels 1–18, in-hand pay at the current DA, UPS vs NPS, pension and DA arrears calculators.',
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
  authors: [{ name: PUBLISHER.team, url: `${PUBLISHER.mainSite}/about` }],
  creator: PUBLISHER.brand,
  publisher: PUBLISHER.name,
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
      '8th Pay Commission salary projections by fitment factor, the 7th CPC pay matrix, UPS vs NPS, and pension calculators.',
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
  // Emit verification tags only when a real token is configured
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { 'msvalidate.01': bingVerification } } : {}),
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
      'Pay, pension and allowance calculators for central government employees, with 8th Pay Commission projections. Part of TrueFunds.',
    inLanguage: 'en-IN',
    publisher: { '@type': 'Organization', name: PUBLISHER.name },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: PUBLISHER.brand,
    url: PUBLISHER.mainSite,
    logo: 'https://govpay.truefunds.co.in/android-chrome-512x512.png',
    email: PUBLISHER.email,
    parentOrganization: { '@type': 'Organization', name: PUBLISHER.name },
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'GovPay TrueFunds Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    url: 'https://govpay.truefunds.co.in',
    description:
      '8th Pay Commission salary projections, pension estimates, UPS vs NPS comparison and a DA arrears calculator for central government employees.',
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
