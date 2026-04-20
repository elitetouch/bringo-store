"use client";
import { useState, useRef, useCallback } from "react";
import { CloudUpload } from "./KycVerificationIcon";
import { UploadSVG } from "./KycVerificationIcon";
import { isPdf } from "./PdfHaandler";
import { PdfIcon } from "./KycVerificationIcon";
/* ─── Upload zone ────────────────────────────────────────────── */
export function UploadZone({
  sideLabel,
  hint,
  file,
  previewUrl,
  onFile,
  onRemove,
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = useCallback(
    (e) => {
      //without e.prevent default browser wouldnt accept drop action
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) onFile(f);
    },
    [onFile],
  );

  return (
    <div
      className={`upload-box${file ? " has-file" : ""}${dragging ? " dragging" : ""}`}
      //detects on drop action .. and act accordingly
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files[0]) onFile(e.target.files[0]);
        }}
      />

      {file ? (
        <>
          <span className="upload-side" style={{ marginBottom: 12 }}>
            {sideLabel}
          </span>
          <div className="img-preview-wrap">
            {isPdf(file) ? (
              <div className="pdf-preview">
                <PdfIcon />
                <span>PDF</span>
              </div>
            ) : (
              <img src={previewUrl} alt={sideLabel} className="img-preview" />
            )}
            <button
              className="file-remove"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
            >
              Remove &amp; re-upload
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="upload-icon-circle">
            <CloudUpload />
          </div>
          <span className="upload-side">{sideLabel}</span>
          <p className="upload-title">
            <span>Click to upload</span> or drag and drop
          </p>
          <p className="upload-hint">{hint || "JPG, PNG or PDF (max. 5 MB)"}</p>
          <div className="upload-spacer" />
          <button
            className="browse-btn"
            onClick={() => inputRef.current?.click()}
          >
            <UploadSVG /> Browse files
          </button>
        </>
      )}
    </div>
  );
}
