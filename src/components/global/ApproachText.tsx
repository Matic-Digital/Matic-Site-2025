import { Box } from './matic-ds';

interface ApproachTextProps {
  number: number;
  header: string;
  copy: string;
}

export default function ApproachText({ number, header, copy }: ApproachTextProps) {
  return (
    <Box direction="col" className='md:w-[387px]'>
      <Box className='items-center' gap={2}>
        <p className='text-[1.875rem] font-chalet-newyork text-maticblack/40 dark:text-maticblack/40'>0{number}</p>
        <h2 className="text-[1.875rem] font-chalet-newyork text-text dark:text-maticblack">{header}</h2>
      </Box>
      <Box>
        <p className='text-base leading-[160%] font-sans text-text dark:text-maticblack'>{copy}</p>
      </Box>
    </Box>
  );
}
