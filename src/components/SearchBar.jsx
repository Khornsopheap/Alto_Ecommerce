import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search products..." }) {
  return (
    <div className="relative">
      <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-sm border border-line bg-stone-50 pl-10 pr-3.5 text-sm text-ink placeholder:text-ink-300 focus:border-brass-500 focus:outline-none focus:ring-1 focus:ring-brass-500"
      />
    </div>
  );
}
