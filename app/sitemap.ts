import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kvyash.com';
  
  const routes = [
    '',
    '/about',
    '/services',
    '/solutions',
    '/ai-automation',
    '/work',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/cookie-policy',
    '/disclaimer',
    '/submit-review',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
}
