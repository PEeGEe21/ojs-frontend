'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { TanstackProvider } from './TanstackProvider';
export function Providers({ children }) {
  return (
      <TanstackProvider>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            {children}
          </ChakraProvider>
        </CacheProvider>
      </TanstackProvider>
  );
}
