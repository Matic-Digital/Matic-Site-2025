import { type Document } from "@contentful/rich-text-types";

/**
 * Represents an insight/blog post from Contentful CMS
 */
export interface Insight {
  sys: {
    id: string;
  };
  category: "Insights" | "Updates" | "Changemakers";
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
}

/**
 * Represents a client from Contentful CMS
 */
export interface Client {
  sys: {
    id: string;
  };
  name: string;
  clientLogo: {
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
 * Represents a Capability from Contentful CMS
 */
export interface Capability {
  sys: {
    id: string;
  };
  icon: {
    url: string;
    title: string;
    description: string;
    width: number;
    height: number;
  };
  name: string;
  briefText: string;
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
  backgroundAsset: {
    sys: {
      id: string;
    };
    url: string;
    title: string;
    description: string;
    contentType: string;
    fileName: string;
  } | null;
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
  featuredImage: {
    url: string;
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
 * Processed response for capability listings
 */
export interface CapabilitiesResponse {
  items: Capability[];
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
 * Raw response structure from Contentful GraphQL API
 */
export interface ContentfulResponse<T = Insight | Client | Partner | Signals | CTA | Capability | Engage | Hero | Work> {
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
    capabilityCollection?: {
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
  };
  errors?: Array<{ message: string }>;
}
