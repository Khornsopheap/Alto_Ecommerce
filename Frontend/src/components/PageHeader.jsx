export default function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-medium uppercase tracking-wider text-brass-600">{eyebrow}</p>}
        <h1 className="font-display text-2xl font-medium text-ink sm:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-ink-500">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
