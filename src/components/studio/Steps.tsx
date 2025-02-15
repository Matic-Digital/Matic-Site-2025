import { Box } from '@/components/global/matic-ds';

interface StepsProps {
  number: string | number;
  header: string;
  copy: string;
}

export function Steps({ number, header, copy }: StepsProps) {
  return (
    <Box className="text-text text-center md:text-left" direction="col" gap={2}>
      <p className="w-fit mx-auto md:mx-0 aspect-square text-center p-2 rounded-lg bg-[radial-gradient(309.99%_230.59%_at_50.49%_-120.88%,hsl(--var(--text-hsl))_0%,hsl(--var(--text-hsl))_100%)] border border-t-text/40 border-x-text/20 border-b-text/5">{number}</p>
      <h3 className="text-[1.5rem] font-semibold">{header}</h3>
      <p className="font-light max-w-[287px] mx-auto md:mx-0 md:max-w-none">{copy}</p>
    </Box>
  );
}
