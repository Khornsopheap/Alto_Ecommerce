import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Dialog({ open, onClose, title, children }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-xl"
      >
        <h2 className="mb-3 text-lg font-semibold text-gray-900">{title}</h2>
        {children}
      </div>
    </div>,
    document.body
  );
}