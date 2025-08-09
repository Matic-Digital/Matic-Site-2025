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
    <Box direction="col" gap={4} className="border p-4 text-text md:p-6">
      <Image
        src={headshot.url}
        alt={headshot.title || `${fullName}'s headshot`}
        width={headshot.width}
        height={headshot.height}
        className="aspect-square rounded-none border-none object-cover"
      />
      <Box direction="col">
        <h3 className="font-sans text-base font-medium leading-[120%]">{fullName}</h3>
        <p className="text-sm font-light leading-[120%] text-text">{role}</p>
      </Box>
    </Box>
  );
}
