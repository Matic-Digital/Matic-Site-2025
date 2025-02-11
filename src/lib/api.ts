/**
 * Contentful API Integration Module
 * Provides functions for fetching and managing insights from Contentful CMS
 */

import {
  type ContentfulResponse,
  type Insight,
  type InsightsResponse,
  type Socials,
  type SocialsResponse,
  type Service,
  type ServicesResponse,
  type ServiceComponent,
  type ServiceComponentResponse,
  type WorkContent,
  type WorkContentResponse,
  type Work,
  type WorkResponse,
  type Footer,
} from '@/types/contentful';

/**
 * Error classes for better error handling
 */
class NetworkError extends Error {
  constructor(
    message: string,
    public response: Response
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

class GraphQLError extends Error {
  constructor(
    message: string,
    public errors: Array<{ message: string }>
  ) {
    super(message);
    this.name = 'GraphQLError';
  }
}

class ContentfulError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContentfulError';
  }
}

/**
 * GraphQL fragment defining the structure of insight data to fetch
 */
const INSIGHT_GRAPHQL_FIELDS = `
  sys {
    id
  }
  category
  title
  slug
  postDate
  theme
  insightBannerImage {
    url
  }
  insightContent {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
          width
          height
        }
      }
    }
  }
  featured
  socialsCollection {
    items {
      sys {
        id
      }
      name
      logo {
        url
      }
      url
    }
  }
`;

/**
 * GraphQL fragment defining the structure of work data to fetch
 */
const WORK_GRAPHQL_FIELDS = `
  sys {
    id
  }
  clientName
  slug
  briefDescription
  sector
  sectionColor
  sectionSecondaryColor
  sectionAccentColor
  content {
    sys {
      id
    }
  }
  featuredImage {
    url
    width
    height
    description
  }
  logo {
    url
    width
    height
    description
  }
  categoriesCollection {
    items {
      sys {
        id
      }
      name
      slug
    }
  }
`;

/**
 * GraphQL fragment defining the structure of service data to fetch
 */
const SERVICE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  slug
  bannerIcon {
    url
  }
  bannerCopy
  bannerLinkCopy
`;

/**
 * GraphQL fragment defining the structure of service component data to fetch
 */
const SERVICE_COMPONENT_GRAPHQL_FIELDS = `
  sys {
    id
  }
  header
  servicesCollection {
    items {
      ${SERVICE_GRAPHQL_FIELDS}
    }
  }
`;

/**
 * GraphQL fragment defining the structure of work content data to fetch
 */
const WORK_CONTENT_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  contentCollection {
    items {
      __typename
      ... on Entry {
        sys {
          id
        }
      }
      ... on WorkCopy {
        eyebrowHeader
        header
        copy
      }
      ... on FigmaPrototype {
        name
        embedLink
      }
      ... on WorkTactics {
        name
        tactics
        tacticsImage {
          url
        }
      }
      ... on ImageGridBox {
        name
        imagesCollection {
          items {
            url
            width
            height
            description
          }
        }
      }
      ... on WorkScrollingSection {
        name
        imagesCollection {
          items {
            url
            width
            height
            description
          }
        }
      }
      ... on VideoSection {
        name
        video {
          url
          contentType
        }
        backupImage {
          url
        }
      }
      ... on SplitImageSection {
        name
        copy
        contentCollection {
          items {
            url
            description
            width
            height
          }
        }
      }
      ... on FramedAsset {
        name
        asset {
          url
          description
          width
          height
        }
      }
      ... on BannerImage {
        name
        content {
          url
          description
          width
          height
        }
      }
      ... on WorkCarousel {
        name
        contentCollection {
          items {
            url
            contentType
          }
        }
      }
    }
  }
`;

/**
 * GraphQL fragment defining the structure of footer data to fetch
 */
const FOOTER_GRAPHQL_FIELDS = `
  sys {
    id
  }
  tagline
  taglineBackground {
    url
  }
  paragraph
  socialsCollection {
    items {
      sys {
        id
      }
      name
      logo {
        url
      }
      url
    }
  }
  address
  phone
  email
`;

/**
 * Executes GraphQL queries against Contentful's API with caching
 */
async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  preview = false,
  cacheConfig?: { next: { revalidate: number } }
): Promise<ContentfulResponse<T>> {
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = preview
    ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  const endpoint = preview
    ? `https://graphql.contentful.com/content/v1/spaces/${space}/environments/preview`
    : `https://graphql.contentful.com/content/v1/spaces/${space}/environments/master`;

  if (!space || !accessToken) {
    console.error('Missing environment variables:', {
      space: !!space,
      accessToken: !!accessToken,
      spaceValue: space,
      accessTokenValue: accessToken?.slice(0, 5) + '...',
    });
    throw new ContentfulError('Contentful environment variables are not set');
  }

  try {
    console.log('Fetching from Contentful:', {
      endpoint,
      hasAccessToken: !!accessToken,
      preview,
      query,
      variables,
    });

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ query, variables }),
      next: cacheConfig?.next,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Contentful API error:', {
        status: res.status,
        statusText: res.statusText,
        response: errorText,
        headers: Object.fromEntries(res.headers.entries()),
      });
      throw new NetworkError(`Network response was not ok: ${res.status} ${res.statusText} - ${errorText}`, res);
    }

    const json = (await res.json()) as ContentfulResponse<T>;

    if (json.errors) {
      console.error('GraphQL errors:', json.errors);
      throw new GraphQLError('GraphQL response contains errors', json.errors);
    }

    return json;
  } catch (error) {
    if (error instanceof NetworkError || error instanceof GraphQLError) {
      throw error;
    }
    console.error('Unexpected error:', error);
    throw new ContentfulError('Failed to fetch from Contentful');
  }
}

export const INSIGHTS_PER_PAGE = 6;

interface PreviewOptions {
  preview?: boolean;
  previewData?: unknown;
}

interface ContentfulRestResponse {
  items: Array<{
    fields: {
      timeline?: string;
      [key: string]: unknown;
    };
  }>;
}

/**
 * Fetches a paginated list of insights
 */
export async function getAllInsights(
  limit = INSIGHTS_PER_PAGE,
  options: PreviewOptions = {},
  skip = 0
): Promise<InsightsResponse> {
  const { preview = false } = options;

  const query = `
    query GetAllInsights($limit: Int!, $skip: Int!) {
      insightsCollection(
        order: [postDate_DESC]
        limit: $limit
        skip: $skip
        preview: ${preview}
      ) {
        total
        items {
          ${INSIGHT_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL<Insight>(
    query,
    { limit, skip },
    preview,
    { next: { revalidate: 60 } }
  );

  const collection = response.data?.insightsCollection;
  if (!collection) {
    throw new ContentfulError('Failed to fetch insights collection');
  }

  const { total, items } = collection;
  const totalPages = Math.ceil(total / limit);
  const hasMore = skip + items.length < total;

  return {
    items,
    total,
    hasMore,
    totalPages,
  };
}

/**
 * Fetches a single insight by its slug
 */
export async function getInsight(
  slug: string,
  options: PreviewOptions = {}
): Promise<Insight | null> {
  const { preview = false } = options;

  const query = `
    query GetInsight($slug: String!) {
      insightsCollection(
        where: { slug: $slug }
        limit: 1
        preview: ${preview}
      ) {
        items {
          ${INSIGHT_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL<Insight>(
    query,
    { slug },
    preview,
    { next: { revalidate: 60 } }
  );

  return response.data?.insightsCollection?.items[0] ?? null;
}

/**
 * Fetches the most recent featured insight
 */
export async function getFeaturedInsight(
  options: PreviewOptions = {}
): Promise<Insight | null> {
  const { preview = false } = options;

  const query = `
    query GetFeaturedInsight {
      insightsCollection(
        where: { featured: true }
        order: [postDate_DESC]
        limit: 1
        preview: ${preview}
      ) {
        items {
          ${INSIGHT_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL<Insight>(
    query,
    undefined,
    preview,
    { next: { revalidate: 60 } }
  );

  return response.data?.insightsCollection?.items[0] ?? null;
}

/**
 * Fetches all work items
 */
export async function getAllWork(preview = false): Promise<WorkResponse> {
  const query = `query {
    workCollection(preview: ${preview}, order: timeline_DESC) {
      items {
        ${WORK_GRAPHQL_FIELDS}
      }
    }
  }`;

  const response = await fetchGraphQL<Work>(query, {}, preview);
  const collection = response.data?.workCollection;

  if (!collection) {
    throw new ContentfulError('Failed to fetch work items');
  }

  return {
    items: collection.items,
    total: collection.total,
  };
}

/**
 * Fetches a single work item by slug
 */
export async function getWork(
  slug: string,
  options: PreviewOptions = {}
): Promise<Work | null> {
  const { preview = false } = options;

  const query = `
    query GetWork($slug: String!) {
      workCollection(
        where: { slug: $slug }
        limit: 1
        preview: ${preview}
      ) {
        items {
          ${WORK_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL<Work>(
    query,
    { slug },
    preview,
    { next: { revalidate: 60 } }
  );

  return response.data?.workCollection?.items[0] ?? null;
}

/**
 * Fetches a single service by ID
 */
export async function getService(
  id: string,
  options: PreviewOptions = {}
): Promise<Service | null> {
  const { preview = false } = options;

  const query = `
    query GetService($id: String!) {
      service(id: $id, preview: ${preview}) {
        ${SERVICE_GRAPHQL_FIELDS}
      }
    }
  `;

  const response = await fetchGraphQL<Service>(
    query,
    { id },
    preview,
    { next: { revalidate: 60 } }
  );

  return response.data?.service ?? null;
}

/**
 * Fetches all services
 */
export async function getAllServices(options: PreviewOptions = {}): Promise<ServicesResponse> {
  const { preview = false } = options;

  const query = `
    query GetAllServices {
      servicesCollection(preview: ${preview}) {
        total
        items {
          ${SERVICE_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL<Service>(
    query,
    undefined,
    preview,
    { next: { revalidate: 60 } }
  );

  const collection = response.data?.servicesCollection;
  if (!collection) {
    throw new ContentfulError('Failed to fetch services collection');
  }

  return collection;
}

/**
 * Fetches a single service component by ID
 */
export async function getServiceComponent(
  id: string,
  options: PreviewOptions = {}
): Promise<ServiceComponent | null> {
  const { preview = false } = options;

  const query = `
    query GetServiceComponent($id: String!) {
      serviceComponent(id: $id, preview: ${preview}) {
        ${SERVICE_COMPONENT_GRAPHQL_FIELDS}
      }
    }
  `;

  const response = await fetchGraphQL<ServiceComponent>(
    query,
    { id },
    preview,
    { next: { revalidate: 60 } }
  );

  return response.data?.serviceComponent ?? null;
}

/**
 * Fetches all service components
 */
export async function getAllServiceComponents(
  options: PreviewOptions = {}
): Promise<ServiceComponentResponse> {
  const { preview = false } = options;

  const query = `
    query GetAllServiceComponents {
      serviceComponentCollection(preview: ${preview}) {
        total
        items {
          ${SERVICE_COMPONENT_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL<ServiceComponent>(
    query,
    undefined,
    preview,
    { next: { revalidate: 60 } }
  );

  const collection = response.data?.serviceComponentCollection;
  if (!collection) {
    throw new ContentfulError('Failed to fetch service components collection');
  }

  return collection;
}

/**
 * Fetches a single work content by ID
 */
export async function getWorkContent(
  id: string | undefined,
  options: PreviewOptions = {}
): Promise<WorkContent | null> {
  if (!id) return null;

  const { preview = false } = options;

  const query = `
    query GetWorkContent($id: String!) {
      workContent(id: $id, preview: ${preview}) {
        ${WORK_CONTENT_GRAPHQL_FIELDS}
      }
    }
  `;

  const response = await fetchGraphQL<WorkContent>(
    query,
    { id },
    preview,
    { next: { revalidate: 60 } }
  );

  return response.data?.workContent ?? null;
}

/**
 * Fetches all work content items
 */
export async function getAllWorkContent(
  options: PreviewOptions = {}
): Promise<WorkContentResponse> {
  const { preview = false } = options;

  const query = `
    query GetAllWorkContent {
      workContentCollection(preview: ${preview}) {
        total
        items {
          ${WORK_CONTENT_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL<WorkContent>(
    query,
    undefined,
    preview,
    { next: { revalidate: 60 } }
  );

  const collection = response.data?.workContentCollection;
  if (!collection) {
    throw new ContentfulError('Failed to fetch work content collection');
  }

  return collection;
}

/**
 * Fetches the site footer
 */
export async function getFooter(options: PreviewOptions = {}): Promise<Footer | null> {
  const { preview = false } = options;

  const query = `
    query GetFooter {
      footerCollection(limit: 1, preview: ${preview}) {
        items {
          ${FOOTER_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL<Footer>(
    query,
    undefined,
    preview,
    { next: { revalidate: 60 } }
  );

  return response.data?.footerCollection?.items[0] ?? null;
}
