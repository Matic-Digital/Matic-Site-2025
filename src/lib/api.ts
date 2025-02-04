/**
 * Contentful API Integration Module
 * Provides functions for fetching and managing insights from Contentful CMS
 */

import {
  type ContentfulResponse,
  type Insight,
  type InsightsResponse,
  type Client,
  type ClientsResponse,
  type Partner,
  type PartnersResponse,
  type Signals,
  type SignalsResponse,
  type CTA,
  type CTAResponse,
  type Engage,
  type EngageResponse,
  type Hero,
  type Work,
  type WorkResponse,
  type Socials,
  type SocialsResponse,
  type Footer,
  type Service,
  type ServicesResponse,
  type ServiceComponent,
  type ServiceComponentResponse,
  type WorkContent,
  type WorkContentResponse
} from '@/types';

// Environment variables for API configuration
const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_PREVIEW_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN;

// Error classes for better error handling
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
  featured
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
 * GraphQL fragment defining the structure of signals data to fetch
 */
const SIGNALS_GRAPHQL_FIELDS = `
  sys {
    id
  }
  logo {
    url
  }
  tagline
  subheader
`;

/**
 * GraphQL fragment defining the structure of CTA data to fetch
 */
const CTA_GRAPHQL_FIELDS = `
  sys {
    id
  }
  sectionHeader
  sectionSubheader
  ctaButtonText
  backgroundImage {
    url
  }
  secondaryBackgroundImage {
    url
  }
`;

/**
 * GraphQL fragment defining the structure of ways to engage data to fetch
 */
const ENGAGE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  bannerImage {
    url
  }
  engagementHeader
  engagementCopy
  engagementLink
  signUpCopy
`;

/**
 * GraphQL fragment defining the structure of hero data to fetch
 */
const HERO_GRAPHQL_FIELDS = `
  sys {
    id
  }
  tagline
  subheader
  backgroundAsset {
    sys {
      id
    }
    url
    title
    description
    contentType
    fileName
  }
`;

const WORK_GRAPHQL_FIELDS = `
  sys {
    id
  }
  slug
  clientName
  sector
  briefDescription
  sectionColor
  sectionSecondaryColor
  sectionAccentColor
  categoriesCollection {
    items {
      sys {
        id
      }
      name
    }
  }
  content {
    sys {
      id
    }
  }
  featuredImage {
    url
  }
  logo {
    url
  }
`;

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
          width
          height
          description
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
    }
  }
`;

/**
 * GraphQL fragment defining the structure of socials data to fetch
 */
const SOCIALS_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  logo {
    url
  }
  url
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
 * Executes GraphQL queries against Contentful's API with caching
 */
async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  preview = false,
  cacheConfig?: { next: { revalidate: number } }
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
            preview ? CONTENTFUL_PREVIEW_ACCESS_TOKEN : CONTENTFUL_ACCESS_TOKEN
          }`
        },
        body: JSON.stringify({ query, variables }),
        ...cacheConfig
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error('Network error response:', text);
      throw new NetworkError(`Network error: ${res.statusText}`, res);
    }

    const json = (await res.json()) as {
      data?: unknown;
      errors?: Array<{ message: string }>;
    };
    console.log('Contentful response:', json);

    if (json.errors) {
      console.error('GraphQL errors:', json.errors);
      throw new GraphQLError(
        `GraphQL Error: ${json.errors.map((e) => e.message).join(', ')}`,
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
  skip = 0
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
      totalPages: Math.ceil(response.data.insightsCollection.total / limit)
    };
  } catch (error) {
    console.error('[getAllInsights]', error);
    return {
      items: [],
      total: 0,
      hasMore: false,
      totalPages: 0
    };
  }
}

/**
 * Fetches a single insight by its slug
 */
export async function getInsight(
  slug: string,
  options: PreviewOptions = {}
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
 * Fetches the most recent featured insight
 */
export async function getFeaturedInsight(
  options: PreviewOptions = {}
): Promise<Insight | null> {
  const query = `query {
    insightsCollection(where: { featured: true }, order: [postDate_DESC], limit: 1, preview: ${
      options.preview ? 'true' : 'false'
    }) {
      items {
        ${INSIGHT_GRAPHQL_FIELDS}
      }
    }
  }`;

  const response = await fetchGraphQL<Insight>(query, {}, options.preview);

  return response.data?.insightsCollection?.items[0] ?? null;
}

/**
 * Fetches a single client by ID
 */
export async function getClient(id: string, options: PreviewOptions = {}): Promise<Client | null> {
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
export async function getAllClients(options: PreviewOptions = {}): Promise<ClientsResponse> {
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
      total: response.data.clientsCollection.total
    };
  } catch (error) {
    console.error('[getAllClients]', error);
    return {
      items: [],
      total: 0
    };
  }
}

/**
 * Fetches a single partner by ID
 */
export async function getPartner(
  id: string,
  options: PreviewOptions = {}
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
export async function getAllPartners(options: PreviewOptions = {}): Promise<PartnersResponse> {
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
      total: response.data.partnersCollection.total
    };
  } catch (error) {
    console.error('[getAllPartners]', error);
    return {
      items: [],
      total: 0
    };
  }
}

/**
 * Fetches all signals content
 */
export async function getAllSignals(options: PreviewOptions = {}): Promise<SignalsResponse> {
  const query = `query {
    signalsCollection(preview: ${options.preview ? 'true' : 'false'}) {
      items {
        ${SIGNALS_GRAPHQL_FIELDS}
      }
      total
    }
  }`;

  const response = await fetchGraphQL<Signals>(query, {}, options.preview);

  if (!response?.data?.signalsCollection) {
    throw new ContentfulError('Failed to fetch signals collection.');
  }

  return {
    items: response.data.signalsCollection.items,
    total: response.data.signalsCollection.total
  };
}

/**
 * Fetches a single signal by ID
 */
export async function getSignal(id: string, options: PreviewOptions = {}): Promise<Signals | null> {
  const query = `query {
    signalsCollection(where: { sys: { id: "${id}" } }, preview: ${options.preview ? 'true' : 'false'}, limit: 1) {
      items {
        ${SIGNALS_GRAPHQL_FIELDS}
      }
    }
  }`;

  const response = await fetchGraphQL<Signals>(query, {}, options.preview);

  if (!response?.data?.signalsCollection) {
    throw new ContentfulError('Failed to fetch signal.');
  }

  return response.data.signalsCollection.items[0] ?? null;
}

/**
 * Fetches a single CTA by ID
 */
export async function getCTA(id: string, options: PreviewOptions = {}): Promise<CTA | null> {
  const query = `query {
    callToAction(id: "${id}") {
      ${CTA_GRAPHQL_FIELDS}
    }
  }`;

  const response = await fetchGraphQL<CTA>(query, {}, options.preview);

  return response.data?.callToAction ?? null;
}

/**
 * Fetches all CTAs
 */
export async function getAllCTAs(options: PreviewOptions = {}): Promise<CTAResponse> {
  const query = `query {
    callToActionCollection {
      items {
        ${CTA_GRAPHQL_FIELDS}
      }
      total
    }
  }`;

  const response = await fetchGraphQL<CTA>(query, {}, options.preview);
  const collection = response.data?.callToActionCollection;

  if (!collection) {
    return {
      items: [],
      total: 0
    };
  }

  return {
    items: collection.items,
    total: collection.total
  };
}

/**
 * Fetches a single way to engage by ID
 */
export async function getWayToEngage(
  id: string,
  options: PreviewOptions = {}
): Promise<Engage | null> {
  const query = `query {
    waysToEngage(id: "${id}") {
      ${ENGAGE_GRAPHQL_FIELDS}
    }
  }`;

  const response = await fetchGraphQL<Engage>(query, {}, options.preview);

  return response.data?.waysToEngage ?? null;
}

/**
 * Fetches all ways to engage
 */
export async function getAllWaysToEngage(options: PreviewOptions = {}): Promise<EngageResponse> {
  const query = `query {
    waysToEngageCollection {
      items {
        ${ENGAGE_GRAPHQL_FIELDS}
      }
      total
    }
  }`;

  const response = await fetchGraphQL<Engage>(query, {}, options.preview);
  const collection = response.data?.waysToEngageCollection;

  if (!collection) {
    return {
      items: [],
      total: 0
    };
  }

  return {
    items: collection.items,
    total: collection.total
  };
}

/**
 * Fetches hero content
 */
export async function getHero(): Promise<Hero | null> {
  try {
    const query = `query {
      heroCollection(limit: 1) {
        items {
          ${HERO_GRAPHQL_FIELDS}
        }
      }
    }`;

    const response = await fetchGraphQL<Hero>(query);

    if (!response?.data?.heroCollection) {
      console.error('Hero collection is missing from response:', response);
      throw new ContentfulError('Failed to fetch hero content.');
    }

    const hero = response.data.heroCollection.items[0] ?? null;

    if (!hero) {
      console.error('No hero items found in collection');
      return null;
    }

    // backgroundAsset is now a JSON object
    if (!hero.backgroundAsset) {
      console.error('Hero background asset is missing or invalid:', hero);
      throw new ContentfulError('Hero background asset is missing or invalid.');
    }

    // Log the entire hero object for debugging
    console.log('Hero content:', JSON.stringify(hero, null, 2));

    return hero;
  } catch (error) {
    console.error('[getHero] Error:', error);
    throw error;
  }
}

/**
 * Fetches all work items
 */
export async function getAllWork(options: PreviewOptions = {}): Promise<WorkResponse> {
  const query = `
    query {
      workCollection(order: [sys_firstPublishedAt_ASC]) {
        items {
          ${WORK_GRAPHQL_FIELDS}
          sys {
            firstPublishedAt
          }
        }
        total
      }
    }
  `;

  const response = await fetchGraphQL<Work>(query, {}, options.preview);
  const collection = response.data?.workCollection;

  if (!collection) {
    throw new ContentfulError('Failed to fetch work items');
  }

  return {
    items: collection.items,
    total: collection.total
  };
}

/**
 * Fetches a single work item by slug
 */
export async function getWork(slug: string, options: PreviewOptions = {}): Promise<Work | null> {
  try {
    const preview = options.preview ?? false;

    const response = await fetchGraphQL<Work>(
      `query GetWork($slug: String!) {
        workCollection(
          where: { slug: $slug }
          limit: 1
          preview: ${preview}
        ) {
          items {
            ${WORK_GRAPHQL_FIELDS}
          }
        }
      }`,
      { slug }
    );

    if (!response?.data?.workCollection?.items?.length) {
      return null;
    }

    return response.data.workCollection.items[0] ?? null;
  } catch (error) {
    console.error('[getWork]', error);
    return null;
  }
}

/**
 * Fetches a single social media link by ID
 */
export async function getSocial(id: string, options: PreviewOptions = {}): Promise<Socials | null> {
  const query = `query {
    socials(id: "${id}") {
      ${SOCIALS_GRAPHQL_FIELDS}
    }
  }`;

  const response = await fetchGraphQL<Socials>(query, {}, options.preview);

  return response.data?.socials ?? null;
}

/**
 * Fetches all social media links
 */
export async function getAllSocials(options: PreviewOptions = {}): Promise<SocialsResponse> {
  const query = `query {
    socialsCollection {
      items {
        ${SOCIALS_GRAPHQL_FIELDS}
      }
      total
    }
  }`;

  const response = await fetchGraphQL<Socials>(query, {}, options.preview);
  const collection = response.data?.socialsCollection;

  if (!collection) {
    return {
      items: [],
      total: 0
    };
  }

  return {
    items: collection.items,
    total: collection.total
  };
}

/**
 * Fetches the site footer
 */
export async function getFooter(options: PreviewOptions = {}): Promise<Footer | null> {
  try {
    const query = `query {
      footerCollection(limit: 1) {
        items {
          ${FOOTER_GRAPHQL_FIELDS}
        }
      }
    }`;

    const response = await fetchGraphQL<Footer>(query, {}, options.preview);
    const collection = response.data?.footerCollection;

    if (!collection || collection.items.length === 0) {
      return null;
    }

    return collection.items[0] ?? null;
  } catch (error) {
    console.error('Error fetching footer:', error);
    return null;
  }
}

/**
 * Fetches a single service by ID
 */
export async function getService(
  id: string,
  options: PreviewOptions = {}
): Promise<Service | null> {
  const query = `query GetService($id: String!) {
    service(id: $id) {
      ${SERVICE_GRAPHQL_FIELDS}
    }
  }`;

  const response = await fetchGraphQL<Service>(query, { id }, options.preview);
  return response?.data?.service ?? null;
}

/**
 * Fetches all services
 */
export async function getAllServices(options: PreviewOptions = {}): Promise<ServicesResponse> {
  const query = `{
    servicesCollection {
      items {
        ${SERVICE_GRAPHQL_FIELDS}
      }
      total
    }
  }`;

  const response = await fetchGraphQL<Service>(query, undefined, options.preview);
  const collection = response.data?.servicesCollection;

  if (!collection) {
    return {
      items: [],
      total: 0
    };
  }

  return {
    items: collection.items,
    total: collection.total
  };
}

/**
 * Fetches a single service component by ID
 */
export async function getServiceComponent(
  id: string,
  options: PreviewOptions = {}
): Promise<ServiceComponent | null> {
  const query = `query GetServiceComponent($id: String!) {
    serviceComponent(id: $id) {
      ${SERVICE_COMPONENT_GRAPHQL_FIELDS}
    }
  }`;

  const response = await fetchGraphQL<ServiceComponent>(query, { id }, options.preview);

  return response?.data?.serviceComponent ?? null;
}

/**
 * Fetches all service components
 */
export async function getAllServiceComponents(
  options: PreviewOptions = {}
): Promise<ServiceComponentResponse> {
  const query = `{
    serviceComponentCollection {
      items {
        ${SERVICE_COMPONENT_GRAPHQL_FIELDS}
      }
      total
    }
  }`;

  const response = await fetchGraphQL<ServiceComponent>(query, undefined, options.preview);

  const collection = response.data?.serviceComponentCollection;
  if (!collection) {
    return {
      items: [],
      total: 0
    };
  }

  return {
    items: collection.items,
    total: collection.total
  };
}

/**
 * Fetches a single work content by ID
 */
export async function getWorkContent(
  id: string | undefined,
  options: PreviewOptions = {}
): Promise<WorkContent | null> {
  if (!id) return null;

  const query = `query {
    workContent(id: "${id}") {
      ${WORK_CONTENT_GRAPHQL_FIELDS}
    }
  }`;

  const response = await fetchGraphQL<WorkContent>(query, {}, options.preview);
  return response.data?.workContent ?? null;
}

/**
 * Fetches all work content items
 */
export async function getAllWorkContent(
  options: PreviewOptions = {}
): Promise<WorkContentResponse> {
  const query = `query {
    workContentCollection {
      items {
        ${WORK_CONTENT_GRAPHQL_FIELDS}
      }
      total
    }
  }`;

  const response = await fetchGraphQL<WorkContent>(query, {}, options.preview);
  const collection = response.data?.workContentCollection;

  if (!collection) {
    return {
      items: [],
      total: 0
    };
  }

  return {
    items: collection.items,
    total: collection.total
  };
}
