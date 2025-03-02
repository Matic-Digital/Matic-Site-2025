import { Box } from './matic-ds';

interface StepCardProps {
  number: number;
  heading: string;
  description: string;
}

export default function StepCard({ number, heading, description }: StepCardProps) {
  return (
    <Box className="gap-[1.5rem]" direction="col">
      <Box className="gap-[0.5rem]" direction="col">
        <h3 className="leading-[130%] tracking-[-0.035rem] opacity-50 md:text-[1.75rem]">
          0{number}
        </h3>
        <hr className="h-[1px] my-0 opacity-30" />
      </Box>
      <Box direction="col" className="gap-[0.5rem]">
        <h2 className="text-[1.25rem] leading-[130%] tracking-[-0.025rem]">{heading}</h2>
        <p className="text-text text-[0.875rem] leading-[160%] tracking-[-0.00875rem]">{description}</p>
      </Box>
    </Box>
  );
}
