import { type Document } from "@contentful/rich-text-types";

/**
 * Base interface for Contentful entries
 */
export interface ContentfulEntry<T> {
  sys: {
    id: string;
  };
  fields: T;
}

/**
 * Represents an insight/blog post from Contentful CMS
 */
export interface Insight {
  sys: {
    id: string;
  };
  category: "Insights" | "Design" | "Technology" | "Signals";
  title: string;
  slug: string;
  postDate: string;
  theme: 'light' | 'soft' | 'medium' | 'dark';
  insightBannerImage: {
    url: string;
  };
  insightContent: InsightContent;
  featured?: boolean;
  socialsCollection?: {
    items: Array<Socials>;
  };
}

/**
 * Represents a Work item from Contentful CMS
 */
export interface Work {
  sys: {
    id: string;
  };
  clientName: string;
  slug: string;
  briefDescription: string;
  sector: 'Technology' | 'Travel';
  timeline?: string;
  sectionColor: {
    name: string;
    value: string;
  };
  sectionSecondaryColor: {
    name: string;
    value: string;
  };
  sectionAccentColor: {
    name: string;
    value: string;
  };
  content: {
    sys: {
      id: string;
    };
  };
  featuredImage: {
    url: string;
    width: number;
    height: number;
    description: string;
  };
  logo: {
    url: string;
    width: number;
    height: number;
    description: string;
  };
  categoriesCollection: {
    items: Array<{
      sys: {
        id: string;
      };
      name: string;
      slug: string;
    }>;
  };
}

/**
 * Represents a social media link from Contentful CMS
 */
export interface Socials {
  sys: {
    id: string;
  };
  name: string;
  logo: {
    url: string;
  };
  url: string;
}

/**
 * Represents a Service from Contentful CMS
 */
export interface Service {
  sys: {
    id: string;
  };
  name: string;
  slug: string;
  bannerIcon?: {
    url: string;
  };
  bannerCopy: string;
  bannerLinkCopy?: string;
}

/**
 * Represents a Service Component from Contentful CMS
 */
export interface ServiceComponent {
  sys: {
    id: string;
  };
  header: string;
  servicesCollection: {
    items: Service[];
  };
}

/**
 * Represents a Split Image Section from Contentful CMS
 */
export interface SplitImageSection {
  sys: {
    id: string;
  };
  name: string;
  copy?: string;
  contentCollection: {
    items: Array<{
      url: string;
      description?: string;
      width: number;
      height: number;
    }>;
  };
}

/**
 * Represents a Framed Asset from Contentful CMS
 */
export interface FramedAsset {
  sys: {
    id: string;
  };
  name: string;
  asset: {
    url: string;
    description?: string;
    width: number;
    height: number;
  };
}

/**
 * Represents a Banner Image from Contentful CMS
 */
export interface BannerImage {
  sys: {
    id: string;
  };
  name: string;
  content: {
    url: string;
    description?: string;
    width: number;
    height: number;
  };
}

/**
 * Represents a Work Carousel from Contentful CMS
 */
export interface WorkCarousel {
  sys: {
    id: string;
  };
  name: string;
  contentCollection: {
    items: Array<{
      url: string;
      contentType: string;
    }>;
  };
}

/**
 * Union type for all possible content items in a Work Content
 */
export interface WorkContentItem {
  sys: {
    id: string;
  };
  __typename: 'WorkCopy' | 'FigmaPrototype' | 'WorkTactics' | 'ImageGridBox' | 'WorkScrollingSection' | 'VideoSection' | 'SplitImageSection' | 'FramedAsset' | 'BannerImage' | 'WorkCarousel';
}

/**
 * Represents a Work Content item from Contentful CMS
 */
export interface WorkContent {
  sys: {
    id: string;
  };
  name: string;
  contentCollection?: {
    items: WorkContentItem[];
  };
}

/**
 * Represents a Video Section from Contentful CMS
 */
export interface VideoSection {
  sys: {
    id: string;
  };
  name?: string;
  video?: {
    url: string;
    contentType: string;
  };
  backupImage?: {
    url: string;
  };
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
  sys: {
    id: string;
  };
  name?: string;
  tactics: string[];
  tacticsImage?: {
    url: string;
  };
}

/**
 * Represents an Image Grid Box section from Contentful CMS
 * Images array must contain exactly 3 images
 */
export interface ImageGridBox {
  sys: {
    id: string;
  };
  name?: string;
  imagesCollection: {
    items: Array<{
      url: string;
      width: number;
      height: number;
      description?: string;
    }>;
  };
  __typename: 'ImageGridBox';
}

/**
 * Represents a Work Scrolling Section from Contentful CMS
 * Images array must contain between 2 and 4 images
 */
export interface WorkScrollingSection {
  sys: {
    id: string;
  };
  name?: string;
  imagesCollection: {
    items: Array<{
      url: string;
      width: number;
      height: number;
      description?: string;
    }>;
  };
  __typename: 'WorkScrollingSection';
}

/**
 * Represents a Figma Prototype section from Contentful CMS
 */
export interface FigmaPrototype {
  sys: {
    id: string;
  };
  name?: string;
  embedLink: string;
}

/**
 * Represents the site footer from Contentful CMS
 */
export interface Footer {
  sys: {
    id: string;
  };
  tagline: string;
  taglineBackground?: {
    url: string;
  };
  paragraph: string;
  socialsCollection: {
    items: Array<Socials>;
  };
  address: string;
  phone: string;
  email: string;
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
 * Raw response structure from Contentful GraphQL API
 */
export interface ContentfulResponse<T> {
  data?: {
    insightsCollection?: {
      items: T[];
      total: number;
    };
    servicesCollection?: {
      items: T[];
      total: number;
    };
    serviceComponentCollection?: {
      items: T[];
      total: number;
    };
    workCollection?: {
      items: T[];
      total: number;
    };
    workContentCollection?: {
      items: T[];
      total: number;
    };
    socialsCollection?: {
      items: T[];
      total: number;
    };
    service?: T | null;
    serviceComponent?: T | null;
    workContent?: T;
    footerCollection?: {
      items: T[];
      total: number;
    };
    footer?: T;
  };
  errors?: Array<{ message: string }>;
}

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
        sys: {
          id: string;
        };
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
  sys: {
    id: string;
  };
  engagementHeader: string;
  engagementCopy: string;
  bannerImage: {
    url: string;
    width: number;
    height: number;
  };
  engagementLink: string;
  signUpCopy: string;
}
