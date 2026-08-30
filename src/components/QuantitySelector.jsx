import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="inline-flex items-center rounded-sm border border-line">
      <button
        type="button"
        aria-label="Decrease quantity"
        className="flex h-9 w-9 items-center justify-center text-ink-500 hover:bg-stone-100 disabled:opacity-40"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus size={14} />
      </button>
      <span className="w-9 text-center text-sm font-medium price">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="flex h-9 w-9 items-center justify-center text-ink-500 hover:bg-stone-100 disabled:opacity-40"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
