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
  insightBannerImage: {
    url: string;
  };
  insightContent: {
    json: Document;
    links: {
      assets: {
        block: Array<{
          sys: {
            id: string;
          };
          url: string;
          description: string;
        }>;
      };
    };
  };
  featured?: boolean;
}

/**
 * Represents a client from Contentful CMS
 */
export interface Client {
  sys: {
    id: string;
  };
  name: string;
  clientLogo?: {
    url: string;
  };
}

/**
 * Represents a partner from Contentful CMS
 */
export interface Partner {
  sys: {
    id: string;
  };
  name: string;
  logo: {
    url: string;
  };
}

/**
 * Represents a signal from Contentful CMS
 */
export interface Signals {
  sys: {
    id: string;
  };
  logo?: {
    url: string;
  };
  tagline: string;
  subheader: string;
}

/**
 * Represents a Call to Action (CTA) from Contentful CMS
 */
export interface CTA {
  sys: {
    id: string;
  };
  sectionHeader: string;
  sectionSubheader?: string;
  sectionCopy?: string;
}

/**
 * Represents a Way to Engage from Contentful CMS
 */
export interface Engage {
  sys: {
    id: string;
  };
  bannerImage: {
    url: string;
  };
  engagementHeader: string;
  engagementCopy: string;
  engagementLink: string;
  signUpCopy: string;
}

/**
 * Represents a Hero from Contentful CMS
 */
export interface Hero {
  sys: {
    id: string;
  };
  tagline: string;
  subheader: string;
  backgroundAsset?: {
    sys: {
      id: string;
    };
    url: string;
    title: string;
    description: string;
    contentType: string;
    fileName: string;
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
  briefDescription?: string;
  featuredImage: {
    url: string;
  };
  logo?: {
    url: string;
  };
  categoriesCollection?: {
    items: Array<{
      sys: {
        id: string;
      };
      name: string;
      slug: string;
    }>;
  };
  sector?: "Technology" | "Travel";
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
 * Processed response for insight listings
 */
export interface InsightsResponse {
  items: Insight[];
  total: number;
  hasMore: boolean;
  totalPages: number;
}

/**
 * Processed response for client listings
 */
export interface ClientsResponse {
  items: Client[];
  total: number;
}

/**
 * Processed response for partner listings
 */
export interface PartnersResponse {
  items: Partner[];
  total: number;
}

/**
 * Processed response for signal listings
 */
export interface SignalsResponse {
  items: Signals[];
  total: number;
}

/**
 * Processed response for CTA listings
 */
export interface CTAResponse {
  items: CTA[];
  total: number;
}

/**
 * Processed response for ways to engage listings
 */
export interface EngageResponse {
  items: Engage[];
  total: number;
}

/**
 * Processed response for hero listings
 */
export interface HeroResponse {
  items: Hero[];
  total: number;
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
  paragraph?: string;
  socialsCollection?: {
    items: Array<{
      sys: {
        id: string;
      };
      name: string;
      logo: {
        url: string;
      };
      url: string;
    }>;
  };
  address?: string;
  phone?: string;
  email?: string;
}

/**
 * Processed response for footer
 */
export interface FooterResponse {
  items: Footer[];
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
    clientsCollection?: {
      items: T[];
      total: number;
    };
    partnersCollection?: {
      items: T[];
      total: number;
    };
    signalsCollection?: {
      items: T[];
      total: number;
    };
    callToActionCollection?: {
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
    waysToEngageCollection?: {
      items: T[];
      total: number;
    };
    heroCollection?: {
      items: T[];
      total: number;
    };
    workCollection?: {
      items: T[];
      total: number;
    };
    socialsCollection?: {
      items: T[];
      total: number;
    };
    footerCollection?: {
      items: T[];
      total: number;
    };
    callToAction?: T;
    service?: T | null;
    serviceComponent?: T | null;
    waysToEngage?: T;
    socials?: T;
    footer?: T;
  };
  errors?: Array<{ message: string }>;
}
