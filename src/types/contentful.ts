import { type Document } from "@contentful/rich-text-types";

/**
 * Represents an insight/blog post from Contentful CMS
 */
export interface Insight {
  sys: {
    id: string;
  };
  category: "Perspectives" | "Features" | "Team Pairing" | "Design Systems";
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
 * Raw response structure from Contentful GraphQL API
 */
export interface ContentfulResponse<T = Insight | Client | Partner> {
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
  };
  errors?: Array<{ message: string }>;
}
