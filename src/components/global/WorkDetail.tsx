'use client';

import { Box, Container, Section } from '@/components/global/matic-ds';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface GalleryImage {
  url: string;
  title?: string;
  description?: string;
}

interface WorkDetailProps {
  name: string;
  description: string;
  client: string;
  clientLogo: string | null;
  clientDescription: string;
  images: GalleryImage[];
  previousWork: string | null;
  nextWork: string | null;
  sector?: "Technology" | "Travel";
  categories?: Array<"Experience strategy" | "Web & digital" | "Brand & creative" | "Intelligent scale" | "Teams & culture">;
}

export function WorkDetail({
  name,
  description,
  client,
  clientLogo,
  clientDescription,
  images,
  previousWork,
  nextWork,
  sector,
  categories,
}: WorkDetailProps) {
  return (
    <Section className="flex flex-col">
      <Container className="items-center justify-center flex flex-col">
        <Box gap={4} className="w-full">
          <h2 className="">{name}</h2>
          <h2 className="opacity-50">{sector}</h2>
        </Box>
        <Box direction="col" className="w-full">
          <p className="max-w-lg">{description}</p>
          <p className="max-w-lg">{categories?.join(' • ')}</p>
        </Box>
      </Container>
    </Section>
  );
}
