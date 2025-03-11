import Image from 'next/image';
import { Box } from './matic-ds';
import { TextAnimate } from '../magicui/TextAnimate';
import { BlurFade } from '../magicui/BlurFade';

interface HeadingGridProps {
  heading1: string;
  content1: string;
  heading2: string;
  content2: string;
  heading3: string;
  content3: string;
  heading4: string;
  content4: string;
  showRating: boolean;
  ratingStars: {
    url: string;
    width: number;
    height: number;
    title: string;
  };
}

export default function HeadingGrid({
  heading1,
  content1,
  heading2,
  content2,
  heading3,
  content3,
  heading4,
  content4,
  showRating,
  ratingStars
}: HeadingGridProps) {
  return (
    <Box className="flex-col gap-y-8 md:grid md:grid-cols-3 md:gap-y-[6.06rem]">
      <Box className="gap-[1.13rem]" direction="col">
        <TextAnimate animate="blurInUp" as="h2" by="line" className="text-text font-chalet-newyork" once>{heading1}</TextAnimate>
        <TextAnimate animate="blurInUp" as="p" by="line" className="text-text" once>{content1}</TextAnimate>
      </Box>
      <Box className="gap-[1.13rem]" direction="col">
        <TextAnimate animate="blurInUp" as="h2" by="line" className="text-text font-chalet-newyork" once>{heading2}</TextAnimate>
        <TextAnimate animate="blurInUp" as="p" by="line" className="text-text" once>{content2}</TextAnimate>
      </Box>
      {!showRating && (
        <Box className="gap-[1.13rem]" direction="col">
          <TextAnimate animate="blurInUp" as="h2" by="line" className="text-text font-chalet-newyork" once>{heading3}</TextAnimate>
          <TextAnimate animate="blurInUp" as="p" by="line" className="text-text" once>{content3}</TextAnimate>
        </Box>
      )}
      {showRating && (
        <Box className="gap-[1.13rem]" direction='col'>
          <BlurFade inView inViewMargin="-100px" direction="up" useBlur={true} blur="6px">
            <Image
              src={ratingStars.url}
              width={ratingStars.width ?? 177}
              height={ratingStars.height ?? 35}
              alt={ratingStars.title}
              className="border-none rounded-none object-contain"
            />
          </BlurFade>
          <TextAnimate animate="blurInUp" as="p" by="line" className="text-text" once>Clutch rating</TextAnimate>
        </Box>
      )}
      <Box className="col-span-2 gap-[1.13rem]" direction="col">
        <TextAnimate animate="blurInUp" as="h2" by="line" className="text-text font-chalet-newyork" once>{heading4}</TextAnimate>
        <TextAnimate animate="blurInUp" as="p" by="line" className="text-text" once>{content4}</TextAnimate>
      </Box>
    </Box>
  );
}
