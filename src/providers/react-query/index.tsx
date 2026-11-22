'use client'
import React, { useState } from 'react'
//Use React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type Props = {
  children: React.ReactNode
}

const ReactQueryProvider = (props: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false, staleTime: Infinity } }
      })
  )
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
}

export default ReactQueryProvider
