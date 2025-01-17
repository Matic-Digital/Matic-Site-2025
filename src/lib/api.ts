/**
 * Contentful API Integration Module
 * Provides functions for fetching and managing insights from Contentful CMS
 */

import { type ContentfulResponse, type Insight, type InsightsResponse } from '@/types';

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

/**
 * Fetches a paginated list of insights
 */
export async function getAllInsights(
  limit = INSIGHTS_PER_PAGE,
  isDraftMode = false,
  skip = 0,
): Promise<InsightsResponse> {
  try {
    const response = await fetchGraphQL<Insight>(
      `query GetInsights($limit: Int!, $skip: Int!) {
        insightsCollection(
          limit: $limit
          skip: $skip
          order: [postDate_DESC]
          preview: ${isDraftMode}
        ) {
          total
          items {
            ${INSIGHT_GRAPHQL_FIELDS}
          }
        }
      }`,
      { limit, skip }
    );

    const collection = response.data?.insightsCollection;
    
    if (!collection) {
      throw new Error('No insights found');
    }

    const { total, items } = collection;

    return {
      items,
      total,
      hasMore: skip + limit < total,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new ContentfulError(`Failed to fetch insights: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Fetches a single insight by its slug
 */
export async function getInsight(
  slug: string,
  isDraftMode = false,
): Promise<Insight | null> {
  try {
    const response = await fetchGraphQL<Insight>(
      `query GetInsight($slug: String!) {
        insightsCollection(
          limit: 1
          where: { slug: $slug }
          preview: ${isDraftMode ? 'true' : 'false'}
        ) {
          items {
            ${INSIGHT_GRAPHQL_FIELDS}
          }
        }
      }`,
      { slug }
    );

    const insight = response.data?.insightsCollection?.items[0];

    if (!insight) {
      return null;
    }

    return insight;
  } catch (error) {
    if (error instanceof Error) {
      throw new ContentfulError(`Failed to fetch insight: ${error.message}`);
    }
    throw error;
  }
}
