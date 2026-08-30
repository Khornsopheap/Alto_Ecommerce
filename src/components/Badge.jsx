import { cn } from "../lib/utils";

export default function Badge({ className, variant = "default", children }) {
  const variants = {
    default: "bg-stone-200 text-ink-700",
    accent: "bg-brass-500 text-stone-50",
    outline: "border border-line text-ink-500",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}
