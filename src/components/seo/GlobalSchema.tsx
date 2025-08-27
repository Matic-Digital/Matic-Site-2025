"use client";
import { usePathname } from "next/navigation";

export function GlobalSchema() {
  const pathname = usePathname();
  // Normalize pathname: remove trailing slash except for root
  const normalizedPath = pathname ? (pathname.endsWith('/') && pathname !== '/' ? pathname.replace(/\/+$/, '') : pathname) : '';

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
      'https://www.linkedin.com/company/matic-digital',
    ],
    email: 'hello@maticdigital.com',
    telephone: '+1-720-762-3480',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3457 Ringsby Ct Unit 205',
      addressLocality: 'Denver',
      addressRegion: 'CO',
      postalCode: '80216',
      addressCountry: 'US',
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
        addressCountry: 'US',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 39.7711988, longitude: -104.9822587 },
    },
    areaServed: 'Worldwide',
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
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Market Strategy Sub-Services',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Customer Intelligence' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Competitive Benchmarking' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Buyer Journey Mapping' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Go-to-Market Planning' } },
              ],
            },
          },
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
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Brand & Creative Sub-Services',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Identity' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Systems' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Messaging' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social & Event Collateral' } },
              ],
            },
          },
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
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Web & App Sub-Services',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UX/UI Design' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Full-Stack Development' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Headless & Composable CMS' } },
              ],
            },
          },
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
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Next-Gen Growth Sub-Services',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Strategy' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tech Modernization' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Creative Testing & Validation' } },
              ],
            },
          },
        },
      ],
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
            member: ['Loomly', 'Soostone'],
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Healthcare & Life Sciences',
          item: {
            '@type': 'Organization',
            name: 'Healthcare & Life Sciences Industry Clients',
            member: ['Pluto Bio', 'Well', 'Hive Science'],
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Energy & Sustainability',
          item: {
            '@type': 'Organization',
            name: 'Energy & Sustainability Industry Clients',
            member: ['Nextracker'],
          },
        },
      ],
    },
  ] as const;

  const graph = {
    '@context': 'https://schema.org',
    '@graph': normalizedPath === '/services' ? [org, ...servicesNodes] : [org],
  } as const;

  return (
    <script
      id="ld-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
