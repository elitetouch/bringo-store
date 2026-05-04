"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadSingleDocument } from "./Component/UploadSingleDocument";
import { Chevron } from "./Component/KycVerificationIcon";
import { ArrowRight } from "./Component/KycVerificationIcon";
import { ArrowLeft } from "./Component/KycVerificationIcon";
import { PdfIcon } from "./Component/KycVerificationIcon";
import { Spinner } from "./Component/KycVerificationIcon";
import { IDENTITY_DOCS } from "./Component/KycVerificationData";
import { BUSINESS_DOCS } from "./Component/KycVerificationData";
import { usePreviewUrl } from "./Component/PdfHaandler";
import { UploadZone } from "./Component/FileUploadZone";
import { StepBar } from "./Component/StepBar";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
//import imp from "../../../main_pages/Dashboard/existing_user_dashboard"
import { GetKycStatus } from "@/app/api/reactQuery";
import axiosInstance from "@/app/api/Api_Instance";

/* ─── Helpers ────────────────────────────────────────────────── */
function findDocDef(type) {
  if (!type) return null;
  const all = [...IDENTITY_DOCS, ...BUSINESS_DOCS];
  return (
    all.find((d) => d.id === type) ??
    all.find(
      (d) =>
        type.toLowerCase().includes(d.id.replace(/_/g, "")) ||
        d.id.replace(/_/g, "").includes(type.toLowerCase()),
    ) ??
    null
  );
}

function getGroupLabel(type) {
  if (IDENTITY_DOCS.find((d) => d.id === type)) return "Proof of Identity";
  if (BUSINESS_DOCS.find((d) => d.id === type)) return "Business Documents";
  const def = findDocDef(type);
  if (!def) return "Document";
  return IDENTITY_DOCS.includes(def)
    ? "Proof of Identity"
    : "Business Documents";
}

/* ─── UploadZoneWithPreview ─────────────────────────────────── */
function UploadZoneWithPreview({ sideLabel, hint, file, onFile, onRemove }) {
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

/* ─── UploadPage ─────────────────────────────────────────────── */
function UploadPage({
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
        style={isFirst ? { justifyContent: "flex-end" } : {}}
      >
        {!isFirst && (
          <button className="btn-back" onClick={onBack} disabled={isSubmitting}>
            <ArrowLeft /> Go Back
          </button>
        )}

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
  );
}

/* ─── Status page ────────────────────────────────────────────── */
function StatusPage({ documents, onReset }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  /* ── Delete — DELETE /api/v1/merchant/kyc-documents/{id} ─────────────── */
  const {
    mutate: deleteDoc,
    isPending: isDeleting,
    variables: deletingId,
  } = useMutation({
    mutationFn: (id) =>
      axiosInstance.delete(`/api/v1/merchant/kyc-documents/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["KycStatus"] });
      toast({
        title: "Document removed",
        description: "You can now upload a new document.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    },
    onError: (err) => {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Could not delete the document. Please try again.";
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  /* ── Status badge pill ──────────────────────────────────────── */
  function StatusBadge({ status }) {
    const V = {
      pending: {
        bg: "#F1F1E6",
        color: "#7A6000",
        label: "Pending Review",
        icon: (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#FFC73E" strokeWidth="1.4" />
            <path
              d="M7 4.5V7.25L8.75 9"
              stroke="#FFC73E"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      approved: {
        bg: "#E6F1EF",
        color: "#0E4940",
        label: "Successful",
        icon: (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="7" fill="#6CA08E" />
            <path
              d="M4.5 7.5l2 2 3-3.5"
              stroke="#fff"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      rejected: {
        bg: "#FFE9E9",
        color: "#FF4F4A",
        label: "Rejected",
        icon: (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="7" fill="#FF4F4A" />
            <path
              d="M4.5 4.5l5 5M9.5 4.5l-5 5"
              stroke="#FFD9D8"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      reviewing: {
        bg: "#FFF3E0",
        color: "#E65100",
        label: "Under Review",
        icon: (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#E65100" strokeWidth="1.4" />
            <path
              d="M7 4.5V7.25L8.75 9"
              stroke="#E65100"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
    };
    const v = V[status] ?? V.pending;
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          background: v.bg,
          color: v.color,
          borderRadius: 20,
          padding: "5px 11px",
          fontSize: 11.5,
          fontWeight: 600,
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {v.icon}
        {v.label}
      </span>
    );
  }

  /* ── Doc card — matches docs.svg / docs_1.svg exactly ───────── */
  function DocCard({ doc }) {
    const {
      id,
      type,
      status,
      url,
      mimeType,
      originalName,
      rejectionReason,
      createdAt,
    } = doc;

    const rejected = status === "rejected";
    const approved = status === "approved";
    const inProgress = !approved && !rejected;

    const docDef = findDocDef(type);
    const groupLabel = getGroupLabel(type);
    const displayName = docDef?.label ?? originalName ?? type;

    const dateStr = createdAt
      ? new Date(createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : null;

    const GreenDot = () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <circle cx="10" cy="10" r="10" fill="#0E4940" />
        <path
          d="M6 10.5l2.5 2.5 5.5-5.5"
          stroke="#F5ECBE"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const PendingDot = () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <circle cx="10" cy="10" r="10" fill="#F0F2F5" />
        <circle
          cx="10"
          cy="10"
          r="7"
          fill="none"
          stroke="#A5A6AB"
          strokeWidth="2.8"
          strokeDasharray="33 11"
          strokeLinecap="round"
          transform="rotate(-90 10 10)"
        />
      </svg>
    );

    const RedDot = () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <circle cx="10" cy="10" r="10" fill="#FF4F4A" />
        <path
          d="M6.5 6.5l7 7M13.5 6.5l-7 7"
          stroke="#FFD9D8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );

    const TrashIcon = () => (
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
        <path
          d="M1 5H3H17"
          stroke="#A5A6AB"
          strokeWidth="1.663"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 5V18C16 19.105 15.105 20 14 20H4C2.895 20 2 19.105 2 18V5M5 5V3C5 1.895 5.895 1 7 1H11C12.105 1 13 1.895 13 3V5"
          stroke="#A5A6AB"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 9V15"
          stroke="#A5A6AB"
          strokeWidth="1.08"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 9V15"
          stroke="#A5A6AB"
          strokeWidth="1.08"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    const ThumbnailContent = () => {
      if (url && mimeType?.includes("pdf")) {
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              textDecoration: "none",
            }}
          >
            <PdfIcon />
            <span style={{ fontSize: 10, color: "#A5A6AB", fontWeight: 500 }}>
              PDF — tap to view
            </span>
          </a>
        );
      }
      if (url && !mimeType?.includes("pdf")) {
        return (
          <img
            src={url}
            alt="document"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        );
      }
      return (
        <div
          style={{
            width: 59,
            height: 59,
            borderRadius: "50%",
            background: "#F0F2F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M9.333 13.417C9.333 10.424 11.757 8 14.75 8C17.332 8 19.492 9.787 20.053 12.213C20.16 12.677 20.51 13.045 20.968 13.17C22.663 13.634 23.917 15.19 23.917 17.042C23.917 19.274 22.107 21.083 19.875 21.083H9.625C7.393 21.083 5.583 19.274 5.583 17.042C5.583 15.352 6.64 13.91 8.134 13.323C8.588 13.143 8.836 12.659 8.748 12.178"
              stroke="#0E4940"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path
              d="M14.583 16.042V23.042M14.583 16.042l-2.333 2.333M14.583 16.042l2.333 2.333"
              stroke="#0E4940"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    };

    const Row = ({ icon, text, sub }) => (
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flexShrink: 0, marginTop: 1 }}>{icon}</div>
        <div>
          <div
            style={{
              fontSize: 12.5,
              fontWeight: 600,
              color: "#343538",
              lineHeight: 1.35,
            }}
          >
            {text}
          </div>
          {sub && (
            <div
              style={{
                fontSize: 11,
                color: "#A5A6AB",
                marginTop: 2,
                lineHeight: 1.3,
              }}
            >
              {sub}
            </div>
          )}
        </div>
      </div>
    );

    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 10,
            padding: "14px 14px 12px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#343538",
                lineHeight: 1.3,
              }}
            >
              {groupLabel}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#A5A6AB",
                marginTop: 3,
                lineHeight: 1.3,
              }}
            >
              {displayName}
            </div>
          </div>
          <StatusBadge status={status} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            padding: "0 14px",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 112,
              minWidth: 112,
              height: 113,
              border: "2px dashed #0E4940",
              borderRadius: 13,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <ThumbnailContent />
          </div>

          {!approved && (
            <button
              onClick={() => deleteDoc(id)}
              disabled={isDeleting && deletingId === id}
              title="Remove document"
              style={{
                background: "none",
                border: "none",
                padding: "6px 4px 0",
                cursor:
                  isDeleting && deletingId === id ? "not-allowed" : "pointer",
                opacity: isDeleting && deletingId === id ? 0.45 : 1,
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {isDeleting && deletingId === id ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  style={{ animation: "spin 0.8s linear infinite" }}
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="7"
                    stroke="#A5A6AB"
                    strokeWidth="2"
                    strokeDasharray="30 14"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <TrashIcon />
              )}
            </button>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            padding: "16px 14px 14px",
          }}
        >
          <Row
            icon={<GreenDot />}
            text="Document uploaded"
            sub={originalName}
          />

          <Row
            icon={
              approved ? <GreenDot /> : rejected ? <RedDot /> : <PendingDot />
            }
            text={
              rejected
                ? (rejectionReason ?? "Could not be verified")
                : "Submitted for review"
            }
            sub={!rejected && dateStr ? dateStr : null}
          />

          {approved && <Row icon={<GreenDot />} text="Document verified" />}
        </div>
      </div>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <div className="page-body">
        <h2 className="page-heading">Document Status</h2>
        <p className="page-sub" style={{ color: "#A5A6AB" }}>
          No documents found. Please go back and upload your documents.
        </p>
        <div
          className="action-row"
          style={{
            justifyContent: "center",
            borderTop: "none",
            paddingTop: 0,
            marginTop: 28,
          }}
        >
          <button className="btn-submit-page" onClick={onReset}>
            Start New Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={
        {
          //  marginTop: 10,
        }
      }
      className="page-body"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 20,
          marginBottom: "24px",
        }}
      >
        {documents.map((doc) => (
          <DocCard key={doc.id} doc={doc} />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          background: "#F0F9FF",
          border: "1px solid #BAE6FD",
          borderRadius: 8,
          padding: "14px 16px",
          fontSize: 12.5,
          color: "#0C4A6E",
          lineHeight: 1.6,
        }}
      >
        <span style={{ flexShrink: 0, fontSize: 16 }}>📬</span>
        <span>
          Our team will review your documents within{" "}
          <strong>1–3 business days</strong>. You&apos;ll receive an email
          notification once your documents have been verified.
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 32,
        }}
      >
        <button
          className="btn-submit-page"
          onClick={() =>
            router.push(
              "/../../../main_pages/Dashboard/existing_user_dashboard",
            )
          }
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}

/* ─── Root ───────────────────────────────────────────────────── */
export default function Page() {
  const [step, setStep] = useState(0);
  const [idDocType, setIdDocType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idFiles, setIdFiles] = useState([]);
  const [bizDocType, setBizDocType] = useState("");
  const [bizIdNumber, setBizIdNumber] = useState("");
  const [bizFiles, setBizFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  /*
    FIX 3: Gate the query on the token so it never fires an
    unauthenticated request if the page somehow mounts before
    the token is available.
  */
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const { isPending, data: kycStatusData } = GetKycStatus({
    enabled: !!token,
  });
  const documents = kycStatusData?.data?.data?.documents ?? [];

  const queryClient = useQueryClient();
  const toast = useToast();

  const uploadAll = async ({ docType, files, needsId, idNumber }) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requests = files
        .filter((file) => file != null)
        .map((file) =>
          uploadSingleDocument({ docType, file, needsId, idNumber }),
        );
      await Promise.all(requests);
      toast({
        title: "Success",
        description: "Upload successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return true;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Upload failed. Please check your connection and try again.";
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitId = async () => {
    const selectedDoc = IDENTITY_DOCS.find((d) => d.id === idDocType);
    const ok = await uploadAll({
      docType: idDocType,
      files: idFiles,
      needsId: selectedDoc?.needsId ?? false,
      idNumber,
    });
    /*
      FIX 1: was invalidating BEFORE the ok check — if the upload
      failed the cache was still busted, causing a wasted refetch.
      Now invalidation only runs on success, so step 2 always shows
      the freshest data that actually includes the new document.
    */
    if (!ok) return;
    queryClient.invalidateQueries({ queryKey: ["KycStatus"] });
    setStep(1);
  };

  const submitBiz = async () => {
    const selectedDoc = BUSINESS_DOCS.find((d) => d.id === bizDocType);
    const ok = await uploadAll({
      docType: bizDocType,
      files: bizFiles,
      needsId: selectedDoc?.needsId ?? false,
      idNumber: bizIdNumber,
    });
    if (!ok) return;
    /*
      FIX 2: invalidation was missing entirely from submitBiz — after
      uploading business docs the cache was never refreshed, so the
      status page showed stale data with no business document card.
    */
    queryClient.invalidateQueries({ queryKey: ["KycStatus"] });
    setStep(2);
  };

  const reset = () => {
    setStep(0);
    setIdDocType("");
    setIdNumber("");
    setIdFiles([]);
    setBizDocType("");
    setBizIdNumber("");
    setBizFiles([]);
    setSubmitError(null);
  };

  const goBack = () => {
    setSubmitError(null);
    setStep(0);
  };

  return (
    <div className="kyc-root">
      <div className="kyc-card">
        <StepBar current={step} />

        {step === 0 && (
          <UploadPage
            heading="Upload Your Proof of Identity"
            subtext="Select an identity document type, enter your ID number, and upload a clear photo."
            docList={IDENTITY_DOCS}
            docType={idDocType}
            setDocType={setIdDocType}
            idNumber={idNumber}
            setIdNumber={setIdNumber}
            files={idFiles}
            setFiles={setIdFiles}
            onSubmit={submitId}
            onNext={() => setStep(1)}
            isFirst
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )}

        {step === 1 && (
          <UploadPage
            heading="Upload Your Document"
            subtext="Bringo requires that you upload all required documents."
            docList={BUSINESS_DOCS}
            docType={bizDocType}
            setDocType={setBizDocType}
            idNumber={bizIdNumber}
            setIdNumber={setBizIdNumber}
            files={bizFiles}
            setFiles={setBizFiles}
            onSubmit={submitBiz}
            onBack={goBack}
            onNext={() => setStep(2)}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )}

        {step === 2 &&
          (isPending ? (
            <div
              className="page-body"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 200,
              }}
            >
              <Spinner />
              <span style={{ marginLeft: 12, color: "#A5A6AB", fontSize: 14 }}>
                Loading document status…
              </span>
            </div>
          ) : (
            <StatusPage documents={documents} onReset={reset} />
          ))}
      </div>
    </div>
  );
}
