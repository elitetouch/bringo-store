"use client";
import { useState, useEffect } from "react";
/* ─── Helpers ────────────────────────────────────────────────── */

//Handles if file type is pdf or name ends with .pdf  ; returns boolean value
export const isPdf = (file) =>
  file?.type === "application/pdf" || file?.name?.endsWith(".pdf");
//converts to custom url
/* main reason for creating a custom url is because images 
  exist as object in the memory so to convert images and other
   file types apart from pdf to images to be displayed
   you must convert object to a custom URL..
   NOTE: This url exist on local browser and needs to be cleaned 
   thats where URL.revokeObjectURL(objectUrl) comes in
  */
export function usePreviewUrl(file) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (!file || isPdf(file)) {
      setUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  //After setting state for url, return the url as a value after the function is successfull
  //usage ; const imageUrl = usePreviewUrl(file)
  return url;
}
