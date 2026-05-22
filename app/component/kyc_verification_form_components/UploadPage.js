"use client";
import { useState } from "react";
import {
  Chevron,
  ArrowLeft,
  ArrowRight,
  Spinner,
} from "./KycVerificationIcon";
import UploadZoneWithPreview from "./UploadZoneWithPreview";

export default function UploadPage({
  heading,
  subtext,
  docList,
  docType,
  setDocType,
  idNumber,
  setIdNumber,
  files,
  setFiles,
  onSubmit,
  onBack,
  onNext,
  isFirst,
  isSubmitting,
  submitError,
}) {
  const [errors, setErrors] = useState({});
  const selectedDoc = docList.find((d) => d.id === docType);

  const clearError = (id) => setErrors((prev) => ({ ...prev, [id]: null }));
  const handleFile = (i, f) => {
    setFiles((prev) => {
      const n = [...prev];
      n[i] = f;
      return n;
    });
    clearError(`file${i}`);
  };
  const removeFile = (i) =>
    setFiles((prev) => {
      const n = [...prev];
      n[i] = null;
      return n;
    });

  const validate = () => {
    const e = {};
    if (!docType) e.docType = "Please select a document type";
    if (selectedDoc?.needsId && !idNumber?.trim())
      e.idNumber = "Please enter your ID number";
    if (selectedDoc)
      selectedDoc.sides.forEach((_, i) => {
        if (!files[i]) e[`file${i}`] = true;
      });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="page-body">
      <h2 className="page-heading">{heading}</h2>
      <p className="page-sub">{subtext}</p>
      <div className="doc-id-row">
        <div className="field-wrap lg:mb-0 pb-[20px] ">
          <label className="field-label" htmlFor="doc-select">
            Document type
          </label>
          <div className="select-wrap">
            <select
              id="doc-select"
              className={`body-select${!docType ? " placeholder" : ""}${errors.docType ? " err" : ""}`}
              value={docType}
              onChange={(e) => {
                setDocType(e.target.value);
                setFiles([]);
                setIdNumber("");
                setErrors({});
              }}
            >
              <option value="" disabled hidden>
                Choose a document type
              </option>
              {docList.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
            <span className="select-chevron">
              <Chevron />
            </span>
          </div>
          {errors.docType && <div className="err-msg">{errors.docType}</div>}
        </div>
        {(selectedDoc?.needsId ||
          (!selectedDoc && docList.some((d) => d.needsId))) && (
          <div className="field-wrap">
            <label className="field-label" htmlFor="id-number">
              {selectedDoc?.idLabel || "ID Number"}
            </label>
            <input
              id="id-number"
              type="text"
              placeholder={`Enter ${selectedDoc?.idLabel || "ID number"}`}
              className={`body-input${errors.idNumber ? " err" : ""}`}
              value={idNumber || ""}
              onChange={(e) => {
                setIdNumber(e.target.value);
                clearError("idNumber");
              }}
              disabled={!selectedDoc}
              style={
                !selectedDoc ? { opacity: 0.45, cursor: "not-allowed" } : {}
              }
            />
            {errors.idNumber && (
              <div className="err-msg">{errors.idNumber}</div>
            )}
          </div>
        )}
      </div>
      {selectedDoc && (
        <>
          <div
            className={`upload-zones ${selectedDoc.sides.length === 1 ? "one-col" : "two-col"}`}
          >
            {selectedDoc.sides.map((side, i) => (
              <div key={i}>
                <UploadZoneWithPreview
                  sideLabel={side}
                  hint={selectedDoc.hint}
                  file={files[i] || null}
                  onFile={(f) => handleFile(i, f)}
                  onRemove={() => removeFile(i)}
                />
                {errors[`file${i}`] && (
                  <div className="err-msg" style={{ marginTop: 6 }}>
                    Please upload this document
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="upload-footnote">
            Ensure the document is clear, unedited and all details are fully
            visible.
          </p>
        </>
      )}
      {submitError && (
        <div className="submit-error-banner">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            style={{ flexShrink: 0 }}
          >
            <circle cx="12" cy="12" r="10" stroke="#991B1B" strokeWidth="2" />
            <path
              d="M12 8v4M12 16h.01"
              stroke="#991B1B"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          {submitError}
        </div>
      )}
      <div
        className="lg:action-row mt-[20px]  lg:flex-row flex gap-[20px] flex-col lg:gap-[10px] lg:gap-[10px] "
        style={isFirst ? { justifyContent: "flex-end" } : { justifyContent: "space-between" }}
      >
        {!isFirst && (
          <button className="btn-back" onClick={onBack} disabled={isSubmitting}>
            <ArrowLeft /> Go Back
          </button>
        )}

        <div className="flex gap-[10px]">
          {onNext && (
            <button
              type="button"
              className="btn-proceed"
              onClick={onNext}
              disabled={isSubmitting}
            >
              Next <ArrowRight />
            </button>
          )}

          <button
            className="btn-submit-page"
            disabled={isSubmitting}
            style={isSubmitting ? { opacity: 0.75, cursor: "not-allowed" } : {}}
            onClick={() => {
              validate();
              onSubmit();
            }}
          >
            {isSubmitting ? (
              <>
                <Spinner /> Uploading…
              </>
            ) : (
              <>
                Submit &amp; Continue <ArrowRight />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}