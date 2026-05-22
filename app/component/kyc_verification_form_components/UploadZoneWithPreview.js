"use client";
import { usePreviewUrl } from "./PdfHaandler";
import { UploadZone } from "./FileUploadZone";

export default function UploadZoneWithPreview({
  sideLabel,
  hint,
  file,
  onFile,
  onRemove,
}) {
  const previewUrl = usePreviewUrl(file);
  return (
    <UploadZone
      sideLabel={sideLabel}
      hint={hint}
      file={file}
      previewUrl={previewUrl}
      onFile={onFile}
      onRemove={onRemove}
    />
  );
}