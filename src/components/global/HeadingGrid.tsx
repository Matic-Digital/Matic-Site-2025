import Image from "next/image";
import { Box } from "./matic-ds";

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
    <div className="text-text">{heading1}</div>
    // <Box className="flex-col md:grid md:grid-cols-3 gap-y-8 md:gap-y-[6.06rem]">
    //   <Box className="gap-[1.13rem]" direction="col">
    //     <h2 className="text-text">{heading1}</h2>
    //     <p className="text-text">{content1}</p>
    //   </Box>
    //   <Box className="gap-[1.13rem]" direction="col">
    //     <h2 className="text-text">{heading2}</h2>
    //     <p className="text-text">{content2}</p>
    //   </Box>
    //   {!showRating && (
    //     <Box className="gap-[1.13rem]" direction="col">
    //       <h2 className="">{heading3}</h2>
    //       <p className="">{content3}</p>
    //     </Box>
    //   )}
    //   {showRating && (
    //     <Image
    //       src={ratingStars.url}
    //       width={ratingStars.width}
    //       height={ratingStars.height}
    //       alt={ratingStars.title}
    //     />
    //   )}
    //   <Box className="col-span-2 gap-[1.13rem]" direction="col">
    //     <h2 className="">{heading4}</h2>
    //     <p className="">{content4}</p>
    //   </Box>
    // </Box>
  );
}
