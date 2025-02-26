'use client';
import { FigmaPrototype as FigmaPrototypeType } from '@/types';
import { Safari } from '../magicui/Safari';
import Iphone15Pro from '../magicui/Iphone15Pro';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Container, Section } from '../global/matic-ds';

export function FigmaPrototype({ embedLink }: FigmaPrototypeType) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Add hide-ui parameter and set different page numbers for desktop/mobile
  const getEmbedLink = (isMobile: boolean) => {
    const baseUrl = embedLink.split('&page-id=')[0];
    const pageId = isMobile ? '1:2' : '1:1';
    // Add scaling parameter to ensure embed fits container
    return `${baseUrl}&page-id=${pageId}&hide-ui=1&zoom=1`;
  };

  // Reset isLoaded state when component unmounts
  useEffect(() => {
    return () => setIsLoaded(false);
  }, []);

  return (
    <Section>
      <Container className="flex items-center justify-center">
        <div className="relative max-w-[1203px] w-full overflow-hidden">
          {/* Desktop: Safari Browser */}
          <div className="hidden md:block">
            <Safari embedSrc={isLoaded ? getEmbedLink(false) : undefined} mode="simple">
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-md">
                  <div className="flex gap-2">
                    <Button onClick={() => setIsLoaded(true)}>
                      Load Prototype
                    </Button>
                    <Button variant="darkblue" asChild>
                      <a href={embedLink} target="_blank" rel="noopener noreferrer">
                        Open in Figma
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </Safari>
          </div>

          {/* Mobile: iPhone 15 Pro */}
          <div className="md:hidden flex justify-center px-4">
            <div className="relative w-full max-w-[433px] aspect-[433/882]">
              <div className="absolute inset-0">
                <Iphone15Pro 
                  embedSrc={isLoaded ? getEmbedLink(true) : undefined}
                  className="w-full h-full"
                  width="100%"
                  height="100%"
                >
                  {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-md rounded-[55.75px]">
                      <div className="flex flex-col gap-2 items-center">
                        <Button onClick={() => setIsLoaded(true)}>
                          Load Prototype
                        </Button>
                        <Button variant="darkblue" asChild>
                          <a href={embedLink} target="_blank" rel="noopener noreferrer">
                            Open in Figma
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </Iphone15Pro>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
