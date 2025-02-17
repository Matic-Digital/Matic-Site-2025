'use client';

import { useEffect } from 'react';

import { Container, Box } from '@/components/global/matic-ds';
import { Button } from '@/components/ui/button';

import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest
    });
  }, [error]);

  return (
    <Container>
      <Box className="items-center justify-center">
        <Box
          direction="col"
          gap={4}
          className="min-h-[600px] w-full max-w-md items-center justify-center rounded-lg border border-red-200 bg-red-50 p-8 text-red-900"
        >
          <AlertCircle className="h-8 w-8" />
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight">Something went wrong!</h2>
            <p className="text-muted-text">{error.message}</p>
            {error.digest && <p className="text-xs text-red-700">Error ID: {error.digest}</p>}
          </div>
          <Button onClick={reset} variant="darkblue">
            Try again
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
