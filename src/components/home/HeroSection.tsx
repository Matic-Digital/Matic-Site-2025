'use client';

import { Box } from '@/components/global/matic-ds';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { TextEffect } from '../ui/text-effect';
import cn from 'classnames';

export function HeroSection() {
  // Use useEffect for isClient state to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);

  // State for extra large screens (> 1440px)
  const [isExtraLargeScreen, setIsExtraLargeScreen] = useState(false);

  useEffect(() => {
    // Set to true after component mounts to indicate client-side rendering
    setIsClient(true);

    // Check if device is mobile
    const checkIfMobile = () => {
      const mobileMediaQuery = window.matchMedia('(max-width: 768px)'); // Standard mobile breakpoint
      setIsMobile(mobileMediaQuery.matches);

      // Add listener for screen size changes
      const handleResize = (e: MediaQueryListEvent) => {
        setIsMobile(e.matches);
      };
      mobileMediaQuery.addEventListener('change', handleResize);

      // Apply specific mobile styles if needed
      if (mobileMediaQuery.matches && videoRef.current) {
        // Reset any transforms that might be applied
        videoRef.current.style.transform = 'none';
      }

      return () => mobileMediaQuery.removeEventListener('change', handleResize);
    };

    // Check if screen is extra large (> 1440px)
    const checkIfExtraLarge = () => {
      const xlMediaQuery = window.matchMedia('(min-width: 1441px)');
      setIsExtraLargeScreen(xlMediaQuery.matches);

      // Add listener for screen size changes
      const handleResize = (e: MediaQueryListEvent) => setIsExtraLargeScreen(e.matches);
      xlMediaQuery.addEventListener('change', handleResize);

      return () => xlMediaQuery.removeEventListener('change', handleResize);
    };

    // Start mobile detection
    checkIfMobile();

    // Start extra large screen detection
    checkIfExtraLarge();

    // No performance check needed
  }, []);

  // Initialize with a default value instead of undefined to ensure consistent initial render
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (isClient) {
      // Set initial scroll state only after client-side hydration
      setHasScrolled(window.scrollY > 0);

      // Debounce function to smooth out rapid scroll events
      const debounce = <T extends (...args: unknown[]) => void>(func: T, wait: number) => {
        let timeout: NodeJS.Timeout;
        return (...args: Parameters<T>) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => func(...args), wait);
        };
      };

      // Main scroll handler
      const calculateProgress = () => {
        if (!sectionRef.current) return;

        const { top, height } = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate progress through the section
        const totalScrollDistance = height - viewportHeight;
        const scrolled = Math.max(0, -top);
        const progress = Math.min(1, scrolled / totalScrollDistance);

        // For mobile devices, apply custom sticky behavior
        if (isMobile && stickyContainerRef.current) {
          // Calculate how far we've scrolled into the section
          const scrolledIntoSection = -top;
          const sectionHeight = height;

          // On mobile, we want to stick for the entire section height
          // Only unstick when we reach the end of the section
          const unstickThreshold = sectionHeight - viewportHeight;

          // We want to be sticky when we're within the section bounds
          const shouldBeSticky = scrolledIntoSection >= 0 && scrolledIntoSection < unstickThreshold;

          // Apply common styles first to reduce code duplication
          Object.assign(stickyContainerRef.current.style, {
            left: '0',
            width: '100%',
            transition: 'transform 0.1s ease-out, position 0.1s ease-out' // Smooth transition for all changes
          });

          if (shouldBeSticky) {
            // When within the section bounds, use fixed positioning
            // Instead of changing position property (which causes jumps),
            // use transform to adjust the position when needed
            Object.assign(stickyContainerRef.current.style, {
              position: 'fixed',
              top: '0',
              transform: 'translate3d(0, 0, 0)',
              zIndex: '10'
            });
          } else if (scrolledIntoSection >= unstickThreshold) {
            // When we're approaching the service items, position at the appropriate offset
            // to make room for the service items
            const bottomOffset = unstickThreshold;
            Object.assign(stickyContainerRef.current.style, {
              position: 'absolute',
              top: `${bottomOffset}px`,
              transform: 'translate3d(0, 0, 0)',
              zIndex: '1'
            });
          } else {
            // When at the top of the section, position at the top
            Object.assign(stickyContainerRef.current.style, {
              position: 'absolute',
              top: '0',
              transform: 'translate3d(0, 0, 0)',
              zIndex: '1'
            });
          }
        }

        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          setScrollProgress(progress);
          setHasScrolled(window.scrollY > 0);
        });
      };

      // Debounced version with longer delay for mobile
      const debouncedCalculateProgress = debounce(calculateProgress, isMobile ? 50 : 15);

      // Initial calculation
      calculateProgress();

      // Add event listener with both immediate and debounced handlers
      window.addEventListener('scroll', calculateProgress, { passive: true });
      window.addEventListener('wheel', debouncedCalculateProgress, { passive: true });

      return () => {
        window.removeEventListener('scroll', calculateProgress);
        window.removeEventListener('wheel', debouncedCalculateProgress);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]); // Only run this effect after isClient is true

  // Add a separate effect to handle video playback issues
  useEffect(() => {
    if (!isClient || !videoRef.current) return;

    // Function to handle video playback issues
    const handleVideoPlaybackIssues = () => {
      const video = videoRef.current;
      if (!video) return;

      // Check if video is actually playing
      const checkPlayback = () => {
        // If video isn't playing after 2 seconds, try to reload it
        if (video.paused || video.ended || video.readyState < 2) {
          console.warn('Video not playing, attempting to reload');
          video.load(); // Try reloading the video
          video.play().catch((err) => console.error('Failed to play video:', err));
        }
      };

      // Check playback after a short delay
      const playbackTimeout = setTimeout(checkPlayback, 2000);

      // Setup event listeners for video
      video.addEventListener('canplaythrough', () => {
        // Video can play, ensure it's playing
        video
          .play()
          .catch((err) => console.error('Failed to play video after canplaythrough:', err));
      });

      // Cleanup function
      return () => {
        clearTimeout(playbackTimeout);
      };
    };

    // Start monitoring video playback
    const cleanup = handleVideoPlaybackIssues();

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, videoRef.current]);

  // Always provide consistent styles for initial render
  const scrollBasedStyles = {
    overlay: 'bg-transparent', // Always transparent to show video background
    text: 'text-white transition-colors duration-300 ease-in-out',
    textColor: 'white',
    // Adding a mix-blend-mode for the text to mask with the zooming video
    textMask: 'text-white'
  };

  return (
    <section
      ref={sectionRef}
      className="bg-base relative -mt-24 w-full h-screen overflow-hidden"
      style={{
        position: 'relative',
        zIndex: 1
      }}
    >
        {/* Main video with optimizations for hardware acceleration */}
        <video
          ref={videoRef}
          src="/bannersphere.mp4?v=2"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full rounded-none border-none object-cover"
          style={{
            // Remove all scroll-based transforms and transitions
            transform: 'none',
            transformOrigin: 'center center',
            /* Additional CSS optimizations for better performance */
            willChange: 'auto',
            backfaceVisibility: 'hidden',
            // Ensure full height coverage
            minHeight: '100vh',
            // Keep video centered
            objectPosition: 'center center'
          }}
          /* Add event listeners to handle video playback issues */
          onError={(e) => console.error('Video error:', e)}
          onStalled={(e) => console.error('Video stalled:', e)}
        />

        {/* No fallback image needed */}
        <div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center ${
            scrollBasedStyles.overlay
          }`}
        >
          <div className="w-full max-w-[100vw] px-6 md:px-12 lg:px-24">
            <h1 className="lg:text-center">
              <div
                className={cn(
                  scrollBasedStyles.text,
                  scrollBasedStyles.textMask,
                  // Use a simpler approach for visibility
                  isClient ? 'opacity-100' : 'opacity-0',
                  'inline-block' // Add inline-block to allow text-center to work on parent
                )}
              >
                {/* Always render the TextEffect component, but conditionally trigger the animation */}
                <TextEffect
                  per="char"
                  delay={0.25}
                  className="max-w-[15ch] text-left font-chalet-newyork text-[64px] font-normal leading-none md:max-w-none md:text-[108px]"
                  variants={{
                    container: {
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          duration: 0.5,
                          staggerChildren: 0.02
                        }
                      }
                    },
                    item: {
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { duration: 0.3 }
                      }
                    }
                  }}
                  trigger={isClient}
                >
                  Change happens here.
                </TextEffect>
              </div>
            </h1>
          </div>
        </div>

        <div className="absolute inset-0 z-30">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="flex w-full max-w-[90rem] justify-end px-6 md:px-12 lg:px-24">
              <div className="mt-[calc(theme(fontSize.8xl)+18rem)] flex flex-col space-y-4 md:mt-[calc(theme(fontSize.8xl)+24rem)] lg:mt-[calc(theme(fontSize.8xl)+18rem)]">
                <div
                  className={cn(scrollBasedStyles.textMask, isClient ? 'opacity-100' : 'opacity-0')}
                  style={{ color: scrollBasedStyles.textColor }}
                >
                  {/* Always render the TextEffect component, but conditionally trigger the animation */}
                  <TextEffect
                    per="line"
                    delay={0.75}
                    className="max-w-xl text-[1.5rem] font-normal md:text-[1.75rem]"
                    trigger={isClient}
                  >
                    We create brand, digital and team solutions for businesses at every stage.
                  </TextEffect>
                </div>
                <Link
                  href="/about"
                  className="group flex items-center gap-4 transition-opacity hover:opacity-80"
                >
                  <div
                    className={cn(
                      scrollBasedStyles.textMask,
                      isClient ? 'opacity-100' : 'opacity-0'
                    )}
                    style={{ color: scrollBasedStyles.textColor }}
                  >
                    {/* Always render the TextEffect component, but conditionally trigger the animation */}
                    <TextEffect
                      per="char"
                      delay={1}
                      className="text-[1.25rem] md:text-[1.5rem]"
                      trigger={isClient}
                    >
                      What we do
                    </TextEffect>
                  </div>
                  <ArrowRight
                    style={{ color: scrollBasedStyles.textColor }}
                    className="h-[1.25em] w-[1.25em] opacity-0 transition-transform [animation:arrow-reveal_0.3s_ease-in-out_1.75s_forwards] group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Box className="absolute bottom-0 z-40 hidden h-[15px] w-full dark:flex">
          <div className="flex-grow bg-darkblue"></div>
          <div className="flex-grow bg-blue"></div>
          <div className="flex-grow bg-green"></div>
          <div className="flex-grow bg-pink"></div>
          <div className="flex-grow bg-orange"></div>
          <div className="flex-grow bg-purple"></div>
        </Box>

        {/* No gradient overlay while scrolling */}
    </section>
  );
}
