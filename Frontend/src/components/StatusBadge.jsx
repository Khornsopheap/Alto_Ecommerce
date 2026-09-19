import { cn } from "../lib/utils";

const statusStyles = {
  Pending: "bg-brass-50 text-brass-700 border-brass-200",
  Completed: "bg-forest/10 text-forest border-forest/30",
  Cancelled: "bg-rust/10 text-rust border-rust/30",
  Processing: "bg-stone-200 text-ink-700 border-line",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status] || statusStyles.Processing
      )}
    >
      {status}
    </span>
  );
}
