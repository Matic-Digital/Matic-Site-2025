'use client';
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import type { ContentfulAsset } from '@/types/contentful';

// Dynamically import Lottie component to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// Helper function to determine media type
const getMediaType = (asset?: ContentfulAsset) => {
  if (!asset?.url) return 'none';

  const url = asset.url.toLowerCase();
  if (url.endsWith('.mp4')) return 'video';
  if (url.endsWith('.json')) return 'lottie';
  if (asset.contentType?.startsWith('video/')) return 'video';
  if (asset.contentType?.startsWith('image/')) return 'image';
  if (asset.contentType === 'application/json') return 'lottie';
  return 'image';
};

// Define a type for Lottie animation data
type LottieAnimationData = Record<string, unknown>;

interface ServiceAssetProps {
  asset: ContentfulAsset;
  serviceName: string;
}

export function ServiceAsset({ asset, serviceName }: ServiceAssetProps) {
  const [lottieData, setLottieData] = useState<LottieAnimationData | null>(null);
  const [isLoadingLottie, setIsLoadingLottie] = useState(false);
  const [lottieError, setLottieError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Memoize the media type to avoid recalculating it
  const mediaType = useMemo(() => getMediaType(asset), [asset]);

  // Use this to track client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Reset states when asset changes
    setLottieData(null);
    setLottieError(false);
    setIsLoadingLottie(false);

    if (mediaType === 'lottie' && asset?.url) {
      setIsLoadingLottie(true);
      fetch(asset.url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: LottieAnimationData) => {
          setLottieData(data);
          setLottieError(false);
        })
        .catch((error) => {
          console.error('Error loading Lottie animation:', error);
          setLottieError(true);
        })
        .finally(() => {
          setIsLoadingLottie(false);
        });
    }
  }, [isMounted, mediaType, asset?.url]);

  // Don't render anything until mounted (avoid hydration mismatch)
  if (!isMounted) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (mediaType === 'video') {
    return (
      <video
        src={asset.url}
        className="h-full w-full object-cover"
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
    );
  }

  if (mediaType === 'lottie') {
    if (isLoadingLottie) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-gray-500">Loading animation...</div>
        </div>
      );
    }

    if (lottieError || !lottieData) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-600">
          <div className="text-center">
            <div className="mb-2 text-2xl">Error</div>
            <p className="text-sm font-medium">Failed to load animation</p>
            <p className="text-xs text-gray-500">{asset.title}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        <Lottie
          animationData={lottieData}
          loop
          autoplay
          // key line ↓ makes the SVG behave like object-fit: cover
          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
          className="absolute inset-0 h-full w-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  }

  if (mediaType === 'image') {
    return (
      <Image
        src={asset.url}
        alt={asset.title || `${serviceName} service asset`}
        width={asset.width || 800}
        height={asset.height || 450}
        className="h-full w-full rounded-lg object-cover"
      />
    );
  }

  // Fallback for unknown file types
  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-600">
      <div className="text-center">
        <div className="mb-2 text-2xl">File</div>
        <p className="text-sm font-medium">{asset.title}</p>
        <p className="text-xs text-gray-500">{asset.contentType || 'File'}</p>
        <a
          href={asset.url}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 mt-2 inline-block text-xs"
        >
          Download File
        </a>
      </div>
    </div>
  );
}
