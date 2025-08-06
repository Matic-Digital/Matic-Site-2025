'use client';
import { cn } from '@/lib/utils';
import { useState, createContext, useContext, useEffect } from 'react';
import {
  motion,
  type MotionValue,
  type SpringOptions,
  useMotionValue,
  useSpring,
  useTransform
} from 'motion/react';

type Orientation = 'horizontal' | 'vertical';

const ImageComparisonContext = createContext<
  | {
      sliderPosition: number;
      setSliderPosition: (pos: number) => void;
      motionSliderPosition: MotionValue<number>;
      orientation: Orientation;
    }
  | undefined
>(undefined);

export type ImageComparisonProps = {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
  style?: React.CSSProperties;
  orientation?: Orientation;
  responsiveBreakpoint?: number;
};

const DEFAULT_SPRING_OPTIONS = {
  bounce: 0,
  duration: 0
};

function ImageComparison({
  children,
  className,
  enableHover,
  springOptions,
  style,
  orientation: initialOrientation = 'horizontal',
  responsiveBreakpoint = 768 // Default to md breakpoint
}: ImageComparisonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const motionValue = useMotionValue(50);
  const motionSliderPosition = useSpring(motionValue, springOptions ?? DEFAULT_SPRING_OPTIONS);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [orientation, setOrientation] = useState<Orientation>(initialOrientation);

  // Handle responsive orientation change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < responsiveBreakpoint) {
        setOrientation('vertical');
      } else {
        setOrientation(initialOrientation);
      }
    };

    // Set initial orientation
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [initialOrientation, responsiveBreakpoint]);

  const handleDrag = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && !enableHover) return;

    const containerRect = (event.currentTarget as HTMLElement).getBoundingClientRect();

    let position: number;

    if ('touches' in event) {
      // For touch events
      const touches = event.touches;

      // If no touches, exit early
      if (!touches || touches.length === 0) return;

      // Safe to access first touch now
      if (orientation === 'horizontal') {
        position = touches[0]!.clientX - containerRect.left;
      } else {
        position = touches[0]!.clientY - containerRect.top;
      }
    } else {
      // For mouse events
      if (orientation === 'horizontal') {
        position = event.clientX - containerRect.left;
      } else {
        position = event.clientY - containerRect.top;
      }
    }

    const percentage = Math.min(
      Math.max(
        orientation === 'horizontal'
          ? (position / containerRect.width) * 100
          : (position / containerRect.height) * 100,
        0
      ),
      100
    );

    motionValue.set(percentage);
    setSliderPosition(percentage);
  };

  return (
    <ImageComparisonContext.Provider
      value={{ sliderPosition, setSliderPosition, motionSliderPosition, orientation }}
    >
      <div
        className={cn(
          'relative select-none overflow-hidden rounded-none',
          orientation === 'horizontal'
            ? enableHover && 'cursor-ew-resize'
            : enableHover && 'cursor-ns-resize',
          className
        )}
        style={style}
        onMouseMove={handleDrag}
        onMouseDown={() => !enableHover && setIsDragging(true)}
        onMouseUp={() => !enableHover && setIsDragging(false)}
        onMouseLeave={() => !enableHover && setIsDragging(false)}
        onTouchMove={handleDrag}
        onTouchStart={() => !enableHover && setIsDragging(true)}
        onTouchEnd={() => !enableHover && setIsDragging(false)}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
}

function useImageComparison() {
  const context = useContext(ImageComparisonContext);
  if (context === undefined) {
    throw new Error('useImageComparison must be used within an ImageComparison component');
  }
  return context;
}

const ImageComparisonImage = ({
  className,
  alt,
  src,
  position
}: {
  className?: string;
  alt: string;
  src: string;
  position: 'left' | 'right';
}) => {
  const { motionSliderPosition, orientation } = useImageComparison();

  // For horizontal orientation
  const leftClipPath = useTransform(motionSliderPosition, (value) => `inset(0 0 0 ${value}%)`);
  const rightClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 ${100 - value}% 0 0)`
  );

  // For vertical orientation
  const topClipPath = useTransform(motionSliderPosition, (value) => `inset(${value}% 0 0 0)`);
  const bottomClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 0 ${100 - value}% 0)`
  );

  // Map left/right positions to top/bottom for vertical orientation
  const getClipPath = () => {
    if (orientation === 'horizontal') {
      return position === 'left' ? leftClipPath : rightClipPath;
    } else {
      return position === 'left' ? topClipPath : bottomClipPath;
    }
  };

  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn(
        'absolute inset-0 h-full max-h-full w-full max-w-full rounded-none border-none object-contain',
        className
      )}
      style={{
        clipPath: getClipPath()
      }}
    />
  );
};

const ImageComparisonSlider = ({
  className,
  children
}: {
  className: string;
  children?: React.ReactNode;
}) => {
  const { motionSliderPosition, orientation } = useImageComparison();

  const left = useTransform(motionSliderPosition, (value) => `${value}%`);
  const top = useTransform(motionSliderPosition, (value) => `${value}%`);

  return (
    <motion.div
      className={cn(
        orientation === 'horizontal'
          ? 'absolute bottom-0 top-0 w-1 cursor-ew-resize'
          : 'absolute left-0 right-0 h-1 cursor-ns-resize',
        className
      )}
      style={orientation === 'horizontal' ? { left } : { top }}
    >
      {children}
    </motion.div>
  );
};

export { ImageComparison, ImageComparisonImage, ImageComparisonSlider };
