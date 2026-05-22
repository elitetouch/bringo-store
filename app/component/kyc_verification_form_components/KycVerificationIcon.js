/* ─── Step icon (checkmark-ring) ─────────────────────────────── */
/* Step icons change */
export const StepIcon = ({ state }) => {
  //Equivalent to an if an else statement i.e if state is pending bg is "#F0F2F5" else bg is "#0E4940"
  const bg = state === "pending" ? "#F0F2F5" : "#0E4940";
  const clr = state === "pending" ? "#A5A6AB" : "#F5ECBE";
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect width="44" height="44" rx="22" fill={bg} />
      <path
        d="M26.0429 20.6122C26.491 20.2019 26.5215 19.506 26.1112 19.058C25.7009 18.61 25.0051 18.5795 24.5571 18.9898L20.4958 22.7093L19.4429 21.7451C18.9949 21.3348 18.2991 21.3653 17.8888 21.8134C17.4785 22.2614 17.509 22.9572 17.9571 23.3675L19.7528 25.0122C20.1733 25.3972 20.8183 25.3972 21.2387 25.0122L26.0429 20.6122Z"
        fill={clr}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 11.001C15.9249 11.001 11 15.9258 11 22.001C11 28.0761 15.9249 33.001 22 33.001C28.0751 33.001 33 28.0761 33 22.001C33 15.9258 28.0751 11.001 22 11.001ZM13.2 22.001C13.2 17.1409 17.1399 13.201 22 13.201C26.8601 13.201 30.8 17.1409 30.8 22.001C30.8 26.8611 26.8601 30.801 22 30.801C17.1399 30.801 13.2 26.8611 13.2 22.001Z"
        fill={clr}
      />
    </svg>
  );
};
/* ─── Icon atoms ─────────────────────────────────────────────── */
export const Chevron = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 9l6 6 6-6"
      stroke="#A5A6AB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M19 12H5M11 18l-6-6 6-6"
      stroke="#0E4940"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const UploadSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const PdfIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
      stroke="#A5A6AB"
      strokeWidth="1.5"
    />
    <path
      d="M14 2v6h6"
      stroke="#A5A6AB"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M9 13h6M9 17h4"
      stroke="#A5A6AB"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
export const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 6v6l4 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
/* Animated spinner shown inside the submit button while uploading */
export const Spinner = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    style={{ animation: "kyc-spin 0.75s linear infinite" }}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeOpacity="0.25"
    />
    <path
      d="M12 2a10 10 0 0110 10"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <style>{`@keyframes kyc-spin { to { transform: rotate(360deg); } }`}</style>
  </svg>
);
/* Cloud icon — exact paths from Upload_box.svg */
export const CloudUpload = () => (
  <svg width="30" height="30" viewBox="0 0 44 44" fill="none">
    <path
      d="M17.126 14.927c0-3.733 3.027-6.76 6.761-6.76 3.307 0 6.062 2.376 6.646 5.515.082.44.396.801.821.942 2.447.811 4.21 3.119 4.21 5.834 0 3.394-2.752 6.146-6.146 6.146-.679 0-1.229.55-1.229 1.229s.55 1.23 1.229 1.23c4.752 0 8.604-3.853 8.604-8.605 0-3.555-2.156-6.604-5.228-7.916C31.742 8.607 28.154 5.708 23.887 5.708c-5.092 0-9.219 4.128-9.219 9.219 0 .124.002.246.007.368-2.207 1.273-3.695 3.657-3.695 6.392 0 4.073 3.302 7.375 7.375 7.375.679 0 1.23-.55 1.23-1.229s-.551-1.229-1.23-1.229c-2.715 0-4.916-2.201-4.916-4.917 0-2.037 1.239-3.788 3.01-4.534.512-.216.816-.749.74-1.299a6.254 6.254 0 01-.063-1.027z"
      fill="#0E4940"
    />
    <path
      d="M23.685 20.769c.465-.414 1.167-.414 1.633 0l1.844 1.639a.86.86 0 01-.546 1.503.842.842 0 01-.547-.191v5.901a1.229 1.229 0 01-2.458 0v-5.901a.842.842 0 01-.547.191.86.86 0 01-.546-1.503l1.767-1.639z"
      fill="#0E4940"
    />
  </svg>
);
