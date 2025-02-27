'use client';

import { getAllTestimonials } from '@/lib/api';
import { type Testimonial } from '@/types';
import { useEffect, useState } from 'react';

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await getAllTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    }

    void fetchTestimonials();
  }, []);

  return { testimonials, loading };
}
