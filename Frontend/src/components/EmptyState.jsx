export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-line px-6 py-16 text-center">
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-200 text-ink-500">
          <Icon size={20} />
        </div>
      )}
      <h3 className="font-display text-lg font-medium text-ink">{title}</h3>
      {description && <p className="max-w-sm text-sm text-ink-500">{description}</p>}
      {action}
    </div>
  );
}
