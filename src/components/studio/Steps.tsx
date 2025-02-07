import { Box } from '@/components/global/matic-ds';

interface StepsProps {
  number: string | number;
  header: string;
  copy: string;
}

export function Steps({ number, header, copy }: StepsProps) {
  return (
    <Box className="text-white" direction="col">
      <p className="w-fit aspect-square text-center p-2 rounded-lg bg-[radial-gradient(309.99%_230.59%_at_50.49%_-120.88%,rgba(255,255,255,0.40)_0%,rgba(255,255,255,0.04)_100%)] border border-t-white/40 border-x-white/20 border-b-white/5">{number}</p>
      <h3 className="">{header}</h3>
      <p className="">{copy}</p>
    </Box>
  );
}
