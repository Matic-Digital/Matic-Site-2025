import Image from 'next/image';
import { Box } from './matic-ds';

interface TeamMemberProps {
  fullName: string;
  role: string;
  headshot: {
    title: string;
    description: string;
    url: string;
    width: number;
    height: number;
  };
}

export default function TeamMember({ fullName, role, headshot }: TeamMemberProps) {
  return (
    <Box direction="col" gap={4} className="text-text border p-4 md:p-6">
      <Image
        src={headshot.url}
        alt={headshot.title || `${fullName}'s headshot`}
        width={headshot.width}
        height={headshot.height}
        className="rounded-none border-none object-cover aspect-square"
      />
      <Box direction="col">
        <h3 className="text-base font-medium font-sans leading-[120%]">{fullName}</h3>
        <p className="text-sm font-light text-text leading-[120%]">{role}</p>
      </Box>
    </Box>
  );
}