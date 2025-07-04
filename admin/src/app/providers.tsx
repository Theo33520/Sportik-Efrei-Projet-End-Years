// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import {AuthProvider} from "@/app/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                {children}
            </ChakraProvider>
        </QueryClientProvider>
        </AuthProvider>
    );
}
