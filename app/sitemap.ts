import { MetadataRoute } from 'next';
import { POPULAR_POSTS } from '@/lib/pay-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://govpay.truefunds.co.in';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}` },
    { url: `${baseUrl}/calculator` },
    { url: `${baseUrl}/pay-matrix` },
    { url: `${baseUrl}/ups-vs-nps` },
    { url: `${baseUrl}/pension` },
    { url: `${baseUrl}/da-calculator` },
    { url: `${baseUrl}/gratuity-leave` },
    { url: `${baseUrl}/salary-of` },
    { url: `${baseUrl}/news` },
  ];

  const postRoutes: MetadataRoute.Sitemap = POPULAR_POSTS.map((post) => ({
    url: `${baseUrl}/salary-of/${post.slug}`,
  }));

  return [...staticRoutes, ...postRoutes];
}
