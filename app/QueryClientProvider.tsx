// app/QueryClientProvider.tsx (or wherever you defined it)
'use client'; // ✅ This tells Next.js it's a client component

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';

const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  // ✅ DO NOT create QueryClient outside useState or outside component!
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
