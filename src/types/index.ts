// export all types from each type file
export * from "./contentful";

export interface TeamMember {
  sys: {
    id: string;
  };
  fullName: string;
  role: string;
  headshot: {
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
  };
}

export interface TeamGrid {
  sys: {
    id: string;
  };
  heading: string;
  subheading: string;
  teamMembersCollection: {
    items: TeamMember[];
  };
}

export interface LogoCarousel {
  carouselImagesCollection?: {
    items?: Array<{
      url: string;
      title: string;
    }>;
  };
}

export interface EngageItem {
  sys: {
    id: string;
  };
  title: string;
  description: string;
  image: {
    url: string;
  };
  link: string;
}

export interface EngageCollection {
  items: EngageItem[];
}
