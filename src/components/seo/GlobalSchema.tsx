'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Types for Work items returned from /api/work-schema
type WorkSchemaItem = {
  slug: string;
  clientName: string;
  briefDescription?: string;
  featuredImage?: string | null;
  homepageMedia?: string | null;
  logo?: string | null;
  categories?: string[];
};

// Types for Blog items returned from /api/blog-schema
type BlogSchemaItem = {
  slug: string;
  category?: string;
  title: string;
  postDate?: string;
  imageUrl?: string;
};

// Type guards for safe parsing
function isWorkSchemaItem(x: unknown): x is WorkSchemaItem {
  if (typeof x !== 'object' || x === null) return false;
  const obj = x as Record<string, unknown>;
  return typeof obj.slug === 'string' && typeof obj.clientName === 'string';
}

function isWorkSchemaResponse(x: unknown): x is { items: WorkSchemaItem[] } {
  if (typeof x !== 'object' || x === null) return false;
  const obj = x as Record<string, unknown>;
  const items = obj.items;
  if (!Array.isArray(items)) return false;
  return (items as unknown[]).every((it) => isWorkSchemaItem(it));
}

export function GlobalSchema() {
  const pathname = usePathname();
  // Normalize pathname: remove trailing slash except for root
  const normalizedPath = pathname
    ? pathname.endsWith('/') && pathname !== '/'
      ? pathname.replace(/\/+$/, '')
      : pathname
    : '';

  // Detect blog detail page: /blog/{category}/{slug}
  const isBlogDetailPage = (() => {
    if (!normalizedPath?.startsWith('/blog/')) return false;
    const parts = normalizedPath.split('/'); // ['', 'blog', 'category', 'slug']
    return parts.length === 4 && parts[2] && parts[3];
  })();

  // Dynamic Work data for /work schema
  const [workItems, setWorkItems] = useState<
    Array<{
      slug: string;
      clientName: string;
      briefDescription?: string;
      featuredImage?: string | null;
      homepageMedia?: string | null;
      logo?: string | null;
      categories?: string[];
    }>
  >([]);

  // Dynamic Blog data for /blog schema
  const [blogItems, setBlogItems] = useState<BlogSchemaItem[]>([]);

  useEffect(() => {
    if (normalizedPath === '/work') {
      // Fetch minimal payload from API route with safe parsing
      fetch('/api/work-schema')
        .then((res) => res.json() as Promise<unknown>)
        .then((data) => {
          if (isWorkSchemaResponse(data)) {
            setWorkItems(data.items);
          } else {
            setWorkItems([]);
          }
        })
        .catch(() => setWorkItems([]));
    }
  }, [normalizedPath]);

  useEffect(() => {
    if (normalizedPath === '/blog') {
      // Type guards for blog API response
      const isBlogItem = (x: unknown): x is BlogSchemaItem => {
        if (typeof x !== 'object' || x === null) return false;
        const o = x as Record<string, unknown>;
        if (typeof o.slug !== 'string' || typeof o.title !== 'string') return false;
        if (o.category !== undefined && typeof o.category !== 'string') return false;
        if (o.postDate !== undefined && typeof o.postDate !== 'string') return false;
        if (o.imageUrl !== undefined && typeof o.imageUrl !== 'string') return false;
        return true;
      };
      const isBlogResponse = (x: unknown): x is { items: BlogSchemaItem[] } => {
        if (typeof x !== 'object' || x === null) return false;
        const items = (x as Record<string, unknown>).items;
        return Array.isArray(items) && items.every(isBlogItem);
      };

      fetch('/api/blog-schema')
        .then((res) => res.json() as Promise<unknown>)
        .then((data) => {
          if (isBlogResponse(data)) {
            setBlogItems(data.items);
          } else {
            setBlogItems([]);
          }
        })
        .catch(() => setBlogItems([]));
    }
  }, [normalizedPath]);

  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.maticdigital.com/#organization',
    name: 'Matic Digital',
    legalName: 'Matic Digital',
    url: 'https://www.maticdigital.com/',
    description:
      'Matic is a business transformation agency, defining and launching pivotal brand and digital experiences that drive growth and solve complex challenges.',
    logo: { '@type': 'ImageObject', url: 'https://maticdigital.com/favicon.svg' },
    sameAs: [
      'https://www.facebook.com/maticdigital',
      'https://www.instagram.com/maticdigital',
      'https://www.linkedin.com/company/matic-digital'
    ],
    email: 'hello@maticdigital.com',
    telephone: '+1-720-762-3480',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3457 Ringsby Ct Unit 205',
      addressLocality: 'Denver',
      addressRegion: 'CO',
      postalCode: '80216',
      addressCountry: 'US'
    },
    location: {
      '@type': 'Place',
      name: 'Matic Digital',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3457 Ringsby Ct Unit 205',
        addressLocality: 'Denver',
        addressRegion: 'CO',
        postalCode: '80216',
        addressCountry: 'US'
      },
      geo: { '@type': 'GeoCoordinates', latitude: 39.7711988, longitude: -104.9822587 }
    },
    areaServed: 'Worldwide'
  } as const;

  // Services graph nodes (no Organization duplication)
  const servicesNodes = [
    {
      '@type': 'OfferCatalog',
      '@id': 'https://www.maticdigital.com/services#service-catalog',
      name: 'Matic Digital Services Catalog',
      description:
        'Full-stack digital strategy, design, and development services to drive business growth',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Market Strategy and Insight',
          description:
            'Uncover market opportunities, craft go-to-market strategies, and develop innovative products and services.',
          itemOffered: {
            '@type': 'Service',
            name: 'Market Strategy & Insight',
            serviceType: 'Strategy Consulting',
            provider: { '@id': org['@id'] },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Market Strategy Sub-Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'Customer Intelligence' }
                },
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'Competitive Benchmarking' }
                },
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'Buyer Journey Mapping' }
                },
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'Go-to-Market Planning' }
                }
              ]
            }
          }
        },
        {
          '@type': 'Offer',
          name: 'Brand Design and Creative',
          description:
            'Positioning that amplifies and forges lasting connections through identity, content, and experience design.',
          itemOffered: {
            '@type': 'Service',
            name: 'Brand & Creative Design',
            serviceType: 'Branding & Creative Services',
            provider: { '@id': org['@id'] },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Brand & Creative Sub-Services',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Identity' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Systems' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Messaging' } },
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'Social & Event Collateral' }
                }
              ]
            }
          }
        },
        {
          '@type': 'Offer',
          name: 'Web Design and Development',
          description:
            'Designed with data insight, built to engage, and optimized to scale as you do - built on the best platforms around.',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Design & Development',
            serviceType: 'Web Design & Engineering',
            provider: { '@id': org['@id'] },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Web & App Sub-Services',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UX/UI Design' } },
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'Full-Stack Development' }
                },
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'Headless & Composable CMS' }
                }
              ]
            }
          }
        },
        {
          '@type': 'Offer',
          name: 'Next-Gen Growth Solutions',
          description:
            'Leveraging generative AI, LLMs, and human insights to deliver actionable growth strategies for sustainable success.',
          itemOffered: {
            '@type': 'Service',
            name: 'Next-Gen Growth Solutions',
            serviceType: 'Innovation & Growth Strategy',
            provider: { '@id': org['@id'] },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Next-Gen Growth Sub-Services',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Strategy' } },
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'Tech Modernization' }
                },
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'Creative Testing & Validation' }
                }
              ]
            }
          }
        }
      ]
    },
    {
      '@type': 'ItemList',
      '@id': 'https://www.maticdigital.com/services#industry-clients',
      name: 'Matic Digital Industry Experience',
      description: 'Notable clients served across key industry verticals',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Marketing Technology (MarTech)',
          item: {
            '@type': 'Organization',
            name: 'MarTech & AdTech Industry Clients',
            member: ['Loomly', 'Soostone']
          }
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Healthcare & Life Sciences',
          item: {
            '@type': 'Organization',
            name: 'Healthcare & Life Sciences Industry Clients',
            member: ['Pluto Bio', 'Well', 'Hive Science']
          }
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Energy & Sustainability',
          item: {
            '@type': 'Organization',
            name: 'Energy & Sustainability Industry Clients',
            member: ['Nextracker']
          }
        }
      ]
    }
  ] as const;

  // Work graph nodes (built dynamically)
  const workNodes = (() => {
    if (normalizedPath !== '/work') return [] as const;
    const itemListElement = workItems.map((w) => {
      const url = `https://www.maticdigital.com/work/${w.slug}`;
      // Build CreativeWork with optional enrichments
      const creativeWork: Record<string, unknown> = {
        '@type': 'CreativeWork',
        '@id': url,
        name: w.clientName ?? 'Case Study',
        url
      };
      if (w.briefDescription) creativeWork.description = w.briefDescription;
      if (w.categories && w.categories.length > 0) creativeWork.genre = w.categories;
      creativeWork.creator = { '@id': org['@id'] };

      return {
        '@type': 'ListItem',
        item: creativeWork
      };
    });

    const itemListNode = {
      '@type': 'ItemList',
      '@id': 'https://www.maticdigital.com/work#portfolio-list',
      name: 'Matic Digital Portfolio',
      itemListElement
    } as const;

    const collectionPageNode = {
      '@type': 'CollectionPage',
      '@id': 'https://www.maticdigital.com/work#collection',
      url: 'https://www.maticdigital.com/work',
      name: 'Matic Digital Portfolio Collection',
      description:
        'Portfolio showcasing strategy, UX/UI design, web design, development, and branding case studies',
      mainEntity: itemListNode
    } as const;

    return [collectionPageNode, itemListNode] as const;
  })();

  // Blog graph nodes (built dynamically)
  const blogNodes = (() => {
    if (normalizedPath !== '/blog') return [] as const;
    if (!blogItems || blogItems.length === 0) return [] as const;
    const itemListElement = blogItems.map((p) => {
      const url = `https://www.maticdigital.com/blog/${(p.category ?? '')
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')}/${p.slug}`;

      const blogPosting: Record<string, unknown> = {
        '@type': 'BlogPosting',
        '@id': url,
        name: p.title,
        headline: p.title,
        url
      };
      if (p.postDate) blogPosting.datePublished = p.postDate;
      if (p.category) blogPosting.articleSection = p.category;
      if (p.imageUrl) blogPosting.image = { '@type': 'ImageObject', url: p.imageUrl };
      blogPosting.creator = { '@id': org['@id'] };

      return {
        '@type': 'ListItem',
        item: blogPosting
      };
    });

    const itemListNode = {
      '@type': 'ItemList',
      '@id': 'https://www.maticdigital.com/blog#post-list',
      name: 'Matic Digital Blog Posts',
      itemListElement
    } as const;

    const collectionPageNode = {
      '@type': 'Blog',
      '@id': 'https://www.maticdigital.com/blog#collection',
      url: 'https://www.maticdigital.com/blog',
      name: 'Matic Digital Blog',
      description:
        'Articles on design, technology, AI, branding, and business growth from the Matic team',
      mainEntity: itemListNode
    } as const;

    return [collectionPageNode, itemListNode] as const;
  })();

  const graph = {
    '@context': 'https://schema.org',
    '@graph':
      // Hide global schema entirely on individual blog posts,
      // so only the page-level BlogPosting JSON-LD renders
      isBlogDetailPage
        ? []
        : normalizedPath === '/work'
          ? [...workNodes] // Work landing: only CollectionPage + ItemList
          : normalizedPath === '/blog'
            ? [...blogNodes] // Blog landing: only CollectionPage + ItemList
            : normalizedPath === '/services'
              ? [org, ...servicesNodes]
              : [org]
  } as const;

  return graph['@graph'].length === 0 ? null : (
    <script
      id="ld-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
