/**
 * Contentful API Integration Module
 * Provides functions for fetching and managing insights from Contentful CMS
 */

import { type ContentfulResponse, type Insight, type InsightsResponse, type Client, type ClientsResponse, type Partner, type PartnersResponse } from '@/types';

// Environment variables for API configuration
const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_PREVIEW_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN;

// Error classes for better error handling
class NetworkError extends Error {
  constructor(message: string, public response: Response) {
    super(message);
    this.name = 'NetworkError';
  }
}

class GraphQLError extends Error {
  constructor(message: string, public errors: Array<{ message: string }>) {
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
        }
      }
    }
  }
`;

/**
 * GraphQL fragment defining the structure of client data to fetch
 */
const CLIENT_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  clientLogo {
    url
  }
`;

/**
 * GraphQL fragment defining the structure of partner data to fetch
 */
const PARTNER_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  logo {
    url
  }
`;

/**
 * Executes GraphQL queries against Contentful's API with caching
 */
async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  preview = false,
  cacheConfig?: { next: { revalidate: number } },
): Promise<ContentfulResponse<T>> {
  try {
    console.log('Fetching from Contentful with:', {
      spaceId: CONTENTFUL_SPACE_ID,
      preview,
      query,
      variables
    });

    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/master`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            preview
              ? CONTENTFUL_PREVIEW_ACCESS_TOKEN
              : CONTENTFUL_ACCESS_TOKEN
          }`,
        },
        body: JSON.stringify({ query, variables }),
        ...cacheConfig,
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error('Network error response:', text);
      throw new NetworkError(`Network error: ${res.statusText}`, res);
    }

    const json = await res.json() as { 
      data?: unknown; 
      errors?: Array<{ message: string }> 
    };
    console.log('Contentful response:', json);

    if (json.errors) {
      console.error('GraphQL errors:', json.errors);
      throw new GraphQLError(
        `GraphQL Error: ${json.errors.map(e => e.message).join(', ')}`,
        json.errors
      );
    }

    return json as ContentfulResponse<T>;
  } catch (error) {
    console.error('Contentful API error:', error);
    if (error instanceof Error) {
      throw new ContentfulError(`Contentful API Error: ${error.message}`);
    }
    throw error;
  }
}

export const INSIGHTS_PER_PAGE = 6;

interface PreviewOptions {
  preview?: boolean;
  previewData?: unknown;
}

/**
 * Fetches a paginated list of insights
 */
export async function getAllInsights(
  limit = INSIGHTS_PER_PAGE,
  options: PreviewOptions = {},
  skip = 0,
): Promise<InsightsResponse> {
  try {
    const preview = options.preview ?? false;

    const response = await fetchGraphQL<Insight>(
      `query GetInsights($limit: Int!, $skip: Int!) {
        insightsCollection(
          limit: $limit
          skip: $skip
          order: [postDate_DESC]
          preview: ${preview}
        ) {
          total
          items {
            ${INSIGHT_GRAPHQL_FIELDS}
          }
        }
      }`,
      { limit, skip }
    );

    if (!response.data?.insightsCollection) {
      throw new Error('No insights collection found');
    }

    return {
      items: response.data.insightsCollection.items,
      total: response.data.insightsCollection.total,
      hasMore: skip + limit < response.data.insightsCollection.total,
      totalPages: Math.ceil(response.data.insightsCollection.total / limit),
    };
  } catch (error) {
    console.error('[getAllInsights]', error);
    return {
      items: [],
      total: 0,
      hasMore: false,
      totalPages: 0,
    };
  }
}

/**
 * Fetches a single insight by its slug
 */
export async function getInsight(
  slug: string,
  options: PreviewOptions = {},
): Promise<Insight | null> {
  try {
    const preview = options.preview ?? false;

    const response = await fetchGraphQL<Insight>(
      `query GetInsight($slug: String!) {
        insightsCollection(
          limit: 1
          where: { slug: $slug }
          preview: ${preview}
        ) {
          items {
            ${INSIGHT_GRAPHQL_FIELDS}
          }
        }
      }`,
      { slug }
    );

    if (!response.data?.insightsCollection) {
      return null;
    }

    return response.data.insightsCollection.items[0] ?? null;
  } catch (error) {
    console.error('[getInsight]', error);
    return null;
  }
}

/**
 * Fetches a single client by ID
 */
export async function getClient(
  id: string,
  options: PreviewOptions = {},
): Promise<Client | null> {
  try {
    const preview = options.preview ?? false;

    const response = await fetchGraphQL<Client>(
      `query GetClient($id: String!) {
        clientsCollection(
          where: { sys: { id: $id } }
          limit: 1
          preview: ${preview}
        ) {
          items {
            ${CLIENT_GRAPHQL_FIELDS}
          }
        }
      }`,
      { id }
    );

    if (!response.data?.clientsCollection) {
      return null;
    }

    return response.data.clientsCollection.items[0] ?? null;
  } catch (error) {
    console.error('[getClient]', error);
    return null;
  }
}

/**
 * Fetches all clients
 */
export async function getAllClients(
  options: PreviewOptions = {},
): Promise<ClientsResponse> {
  try {
    const preview = options.preview ?? false;

    const response = await fetchGraphQL<Client>(
      `query GetAllClients {
        clientsCollection(preview: ${preview}) {
          items {
            ${CLIENT_GRAPHQL_FIELDS}
          }
          total
        }
      }`
    );

    if (!response.data?.clientsCollection) {
      throw new Error('No clients collection found');
    }

    return {
      items: response.data.clientsCollection.items,
      total: response.data.clientsCollection.total,
    };
  } catch (error) {
    console.error('[getAllClients]', error);
    return {
      items: [],
      total: 0,
    };
  }
}

/**
 * Fetches a single partner by ID
 */
export async function getPartner(
  id: string,
  options: PreviewOptions = {},
): Promise<Partner | null> {
  try {
    const preview = options.preview ?? false;

    const response = await fetchGraphQL<Partner>(
      `query GetPartner($id: String!) {
        partnersCollection(
          where: { sys: { id: $id } }
          limit: 1
          preview: ${preview}
        ) {
          items {
            ${PARTNER_GRAPHQL_FIELDS}
          }
        }
      }`,
      { id }
    );

    if (!response.data?.partnersCollection) {
      return null;
    }

    return response.data.partnersCollection.items[0] ?? null;
  } catch (error) {
    console.error('[getPartner]', error);
    return null;
  }
}

/**
 * Fetches all partners
 */
export async function getAllPartners(
  options: PreviewOptions = {},
): Promise<PartnersResponse> {
  try {
    const preview = options.preview ?? false;

    const response = await fetchGraphQL<Partner>(
      `query GetAllPartners {
        partnersCollection(preview: ${preview}) {
          items {
            ${PARTNER_GRAPHQL_FIELDS}
          }
          total
        }
      }`
    );

    if (!response.data?.partnersCollection) {
      throw new Error('No partners collection found');
    }

    return {
      items: response.data.partnersCollection.items,
      total: response.data.partnersCollection.total,
    };
  } catch (error) {
    console.error('[getAllPartners]', error);
    return {
      items: [],
      total: 0,
    };
  }
}
