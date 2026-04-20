"use client";
import React from "react";
import { ExistingDashboardHeader } from "../existing_user_dashboard/page";
import { useStore } from "@/app/component/Store/useStore";
import { NewOutlet } from "../existing_user_dashboard/components/NewOutletModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ─── Mobile overrides ───────────────────────────────────────────
   All desktop styles are 100% unchanged (inline styles win over
   class names so we patch mobile via media query instead).
   Only the button row direction and button widths change on mobile.
────────────────────────────────────────────────────────────────── */
const mobileStyles = `
  @media (max-width: 639px) {
    .kyc-content-wrap {
      padding-top: 20px;
      padding-bottom: 32px;
    }
    .kyc-btn-row {
      flex-direction: column !important;
    gap: 20px;
    }
    .kyc-btn-row > div {
      width: 100% !important;
    }
    .kyc-btn-row > div > button {
      width: 100% !important;
    }
  }
`;

function ProceedButton({
  onClick,
  disabled = false,
  loading = false,
  children = "Proceed",
  width = 232,
  height = 51,
  className = "",
  type = "button",
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  const isInteractive = !disabled && !loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      onMouseEnter={() => isInteractive && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: isHovered ? "#0E4940" : "transparent",
        border: "2px solid #0E4940",
        borderRadius: "8px",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        padding: "0 12px",
        transition: "all 200ms",
      }}
    >
      {loading ? (
        <svg
          className="animate-spin"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke={isHovered ? "#ffffff" : "#0E4940"}
            strokeWidth="3"
            strokeOpacity="0.25"
          />
          <path
            d="M4 12a8 8 0 018-8"
            stroke={isHovered ? "#ffffff" : "#0E4940"}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <span
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: isHovered ? "#ffffff" : "#0E4940",
            transition: "color 200ms",
          }}
        >
          {children}
        </span>
      )}
    </button>
  );
}

const KycRequirementList = [
  "A valid ID",
  "Certificate of Registration",
  "CAC 02 & CAC07",
  "Tax ID",
  "Company logo",
];

function Page() {
  const { setProfile, profile, storeBrand, country } = useStore();
  const storeId = storeBrand;
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-[97vh]">
      {/* Mobile overrides — desktop inline styles are untouched */}
      <style>{mobileStyles}</style>

      {storeId?.length >= 1 && (
        <NewOutlet
          open={open}
          setOpen={setOpen}
          storeId={storeId}
          countries={country}
        />
      )}

      <ExistingDashboardHeader profile={profile} setOpen={setOpen} />

      {/* kyc-content-wrap only gains extra top/bottom padding on mobile */}
      <div
        className="kyc-content-wrap"
        style={{ width: "91.666667%", margin: "0 auto" }}
      >
        <h1
          style={{ marginBottom: "20px", fontSize: "18px", marginTop: "20px" }}
        >
          KYC Requirement
        </h1>
        <div>
          <h1 style={{ marginBottom: "10px", fontSize: "16px" }}>
            To Verify your Account, you need the following
          </h1>
          <div>
            <ol
              style={{
                listStyleType: "decimal",
                marginLeft: "1rem",
                lineHeight: "1.5",
              }}
            >
              {KycRequirementList.map((item, index) => (
                <li key={index} style={{ marginBottom: "0.5rem" }}>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* kyc-btn-row becomes flex-col on mobile, stays flex-row on desktop */}
        <div
          className="kyc-btn-row"
          style={{
            columnGap: 20,
            display: "flex",
            marginTop: 40,
          }}
        >
          <div>
            <ProceedButton
              onClick={() =>
                router.push(
                  "/../../../main_pages/Dashboard/KycVerificationForm",
                )
              }
              type="submit"
            />
          </div>
          <div>
            <ProceedButton
              type="Upload later"
              children="Upload later"
              onClick={() =>
                router.push(
                  "/../../../main_pages/Dashboard/existing_user_dashboard",
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
