import { type Document } from '@contentful/rich-text-types';

/**
 * Base interface for Contentful entries
 */
export interface ContentfulEntry<T> {
  sys: ContentfulSys;
  fields: T;
  metadata: {
    tags: unknown[];
  };
}

/**
 * Represents an insight/blog post from Contentful CMS
 */
export interface Insight {
  sys: ContentfulSys;
  category: 'Insights' | 'Design' | 'Technology' | 'Signals';
  title: string;
  slug: string;
  author: {
    sys: ContentfulSys;
    name: string;
    title: string;
    slug?: string;
    linkedIn: string;
  };
  postDate: string;
  theme: 'light' | 'soft' | 'medium' | 'dark';
  insightBannerImage: ContentfulAsset;
  insightContent: InsightContent;
  closingThoughts?: InsightContent;
  featured?: boolean;
  socialsCollection?: {
    items: Array<Socials>;
  };
  // Optional SEO fields
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: ContentfulAsset;
}

/**
 * Represents a Team Member from Contentful CMS
 */
export interface TeamMember {
  sys: ContentfulSys;
  name: string;
  title: string;
  location?: string;
  slug: string;
  linkedIn?: string;
  bio?: string;
  headshot?: ContentfulAsset;
  socialsCollection?: {
    items: Array<Socials>;
  };
}

/**
 * Represents a Work item from Contentful CMS
 */
export interface Work {
  sys: ContentfulSys;
  clientName: string;
  slug: string;
  homepageMedia?: ContentfulAsset;
  featuredImage: ContentfulAsset;
  briefDescription: string;
  logo: ContentfulAsset;
  order?: number;
  categoriesCollection: {
    items: Array<{
      sys: ContentfulSys;
      name: string;
      slug: string;
    }>;
  };
  sector: 'Technology' | 'Travel' | 'Energy';
  sectionColor: ContentfulColor;
  sectionSecondaryColor: ContentfulColor;
  sectionAccentColor: ContentfulColor;
  snippetColor: ContentfulColor;
  // Optional SEO fields
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: ContentfulAsset;
  content: {
    sys: {
      id: string;
    };
  };
  timeline: string;
  isFeatured: boolean;
}

/**
 * Represents a social media link from Contentful CMS
 */
export interface Socials {
  sys: ContentfulSys;
  name: string;
  logo: ContentfulAsset;
  url: string;
}

/**
 * Represents a Service from Contentful CMS
 */
export interface Service {
  sys: ContentfulSys;
  name: string;
  slug: string;
  bannerIcon?: ContentfulAsset;
  hoverIcon?: ContentfulAsset;
  bannerCopy: string;
  bannerLinkCopy?: string;
  productList?: string[];
  sampleProject?: {
    sys: ContentfulSys;
    clientName: string;
    slug: string;
    briefDescription: string;
    sector: 'Technology' | 'Travel' | 'Energy';
    timeline: string;
    sectionColor: ContentfulColor;
    sectionSecondaryColor: ContentfulColor;
    sectionAccentColor: ContentfulColor;
    featuredImage?: ContentfulAsset;
    serviceAsset?: ContentfulAsset;
  };
}

/**
 * Represents an Industry from Contentful CMS
 */
export interface Industry {
  sys: ContentfulSys;
  name: string;
  slug: string;
  mainImage: ContentfulAsset;
  heroOverline: string;
  heroHeader: string;
  heroCtaTitle: string;
  heroCtaDescription: string;
  workSampleSliderOverline?: string;
  workSampleSliderHeader?: string;
  serviceComponent?: ServiceComponent;
  workSamplesCollection?: {
    items: Work[];
  };
  // Optional SEO fields
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: ContentfulAsset;
}

/**
 * Represents a Service Component from Contentful CMS
 */
export interface ServiceComponent {
  sys: ContentfulSys;
  header: string;
  subheading?: string;
  servicesCollection: {
    items: Service[];
  };
}

/**
 * Represents a Split Image Section from Contentful CMS
 */
export interface SplitImageSection {
  sys: ContentfulSys;
  name: string;
  copy?: string;
  contentCollection: {
    items: Array<ContentfulAsset>;
  };
  lottieUrl1?: string;
  lottieUrl2?: string;
}

/**
 * Represents a Framed Asset from Contentful CMS
 */
export interface FramedAsset {
  sys: ContentfulSys;
  name: string;
  asset: ContentfulAsset;
}

/**
 * Represents a Banner Image from Contentful CMS
 */
export interface BannerImage {
  sys: ContentfulSys;
  name: string;
  content: ContentfulAsset;
  lottieUrl?: string;
  variant?: 'Base' | 'Min-Height 1440';
}

/**
 * Represents a Work Carousel from Contentful CMS
 */
export interface WorkCarousel {
  sys: ContentfulSys;
  name: string;
  contentCollection: {
    items: Array<{
      url: string;
      contentType: string;
    }>;
  };
}

/**
 * Represents an Image Comparison from Contentful CMS
 */
export interface ImageComparison {
  sys: ContentfulSys;
  name: string;
  beforeImage: ContentfulAsset;
  afterImage: ContentfulAsset;
}

/**
 * Union type for all possible content items in a Work Content
 */
export interface WorkContentItem {
  sys: ContentfulSys;
  __typename:
    | 'WorkCopy'
    | 'WorkTactics'
    | 'ImageGridBox'
    | 'WorkScrollingSection'
    | 'VideoSection'
    | 'SplitImageSection'
    | 'FramedAsset'
    | 'BannerImage'
    | 'WorkCarousel'
    | 'ImageComparison';
}

/**
 * Represents a Work Content item from Contentful CMS
 */
export interface WorkContent {
  sys: ContentfulSys;
  name: string;
  contentCollection?: {
    items: WorkContentItem[];
  };
}

/**
 * Represents a Video Section from Contentful CMS
 */
export interface VideoSection {
  sys: ContentfulSys;
  name?: string;
  video?: {
    url: string;
    contentType: string;
  };
  backupImage?: ContentfulAsset;
}

/**
 * Props for the WorkCopy component
 */
export interface WorkCopyProps {
  eyebrowHeader?: string;
  header: string;
  copy?: string;
}

/**
 * Represents a Work Tactics section from Contentful CMS
 */
export interface WorkTactics {
  sys: ContentfulSys;
  name?: string;
  tactics: string[];
  tacticsImage?: ContentfulAsset;
}

/**
 * Represents an Image Grid Box section from Contentful CMS
 * Images array must contain exactly 3 images
 */
export interface ImageGridBox {
  sys: ContentfulSys;
  name?: string;
  imagesCollection: {
    items: Array<ContentfulAsset>;
  };
  __typename: 'ImageGridBox';
  lottieUrl1?: string;
  lottieUrl2?: string;
  lottieUrl3?: string;
}

/**
 * Represents a Work Scrolling Section from Contentful CMS
 * Images array must contain between 2 and 4 images
 */
export interface WorkScrollingSection {
  sys: ContentfulSys;
  name?: string;
  imagesCollection: {
    items: Array<ContentfulAsset>;
  };
  lottieUrl1?: string;
  lottieUrl2?: string;
  __typename: 'WorkScrollingSection';
}

/**
 * Represents the site footer from Contentful CMS
 */
export interface Footer {
  sys: ContentfulSys;
  tagline: string;
  taglineBackground?: ContentfulAsset;
  paragraph: string;
  socialsCollection: {
    items: Array<Socials>;
  };
  address: string;
  phone: string;
  email: string;
}

export interface WorkSnippet {
  heading: string;
  samplesCollection: {
    items: Work[];
  };
}

/**
 * Processed response for work content
 */
export interface WorkContentResponse {
  items: WorkContent[];
  total: number;
}

/**
 * Processed response for insight listings
 */
export interface InsightsResponse {
  items: Insight[];
  total: number;
  hasMore: boolean;
  totalPages: number;
}

/**
 * Processed response for work listings
 */
export interface WorkResponse {
  items: Work[];
  total: number;
}

/**
 * Processed response for socials listings
 */
export interface SocialsResponse {
  items: Socials[];
  total: number;
}

/**
 * Processed response for service listings
 */
export interface ServicesResponse {
  items: Service[];
  total: number;
}

/**
 * Processed response for service component listings
 */
export interface ServiceComponentResponse {
  items: ServiceComponent[];
  total: number;
}

/**
 * Represents a Case Study from Contentful CMS
 */
export interface CaseStudy {
  sys: ContentfulSys;
  name: string;
  sampleReference: {
    sys: ContentfulSys;
    clientName: string;
    slug: string;
    briefDescription: string;
    sector: 'Technology' | 'Travel' | 'Energy';
    timeline: string;
    sectionColor: ContentfulColor;
    sectionSecondaryColor: ContentfulColor;
    sectionAccentColor: ContentfulColor;
  };
  previewAsset: ContentfulAsset;
}

/**
 * Represents a Case Study Carousel from Contentful CMS
 */
export interface CaseStudyCarousel {
  sys: ContentfulSys;
  carouselHeader: string;
  carouselSubheader?: string;
  carouselContent: {
    items: CaseStudy[];
  };
}

/**
 * Processed response for case study listings
 */
export interface CaseStudyResponse {
  items: CaseStudy[];
  total: number;
}

/**
 * Processed response for case study carousel listings
 */
export interface CaseStudyCarouselResponse {
  items: CaseStudyCarousel[];
  total: number;
}

/**
 * Represents a Testimonial from Contentful CMS
 */
export interface Testimonial {
  sys: ContentfulSys;
  quote: string;
  reviewer: string;
  position: string;
}

/**
 * Processed response for testimonial listings
 */
export interface TestimonialResponse {
  items: Testimonial[];
  total: number;
}

/**
 * Raw response structure from Contentful GraphQL API
 */
export type ContentfulResponse<T> = {
  sys: ContentfulSys;
  fields: T;
  metadata: {
    tags: unknown[];
  };
};

/**
 * Raw response structure from Contentful REST API
 */
export type ContentfulRestResponse<T> = {
  sys: ContentfulSys;
  fields: T;
  metadata: {
    tags: unknown[];
  };
};

/**
 * Options for preview mode
 */
export interface PreviewOptions {
  preview?: boolean;
}

/**
 * Represents the Contentful asset links structure
 */
export interface InsightContent {
  json: Document;
  links?: {
    assets?: {
      block?: Array<{
        sys: ContentfulSys;
        url: string;
        description?: string;
        width?: number;
        height?: number;
      }>;
    };
  };
}

/**
 * Represents an Engage item from Contentful CMS
 */
export interface Engage {
  sys: ContentfulSys;
  engagementHeader: string;
  engagementCopy: string;
  bannerImage: ContentfulAsset;
  engagementLink: string;
  signUpCopy: string;
}

/**
 * Represents a collection of items from Contentful CMS
 */
export type ContentfulCollection<T> = {
  total: number;
  skip: number;
  limit: number;
  items: T[];
};

/**
 * Represents a link to a Contentful item
 */
export type ContentfulLink = {
  id: string;
  type: string;
  linkType: string;
};

/**
 * Represents the sys metadata for a Contentful item
 */
export type ContentfulSys = {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  contentType?: {
    sys: ContentfulLink;
  };
};

/**
 * Represents a Contentful asset
 */
export interface ContentfulAsset {
  sys: {
    id: string;
  };
  title: string;
  description: string;
  url: string;
  width: number;
  height: number;
  size: number;
  fileName: string;
  contentType: string;
}

/**
 * Processed response for team member listings
 */
export interface TeamMemberResponse {
  items: TeamMember[];
  total: number;
}

/**
 * Represents a Team Grid section from Contentful CMS
 */
// export interface TeamGrid {
//   sys: ContentfulSys;
//   heading: string;
//   subheading: string;
//   teamMembersCollection: {
//     items: TeamMember[];
//   };
// }

/**
 * Processed response for team grid listings
 */
// export interface TeamGridResponse {
//   items: TeamGrid[];
//   total: number;
// }

/**
 * Represents a color value in Contentful
 */
export interface ContentfulColor {
  name: string;
  value: string;
}

/**
 * Represents a Client from Contentful CMS
 */
export interface Clients {
  sys: ContentfulSys;
  clientName: string;
  logo: ContentfulAsset;
  order: number;
}

/**
 * Processed response for clients listings
 */
export interface ClientsResponse {
  items: Clients[];
  total: number;
}

export interface HeaderGrid {
  sys: ContentfulSys;
  name: string;
  heading1: string;
  content1: string;
  heading2: string;
  content2: string;
  heading3: string;
  content3: string;
  heading4: string;
  content4: string;
  showRating: boolean;
  ratingStars: ContentfulAsset;
}
