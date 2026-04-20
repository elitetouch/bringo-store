"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";

const LIBRARIES = ["places"]; // ← must be stable (outside component)
function Chakrawrap({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={LIBRARIES}
    >
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ChakraProvider>
      </QueryClientProvider>
    </LoadScript>
  );
}

export default Chakrawrap;
