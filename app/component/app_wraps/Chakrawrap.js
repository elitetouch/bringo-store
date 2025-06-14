'use client'
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

// import { extendTheme } from "@chakra-ui/react";

// const theme = extendTheme({
//   fonts: {
//     heading: "var(--font-raleway)",
//     body: "var(--font-raleway)",
//   },
// });
function Chakrawrap({children}) {
   const [queryClient] = useState(() => new QueryClient());
  return (
     <QueryClientProvider client={queryClient}>
     <ChakraProvider
      // theme={theme}
      >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </ChakraProvider>

     </QueryClientProvider>
  )
}

export default Chakrawrap