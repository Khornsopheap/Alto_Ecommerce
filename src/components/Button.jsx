import { cn } from "../lib/utils";

const variants = {
  primary: "bg-ink text-stone-50 hover:bg-ink-700 disabled:bg-ink-300",
  accent: "bg-brass-500 text-stone-50 hover:bg-brass-600 disabled:bg-brass-200",
  outline: "border border-line bg-transparent text-ink hover:bg-stone-100",
  ghost: "bg-transparent text-ink hover:bg-stone-100",
  danger: "bg-rust text-stone-50 hover:bg-rust/90",
};

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10",
};

export default function Button({
  as: Comp = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
