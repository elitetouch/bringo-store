import { StepIcon } from "./KycVerificationIcon";
/* ─── Step bar ───────────────────────────────────────────────── */
const STEPS = ["Proof of Identity", "Business Documents", "Document Status"];

export function StepBar({ current }) {
  return (
    <div className="step-bar">
      {STEPS.map((label, i) => {
        const s = i < current ? "done" : i === current ? "active" : "pending";
        return (
          <div key={i} className={`step-item ${s}`}>
            <div className={`step-circle ${s}`}>
              <StepIcon state={s} />
            </div>
            <span className={`step-label ${s}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
