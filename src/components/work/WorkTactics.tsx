import { WorkTactics as WorkTacticsType } from '@/types';
import Image from 'next/image';
import { Box, Container, Section } from '../global/matic-ds';

export function WorkTactics({ tactics, tacticsImage }: WorkTacticsType) {
  return (
    <Section className="flex flex-col md:flex-row md:items-center">
      <Container className="mb-8 md:sticky md:top-60 md:mb-0 md:w-72">
        <Box gap={{ base: 8, sm: 8, md: 2 }} direction={{ sm: 'row', md: 'col' }} className="">
          <h2 className="font-sans text-[0.875rem] uppercase leading-[160%] opacity-40">Tactics</h2>
          <ul className="m-0 list-none">
            {tactics.map((tactic, index) => (
              <li key={index} className="text-[0.875rem] font-light leading-[160%]">
                {tactic}
              </li>
            ))}
          </ul>
        </Box>
      </Container>

      {tacticsImage && (
        <div className="relative h-[300px] w-full max-w-[1100px] sm:h-[400px] md:h-[810px]">
          <Image
            src={tacticsImage.url}
            alt="Tactics illustration"
            fill
            className="rounded-none border-none object-cover"
          />
        </div>
      )}
    </Section>
  );
}
