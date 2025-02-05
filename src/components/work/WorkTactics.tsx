import { WorkTactics as WorkTacticsType } from '@/types';
import Image from 'next/image';
import { Box, Container, Section } from '../global/matic-ds';

export function WorkTactics({ tactics, tacticsImage }: WorkTacticsType) {
  return (
    <Section className="flex flex-col md:flex-row md:items-center">
      <Container className="mb-8 md:w-80 md:mb-0">
        <Box gap={{ base: 8, sm: 8, md: 2 }} direction={{sm: 'row', md: 'col'}} className="">
          <h2 className="uppercase font-sans text-[0.875rem] opacity-40 leading-[160%] text-[0.875rem]">Tactics</h2>
          <ul className="list-none m-0">
            {tactics.map((tactic, index) => (
              <li key={index} className="leading-[160%] font-light text-[0.875rem] ">
                {tactic}
              </li>
            ))}
          </ul>
        </Box>
      </Container>

      {tacticsImage && (
        <div className="relative w-full h-[400px] md:h-[800px]">
          <Image
            src={tacticsImage.url}
            alt="Tactics illustration"
            fill
            className="object-cover border-none rounded-none"
          />
        </div>
      )}
    </Section>
  );
}
