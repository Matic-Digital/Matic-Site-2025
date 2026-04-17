'use client';

import { Container, Section, Box } from '@/components/global/matic-ds';
import type { Industry } from '@/types/contentful';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type LottieAnimationData = Record<string, unknown>;

interface IndustryCardsProps {
  industries: Industry[];
  title?: string;
  description?: string;
}

interface IndustryCardProps {
  industry: Industry;
}

function IndustryCard({ industry }: IndustryCardProps) {
  const [lottieData, setLottieData] = useState<LottieAnimationData | null>(null);
  const [isLoadingLottie, setIsLoadingLottie] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  useEffect(() => {
    if (!isMounted || !industry.lottieIcon) return;

    setIsLoadingLottie(true);

    fetch(industry.lottieIcon)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        return response.json();
      })
      .then((data: LottieAnimationData) => {
        setLottieData(data);
        setIsLoadingLottie(false);

        // Once loaded, go to frame 15 and pause
        setTimeout(() => {
          if (lottieRef.current) {
            lottieRef.current.goToAndStop(15, true);
          }
        }, 500);
      })
      .catch(() => {
        setIsLoadingLottie(false);
      });
  }, [isMounted, industry.lottieIcon]);

  return (
    <div className="h-full">
      <Link
        key={industry.sys.id}
        href={`/services/${industry.slug}`}
        className="group relative block h-full overflow-hidden rounded-[0.5rem]"
      >
        <div 
          className="flex h-full w-full cursor-pointer rounded-[0.5rem] p-[2rem] transition-all duration-300"
          style={{ 
            background: 'rgba(255, 255, 255, 0.10)',
            minHeight: '34.6875rem'
          }}
        >
          <div 
            className="flex h-full w-full flex-col justify-between transition-opacity duration-700"
            style={{ opacity: hasBeenVisible ? 0.9 : 1 }}
          >
        {/* Top Content Section */}
        <div className="w-full">
          {/* Lottie Icon - Above Title */}
          {industry.lottieIcon && isMounted && lottieData ? (
            <div className="relative mb-[5.62rem] flex h-[5.4375rem] w-[5.4375rem] shrink-0 items-center justify-center overflow-hidden">
              <Lottie
                lottieRef={lottieRef}
                animationData={lottieData}
                loop={false}
                autoplay={true}
                onComplete={() => {
                  // Animation completed, go to frame 15 and pause
                  if (lottieRef.current) {
                    lottieRef.current.goToAndStop(15, true);
                  }
                }}
                style={{
                  width: '87px',
                  height: '87px'
                }}
              />
            </div>
          ) : industry.lottieIcon && isLoadingLottie ? (
            <div className="relative mb-[5.62rem] flex h-[5.4375rem] w-[5.4375rem] shrink-0 items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-white/30"></div>
            </div>
          ) : (
            <div className="mb-[5.62rem] h-[5.4375rem] w-[5.4375rem] shrink-0" />
          )}

          <div className="flex flex-col">
            <div className="mb-[1rem] flex items-center gap-[1.5rem]">
              <h3 className="text-[1.5rem] font-[400] leading-[120%] text-white md:text-[2rem]">
                {industry.name}
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="18"
                viewBox="0 0 25 18"
                fill="none"
                className="shrink-0"
              >
                <g clipPath="url(#clip0_1192_10573)">
                  <path d="M20.9443 7.65625H0V10.3414H20.9443V7.65625Z" fill="white" />
                  <path
                    d="M15.1362 18L13.2422 16.1175L20.4063 9L13.2422 1.88252L15.1362 0L24.1879 9L15.1362 18Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1192_10573">
                    <rect width="24.1875" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            {industry.cardCopy && (
              <p className="text-[1rem] font-[400] leading-[140%] text-white md:text-[1.125rem]">
                {industry.cardCopy}
              </p>
            )}
          </div>
        </div>

        {/* Past Clients Section - Bottom */}
        {industry.pastClientsCollection && industry.pastClientsCollection.items.length > 0 && (
          <div className="flex w-full items-center gap-[1.5rem] opacity-60">
            <span className="whitespace-nowrap text-[1rem] font-[400] text-white">
              Past clients
            </span>
            <div className="flex items-center gap-[1rem]">
              {industry.pastClientsCollection.items.slice(0, 2).map((client) => (
                <div
                  key={client.sys.id}
                  className="relative flex h-[3.8rem] w-[6rem] items-center justify-center"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={client.url}
                      alt={client.title || 'Client logo'}
                      fill
                      className="object-contain"
                      style={{ border: 'none', borderRadius: '0' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function IndustryCards({ industries, title, description }: IndustryCardsProps) {
  const [bgOffset, setBgOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Filter industries to only include Default and NoPage variants
  const filteredIndustries = industries.filter(
    (industry) =>
      !industry.pageVariant ||
      industry.pageVariant === 'Default' ||
      industry.pageVariant === 'NoPage'
  );

  // Split industries into two columns
  const firstColumn = filteredIndustries.slice(0, Math.ceil(filteredIndustries.length * 0.6)); // 60% in first column
  const secondColumn = filteredIndustries.slice(Math.ceil(filteredIndustries.length * 0.6)); // 40% in second column

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress through the section
      // When section enters viewport from bottom: progress = 0
      // When section exits viewport from top: progress = 1
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight))
      );

      // Move background up by 15rem as we scroll (0 to -15rem)
      const offset = scrollProgress * -15;
      setBgOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative">
      <Section className="relative bg-maticblack text-white">
        <div
          className="absolute left-0 right-0 bg-cover bg-top transition-transform duration-100 ease-out"
          style={{
            backgroundImage: 'url(/industryCard-bg.svg)',
            top: '35rem',
            bottom: '-15rem',
            transform: `translateY(${bgOffset}rem)`
          }}
        />
        <Container className="relative z-10">
          {/* Header Section - Above columns in its own div */}
          {(title || description) && (
            <div className="py-[8rem] md:py-[12rem]">
              {title && (
                <h2
                  className="mb-[3.06rem] text-[3rem] font-[400] leading-[110%] text-white"
                  style={{ letterSpacing: '-0.06rem' }}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="max-w-[45rem] text-[1.75rem] font-[400] leading-[140%]">
                  {description}
                </p>
              )}
            </div>
          )}

          <Box className="pb-[8rem] md:pb-[12rem]">
            <div className="grid grid-cols-1 gap-[7rem] md:grid-cols-2 md:gap-x-[6.3rem] md:gap-y-[7rem]">
              <div className="flex flex-col gap-[7rem]">
                {filteredIndustries.filter((_, index) => index % 2 === 0).map((industry) => (
                  <IndustryCard key={industry.sys.id} industry={industry} />
                ))}
              </div>
              <div className="flex flex-col gap-[7rem] md:mt-[12.19rem]">
                {filteredIndustries.filter((_, index) => index % 2 === 1).map((industry) => (
                  <IndustryCard key={industry.sys.id} industry={industry} />
                ))}
                
                {/* CTA Card */}
                <Link 
                  href="/contact"
                  className="flex h-full cursor-pointer rounded-[0.5rem] p-[2rem]"
                  style={{ minHeight: '34.6875rem' }}
                >
                  <div className="flex h-full w-full flex-col items-start justify-center gap-[2rem]">
                    <h3 className="text-[1.5rem] font-[400] leading-[140%] text-white" style={{ fontFamily: 'Inter' }}>
                      We also have experience with Insurance, Logistics, Startup, Foodtech, Non-profit, and eCommerce.
                    </h3>
                    <div className="inline-flex items-center gap-[1rem] rounded-[0.5rem] bg-white px-[2rem] py-[1rem] text-[1rem] font-[600] text-maticblack transition-all duration-300 hover:bg-opacity-90">
                      Work with us
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </Box>
        </Container>
      </Section>
    </div>
  );
}
