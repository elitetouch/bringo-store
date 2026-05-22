"use client";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PdfIcon, Spinner } from "./KycVerificationIcon";
import { IDENTITY_DOCS, BUSINESS_DOCS } from "./KycVerificationData";
import axiosInstance from "@/app/api/Api_Instance";

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

export default function StatusPage({ documents, onReset }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

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
    <div className="page-body">
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
              "/existing_user_dashboard",
            )
          }
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}