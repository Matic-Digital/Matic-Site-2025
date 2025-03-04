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
    minHeight: '400px',
  });
  
  useEffect(() => {
    // Calculate the maximum aspect ratio to ensure both images fit
    if (beforeImage?.width && beforeImage?.height && afterImage?.width && afterImage?.height) {
      // Find the image with the largest width-to-height ratio
      const beforeRatio = beforeImage.width / beforeImage.height;
      const afterRatio = afterImage.width / afterImage.height;
      
      // Use the larger ratio to ensure the wider image is fully visible
      const maxRatio = Math.max(beforeRatio, afterRatio);
      
      setContainerStyle({
        minHeight: '400px',
        aspectRatio: String(maxRatio),
      });
    }
  }, [beforeImage, afterImage]);
  
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-5xl">
          <ImageComparisonUI 
            className="rounded-lg shadow-lg" 
            enableHover
            style={containerStyle}
          >
            <ImageComparisonImage 
              src={beforeImage.url} 
              alt={beforeImage.title || "Before image"} 
              position="right" 
            />
            <ImageComparisonImage 
              src={afterImage.url} 
              alt={afterImage.title || "After image"} 
              position="left" 
            />
            <ImageComparisonSlider className="bg-white">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5L3 10L8 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 5L21 10L16 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </ImageComparisonSlider>
          </ImageComparisonUI>
        </div>
      </Container>
    </Section>
  );
};