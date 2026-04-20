"use client";

import { useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];

export function GoogleMapsWrapper({ children }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: "AIzaSyA24WJD5u8d-iF4FKwsZB8oOxKundbE2eY",
    libraries,
  });

  if (loadError) return <p>Failed to load Google Maps</p>;
  if (!isLoaded) return <p>Loading map…</p>;
  return <>{children}</>;
}
