/**
 * Contentful API Integration Module
 * Provides functions for fetching and managing insights from Contentful CMS
 */

import {
  type ContentfulResponse,
  type PreviewOptions,
  type Insight,
  type Socials,
  type SocialsResponse,
  type Service,
  type ServicesResponse,
  type ServiceComponent,
  type WorkContent,
  type Work,
  type Footer,
  type CaseStudy,
  type CaseStudyCarousel,
  type Testimonial,
} from '@/types/contentful';

/**
 * GraphQL field definitions
 */

const FOOTER_GRAPHQL_FIELDS = `
  sys {
    id
  }
  tagline
  taglineBackground {
    sys {
      id
    }
    title
    description
    url
  }
  paragraph
  socialsCollection {
    items {
      sys {
        id
      }
      name
      url
      logo {
        sys {
          id
        }
        title
        description
        url
      }
    }
  }
  address
  phone
  email
`;

const INSIGHT_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  category
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

const SERVICE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  slug
  bannerIcon {
    sys {
      id
    }
    title
    description
    url
    width
    height
    size
    fileName
    contentType
  }
  bannerCopy
  bannerLinkCopy
`;

const SERVICE_COMPONENT_GRAPHQL_FIELDS = `
  sys {
    id
  }
  header
  servicesCollection {
    items {
      sys {
        id
      }
      name
      slug
      bannerIcon {
        sys {
          id
        }
        title
        description
        url
        width
        height
        size
        fileName
        contentType
      }
      bannerCopy
      bannerLinkCopy
    }
  }
`;

const WORK_CONTENT_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  contentCollection {
    items {
      ... on WorkCopy {
        sys {
          id
        }
        __typename
        eyebrowHeader
        header
        copy
      }
      ... on FigmaPrototype {
        sys {
          id
        }
        __typename
        name
        embedLink
      }
      ... on WorkTactics {
        sys {
          id
        }
        __typename
        name
        tactics
        tacticsImage {
          url
          width
          height
        }
      }
      ... on ImageGridBox {
        sys {
          id
        }
        __typename
        name
        imagesCollection {
          items {
            url
            width
            height
          }
        }
      }
      ... on WorkScrollingSection {
        sys {
          id
        }
        __typename
        name
        imagesCollection {
          items {
            url
            width
            height
          }
        }
      }
      ... on VideoSection {
        sys {
          id
        }
        __typename
        name
        video {
          url
          contentType
        }
        backupImage {
          url
          width
          height
        }
      }
      ... on SplitImageSection {
        sys {
          id
        }
        __typename
        name
        copy
        contentCollection {
          items {
            url
            width
            height
          }
        }
      }
      ... on FramedAsset {
        sys {
          id
        }
        __typename
        name
        asset {
          url
          width
          height
        }
      }
      ... on BannerImage {
        sys {
          id
        }
        __typename
        name
        content {
          url
          width
          height
        }
      }
      ... on WorkCarousel {
        sys {
          id
        }
        __typename
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

const WORK_GRAPHQL_FIELDS = `
  sys {
    id
  }
  clientName
  slug
  briefDescription
  sector
  timeline
  sectionColor {
    name
    value
  }
  sectionSecondaryColor {
    name
    value
  }
  sectionAccentColor {
    name
    value
  }
  content {
    sys {
      id
    }
    ${WORK_CONTENT_GRAPHQL_FIELDS}
  }
  categoriesCollection {
    items {
      sys {
        id
      }
      name
    }
  }
  featuredImage {
    sys {
      id
    }
    title
    description
    url
    width
    height
    size
    fileName
    contentType
  }
  logo {
    sys {
      id
    }
    title
    description
    url
    width
    height
    size
    fileName
    contentType
  }
`;

const WORK_LIST_GRAPHQL_FIELDS = `
  sys {
    id
  }
  clientName
  slug
  briefDescription
  sector
  timeline
  sectionColor
  sectionSecondaryColor
  sectionAccentColor
  content {
    sys {
      id
    }
  }
  featuredImage {
    sys {
      id
    }
    title
    description
    url
    width
    height
  }
  logo {
    sys {
      id
    }
    url
  }
  categoriesCollection {
    items {
      sys {
        id
      }
      name
    }
  }
`;

const CASE_STUDY_CAROUSEL_FIELDS = `
  sys {
    id
  }
  carouselHeader
  carouselSubheader
  carouselContent: carouselContentCollection {
    items {
      sys {
        id
      }
      name
      sampleReference {
        sys {
          id
        }
        clientName
        slug
        briefDescription
        sector
        timeline
        sectionColor
        sectionSecondaryColor
        sectionAccentColor
      }
      previewAsset {
        url
      }
    }
  }
`;

const TESTIMONIAL_FIELDS = `
  sys {
    id
  }
  quote
  reviewer
  position
`;

interface InsightsResponse {
  insightsCollection: {
    items: Insight[];
    total: number;
  };
}

interface ServiceResponse {
  service: Service;
}

interface CaseStudyCarouselCollectionResponse {
  caseStudyCarouselCollection: {
    items: CaseStudyCarousel[];
    total: number;
  };
}

interface CaseStudyCarouselResponse {
  caseStudyCarousel: CaseStudyCarousel;
}

interface TestimonialCollectionResponse {
  testimonialsCollection: {
    items: Testimonial[];
    total: number;
  };
}

interface TestimonialResponse {
  testimonials: Testimonial;
}

interface ContentfulPreviewOptions {
  preview?: boolean;
  previewData?: unknown;
}

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

interface ContentfulGraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations: Array<{
      line: number;
      column: number;
    }>;
  }>;
}

/**
 * Executes GraphQL queries against Contentful's API with caching
 */
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  preview = false,
  cacheConfig?: { next: { revalidate: number } }
): Promise<T> {
  console.log('GraphQL Query:', query);
  console.log('GraphQL Variables:', variables);
  console.log('Preview Mode:', preview);

  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = preview
    ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  if (!space || !accessToken) {
    throw new Error(
      'Contentful space ID or access token is missing from environment variables'
    );
  }

  try {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${space}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
        cache: cacheConfig?.next ? 'force-cache' : 'no-store',
        next: cacheConfig?.next,
      }
    );

    const json = (await res.json()) as ContentfulGraphQLResponse<T>;
    console.log('GraphQL Response:', json);

    if (!res.ok) {
      console.error('GraphQL response error:', json);
      throw new Error('Failed to fetch API');
    }

    if (json.errors) {
      console.error('GraphQL errors:', json.errors);
      throw new Error('GraphQL response contains errors');
    }

    if (!json.data) {
      console.error('GraphQL response missing data:', json);
      throw new Error('GraphQL response missing data');
    }

    return json.data;
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
}

export const INSIGHTS_PER_PAGE = 6;

/**
 * Fetches a paginated list of insights
 */
export async function getInsights(
  limit = INSIGHTS_PER_PAGE,
  options: ContentfulPreviewOptions = {},
  skip = 0
): Promise<Insight[]> {
  const { preview = false } = options;

  const query = `
    query GetInsights($limit: Int!, $skip: Int!) {
      insightsCollection(limit: $limit, skip: $skip, order: postDate_DESC) {
        items {
          ${INSIGHT_GRAPHQL_FIELDS}
        }
        total
      }
    }
  `;

  try {
    const response = await fetchGraphQL<{ insightsCollection: { items: Insight[]; total: number } }>(
      query,
      { limit, skip },
      preview,
      { next: { revalidate: 60 } }
    );

    console.log('Insights Response:', JSON.stringify(response, null, 2));

    if (!response?.insightsCollection?.items) {
      console.error('No insightsCollection or items in response:', response);
      return [];
    }

    return response.insightsCollection.items;
  } catch (error) {
    console.error('Error fetching insights:', error);
    throw error;
  }
}

export const getAllInsights = getInsights;

/**
 * Fetches a single insight by its slug
 */
export async function getInsight(
  slug: string,
  options: ContentfulPreviewOptions = {}
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

  const response = await fetchGraphQL<{ insightsCollection: { items: Insight[] } }>(
    query,
    { slug },
    preview,
    { next: { revalidate: 60 } }
  );

  return response.insightsCollection?.items[0] ?? null;
}

/**
 * Fetches the most recent featured insight
 */
export async function getFeaturedInsight(
  options: ContentfulPreviewOptions = {}
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

  try {
    const response = await fetchGraphQL<{ insightsCollection: { items: Insight[] } }>(
      query,
      undefined,
      preview,
      { next: { revalidate: 60 } }
    );

    console.log('Featured Insight Response:', JSON.stringify(response, null, 2));
    
    if (!response?.insightsCollection?.items) {
      console.error('No insightsCollection or items in response:', response);
      return null;
    }

    const featuredInsight = response.insightsCollection.items[0] ?? null;
    console.log('Featured Insight:', featuredInsight);
    return featuredInsight;
  } catch (error) {
    console.error('Error fetching featured insight:', error);
    throw error;
  }
}

/**
 * Fetches all work items
 */
export async function getAllWork(preview = false): Promise<Work[]> {
  const query = `
    query GetAllWork {
      workCollection(order: timeline_DESC) {
        items {
          ${WORK_LIST_GRAPHQL_FIELDS}
        }
        total
      }
    }
  `;

  const response = await fetchGraphQL<{ workCollection: { items: Work[]; total: number } }>(
    query,
    undefined,
    preview,
    { next: { revalidate: 60 } }
  );

  return response.workCollection?.items ?? [];
}

/**
 * Fetches a single work item by slug
 */
export async function getWorkBySlug(
  slug: string,
  options: ContentfulPreviewOptions = {}
): Promise<Work | null> {
  const { preview = false } = options;

  const query = `
    query GetWorkBySlug($slug: String!) {
      workCollection(where: { slug: $slug }, limit: 1) {
        items {
          ${WORK_LIST_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL<{ workCollection: { items: Work[] } }>(
    query,
    { slug },
    preview,
    { next: { revalidate: 60 } }
  );

  return response.workCollection?.items[0] ?? null;
}

export const getWork = getWorkBySlug;

/**
 * Fetches a single service by ID
 */
export async function getService(
  id: string,
  preview = false
): Promise<Service | null> {
  const query = `
    query GetService($id: String!) {
      service(id: $id) {
        ${SERVICE_GRAPHQL_FIELDS}
      }
    }
  `;

  const response = await fetchGraphQL<ServiceResponse>(
    query,
    { id },
    preview,
    { next: { revalidate: 60 } }
  );

  return response.service ?? null;
}

/**
 * Fetches all services
 */
export async function getAllServices(preview = false): Promise<Service[]> {
  const query = `
    query GetAllServices {
      serviceCollection {
        items {
          sys {
            id
          }
          name
          slug
        }
      }
    }
  `;

  const response = await fetchGraphQL<{ serviceCollection: { items: Service[] } }>(
    query,
    undefined,
    preview,
    { next: { revalidate: 60 } }
  );

  return response.serviceCollection?.items ?? [];
}

/**
 * Fetches a single service component by ID
 */
export async function getServiceComponent(
  id: string,
  preview = false
): Promise<ServiceComponent | null> {
  const query = `
    query GetServiceComponent($id: String!) {
      serviceComponentCollection(where: { sys: { id: $id } }, limit: 1) {
        items {
          ${SERVICE_COMPONENT_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL<{ serviceComponentCollection: { items: ServiceComponent[] } }>(
    query,
    { id },
    preview,
    { next: { revalidate: 60 } }
  );

  return response.serviceComponentCollection?.items?.[0] ?? null;
}

/**
 * Fetches all service components
 */
export async function getAllServiceComponents(preview = false): Promise<ServiceComponent[]> {
  const query = `
    query GetAllServiceComponents {
      serviceComponentCollection {
        items {
          ${SERVICE_COMPONENT_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL<{ serviceComponentCollection: { items: ServiceComponent[] } }>(
    query,
    undefined,
    preview,
    { next: { revalidate: 60 } }
  );

  return response.serviceComponentCollection?.items ?? [];
}

/**
 * Fetches a single work content by ID
 */
export async function getWorkContent(
  id: string,
  preview = false
): Promise<WorkContent | null> {
  const query = `
    query GetWorkContent($id: String!) {
      workContent(id: $id) {
        ${WORK_CONTENT_GRAPHQL_FIELDS}
      }
    }
  `;

  const response = await fetchGraphQL<{ workContent: WorkContent }>(
    query,
    { id },
    preview,
    { next: { revalidate: 60 } }
  );

  return response.workContent ?? null;
}

/**
 * Fetches all work content items
 */
export async function getAllWorkContent(preview = false): Promise<WorkContent[]> {
  const query = `
    query GetAllWorkContent {
      workContentCollection {
        items {
          ${WORK_CONTENT_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL<{ workContentCollection: { items: WorkContent[] } }>(
    query,
    undefined,
    preview,
    { next: { revalidate: 60 } }
  );

  return response.workContentCollection?.items ?? [];
}

/**
 * Fetches the site footer
 */
export async function getFooter(preview = false): Promise<Footer | null> {
  const query = `
    query GetFooter {
      footerCollection(limit: 1) {
        items {
          ${FOOTER_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  try {
    const response = await fetchGraphQL<{ footerCollection: { items: Footer[] } }>(
      query,
      undefined,
      preview,
      { next: { revalidate: 60 } }
    );

    console.log('Footer response:', JSON.stringify(response, null, 2));
    return response.footerCollection?.items[0] ?? null;
  } catch (error) {
    console.error('Error fetching footer:', error);
    throw error;
  }
}

const caseStudyFields = `
  sys {
    id
  }
  name
  sampleReference {
    sys {
      id
    }
    clientName
    slug
    briefDescription
    sector
    timeline
    sectionColor
    sectionSecondaryColor
    sectionAccentColor
  }
  previewAsset {
    url
  }
`;

const caseStudyCarouselFields = `
  sys {
    id
  }
  carouselHeader
  carouselSubheader
  carouselContent: carouselContentCollection {
    items {
      sys {
        id
      }
      name
      sampleReference {
        sys {
          id
        }
        clientName
        slug
        briefDescription
        sector
        timeline
        sectionColor
        sectionSecondaryColor
        sectionAccentColor
      }
      previewAsset {
        url
      }
    }
  }
`;

const testimonialFields = `
  sys {
    id
  }
  quote
  reviewer
  position
`;

/**
 * Fetches all case studies
 */
export async function getAllCaseStudies(
  preview = false
): Promise<CaseStudy[]> {
  const query = `
    query GetAllCaseStudies {
      caseStudyCollection(order: publishDate_DESC) {
        items {
          ${caseStudyFields}
        }
        total
      }
    }
  `;

  const response = await fetchGraphQL<{ caseStudyCollection: { items: CaseStudy[] } }>(
    query,
    undefined,
    preview,
    { next: { revalidate: 60 } }
  );

  return response.caseStudyCollection?.items ?? [];
}

/**
 * Fetches a single case study by slug
 */
export async function getCaseStudyBySlug(
  slug: string,
  preview = false
): Promise<CaseStudy | null> {
  const query = `
    query GetCaseStudyBySlug($slug: String!) {
      caseStudyCollection(where: { slug: $slug }, limit: 1) {
        items {
          ${caseStudyFields}
        }
      }
    }
  `;

  const response = await fetchGraphQL<{ caseStudyCollection: { items: CaseStudy[] } }>(
    query,
    { slug },
    preview,
    { next: { revalidate: 60 } }
  );

  return response.caseStudyCollection?.items[0] ?? null;
}

/**
 * Fetches all case study carousels
 */
export async function getAllCaseStudyCarousels(
  preview = false
): Promise<CaseStudyCarousel[]> {
  const query = `
    query GetAllCaseStudyCarousels {
      caseStudyCarouselCollection {
        items {
          ${CASE_STUDY_CAROUSEL_FIELDS}
        }
        total
      }
    }
  `;

  const response = await fetchGraphQL<CaseStudyCarouselCollectionResponse>(
    query,
    undefined,
    preview,
    { next: { revalidate: 60 } }
  );

  return response.caseStudyCarouselCollection?.items ?? [];
}

/**
 * Fetches a single case study carousel by ID
 */
export async function getCaseStudyCarousel(
  id: string,
  preview = false
): Promise<CaseStudyCarousel | null> {
  const query = `
    query GetCaseStudyCarousel($id: String!) {
      caseStudyCarousel(id: $id) {
        ${CASE_STUDY_CAROUSEL_FIELDS}
      }
    }
  `;

  const response = await fetchGraphQL<CaseStudyCarouselResponse>(
    query,
    { id },
    preview,
    { next: { revalidate: 60 } }
  );

  return response.caseStudyCarousel ?? null;
}

/**
 * Fetches all testimonials
 */
export async function getAllTestimonials(
  preview = false
): Promise<Testimonial[]> {
  const query = `
    query GetAllTestimonials {
      testimonialsCollection {
        items {
          ${TESTIMONIAL_FIELDS}
        }
        total
      }
    }
  `;

  const response = await fetchGraphQL<TestimonialCollectionResponse>(
    query,
    undefined,
    preview,
    { next: { revalidate: 60 } }
  );

  return response.testimonialsCollection?.items ?? [];
}

/**
 * Fetches a single testimonial by ID
 */
export async function getTestimonial(
  id: string,
  preview = false
): Promise<Testimonial | null> {
  const query = `
    query GetTestimonial($id: String!) {
      testimonials(id: $id) {
        ${TESTIMONIAL_FIELDS}
      }
    }
  `;

  const response = await fetchGraphQL<TestimonialResponse>(
    query,
    { id },
    preview,
    { next: { revalidate: 60 } }
  );

  return response.testimonials ?? null;
}
