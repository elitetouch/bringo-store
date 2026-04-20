"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "@chakra-ui/react";
// ─── Icons ────────────────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg width="25" height="25" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    />
  </svg>
);

// ─── Size map ─────────────────────────────────────────────────────────────────

const SIZE_MAP = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "max-w-full mx-4",
};

// ─── Modal ────────────────────────────────────────────────────────────────────

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  showCloseButton = true,
  className = "",
}) {
  const overlayRef = useRef(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="
        fixed inset-0 z-[9999]
        flex items-end sm:items-center justify-center
        bg-black/50 backdrop-blur-sm
        px-0 sm:px-4
        animate-fadeIn
      "
    >
      <div
        className={`
          relative lg:w-9/12 w-11/12 
          bg-white rounded-t-2xl sm:rounded-2xl
          shadow-2xl
          flex flex-col
          max-h-[99vh] sm:max-h-[85vh]
          animate-slideUp sm:animate-scaleIn
          ${className}
        `}
      >
        {/* ── Header ── */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-end w-10/12 m-auto gap-x-4  pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
            {showCloseButton && (
              <IconButton
                aria-label="Close"
                icon={<CloseIcon />}
                onClick={onClose}
                size="sm"
                // variant="ghost"
                borderRadius="full"
                color="gray.400"
                _hover={{
                  color: "gray.700",
                  bg: "gray.100",
                }}
              />
            )}
          </div>
        )}

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto px-2 ">{children}</div>

        {/* ── Footer ── */}
        {footer && (
          <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

// ─── Reusable footer button row ───────────────────────────────────────────────

export function ModalFooter({
  onClose,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Confirm",
  loading = false,
  danger = false,
}) {
  return (
    <div className="flex items-center justify-end gap-x-3">
      <button
        onClick={onClose}
        className="
          px-5 py-2 rounded-lg text-[14px] font-medium
          text-gray-600 bg-white border border-gray-200
          hover:bg-gray-50 transition-colors duration-150
        "
      >
        {cancelText}
      </button>
      <button
        onClick={onConfirm}
        disabled={loading}
        className={`
          px-5 py-2 rounded-lg text-[14px] font-medium text-white
          transition-colors duration-150 disabled:opacity-60
          flex items-center gap-x-2
          ${
            danger
              ? "bg-red-500 hover:bg-red-600"
              : "bg-[#0E4940] hover:bg-[#0a3830]"
          }
        `}
      >
        {loading && (
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
            />
          </svg>
        )}
        {confirmText}
      </button>
    </div>
  );
}
