/**
 * Contentful API Integration Module
 * Provides functions for fetching and managing insights from Contentful CMS
 */

import {
  type Insight,
  type TeamMember,
  type Service,
  type ServiceComponent,
  type WorkContent,
  type Work,
  type Footer,
  type CaseStudy,
  type CaseStudyCarousel,
  type Testimonial,
  type Engage,
  type WorkSnippet,
  type Clients,
  type WorkCarousel,
  type HeaderGrid
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

const HEADERGRID_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  heading1
  content1
  heading2
  content2
  heading3
  content3
  heading4
  content4
  showRating
  ratingStars {
    sys {
      id
    }
    title
    description
    url
  }
`;

const TEAM_MEMBER_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  title
`;

const INSIGHT_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  author {
    sys {
      id
    }
    name
    title
    linkedIn
  }
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

// Extended GraphQL fields for single insight page that includes closingThoughts
const INSIGHT_DETAIL_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  author {
    sys {
      id
    }
    name
    title
    linkedIn
  }
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
  closingThoughts {
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
  productList
  sampleProject {
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
    featuredImage {
      url
      width
      height
    }
    serviceAsset {
      url
      width
      height
      title
      description
      contentType
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
      ... on ImageComparison {
        sys {
          id
        }
        __typename
        name
        beforeImage {
          url
          width
          height
        }
        afterImage {
          url
          width
          height
        }
      }
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

const ENGAGE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  engagementHeader
  engagementCopy
  bannerImage {
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
  engagementLink
  signUpCopy
`;

const WORK_FIELDS = `
  sys {
    id
  }
  clientName
  slug
  briefDescription
  sector
  timeline
  order
  isFeatured
  homepageMedia {
    sys {
      id
    }
    title
    description
    url
    width
    height
    contentType
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
  }
  sectionColor
  sectionSecondaryColor
  sectionAccentColor
  snippetColor
`;

const WORK_SNIPPET_FIELDS = `
  sys {
    id
  }
  heading
  samplesCollection {
    items {
      ...WorkFields
    }
  }
`;

interface ServiceResponse {
  service: {
    items: Service[];
  };
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

interface WorkSnippetResponse {
  workSnippet: WorkSnippet;
}

interface TeamMemberResponse {
  teamMember: TeamMember;
}

interface ContentfulPreviewOptions {
  preview?: boolean;
  previewData?: unknown;
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
  fetchOptions?: { next?: { revalidate: number } }
): Promise<T> {
  // Get the space ID and environment from environment variables
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const environment = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT ?? 'staging'; // Default to 'staging' if not specified

  // Always use preview token if preview is true, regardless of environment
  const accessToken = preview
    ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  console.log('GraphQL Query:', query);
  console.log('GraphQL Variables:', variables);
  console.log('Preview Mode:', preview);
  console.log('Space ID:', space);
  console.log('Environment:', environment);
  console.log(
    'Using Access Token:',
    accessToken === process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
      ? 'PREVIEW TOKEN'
      : 'DELIVERY TOKEN'
  );

  if (!space || !accessToken) {
    throw new Error(
      'Contentful space ID or access token is missing. Check your environment variables.'
    );
  }

  try {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${space}/environments/${environment}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          query,
          variables
        }),
        cache: 'no-store', // Always fetch fresh data
        next: fetchOptions?.next
      }
    );

    // Check if response is ok before parsing JSON
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`HTTP ${res.status} ${res.statusText}:`, errorText);
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const json = (await res.json()) as ContentfulGraphQLResponse<T>;
    console.log('GraphQL Response Status:', res.status);
    console.log('GraphQL Response:', json);

    if (json.errors) {
      console.error('GraphQL errors:', json.errors);
      throw new Error(`GraphQL errors: ${json.errors.map((e) => e.message).join(', ')}`);
    }

    if (!json.data) {
      console.error('GraphQL response missing data:', json);
      // Return empty object instead of throwing to allow graceful handling
      return {} as T;
    }

    return json.data;
  } catch (error) {
    console.error('GraphQL request failed:', error);
    console.error('Request details:', {
      url: `https://graphql.contentful.com/content/v1/spaces/${space}/environments/${environment}`,
      query: query.substring(0, 200) + '...',
      variables
    });
    throw error;
  }
}

export const INSIGHTS_PER_PAGE = 6;

/**
 * Gets the total count of insights
 */
export async function getInsightsCount(preview = false): Promise<number> {
  const query = `
    query GetInsightsCount {
      insightsCollection {
        total
      }
    }
  `;

  try {
    const response = await fetchGraphQL<{
      insightsCollection: { total: number };
    }>(query, {}, preview, { next: { revalidate: 0 } });

    if (!response?.insightsCollection?.total) {
      console.error('No insightsCollection or total in response:', response);
      return 0;
    }

    return response.insightsCollection.total;
  } catch (error) {
    console.error('Error fetching insights count:', error);
    return 0;
  }
}

/**
 * Fetches a paginated list of insights
 */
export async function getInsights(
  limit = 6,
  options: { skip?: number; where?: Record<string, unknown> } = {},
  preview = false
): Promise<{ items: Insight[]; total: number }> {
  const { skip = 0, where } = options;

  const query = `
    query GetInsights($limit: Int!, $skip: Int!${where ? ', $where: InsightsFilter' : ''}) {
      insightsCollection(
        limit: $limit,
        skip: $skip,
        order: postDate_DESC
        ${where ? ', where: $where' : ''}
      ) {
        items {
          ${INSIGHT_GRAPHQL_FIELDS}
        }
        total
      }
    }
  `;

  try {
    const response = await fetchGraphQL<{
      insightsCollection: { items: Insight[]; total: number };
    }>(query, { limit, skip, ...(where && { where }) }, preview, { next: { revalidate: 0 } });

    console.log('Insights Response:', JSON.stringify(response, null, 2));

    if (!response?.insightsCollection) {
      console.error('No insightsCollection in response:', response);
      return { items: [], total: 0 };
    }

    return {
      items: response.insightsCollection.items,
      total: response.insightsCollection.total
    };
  } catch (error) {
    console.error('Error fetching insights:', error);
    throw error;
  }
}

/**
 * Fetches a single team member by ID
 */
export async function getTeamMember(id: string, preview = false): Promise<TeamMember | null> {
  try {
    const query = `
      query GetTeamMember($id: String!) {
        teamMember(id: $id, preview: ${preview}) {
          ${TEAM_MEMBER_GRAPHQL_FIELDS}
        }
      }
    `;
    const variables = { id };
    const response = await fetchGraphQL<TeamMemberResponse>(query, variables, preview);
    return response?.teamMember || null;
  } catch (error) {
    console.error('Error fetching team member:', error);
    return null;
  }
}

export const getAllInsights = getInsights;

/**
 * Fetches insights from different categories for the homepage
 * Returns one insight from each category (up to 3 different categories)
 */
export async function getInsightsFromDifferentCategories(preview = false): Promise<Insight[]> {
  const categories = ['Insights', 'Design', 'Technology', 'Signals'];

  // Create separate queries for each category
  const query = `
    query GetInsightsFromCategories(
      ${categories.map((_, index) => `$category${index}: String!`).join(',\n      ')}
    ) {
      ${categories
        .map(
          (_, index) => `
        category${index}: insightsCollection(where: {category: $category${index}}, limit: 1, order: postDate_DESC) {
          items {
            ${INSIGHT_GRAPHQL_FIELDS}
          }
        }
      `
        )
        .join('')}
    }
  `;

  // Create variables for each category
  const variables = categories.reduce(
    (vars, category, index) => {
      vars[`category${index}`] = category;
      return vars;
    },
    {} as Record<string, string>
  );

  try {
    const response = await fetchGraphQL<Record<string, { items: Insight[] }>>(
      query,
      variables,
      preview,
      { next: { revalidate: 0 } }
    );

    // Collect insights from different categories
    const insights: Insight[] = [];

    // Extract one insight from each category response
    categories.forEach((_, index) => {
      const categoryKey = `category${index}`;
      const categoryInsights = response?.[categoryKey]?.items;
      if (categoryInsights?.[0]) {
        insights.push(categoryInsights[0]);
      }
    });

    // Limit to 3 insights
    return insights.slice(0, 3);
  } catch (error) {
    console.error('Error fetching insights from different categories:', error);
    // Fallback to regular insights if there's an error
    return (await getInsights(3, {}, preview)).items;
  }
}

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
          ${INSIGHT_DETAIL_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL<{ insightsCollection: { items: Insight[] } }>(
    query,
    { slug },
    preview,
    { next: { revalidate: 0 } }
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
      { next: { revalidate: 0 } }
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
export async function getAllWork(_preview = false): Promise<Work[]> {
  // Use preview mode only if explicitly requested
  const usePreview = _preview;

  // Add homepageMedia field to the query as it's now available in the content model
  const query = `
    query GetAllWork {
      workCollection(order: order_ASC, preview: ${usePreview}) {
        items {
          sys {
            id
          }
          clientName
          slug
          briefDescription
          sector
          timeline
          order
          isFeatured
          homepageMedia {
            sys {
              id
            }
            title
            description
            url
            width
            height
            contentType
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
          }
          sectionColor
          sectionSecondaryColor
          sectionAccentColor
          snippetColor
          content {
            sys {
              id
            }
          }
          categoriesCollection {
            items {
              sys {
                id
              }
              name
            }
          }
        }
        total
      }
    }
  `;

  try {
    console.log('Fetching work items with homepageMedia field...');
    const response = await fetchGraphQL<{ workCollection: { items: Work[]; total: number } }>(
      query,
      undefined,
      usePreview,
      { next: { revalidate: 0 } }
    );

    console.log('Successfully fetched work items');

    // Detailed logging of the response to verify homepageMedia field
    if (response?.workCollection?.items) {
      console.log('Work items retrieved:', response.workCollection.items.length);

      // Log the raw API response for debugging
      console.log('Raw API response:', JSON.stringify(response, null, 2));

      // Count items with homepageMedia
      const itemsWithHomepageMedia = response.workCollection.items.filter(
        (work) => !!work.homepageMedia?.url
      ).length;
      console.log(
        `Items with homepageMedia: ${itemsWithHomepageMedia} out of ${response.workCollection.items.length}`
      );

      // Log each work item's homepageMedia field
      response.workCollection.items.forEach((work) => {
        console.log(`Work item ${work.clientName} (${work.slug}):`);
        console.log(`  - Has homepageMedia: ${!!work.homepageMedia}`);
        if (work.homepageMedia) {
          console.log(`  - homepageMedia URL: ${work.homepageMedia.url}`);
          console.log(`  - homepageMedia content type: ${work.homepageMedia.contentType}`);
        } else {
          console.log(`  - homepageMedia is ${work.homepageMedia === null ? 'null' : 'undefined'}`);
        }
        console.log(`  - Has featuredImage: ${!!work.featuredImage}`);
        if (work.featuredImage) {
          console.log(`  - featuredImage URL: ${work.featuredImage.url}`);
        }
      });
    } else {
      console.error('No workCollection or items in response');
      return [];
    }

    // Return the work items directly from the API response
    // This preserves the homepageMedia field when it exists
    return response.workCollection.items;
  } catch (error) {
    console.error('Error fetching work items:', error);
    return [];
  }
}
export const getWork = getAllWork;

/**
 * Fetches a single work item by slug
 */
export async function getWorkBySlug(
  slug: string,
  _options?: ContentfulPreviewOptions
): Promise<Work | null> {
  // Use preview mode only if explicitly requested
  const usePreview = _options?.preview ?? false;

  // Define the query with homepageMedia field
  const queryWithHomepageMedia = `
    query GetWorkBySlug($slug: String!) {
      workCollection(where: { slug: $slug }, limit: 1, preview: ${usePreview}) {
        items {
          sys {
            id
          }
          clientName
          slug
          briefDescription
          sector
          timeline
          order
          homepageMedia {
            sys {
              id
            }
            title
            description
            url
            width
            height
            contentType
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
          }
          sectionColor
          sectionSecondaryColor
          sectionAccentColor
          snippetColor
          content {
            sys {
              id
            }
          }
          categoriesCollection {
            items {
              sys {
                id
              }
              name
            }
          }
        }
      }
    }
  `;

  // Define a fallback query without homepageMedia field
  const fallbackQuery = `
    query GetWorkBySlug($slug: String!) {
      workCollection(where: { slug: $slug }, limit: 1, preview: ${usePreview}) {
        items {
          sys {
            id
          }
          clientName
          slug
          briefDescription
          sector
          timeline
          order
          featuredImage {
            sys {
              id
            }
            title
            description
            url
            width
            height
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
          }
          sectionColor
          sectionSecondaryColor
          sectionAccentColor
          snippetColor
          content {
            sys {
              id
            }
          }
          categoriesCollection {
            items {
              sys {
                id
              }
              name
            }
          }
        }
      }
    }
  `;

  try {
    // First try with homepageMedia field
    console.log(`Attempting to fetch work by slug ${slug} with homepageMedia field...`);
    const response = await fetchGraphQL<{ workCollection: { items: Work[] } }>(
      queryWithHomepageMedia,
      { slug },
      usePreview,
      { next: { revalidate: 0 } }
    );

    console.log(`Successfully fetched work by slug ${slug} with homepageMedia field`);

    // Check if homepageMedia field is actually present in the response
    const work = response.workCollection?.items[0];
    const hasHomepageMediaField =
      work && Object.prototype.hasOwnProperty.call(work, 'homepageMedia');

    console.log(`homepageMedia field present in work ${slug}:`, hasHomepageMediaField);

    if (hasHomepageMediaField && work) {
      console.log(`homepageMedia for work ${slug}:`, {
        hasHomepageMedia: !!work.homepageMedia,
        homepageMediaUrl: work.homepageMedia?.url
      });
    }

    return work ?? null;
  } catch (error) {
    // If there's an error with the homepageMedia query, try the fallback
    console.error(`Error fetching work by slug ${slug} with homepageMedia field:`, error);
    console.log(`Falling back to query without homepageMedia field for slug ${slug}...`);

    try {
      const fallbackResponse = await fetchGraphQL<{ workCollection: { items: Work[] } }>(
        fallbackQuery,
        { slug },
        usePreview,
        { next: { revalidate: 0 } }
      );

      console.log(`Successfully fetched work by slug ${slug} with fallback query`);

      return fallbackResponse.workCollection?.items[0] ?? null;
    } catch (fallbackError) {
      console.error(`Error fetching work by slug ${slug} with fallback query:`, fallbackError);
      return null;
    }
  }
}

/**
 * Fetches a single service by ID
 */
export async function getService(id: string, preview = false): Promise<Service | null> {
  const query = `query ServiceQuery($id: String) {
    service: serviceCollection(limit: 1, where: { sys: { id: $id } }, preview: ${preview}) {
      items {
        ${SERVICE_GRAPHQL_FIELDS}
      }
    }
  }`;

  const response = await fetchGraphQL<ServiceResponse>(query, { id }, preview, {
    next: { revalidate: 0 }
  });

  return response.service?.items?.[0] ?? null;
}

/**
 * Fetches a single service by slug
 */
export async function getServiceBySlug(slug: string, preview = false): Promise<Service | null> {
  const query = `query ServiceBySlugQuery($slug: String!) {
    service: serviceCollection(limit: 1, where: { slug: $slug }, preview: ${preview}) {
      items {
        ${SERVICE_GRAPHQL_FIELDS}
      }
    }
  }`;

  const response = await fetchGraphQL<ServiceResponse>(query, { slug }, preview, {
    next: { revalidate: 0 }
  });

  return response.service?.items?.[0] ?? null;
}

/**
 * Fetches all services
 */
export async function getAllServices(preview = false): Promise<Service[]> {
  const query = `
    query GetAllServices {
      servicesCollection {
        items {
          sys {
            id
          }
          name
          slug
          bannerIcon {
            url
            width
            height
          }
          bannerCopy
          sampleProject {
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
            featuredImage {
              url
              width
              height
            }
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL<{ servicesCollection: { items: Service[] } }>(
    query,
    undefined,
    preview,
    { next: { revalidate: 0 } }
  );

  return response.servicesCollection?.items ?? [];
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
          sys {
            id
          }
          header
          subheading
          servicesCollection {
            items {
              ${SERVICE_GRAPHQL_FIELDS}
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetchGraphQL<{
      serviceComponentCollection: { items: ServiceComponent[] };
    }>(query, { id }, preview, { next: { revalidate: 0 } });

    console.log('Service component response:', response);

    if (!response?.serviceComponentCollection) {
      console.warn(`No serviceComponentCollection found for ID: ${id}`);
      return null;
    }

    if (
      !response.serviceComponentCollection.items ||
      response.serviceComponentCollection.items.length === 0
    ) {
      console.warn(`No service component found with ID: ${id}`);
      return null;
    }

    return response.serviceComponentCollection.items[0] ?? null;
  } catch (error) {
    console.error(`Error fetching service component with ID ${id}:`, error);
    return null;
  }
}

/**
 * Fetches all service components
 */
export async function getAllServiceComponents(preview = false): Promise<ServiceComponent[]> {
  const query = `
    query GetAllServiceComponents {
      serviceComponentCollection(limit: 1) {
        items {
          sys {
            id
          }
          header
          servicesCollection {
            items {
              sys {
                id
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL<{
    serviceComponentCollection: { items: ServiceComponent[] };
  }>(query, undefined, preview, { next: { revalidate: 0 } });

  return response.serviceComponentCollection?.items ?? [];
}

/**
 * Fetches a single work content by ID
 */
export async function getWorkContent(id: string, preview = false): Promise<WorkContent | null> {
  const query = `
    query GetWorkContent($id: String!) {
      workContent(id: $id) {
        ${WORK_CONTENT_GRAPHQL_FIELDS}
      }
    }
  `;

  const response = await fetchGraphQL<{ workContent: WorkContent }>(query, { id }, preview, {
    next: { revalidate: 0 }
  });

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
    { next: { revalidate: 0 } }
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
      { next: { revalidate: 0 } }
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

/**
 * Fetches all case studies
 */
export async function getAllCaseStudies(preview = false): Promise<CaseStudy[]> {
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
    { next: { revalidate: 0 } }
  );

  return response.caseStudyCollection?.items ?? [];
}

/**
 * Fetches a single case study by slug
 */
export async function getCaseStudyBySlug(slug: string, preview = false): Promise<CaseStudy | null> {
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
    { next: { revalidate: 0 } }
  );

  return response.caseStudyCollection?.items[0] ?? null;
}

/**
 * Fetches all case study carousels
 */
export async function getAllCaseStudyCarousels(preview = false): Promise<CaseStudyCarousel[]> {
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
    { next: { revalidate: 0 } }
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

  const response = await fetchGraphQL<CaseStudyCarouselResponse>(query, { id }, preview, {
    next: { revalidate: 0 }
  });

  return response.caseStudyCarousel ?? null;
}

/**
 * Fetches all testimonials
 */
export async function getAllTestimonials(preview = false): Promise<Testimonial[]> {
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

  const response = await fetchGraphQL<TestimonialCollectionResponse>(query, undefined, preview, {
    next: { revalidate: 0 }
  });

  return response.testimonialsCollection?.items ?? [];
}

/**
 * Fetches a single testimonial by ID
 */
export async function getTestimonial(id: string, preview = false): Promise<Testimonial | null> {
  const query = `
    query GetTestimonial($id: String!) {
      testimonials(id: $id) {
        ${TESTIMONIAL_FIELDS}
      }
    }
  `;

  const response = await fetchGraphQL<TestimonialResponse>(query, { id }, preview, {
    next: { revalidate: 0 }
  });

  return response.testimonials ?? null;
}

/**
 * Fetches all engage items
 */
export async function getAllEngage(preview = false): Promise<Engage[]> {
  const query = `
    query GetAllEngage($preview: Boolean!) {
      waysToEngageCollection(preview: $preview, limit: 100) {
        items {
          ${ENGAGE_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  const response = await fetchGraphQL<{ waysToEngageCollection: { items: Engage[] } }>(
    query,
    { preview },
    preview,
    { next: { revalidate: 0 } }
  );
  return response.waysToEngageCollection?.items ?? [];
}

/**
 * Fetches a single service work tactics by work ID
 */
export async function getServiceWorkTactics(
  workId: string,
  preview = false
): Promise<{
  __typename: string;
  name: string;
  tactics: string[];
  tacticsImage?: {
    url: string;
    width: number;
    height: number;
  };
} | null> {
  const query = `
    query GetServiceWorkTactics($workId: String!) {
      work(id: $workId, preview: ${preview}) {
        content {
          ... on WorkContent {
            contentCollection {
              items {
                ... on WorkTactics {
                  __typename
                  name
                  tactics
                  tacticsImage {
                    url
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL<{
    work: {
      content: {
        contentCollection: {
          items: Array<{
            __typename: string;
            name: string;
            tactics: string[];
            tacticsImage?: {
              url: string;
              width: number;
              height: number;
            };
          }>;
        };
      };
    };
  }>(query, { workId }, preview, { next: { revalidate: 0 } });

  const workTactics = response.work?.content?.contentCollection?.items?.find(
    (item) => item.__typename === 'WorkTactics'
  );

  return workTactics ?? null;
}

const WORK_CAROUSEL_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  contentCollection {
    items {
      url
      contentType
    }
  }
`;

/**
 * Fetches a work carousel by ID
 */
export async function getWorkCarousel(id: string, preview = false): Promise<WorkCarousel | null> {
  const query = `
    query GetWorkCarousel($id: String!, $preview: Boolean!) {
      workCarousel(id: $id, preview: $preview) {
        ${WORK_CAROUSEL_GRAPHQL_FIELDS}
      }
    }
  `;

  try {
    const response = await fetchGraphQL<{
      workCarousel: WorkCarousel;
    }>(query, { id, preview }, preview);

    return response?.workCarousel ?? null;
  } catch (error) {
    console.error('Error fetching work carousel:', error);
    return null;
  }
}

const CLIENTS_GRAPHQL_FIELDS = `
  sys {
    id
  }
  clientName
  logo {
    sys {
      id
    }
    title
    description
    url
    width
    height
  }
  order
`;

/**
 * Fetches all clients
 */
export async function getAllClients(preview = false): Promise<Clients[]> {
  const query = `
    query GetAllClients($preview: Boolean!) {
      clientsCollection(preview: $preview, order: order_ASC) {
        items {
          ${CLIENTS_GRAPHQL_FIELDS}
        }
        total
      }
    }
  `;

  try {
    const response = await fetchGraphQL<{
      clientsCollection: {
        items: Clients[];
        total: number;
      };
    }>(query, { preview }, preview, { next: { revalidate: 0 } });

    if (!response?.clientsCollection?.items) {
      console.error('No clientsCollection or items in response:', response);
      return [];
    }

    const clients = response.clientsCollection.items;
    console.log('Clients found:', clients.length);

    // Validate and filter out any clients with missing or invalid logos
    const validClients = clients.filter((client: Clients) => {
      const isValid = client.clientName && client.logo?.url;
      if (!isValid) {
        console.warn(`Invalid client data found:`, {
          clientName: client.clientName,
          hasLogo: !!client.logo,
          logoUrl: client.logo?.url
        });
      }
      return isValid;
    });

    console.log('Valid clients with logos:', validClients.length);
    validClients.forEach((client: Clients, index: number) => {
      console.log(`Client ${index + 1}: ${client.clientName}`);
      console.log(`  Logo URL: ${client.logo.url}`);
    });

    return validClients;
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
}

// getAllWorkDirect function has been removed as homepageMedia is now queried in the traditional way

/**
 * Fetches a single work snippet by ID
 */
export async function getWorkSnippet(id: string, preview = false): Promise<WorkSnippet | null> {
  const query = `
    fragment WorkFields on Work {
      ${WORK_FIELDS}
    }

    query GetWorkSnippet($id: String!) {
      workSnippet(id: $id) {
        ${WORK_SNIPPET_FIELDS}
      }
    }
  `;

  try {
    const response = await fetchGraphQL<WorkSnippetResponse>(query, { id }, preview, {
      next: { revalidate: 0 }
    });

    // Check if the response has work snippet samples
    if (response.workSnippet?.samplesCollection?.items) {
      console.log(
        'Work snippet samples found:',
        response.workSnippet.samplesCollection.items.length
      );

      // Log the snippetColor values for debugging
      response.workSnippet.samplesCollection.items.forEach((item, index) => {
        console.log(`Sample ${index} (${item.clientName}):`);

        if (item.snippetColor?.value) {
          console.log(`  - snippetColor: ${item.snippetColor.name} (${item.snippetColor.value})`);
        } else {
          console.log(`  - Missing snippetColor, adding default`);
          item.snippetColor = { name: 'Default', value: '#000000' };
        }
      });
    }

    return response.workSnippet ?? null;
  } catch (error) {
    console.error('Error fetching work snippet:', error);
    return null;
  }
}

/**
 * Fetches a single header grid by entry ID
 */
export async function getHeaderGrid(entryId: string): Promise<HeaderGrid> {
  const query = `
    query {
      headerGrid(id: "${entryId}") {
        ${HEADERGRID_GRAPHQL_FIELDS}
      }
    }
  `;

  const response = await fetchGraphQL<{ headerGrid: HeaderGrid }>(query, undefined, false);

  return response.headerGrid;
}

/**
 * Fetches insights by category
 */
export async function getInsightsByCategory(category: string): Promise<Insight[]> {
  const query = `
    query GetInsightsByCategory($category: String!) {
      insightsCollection(where: { category: $category }, order: postDate_DESC) {
        items {
          ${INSIGHT_GRAPHQL_FIELDS}
        }
      }
    }
  `;

  try {
    const response = await fetchGraphQL<{ insightsCollection: { items: Insight[] } }>(
      query,
      { category },
      false,
      { next: { revalidate: 0 } }
    );
    return response?.insightsCollection?.items || [];
  } catch (error) {
    console.error('Error fetching insights by category:', error);
    return [];
  }
}
