'use client'
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
// import { extendTheme } from "@chakra-ui/react";

// const theme = extendTheme({
//   fonts: {
//     heading: "var(--font-raleway)",
//     body: "var(--font-raleway)",
//   },
// });
function Chakrawrap({children}) {
  return (
     <ChakraProvider
      // theme={theme}
      >
      {children}
    </ChakraProvider>
  )
}

export default Chakrawrap