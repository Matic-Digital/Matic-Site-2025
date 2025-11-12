'use client';
import { Section } from '../global/matic-ds';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function VideoSection({
  video,
  backupImage
}: {
  video?: { url: string; contentType: string };
  backupImage?: { url: string; width?: number; height?: number };
}) {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Debug logging and fallback timeout
  useEffect(() => {
    console.log('VideoSection received props:', { 
      videoUrl: video?.url, 
      backupImageUrl: backupImage?.url 
    });
    
    if (!video?.url) return;

    const timeout = setTimeout(() => {
      console.log('Video loading timeout reached, hiding skeleton for:', video.url);
      setIsVideoLoading(false);
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [video?.url, backupImage?.url]);

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setIsVideoLoading(false);
    setHasError(false);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = e.currentTarget;
    const error = videoElement.error;
    
    console.error('Video failed to load:', {
      url: video?.url,
      error: error ? {
        code: error.code,
        message: error.message,
        MEDIA_ERR_ABORTED: error.code === 1,
        MEDIA_ERR_NETWORK: error.code === 2,
        MEDIA_ERR_DECODE: error.code === 3,
        MEDIA_ERR_SRC_NOT_SUPPORTED: error.code === 4
      } : 'No error details available',
      networkState: videoElement.networkState,
      readyState: videoElement.readyState
    });
    
    setIsVideoLoading(false);
    setHasError(true);
  };

  const handleCanPlay = () => {
    console.log('Video can play');
    setIsVideoLoading(false);
  };

  return (
    <Section className="py-0">
      {video?.url ? (
        <div className="relative aspect-video w-full">
          <video
            ref={videoRef}
            src={video.url}
            muted
            autoPlay
            loop
            playsInline
            onLoadedData={handleVideoLoad}
            onCanPlay={handleCanPlay}
            onError={handleVideoError}
            className="aspect-video w-full rounded-none border-none object-cover"
            preload="metadata"
          />
          {isVideoLoading && !hasError && (
            <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
          )}
          {hasError && backupImage?.url && (
            <div className="absolute inset-0">
              <Image 
                src={backupImage.url} 
                alt="Video fallback" 
                fill 
                className="object-cover rounded-none" 
              />
            </div>
          )}
          {hasError && !backupImage?.url && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <p className="text-gray-500">Video unavailable</p>
            </div>
          )}
        </div>
      ) : backupImage?.url ? (
        <div className="relative h-[600px] w-full">
          <Image src={backupImage.url} alt="Video placeholder" fill className="object-cover" />
        </div>
      ) : null}
    </Section>
  );
}
