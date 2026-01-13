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
  const [isMobile, setIsMobile] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);


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


    // Start mobile detection
    checkIfMobile();

    // No performance check needed
  }, []);


  useEffect(() => {
    if (isClient) {
      // Set initial scroll state only after client-side hydration

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
          // Scroll handling logic removed
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

  // Add a separate effect to handle video loading and playback
  useEffect(() => {
    if (!isClient || !videoRef.current) return;

    const video = videoRef.current;
    
    // Try to play the video after a short delay
    const playVideo = () => {
      try {
        console.log('Attempting to play video...');
        video.load(); // Reload the video sources
        
        setTimeout(() => {
          video.play().catch((err) => {
            console.error('Failed to autoplay video:', err);
          });
        }, 100);
      } catch (error) {
        console.error('Error playing video:', error);
      }
    };

    // Start video playback
    playVideo();

    // Add event listeners for better debugging
    const handleLoadedData = () => console.log('Video loaded data successfully');
    const handleCanPlay = () => {
      console.log('Video can play');
      video.play().catch((err) => console.error('Failed to play on canplay:', err));
    };
    
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);

    // Cleanup function
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

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
      className="bg-base relative -mt-24 h-screen w-full overflow-hidden"
      style={{
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Fallback background when video fails */}
      {videoError && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
          }}
        />
      )}
      
      {/* Main video with optimizations for hardware acceleration */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
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
        onError={(e: React.SyntheticEvent<HTMLVideoElement>) => {
          const video = e.currentTarget as HTMLVideoElement;
          const errorDetails = {
            errorCode: video.error?.code || 'No error code',
            errorMessage: video.error?.message || 'No error message',
            networkState: video.networkState,
            networkStateText: ['NETWORK_EMPTY', 'NETWORK_IDLE', 'NETWORK_LOADING', 'NETWORK_NO_SOURCE'][video.networkState] || 'Unknown',
            readyState: video.readyState,
            readyStateText: ['HAVE_NOTHING', 'HAVE_METADATA', 'HAVE_CURRENT_DATA', 'HAVE_FUTURE_DATA', 'HAVE_ENOUGH_DATA'][video.readyState] || 'Unknown',
            src: video.src,
            currentSrc: video.currentSrc,
            videoWidth: video.videoWidth,
            videoHeight: video.videoHeight,
            duration: video.duration
          };
          console.error('Video error details:', errorDetails);
          
          // Try to reload the video once
          if (!video.dataset.reloadAttempted) {
            video.dataset.reloadAttempted = 'true';
            console.log('Attempting to reload video...');
            setTimeout(() => {
              video.load();
            }, 1000);
          } else {
            // If reload failed, show fallback
            console.log('Video reload failed, showing fallback background');
            setVideoError(true);
          }
        }}
        onStalled={(e: React.SyntheticEvent<HTMLVideoElement>) => {
          const video = e.currentTarget as HTMLVideoElement;
          console.warn('Video stalled:', {
            networkState: video.networkState,
            readyState: video.readyState,
            buffered: video.buffered.length > 0 ? video.buffered.end(0) : 0
          });
        }}
        onLoadStart={() => console.log('Video load started')}
        onCanPlay={() => console.log('Video can play')}
        onCanPlayThrough={() => console.log('Video can play through')}
      >
        <source src="/bannersphere.mp4" type="video/mp4" />
      </video>

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
                  className="max-w-[39rem] text-[1.5rem] font-normal md:text-[1.75rem]"
                  trigger={isClient}
                >
                  We design brand systems and digital experiences for B2B companies ready to scale.
                </TextEffect>
              </div>
              <Link
                href="/work"
                className="group flex items-center gap-4 transition-opacity hover:opacity-80"
              >
                <div
                  className={cn(scrollBasedStyles.textMask, isClient ? 'opacity-100' : 'opacity-0')}
                  style={{ color: scrollBasedStyles.textColor }}
                >
                  {/* Always render the TextEffect component, but conditionally trigger the animation */}
                  <TextEffect
                    per="char"
                    delay={1}
                    className="text-[1.25rem] md:text-[1.5rem]"
                    trigger={isClient}
                  >
                    See our work
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
