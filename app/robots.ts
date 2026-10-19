import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'Googlebot-Image', 'BingPreview'],
        allow: ['/', '/favicon.ico', '/favicon.svg', '/og-image.png'],
      },
    ],
    sitemap: 'https://govpay.truefunds.co.in/sitemap.xml',
    host: 'https://govpay.truefunds.co.in',
  };
}
