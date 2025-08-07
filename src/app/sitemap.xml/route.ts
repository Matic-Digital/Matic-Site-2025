import { getAllInsights, getAllWork } from '@/lib/api';
import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.maticdigital.com';

// Static pages with their priorities and change frequencies
const staticPages = [
  {
    url: '',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0
  },
  {
    url: '/about',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  },
  {
    url: '/services',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9
  },
  {
    url: '/contact',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  },
  {
    url: '/insights',
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8
  },
  {
    url: '/work',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  },
  {
    url: '/terms',
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.3
  }
];

export async function GET(): Promise<Response> {
  try {
    const sitemap: MetadataRoute.Sitemap = [];

    // Add static pages
    staticPages.forEach((page) => {
      sitemap.push({
        url: `${SITE_URL}${page.url}`,
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority
      });
    });

    // Fetch and add dynamic insights pages
    try {
      const insights = await getAllInsights(1000); // Get all insights with high limit

      if (insights?.items && Array.isArray(insights.items)) {
        insights.items.forEach((insight) => {
          if (insight?.slug) {
            sitemap.push({
              url: `${SITE_URL}/insights/${insight.slug}`,
              lastModified: insight.postDate ? new Date(insight.postDate) : new Date(),
              changeFrequency: 'monthly',
              priority: 0.7
            });
          }
        });
      }
    } catch (insightsError) {
      console.error('Error fetching insights for sitemap:', insightsError);
      // Continue without insights - fallback gracefully
    }

    // Fetch and add dynamic work pages
    try {
      const workItems = await getAllWork();

      if (workItems && Array.isArray(workItems)) {
        workItems.forEach((work) => {
          if (work?.slug) {
            sitemap.push({
              url: `${SITE_URL}/work/${work.slug}`,
              lastModified: new Date(), // Work items don't have explicit dates
              changeFrequency: 'monthly',
              priority: 0.6
            });
          }
        });
      }
    } catch (workError) {
      console.error('Error fetching work items for sitemap:', workError);
      // Continue without work items - fallback gracefully
    }

    // Remove duplicates and filter out invalid URLs
    const uniqueSitemap = sitemap
      .filter(
        (item, index, self) =>
          item.url && // Filter out undefined/null URLs
          self.findIndex((t) => t.url === item.url) === index // Remove duplicates
      )
      .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0)); // Sort by priority

    // Generate XML sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueSitemap
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified instanceof Date ? item.lastModified.toISOString() : new Date(item.lastModified ?? Date.now()).toISOString()}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600' // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Fallback to static pages only if everything fails
    const fallbackSitemap = staticPages.map((page) => ({
      url: `${SITE_URL}${page.url}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority
    }));

    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${fallbackSitemap
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified.toISOString()}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    return new Response(fallbackXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=300' // Shorter cache for fallback
      }
    });
  }
}
