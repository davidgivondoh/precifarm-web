'use client';

// Required by Next.js convention: error.tsx must be a Client Component.

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactElement {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="container-page section text-center">
      <h1 className="font-display">Something went wrong</h1>
      <p className="text-ink-muted mt-4">An unexpected error occurred. Please try again.</p>
      <button
        type="button"
        onClick={reset}
        className="bg-brand hover:bg-brand-strong mt-8 inline-flex items-center rounded-md px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}
