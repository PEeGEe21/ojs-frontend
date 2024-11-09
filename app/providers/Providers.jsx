'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { TanstackProvider } from './TanstackProvider';
import { JournalProvider } from '../utils/journalContext';
export function Providers({ children }) {
  return (
      <TanstackProvider>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            <JournalProvider>
              {children}
            </JournalProvider>
          </ChakraProvider>
        </CacheProvider>
      </TanstackProvider>
  );
}
