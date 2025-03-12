'use client';

import { Container, Section } from '@/components/global/matic-ds';
import { type ImageComparison as ImageComparisonType } from '@/types/contentful';
import { 
  ImageComparison as ImageComparisonUI, 
  ImageComparisonImage, 
  ImageComparisonSlider 
} from '@/components/ui/image-comparison';
import { useEffect, useState } from 'react';

export const ImageComparison = ({ beforeImage, afterImage}: ImageComparisonType) => {
  // Set a minimum height for the container
  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({
    minHeight: '300px',
    maxWidth: '100%',
  });
  
  useEffect(() => {
    // Calculate the maximum aspect ratio to ensure both images fit
    if (beforeImage?.width && beforeImage?.height && afterImage?.width && afterImage?.height) {
      // Find the image with the largest width-to-height ratio
      const beforeRatio = beforeImage.width / beforeImage.height;
      const afterRatio = afterImage.width / afterImage.height;
      
      // Use the larger ratio to ensure the wider image is fully visible
      const maxRatio = Math.max(beforeRatio, afterRatio);
      
      // Determine if we need to adjust for mobile
      const isMobile = window.innerWidth < 640;
      
      setContainerStyle({
        minHeight: isMobile ? '300px' : '400px',
        maxHeight: isMobile ? '70vh' : 'none',
        aspectRatio: isMobile ? 'auto' : String(maxRatio),
        maxWidth: '100%',
        width: '100%',
      });
      
      // Add resize listener to update container style when window size changes
      const handleResize = () => {
        const isMobile = window.innerWidth < 640;
        setContainerStyle(prev => ({
          ...prev,
          minHeight: isMobile ? '300px' : '400px',
          maxHeight: isMobile ? '70vh' : 'none',
          aspectRatio: isMobile ? 'auto' : String(maxRatio),
        }));
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [beforeImage, afterImage]);
  
  return (
    <Section>
      <Container className="px-0 sm:px-4">
        <div className="mx-auto max-w-5xl w-full">
          <div className="overflow-hidden">
            <ImageComparisonUI 
              className="shadow-lg" 
              enableHover
              style={containerStyle}
              responsiveBreakpoint={640} // Switch to vertical on small screens (sm breakpoint)
            >
              <ImageComparisonImage 
                src={beforeImage.url} 
                alt={beforeImage.title || "Before image"} 
                position="right" 
                className="object-contain border-none rounded-none"
              />
              <ImageComparisonImage 
                src={afterImage.url} 
                alt={afterImage.title || "After image"} 
                position="left" 
                className="object-contain border-none rounded-none"
              />
              <ImageComparisonSlider className="bg-white">
                {/* Horizontal and vertical slider handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center">
                  <svg className="hidden sm:block" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5L3 10L8 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 5L21 10L16 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg className="block sm:hidden" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 8L10 3L15 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 16L10 21L15 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </ImageComparisonSlider>
            </ImageComparisonUI>
          </div>
        </div>
      </Container>
    </Section>
  );
};