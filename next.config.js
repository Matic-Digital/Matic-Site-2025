/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,

  // Learn more here - https://nextjs.org/docs/advanced-features/compiler#module-transpilation
  // Required for UI css to be transpiled correctly 👇
  transpilePackages: ['jotai-devtools'],

  // Configure image domains for Next.js Image component
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.ctfassets.net' },
      { protocol: 'https', hostname: 'downloads.ctfassets.net' },
      { protocol: 'https', hostname: 'assets.ctfassets.net' },
      { protocol: 'https', hostname: 'videos.ctfassets.net' },
      { protocol: 'https', hostname: 'image.mux.com' },
      { protocol: 'https', hostname: 'placehold.co' }
    ]
  },

  // Enable experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb'
    },
    // Enable optimistic navigation for faster page transitions
    optimisticClientCache: true
  },

  // Performance optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production'
  },

  // Environment variable configuration
  env: {
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
  },

  // Redirects configuration
  async redirects() {
    return [
      // Old insight paths to new blog structure
      {
        source: '/insights',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/insights/wave-1-creativity-over-scale',
        destination: '/blog/signals/wave-1-creativity-over-scale',
        permanent: true
      },
      {
        source: '/insights/wave-2-artificial-benevolence',
        destination: '/blog/signals/wave-2-artificial-benevolence',
        permanent: true
      },
      {
        source: '/insights/wave-3-work-in-progress',
        destination: '/blog/signals/wave-3-work-in-progress',
        permanent: true
      },
      {
        source: '/insights/wave-4-designed-to-win-or-fail-spectacularly',
        destination: '/blog/signals/wave-4-designed-to-win-or-fail-spectacularly',
        permanent: true
      },
      {
        source: '/insights/when-the-incentives-end-what-brand-moves-keep-you-growing',
        destination: '/blog/signals/when-the-incentives-end-what-brand-moves-keep-you-growing',
        permanent: true
      },
      {
        source: '/insights/this-is-what-top-teams-get-right-about-employer-brand',
        destination: '/blog/signals/this-is-what-top-teams-get-right-about-employer-brand',
        permanent: true
      },
      {
        source: '/insights/how-solar-brands-can-thrive-after-the-end-of-government-subsidies',
        destination: '/blog/signals/how-solar-brands-can-thrive-after-the-end-of-government-subsidies',
        permanent: true
      },
      {
        source: '/insights/why-fit-tech-apps-are-still-losing-users-and-how-smarter-ux-fixes-it',
        destination: '/blog/signals/why-fit-tech-apps-are-still-losing-users-and-how-smarter-ux-fixes-it',
        permanent: true
      },
      {
        source: '/insights/the-hidden-ux-debt-thats-hurting-conversions',
        destination: '/blog/signals/the-hidden-ux-debt-thats-hurting-conversions',
        permanent: true
      },
      {
        source: '/insights/approaching-and-achieving-product-market-fit',
        destination: '/blog/branding/approaching-and-achieving-product-market-fit',
        permanent: true
      },
      {
        source: '/insights/invisible-loyalty-redefining-personalization',
        destination: '/blog/branding/invisible-loyalty-redefining-personalization',
        permanent: true
      },
      {
        source: '/insights/rethinking-typography-as-brand-infrastructure',
        destination: '/blog/branding/rethinking-typography-as-brand-infrastructure',
        permanent: true
      },
      {
        source: '/insights/thats-so-seo',
        destination: '/blog/technology/thats-so-seo',
        permanent: true
      },
      {
        source: '/insights/in-the-spotlight-matics-ceo-josh-fuller-on-creativity-growth-and-taking',
        destination: '/blog/insights/in-the-spotlight-matics-ceo-josh-fuller-on-creativity-growth-and-taking',
        permanent: true
      },
      {
        source: '/insights/before-ai-kills-us-all-could-it-help-our-smbs-design-and-strategy-ops',
        destination: '/blog/technology/before-ai-kills-us-all-could-it-help-our-smbs-design-and-strategy-ops',
        permanent: true
      },
      {
        source: '/insights/4-ways-embedding-freelancers-at-your-brand-can-be-a-real-gamechanger',
        destination: '/blog/design/4-ways-embedding-freelancers-at-your-brand-can-be-a-real-gamechanger',
        permanent: true
      },
      {
        source: '/insights/enterprise-design-systems-the-people-process-and-success',
        destination: '/blog/design/enterprise-design-systems-the-people-process-and-success',
        permanent: true
      },
      {
        source: '/insights/atomic-design-digital-dna-and-living-brands',
        destination: '/blog/design/atomic-design-digital-dna-and-living-brands',
        permanent: true
      },
      {
        source: '/insights/outgrowing-wordpress-signals-fast-growing-companies-should-pay-attention-to',
        destination: '/blog/technology/outgrowing-wordpress-signals-fast-growing-companies-should-pay-attention-to',
        permanent: true
      },
      {
        source: '/insights/break-the-interview-cycle',
        destination: '/blog/teams/break-the-interview-cycle',
        permanent: true
      },
      {
        source: '/insights/talent-fluidity-why-business-needs-team-pairing-in-2024',
        destination: '/blog/teams/talent-fluidity-why-business-needs-team-pairing-in-2024',
        permanent: true
      },
      {
        source: '/insights/b2b-rebranding-isnt-about-change-its-about-clarity',
        destination: '/blog/branding/b2b-rebranding-isnt-about-change-its-about-clarity',
        permanent: true
      },
      {
        source: '/insights/digital-first-impressions-matter-more-than-ever-is-your-website-helping-or',
        destination: '/blog/insights/digital-first-impressions-matter-more-than-ever-is-your-website-helping-or',
        permanent: true
      },
      {
        source: '/insights/five-ways-an-embedded-team-can-help-your-organization-level-up',
        destination: '/blog/teams/five-ways-an-embedded-team-can-help-your-organization-level-up',
        permanent: true
      },
      {
        source: '/insights/the-b2b-brand-strategy-playbook-from-collateral-to-clarity',
        destination: '/blog/branding/the-b2b-brand-strategy-playbook-from-collateral-to-clarity',
        permanent: true
      },
      {
        source: '/insights/the-worst-rebrands-a-deep-dive-into-logo-fails',
        destination: '/blog/branding/the-worst-rebrands-a-deep-dive-into-logo-fails',
        permanent: true
      },
      {
        source: '/insights/ux-nostalgia-vans-warped-tour',
        destination: '/blog/insights/ux-nostalgia-vans-warped-tour',
        permanent: true
      },
      {
        source: '/insights/defining-your-brand-personality-is-a-strategic-move',
        destination: '/blog/branding/defining-your-brand-personality-is-a-strategic-move',
        permanent: true
      },
      // Test redirect
      {
        source: '/hellothere',
        destination: '/',
        permanent: false
      }
    ];
  }
};

export default nextConfig;
