import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../lib/utils";

export default function Dialog({ open, onClose, title, children, className }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/40 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative z-10 w-full max-w-lg animate-slide-up rounded-sm border border-line bg-stone-50 p-6 shadow-card",
          className
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-medium text-ink">{title}</h2>
          <button
            aria-label="Close dialog"
            onClick={onClose}
            className="rounded-sm p-1 text-ink-500 hover:bg-stone-200"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
