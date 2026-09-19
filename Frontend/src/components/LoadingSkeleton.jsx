import { cn } from "../lib/utils";

export function Skeleton({ className }) {
  return <div className={cn("animate-pulse rounded-sm bg-stone-200", className)} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm border border-line bg-stone-50">
      <Skeleton className="aspect-square w-full" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 4 }) {
  return (
    <tr className="border-b border-line">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}
