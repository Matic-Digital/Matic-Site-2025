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
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Set to true after component mounts to indicate client-side rendering
    setIsClient(true);
    
    // Check if device is mobile
    const checkIfMobile = () => {
      const mobileMediaQuery = window.matchMedia('(max-width: 768px)'); // Standard mobile breakpoint
      setIsMobile(mobileMediaQuery.matches);
      
      // Add listener for screen size changes
      const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
      mobileMediaQuery.addEventListener('change', handleResize);
      
      // Apply specific mobile styles if needed
      if (mobileMediaQuery.matches && videoRef.current) {
        // Reset any transforms that might be applied
        videoRef.current.style.transform = 'none';
      }
      
      return () => mobileMediaQuery.removeEventListener('change', handleResize);
    };
    
    // Start mobile detection
    const mobileCleanup = checkIfMobile();
    
    // Check for hardware acceleration/performance capabilities
    const checkPerformance = () => {
      // Simple performance check - if the device has limited CPU
      const isLowEnd = window.navigator.hardwareConcurrency <= 4;
      
      // Check if transform animations are supported well
      let hasGoodPerformance = true;
      try {
        // Create a test element and measure animation performance
        const testEl = document.createElement('div');
        document.body.appendChild(testEl);
        testEl.style.position = 'absolute';
        testEl.style.opacity = '0';
        testEl.style.transform = 'translateZ(0)';
        
        // Force layout calculation
        testEl.getBoundingClientRect();
        
        // If we can't apply these styles, performance might be limited
        if (getComputedStyle(testEl).transform !== 'matrix(1, 0, 0, 1, 0, 0)') {
          hasGoodPerformance = false;
        }
        
        document.body.removeChild(testEl);
      } catch (e) {
        hasGoodPerformance = false;
      }
      
      setIsLowPowerMode(isLowEnd || !hasGoodPerformance);
    };
    
    checkPerformance();
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
        // If video isn't playing after 2 seconds, switch to low power mode
        if (video.paused || video.ended || video.readyState < 2) {
          setIsLowPowerMode(true);
          video.load(); // Try reloading the video
          video.play().catch(() => setIsLowPowerMode(true));
        }
      };
      
      // Check playback after a short delay
      const playbackTimeout = setTimeout(checkPlayback, 2000);
      
      // Setup event listeners for video
      video.addEventListener('canplaythrough', () => {
        // Video can play, ensure it's playing
        video.play().catch(() => setIsLowPowerMode(true));
      });
      
      // Cleanup function
      return () => {
        clearTimeout(playbackTimeout);
      };
    };
    
    // Start monitoring video playback
    const cleanup = handleVideoPlaybackIssues();
    
    return cleanup;
  }, [isClient, videoRef.current]);

  // Always provide consistent styles for initial render
  const scrollBasedStyles = {
    overlay: !hasScrolled
      ? 'bg-background mix-blend-screen'
      : 'bg-background bg-opacity-0 mix-blend-screen transition-all duration-300 ease-in-out',
    text: !hasScrolled
      ? 'mix-blend-multiply'
      : 'text-white transition-colors duration-300 ease-in-out',
    textColor: hasScrolled ? 'white' : 'black',
    // Adding a mix-blend-mode for the text to mask with the zooming video
    textMask: !hasScrolled ? 'mix-blend-multiply' : 'mix-blend-difference'
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-base -mt-24"
      style={{
        // Make the section taller than viewport (2x viewport height)
        height: '200vh',
        position: 'relative'
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Main video with optimizations for hardware acceleration */}
        <video
          ref={videoRef}
          src="/bannersphere.mp4"
          poster="/bannersphere-poster.jpg" /* Add poster for initial display */
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full rounded-none border-none object-cover"
          style={{
            // Only apply zoom effect if not mobile and not in low power mode
            transform: !isLowPowerMode && !isMobile 
              ? `scale(${1.75 - scrollProgress * 0.75})` 
              : 'none', // No transform on mobile - we'll use objectPosition instead
            transformOrigin: 'center center',
            transition: !isLowPowerMode ? 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)' : 'none',
            /* Additional CSS optimizations for better performance */
            willChange: isMobile ? 'object-position' : 'transform',
            backfaceVisibility: 'hidden',
            // Ensure full height coverage
            minHeight: '100vh',
            // Move the content inside the video frame on mobile
            objectPosition: isMobile 
              ? `${50 - (scrollProgress * 10)}% center` // Start at center (50%) and move left up to 10%
              : 'center center',
            // Smooth transition for objectPosition - much slower on mobile
            transitionProperty: isMobile ? 'object-position' : 'transform',
            transitionDuration: isMobile ? '1.5s' : '0.6s', // Much slower transition on mobile
            transitionTimingFunction: isMobile ? 'cubic-bezier(0.25, 0.1, 0.25, 1)' : 'cubic-bezier(0.33, 1, 0.68, 1)'
          }}
          /* Add event listeners to handle video playback issues */
          onError={() => setIsLowPowerMode(true)}
          onStalled={() => setIsLowPowerMode(true)}
        />
        
        {/* Fallback image for extremely low-powered devices */}
        {isLowPowerMode && (
          <img 
            src="/bannersphere-poster.jpg" 
            alt="Background" 
            className="absolute inset-0 h-full w-full rounded-none border-none object-cover"
            style={{ display: 'none' }} // Only show if video fails completely
            onError={(e) => {
              if (videoRef.current && (videoRef.current.paused || videoRef.current.ended)) {
                e.currentTarget.style.display = 'block';
              }
            }}
          />
        )}
        <div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center ${
            scrollBasedStyles.overlay
          }`}
        >
        <div className="w-full max-w-[100vw] px-6 md:px-12 lg:px-24">
          <h1>
            <div className={cn(
              scrollBasedStyles.text,
              scrollBasedStyles.textMask,
              // Use a simpler approach for visibility
              isClient ? "opacity-100" : "opacity-0"
            )}>
              {/* Always render the TextEffect component, but conditionally trigger the animation */}
              <TextEffect
                per="char"
                delay={0.25}
                className="text-left font-chalet-newyork text-[64px] font-normal leading-none md:text-[108px] lg:text-center"
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
            <div 
              className="mt-[calc(theme(fontSize.8xl)+14rem)] mt-[calc(theme(fontSize.8xl)+18rem)] flex flex-col space-y-4"
            >
              <div className={cn(
                scrollBasedStyles.textMask,
                isClient ? "opacity-100" : "opacity-0"
              )}
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
                <div className={cn(
                  scrollBasedStyles.textMask,
                  isClient ? "opacity-100" : "opacity-0"
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
                  className="h-[1.25em] w-[1.25em] opacity-0 transition-transform group-hover:translate-x-1 [animation:arrow-reveal_0.3s_ease-in-out_1.75s_forwards]"
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
      </div>
    </section>
  );
}
