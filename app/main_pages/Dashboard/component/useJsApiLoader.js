"use client";

import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];

export function GoogleMapsWrapper({ children }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return null;
  if (!isLoaded)
    return (
      <div className="w-full animate-pulse">
        {/* Two input rows */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="grid lg:grid-cols-2 gap-x-[40px] mb-[32px] gap-y-[20px]"
          >
            <div className="h-[76px] rounded-[12px] bg-gray-200" />
            <div className="h-[76px] rounded-[12px] bg-gray-200" />
          </div>
        ))}
        {/* Submit button */}
        <div className="h-[51px] w-[232px] rounded-[8px] bg-gray-200" />
      </div>
    );
  return <>{children}</>;
}
