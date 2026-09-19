import { AlertCircle } from "lucide-react";
import Button from "./Button";

export default function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-sm border border-line bg-stone-100 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rust/10 text-rust">
        <AlertCircle size={20} />
      </div>
      <p className="text-sm text-ink-500">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
