import { MetadataRoute } from 'next';
import { POPULAR_POSTS } from '@/lib/pay-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://govpay.truefunds.co.in';

  const staticRoutes = [
    '',
    '/calculator',
    '/pay-matrix',
    '/ups-vs-nps',
    '/pension',
    '/da-calculator',
    '/gratuity-leave',
    '/salary-of',
    '/news',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const postRoutes = POPULAR_POSTS.map((post) => ({
    url: `${baseUrl}/salary-of/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
