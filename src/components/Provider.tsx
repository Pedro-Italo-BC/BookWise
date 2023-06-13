'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

import { QueryClient, QueryClientProvider } from 'react-query'

export function Provider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  )
}
