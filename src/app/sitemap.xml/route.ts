import { getAllWork, fetchGraphQL } from '@/lib/api';
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
    url: '/blog',
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
  console.log('SITEMAP GENERATION STARTED');
  console.log('Current time:', new Date().toISOString());

  try {
    const sitemap: MetadataRoute.Sitemap = [];

    // Add static pages
    console.log('Adding static pages to sitemap...');
    staticPages.forEach((page) => {
      sitemap.push({
        url: `${SITE_URL}${page.url}`,
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority
      });
    });
    console.log(`Added ${staticPages.length} static pages`);

    // Fetch and add dynamic insights pages
    try {
      console.log('Attempting to fetch insights for sitemap...');

      // Use a simplified query specifically for sitemap to avoid complexity issues
      const simplifiedInsightsQuery = `
        query GetInsightsForSitemap($limit: Int!) {
          insightsCollection(limit: $limit, order: postDate_DESC) {
            items {
              slug
              postDate
              category
            }
          }
        }
      `;

      const response = await fetchGraphQL<{
        insightsCollection: { items: { slug: string; postDate: string; category?: string }[] };
      }>(simplifiedInsightsQuery, { limit: 1000 }, false, { next: { revalidate: 0 } });

      const insights = response?.insightsCollection?.items || [];

      console.log('Simplified insights response:', insights);
      console.log('Insights length:', insights.length);
      console.log('Items is array:', Array.isArray(insights));

      if (insights && Array.isArray(insights) && insights.length > 0) {
        console.log(`Found ${insights.length} insights to add to sitemap`);

        const slugifyCategory = (category?: string) =>
          (category ?? '')
            .toString()
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

        insights.forEach(
          (insight: { slug: string; postDate: string; category?: string }, index: number) => {
            console.log(`Processing insight ${index + 1}:`, {
              slug: insight?.slug,
              postDate: insight?.postDate,
              category: insight?.category
            });

            if (insight?.slug) {
              const categorySegment = slugifyCategory(insight.category);
              console.log(`Processing insight: ${insight.slug}, category: ${insight.category}, categorySegment: ${categorySegment}`);
              
              // Ensure we have a valid category segment, fallback to 'insights' if empty
              const finalCategorySegment = categorySegment || 'insights';
              
              sitemap.push({
                url: `${SITE_URL}/blog/${finalCategorySegment}/${insight.slug}`,
                lastModified: insight.postDate ? new Date(insight.postDate) : new Date(),
                changeFrequency: 'monthly',
                priority: 0.7
              });
              console.log(`Added insight to sitemap: /blog/${finalCategorySegment}/${insight.slug}`);
            } else {
              console.warn(`Insight ${index + 1} missing slug:`, insight);
            }
          }
        );

        console.log(`Successfully added ${insights.length} insights to sitemap`);
      } else {
        console.warn('No insights found or insights is not an array:', {
          insights,
          length: insights?.length,
          isArray: Array.isArray(insights)
        });
      }
    } catch (insightsError) {
      console.error('ERROR FETCHING INSIGHTS FOR SITEMAP:');
      console.error('Error details:', insightsError);
      console.error('Error message:', (insightsError as Error)?.message);
      console.error('Error stack:', (insightsError as Error)?.stack);
      // Continue without insights - fallback gracefully
    }

    // Fetch and add dynamic services (industries) pages
    try {
      const { fetchGraphQL } = await import('@/lib/api');
      const industriesData = await fetchGraphQL<{
        industriesCollection: { items: Array<{ slug: string }>; total: number };
      }>(
        `
        query GetIndustrySlugs($limit: Int!, $skip: Int!) {
          industriesCollection(limit: $limit, skip: $skip, order: name_ASC) {
            items { slug }
            total
          }
        }
      `,
        { limit: 1000, skip: 0 },
        false,
        { next: { revalidate: 0 } }
      );

      const industrySlugs = industriesData?.industriesCollection?.items ?? [];
      industrySlugs.forEach((item) => {
        if (item?.slug) {
          sitemap.push({
            url: `${SITE_URL}/services/${item.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8
          });
        }
      });
    } catch (servicesError) {
      console.error('Error fetching services (industries) for sitemap:', servicesError);
      // Continue without services - fallback gracefully
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
    console.log(`Generating XML sitemap with ${uniqueSitemap.length} total URLs`);

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

    console.log('SITEMAP GENERATION COMPLETED SUCCESSFULLY');
    console.log(`Final sitemap contains ${uniqueSitemap.length} URLs`);

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
