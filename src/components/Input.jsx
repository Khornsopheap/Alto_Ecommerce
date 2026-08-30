import { cn } from "../lib/utils";

export default function Input({ className, label, id, error, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "h-11 w-full rounded-sm border bg-stone-50 px-3.5 text-sm text-ink placeholder:text-ink-300",
          "transition-colors focus:border-brass-500 focus:outline-none focus:ring-1 focus:ring-brass-500",
          error ? "border-rust" : "border-line",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-rust">{error}</p>}
    </div>
  );
}
