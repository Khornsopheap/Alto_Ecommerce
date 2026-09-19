import { Star } from "lucide-react";
import { cn } from "../lib/utils";

export default function Rating({ value = 0, reviews, size = 14, className }) {
  const rounded = Math.round(value);
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < rounded ? "fill-brass-500 text-brass-500" : "fill-stone-200 text-stone-200"}
          />
        ))}
      </div>
      {reviews !== undefined && <span className="text-xs text-ink-300">({reviews})</span>}
    </div>
  );
}
