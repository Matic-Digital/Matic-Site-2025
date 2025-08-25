import { TextAnimate } from '../magicui/TextAnimate';
import { Box } from './matic-ds';

interface ApproachTextProps {
  number: number;
  header: string;
  copy: string;
}

export default function ApproachText({ number, header, copy }: ApproachTextProps) {
  return (
    <Box direction="col" className="w-full md:flex-1">
      <Box className="items-center" gap={2}>
        <TextAnimate
          animate="blurInUp"
          as="p"
          by="line"
          className="font-chalet-newyork text-[1.875rem] text-maticblack/40 dark:text-maticblack/40"
          once
        >
          {'0' + number.toString()}
        </TextAnimate>
        <TextAnimate
          animate="blurInUp"
          as="h2"
          by="line"
          className="font-chalet-newyork text-[1.875rem] text-text dark:text-maticblack"
          once
        >
          {header}
        </TextAnimate>
      </Box>
      <Box>
        <TextAnimate
          animate="blurInUp"
          as="p"
          by="line"
          className="font-sans text-base leading-[160%] text-text dark:text-maticblack"
          once
        >
          {copy}
        </TextAnimate>
      </Box>
    </Box>
  );
}
